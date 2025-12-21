import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
    'https://maximilianboy.de/mystaging02/wp-content/uploads/2025/01/20241123-limaex-ukongu-109.jpg'
];

const PublicEvents: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fs-reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Background Slider (8-Sekunden-Wechsel mit Crossfade)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Fixed Background Layer */}
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                {SLIDES.map((slide, idx) => (
                    <div
                        key={idx}
                        className="fs-slide"
                        style={{
                            backgroundImage: `url('${slide}')`,
                            opacity: idx === currentSlide ? 1 : 0
                        }}
                    />
                ))}
            </div>
            <style>{`
        /* Background Slides mit Crossfade */
        .fs-slide {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center -100px;
            background-repeat: no-repeat;
            transition: opacity 2000ms ease-in-out;
            filter: blur(3px) brightness(0.3);
            transform: scale(1.02);
        }

        /* === BASIS CSS === */
        .public-events-wrapper {
            font-family: 'Montserrat', sans-serif !important;
            color: #EBD297;
            line-height: 1.6;
            text-align: center;
            /* Neutraler, edler Hintergrund */
            background: transparent;
            width: 100%;
            min-height: 100vh;
            position: relative;
            z-index: 1;
            padding: 8rem 1rem 4rem; /* Adjusted top padding for navbar */
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .public-events-wrapper * {
            box-sizing: border-box;
        }

        /* Typografie */
        .fs-hero-title {
            font-size: clamp(2.2rem, 5vw, 3.5rem) !important;
            margin-bottom: 0.5rem !important;
            color: #EBD297 !important;
            font-weight: 700 !important;
            text-shadow: 0 2px 8px rgba(0,0,0,0.8) !important;
            font-family: 'Cinzel', serif !important;
        }

        .fs-hero-sub {
            font-size: clamp(1.1rem, 2vw, 1.3rem) !important;
            color: #f7f7f7 !important;
            max-width: 700px;
            margin: 0 auto 4rem !important;
            opacity: 0.9;
        }

        /* === SPLIT LAYOUT CONTAINER === */
        .fs-content-split {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3rem;
            max-width: 1100px;
            width: 100%;
            margin-bottom: 4rem;
        }

        @media (min-width: 900px) {
            .fs-content-split {
                flex-direction: row;
                align-items: flex-start; /* Oben bündig */
                justify-content: center;
            }
        }

        /* === LINKER BEREICH: DAS BILD (Humorvoll) === */
        .fs-image-col {
            flex: 1;
            max-width: 400px; /* Bild kleiner machen */
            position: relative;
        }

        .fs-image-wrap {
            position: relative;
            display: inline-block;
            width: 100%;
            transform: rotate(-2deg); /* Leicht schräg für lockeren Look */
            transition: transform 0.3s ease;
        }

        .fs-image-wrap:hover {
            transform: rotate(0deg) scale(1.02);
        }

        .fs-sign-image {
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            border: 2px solid rgba(235, 210, 151, 0.1);
            display: block;
        }

        /* KI Sticker – zerrissenes Papier, schräg top-right, transluzent */
        .fs-ai-sticker {
            position: absolute;
            top: 14px;
            right: -36px;
            z-index: 12;
            transform: rotate(45deg);
            display: inline-block;
            /* Markenfarben: goldener Papier-Ton mit leichter Transparenz */
            background: linear-gradient(135deg, rgba(235, 210, 151, 0.92) 0%, rgba(212, 181, 106, 0.9) 100%);
            color: #121212; /* dunkler Website-Grundton für Lesbarkeit */
            padding: 4px 24px;
            font-size: 11px;
            font-weight: 700;
            font-family: 'Cinzel', serif;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            border: 1px solid rgba(0,0,0,0.25);
            border-radius: 6px;
            box-shadow: 0 5px 12px rgba(0,0,0,0.35);
            backdrop-filter: blur(2px);
            pointer-events: none;
            /* Zerrissene Kanten mit stärkerem, unregelmäßigem Clip-Path */
            clip-path: polygon(
                0% 12%, 3% 0%, 7% 10%, 12% 2%, 18% 11%, 24% 1%, 30% 9%, 36% 3%, 42% 12%, 48% 0%,
                54% 10%, 60% 2%, 66% 11%, 72% 1%, 78% 9%, 84% 2%, 90% 12%, 96% 0%, 100% 8%,
                100% 88%, 96% 100%, 90% 90%, 84% 98%, 78% 89%, 72% 99%, 66% 90%, 60% 98%, 54% 88%, 48% 100%,
                42% 90%, 36% 98%, 30% 89%, 24% 99%, 18% 90%, 12% 98%, 7% 88%, 3% 100%, 0% 92%
            );
            /* leichte innere Schattierung für Papier-Tiefe + goldene Innenlinie */
            box-shadow:
                inset 0 0 0 1.25px rgba(235, 210, 151, 0.6), /* edler, heller Goldinnenrand */
                inset 0 -2px 4px rgba(0,0,0,0.06),
                0 5px 12px rgba(0,0,0,0.35),
                0 0 10px rgba(235, 210, 151, 0.2); /* dezenter goldener Glow */
        }

        .fs-ai-sticker::before,
        .fs-ai-sticker::after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
        }
        /* kleine Abschlussdreiecke für einen realen Aufkleber-Look */
        /* dezente Papiertextur überlagern */
        .fs-ai-sticker::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 6px;
            /* fein goldige Papierkörnung passend zur Seite */
            background-image:
                radial-gradient(rgba(150, 120, 60, 0.06) 1px, transparent 1px),
                radial-gradient(rgba(235, 210, 151, 0.08) 1px, transparent 1px);
            background-size: 3px 3px, 7px 7px;
            mix-blend-mode: multiply;
            opacity: 0.55;
            pointer-events: none;
        }
        /* gold schimmernder Rand */
        .fs-ai-sticker::after {
            content: "";
            position: absolute;
            inset: -4px; /* stärkerer Rand als das Papier */
            border-radius: 6px;
            clip-path: polygon(
                0% 12%, 3% 0%, 7% 10%, 12% 2%, 18% 11%, 24% 1%, 30% 9%, 36% 3%, 42% 12%, 48% 0%,
                54% 10%, 60% 2%, 66% 11%, 72% 1%, 78% 9%, 84% 2%, 90% 12%, 96% 0%, 100% 8%,
                100% 88%, 96% 100%, 90% 90%, 84% 98%, 78% 89%, 72% 99%, 66% 90%, 60% 98%, 54% 88%, 48% 100%,
                42% 90%, 36% 98%, 30% 89%, 24% 99%, 18% 90%, 12% 98%, 7% 88%, 3% 100%, 0% 92%
            );
            background: conic-gradient(
                from 0deg,
                rgba(255, 248, 213, 0.98) 0deg,
                rgba(235, 210, 151, 0.98) 18deg,
                rgba(201, 162, 78, 0.95) 35deg,
                rgba(255, 248, 213, 0.98) 52deg,
                rgba(235, 210, 151, 0.98) 85deg,
                rgba(201, 162, 78, 0.95) 120deg,
                rgba(255, 248, 213, 0.98) 150deg,
                rgba(235, 210, 151, 0.98) 190deg,
                rgba(201, 162, 78, 0.95) 225deg,
                rgba(255, 248, 213, 0.98) 260deg,
                rgba(235, 210, 151, 0.98) 300deg,
                rgba(201, 162, 78, 0.95) 330deg,
                rgba(255, 248, 213, 0.98) 360deg
            );
            filter: blur(0.2px);
            opacity: 0.95;
            pointer-events: none;
            z-index: -1; /* hinter dem Papier, rund um die Kante sichtbar */
            animation: fs-shimmer-rotate 10s linear infinite; /* eleganter, langsamerer Schimmer */
        }

        @keyframes fs-shimmer-rotate {
            to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
            .fs-ai-sticker::after { animation: none; }
        }

        @media (max-width: 600px) {
            .fs-ai-sticker {
                top: 10px;
                right: -30px;
                padding: 3px 20px;
                font-size: 10px;
                box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.3);
            }
        }

        /* Subtext unter dem Bild */
        .fs-fun-subtext {
            margin-top: 10px;
            font-size: 0.85rem;
            color: #888;
            font-style: italic;
        }

        /* === RECHTER BEREICH: DIE TERMINE === */
        .fs-dates-col {
            flex: 1.5;
            width: 100%;
            max-width: 600px;
        }

        .fs-dates-header {
            text-align: left;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #EBD297;
            padding-bottom: 0.5rem;
            display: inline-block;
            font-size: 1.5rem;
            color: #fff;
            font-family: 'Cinzel', serif !important;
        }

        /* Karte Design */
        .fs-date-card {
            display: flex;
            flex-direction: row; /* Immer nebeneinander für bessere Lesbarkeit */
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(235, 210, 151, 0.2);
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: all 0.3s ease;
            text-align: left;
        }

        .fs-date-card:hover {
            background: rgba(235, 210, 151, 0.1);
            transform: translateX(5px);
            border-color: #EBD297;
        }

        /* Datum Box */
        .fs-date-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-width: 80px;
            padding-right: 1.5rem;
            border-right: 1px solid rgba(255,255,255,0.1);
            margin-right: 1.5rem;
        }

        .fs-date-day {
            font-size: 1.8rem;
            font-weight: 800;
            color: #EBD297;
            line-height: 1;
            margin-bottom: 5px;
            font-family: 'Cinzel', serif !important;
        }
        .fs-date-year {
            font-size: 0.8rem;
            color: #bbb;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: center;
        }

        /* Info Text */
        .fs-date-info h3 {
            font-size: 1.3rem !important;
            margin: 0 0 0.5rem !important;
            color: #fff !important;
            font-weight: 700 !important;
            font-family: 'Montserrat', sans-serif !important;
        }

        .fs-date-location {
            color: #EBD297 !important;
            font-weight: 600;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.2rem;
        }

        /* Mobile Anpassung */
        @media (max-width: 600px) {
            .fs-date-card {
                flex-direction: column;
                align-items: flex-start;
            }
            .fs-date-box {
                flex-direction: row;
                border-right: none;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding-right: 0;
                margin-right: 0;
                padding-bottom: 10px;
                margin-bottom: 10px;
                width: 100%;
                justify-content: flex-start;
                gap: 15px;
            }
            .fs-date-year {
                text-align: left;
            }
        }

        /* Footer & Buttons */
        .fs-cta-button {
            display: inline-block !important;
            padding: 12px 28px !important;
            background: linear-gradient(135deg, #EBD297 0%, #d4b56a 100%) !important;
            color: #000000 !important; 
            border-radius: 50px !important;
            font-weight: 700 !important;
            border: none !important;
            text-decoration: none !important;
            transition: all .3s ease !important;
            font-size: 1.1rem !important;
            text-transform: uppercase;
            margin-top: 1.5rem;
            font-family: 'Montserrat', sans-serif !important;
        }
        .fs-cta-button:hover {
            transform: translateY(-2px);
            background: linear-gradient(135deg, #fcebbb 0%, #EBD297 100%) !important;
        }
        
        .fs-footer-note {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(235, 210, 151, 0.2);
            max-width: 600px;
            margin-top: 2rem;
        }
        .fs-footer-note h3 {
            color: #EBD297 !important;
            margin: 0 0 1rem !important;
            font-size: 1.5rem !important;
            font-family: 'Cinzel', serif !important;
        }
        .fs-footer-note p {
            color: #e5e5e5 !important;
        }

        /* Animation */
        .fs-reveal { opacity: 0; transform: translateY(20px); transition: opacity .8s ease, transform .8s ease; }
        .fs-reveal.show { opacity: 1; transform: translateY(0); }
      `}</style>

            <div className="public-events-wrapper">

                {/* HERO HEADER */}
                <h1 className="fs-hero-title">Öffentliche Termine</h1>
                <p className="fs-hero-sub">Erleben Sie unsere Shows live. Hier finden Sie alle kommenden öffentlichen Auftritte.</p>

                {/* SPLIT CONTENT */}
                <div className="fs-content-split fs-reveal">

                    {/* LINKS: DAS BILD (Humorvoll) */}
                    <div className="fs-image-col">
                        <div className="fs-image-wrap">
                            <img className="fs-sign-image" src="https://maximilianboy.de/mystaging02/wp-content/uploads/2025/11/Gemini_Generated_Image_p5bt4yp5bt4yp5bt.png" alt="Termin Schild" />
                            <span className="fs-ai-sticker" aria-label="KI generiert">*KI generiert</span>
                        </div>
                        <div className="fs-fun-subtext">Schwerstarbeit für Ihre Unterhaltung.</div>
                    </div>

                    {/* RECHTS: DIE TERMINE */}
                    <div className="fs-dates-col">
                        <h2 className="fs-dates-header">Nächste Shows</h2>

                        {/* TERMIN 1 */}
                        <div className="fs-date-card">
                            <div className="fs-date-box">
                                <div className="fs-date-day">31.12.</div>
                                <div className="fs-date-year">
                                    2025<br />MITTWOCH
                                </div>
                            </div>
                            <div className="fs-date-info">
                                <div className="fs-date-location">📍 Nürnberg PARKS</div>
                                <h3>Neujahres Feuershow</h3>
                                <p style={{ margin: 0, opacity: 0.8 }}>Ein feuriger Start ins neue Jahr.</p>
                            </div>
                        </div>

                        {/* Placeholder for more events */}
                        {/* 
                  <div className="fs-date-card">
                      <div className="fs-date-box">
                          <div className="fs-date-day">15.06.</div>
                          <div className="fs-date-year">2026<br>SAMSTAG</div>
                      </div>
                      <div className="fs-date-info">
                          <div className="fs-date-location">📍 Stadtfest Beispiel</div>
                          <h3>Große Gala Show</h3>
                      </div>
                  </div> 
                  */}

                    </div>
                </div>

                {/* FOOTER NOTE */}
                <div className="fs-footer-note fs-reveal">
                    <h3>Kein passender Termin?</h3>
                    <p>Buchen Sie uns exklusiv für Ihre eigene Veranstaltung, Hochzeit oder Firmenfeier.</p>
                    <Link className="fs-cta-button" to="/booking-request">Verfügbarkeit prüfen</Link>
                </div>

            </div>
        </div>
    );
};

export default PublicEvents;