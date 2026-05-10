import { useState, useCallback, useEffect, useRef } from 'react';
import { Conversation, WireMessage, Participant } from '@/types/chat';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { useConversationsApi } from './useConversationsApi';
import { useAuth } from '@/hooks/useAuth';
import { toParticipant, getActorDisplayName, getActorAvatar } from '../utils';

export const useConversation = () => {
  const { user } = useAuth();
  const { service } = useChatSocket();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({});
  const [currentActorId, setCurrentActorId] = useState<string | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (!service) return;

    // conversation:joined now includes actor_id and participants
    service.onConversationJoined((data) => {
      setCurrentActorId(data.actor_id);

      setConversations((prev) => {
        if (prev.some((c) => c.id === data.conversation_id)) return prev;

        const participants = data.participants.map(toParticipant);
        const counterpart = participants.find((p) => p.id !== data.actor_id);

        return [
          {
            id: data.conversation_id,
            type: data.type === 'PERSONA' ? 'ai_assistant' : 'direct',
            participants,
            messages: [],
            last_activity: new Date().toISOString(),
            unread_count: 0,
            title: counterpart?.name,
          },
          ...prev,
        ];
      });
      setActiveConversationId((prev) => prev ?? data.conversation_id);
    });

    // message:new now includes client_temp_id for reliable dedup
    service.onNewMessage((message: WireMessage) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== message.conversation_id) return conv;

          // Dedup: skip if this is the echo of our optimistic message
          if (
            message.client_temp_id &&
            conv.messages.some((m) => m.client_temp_id === message.client_temp_id)
          ) {
            return conv;
          }
          // Dedup: skip if same server ID already present
          if (conv.messages.some((m) => m.id === message.id)) return conv;

          // Derive participant from sender if not already tracked
          const participantKnown = conv.participants.some((p) => p.id === message.sender.actor_id);
          const updatedParticipants: Participant[] = participantKnown
            ? conv.participants
            : [
                ...conv.participants,
                {
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
                },
              ];

          return {
            ...conv,
            participants: updatedParticipants,
            messages: [...conv.messages, message],
            last_message: message,
            last_activity: message.timestamp,
            unread_count: conv.unread_count + 1,
          };
        })
      );
    });

    // message:updated — reconcile optimistic message
    service.onMessageUpdated((data) => {
      setConversations((prev) =>
        prev.map((conv) => ({
          ...conv,
          messages: conv.messages.map((msg) =>
            msg.client_temp_id === data.client_temp_id
              ? { ...msg, id: data.message_id, status: data.status, client_temp_id: undefined }
              : msg
          ),
        }))
      );
    });

    // message:read — update participant watermark
    service.onMessageRead((data) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== data.conversation_id) return conv;
          return {
            ...conv,
            participants: conv.participants.map((p) =>
              p.id === data.actor_id ? { ...p, last_read_seq: data.last_read_seq } : p
            ),
          };
        })
      );
    });

    service.onTypingStart((data) => {
      if (!data.actor_id) return;
      const actorId = data.actor_id;
      setTypingUsers((prev) => {
        const current = prev[data.conversation_id] ?? [];
        if (current.includes(actorId)) return prev;
        return { ...prev, [data.conversation_id]: [...current, actorId] };
      });
    });

    service.onTypingStop((data) => {
      if (!data.actor_id) return;
      const actorId = data.actor_id;
      setTypingUsers((prev) => ({
        ...prev,
        [data.conversation_id]: (prev[data.conversation_id] ?? []).filter((id) => id !== actorId),
      }));
    });

    return () => {
      service.removeAllListeners();
    };
  }, [service]);

  const setActiveConversation = useCallback(
    (conversationId: string | null) => {
      if (conversationId && service) {
        service.joinConversation(conversationId);
      }
      setActiveConversationId(conversationId);
      setConversations((prev) =>
        prev.map((conv) => (conv.id === conversationId ? { ...conv, unread_count: 0 } : conv))
      );
    },
    [service]
  );

  const sendMessage = useCallback(
    (content: string) => {
      if (!activeConversationId || !service) return;

      const clientTempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      const tempMessage: WireMessage = {
        id: clientTempId,
        conversation_id: activeConversationId,
        content: [{ type: 'text', text: content }],
        timestamp: new Date().toISOString(),
        sender: {
          actor_id: currentActorId ?? user?.id ?? 'current-user',
          actor_type: 'USER',
          user: user
            ? {
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                avatar: user.avatar,
              }
            : undefined,
        },
        type: 'text',
        status: 'sending',
        client_temp_id: clientTempId,
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, tempMessage],
                last_message: tempMessage,
                last_activity: tempMessage.timestamp,
              }
            : conv
        )
      );

      service.sendMessage(activeConversationId, [{ type: 'text', text: content }], clientTempId);
    },
    [activeConversationId, service, user, currentActorId]
  );

  const markAsRead = useCallback(
    (conversationId: string, upToSeq: string) => {
      if (!service) return;
      service.markAsRead(conversationId, upToSeq);
    },
    [service]
  );

  // Typing emit with auto-stop after 3 seconds of inactivity
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  const startTyping = useCallback(() => {
    if (!activeConversationId || !service) return;

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      service.startTyping(activeConversationId);
    }

    // Reset the auto-stop timer on every keystroke
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current && activeConversationId) {
        isTypingRef.current = false;
        service.stopTyping(activeConversationId);
      }
    }, 3000);
  }, [activeConversationId, service]);

  const stopTyping = useCallback(() => {
    if (!activeConversationId || !service || !isTypingRef.current) return;
    isTypingRef.current = false;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    service.stopTyping(activeConversationId);
  }, [activeConversationId, service]);

  // Hydrate conversations from REST on mount
  const { listConversations, getMessages } = useConversationsApi();
  useEffect(() => {
    if (!service) return;
    listConversations()
      .then((result) => {
        if (result.conversations.length) {
          setConversations((prev) => {
            // Merge REST results without overwriting WS-joined conversations
            const wsIds = new Set(prev.map((c) => c.id));
            const newFromRest = result.conversations.filter((c) => !wsIds.has(c.id));
            return [...prev, ...newFromRest];
          });
        }
        if (!currentActorId && result.currentActorId) {
          setCurrentActorId(result.currentActorId);
        }
      })
      .catch(() => {});
  }, [service, currentActorId, listConversations]);

  // Fetch message history when a conversation becomes active
  const loadedConversationsRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!activeConversationId) return;
    if (loadedConversationsRef.current.has(activeConversationId)) return;
    loadedConversationsRef.current.add(activeConversationId);

    setLoadingHistory(true);
    getMessages(activeConversationId)
      .then((messages) => {
        if (!messages.length) return;
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id !== activeConversationId) return conv;
            // Merge: keep any optimistic messages not yet in history
            const historyIds = new Set(messages.map((m) => m.id));
            const optimistic = conv.messages.filter(
              (m) => m.status === 'sending' && !historyIds.has(m.id)
            );
            return {
              ...conv,
              messages: [...messages, ...optimistic],
              last_message: messages[messages.length - 1] ?? conv.last_message,
            };
          })
        );
      })
      .catch(() => {})
      .finally(() => setLoadingHistory(false));
  }, [activeConversationId, getMessages]);

  return {
    conversations,
    activeConversationId,
    currentActorId,
    typingUsers,
    loadingHistory,
    setActiveConversation,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
  };
};
