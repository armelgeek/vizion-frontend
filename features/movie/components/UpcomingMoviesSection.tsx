"use client";
import { useUpcomingMovies } from '../hooks/use-upcoming-movies';
import { MovieCard } from './MovieCard';
import { Movie } from '../movie.schema';

export function UpcomingMoviesSection() {
  const { data, isLoading, error } = useUpcomingMovies();
  if (isLoading) return <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />;
  if (error || !data?.results?.length) return <div>Aucun film à venir trouvé.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.results.slice(0, 8).map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
