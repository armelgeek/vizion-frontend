"use client";
import { usePopularMovies } from '../hooks/use-popular-movies';
import { MovieCard } from './MovieCard';
import { Movie } from '../movie.schema';

export function PopularMoviesSection() {
  const { data, isLoading, error } = usePopularMovies();
  if (isLoading) return <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />;
  if (error || !data?.length) return <div>Aucun film populaire trouvé.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.slice(0, 8).map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
