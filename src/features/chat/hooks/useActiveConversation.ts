import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { useAuth } from '@/hooks/useAuth';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { ConversationsApi } from '@/api/endpoints/conversations.api';
import { Conversation, ConversationInit, Participant, WireMessage, JoinError } from '@/types/chat';
import { JOIN_ERROR_CODES, SEND_ERROR_CODES } from '../services/chat-websocket.service';
import { getActorAvatar, getActorDisplayName } from '../utils';
import { applyJoined, applyMessageRead } from './conversationReducer';
import { applyNewMessage, applyStreamError } from './messagesReducer';
import { buildOptimisticMessage, buildStreamPlaceholder } from './messageFactory';

interface UseActiveConversationOptions {
  init: ConversationInit | null;
}

interface UseActiveConversationResult {
  conversation: Conversation | null;
  joinError: JoinError | null;
  typingActorIds: string[];
  loadingHistory: boolean;

  sendMessage: (content: string) => void;
  markAsRead: (upToSeq: string) => void;
  startTyping: () => void;
  stopTyping: () => void;
}

const TYPING_DEBOUNCE_MS = 3000;
const messagesKey = (id: string) => ['conversation', id, 'messages'] as const;
/**
 * Milliseconds between drained characters.
 * Decoupling display rate from backend burst rate gives the typewriter a steady feel.
 */
const STREAM_MS_PER_CHAR = 33;

/** A single active conversation. RQ-cached, WS-patched. */
export const useActiveConversation = ({
  init,
}: UseActiveConversationOptions): UseActiveConversationResult => {
  const { user } = useAuth();
  const { service } = useChatSocket();
  const queryClient = useQueryClient();

  const [meta, setMeta] = useState<Conversation | null>(null);
  const [currentActorId, setCurrentActorId] = useState<string | null>(null);
  const [typingActorIds, setTypingActorIds] = useState<string[]>([]);
  const [errorPayload, setErrorPayload] = useState<{ code: string; message: string } | null>(null);

  const activeId = meta?.id ?? null;

  const activeIdRef = useRef<string | null>(null);
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);
  const metaRef = useRef<Conversation | null>(null);
  useEffect(() => {
    metaRef.current = meta;
  }, [meta]);

  const streamBuffersRef = useRef<Map<string, string>>(new Map());
  const rafIdRef = useRef<number | null>(null);

  const initKey = init ? JSON.stringify(init) : '';

  useEffect(() => {
    if (!service || !initKey) return;
    service.initConversation(JSON.parse(initKey) as ConversationInit);
    setMeta(null);
    setTypingActorIds([]);
    setErrorPayload(null);
    streamBuffersRef.current.clear();
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, [service, initKey]);

  // Messages cache — REST seeds it once, WS events patch it from here on.
  const messagesQuery = useQuery<WireMessage[]>({
    queryKey: ['conversation', activeId ?? '__idle__', 'messages'],
    queryFn: () => ConversationsApi.getMessages(activeId!),
    enabled: !!activeId,
    staleTime: Infinity, // staleTime: Infinity because WS owns updates after the cold load.
  });
  const messages = useMemo(() => messagesQuery.data ?? [], [messagesQuery.data]);
  const loadingHistory = messagesQuery.isPending && !!activeId;

  // WS event subscriptions — patch the messages cache or update meta.
  useEffect(() => {
    if (!service) return;

    const streamBuffers = streamBuffersRef.current;

    const patchMessages = (conversationId: string, fn: (prev: WireMessage[]) => WireMessage[]) => {
      queryClient.setQueryData<WireMessage[]>(messagesKey(conversationId), (prev) =>
        fn(prev ?? [])
      );
    };

    // every frame, take a chunk from each pending stream's buffer
    // and append it to the corresponding message in the cache.
    let lastDrainAt = 0;
    const drainTick = (timestamp: number) => {
      const buffers = streamBuffersRef.current;
      const id = activeIdRef.current;
      if (!id || buffers.size === 0) {
        rafIdRef.current = null;
        return;
      }
      // Gate by elapsed time so the cadence is framerate-independent.
      // First tick always drains; subsequent ones wait STREAM_MS_PER_CHAR.
      if (lastDrainAt && timestamp - lastDrainAt < STREAM_MS_PER_CHAR) {
        rafIdRef.current = requestAnimationFrame(drainTick);
        return;
      }
      lastDrainAt = timestamp;
      buffers.forEach((pending, streamId) => {
        const chunk = pending[0];
        const remaining = pending.slice(1);
        if (remaining) buffers.set(streamId, remaining);
        else buffers.delete(streamId);
        patchMessages(id, (prev) =>
          prev.map((m) => {
            if (m.stream_id !== streamId) return m;
            const text = m.content[0]?.type === 'text' ? (m.content[0].text ?? '') : '';
            return { ...m, content: [{ type: 'text', text: text + chunk }] };
          })
        );
      });
      rafIdRef.current = requestAnimationFrame(drainTick);
    };

    const unsubs: Array<() => void> = [
      service.onConversationJoined((data) => {
        setCurrentActorId(data.actor_id);
        setMeta((prev) => applyJoined(prev, data));
      }),
      service.onNewMessage((message) => {
        if (message.conversation_id !== activeIdRef.current) return;
        // Server-finalized message arrived. Drop the buffer
        // applyNewMessage replaces the placeholder with the full text.
        if (message.stream_id) streamBuffersRef.current.delete(message.stream_id);
        patchMessages(message.conversation_id, (prev) => applyNewMessage(prev, message));
        setMeta((prev) => {
          if (!prev || prev.participants.some((p) => p.id === message.sender.actor_id)) return prev;
          return { ...prev, participants: [...prev.participants, participantFromActor(message)] };
        });
      }),

      // Deltas arrive bursty. To avoid visible choppiness we don't write them straight to the cache
      // we enqueue into a per-stream buffer and drain N chars per RAF tick.
      service.onMessageStream((data) => {
        if (data.conversation_id !== activeIdRef.current) return;
        // Ensure the placeholder bubble exists in the cache (with empty text).
        patchMessages(data.conversation_id, (prev) => {
          if (prev.some((m) => m.stream_id === data.stream_id)) return prev;
          const placeholder = buildStreamPlaceholder(metaRef.current?.participants ?? [], {
            ...data,
            delta: '',
          });
          return [...prev, placeholder];
        });
        const buffers = streamBuffersRef.current;
        buffers.set(data.stream_id, (buffers.get(data.stream_id) ?? '') + data.delta);
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(drainTick);
        }
      }),

      service.onMessageError((data) => {
        if (data.conversation_id !== activeIdRef.current) return;
        console.error(`Persona stream error [${data.code}]`, { message: data.message });
        streamBuffersRef.current.delete(data.stream_id);
        const participants = metaRef.current?.participants ?? [];
        patchMessages(data.conversation_id, (prev) => applyStreamError(prev, data, participants));
      }),

      service.onMessageUpdated((data) => {
        const id = activeIdRef.current;
        if (!id) return;
        patchMessages(id, (prev) =>
          prev.map((m) =>
            m.client_temp_id === data.client_temp_id
              ? { ...m, id: data.message_id, status: data.status, client_temp_id: undefined }
              : m
          )
        );
      }),

      service.onMessageRead((data) => {
        setMeta((prev) => applyMessageRead(prev, data));
      }),

      service.onTypingStart((data) => {
        if (!data.actor_id || data.conversation_id !== activeIdRef.current) return;
        const id = data.actor_id;
        setTypingActorIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      }),

      service.onTypingStop((data) => {
        if (!data.actor_id || data.conversation_id !== activeIdRef.current) return;
        const id = data.actor_id;
        setTypingActorIds((prev) => prev.filter((x) => x !== id));
      }),
      service.onError((err) => {
        // Join failure → surface via joinError; consumers show a retry UI.
        if (JOIN_ERROR_CODES.has(err.code)) {
          setErrorPayload({ code: err.code, message: err.message });
          return;
        }
        // Send failure → mark the matching optimistic message as failed.
        if (SEND_ERROR_CODES.has(err.code) && err.client_temp_id) {
          const id = activeIdRef.current;
          if (!id) return;
          const tempId = err.client_temp_id;
          patchMessages(id, (prev) =>
            prev.map((m) => (m.client_temp_id === tempId ? { ...m, status: 'failed' as const } : m))
          );
        }
      }),
    ];

    return () => {
      unsubs.forEach((off) => off());
      streamBuffers.clear();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [service, queryClient]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!activeId || !service) return;
      const tempMessage = buildOptimisticMessage(activeId, content, user, currentActorId);
      queryClient.setQueryData<WireMessage[]>(messagesKey(activeId), (prev) => [
        ...(prev ?? []),
        tempMessage,
      ]);
      service.sendMessage(activeId, [{ type: 'text', text: content }], tempMessage.client_temp_id!);
    },
    [activeId, service, user, currentActorId, queryClient]
  );

  const markAsRead = useCallback(
    (upToSeq: string) => {
      if (!activeId || !service) return;
      service.markAsRead(activeId, upToSeq);
    },
    [activeId, service]
  );

  const isTypingRef = useRef(false);

  const emitStop = useDebouncedCallback(() => {
    if (!activeId || !service || !isTypingRef.current) return;
    isTypingRef.current = false;
    service.stopTyping(activeId);
  }, TYPING_DEBOUNCE_MS);

  const startTyping = useCallback(() => {
    if (!activeId || !service) return;
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      service.startTyping(activeId);
    }
    emitStop();
  }, [activeId, service, emitStop]);

  const stopTyping = useCallback(() => {
    if (!activeId || !service || !isTypingRef.current) return;
    isTypingRef.current = false;
    service.stopTyping(activeId);
  }, [activeId, service]);

  const retry = useCallback(() => {
    if (!service || !init) return;
    setErrorPayload(null);
    service.initConversation(init);
  }, [service, init]);

  const joinError = useMemo<JoinError | null>(
    () => (errorPayload ? { ...errorPayload, retry } : null),
    [errorPayload, retry]
  );

  const conversation = useMemo<Conversation | null>(() => {
    if (!meta) return null;
    return {
      ...meta,
      messages,
      last_message: messages[messages.length - 1] ?? meta.last_message,
    };
  }, [meta, messages]);

  return {
    conversation,
    joinError,
    typingActorIds,
    loadingHistory,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
  };
};

const participantFromActor = (message: WireMessage): Participant => ({
  id: message.sender.actor_id,
  name: getActorDisplayName(message.sender),
  avatar: getActorAvatar(message.sender),
  is_agent: message.sender.actor_type === 'PERSONA',
  user: message.sender.user
    ? { id: message.sender.user.id, username: message.sender.user.username }
    : undefined,
  persona: message.sender.persona
    ? { id: message.sender.persona.id, slug: message.sender.persona.slug }
    : undefined,
});
