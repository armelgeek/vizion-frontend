"use client";
import { TrendingMoviesSection } from '@/features/movie/components/TrendingMoviesSection';
import Link from 'next/link';
import { PopularMoviesSection } from '@/features/movie/components/PopularMoviesSection';
import { UpcomingMoviesSection } from '@/features/movie/components/UpcomingMoviesSection';
import { TopRatedMoviesSection } from '@/features/movie/components/TopRatedMoviesSection';
import { useTrendingMovies } from '@/features/movie/hooks/use-trending-movies';
import { MovieRecommendations } from '@/features/movie/components/MovieRecommendations';
import { useMemo } from 'react';
import { NowPlayingMoviesSection } from '@/features/movie/components/NowPlayingMoviesSection';
import { FavoriteMoviesSection } from '@/features/movie/components/FavoriteMoviesSection';
import { HeroSection } from '@/features/movie/components/HeroSection';

export default function HomePage() {
  const { data, isLoading } = useTrendingMovies();
  const heroMovie = data?.results?.length
    ? data.results[Math.floor(Math.random() * data.results.length)]
    : null;
  const recommendedMovieId = useMemo(() => {
    if (!data?.results?.length) return null;
    const others = data.results.filter((m) => m.id !== heroMovie?.id);
    return others.length ? others[Math.floor(Math.random() * others.length)].id : null;
  }, [data, heroMovie]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <HeroSection movie={heroMovie} isLoading={isLoading} />
        </section>
        {/* Quick Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <Link href="/movies" className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all hover:scale-105 shadow-lg">Explorer les films</Link>
          <Link href="/movies?view=favorites" className="px-8 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all hover:scale-105 shadow-lg">Mes favoris</Link>
        </div>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Tendances du moment</h2>
          <TrendingMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Populaires</h2>
          <PopularMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">À venir</h2>
          <UpcomingMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Top Films</h2>
          <TopRatedMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Films recommandés</h2>
          {recommendedMovieId ? (
            <MovieRecommendations movieId={recommendedMovieId} />
          ) : (
            <div className="h-48 bg-slate-100 rounded-xl animate-pulse" />
          )}
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Derniers ajouts</h2>
          <NowPlayingMoviesSection />
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Mes favoris</h2>
          <FavoriteMoviesSection />
        </section>
      </div>
    </main>
  );
}
