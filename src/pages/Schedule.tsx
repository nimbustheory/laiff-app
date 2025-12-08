import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Star, Film, Minus, Plus, ChevronLeft, Check, Ticket } from 'lucide-react';
import { tmdbApi } from '../utils/tmdb';
import type { Movie } from '../types';

type PurchaseStep = 'browse' | 'select' | 'checkout' | 'confirmation';

interface SelectedShowtime {
  movie: Movie;
  date: string;
  time: string;
  venue: string;
}

interface TicketSelection {
  adult: number;
  senior: number;
  student: number;
  child: number;
}

export default function Schedule() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState('all');
  
  // Purchase Flow State
  const [step, setStep] = useState<PurchaseStep>('browse');
  const [selectedShowtime, setSelectedShowtime] = useState<SelectedShowtime | null>(null);
  const [tickets, setTickets] = useState<TicketSelection>({ adult: 0, senior: 0, student: 0, child: 0 });
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const venues = [
    { id: 'all', name: 'All Venues' },
    { id: 'mdt', name: 'Million Dollar Theatre' },
    { id: 'smc', name: 'Secret Movie Club' },
  ];

  const ticketPrices = {
    adult: 15,
    senior: 12,
    student: 10,
    child: 8,
  };

  // Generate 7 days of dates
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const data = await tmdbApi.getNowPlaying();
      setMovies(data.results.slice(0, 8));
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectShowtime = (movie: Movie, time: string, venue: string) => {
    setSelectedShowtime({
      movie,
      date: dates[selectedDate].toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time,
      venue: venues.find(v => v.id === venue)?.name || venue,
    });
    setStep('select');
  };

  const updateTicketCount = (type: keyof TicketSelection, delta: number) => {
    setTickets(prev => ({
      ...prev,
      [type]: Math.max(0, Math.min(10, prev[type] + delta)),
    }));
  };

  const totalTickets = Object.values(tickets).reduce((a, b) => a + b, 0);
  const totalPrice = 
    tickets.adult * ticketPrices.adult +
    tickets.senior * ticketPrices.senior +
    tickets.student * ticketPrices.student +
    tickets.child * ticketPrices.child;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmationNumber(`LAIFF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setStep('confirmation');
  };

  const resetFlow = () => {
    setStep('browse');
    setSelectedShowtime(null);
    setTickets({ adult: 0, senior: 0, student: 0, child: 0 });
    setCustomerInfo({ name: '', email: '', phone: '' });
    setConfirmationNumber('');
  };

  // Render based on step
  if (step !== 'browse' && selectedShowtime) {
    return (
      <div className="min-h-screen bg-laiff-cream pb-24" style={{ maxWidth: '390px', margin: '0 auto' }}>
        {/* Header */}
        <div className="bg-laiff-dark text-white px-4 py-4 sticky top-12 z-30">
          <div className="flex items-center gap-3">
            {step !== 'confirmation' && (
              <button
                onClick={() => setStep(step === 'checkout' ? 'select' : 'browse')}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <div>
              <h1 className="text-xl font-display font-bold">
                {step === 'select' && 'Select Tickets'}
                {step === 'checkout' && 'Checkout'}
                {step === 'confirmation' && 'Confirmed!'}
              </h1>
              <p className="text-sm text-white/70">{selectedShowtime.movie.title}</p>
            </div>
          </div>
        </div>

        {/* Step: Select Tickets */}
        {step === 'select' && (
          <div className="p-4">
            {/* Showtime Summary */}
            <div className="card-noir p-4 mb-6">
              <div className="flex gap-4">
                <img
                  src={tmdbApi.getImageUrl(selectedShowtime.movie.poster_path, 'w185')}
                  alt={selectedShowtime.movie.title}
                  className="w-20 h-28 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-laiff-dark mb-2">{selectedShowtime.movie.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Calendar size={14} className="text-laiff-burgundy" />
                      {selectedShowtime.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={14} className="text-laiff-burgundy" />
                      {selectedShowtime.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={14} className="text-laiff-burgundy" />
                      {selectedShowtime.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Types */}
            <h2 className="font-display font-bold text-lg text-laiff-dark mb-3">Select Tickets</h2>
            <div className="space-y-3">
              {/* Adult */}
              <div className="card-noir p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-laiff-dark">Adult</h3>
                  <p className="text-sm text-gray-500">${ticketPrices.adult}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateTicketCount('adult', -1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{tickets.adult}</span>
                  <button
                    onClick={() => updateTicketCount('adult', 1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Senior */}
              <div className="card-noir p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-laiff-dark">Senior (65+)</h3>
                  <p className="text-sm text-gray-500">${ticketPrices.senior}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateTicketCount('senior', -1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{tickets.senior}</span>
                  <button
                    onClick={() => updateTicketCount('senior', 1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Student */}
              <div className="card-noir p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-laiff-dark">Student</h3>
                  <p className="text-sm text-gray-500">${ticketPrices.student} • ID Required</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateTicketCount('student', -1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{tickets.student}</span>
                  <button
                    onClick={() => updateTicketCount('student', 1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Child */}
              <div className="card-noir p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-laiff-dark">Child (under 12)</h3>
                  <p className="text-sm text-gray-500">${ticketPrices.child}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateTicketCount('child', -1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{tickets.child}</span>
                  <button
                    onClick={() => updateTicketCount('child', 1)}
                    className="w-10 h-10 rounded-full bg-laiff-rose flex items-center justify-center text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Total & Continue */}
            <div className="mt-6 card-noir p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total ({totalTickets} tickets)</span>
                <span className="text-2xl font-display font-bold text-laiff-burgundy">${totalPrice}</span>
              </div>
              <button
                onClick={() => setStep('checkout')}
                disabled={totalTickets === 0}
                className={`w-full py-4 rounded-xl font-semibold transition-all ${
                  totalTickets > 0
                    ? 'btn-glamour'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Step: Checkout */}
        {step === 'checkout' && (
          <div className="p-4">
            <form onSubmit={handleCheckout}>
              {/* Order Summary */}
              <div className="card-noir p-4 mb-6">
                <h2 className="font-display font-bold text-lg text-laiff-dark mb-3">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Film</span>
                    <span className="font-medium text-laiff-dark">{selectedShowtime.movie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-medium text-laiff-dark">{selectedShowtime.date}, {selectedShowtime.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Venue</span>
                    <span className="font-medium text-laiff-dark">{selectedShowtime.venue}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    {tickets.adult > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Adult × {tickets.adult}</span>
                        <span className="font-medium">${tickets.adult * ticketPrices.adult}</span>
                      </div>
                    )}
                    {tickets.senior > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Senior × {tickets.senior}</span>
                        <span className="font-medium">${tickets.senior * ticketPrices.senior}</span>
                      </div>
                    )}
                    {tickets.student > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student × {tickets.student}</span>
                        <span className="font-medium">${tickets.student * ticketPrices.student}</span>
                      </div>
                    )}
                    {tickets.child > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Child × {tickets.child}</span>
                        <span className="font-medium">${tickets.child * ticketPrices.child}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between text-lg">
                    <span className="font-bold text-laiff-dark">Total</span>
                    <span className="font-bold text-laiff-burgundy">${totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <h2 className="font-display font-bold text-lg text-laiff-dark mb-3">Your Information</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>

              <button type="submit" className="w-full btn-gold py-4">
                Complete Purchase - ${totalPrice}
              </button>
            </form>
          </div>
        )}

        {/* Step: Confirmation */}
        {step === 'confirmation' && (
          <div className="p-4 text-center">
            <div className="card-noir p-6 mb-6">
              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check size={40} className="text-green-600" />
              </div>
              
              <h2 className="font-display font-bold text-2xl text-laiff-dark mb-2">You're All Set!</h2>
              <p className="text-gray-600 mb-6">Your tickets have been confirmed</p>

              {/* Confirmation Number */}
              <div className="bg-laiff-rose rounded-xl p-4 mb-6">
                <p className="text-sm text-laiff-burgundy mb-1">Confirmation Number</p>
                <p className="font-mono font-bold text-xl text-laiff-dark">{confirmationNumber}</p>
              </div>

              {/* QR Code Placeholder */}
              <div className="w-40 h-40 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center text-gray-400">
                  <Ticket size={32} className="mx-auto mb-2" />
                  <p className="text-xs">QR Code</p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="text-left space-y-2 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Film</span>
                  <span className="font-medium">{selectedShowtime.movie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{selectedShowtime.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{selectedShowtime.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Venue</span>
                  <span className="font-medium">{selectedShowtime.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tickets</span>
                  <span className="font-medium">{totalTickets}</span>
                </div>
              </div>
            </div>

            <button onClick={resetFlow} className="w-full btn-glamour py-4">
              Done
            </button>
          </div>
        )}
      </div>
    );
  }

  // Browse View
  return (
    <div className="min-h-screen bg-gradient-to-b from-laiff-cream via-white to-laiff-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-laiff-midnight to-laiff-dark px-4 pt-4 pb-4 sticky top-12 z-30">
        {/* Date Selector */}
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-2 hide-scrollbar">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(index)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl min-w-[70px] transition-all ${
                selectedDate === index
                  ? 'bg-gradient-to-br from-laiff-burgundy to-laiff-coral text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span className="text-xs font-medium">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-lg font-bold">{date.getDate()}</span>
            </button>
          ))}
        </div>

        {/* Venue Filter */}
        <div className="flex gap-2 mt-3">
          {venues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setSelectedVenue(venue.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedVenue === venue.id
                  ? 'bg-laiff-gold text-laiff-dark'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {venue.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movies with Showtimes */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-laiff-burgundy border-t-transparent"></div>
            <p className="mt-3 text-gray-500">Loading schedule...</p>
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={movie.id} className={`card-noir p-4 ${index % 2 === 0 ? 'bg-gradient-to-br from-white to-laiff-rose/10' : 'bg-gradient-to-br from-white to-laiff-gold/5'}`}>
              <div className="flex gap-4">
                <img
                  src={tmdbApi.getImageUrl(movie.poster_path, 'w185')}
                  alt={movie.title}
                  className="w-20 h-28 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-laiff-dark mb-1 line-clamp-2">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span className="star-rating text-xs">
                      <Star size={10} className="fill-laiff-gold text-laiff-gold" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}</span>
                  </div>
                  
                  {/* Showtimes */}
                  <div className="flex flex-wrap gap-2">
                    {['2:30 PM', '5:00 PM', '7:30 PM'].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleSelectShowtime(movie, time, selectedVenue === 'all' ? 'mdt' : selectedVenue)}
                        className="px-3 py-1.5 bg-laiff-rose text-laiff-burgundy text-sm font-medium rounded-lg hover:bg-laiff-burgundy hover:text-white transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Film size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No showtimes available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
