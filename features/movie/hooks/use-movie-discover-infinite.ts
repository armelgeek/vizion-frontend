import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieDiscoverService, DiscoverMovieParams } from '../movie.discover.service';

export function useDiscoverMoviesInfinite(params: Omit<DiscoverMovieParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['movies', 'discover', params],
    queryFn: ({ pageParam = 1 }) => MovieDiscoverService.discover({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 20) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}
