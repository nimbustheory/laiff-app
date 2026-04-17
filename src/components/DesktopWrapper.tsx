import { ReactNode } from 'react';
import {
  Film, CalendarDays, Sparkles, BookOpen, Users, Bell, Map, Shield,
  ChevronRight, Zap, Globe,
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface DesktopWrapperProps {
  children: ReactNode;
}

const ACCENT = '#D4AF37';
const ACCENT_DARK = '#9F1239';
const CARD_BG = '#18181C';
const BORDER = 'rgba(212,175,55,0.14)';
const TEXT_MUTED = 'rgba(255,255,255,0.58)';
const TEXT_SUBTLE = 'rgba(255,255,255,0.38)';

const features = [
  { icon: Film, label: 'Film Catalog', description: 'Browse official selections and filmmaker bios' },
  { icon: CalendarDays, label: 'Schedule & Showtimes', description: 'Full festival programming across every venue' },
  { icon: Sparkles, label: 'Event Listings', description: 'Premieres, panels, mixers, and parties' },
  { icon: BookOpen, label: 'Festival Guide', description: 'Venues, passes, awards and jurors' },
  { icon: Users, label: 'Membership', description: 'LA Film Club tiers and year-round perks' },
  { icon: Bell, label: 'Smart Notifications', description: 'Screening alerts and personalized updates' },
  { icon: Map, label: 'Interactive Venue Map', description: 'Mapbox-powered directions across Downtown LA' },
  { icon: Shield, label: 'Admin Dashboard', description: 'Full CRM, ticketing, and broadcast tools' },
];

const salesCards = [
  {
    icon: Shield,
    title: 'Admin Dashboard',
    description:
      'A complete back office for programming the festival — manage films, showtimes, tickets, venues, events, members, and push broadcast notifications to every attendee.',
    isAdmin: true,
  },
  {
    icon: Sparkles,
    title: 'Built for LAIFF',
    description:
      'Designed for the Los Angeles International Film Festival — independent cinema with an edge at the historic Million Dollar Theatre on Broadway. From opening-night galas and filmmaker Q&As to speed pitching and closing-night awards, the app reflects LAIFF’s three-day Downtown LA programming and its LA Film Club community.',
  },
  {
    icon: Globe,
    title: 'Seamless Integration',
    description:
      'Deploys as a progressive web app at laiff.org or any subdomain, syncs with your existing ticketing and TMDB film catalog, and launches without disrupting the workflows your team already uses.',
  },
  {
    icon: Zap,
    title: 'Audience Engagement',
    description:
      'Push notifications for premiere start times and schedule changes, personal watchlists and showtime reminders, and LA Film Club member benefits that drive repeat attendance all year long.',
  },
];

export default function DesktopWrapper({ children }: DesktopWrapperProps) {
  const { toggleAdmin } = useAdmin();

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        background:
          'radial-gradient(ellipse at top, #1A1A2E 0%, #0F0F0F 55%, #080808 100%)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: '#fff',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 1440,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '32px 32px 48px',
          gap: 24,
        }}
      >
        {/* LEFT SIDEBAR */}
        <aside
          className="laiff-wrapper-side"
          style={{
            width: 300,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            position: 'sticky',
            top: 32,
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: ACCENT,
                background: 'rgba(212,175,55,0.08)',
                border: `1px solid ${BORDER}`,
                padding: '4px 10px',
                borderRadius: 4,
              }}
            >
              Prototype Demo
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${ACCENT_DARK}, ${ACCENT})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                boxShadow: '0 8px 24px rgba(212,175,55,0.18)',
              }}
            >
              L
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#fff',
                }}
              >
                LAIFF
              </div>
              <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 2 }}>
                Los Angeles International Film Festival
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: TEXT_SUBTLE,
                marginBottom: 12,
              }}
            >
              App Features
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: 'rgba(212,175,55,0.10)',
                        border: `1px solid ${BORDER}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={14} color={ACCENT} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#fff',
                        }}
                      >
                        {f.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: TEXT_MUTED,
                          marginTop: 2,
                          lineHeight: 1.4,
                        }}
                      >
                        {f.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              paddingTop: 16,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: TEXT_SUBTLE,
                textAlign: 'center',
              }}
            >
              Built by <span style={{ color: ACCENT }}>MUSEWORKS</span> — MUSEWORKS.ORG
            </div>
          </div>
        </aside>

        {/* CENTER PHONE */}
        <main
          style={{
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: 390,
              height: 720,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 40,
              background: '#0F0F0F',
              boxShadow:
                '0 0 0 1px rgba(212,175,55,0.16), 0 30px 70px rgba(0,0,0,0.55), 0 0 120px rgba(159,18,57,0.12)',
            }}
          >
            {children}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside
          className="laiff-wrapper-side"
          style={{
            width: 320,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            position: 'sticky',
            top: 32,
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {salesCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 14,
                  padding: '18px 16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(212,175,55,0.12)',
                      border: `1px solid ${BORDER}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} color={ACCENT} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#fff',
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 12.5,
                    color: TEXT_MUTED,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
                {card.isAdmin && (
                  <button
                    onClick={toggleAdmin}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      width: '100%',
                      padding: '10px 0',
                      marginTop: 14,
                      borderRadius: 8,
                      border: 'none',
                      background: `linear-gradient(135deg, ${ACCENT_DARK}, ${ACCENT})`,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                    }}
                  >
                    <Shield size={16} /> Open Admin
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </aside>
      </div>

      <style>{`
        .laiff-wrapper-side::-webkit-scrollbar { display: none; }
        @media (max-width: 1200px) {
          .laiff-wrapper-side { display: none !important; }
        }
      `}</style>
    </div>
  );
}
