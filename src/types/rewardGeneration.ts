import { z } from 'zod';

export enum JobStatus {
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
  enqueued_at: z.string().datetime(),
  started_at: z.string().datetime().nullable(),
  finished_at: z.string().datetime().nullable(),
  error_message: z.string().nullable(),
});

export type RewardGeneration = z.infer<typeof RewardGenerationSchema>;

export const ACTIVE_GENERATION_STATUSES: JobStatus[] = [
  JobStatus.QUEUED,
  JobStatus.IN_PROGRESS,
  JobStatus.FAILED,
];
