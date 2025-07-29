import { z } from 'zod';
import { UserOverview } from './user';
import { AffinitySchema } from './affinity';

export enum UserRecommendationReason {
  AFFINITY = 'AFFINITY',
  POPULAR = 'POPULAR',
}

export const UserRecommendationSchema = z.object({
  user: z.custom<UserOverview>(),
  reason: z.nativeEnum(UserRecommendationReason),
  match: z.object({
    percentage: z.number().nullable(),
    shared_affinities: z.array(AffinitySchema),
  }),
});

export type UserRecommendation = z.infer<typeof UserRecommendationSchema>;
