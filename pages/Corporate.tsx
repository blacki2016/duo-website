import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Users, TrendingUp, Star } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

const TESTIMONIALS_CORPORATE = [
    {
        name: "Vertres GmbH",
        event: "Weihnachtsfeier",
        text: "Herr Boy hat unsere Weihnachtsfeier mit einer gigantischen Feuershow zum Highlight gemacht. Wir waren begeistert von der Mischung aus Witz und Kunst. Für zukünftige Veranstaltungen ist er fest vorgemerkt.",
        logo: `${import.meta.env.BASE_URL}images/goldi.png`
    },
    {
        name: "Wust Wind Sonne",
        event: "Firmenfest",
        text: "Alles lief reibungslos! Seine Akrobatikshow hat Jung und Alt begeistert. Eine gute Mischung aus Spannung und Humor machte die Show sehr kurzweilig. Beim nächsten Mal buchen wir definitiv die Feuershow!",
        logo: `${import.meta.env.BASE_URL}images/wustwindsonne.png`,
    },
    {
        name: "Firma aus Crailsheim",
        event: "Firmenfeier",
        text: "Super netter Kontakt! Pünktlich und Zuverlässig. Der Auftritt war sehr gut und auch sehr unterhaltsam.",
        customIcon: <span className="font-serif font-bold text-xl">F</span>
    }
];

const Corporate: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const SLIDES = [
        `${import.meta.env.BASE_URL}images/heroslider1.jpg`
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col text-stone-200 overflow-hidden">
            <style>{`
        @keyframes pulse-strong {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-strong {
          animation: pulse-strong 2s ease-in-out infinite;
        }
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
      `}</style>

            {/* Global Background */}
            <div className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none">
                {SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            backgroundImage: `url('${slide}')`,
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Hero Section - Corporate */}
            <header className="relative w-full h-screen overflow-hidden flex items-center justify-center mt-[50px] z-10">
                <div className="relative text-center px-4 max-w-6xl mx-auto">
                    <span className="block text-gold-400 font-bold tracking-wider uppercase mb-6 animate-fade-in-up text-lg md:text-xl lg:text-2xl drop-shadow-md">
                        Dein Event braucht einen Knalleffekt
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold mb-8 leading-tight drop-shadow-2xl uppercase text-white">
                        SPEKTAKULÄRE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-gold-300 filter drop-shadow-lg">
                            UNTERNEHMENS-SHOWS
                        </span>
                    </h1>

                    {/* Animated Zap */}
                    <div className="flex justify-center mb-12">
                        <Zap className="w-20 h-20 text-yellow-400 fill-yellow-400 animate-pulse-strong" />
                    </div>

                    <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                        Feuershows, Artistik & Comedy-Entertainment speziell für Firmenfeste, Konferenzen und Teamevents.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/buchung-anfragen"
                            className="btn-lively px-10 py-4 text-base md:text-lg tracking-widest rounded-full flex items-center justify-center gap-3"
                        >
                            Unverbindlich anfragen <span className="text-xl">📊</span>
                        </Link>
                        <Link
                            to="/showformate"
                            className="btn-lively px-10 py-4 text-base md:text-lg tracking-widest rounded-full flex items-center justify-center gap-3"
                        >
                            Alle Shows <span className="text-xl">🎭</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Wrapper for content */}
            <div className="relative w-full bg-stone-950">
                <div className="relative z-10">

                    {/* USPs für Firmenfeste */}
                    <section className="py-20 px-4 bg-transparent border-t border-white/5">
                        <div className="container mx-auto">
                            <h2 className="text-center text-3xl font-serif font-bold text-white mb-16">
                                <span className="text-[#ebd297]">Corporate Entertainment</span> mit Impact
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                                {[
                                    {
                                        icon: <TrendingUp className="w-full h-full text-[#ebd297]" />,
                                        title: "Markenwert steigern",
                                        desc: "Spektakuläre Showeffekte, die deine Firmenidentität widerspiegeln. Ihr Logo kann buchstäblich im Feuer brennen."
                                    },
                                    {
                                        icon: <Users className="w-full h-full text-[#ebd297]" />,
                                        title: "Team-Highlight",
                                        desc: "Ein gemeinsames Erlebnis, das Mitarbeiter und Kunden begeistert. Professionell, unterhaltsam und unvergesslich."
                                    },
                                    {
                                        icon: <Zap className="w-full h-full text-[#ebd297]" />,
                                        title: "All-Inclusive Service",
                                        desc: "Ton- & Lichttechnik inklusive. Ich kümmere mich um alles – du genießt die Show mit deinen Gästen."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-[#ebd297]/10 hover:border-[#ebd297]/40 transition-colors shadow-lg group">
                                        <div className="mb-6 h-32 w-full flex items-center justify-center shrink-0">
                                            <div className="h-28 w-28 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(235,210,151,0.2)]">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#ebd297] mb-3">{item.title}</h3>
                                        <p className="text-stone-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Show Formate für Corporate */}
                    <section className="py-20 px-4 bg-transparent border-t border-white/5">
                        <div className="container mx-auto text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold text-white mb-2">Show-Formate für dein Event</h2>
                            <p className="text-[#ebd297] uppercase tracking-widest text-sm">Maßgeschneidert für deine Firma</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {[
                                {
                                    title: "Feuershow Premium",
                                    desc: "20-30 Min. spektakuläre Show mit deinem Branding, professionellem Sound und Lichttechnik."
                                },
                                {
                                    title: "Artistik & Comedy",
                                    desc: "Akrobatik meets Humor – perfekt für lockerer Unternehmensveranstaltungen und Teamfeste."
                                },
                                {
                                    title: "Walk Act",
                                    desc: "Interaktive Unterhaltung während des Events mit Ballonmodellage und persönlichem Kontakt."
                                },
                                {
                                    title: "Custom Programm",
                                    desc: "Alles ist möglich! Von Gangschau bis Überraschungs-Performance – wir entwickeln dein Traumformat."
                                }
                            ].map((show, idx) => (
                                <div key={idx} className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-[#ebd297]/10 hover:border-[#ebd297]/30 transition-colors">
                                    <h3 className="text-xl font-bold text-[#ebd297] mb-3">{show.title}</h3>
                                    <p className="text-stone-300 leading-relaxed text-sm">{show.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Testimonials - Corporate */}
                    <section className="py-20 px-4 bg-transparent border-t border-white/5">
                        <div className="container mx-auto text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold text-white mb-2">Was Unternehmungen sagen</h2>
                            <p className="text-[#ebd297] uppercase tracking-widest text-sm">Zufriedene Veranstalter</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {TESTIMONIALS_CORPORATE.map((t, i) => (
                                <div key={i} className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-[#ebd297]/10 hover:border-[#ebd297]/30 transition-colors flex flex-col">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, starI) => (
                                            <Star key={starI} className="w-4 h-4 text-[#ebd297] fill-[#ebd297]" />
                                        ))}
                                    </div>
                                    <p className="text-stone-300 italic mb-4 leading-relaxed flex-grow text-sm">
                                        "{t.text}"
                                    </p>
                                    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                                        {t.logo ? (
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                <img src={t.logo} alt={t.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[#ebd297]/20 flex items-center justify-center text-[#ebd297] font-bold font-serif text-xs">
                                                {t.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{t.name}</h4>
                                            <span className="text-xs text-[#ebd297] uppercase tracking-wider">{t.event}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-24 px-4 bg-transparent">
                        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-black/50 border border-[#ebd297]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] text-center">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#ebd297] mb-6">Lass dein Event knallen</h2>
                            <p className="text-stone-300 mb-8 text-lg">Kontaktiere mich für ein unverbindliches Angebot.</p>
                            <Link
                                to="/buchung-anfragen"
                                className="btn-lively inline-block px-10 py-4 text-black font-bold rounded-full hover:scale-105 transition-transform"
                            >
                                Jetzt anfragen
                            </Link>
                        </div>
                    </section>

                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Corporate;
