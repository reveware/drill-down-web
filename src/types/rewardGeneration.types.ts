import { z } from 'zod';
import { UserRewardSchema } from './reward.types';

export enum JobStatus {
  PENDING = 'PENDING',
  QUEUED = 'QUEUED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export const JobStatusSchema = z.nativeEnum(JobStatus);

export const RewardGenerationSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  status: JobStatusSchema,
  created_at: z.string().datetime(),
  started_at: z.string().datetime().nullable(),
  finished_at: z.string().datetime().nullable(),
  error_message: z.string().nullable(),
  reward: UserRewardSchema.nullable(),
});

export type RewardGeneration = z.infer<typeof RewardGenerationSchema>;

export const ACTIVE_GENERATION_STATUSES: JobStatus[] = [
  JobStatus.PENDING,
  JobStatus.QUEUED,
  JobStatus.IN_PROGRESS,
  JobStatus.FAILED,
];
