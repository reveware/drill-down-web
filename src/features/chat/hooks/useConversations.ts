import { useEffect } from 'react';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import {
  ConversationsApi,
  ListConversationsParams,
  ListConversationsResult,
} from '@/api/endpoints/conversations.api';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { Conversation } from '@/types/chat';
import { useIsActorSelf } from './useIsActorSelf';

interface UseConversationsOptions {
  query?: string;
  type?: ListConversationsParams['type'];
}

const DEBOUNCE_MS = 300;
const PAGE_SIZE = 25;

const conversationsRootKey = ['conversations'] as const;

const buildQueryKey = (filters: { query: string; type?: ListConversationsParams['type'] }) =>
  [...conversationsRootKey, filters] as const;

type ConversationsCache = InfiniteData<ListConversationsResult>;

/** Paginated, searchable list of conversations. RQ-cached, WS-patched. */
export const useConversations = ({ query, type }: UseConversationsOptions = {}) => {
  const debouncedQuery = useDebounce(query?.trim() ?? '', DEBOUNCE_MS);
  const filters = { query: debouncedQuery, type };
  const queryKey = buildQueryKey(filters);

  const result = useInfiniteQuery<ListConversationsResult>({
    queryKey,
    queryFn: ({ pageParam }) =>
      ConversationsApi.list({
        cursor: pageParam as string | undefined,
        limit: PAGE_SIZE,
        ...(filters.query ? { query: filters.query } : {}),
        ...(filters.type ? { type: filters.type } : {}),
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  useConversationsCacheSync();

  const conversations: Conversation[] = result.data?.pages.flatMap((p) => p.conversations) ?? [];

  return {
    conversations,
    isLoading: result.isLoading,
    isFetchingNextPage: result.isFetchingNextPage,
    hasNextPage: result.hasNextPage ?? false,
    fetchNextPage: result.fetchNextPage,
  };
};

const useConversationsCacheSync = () => {
  const { service } = useChatSocket();
  const queryClient = useQueryClient();
  const isSelf = useIsActorSelf();

  useEffect(() => {
    if (!service) return;

    const updateAllPages = (
      mapPage: (page: ListConversationsResult) => ListConversationsResult
    ) => {
      queryClient.setQueriesData<ConversationsCache>({ queryKey: conversationsRootKey }, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map(mapPage) };
      });
    };

    const offJoined = service.onConversationJoined((data) => {
      // Only invalidate when the joined conversation isn't already in the cache.
      const caches = queryClient.getQueriesData<ConversationsCache>({
        queryKey: conversationsRootKey,
      });
      const known = caches.some(([, cache]) =>
        cache?.pages.some((p) => p.conversations.some((c) => c.id === data.conversation_id))
      );
      if (known) return;
      queryClient.invalidateQueries({ queryKey: conversationsRootKey });
    });

    const offNewMessage = service.onNewMessage((message) => {
      const isOwn = isSelf(message.sender);
      updateAllPages((page) => ({
        ...page,
        conversations: page.conversations.map((c) =>
          c.id === message.conversation_id
            ? {
                ...c,
                last_message: message,
                last_activity: message.timestamp,
                unread_count: isOwn ? c.unread_count : c.unread_count + 1,
              }
            : c
        ),
      }));
    });

    const offRead = service.onMessageRead((data) => {
      const { conversation_id, actor_id, last_read_seq } = data;
      if (!conversation_id || !actor_id || !last_read_seq) return;

      updateAllPages((page) => ({
        ...page,
        conversations: page.conversations.map((c) => {
          if (c.id !== conversation_id) return c;
          const reader = c.participants.find((p) => p.id === actor_id);
          return {
            ...c,
            participants: c.participants.map((p) =>
              p.id === actor_id ? { ...p, last_read_seq } : p
            ),
            unread_count: isSelf(reader) ? 0 : c.unread_count,
          };
        }),
      }));
    });

    return () => {
      offJoined();
      offNewMessage();
      offRead();
    };
  }, [service, queryClient, isSelf]);
};

export const useInvalidateConversations = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: conversationsRootKey });
};
