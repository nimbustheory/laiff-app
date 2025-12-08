import { useState } from 'react';
import { Send, Mail, Bell, Users, Crown, Star, Newspaper, Check, Clock, Eye } from 'lucide-react';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  audience: string;
  deliveryType: string;
  sentAt: string;
  openRate: number;
  recipients: number;
}

export default function AdminBroadcast() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryType, setDeliveryType] = useState<'push' | 'email' | 'both'>('both');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const audiences = [
    { id: 'all', name: 'All Members', count: 156, icon: Users },
    { id: 'film-club', name: 'Film Club', count: 89, icon: Users },
    { id: 'supporters', name: 'Supporters', count: 42, icon: Star },
    { id: 'champions', name: 'Champions', count: 25, icon: Crown },
    { id: 'newsletter', name: 'Newsletter Subscribers', count: 312, icon: Newspaper },
  ];

  const recentBroadcasts: Broadcast[] = [
    {
      id: '1',
      title: 'Opening Night Reminder',
      message: 'Don\'t forget! LAIFF 2025 kicks off this Friday...',
      audience: 'All Members',
      deliveryType: 'Both',
      sentAt: '2 hours ago',
      openRate: 68,
      recipients: 156,
    },
    {
      id: '2',
      title: 'Exclusive: Where Darkness Dwells Premiere',
      message: 'You\'re invited to an exclusive early screening...',
      audience: 'Supporters',
      deliveryType: 'Email',
      sentAt: 'Yesterday',
      openRate: 82,
      recipients: 42,
    },
    {
      id: '3',
      title: 'Last Chance: Festival Passes on Sale',
      message: 'Get your weekend pass before they sell out...',
      audience: 'Newsletter',
      deliveryType: 'Email',
      sentAt: '3 days ago',
      openRate: 45,
      recipients: 312,
    },
  ];

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) return;
    
    setSending(true);
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSending(false);
    setSent(true);
    
    // Reset after showing success
    setTimeout(() => {
      setSent(false);
      setTitle('');
      setMessage('');
    }, 3000);
  };

  const selectedAudienceData = audiences.find(a => a.id === selectedAudience);

  return (
    <div className="p-8" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-laiff-dark">Broadcast</h1>
        <p className="text-gray-500 mt-1">Send notifications to your members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compose Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-display font-bold text-laiff-dark mb-6 flex items-center gap-2">
              <Send size={20} className="text-laiff-burgundy" />
              Compose Message
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  placeholder="Enter notification title..."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-laiff-burgundy focus:border-transparent"
                  placeholder="Enter your message..."
                />
                <p className="text-xs text-gray-400 mt-1">{message.length} characters</p>
              </div>

              {/* Delivery Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeliveryType('push')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      deliveryType === 'push'
                        ? 'border-laiff-burgundy bg-laiff-rose text-laiff-burgundy'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Bell size={18} />
                    Push Only
                  </button>
                  <button
                    onClick={() => setDeliveryType('email')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      deliveryType === 'email'
                        ? 'border-laiff-burgundy bg-laiff-rose text-laiff-burgundy'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Mail size={18} />
                    Email Only
                  </button>
                  <button
                    onClick={() => setDeliveryType('both')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      deliveryType === 'both'
                        ? 'border-laiff-burgundy bg-laiff-rose text-laiff-burgundy'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Send size={18} />
                    Both
                  </button>
                </div>
              </div>

              {/* Audience Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  {audiences.map((audience) => {
                    const Icon = audience.icon;
                    return (
                      <button
                        key={audience.id}
                        onClick={() => setSelectedAudience(audience.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          selectedAudience === audience.id
                            ? 'border-laiff-burgundy bg-laiff-rose'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={18} className={selectedAudience === audience.id ? 'text-laiff-burgundy' : 'text-gray-400'} />
                        <div>
                          <p className={`font-medium text-sm ${selectedAudience === audience.id ? 'text-laiff-burgundy' : 'text-gray-700'}`}>
                            {audience.name}
                          </p>
                          <p className="text-xs text-gray-500">{audience.count} members</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!title.trim() || !message.trim() || sending || sent}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  sent
                    ? 'bg-green-500 text-white'
                    : sending
                    ? 'bg-laiff-burgundy/70 text-white cursor-wait'
                    : 'bg-laiff-burgundy text-white hover:shadow-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
                }`}
              >
                {sent ? (
                  <>
                    <Check size={20} />
                    Sent Successfully!
                  </>
                ) : sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send to {selectedAudienceData?.count || 0} Members
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Audience Preview & Recent */}
        <div className="space-y-6">
          {/* Audience Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-lg text-laiff-dark mb-4">Audience Preview</h3>
            {selectedAudienceData && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-laiff-rose flex items-center justify-center mx-auto mb-3">
                  <selectedAudienceData.icon size={28} className="text-laiff-burgundy" />
                </div>
                <p className="font-semibold text-laiff-dark">{selectedAudienceData.name}</p>
                <p className="text-3xl font-display font-bold text-laiff-burgundy mt-2">
                  {selectedAudienceData.count}
                </p>
                <p className="text-sm text-gray-500">recipients</p>
              </div>
            )}
          </div>

          {/* Recent Broadcasts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-lg text-laiff-dark mb-4 flex items-center gap-2">
              <Clock size={18} className="text-laiff-burgundy" />
              Recent Broadcasts
            </h3>
            <div className="space-y-4">
              {recentBroadcasts.map((broadcast) => (
                <div key={broadcast.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <p className="font-medium text-laiff-dark text-sm">{broadcast.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{broadcast.message}</p>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-gray-400">{broadcast.sentAt}</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <Eye size={12} />
                      {broadcast.openRate}% opened
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
