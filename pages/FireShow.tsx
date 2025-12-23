import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import ScrollToTop from '../components/ScrollToTop';

// Hero Background Slides (mit weichem Crossfade)
const SLIDES = [
    `${import.meta.env.BASE_URL}images/feuer.hero.jpg`
];

const FireShow: React.FC = () => {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

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

        const items = document.querySelectorAll('.fs-reveal');
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

    const trackRef = useRef<HTMLDivElement>(null);

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

    // Image Click Handler (Lightbox)
    const handleImageClick = (src: string) => {
        setLightboxSrc(src);
    };

    const handlePrev = () => {
        if (trackRef.current) trackRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    };

    const handleNext = () => {
        if (trackRef.current) trackRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    };

    // Generate Sparks for Hero
    const sparks = Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`
    }));

    return (
        <div className="min-h-screen relative overflow-hidden">
            <style>{`
        /* COMPONENT SPECIFIC STYLES */
        
        /* Fixed Background (Blur) */
        .fs-bg-layer {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 0;
            background-color: #000;
            pointer-events: none;
        }

        /* Background Slides mit Crossfade */
        .fs-slide {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: opacity 2000ms ease-in-out;
            filter: blur(3px) brightness(0.3);
            transform: scale(1.02);
        }

        /* Wrapper */
        .feuershow-landing-wrapper {
            position: relative;
            z-index: 1;
            font-family: system-ui, -apple-system, sans-serif !important;
            color: #ebd297;
            padding-bottom: 2rem;
        }

        /* Hero Image Layer (Sharp) */
        .fs-hero-bg {
            position: absolute;
            top: 0; left: 0; width: 100%;
            height: 920px;
            z-index: -1;
            background-image: url("${import.meta.env.BASE_URL}images/feuer.hero.jpg");
            background-position: center -100px; /* Adjusted for navbar */
            background-size: cover;
            -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            filter: brightness(1);
            pointer-events: none;
        }
        @media (max-width: 768px) {
            .fs-hero-bg { background-position: center top; height: 100vh; }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
            .fs-slide { transition-duration: 0ms !important; }
        }

        /* Sparks Animation */
        .fs-spark {
            position: absolute;
            bottom: -10px;
            width: 3px;
            height: 3px;
            background: #ffaa00;
            border-radius: 50%;
            box-shadow: 0 0 10px #ff5500, 0 0 20px #ffaa00;
            opacity: 0;
            pointer-events: none;
        }
        @keyframes fs-spark-rise {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(-60vh) scale(0); opacity: 0; }
        }

        /* Typography */
        .feuershow-landing-wrapper h1, 
        .feuershow-landing-wrapper h2, 
        .feuershow-landing-wrapper h3,
        .feuershow-landing-wrapper h4 {
            font-family: system-ui, -apple-system, sans-serif !important;
            color: #EBD297 !important;
            line-height: 1.25 !important;
            font-weight: 700 !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
        }
        .feuershow-landing-wrapper p, .feuershow-landing-wrapper li {
            color: #e5e5e5 !important;
        }

        /* Hero Section */
        .fs-hero-section {
            min-height: 85vh;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 8rem 1rem 4rem;
            position: relative;
        }
        .fs-hero-title {
            font-size: clamp(2.2rem, 6vw, 4rem) !important;
            margin-bottom: 1.5rem !important;
            text-shadow: 0 4px 8px rgba(0,0,0,0.9) !important;
        }
        .fs-hero-sub {
            font-size: clamp(1.1rem, 2.5vw, 1.4rem) !important;
            margin: 0 auto 2.5rem !important;
            text-shadow: 0 2px 10px rgba(0,0,0,1) !important;
            max-width: 700px;
        }

        /* FIRE BUTTON ANIMATION */
        @keyframes fire-pulse {
            0% { box-shadow: 0 0 10px rgba(255, 100, 0, 0.4), inset 0 0 5px rgba(255, 200, 0, 0.5); }
            50% { box-shadow: 0 0 25px rgba(255, 50, 0, 0.7), inset 0 0 15px rgba(255, 200, 0, 0.8); }
            100% { box-shadow: 0 0 10px rgba(255, 100, 0, 0.4), inset 0 0 5px rgba(255, 200, 0, 0.5); }
        }
        @keyframes flame-movement {
            0% { transform: scale(1) rotate(-1deg); }
            25% { transform: scale(1.02) rotate(1deg); }
            50% { transform: scale(0.98) rotate(-1deg); }
            75% { transform: scale(1.02) rotate(2deg); }
            100% { transform: scale(1) rotate(-1deg); }
        }

        /* CTA Button */
        .fs-cta-button {
            position: relative;
            display: inline-block !important;
            padding: 18px 40px !important;
            background: linear-gradient(0deg, #ff2200 0%, #ff8800 50%, #ffdd00 100%) !important;
            color: #000000 !important; 
            border-radius: 50px !important;
            font-weight: 800 !important;
            transition: all .3s ease !important;
            font-size: 1.3rem !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-decoration: none;
            overflow: visible !important;
            z-index: 1;
            animation: fire-pulse 2s infinite, flame-movement 3s infinite ease-in-out;
            border: 2px solid #fff3cd;
        }
        /* Inner Glow */
        .fs-cta-button::before {
            content: '';
            position: absolute;
            inset: -4px;
            background: radial-gradient(circle, rgba(255,200,0,0.4) 0%, transparent 70%);
            border-radius: 50px;
            z-index: -1;
            filter: blur(10px);
            animation: fire-pulse 1.5s infinite reverse;
        }

        .fs-cta-button:hover {
            transform: translateY(-3px) scale(1.05) !important;
            background: linear-gradient(0deg, #ff4400 0%, #ffaa00 50%, #ffee00 100%) !important;
            box-shadow: 0 0 40px rgba(255, 100, 0, 0.9) !important;
        }

        /* Sections */
        .fs-section {
            padding: 4rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .fs-possibilities-section { padding-top: 6rem !important; }
        
        .fs-section h2 {
            text-align: center !important;
            margin-bottom: 3rem !important;
            font-size: clamp(1.8rem, 4vw, 2.5rem) !important;
            position: relative;
        }
        .fs-section h2::after {
            content: ''; display: block; width: 60px; height: 3px;
            background: #EBD297; margin: 0.8rem auto 0; border-radius: 2px;
        }
        
        /* Decorative Divider */
        .fs-divider {
            width: 100%; height: 1px;
            background: linear-gradient(90deg, transparent, #ebd297, transparent);
            opacity: 0.3; margin: 2rem 0;
        }

        /* Possibilities List */
        .fs-possibilities {
            display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;
            list-style: none; padding: 0;
        }
        .fs-possibilities li {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(235, 210, 151, 0.3);
            padding: 12px 24px !important;
            border-radius: 50px !important;
            color: #ebd297 !important;
            font-weight: 600;
            backdrop-filter: blur(5px);
            transition: background 0.3s;
        }
        .fs-possibilities li:hover { background: rgba(235, 210, 151, 0.15); }

        /* --- REDESIGNED HIGHLIGHT CARDS --- */
        .fs-highlights-grid {
            display: grid; 
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2.5rem; 
            margin-top: 2rem;
        }
        @media (max-width: 900px) {
            .fs-highlights-grid { grid-template-columns: 1fr; }
        }
        
        .fs-highlight-card {
            position: relative;
            height: 500px; /* Taller cinematic aspect ratio */
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            background: #000;
        }
        
        /* Inner Border Glow Effect on Hover */
        .fs-highlight-card::before {
             content: ''; position: absolute; inset: 0;
             border-radius: 20px;
             padding: 2px;
             background: linear-gradient(45deg, transparent, rgba(235, 210, 151, 0.5), transparent);
             -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
             -webkit-mask-composite: xor;
             mask-composite: exclude;
             opacity: 0; transition: opacity 0.5s;
             pointer-events: none; z-index: 2;
        }
        
        .fs-highlight-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 60px rgba(255, 100, 0, 0.15); /* Fire colored shadow */
            border-color: rgba(235, 210, 151, 0.4);
        }
        
        .fs-highlight-card:hover::before { opacity: 1; }

        /* Image Styling */
        .fs-highlight-card img {
            width: 100%; height: 100%; object-fit: cover;
            transition: transform 0.8s ease, filter 0.5s ease;
            filter: brightness(0.85); /* Slightly darker by default for contrast */
        }
        .fs-highlight-card:hover img {
            transform: scale(1.08);
            filter: brightness(1.05); /* Brighter on hover */
        }

        /* Overlay & Content */
        .fs-card-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%;
            padding: 2.5rem 2rem;
            background: linear-gradient(to top, #000 10%, rgba(0,0,0,0.8) 50%, transparent 100%);
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .fs-card-subtitle {
            color: #EBD297;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-size: 0.75rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            opacity: 0.8;
            transform: translateY(10px);
            transition: all 0.5s ease;
            font-family: 'Montserrat', sans-serif;
        }
        
        .fs-card-title {
            font-family: 'Cinzel', serif;
            font-size: 2rem;
            color: #fff;
            margin: 0;
            line-height: 1;
            text-shadow: 0 2px 10px rgba(0,0,0,1);
            transform: translateY(5px);
            transition: transform 0.5s ease;
        }

        .fs-highlight-card:hover .fs-card-subtitle {
            transform: translateY(0); opacity: 1;
        }
        .fs-highlight-card:hover .fs-card-title {
            transform: translateY(-2px);
        }

        /* Hover Icon */
        .fs-card-icon {
            position: absolute;
            top: 1.5rem; right: 1.5rem;
            width: 44px; height: 44px;
            border-radius: 50%;
            background: rgba(235, 210, 151, 0.1);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(235, 210, 151, 0.3);
            display: flex; align-items: center; justify-content: center;
            color: #EBD297;
            opacity: 0; transform: scale(0.5) rotate(-45deg);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 15;
        }
        .fs-highlight-card:hover .fs-card-icon {
            opacity: 1; transform: scale(1) rotate(0);
        }

        /* Videos */
        .fs-video-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        @media (min-width: 768px) {
            .fs-video-grid {
                flex-direction: row;
                gap: 2rem;
            }
            .fs-video-item {
                flex: 1;
            }
        }
        .fs-video-item h3 {
            font-size: 1.1rem; margin-bottom: 0.5rem; border-left: 3px solid #EBD297; padding-left: 0.5rem;
        }
        .fs-video-wrapper {
            position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;
            border-radius: 12px; border: 1px solid rgba(235, 210, 151, 0.2); background: #000;
        }
        .fs-video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }

        /* Eckdaten Box */
        .fs-eckdaten-box {
            background: rgba(25, 25, 24, 0.85); border: 1px solid rgba(235, 210, 151, 0.2);
            backdrop-filter: blur(10px); border-radius: 16px; padding: 2.5rem 2rem;
            max-width: 800px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }
        .fs-check-list { list-style: none; padding: 0; }
        .fs-check-list li {
            position: relative; padding-left: 2.2rem; margin-bottom: 1.2rem;
            font-size: 1.05rem; color: #f0f0f0;
        }
        .fs-check-list li::before {
            content: '✓'; position: absolute; left: 0; top: 0;
            color: #EBD297; font-weight: bold; font-size: 1.2em;
        }

        /* Carousel - ADJUSTED SIZE */
        .fs-carousel-wrapper { position: relative; width: 100%; overflow: hidden; padding: 2rem 0; }
        .fs-carousel-track {
            display: flex; gap: 1.5rem; overflow-x: auto; padding-bottom: 1rem;
            width: 100%; scrollbar-width: none; cursor: grab;
            -webkit-overflow-scrolling: touch; touch-action: pan-x;
            align-items: center;
        }
        .fs-carousel-track::-webkit-scrollbar { display: none; }
        .fs-carousel-item {
            flex-shrink: 0;
            background: #000; 
            border: 1px solid rgba(235, 210, 151, 0.3);
            border-radius: 12px; overflow: hidden; 
            position: relative;
            display: inline-flex; align-items: center; justify-content: center;
        }
        .fs-carousel-item.portrait {}
        .fs-carousel-item.landscape {}
        @media (max-width: 768px) {
            .fs-carousel-item { }
        }
        .fs-carousel-item img {
            width: auto; height: auto; max-height: 400px; max-width: 100%;
            object-fit: contain; 
            cursor: zoom-in;
            user-select: none;
            position: relative;
            z-index: 1;
        }
        @media (max-width: 768px) { .fs-carousel-item img { max-height: 350px; } }
        /* removed blurred background layer for exact image sizing */

        /* Carousel Navigation Buttons */
        .fs-carousel-btn {
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
        .fs-carousel-btn:hover { background: #EBD297; color: #000; }
        .fs-carousel-prev { left: 10px; }
        .fs-carousel-next { right: 10px; }

        /* FAQ */
        .fs-faq details {
            background: rgba(255, 255, 255, 0.03); border-radius: 8px; margin-bottom: 1rem;
            border: 1px solid rgba(235, 210, 151, 0.1); transition: background 0.3s;
        }
        .fs-faq details[open] { background: rgba(235, 210, 151, 0.08); border-color: rgba(235, 210, 151, 0.3); }
        .fs-faq summary {
            padding: 1.2rem; cursor: pointer; font-weight: 700; color: #EBD297;
            list-style: none; position: relative; padding-right: 40px;
        }
        .fs-faq summary::-webkit-details-marker { display: none; }
        .fs-faq summary::after {
            content: '+'; position: absolute; right: 1.2rem; top: 1.2rem;
            font-weight: bold; font-size: 1.4rem; line-height: 1;
        }
        .fs-faq details[open] summary::after { content: '−'; }
        .fs-faq p { padding: 0 1.2rem 1.2rem; margin: 0; line-height: 1.6; color: #e0e0e0; }

        /* Animation Classes */
        .fs-reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
        .fs-reveal.show { opacity: 1; transform: translateY(0); }

        /* Lightbox */
        .fs-lightbox {
            position: fixed; z-index: 99999; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center;
            cursor: zoom-out; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .fs-lightbox.active { opacity: 1; pointer-events: auto; }
        .fs-lightbox img {
            max-width: 90%; max-height: 90%; border: 2px solid #EBD297;
            border-radius: 4px; box-shadow: 0 0 30px rgba(0,0,0,0.8);
            transform: scale(0.9); transition: transform 0.3s ease;
            object-fit: contain;
        }
        .fs-lightbox.active img { transform: scale(1); }
      `}</style>

            {/* FIXED BACKGROUND LAYER WITH SLIDES */}
            <div className="fs-bg-layer">
                {SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`fs-slide ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${slide}')` }}
                    />
                ))}
            </div>

            <div className="feuershow-landing-wrapper">
                <div className="fs-hero-bg"></div>

                {/* =================== HERO =================== */}
                <header className="fs-hero-section">
                    {/* Background Sparks */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        {sparks.map((s, i) => (
                            <div
                                key={i}
                                className="fs-spark"
                                style={{
                                    left: s.left,
                                    animation: `fs-spark-rise ${s.duration} ease-in infinite`,
                                    animationDelay: s.delay
                                }}
                            ></div>
                        ))}
                    </div>

                    <div className="fs-hero-content z-10">
                        <Link className="fs-cta-button" to="/booking-request">
                            Jetzt anfragen 🔥
                        </Link>
                    </div>
                </header>

                {/* =================== MÖGLICHKEITEN =================== */}
                <section className="fs-section fs-reveal fs-possibilities-section">
                    <h2>Das alles ist möglich</h2>
                    <ul className="fs-possibilities">
                        <li>Moderne und mittelalterliche Feuershow</li>
                        <li>Hochzeitsfeuershow</li>
                        <li>Comedyfeuershow</li>
                        <li>Individuelle Feuershow</li>
                        <li>Feuereffekte für Film und Theater</li>
                        <li>Feuerdekorationen</li>
                        <li>Bühnenpyrotechnik</li>
                    </ul>
                </section>

                <div className="fs-divider"></div>

                {/* =================== HIGHLIGHTS (UPDATED CARDS) =================== */}
                <section className="fs-section fs-reveal">
                    <h2>Show-Highlights</h2>
                    <div className="fs-highlights-grid">
                        {[
                            { title: "Feuerjonglage", subtitle: "Präzision & Flow", img: `${import.meta.env.BASE_URL}images/Feuerjonglage.jpg` },
                            { title: "Flammenmeer", subtitle: "Energie Pur", img: `${import.meta.env.BASE_URL}images/flammenmeer.jpg` },
                            { title: "Etwas Romantik", subtitle: "Für das Herz", img: `${import.meta.env.BASE_URL}images/feuerherz.jpg` },
                            { title: "Funkenflug", subtitle: "Das große Finale", img: `${import.meta.env.BASE_URL}images/funkenflug.jpg` },
                        ].map((item, i) => (
                            <div className="fs-highlight-card group" key={i} onClick={() => handleImageClick(item.img)}>
                                <div className="fs-card-icon">
                                    <Maximize2 size={20} />
                                </div>
                                <img src={item.img} alt={item.title} loading="lazy" />
                                <div className="fs-card-overlay">
                                    <span className="fs-card-subtitle">{item.subtitle}</span>
                                    <h3 className="fs-card-title">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* =================== TESTIMONIAL =================== */}
                <section className="fs-section fs-reveal">
                    <div className="bg-[#141415]/80 p-8 md:p-12 rounded-2xl border border-[#ebd297]/20 text-center max-w-4xl mx-auto relative backdrop-blur-md shadow-2xl">
                        <div className="text-6xl text-[#ebd297] opacity-20 absolute top-4 left-4 font-serif leading-none">"</div>
                        <p className="text-xl md:text-2xl text-stone-200 font-serif italic mb-8 relative z-10 leading-relaxed">
                            Eine Wahnsinns-Feuershow als Überraschung! Wir kamen aus dem Staunen nicht heraus. Max gestaltet die Show so amüsant, dass Klein und Groß viel gelacht haben. Ein tolles Highlight und eine große Empfehlung!
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20 bg-[#ebd297]/10 flex items-center justify-center">
                                <span className="font-serif font-bold text-xl">P</span>
                            </div>
                            <div className="text-left">
                                <div className="text-[#ebd297] font-bold text-base">Patrick</div>
                                <div className="text-stone-500 text-xs uppercase tracking-wider font-bold">HOCHZEIT</div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="fs-divider"></div>

                {/* =================== VIDEOS =================== */}
                <section className="fs-section fs-reveal">
                    <h2>Videos</h2>
                    <div className="fs-video-grid">
                        {[
                            { title: "Feuershow Demovideo", src: "https://www.youtube-nocookie.com/embed/Y671VGMJWsc" },
                            { title: "Einzelne Effekte", src: "https://www.youtube-nocookie.com/embed/vsFnFUEiL_Y" },
                            { title: "Feuershow XXL", src: "https://www.youtube-nocookie.com/embed/AxW1R4ktRQ4" }
                        ].map((vid, i) => (
                            <div className="fs-video-item" key={i}>
                                <h3>{vid.title}</h3>
                                <div className="fs-video-wrapper">
                                    <iframe src={vid.src} title={vid.title} allowFullScreen loading="lazy"></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* =================== ECKDATEN =================== */}
                <section className="fs-section fs-reveal">
                    <h2>Eckdaten zur Show</h2>
                    <div className="fs-eckdaten-box">
                        <ul className="fs-check-list">
                            <li>Sehr humorvolles Familienprogramm</li>
                            <li>Dauer ca. 20 Minuten</li>
                            <li>Anspruchsvolle Feuerjonglage</li>
                            <li>Große Funken- und Flammeneffekte im Finale der Show</li>
                            <li>Harmonisch gestaltetes Bühnenbild mit Feuerschalen und LED Lichtern</li>
                            <li>Beschallungsanlage für bis zu 120 Personen</li>
                            <li>Ein brennendes Herz für Hochzeiten (1,2×1,3m), oder Zahlen für Geburtstage und Jubiläen können mit eingebaut werden</li>
                            <li>Alle Absprachen mit der Location, wie auch diverse organisatorische Dinge (Genehmigungen usw.) werden von mir im vollen Umfang übernommen.</li>
                        </ul>
                    </div>
                </section>

                {/* =================== GALERIE (Carousel) =================== */}
                <section className="fs-section fs-reveal">
                    <h2>Weitere Impressionen</h2>
                    <div className="fs-carousel-wrapper">
                        <button className="fs-carousel-btn fs-carousel-prev" onClick={handlePrev} aria-label="Zurück">❮</button>
                        <div className="fs-carousel-track" ref={trackRef}>
                            {[
                                { src: `${import.meta.env.BASE_URL}images/flammenmeer.jpg`, format: 'landscape' },
                                { src: `${import.meta.env.BASE_URL}images/feuerherz.jpg`, format: 'portrait' },
                                { src: `${import.meta.env.BASE_URL}images/funkenflug.jpg`, format: 'landscape' },
                                { src: `${import.meta.env.BASE_URL}images/Feuerjonglage.jpg`, format: 'portrait' },
                                { src: `${import.meta.env.BASE_URL}images/heroslider1.jpg`, format: 'landscape' },
                                { src: `${import.meta.env.BASE_URL}images/heroslider2.jpg`, format: 'landscape' },
                                { src: `${import.meta.env.BASE_URL}images/feuer.impression1.jpg`, format: 'landscape' },
                                { src: `${import.meta.env.BASE_URL}images/feuer.impression2.jpg`, format: 'landscape' },
                                { src: `${import.meta.env.BASE_URL}images/feuer.impression3.jpg`, format: 'portrait' },
                                { src: `${import.meta.env.BASE_URL}images/feuer.impression4.jpg`, format: 'portrait' },
                                { src: `${import.meta.env.BASE_URL}images/feuer.impression5.jpg`, format: 'landscape' }
                            ].map((item, i) => (
                                <div className={`fs-carousel-item ${item.format}`} key={i} onClick={() => handleImageClick(item.src)}>
                                    <SmartImage src={item.src} alt={`Gallery ${i}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                        <button className="fs-carousel-btn fs-carousel-next" onClick={handleNext} aria-label="Weiter">❯</button>
                    </div>
                </section>

                <div className="fs-divider"></div>

                {/* =================== FAQ =================== */}
                <section className="fs-section fs-reveal">
                    <h2>Häufige Fragen</h2>
                    <div className="fs-faq">
                        <details>
                            <summary>Wie viel Platz wird benötigt?</summary>
                            <p>Im Idealfall sollte die Fläche ca. 10m breit und 5m tief sein. Eine kleinere Fläche ist aber nach Absprache auch möglich.</p>
                        </details>
                        <details>
                            <summary>Ist eine Feuershow überall möglich?</summary>
                            <p>Ja... zumindest fast :) Ein Parkplatz, eine Wiese oder eine größere Terrasse reichen aus. Ich prüfe Locations, Abstände und Auflagen im Vorfeld und schlage bei Bedarf Alternativen vor – Sicherheit hat Priorität.</p>
                        </details>
                        <details>
                            <summary>Ist eine Feuershow auch im Innenbereich möglich?</summary>
                            <p>Nein. Nicht nur das Feuer, sondern auch die Rauchentwicklung wären im Innenbereich problematisch. Daher muss die Show draußen stattfinden.</p>
                        </details>
                        <details>
                            <summary>Was wird vor Ort an Technik benötigt?</summary>
                            <p>Ich bin weitgehend autark. Eine leistungsstarke Musikanlage (Akku oder Strom) und Lichttechnik für die Showfläche bringe ich mit. Ein Stromanschluss in der Nähe ist hilfreich, aber nicht zwingend notwendig.</p>
                        </details>
                        <details>
                            <summary>Wer kümmert sich um Genehmigungen?</summary>
                            <p>Ich übernehme die Abstimmung mit Location und ggf. Behörden, damit Sie entspannt planen können.</p>
                        </details>
                    </div>
                </section>

            </div>

            {/* LIGHTBOX */}
            <div className={`fs-lightbox ${lightboxSrc ? 'active' : ''}`} onClick={() => setLightboxSrc(null)}>
                {lightboxSrc && <img src={lightboxSrc} alt="Lightbox" />}
            </div>
            <ScrollToTop />
        </div>
    );
};

export default FireShow;