import { Film, Users, Calendar, Ticket, TrendingUp, Clock, Plus, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FESTIVAL } from '../../utils/constants';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Films', value: '24', change: '+3 this week', icon: Film, color: 'from-laiff-burgundy to-rose-600' },
    { label: 'Members', value: '156', change: '+12 this month', icon: Users, color: 'from-laiff-gold to-amber-500' },
    { label: 'Events', value: '8', change: '3 upcoming', icon: Calendar, color: 'from-blue-600 to-blue-400' },
    { label: 'Tickets Sold', value: '432', change: '+89 today', icon: Ticket, color: 'from-green-600 to-green-400' },
  ];

  const recentActivity = [
    { action: 'New ticket purchase', detail: 'Deadly Vows - 2 tickets', time: '5 min ago', type: 'ticket' },
    { action: 'Film added', detail: 'Where Darkness Dwells', time: '1 hour ago', type: 'film' },
    { action: 'New member signup', detail: 'Film Club - John D.', time: '2 hours ago', type: 'member' },
    { action: 'Showtime updated', detail: 'Short Block 2 moved to 6 PM', time: '3 hours ago', type: 'schedule' },
    { action: 'Broadcast sent', detail: 'Opening Night Reminder', time: 'Yesterday', type: 'broadcast' },
  ];

  // Calculate days until festival
  const festivalDate = new Date(FESTIVAL.startDate);
  const today = new Date();
  const daysUntil = Math.ceil((festivalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-8" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-laiff-dark">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back to LAIFF Admin</p>
      </div>

      {/* Festival Countdown */}
      <div className="bg-gradient-to-r from-laiff-burgundy via-rose-700 to-laiff-coral rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-art-deco opacity-10" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm mb-1">{FESTIVAL.name} {FESTIVAL.year}</p>
            <h2 className="text-2xl font-display font-bold">Festival Countdown</h2>
            <p className="text-white/80 mt-1">{FESTIVAL.dateDisplay}</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-display font-bold">{daysUntil > 0 ? daysUntil : 0}</div>
            <p className="text-white/80 text-sm">days to go</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <p className="text-3xl font-bold text-laiff-dark">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={12} />
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
            <Clock size={20} className="text-laiff-burgundy" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'ticket' ? 'bg-green-100' :
                  activity.type === 'film' ? 'bg-laiff-rose' :
                  activity.type === 'member' ? 'bg-blue-100' :
                  activity.type === 'schedule' ? 'bg-amber-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'ticket' && <Ticket size={18} className="text-green-600" />}
                  {activity.type === 'film' && <Film size={18} className="text-laiff-burgundy" />}
                  {activity.type === 'member' && <Users size={18} className="text-blue-600" />}
                  {activity.type === 'schedule' && <Calendar size={18} className="text-amber-600" />}
                  {activity.type === 'broadcast' && <Send size={18} className="text-purple-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-laiff-dark">{activity.action}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.detail}</p>
                </div>
                <p className="text-xs text-gray-400 flex-shrink-0">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-display font-bold text-laiff-dark mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-laiff-burgundy" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/movies')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-laiff-rose hover:bg-laiff-burgundy hover:text-white transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-laiff-burgundy/10 group-hover:bg-white/20 flex items-center justify-center">
                <Plus size={20} className="text-laiff-burgundy group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-laiff-dark group-hover:text-white">Add Film</p>
                <p className="text-xs text-gray-500 group-hover:text-white/70">Import from TMDB</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/showtimes')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-amber-50 hover:bg-laiff-gold hover:text-laiff-dark transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 group-hover:bg-white/50 flex items-center justify-center">
                <Calendar size={20} className="text-amber-600 group-hover:text-laiff-dark" />
              </div>
              <div>
                <p className="font-medium text-laiff-dark">Schedule Showtime</p>
                <p className="text-xs text-gray-500 group-hover:text-laiff-dark/70">Create new screening</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/events')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-500 hover:text-white transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 group-hover:bg-white/20 flex items-center justify-center">
                <Sparkles size={20} className="text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-laiff-dark group-hover:text-white">Create Event</p>
                <p className="text-xs text-gray-500 group-hover:text-white/70">Add new festival event</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/broadcast')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-500 hover:text-white transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 group-hover:bg-white/20 flex items-center justify-center">
                <Send size={20} className="text-purple-600 group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-laiff-dark group-hover:text-white">Send Broadcast</p>
                <p className="text-xs text-gray-500 group-hover:text-white/70">Notify members</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
