import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import SmartImage from '../components/SmartImage';

// Hero Background Slides (mit weichem Crossfade)
const SLIDES = [
    '/images/showformate.limaex.jpg'
];

const HIGHLIGHTS = [
    {
        title: 'Magieeee',
        text: 'Großillusionen mit Wow-Effekt – Menschen erscheinen, verschwinden, schweben.',
        image: '/images/limaex.magie.jpg'
    },
    {
        title: 'Jonglage',
        text: 'Rasante Manipulation und Timing, perfekt choreografiert zu Musik und Licht.',
        image: '/images/limaex.jonglage.jpg'
    },
    {
        title: 'Akrobatik',
        text: 'Partner-Akrobatik mit Kraft, Balance und Vertrauen – ästhetisch und dynamisch.',
        image: '/images/heroslider4.jpg',
        backgroundPosition: 'center 15%'
    },
    {
        title: 'Comedy',
        text: 'Charmante Situationskomik und Publikumsnähe – humorvoll, ohne die Magie zu brechen.',
        image: '/images/limaex.comedy.jpg'
    },
    {
        title: 'Illusionen',
        text: 'Signature-Illusionen aus eigener Werkstatt – überraschend, modern, visuell stark.',
        image: '/images/limaex.illusionen.jpg',
        backgroundPosition: 'center 25%'
    },
    {
        title: 'Musik',
        text: 'Live gespielte Akzente und Sounddesign, die jede Szene tragen und verdichten.',
        image: '/images/showformate.limaex.jpg'
    }
];

const DuoLimax: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    // Scroll Reveal Logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, { threshold: 0.1 });

        const items = document.querySelectorAll('.limax-reveal');
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

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);
        track.addEventListener('touchstart', handleTouchStart, { passive: true });
        track.addEventListener('touchend', handleTouchEnd, { passive: true });

        rafId = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(rafId);
            if (touchTimeout) clearTimeout(touchTimeout);
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

    const handleImageClick = (src: string) => {
        setLightboxSrc(src);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] font-sans">
            <style>{`
        /* BACKGROUND & HERO STYLING */
        .limax-hero-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 0;
            background-color: #000;
            pointer-events: none;
        }

        /* Background Slides mit Crossfade */
        .limax-slide {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
            transition: opacity 2000ms ease-in-out;
            filter: brightness(0.4);
            transform: scale(1.05);
        }

        .limax-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          overflow: visible;
          padding-bottom: 2rem;
        }

        /* TYPOGRAPHY OVERRIDES */
        .limax-title {
            font-family: 'Cinzel', serif;
            color: #EBD297;
            text-transform: uppercase;
        }
        .limax-text {
            font-family: 'Montserrat', sans-serif;
            color: #e5e5e5;
            line-height: 1.7;
        }
        
        .limax-accent { color: #EBD297; }

        /* HERO SECTION */
        .limax-hero {
            min-height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 8rem 1rem 4rem;
            position: relative;
        }

        /* SECTION HEADERS (match FireShow) */
        .limax-section h2 {
            text-align: center;
            margin-bottom: 3rem;
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            position: relative;
            color: #EBD297;
            font-weight: 700;
        }
        .limax-section h2::after {
            content: '';
            display: block;
            width: 60px; height: 3px;
            background: #EBD297; margin: 0.8rem auto 0; border-radius: 2px;
        }

        /* GLOW EFFECT BEHIND HERO TEXT */
        .hero-glow-spot {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 60vw; height: 60vh;
            background: radial-gradient(circle, rgba(235, 210, 151, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: -1;
        }

        .limax-hero h1 {
            font-size: clamp(3rem, 7vw, 5.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 4px 15px rgba(0,0,0,0.8);
            letter-spacing: 2px;
        }

        .limax-hero p {
            font-size: clamp(1.1rem, 2vw, 1.5rem);
            max-width: 800px;
            margin: 0 auto 3rem;
            font-weight: 300;
            text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }

        /* SECTIONS */
        .limax-section {
            padding: 6rem 1rem;
            max-width: 1300px;
            margin: 0 auto;
        }

        .limax-section h2 {
            font-family: 'Cinzel', serif;
            font-size: clamp(2rem, 4vw, 3rem);
            color: #EBD297;
            text-align: center;
            margin-bottom: 3rem;
            position: relative;
            display: block;
        }
        
        .limax-section h2::after {
            content: '';
            display: block;
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, transparent, #EBD297, transparent);
            margin: 1rem auto 0;
        }

        /* INTRO GRID */
        .intro-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
        }
        @media(min-width: 900px) {
            .intro-grid { grid-template-columns: 1.2fr 0.8fr; }
        }

        .intro-text h3 {
            font-family: 'Cinzel', serif;
            font-size: 1.8rem;
            color: #fff;
            margin-bottom: 1.5rem;
            border-left: 3px solid #EBD297;
            padding-left: 1rem;
        }

        .poster-frame {
            position: relative;
            border-radius: 8px;
            padding: 10px;
            background: rgba(235, 210, 151, 0.1);
            border: 1px solid rgba(235, 210, 151, 0.2);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .poster-frame img {
            display: block;
            width: 100%;
            border-radius: 4px;
        }

        /* CARDS GRID */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }
        @media (max-width: 900px) {
            .cards-grid { grid-template-columns: 1fr; }
        }

        .limax-card {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            padding: 2rem;
            height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border: 1px solid rgba(235, 210, 151, 0.2);
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
            cursor: pointer;
        }

        .limax-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 80%);
            transition: background 0.4s ease;
        }

        .limax-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 18px 50px rgba(0,0,0,0.45);
            border-color: rgba(235, 210, 151, 0.45);
        }

        .limax-card:hover::after {
            background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 85%);
        }

        .limax-card h3 {
            position: relative;
            z-index: 1;
            font-family: 'Cinzel', serif;
            font-size: 1.5rem;
            color: #EBD297;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .limax-card p {
            position: relative;
            z-index: 1;
            color: #e9e9e9;
            line-height: 1.6;
            font-family: 'Montserrat', sans-serif;
            margin: 0;
        }

        /* Facts box (match FireShow eckdaten) */
        .limax-facts-box {
            background: rgba(25, 25, 24, 0.85);
            border: 1px solid rgba(235, 210, 151, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2.5rem 2rem;
            max-width: 1000px;
            margin: 0 auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }
        .limax-check-list { list-style: none; padding: 0; }
        .limax-check-list li {
            position: relative; padding-left: 2.2rem; margin-bottom: 1rem;
            font-size: 1.05rem; color: #f0f0f0;
        }
        .limax-check-list li::before {
            content: '✓'; position: absolute; left: 0; top: 0;
            color: #EBD297; font-weight: bold; font-size: 1.2em;
        }

        /* FAQ styles (match FireShow aesthetics) */
        .limax-faq details {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid rgba(235, 210, 151, 0.1);
            transition: background 0.3s;
        }
        .limax-faq details[open] {
            background: rgba(235, 210, 151, 0.08);
            border-color: rgba(235, 210, 151, 0.3);
        }
        .limax-faq summary {
            padding: 1.2rem;
            cursor: pointer;
            font-weight: 700;
            color: #EBD297;
            list-style: none;
            position: relative;
            padding-right: 40px;
        }
        .limax-faq summary::-webkit-details-marker { display: none; }
        .limax-faq summary::after {
            content: '+';
            position: absolute; right: 1.2rem; top: 1.2rem;
            font-weight: bold; font-size: 1.4rem; line-height: 1;
        }
        .limax-faq details[open] summary::after { content: '−'; }
        .limax-faq p { padding: 0 1.2rem 1.2rem; margin: 0; line-height: 1.6; color: #e0e0e0; }

        /* VIDEO */
        .video-container {
            position: relative;
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            border: 1px solid rgba(235, 210, 151, 0.2);
            background: #000;
        }
        .video-ratio {
            padding-bottom: 56.25%;
            position: relative;
            height: 0;
        }
        .video-ratio iframe {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
        }

        /* CAROUSEL */
        .carousel-track {
            display: flex;
            gap: 1.5rem;
            padding: 1rem 0 3rem;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x;
        }
        .carousel-track::-webkit-scrollbar { display: none; }
        
        .carousel-item {
            flex-shrink: 0;
            display: inline-flex; align-items: center; justify-content: center;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(255,255,255,0.1);
            transition: transform 0.3s;
            cursor: pointer;
            background: #000;
        }
        .carousel-item:hover { transform: scale(1.03); border-color: #EBD297; }
        .carousel-item img { width: auto; height: auto; max-height: 400px; max-width: 100%; object-fit: contain; }
        @media(max-width: 600px) { .carousel-item img { max-height: 350px; } }

        .carousel-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.6);
            border: 1px solid #EBD297;
            color: #EBD297;
            width: 50px; height: 50px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s;
        }
        .carousel-nav-btn:hover { background: #EBD297; color: #000; }
        .nav-prev { left: 20px; }
        .nav-next { right: 20px; }

        /* BUTTONS */
        .limax-btn {
            display: inline-flex; align-items: center; gap: 0.8rem;
            background: transparent;
            color: #EBD297;
            border: 1px solid #EBD297;
            padding: 14px 30px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s;
            text-decoration: none;
            cursor: pointer;
            margin-top: 2rem;
        }
        .limax-btn:hover {
            background: #EBD297;
            color: #000;
            box-shadow: 0 0 20px rgba(235, 210, 151, 0.4);
        }
        .limax-btn.primary {
            background: #EBD297;
            color: #000;
        }
        .limax-btn.primary:hover {
            background: #fff;
            border-color: #fff;
        }

        /* REVEAL ANIMATION */
        .limax-reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
        .limax-reveal.show { opacity: 1; transform: translateY(0); }
        
        /* LIGHTBOX */
        .limax-lightbox {
            position: fixed; z-index: 99999; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95); display: flex; justify-content: center; align-items: center;
            cursor: zoom-out; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .limax-lightbox.active { opacity: 1; pointer-events: auto; }
        .limax-lightbox img {
            max-width: 95%; max-height: 95%; border: 1px solid #EBD297;
            box-shadow: 0 0 40px rgba(0,0,0,0.8);
            transform: scale(0.95); transition: transform 0.3s ease;
        }
        .limax-lightbox.active img { transform: scale(1); }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
            .limax-slide { transition-duration: 0ms !important; }
        }
        `}</style>

            {/* FIXED BACKGROUND */}
            <div className="limax-hero-bg">
                {SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`limax-slide ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${slide}')` }}
                    />
                ))}
            </div>

            <div className="limax-wrapper">

                {/* HERO */}
                <header className="limax-hero">
                    <div className="hero-glow-spot"></div>
                    <div className="limax-reveal">
                        <p className="text-[#EBD297] uppercase tracking-[4px] text-sm mb-4 font-bold">Maximilian Boy & Leo Wieseckel</p>
                        <h1 className="limax-title">Duo <span className="limax-accent">Limäx</span></h1>
                        <p className="limax-text">
                            "UKONGU" – Die Show der Superlative.<br />
                            Großillusionen, Comedy und Artistik in einer explosiven Mischung.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <a href="http://www.limäx.de/" target="_blank" rel="noopener noreferrer" className="limax-btn primary">
                                Offizielle Website
                            </a>
                            <a href="https://youtu.be/fLi4wht1iwI" target="_blank" rel="noopener noreferrer" className="limax-btn">
                                <Play size={18} fill="currentColor" /> Trailer ansehen
                            </a>
                        </div>
                    </div>
                </header>

                {/* INTRO */}
                <section className="limax-section limax-reveal">
                    <div className="intro-grid">
                        <div className="intro-text">
                            <h2 style={{ textAlign: 'left', margin: 0, marginBottom: '2rem' }}>Das spektakel</h2>
                            <h3>Mehr als nur Zauberei</h3>
                            <p className="limax-text mb-6">
                                Erleben Sie eine Las-Vegas-reife Showproduktion! Das Duo Limäx verbindet klassische Magie mit moderner Technik, charmanter Comedy und energiegeladener Artistik.
                            </p>
                            <p className="limax-text mb-8">
                                Ob Gala, Varieté oder Stadtfest – "UKONGU" ist flexibel skalierbar. Von 15 Minuten Highlight-Show bis zum 90-minütigen abendfüllenden Programm. Wir bringen unser komplettes Equipment mit und sorgen für unvergessliche Momente.
                            </p>

                            <div className="flex gap-4 flex-wrap">
                                <a href="https://www.limaex.de" target="_blank" rel="noopener noreferrer" className="limax-btn primary" style={{ fontSize: '0.9rem', padding: '12px 24px' }}>
                                    Buchung anfragen
                                </a>
                            </div>
                        </div>
                        <div className="poster-frame">
                            <img src="/images/ukongu.plakat.jpg" alt="UKONGU Poster" />
                        </div>
                    </div>
                </section>

                {/* SHOW HIGHLIGHTS */}
                <section className="limax-section limax-reveal">
                    <h2>Show-Highlights</h2>
                    <div className="cards-grid">
                        {HIGHLIGHTS.map((item, idx) => (
                            <div
                                key={idx}
                                className="limax-card"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    backgroundPosition: item.backgroundPosition || 'center'
                                }}
                                onClick={() => handleImageClick(item.image)}
                            >
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TRAILER */}
                <section id="trailer" className="limax-section limax-reveal">
                    <h2>Show Trailer</h2>
                    <div className="video-container">
                        <div className="video-ratio">
                            <iframe
                                src="https://www.youtube.com/embed/fLi4wht1iwI"
                                title="Duo Limäx UKONGU Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </section>

                {/* KEY FACTS */}
                <section className="limax-section limax-reveal">
                    <h2>Eckdaten zur Show</h2>
                    <div className="limax-facts-box">
                        <ul className="limax-check-list">
                            <li>Sehr humorvolles Familienprogramm</li>
                            <li>Dauer 20–90 Minuten</li>
                            <li>Anspruchsvolle Jonglage</li>
                            <li>Zauberkunst in Höchstform</li>
                            <li>Handstandakrobatik</li>
                            <li>Großillusionen</li>
                            <li>Rola Rola Performance</li>
                            <li>Mit Musik und Moderation</li>
                        </ul>
                    </div>
                </section>

                {/* GALERIE */}
                <section className="limax-section limax-reveal">
                    <h2>Impressionen</h2>
                    <div style={{ position: 'relative' }}>
                        <div className="carousel-nav-btn nav-prev" onClick={handlePrev}>❮</div>
                        <div className="carousel-track" ref={trackRef}>
                            {[
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2025/01/10_IMG-20241124-WA0095-900x1024.jpg?strip=info&w=1027&ssl=1",
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2025/01/20241123-limaex-ukongu-085-1024x682.jpg?strip=info&w=2000&ssl=1",
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2025/01/05_IMG-20241124-WA0036-761x1024.jpg?strip=info&w=1904&ssl=1",
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2025/01/20241123-limaex-ukongu-014-682x1024.jpg?strip=info&w=1333&ssl=1",
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2025/01/20241123-limaex-ukongu-129-1024x682.jpg?strip=info&w=2000&ssl=1",
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2025/01/20241123-limaex-ukongu-009-682x1024.jpg?strip=info&w=1333&ssl=1",
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2024/10/cropped-IMG_1134-3.jpg?strip=info&w=512&ssl=1",
                                "https://i0.wp.com/limaex.de/wp-content/uploads/2025/01/02_IMG-20241124-WA0007-689x1024.jpg?strip=info&w=1723&ssl=1"
                            ].map((src, idx) => (
                                <div key={idx} className="carousel-item" onClick={() => handleImageClick(src)}>
                                    <SmartImage src={src} alt={`Galerie ${idx}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                        <div className="carousel-nav-btn nav-next" onClick={handleNext}>❯</div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="limax-section limax-reveal">
                    <h2>Häufige Fragen</h2>
                    <div className="limax-faq">
                        <details>
                            <summary>Ist eine Duo Limäx Show überall möglich?</summary>
                            <p>
                                Ja! Grundsätzlich kann diese Show überall vorgeführt werden. Für manche Nummern ist jedoch eine Deckenhöhe
                                von mindestens 4,5&nbsp;m erforderlich. Außerdem muss die Bühne sowie der Lagerplatz hinter der Bühne groß genug sein.
                                Allerdings ist diese Show sehr variabel, sodass sich eigentlich für fast jede Bühne ein passendes Programm
                                zusammenstellen lässt.
                            </p>
                        </details>
                        <details>
                            <summary>Wie viel Platz wird benötigt?</summary>
                            <p>
                                Im Idealfall sollte die Fläche mindestens ca. 5&nbsp;m breit und 4&nbsp;m tief sein. Eine kleinere Fläche ist aber
                                nach Absprache auch möglich.
                            </p>
                        </details>
                        <details>
                            <summary>Wie lange dauert die Show?</summary>
                            <p>Es sind Showzeiten von 20–90 Minuten möglich.</p>
                        </details>
                        <details>
                            <summary>Was wird vor Ort an Technik benötigt?</summary>
                            <p>
                                Grundsätzlich kann alles, was an Technik benötigt wird, bis zu einer Publikumsgröße von ca. 200 Personen
                                mitgebracht werden. Jedoch ist es von Vorteil, wenn so viel wie möglich schon vor Ort ist.
                                Dadurch sparen wir uns Arbeit – und euch Kosten.
                            </p>
                        </details>
                    </div>
                </section>



                {/* BOTTOM CTA */}
                <section className="limax-section limax-reveal text-center pt-12 border-t border-white/10">
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Bereit für das Außergewöhnliche?</h2>
                    <p className="limax-text mb-8">Besuchen Sie unsere gemeinsame Website für alle Details.</p>
                    <a href="http://www.limäx.de/" target="_blank" rel="noopener noreferrer" className="limax-btn primary">
                        Zur Duo Limäx Website <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </section>

            </div>

            {/* LIGHTBOX */}
            <div className={`limax-lightbox ${lightboxSrc ? 'active' : ''}`} onClick={() => setLightboxSrc(null)}>
                {lightboxSrc && <img src={lightboxSrc} alt="Lightbox View" />}
            </div>
        </div>
    );
}

export default DuoLimax;