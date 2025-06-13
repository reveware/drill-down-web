import { useQuery } from '@tanstack/react-query';
import { PhotoPost, PostOverview, PostTypes } from '@/types/post';
import { postApi } from '@/api/endpoints/post.api';
import { PaginatedResponse } from '@/types/pagination';

export const useRecommendedPhotoPosts = (userId: number) => {
  const PAGE_SIZE = 20;

  const query = useQuery({
    queryKey: ['recommended-photo-posts'],
    queryFn: async (): Promise<PaginatedResponse<PhotoPost>> => {
      return await postApi.getRecommendedPosts(userId, 0, PAGE_SIZE, PostTypes.PHOTO);
    },
    staleTime: 5 * 60 * 1000,
  });

  const posts = query.data?.data ?? [];

  return {
    posts,
    isLoading: query.isLoading,
  };
};
