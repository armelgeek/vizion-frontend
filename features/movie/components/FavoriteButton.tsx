"use client";
import { useEffect, useState } from 'react';

export function FavoriteButton({ movieId }: { movieId: number }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('movie_favs') || '[]');
    setIsFav(favs.includes(movieId));
  }, [movieId]);

  const toggleFav = () => {
    const favs = JSON.parse(localStorage.getItem('movie_favs') || '[]');
    let newFavs;
    if (favs.includes(movieId)) {
      newFavs = favs.filter((id: number) => id !== movieId);
    } else {
      newFavs = [...favs, movieId];
    }
    localStorage.setItem('movie_favs', JSON.stringify(newFavs));
    setIsFav(newFavs.includes(movieId));
  };

  return (
    <button
      type="button"
      aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      onClick={toggleFav}
      className={
        'absolute top-5 right-5 z-10 w-12 h-12 rounded-full p-1 ' +
        (isFav ? 'bg-yellow-300 text-yellow-900' : 'bg-white text-gray-400 hover:text-yellow-500')
      }
    >
      {isFav ? '★' : '☆'}
    </button>
  );
}
