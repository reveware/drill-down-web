'use client';

import { Button } from '@/components/ui/button';
import { ConversationInit } from '@/types/chat';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { useActiveConversation } from '../../hooks/useActiveConversation';
import { useAutoMarkRead } from '../../hooks/useAutoMarkRead';
import { useIsActorSelf } from '../../hooks/useIsActorSelf';
import { ChatBody } from '../ChatBody/ChatBody';
import { ChatHeader } from '../ChatHeader/ChatHeader';
import { JoinErrorState } from '../JoinErrorState/JoinErrorState';

interface ChatProps {
  /** Pass `null` for the welcome state. */
  init: ConversationInit | null;
  onBack?: () => void;
  onDelete?: (conversationId: string) => void;
  /** Wires up the welcome state's button. Hidden if omitted. */
  onNewConversation?: () => void;
}

export const Chat = ({
  init,
  onBack,
  onDelete,
  onNewConversation: onStartConversation,
}: ChatProps) => {
  const { isConnected } = useChatSocket();
  const isSelf = useIsActorSelf();
  const {
    conversation,
    joinError,
    typingActorIds,
    loadingHistory,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
  } = useActiveConversation({ init });

  useAutoMarkRead(conversation, markAsRead);

  if (!init) return <WelcomeState onStart={onStartConversation} />;

  if (joinError) return <JoinErrorState error={joinError} onBack={onBack} />;

  // Header comes from live data; before that it renders a skeleton.
  const counterpart = conversation?.participants.find((p) => !isSelf(p));
  const header = (
    <ChatHeader
      title={conversation?.title ?? ''}
      avatar={counterpart?.avatar}
      subtitle={
        conversation
          ? conversation.type === 'PERSONA'
            ? 'AI Assistant'
            : 'Direct Message'
          : undefined
      }
      onBack={onBack}
      onDelete={onDelete && conversation ? () => onDelete(conversation.id) : undefined}
    />
  );

  if (!conversation) {
    return (
      <div className="flex h-full w-full flex-col">
        {header}
        <BodyLoading />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      {header}
      <ChatBody
        conversation={conversation}
        typingActorIds={typingActorIds}
        loadingHistory={loadingHistory}
        isConnected={isConnected}
        onSendMessage={sendMessage}
        onTypingStart={startTyping}
        onTypingStop={stopTyping}
      />
    </div>
  );
};

const BodyLoading = () => (
  <div className="flex h-full flex-1 items-center justify-center">
    <div className="border-accent h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
  </div>
);

const WelcomeState = ({ onStart }: { onStart?: () => void }) => (
  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
    <div className="mb-4 text-6xl">💭</div>
    <h2 className="mb-2 text-2xl font-bold">Welcome to Chat</h2>
    <p className="text-muted-foreground mb-4 max-w-md">Select or start a conversation</p>
    {onStart && <Button onClick={onStart}>Start new conversation</Button>}
  </div>
);
