import { sleep } from '@/lib/utils';
import { UserDetail, UserOverview, UserRole } from '@/types/user';
import { TagCount } from '@/types/tag';
import { PaginatedResponse } from '@/types/pagination';

export const mockUser: UserOverview = {
  id: '1',
  username: 'johndoe',
  email: 'john@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  first_name: 'John',
  last_name: 'Doe',
  date_of_birth: '1990-01-01',
  tagline: 'Exploring the world, one pixel at a time.',
  role: UserRole.enum.USER,
  created_at: '2023-05-01T12:00:00Z',
  updated_at: '2025-05-01T12:00:00Z',
  last_seen: '2025-03-15T10:30:00Z',
  is_private: false,
  is_self: true,
  is_following: false,
  is_follower: false,
  is_mutual: false,
  is_pending_follow: false,
  is_pending_follower: false,
};

export const mockAdmin: UserOverview = {
  ...mockUser,
  id: '2',
  username: 'adminjane',
  email: 'jane@admin.com',
  avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  first_name: 'Jane',
  last_name: 'Admin',
  role: UserRole.enum.ADMIN,
  last_seen: '2025-03-15T10:30:00Z',
  is_private: false,
  is_self: false,
  is_following: false,
  is_follower: false,
  is_mutual: false,
  is_pending_follow: false,
  is_pending_follower: false,
};

export const mockPrivateUser: UserOverview = {
  id: '3',
  username: 'privatebob',
  email: 'bob@private.com',
  avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
  first_name: 'Bob',
  last_name: 'Private',
  date_of_birth: '1985-06-15',
  tagline: 'This is a private account.',
  role: UserRole.enum.USER,
  created_at: '2023-03-15T10:30:00Z',
  updated_at: '2025-03-15T10:30:00Z',
  last_seen: '2025-03-15T10:30:00Z',
  is_private: true,
  is_self: false,
  is_following: false,
  is_follower: false,
  is_mutual: false,
  is_pending_follow: false,
  is_pending_follower: false,
};

export const mockFollowedUser: UserOverview = {
  id: '4',
  username: 'friendalice',
  email: 'alice@friend.com',
  avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  first_name: 'Alice',
  last_name: 'Friend',
  date_of_birth: '1992-08-20',
  tagline: 'We are connected!',
  role: UserRole.enum.USER,
  created_at: '2023-08-20T14:15:00Z',
  updated_at: '2025-08-20T14:15:00Z',
  last_seen: '2025-03-15T09:45:00Z',
  is_private: false,
  is_self: false,
  is_following: true,
  is_follower: true,
  is_mutual: true,
  is_pending_follow: false,
  is_pending_follower: false,
};

export const mockFetchUser = async (userId: string): Promise<UserDetail> => {
  console.log('mockFetchUser', userId);
  const users = [mockUser, mockPrivateUser, mockFollowedUser, mockAdmin];
  const user = users[Math.floor(Math.random() * users.length)];

  const posts_count = Math.floor(Math.random() * 100);
  const likes_count = Math.floor(Math.random() * 100);
  const followers_count = Math.floor(Math.random() * 100);
  const following_count = Math.floor(Math.random() * 100);
  const created_locked_posts = Math.floor(Math.random() * 100);
  const received_locked_posts = Math.floor(Math.random() * 100);

  return {
    ...user,
    posts_count,
    likes_count,
    followers_count,
    following_count,
    created_locked_posts,
    received_locked_posts,
  };
};

export const mockFetchFollowers = async (
  userId: string,
  page: number,
  pageSize: number
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

export const mockFetchTags = async (_: string): Promise<TagCount[]> => {
  await sleep(3);
  const tags: TagCount[] = [
    { tag: 'nostalgia', count: 500 },
    { tag: 'movies', count: 300 },
    { tag: 'music', count: 1000 },
    { tag: 'sexy', count: 400 },
    { tag: 'quotes', count: 600 },
    { tag: 'illustration', count: 800 },
    { tag: 'dogs', count: 200 },
    { tag: 'cats', count: 200 },
    { tag: 'food', count: 14 },
    { tag: 'travel', count: 200 },
    { tag: 'fashion', count: 200 },
    { tag: 'art', count: 200 },
  ];
  return tags;
};
