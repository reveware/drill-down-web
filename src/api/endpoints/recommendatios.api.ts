import { apiClient } from '../client';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';
import { PaginatedResponse } from '@/types/pagination';
import { UserRecommendation, UserRecommendationReason } from '@/types/recommendations';
import { mockFetchRecommendations } from '@/mocks/recommendations';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const RecommendationApi = {
  getRecommendations: async (
    userId: string,
    reason: UserRecommendationReason,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<UserRecommendation>> => {
    if (useMocks) {
      return mockFetchRecommendations();
    }

    return (
      await apiClient.get(`/users/${userId}/recommendations`, {
        params: {
          reason,
          page,
          page_size: pageSize,
        },
      })
    ).data;
  },
};
