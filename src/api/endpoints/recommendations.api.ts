import { apiClient } from '../client';
import { PAGE_NUMBER, PAGE_SIZE, USE_MOCKS } from '../constants';
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

export const RecommendationApi = {
  getRecommendations: async (
    userId: string,
    reason: RecommendationReason,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<UserRecommendation>> => {
    if (USE_MOCKS) {
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
    if (USE_MOCKS) {
      return await mockFetchPostRecommendations();
    }
    return (
      await apiClient.get<PaginatedResponse<PostRecommendation>>('/recommendations/posts', {
        params: { userId, reason, page, page_size: pageSize },
      })
    ).data;
  },
};
