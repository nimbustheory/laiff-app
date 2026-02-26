import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Film, Search, X, Star, Clock, Play, Ticket, ChevronLeft, 
  ChevronRight, Heart, Share2, Calendar, User, Filter
} from 'lucide-react';
import { tmdbApi, GENRES, GENRE_IDS } from '../utils/tmdb';
import type { Movie, MovieDetails } from '../types';

type Category = 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | 'trending';

export default function Films() {
  const navigate = useNavigate();
  
  // State
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [category, setCategory] = useState<Category>('now_playing');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Movie Detail State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const categories: { id: Category; label: string }[] = [
    { id: 'now_playing', label: 'Now Playing' },
    { id: 'popular', label: 'Popular' },
    { id: 'top_rated', label: 'Top Rated' },
    { id: 'upcoming', label: 'Coming Soon' },
    { id: 'trending', label: 'Trending' },
  ];

  const genreList = Object.entries(GENRE_IDS).map(([name, id]) => ({
    id,
    name,
  }));

  const loadMovies = useCallback(async (resetPage = false) => {
    const currentPage = resetPage ? 1 : page;
    if (resetPage) setPage(1);
    
    setLoading(true);
    try {
      let data;
      
      if (selectedGenre) {
        data = await tmdbApi.discoverMovies({ 
          page: currentPage, 
          genreId: selectedGenre 
        });
      } else {
        switch (category) {
          case 'popular':
            data = await tmdbApi.getPopular(currentPage);
            break;
          case 'top_rated':
            data = await tmdbApi.getTopRated(currentPage);
            break;
          case 'upcoming':
            data = await tmdbApi.getUpcoming(currentPage);
            break;
          case 'trending':
            data = await tmdbApi.getTrending('week');
            break;
          default:
            data = await tmdbApi.getNowPlaying(currentPage);
        }
      }
      
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500));
    } catch (err) {
      console.error('Failed to load movies:', err);
    } finally {
      setLoading(false);
    }
  }, [category, selectedGenre, page]);

  useEffect(() => {
    if (!isSearching) {
      loadMovies(true);
    }
  }, [category, selectedGenre]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isSearching && page > 1) {
      loadMovies();
    }
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearching(false);
      loadMovies(true);
      return;
    }
    
    setIsSearching(true);
    setLoading(true);
    try {
      const data = await tmdbApi.searchMovies(searchQuery);
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500));
      setPage(1);
    } catch (err) {
      console.error('Failed to search movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    loadMovies(true);
  };

  const openMovieDetails = async (movie: Movie) => {
    setSelectedMovie(movie);
    setDetailsLoading(true);
    setShowTrailer(false);
    
    try {
      const details = await tmdbApi.getMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (err) {
      console.error('Failed to load movie details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
    setShowTrailer(false);
  };

  const trailerUrl = movieDetails ? tmdbApi.getTrailerUrl(movieDetails.videos) : null;
  const director = movieDetails ? tmdbApi.getDirector(movieDetails.credits) : null;

  // Movie Details Modal
  if (selectedMovie) {
    return (
      <div className="fixed inset-0 bg-laiff-dark z-50 overflow-y-auto" style={{ maxWidth: '390px', margin: '0 auto' }}>
        {/* Backdrop/Poster */}
        <div className="relative h-72">
          <img
            src={tmdbApi.getImageUrl(selectedMovie.backdrop_path || selectedMovie.poster_path, 'w780')}
            alt={selectedMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-laiff-dark via-laiff-dark/60 to-transparent" />
          
          {/* Back button */}
          <button
            onClick={closeDetails}
            aria-label="Go back"
            className="absolute top-4 left-4 bg-black/50 text-white p-2.5 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-2.5 rounded-full backdrop-blur-sm transition-all ${
                isFavorite ? 'bg-laiff-coral text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button aria-label="Share film" className="bg-black/50 text-white p-2.5 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
          
          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-display font-bold text-white mb-1">{selectedMovie.title}</h1>
            {movieDetails?.tagline && (
              <p className="text-white/70 text-sm italic">{movieDetails.tagline}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-laiff-cream p-4 pb-24 min-h-screen">
          {detailsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-laiff-burgundy border-t-transparent"></div>
            </div>
          ) : (
            <>
              {/* Quick Info */}
              <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-4">
                <span className="star-rating flex items-center gap-1">
                  <Star size={14} className="text-laiff-gold fill-laiff-gold" />
                  <span className="font-bold text-laiff-dark">{selectedMovie.vote_average.toFixed(1)}</span>
                </span>
                {selectedMovie.release_date && (
                  <span className="flex items-center gap-1 bg-laiff-rose px-2 py-1 rounded-lg">
                    <Calendar size={14} className="text-laiff-burgundy" />
                    {new Date(selectedMovie.release_date).getFullYear()}
                  </span>
                )}
                {movieDetails?.runtime && movieDetails.runtime > 0 && (
                  <span className="flex items-center gap-1 bg-laiff-rose px-2 py-1 rounded-lg">
                    <Clock size={14} className="text-laiff-burgundy" />
                    {tmdbApi.formatRuntime(movieDetails.runtime)}
                  </span>
                )}
                {director && director !== 'Unknown' && (
                  <span className="flex items-center gap-1 bg-laiff-rose px-2 py-1 rounded-lg">
                    <User size={14} className="text-laiff-burgundy" />
                    {director}
                  </span>
                )}
              </div>

              {/* Genres */}
              {movieDetails?.genres && movieDetails.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movieDetails.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-laiff-burgundy/10 text-laiff-burgundy text-xs font-medium rounded-full border border-laiff-burgundy/20"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Trailer Button */}
              {trailerUrl && (
                <button
                  onClick={() => setShowTrailer(!showTrailer)}
                  className="w-full btn-glamour mb-4 flex items-center justify-center gap-2"
                >
                  <Play size={20} fill="currentColor" />
                  {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
                </button>
              )}

              {/* Trailer Embed */}
              {showTrailer && trailerUrl && (
                <div className="mb-4 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative pb-[56.25%]">
                    <iframe
                      src={trailerUrl}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      title="Movie Trailer"
                    />
                  </div>
                </div>
              )}

              {/* Synopsis */}
              <div className="mb-6">
                <h2 className="font-display font-bold text-lg text-laiff-dark mb-2">Synopsis</h2>
                <p className="text-gray-600 leading-relaxed">
                  {selectedMovie.overview || 'No synopsis available.'}
                </p>
              </div>

              {/* Cast */}
              {movieDetails?.credits?.cast && movieDetails.credits.cast.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-display font-bold text-lg text-laiff-dark mb-3">Cast</h2>
                  <div className="overflow-x-auto -mx-4 px-4 hide-scrollbar">
                    <div className="flex gap-3" style={{ width: 'max-content' }}>
                      {movieDetails.credits.cast.slice(0, 10).map((person) => (
                        <div key={person.id} className="w-20 flex-shrink-0 text-center">
                          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-200 mb-2">
                            {person.profile_path ? (
                              <img
                                src={tmdbApi.getImageUrl(person.profile_path, 'w185')}
                                alt={person.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-laiff-rose">
                                <User size={24} className="text-laiff-burgundy/50" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs font-medium text-laiff-dark line-clamp-2">{person.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{person.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Similar Films */}
              {movieDetails?.similar?.results && movieDetails.similar.results.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-display font-bold text-lg text-laiff-dark mb-3">Similar Films</h2>
                  <div className="overflow-x-auto -mx-4 px-4 hide-scrollbar">
                    <div className="flex gap-3" style={{ width: 'max-content' }}>
                      {movieDetails.similar.results.slice(0, 8).map((film) => (
                        <div
                          key={film.id}
                          onClick={() => openMovieDetails(film)}
                          className="w-28 flex-shrink-0 cursor-pointer"
                        >
                          <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-200 mb-2 shadow-md">
                            {film.poster_path ? (
                              <img
                                src={tmdbApi.getImageUrl(film.poster_path, 'w185')}
                                alt={film.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-laiff-dark">
                                <Film size={24} className="text-white/30" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs font-medium text-laiff-dark line-clamp-2">{film.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Film Info */}
              {movieDetails && (
                <div className="card-noir p-4 mb-6">
                  <h2 className="font-display font-bold text-lg text-laiff-dark mb-3">Film Info</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="font-medium text-laiff-dark">{movieDetails.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Release Date</span>
                      <span className="font-medium text-laiff-dark">
                        {new Date(movieDetails.release_date).toLocaleDateString()}
                      </span>
                    </div>
                    {movieDetails.spoken_languages?.[0] && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Language</span>
                        <span className="font-medium text-laiff-dark">
                          {movieDetails.spoken_languages[0].english_name}
                        </span>
                      </div>
                    )}
                    {movieDetails.budget > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Budget</span>
                        <span className="font-medium text-laiff-dark">
                          ${movieDetails.budget.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {movieDetails.revenue > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Revenue</span>
                        <span className="font-medium text-laiff-dark">
                          ${movieDetails.revenue.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Get Tickets Button */}
              <button
                onClick={() => {
                  closeDetails();
                  navigate('/schedule');
                }}
                className="w-full btn-gold py-4 flex items-center justify-center gap-2 shadow-lg"
              >
                <Ticket size={20} />
                Get Tickets
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Browse View
  return (
    <div className="min-h-screen bg-gradient-to-b from-laiff-cream via-white to-laiff-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-laiff-midnight to-laiff-dark px-4 pt-4 pb-3 sticky top-12 z-30">
        {/* Search */}
        <form onSubmit={handleSearch} className="mb-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search films..."
                className="w-full pl-10 pr-4 py-2.5 border border-white/20 rounded-xl focus:ring-2 focus:ring-laiff-gold focus:border-transparent text-sm bg-white/10 text-white placeholder:text-white/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-laiff-burgundy to-laiff-coral text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search results indicator */}
        {isSearching && (
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/70 text-sm">Results for "{searchQuery}"</p>
            <button 
              onClick={clearSearch}
              className="text-laiff-gold text-sm font-semibold"
            >
              Clear
            </button>
          </div>
        )}

        {/* Category Tabs */}
        {!isSearching && (
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setSelectedGenre(null);
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  category === cat.id && !selectedGenre
                    ? 'bg-gradient-to-r from-laiff-burgundy to-laiff-coral text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Genre Filter */}
      {!isSearching && (
        <div className="bg-gradient-to-r from-laiff-rose/30 via-white to-laiff-gold/10 px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            <Filter size={16} className="text-laiff-burgundy flex-shrink-0" />
            <button
              onClick={() => setSelectedGenre(null)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-all ${
                !selectedGenre
                  ? 'bg-laiff-dark text-white'
                  : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              All
            </button>
            {genreList.slice(0, 10).map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-all ${
                  selectedGenre === genre.id
                    ? 'bg-laiff-dark text-white'
                    : 'bg-white text-gray-600 shadow-sm'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Movies Grid */}
      <div className="px-4 py-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-laiff-burgundy border-t-transparent"></div>
            <p className="mt-3 text-gray-500">Loading films...</p>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => openMovieDetails(movie)}
                  className="card-noir cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[2/3]">
                    {movie.poster_path ? (
                      <img
                        src={tmdbApi.getImageUrl(movie.poster_path, 'w342')}
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-laiff-dark flex items-center justify-center">
                        <Film size={32} className="text-white/30" />
                      </div>
                    )}
                    {movie.vote_average > 0 && (
                      <div className="absolute top-2 left-2 star-rating text-xs">
                        <Star size={10} className="fill-laiff-gold text-laiff-gold" />
                        <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 leading-tight mb-1 text-laiff-dark">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                      </p>
                      {movie.genre_ids && movie.genre_ids.length > 0 && (
                        <p className="text-xs text-laiff-burgundy font-medium">
                          {GENRES[movie.genre_ids[0]]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && !isSearching && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`p-2 rounded-full ${page === 1 ? 'text-gray-300' : 'text-laiff-burgundy hover:bg-laiff-rose'}`}
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`p-2 rounded-full ${page === totalPages ? 'text-gray-300' : 'text-laiff-burgundy hover:bg-laiff-rose'}`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Film size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No films found.</p>
            {isSearching && (
              <button 
                onClick={clearSearch}
                className="mt-4 text-laiff-burgundy font-semibold"
              >
                Browse all films
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
