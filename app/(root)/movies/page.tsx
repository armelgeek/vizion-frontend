"use client"

import { useDiscoverMovies } from '@/features/movie/hooks/use-movie-discover';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { genres } from '@/features/movie/genres.mock';
import { useRef } from 'react';

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
  const sliderRef = useRef<HTMLInputElement>(null);

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
      <form className="flex flex-wrap gap-4 mb-6 items-center" onSubmit={e => e.preventDefault()} aria-label="Filtres films">
        <label htmlFor="year" className="text-xs text-gray-600">Année</label>
        <input
          id="year"
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          value={year}
          onChange={e => { setYear(e.target.value); setPage(1); }}
          placeholder="Année"
          className="border rounded px-2 py-1 text-xs w-20"
          aria-label="Filtrer par année"
        />
        <label htmlFor="genres" className="text-xs text-gray-600">Genres</label>
        <select
          id="genres"
          multiple
          value={genresSelected ? genresSelected.split(',') : []}
          onChange={e => {
            const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
            setGenresSelected(values.join(','));
            setPage(1);
          }}
          className="border rounded px-2 py-1 text-xs min-w-[120px]"
          aria-label="Filtrer par genres"
        >
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <label htmlFor="minRatingSlider" className="text-xs text-gray-600">Note min.</label>
        <input
          id="minRatingSlider"
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={minRating || 0}
          onChange={e => { setMinRating(e.target.value); setPage(1); }}
          className="accent-yellow-500 w-32"
          ref={sliderRef}
          aria-label="Filtrer par note minimale (slider)"
        />
        <span className="text-xs text-gray-700 w-8 text-center">{minRating || 0}</span>
        <button
          type="button"
          onClick={handleResetFilters}
          className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-300 hover:bg-gray-200 ml-2"
          aria-label="Réinitialiser les filtres"
        >
          Réinitialiser
        </button>
      </form>
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
