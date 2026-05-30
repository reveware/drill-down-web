import { apiClient } from '../client';
import { UserReward, RewardAssetType } from '@/types/reward';
import {
  mockFetchActiveRewardGenerations,
  mockFetchRewards,
  mockRetryRewardGeneration,
} from '@/mocks/rewards';
import { PaginatedResponse } from '@/types/pagination';
import { JobStatus, RewardGeneration } from '@/types/rewardGeneration';
import { PAGE_NUMBER, PAGE_SIZE, USE_MOCKS } from '../constants';

export const RewardsApi = {
  getUserRewards: async (
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<UserReward>> => {
    if (USE_MOCKS) {
      return await mockFetchRewards(page, pageSize);
    }
    return (await apiClient.get<PaginatedResponse<UserReward>>('/rewards')).data;
  },

  revealReward: async (rewardId: string): Promise<UserReward> => {
    if (USE_MOCKS) {
      return {
        id: rewardId,
        description: 'A beautiful AI-generated landscape with mountains and rivers',
        type: RewardAssetType.IMAGE,
        content: 'https://picsum.photos/400/600?random=1',
        revealed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    return (await apiClient.post<UserReward>(`/rewards/${rewardId}/reveal`)).data;
  },

  getActiveRewardGenerations: async (
    statuses: JobStatus[]
  ): Promise<PaginatedResponse<RewardGeneration>> => {
    if (USE_MOCKS) {
      return await mockFetchActiveRewardGenerations(statuses);
    }
    return (
      await apiClient.get<PaginatedResponse<RewardGeneration>>('/reward-generations', {
        params: { status: statuses, page: 1, page_size: 50 },
      })
    ).data;
  },

  retryRewardGeneration: async (id: string): Promise<RewardGeneration> => {
    if (USE_MOCKS) {
      return await mockRetryRewardGeneration(id);
    }
    return (await apiClient.post<RewardGeneration>(`/reward-generations/${id}/retry`)).data;
  },
};
