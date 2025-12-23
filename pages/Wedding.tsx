import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Music, Star } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

const TESTIMONIALS_WEDDING = [
    {
        name: "Patrick",
        event: "Hochzeit",
        text: "Eine Wahnsinns-Feuershow als Überraschung! Wir kamen aus dem Staunen nicht heraus. Max gestaltet die Show so amüsant, dass Klein und Groß viel gelacht haben. Ein tolles Highlight und eine große Empfehlung!",
        customIcon: <span className="font-serif font-bold text-xl">P</span>
    },
    {
        name: "Julia B.",
        event: "Hochzeit",
        text: "Super Entertainer! Musik und Show auf Wunsch, gutes Preis/Leistungsverhältnis. Freunde und ich waren absolut begeistert. Zudem super freundlich und super beraten. Kann ich nur weiter empfehlen!",
        customIcon: <span className="font-serif font-bold text-xl">J</span>
    },
    {
        name: "Hochzeitspaar",
        event: "Bayreuth / Thurnau",
        text: "Ein Feuerwerk mit Witz und Kunst! Geduldig, professionell und zuvorkommend in der Planung. Man muss sich um nichts kümmern, inkl. Sicherheit. Absolut empfehlenswert!",
        customIcon: <span className="font-serif font-bold text-xl">H</span>
    },
    {
        name: "Private Feier",
        event: "Hochzeit",
        text: "Originelle Show der etwas anderen Art; sehr netter Künstler; absolut weiterzuempfehlen; Preis-/ Leistungsverhältnis ist angemessen und nicht überzogen.",
        customIcon: <span className="font-serif font-bold text-xl">P</span>
    }
];

const Wedding: React.FC = () => {
    const BG_IMAGE = '/images/hochzeit.test.png';

    return (
        <div className="relative min-h-screen flex flex-col text-stone-200 overflow-hidden">
            <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
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

            {/* Global Background (static image, no slider) */}
            <div className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${BG_IMAGE}')` }}
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Hero Section - Hochzeit */}
            <header className="relative w-full h-screen overflow-hidden flex items-center justify-center mt-[50px] z-10">
                <div className="relative text-center px-4 max-w-6xl mx-auto">
                    <span className="block text-gold-400 font-bold tracking-wider uppercase mb-6 animate-fade-in-up text-lg md:text-xl lg:text-2xl drop-shadow-md">
                        Das perfekte Highlight für deinen großen Tag
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold mb-8 leading-tight drop-shadow-2xl uppercase text-white">
                        FEUER, LIEBE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-gold-300 filter drop-shadow-lg">
                            UND EIN BRENNENDES HERZ!
                        </span>
                    </h1>

                    {/* Animated Heart */}
                    <div className="flex justify-center mb-12">
                        <Heart className="w-20 h-20 text-red-500 fill-red-500 animate-heartbeat" />
                    </div>

                    <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                        Eine spektakuläre Feuershow als emotionales Highlight für eure Hochzeit. Romantisch, sicher und unvergesslich.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/booking-request"
                            className="btn-lively px-10 py-4 text-base md:text-lg tracking-widest rounded-full flex items-center justify-center gap-3"
                        >
                            Unverbindlich anfragen <span className="text-xl">💕</span>
                        </Link>
                        <Link
                            to="/feuershow"
                            className="btn-lively px-10 py-4 text-base md:text-lg tracking-widest rounded-full flex items-center justify-center gap-3"
                        >
                            Feuershow Details <span className="text-xl">🔥</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Wrapper for content */}
            <div className="relative w-full bg-stone-950">
                <div className="relative z-10">

                    {/* USPs für Hochzeiten */}
                    <section className="py-20 px-4 bg-transparent border-t border-white/5">
                        <div className="container mx-auto">
                            <h2 className="text-center text-3xl font-serif font-bold text-white mb-16">
                                Warum eine <span className="text-[#ebd297]">Feuershow zur Hochzeit</span>?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                                {[
                                    {
                                        icon: <Heart className="w-full h-full text-[#ebd297]" />,
                                        title: "Romantischer Moment",
                                        desc: "Das Feuer brennt für eure Liebe. Ein emotionales Highlight, das euer Brautpaar und die Gäste nie vergessen werden."
                                    },
                                    {
                                        icon: <Music className="w-full h-full text-[#ebd297]" />,
                                        title: "Zur Musik choreographiert",
                                        desc: "Die Show wird zu eurer Lieblingsmusik getanzt. Perfekt abgestimmt auf den Moment – ob Lied-Überraschung oder Timing."
                                    },
                                    {
                                        icon: <Star className="w-full h-full text-[#ebd297]" />,
                                        title: "100% Sicherheit",
                                        desc: "Ausgebildeter Bühnenpyrotechniker mit Zertifikat. Alle Gäste und Locations sind bestens geschützt."
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

                    {/* Testimonials - Hochzeiten */}
                    <section className="py-20 px-4 bg-transparent border-t border-white/5">
                        <div className="container mx-auto text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold text-white mb-2">Was Brautpaare sagen</h2>
                            <p className="text-[#ebd297] uppercase tracking-widest text-sm">5-Sterne Bewertungen</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {TESTIMONIALS_WEDDING.map((t, i) => (
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
                                        <div className="w-10 h-10 rounded-full bg-[#ebd297]/20 flex items-center justify-center text-[#ebd297] font-bold font-serif text-xs">
                                            {t.customIcon}
                                        </div>
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
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#ebd297] mb-6">Bereit für das Abenteuer?</h2>
                            <p className="text-stone-300 mb-8 text-lg">Lass uns deinen großen Tag unvergesslich machen.</p>
                            <Link
                                to="/booking-request"
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

export default Wedding;
