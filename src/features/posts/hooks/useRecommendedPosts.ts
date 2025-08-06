import { useQuery } from '@tanstack/react-query';
import { PaginatedResponse } from '@/types/pagination';
import { PostRecommendation, RecommendationReason } from '@/types/recommendations';
import { RecommendationApi } from '@/api/endpoints/recommendatios.api';

export const useRecommendedPosts = (userId: string) => {
  const query = useQuery({
    queryKey: ['recommended-posts'],
    queryFn: async (): Promise<PaginatedResponse<PostRecommendation>> => {
      return await RecommendationApi.getRecommendedPosts(
        userId,
        RecommendationReason.AFFINITY,
        1,
        12
      );
    },

    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const recommendations = query.data?.data ?? [];

  return {
    recommendations,
    isLoading: query.isLoading,
  };
};
