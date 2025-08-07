import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostApi } from '@/api/endpoints/post.api';
import { PostTypes, CreateQuotePost, PostOverview, CreateImagePost } from '@/types/post';
import { toast } from '@/lib/toast';
import { useAuth } from '@/hooks/useAuth';

type PostTypeToDto<T extends PostTypes> = T extends PostTypes.IMAGE
  ? CreateImagePost
  : T extends PostTypes.QUOTE
    ? CreateQuotePost
    : never;

export function useCreatePost<T extends PostTypes>(
  type: T,
  onSuccess: (post: PostOverview) => void
) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<PostOverview, Error, PostTypeToDto<T>>({
    mutationFn: async (data) => {
      if (type === PostTypes.IMAGE) {
        return await PostApi.createImagePost(data as CreateImagePost);
      }
      if (type === PostTypes.QUOTE) {
        return await PostApi.createQuotePost(data as CreateQuotePost);
      }
      throw new Error('Invalid post type');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // Invalidate user data to update posts_count for reward progress
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ['user', user.id] });
      }
    },
  });
}
