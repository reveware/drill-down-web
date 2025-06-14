import { useInfiniteQuery } from '@tanstack/react-query';
import { userApi } from '@/api/endpoints/user.api';
import { UserOverview } from '@/types/user';
import { PaginatedResponse } from '@/types/pagination';

const PAGE_SIZE = 25;

export const useUserFollowers = (userId: string) => {
  const query = useInfiniteQuery<PaginatedResponse<UserOverview>>({
    queryKey: ['user', userId, 'followers'],
    queryFn: ({ pageParam = 0 }) =>
      userApi.getUserFollowers(userId, pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
  });

  const followers = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    followers,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};
