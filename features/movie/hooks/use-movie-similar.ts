import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function useMovieSimilar(id: string) {
  return useQuery({
    queryKey: ['movie', id, 'similar'],
    queryFn: () => MovieService.getSimilar(id),
    enabled: !!id,
  });
}
