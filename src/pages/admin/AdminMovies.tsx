import { useState, useEffect } from 'react';
import { Search, Plus, Download, Edit2, Trash2, X, Film, Star, Clock, Check } from 'lucide-react';
import { tmdbApi, GENRES } from '../../utils/tmdb';
import type { Movie, FestivalMovie } from '../../types';

export default function AdminMovies() {
  const [movies, setMovies] = useState<FestivalMovie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<FestivalMovie | null>(null);
  
  // TMDB Import State
  const [tmdbSearch, setTmdbSearch] = useState('');
  const [tmdbResults, setTmdbResults] = useState<Movie[]>([]);
  const [tmdbLoading, setTmdbLoading] = useState(false);
  const [importingId, setImportingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<FestivalMovie>>({
    title: '',
    director: '',
    year: new Date().getFullYear(),
    genre: '',
    runtime: 90,
    synopsis: '',
    posterUrl: '',
    rating: 0,
    price: 15,
    status: 'active',
    festivalCategory: 'Main Competition',
    notes: '',
  });

  const festivalCategories = [
    'Main Competition',
    'Documentary',
    'Short Films',
    'Horror/Sci-Fi',
    'Animation',
    'International',
    'Experimental',
    'Music Videos',
  ];

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'coming-soon', label: 'Coming Soon' },
    { value: 'archived', label: 'Archived' },
  ];

  // Sample data
  useEffect(() => {
    setMovies([
      {
        id: '1',
        tmdbId: 123,
        title: 'Deadly Vows',
        director: 'Jared Cohn',
        year: 2024,
        genre: 'Thriller',
        runtime: 95,
        synopsis: 'A gripping thriller about secrets and betrayal.',
        posterUrl: '',
        rating: 7.2,
        price: 15,
        status: 'active',
        festivalCategory: 'Main Competition',
        notes: 'Opening night film',
      },
      {
        id: '2',
        title: 'Where Darkness Dwells',
        director: 'Michael May',
        year: 2024,
        genre: 'Horror',
        runtime: 102,
        synopsis: 'A haunting tale of supernatural terror.',
        posterUrl: '',
        rating: 6.8,
        price: 15,
        status: 'active',
        festivalCategory: 'Horror/Sci-Fi',
        notes: 'Saturday night feature',
      },
    ]);
  }, []);

  const handleTmdbSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tmdbSearch.trim()) return;
    
    setTmdbLoading(true);
    try {
      const data = await tmdbApi.searchMovies(tmdbSearch);
      setTmdbResults(data.results.slice(0, 10));
    } catch (err) {
      console.error('TMDB search failed:', err);
    } finally {
      setTmdbLoading(false);
    }
  };

  const handleImportMovie = async (movie: Movie) => {
    setImportingId(movie.id);
    try {
      const details = await tmdbApi.getMovieDetails(movie.id);
      const director = tmdbApi.getDirector(details.credits);
      
      const newMovie: FestivalMovie = {
        id: Date.now().toString(),
        tmdbId: movie.id,
        title: movie.title,
        director,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : new Date().getFullYear(),
        genre: details.genres?.[0]?.name || 'Drama',
        runtime: details.runtime || 90,
        synopsis: movie.overview,
        posterUrl: tmdbApi.getImageUrl(movie.poster_path, 'w500'),
        rating: movie.vote_average,
        price: 15,
        status: 'active',
        festivalCategory: 'Main Competition',
        notes: '',
      };
      
      setMovies(prev => [...prev, newMovie]);
      setShowImportModal(false);
      setTmdbSearch('');
      setTmdbResults([]);
    } catch (err) {
      console.error('Import failed:', err);
    } finally {
      setImportingId(null);
    }
  };

  const handleSave = () => {
    if (editingMovie) {
      setMovies(prev => prev.map(m => m.id === editingMovie.id ? { ...m, ...formData } as FestivalMovie : m));
    } else {
      const newMovie: FestivalMovie = {
        ...formData as FestivalMovie,
        id: Date.now().toString(),
      };
      setMovies(prev => [...prev, newMovie]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      setMovies(prev => prev.filter(m => m.id !== id));
    }
  };

  const openEditModal = (movie: FestivalMovie) => {
    setEditingMovie(movie);
    setFormData(movie);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingMovie(null);
    setFormData({
      title: '',
      director: '',
      year: new Date().getFullYear(),
      genre: '',
      runtime: 90,
      synopsis: '',
      posterUrl: '',
      rating: 0,
      price: 15,
      status: 'active',
      festivalCategory: 'Main Competition',
      notes: '',
    });
  };

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.director.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-laiff-dark">Movies</h1>
          <p className="text-gray-500 mt-1">{movies.length} films in festival</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-laiff-gold text-laiff-dark rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Download size={18} />
            Import from TMDB
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-laiff-burgundy text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus size={18} />
            Add Manually
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
          />
        </div>
      </div>

      {/* Movies Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Film</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Director</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Runtime</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMovies.map((movie) => (
              <tr key={movie.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {movie.posterUrl ? (
                        <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-laiff-dark">
                          <Film size={20} className="text-white/30" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-laiff-dark">{movie.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.genre}</span>
                        {movie.rating > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Star size={12} className="fill-laiff-gold text-laiff-gold" />
                              {movie.rating.toFixed(1)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{movie.director}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-laiff-rose text-laiff-burgundy text-xs font-medium rounded-lg">
                    {movie.festivalCategory}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {movie.runtime} min
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">${movie.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                    movie.status === 'active' ? 'bg-green-100 text-green-700' :
                    movie.status === 'coming-soon' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {movie.status === 'active' ? 'Active' : movie.status === 'coming-soon' ? 'Coming Soon' : 'Archived'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(movie)}
                      className="p-2 text-gray-400 hover:text-laiff-burgundy hover:bg-laiff-rose rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredMovies.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Film size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No movies found</p>
          </div>
        )}
      </div>

      {/* TMDB Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-display font-bold text-laiff-dark">Import from TMDB</h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setTmdbSearch('');
                  setTmdbResults([]);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleTmdbSearch} className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search TMDB..."
                    value={tmdbSearch}
                    onChange={(e) => setTmdbSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={tmdbLoading}
                  className="px-6 py-2.5 bg-laiff-burgundy text-white rounded-xl font-semibold disabled:opacity-50"
                >
                  {tmdbLoading ? 'Searching...' : 'Search'}
                </button>
              </form>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {tmdbResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-gray-100"
                  >
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {movie.poster_path ? (
                        <img
                          src={tmdbApi.getImageUrl(movie.poster_path, 'w92')}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-laiff-dark">
                          <Film size={16} className="text-white/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-laiff-dark truncate">{movie.title}</p>
                      <p className="text-sm text-gray-500">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        {movie.vote_average > 0 && ` • ★ ${movie.vote_average.toFixed(1)}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleImportMovie(movie)}
                      disabled={importingId === movie.id}
                      className="flex items-center gap-2 px-4 py-2 bg-laiff-gold text-laiff-dark rounded-lg font-semibold text-sm disabled:opacity-50"
                    >
                      {importingId === movie.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-laiff-dark border-t-transparent rounded-full animate-spin" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Import
                        </>
                      )}
                    </button>
                  </div>
                ))}
                
                {tmdbResults.length === 0 && tmdbSearch && !tmdbLoading && (
                  <div className="py-8 text-center text-gray-500">
                    No results found. Try a different search term.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-xl font-display font-bold text-laiff-dark">
                {editingMovie ? 'Edit Movie' : 'Add Movie'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
                  <input
                    type="text"
                    value={formData.director}
                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    <option value="">Select genre...</option>
                    {Object.values(GENRES).map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Runtime (min)</label>
                  <input
                    type="number"
                    value={formData.runtime}
                    onChange={(e) => setFormData({ ...formData, runtime: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Festival Category</label>
                  <select
                    value={formData.festivalCategory}
                    onChange={(e) => setFormData({ ...formData, festivalCategory: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    {festivalCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as FestivalMovie['status'] })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    {statuses.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Synopsis</label>
                  <textarea
                    value={formData.synopsis}
                    onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                    placeholder="Notes for staff only..."
                  />
                </div>
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
                {editingMovie ? 'Save Changes' : 'Add Movie'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
