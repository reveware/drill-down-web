'use client';

import { useEffect, useRef } from 'react';
import { useConversation } from '@/features/chat/hooks/useConversation';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { ChatHistory } from '@/features/chat/components/ChatHistory/ChatHistory';
import { ChatInput } from '@/features/chat/components/ChatInput/ChatInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OnlineIndicator } from '@/components/shared/OnlineIndicator/OnlineIndicator';
import { ArrowLeft, Plus, Search } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { MessagePart } from '@/types/chat';

function getMessagePreview(parts: MessagePart[]): string {
  const text = parts.find((p) => p.type === 'text')?.text;
  if (text) return text;
  if (parts.some((p) => p.type === 'image')) return '📷 Image';
  if (parts.some((p) => p.type === 'audio')) return '🎵 Audio';
  if (parts.some((p) => p.type === 'post_ref')) return '📌 Post';
  return '';
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const {
    conversations,
    activeConversationId,
    currentActorId,
    typingUsers,
    loadingHistory,
    sendMessage,
    setActiveConversation,
    startTyping,
    stopTyping,
  } = useConversation();
  const { isConnected } = useChatSocket();

  // Auto-select conversation from query param (e.g. /chat?id=xxx)
  const didAutoSelect = useRef(false);
  useEffect(() => {
    if (didAutoSelect.current) return;
    const id = searchParams.get('id');
    if (id && conversations.some((c) => c.id === id)) {
      didAutoSelect.current = true;
      setActiveConversation(id);
    }
  }, [searchParams, conversations, setActiveConversation]);

  const currentUserId = currentActorId ?? user?.id ?? '';

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const conversationTypingUsers = activeConversationId
    ? (typingUsers[activeConversationId] || []).filter((id: string) => id !== currentUserId)
    : [];

  const handleSendMessage = (content: string) => sendMessage(content);

  const handleCreateNewChat = () => {
    // TODO: Open user picker modal to start a direct conversation via service.startUserChat(userId)
    console.log('Open user picker modal');
  };

  const handleBack = () => setActiveConversation(null);

  const otherParticipant = activeConversation?.participants.find((p) => p.id !== currentUserId);

  return (
    <div className="bg-background flex h-full">
      {/* Conversation List */}
      <div
        className={cn(
          'bg-background flex h-full flex-col border-r',
          // Mobile: full width when no active conversation, hidden when viewing one
          // Desktop: always visible as sidebar
          activeConversationId ? 'hidden md:flex' : 'flex w-full',
          'md:w-80'
        )}
      >
        {/* List Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold">Chats</h1>
          </div>

          <div className="flex items-center gap-2">
            <OnlineIndicator isOnline={isConnected} />

            <Button variant="ghost" size="icon" onClick={handleCreateNewChat} className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="border-b p-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="bg-background focus:ring-primary w-full rounded-lg border py-2 pr-4 pl-10 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground text-sm">No conversations yet</p>
                <Button variant="outline" size="sm" onClick={handleCreateNewChat} className="mt-2">
                  Start new conversation
                </Button>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation.id)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors',
                    'hover:bg-accent/50',
                    activeConversationId === conversation.id && 'bg-accent'
                  )}
                >
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage
                      src={conversation.participants.find((p) => p.id !== currentUserId)?.avatar}
                      alt={conversation.title || 'Chat'}
                    />
                    <AvatarFallback className="from-accent/90 to-primary/90 bg-gradient-to-r text-white">
                      {(conversation.title || 'C').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate font-medium">{conversation.title || 'Chat'}</h3>
                      {conversation.last_message && (
                        <span className="text-muted-foreground text-xs">
                          {new Date(conversation.last_message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground truncate text-sm">
                        {conversation.last_message
                          ? getMessagePreview(conversation.last_message.content)
                          : 'No messages'}
                      </p>
                      {conversation.unread_count > 0 && (
                        <Badge variant="default" className="h-5 w-5 p-0 text-xs">
                          {conversation.unread_count}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Conversation View */}
      <div
        className={cn(
          'flex-1 flex-col',
          // Mobile: full width when active, hidden otherwise
          // Desktop: always visible
          activeConversationId ? 'flex' : 'hidden md:flex'
        )}
      >
        {activeConversation ? (
          <>
            {/* Conversation Header */}
            <div className="flex items-center gap-3 border-b p-4">
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>

              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={otherParticipant?.avatar}
                  alt={activeConversation.title || 'Chat'}
                />
                <AvatarFallback className="from-accent/90 to-primary/90 bg-gradient-to-r text-white">
                  {(activeConversation.title || 'C').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="font-semibold">{activeConversation.title || 'Chat'}</h2>
                <p className="text-muted-foreground text-sm">
                  {activeConversation.type === 'ai_assistant' ? 'AI Assistant' : 'Direct Message'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="min-h-0 flex-1">
              <ChatHistory
                messages={activeConversation.messages}
                participants={activeConversation.participants}
                currentUserId={currentUserId}
                typingUsers={conversationTypingUsers}
                isLoading={loadingHistory}
              />
            </div>

            {/* Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              onTypingStart={startTyping}
              onTypingStop={stopTyping}
              disabled={!isConnected}
              placeholder={
                isConnected ? `Message ${activeConversation.title || 'chat'}...` : 'Connecting...'
              }
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="bg-accent/20 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                <svg
                  className="text-muted-foreground h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Welcome to Chat</h3>
              <p className="text-muted-foreground mb-4">
                Select a conversation to start messaging or create a new one
              </p>
              <Button onClick={handleCreateNewChat}>Start new conversation</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
