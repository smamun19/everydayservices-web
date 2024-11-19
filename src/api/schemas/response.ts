import { z } from 'zod';

/**
 * API Schema for common response structure
 */
export const apiResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  statusCode: z.number(),
  result: z.any().optional(),
});

export type APIResponseSchema = z.infer<typeof apiResponseSchema>;
