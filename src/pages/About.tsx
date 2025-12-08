import { Award, Film, Users, Heart, MapPin, Calendar, Star, ExternalLink } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Years Running', value: '10+', icon: Calendar },
    { label: 'Films Screened', value: '500+', icon: Film },
    { label: 'Filmmakers Featured', value: '300+', icon: Users },
    { label: 'Award Categories', value: '12', icon: Award },
  ];

  const pastWinners = [
    { year: '2024', film: 'Show Her The Money', category: 'Best Documentary' },
    { year: '2024', film: 'Polarized', category: 'Best Drama Feature' },
    { year: '2024', film: 'Tonic', category: 'Best Thriller Feature' },
    { year: '2023', film: 'The Italians', category: 'Best Feature Film' },
    { year: '2023', film: 'Sallywood', category: 'Spirit of LA Award' },
  ];

  return (
    <div className="min-h-screen bg-laiff-cream pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-laiff-dark via-laiff-midnight to-laiff-burgundy text-white px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="absolute top-6 left-6 text-laiff-gold opacity-50">
          <Star size={32} className="fill-current" />
        </div>
        <div className="absolute bottom-6 right-6 text-laiff-gold opacity-50">
          <Star size={32} className="fill-current" />
        </div>
        <div className="relative text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-display font-bold">LA</span>
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">About LAIFF</h1>
          <p className="text-white/80 max-w-xs mx-auto">
            Los Angeles International Film Festival
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="px-4 py-8 -mt-4 relative z-10">
        <div className="card-noir p-6">
          <h2 className="font-display font-bold text-xl text-laiff-dark mb-3 flex items-center gap-2">
            <Heart size={20} className="text-laiff-burgundy" />
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Los Angeles International Film Festival discovers, supports, and develops new talent 
            in filmmaking, providing a platform for emerging and established filmmakers from around the world.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Recognizing the important role independent films have in the history of filmmaking, storytelling, 
            and culture, LAIFF wants to help empower the next generation of artists. We showcase independent 
            films with an edge.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const gradients = [
              'bg-gradient-to-br from-white to-laiff-burgundy/10',
              'bg-gradient-to-br from-white to-laiff-gold/10',
              'bg-gradient-to-br from-white to-laiff-coral/10',
              'bg-gradient-to-br from-white to-laiff-midnight/5',
            ];
            return (
              <div key={stat.label} className={`card-noir p-4 text-center ${gradients[index]}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-2xl font-display font-bold text-laiff-burgundy">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Venue History */}
      <div className="px-4 py-8 bg-gradient-to-br from-laiff-rose/30 via-white to-laiff-gold/10">
        <h2 className="font-display font-bold text-xl text-laiff-dark mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-laiff-burgundy" />
          Our Historic Home
        </h2>
        <div className="card-noir overflow-hidden">
          <div className="h-40 relative overflow-hidden">
            <img 
              src="/images/venues/million-dollar-interior.jpg" 
              alt="Million Dollar Theatre Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <p className="font-display font-bold text-lg">Est. 1918</p>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display font-bold text-lg text-laiff-dark mb-2">Million Dollar Theatre</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The Million Dollar Theatre is an extraordinary gem nestled in Downtown Los Angeles. 
              Steeped in over a century of history, this iconic landmark stands as a testament to the 
              city's rich cultural heritage and the indelible mark left by the golden era of cinema.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Today it remains a beacon for entertainment with boundless opportunities for world-class 
              premieres, special events, filming, and production.
            </p>
          </div>
        </div>
      </div>

      {/* Past Winners */}
      <div className="px-4 py-8 bg-gradient-to-b from-laiff-cream to-white">
        <h2 className="font-display font-bold text-xl text-laiff-dark mb-4 flex items-center gap-2">
          <Award size={20} className="text-laiff-burgundy" />
          Recent Winners
        </h2>
        <div className="space-y-2">
          {pastWinners.map((winner, i) => (
            <div key={i} className={`card-noir p-4 flex items-center gap-4 ${i % 2 === 0 ? 'bg-gradient-to-r from-white to-laiff-gold/5' : 'bg-gradient-to-r from-white to-laiff-rose/10'}`}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="font-display font-bold text-white text-sm">{winner.year}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-laiff-dark truncate">{winner.film}</p>
                <p className="text-xs text-gray-500">{winner.category}</p>
              </div>
              <Award size={16} className="text-laiff-gold flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Submission Info */}
      <div className="px-4 py-6 bg-gradient-to-br from-white via-laiff-rose/20 to-laiff-gold/10">
        <h2 className="font-display font-bold text-xl text-laiff-dark mb-4 flex items-center gap-2">
          <Film size={20} className="text-laiff-burgundy" />
          Film Submissions
        </h2>
        <div className="card-noir p-5">
          <p className="text-gray-600 text-sm mb-4">
            LAIFF accepts indie films in all forms and genres: drama, experimental, comedy, horror, 
            slow cinema, sci-fi, fantasy, animation, documentary, and more.
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Feature Films</span>
              <span className="font-medium text-laiff-dark">$75-85</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Short Films</span>
              <span className="font-medium text-laiff-dark">$45-55</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Music Videos</span>
              <span className="font-medium text-laiff-dark">$30-40</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Feature Scripts</span>
              <span className="font-medium text-laiff-dark">$45-55</span>
            </div>
          </div>
          <a
            href="https://filmfreeway.com/LAIFF"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glamour w-full flex items-center justify-center gap-2"
          >
            Submit on FilmFreeway
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="px-4 py-6">
        <div className="card-noir p-6 text-center bg-gradient-to-br from-laiff-burgundy to-laiff-midnight text-white">
          <Users size={32} className="mx-auto mb-3 text-laiff-gold" />
          <h3 className="font-display font-bold text-xl mb-2">Get Involved</h3>
          <p className="text-white/80 text-sm mb-4">
            Join our community of filmmakers, volunteers, and cinema lovers
          </p>
          <a href="/membership" className="btn-gold inline-block">
            Join LA Film Club
          </a>
        </div>
      </div>
    </div>
  );
}
