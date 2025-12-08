import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Film, Calendar, Ticket, Sparkles, 
  Radio, LogOut, ChevronRight 
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export default function AdminNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleAdmin } = useAdmin();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/movies', icon: Film, label: 'Movies' },
    { path: '/admin/showtimes', icon: Calendar, label: 'Showtimes' },
    { path: '/admin/tickets', icon: Ticket, label: 'Tickets' },
    { path: '/admin/events', icon: Sparkles, label: 'Events' },
    { path: '/admin/broadcast', icon: Radio, label: 'Broadcast' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-laiff-dark text-white flex flex-col z-50">
      {/* Logo Area */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center shadow-lg">
            <span className="text-xl font-display font-bold">LA</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">LAIFF</h1>
            <p className="text-xs text-laiff-gold tracking-widest">ADMIN PANEL</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-laiff-burgundy to-laiff-coral text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span className="flex-1 font-medium">{item.label}</span>
              <ChevronRight 
                size={16} 
                className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`} 
              />
            </button>
          );
        })}
      </nav>

      {/* Exit Admin */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={toggleAdmin}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Exit Admin Mode</span>
        </button>
      </div>

      {/* Gold accent */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-laiff-gold/50 via-laiff-gold/20 to-laiff-gold/50" />
    </aside>
  );
}
