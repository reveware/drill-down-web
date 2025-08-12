import { z } from 'zod';
import { UserOverview } from './user';
import { AffinityScoreSchema } from './affinity';
import { PostOverview } from './post';

export enum RecommendationReason {
  AFFINITY = 'AFFINITY',
  POPULAR = 'POPULAR',
}

export const UserRecommendationSchema = z.object({
  user: z.custom<UserOverview>(),
  reason: z.nativeEnum(RecommendationReason),
  match: AffinityScoreSchema.optional(),
});

export type UserRecommendation = z.infer<typeof UserRecommendationSchema>;

export const PostRecommendationSchema = z.object({
  post: z.custom<PostOverview>(),
  reason: z.nativeEnum(RecommendationReason),
  match: AffinityScoreSchema,
});

export type PostRecommendation = z.infer<typeof PostRecommendationSchema>;
