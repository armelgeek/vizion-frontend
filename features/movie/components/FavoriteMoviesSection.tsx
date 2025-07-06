"use client";
import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../movie.schema';

export function FavoriteMoviesSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem('movie_favs') || '[]');
    if (!favIds.length) {
      setMovies([]);
      setLoading(false);
      return;
    }
    // Récupère les détails de chaque film favori
    Promise.all(
      favIds.map((id: number) =>
        fetch(`/api/tmdb/movie/${id}`)
          .then((res) => res.json())
          .catch(() => null)
      )
    ).then((results) => {
      setMovies(results.filter(Boolean));
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />;
  if (!movies.length) return <div className="text-gray-500">Aucun favori pour le moment.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
