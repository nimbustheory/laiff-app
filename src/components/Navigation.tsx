import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Film, Calendar, Sparkles, MoreHorizontal } from 'lucide-react';
import MoreModal from './MoreModal';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMoreModal, setShowMoreModal] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/films', icon: Film, label: 'Films' },
    { path: '/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/events', icon: Sparkles, label: 'Events' },
  ];

  // Check if any of the "more" pages are active
  const morePages = ['/membership', '/festival', '/support', '/about'];
  const isMoreActive = morePages.includes(location.pathname);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50" style={{ maxWidth: '390px', margin: '0 auto' }} aria-label="Main navigation">
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-laiff-gold/50 to-transparent" />
        
        <div className="bg-laiff-dark/95 backdrop-glamour px-2 py-2 flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-laiff-burgundy to-laiff-coral text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-laiff-gold rounded-full" />
                )}
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMoreModal(true)}
            aria-label="More options"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
              isMoreActive
                ? 'bg-gradient-to-br from-laiff-burgundy to-laiff-coral text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <MoreHorizontal size={20} strokeWidth={isMoreActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">More</span>
            
            {isMoreActive && (
              <div className="absolute -bottom-1 w-1 h-1 bg-laiff-gold rounded-full" />
            )}
          </button>
        </div>
        
        {/* Safe area spacer for iOS */}
        <div className="h-safe-area-inset-bottom bg-laiff-dark" />
      </nav>

      {/* More Modal */}
      <MoreModal isOpen={showMoreModal} onClose={() => setShowMoreModal(false)} />
    </>
  );
}
