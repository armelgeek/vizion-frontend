import { z } from 'zod';

export const movieSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Le titre est requis'),
  overview: z.string().optional(),
  release_date: z.string().optional(),
  poster_path: z.string().optional(),
  vote_average: z.number().optional(),
  genre_ids: z.array(z.number()).optional(),
});

export type Movie = z.infer<typeof movieSchema>;
