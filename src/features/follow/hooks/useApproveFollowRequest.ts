import { FollowApi } from '@/api/endpoints/follow.api';
import { toast } from '@/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApproveFollowRequest = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (followRequestId: string) => {
      return await FollowApi.approveFollowRequest(followRequestId);
    },
    onSuccess: () => {
      toast.success('Follow request approved');
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['pending-follow-requests'] });
    },
    onError: () => {
      toast.error('Failed to approve follow request');
    },
  });
};
