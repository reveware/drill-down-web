import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostApi } from '@/api/endpoints/post.api';
import { PostTypes, CreateQuotePost, PostOverview, CreateImagePost } from '@/types/post';
import { toast } from '@/lib/toast';

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
    },
  });
}
