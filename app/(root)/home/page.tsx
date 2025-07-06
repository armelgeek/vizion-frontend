"use client";
import { TrendingMoviesSection } from '@/features/movie/components/TrendingMoviesSection';
import Link from 'next/link';
import { PopularMoviesSection } from '@/features/movie/components/PopularMoviesSection';
import { UpcomingMoviesSection } from '@/features/movie/components/UpcomingMoviesSection';
import { TopRatedMoviesSection } from '@/features/movie/components/TopRatedMoviesSection';
import { useTrendingMovies } from '@/features/movie/hooks/use-trending-movies';
import Image from 'next/image';

export default function HomePage() {
  const { data, isLoading } = useTrendingMovies();
  // Sélectionne un film tendance au hasard pour le hero
  const heroMovie = data?.results?.length
    ? data.results[Math.floor(Math.random() * data.results.length)]
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <section className="mb-12">
          {heroMovie ? (
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-black/80 flex flex-col md:flex-row items-center gap-8 p-6 md:p-10 mb-8">
              {heroMovie.backdrop_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w780${heroMovie.backdrop_path}`}
                  alt={heroMovie.title}
                  width={420}
                  height={240}
                  className="rounded-xl object-cover w-full max-w-md h-60 md:h-72 shadow-md"
                  priority
                />
              )}
              <div className="flex-1 flex flex-col gap-3 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{heroMovie.title}</h1>
                <div className="text-yellow-400 font-semibold">⭐ {heroMovie.vote_average} / 10</div>
                <div className="text-sm md:text-base line-clamp-4 mb-2 opacity-90">{heroMovie.overview}</div>
                <div className="flex gap-4 mt-2">
                  <Link href={`/movies/${heroMovie.id}`} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Voir le film</Link>
                  <Link href="/movies" className="px-5 py-2 bg-white/80 text-blue-700 rounded-lg font-semibold hover:bg-white">Explorer</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-60 md:h-72 bg-gray-200 rounded-xl animate-pulse mb-8" />
          )}
        </section>
        <div className="flex justify-center gap-4 mb-10">
          <Link href="/movies" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Explorer les films</Link>
          <Link href="/movies?view=favorites" className="px-6 py-3 bg-yellow-400 text-yellow-900 rounded-lg font-semibold hover:bg-yellow-500 transition">Mes favoris</Link>
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Tendances du moment</h2>
          <TrendingMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Populaires</h2>
          <PopularMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">À venir</h2>
          <UpcomingMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Top Films</h2>
          <TopRatedMoviesSection />
        </section>
      </div>
    </main>
  );
}
