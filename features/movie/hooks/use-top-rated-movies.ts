import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: () => MovieService.getTopRated(),
  });
}
