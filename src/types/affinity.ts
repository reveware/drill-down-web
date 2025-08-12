import { z } from 'zod';
import { UserOverviewSchema } from './user';

export enum AffinityType {
  TAG = 'TAG',
  THEME = 'THEME',
  STYLE = 'STYLE',
  MOOD = 'MOOD',
}

export const AffinitySchema = z.object({
  type: z.nativeEnum(AffinityType),
  name: z.string(),
  slug: z.string(),
  score: z.number(),
});

export type Affinity = z.infer<typeof AffinitySchema>;

// Match types
export const MatchMetricsSchema = z.object({
  overall: z.number(),
  strength: z.number(),
  percentage_asymmetric: z.number(),
  percentage_symmetric: z.number(),
  weighted_jaccard: z.number(),
  cosine_similarity: z.number(),
  counts: z.object({
    a: z.number(),
    b: z.number(),
    shared: z.number(),
  }),
  weights: z.object({
    a: z.number(),
    b: z.number(),
    overlap: z.number(),
  }),
  affinities: z.object({
    shared: z.array(AffinitySchema),
    only_a: z.array(AffinitySchema),
    only_b: z.array(AffinitySchema),
  }),
});

export const AffinityScoreSchema = z.object({
  overall: z.number(),
  percentage_asymmetric: z.number(),
  percentage_symmetric: z.number(),
  weighted_jaccard: z.number(),
  cosine_similarity: z.number(),
  by_type: z.record(z.nativeEnum(AffinityType), MatchMetricsSchema).optional(),
  profiles: z.object({
    a: z.record(z.nativeEnum(AffinityType), z.number()),
    b: z.record(z.nativeEnum(AffinityType), z.number()),
  }),
  meta: z.object({
    coverage: z.number(),
    budgets: z.record(z.nativeEnum(AffinityType), z.number()).optional(),
    alphas: z.record(z.nativeEnum(AffinityType), z.number()).optional(),
    type_order: z.array(z.nativeEnum(AffinityType)),
  }),
});

export const UserAffinityScoreSchema = z.object({
  users: z.object({
    a: UserOverviewSchema,
    b: UserOverviewSchema,
  }),
  score: AffinityScoreSchema,
});

export type MatchMetrics = z.infer<typeof MatchMetricsSchema>;
export type AffinityScore = z.infer<typeof AffinityScoreSchema>;
export type UserAffinityScore = z.infer<typeof UserAffinityScoreSchema>;

export enum TimelineInterval {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export const AffinityTimelineBucketSchema = z.object({
  bucket: z.string(),
  type: z.nativeEnum(AffinityType),
  slug: z.string(),
  name: z.string(),
  total_weight: z.number(),
  post_count: z.number(),
});

export const AffinityTimelineSchema = z.object({
  type: z.nativeEnum(AffinityType).nullable(),
  interval: z.nativeEnum(TimelineInterval),
  start: z.date(),
  end: z.date(),
  buckets: z.array(AffinityTimelineBucketSchema),
});

export const AffinityTimelineRequestSchema = z.object({
  type: z.nativeEnum(AffinityType).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  interval: z.nativeEnum(TimelineInterval).optional(),
});

export type AffinityTimelineBucket = z.infer<typeof AffinityTimelineBucketSchema>;
export type AffinityTimeline = z.infer<typeof AffinityTimelineSchema>;
export type AffinityTimelineRequest = z.infer<typeof AffinityTimelineRequestSchema>;
