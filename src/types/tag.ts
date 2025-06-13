import { z } from 'zod';

export const TagCountSchema = z.object({
  tag: z.string(),
  count: z.number(),
});

export type TagCount = z.infer<typeof TagCountSchema>;

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  usage_count: z.number(),
});

export type Tag = z.infer<typeof TagSchema>;

export const TrendingTagSchema = TagSchema.extend({
  recent_usage_count: z.number(),
});

export type TrendingTag = z.infer<typeof TrendingTagSchema>;
