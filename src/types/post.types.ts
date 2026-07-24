import { z } from 'zod';
import { UserOverviewSchema } from './user.types';

export const PostTagSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export type PostTag = z.infer<typeof PostTagSchema>;

const PostImageSchema = z.object({
  url: z.string().url(),
  meta: z.object({
    width: z.number(),
    height: z.number(),
    aspect_ratio: z.number(),
    byte_size: z.number(),
    mime_type: z.string(),
  }),
});

export const PostOverviewSchema = z.object({
  id: z.string(),
  author: UserOverviewSchema,
  description: z.string().nullable(),
  like_count: z.number(),
  comment_count: z.number(),
  tags: z.array(PostTagSchema).min(1, 'At least one tag is required'),
  is_liked: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  images: z.array(PostImageSchema),
});

export type PostOverview = z.infer<typeof PostOverviewSchema>;

export const PostSearchParamsSchema = z.object({
  ids: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  authorId: z.string().optional(),
  created_before: z.string().datetime().optional(),
  created_after: z.string().datetime().optional(),
});

export type PostSearchParams = z.infer<typeof PostSearchParamsSchema>;

export const createPostSchema = z.object({
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  description: z.string().optional(),
  images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
});

export type CreatePost = z.infer<typeof createPostSchema>;
