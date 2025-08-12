import {
  UserRecommendation,
  RecommendationReason,
  PostRecommendation,
} from '@/types/recommendations';
import { AffinityType, AffinityScore, Affinity } from '@/types/affinity';
import { mockAdmin, mockUser } from './user';
import { PaginatedResponse } from '@/types/pagination';
import { imagePost } from './post';

const mockSharedAffinities: Affinity[] = [
  { type: AffinityType.TAG, name: 'photography', slug: 'photography', score: 0.8 },
  { type: AffinityType.TAG, name: 'travel', slug: 'travel', score: 0.7 },
  { type: AffinityType.THEME, name: 'adventure', slug: 'adventure', score: 0.6 },
];

const mockRecommendationAffinityScore: AffinityScore = {
  overall: 0.75,
  percentage_asymmetric: 0.3,
  percentage_symmetric: 0.7,
  weighted_jaccard: 0.72,
  cosine_similarity: 0.78,
  by_type: {
    [AffinityType.TAG]: {
      overall: 0.8,
      strength: 0.85,
      percentage_asymmetric: 0.3,
      percentage_symmetric: 0.7,
      weighted_jaccard: 0.72,
      cosine_similarity: 0.78,
      counts: { a: 15, b: 12, shared: 8 },
      weights: { a: 0.6, b: 0.5, overlap: 0.4 },
      affinities: {
        shared: mockSharedAffinities,
        only_a: [],
        only_b: [],
      },
    },
    [AffinityType.THEME]: {
      overall: 0.65,
      strength: 0.7,
      percentage_asymmetric: 0.4,
      percentage_symmetric: 0.6,
      weighted_jaccard: 0.58,
      cosine_similarity: 0.62,
      counts: { a: 8, b: 10, shared: 5 },
      weights: { a: 0.4, b: 0.5, overlap: 0.3 },
      affinities: {
        shared: [],
        only_a: [],
        only_b: [],
      },
    },
  },
  profiles: {
    a: {
      [AffinityType.TAG]: 0.8,
      [AffinityType.THEME]: 0.7,
    },
    b: {
      [AffinityType.TAG]: 0.75,
      [AffinityType.THEME]: 0.8,
    },
  },
  meta: {
    coverage: 0.85,
    budgets: {
      [AffinityType.TAG]: 0.4,
      [AffinityType.THEME]: 0.6,
    },
    alphas: {
      [AffinityType.TAG]: 0.8,
      [AffinityType.THEME]: 0.7,
    },
    type_order: [AffinityType.TAG, AffinityType.THEME],
  },
};

export const userAffinityRecommendationMock: UserRecommendation = {
  user: mockUser,
  reason: RecommendationReason.AFFINITY,
  match: mockRecommendationAffinityScore,
};

export const userPopularRecommendationMock: UserRecommendation = {
  user: mockAdmin,
  reason: RecommendationReason.POPULAR,
  // No match property for popular recommendations (optional)
};

export const postAffinityRecommendationMock: PostRecommendation = {
  post: imagePost('1'),
  reason: RecommendationReason.AFFINITY,
  match: mockRecommendationAffinityScore,
};

export const postPopularRecommendationMock: PostRecommendation = {
  post: imagePost('2'),
  reason: RecommendationReason.POPULAR,
  match: mockRecommendationAffinityScore, // PostRecommendation requires match property
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
