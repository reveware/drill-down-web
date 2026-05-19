import { z } from 'zod';
import { UserFieldsSchema } from './user-fields';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}

export const UserOverviewSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().url().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.string(),
  tagline: z.string().nullable(),
  role: z.nativeEnum(UserRole),
  is_onboarded: z.boolean(),

  is_private: z.boolean(),
  is_self: z.boolean(),
  is_following: z.boolean(),
  is_follower: z.boolean(),
  is_mutual: z.boolean(),
  is_pending_follow: z.boolean(),
  is_pending_follower: z.boolean(),
  follow_request_id: z.string().optional(),

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
  created_locked_posts: z.number(),
  received_locked_posts: z.number(),
});

export type UserDetail = z.infer<typeof UserDetailSchema>;

export const UpdateUserSchema = UserFieldsSchema.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

// Stricter than UpdateUserSchema: onboarding requires username + date_of_birth
export const OnboardingFormSchema = UserFieldsSchema.pick({
  username: true,
  date_of_birth: true,
  tagline: true,
  avatar: true,
}).required({
  username: true,
  date_of_birth: true,
});

export type OnboardingDto = z.infer<typeof OnboardingFormSchema>;
