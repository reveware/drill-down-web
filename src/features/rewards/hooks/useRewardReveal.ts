import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RewardsApi } from '@/api/endpoints/rewards.api';
import { UserReward } from '@/types/reward';
import { toast } from '@/lib/toast';

export const useRewardReveal = () => {
  const queryClient = useQueryClient();

  return useMutation<UserReward, Error, string>({
    mutationFn: async (rewardId: string) => await RewardsApi.revealReward(rewardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
    },
    onError: (error) => {
      toast.error('Failed to reveal reward. Please try again.');
      console.error('Error revealing reward:', error);
    },
  });
};
