import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LikeApi } from '@/api/endpoints/like.api';
import { toast } from '@/lib/toast';

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => await LikeApi.unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      toast.error('Failed to unlike post');
    },
  });
};
