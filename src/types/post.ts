import { z } from 'zod';
import { UserOverviewSchema } from './user';

export enum PostTypes {
  PHOTO = 'PHOTO',
  QUOTE = 'QUOTE',
}

export const PhotoPostContentSchema = z.object({
  urls: z.array(z.string().url()),
});

export const QuotePostContentSchema = z.object({
  quote: z.string(),
  author: z.string(),
  date: z.string().datetime().optional(),
  location: z.string().optional(),
});

const BasePostSchema = z.object({
  id: z.string(),
  author: UserOverviewSchema,
  description: z.string().nullable(),
  like_count: z.number(),
  comment_count: z.number(),
  tags: z.array(z.string()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const PhotoPostSchema = BasePostSchema.extend({
  type: z.literal(PostTypes.PHOTO),
  content: PhotoPostContentSchema,
});

export const QuotePostSchema = BasePostSchema.extend({
  type: z.literal(PostTypes.QUOTE),
  content: QuotePostContentSchema,
});

export const PostOverviewSchema = z.discriminatedUnion('type', [PhotoPostSchema, QuotePostSchema]);

export type PhotoPostContent = z.infer<typeof PhotoPostContentSchema>;
export type QuotePostContent = z.infer<typeof QuotePostContentSchema>;
export type PhotoPost = z.infer<typeof PhotoPostSchema>;
export type QuotePost = z.infer<typeof QuotePostSchema>;
export type PostOverview = z.infer<typeof PostOverviewSchema>;

export const PostSearchParamsSchema = z.object({
  id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  authorId: z.string().optional(),
  created_before: z.string().datetime().optional(),
  created_after: z.string().datetime().optional(),
});

export type PostSearchParams = z.infer<typeof PostSearchParamsSchema>;

export const createPostBaseSchema = z.object({
  tags: z.array(z.string()),
  description: z.string().optional(),
});

export const createPhotoPostSchema = createPostBaseSchema.extend({
  type: z.literal(PostTypes.PHOTO),
  photos: z.array(z.instanceof(File)),
});

export type CreatePhotoPost = z.infer<typeof createPhotoPostSchema>;

export const createQuotePostSchema = createPostBaseSchema.extend({
  type: z.literal(PostTypes.QUOTE),
  quote: z.string().min(1, 'Quote is required'),
  author: z.string().min(1, 'Author is required'),
  date: z.string().optional(),
  location: z.string().optional(),
});

export type CreateQuotePost = z.infer<typeof createQuotePostSchema>;

export const createPostSchema = z.discriminatedUnion('type', [
  createPhotoPostSchema,
  createQuotePostSchema,
]);

export type CreatePost = z.infer<typeof createPostSchema>;
