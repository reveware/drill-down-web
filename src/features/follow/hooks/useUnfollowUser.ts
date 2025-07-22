import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FollowApi } from '@/api/endpoints/follow.api';
import { toast } from '@/lib/toast';

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      return await FollowApi.unfollowUser(userId);
    },
    onSuccess: (_data, userId) => {
      toast.success('You are no longer following this user');
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
    onError: () => {
      toast.error('Failed to unfollow this user');
    },
  });
};
