import { z } from 'zod';

export enum JobStatus {
  QUEUED = 'QUEUED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export const JobStatusSchema = z.nativeEnum(JobStatus);

export const RewardJobSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  status: JobStatusSchema,
  enqueued_at: z.string().datetime(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
});

export type RewardJob = z.infer<typeof RewardJobSchema>;
