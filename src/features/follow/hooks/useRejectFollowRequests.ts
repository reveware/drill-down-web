import { FollowApi } from '@/api/endpoints/follow.api';
import { toast } from '@/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRejectFollowRequests = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (followRequestId: string) => {
      return await FollowApi.rejectFollowRequest(followRequestId);
    },
    onSuccess: () => {
      toast.success('Follow request rejected');
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['pending-follow-requests'] });
    },
    onError: () => {
      toast.error('Failed to reject follow request');
    },
  });
};
