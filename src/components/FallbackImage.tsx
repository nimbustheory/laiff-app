import { useState } from 'react';
import { Film, MapPin, Calendar } from 'lucide-react';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  type?: 'venue' | 'event' | 'hero';
}

const gradients = {
  venue: 'from-laiff-midnight via-laiff-dark to-laiff-burgundy/80',
  event: 'from-laiff-burgundy via-rose-800 to-laiff-midnight',
  hero: 'from-laiff-dark via-laiff-midnight to-laiff-burgundy',
};

const icons = {
  venue: MapPin,
  event: Calendar,
  hero: Film,
};

export default function FallbackImage({ src, alt, className = '', type = 'venue' }: FallbackImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    const Icon = icons[type];
    return (
      <div className={`bg-gradient-to-br ${gradients[type]} flex items-center justify-center ${className}`}>
        <div className="text-center text-white/60">
          <Icon size={32} className="mx-auto mb-1" />
          <p className="text-xs font-medium">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
