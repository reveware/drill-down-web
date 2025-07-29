import { z } from 'zod';

export enum AffinityType {
  TAG = 'TAG',
  THEME = 'THEME',
  STYLE = 'STYLE',
  MOOD = 'MOOD',
}

export const AffinitySchema = z.object({
  type: z.nativeEnum(AffinityType),
  name: z.string(),
  slug: z.string(),
  score: z.number(),
});

export type Affinity = z.infer<typeof AffinitySchema>;
