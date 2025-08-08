import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LikeApi } from '@/api/endpoints/like.api';
import { toast } from '@/lib/toast';

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => await LikeApi.likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      toast.error('Failed to like post');
    },
  });
};
