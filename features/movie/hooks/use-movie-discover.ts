import { useQuery } from '@tanstack/react-query';
import { MovieDiscoverService, DiscoverMovieParams } from '../movie.discover.service';

export function useDiscoverMovies(params: DiscoverMovieParams) {
  return useQuery({
    queryKey: ['movies', 'discover', params],
    queryFn: () => MovieDiscoverService.discover(params),
  });
}
