import { apiClient } from '../client';
import { UserReward, RewardAssetType } from '@/types/reward';
import { mockFetchRewards } from '@/mocks/rewards';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const RewardsApi = {
  getUserRewards: async (
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<UserReward>> => {
    if (useMocks) {
      return await mockFetchRewards(page, pageSize);
    }
    return (await apiClient.get<PaginatedResponse<UserReward>>('/rewards')).data;
  },

  revealReward: async (rewardId: string): Promise<UserReward> => {
    if (useMocks) {
      // Mock implementation - just return updated reward with revealed_at timestamp
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
};
