import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedResponse } from '@/types/pagination';
import { RewardJob, JobStatus } from '@/types/rewardJob';
import { RewardsApi } from '@/api/endpoints/rewards.api';

export const usePendingRewardJob = (userId?: string) => {
  const query = useInfiniteQuery<PaginatedResponse<RewardJob>>({
    queryKey: ['rewardJobs', userId, JobStatus.IN_PROGRESS],
    queryFn: async ({ pageParam }) =>
      RewardsApi.getRewardJobs({ userId, status: JobStatus.IN_PROGRESS }, pageParam as number, 1),
    initialPageParam: 1,
    enabled: !!userId,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
    refetchInterval: 10_000, // poll every 10s while open
  });

  const jobs = query.data?.pages.flatMap((p) => p.data) ?? [];
  const hasPending = jobs.length > 0;

  return {
    hasPending,
    jobs,
    isLoading: query.isLoading,
  };
};
