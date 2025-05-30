import { apiClient } from '../client';
import { ApiResponse } from '@/types/response';
import { PostOverview, PostTypes } from '@/types/post';
import { mockFetchPosts } from '@/mocks/posts';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const postApi = {
  getFeed: async (page: number, limit: number): Promise<PostOverview[]> => {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (await apiClient.get<ApiResponse<PostOverview[]>>('/posts/feed')).data.data;
  },

  getRecommended: async (
    userId: number,
    type: PostTypes = PostTypes.PHOTO
  ): Promise<PostOverview[]> => {
    if (useMocks) {
      return await mockFetchPosts(1, 12, type);
    }
    return (
      await apiClient.get<ApiResponse<PostOverview[]>>('/posts/recommended', {
        params: { userId, type },
      })
    ).data.data;
  },
};
