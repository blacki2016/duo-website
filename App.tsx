import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingRequest from './pages/BookingRequest';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';
import DuoLimax from './pages/DuoLimax';
import About from './pages/About';
import PublicEvents from './pages/PublicEvents';
import Socials from './pages/Socials';
import Partner from './pages/Partner';
import GlobalFX from './components/GlobalFX';
import NotFound from './pages/NotFound';
import { Phone } from 'lucide-react';

// Scroll to top wrapper - stellt sicher, dass man bei Navigation wieder oben auf der Seite landet
const ScrollToTopComponent = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main App Content - muss innerhalb von HashRouter sein wegen useLocation()
const AppContent: React.FC<{
  lightboxSrc: string | null;
  setLightboxSrc: (src: string | null) => void
}> = ({ lightboxSrc, setLightboxSrc }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-stone-950 text-stone-100 font-sans">
      <GlobalFX />
      <ScrollToTopComponent />
      <Navbar />

      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show" element={<DuoLimax />} />
          <Route path="/ueber-uns" element={<About />} />
          <Route path="/kontakt" element={<Booking />} />
          <Route path="/buchung-anfragen" element={<BookingRequest />} />
          <Route path="/termine" element={<PublicEvents />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/impressum" element={<Imprint />} />
          <Route path="/datenschutz" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Lightbox Overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 flex justify-center items-center cursor-zoom-out p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxSrc(null)}
        >
          <button className="absolute top-6 right-6 text-gold-400 text-5xl hover:text-white transition-transform hover:rotate-90">
            &times;
          </button>
          <img
            src={lightboxSrc}
            alt="Enlarged view"
            className="max-w-[95vw] max-h-[95vh] border-2 border-gold-500 rounded shadow-[0_0_50px_rgba(212,175,55,0.4)] object-contain no-zoom"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Sticky Mobile CTA Button - versteckt auf Buchungsseite */}
      {location.pathname !== '/buchung-anfragen' && (
        <a
          href="/#/buchung-anfragen"
          className="fixed bottom-0 left-0 right-0 md:hidden z-[9999] bg-gradient-to-r from-[#ebd297] to-[#d4af37] text-black px-4 py-4 font-bold flex items-center justify-center gap-3 shadow-[0_-4px_20px_rgba(235,210,151,0.4)] hover:from-[#fffebb] hover:to-[#ebd297] transition-all active:scale-95"
        >
          <Phone size={20} />
          Termin prüfen
        </a>
      )}
    </div>
  );
};

// Main App - wraps everything in HashRouter so hooks can be used
const App: React.FC = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Global Lightbox Click Listener
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        if (target.classList.contains('no-zoom')) return;
        if (target.closest('a') || target.closest('button')) return;
        const img = target as HTMLImageElement;
        setLightboxSrc(img.src);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <HashRouter>
      <AppContent lightboxSrc={lightboxSrc} setLightboxSrc={setLightboxSrc} />
    </HashRouter>
  );
};

export default App;