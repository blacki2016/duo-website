import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Megaphone } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

// Hero Background: Einzelnes Bild (keine Rotation)
const SLIDES = [
  `${import.meta.env.BASE_URL}images/slider4.jpeg.jpg`,
  `${import.meta.env.BASE_URL}images/limaex.slider7.jpg`
];

// USP Data - DUO
const USPS = [
  {
    icon: <ShieldCheck className="w-full h-full text-[#ebd297]" />,
    title: "Pyro-Sicherheit & TÜV",
    desc: "Zwei Artists, ein Sicherheitskonzept: geprüfte Pyro, klare Abläufe und Abstimmungen mit Location und Feuerwehr."
  },
  {
    icon: <Megaphone className="w-full h-full text-[#ebd297]" />,
    title: "Rundum betreut",
    desc: "Musik, Moderation, Licht und Technik kommen mit – wir planen den Ablauf mit euch und eurem DJ oder Eventteam."
  },
  {
    icon: <HeartHandshake className="w-full h-full text-[#ebd297]" />,
    title: "Duo-Energie",
    desc: "Synchrones Feuer, Partnerakrobatik und direkte Publikumsnähe. Doppelter Wow-Faktor für Hochzeit, Gala oder Stadtfest."
  }
];

// Testimonials Data - DUO
// (TESTIMONIALS array removed because it is unused)

// Show Previews - DUO
const SHOW_PREVIEWS = [
  {
    title: "Duo Feuershow",
    img: `${import.meta.env.BASE_URL}images/fire.jpg`,
    imgPos: "object-cover object-center",
    features: [
      "Synchrones Feuer & Pyro-Finale",
      "Zweifaches Feuerspucken",
      "Choreos zu eurer Wunschmusik",
      "Outdoor & indoor adaptierbar"
    ],
    link: "/shows",
    ctaText: "Show ansehen",
    ctaEmoji: "🔥"
  },
  {
    title: "Partnerakrobatik & LED",
    img: `${import.meta.env.BASE_URL}images/artistik.jpg`,
    imgPos: "object-cover object-center",
    features: [
      "Partnerlifting & Equilibristik",
      "LED-Poi mit Logo/Schriftzug",
      "Elegante Duochoreo",
      "Ideal für Galas & Bühnen"
    ],
    link: "/shows",
    ctaText: "Mehr erleben",
    ctaEmoji: "🤸"
  },
  {
    title: "Hochzeiten & Private Events",
    img: `${import.meta.env.BASE_URL}images/show.jpg`,
    imgPos: "object-cover object-center",
    features: [
      "Individuelle First-Dance-Inszenierung",
      "Romantische Feuerbilder & Herzen",
      "Persönliche Moderation",
      "Flexible Spielflächen"
    ],
    link: "/buchung-anfragen",
    ctaText: "Termin anfragen",
    ctaEmoji: "💍"
  },
  {
    title: "Corporate & Public Events",
    img: `${import.meta.env.BASE_URL}images/events.jpg`,
    imgPos: "object-cover object-center",
    features: [
      "Branding-Elemente in der Show",
      "Festival- & Stadtfest-Bühnen",
      "Moderation zweisprachig auf Wunsch",
      "Abgestimmte Sicherheitskonzepte"
    ],
    link: "/shows",
    ctaText: "Formate sehen",
    ctaEmoji: "🎪"
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
        if (scrollPos >= track.scrollWidth / 2) {
          scrollPos = 0;
          track.scrollLeft = 0;
        } else {
          track.scrollLeft = scrollPos;
        }
      } else if (track) {
        scrollPos = track.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      startScrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
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
      setTimeout(() => { isPaused = false; }, 500);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = startScrollLeft - walk;
      scrollPos = track.scrollLeft;
    };

    const handleTouchStart = () => {
      isPaused = true;
      isDown = true;
    };

    const handleTouchEnd = () => {
      isDown = false;
      setTimeout(() => { isPaused = false; }, 1500);
    };

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

  // Hero Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-stone-200 overflow-hidden">

      <style>{`
        /* Lively Gold Button Style */
        /* Gold Button Unified Style */
        .btn-lively {
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
        }
        .btn-lively:hover {
            background-position: right center;
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0,0,0,0.4);
        }

        /* Card Hover Effect */
        .show-card:hover .show-card-img {
            transform: scale(1.03);
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
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Timeline Styles */
        .timeline {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
          align-items: start;
        }
        .timeline-item {
          position: relative;
          text-align: center;
          padding-top: 1.25rem;
        }
        .timeline-dot {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #ebd297;
          box-shadow: 0 0 12px rgba(235,210,151,0.6);
        }
        .timeline-line {
          position: absolute;
          top: 7px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ebd297, transparent);
          z-index: -1;
        }
        .timeline-title { color: #ffffff; font-weight: 700; }
        .timeline-sub { color: #b0b0b0; font-size: 0.9rem; }
        @media (max-width: 900px) {
          .timeline { grid-template-columns: 1fr; }
          .timeline-item { text-align: left; padding-left: 2.25rem; }
          .timeline-dot { left: 0; transform: none; }
          .timeline-line { display: none; }
        }
      `}</style>

      {/* Global Background */}
      <div className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover transition-opacity duration-[2000ms] ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${slide}')`,
              backgroundPosition: 'center 85%'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Hero Header */}
      <header className="relative w-full h-screen overflow-hidden flex items-center justify-center mt-[50px] z-10">
        <div className="relative text-center px-4 max-w-6xl mx-auto -mt-32">
          <h1 className="text-6xl md:text-10xl lg:text-10xl font-serif font-extrabold mb-12 leading-tight drop-shadow-2xl uppercase">
            <span className="text-[#ebd297]">DUO</span> <br />
            <span className="bg-gradient-to-r from-[#8E6F34] via-[#F9EFAF] to-[#8E6F34] text-transparent bg-clip-text drop-shadow-lg">Limäx</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            "UKONGU" – Die Show der Superlative. Großillusionen, Comedy und Artistik in einer explosiven Mischung.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/buchung-anfragen" className="btn-lively px-10 py-4 text-base md:text-lg tracking-widest rounded-full flex items-center justify-center gap-3">
              Buchung anfragen <span className="text-xl">🗒️</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content Wrapper */}
      <div className="relative w-full">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://maximilianboy.de/mystaging02/wp-content/uploads/2025/09/cropped-Z62_3654-46.jpg')] bg-fixed bg-cover bg-center opacity-60"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10">

          {/* Profile */}
          <section className="py-24 bg-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                <div className="w-full aspect-square border-2 border-[#ebd29780] rounded-2xl overflow-hidden shadow-2xl relative group bg-black/40 backdrop-blur-md">
                  <img src="/images/e85ca38e-53d8-4fcf-ae75-5ccb9b72aad6-2.jpg" alt="Duo Limäx" className="w-full h-full object-cover object-[center_20%] transition-transform duration-[800ms] group-hover:scale-105" />
                </div>
                <div className="w-full aspect-square flex flex-col justify-center items-center p-8 md:p-10 relative text-center bg-black/60 backdrop-blur-lg border-2 border-[#ebd29780] rounded-2xl shadow-2xl">
                  <h2 className="font-serif text-2xl md:text-3xl text-gold-400 mb-6 leading-snug drop-shadow-md">
                    Zwei Künstler. <br /> Ein gemeinsamer <span className="text-gold-100 font-bold">Feuertraum</span>.
                  </h2>
                  <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-4">
                    Das ist <strong className="text-white">Duo Limäx</strong>. Zwei Artists verbinden Feuer, Partnerakrobatik und Musik zu einer Show, die Publikum und Veranstalter gleichermaßen fesselt.
                  </p>
                  <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                    Doppelter Ausdruck, perfektes Timing und sichere Inszenierungen – von Hochzeiten bis Festivalbühne.
                  </p>
                  <div className="mt-8">
                    <Link to="/allgemein/ueber-uns/" className="text-[#ebd297] border-b border-[#ebd297] hover:text-white hover:border-white transition-colors uppercase text-sm tracking-widest pb-1">Mehr über uns</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Showformate */}
          <section className="py-24 bg-transparent border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#ebd297] mb-4">Showformate</h2>
                <p className="text-white max-w-xl mx-auto uppercase tracking-widest text-sm">Für jeden Anlass das passende Highlight</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
                {SHOW_PREVIEWS.map((show, i) => (
                  <div key={i} className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-[#ebd29780] hover:border-gold-300 transition-all hover:-translate-y-2 show-card group shadow-lg flex flex-col w-full">
                    <div className="h-[450px] overflow-hidden relative">
                      <img src={show.img} alt={show.title} className={`w-full h-full object-cover show-card-img transition-transform duration-700 ${show.imgPos}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent"></div>
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

          {/* USP & Timeline */}
          <section className="py-20 bg-transparent border-t border-white/5">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-3xl font-serif font-bold text-white mb-16">
                Warum <span className="text-[#ebd297]">Duo Limäx</span> buchen?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {USPS.map((usp, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-[#ebd297]/10 hover:border-[#ebd297]/40 transition-colors shadow-lg group">
                    <div className="mb-6 h-32 w-full flex items-center justify-center shrink-0">
                      <div className="h-28 w-28 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(235,210,151,0.2)]">{usp.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-[#ebd297] mb-3">{usp.title}</h3>
                    <p className="text-stone-400 leading-relaxed">{usp.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 max-w-6xl mx-auto">
                <h3 className="text-center text-2xl font-serif font-bold text-[#ebd297] mb-6">So läuft Ihre Buchung ab</h3>
                <div className="relative">
                  <div className="timeline-line"></div>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-title">Buchungsanfrage</div>
                      <div className="timeline-sub">Formular ausfüllen – Infos zu Location, Anlass und Wunschstimmung.</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-title">Abstimmung</div>
                      <div className="timeline-sub">Musik, Pyro-Aufbau, Moderation – wir planen gemeinsam mit euch und der Location.</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-title">Feinschliff</div>
                      <div className="timeline-sub">Briefing, Sicherheitscheck und individuelle Showelemente wie Logos oder Feuerherz.</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-title">Showtime</div>
                      <div className="timeline-sub">Diskreter Aufbau, Doppel-Performance mit Finale und optionalem Meet & Greet.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="py-12 px-4 bg-transparent border-t border-white/5">
            <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-black/50 border border-[#ebd297]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <h3 className="text-center text-2xl md:text-3xl text-[#ebd297] font-bold mb-8 uppercase tracking-wide">Direkt beim Duo anfragen</h3>
              <div className="grid md:grid-cols-3 gap-8 items-center justify-center text-center">
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-4 text-[#ebd297] opacity-80"><i className="fa-solid fa-phone"></i></div>
                  <a href="tel:015785585713" className="text-white text-lg font-bold hover:text-[#ebd297] transition-colors">0157 - 85585713</a>
                  <span className="text-sm text-stone-400 mt-1">Telefon</span>
                </div>
                <div className="flex flex-col items-center">
                  <a href="https://api.whatsapp.com/send/?phone=4915785585713&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#ebd297] text-black w-14 h-14 rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg mb-4">
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  <a href="https://api.whatsapp.com/send/?phone=4915785585713&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-bold hover:text-[#ebd297] transition-colors">WhatsApp</a>
                  <span className="text-sm text-stone-400 mt-1">Schnell & Einfach</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-4 text-[#ebd297] opacity-80"><i className="fa-solid fa-envelope"></i></div>
                  <a href="mailto:info@maximilianboy.de" className="text-white text-lg font-bold hover:text-[#ebd297] transition-colors">info@maximilianboy.de</a>
                  <span className="text-sm text-stone-400 mt-1">E-Mail</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="relative container mx-auto px-4 text-center z-10">
              <div className="mx-auto w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl px-6 sm:p-10 md:p-16 rounded-3xl bg-black/50 border border-[#ebd297]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#ebd297] mb-6 break-words">Bereit für das Außergewöhnliche?</h2>
                <Link to="/buchung-anfragen" className="btn-lively inline-block mx-auto px-8 sm:px-10 py-4 text-black font-bold rounded-full hover:scale-105 transition-transform">
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
