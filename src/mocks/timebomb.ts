import { TimeBomb } from '@/types/time-bombs';

import { mockUser } from './user';
import { add } from 'date-fns';

export const mockTimeBomb: TimeBomb = {
  id: 1,
  author: mockUser,
  recipient: mockUser,
  content: null,
  unlocks_at: new Date(add(new Date(), { months: 0, days: 13 })).toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockTimeBomb2: TimeBomb = {
  id: 2,
  author: mockUser,
  recipient: mockUser,
  content: null,
  unlocks_at: new Date(add(new Date(), { hours: 2 })).toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
