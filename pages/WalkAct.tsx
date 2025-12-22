import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage';

// Hero Background Slides (mit weichem Crossfade)
const SLIDES = [
  `${import.meta.env.BASE_URL}images/showformate.walkact.jpg`
];

const WalkAct: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll Reveal Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const items = document.querySelectorAll('.wa-reveal');
    items.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Background Slider (8-Sekunden-Wechsel mit Crossfade)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Infinite autoplay carousel with seamless loop (touch-enabled for mobile)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Clone all children for seamless infinite scroll
    if (track.getAttribute('data-cloned') !== 'true') {
      const originals = Array.from(track.children);
      // Clone twice for smoother infinite effect
      originals.forEach(child => {
        track.appendChild((child as HTMLElement).cloneNode(true));
      });
      originals.forEach(child => {
        track.appendChild((child as HTMLElement).cloneNode(true));
      });
      track.setAttribute('data-cloned', 'true');
    }

    let rafId = 0;
    let pausedByHover = false;
    let pausedByTouch = false;
    let scrollPos = 0;
    const speed = 0.65;
    let touchTimeout: NodeJS.Timeout | null = null;

    const step = () => {
      const isPaused = pausedByHover || pausedByTouch;

      if (!isPaused) {
        scrollPos += speed;
        const maxScroll = track.scrollWidth / 3; // Since we cloned twice

        if (scrollPos >= maxScroll) {
          scrollPos = 0;
        }
        track.scrollLeft = scrollPos;
      } else {
        scrollPos = track.scrollLeft;
      }
      rafId = requestAnimationFrame(step);
    };

    // Handle manual scrolling to loop infinitely
    const handleScroll = () => {
      const maxScroll = track.scrollWidth / 3;

      if (track.scrollLeft >= maxScroll * 2) {
        // Scrolled too far right, reset to beginning of second set
        track.scrollLeft = track.scrollLeft - maxScroll;
        scrollPos = track.scrollLeft;
      } else if (track.scrollLeft <= 0) {
        // Scrolled to beginning, jump to end of first set
        track.scrollLeft = maxScroll;
        scrollPos = track.scrollLeft;
      }
    };

    const handleMouseEnter = () => { pausedByHover = true; };
    const handleMouseLeave = () => { pausedByHover = false; };

    // Handle touch interaction (mobile only)
    const handleTouchStart = () => {
      pausedByTouch = true;
      if (touchTimeout) clearTimeout(touchTimeout);
    };

    const handleTouchEnd = () => {
      if (touchTimeout) clearTimeout(touchTimeout);
      // Resume autoplay after 2 seconds
      touchTimeout = setTimeout(() => {
        pausedByTouch = false;
        scrollPos = track.scrollLeft;
      }, 2000);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Start autoplay after a small delay to ensure content is loaded
    const startAutoplay = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, 100);

    return () => {
      cancelAnimationFrame(rafId);
      if (touchTimeout) clearTimeout(touchTimeout);
      clearTimeout(startAutoplay);
      track.removeEventListener('scroll', handleScroll);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      track.removeEventListener('touchstart', handleTouchStart);
      track.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handlePrev = () => {
    if (trackRef.current) trackRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (trackRef.current) trackRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#121212]">
      <style>{`
        /* === BACKGROUND LAYERS === */
        .wa-bg-layer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            background-color: #000;
            pointer-events: none;
        }

        /* Background Slides mit Crossfade */
        .wa-slide {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center -150px;
            background-repeat: no-repeat;
            transition: opacity 2000ms ease-in-out;
            filter: blur(5px) brightness(0.3);
            transform: scale(1.05);
        }

        /* === WRAPPER === */
        .walkact-landing-wrapper {
            font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
            color: #ebd297;
            line-height: 1.6;
            text-align: left;
            position: relative;
            width: 100%;
            overflow: visible;
            padding-bottom: 2rem;
            z-index: 1;
        }

        /* Hero Foreground Image */
        .walkact-landing-wrapper::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 140vh; 
            min-height: 1200px;
            z-index: -1;
            background-image: url("https://maximilianboy.de/mystaging02/wp-content/uploads/2023/08/20230805_181721-768x1024-1.jpg");
            background-size: 100% auto;
            background-position: top -100px center;
            background-repeat: no-repeat;
            -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            pointer-events: none; 
            filter: brightness(0.65); 
        }

        @media (min-width: 1024px) {
            .walkact-landing-wrapper::before {
                background-size: cover;
                background-position: center -100px; 
            }
        }

        /* === TYPOGRAPHY === */
        .walkact-landing-wrapper h1, 
        .walkact-landing-wrapper h2, 
        .walkact-landing-wrapper h3,
        .walkact-landing-wrapper h4 {
            font-family: system-ui, -apple-system, sans-serif !important;
            color: #EBD297 !important;
            line-height: 1.25 !important;
            margin-top: 0;
            font-weight: 700 !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
        }

        .walkact-landing-wrapper p, .walkact-landing-wrapper li {
            font-family: system-ui, -apple-system, sans-serif !important;
            color: #e5e5e5 !important;
            margin-bottom: 1rem !important;
        }

        /* === HERO SECTION === */
        .wa-hero-section {
            min-height: 85vh;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 6rem 1rem 4rem;
            position: relative;
            background: rgba(0, 0, 0, 0.2); 
        }

        .wa-hero-glow {
            pointer-events: none;
            position: absolute; inset: 0;
            background:
                radial-gradient(600px 300px at 60% 20%, rgba(235, 210, 151, .20), transparent 65%),
                radial-gradient(800px 400px at 30% 80%, rgba(235, 210, 151, .18), transparent 70%);
            mix-blend-mode: screen;
            animation: wa-ember 6s ease-in-out infinite alternate;
        }

        @keyframes wa-ember {
            from { filter: blur(22px); opacity: .6; transform: translateY(-6px); }
            to   { filter: blur(28px); opacity: .9; transform: translateY(6px); }
        }

        .wa-hero-content {
            position: relative;
            max-width: 900px;
            padding: 1rem;
            z-index: 2;
            margin-top: 5vh; 
        }

        .wa-hero-title {
            font-size: clamp(2.2rem, 6vw, 4rem) !important;
            text-align: center !important;
            text-transform: none !important; 
            margin-bottom: 1.5rem !important;
            letter-spacing: -0.02em;
            text-shadow: 0 4px 8px rgba(0,0,0,0.9) !important;
        }

        .wa-hero-sub {
            font-size: clamp(1.1rem, 2.5vw, 1.4rem) !important;
            color: #f7f7f7 !important;
            opacity: 0.95;
            margin: 0 auto 2.5rem !important;
            text-shadow: 0 2px 10px rgba(0,0,0,1) !important; 
            text-align: center !important;
            max-width: 700px;
        }

        /* BUTTON STYLING */
        .wa-cta-button {
          display: inline-block !important;
          padding: 16px 32px !important;
          background: linear-gradient(135deg, #EBD297 0%, #d4b56a 100%) !important;
          color: #000000 !important; 
          border-radius: 50px !important;
          font-weight: 700 !important;
          border: none !important;
          box-shadow: 0 4px 15px rgba(235, 210, 151, 0.3) !important;
          transition: all .3s ease !important;
          font-family: sans-serif !important;
          cursor: pointer;
          text-shadow: none !important; 
          font-size: 1.15rem !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-decoration: none !important;
        }

        .wa-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 25px rgba(235, 210, 151, 0.5) !important;
          background: linear-gradient(135deg, #fcebbb 0%, #EBD297 100%) !important;
        }

        /* === GENERAL SECTIONS === */
        .walkact-landing-wrapper section {
            padding: 4rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .walkact-landing-wrapper section h2 {
            text-align: center !important;
            margin-bottom: 3rem !important;
            font-size: clamp(1.8rem, 4vw, 2.5rem) !important;
            position: relative;
            display: block;
        }
        
        .walkact-landing-wrapper section h2::after {
            content: '';
            display: block;
            width: 60px;
            height: 3px;
            background: #EBD297;
            margin: 0.8rem auto 0;
            border-radius: 2px;
        }

        /* === HIGHLIGHTS LIST === */
        .wa-possibilities {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            list-style: none !important;
            padding: 0 !important;
            margin: 0 auto !important;
            max-width: 900px;
        }

        .wa-possibilities li {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(235, 210, 151, 0.3);
            padding: 16px 32px !important;
            border-radius: 50px !important;
            color: #ebd297 !important;
            font-weight: 600;
            backdrop-filter: blur(5px);
            margin: 0 !important;
            transition: background 0.3s;
            text-align: center;
            width: 100%;
            max-width: 650px;
        }
        
        .wa-possibilities li:hover {
            background: rgba(235, 210, 151, 0.15);
        }

        /* === VIDEO CSS === */
        .wa-video-grid {
            display: flex; 
            justify-content: center;
            max-width: 1200px;
            margin: 0 auto;
        }
        .wa-video-item {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            width: 100%;
            max-width: 360px; 
        }
        .wa-video-wrapper {
            position: relative;
            padding-bottom: 177.77%; /* 9:16 Aspect Ratio */
            height: 0;
            overflow: hidden;
            border-radius: 12px;
            border: 1px solid rgba(235, 210, 151, 0.2);
            background: #000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .wa-video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }

        /* === ECKDATEN === */
        .wa-eckdaten-box {
            background: rgba(25, 25, 24, 0.85);
            border: 1px solid rgba(235, 210, 151, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2.5rem 2rem !important;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }
        .wa-check-list {
            list-style: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        .wa-check-list li {
            position: relative;
            padding-left: 2.2rem !important;
            margin-bottom: 1.2rem !important;
            font-size: 1.05rem !important;
            color: #f0f0f0 !important;
        }
        .wa-check-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 0;
            color: #EBD297;
            font-weight: bold;
            font-size: 1.2em;
        }

        /* === CAROUSEL === */
        .wa-carousel-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            padding: 2rem 0;
        }

        .wa-carousel-track {
            display: flex;
            gap: 1rem;
            overflow-x: auto;
            padding-bottom: 1rem;
            width: 100%;
            scrollbar-width: none;
          cursor: grab;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x;
        }
        .wa-carousel-track::-webkit-scrollbar { display: none; }

        .wa-carousel-item {
          flex-shrink: 0; 
          background: #000;
          border: 1px solid rgba(235, 210, 151, 0.15);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          user-select: none;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .wa-carousel-item.portrait {}
        .wa-carousel-item.landscape {}
        .wa-carousel-item img {
          width: auto !important;
          height: auto !important;
          max-height: 400px; max-width: 100%;
          object-fit: contain !important;
          display: block;
          pointer-events: none;
          cursor: zoom-in;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) { .wa-carousel-item img { max-height: 350px; } }

        .wa-carousel-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: #EBD297;
            border: 1px solid #EBD297;
            border-radius: 50%;
            width: 40px; height: 40px;
            cursor: pointer;
            z-index: 10;
            display: flex; justify-content: center; align-items: center;
            font-size: 1.2rem;
            transition: all 0.3s;
        }
        .wa-carousel-btn:hover { background: #EBD297; color: #000; }
        .wa-prev { left: 10px; }
        .wa-next { right: 10px; }

        /* === FAQ === */
        .wa-faq-container { max-width: 800px; margin: 0 auto; }

        .wa-faq details {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid rgba(235, 210, 151, 0.1);
          padding: 0;
          transition: background 0.3s;
        }
        .wa-faq details[open] {
            background: rgba(235, 210, 151, 0.08);
            border-color: rgba(235, 210, 151, 0.3);
        }

        .wa-faq summary {
            padding: 1.2rem;
            cursor: pointer;
            font-weight: 700;
            color: #EBD297;
            list-style: none;
            position: relative;
            padding-right: 40px;
        }
        .wa-faq summary::-webkit-details-marker { display: none; }
        .wa-faq summary::after {
            content: '+';
            position: absolute; right: 1.2rem; top: 1.2rem;
            font-weight: bold;
            font-size: 1.4rem;
            line-height: 1;
        }
        .wa-faq details[open] summary::after { content: '−'; }
        
        .wa-faq p {
          padding: 0 1.2rem 1.2rem 1.2rem;
          margin: 0;
          line-height: 1.6;
          color: #e0e0e0;
        }

        /* === CTA BOTTOM === */
        .wa-cta-bottom {
            text-align: center !important;
            padding: 6rem 1rem !important;
            background: linear-gradient(to bottom, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.95));
            border-top: 1px solid rgba(235, 210, 151, 0.15);
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
        }

        /* === REVEAL ANIMATION === */
        .wa-reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
        .wa-reveal.show { opacity: 1; transform: translateY(0); }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
            .wa-slide { transition-duration: 0ms !important; }
        }
      `}</style>

      {/* Background Layer */}
      <div className="wa-bg-layer">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`wa-slide ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${slide}')` }}
          />
        ))}
      </div>

      <div className="walkact-landing-wrapper">

        {/* =================== HERO =================== */}
        <header className="wa-hero-section">
          <div className="wa-hero-glow"></div>
          <div className="wa-hero-content">
            <h1 className="wa-hero-title">Fantasievolle Walkacts – Interaktive Performance</h1>
            <p className="wa-hero-sub">Lebendige Charaktere, interaktives Entertainment und unvergessliche Momente.<br />Ideal für Events, Messen & Empfänge, die begeistern.</p>
            <Link className="wa-cta-button" to="/booking-request">Jetzt anfragen</Link>
          </div>
        </header>

        {/* =================== HIGHLIGHTS =================== */}
        <section className="wa-reveal">
          <h2>Performance-Highlights</h2>
          <ul className="wa-possibilities">
            <li>Interaktives Spiel mit dem Publikum – charmant & professionell.</li>
            <li>Flexibel einsetzbar: Ob auf Stelzen, mobil oder stationär.</li>
            <li>Perfekt für Messen, Firmenevents, Festivals & private Feiern.</li>
          </ul>
        </section>

        {/* =================== VIDEO =================== */}
        <section className="wa-reveal">
          <div className="wa-video-grid">
            <div className="wa-video-item">
              <div className="wa-video-wrapper">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/H37JeSz9618"
                  title="Walkact Highlight"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        </section>

        {/* =================== ECKDATEN =================== */}
        <section className="wa-reveal">
          <h2>Eckdaten zu den Walkacts</h2>
          <div className="wa-eckdaten-box">
            <ul className="wa-check-list">
              <li>Humorvolle Animation der Gäste</li>
              <li>Dauer ca. 30-45 Minuten pro Block</li>
              <li>Stelzenlauf (auf Wunsch mit Jonglage oder Modellierballons)</li>
              <li>Jonglage Walkact (mit Leuchtjonglage bei Nacht)</li>
            </ul>
          </div>
        </section>

        {/* =================== IMPRESSIONEN (CAROUSEL) =================== */}
        <section className="wa-reveal">
          <h2>Impressionen</h2>

          <div className="wa-carousel-wrapper">
            <button className="wa-carousel-btn wa-prev" onClick={handlePrev} aria-label="Zurück">❮</button>
            <div className="wa-carousel-track" ref={trackRef}>
              {[
                { src: `${import.meta.env.BASE_URL}images/walk.1.jpeg`, format: 'portrait' },
                { src: `${import.meta.env.BASE_URL}images/walk.2.jpeg`, format: 'landscape' },
                { src: `${import.meta.env.BASE_URL}images/walk.3.jpg`, format: 'portrait' },
                { src: `${import.meta.env.BASE_URL}images/walk.4.jpg`, format: 'portrait' },
                { src: `${import.meta.env.BASE_URL}images/walk.5.jpg`, format: 'landscape' },
                { src: `${import.meta.env.BASE_URL}images/walk.6.jpg`, format: 'portrait' },
                { src: `${import.meta.env.BASE_URL}images/walk.7.jpg`, format: 'portrait' },
                { src: `${import.meta.env.BASE_URL}images/showformate.walkact.jpg`, format: 'landscape' }
              ].map((item, i) => (
                <div className={`wa-carousel-item ${item.format}`} key={i}>
                  <SmartImage src={item.src} alt={`Walkact Impression ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
            <button className="wa-carousel-btn wa-next" onClick={handleNext} aria-label="Weiter">❯</button>
          </div>
        </section>

        {/* =================== FAQ =================== */}
        <section className="wa-reveal wa-faq">
          <h2>Häufige Fragen</h2>
          <div className="wa-faq-container">
            <details>
              <summary>Ist eine Walkact überall möglich?</summary>
              <p>Ja! Walkacts sind sehr flexibel einsetzbar, da man keine Bühne oder Technik braucht. Ob innen oder außen, alles ist möglich. Nur für einen Stelzenwalkact sollte die Deckenhöhe mindestens 2,7 Meter betragen.</p>
            </details>

            <details>
              <summary>Wie viel Platz wird benötigt?</summary>
              <p>Überall dort wo Personen stehen und laufen können reicht auch für einen Walkact der Platz.</p>
            </details>

            <details>
              <summary>Wie lange dauert ein Walkact?</summary>
              <p>Ein Einsatz geht immer ca. 30-45 Minuten. Im Schnitt werden 1-2 Blöcke pro Auftritt gebucht. Es sind aber auch darüber hinaus weitere Einsätze möglich. Zwischen den Blöcken sollten immer mindestens 30 Minuten Pause sein.</p>
            </details>

            <details>
              <summary>Was wird vor Ort an Technik benötigt?</summary>
              <p>An Technik wird nichts benötigt. Jedoch ist es vom Vorteil, wenn ein Umkleideraum in der Nähe ist.</p>
            </details>
          </div>
        </section>

        {/* =================== CTA BOTTOM =================== */}
        <section className="wa-reveal wa-cta-bottom">
          <h2>Bereit für Entertainment?</h2>
          <p>Teilen Sie uns Ihr Datum und die Art des Events mit – wir schicken Ihnen passende Kostümvorschläge.</p>
          <br />
          <Link className="wa-cta-button" to="/booking-request">Walk Act anfragen</Link>
        </section>

      </div>
    </div>
  );
};

export default WalkAct;