# LAIFF - Los Angeles International Film Festival App

A Progressive Web App (PWA) for the Los Angeles International Film Festival featuring a dual-mode interface for consumers and administrators.

![LAIFF App](https://laiff.org)

## 🎬 Features

### Consumer Mode (Mobile-First)
- **Home** - Festival overview, featured films, and quick actions
- **Films** - Browse TMDB-powered movie catalog with search, filters, and detailed views
- **Schedule** - View showtimes and purchase tickets
- **Events** - Festival events, workshops, and networking opportunities
- **More Menu** - Access to:
  - **Membership** - LA Film Club membership tiers and benefits
  - **Festival** - Festival passes, schedule, venues with interactive MapBox map
  - **Support** - Volunteer, donate, and support year-round programming
  - **About** - Festival history and mission

### Admin Mode (Desktop)
- **Dashboard** - Stats, countdown, and quick actions
- **Movies** - Full CRUD with TMDB import
- **Showtimes** - Schedule management with capacity tracking
- **Tickets** - Ticket types and promo code management
- **Events** - Festival event CRUD
- **Broadcast** - Member notification system

## 🗺️ MapBox Integration

The Festival page includes an interactive MapBox map showing venue locations:
- Million Dollar Theatre (Main Venue)
- Secret Movie Club (Workshops & Events)

MapBox token configured for development. Update to production token before deployment.

## 🎨 Design System: Hollywood Noir Glamour

A distinctive Art Deco-inspired aesthetic that captures LA's golden age of cinema:

### Colors
- **Burgundy** (`#9F1239`) - Primary brand color
- **Gold** (`#D4AF37`) - Accent and highlights
- **Coral** (`#FF6B4A`) - Secondary accent
- **Dark** (`#0F0F0F`) - Deep backgrounds
- **Cream** (`#FDF8F3`) - Light backgrounds
- **Rose** (`#FBE8E8`) - Soft accent backgrounds
- **Midnight** (`#1A1A2E`) - Dark accents

### Typography
- **Display**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)

### Custom Components
- `btn-glamour` - Primary burgundy buttons
- `btn-gold` - Gold accent buttons
- `card-noir` - Elevated cards with shadow
- `star-rating` - Movie ratings display
- Film strip decorations and Art Deco patterns

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **Lucide React** - Icons
- **TMDB API** - Movie data
- **MapBox GL** - Interactive maps

## 📁 Project Structure

```
laiff-app/
├── src/
│   ├── components/
│   │   ├── AdminNavigation.tsx
│   │   ├── ConsumerHeader.tsx
│   │   ├── MovieCard.tsx
│   │   ├── Navigation.tsx
│   │   ├── NotificationsModal.tsx
│   │   └── UserSettingsModal.tsx
│   ├── contexts/
│   │   └── AdminContext.tsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminBroadcast.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminEvents.tsx
│   │   │   ├── AdminMovies.tsx
│   │   │   ├── AdminShowtimes.tsx
│   │   │   └── AdminTickets.tsx
│   │   ├── About.tsx
│   │   ├── Events.tsx
│   │   ├── Festival.tsx
│   │   ├── Films.tsx
│   │   ├── Home.tsx
│   │   ├── Membership.tsx
│   │   ├── Schedule.tsx
│   │   └── Support.tsx
│   ├── styles/
│   │   └── index.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── tmdb.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd laiff-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your TMDB API key to .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Get a TMDB API key at: https://www.themoviedb.org/settings/api

## 📱 Usage

### Consumer Mode
The app opens in consumer mode by default, optimized for mobile (390px max-width).

### Admin Mode
Click the shield icon in the header to toggle admin mode. Admin mode provides a full desktop interface with sidebar navigation.

### Key Interactions

**Films Page:**
- Browse by category (Now Playing, Popular, etc.)
- Filter by genre
- Search movies
- View detailed modal with trailer, cast, and similar films

**Schedule Page:**
- Select date
- Filter by venue
- Click showtime to start ticket purchase
- Complete checkout flow

**Admin Dashboard:**
- View stats and countdown
- Quick actions for common tasks
- Recent activity feed

## 🏗 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel
The project includes `vercel.json` for easy deployment:

```bash
npm i -g vercel
vercel
```

## 📅 Festival Details

- **Dates**: November 14-16, 2025
- **Venue**: Million Dollar Theatre, 307 S Broadway, Downtown LA
- **Website**: https://laiff.org

## 🎟 Membership Tiers

| Tier | Price | Benefits |
|------|-------|----------|
| Film Club | $75/year | Priority access, newsletter, 10% off merch |
| Supporter | $150/year | + 2 free tickets, VIP lounge, meet & greets |
| Champion | $500/year | All-access pass, galas, concierge service |

## 📄 License

This project was created for the Los Angeles International Film Festival.

## 🙏 Credits

- TMDB API for movie data
- Lucide React for icons
- Google Fonts for Playfair Display and DM Sans
