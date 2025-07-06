import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function useMovieVideos(id: string) {
  return useQuery({
    queryKey: ['movie', id, 'videos'],
    queryFn: () => MovieService.getVideos(id),
    enabled: !!id,
  });
}
