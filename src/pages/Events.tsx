import { Calendar, MapPin, Clock, Sparkles, Users, Award, Film, Music } from 'lucide-react';

export default function Events() {
  const events = [
    {
      id: '1',
      title: 'Opening Night Gala: Deadly Vows Premiere',
      description: 'Join us for the LA premiere of Jared Cohn\'s latest thriller with red carpet reception and filmmaker Q&A',
      category: 'Premiere',
      date: 'Friday, Nov 14',
      time: '7:30 PM',
      venue: 'Million Dollar Theatre',
      featured: true,
      image: '/images/events/opening-night-gala.jpg',
    },
    {
      id: '2',
      title: 'Short Block 1: International Shorts',
      description: 'A curated selection of short films from emerging international filmmakers',
      category: 'Screening',
      date: 'Friday, Nov 14',
      time: '3:30 PM',
      venue: 'Million Dollar Theatre',
    },
    {
      id: '3',
      title: 'Filmmaker Networking Mixer',
      description: 'Connect with fellow filmmakers, industry professionals, and film enthusiasts over drinks',
      category: 'Networking',
      date: 'Saturday, Nov 15',
      time: '9:00 PM',
      venue: 'Secret Movie Club',
    },
    {
      id: '4',
      title: 'Documentary Feature: Where Darkness Dwells',
      description: 'World premiere followed by Q&A with director Michael May',
      category: 'Screening',
      date: 'Saturday, Nov 15',
      time: '7:30 PM',
      venue: 'Million Dollar Theatre',
      image: '/images/events/filmmaker-qa.jpg',
    },
    {
      id: '5',
      title: 'Speed Pitching Mini-Market',
      description: 'Selected filmmakers pitch their projects to industry professionals',
      category: 'Workshop',
      date: 'Sunday, Nov 16',
      time: '1:00 PM',
      venue: 'Secret Movie Club',
    },
    {
      id: '6',
      title: 'Closing Night Awards Ceremony',
      description: 'Celebrate the best of LAIFF 2025 at our awards ceremony and closing reception',
      category: 'Festival',
      date: 'Sunday, Nov 16',
      time: '9:00 PM',
      venue: 'Million Dollar Theatre',
      featured: true,
      image: '/images/events/opening-night-gala.jpg',
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Premiere': return <Award size={16} />;
      case 'Screening': return <Film size={16} />;
      case 'Networking': return <Users size={16} />;
      case 'Workshop': return <Sparkles size={16} />;
      case 'Festival': return <Music size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Premiere': return 'bg-laiff-gold/20 text-laiff-gold border-laiff-gold/30';
      case 'Screening': return 'bg-laiff-burgundy/10 text-laiff-burgundy border-laiff-burgundy/20';
      case 'Networking': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Workshop': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Festival': return 'bg-laiff-coral/20 text-laiff-coral border-laiff-coral/30';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-laiff-cream pb-24">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-laiff-dark via-laiff-midnight to-laiff-burgundy text-white px-4 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="absolute top-2 right-4 text-laiff-gold/30">
          <Sparkles size={40} />
        </div>
        <div className="relative">
          <h1 className="text-3xl font-display font-bold mb-1">Events</h1>
          <p className="text-white/70 text-sm">November 14-16, 2025</p>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4 -mt-2 relative z-10">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`card-noir overflow-hidden ${event.featured ? 'ring-2 ring-laiff-gold/50' : ''} ${
              index % 2 === 0 ? 'bg-gradient-to-br from-white to-laiff-rose/10' : 'bg-gradient-to-br from-white to-laiff-gold/5'
            }`}
          >
            {event.featured && (
              <div className="bg-gradient-to-r from-laiff-gold to-amber-500 text-laiff-dark text-xs font-semibold px-4 py-1.5 flex items-center gap-1">
                <Sparkles size={12} />
                Featured Event
              </div>
            )}
            {event.image && (
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}
            <div className="p-4">
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                  {getCategoryIcon(event.category)}
                  {event.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-bold text-lg text-laiff-dark mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

              {/* Details */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-laiff-burgundy" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-laiff-burgundy" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-laiff-burgundy" />
                  {event.venue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
