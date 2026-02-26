import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import ConsumerHeader from './components/ConsumerHeader';
import AdminNavigation from './components/AdminNavigation';
import NotificationsModal from './components/NotificationsModal';
import UserSettingsModal from './components/UserSettingsModal';
import ScrollToTop from './components/ScrollToTop';
import DesktopWrapper from './components/DesktopWrapper';

// Consumer Pages
import Home from './pages/Home';
import Films from './pages/Films';
import Schedule from './pages/Schedule';
import Events from './pages/Events';
import Membership from './pages/Membership';
import Festival from './pages/Festival';
import Support from './pages/Support';
import About from './pages/About';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMovies from './pages/admin/AdminMovies';
import AdminShowtimes from './pages/admin/AdminShowtimes';
import AdminTickets from './pages/admin/AdminTickets';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBroadcast from './pages/admin/AdminBroadcast';

function AppContent() {
  const { isAdmin } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  if (isAdmin) {
    // Admin Layout - Full Screen Desktop
    return (
      <div style={{ 
        minHeight: '100vh', 
        width: '100vw',
        maxWidth: 'none',
        margin: 0,
        padding: 0,
        backgroundColor: '#f8f9fa'
      }}>
        <AdminNavigation />
        <main style={{ 
          marginLeft: '256px',
          minHeight: '100vh',
          width: 'calc(100vw - 256px)',
          maxWidth: 'none'
        }}>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            <Route path="/admin/showtimes" element={<AdminShowtimes />} />
            <Route path="/admin/tickets" element={<AdminTickets />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/broadcast" element={<AdminBroadcast />} />
            <Route path="*" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Consumer Layout - Mobile (390px max) with Desktop Presentation Wrapper
  return (
    <DesktopWrapper>
      <div className="min-h-screen desktop-app-content bg-laiff-cream" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <ConsumerHeader
          onNotificationsClick={() => setShowNotifications(true)}
          onSettingsClick={() => setShowSettings(true)}
          notificationCount={2}
        />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/events" element={<Events />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/*" element={<Home />} />
        </Routes>

        {/* Modals */}
        <NotificationsModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
        <UserSettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </div>
    </DesktopWrapper>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AdminProvider>
  );
}

export default App;
