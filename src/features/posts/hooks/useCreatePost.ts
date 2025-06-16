import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostApi } from '@/api/endpoints/post.api';
import { PostTypes, CreatePhotoPost, CreateQuotePost, PostOverview } from '@/types/post';
import { toast } from 'sonner';

type PostTypeToDto<T extends PostTypes> = T extends PostTypes.PHOTO
  ? CreatePhotoPost
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
      if (type === PostTypes.PHOTO) {
        return await PostApi.createPhotoPost(data as CreatePhotoPost);
      } else if (type === PostTypes.QUOTE) {
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
