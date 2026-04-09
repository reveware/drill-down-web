import { apiClient } from '../client';
import { Comment, CreateComment } from '@/types/comment';
import { PaginatedResponse } from '@/types/pagination';
import { USE_MOCKS } from '../constants';
import { mockGetComments, mockCreateComment, mockDeleteComment } from '@/mocks/comment';

export const CommentApi = {
  getComments: async (postId: string, page: number = 1): Promise<PaginatedResponse<Comment>> => {
    if (USE_MOCKS) {
      return mockGetComments(postId, page);
    }
    const response = await apiClient.get(`/posts/${postId}/comments?page=${page}`);
    return response.data;
  },

  createComment: async (data: CreateComment): Promise<Comment> => {
    if (USE_MOCKS) {
      return mockCreateComment(data);
    }
    const response = await apiClient.put(`/posts/${data.post_id}/comments`, {
      message: data.message,
      reply_to: data.reply_to,
    });
    return response.data;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    if (USE_MOCKS) {
      mockDeleteComment(commentId);
      return;
    }
    await apiClient.delete(`/comments/${commentId}`);
  },
};
