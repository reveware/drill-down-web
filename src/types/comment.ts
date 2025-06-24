import { z } from 'zod';
import { UserOverview, UserOverviewSchema } from './user';

export type Comment = {
  id: string;
  author: UserOverview;
  post_id: string;
  message: string;
  reply_to: string | null;
  replies?: Comment[];
  created_at: string;
  updated_at: string;
};
export const CommentSchema: z.ZodType<Comment> = z.object({
  id: z.string(),
  author: UserOverviewSchema,
  post_id: z.string(),
  message: z.string(),
  reply_to: z.string().nullable(),
  replies: z.array(z.lazy(() => CommentSchema)).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CreateCommentSchema = z.object({
  post_id: z.string(),
  message: z.string().min(1, 'Comment cannot be empty'),
  reply_to: z.string().nullable().optional(),
});

export const CommentResponseSchema = z.object({
  data: z.array(CommentSchema),
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  is_last_page: z.boolean(),
});

export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type CommentResponse = z.infer<typeof CommentResponseSchema>;
