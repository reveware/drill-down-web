import { z } from 'zod';

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string().optional(),
  });

export type ApiResponse<T> = z.infer<ReturnType<typeof createApiResponseSchema<z.ZodType<T>>>>;
