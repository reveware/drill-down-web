import { apiClient } from '../client';
import { ApiResponse } from '@/types/response';
import { UserOverview } from '@/types/user';
import { mockFetchUser } from '@/mocks/user';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const userApi = {
  getUser: async (userId: number): Promise<UserOverview> => {
    if (useMocks) {
      return mockFetchUser(userId);
    }
    return (await apiClient.get<ApiResponse<UserOverview>>(`/users/${userId}`)).data.data;
  },
};
