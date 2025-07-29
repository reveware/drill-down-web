import { FollowApi } from '@/api/endpoints/follow.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      return await FollowApi.followUser(userId);
    },
    onSuccess: (_data, userId) => {
      toast.success('Follow request sent');
      // Invalidate user profile data
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      // Invalidate user recommendations to remove followed user from recommendations
      queryClient.invalidateQueries({ queryKey: ['user-recommendations'] });
    },
    onError: () => {
      toast.error('Failed to send follow request');
    },
  });
};
