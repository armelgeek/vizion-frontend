"use client"

import { usePopularMovies } from '@/features/movie/hooks/use-movie';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import Image from 'next/image';

export default function MoviesPage() {
  const { data, isLoading, error } = usePopularMovies();

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (error) {
    return <div className="text-red-500">Erreur lors du chargement des films.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {data?.map((movie) => (
        <div key={movie.id} className="bg-white rounded shadow p-2 flex flex-col items-center">
          {movie.poster_path ? (
            <img
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
        </div>
      ))}
    </div>
  );
}
