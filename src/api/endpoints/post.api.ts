import { apiClient } from '../client';
import {
  PhotoPost,
  PostOverview,
  PostSearchParams,
  QuotePost,
  PostTypes,
  CreatePost,
  CreateQuotePost,
  CreatePhotoPost,
} from '@/types/post';
import { mockFetchPosts, quotePost } from '@/mocks/post';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const PostApi = {
  getFeedPosts: async (
    page: number = PAGE_NUMBER,
    limit: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostOverview>> => {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (await apiClient.get<PaginatedResponse<PostOverview>>('/posts/feed')).data;
  },

  searchPosts: async (
    search: PostSearchParams,
    page: number = PAGE_NUMBER,
    limit: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostOverview>> => {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (
      await apiClient.get<PaginatedResponse<PostOverview>>('/posts', {
        params: { ...search, page, limit },
      })
    ).data;
  },

  getRecommendedPosts: async <T extends PhotoPost | QuotePost>(
    userId: string,
    type: PostTypes = PostTypes.PHOTO,
    page: number = PAGE_NUMBER,
    limit: number = PAGE_SIZE
  ): Promise<PaginatedResponse<T>> => {
    if (useMocks) {
      return (await mockFetchPosts(page, limit, type)) as PaginatedResponse<T>;
    }
    return (
      await apiClient.get<PaginatedResponse<T>>('/posts/recommended', {
        params: { userId, type, page, limit },
      })
    ).data;
  },

  createPhotoPost: async (post: CreatePhotoPost): Promise<PostOverview> => {
    const formData = new FormData();
    formData.append('type', post.type);
    post.photos.forEach((file) => formData.append('photos', file));
    post.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));

    if (post.description) {
      formData.append('description', post.description);
    }

    return (
      await apiClient.post('/posts/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    ).data;
  },

  createQuotePost: async (post: CreateQuotePost): Promise<PostOverview> => {
    if (useMocks) {
      return quotePost(Math.random().toString(36).substring(2, 15));
    }
    return (await apiClient.post('/posts/quote', post)).data;
  },

  deletePost: async (postId: string): Promise<boolean> => {
    console.log('deletePost', postId);
    if (useMocks) {
      return true;
    }
    return (await apiClient.delete(`/posts/${postId}`)).data;
  },
};
