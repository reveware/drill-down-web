'use client';

import { Conversation } from '@/types/chat';
import { ChatHistory } from '../ChatHistory/ChatHistory';
import { ChatInput } from '../ChatInput/ChatInput';

interface ChatBodyProps {
  conversation: Conversation;
  typingActorIds: string[];
  loadingHistory: boolean;
  isConnected: boolean;
  onSendMessage: (content: string) => void;
  onTypingStart: () => void;
  onTypingStop: () => void;
}

export const ChatBody = ({
  conversation,
  typingActorIds,
  loadingHistory,
  isConnected,
  onSendMessage,
  onTypingStart,
  onTypingStop,
}: ChatBodyProps) => (
  <>
    <div className="min-h-0 flex-1 overflow-hidden">
      <ChatHistory
        messages={conversation.messages}
        participants={conversation.participants}
        typingUsers={typingActorIds}
        isLoading={loadingHistory}
      />
    </div>
    <ChatInput
      onSendMessage={onSendMessage}
      onTypingStart={onTypingStart}
      onTypingStop={onTypingStop}
      disabled={!isConnected}
      placeholder={isConnected ? `Message ${conversation.title}...` : 'Connecting...'}
    />
  </>
);
