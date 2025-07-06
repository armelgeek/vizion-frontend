"use client";
import { useMovieDetail } from "../hooks/use-movie-detail";
import { StarRating } from "./StarRating";
import { MovieGenresTags } from "./MovieGenresTags";

export function MovieDetailSection({ movieId }: { movieId: number }) {
  const { data: movie, isLoading, error } = useMovieDetail(String(movieId));
  if (isLoading) return <div className="h-96 animate-pulse bg-gray-100 rounded-xl" />;
  if (error || !movie) return <div>Film introuvable.</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/file.svg"}
        alt={movie.title}
        className="w-64 h-96 object-cover rounded-xl shadow-lg mx-auto md:mx-0"
      />
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <div className="flex items-center gap-4">
          <StarRating value={movie.vote_average / 2} />
          <span className="text-gray-500">{movie.vote_count} votes</span>
        </div>
        <MovieGenresTags genres={movie.genres} />
        <div className="text-gray-700 mt-2">{movie.overview}</div>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          <span>Année : {movie.release_date?.slice(0, 4)}</span>
          <span>Durée : {movie.runtime} min</span>
          <span>Langue : {movie.original_language?.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
