import { apiClient } from '../client';
import { PostOverview, PostSearchParams, PostTypes } from '@/types/post';
import { mockFetchPosts } from '@/mocks/post';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const postApi = {
  getFeedPosts: async (page: number, limit: number): Promise<PostOverview[]> => {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (await apiClient.get<PostOverview[]>('/posts/feed')).data;
  },

  getRecommendedPosts: async (
    userId: number,
    page: number,
    limit: number,
    type: PostTypes = PostTypes.PHOTO
  ): Promise<PostOverview[]> => {
    if (useMocks) {
      return await mockFetchPosts(page, limit, type);
    }
    return (
      await apiClient.get<PostOverview[]>('/posts/recommended', {
        params: { userId, type, page, limit },
      })
    ).data;
  },

  async searchPosts(
    search: PostSearchParams,
    page: number,
    limit: number
  ): Promise<PostOverview[]> {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (
      await apiClient.get<PostOverview[]>('/posts', {
        params: { ...search, page, limit },
      })
    ).data;
  },
};
