import { apiClient } from '../client';
import { Comment, CreateComment, CommentResponse } from '@/types/comment';
import { PaginatedResponse } from '@/types/pagination';

export const CommentApi = {
  getComments: async (postId: string, page: number = 1): Promise<PaginatedResponse<Comment>> => {
    const response = await apiClient.get(`/posts/${postId}/comments?page=${page}`);
    return response.data;
  },

  createComment: async (data: CreateComment): Promise<Comment> => {
    const response = await apiClient.put(`/posts/${data.post_id}/comments`, {
      message: data.message,
      reply_to: data.reply_to,
    });
    return response.data;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    await apiClient.delete(`/comments/${commentId}`);
  },
};
