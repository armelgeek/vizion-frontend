"use client"

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMovieDetail } from '@/features/movie/hooks/use-movie-detail';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import Image from 'next/image';

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  let actualParams: { id: string };
  if (typeof (params as { id: string }).id === 'string') {
    actualParams = params as { id: string };
  } else {
    actualParams = use(params as Promise<{ id: string }>);
  }
  const { data: movie, isLoading, error } = useMovieDetail(actualParams.id);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.replace('/movies');
    }
  }, [error, router]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!movie) {
    return <div className="text-gray-500">Film introuvable.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow flex flex-col md:flex-row gap-6">
      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={432}
          className="rounded object-cover"
        />
      ) : (
        <div className="w-[300px] h-[432px] bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
      )}
      <div className="flex-1 flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <div className="text-gray-500">Sortie : {movie.release_date}</div>
        <div className="text-yellow-500">⭐ {movie.vote_average}</div>
        <div className="mt-4 text-gray-700">{movie.overview}</div>
      </div>
    </div>
  );
}
