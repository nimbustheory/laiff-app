const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

interface TMDBResponse {
  results: any[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const tmdbApi = {
  // Core endpoints
  getNowPlaying: async (page = 1): Promise<TMDBResponse> => {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
    return res.json();
  },

  getPopular: async (page = 1): Promise<TMDBResponse> => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return res.json();
  },

  getTopRated: async (page = 1): Promise<TMDBResponse> => {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
    return res.json();
  },

  getUpcoming: async (page = 1): Promise<TMDBResponse> => {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`);
    return res.json();
  },

  getTrending: async (timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse> => {
    const res = await fetch(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`);
    return res.json();
  },

  // Search
  searchMovies: async (query: string, page = 1): Promise<TMDBResponse> => {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    return res.json();
  },

  // Details (with append_to_response for cast, trailers, similar)
  getMovieDetails: async (id: number) => {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar,recommendations,reviews`
    );
    return res.json();
  },

  // Discovery
  discoverMovies: async (params: {
    page?: number;
    genreId?: number;
    year?: number;
    sortBy?: string;
    minRating?: number;
  }): Promise<TMDBResponse> => {
    const url = new URL(`${BASE_URL}/discover/movie`);
    url.searchParams.append('api_key', API_KEY);
    if (params.page) url.searchParams.append('page', String(params.page));
    if (params.genreId) url.searchParams.append('with_genres', String(params.genreId));
    if (params.year) url.searchParams.append('primary_release_year', String(params.year));
    if (params.sortBy) url.searchParams.append('sort_by', params.sortBy);
    if (params.minRating) url.searchParams.append('vote_average.gte', String(params.minRating));
    const res = await fetch(url.toString());
    return res.json();
  },

  // Image helpers
  getImageUrl: (path: string | null, size = 'w500'): string => {
    if (!path) return '';
    return `${IMAGE_BASE}/${size}${path}`;
  },

  getBackdropUrl: (path: string | null, size = 'w1280'): string => {
    if (!path) return '';
    return `${IMAGE_BASE}/${size}${path}`;
  },

  // Format runtime
  formatRuntime: (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  },

  // Get trailer URL
  getTrailerUrl: (videos: { results: any[] } | undefined): string | null => {
    if (!videos?.results) return null;
    const trailer = videos.results.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  },

  // Get director
  getDirector: (credits: { crew: any[] } | undefined): string => {
    if (!credits?.crew) return 'Unknown';
    const director = credits.crew.find((c: any) => c.job === 'Director');
    return director?.name || 'Unknown';
  },
};

// Genre ID to Name mapping (TMDB genre IDs)
export const GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

// Genre Name to ID mapping (for filtering)
export const GENRE_IDS: Record<string, number> = {
  'Action': 28,
  'Adventure': 12,
  'Animation': 16,
  'Comedy': 35,
  'Crime': 80,
  'Documentary': 99,
  'Drama': 18,
  'Family': 10751,
  'Fantasy': 14,
  'History': 36,
  'Horror': 27,
  'Music': 10402,
  'Mystery': 9648,
  'Romance': 10749,
  'Sci-Fi': 878,
  'Thriller': 53,
  'War': 10752,
  'Western': 37,
};
