"use client"

import { useDiscoverMoviesInfinite } from '@/features/movie/hooks/use-movie-discover-infinite';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { ViewModeSwitch } from '@/features/movie/components/ViewModeSwitch';
import { useQueryState } from 'nuqs';
import { MovieFilters } from '@/features/movie/components/MovieFilters';
import { useEffect, useRef } from 'react';
import { FavoriteButton } from '@/features/movie/components/FavoriteButton';

export default function MoviesPage() {
  const [search, setSearch] = useQueryState('q', { defaultValue: '' });
  const [year, setYear] = useQueryState('year', { defaultValue: '' });
  const [genresSelected, setGenresSelected] = useQueryState('genres', {
    defaultValue: '',
    history: 'push',
    parse: (v) => v,
    serialize: (v) => v,
  });
  const [minRating, setMinRating] = useQueryState('minRating', { defaultValue: '' });
  const [view] = useQueryState('view', { defaultValue: 'grid' });

  const params = {
    year: year || undefined,
    with_genres: genresSelected ? genresSelected : undefined,
    'vote_average.gte': minRating || undefined,
    query: search.trim() || undefined,
  };
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiscoverMoviesInfinite(params);
  const movies = data ? data.pages.flat() : [];
  const loaderRef = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasNextPage || isLoading) return;
    const node = loaderRef.current;
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    }, { threshold: 1 });
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, [fetchNextPage, hasNextPage, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(search.trim());
  };

  const handleResetFilters = () => {
    setYear('');
    setGenresSelected('');
    setMinRating('');
  };

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
      <MovieFilters onReset={handleResetFilters} />
      {movies && (
        <div className="mb-2 text-xs text-gray-600">{movies.length} résultat{movies.length > 1 ? 's' : ''} affiché{movies.length > 1 ? 's' : ''}</div>
      )}
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : error ? (
        <div className="text-red-500">Erreur lors du chargement des films.</div>
      ) : (
        <>
          <ViewModeSwitch />
          {view === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {movies?.length ? movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="bg-white rounded shadow p-2 flex flex-col items-center hover:scale-105 transition-transform relative"
                >
                  <FavoriteButton movieId={movie.id} />
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
          ) : (
            <div className="flex flex-col gap-4">
              {movies?.length ? movies.map((movie) => (
                <div key={movie.id} className="flex bg-white rounded shadow p-2 items-center gap-4 relative">
                  <FavoriteButton movieId={movie.id} />
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      width={92}
                      height={132}
                      className="rounded object-cover"
                    />
                  ) : (
                    <div className="w-[92px] h-[132px] bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{movie.title}</div>
                    <div className="text-xs text-gray-500 mb-1">{movie.release_date}</div>
                    <div className="text-sm text-yellow-500 mb-1">⭐ {movie.vote_average}</div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500">Aucun film trouvé.</div>
              )}
            </div>
          )}
          <div ref={loaderRef} className="flex flex-col justify-center items-center mt-8 min-h-[40px]">
            {isFetchingNextPage && (
              <>
                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></span>
                <span className="text-xs text-gray-500">Chargement...</span>
              </>
            )}
            {!hasNextPage && !isLoading && movies.length > 0 && (
              <span className="text-xs text-gray-400">Fin de la liste</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
