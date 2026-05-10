import { useInfiniteQuery } from '@tanstack/react-query';
import { UserApi, SearchUsersParams } from '@/api/endpoints/user.api';
import { UserOverview } from '@/types/user';
import { PaginatedResponse } from '@/types/pagination';
import { useDebounce } from '@/hooks/useDebounce';

interface UseUserSearchOptions {
  query?: string;
  /** Restrict to users I'm following. */
  isFollowing?: boolean;
  /** Restrict to users following me. */
  isFollower?: boolean;
  /** Restrict to mutual follows. */
  isMutual?: boolean;
  /** Disable the query. */
  enabled?: boolean;
}

const DEBOUNCE_MS = 300;

export const useUserSearch = ({
  query,
  isFollowing,
  isFollower,
  isMutual,
  enabled = true,
}: UseUserSearchOptions = {}) => {
  const debouncedQuery = useDebounce(query?.trim() ?? '', DEBOUNCE_MS);

  const params: SearchUsersParams = {
    ...(debouncedQuery ? { query: debouncedQuery } : {}),
    ...(isFollowing !== undefined ? { is_following: isFollowing } : {}),
    ...(isFollower !== undefined ? { is_follower: isFollower } : {}),
    ...(isMutual !== undefined ? { is_mutual: isMutual } : {}),
  };

  const result = useInfiniteQuery<PaginatedResponse<UserOverview>>({
    queryKey: ['users', 'search', params],
    queryFn: ({ pageParam = 1 }) => UserApi.searchUsers({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
    enabled,
  });

  const users = result.data?.pages.flatMap((p) => p.data) ?? [];

  return {
    users,
    isLoading: result.isLoading,
    isFetchingNextPage: result.isFetchingNextPage,
    hasNextPage: result.hasNextPage ?? false,
    fetchNextPage: result.fetchNextPage,
  };
};
