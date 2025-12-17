import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shows from './pages/Shows';
import Booking from './pages/Booking';
import BookingRequest from './pages/BookingRequest';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';
import FireShow from './pages/FireShow';
import ArtistryShow from './pages/ArtistryShow';
import WalkAct from './pages/WalkAct';
import DuoLimax from './pages/DuoLimax';
import About from './pages/About';
import PublicEvents from './pages/PublicEvents';
import Socials from './pages/Socials';
import Pyrotechnics from './pages/Pyrotechnics';
import GlobalFX from './components/GlobalFX';
import Chatbot from './components/Chatbot';
import NotFound from './pages/NotFound';

// Scroll to top wrapper
// Stellt sicher, dass man bei Navigation wieder oben auf der Seite landet
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Global Lightbox Click Listener
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked element is an image
      if (target.tagName === 'IMG') {
        // Exclude images with 'no-zoom' class (like logos)
        if (target.classList.contains('no-zoom')) return;
        
        // Exclude images that are inside buttons or links (to avoid conflict with navigation)
        // Unless they specifically want to be zoomed, but generally links handle navigation.
        if (target.closest('a') || target.closest('button')) return;

        // Set the source
        const img = target as HTMLImageElement;
        setLightboxSrc(img.src);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-stone-950 text-stone-100 font-sans">
        <GlobalFX />
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/feuershow" element={<FireShow />} />
            <Route path="/artistikshow" element={<ArtistryShow />} />
            <Route path="/walkact" element={<WalkAct />} />
            <Route path="/duolimax" element={<DuoLimax />} />
            <Route path="/pyrotechnik" element={<Pyrotechnics />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-request" element={<BookingRequest />} />
            <Route path="/termine" element={<PublicEvents />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/impressum" element={<Imprint />} />
            <Route path="/datenschutz" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />

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
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>
        )}
      </div>
    </HashRouter>
  );
};

export default App;