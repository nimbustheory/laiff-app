import { Link, useNavigate } from 'react-router-dom';
import { Film, Calendar, Ticket, MapPin, Users, Award, Star, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Movie } from '../types';
import { tmdbApi } from '../utils/tmdb';
import { FESTIVAL } from '../utils/constants';
import MovieCard from '../components/MovieCard';
import FallbackImage from '../components/FallbackImage';

export default function Home() {
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNowPlaying();
  }, []);

  const loadNowPlaying = async () => {
    try {
      const data = await tmdbApi.getNowPlaying();
      setNowPlaying(data.results.slice(0, 10));
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (_movie: Movie) => {
    navigate('/films');
  };

  return (
    <div className="min-h-screen bg-laiff-cream pb-24">
      {/* Hero Section - Hollywood Glamour */}
      <div className="relative h-[480px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <FallbackImage
            src="/images/branding/hero-background.jpg"
            alt="LAIFF Background"
            className="w-full h-full object-cover"
            type="hero"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-laiff-dark/90 via-laiff-midnight/80 to-laiff-burgundy/70" />
          {/* Art Deco Pattern Overlay */}
          <div className="absolute inset-0 bg-art-deco opacity-20" />
          {/* Spotlight effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-laiff-gold/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-white px-6 text-center">
          {/* Gold star decoration */}
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-laiff-gold fill-laiff-gold" />
            <span className="text-laiff-gold text-sm tracking-[0.3em] font-medium">{FESTIVAL.dateDisplay.toUpperCase()}</span>
            <Star size={16} className="text-laiff-gold fill-laiff-gold" />
          </div>

          {/* Logo */}
          <div className="mb-2">
            <h1 className="font-display text-5xl font-bold tracking-tight">
              <span className="text-gradient-gold">LAIFF</span>
            </h1>
          </div>
          
          <p className="font-display text-xl text-white/90 mb-1">Los Angeles International</p>
          <p className="font-display text-xl text-white/90 mb-6">Film Festival</p>
          
          <p className="text-white/70 text-sm max-w-xs mb-8">
            Celebrating independent cinema with an edge at the historic Million Dollar Theatre
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Link
              to="/films"
              className="btn-gold flex items-center justify-center gap-2"
            >
              <Ticket size={20} />
              Browse Films & Get Tickets
            </Link>
            <Link
              to="/membership"
              className="bg-white/10 backdrop-blur text-white font-semibold py-3 px-6 rounded-xl border border-laiff-gold/30 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Award size={20} />
              Join LA Film Club
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-laiff-cream to-transparent" />
      </div>

      {/* Now Playing Section */}
      <div className="pt-4 pb-2 bg-gradient-to-b from-laiff-cream to-white">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-bold text-laiff-dark flex items-center gap-2">
              <Film size={24} className="text-laiff-burgundy" />
              Now Playing
            </h2>
            <Link to="/films" className="text-laiff-burgundy font-semibold text-sm flex items-center gap-1">
              View All
              <Sparkles size={14} />
            </Link>
          </div>

          {/* Horizontal Scroll */}
          <div className="overflow-x-auto -mx-4 px-4 pb-4 hide-scrollbar">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {!loading && nowPlaying.length > 0 ? (
                nowPlaying.map((movie) => (
                  <div key={movie.id} className="w-40 flex-shrink-0">
                    <MovieCard movie={movie} onClick={handleMovieClick} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8 text-gray-500">
                  {loading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-6 h-6 border-2 border-laiff-burgundy border-t-transparent rounded-full animate-spin" />
                      Loading films...
                    </div>
                  ) : (
                    'Add your TMDB API key to see films'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Event */}
      <div className="py-4 px-4">
        <h2 className="text-2xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
          <Calendar size={24} className="text-laiff-burgundy" />
          Featured Event
        </h2>

        <Link to="/events" className="block">
          <div className="card-noir overflow-hidden">
            <div className="h-48 relative overflow-hidden">
              <FallbackImage
                src="/images/events/opening-night-gala.jpg"
                alt="Opening Night Gala"
                className="w-full h-full object-cover"
                type="event"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-laiff-gold">
                <Star size={24} className="fill-current" />
              </div>
              <div className="absolute bottom-4 right-4 text-laiff-gold">
                <Star size={24} className="fill-current" />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <Award size={32} className="text-laiff-gold mb-1" />
                <p className="text-sm font-display">Opening Night</p>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs text-laiff-gold font-semibold tracking-wider mb-1">OPENING NIGHT GALA</div>
              <h3 className="text-xl font-display font-bold text-laiff-dark mb-2">Deadly Vows Premiere</h3>
              <p className="text-gray-600 text-sm mb-3">
                Join us for the LA premiere of Jared Cohn's latest thriller with red carpet reception and filmmaker Q&A
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={16} className="text-laiff-burgundy" />
                  Nov 14, 7:30 PM
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} className="text-laiff-burgundy" />
                  Million Dollar
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Our Venue Section */}
      <div className="py-6 px-4 bg-gradient-to-br from-laiff-rose/50 via-white to-laiff-cream">
        <h2 className="text-2xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
          <MapPin size={24} className="text-laiff-burgundy" />
          Our Venue
        </h2>

        <Link to="/about" className="block">
          <div className="card-noir overflow-hidden">
            <div className="h-48 relative overflow-hidden">
              <FallbackImage
                src="/images/venues/million-dollar-theatre.jpg"
                alt="Million Dollar Theatre"
                className="w-full h-full object-cover"
                type="venue"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                  <Film size={24} />
                </div>
                <p className="text-sm opacity-90">Historic LA Landmark</p>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-xl text-laiff-dark mb-2">Million Dollar Theatre</h3>
              <p className="text-sm text-gray-600 mb-3">
                An extraordinary gem in Downtown Los Angeles, steeped in over a century of cinematic history
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin size={14} />
                307 S Broadway, Los Angeles
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions Grid */}
      <div className="py-6 px-4 bg-gradient-to-b from-laiff-cream via-white to-laiff-rose/30">
        <h2 className="text-2xl font-display font-bold text-laiff-dark mb-4">Quick Actions</h2>

        <div className="grid grid-cols-2 gap-4">
          <Link to="/films" className="card-noir p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-laiff-rose/20">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Film size={28} className="text-white" />
            </div>
            <div className="font-semibold text-laiff-dark">Browse Films</div>
          </Link>

          <Link to="/schedule" className="card-noir p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-laiff-gold/10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-laiff-gold to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Calendar size={28} className="text-white" />
            </div>
            <div className="font-semibold text-laiff-dark">Schedule</div>
          </Link>

          <Link to="/membership" className="card-noir p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-laiff-midnight/5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-laiff-midnight to-laiff-dark flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Users size={28} className="text-laiff-gold" />
            </div>
            <div className="font-semibold text-laiff-dark">Film Club</div>
          </Link>

          <Link to="/events" className="card-noir p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-laiff-coral/10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-laiff-coral to-rose-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Sparkles size={28} className="text-white" />
            </div>
            <div className="font-semibold text-laiff-dark">Events</div>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="py-8 px-4 bg-gradient-to-br from-laiff-burgundy to-laiff-midnight text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="text-center max-w-md mx-auto relative z-10">
          <Award size={48} className="mx-auto mb-4 text-laiff-gold" />
          <h2 className="text-2xl font-display font-bold mb-3">About LAIFF</h2>
          <p className="text-white/90 leading-relaxed mb-6">
            The Los Angeles International Film Festival discovers, supports, and develops 
            new talent in filmmaking, providing a platform for emerging and established 
            filmmakers from around the world. Celebrating independent films with an edge.
          </p>
          <Link
            to="/about"
            className="inline-block bg-laiff-gold text-laiff-dark font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
