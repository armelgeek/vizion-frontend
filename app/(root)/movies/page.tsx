"use client"

import { useDiscoverMovies } from '@/features/movie/hooks/use-movie-discover';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { MovieFilters } from '@/features/movie/components/MovieFilters';

export default function MoviesPage() {
  const [search, setSearch] = useQueryState('q', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', { defaultValue: 1, history: 'push', parse: Number, serialize: String });
  const [year, setYear] = useQueryState('year', { defaultValue: '' });
  const [genresSelected, setGenresSelected] = useQueryState('genres', {
    defaultValue: '',
    history: 'push',
    parse: (v) => v,
    serialize: (v) => v,
  });
  const [minRating, setMinRating] = useQueryState('minRating', { defaultValue: '' });

  const params = {
    page,
    year: year || undefined,
    with_genres: genresSelected ? genresSelected : undefined,
    'vote_average.gte': minRating || undefined,
    query: search.trim() || undefined,
  };
  const { data: movies, isLoading, error } = useDiscoverMovies(params);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(search.trim());
  };

  const handleResetFilters = () => {
    setYear('');
    setGenresSelected('');
    setMinRating('');
    setPage(1);
  };

  const handlePrev = () => setPage((p) => Math.max(1, (typeof p === 'number' ? p : 1) - 1));
  const handleNext = () => setPage((p) => (typeof p === 'number' ? p + 1 : 2));

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un film..."
          className="border rounded px-3 py-2 w-full max-w-md"
          aria-label="Rechercher un film"
          autoFocus
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Rechercher</button>
      </form>
      {/* Filtres avancés */}
      <MovieFilters onReset={handleResetFilters} />
      {/* Résultats */}
      {movies && (
        <div className="mb-2 text-xs text-gray-600">{movies.length} résultat{movies.length > 1 ? 's' : ''} affiché{movies.length > 1 ? 's' : ''}</div>
      )}
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : error ? (
        <div className="text-red-500">Erreur lors du chargement des films.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies?.length ? movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="bg-white rounded shadow p-2 flex flex-col items-center hover:scale-105 transition-transform"
              >
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={432}
                    className="rounded mb-2 w-full h-72 object-cover"
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
                )}
                <div className="font-semibold text-center mt-2">{movie.title}</div>
                <div className="text-xs text-gray-500">{movie.release_date}</div>
                <div className="text-sm text-yellow-500">⭐ {movie.vote_average}</div>
              </Link>
            )) : (
              <div className="col-span-full text-center text-gray-500">Aucun film trouvé.</div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Précédent
            </button>
            <span className="px-4 py-2 text-gray-700">Page {page}</span>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700"
              disabled={movies?.length === 0}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
