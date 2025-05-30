import { z } from 'zod';

export const UserRole = z.enum(['ADMIN', 'USER']);

export const UserOverviewSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.string(),
  tagline: z.string().nullable(),
  role: UserRole,

  is_self: z.boolean(),
  is_following: z.boolean(),
  is_followed_by: z.boolean(),

  created_at: z.string(),
  updated_at: z.string(),
});

export type UserOverview = z.infer<typeof UserOverviewSchema>;
