import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';

// Hero Background Slides (mit weichem Crossfade)
const SLIDES = [
    'https://maximilianboy.de/mystaging02/wp-content/uploads/2025/09/Bild-042-scaled.jpg'
];

const ArtistryShow: React.FC = () => {
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
        }, { threshold: 0.15 });

        const items = document.querySelectorAll('.as-reveal');
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
    const trackRef = useRef<HTMLDivElement>(null);
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
                }
                track.scrollLeft = scrollPos;
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            startScrollLeft = track.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            isPaused = false;
        };

        const handleMouseUp = () => {
            isDown = false;
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

        track.addEventListener('mousedown', handleMouseDown);
        track.addEventListener('mouseleave', handleMouseLeave);
        track.addEventListener('mouseup', handleMouseUp);
        track.addEventListener('mousemove', handleMouseMove);
        track.addEventListener('mouseenter', handleMouseEnter);

        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (track) {
                track.removeEventListener('mousedown', handleMouseDown);
                track.removeEventListener('mouseleave', handleMouseLeave);
                track.removeEventListener('mouseup', handleMouseUp);
                track.removeEventListener('mousemove', handleMouseMove);
                track.removeEventListener('mouseenter', handleMouseEnter);
            }
        };
    }, []);

    const handleImageClick = (src: string) => {
        setLightboxSrc(src);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#121212]">
            <style>{`
        /* BACKGROUND LAYERS */
        .as-bg-layer {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 0;
            background-color: #000;
            pointer-events: none;
        }

        /* Background Slides mit Crossfade */
        .as-slide {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center -100px;
            background-repeat: no-repeat;
            transition: opacity 2000ms ease-in-out;
            filter: blur(3px) brightness(0.3);
            transform: scale(1.02);
        }

        .as-wrapper {
            position: relative;
            z-index: 1;
            font-family: system-ui, -apple-system, sans-serif !important;
            color: #ebd297;
            padding-bottom: 2rem;
        }

        .as-hero-bg {
            position: absolute;
            top: 0; left: 0; width: 100%;
            height: 1200px;
            z-index: -1;
            background-image: url("https://maximilianboy.de/mystaging02/wp-content/uploads/2025/09/Bild-042-scaled.jpg");
            background-position: center -80px;
            background-size: 100% auto;
            background-repeat: no-repeat;
            -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
            mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
            filter: brightness(0.55);
            pointer-events: none;
        }
        @media (max-width: 768px) {
            .as-hero-bg { background-size: cover; background-position: center -60px; height: 100vh; }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
            .as-slide { transition-duration: 0ms !important; }
        }

        /* TYPOGRAPHY */
        .as-wrapper h1, .as-wrapper h2, .as-wrapper h3 {
            font-family: system-ui, -apple-system, sans-serif !important;
            color: #EBD297 !important;
            font-weight: 700 !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }
        .as-wrapper p, .as-wrapper li { color: #e5e5e5 !important; line-height: 1.6; }

        /* HERO */
        .as-hero {
            min-height: 85vh;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 8rem 1rem 4rem;
            position: relative;
            background: rgba(0, 0, 0, 0.2); 
        }
        .as-hero-glow {
            pointer-events: none;
            position: absolute; inset: 0;
            background: radial-gradient(600px 300px at 60% 20%, rgba(235, 210, 151, .20), transparent 65%);
            mix-blend-mode: screen;
            animation: as-ember 6s ease-in-out infinite alternate;
        }
        @keyframes as-ember {
            from { filter: blur(22px); opacity: .6; transform: translateY(-6px); }
            to   { filter: blur(28px); opacity: .9; transform: translateY(6px); }
        }
        .as-hero-title {
            font-size: clamp(2.2rem, 6vw, 4rem) !important;
            margin-bottom: 1.5rem !important;
            text-shadow: 0 4px 8px rgba(0,0,0,0.9) !important;
        }
        .as-hero-sub {
            font-size: clamp(1.1rem, 2.5vw, 1.4rem) !important;
            opacity: 0.95; margin: 0 auto 2.5rem !important;
            text-shadow: 0 2px 10px rgba(0,0,0,1) !important;
            max-width: 700px;
        }

        /* NEW MAGIC HERO BUTTON */
        .as-btn-magic {
            position: relative;
            display: inline-flex; align-items: center; gap: 10px;
            padding: 18px 45px;
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            color: #EBD297 !important;
            border-radius: 50px;
            font-weight: 800;
            text-transform: uppercase; letter-spacing: 2px;
            border: 2px solid #EBD297;
            box-shadow: 0 0 15px rgba(235, 210, 151, 0.2), inset 0 0 10px rgba(235, 210, 151, 0.1);
            transition: all 0.4s ease;
            overflow: hidden;
            text-decoration: none !important;
            font-size: 1.1rem;
        }
        
        .as-btn-magic::before {
            content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform: rotate(45deg);
            animation: as-shine 3s infinite;
        }

        @keyframes as-shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }

        .as-btn-magic:hover {
            background: #EBD297;
            color: #000 !important;
            box-shadow: 0 0 30px rgba(235, 210, 151, 0.6);
            transform: scale(1.05);
        }

        /* SECTIONS */
        .as-section { padding: 4rem 1rem; max-width: 1200px; margin: 0 auto; }
        .as-section h2 {
            text-align: center; margin-bottom: 3rem;
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            position: relative;
        }
        .as-section h2::after {
            content: ''; display: block; width: 60px; height: 3px;
            background: #EBD297; margin: 0.8rem auto 0; border-radius: 2px;
        }

        /* --- UPDATED CINEMATIC HIGHLIGHT CARDS --- */
        .as-highlights-grid {
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem; 
            margin-top: 2rem;
        }
        
        .as-highlight-card {
            position: relative;
            height: 500px; 
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            background: #000;
        }

        .as-highlight-card::before {
             content: ''; position: absolute; inset: 0;
             border-radius: 20px;
             padding: 2px;
             background: linear-gradient(45deg, transparent, rgba(235, 210, 151, 0.5), transparent);
             -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
             mask-composite: exclude;
             opacity: 0; transition: opacity 0.5s;
             pointer-events: none; z-index: 2;
        }

        .as-highlight-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 60px rgba(235, 210, 151, 0.15);
            border-color: rgba(235, 210, 151, 0.4);
        }
        .as-highlight-card:hover::before { opacity: 1; }

        .as-highlight-card img {
            width: 100%; height: 100%; object-fit: cover;
            transition: transform 0.8s ease, filter 0.5s ease, opacity 0.5s ease;
            filter: brightness(0.85);
        }
        .as-highlight-card:hover img {
            transform: scale(1.08);
            filter: brightness(1.05);
        }
        
        /* Hover image swap effect */
        .as-highlight-card img.hover-img {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            z-index: 1;
        }
        .as-highlight-card:hover img.hover-img {
            opacity: 1;
        }
        .as-highlight-card:hover img.default-img {
            opacity: 0;
        }

        .as-card-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%;
            padding: 2.5rem 2rem;
            background: linear-gradient(to top, #000 10%, rgba(0,0,0,0.8) 50%, transparent 100%);
            z-index: 10;
            display: flex; flex-direction: column; justify-content: flex-end;
        }

        .as-card-subtitle {
            color: #EBD297; text-transform: uppercase; letter-spacing: 3px;
            font-size: 0.75rem; font-weight: 800; margin-bottom: 0.5rem;
            opacity: 0.8; transform: translateY(10px); transition: all 0.5s ease;
        }
        
        .as-card-title {
            font-family: 'Cinzel', serif; font-size: 2rem; color: #fff; margin: 0;
            line-height: 1; text-shadow: 0 2px 10px rgba(0,0,0,1);
            transform: translateY(5px); transition: transform 0.5s ease;
        }

        .as-highlight-card:hover .as-card-subtitle { transform: translateY(0); opacity: 1; }
        .as-highlight-card:hover .as-card-title { transform: translateY(-2px); }

        .as-card-icon {
            position: absolute; top: 1.5rem; right: 1.5rem;
            width: 44px; height: 44px; border-radius: 50%;
            background: rgba(235, 210, 151, 0.1); backdrop-filter: blur(5px);
            border: 1px solid rgba(235, 210, 151, 0.3);
            display: flex; align-items: center; justify-content: center;
            color: #EBD297; opacity: 0; transform: scale(0.5) rotate(-45deg);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 15;
        }
        .as-highlight-card:hover .as-card-icon { opacity: 1; transform: scale(1) rotate(0); }
        
        /* VIDEO GRID (Mixed Standard & Shorts) */
        .as-video-section-content {
            display: flex; flex-direction: column; gap: 3rem;
        }
        
        /* Main Video (Landscape) */
        .as-main-video-card {
            background: rgba(18, 18, 18, 0.6); border-radius: 12px; overflow: hidden;
            border: 1px solid rgba(235, 210, 151, 0.1); width: 100%; max-width: 900px;
            margin: 0 auto;
        }
        .as-video-wrapper { 
            position: relative; padding-bottom: 56.25%; height: 0; background: #000; 
        }
        .as-video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
        .as-video-caption { padding: 1.5rem; background: rgba(0,0,0,0.5); border-top: 1px solid rgba(255,255,255,0.05); }

        /* Shorts Grid */
        .as-shorts-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 2rem; width: 100%; max-width: 1000px; margin: 0 auto;
        }
        .as-short-card {
            background: rgba(18, 18, 18, 0.6); border-radius: 12px; overflow: hidden;
            border: 1px solid rgba(235, 210, 151, 0.1);
            display: flex; flex-direction: column;
            transition: transform 0.3s;
        }
        .as-short-card:hover { transform: translateY(-5px); border-color: rgba(235, 210, 151, 0.3); }
        .as-short-wrapper {
             position: relative; padding-bottom: 177.77%; /* 9:16 Aspect Ratio */
             height: 0; background: #000;
        }
        .as-short-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
        .as-short-content { padding: 1rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }

        /* CAROUSEL */
        .as-carousel-wrapper { position: relative; width: 100%; overflow: hidden; padding: 2rem 0; }
        .as-carousel-track {
            display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem;
            width: 100%; scrollbar-width: none; cursor: grab;
        }
        .as-carousel-track::-webkit-scrollbar { display: none; }
        .as-carousel-item {
            flex: 0 0 70%; background: #000; border: 1px solid rgba(235, 210, 151, 0.15);
            border-radius: 12px; overflow: hidden; aspect-ratio: 2/3; position: relative;
        }
        @media (min-width: 600px) { .as-carousel-item { flex: 0 0 300px; } }
        .as-carousel-item img {
            width: 100%; height: 100%; object-fit: cover; cursor: zoom-in;
            user-select: none;
        }

        /* FAQ */
        .as-faq-container { max-width: 800px; margin: 0 auto; }
        .as-faq details {
            background: rgba(255, 255, 255, 0.03); border-radius: 8px; margin-bottom: 1rem;
            border: 1px solid rgba(235, 210, 151, 0.1); transition: background 0.3s;
        }
        .as-faq details[open] { background: rgba(235, 210, 151, 0.08); border-color: rgba(235, 210, 151, 0.3); }
        .as-faq summary {
            padding: 1.2rem; cursor: pointer; font-weight: 700; color: #EBD297;
            list-style: none; position: relative; padding-right: 40px;
        }
        .as-faq summary::-webkit-details-marker { display: none; }
        .as-faq summary::after {
            content: '+'; position: absolute; right: 1.2rem; top: 1.2rem;
            font-weight: bold; font-size: 1.4rem; line-height: 1;
        }
        .as-faq details[open] summary::after { content: '−'; }
        .as-faq p { padding: 0 1.2rem 1.2rem; margin: 0; line-height: 1.6; color: #e0e0e0; }


        /* REVEAL */
        .as-reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
        .as-reveal.show { opacity: 1; transform: translateY(0); }
        
        /* LIGHTBOX */
        .as-lightbox {
            position: fixed; z-index: 99999; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center;
            cursor: zoom-out; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .as-lightbox.active { opacity: 1; pointer-events: auto; }
        .as-lightbox img {
            max-width: 90%; max-height: 90%; border: 2px solid #EBD297;
            border-radius: 4px; box-shadow: 0 0 30px rgba(0,0,0,0.8);
            transform: scale(0.9); transition: transform 0.3s ease;
            object-fit: contain;
        }
        .as-lightbox.active img { transform: scale(1); }
      `}</style>

            {/* BACKGROUNDS */}
            <div className="as-bg-layer">
                {SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`as-slide ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${slide}')` }}
                    />
                ))}
            </div>

            <div className="as-wrapper">
                <div className="as-hero-bg"></div>
                <div className="as-hero-glow"></div>

                {/* HERO SECTION */}
                <header className="as-hero">
                    <div className="z-10">
                        <h1 className="as-hero-title">Magie, Artistik & Licht</h1>
                        <p className="as-hero-sub">Eine faszinierende Show aus Bewegung, Lichteffekten und magischen Momenten. Perfekt für Galas, Innenbereiche und anspruchsvolle Events.</p>
                        <Link className="as-btn-magic" to="/booking-request">
                            <span className="text-xl">✨</span> Show anfragen
                        </Link>
                    </div>
                </header>

                {/* HIGHLIGHTS SECTION (CINEMATIC CARDS) */}
                <section className="as-section as-reveal">
                    <h2>Show-Highlights</h2>
                    <div className="as-highlights-grid">
                        {[
                            { title: "Jonglage", subtitle: "Dynamik & Präzision", img: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/06_IMG-20241124-WA0140-scaled.jpg", hoverImg: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/12/Gemini_Generated_Image_pawu91pawu91pawu.jpg" },
                            { title: "Zauberei", subtitle: "Magische Momente", img: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/09/Bild-237-scaled.jpg", hoverImg: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/12/Gemini_Generated_Image_k70wj1k70wj1k70w.jpg" },
                            { title: "Handstandakrobatik", subtitle: "Hoch Hinaus", img: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/09/Bild-044-scaled.jpg", hoverImg: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/12/unnamed-4.jpg" },
                            { title: "Rola Rola", subtitle: "Balance & Kontrolle", img: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/20241123-limaex-ukongu-098.jpg", hoverImg: "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/12/Gemini_Generated_Image_z9jggtz9jggtz9jg.jpg" }
                        ].map((item, idx) => (
                            <div className="as-highlight-card group" key={idx} onClick={() => handleImageClick(item.hoverImg || item.img)}>
                                <div className="as-card-icon">
                                    <Maximize2 size={20} />
                                </div>
                                <img src={item.img} alt={item.title} loading="lazy" className="default-img" />
                                {item.hoverImg && <img src={item.hoverImg} alt={`${item.title} Hover`} loading="lazy" className="hover-img" />}
                                <div className="as-card-overlay">
                                    <span className="as-card-subtitle">{item.subtitle}</span>
                                    <h3 className="as-card-title">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VIDEOS SECTION (RESTRUCTURED) */}
                <section className="as-section as-reveal">
                    <h2>Videos & Einblicke</h2>
                    <div className="as-video-section-content">

                        {/* 1. Main Video: Jonglage */}
                        <div className="as-main-video-card">
                            <div className="as-video-wrapper">
                                <iframe src="https://www.youtube-nocookie.com/embed/Y671VGMJWsc" title="Jonglage Showreel" allowFullScreen loading="lazy"></iframe>
                            </div>
                            <div className="as-video-caption text-center">
                                <h3 className="text-2xl font-serif text-[#EBD297] mb-2">Jonglage</h3>
                                <p className="text-sm text-stone-300">Dynamische Performance mit Bällen, Keulen und Ringen.</p>
                            </div>
                        </div>

                        {/* 2. Shorts Grid */}
                        <div className="as-shorts-grid">
                            {/* Handstand */}
                            <div className="as-short-card">
                                <div className="as-short-wrapper">
                                    <iframe src="https://www.youtube.com/embed/DReI5yQfBHI" title="Handstand" allowFullScreen loading="lazy"></iframe>
                                </div>
                                <div className="as-short-content text-center">
                                    <h3 className="text-lg font-bold text-[#EBD297] mb-1">Handstand</h3>
                                    <p className="text-xs text-stone-400">Atemberaubende Kraft und perfekte Balance.</p>
                                </div>
                            </div>

                            {/* Magie */}
                            <div className="as-short-card">
                                <div className="as-short-wrapper">
                                    <iframe src="https://www.youtube.com/embed/f6hCSr0qQJw" title="Magie" allowFullScreen loading="lazy"></iframe>
                                </div>
                                <div className="as-short-content text-center">
                                    <h3 className="text-lg font-bold text-[#EBD297] mb-1">Magie</h3>
                                    <p className="text-xs text-stone-400">Verblüffende Illusionen, wie der schwebende Tisch.</p>
                                </div>
                            </div>

                            {/* Rola Rola */}
                            <div className="as-short-card">
                                <div className="as-short-wrapper">
                                    <iframe src="https://www.youtube.com/embed/qzy-T_ti2wY" title="Rola Rola" allowFullScreen loading="lazy"></iframe>
                                </div>
                                <div className="as-short-content text-center">
                                    <h3 className="text-lg font-bold text-[#EBD297] mb-1">Rola Rola</h3>
                                    <p className="text-xs text-stone-400">Waghalsige Balanceakte auf der freistehenden Rolle.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* GALLERY CAROUSEL (UPDATED IMAGES) */}
                <section className="as-section as-reveal">
                    <h2>Impressionen</h2>
                    <div className="as-carousel-wrapper">
                        <div className="as-carousel-track" ref={trackRef}>
                            {[
                                "https://maximilianboy.de/wp-content/uploads/2020/11/akrobatik-maximilian-boy-005-1024x1024.jpg",
                                "https://maximilianboy.de/wp-content/uploads/2025/01/05_IMG-20241124-WA0142-768x1024.jpg",
                                "https://i0.wp.com/maximilianboy.de/wp-content/uploads/2025/01/20241123-limaex-ukongu-030-682x1024.jpg?strip=info&w=1333&ssl=1",
                                "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/09/Z62_3394-27.jpg",
                                "https://maximilianboy.de/wp-content/uploads/2025/01/08_IMG-20241124-WA0068-608x1024.jpg",
                                "https://maximilianboy.de/wp-content/uploads/2025/01/03_IMG-20241124-WA0126-619x1024.jpg",
                                "https://i0.wp.com/maximilianboy.de/wp-content/uploads/2025/01/20241123-limaex-ukongu-033-682x1024.jpg?strip=info&w=1333&ssl=1",
                                "https://i0.wp.com/maximilianboy.de/wp-content/uploads/2025/09/Bild-045-683x1024.jpg?strip=info&w=1707&ssl=1",
                                "https://maximilianboy.de/wp-content/uploads/2025/01/20241123-limaex-ukongu-024-682x1024.jpg",
                                "https://i0.wp.com/maximilianboy.de/wp-content/uploads/2025/09/Z62_3403-28-1024x682.jpg?strip=info&w=2000&ssl=1"
                            ].map((src, i) => (
                                <div className="as-carousel-item" key={i} onClick={() => handleImageClick(src)}>
                                    <img src={src} alt={`Gallery ${i}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className="as-section as-reveal">
                    <h2>Häufige Fragen</h2>
                    <div className="as-faq-container">
                        <div className="as-faq">
                            <details>
                                <summary>Ist eine Artistikshow überall möglich?</summary>
                                <p>Ja! Grundsätzlich kann diese Show überall vorführt werden. Für manche Nummern ist jedoch eine Deckenhöhe von mindestens 4,5m erforderlich. Allerdings ist diese Show sehr variabel, so dass sich auch bei normaler Deckenhöhe ein passendes Programm kreieren lässt.</p>
                            </details>
                            <details>
                                <summary>Wie viel Platz wird benötigt?</summary>
                                <p>Im Idealfall sollte die Fläche ca. 5m breit und 4m tief sein. Eine kleinere Fläche ist aber nach Absprache auch möglich.</p>
                            </details>
                            <details>
                                <summary>Wie lange dauert die Show?</summary>
                                <p>Die Showzeit beträgt ca. 30 Minuten.</p>
                            </details>
                            <details>
                                <summary>Was wird vor Ort an Technik benötigt?</summary>
                                <p>Ich bin weitgehend autark. Eine leistungsstarke Musikanlage (Akku oder Strom) und Lichttechnik für die Showfläche bringe ich mit. Ein Stromanschluss in der Nähe ist hilfreich, aber nicht zwingend notwendig.</p>
                            </details>
                        </div>
                    </div>
                </section>

            </div>

            {/* LIGHTBOX */}
            <div className={`as-lightbox ${lightboxSrc ? 'active' : ''}`} onClick={() => setLightboxSrc(null)}>
                {lightboxSrc && <img src={lightboxSrc} alt="Show" />}
            </div>
        </div>
    );
};

export default ArtistryShow;