import { UserOverview, UserRole } from '@/types/user';
import { PostOverview, PostTypes } from '@/types/post';

const mockUser: UserOverview = {
  id: 1,
  username: 'P.QN',
  email: 'ricardo@example.com',
  avatar: '/assets/images/avatar1.jpg',
  first_name: 'Ricardo',
  last_name: 'Rincon',
  date_of_birth: '1990-01-01',
  tagline: 'Space enthusiast',
  role: UserRole.USER,
  created_at: '2020-01-01T00:00:00.000Z',
  updated_at: '2023-01-01T00:00:00.000Z',
};

const mockPosts: PostOverview[] = [
  {
    id: 1,
    author: mockUser,
    description: 'Lorem ipsum dolor sit amet...',
    like_count: 26,
    comment_count: 14,
    tags: [],
    created_at: '2024-06-01T12:00:00.000Z',
    updated_at: '2024-06-01T12:00:00.000Z',
    type: PostTypes.PHOTO,
    content: {
      urls: ['/assets/images/astronaut.jpg'],
    },
  },
  {
    id: 2,
    author: mockUser,
    description: 'Inspirational quote...',
    like_count: 8,
    comment_count: 3,
    tags: [],
    created_at: '2024-06-01T12:00:00.000Z',
    updated_at: '2024-06-01T12:00:00.000Z',
    type: PostTypes.QUOTE,
    content: {
      quote: "The stars don't look bigger, but they do look brighter.",
      author: 'Sally Ride',
    },
  },
  // Add more mock posts as needed
];

export async function fetchMockPosts(page: number, pageSize: number): Promise<PostOverview[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 500));
  const start = page * pageSize;
  return mockPosts.slice(start, start + pageSize);
}
