import { useQuery } from '@tanstack/react-query';
import { PhotoPost, PostTypes } from '@/types/post';
import { fetchMockPosts } from '@/mocks/posts';

export const useRecommendedPhotoPosts = () => {
  return useQuery({
    queryKey: ['recommended-photo-posts'],
    queryFn: async (): Promise<PhotoPost[]> => {
      const posts = await fetchMockPosts(0, 20, PostTypes.PHOTO);
      return posts as PhotoPost[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
