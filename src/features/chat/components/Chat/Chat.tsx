'use client';

import { useEffect, useState } from 'react';
import { useConversation } from '../../hooks/useConversation';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { ChatHistory } from '../ChatHistory/ChatHistory';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatHeader } from './ChatHeader';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ChatInitByPersona {
  personaSlug: string;
}
interface ChatInitByConversation {
  conversationId: string;
}
interface ChatInitByUser {
  userId: string;
}
type ChatInit = ChatInitByPersona | ChatInitByConversation | ChatInitByUser;

interface ChatProps {
  init: ChatInit;
  onSuccess?: () => void;
  className?: string;
}

const getInitKey = (init: ChatInit): string => {
  if ('personaSlug' in init) return `persona:${init.personaSlug}`;
  if ('conversationId' in init) return `conv:${init.conversationId}`;
  return `user:${(init as ChatInitByUser).userId}`;
};

export const Chat = (props: ChatProps) => {
  const { init, onSuccess, className } = props;
  const router = useRouter();
  const {
    conversations,
    activeConversationId,
    currentActorId,
    typingUsers,
    loadingHistory,
    sendMessage,
    setActiveConversation,
    markAsRead,
    startTyping,
    stopTyping,
  } = useConversation();
  const { isConnected, service } = useChatSocket();
  const { user } = useAuth();

  const currentUserId = currentActorId ?? user?.id ?? 'current-user';
  const initKey = getInitKey(init);

  const [joinError, setJoinError] = useState<string | null>(null);

  useEffect(() => {
    if (!service) return;

    setJoinError(null);

    const handleError = (data: { code: string; message: string }) => {
      console.error(`❌ Chat: join/send error [${data.code}]`, data.message);
      setJoinError(data.message);
    };
    service.onError(handleError);

    if ('conversationId' in init) {
      service.joinConversation(init.conversationId);
      setActiveConversation(init.conversationId);
    } else if ('personaSlug' in init) {
      service.startPersonaChat(init.personaSlug);
    } else if ('userId' in init) {
      service.startUserChat((init as ChatInitByUser).userId);
    }

    return () => {
      service.offError(handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, initKey]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const conversationTypingUsers = activeConversationId
    ? (typingUsers[activeConversationId] || []).filter((id: string) => id !== currentUserId)
    : [];

  const handleSendMessage = (content: string) => sendMessage(content);
  const handleOpenFullChat = () => {
    const params = activeConversationId ? `?id=${activeConversationId}` : '';
    router.push(`/chat${params}`);
    onSuccess?.();
  };

  // Auto-mark incoming messages as read when the chat is active
  useEffect(() => {
    if (!activeConversation || !activeConversationId) return;
    const lastMsg = activeConversation.messages[activeConversation.messages.length - 1];
    if (!lastMsg?.seq || lastMsg.sender.actor_id === currentUserId) return;
    markAsRead(activeConversationId, lastMsg.seq);
  }, [activeConversation, activeConversationId, currentUserId, markAsRead]);

  if (joinError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <p className="text-destructive text-sm font-medium">Failed to open chat</p>
        <p className="text-muted-foreground text-xs">{joinError}</p>
        <button
          className="text-primary text-xs underline"
          onClick={() => {
            setJoinError(null);
            if (service) {
              if ('personaSlug' in init) service.startPersonaChat(init.personaSlug);
              else if ('conversationId' in init) service.joinConversation(init.conversationId);
              else if ('userId' in init) service.startUserChat((init as ChatInitByUser).userId);
            }
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!activeConversation) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2" />
          <p className="text-muted-foreground text-sm">
            {isConnected ? 'Joining conversation...' : 'Connecting...'}
          </p>
        </div>
      </div>
    );
  }

  // Participants come from conversation:joined — always available
  const otherParticipant = activeConversation.participants.find((p) => p.id !== currentUserId);
  const displayName = otherParticipant?.name ?? 'Chat';

  return (
    <div className={cn('flex h-full w-full flex-col', className)}>
      {otherParticipant && (
        <ChatHeader participant={otherParticipant} onOpenFullChat={handleOpenFullChat} />
      )}

      <div className="min-h-0 flex-1 overflow-hidden">
        <ChatHistory
          messages={activeConversation.messages}
          participants={activeConversation.participants}
          currentUserId={currentUserId}
          typingUsers={conversationTypingUsers}
          isLoading={loadingHistory}
        />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        onTypingStart={startTyping}
        onTypingStop={stopTyping}
        disabled={!isConnected}
        placeholder={isConnected ? `Message ${displayName}...` : 'Connecting...'}
      />
    </div>
  );
};
