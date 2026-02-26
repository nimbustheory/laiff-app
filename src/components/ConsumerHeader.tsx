import { Bell, Settings, Shield } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface ConsumerHeaderProps {
  onNotificationsClick: () => void;
  onSettingsClick: () => void;
  notificationCount?: number;
}

export default function ConsumerHeader({
  onNotificationsClick,
  onSettingsClick,
  notificationCount = 0,
}: ConsumerHeaderProps) {
  const { toggleAdmin } = useAdmin();

  return (
    <header className="bg-laiff-dark text-white px-4 py-3 sticky top-0 z-50">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-laiff-gold to-transparent" />
      
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center shadow-lg">
            <span className="text-lg font-display font-bold text-white">LA</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs tracking-wide leading-tight">LOS ANGELES</span>
            <span className="text-[9px] text-laiff-gold tracking-wide leading-tight">International Film Festival</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Admin Toggle */}
          <button
            onClick={toggleAdmin}
            className="p-2.5 rounded-xl bg-laiff-gold/20 hover:bg-laiff-gold/40 transition-colors text-laiff-gold"
            aria-label="Enter Admin Mode"
          >
            <Shield size={20} />
          </button>

          {/* Notifications */}
          <button
            onClick={onNotificationsClick}
            className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-laiff-coral text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onSettingsClick}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
