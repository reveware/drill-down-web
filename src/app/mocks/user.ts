import { UserOverview, UserRole } from '@/app/types/user';

export const mockUser: UserOverview = {
  id: 1,
  username: 'johndoe',
  email: 'john@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  first_name: 'John',
  last_name: 'Doe',
  date_of_birth: '1990-01-01',
  tagline: 'Exploring the world, one pixel at a time.',
  role: UserRole.USER,
  created_at: '2023-05-01T12:00:00Z',
  updated_at: '2025-05-01T12:00:00Z',
};

export const mockAdmin: UserOverview = {
  ...mockUser,
  id: 2,
  username: 'adminjane',
  email: 'jane@admin.com',
  avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  first_name: 'Jane',
  last_name: 'Admin',
  role: UserRole.ADMIN,
};
