import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function useMovieDetail(id: string) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => MovieService.getDetail(id),
    enabled: !!id,
  });
}
