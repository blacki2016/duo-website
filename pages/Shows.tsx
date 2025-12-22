import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Zap, Tent, Sparkles, ArrowRight, RefreshCcw, HelpCircle } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

const SLIDES = [
  `${import.meta.env.BASE_URL}images/showformate.hintergrund.jpg`
];

const SHOW_CARDS = [
  {
    id: 'feuershow',
    title: "Feuershow",
    description: "Spektakuläre Flammen, Funken und pure Energie. Das Highlight für Hochzeiten und Firmenevents bei Nacht.",
    image: `${import.meta.env.BASE_URL}images/heroslider1.jpg`,
    link: "/feuershow",
    icon: <Flame className="w-6 h-6" />,
    tags: ['Outdoor', 'Action', 'Nacht']
  },
  {
    id: 'artistikshow',
    title: "Artistikshow",
    description: "Moderne Jonglage, Lichteffekte und Akrobatik. Perfekt für Indoor-Events und Galas.",
    image: `${import.meta.env.BASE_URL}images/showformate.artistik.jpg`,
    link: "/artistikshow",
    icon: <Zap className="w-6 h-6" />,
    tags: ['Indoor', 'Gala', 'Licht']
  },
  {
    id: 'walkact',
    title: "Walk Act",
    description: "Interaktive Unterhaltung auf Stelzen oder am Boden. Charmant, humorvoll und nah am Publikum.",
    image: `${import.meta.env.BASE_URL}images/showformate.walkact.jpg`,
    link: "/walkact",
    icon: <Tent className="w-6 h-6" />,
    tags: ['Indoor', 'Outdoor', 'Interaktion']
  },
  {
    id: 'duolimax',
    title: "Duo Limäx",
    description: "Die doppelte Portion Entertainment. Großillusionen, Comedy und Magie mit Leo Wieseckel.",
    image: `${import.meta.env.BASE_URL}images/showformate.limaex.jpg`,
    link: "/duolimax",
    icon: <Sparkles className="w-6 h-6" />,
    tags: ['Indoor', 'Magie', 'Comedy']
  }
];

// --- SHOW BERATER COMPONENT ---
const ShowBerater: React.FC = () => {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState<'indoor' | 'outdoor' | null>(null);
  // const [vibe, setVibe] = useState<'action' | 'fun' | 'magic' | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const reset = () => {
    setStep(0);
    setLocation(null);
    // setVibe(null);
    setResult(null);
  };

  const handleLocation = (val: 'indoor' | 'outdoor') => {
    setLocation(val);
    setStep(1);
  };

  const handleVibe = (val: 'action' | 'fun' | 'magic') => {
    // setVibe(val);
    calculateResult(location!, val);
    setStep(2);
  };

  const calculateResult = (loc: string, v: string) => {
    // Simple Logic
    let recommendedId = 'feuershow'; // Default

    if (loc === 'outdoor') {
      if (v === 'fun') recommendedId = 'walkact';
      else recommendedId = 'feuershow';
    } else {
      // Indoor
      if (v === 'action') recommendedId = 'artistikshow';
      else if (v === 'magic') recommendedId = 'duolimax';
      else recommendedId = 'walkact';
    }

    const rec = SHOW_CARDS.find(s => s.id === recommendedId);
    setResult(rec);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 p-1 rounded-2xl bg-gradient-to-br from-[#ebd297] to-[#b08d26] shadow-2xl relative overflow-hidden">
      {/* Inner Dark Container */}
      <div className="bg-[#141415] rounded-xl p-8 md:p-12 h-full relative overflow-hidden flex flex-col items-center text-center">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ebd297]/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 w-full">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="text-[#ebd297] w-8 h-8" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase tracking-wider">Dein Show-Berater</h2>
          </div>

          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl text-stone-300 mb-8 font-light">Wo soll die Show stattfinden?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => handleLocation('indoor')} className="px-8 py-4 bg-stone-800 border border-[#ebd297]/30 rounded-xl hover:bg-[#ebd297] hover:text-black hover:scale-105 transition-all font-bold text-lg w-40">
                  🏠 Drinnen
                </button>
                <button onClick={() => handleLocation('outdoor')} className="px-8 py-4 bg-stone-800 border border-[#ebd297]/30 rounded-xl hover:bg-[#ebd297] hover:text-black hover:scale-105 transition-all font-bold text-lg w-40">
                  🌳 Draußen
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-xl text-stone-300 mb-8 font-light">Was ist dir am wichtigsten?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => handleVibe('action')} className="px-6 py-4 bg-stone-800 border border-[#ebd297]/30 rounded-xl hover:bg-[#ebd297] hover:text-black hover:scale-105 transition-all font-bold w-full md:w-auto">
                  🔥 Action & Wow-Effekt
                </button>
                <button onClick={() => handleVibe('magic')} className="px-6 py-4 bg-stone-800 border border-[#ebd297]/30 rounded-xl hover:bg-[#ebd297] hover:text-black hover:scale-105 transition-all font-bold w-full md:w-auto">
                  ✨ Magie & Staunen
                </button>
                <button onClick={() => handleVibe('fun')} className="px-6 py-4 bg-stone-800 border border-[#ebd297]/30 rounded-xl hover:bg-[#ebd297] hover:text-black hover:scale-105 transition-all font-bold w-full md:w-auto">
                  😂 Spaß & Interaktion
                </button>
              </div>
              <button onClick={reset} className="mt-8 text-sm text-stone-500 hover:text-[#ebd297] underline">Zurück</button>
            </div>
          )}

          {step === 2 && result && (
            <div className="animate-in zoom-in duration-500">
              <p className="text-[#ebd297] uppercase tracking-widest text-sm mb-2">Unsere Empfehlung</p>
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">{result.title}</h3>

              <div className="max-w-md mx-auto mb-8 rounded-lg overflow-hidden border border-[#ebd297]/30 shadow-lg">
                <img src={result.image} alt={result.title} className="w-full h-48 object-cover" />
              </div>

              <p className="text-stone-300 max-w-lg mx-auto mb-8 text-lg">{result.description}</p>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link to={result.link} className="px-8 py-3 bg-[#ebd297] text-black font-bold rounded-full hover:bg-white transition-colors">
                  Zur Show
                </Link>
                <button onClick={reset} className="px-8 py-3 border border-[#ebd297] text-[#ebd297] font-bold rounded-full hover:bg-[#ebd297]/10 transition-colors flex items-center justify-center gap-2">
                  <RefreshCcw size={18} /> Neu starten
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


const Shows: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.show-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Background Slider (8-Sekunden-Wechsel mit Crossfade)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden pt-32 pb-20 px-4">

      {/* Fixed Background Layer */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className="shows-slide"
            style={{
              backgroundImage: `url('${slide}')`,
              opacity: idx === currentSlide ? 1 : 0
            }}
          />
        ))}
      </div>

      {/* Background Styling */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, #2a2010 0%, #121212 60%)'
        }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#ebd297] mb-6 drop-shadow-lg show-reveal">
            Unsere Showformate
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto show-reveal delay-100 font-sans leading-relaxed">
            Ob feurig, magisch oder artistisch – hier finden Sie das passende Entertainment für Ihre Veranstaltung.
            Entdecken Sie die Vielfalt.
          </p>
        </div>

        {/* SHOW GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {SHOW_CARDS.map((show, index) => (
            <Link
              key={index}
              to={show.link}
              className="group relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-[#ebd297]/20 show-reveal block shadow-xl"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Background */}
              <div className="absolute inset-0 bg-black">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4 text-[#ebd297]">
                    <div className="p-3 bg-[#ebd297]/10 rounded-full backdrop-blur-md border border-[#ebd297]/20">
                      {show.icon}
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#ebd297] mb-3 group-hover:text-white transition-colors shadow-black drop-shadow-md">
                    {show.title}
                  </h2>

                  <p className="text-stone-200 text-lg mb-6 line-clamp-3 group-hover:line-clamp-none transition-all font-sans leading-relaxed">
                    {show.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {show.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wide text-[#ebd297] border border-[#ebd297]/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-[#ebd297] font-bold uppercase tracking-wider text-sm border-b-2 border-[#ebd297] pb-1 group-hover:gap-4 group-hover:text-white transition-all">
                    Zur Show <ArrowRight size={16} className="text-[#ebd297] group-hover:text-white transition-colors" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

        </div>

        {/* SEPARATOR */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ebd297]/30 to-transparent my-12 show-reveal"></div>

        {/* SHOW BERATER SECTION */}
        <div className="show-reveal">
          <ShowBerater />
        </div>

        {/* FINAL CTA */}
        <div className="mt-24 text-center show-reveal pb-12">
          <p className="text-stone-400 mb-6 uppercase tracking-widest text-sm">Nichts passendes dabei?</p>
          <Link
            to="/booking-request"
            className="inline-block px-10 py-4 bg-transparent border-2 border-[#ebd297] text-[#ebd297] font-bold rounded-full hover:bg-[#ebd297] hover:text-black transition-all hover:scale-105"
          >
            Individuelle Anfrage stellen
          </Link>
        </div>

      </div>

      <style>{`
        .show-reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .show-reveal.show {
            opacity: 1;
            transform: translateY(0);
        }
        /* Background Slides mit Crossfade */
        .shows-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center -240px;
          background-repeat: no-repeat;
          transition: opacity 2000ms ease-in-out;
          filter: blur(3px) brightness(0.3);
          transform: scale(1.02);
        }

        /* Responsive fine-tuning for background offset */
        @media (max-width: 1024px) {
          .shows-slide {
            background-position: center -180px;
          }
        }
        @media (max-width: 640px) {
          .shows-slide {
            background-position: center -120px;
          }
        }
      `}</style>
      <ScrollToTop />
    </div>
  );
};

export default Shows;