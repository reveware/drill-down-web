import { z } from 'zod';

export enum RewardAssetType {
  IMAGE = 'IMAGE',
}

export const UserRewardSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.nativeEnum(RewardAssetType),
  content: z.string(),
  revealed_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type UserReward = z.infer<typeof UserRewardSchema>;
