import { Star, Film } from 'lucide-react';
import { tmdbApi, GENRES } from '../utils/tmdb';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = tmdbApi.getImageUrl(movie.poster_path, 'w342');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
  const genreName = movie.genre_ids?.[0] ? GENRES[movie.genre_ids[0]] : null;

  return (
    <div
      onClick={() => onClick(movie)}
      className="card-noir cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-laiff-dark to-laiff-midnight flex items-center justify-center">
            <Film size={32} className="text-white/30" />
          </div>
        )}
        
        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 left-2 star-rating">
            <Star size={12} className="fill-laiff-gold text-laiff-gold" />
            <span className="text-xs font-bold text-laiff-dark">{movie.vote_average.toFixed(1)}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-laiff-dark line-clamp-2 leading-tight mb-1 group-hover:text-laiff-burgundy transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          {year && (
            <span className="text-xs text-gray-500">{year}</span>
          )}
          {genreName && (
            <span className="text-xs text-laiff-burgundy font-medium">{genreName}</span>
          )}
        </div>
      </div>
    </div>
  );
}
