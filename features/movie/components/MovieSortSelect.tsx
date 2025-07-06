"use client";
import { useQueryState } from 'nuqs';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularité décroissante' },
  { value: 'popularity.asc', label: 'Popularité croissante' },
  { value: 'release_date.desc', label: 'Date la plus récente' },
  { value: 'release_date.asc', label: 'Date la plus ancienne' },
  { value: 'vote_average.desc', label: 'Note la plus haute' },
  { value: 'vote_average.asc', label: 'Note la plus basse' },
  { value: 'original_title.asc', label: 'Titre A-Z' },
  { value: 'original_title.desc', label: 'Titre Z-A' },
];

export function MovieSortSelect() {
  const [sortBy, setSortBy] = useQueryState('sortBy', { defaultValue: 'popularity.desc' });
  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="sortBy" className="text-xs text-gray-600">Trier par</label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="border rounded px-2 py-1 text-xs"
        aria-label="Trier les films"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
