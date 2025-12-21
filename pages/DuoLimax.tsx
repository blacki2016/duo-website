import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Star, Users, Target, Laugh, Music, ArrowRight, Play } from 'lucide-react';

// Hero Background Slides (mit weichem Crossfade)
const SLIDES = [
    'https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/20241123-limaex-ukongu-012.jpg'
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

    // Carousel Logic
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let animationFrameId: number;
        let isPaused = false;
        let scrollPos = 0;
        const speed = 0.5;
        let isDown = false;
        let startX = 0;
        let startScrollLeft = 0;

        // Clone items for infinite effect
        const originalChildren = Array.from(track.children);
        originalChildren.forEach(child => {
            track.appendChild((child as HTMLElement).cloneNode(true));
        });

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
                // Sync scrollPos when paused/dragged
                scrollPos = track.scrollLeft;
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        // Event Handlers
        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            track.classList.add('active');
            startX = e.pageX - track.offsetLeft;
            startScrollLeft = track.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            isPaused = false;
            track.classList.remove('active');
        };

        const handleMouseUp = () => {
            isDown = false;
            track.classList.remove('active');
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = startScrollLeft - walk;
            scrollPos = track.scrollLeft;
        };

        const handleMouseEnter = () => { isPaused = true; };
        const handleTouchStart = () => { isPaused = true; };
        const handleTouchEnd = () => { setTimeout(() => isPaused = false, 1500); };

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

    const handlePrev = () => {
        if (trackRef.current) trackRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    };

    const handleNext = () => {
        if (trackRef.current) trackRef.current.scrollBy({ left: 350, behavior: 'smooth' });
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
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .limax-card {
            background: rgba(20, 20, 20, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 2.5rem 2rem;
            border-radius: 4px;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        
        .limax-card:hover {
            transform: translateY(-5px);
            border-color: rgba(235, 210, 151, 0.4);
            background: rgba(30, 30, 30, 0.8);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .limax-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 4px; height: 100%;
            background: #EBD297;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .limax-card:hover::before { opacity: 1; }

        .card-icon {
            color: #EBD297;
            margin-bottom: 1.5rem;
            background: rgba(235, 210, 151, 0.1);
            width: 60px; height: 60px;
            display: flex; align-items: center; justify-content: center;
            border-radius: 50%;
        }

        .limax-card h3 {
            font-family: 'Cinzel', serif;
            font-size: 1.4rem;
            color: #fff;
            margin-bottom: 0.8rem;
        }

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
        }
        .carousel-track::-webkit-scrollbar { display: none; }
        
        .carousel-item {
            flex: 0 0 350px;
            aspect-ratio: 2/3;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(255,255,255,0.1);
            transition: transform 0.3s;
            cursor: pointer;
        }
        @media(max-width: 600px) { .carousel-item { flex: 0 0 280px; } }

        .carousel-item:hover { transform: scale(1.03); border-color: #EBD297; }
        .carousel-item img { width: 100%; height: 100%; object-fit: cover; }

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
                            <a href="#trailer" className="limax-btn">
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
                                <a href="mailto:buchung@limax.de" className="limax-btn primary" style={{ fontSize: '0.9rem', padding: '12px 24px' }}>
                                    Buchung anfragen
                                </a>
                            </div>
                        </div>
                        <div className="poster-frame">
                            <img src="https://maximilianboy.de/mystaging02/wp-content/uploads/2024/10/ukongu-Final-without-date-2.jpg" alt="UKONGU Poster" />
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section className="limax-section limax-reveal">
                    <h2>Show Elemente</h2>
                    <div className="cards-grid">
                        <div className="limax-card">
                            <div className="card-icon"><Sparkles size={28} /></div>
                            <h3>Großillusionen</h3>
                            <p className="limax-text">Spektakuläre Illusionen im XXL-Format: Personen erscheinen, verschwinden oder werden zerteilt.</p>
                        </div>
                        <div className="limax-card">
                            <div className="card-icon"><Users size={28} /></div>
                            <h3>Akrobatik</h3>
                            <p className="limax-text">Kraftvolle Partnerakrobatik und Balance-Acts, die Körperbeherrschung und Vertrauen demonstrieren.</p>
                        </div>
                        <div className="limax-card">
                            <div className="card-icon"><Laugh size={28} /></div>
                            <h3>Comedy</h3>
                            <p className="limax-text">Spontaner Witz und Situationskomik. Wir nehmen uns selbst nicht zu ernst – das Publikum liebt es.</p>
                        </div>
                        <div className="limax-card">
                            <div className="card-icon"><Target size={28} /></div>
                            <h3>Präzision</h3>
                            <p className="limax-text">Meisterhafte Jonglage und Manipulation, perfekt choreografiert auf Musik und Licht.</p>
                        </div>
                        <div className="limax-card">
                            <div className="card-icon"><Music size={28} /></div>
                            <h3>Live Musik</h3>
                            <p className="limax-text">Überraschende musikalische Einlagen, live performt, geben der Show eine persönliche Note.</p>
                        </div>
                        <div className="limax-card">
                            <div className="card-icon"><Star size={28} /></div>
                            <h3>Variabilität</h3>
                            <p className="limax-text">Jede Show ist einzigartig. Wir passen unser Programm an Ihre Bühne und Ihr Publikum an.</p>
                        </div>
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

                {/* GALERIE */}
                <section className="limax-section limax-reveal">
                    <h2>Impressionen</h2>
                    <div style={{ position: 'relative' }}>
                        <div className="carousel-nav-btn nav-prev" onClick={handlePrev}>❮</div>
                        <div className="carousel-track" ref={trackRef}>
                            {[
                                "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/20241123-limaex-ukongu-014-682x1024.jpg",
                                "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/05_IMG-20241124-WA0036-761x1024.jpg",
                                "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/20241123-limaex-ukongu-124-1024x682.jpg",
                                "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/10_IMG-20241124-WA0095-900x1024.jpg",
                                "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/20241123-limaex-ukongu-085-1024x682.jpg",
                                "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/05/16_DSC08078-788x1024.jpg"
                            ].map((src, idx) => (
                                <div key={idx} className="carousel-item" onClick={() => setLightboxSrc(src)}>
                                    <img src={src} alt={`Galerie ${idx}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                        <div className="carousel-nav-btn nav-next" onClick={handleNext}>❯</div>
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