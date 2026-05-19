import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';
import { getApiErrorMessage } from '@/api/errors';
import { PostApi } from '@/api/endpoints/post.api';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => await PostApi.deletePost(postId),
    onSuccess: () => {
      toast.success('Post deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
