import { X, User, Mail, Bell, Smartphone, MessageSquare, Crown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSettingsModal({ isOpen, onClose }: UserSettingsModalProps) {
  const [settings, setSettings] = useState({
    name: 'Film Enthusiast',
    email: 'cinephile@example.com',
    membershipLevel: 'film-club' as const,
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  });

  if (!isOpen) return null;

  const membershipBadge = {
    'none': { label: 'Guest', color: 'bg-gray-100 text-gray-600' },
    'film-club': { label: 'Film Club', color: 'bg-laiff-rose text-laiff-burgundy' },
    'supporter': { label: 'Supporter', color: 'bg-amber-100 text-amber-700' },
    'champion': { label: 'Champion', color: 'bg-gradient-to-r from-laiff-gold to-amber-400 text-laiff-dark' },
  };

  const currentBadge = membershipBadge[settings.membershipLevel];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center" style={{ maxWidth: '390px', margin: '0 auto' }}>
      <div 
        className="bg-white w-full max-h-[85vh] rounded-t-3xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-laiff-dark">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-4 space-y-6">
          {/* Profile Section */}
          <div className="card-noir p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-laiff-burgundy to-laiff-coral flex items-center justify-center">
                <User size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-laiff-dark">{settings.name}</h3>
                <p className="text-sm text-gray-500">{settings.email}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${currentBadge.color}`}>
                  <Crown size={12} />
                  {currentBadge.label}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Bell size={16} />
              Notifications
            </h3>
            <div className="card-noir divide-y divide-gray-100">
              {/* Email */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-laiff-burgundy" />
                  <div>
                    <p className="font-medium text-laiff-dark">Email Notifications</p>
                    <p className="text-xs text-gray-500">Festival updates & offers</p>
                  </div>
                </div>
                <button
                  onClick={() => setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, email: !s.notifications.email }
                  }))}
                  className={`w-12 h-7 rounded-full transition-all duration-200 ${
                    settings.notifications.email ? 'bg-laiff-burgundy' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Push */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-laiff-burgundy" />
                  <div>
                    <p className="font-medium text-laiff-dark">Push Notifications</p>
                    <p className="text-xs text-gray-500">Showtime reminders</p>
                  </div>
                </div>
                <button
                  onClick={() => setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, push: !s.notifications.push }
                  }))}
                  className={`w-12 h-7 rounded-full transition-all duration-200 ${
                    settings.notifications.push ? 'bg-laiff-burgundy' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* SMS */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-laiff-burgundy" />
                  <div>
                    <p className="font-medium text-laiff-dark">SMS Alerts</p>
                    <p className="text-xs text-gray-500">Last-minute changes only</p>
                  </div>
                </div>
                <button
                  onClick={() => setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, sms: !s.notifications.sms }
                  }))}
                  className={`w-12 h-7 rounded-full transition-all duration-200 ${
                    settings.notifications.sms ? 'bg-laiff-burgundy' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <div className="card-noir divide-y divide-gray-100">
              <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-laiff-dark">My Tickets</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-laiff-dark">Order History</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-laiff-dark">Saved Films</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-laiff-dark">Help & Support</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <button 
            onClick={onClose}
            className="w-full btn-glamour"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
