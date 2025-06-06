import { sleep } from '@/lib/utils';
import { TagCount, UserDetail, UserOverview, UserRole } from '@/types/user';

export const mockUser: UserOverview = {
  id: 1,
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
  is_followed_by: false,
};

export const mockAdmin: UserOverview = {
  ...mockUser,
  id: 2,
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
  is_followed_by: false,
};

export const mockPrivateUser: UserOverview = {
  id: 3,
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
  is_followed_by: false,
};

export const mockFollowedUser: UserOverview = {
  id: 4,
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
  is_followed_by: true,
};

export const mockFetchUser = async (userId: number): Promise<UserDetail> => {
  let user: UserOverview;

  switch (userId) {
    case 1:
      user = mockUser;
      break;
    case 3:
      user = mockPrivateUser;
      break;
    case 4:
      user = mockFollowedUser;
      break;
    default:
      user = mockAdmin;
  }

  const posts_count = Math.floor(Math.random() * 100);
  const likes_count = Math.floor(Math.random() * 100);
  const followers_count = Math.floor(Math.random() * 100);
  const following_count = Math.floor(Math.random() * 100);
  const created_time_bombs = Math.floor(Math.random() * 100);
  const received_time_bombs = Math.floor(Math.random() * 100);

  return {
    ...user,
    posts_count,
    likes_count,
    followers_count,
    following_count,
    created_time_bombs,
    received_time_bombs,
  };
};

export const mockFetchFollowers = async (
  userId: number,
  page: number,
  pageSize: number
): Promise<UserOverview[]> => {
  await sleep(3);
  const friend = userId === 1 ? mockAdmin : mockUser;

  return Array.from({ length: pageSize }, (_, index) => ({
    ...friend,
    id: index,
  }));
};

export const mockFetchTags = async (_: number): Promise<TagCount[]> => {
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
