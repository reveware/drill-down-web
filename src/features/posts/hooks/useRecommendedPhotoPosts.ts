import { useQuery } from '@tanstack/react-query';
import { PhotoPost, PostTypes } from '@/types/post';
import { postApi } from '@/api/endpoints/post.api';

export const useRecommendedPhotoPosts = (userId: number) => {
  const PAGE_SIZE = 20;

  return useQuery({
    queryKey: ['recommended-photo-posts'],
    queryFn: async (): Promise<PhotoPost[]> => {
      const posts = await postApi.getRecommendedPosts(userId, 0, PAGE_SIZE, PostTypes.PHOTO);
      return posts as PhotoPost[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
