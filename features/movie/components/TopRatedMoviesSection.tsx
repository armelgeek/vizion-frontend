"use client";
import { useTopRatedMovies } from '../hooks/use-top-rated-movies';
import { MovieCard } from './MovieCard';
import { Movie } from '../movie.schema';

export function TopRatedMoviesSection() {
  const { data, isLoading, error } = useTopRatedMovies();
  if (isLoading) return <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />;
  if (error || !data?.results?.length) return <div>Aucun top film trouvé.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.results.slice(0, 8).map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
