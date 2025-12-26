import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-stone-950">
      <style>{`
        .font-cinzel { font-family: 'Cinzel', serif; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .btn-gold { background: linear-gradient(135deg, #8E6F34 0%, #C8A663 50%, #8E6F34 100%); background-size: 200% auto; transition: all 0.4s ease; }
        .btn-gold:hover { background-position: right center; box-shadow: 0 0 25px rgba(200,166,99,0.6); transform: translateY(-2px); }
      `}</style>

      <div className="max-w-2xl mx-auto">
        <div className="animate-fade-up">
          <h1 className="text-6xl md:text-7xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] to-[#C8A663] mb-4">404</h1>
        </div>
        <div className="animate-fade-up delay-100">
          <p className="text-xl md:text-2xl text-stone-300 mb-3 font-sans flex items-center justify-center gap-2">
            Hokus Pokus – diese Seite ist verschwunden.
          </p>
        </div>
        <div className="animate-fade-up delay-200">
          <p className="text-stone-400 mb-8 font-sans">
            Vielleicht haben Sie sich vertippt – oder die Adresse wurde verzaubert. Probieren Sie einen der folgenden Wege:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 animate-fade-up delay-200">
          <Link to="/" className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm text-black font-bold uppercase tracking-wider">
            Startseite
          </Link>
          <Link to="/shows" className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm text-black font-bold uppercase tracking-wider">
            Shows entdecken
          </Link>
          <Link to="/allgemein/galerie/" className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm text-black font-bold uppercase tracking-wider">
            Galerie
          </Link>
          <Link to="/kontakt" className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm text-black font-bold uppercase tracking-wider">
            Kontakt
          </Link>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default NotFound;