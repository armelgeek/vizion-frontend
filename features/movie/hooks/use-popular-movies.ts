import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function usePopularMovies() {
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => MovieService.getPopular(),
  });
}
