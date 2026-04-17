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

  const morePages = ['/membership', '/festival', '/support', '/about'];
  const isMoreActive = morePages.includes(location.pathname);

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          zIndex: 50,
          background: 'rgba(15,15,15,0.96)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '1px solid rgba(212,175,55,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 4px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
          }}
        />

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                padding: '6px 4px',
                border: 'none',
                background: 'transparent',
                color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.55)',
                cursor: 'pointer',
                height: '100%',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => setShowMoreModal(true)}
          aria-label="More options"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            padding: '6px 4px',
            border: 'none',
            background: 'transparent',
            color: isMoreActive ? '#D4AF37' : 'rgba(255,255,255,0.55)',
            cursor: 'pointer',
            height: '100%',
          }}
        >
          <MoreHorizontal size={20} strokeWidth={isMoreActive ? 2.5 : 2} />
          <span
            style={{
              fontSize: 10,
              fontWeight: isMoreActive ? 700 : 500,
              letterSpacing: '0.02em',
            }}
          >
            More
          </span>
        </button>
      </nav>

      <MoreModal isOpen={showMoreModal} onClose={() => setShowMoreModal(false)} />
    </>
  );
}
