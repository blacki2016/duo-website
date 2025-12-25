import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingRequest from './pages/BookingRequest';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';
// import DuoLimax from './pages/DuoLimax';
import About from './pages/About';
import Impressions from './pages/Impressions';
import Shows from './pages/Shows';
import Media from './pages/Media';
import Termine from './pages/Termine';
// Removed unused pages from sitemap
import GlobalFX from './components/GlobalFX';
import NotFound from './pages/NotFound';
import { Phone } from 'lucide-react';

// Global Gold Button CSS
const GLOBAL_STYLES = `
  .gold-button {
    display: inline-block;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: var(--font-title, 'Cinzel', serif);
    font-weight: 900;
    text-transform: uppercase;
    background: linear-gradient(135deg, #8E6F34 0%, #C8A663 25%, #F9EFAF 50%, #C8A663 75%, #8E6F34 100%);
    background-size: 200% auto;
    color: #111;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 3px rgba(0, 0, 0, 0.35);
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .gold-button:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.4);
  }
`;

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
  const WHATSAPP_LINK = 'https://api.whatsapp.com/send/?phone=4915785585713&text=Frage%20zur%20Show%3A%20Seid%20ihr%20am%2015.08.%20noch%20frei%3F&type=phone_number&app_absent=0';

  return (
    <div className="flex flex-col min-h-screen bg-stone-950 text-stone-100 font-sans">
      <GlobalFX />
      <ScrollToTopComponent />
      <Navbar />

      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allgemein/ueber-uns/" element={<About />} />
          <Route path="/allgemein/impressionen/" element={<Impressions />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/media" element={<Media />} />
          <Route path="/termine" element={<Termine />} />
          <Route path="/kontakt" element={<Booking />} />
          <Route path="/buchung-anfragen" element={<BookingRequest />} />
          {/* Optional: weitere Seiten deaktiviert gemäß Sitemap */}
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

      {/* Sticky Mobile CTA Button - versteckt auf Kontaktseite */}
      {location.pathname !== '/kontakt' && (
        <a
          href="/#/kontakt"
          className="fixed bottom-0 left-0 right-0 md:hidden z-[9999] bg-gradient-to-r from-[#ebd297] to-[#d4af37] text-black px-4 py-4 font-bold flex items-center justify-center gap-3 shadow-[0_-4px_20px_rgba(235,210,151,0.4)] hover:from-[#fffebb] hover:to-[#ebd297] transition-all active:scale-95"
        >
          <Phone size={20} />
          Termin prüfen
        </a>
      )}

      {/* Floating WhatsApp / Live-Chat Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-4 md:bottom-8 md:right-6 z-[9999] bg-gradient-to-br from-[#ebd297] to-[#b38728] text-black px-4 py-3 md:px-5 md:py-3 rounded-full font-bold shadow-[0_10px_25px_rgba(235,210,151,0.35)] flex items-center gap-2 hover:shadow-[0_14px_35px_rgba(235,210,151,0.5)] transition-all hover:scale-110"
      >
        <span className="text-xl">💬</span>
        <span className="hidden sm:inline">Frage zur Show?</span>
        <span className="hidden md:inline font-semibold">Schreib Leo direkt</span>
      </a>
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
      <style>{GLOBAL_STYLES}</style>
      <AppContent lightboxSrc={lightboxSrc} setLightboxSrc={setLightboxSrc} />
    </HashRouter>
  );
};

export default App;