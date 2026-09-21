import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RewardsApi } from '@/api/endpoints/rewards.api';
import { getApiErrorMessage, getApiErrorStatus } from '@/api/errors';
import { toast } from '@/lib/toast';
import { ACTIVE_REWARD_GENERATIONS_KEY } from './useActiveRewardGenerations';

const CONFLICT = 409;

export const useRetryRewardGeneration = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => RewardsApi.retryRewardGeneration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVE_REWARD_GENERATIONS_KEY });
    },
    onError: (error) => {
      if (getApiErrorStatus(error) === CONFLICT) {
        queryClient.invalidateQueries({ queryKey: ACTIVE_REWARD_GENERATIONS_KEY });
        return;
      }
      toast.error(getApiErrorMessage(error));
    },
  });
};
