import { apiClient } from '../client';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';
import { PaginatedResponse } from '@/types/pagination';
import {
  PostRecommendation,
  RecommendationReason,
  UserRecommendation,
} from '@/types/recommendations';
import {
  mockFetchPostRecommendations,
  mockFetchUserRecommendations,
} from '@/mocks/recommendations';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const RecommendationApi = {
  getRecommendations: async (
    userId: string,
    reason: RecommendationReason,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<UserRecommendation>> => {
    if (useMocks) {
      return mockFetchUserRecommendations();
    }

    return (
      await apiClient.get(`/recommendations/users`, {
        params: {
          reason,
          page,
          page_size: pageSize,
        },
      })
    ).data;
  },

  getRecommendedPosts: async (
    userId: string,
    reason: RecommendationReason,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostRecommendation>> => {
    if (useMocks) {
      return await mockFetchPostRecommendations();
    }
    return (
      await apiClient.get<PaginatedResponse<PostRecommendation>>('/recommendations/posts', {
        params: { userId, reason, page, page_size: pageSize },
      })
    ).data;
  },
};
