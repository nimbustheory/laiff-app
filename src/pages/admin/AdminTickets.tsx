import { useState } from 'react';
import { Ticket, Tag, Plus, Edit2, Trash2, X, Check, Percent, DollarSign } from 'lucide-react';
import type { TicketType, PromoCode } from '../../types';

export default function AdminTickets() {
  const [activeTab, setActiveTab] = useState<'types' | 'promos'>('types');
  
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    {
      id: '1',
      name: 'Adult',
      description: 'General admission for adults',
      basePrice: 15,
      discountPercent: 0,
      finalPrice: 15,
      availability: 'all',
      status: 'active',
      maxPerOrder: 10,
      requiresId: false,
    },
    {
      id: '2',
      name: 'Senior',
      description: '65 years and older',
      basePrice: 15,
      discountPercent: 20,
      finalPrice: 12,
      availability: 'all',
      status: 'active',
      maxPerOrder: 4,
      requiresId: true,
    },
    {
      id: '3',
      name: 'Student',
      description: 'Valid student ID required',
      basePrice: 15,
      discountPercent: 33,
      finalPrice: 10,
      availability: 'all',
      status: 'active',
      maxPerOrder: 2,
      requiresId: true,
    },
    {
      id: '4',
      name: 'Member',
      description: 'Film Club members only',
      basePrice: 15,
      discountPercent: 25,
      finalPrice: 11.25,
      availability: 'members',
      status: 'active',
      maxPerOrder: 4,
      requiresId: false,
    },
  ]);

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: '1',
      code: 'LAIFF25',
      discountType: 'percent',
      discountValue: 15,
      usageLimit: 100,
      usageCount: 34,
      validFrom: '2025-10-01',
      validUntil: '2025-11-16',
      status: 'active',
    },
    {
      id: '2',
      code: 'OPENING',
      discountType: 'fixed',
      discountValue: 5,
      usageLimit: 50,
      usageCount: 50,
      validFrom: '2025-11-01',
      validUntil: '2025-11-14',
      status: 'depleted',
    },
  ]);

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [editingType, setEditingType] = useState<TicketType | null>(null);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);

  const [typeFormData, setTypeFormData] = useState<Partial<TicketType>>({
    name: '',
    description: '',
    basePrice: 15,
    discountPercent: 0,
    availability: 'all',
    status: 'active',
    maxPerOrder: 10,
    requiresId: false,
  });

  const [promoFormData, setPromoFormData] = useState<Partial<PromoCode>>({
    code: '',
    discountType: 'percent',
    discountValue: 10,
    usageLimit: 100,
    usageCount: 0,
    validFrom: '',
    validUntil: '',
    status: 'active',
  });

  // Calculate final price
  const calculateFinalPrice = (base: number, discount: number) => {
    return Math.round((base * (1 - discount / 100)) * 100) / 100;
  };

  const handleSaveType = () => {
    const finalPrice = calculateFinalPrice(typeFormData.basePrice || 15, typeFormData.discountPercent || 0);
    
    if (editingType) {
      setTicketTypes(prev => prev.map(t => t.id === editingType.id ? { ...t, ...typeFormData, finalPrice } as TicketType : t));
    } else {
      const newType: TicketType = {
        ...typeFormData as TicketType,
        id: Date.now().toString(),
        finalPrice,
      };
      setTicketTypes(prev => [...prev, newType]);
    }
    closeTypeModal();
  };

  const handleSavePromo = () => {
    if (editingPromo) {
      setPromoCodes(prev => prev.map(p => p.id === editingPromo.id ? { ...p, ...promoFormData } as PromoCode : p));
    } else {
      const newPromo: PromoCode = {
        ...promoFormData as PromoCode,
        id: Date.now().toString(),
        usageCount: 0,
      };
      setPromoCodes(prev => [...prev, newPromo]);
    }
    closePromoModal();
  };

  const handleDeleteType = (id: string) => {
    if (confirm('Are you sure you want to delete this ticket type?')) {
      setTicketTypes(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleDeletePromo = (id: string) => {
    if (confirm('Are you sure you want to delete this promo code?')) {
      setPromoCodes(prev => prev.filter(p => p.id !== id));
    }
  };

  const openEditTypeModal = (type: TicketType) => {
    setEditingType(type);
    setTypeFormData(type);
    setShowTypeModal(true);
  };

  const openEditPromoModal = (promo: PromoCode) => {
    setEditingPromo(promo);
    setPromoFormData(promo);
    setShowPromoModal(true);
  };

  const closeTypeModal = () => {
    setShowTypeModal(false);
    setEditingType(null);
    setTypeFormData({
      name: '',
      description: '',
      basePrice: 15,
      discountPercent: 0,
      availability: 'all',
      status: 'active',
      maxPerOrder: 10,
      requiresId: false,
    });
  };

  const closePromoModal = () => {
    setShowPromoModal(false);
    setEditingPromo(null);
    setPromoFormData({
      code: '',
      discountType: 'percent',
      discountValue: 10,
      usageLimit: 100,
      usageCount: 0,
      validFrom: '',
      validUntil: '',
      status: 'active',
    });
  };

  return (
    <div className="p-8" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-laiff-dark">Tickets & Promos</h1>
          <p className="text-gray-500 mt-1">Manage ticket types and promotional codes</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('types')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            activeTab === 'types'
              ? 'bg-laiff-burgundy text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Ticket size={18} />
          Ticket Types
        </button>
        <button
          onClick={() => setActiveTab('promos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            activeTab === 'promos'
              ? 'bg-laiff-burgundy text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Tag size={18} />
          Promo Codes
        </button>
      </div>

      {/* Ticket Types Tab */}
      {activeTab === 'types' && (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowTypeModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-laiff-burgundy text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus size={18} />
              Add Ticket Type
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Base Price</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Discount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Final Price</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Availability</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ticketTypes.map((type) => (
                  <tr key={type.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-laiff-dark">{type.name}</p>
                      <p className="text-sm text-gray-500">{type.description}</p>
                      {type.requiresId && (
                        <span className="text-xs text-amber-600">ID Required</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">${type.basePrice}</td>
                    <td className="px-6 py-4">
                      {type.discountPercent > 0 ? (
                        <span className="text-green-600">{type.discountPercent}% off</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-laiff-burgundy">${type.finalPrice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                        type.availability === 'all' ? 'bg-blue-100 text-blue-700' :
                        type.availability === 'members' ? 'bg-laiff-rose text-laiff-burgundy' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {type.availability === 'all' ? 'Everyone' : type.availability === 'members' ? 'Members Only' : 'Festival'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                        type.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {type.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditTypeModal(type)}
                          className="p-2 text-gray-400 hover:text-laiff-burgundy hover:bg-laiff-rose rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteType(type.id)}
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
          </div>
        </>
      )}

      {/* Promo Codes Tab */}
      {activeTab === 'promos' && (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowPromoModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-laiff-burgundy text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus size={18} />
              Add Promo Code
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Code</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Discount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Usage</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Valid Period</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promoCodes.map((promo) => {
                  const usagePercent = Math.round((promo.usageCount / promo.usageLimit) * 100);
                  return (
                    <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-laiff-dark bg-gray-100 px-2 py-1 rounded">
                          {promo.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          {promo.discountType === 'percent' ? (
                            <><Percent size={14} /> {promo.discountValue}%</>
                          ) : (
                            <><DollarSign size={14} /> {promo.discountValue}</>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 mb-1">{promo.usageCount} / {promo.usageLimit}</p>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${usagePercent >= 100 ? 'bg-red-500' : usagePercent >= 75 ? 'bg-amber-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(promo.validFrom).toLocaleDateString()} - {new Date(promo.validUntil).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                          promo.status === 'active' ? 'bg-green-100 text-green-700' :
                          promo.status === 'expired' ? 'bg-gray-100 text-gray-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditPromoModal(promo)}
                            className="p-2 text-gray-400 hover:text-laiff-burgundy hover:bg-laiff-rose rounded-lg transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePromo(promo.id)}
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
          </div>
        </>
      )}

      {/* Ticket Type Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-display font-bold text-laiff-dark">
                {editingType ? 'Edit Ticket Type' : 'Add Ticket Type'}
              </h2>
              <button onClick={closeTypeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={typeFormData.name}
                    onChange={(e) => setTypeFormData({ ...typeFormData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                    placeholder="e.g., Senior"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={typeFormData.description}
                    onChange={(e) => setTypeFormData({ ...typeFormData, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                    placeholder="e.g., 65 years and older"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    value={typeFormData.basePrice}
                    onChange={(e) => setTypeFormData({ ...typeFormData, basePrice: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    value={typeFormData.discountPercent}
                    onChange={(e) => setTypeFormData({ ...typeFormData, discountPercent: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
              </div>

              {/* Price Preview */}
              <div className="bg-laiff-rose rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Final Price Preview</p>
                <p className="text-2xl font-bold text-laiff-burgundy">
                  ${calculateFinalPrice(typeFormData.basePrice || 15, typeFormData.discountPercent || 0)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select
                    value={typeFormData.availability}
                    onChange={(e) => setTypeFormData({ ...typeFormData, availability: e.target.value as TicketType['availability'] })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    <option value="all">Everyone</option>
                    <option value="members">Members Only</option>
                    <option value="festival">Festival Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Per Order</label>
                  <input
                    type="number"
                    value={typeFormData.maxPerOrder}
                    onChange={(e) => setTypeFormData({ ...typeFormData, maxPerOrder: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={typeFormData.requiresId}
                  onChange={(e) => setTypeFormData({ ...typeFormData, requiresId: e.target.checked })}
                  className="w-4 h-4 text-laiff-burgundy rounded"
                />
                <span className="text-sm text-gray-700">Requires ID verification</span>
              </label>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={closeTypeModal} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium">
                Cancel
              </button>
              <button onClick={handleSaveType} className="px-6 py-2.5 bg-laiff-burgundy text-white rounded-xl font-semibold flex items-center gap-2">
                <Check size={18} />
                {editingType ? 'Save Changes' : 'Add Type'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promo Code Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-display font-bold text-laiff-dark">
                {editingPromo ? 'Edit Promo Code' : 'Add Promo Code'}
              </h2>
              <button onClick={closePromoModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  value={promoFormData.code}
                  onChange={(e) => setPromoFormData({ ...promoFormData, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent font-mono"
                  placeholder="e.g., LAIFF25"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select
                    value={promoFormData.discountType}
                    onChange={(e) => setPromoFormData({ ...promoFormData, discountType: e.target.value as PromoCode['discountType'] })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  >
                    <option value="percent">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value {promoFormData.discountType === 'percent' ? '(%)' : '($)'}
                  </label>
                  <input
                    type="number"
                    value={promoFormData.discountValue}
                    onChange={(e) => setPromoFormData({ ...promoFormData, discountValue: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                <input
                  type="number"
                  value={promoFormData.usageLimit}
                  onChange={(e) => setPromoFormData({ ...promoFormData, usageLimit: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                  <input
                    type="date"
                    value={promoFormData.validFrom}
                    onChange={(e) => setPromoFormData({ ...promoFormData, validFrom: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={promoFormData.validUntil}
                    onChange={(e) => setPromoFormData({ ...promoFormData, validUntil: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={closePromoModal} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium">
                Cancel
              </button>
              <button onClick={handleSavePromo} className="px-6 py-2.5 bg-laiff-burgundy text-white rounded-xl font-semibold flex items-center gap-2">
                <Check size={18} />
                {editingPromo ? 'Save Changes' : 'Add Promo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
