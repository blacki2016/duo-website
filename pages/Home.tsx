import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, HeartHandshake, Flame } from 'lucide-react';
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
    icon: <Megaphone className="w-16 h-16 text-[#ebd297]" />,
    title: "Full Service",
    desc: "Ob Komplettlösung oder Integration in vorhandene Theatertechnik – wir sorgen für einen reibungslosen Ablauf."
  },
  {
    icon: <HeartHandshake className="w-16 h-16 text-[#ebd297]" />,
    title: "Duo Power",
    desc: "Synchronität und doppelte Energie für den maximalen Wow-Effekt."
  }
];

// Show Highlights / Show Data
const SHOW_DATA = [
  {
    title: "Magie",
    img: `${import.meta.env.BASE_URL}images/limaex.magie.jpg`,
    features: [
      "Verblüffende Zauberkunst",
      "Close-Up & Bühne",
      "Magische Momente"
    ],
    ctaText: "Verzaubert",
    ctaEmoji: "✨",
    link: "/magie",
    imgPos: "object-top"
  },
  {
    title: "Jonglage",
    img: `${import.meta.env.BASE_URL}images/limaex.jonglage.jpg`,
    features: [
      "Hohes Tempo",
      "Bälle, Keulen & mehr",
      "Präzision pur"
    ],
    ctaText: "Wirbelwind",
    ctaEmoji: "🤹",
    link: "/jonglage",
    imgPos: "object-center"
  },
  {
    title: "Akrobatik",
    img: `${import.meta.env.BASE_URL}images/limaex.rola.jpg.webp`,
    features: [
      "Rola-Rola Show",
      "Körperbeherrschung",
      "Balanceakte"
    ],
    ctaText: "Balance",
    ctaEmoji: "🤸",
    link: "/akrobatik",
    imgPos: "object-center"
  },
  {
    title: "Comedy",
    img: `${import.meta.env.BASE_URL}images/limaex.slider2.jpg`,
    features: [
      "Lachen garantiert",
      "Interaktiver Spaß",
      "Humorvolle Einlagen"
    ],
    ctaText: "Lachmuskeln",
    ctaEmoji: "😂",
    link: "/comedy",
    imgPos: "object-top"
  },
  {
    title: "Großillusionen",
    img: `${import.meta.env.BASE_URL}images/limaex.illusion.jpg`,
    features: [
      "Spektakuläre Effekte",
      "Las Vegas Flair",
      "Große Bühne"
    ],
    ctaText: "Staunen",
    ctaEmoji: "🎩",
    link: "/grossillusionen",
    imgPos: "object-center"
  },
  {
    title: "Musik",
    img: `${import.meta.env.BASE_URL}images/showformate.limaex.jpg`,
    features: [
      "Live Entertainment",
      "Rhythmische Begleitung",
      "Atmosphäre"
    ],
    ctaText: "Klangvoll",
    ctaEmoji: "🎵",
    link: "/musik",
    imgPos: "object-top"
  }
];

// Show Previews
const SHOW_PREVIEWS = [
  {
    title: "UKONGU Mini",
    img: `${import.meta.env.BASE_URL}images/mini.png`,
    features: ["20 Minuten Show", "Perfekt für Events", "Geballte Highlights"],
    link: "/shows",
    cta: "Zum Kurzformat",
    emoji: "⚡",
    isGlassy: true
  },
  {
    title: "Individuelles Konzept",
    img: `${import.meta.env.BASE_URL}images/limaex.slider5.jpg`,
    features: ["Maßgeschneidert", "Passend zum Anlass", "Einzigartige Momente"],
    link: "/shows",
    cta: "Zur Beratung",
    emoji: "🎨"
  },
  {
    title: "UKONGU Abendprogramm",
    img: `${import.meta.env.BASE_URL}images/ukongu.plakat.jpg`,
    features: ["90 Minuten", "Theater & Bühne", "Das volle Erlebnis"],
    link: "/shows",
    cta: "Zum Abendprogramm",
    emoji: "🎭"
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

        /* UKONGU Logo Glow & Shimmer */
        .ukongu-logo-wrap {
          position: relative;
          display: inline-block;
        }
        .ukongu-logo-wrap::before {
          content: '';
          position: absolute;
          inset: -12%;
          background: radial-gradient(circle at 50% 50%, rgba(235,210,151,0.35) 0%, rgba(235,210,151,0.18) 32%, transparent 70%);
          filter: blur(18px);
          opacity: 0.9;
          z-index: 0;
          pointer-events: none;
        }

        .ukongu-logo {
          position: relative;
          z-index: 1;
          filter:
            drop-shadow(0 0 8px rgba(235,210,151,0.65))
            drop-shadow(0 6px 18px rgba(235,210,151,0.45))
            drop-shadow(0 12px 32px rgba(0,0,0,0.55));
        }

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
      <header className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center pt-32 md:pt-48 pb-20">

        <div className="flex flex-col items-center w-full max-w-5xl mx-auto">

          {/* 1. Haupttitel als Bild (LIMAEX) */}
          <div className="animate-fade-up z-10">
            <img
              src={`${import.meta.env.BASE_URL}images/limaex.gold.png`}
              alt="DUO LIMÄX"
              className="mx-auto w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* 2. Schriftzug "präsentiert." */}
          <div className="animate-fade-up delay-100 opacity-0 relative z-20 -mt-2 md:-mt-4">
            <span className="text-[#ebd297] font-serif italic text-lg md:text-2xl tracking-widest drop-shadow-md">
              präsentiert.
            </span>
          </div>

          {/* 3. UKONGU Logo */}
          <div className="animate-fade-up delay-100 opacity-0 -mt-12 md:-mt-20 relative z-10">
            <div className="ukongu-logo-wrap">
              <img
                src={`${import.meta.env.BASE_URL}images/ukongu.gold.png`}
                alt="UKONGU"
                className="ukongu-logo mx-auto w-[160px] sm:w-[200px] md:w-[260px] lg:w-[320px]"
              />
            </div>
          </div>

          {/* 4. Schriftzug "eine Show der Superlative!" */}
          <div className="animate-fade-up delay-100 opacity-0 -mt-16 md:-mt-24 mb-10 relative z-20">
            <span className="text-[#ebd297] font-serif italic text-lg md:text-2xl tracking-widest drop-shadow-md">
              eine Show der Superlative!
            </span>
          </div>

          {/* 5. Button */}
          <div className="animate-fade-up delay-200 opacity-0 z-10">
            <Link
              to="/buchung-anfragen"
              className="btn-gold inline-flex items-center gap-3 px-10 py-5 rounded-sm text-black font-bold uppercase tracking-wider text-base md:text-lg"
            >
              Show Anfragen <Flame className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 bg-stone-900/30 backdrop-blur-md border-t border-[#ebd297]/20 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">

        {/* 1. SHOWHIGHLIGHTS */}
        <section id="showhighlights" className="py-24 bg-transparent border-t border-white/5 relative z-10">
          <style>{`
            .show-card:hover .show-card-img {
                transform: scale(1.03);
            }
          `}</style>

          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#ebd297] mb-4">
                Show Highlights
              </h2>
              <p className="text-white max-w-xl mx-auto uppercase tracking-widest text-sm">
                Entdecken Sie unsere Vielfalt
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
              {SHOW_DATA.map((show, i) => (
                <div
                  key={i}
                  className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-[#ebd29780] hover:border-gold-300 transition-all hover:-translate-y-2 show-card group shadow-lg flex flex-col w-full"
                >
                  <div className="h-[400px] overflow-hidden relative">
                    <img
                      src={show.img}
                      alt={show.title}
                      className={`w-full h-full object-cover show-card-img transition-transform duration-700 ${show.imgPos}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                    <h3 className="absolute bottom-4 left-5 text-3xl font-serif font-bold text-[#ebd297] z-10 drop-shadow-md leading-tight">
                      {show.title}
                    </h3>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div className="mb-4 flex-grow space-y-2">
                      {show.features.map((feature, idx) => (
                        <p key={idx} className="text-stone-200 text-base font-bold leading-snug flex items-start gap-2">
                          <span className="text-[#ebd297] mt-[4px] text-[10px]">●</span> {feature}
                        </p>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10">
                      <Link
                        to={show.link}
                        className="inline-flex items-center gap-3 text-xl font-extrabold text-[#ebd297] hover:text-white transition-colors uppercase tracking-widest w-fit"
                      >
                        {show.ctaText}
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        <span className="text-3xl filter drop-shadow-md">{show.ctaEmoji}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  src="https://www.youtube.com/embed/fLi4wht1iwI"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {SHOW_PREVIEWS.map((show: any, i) => (
              <div key={i} className="group bg-[#1a1a1a]/50 rounded-xl overflow-hidden border border-white/5 hover:border-[#ebd297] transition-all flex flex-col shadow-lg h-full">
                {/* HIER WURDE GEÄNDERT:
                  Prüfung auf show.isGlassy.
                  bg-white/10 -> Deutlich heller (Weiß-Anteil) als nur transparent/schwarz.
                */}
                <div
                  className={`aspect-[2/3] w-full relative overflow-hidden ${
                    show.isGlassy ? 'bg-white/10 backdrop-blur-md' : ''
                  }`}
                  style={{ backgroundColor: show.isGlassy ? undefined : (show.bgColor || '#000') }}
                >
                  <img
                    src={show.img}
                    alt={show.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-2xl font-cinzel font-bold text-[#ebd297] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{show.title}</h3>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col border-t border-white/10">
                  <ul className="space-y-3 mb-6 flex-grow">
                    {show.features.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start text-base text-stone-300">
                        <span className="w-1.5 h-1.5 bg-[#ebd297] rounded-full mr-3 mt-2 shadow-[0_0_5px_#ebd297] flex-shrink-0"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link to={show.link} className="text-[#ebd297] font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                      {show.cta} <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. USP */}
        <section className="py-24 bg-[#ebd297]/5 border-y border-[#ebd297]/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 text-center">
              {USPS.map((usp, idx) => (
                <div key={idx} className="flex flex-col items-center group max-w-sm">
                  <div className="mb-6 p-5 rounded-full bg-black/50 border border-[#ebd297]/30 group-hover:border-[#ebd297] group-hover:shadow-[0_0_20px_rgba(235,210,151,0.2)] transition-all duration-300">
                    {usp.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{usp.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{usp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROFIL */}
        <section className="py-24 container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto bg-black/50 p-8 md:p-12 rounded-2xl border border-white/5">
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
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a1a1a]/90 to-black/90 border border-[#ebd297]/30 p-10 md:p-20 rounded-3xl relative overflow-hidden shadow-2xl">
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


