"use client";
import { useQueryState } from 'nuqs';

export function MovieRuntimeSlider() {
  const [minRuntime, setMinRuntime] = useQueryState('minRuntime', { defaultValue: '' });
  const [maxRuntime, setMaxRuntime] = useQueryState('maxRuntime', { defaultValue: '' });
  return (
    <div className="flex gap-2 items-center mb-4">
      <label htmlFor="minRuntime" className="text-xs text-gray-600">Durée min.</label>
      <input
        id="minRuntime"
        type="range"
        min="0"
        max="240"
        step="5"
        value={minRuntime || 0}
        onChange={e => setMinRuntime(e.target.value)}
        className="accent-blue-500 w-24"
      />
      <span className="text-xs text-gray-700 w-8 text-center">{minRuntime || 0} min</span>
      <label htmlFor="maxRuntime" className="text-xs text-gray-600 ml-2">Durée max.</label>
      <input
        id="maxRuntime"
        type="range"
        min="0"
        max="240"
        step="5"
        value={maxRuntime || 240}
        onChange={e => setMaxRuntime(e.target.value)}
        className="accent-blue-500 w-24"
      />
      <span className="text-xs text-gray-700 w-8 text-center">{maxRuntime || 240} min</span>
    </div>
  );
}
