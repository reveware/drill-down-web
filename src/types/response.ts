import { z } from 'zod';

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success?: boolean;
};

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().optional(),
  });
