import { Heart, Users, DollarSign, Calendar, Mail, ExternalLink, Sparkles, Award } from 'lucide-react';

export default function Support() {
  const volunteerRoles = [
    { title: 'Box Office & Check-In', description: 'Greet attendees and manage ticket scanning' },
    { title: 'Venue Usher', description: 'Guide guests and ensure smooth screenings' },
    { title: 'Filmmaker Hospitality', description: 'Welcome and assist visiting filmmakers' },
    { title: 'Event Setup & Breakdown', description: 'Help prepare venues before and after events' },
  ];

  const yearRoundPrograms = [
    { 
      title: 'Monthly Screenings', 
      description: 'Year-round indie film screenings at partner venues',
      icon: Calendar,
    },
    { 
      title: 'Filmmaker Workshops', 
      description: 'Educational programs for emerging filmmakers',
      icon: Users,
    },
    { 
      title: 'Youth Film Initiative', 
      description: 'Bringing film education to LA high schools',
      icon: Sparkles,
    },
    { 
      title: 'Diversity in Film', 
      description: 'Supporting underrepresented voices in cinema',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-laiff-cream pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-laiff-burgundy via-rose-800 to-laiff-midnight text-white px-4 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="relative text-center">
          <Heart size={40} className="mx-auto mb-3 text-laiff-gold" />
          <h1 className="text-3xl font-display font-bold mb-2">Support LAIFF</h1>
          <p className="text-white/80 max-w-xs mx-auto">
            Help us celebrate and support independent cinema in Los Angeles
          </p>
        </div>
      </div>

      {/* Volunteer Section */}
      <div className="px-4 py-6 -mt-4 relative z-10">
        <div className="card-noir p-5 mb-6">
          <h2 className="text-xl font-display font-bold text-laiff-dark mb-2 flex items-center gap-2">
            <Users size={20} className="text-laiff-burgundy" />
            Volunteer
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Join our team of dedicated volunteers and be part of the magic. Festival volunteers receive 
            complimentary passes and exclusive LAIFF merchandise.
          </p>
          
          <div className="space-y-2 mb-4">
            {volunteerRoles.map((role, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-laiff-burgundy rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-laiff-dark">{role.title}</p>
                  <p className="text-xs text-gray-500">{role.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="mailto:volunteer@laiff.org?subject=Volunteer%20Application"
            className="btn-glamour w-full flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            Apply to Volunteer
          </a>
        </div>

        {/* Donate Section */}
        <div className="card-noir p-5 bg-gradient-to-br from-laiff-gold/10 to-amber-50 border border-laiff-gold/20">
          <h2 className="text-xl font-display font-bold text-laiff-dark mb-2 flex items-center gap-2">
            <DollarSign size={20} className="text-laiff-gold" />
            Make a Donation
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            LAIFF is a 501(c)(3) non-profit organization. Your tax-deductible donation helps us 
            discover and support new filmmaking talent year-round.
          </p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[25, 50, 100].map((amount) => (
              <button
                key={amount}
                className="py-3 px-4 bg-white border-2 border-laiff-gold/30 rounded-xl font-bold text-laiff-dark hover:border-laiff-gold hover:bg-laiff-gold/10 transition-all"
              >
                ${amount}
              </button>
            ))}
          </div>

          <a
            href="https://laiff.org/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full flex items-center justify-center gap-2"
          >
            <Heart size={18} />
            Donate Now
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Year-Round Programming */}
      <div className="px-4 py-6 bg-white">
        <h2 className="text-xl font-display font-bold text-laiff-dark mb-2">Year-Round Programming</h2>
        <p className="text-gray-600 text-sm mb-4">
          Your support enables LAIFF to offer these programs throughout the year
        </p>

        <div className="grid grid-cols-2 gap-3">
          {yearRoundPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <div key={program.title} className="card-noir p-4">
                <div className="w-10 h-10 rounded-xl bg-laiff-rose flex items-center justify-center mb-2">
                  <Icon size={20} className="text-laiff-burgundy" />
                </div>
                <h3 className="font-semibold text-sm text-laiff-dark mb-1">{program.title}</h3>
                <p className="text-xs text-gray-500">{program.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corporate Sponsorship */}
      <div className="px-4 py-6">
        <div className="card-noir p-5">
          <h2 className="text-xl font-display font-bold text-laiff-dark mb-2">Corporate Sponsorship</h2>
          <p className="text-gray-600 text-sm mb-4">
            Partner with LAIFF to reach engaged audiences who love independent film. 
            Sponsorship packages include branding, VIP access, and more.
          </p>
          <a
            href="mailto:sponsors@laiff.org?subject=Sponsorship%20Inquiry"
            className="text-laiff-burgundy font-semibold text-sm flex items-center gap-2"
          >
            <Mail size={16} />
            Contact Our Sponsorship Team
          </a>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="px-4 py-6 bg-gradient-to-br from-laiff-burgundy to-laiff-midnight text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="relative text-center">
          <h2 className="text-xl font-display font-bold mb-6">Your Impact</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-display font-bold text-laiff-gold">500+</p>
              <p className="text-xs text-white/70">Films Screened</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-laiff-gold">10K+</p>
              <p className="text-xs text-white/70">Attendees Reached</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-laiff-gold">300+</p>
              <p className="text-xs text-white/70">Filmmakers Supported</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="px-4 py-6">
        <div className="card-noir p-5 text-center">
          <h2 className="text-xl font-display font-bold text-laiff-dark mb-2">Questions?</h2>
          <p className="text-gray-600 text-sm mb-4">
            We'd love to hear from you about how you can support LAIFF
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="mailto:info@laiff.org"
              className="flex items-center gap-2 px-4 py-2 bg-laiff-rose text-laiff-burgundy rounded-xl font-semibold text-sm"
            >
              <Mail size={16} />
              Email Us
            </a>
            <a
              href="https://laiff.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm"
            >
              <ExternalLink size={16} />
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
