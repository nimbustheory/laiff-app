// TMDB Movie (from API)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  runtime?: number;
}

// Cast Member
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Crew Member
export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

// Video (Trailer)
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

// Movie Details (with appended data)
export interface MovieDetails extends Movie {
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  spoken_languages: { english_name: string }[];
  genres: { id: number; name: string }[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos: { results: Video[] };
  similar: { results: Movie[] };
  recommendations: { results: Movie[] };
}

// Festival-specific Movie
export interface FestivalMovie {
  id: string;
  tmdbId?: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  runtime: number;
  synopsis: string;
  posterUrl: string;
  rating: number;
  price: number;
  status: 'active' | 'coming-soon' | 'archived';
  festivalCategory: string;
  notes: string;
}

// Showtime
export interface Showtime {
  id: string;
  movieId: string;
  movieTitle: string;
  date: string;
  time: string;
  venue: string;
  screen: string;
  capacity: number;
  sold: number;
  priceCategory: 'standard' | 'premium' | 'discount';
  status: 'scheduled' | 'on-sale' | 'sold-out' | 'cancelled';
  notes: string;
}

// Ticket Type
export interface TicketType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  discountPercent: number;
  finalPrice: number;
  availability: 'all' | 'members' | 'festival';
  status: 'active' | 'inactive';
  maxPerOrder: number;
  requiresId: boolean;
}

// Promo Code
export interface PromoCode {
  id: string;
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  usageLimit: number;
  usageCount: number;
  validFrom: string;
  validUntil: string;
  status: 'active' | 'expired' | 'depleted';
}

// Event
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

// Notification
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'ticket' | 'event' | 'promo' | 'system';
}

// User Settings
export interface UserSettings {
  name: string;
  email: string;
  membershipLevel: 'none' | 'film-club' | 'supporter' | 'champion';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}
