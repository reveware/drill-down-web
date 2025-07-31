import { FollowRequest } from '@/types/follow';
import { UserOverview } from '@/types/user';
import { PaginatedResponse } from '@/types/pagination';
import { mockUser, mockAdmin, mockPrivateUser, mockFollowedUser } from './user';
import { sleep } from '@/lib/utils';

// Mock follow requests data
const mockFollowRequests: FollowRequest[] = [
  {
    id: 'fr1',
    requester: mockAdmin,
    recipient: mockUser,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'fr2',
    requester: mockPrivateUser,
    recipient: mockUser,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'fr3',
    requester: mockFollowedUser,
    recipient: mockUser,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
];

export const mockFetchPendingFollowRequests = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FollowRequest>> => {
  await sleep(3);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = mockFollowRequests.slice(startIndex, endIndex);

  const total = mockFollowRequests.length;
  const totalPages = Math.ceil(total / pageSize);
  const isLastPage = page >= totalPages;

  return {
    data: paginatedData,
    page: page,
    total: total,
    total_pages: totalPages,
    is_last_page: isLastPage,
  };
};

export const mockFetchFollowers = async (
  _userId: string,
  page: number,
  _pageSize: number
): Promise<PaginatedResponse<UserOverview>> => {
  await sleep(3);
  const followers = [mockUser, mockPrivateUser, mockFollowedUser, mockAdmin];
  return {
    page: page,
    total: followers.length,
    total_pages: 1,
    is_last_page: true,
    data: followers,
  };
};
