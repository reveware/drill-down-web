import { apiClient } from '../client';
import { PostOverview, PostSearchParams, CreateQuotePost, CreateImagePost } from '@/types/post';
import { mockFetchPosts, quotePost } from '@/mocks/post';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const PostApi = {
  getFeedPosts: async (
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostOverview>> => {
    if (useMocks) {
      return await mockFetchPosts(page, pageSize);
    }
    return (await apiClient.get<PaginatedResponse<PostOverview>>('/posts/feed')).data;
  },

  searchPosts: async (
    search: PostSearchParams,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostOverview>> => {
    if (useMocks) {
      return await mockFetchPosts(page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<PostOverview>>('/posts', {
        params: { ...search, page, page_size: pageSize },
      })
    ).data;
  },

  createImagePost: async (post: CreateImagePost): Promise<PostOverview> => {
    const formData = new FormData();
    formData.append('type', post.type);
    post.images.forEach((file) => formData.append('images', file));
    post.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));

    if (post.description) {
      formData.append('description', post.description);
    }

    return (
      await apiClient.post('/posts/image', formData, {
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
