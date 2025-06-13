import { z } from 'zod';

export const PaginatedParamsSchema = z.object({
  page_number: z.number().int(),
  page_size: z.number().int(),
});

export const PaginatedResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    page: z.number().int(),
    total: z.number().int(),
    total_pages: z.number().int(),
    is_last_page: z.boolean(),
    data: z.array(dataSchema),
  });

export type PaginatedParams = z.infer<typeof PaginatedParamsSchema>;
export type PaginatedResponse<T> = z.infer<
  ReturnType<typeof PaginatedResponseSchema<z.ZodType<T>>>
>;
