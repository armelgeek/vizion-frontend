"use client";

import { genres } from '@/features/movie/genres.mock';
import { useQueryState } from 'nuqs';
import { useRef } from 'react';

export function MovieFilters({ onReset }: { onReset: () => void }) {
  const [year, setYear] = useQueryState('year', { defaultValue: '' });
  const [genresSelected, setGenresSelected] = useQueryState('genres', {
    defaultValue: '',
    history: 'push',
    parse: (v) => v,
    serialize: (v) => v,
  });
  const [minRating, setMinRating] = useQueryState('minRating', { defaultValue: '' });
  const sliderRef = useRef<HTMLInputElement>(null);

  // Affichage custom des genres sélectionnés
  const selectedIds = genresSelected ? genresSelected.split(',').filter(Boolean) : [];
  const selectedGenres = genres.filter(g => selectedIds.includes(String(g.id)));

  return (
    <form className="flex flex-wrap gap-4 mb-6 items-center" onSubmit={e => e.preventDefault()} aria-label="Filtres films">
      <label htmlFor="year" className="text-xs text-gray-600">Année</label>
      <input
        id="year"
        type="number"
        min="1900"
        max={new Date().getFullYear()}
        value={year}
        onChange={e => { setYear(e.target.value); }}
        placeholder="Année"
        className="border rounded px-2 py-1 text-xs w-20"
        aria-label="Filtrer par année"
      />
      <label htmlFor="genres" className="text-xs text-gray-600">Genres</label>
      <select
        id="genres"
        multiple
        value={selectedIds}
        onChange={e => {
          const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
          setGenresSelected(values.join(','));
        }}
        className="border rounded px-2 py-1 text-xs min-w-[120px]"
        aria-label="Filtrer par genres"
      >
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center">
          {selectedGenres.map(g => (
            <span key={g.id} className="inline-flex items-center bg-blue-100 text-blue-800 text-xs rounded px-2 py-0.5">
              {g.name}
              <button
                type="button"
                aria-label={`Retirer ${g.name}`}
                className="ml-1 text-blue-600 hover:text-red-600 focus:outline-none"
                onClick={() => {
                  const filtered = selectedIds.filter(id => id !== String(g.id));
                  setGenresSelected(filtered.join(','));
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <label htmlFor="minRatingSlider" className="text-xs text-gray-600">Note min.</label>
      <input
        id="minRatingSlider"
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={minRating || 0}
        onChange={e => { setMinRating(e.target.value); }}
        className="accent-yellow-500 w-32"
        ref={sliderRef}
        aria-label="Filtrer par note minimale (slider)"
      />
      <span className="text-xs text-gray-700 w-8 text-center">{minRating || 0}</span>
      <button
        type="button"
        onClick={onReset}
        className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-300 hover:bg-gray-200 ml-2"
        aria-label="Réinitialiser les filtres"
      >
        Réinitialiser
      </button>
    </form>
  );
}
