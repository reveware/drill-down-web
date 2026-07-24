import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostApi } from '@/api/endpoints/post.api';
import { CreatePost, PostOverview } from '@/types/post.types';
import { toast } from '@/lib/toast';
import { getApiErrorMessage } from '@/api/errors';
import { useAuth } from '@/hooks/useAuth';

export function useCreatePost(onSuccess: (post: PostOverview) => void) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<PostOverview, Error, CreatePost>({
    mutationFn: (data) => PostApi.createPost(data),
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ['user', user.id] });
      }
    },
  });
}
