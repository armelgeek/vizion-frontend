"use client"

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMovieDetail } from '@/features/movie/hooks/use-movie-detail';
import { useMovieCredits } from '@/features/movie/hooks/use-movie-credits';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { MovieRecommendations } from '@/features/movie/components/MovieRecommendations';
import { TrendingMoviesSection } from '@/features/movie/components/TrendingMoviesSection';
import { MovieVideosSection } from '@/features/movie/components/MovieVideosSection';
import { MovieSimilarSection } from '@/features/movie/components/MovieSimilarSection';
import { TmdbCast } from '@/features/movie/types/tmdb-credits';

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  let actualParams: { id: string };
  if (typeof (params as { id: string }).id === 'string') {
    actualParams = params as { id: string };
  } else {
    actualParams = use(params as Promise<{ id: string }>);
  }
  const { data: movie, isLoading, error } = useMovieDetail(actualParams.id);
  const { data: credits, isLoading: loadingCredits } = useMovieCredits(actualParams.id);
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
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow flex flex-col md:flex-row gap-8">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={340}
            height={510}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-[340px] h-[510px] bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
        )}
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-3xl font-bold mb-1">{movie.title}</h1>
          {movie.tagline && <div className="italic text-blue-700 mb-2">{movie.tagline}</div>}
          <div className="flex flex-wrap gap-2 mb-2">
            {movie.genres?.map((g: { id: number; name: string }) => (
              <span key={g.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{g.name}</span>
            ))}
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mb-2">
            {movie.release_date && <span>Sortie : {movie.release_date}</span>}
            {movie.runtime && <span>Durée : {movie.runtime} min</span>}
            {movie.original_language && <span>Langue : {movie.original_language.toUpperCase()}</span>}
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mb-2">
            {movie.budget ? <span>Budget : {movie.budget.toLocaleString()} $</span> : null}
            {movie.revenue ? <span>Box-office : {movie.revenue.toLocaleString()} $</span> : null}
          </div>
          <div className="text-yellow-500 font-semibold mb-2">⭐ {movie.vote_average} / 10 ({movie.vote_count} votes)</div>
          <div className="mt-2 text-gray-700 leading-relaxed">{movie.overview}</div>
          {movie.homepage && (
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 underline">Site officiel</a>
          )}
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm text-gray-500 underline"
          >
            Voir sur TMDB
          </a>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4">Acteurs principaux</h2>
        {loadingCredits ? (
          <Skeleton className="h-32 w-full" />
        ) : credits?.cast?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {credits.cast.slice(0, 8).map((actor: TmdbCast) => (
              <Link
                key={actor.cast_id || actor.id}
                href={`/movies/person/${actor.id}`}
                className="flex flex-col items-center bg-gray-50 rounded p-2 shadow-sm hover:scale-105 transition-transform"
              >
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    width={120}
                    height={180}
                    className="rounded mb-2 object-cover"
                  />
                ) : (
                  <div className="w-[120px] h-[180px] bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No photo</div>
                )}
                <div className="font-semibold text-center mt-1 text-sm">{actor.name}</div>
                <div className="text-xs text-gray-500 text-center">{actor.character}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">Aucun acteur trouvé.</div>
        )}
      </div>
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">Recommandations</h2>
        <MovieRecommendations movieId={Number(movie.id)} />
      </div>
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">Tendances</h2>
        <TrendingMoviesSection />
      </div>
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">Bande-annonce</h2>
        <MovieVideosSection movieId={movie.id} />
      </div>
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">Similaires</h2>
        <MovieSimilarSection movieId={movie.id} />
      </div>
    </>
  );
}
