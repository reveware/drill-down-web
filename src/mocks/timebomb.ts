import { TimeBomb } from '@/types/time-bombs';
import { UserRole } from '@/types/user';
import { mockUser } from './user';

export const mockTimeBomb: TimeBomb = {
  id: 1,
  author: mockUser,
  recipient: mockUser,
  content: null,
  unlocks_at: new Date(Date.now() + 3600 * 1000).toISOString(), // unlocks in 1 hour
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockTimeBomb2: TimeBomb = {
  id: 2,
  author: {
    id: 2,
    username: 'astro.jane',
    email: 'jane@example.com',
    avatar: '/assets/images/avatar2.jpg',
    first_name: 'Jane',
    last_name: 'Doe',
    date_of_birth: '1992-05-15',
    tagline: 'Rocket scientist',
    role: UserRole.ADMIN,
    created_at: '2021-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
  },
  recipient: mockUser,
  content: null,
  unlocks_at: new Date(Date.now() + 7200 * 1000).toISOString(), // unlocks in 2 hours
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
