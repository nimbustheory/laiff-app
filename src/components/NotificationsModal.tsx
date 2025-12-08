import { X, Ticket, Sparkles, Tag, Bell } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  if (!isOpen) return null;

  // Sample notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Tickets Confirmed',
      message: 'Your tickets for "Deadly Vows" on Nov 14 are confirmed!',
      time: '2 hours ago',
      read: false,
      type: 'ticket',
    },
    {
      id: '2',
      title: 'New Event Added',
      message: 'Q&A with director Jared Cohn added after the screening.',
      time: '5 hours ago',
      read: false,
      type: 'event',
    },
    {
      id: '3',
      title: 'Early Bird Discount',
      message: 'Use code LAIFF25 for 15% off festival passes!',
      time: '1 day ago',
      read: true,
      type: 'promo',
    },
    {
      id: '4',
      title: 'Schedule Update',
      message: 'Short Block 2 moved to 6:00 PM on Nov 14.',
      time: '2 days ago',
      read: true,
      type: 'system',
    },
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'ticket': return <Ticket size={18} className="text-laiff-coral" />;
      case 'event': return <Sparkles size={18} className="text-laiff-gold" />;
      case 'promo': return <Tag size={18} className="text-green-500" />;
      default: return <Bell size={18} className="text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center" style={{ maxWidth: '390px', margin: '0 auto' }}>
      <div 
        className="bg-white w-full max-h-[80vh] rounded-t-3xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-laiff-dark">Notifications</h2>
            <p className="text-sm text-gray-500">{notifications.filter(n => !n.read).length} unread</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-laiff-rose/30' : ''
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-semibold text-sm ${!notification.read ? 'text-laiff-dark' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-laiff-coral" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <Bell size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No notifications yet</p>
            </div>
          )}
        </div>

        {/* Mark All Read */}
        {notifications.some(n => !n.read) && (
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
            <button className="w-full py-3 text-laiff-burgundy font-semibold hover:bg-laiff-rose/50 rounded-xl transition-colors">
              Mark All as Read
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
