"use client";
import { useMovieRecommendations } from "../hooks/use-movie-recommendations";
import { MovieCard } from "./MovieCard";

export function MovieRecommendations({ movieId }: { movieId: number }) {
  const { data, isLoading, error } = useMovieRecommendations(movieId);
  if (isLoading) return <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />;
  if (error || !data?.results?.length) return <div>Aucune recommandation.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.results.slice(0, 8).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
