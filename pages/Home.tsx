import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, HeartHandshake, ShieldCheck, Megaphone } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

// Hero Background: Einzelnes Bild (keine Rotation)
const SLIDES = [
  `${import.meta.env.BASE_URL}images/heroslider1.jpg`
];

// USP Data - UPDATED
const USPS = [
  {
    // Internes Icon für "Geprüfte Sicherheit"
    icon: <ShieldCheck className="w-full h-full text-[#ebd297]" />,
    title: "Geprüfte Sicherheit",
    desc: "Sicherheit geht vor Showeffekt. Als ausgebildeter Bühnenpyrotechniker garantiere ich einen sicheren Ablauf für Location und Gäste."
  },
  {
    // Internes Icon für "All In"
    icon: <Megaphone className="w-full h-full text-[#ebd297]" />,
    title: "All In",
    desc: "Kein LKW, aber volles Equipment: Ich bringe meine professionelle Ton- und Lichttechnik direkt mit. Sie können entspannt die Füße hochlegen."
  },
  {
    // Internes Icon für "Hautnah & Interaktiv"
    icon: <HeartHandshake className="w-full h-full text-[#ebd297]" />,
    title: "Hautnah & Interaktiv",
    desc: "Kein steriler Programmpunkt, sondern Entertainment zum Anfassen. Ich beziehe das Publikum charmant mit ein – ein Erlebnis, das verbindet."
  }
];

// Testimonials Data - EXPANDED & UPDATED
const TESTIMONIALS = [
  {
    name: "Martin Henke",
    event: "Geburtstag",
    text: "Coole Feuershow Max!!! War echt beeindruckend was du alles kannst! Voll krasses Finale mit den Funken am Schluss!",
    customIcon: <span className="font-serif font-bold text-xl">M</span>
  },
  {
    name: "Patrick",
    event: "Hochzeit",
    text: "Eine Wahnsinns-Feuershow als Überraschung! Wir kamen aus dem Staunen nicht heraus. Max gestaltet die Show so amüsant, dass Klein und Groß viel gelacht haben. Ein tolles Highlight und eine große Empfehlung!",
    customIcon: <span className="font-serif font-bold text-xl">P</span>
  },
  {
    name: "Julia B.",
    event: "Hochzeit / Event",
    text: "Super Entertainer! Musik und Show auf Wunsch, gutes Preis/Leistungsverhältnis. Freunde und ich waren absolut begeistert. Zudem super freundlich und super beraten. Kann ich nur weiter empfehlen!",
    customIcon: <span className="font-serif font-bold text-xl">J</span>
  },
  {
    name: "Vertres GmbH",
    event: "Weihnachtsfeier",
    text: "Herr Boy hat unsere Weihnachtsfeier mit einer gigantischen Feuershow zum Highlight gemacht. Wir waren begeistert von der Mischung aus Witz und Kunst. Für zukünftige Veranstaltungen ist er fest vorgemerkt.",
    // Updated Logo
    logo: `${import.meta.env.BASE_URL}images/goldi.png`
  },
  {
    name: "Hochzeitspaar",
    event: "Bayreuth / Thurnau",
    text: "Ein Feuerwerk mit Witz und Kunst! Geduldig, professionell und zuvorkommend in der Planung. Man muss sich um nichts kümmern, inkl. Sicherheit. Absolut empfehlenswert!",
    customIcon: <span className="font-serif font-bold text-xl">H</span>
  },
  {
    name: "Firma aus Crailsheim",
    event: "Firmenfeier",
    text: "Super netter Kontakt! Pünktlich und Zuverlässig. Der Auftritt war sehr gut und auch sehr unterhaltsam.",
    customIcon: <span className="font-serif font-bold text-xl">F</span>
  },
  {
    name: "Wust Wind Sonne",
    event: "Firmenfest",
    text: "Alles lief reibungslos! Seine Akrobatikshow hat Jung und Alt begeistert. Eine gute Mischung aus Spannung und Humor machte die Show sehr kurzweilig. Beim nächsten Mal buchen wir definitiv die Feuershow!",
    logo: `${import.meta.env.BASE_URL}images/wustwindsonne.png`,
  },
  {
    name: "Private Feier",
    event: "Hochzeit",
    text: "Originelle Show der etwas anderen Art; sehr netter Künstler; absolut weiterzuempfehlen; Preis-/ Leistungsverhältnis ist angemessen und nicht überzogen.",
    customIcon: <span className="font-serif font-bold text-xl">P</span>
  }
  ,
  {
    name: "Nele A.",
    event: "Öffentlicher Auftritt",
    text: "Ich war bei der Show von Maximilian bei der Museumsnacht in Bad Windsheim und bin echt begeistert. Die Rola-Bola-Nummer in der Artistik-Show war für mich das absolute Highlight!🌟 Und die Feuershow am Abend war der perfekte Abschluss. Wir überlegen ihn auch mal für ein privates Event zu buchen. Vielen Dank! ☺️",
    customIcon: <span className="font-serif font-bold text-xl">N</span>
  }
];

// Updated Data for Showformate Section with Position Tweaks
const SHOW_PREVIEWS = [
  {
    title: "Feuershow",
    img: `${import.meta.env.BASE_URL}images/heroslider1.jpg`,
    features: [
      "Humorvolles Familienprogramm",
      "Feuerjonglage & Artistik",
      "Großes Flammen-Finale"
    ],
    ctaText: "HEIẞE DETAILS", // Updated Text
    ctaEmoji: "🔥",
    link: "/feuershow",
    imgPos: "object-top"
  },
  {
    title: "Artistikshow",
    img: `${import.meta.env.BASE_URL}images/showformate.artistik.jpg`,
    features: [
      "Handstand-Acts & Balance",
      "Rola-Rola Show",
      "Ideal für Indoor/Gala"
    ],
    ctaText: "Brauchst du ein \"Rad\"?",
    ctaEmoji: "🤸",
    link: "/artistikshow",
    imgPos: "object-[center_25%]" // Slightly pulled up (focus lower down the image)
  },
  {
    title: "Walk Act / Stelzen",
    img: `${import.meta.env.BASE_URL}images/showformate.walkact.jpg`,
    features: [
      "Interaktive Begrüßung",
      "Mit oder ohne Stelzen",
      "Ballonmodellage & Spaß"
    ],
    ctaText: "Hereinspaziert",
    ctaEmoji: "🚶",
    link: "/walkact",
    imgPos: "object-top"
  },
  {
    title: "Duo Limäx",
    img: `${import.meta.env.BASE_URL}images/showformate.limaex.jpg`,
    features: [
      "2 Künstler = Doppelte Power",
      "Großillusionen & Comedy",
      "Wilder Mix aus Magie & Musik"
    ],
    ctaText: "Hex hex",
    ctaEmoji: "✨",
    link: "/duolimaex",
    imgPos: "object-[80%_0]"
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Logic
  const testimonialRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = testimonialRef.current;
    if (!track) return;

    let animationFrameId: number;
    let isPaused = false;
    let scrollPos = 0;
    const speed = 0.5;
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    // Clone items for infinite effect (only if not already cloned)
    if (track.getAttribute('data-cloned') !== 'true') {
      const originalChildren = Array.from(track.children);
      originalChildren.forEach(child => {
        track.appendChild((child as HTMLElement).cloneNode(true));
      });
      track.setAttribute('data-cloned', 'true');
    }

    const loop = () => {
      if (!isPaused && !isDown && track) {
        scrollPos += speed;
        // When we've scrolled past the original set width (approx), reset to 0
        if (scrollPos >= track.scrollWidth / 2) {
          scrollPos = 0;
          track.scrollLeft = 0;
        } else {
          track.scrollLeft = scrollPos;
        }
      } else if (track) {
        // Sync scrollPos when paused/dragged so it resumes smoothly
        scrollPos = track.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    // --- MOUSE DRAG EVENTS ---
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      startScrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
      // Stop animation momentarily
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isDown = false;
      isPaused = false;
      track.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      track.style.cursor = 'grab';
      // Resume after short delay
      setTimeout(() => { isPaused = false; }, 500);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag speed multiplier
      track.scrollLeft = startScrollLeft - walk;
      scrollPos = track.scrollLeft;
    };

    // --- TOUCH EVENTS (Mobile) ---
    // Note: overflow-x-auto allows native swipe, but we want to pause auto-scroll
    const handleTouchStart = () => {
      isPaused = true;
      isDown = true;
    };

    const handleTouchEnd = () => {
      isDown = false;
      setTimeout(() => { isPaused = false; }, 1500);
    };

    // Hover to pause
    const handleMouseEnter = () => { isPaused = true; };

    track.addEventListener('mousedown', handleMouseDown);
    track.addEventListener('mouseleave', handleMouseLeave);
    track.addEventListener('mouseup', handleMouseUp);
    track.addEventListener('mousemove', handleMouseMove);

    track.addEventListener('mouseenter', handleMouseEnter);

    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd);

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (track) {
        track.removeEventListener('mousedown', handleMouseDown);
        track.removeEventListener('mouseleave', handleMouseLeave);
        track.removeEventListener('mouseup', handleMouseUp);
        track.removeEventListener('mousemove', handleMouseMove);
        track.removeEventListener('mouseenter', handleMouseEnter);
        track.removeEventListener('touchstart', handleTouchStart);
        track.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  useEffect(() => {
    // Slower interval for a more relaxed transition
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-stone-200 overflow-hidden">

      <style>{`
        /* Lively Gold Button Style */
        @keyframes btnGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .btn-lively {
            background: linear-gradient(45deg, #d4af37, #ebd297, #fffebb, #b38728, #ebd297);
            background-size: 300% 300%;
            animation: btnGradient 3s ease infinite;
            color: #000 !important;
            font-weight: 800;
            box-shadow: 0 0 20px rgba(235, 210, 151, 0.5);
            transition: all 0.3s ease;
            text-transform: uppercase;
            border: none;
            font-family: 'Montserrat', sans-serif;
        }
        .btn-lively:hover {
            box-shadow: 0 0 30px rgba(235, 210, 151, 1);
            transform: scale(1.05) translateY(-2px);
        }

        /* Card Hover Effect */
        .show-card:hover .show-card-img {
            transform: scale(1.03);
        }

        /* Ken Burns Effect for Global Background */
        @keyframes kenBurns {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.15) translate(-2%, -2%); }
        }
        
        .animate-ken-burns {
            animation: kenBurns 20s ease-in-out infinite alternate;
        }

        /* Gezielt nur für Hero-Slides: Opacity-Transition zentral steuern */
        .hero-slide { transition: opacity 2000ms ease-in-out; }

        /* Reduced Motion: Animationen reduzieren/abschalten */
        @media (prefers-reduced-motion: reduce) {
          .animate-ken-burns { animation: none !important; }
          .hero-slide { transition-duration: 0ms !important; }
        }

        /* Quote Icon Background */
        .quote-bg {
            position: absolute;
            top: 10px; right: 20px;
            font-size: 8rem;
            color: rgba(235, 210, 151, 0.05);
            font-family: serif;
            line-height: 1;
            pointer-events: none;
        }

        /* Hide Scrollbar Utility */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* 0. GLOBAL BACKGROUND LAYER (Fixed) */}
      <div className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out hero-slide ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Image Container with Ken Burns */}
            <div
              className={`w-full h-full bg-cover bg-center ${index === currentSlide ? 'animate-ken-burns' : ''}`}
              style={{
                backgroundImage: `url('${slide}')`,
              }}
            />
          </div>
        ))}
        {/* Dark Overlay reduced to make image sharper/brighter (bg-black/70 -> bg-black/40) */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* 1. Hero Content Section (Transparent background to show global bg) */}
      <header className="relative w-full h-screen overflow-hidden flex items-center justify-center mt-[50px] z-10">
        <div className="relative text-center px-4 max-w-6xl mx-auto">
          <span className="block text-gold-400 font-bold tracking-wider uppercase mb-6 animate-fade-in-up text-lg md:text-xl lg:text-2xl drop-shadow-md">
            Maximilian Boy & MB Feuerentertainment
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold mb-8 leading-tight drop-shadow-2xl uppercase text-white">
            FEUER, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-gold-300 filter drop-shadow-lg">
              ARTISTIK UND EIN HAUCH VON MAGIE!
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            Maximilian Boy & MB Feuerentertainment bringen spektakuläres Live-Entertainment mit einem Funken Wahnsinn auf jede Bühne.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/buchung-anfragen"
              className="btn-lively px-10 py-4 text-base md:text-lg tracking-widest rounded-full flex items-center justify-center gap-3"
            >
              Buchung anfragen <span className="text-xl">🗒️</span>
            </Link>
            <Link
              to="/showformate"
              className="btn-lively px-10 py-4 text-base md:text-lg tracking-widest rounded-full flex items-center justify-center gap-3"
            >
              Showformate <span className="text-xl">🎪</span>
            </Link>
          </div>
        </div>
      </header>

      {/* REVIEWS SECTION - SEHR KOMPAKT NACH HERO */}
      <section className="py-6 px-4 bg-black/30 overflow-hidden border-b border-white/5 relative z-20">
        <div className="container mx-auto mb-4 text-center">
          <h2 className="text-lg md:text-xl font-serif font-bold text-white mb-0">Gänsehaut garantiert</h2>
          <p className="text-[#ebd297] uppercase tracking-widest text-xs">Das sagen Zuschauer</p>
        </div>

        {/* INFINITE CAROUSEL TRACK */}
        <div className="w-full overflow-hidden py-2">
          <div
            ref={testimonialRef}
            className="flex gap-4 w-full cursor-grab px-4 no-scrollbar overflow-x-auto"
            style={{ scrollBehavior: 'auto' }}
          >
            {TESTIMONIALS.map((t: any, i) => (
              <div key={i} className="flex-shrink-0 w-[240px] md:w-[320px] bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-[#ebd297]/10 relative overflow-hidden group hover:border-[#ebd297]/30 transition-colors flex flex-col select-none max-h-[320px] md:max-h-[360px] overflow-y-auto">
                <div className="quote-bg" style={{ fontSize: '2rem' }}>"</div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} className="w-3 h-3 text-[#ebd297] fill-[#ebd297]" />
                  ))}
                </div>
                <p className="text-stone-300 italic mb-2 relative z-10 leading-tight flex-grow text-xs">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-1.5 border-t border-white/10 pt-2 mt-auto">
                  {/* UNIFIED LOGO CONTAINER */}
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    {t.logo ? (
                      <img src={t.logo} alt="Partner Logo" className="max-w-full max-h-full object-contain pointer-events-none" />
                    ) : t.customIcon ? (
                      <div className="w-8 h-8 rounded-full bg-[#ebd297]/10 flex items-center justify-center border border-[#ebd297]/20 text-[#ebd297] text-[10px]">
                        {t.customIcon}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#ebd297]/20 flex items-center justify-center text-[#ebd297] font-bold font-serif text-[9px]">
                        {t.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-xs">{t.name}</h4>
                    <span className="text-[10px] text-[#ebd297] uppercase tracking-wider">{t.event}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WRAPPER FOR CONTENT BELOW HERO WITH BACKGROUND */}
      <div className="relative w-full">
        {/* Background Image Layer for lower section */}
        <div className="absolute inset-0 z-0">
          {/* UPDATED IMAGE URL & OPACITY */}
          <div className="absolute inset-0 bg-[url('https://maximilianboy.de/mystaging02/wp-content/uploads/2025/09/cropped-Z62_3654-46.jpg')] bg-fixed bg-cover bg-center opacity-60"></div>
          {/* LIGHTER OVERLAY: bg-black/80 -> bg-black/50 */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10">

          {/* 2. Profile Section - EXACT SAME HEIGHT & MOBILE MATCH */}
          <section className="py-24 bg-transparent flex justify-center items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">

                {/* Left Card: Image */}
                <div className="w-full aspect-square border-2 border-[#ebd29780] rounded-2xl overflow-hidden shadow-2xl relative group bg-black/40 backdrop-blur-md">
                  <img
                    src="/images/e85ca38e-53d8-4fcf-ae75-5ccb9b72aad6-2.jpg"
                    alt="Maximilian Boy Portrait"
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-[800ms] group-hover:scale-105"
                  />
                </div>

                {/* Right Card: Text */}
                <div className="w-full aspect-square flex flex-col justify-center items-center p-8 md:p-10 relative text-center bg-black/60 backdrop-blur-lg border-2 border-[#ebd29780] rounded-2xl shadow-2xl">

                  <h2 className="font-serif text-2xl md:text-3xl text-gold-400 mb-6 leading-snug drop-shadow-md">
                    Atemberaubende <br /> <span className="text-gold-100 font-bold">Feuershows</span> & Magie.
                  </h2>

                  <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-4">
                    Das ist <strong className="text-white">Maximilian Boy</strong>. Seit Jahren begeistert er mit Auftritten, bei denen Feuer, Bewegung und Musik verschmelzen.
                  </p>

                  <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                    Leidenschaft, Präzision und Emotion für unvergessliche Momente.
                  </p>

                  <div className="mt-8">
                    <Link to="/uebermich" className="text-[#ebd297] border-b border-[#ebd297] hover:text-white hover:border-white transition-colors uppercase text-sm tracking-widest pb-1">
                      Mehr über mich
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 2.75 Showformate Preview (CARDS UPDATED: TALLER HEIGHT FOR FULL IMAGE) - MOVED UP */}
          <section className="py-24 bg-transparent border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#ebd297] mb-4">Showformate</h2>
                <p className="text-white max-w-xl mx-auto uppercase tracking-widest text-sm">Für jeden Anlass das passende Highlight</p>
              </div>

              {/* Increased max-w for grid to allow wider cards, increased gaps */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
                {SHOW_PREVIEWS.map((show, i) => (
                  <div key={i} className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-[#ebd29780] hover:border-gold-300 transition-all hover:-translate-y-2 show-card group shadow-lg flex flex-col w-full">
                    {/* Reduced height to h-[450px] */}
                    <div className="h-[450px] overflow-hidden relative">
                      <img
                        src={show.img}
                        alt={show.title}
                        className={`w-full h-full object-cover show-card-img transition-transform duration-700 ${show.imgPos}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent"></div>
                      {/* Larger Title: text-3xl */}
                      <h3 className="absolute bottom-4 left-5 text-3xl font-serif font-bold text-[#ebd297] z-10 drop-shadow-md leading-tight">
                        {show.title}
                      </h3>
                    </div>

                    {/* Increased padding: p-5 */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      {/* Features List: Bolder and Larger (text-base font-bold) */}
                      <div className="mb-4 flex-grow space-y-2">
                        {show.features.map((feature, idx) => (
                          <p key={idx} className="text-stone-200 text-base font-bold leading-snug flex items-start gap-2">
                            <span className="text-[#ebd297] mt-[4px] text-[10px]">●</span> {feature}
                          </p>
                        ))}
                      </div>

                      {/* CTA: Larger Text (text-xl) and HUGE Emoji (text-3xl) */}
                      <div className="mt-auto pt-4">
                        <Link to={show.link} className="inline-flex items-center gap-3 text-xl font-extrabold text-[#ebd297] hover:text-white transition-colors uppercase tracking-widest w-fit">
                          {show.ctaText}
                          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                          <span className="text-4xl filter drop-shadow-md">{show.ctaEmoji}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>



          {/* 2.5 USP Section (Why Me?) - NACH REVIEWS */}
          <section className="py-20 bg-transparent border-t border-white/5">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-3xl font-serif font-bold text-white mb-16">
                Warum <span className="text-[#ebd297]">Maximilian Boy</span> buchen?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {USPS.map((usp, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-[#ebd297]/10 hover:border-[#ebd297]/40 transition-colors shadow-lg group">
                    {/* Nur interne Icons anzeigen */}
                    <div className="mb-6 h-32 w-full flex items-center justify-center shrink-0">
                      <div className="h-28 w-28 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(235,210,151,0.2)]">
                        {usp.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#ebd297] mb-3">{usp.title}</h3>
                    <p className="text-stone-400 leading-relaxed">{usp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3.5 Contact Info Box */}
          <section className="py-12 px-4 bg-transparent border-t border-white/5">
            <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-black/50 border border-[#ebd297]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <h3 className="text-center text-2xl md:text-3xl text-[#ebd297] font-bold mb-8 uppercase tracking-wide">Direkt Anfragen</h3>

              <div className="grid md:grid-cols-3 gap-8 items-center justify-center text-center">
                {/* Phone */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-4 text-[#ebd297] opacity-80"><i className="fa-solid fa-phone"></i></div>
                  <a href="tel:015785585713" className="text-white text-lg font-bold hover:text-[#ebd297] transition-colors">0157 - 85585713</a>
                  <span className="text-sm text-stone-400 mt-1">Telefon</span>
                </div>

                {/* WhatsApp Button */}
                <div className="flex flex-col items-center">
                  <a
                    href="https://api.whatsapp.com/send/?phone=4915785585713&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ebd297] text-black w-14 h-14 rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg mb-4"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  <a href="https://api.whatsapp.com/send/?phone=4915785585713&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-bold hover:text-[#ebd297] transition-colors">WhatsApp</a>
                  <span className="text-sm text-stone-400 mt-1">Schnell & Einfach</span>
                </div>

                {/* Mail */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-4 text-[#ebd297] opacity-80"><i className="fa-solid fa-envelope"></i></div>
                  <a href="mailto:info@maximilianboy.de" className="text-white text-lg font-bold hover:text-[#ebd297] transition-colors">info@maximilianboy.de</a>
                  <span className="text-sm text-stone-400 mt-1">E-Mail</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Call to Action (Semi-Transparent Background) */}
          <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="relative container mx-auto px-4 text-center z-10">
              <div className="mx-auto w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl px-6 sm:p-10 md:p-16 rounded-3xl bg-black/50 border border-[#ebd297]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#ebd297] mb-6 break-words">Bereit für das Außergewöhnliche?</h2>
                <Link
                  to="/buchung-anfragen"
                  className="btn-lively inline-block mx-auto px-8 sm:px-10 py-4 text-black font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Jetzt Termin anfragen
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Home;