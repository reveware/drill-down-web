import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentApi } from '@/api/endpoints/comment.api';
import { CreateComment, Comment } from '@/types/comment';
import { toast } from '@/lib/toast';

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, CreateComment>({
    mutationFn: async (data) => await CommentApi.createComment(data),
    onSuccess: () => {
      toast.success('Comment posted successfully');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to post comment');
    },
  });
};
