import { Comment, CreateComment } from '@/types/comment';
import { PaginatedResponse } from '@/types/pagination';
import { UserOverview } from '@/types/user';
import { mockUser, mockFollowedUser, mockPrivateUser } from './user';

// Reuse existing mock users from user.ts
const mockUsers: UserOverview[] = [mockUser, mockFollowedUser, mockPrivateUser];

// Mock comment data
const mockComments: Comment[] = [
  {
    id: '1',
    post_id: '1',
    author: mockUsers[0], // mockUser
    message: 'Great post! This is really helpful.',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    reply_to: null,
    replies: [
      {
        id: '2',
        post_id: '1',
        author: mockUsers[1], // mockFollowedUser
        message: 'I totally agree with this approach. Thanks for sharing!',
        created_at: '2024-01-15T11:15:00Z',
        updated_at: '2024-01-15T11:15:00Z',
        reply_to: '1',
      },
    ],
  },
  {
    id: '2',
    post_id: '1',
    author: mockUsers[1], // mockFollowedUser
    message: 'I totally agree with this approach. Thanks for sharing!',
    created_at: '2024-01-15T11:15:00Z',
    updated_at: '2024-01-15T11:15:00Z',
    reply_to: null,
  },
];

export const mockGetComments = (
  postId: string,
  page: number = 1,
  pageSize: number = 25
): PaginatedResponse<Comment> => {
  console.log('mockGetComments', postId, page, pageSize);
  const postComments = mockComments.filter((comment) => comment.post_id == postId);

  // Calculate pagination
  const totalItems = postComments.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = postComments.slice(startIndex, endIndex);

  return {
    data: items,
    page,
    total: totalItems,
    total_pages: totalPages,
    is_last_page: page >= totalPages,
  };
};

export const mockCreateComment = (data: CreateComment): Comment => {
  // Use the current user (mockUser) as the author for new comments
  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    post_id: data.post_id,
    author: mockUser, // Use existing mockUser as current user
    message: data.message,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reply_to: data.reply_to || null,
  };

  // Add to mock data
  mockComments.push(newComment);

  return newComment;
};

export const mockDeleteComment = (commentId: string): void => {
  const index = mockComments.findIndex((comment) => comment.id === commentId);
  if (index !== -1) {
    mockComments.splice(index, 1);
  }
};
