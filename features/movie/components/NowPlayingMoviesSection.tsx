"use client";
import { useNowPlayingMovies } from '../hooks/use-now-playing-movies';
import { MovieCard } from './MovieCard';
import { Movie } from '../movie.schema';

export function NowPlayingMoviesSection() {
  const { data, isLoading, error } = useNowPlayingMovies();
  if (isLoading) return <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />;
  if (error || !data?.results?.length) return <div>Aucun film récent trouvé.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.results.slice(0, 8).map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
