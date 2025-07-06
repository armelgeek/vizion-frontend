"use client";

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePersonDetail } from '@/features/movie/hooks/use-person-detail';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import Image from 'next/image';
import { usePersonCredits } from '@/features/movie/hooks/use-person-credits';
import Link from 'next/link';

export default function PersonDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  let actualParams: { id: string };
  if (typeof (params as { id: string }).id === 'string') {
    actualParams = params as { id: string };
  } else {
    actualParams = use(params as Promise<{ id: string }>);
  }
  const { data: person, isLoading, error } = usePersonDetail(actualParams.id);
  const { data: credits, isLoading: loadingCredits } = usePersonCredits(actualParams.id);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.replace('/movies');
    }
  }, [error, router]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!person) {
    return <div className="text-gray-500">Acteur introuvable.</div>;
  }

  type CreditCast = {
    id: number;
    media_type: string;
    poster_path?: string;
    title?: string;
    name?: string;
    character?: string;
    popularity?: number;
    release_date?: string;
    first_air_date?: string;
  };
  type CreditCrew = {
    id: number;
    media_type: string;
    title?: string;
    name?: string;
    job?: string;
    release_date?: string;
    first_air_date?: string;
  };

  const getCreditDate = (item: { release_date?: string; first_air_date?: string }) =>
    item.release_date || item.first_air_date || '';

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded shadow p-6 flex flex-col md:flex-row gap-8">
            {person.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                width={300}
                height={450}
                className="rounded object-cover shadow-md"
              />
            ) : (
              <div className="w-[300px] h-[450px] bg-gray-200 flex items-center justify-center text-gray-400">No photo</div>
            )}
            <div className="flex-1 flex flex-col gap-2">
              <h1 className="text-3xl font-bold mb-2 text-blue-900">{person.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-2">
                {person.birthday && <span>Né(e) : {person.birthday}</span>}
                {person.place_of_birth && <span>Lieu : {person.place_of_birth}</span>}
                {person.deathday && <span>Décédé(e) : {person.deathday}</span>}
                {person.known_for_department && <span>Métier : {person.known_for_department}</span>}
              </div>
              {person.biography && <div className="mt-2 text-gray-700 whitespace-pre-line text-sm leading-relaxed max-h-60 overflow-y-auto pr-2">{person.biography}</div>}
              <a
                href={`https://www.themoviedb.org/person/${person.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm text-blue-600 underline self-start"
              >
                Voir sur TMDB
              </a>
            </div>
          </div>
          <section className="mt-10 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-800 border-b pb-2">Célèbre pour</h2>
            {loadingCredits ? (
              <Skeleton className="h-32 w-full" />
            ) : credits?.cast?.length ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {(credits.cast as CreditCast[])
                  .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
                  .slice(0, 4)
                  .map((item: CreditCast) => (
                    <Link
                      key={item.id}
                      href={item.media_type === 'movie' ? `/movies/${item.id}` : '#'}
                      className="min-w-[120px] flex flex-col items-center bg-gray-50 rounded p-2 shadow-sm hover:scale-105 transition-transform"
                    >
                      {item.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                          alt={item.title || item.name || ''}
                          width={100}
                          height={150}
                          className="rounded mb-2 object-cover"
                        />
                      ) : (
                        <div className="w-[100px] h-[150px] bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No image</div>
                      )}
                      <div className="font-semibold text-center text-xs mt-1">{item.title || item.name}</div>
                      {item.character && <div className="text-xs text-gray-500 text-center">{item.character}</div>}
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-gray-500">Aucun titre trouvé.</div>
            )}
          </section>
          <section className="mt-10 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-800 border-b pb-2">Réalisation</h2>
            {loadingCredits ? (
              <Skeleton className="h-24 w-full" />
            ) : credits?.crew?.filter((c: CreditCrew) => c.job === 'Director').length ? (
              <ol className="border-l-2 border-blue-200 pl-4 space-y-2">
                {(credits.crew as CreditCrew[])
                  .filter((c: CreditCrew) => c.job === 'Director')
                  .sort((a: CreditCrew, b: CreditCrew) => getCreditDate(b).localeCompare(getCreditDate(a)))
                  .map((item: CreditCrew) => (
                    <li key={item.id} className="relative">
                      <span className="absolute -left-2 top-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></span>
                      <Link href={item.media_type === 'movie' ? `/movies/${item.id}` : '#'} className="hover:underline">
                        <span className="font-semibold">{item.title || item.name}</span>
                      </Link>
                      {getCreditDate(item) && <span className="ml-2 text-xs text-gray-500">({getCreditDate(item)})</span>}
                    </li>
                  ))}
              </ol>
            ) : (
              <div className="text-gray-500">Aucune réalisation trouvée.</div>
            )}
          </section>
        </div>
        <aside className="w-full md:w-80 flex-shrink-0 mt-10 md:mt-0">
          <section className="bg-white rounded shadow p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-blue-800 border-b pb-2">Filmographie complète</h2>
            {loadingCredits ? (
              <Skeleton className="h-32 w-full" />
            ) : credits && (credits.cast?.length || credits.crew?.length) ? (
              <div className="space-y-4">
                {/* Acteur */}
                {credits.cast?.length ? (
                  <div>
                    <h3 className="font-semibold mb-2 text-blue-700">Comme acteur/trice</h3>
                    <ul className="space-y-2 max-h-72 overflow-y-auto pr-2">
                      {(credits.cast as CreditCast[])
                        .sort((a, b) => getCreditDate(b).localeCompare(getCreditDate(a)))
                        .map((item: CreditCast) => (
                          <li key={item.id} className="flex items-center gap-3">
                            {item.poster_path ? (
                              <Image
                                src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                                alt={item.title || item.name || ''}
                                width={46}
                                height={69}
                                className="rounded object-cover"
                              />
                            ) : (
                              <div className="w-[46px] h-[69px] bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No image</div>
                            )}
                            <div>
                              <Link href={item.media_type === 'movie' ? `/movies/${item.id}` : '#'} className="font-semibold hover:underline">
                                {item.title || item.name}
                              </Link>
                              {getCreditDate(item) && <span className="ml-2 text-xs text-gray-500">({getCreditDate(item)})</span>}
                              {item.character && <span className="ml-2 text-xs text-gray-500">{item.character}</span>}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
                {credits.crew?.filter((c: CreditCrew) => c.job === 'Director').length ? (
                  <div>
                    <h3 className="font-semibold mb-2 mt-4 text-blue-700">Comme réalisateur/trice</h3>
                    <ul className="space-y-2 max-h-72 overflow-y-auto pr-2">
                      {(credits.crew as CreditCrew[])
                        .filter((c: CreditCrew) => c.job === 'Director')
                        .sort((a: CreditCrew, b: CreditCrew) => getCreditDate(b).localeCompare(getCreditDate(a)))
                        .map((item: CreditCrew) => (
                          <li key={item.id} className="flex items-center gap-3">
                            <Link href={item.media_type === 'movie' ? `/movies/${item.id}` : '#'} className="font-semibold hover:underline">
                              {item.title || item.name}
                            </Link>
                            {getCreditDate(item) && <span className="ml-2 text-xs text-gray-500">({getCreditDate(item)})</span>}
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-gray-500">Aucune filmographie trouvée.</div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
