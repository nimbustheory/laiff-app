import { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Edit2, Trash2, Copy, X, Check, Users } from 'lucide-react';
import type { Showtime } from '../../types';

export default function AdminShowtimes() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([
    {
      id: '1',
      movieId: '1',
      movieTitle: 'Deadly Vows',
      date: '2025-11-14',
      time: '19:30',
      venue: 'Million Dollar Theatre',
      screen: 'Main Theatre',
      capacity: 200,
      sold: 145,
      priceCategory: 'premium',
      status: 'on-sale',
      notes: 'Opening night film - includes red carpet',
    },
    {
      id: '2',
      movieId: '2',
      movieTitle: 'Short Block 1',
      date: '2025-11-14',
      time: '15:30',
      venue: 'Million Dollar Theatre',
      screen: 'Main Theatre',
      capacity: 200,
      sold: 78,
      priceCategory: 'standard',
      status: 'on-sale',
      notes: '',
    },
    {
      id: '3',
      movieId: '3',
      movieTitle: 'Where Darkness Dwells',
      date: '2025-11-15',
      time: '19:30',
      venue: 'Million Dollar Theatre',
      screen: 'Main Theatre',
      capacity: 200,
      sold: 200,
      priceCategory: 'standard',
      status: 'sold-out',
      notes: 'Q&A with director after screening',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  const [dateFilter, setDateFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('all');

  const [formData, setFormData] = useState<Partial<Showtime>>({
    movieId: '',
    movieTitle: '',
    date: '',
    time: '',
    venue: 'Million Dollar Theatre',
    screen: 'Main Theatre',
    capacity: 200,
    sold: 0,
    priceCategory: 'standard',
    status: 'scheduled',
    notes: '',
  });

  const venues = [
    { id: 'mdt', name: 'Million Dollar Theatre', screens: ['Main Theatre', 'Balcony'] },
    { id: 'smc', name: 'Secret Movie Club', screens: ['Main Screen'] },
  ];

  const priceCategories = [
    { value: 'standard', label: 'Standard ($15)', price: 15 },
    { value: 'premium', label: 'Premium ($20)', price: 20 },
    { value: 'discount', label: 'Discount ($10)', price: 10 },
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled', color: 'bg-gray-100 text-gray-700' },
    { value: 'on-sale', label: 'On Sale', color: 'bg-green-100 text-green-700' },
    { value: 'sold-out', label: 'Sold Out', color: 'bg-laiff-rose text-laiff-burgundy' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  ];

  const movies = [
    { id: '1', title: 'Deadly Vows' },
    { id: '2', title: 'Short Block 1' },
    { id: '3', title: 'Where Darkness Dwells' },
    { id: '4', title: 'Short Block 2' },
    { id: '5', title: 'Closing Night Awards' },
  ];

  const handleSave = () => {
    if (editingShowtime) {
      setShowtimes(prev => prev.map(s => s.id === editingShowtime.id ? { ...s, ...formData } as Showtime : s));
    } else {
      const newShowtime: Showtime = {
        ...formData as Showtime,
        id: Date.now().toString(),
      };
      setShowtimes(prev => [...prev, newShowtime]);
    }
    closeModal();
  };

  const handleDuplicate = (showtime: Showtime) => {
    const duplicated: Showtime = {
      ...showtime,
      id: Date.now().toString(),
      sold: 0,
      status: 'scheduled',
    };
    setShowtimes(prev => [...prev, duplicated]);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this showtime?')) {
      setShowtimes(prev => prev.filter(s => s.id !== id));
    }
  };

  const openEditModal = (showtime: Showtime) => {
    setEditingShowtime(showtime);
    setFormData(showtime);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingShowtime(null);
    setFormData({
      movieId: '',
      movieTitle: '',
      date: '',
      time: '',
      venue: 'Million Dollar Theatre',
      screen: 'Main Theatre',
      capacity: 200,
      sold: 0,
      priceCategory: 'standard',
      status: 'scheduled',
      notes: '',
    });
  };

  const filteredShowtimes = showtimes.filter(s => {
    if (dateFilter !== 'all' && s.date !== dateFilter) return false;
    if (venueFilter !== 'all' && !s.venue.toLowerCase().includes(venueFilter)) return false;
    return true;
  });

  const totalTickets = showtimes.reduce((sum, s) => sum + s.sold, 0);
  const onSaleCount = showtimes.filter(s => s.status === 'on-sale').length;
  const soldOutCount = showtimes.filter(s => s.status === 'sold-out').length;

  return (
    <div className="p-8" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-laiff-dark">Showtimes</h1>
          <p className="text-gray-500 mt-1">{showtimes.length} screenings scheduled</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-laiff-burgundy text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={18} />
          Add Showtime
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Showtimes</p>
          <p className="text-2xl font-bold text-laiff-dark">{showtimes.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">On Sale</p>
          <p className="text-2xl font-bold text-green-600">{onSaleCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Sold Out</p>
          <p className="text-2xl font-bold text-laiff-burgundy">{soldOutCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Tickets Sold</p>
          <p className="text-2xl font-bold text-laiff-gold">{totalTickets}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 flex gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Date</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">All Dates</option>
            <option value="2025-11-14">Nov 14 (Fri)</option>
            <option value="2025-11-15">Nov 15 (Sat)</option>
            <option value="2025-11-16">Nov 16 (Sun)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Venue</label>
          <select
            value={venueFilter}
            onChange={(e) => setVenueFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">All Venues</option>
            <option value="million">Million Dollar Theatre</option>
            <option value="secret">Secret Movie Club</option>
          </select>
        </div>
      </div>

      {/* Showtimes Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Film</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date & Time</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Venue</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Capacity</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredShowtimes.map((showtime) => {
              const soldPercent = Math.round((showtime.sold / showtime.capacity) * 100);
              const statusStyle = statusOptions.find(s => s.value === showtime.status);
              
              return (
                <tr key={showtime.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-laiff-dark">{showtime.movieTitle}</p>
                    {showtime.notes && (
                      <p className="text-xs text-gray-500 mt-1">{showtime.notes}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-laiff-burgundy" />
                      {new Date(showtime.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Clock size={14} className="text-laiff-burgundy" />
                      {showtime.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} />
                      {showtime.venue}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{showtime.screen}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      <span className="text-gray-600">{showtime.sold}/{showtime.capacity}</span>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${soldPercent >= 100 ? 'bg-laiff-burgundy' : soldPercent >= 75 ? 'bg-amber-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(soldPercent, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">
                      {priceCategories.find(p => p.value === showtime.priceCategory)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${statusStyle?.color}`}>
                      {statusStyle?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleDuplicate(showtime)}
                        className="p-2 text-gray-400 hover:text-laiff-gold hover:bg-amber-50 rounded-lg transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        onClick={() => openEditModal(showtime)}
                        className="p-2 text-gray-400 hover:text-laiff-burgundy hover:bg-laiff-rose rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(showtime.id)}
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
        
        {filteredShowtimes.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No showtimes found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-xl font-display font-bold text-laiff-dark">
                {editingShowtime ? 'Edit Showtime' : 'Add Showtime'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Film</label>
                <select
                  value={formData.movieId}
                  onChange={(e) => {
                    const movie = movies.find(m => m.id === e.target.value);
                    setFormData({ ...formData, movieId: e.target.value, movieTitle: movie?.title || '' });
                  }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                >
                  <option value="">Select film...</option>
                  {movies.map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <select
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    {venues.map(v => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Screen</label>
                  <select
                    value={formData.screen}
                    onChange={(e) => setFormData({ ...formData, screen: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    {venues.find(v => v.name === formData.venue)?.screens.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tickets Sold</label>
                  <input
                    type="number"
                    value={formData.sold}
                    onChange={(e) => setFormData({ ...formData, sold: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Category</label>
                  <select
                    value={formData.priceCategory}
                    onChange={(e) => setFormData({ ...formData, priceCategory: e.target.value as Showtime['priceCategory'] })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    {priceCategories.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Showtime['status'] })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    {statusOptions.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  placeholder="Q&A, special guests, etc..."
                />
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
                {editingShowtime ? 'Save Changes' : 'Add Showtime'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
