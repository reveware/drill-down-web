'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnlineIndicator } from '@/components/shared/OnlineIndicator/OnlineIndicator';
import { Plus, Search } from '@/components/shared/Icons';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { cn } from '@/lib/utils';
import { useConversations } from '../../hooks/useConversations';
import { ConversationListItem } from '../ConversationListItem/ConversationListItem';

interface ConversationListProps {
  activeConversationId: string | null;
  onSelect: (conversationId: string) => void;
  onNewConversation: () => void;
}

export const ConversationList = ({
  activeConversationId,
  onSelect,
  onNewConversation,
}: ConversationListProps) => {
  const { isConnected } = useChatSocket();

  const [searchQuery, setSearchQuery] = useState('');
  const { conversations, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useConversations({ query: searchQuery });

  const sentinelRef = useRef<HTMLDivElement>(null);
  useInfiniteScrollObserver({
    ref: sentinelRef,
    onLoadMore: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const isSearching = searchQuery.trim().length > 0;
  const showEmpty = !isLoading && conversations.length === 0;

  return (
    <div
      className={cn(
        'bg-background flex h-full flex-col border-r',
        // Mobile: full width when no active conversation, hidden when viewing one.
        // Desktop: always visible as sidebar.
        activeConversationId ? 'hidden md:flex' : 'flex w-full',
        'md:w-80'
      )}
    >
      <div className="flex h-[4.5rem] items-center justify-between border-b px-4">
        <h1 className="font-semibold">Chats</h1>
        <div className="flex items-center gap-2">
          <OnlineIndicator isOnline={isConnected} />
          <Button variant="ghost" size="icon" onClick={onNewConversation} className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border-b p-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="bg-background text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-lg border py-2 pr-4 pl-10 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {isLoading ? (
          <ListSkeleton />
        ) : showEmpty ? (
          <EmptyState isSearching={isSearching} onStart={onNewConversation} />
        ) : (
          <>
            {conversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeConversationId === conversation.id}
                onClick={() => onSelect(conversation.id)}
              />
            ))}
            {hasNextPage && <div ref={sentinelRef} className="h-4" />}
            {isFetchingNextPage && <ListSkeleton count={2} />}
          </>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ isSearching, onStart }: { isSearching: boolean; onStart: () => void }) => {
  if (isSearching) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h2 className="mb-2 text-2xl font-bold">No matches</h2>
        <p className="text-muted-foreground max-w-md">Try a different name or username.</p>
      </div>
    );
  }
  return (
    <div className="flex min-h-4/5 flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-6xl">💭</div>
      <h2 className="mb-2 text-2xl font-bold">No conversations</h2>
      <p className="text-muted-foreground mb-4 max-w-md">
        Start a new conversation to begin chatting.
      </p>
      <Button variant="outline" size="sm" onClick={onStart}>
        Start new conversation
      </Button>
    </div>
  );
};

const ListSkeleton = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 rounded-lg p-3">
        <div className="bg-muted h-12 w-12 animate-pulse rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
          <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
        </div>
      </div>
    ))}
  </>
);
