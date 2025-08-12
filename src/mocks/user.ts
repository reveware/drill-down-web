import { sleep } from '@/lib/utils';
import { UserDetail, UserOverview } from '@/types/user';
import { TagCount } from '@/types/tag';

export const mockUser: UserOverview = {
  id: '1',
  username: 'johndoe',
  email: 'john.doe@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  first_name: 'John',
  last_name: 'Doe',
  date_of_birth: '1990-01-01',
  tagline: 'Photography enthusiast',
  role: 'USER' as const,
  is_private: false,
  is_self: true,
  is_following: false,
  is_follower: false,
  is_mutual: false,
  is_pending_follow: false,
  is_pending_follower: false,
  last_seen: '2025-03-15T09:45:00Z',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2025-03-15T09:45:00Z',
};

export const mockAdmin: UserOverview = {
  id: '2',
  username: 'admin',
  email: 'admin@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  first_name: 'Admin',
  last_name: 'User',
  date_of_birth: '1985-01-01',
  tagline: 'System Administrator',
  role: 'ADMIN' as const,
  is_private: false,
  is_self: false,
  is_following: false,
  is_follower: false,
  is_mutual: false,
  is_pending_follow: false,
  is_pending_follower: false,
  last_seen: '2025-03-15T10:00:00Z',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2025-03-15T10:00:00Z',
};

export const mockPrivateUser: UserOverview = {
  id: '3',
  username: 'privateuser',
  email: 'private@example.com',
  avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  first_name: 'Private',
  last_name: 'User',
  date_of_birth: '1995-01-01',
  tagline: 'Private account',
  role: 'USER' as const,
  is_private: true,
  is_self: false,
  is_following: false,
  is_follower: false,
  is_mutual: false,
  is_pending_follow: false,
  is_pending_follower: false,
  last_seen: '2025-03-15T11:00:00Z',
  created_at: '2024-06-01T00:00:00Z',
  updated_at: '2025-03-15T11:00:00Z',
};

export const mockFollowedUser: UserOverview = {
  id: '4',
  username: 'janesmith',
  email: 'jane.smith@example.com',
  avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  first_name: 'Jane',
  last_name: 'Smith',
  date_of_birth: '1992-05-15',
  tagline: 'Travel lover',
  role: 'USER' as const,
  is_private: false,
  is_self: false,
  is_following: true,
  is_follower: true,
  is_mutual: true,
  is_pending_follow: false,
  is_pending_follower: false,
  last_seen: '2025-03-15T09:45:00Z',
  created_at: '2024-02-01T00:00:00Z',
  updated_at: '2025-03-15T09:45:00Z',
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
