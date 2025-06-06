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

  is_private: z.boolean(),
  is_self: z.boolean(),
  is_following: z.boolean(),
  is_followed_by: z.boolean(),

  last_seen: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserOverview = z.infer<typeof UserOverviewSchema>;

export const UserDetailSchema = UserOverviewSchema.extend({
  posts_count: z.number(),
  likes_count: z.number(),
  followers_count: z.number(),
  following_count: z.number(),
  created_time_bombs: z.number(),
  received_time_bombs: z.number().nullable(),
});

export type UserDetail = z.infer<typeof UserDetailSchema>;

export const TagCountSchema = z.object({
  tag: z.string(),
  count: z.number(),
});

export type TagCount = z.infer<typeof TagCountSchema>;
