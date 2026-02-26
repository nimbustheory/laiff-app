import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Ticket, Star, Clock, Film, Award, Sparkles, Navigation } from 'lucide-react';
import { FESTIVAL } from '../utils/constants';
import FallbackImage from '../components/FallbackImage';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

export default function Festival() {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(!MAPBOX_TOKEN);

  const venues = [
    {
      name: 'Million Dollar Theatre',
      address: '307 S Broadway, Los Angeles',
      description: 'Main Festival Venue',
      coordinates: [-118.2491, 34.0497] as [number, number],
      image: '/images/venues/million-dollar-theatre.jpg',
    },
    {
      name: 'Secret Movie Club',
      address: 'Near Grand Central Market',
      description: 'Workshops & Special Events',
      coordinates: [-118.2493, 34.0512] as [number, number],
      image: '/images/venues/secret-movie-club.jpg',
    },
  ];

  useEffect(() => {
    if (mapError) return;

    const initMap = async () => {
      if (map.current || !mapContainer.current) return;

      try {
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');

        (mapboxgl as any).accessToken = MAPBOX_TOKEN;

        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [-118.2492, 34.0505],
          zoom: 15,
        });
        map.current = mapInstance;

        mapInstance.on('load', () => {
          setMapLoaded(true);

          venues.forEach((venue) => {
            const el = document.createElement('div');
            el.className = 'venue-marker';
            el.style.cssText = `
              width: 32px;
              height: 32px;
              background: linear-gradient(135deg, #9F1239, #FF6B4A);
              border-radius: 50%;
              border: 3px solid #D4AF37;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            `;
            el.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#9F1239"/></svg>';

            new mapboxgl.Marker(el)
              .setLngLat(venue.coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`
                  <div style="padding: 8px; font-family: system-ui;">
                    <h3 style="font-weight: bold; margin: 0 0 4px 0; color: #9F1239;">${venue.name}</h3>
                    <p style="margin: 0; font-size: 12px; color: #666;">${venue.address}</p>
                  </div>
                `)
              )
              .addTo(mapInstance);
          });

          mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
        });

        mapInstance.on('error', () => {
          setMapError(true);
        });

      } catch (error) {
        console.error('Failed to load map:', error);
        setMapError(true);
      }
    };

    initMap();

    return () => {
      map.current?.remove();
    };
  }, [mapError]);

  const passes = [
    {
      id: 'single',
      name: 'Single Screening',
      price: 15,
      description: 'Access to one film screening',
      features: ['One film of your choice', 'Q&A access if available'],
    },
    {
      id: 'day',
      name: 'Day Pass',
      price: 45,
      description: 'Full day of festival access',
      features: ['All screenings that day', 'Priority seating', 'Event access'],
      popular: true,
    },
    {
      id: 'weekend',
      name: 'Weekend Pass',
      price: 99,
      description: 'Full festival experience',
      features: ['All 3 days access', 'VIP seating', 'All events', 'Closing party'],
    },
  ];

  const schedule = [
    {
      day: 'Friday, Nov 14',
      events: [
        { time: '3:30 PM', title: 'Short Block 1', venue: 'Main Theatre' },
        { time: '5:30 PM', title: 'Short Block 2', venue: 'Main Theatre' },
        { time: '7:30 PM', title: 'Opening Night: Deadly Vows', venue: 'Main Theatre', featured: true },
        { time: '9:30 PM', title: 'Opening Night Party', venue: 'Lounge', featured: true },
      ],
    },
    {
      day: 'Saturday, Nov 15',
      events: [
        { time: '3:30 PM', title: 'Short Block 3', venue: 'Main Theatre' },
        { time: '5:30 PM', title: 'Short Block 4', venue: 'Main Theatre' },
        { time: '7:30 PM', title: 'Where Darkness Dwells', venue: 'Main Theatre' },
        { time: '9:00 PM', title: 'Filmmaker Mixer', venue: 'Secret Movie Club' },
      ],
    },
    {
      day: 'Sunday, Nov 16',
      events: [
        { time: '1:00 PM', title: 'Speed Pitching Event', venue: 'Secret Movie Club' },
        { time: '3:30 PM', title: 'Short Block 5', venue: 'Main Theatre' },
        { time: '5:30 PM', title: 'Short Block 6', venue: 'Main Theatre' },
        { time: '9:00 PM', title: 'Closing Night Awards', venue: 'Main Theatre', featured: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-laiff-cream pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-laiff-burgundy via-rose-800 to-laiff-midnight text-white px-4 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="absolute top-4 right-4 text-laiff-gold">
          <Star size={24} className="fill-current" />
        </div>
        <div className="absolute bottom-4 left-4 text-laiff-gold">
          <Star size={24} className="fill-current" />
        </div>
        <div className="relative text-center">
          <div className="text-laiff-gold text-sm tracking-[0.3em] font-medium mb-2">{FESTIVAL.name} {FESTIVAL.year}</div>
          <h1 className="text-4xl font-display font-bold mb-2">Festival Guide</h1>
          <p className="text-white/80">{FESTIVAL.dateDisplay}</p>
          <p className="text-white/60 text-sm mt-1">{FESTIVAL.venue.name}, DTLA</p>
        </div>
      </div>

      {/* Venue Map */}
      <div className="px-4 py-6 -mt-4 relative z-10">
        <h2 className="text-xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-laiff-burgundy" />
          Festival Venues
        </h2>
        <div className="card-noir overflow-hidden mb-4">
          {mapError ? (
            // Fallback static map image
            <a 
              href="https://www.google.com/maps/place/Million+Dollar+Theatre/@34.0497,-118.2491,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-48 bg-gradient-to-br from-laiff-midnight to-laiff-dark flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-art-deco opacity-10" />
              <div className="text-center text-white relative z-10">
                <MapPin size={32} className="mx-auto mb-2 text-laiff-gold" />
                <p className="font-display font-bold">View on Google Maps</p>
                <p className="text-sm text-white/70">Downtown Los Angeles</p>
              </div>
            </a>
          ) : (
            <div className="relative">
              <div ref={mapContainer} className="h-48 w-full" />
              {!mapLoaded && (
                <div className="absolute inset-0 bg-laiff-midnight flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-8 h-8 border-2 border-laiff-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-white/70">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="space-y-3">
          {venues.map((venue, index) => (
            <div key={venue.name} className={`card-noir overflow-hidden ${index === 0 ? 'bg-gradient-to-r from-white to-laiff-burgundy/5' : 'bg-gradient-to-r from-white to-laiff-gold/5'}`}>
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0">
                  <FallbackImage
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                    type="venue"
                  />
                </div>
                <div className="flex-1 p-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-laiff-dark">{venue.name}</h3>
                    <p className="text-xs text-gray-500">{venue.address}</p>
                    <p className="text-xs text-laiff-burgundy mt-1">{venue.description}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates[1]},${venue.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-r from-laiff-burgundy to-laiff-coral text-white rounded-lg shadow-md flex-shrink-0"
                  >
                    <Navigation size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Festival Passes */}
      <div className="px-4 py-6 bg-gradient-to-b from-laiff-cream to-white">
        <h2 className="text-xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
          <Ticket size={20} className="text-laiff-burgundy" />
          Festival Passes
        </h2>
        <div className="space-y-3">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className={`card-noir p-4 ${pass.popular ? 'ring-2 ring-laiff-gold' : ''}`}
            >
              {pass.popular && (
                <div className="text-xs font-bold text-laiff-gold mb-2 flex items-center gap-1">
                  <Sparkles size={12} />
                  BEST VALUE
                </div>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-laiff-dark">{pass.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{pass.description}</p>
                  <ul className="space-y-1">
                    {pass.features.map((feature, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="w-1 h-1 bg-laiff-burgundy rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-laiff-burgundy">${pass.price}</span>
                  <button className="block mt-2 px-4 py-2 bg-laiff-rose text-laiff-burgundy text-sm font-semibold rounded-lg hover:bg-laiff-burgundy hover:text-white transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Overview */}
      <div className="px-4 py-6 bg-gradient-to-br from-laiff-rose/30 via-white to-laiff-gold/10">
        <h2 className="text-xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-laiff-burgundy" />
          Schedule Overview
        </h2>
        <div className="space-y-6">
          {schedule.map((day) => (
            <div key={day.day}>
              <h3 className="font-display font-bold text-laiff-burgundy mb-3">{day.day}</h3>
              <div className="space-y-2">
                {day.events.map((event, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      event.featured 
                        ? 'bg-gradient-to-r from-laiff-rose to-laiff-burgundy/10 border border-laiff-burgundy/20' 
                        : 'bg-white shadow-sm'
                    }`}
                  >
                    <div className="text-center min-w-[60px]">
                      <Clock size={14} className="mx-auto text-laiff-burgundy mb-1" />
                      <span className="text-xs font-medium text-gray-600">{event.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${event.featured ? 'text-laiff-burgundy' : 'text-laiff-dark'}`}>
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={10} />
                        {event.venue}
                      </p>
                    </div>
                    {event.featured && (
                      <Award size={16} className="text-laiff-gold" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Award Categories */}
      <div className="px-4 py-6 bg-gradient-to-b from-laiff-cream to-white">
        <h2 className="text-xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
          <Award size={20} className="text-laiff-burgundy" />
          Award Categories
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            'Best Feature Film',
            'Best Documentary',
            'Best Short Film',
            'Best Director',
            'Best Screenplay',
            'Audience Choice',
            'Best Horror/Sci-Fi',
            'Best Animation',
          ].map((category, index) => (
            <div key={category} className={`card-noir p-3 text-center ${index % 2 === 0 ? 'bg-gradient-to-br from-white to-laiff-gold/10' : 'bg-gradient-to-br from-white to-laiff-rose/10'}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Film size={14} className="text-white" />
              </div>
              <p className="text-xs font-medium text-laiff-dark">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-6">
        <div className="card-noir p-6 text-center bg-gradient-to-br from-laiff-burgundy to-laiff-midnight text-white">
          <Sparkles size={32} className="mx-auto mb-3 text-laiff-gold" />
          <h3 className="font-display font-bold text-xl mb-2">Don't Miss Out!</h3>
          <p className="text-white/80 text-sm mb-4">Get your festival pass today and experience the best of independent cinema</p>
          <button className="btn-gold w-full">
            Get Festival Pass
          </button>
        </div>
      </div>
    </div>
  );
}
