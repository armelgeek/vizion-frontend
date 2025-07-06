import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => MovieService.getPopular(page),
  });
}

export function useSearchMovies(query: string, page = 1) {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => MovieService.search(query, page),
    enabled: !!query,
  });
}
