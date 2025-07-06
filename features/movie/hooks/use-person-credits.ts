import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function usePersonCredits(id: string) {
  return useQuery({
    queryKey: ['person', id, 'credits'],
    queryFn: () => MovieService.getPersonCredits(id),
    enabled: !!id,
  });
}
