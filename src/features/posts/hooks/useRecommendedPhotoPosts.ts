import { useQuery } from '@tanstack/react-query';
import { PhotoPost, PostTypes } from '@/types/post';
import { PostApi } from '@/api/endpoints/post.api';
import { PaginatedResponse } from '@/types/pagination';

export const useRecommendedPhotoPosts = (userId: string) => {
  const query = useQuery({
    queryKey: ['recommended-photo-posts'],
    queryFn: async (): Promise<PaginatedResponse<PhotoPost>> => {
      return await PostApi.getRecommendedPosts(userId, PostTypes.PHOTO, 1, 12);
    },

    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const posts = query.data?.data ?? [];

  return {
    posts,
    isLoading: query.isLoading,
  };
};
