"use client";
import { useMovieVideos } from '../hooks/use-movie-videos';
import { TmdbVideo } from '../types/tmdb-video';

export function MovieVideosSection({ movieId }: { movieId: string }) {
  const { data, isLoading, error } = useMovieVideos(movieId);
  if (isLoading) return <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />;
  if (error || !data?.results?.length) return <div>Aucune vidéo trouvée.</div>;

  // On cherche la première vidéo YouTube de type Trailer
  const trailer = data.results.find((v: TmdbVideo) => v.site === 'YouTube' && v.type === 'Trailer');
  if (!trailer) return <div>Aucune bande-annonce disponible.</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl w-full max-w-2xl aspect-video"
      />
      <div className="mt-2 text-sm text-gray-600">{trailer.name}</div>
    </div>
  );
}
