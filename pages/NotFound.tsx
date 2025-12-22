import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-serif font-bold text-[#ebd297] mb-4">404</h1>
      <p className="text-xl text-stone-300 mb-8 font-sans">Diese Seite scheint in Flammen aufgegangen zu sein.</p>
      <Link to="/" className="px-8 py-3 bg-[#ebd297] text-black font-bold rounded-full hover:bg-white transition-colors font-sans">
        Zurück zur Startseite
      </Link>
      <ScrollToTop />
    </div>
  );
};

export default NotFound;