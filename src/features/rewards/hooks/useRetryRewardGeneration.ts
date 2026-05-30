import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RewardsApi } from '@/api/endpoints/rewards.api';
import { RewardGeneration } from '@/types/rewardGeneration';
import { getApiErrorMessage } from '@/api/errors';
import { toast } from '@/lib/toast';
import { ACTIVE_REWARD_GENERATIONS_KEY } from './useActiveRewardGenerations';

export const useRetryRewardGeneration = () => {
  const queryClient = useQueryClient();

  return useMutation<RewardGeneration, Error, string>({
    mutationFn: (id: string) => RewardsApi.retryRewardGeneration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVE_REWARD_GENERATIONS_KEY });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
