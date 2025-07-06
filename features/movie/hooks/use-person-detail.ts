import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function usePersonDetail(id: string) {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => MovieService.getPersonDetail(id),
    enabled: !!id,
  });
}
