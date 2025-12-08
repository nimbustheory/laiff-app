import { Crown, Star, Ticket, Users, Gift, Calendar, Check, Sparkles } from 'lucide-react';

export default function Membership() {
  const tiers = [
    {
      id: 'film-club',
      name: 'Film Club',
      price: 75,
      period: 'year',
      color: 'from-laiff-burgundy to-rose-700',
      icon: Users,
      popular: false,
      benefits: [
        'Priority ticket access',
        'Members-only screenings',
        'Quarterly newsletter',
        '10% off merchandise',
        'Festival program guide',
      ],
    },
    {
      id: 'supporter',
      name: 'Supporter',
      price: 150,
      period: 'year',
      color: 'from-laiff-gold to-amber-500',
      icon: Star,
      popular: true,
      benefits: [
        'All Film Club benefits',
        '2 free festival tickets',
        'VIP lounge access',
        'Filmmaker meet & greets',
        'Recognition in program',
        '20% off merchandise',
      ],
    },
    {
      id: 'champion',
      name: 'Champion',
      price: 500,
      period: 'year',
      color: 'from-laiff-dark to-laiff-midnight',
      icon: Crown,
      popular: false,
      benefits: [
        'All Supporter benefits',
        'Festival all-access pass',
        'Opening night gala invite',
        'Awards ceremony seating',
        'Exclusive industry events',
        'Personal concierge service',
        'Tax-deductible donation',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-laiff-cream pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-laiff-dark via-laiff-midnight to-laiff-burgundy text-white px-4 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="relative text-center">
          <div className="w-16 h-16 rounded-full bg-laiff-gold/20 flex items-center justify-center mx-auto mb-4">
            <Crown size={32} className="text-laiff-gold" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">LA Film Club</h1>
          <p className="text-white/80 max-w-xs mx-auto">
            Join our community of film lovers and support independent cinema
          </p>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="p-4 -mt-4 relative z-10">
        <div className="space-y-4">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`card-noir overflow-hidden ${tier.popular ? 'ring-2 ring-laiff-gold shadow-lg' : ''}`}
              >
                {tier.popular && (
                  <div className="bg-gradient-to-r from-laiff-gold to-amber-400 text-laiff-dark text-xs font-bold px-4 py-1.5 text-center flex items-center justify-center gap-1">
                    <Sparkles size={12} />
                    MOST POPULAR
                  </div>
                )}
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-3`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-laiff-dark">{tier.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-laiff-dark">${tier.price}</span>
                      <span className="text-gray-500 text-sm">/{tier.period}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-5">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-laiff-burgundy mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      tier.popular
                        ? 'btn-gold'
                        : 'bg-laiff-rose text-laiff-burgundy hover:bg-laiff-burgundy hover:text-white'
                    }`}
                  >
                    Join {tier.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Join Section */}
      <div className="px-4 py-8 bg-gradient-to-br from-laiff-rose/30 via-white to-laiff-gold/10 mt-4">
        <h2 className="text-xl font-display font-bold text-laiff-dark mb-4 text-center">Why Join?</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 card-noir bg-gradient-to-br from-white to-laiff-burgundy/5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center mx-auto mb-2 shadow-md">
              <Ticket size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-sm text-laiff-dark mb-1">Priority Access</h3>
            <p className="text-xs text-gray-500">Get tickets before they sell out</p>
          </div>
          <div className="text-center p-4 card-noir bg-gradient-to-br from-white to-laiff-gold/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-laiff-gold to-amber-500 flex items-center justify-center mx-auto mb-2 shadow-md">
              <Calendar size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-sm text-laiff-dark mb-1">Exclusive Events</h3>
            <p className="text-xs text-gray-500">Members-only screenings & events</p>
          </div>
          <div className="text-center p-4 card-noir bg-gradient-to-br from-white to-laiff-midnight/5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-laiff-midnight to-laiff-dark flex items-center justify-center mx-auto mb-2 shadow-md">
              <Users size={24} className="text-laiff-gold" />
            </div>
            <h3 className="font-semibold text-sm text-laiff-dark mb-1">Community</h3>
            <p className="text-xs text-gray-500">Connect with fellow film lovers</p>
          </div>
          <div className="text-center p-4 card-noir bg-gradient-to-br from-white to-laiff-coral/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-laiff-coral to-rose-500 flex items-center justify-center mx-auto mb-2 shadow-md">
              <Gift size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-sm text-laiff-dark mb-1">Support Indie Film</h3>
            <p className="text-xs text-gray-500">Help emerging filmmakers</p>
          </div>
        </div>
      </div>

      {/* FAQ Link */}
      <div className="px-4 py-6 text-center bg-gradient-to-t from-laiff-cream to-transparent">
        <p className="text-gray-600 text-sm mb-2">Have questions about membership?</p>
        <a href="/support" className="text-laiff-burgundy font-semibold">View FAQ →</a>
      </div>
    </div>
  );
}
