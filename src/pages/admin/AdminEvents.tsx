import { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';
import type { Event } from '../../types';

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Opening Night Gala: Deadly Vows Premiere',
      description: 'Red carpet reception and LA premiere of Jared Cohn\'s latest thriller with filmmaker Q&A',
      category: 'Premiere',
      date: '2025-11-14',
      time: '19:30',
      venue: 'Million Dollar Theatre',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Filmmaker Networking Mixer',
      description: 'Connect with fellow filmmakers, industry professionals, and film enthusiasts over drinks',
      category: 'Networking',
      date: '2025-11-15',
      time: '21:00',
      venue: 'Secret Movie Club',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Speed Pitching Mini-Market',
      description: 'Selected filmmakers pitch their projects to industry professionals',
      category: 'Workshop',
      date: '2025-11-16',
      time: '13:00',
      venue: 'Secret Movie Club',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Closing Night Awards Ceremony',
      description: 'Celebrate the best of LAIFF 2025 at our awards ceremony and closing reception',
      category: 'Festival',
      date: '2025-11-16',
      time: '21:00',
      venue: 'Million Dollar Theatre',
      status: 'upcoming',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    category: 'Screening',
    date: '',
    time: '',
    venue: 'Million Dollar Theatre',
    status: 'upcoming',
  });

  const categories = ['Screening', 'Premiere', 'Workshop', 'Networking', 'Festival', 'Q&A', 'Party'];
  const venues = ['Million Dollar Theatre', 'Secret Movie Club', 'Grand Central Market'];
  const statuses = [
    { value: 'upcoming', label: 'Upcoming', color: 'bg-blue-100 text-blue-700' },
    { value: 'ongoing', label: 'Ongoing', color: 'bg-green-100 text-green-700' },
    { value: 'completed', label: 'Completed', color: 'bg-gray-100 text-gray-700' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Premiere': return 'bg-laiff-gold/20 text-laiff-gold';
      case 'Screening': return 'bg-laiff-burgundy/10 text-laiff-burgundy';
      case 'Networking': return 'bg-blue-100 text-blue-700';
      case 'Workshop': return 'bg-purple-100 text-purple-700';
      case 'Festival': return 'bg-laiff-coral/20 text-laiff-coral';
      case 'Q&A': return 'bg-green-100 text-green-700';
      case 'Party': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSave = () => {
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...formData } as Event : e));
    } else {
      const newEvent: Event = {
        ...formData as Event,
        id: Date.now().toString(),
      };
      setEvents(prev => [...prev, newEvent]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      category: 'Screening',
      date: '',
      time: '',
      venue: 'Million Dollar Theatre',
      status: 'upcoming',
    });
  };

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-laiff-dark">Events</h1>
          <p className="text-gray-500 mt-1">{events.length} festival events</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-laiff-burgundy text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
          />
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Event</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date & Time</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Venue</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEvents.map((event) => {
              const statusStyle = statuses.find(s => s.value === event.status);
              
              return (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-laiff-dark">{event.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1 max-w-md">{event.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-laiff-burgundy" />
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Clock size={14} className="text-laiff-burgundy" />
                      {event.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} />
                      {event.venue}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${statusStyle?.color}`}>
                      {statusStyle?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="p-2 text-gray-400 hover:text-laiff-burgundy hover:bg-laiff-rose rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredEvents.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Sparkles size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No events found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-xl font-display font-bold text-laiff-dark">
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  placeholder="Event description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <select
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                >
                  {venues.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Event['status'] })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                >
                  {statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 sticky bottom-0 bg-white">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-laiff-burgundy text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Check size={18} />
                {editingEvent ? 'Save Changes' : 'Add Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
