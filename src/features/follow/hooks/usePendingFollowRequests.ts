import { useInfiniteQuery } from '@tanstack/react-query';
import { FollowApi } from '@/api/endpoints/follow.api';
import { FollowRequest } from '@/types/follow';
import { PaginatedResponse } from '@/types/pagination';

const PAGE_SIZE = 25;

export const usePendingFollowRequests = () => {
  const query = useInfiniteQuery<PaginatedResponse<FollowRequest>>({
    queryKey: ['pending-follow-requests'],
    queryFn: ({ pageParam = 0 }) =>
      FollowApi.getPendingFollowRequests(pageParam as number, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
  });

  const pendingRequests = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    pendingRequests,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};
