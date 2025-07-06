import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function useUpcomingMovies() {
  return useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => MovieService.getUpcoming(),
  });
}
