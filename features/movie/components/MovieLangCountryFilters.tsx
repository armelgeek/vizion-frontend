"use client";
import { useQueryState } from 'nuqs';

const LANGS = [
  { value: '', label: 'Toutes les langues' },
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
  { value: 'es', label: 'Espagnol' },
  { value: 'de', label: 'Allemand' },
  { value: 'it', label: 'Italien' },
  { value: 'ja', label: 'Japonais' },
  { value: 'ko', label: 'Coréen' },
  { value: 'zh', label: 'Chinois' },
  // ...
];
const COUNTRIES = [
  { value: '', label: 'Tous les pays' },
  { value: 'FR', label: 'France' },
  { value: 'US', label: 'États-Unis' },
  { value: 'GB', label: 'Royaume-Uni' },
  { value: 'JP', label: 'Japon' },
  { value: 'KR', label: 'Corée' },
  { value: 'IN', label: 'Inde' },
  // ...
];

export function MovieLangCountryFilters() {
  const [lang, setLang] = useQueryState('lang', { defaultValue: '' });
  const [country, setCountry] = useQueryState('country', { defaultValue: '' });
  return (
    <div className="flex gap-4 mb-4 items-center">
      <label htmlFor="lang" className="text-xs text-gray-600">Langue</label>
      <select
        id="lang"
        value={lang}
        onChange={e => setLang(e.target.value)}
        className="border rounded px-2 py-1 text-xs"
        aria-label="Filtrer par langue"
      >
        {LANGS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <label htmlFor="country" className="text-xs text-gray-600">Pays</label>
      <select
        id="country"
        value={country}
        onChange={e => setCountry(e.target.value)}
        className="border rounded px-2 py-1 text-xs"
        aria-label="Filtrer par pays"
      >
        {COUNTRIES.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
