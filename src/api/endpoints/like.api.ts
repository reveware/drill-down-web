import { apiClient } from '../client';

export const LikeApi = {
  likePost: async (postId: string) => {
    return (await apiClient.post(`/posts/${postId}/likes`)).data;
  },
  unlikePost: async (postId: string) => {
    return (await apiClient.delete(`/posts/${postId}/likes`)).data;
  },
};
