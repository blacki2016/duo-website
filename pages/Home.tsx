import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Phone, ChevronDown, PlayCircle } from 'lucide-react';
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

// Show Highlights
const SHOW_DATA = [
  {
    title: "Magie",
    img: `${import.meta.env.BASE_URL}images/limaex.magie.jpg`,
    features: ["Verblüffende Zauberkunst", "Close-Up & Bühne", "Magische Momente"],
    ctaText: "Verzaubert",
    ctaEmoji: "✨",
    link: "/magie",
    imgPos: "object-top"
  },
  {
    title: "Jonglage",
    img: `${import.meta.env.BASE_URL}images/limaex.jonglage.jpg`,
    features: ["Hohes Tempo", "Bälle, Keulen & mehr", "Präzision pur"],
    ctaText: "Wirbelwind",
    ctaEmoji: "🤹",
    link: "/jonglage",
    imgPos: "object-center"
  },
  {
    title: "Akrobatik",
    img: `${import.meta.env.BASE_URL}images/limaex.rola.jpg.webp`,
    features: ["Rola-Rola Show", "Körperbeherrschung", "Balanceakte"],
    ctaText: "Balance",
    ctaEmoji: "🤸",
    link: "/akrobatik",
    imgPos: "object-center"
  },
  {
    title: "Comedy",
    img: `${import.meta.env.BASE_URL}images/limaex.slider2.jpg`,
    features: ["Lachen garantiert", "Interaktiver Spaß", "Humorvolle Einlagen"],
    ctaText: "Lachmuskeln",
    ctaEmoji: "😂",
    link: "/comedy",
    imgPos: "object-top"
  },
  {
    title: "Großillusionen",
    img: `${import.meta.env.BASE_URL}images/limaex.illusion.jpg`,
    features: ["Spektakuläre Effekte", "Las Vegas Flair", "Große Bühne"],
    ctaText: "Staunen",
    ctaEmoji: "🎩",
    link: "/grossillusionen",
    imgPos: "object-center"
  },
  {
    title: "Musik",
    img: `${import.meta.env.BASE_URL}images/showformate.limaex.jpg`,
    features: ["Live Entertainment", "Rhythmische Begleitung", "Atmosphäre"],
    ctaText: "Klangvoll",
    ctaEmoji: "🎵",
    link: "/musik",
    imgPos: "object-top"
  }
];

// Show Previews (Formate)
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

// FAQ Data
const FAQ_DATA = [
  {
    q: "Wie viel Platz benötigen Sie für die Show?",
    a: "Das hängt vom gewählten Format ab. Für 'UKONGU Mini' oder Close-Up Magie sind wir sehr flexibel und benötigen nur wenige Quadratmeter. Für die große Bühnenshow oder Großillusionen empfehlen wir eine Bühnenfläche von mindestens 4x3 Metern. Wir passen uns aber immer bestmöglich an Ihre Location an."
  },
  {
    q: "Bringen Sie Ihre eigene Technik mit?",
    a: "Ja, absolut. Wir sind technisch voll ausgestattet mit Ton- und Lichttechnik für Veranstaltungen bis zu einer gewissen Größe. Bei sehr großen Events stimmen wir uns nahtlos mit Ihrem Technik-Dienstleister vor Ort ab."
  },
  {
    q: "Wie weit reisen Sie an?",
    a: "Wir treten deutschlandweit und auch international auf. Reisekosten und Übernachtung (falls notwendig) werden transparent im Angebot aufgeführt."
  },
  {
    q: "Wie lange dauert der Aufbau?",
    a: "Im Schnitt benötigen wir etwa 60-90 Minuten für den Aufbau und Soundcheck vor Beginn der Veranstaltung. Der Abbau geht meist schneller (ca. 30-45 Minuten)."
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Erkenne Mobile vs. Desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen flex flex-col text-stone-200 bg-stone-900 font-sans selection:bg-[#ebd297] selection:text-black">

      {/* --- STYLES --- */}
      <style>{`
        .font-cinzel { font-family: 'Cinzel', serif; }
        
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

        .btn-outline-gold {
            background: transparent;
            border: 1px solid #ebd297;
            color: #ebd297;
            transition: all 0.3s ease;
        }
        .btn-outline-gold:hover {
            background: rgba(235, 210, 151, 0.1);
            color: #fff;
            border-color: #fff;
        }

        /* Glassy Button Effect für Telefon */
        .btn-glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .btn-glass:hover {
            background: rgba(235, 210, 151, 0.9);
            color: black;
            border-color: #ebd297;
            box-shadow: 0 0 20px rgba(235, 210, 151, 0.4);
            transform: translateY(-2px);
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeInUp 1s ease-out forwards; }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }

        .ukongu-logo-wrap { position: relative; display: inline-block; }
        .ukongu-logo-wrap::before {
          content: ''; position: absolute; inset: -12%;
          background: radial-gradient(circle at 50% 50%, rgba(235,210,151,0.35) 0%, rgba(235,210,151,0.18) 32%, transparent 70%);
          filter: blur(18px); opacity: 0.9; z-index: 0; pointer-events: none;
        }
        .ukongu-logo {
          position: relative; z-index: 1;
          filter: drop-shadow(0 0 8px rgba(235,210,151,0.65)) drop-shadow(0 6px 18px rgba(235,210,151,0.45));
        }
      `}</style>

      {/* --- BACKGROUND SLIDER --- */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-stone-900/95 z-10"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center pt-32 md:pt-48 pb-20">
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
          <div className="animate-fade-up z-10">
            <img
              src={`${import.meta.env.BASE_URL}images/limaex.gold.png`}
              alt="DUO LIMÄX"
              className="mx-auto w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.55)]"
            />
          </div>
          <div className="animate-fade-up delay-100 opacity-0 relative z-20 -mt-2 md:-mt-4">
            <span className="text-[#ebd297] font-serif italic text-lg md:text-2xl tracking-widest drop-shadow-md">
              präsentiert.
            </span>
          </div>
          <div className="animate-fade-up delay-100 opacity-0 -mt-12 md:-mt-20 relative z-10">
            <div className="ukongu-logo-wrap">
              <img
                src={`${import.meta.env.BASE_URL}images/ukongu.gold.png`}
                alt="UKONGU"
                className="ukongu-logo mx-auto w-[160px] sm:w-[200px] md:w-[260px] lg:w-[320px]"
              />
            </div>
          </div>
          <div className="animate-fade-up delay-100 opacity-0 -mt-16 md:-mt-24 mb-10 relative z-20">
            <span className="text-[#ebd297] font-serif italic text-lg md:text-2xl tracking-widest drop-shadow-md">
              eine Show der Superlative!
            </span>
          </div>
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

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="relative z-20 bg-stone-900/30 backdrop-blur-md border-t border-[#ebd297]/20 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">

        {/* 1. SHOWHIGHLIGHTS */}
        <section id="showhighlights" className="py-24 bg-transparent border-t border-white/5 relative z-10">
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
                <div key={i} className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-[#ebd29780] hover:border-gold-300 transition-all hover:-translate-y-2 show-card group shadow-lg flex flex-col w-full">
                  <div className="h-[400px] overflow-hidden relative">
                    <img src={show.img} alt={show.title} className={`w-full h-full object-cover show-card-img transition-transform duration-700 ${show.imgPos}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                    <h3 className="absolute bottom-4 left-5 text-3xl font-serif font-bold text-[#ebd297] z-10 drop-shadow-md leading-tight">{show.title}</h3>
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
                      <Link to={show.link} className="inline-flex items-center gap-3 text-xl font-extrabold text-[#ebd297] hover:text-white transition-colors uppercase tracking-widest w-fit">
                        {show.ctaText} <span className="transform group-hover:translate-x-1 transition-transform">→</span> <span className="text-3xl filter drop-shadow-md">{show.ctaEmoji}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. MAGIE. LEIDENSCHAFT. ENTERTAINMENT. (Showreel + Text zusammengeführt) */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Textblock */}
            <div className="w-full lg:w-1/2">
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-[#ebd297]/10 rounded-full blur-2xl"></div>
                <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white leading-tight">
                  Magie.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] to-[#8E6F34]">Leidenschaft.</span><br />
                  Entertainment.
                </h2>
              </div>

              <div className="w-20 h-1 bg-[#ebd297] mb-8"></div>

              <p className="text-stone-300 text-lg leading-relaxed font-light mb-6">
                Erleben Sie eine <span className="text-white font-medium">Las-Vegas-reife Showproduktion!</span> Das Duo Limäx verbindet klassische Magie mit moderner Technik, charmanter Comedy und energiegeladener Artistik.
              </p>
              <p className="text-stone-300 text-lg leading-relaxed font-light mb-8">
                Ob Gala, Varieté oder Stadtfest – <span className="text-[#ebd297] font-serif italic">"UKONGU"</span> ist flexibel skalierbar. Von 15 Minuten Highlight-Show bis zum 90-minütigen abendfüllenden Programm. Wir bringen unser komplettes Equipment mit und sorgen für unvergessliche Momente.
              </p>

              <div className="flex gap-4">
                <Link to="/shows" className="text-[#ebd297] border-b border-[#ebd297] pb-1 hover:text-white hover:border-white transition-all uppercase tracking-widest text-sm font-bold">
                  Alle Showformate ansehen
                </Link>
              </div>
            </div>

            {/* Video */}
            <div className="w-full lg:w-1/2 relative group cursor-pointer">
              <div className="absolute inset-0 bg-[#ebd297] transform translate-x-2 translate-y-2 rounded-lg transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>

              <div className="relative rounded-lg overflow-hidden aspect-video shadow-2xl">
                <div className="w-full h-full bg-black relative">
                  <iframe
                    className="w-full h-full pointer-events-none"
                    src="https://www.youtube.com/embed/fLi4wht1iwI?controls=0&mute=1&loop=1&playlist=fLi4wht1iwI"
                    title="Showreel Background"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>

                  <div className="absolute inset-0 bg-transparent flex items-center justify-center transition-all">
                    <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" strokeWidth={1} />
                  </div>
                </div>
              </div>

              <p className="text-center mt-4 text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-[#ebd297] transition-colors">
                Showreel ansehen
              </p>
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
                <div
                  className={`aspect-[2/3] w-full relative overflow-hidden ${show.isGlassy ? 'bg-transparent' : ''
                    }`}
                  style={{ backgroundColor: show.isGlassy ? undefined : (show.bgColor || '#000') }}
                >
                  <img src={show.img} alt={show.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
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

        {/* 5. PROFIL */}
        <section className="py-24 container mx-auto px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute top-4 left-4 w-full h-full border-2 border-[#ebd297]/40 rounded-lg -z-10 group-hover:top-6 group-hover:left-6 transition-all duration-500"></div>
              <div className="aspect-[4/5] w-full relative rounded-lg overflow-hidden shadow-2xl bg-black">
                <img
                  src={`${import.meta.env.BASE_URL}images/maxleo.jpg`}
                  alt="Das Duo Limäx Portrait"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div>
                <span className="text-[#ebd297] font-bold tracking-[0.2em] uppercase text-sm mb-2 block">Über Uns</span>
                <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white leading-tight">
                  Zwei Künstler.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] to-[#C8A663]">Eine Leidenschaft.</span>
                </h2>
              </div>

              <div className="space-y-4 text-stone-300 text-lg leading-relaxed font-light">
                <p>
                  Das ist <strong>Duo Limäx</strong>. Wir verbinden die Leichtigkeit der Comedy mit präziser Artistik, verblüffender Magie und energiegeladener Musik zu einer Show, die begeistert.
                </p>
                <p>
                  Als vielseitige Entertainer sorgen wir für unvergessliche Momente. Egal ob auf der großen Bühne oder mitten im Publikum – wir sind Ihr verlässlicher Partner für erstklassige Unterhaltung.
                </p>
              </div>

              <div className="pt-4">
                <Link to="/allgemein/ueber-uns/" className="btn-outline-gold inline-flex items-center gap-3 px-8 py-4 rounded-sm uppercase tracking-widest text-sm font-bold group">
                  Mehr erfahren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* HÄUFIGE FRAGEN (FAQ) - REDESIGNED */}
        <section className="py-24 relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ebd297]/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ebd297]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] to-[#C8A663] mb-3">Häufige Fragen</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ebd297] to-transparent mx-auto rounded-full mb-4 shadow-[0_0_10px_#ebd297]"></div>
              <p className="text-[#ebd297]/70">Alles Wichtige auf einen Blick</p>
            </div>

            <div className="space-y-4">
              {FAQ_DATA.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden transition-all duration-300 ${openFaqIndex === index
                    ? 'bg-gradient-to-br from-[#ebd297]/15 to-[#ebd297]/5 border-2 border-[#ebd297]/50 shadow-[0_0_20px_rgba(235,210,151,0.2)]'
                    : 'bg-black/30 border border-[#ebd297]/10 hover:border-[#ebd297]/30 hover:bg-black/40'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
                  >
                    <span className="text-lg font-semibold text-[#ebd297] transition-all duration-300">
                      {item.q}
                    </span>
                    <div className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${openFaqIndex === index ? 'text-[#ebd297]' : 'text-stone-500 group-hover:text-[#ebd297]'}`} />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-stone-300 leading-relaxed text-base font-light border-t border-[#ebd297]/20 mt-1">
                      {item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. KONTAKT */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1a1a1a] to-transparent -z-20"></div>

          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-[#111] border border-[#ebd297]/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-[0_0_100px_rgba(235,210,151,0.1)]">

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ebd297] to-transparent opacity-50"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ebd297]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#ebd297]/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white mb-6">
                  Euer Event.<br /><span className="text-[#ebd297]">Unser Highlight.</span>
                </h2>
                <p className="text-stone-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
                  Ob exklusive Gala, romantische Hochzeit oder großes Stadtfest – wir kreieren den Moment, über den Ihre Gäste noch lange sprechen werden.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link to="/buchung-anfragen" className="btn-gold px-12 py-5 text-black font-bold rounded-sm uppercase tracking-wider text-lg shadow-[0_10px_30px_rgba(235,210,151,0.3)] hover:shadow-[0_15px_40px_rgba(235,210,151,0.5)] transform hover:-translate-y-1 transition-all">
                    Termin Anfragen
                  </Link>
                  <a href="tel:015785585713" className="btn-glass px-10 py-5 text-white font-bold rounded-sm uppercase tracking-wider flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    0157 - 85585713
                  </a>
                </div>

                <p className="mt-8 text-stone-500 text-sm uppercase tracking-widest">
                  Jetzt unverbindlich anfragen
                </p>
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


