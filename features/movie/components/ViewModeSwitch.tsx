"use client";
import { useQueryState } from 'nuqs';

export function ViewModeSwitch() {
  const [view, setView] = useQueryState('view', { defaultValue: 'grid' });
  return (
    <div className="flex gap-2 mb-4">
      <button
        type="button"
        className={`px-2 py-1 rounded ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setView('grid')}
        aria-label="Vue grille"
      >
        Grille
      </button>
      <button
        type="button"
        className={`px-2 py-1 rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setView('list')}
        aria-label="Vue liste"
      >
        Liste
      </button>
    </div>
  );
}
