import { useQueryState } from 'nuqs';
import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../movie.service';

export function usePersonCreditsPaginated(id: string, type: 'cast' | 'crew') {
  const [page, setPage] = useQueryState(type + 'Page', { defaultValue: 1, history: 'push', parse: Number, serialize: String });
  return {
    ...useQuery({
      queryKey: ['person', id, type, page],
      queryFn: async () => {
        const credits = await MovieService.getPersonCredits(id);
        const items = (type === 'cast' ? credits.cast : credits.crew) || [];
        return {
          items,
          total: items.length,
          page,
          perPage: 20,
          paginated: items.slice((page - 1) * 20, page * 20),
        };
      },
      enabled: !!id,
    }),
    page,
    setPage,
  };
}
