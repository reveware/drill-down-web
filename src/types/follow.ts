import { z } from 'zod';
import { UserOverviewSchema } from './user';

export const FollowRequestSchema = z.object({
  id: z.string(),
  requester: UserOverviewSchema,
  recipient: UserOverviewSchema,
  created_at: z.string(),
});

export type FollowRequest = z.infer<typeof FollowRequestSchema>;
