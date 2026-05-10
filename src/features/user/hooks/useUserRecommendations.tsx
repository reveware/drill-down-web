import { PAGE_NUMBER, PAGE_SIZE } from '@/api/defaults';
import { RecommendationApi } from '@/api/endpoints/recommendatios.api';
import { PaginatedResponse } from '@/types/pagination';
import { UserRecommendation, RecommendationReason } from '@/types/recommendations';
import { useQuery } from '@tanstack/react-query';

export const useUserRecommendations = (
  userId: string,
  reason: RecommendationReason = RecommendationReason.AFFINITY,
  page: number = PAGE_NUMBER,
  pageSize: number = PAGE_SIZE
) => {
  return useQuery<PaginatedResponse<UserRecommendation>, Error>({
    queryKey: ['user-recommendations', userId, reason, page, pageSize],
    queryFn: () => RecommendationApi.getRecommendations(userId, reason, page, pageSize),
  });
};
