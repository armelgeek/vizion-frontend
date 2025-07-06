import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function useNowPlayingMovies() {
  return useQuery({
    queryKey: ['movies', 'now-playing'],
    queryFn: () => MovieService.getNowPlaying(),
  });
}
