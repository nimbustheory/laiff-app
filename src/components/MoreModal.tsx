import { X, Crown, MapPin, Heart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoreModal({ isOpen, onClose }: MoreModalProps) {
  if (!isOpen) return null;

  const menuItems = [
    {
      to: '/membership',
      icon: Crown,
      title: 'Membership',
      description: 'Join LA Film Club for exclusive benefits',
      color: 'bg-laiff-gold/20 text-laiff-gold',
    },
    {
      to: '/festival',
      icon: MapPin,
      title: 'Festival',
      description: 'Festival info, venues & passes',
      color: 'bg-laiff-burgundy/20 text-laiff-burgundy',
    },
    {
      to: '/support',
      icon: Heart,
      title: 'Support',
      description: 'Volunteer, donate & help us grow',
      color: 'bg-laiff-coral/20 text-laiff-coral',
    },
    {
      to: '/about',
      icon: Info,
      title: 'About',
      description: 'Our mission, history & team',
      color: 'bg-blue-500/20 text-blue-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div 
        className="relative bg-white w-full rounded-t-3xl p-6 pb-8 animate-slide-up"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Handle */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-laiff-dark">More</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-laiff-dark">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
