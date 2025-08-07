import { useInfiniteQuery } from '@tanstack/react-query';
import { UserReward } from '@/types/reward';
import { RewardsApi } from '@/api/endpoints/rewards.api';
import { PaginatedResponse } from '@/types/pagination';

export const useRewards = () => {
  const query = useInfiniteQuery<PaginatedResponse<UserReward>>({
    queryKey: ['rewards'],
    queryFn: async ({ pageParam }) => await RewardsApi.getUserRewards(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.is_last_page ? undefined : lastPage.page + 1;
    },
  });

  const rewards = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    rewards,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};
