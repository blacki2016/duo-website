import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Megaphone, Flame, ChevronDown, Sparkles } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

// --- KONFIGURATION ---

// Hero Background Bilder (Desktop)
const DESKTOP_SLIDES = [
  `${import.meta.env.BASE_URL}images/schatten3.png`,
  `${import.meta.env.BASE_URL}images/slider4.jpeg.jpg`,
  `${import.meta.env.BASE_URL}images/limaex.slider7.jpg`
];

// Hero Background Bilder (Mobile)
const MOBILE_SLIDES = [
  `${import.meta.env.BASE_URL}images/mobile.slider1.4.jpg`,
  `${import.meta.env.BASE_URL}images/mobile.slider2.1.png`,
  `${import.meta.env.BASE_URL}images/nebel.png`, 
  `${import.meta.env.BASE_URL}images/mobile.slider4.png`
];

// USP Data
const USPS = [
  {
    icon: <ShieldCheck className="w-16 h-16 text-[#ebd297]" />,
    title: "Sicherheit & TÜV",
    desc: "Geprüfte Pyrotechnik, klare Abläufe und Abstimmung mit Behörden."
  },
  {
    icon: <Megaphone className="w-16 h-16 text-[#ebd297]" />,
    title: "Full Service",
    desc: "Technik, Licht und Ton aus einer Hand. Wir kümmern uns um den Ablauf."
  },
  {
    icon: <HeartHandshake className="w-16 h-16 text-[#ebd297]" />,
    title: "Duo Power",
    desc: "Synchronität und doppelte Energie für den maximalen Wow-Effekt."
  }
];

// Leistungsbeschreibung
const LEISTUNGEN = [
  {
    title: "Magie",
    desc: "Ein Mix aus Großillusion und Close-Up, der verzaubert.",
    icon: "✨"
  },
  {
    title: "Artistik",
    desc: "Von Jonglage bis Rola Bola – Artistik auf hohem Niveau.",
    icon: "🤸"
  },
  {
    title: "Comedy",
    desc: "Humor ist der Schlüssel – wir bringen das Publikum zum Lachen.",
    icon: "😄"
  },
  {
    title: "Musik",
    desc: "Live-Elemente mit Ukulele, Klavier und Percussion.",
    icon: "🎵"
  }
];

// Show Previews
const SHOW_PREVIEWS = [
  {
    title: "Duo Feuershow",
    img: `${import.meta.env.BASE_URL}images/fire.jpg`,
    features: ["Synchrones Feuer", "Pyro-Finale", "Wunschmusik"],
    link: "/shows",
    cta: "Zur Feuershow",
    emoji: "🔥"
  },
  {
    title: "Licht & Artistik",
    img: `${import.meta.env.BASE_URL}images/artistik.jpg`,
    features: ["Partnerakrobatik", "LED-Logo Show", "Gala-Format"],
    link: "/shows",
    cta: "Zur Lichtshow",
    emoji: "💡"
  },
  {
    title: "Hochzeiten",
    img: `${import.meta.env.BASE_URL}images/show.jpg`,
    features: ["Feuerherzen", "Romantische Inszenierung", "First Dance"],
    link: "/buchung-anfragen",
    cta: "Hochzeits-Infos",
    emoji: "💍"
  },
  {
    title: "Events & Public",
    img: `${import.meta.env.BASE_URL}images/events.jpg`,
    features: ["Große Bühnen", "Stadtfeste", "Branding möglich"],
    link: "/shows",
    cta: "Event-Formate",
    emoji: "🎪"
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Erkenne Mobile vs. Desktop
  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
    };
    
    // Initial call
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wähle das richtige Array basierend auf der Bildschirmgröße
  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  // Reset Slide Index wenn sich die Anzahl der Slides ändert
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  // Hero Slider Interval Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative min-h-screen flex flex-col text-stone-200 bg-stone-900 font-sans selection:bg-[#ebd297] selection:text-black">

      {/* --- INLINE STYLES FÜR SPEZIALEFFEKTE --- */}
      <style>{`
        .font-cinzel { font-family: 'Cinzel', serif; }
        
        /* Button Glow */
        .btn-gold {
            background: linear-gradient(135deg, #8E6F34 0%, #C8A663 50%, #8E6F34 100%);
            background-size: 200% auto;
            transition: all 0.5s ease;
        }
        .btn-gold:hover {
            background-position: right center;
            box-shadow: 0 0 25px rgba(200, 166, 99, 0.7);
            transform: translateY(-2px);
        }

        /* Hero Animationen */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeInUp 1s ease-out forwards; }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }

        /* UKONGU Glow */
        .ukongu-text {
          text-shadow: 0 0 20px rgba(235, 210, 151, 0.3), 0 0 40px rgba(142, 111, 52, 0.2);
        }
        
        /* Pulse Animation für Badge */
        @keyframes subtlePulse {
           0%, 100% { opacity: 1; transform: scale(1); }
           50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-subtle-pulse { animation: subtlePulse 3s infinite ease-in-out; }
      `}</style>

      {/* --- BACKGROUND SLIDER (FIXED) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-stone-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${slide}')`,
              backgroundPosition: isMobile ? 'center' : 'center 85%'
            }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-stone-900/95 z-10"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative z-20 min-h-screen flex flex-col items-center justify-start md:justify-center pt-4 md:pt-32 pb-20 px-4 text-center">

        {/* Haupttitel Block */}
        <div className="mb-2 md:mb-8 mt-0 md:mt-4 animate-fade-up">
          <h1 className="py-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C8A663] via-[#F9EFAF] to-[#C8A663] drop-shadow-2xl leading-tight">
            DUO LIMÄX
          </h1>
        </div>

        {/* Aktuelles Programm: UKONGU */}
        {/* UPDATE: mt-48 hinzugefügt, um den Block auf Mobile weit nach unten zu schieben. md:mt-10 resettet dies für Desktop. */}
        <div className="relative mt-48 md:mt-10 mb-8 md:mb-12 animate-fade-up delay-100 opacity-0 group cursor-default">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ebd297]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-2 border border-[#ebd297] px-4 py-1 rounded-full text-[#ebd297] text-xs font-bold tracking-widest uppercase mb-4 animate-subtle-pulse bg-black/40 backdrop-blur-sm">
            <Sparkles size={12} /> Aktuelle Produktion
          </div>

          {/* Der Titel */}
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest ukongu-text mb-2 scale-y-110">
            UKONGU
          </h2>
          <p className="text-[#ebd297] font-serif italic text-xl md:text-2xl opacity-90">
            Eine Show der Superlative
          </p>
        </div>

        {/* Button */}
        <div className="animate-fade-up delay-200 opacity-0 z-10">
          <Link
            to="/buchung-anfragen"
            className="btn-gold inline-flex items-center gap-3 px-10 py-5 rounded-sm text-black font-bold uppercase tracking-wider text-base md:text-lg"
          >
            Show Anfragen <Flame className="w-5 h-5" />
          </Link>
        </div>

        {/* Scroll Indikator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-[#ebd297] opacity-80 z-20 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em]">Entdecken</span>
          <ChevronDown size={36} strokeWidth={1.5} />
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 bg-stone-900/80 backdrop-blur-sm border-t border-[#ebd297]/20 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">

        {/* 1. KERNKOMPETENZEN */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEISTUNGEN.map((leistung, idx) => (
              <div key={idx} className="group p-8 bg-black/40 border border-white/5 hover:border-[#ebd297]/50 transition-all rounded-sm text-center hover:-translate-y-2 hover:bg-black/60 duration-300">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block drop-shadow-md">{leistung.icon}</div>
                <h3 className="text-xl font-cinzel font-bold text-[#ebd297] mb-3">{leistung.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{leistung.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. SHOWREEL VIDEO */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6 text-center">
            <span className="text-[#ebd297] text-sm font-bold tracking-widest uppercase">Erlebe uns Live</span>
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white mt-2 mb-12">Showreel</h2>

            <div className="max-w-5xl mx-auto relative rounded-xl overflow-hidden border border-[#ebd297]/30 shadow-2xl bg-black">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                  title="Duo Limäx Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SHOW FORMATE */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-4">Showformate</h2>
            <div className="w-24 h-1 bg-[#ebd297] mx-auto rounded-full shadow-[0_0_10px_#ebd297]"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOW_PREVIEWS.map((show, i) => (
              <div key={i} className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-[#ebd297] transition-all flex flex-col shadow-lg">
                <div className="h-64 overflow-hidden relative">
                  <img src={show.img} alt={show.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-cinzel font-bold text-[#ebd297] drop-shadow-md">{show.title}</h3>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <ul className="space-y-2 mb-6 flex-grow">
                    {show.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-sm text-stone-300">
                        <span className="w-1.5 h-1.5 bg-[#ebd297] rounded-full mr-2 shadow-[0_0_5px_#ebd297]"></span> {feat}
                      </li>
                    ))}
                  </ul>
                  <Link to={show.link} className="text-[#ebd297] font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                    {show.cta} <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. USP */}
        <section className="py-24 bg-[#ebd297]/5 border-y border-[#ebd297]/10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {USPS.map((usp, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="mb-6 p-5 rounded-full bg-black/50 border border-[#ebd297]/30 group-hover:border-[#ebd297] group-hover:shadow-[0_0_20px_rgba(235,210,151,0.2)] transition-all duration-300">
                    {usp.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{usp.title}</h3>
                  <p className="text-stone-400 leading-relaxed max-w-xs">{usp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROFIL */}
        <section className="py-24 container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto bg-black/40 p-8 md:p-12 rounded-2xl border border-white/5">
            <div className="w-full md:w-1/2 aspect-square md:aspect-[4/5] relative rounded-lg overflow-hidden shadow-xl border border-white/10">
              <img
                src={`${import.meta.env.BASE_URL}images/e85ca38e-53d8-4fcf-ae75-5ccb9b72aad6-2.jpg`}
                alt="Das Duo"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full md:w-1/2 text-left space-y-6">
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-[#ebd297]">
                Zwei Künstler.<br />Ein Feuertraum.
              </h2>
              <p className="text-stone-300 leading-relaxed">
                Das ist <strong>Duo Limäx</strong>. Zwei Artists verbinden Feuer, Partnerakrobatik und Musik zu einer Show, die Publikum und Veranstalter gleichermaßen fesselt.
              </p>
              <p className="text-stone-300 leading-relaxed">
                Wir stehen nicht nur für spektakuläre Bilder, sondern für Zuverlässigkeit. Von der ersten Absprache bis zum Applaus sind wir euer Partner.
              </p>
              <Link to="/allgemein/ueber-uns/" className="inline-block border-b-2 border-[#ebd297] text-white hover:text-[#ebd297] pb-1 transition-colors uppercase tracking-widest text-sm mt-4">
                Mehr über uns erfahren
              </Link>
            </div>
          </div>
        </section>

        {/* 6. KONTAKT */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a1a1a] to-black border border-[#ebd297]/30 p-10 md:p-20 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[#ebd297]/5 pointer-events-none"></div>

              <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-6 relative z-10">
                Euer Event.<br />Unser Highlight.
              </h2>
              <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
                Ob Hochzeit, Gala oder Stadtfest – wir haben das passende Format. Sichert euch jetzt euren Wunschtermin.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <Link to="/buchung-anfragen" className="btn-gold px-10 py-4 text-black font-bold rounded-sm uppercase tracking-wider shadow-lg">
                  Termin Anfragen
                </Link>
                <a href="tel:015785585713" className="px-10 py-4 border border-stone-600 hover:border-[#ebd297] text-stone-300 hover:text-[#ebd297] transition-all rounded-sm uppercase tracking-wider font-bold">
                  0157 - 85585713
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      <ScrollToTop />
    </div>
  );
};

export default Home;


