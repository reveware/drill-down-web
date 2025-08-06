import {
  UserRecommendation,
  RecommendationReason,
  PostRecommendation,
} from '@/types/recommendations';
import { mockAdmin, mockUser } from './user';
import { PaginatedResponse } from '@/types/pagination';
import { photoPost } from './post';

export const userAffinityRecommendationMock: UserRecommendation = {
  user: mockUser,
  reason: RecommendationReason.AFFINITY,
  match: {
    percentage: 100,
    strength: 55,
    shared_affinities: [],
  },
};

export const userPopularRecommendationMock: UserRecommendation = {
  user: mockAdmin,
  reason: RecommendationReason.POPULAR,
  match: {
    percentage: null,
    strength: null,
    shared_affinities: [],
  },
};

export const postAffinityRecommendationMock: PostRecommendation = {
  post: photoPost('1'),
  reason: RecommendationReason.AFFINITY,
  match: {
    percentage: 100,
    strength: 55,
    shared_affinities: [],
  },
};

export const postPopularRecommendationMock: PostRecommendation = {
  post: photoPost('2'),
  reason: RecommendationReason.POPULAR,
  match: {
    percentage: null,
    strength: null,
    shared_affinities: [],
  },
};

export const mockFetchUserRecommendations = async (): Promise<
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

export const mockFetchPostRecommendations = async (): Promise<
  PaginatedResponse<PostRecommendation>
> => {
  return {
    page: 1,
    total: 2,
    total_pages: 1,
    is_last_page: true,
    data: [postAffinityRecommendationMock, postPopularRecommendationMock],
  };
};
