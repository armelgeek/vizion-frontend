"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Play, Plus, Info, Star, Calendar, Film } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
}

interface HeroSectionProps {
  movie: Movie | null;
  isLoading?: boolean;
}

export function HeroSection({ movie, isLoading }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [posterError, setPosterError] = useState(false);
  
  if (isLoading || !movie) {
    return (
      <section className="relative h-[60vh] min-h-[400px] bg-slate-900 rounded-2xl overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-6 bg-slate-700 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </div>
      </section>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const hasBackdrop = movie.backdrop_path && !imageError;
  
  return (
    <section className="relative h-[60vh] min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Background - Image ou Fallback */}
      {hasBackdrop ? (
        <div className="absolute inset-0">
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 animate-pulse" />
          )}
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            priority
            onLoad={() => setImageLoading(false)}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Film className="w-32 h-32 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-purple-900/20" />
        </div>
      )}
      
      {/* Overlay Gradient */}
      <div className={`absolute inset-0 ${hasBackdrop ? 'bg-gradient-to-r from-black via-black/80 to-transparent' : 'bg-gradient-to-r from-black/80 via-black/60 to-black/40'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="p-6 md:p-8 lg:p-10 w-full max-w-4xl">
          {/* Movie Info */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
            {releaseYear && (
              <>
                <Calendar className="w-4 h-4" />
                <span>{releaseYear}</span>
                <span className="text-gray-500">•</span>
              </>
            )}
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">({movie.vote_count} votes)</span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>
          
          {/* Overview */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl overflow-hidden">
            <span className="block" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden'
            }}>
              {movie.overview}
            </span>
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 lg:gap-4">
            <Link 
              href={`/movies/${movie.id}`}
              className="flex items-center gap-2 px-6 py-3 md:px-8 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5" />
              Regarder
            </Link>
            
            <button className="flex items-center gap-2 px-4 py-3 md:px-6 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/20">
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Ma liste</span>
            </button>
            
            <Link 
              href={`/movies/${movie.id}`}
              className="flex items-center gap-2 px-4 py-3 md:px-6 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold rounded-lg backdrop-blur-sm transition-all duration-200 border border-slate-600"
            >
              <Info className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Plus d&apos;infos</span>
            </Link>
          </div>
        </div>
        
        {/* Movie Poster (Desktop only) */}
        {movie.poster_path && (
          <div className="hidden lg:block absolute right-12 bottom-8">
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Actions Bar (Mobile) */}
      <div className="lg:hidden absolute top-4 right-4 flex gap-2">
        <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
