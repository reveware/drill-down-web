import { UserRecommendation, UserRecommendationReason } from '@/types/recommendations';
import { mockAdmin, mockUser } from './user';
import { PaginatedResponse } from '@/types/pagination';

export const userAffinityRecommendationMock: UserRecommendation = {
  user: mockUser,
  reason: UserRecommendationReason.AFFINITY,
  match: {
    percentage: 100,
    strength: 55,
    shared_affinities: [],
  },
};

export const userPopularRecommendationMock: UserRecommendation = {
  user: mockAdmin,
  reason: UserRecommendationReason.POPULAR,
  match: {
    percentage: null,
    strength: null,
    shared_affinities: [],
  },
};

export const mockFetchRecommendations = async (): Promise<
  PaginatedResponse<UserRecommendation>
> => {
  return {
    page: 1,
    total: 2,
    total_pages: 1,
    is_last_page: true,
    data: [userAffinityRecommendationMock, userPopularRecommendationMock],
  };
};
