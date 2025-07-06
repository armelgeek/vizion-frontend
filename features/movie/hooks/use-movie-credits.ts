import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function useMovieCredits(id: string) {
  return useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => MovieService.getCredits(id),
    enabled: !!id,
  });
}
