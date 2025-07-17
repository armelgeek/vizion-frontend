"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play, Star, Calendar, Users, Eye, EyeOff } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { MovieGenresTags } from "./MovieGenresTags";
import { StarRating } from "./StarRating";

interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  genres?: Array<{ id: number; name: string }>;
  genre_ids?: number[];
}

export function MovieCard({ movie }: { movie: Movie }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const releaseYear = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average ? (movie.vote_average / 2) : 0;
  const hasImage = movie.poster_path;

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link href={`/movies/${movie.id}`} className="block relative">
          {/* Loading Skeleton */}
          {!isImageLoaded && (
            <div className="w-full h-72 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
          )}
          
          {/* Movie Poster */}
          {hasImage ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className={`w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              priority={false}
            />
          ) : (
            <div className="w-full h-72 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
              <EyeOff className="w-12 h-12 text-slate-500" />
            </div>
          )}
          
          {/* Overlay on Hover */}
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30 transform transition-all duration-300 hover:scale-110">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
          </div>
          
          {/* Release Year Badge */}
          {releaseYear && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{releaseYear}</span>
            </div>
          )}
        </Link>
        
        {/* Favorite Button */}
        <div className="absolute bottom-3 right-3">
          <FavoriteButton movieId={movie.id} />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <Link 
          href={`/movies/${movie.id}`} 
          className="font-bold text-lg text-slate-800 hover:text-red-600 transition-colors duration-200 line-clamp-2 mb-3 group-hover:text-red-600"
        >
          {movie.title}
        </Link>
        
        {/* Genres */}
        <div className="mb-3">
          <MovieGenresTags genres={movie.genres || movie.genre_ids?.map((id: number) => ({ id, name: '' })) || []} />
        </div>
        
        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <StarRating value={rating} />
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Users className="w-3 h-3" />
            <span>{movie.vote_count || 0}</span>
          </div>
        </div>
        
        {/* Overview Preview */}
        {movie.overview && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {movie.overview}
          </p>
        )}
        
        {/* Action Button */}
        <div className="mt-auto">
          <Link
            href={`/movies/${movie.id}`}
            className="w-full bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            <span>Voir le film</span>
          </Link>
        </div>
      </div>
      
      {/* Bottom Gradient Reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
