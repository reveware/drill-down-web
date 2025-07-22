import { FollowApi } from '@/api/endpoints/follow.api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';

export const useRejectFollowRequests = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (followRequestId: string) => {
      return await FollowApi.rejectFollowRequest(followRequestId);
    },
    onSuccess: () => {
      toast.success('Follow request rejected');
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
    onError: () => {
      toast.error('Failed to reject follow request');
    },
  });
};
