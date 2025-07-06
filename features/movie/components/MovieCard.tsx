"use client";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";
import { MovieGenresTags } from "./MovieGenresTags";
import { StarRating } from "./StarRating";

export function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <Link href={`/movies/${movie.id}`} className="block">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/file.svg"}
          alt={movie.title}
          className="w-full h-72 object-cover"
        />
      </Link>
      <FavoriteButton movieId={movie.id} />
      <div className="p-4 flex-1 flex flex-col gap-2">
        <Link href={`/movies/${movie.id}`} className="font-semibold text-lg hover:underline">
          {movie.title}
        </Link>
        <MovieGenresTags genres={movie.genres || movie.genre_ids?.map((id: number) => ({ id, name: '' }))} />
        <div className="flex items-center gap-2 mt-1">
          <StarRating value={movie.vote_average / 2} />
          <span className="text-xs text-gray-500">{movie.vote_count} votes</span>
        </div>
        <div className="text-xs text-gray-400 mt-auto">{movie.release_date?.slice(0, 4)}</div>
      </div>
    </div>
  );
}
