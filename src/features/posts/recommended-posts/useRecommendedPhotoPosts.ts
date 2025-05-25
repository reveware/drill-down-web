import { useQuery } from '@tanstack/react-query';
import { PhotoPost, PostOverview, PostTypes } from '@/types/post';
import { fetchMockPosts } from '@/mocks/posts';

export const useRecommendedPhotoPosts = () => {
  return useQuery({
    queryKey: ['recommended-photo-posts'],
    queryFn: async (): Promise<PhotoPost[]> => {
      // Fetch only photo posts from the backend
      const posts = await fetchMockPosts(0, 20, PostTypes.PHOTO);
      return posts as PhotoPost[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
