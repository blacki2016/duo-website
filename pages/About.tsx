
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

// --- BILDER & ASSETS ---
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/schatten3.png`;
const PORTRAIT_BOTH = `${import.meta.env.BASE_URL}images/maxleo.jpg`;
const IMAGE_LEO = `${import.meta.env.BASE_URL}images/leo.jpg.webp`;
const IMAGE_MAX = `${import.meta.env.BASE_URL}images/max.jpg.webp`;
const BACKGROUND_IMAGE = `${import.meta.env.BASE_URL}images/hinter.ueber.png`;

// --- DATEN ---

const About: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'leo' | 'max'>('leo');

    const scrollToContent = () => {
        document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-screen bg-stone-900 text-stone-200 font-sans selection:bg-[#ebd297] selection:text-black overflow-x-hidden">

            {/* Fixed Background Image Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')`, backgroundAttachment: 'fixed' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-stone-900/40 to-stone-900"></div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        
        .text-gold-gradient {
            background: linear-gradient(135deg, #ebd297 0%, #C8A663 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .glass-card {
            background: rgba(30, 30, 30, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(235, 210, 151, 0.1);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .btn-gold {
            background: linear-gradient(135deg, #8E6F34 0%, #C8A663 50%, #8E6F34 100%);
            background-size: 200% auto;
            transition: all 0.5s ease;
        }
        .btn-gold:hover {
            background-position: right center;
            box-shadow: 0 0 25px rgba(200, 166, 99, 0.7);
            transform: translateY(-2px);
        }

        .btn-glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
                .btn-glass:hover {
                        background: rgba(235, 210, 151, 0.9);
                        color: black;
                        border-color: #ebd297;
                        box-shadow: 0 0 20px rgba(235, 210, 151, 0.4);
                        transform: translateY(-2px);
                }
    `}</style>

            <div className="relative z-10">

                {/* --- TEIL 1: NEUER CODE (Hero & Story) --- */}

                {/* 1. HERO SECTION */}
                <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105"
                        style={{
                            backgroundImage: `url('${HERO_IMAGE}')`,
                            backgroundPosition: 'center 30%'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-stone-900/40 to-stone-900 z-10"></div>
                    </div>

                    <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-10">
                        <span className="block text-[#ebd297] text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
                            Hinter den Kulissen
                        </span>
                        <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-white mb-6 drop-shadow-2xl leading-tight">
                            Mehr als nur <br />
                            <span className="text-gold-gradient italic">Illusion.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#fcedc3] font-semibold max-w-2xl mx-auto mb-10 leading-relaxed">
                            <strong className="text-[#fcedc3] font-semibold">Wir sind das Duo Limäx. 2 Freunde, 1 Vision und 1000 magische Momente. Hier ist unsere Geschichte:</strong>
                        </p>

                        <button
                            onClick={scrollToContent}
                            className="group flex flex-col items-center gap-2 mx-auto text-stone-400 hover:text-[#ebd297] transition-colors"
                        >
                            <span className="text-xs uppercase tracking-widest">Die Story</span>
                            <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-[#ebd297]" />
                        </button>
                    </div>
                </header>

                {/* 2. DIE STORY (Overlap Section) */}
                <section id="our-story" className="relative z-30 -mt-32 pb-20 px-4 md:px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="glass-card rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-[#ebd297]/15">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                                    <img src={PORTRAIT_BOTH} alt="Max und Leo" className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#0f0f0f80] to-transparent lg:bg-gradient-to-r lg:from-[#0f0f0f]/80 lg:via-transparent lg:to-[#1e1e1e]"></div>
                                </div>
                                <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-[#111] via-[#181818] to-[#0c0c0c] border-l border-[#ebd297]/10">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ebd297]/15 border border-[#ebd297]/40 text-[#fcedc3] text-xs uppercase tracking-[0.25em] w-fit mb-4">
                                        Unsere Story
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-cinzel font-bold text-[#fcedc3] mb-4 leading-tight drop-shadow-lg">Vom Solo-Keller zur gemeinsamen Bühne</h2>
                                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ebd297] to-transparent mb-8 shadow-[0_0_16px_#ebd297]"></div>
                                    <div className="space-y-6 text-[#f8edd0] text-lg font-light leading-relaxed">
                                        <p>
                                            <span className="text-[#ebd297] font-bold text-xl float-left mr-2 mt-[-6px] font-cinzel">W</span>
                                            enn man uns früher gefragt hätte, ob wir ein Duo gründen wollen, hätten wir beide dankend abgelehnt. Wir haben unsere Solo-Shows geliebt und die fehlenden Absprachen genossen. Doch so schnell wie unsere Freundschaft entstand, war plötzlich klar: Wir kommen an der gemeinsamen Arbeit nicht vorbei.
                                        </p>
                                        <p>
                                            Was bei jedem von uns einzeln als Tüftelei im Keller begann, mündete schließlich in unserem ersten gemeinsamen Abendprogramm "UKONGU"!
                                        </p>
                                        <p>
                                            Unser Anspruch ist dabei geblieben: Keine Klischees, keine „Hase-aus-dem-Hut“-Nummern. Mit einer gehörigen Portion Perfektionismus haben wir Entertainment für uns neu definiert. Das Ergebnis ist keine klassische Zirkusnummer, sondern eine Symbiose aus Comedy und Artistik – entstanden aus jahrelanger Zusammenarbeit hinter (und nun auch auf) den Kulissen.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- TEIL 2: DIE KÖPFE (Tab-basiert) --- */}
                <section className="py-20 relative bg-transparent">
                    <div className="container mx-auto px-4 max-w-5xl">

                        {/* Tab Buttons */}
                        <div className="flex justify-center gap-4 mb-12">
                            <button
                                onClick={() => setActiveTab('leo')}
                                className={`px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg ${activeTab === 'leo'
                                    ? 'bg-[#ebd297] text-black shadow-[0_10px_30px_rgba(235,210,151,0.35)]'
                                    : 'bg-black/40 text-stone-400 hover:text-white border border-[#ebd297]/30'
                                    }`}
                            >
                                Leo Wieseckel
                            </button>
                            <button
                                onClick={() => setActiveTab('max')}
                                className={`px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg ${activeTab === 'max'
                                    ? 'bg-[#ebd297] text-black shadow-[0_10px_30px_rgba(235,210,151,0.35)]'
                                    : 'bg-black/40 text-stone-400 hover:text-white border border-[#ebd297]/30'
                                    }`}
                            >
                                Maximilian Boy
                            </button>
                        </div>

                        {/* Leo Wieseckel */}
                        {activeTab === 'leo' && (
                            <div className="artist-card grid md:grid-cols-2 gap-12 items-center mb-16">
                                <div className="order-2 md:order-1">
                                    <div className="bg-black/50 border border-[#ebd297]/30 rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_18px_45px_rgba(0,0,0,0.5)]">
                                        <img
                                            src={IMAGE_LEO}
                                            alt="Leo Wieseckel"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="order-1 md:order-2 space-y-6">
                                    <div>
                                        <h3 className="text-4xl font-cinzel font-bold text-[#ebd297] mb-2">Leo Wieseckel</h3>
                                        <p className="text-sm uppercase tracking-[0.2em] text-[#f2dba8]">Magie • Kreation • Vision</p>
                                    </div>
                                    <p className="text-lg text-[#f8edd0] leading-relaxed">
                                        Die Magie ist sein Leben. Der aus Erlangen stammende Jungmagier war schon immer an besonderen Bühnenshows sowie an skurrilen Tricks interessiert. Standard gibt es für ihn nicht!
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <span className="w-2 h-2 bg-[#ebd297] rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(235,210,151,0.7)]"></span>
                                            <div>
                                                <p className="font-bold text-[#fcedc3] mb-1">Erfinder & Ideengeber</p>
                                                <p className="text-[#f8edd0] text-sm">Entwickelt kontinuierlich neue Showacts und baut faszinierende Illusionen</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="w-2 h-2 bg-[#ebd297] rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(235,210,151,0.7)]"></span>
                                            <div>
                                                <p className="font-bold text-[#fcedc3] mb-1">Musikalisches Talent</p>
                                                <p className="text-[#f8edd0] text-sm">Begleitet Shows meisterhaft am Klavier und mit anderen Instrumenten</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="w-2 h-2 bg-[#ebd297] rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(235,210,151,0.7)]"></span>
                                            <div>
                                                <p className="font-bold text-[#fcedc3] mb-1">Visionär</p>
                                                <p className="text-[#f8edd0] text-sm">Treibt ständig die Grenzen der Kreativität voran – Humor und Innovation garantiert</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Maximilian Boy */}
                        {activeTab === 'max' && (
                            <div className="artist-card grid md:grid-cols-2 gap-12 items-center mb-16">
                                <div className="order-1 md:order-1 space-y-6">
                                    <div>
                                        <h3 className="text-4xl font-cinzel font-bold text-[#ebd297] mb-2">Maximilian Boy</h3>
                                        <p className="text-sm uppercase tracking-[0.2em] text-[#f2dba8]">Performance • Organisation • Leadership</p>
                                    </div>
                                    <p className="text-lg text-[#f8edd0] leading-relaxed">
                                        Sich ständig weiterzuentwickeln und niemals auf der Stelle stehen ist sein Motto. Bereits in den Jahren als Solokünstler war es ihm immer wichtig voranzukommen und ständig neue Showelemente zu kreieren.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <span className="w-2 h-2 bg-[#ebd297] rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(235,210,151,0.7)]"></span>
                                            <div>
                                                <p className="font-bold text-[#fcedc3] mb-1">Jonglage & Akrobatik</p>
                                                <p className="text-[#f8edd0] text-sm">Jonglage mit verschiedensten Gegenständen, Handstandakrobatik und Rola Bola</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="w-2 h-2 bg-[#ebd297] rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(235,210,151,0.7)]"></span>
                                            <div>
                                                <p className="font-bold text-[#fcedc3] mb-1">Kreativität & Innovation</p>
                                                <p className="text-[#f8edd0] text-sm">Kontinuierlich neue Showelemente kreieren und die Grenzen weiter verschieben</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="w-2 h-2 bg-[#ebd297] rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(235,210,151,0.7)]"></span>
                                            <div>
                                                <p className="font-bold text-[#fcedc3] mb-1">Moderation & Organisation</p>
                                                <p className="text-[#f8edd0] text-sm">Moderationstalent mit ausgeprägten Fähigkeiten in Szenenentwicklung und Organisation</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-2 md:order-2 bg-black/50 border border-[#ebd297]/30 rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_18px_45px_rgba(0,0,0,0.5)]">
                                    <img
                                        src={IMAGE_MAX}
                                        alt="Maximilian Boy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                {/* --- TEIL 3: UNTEN (Kontakt) --- */}
                <section className="py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1a1a1a] to-transparent -z-20"></div>

                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto bg-[#111] border border-[#ebd297]/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-[0_0_100px_rgba(235,210,151,0.1)]">

                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ebd297] to-transparent opacity-50"></div>
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ebd297]/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#ebd297]/5 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white mb-6">
                                    Euer Event.<br /><span className="text-[#ebd297]">Unser Highlight.</span>
                                </h2>
                                <p className="text-stone-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
                                    Ob exklusive Gala, romantische Hochzeit oder großes Stadtfest – wir kreieren den Moment, über den Ihre Gäste noch lange sprechen werden.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <Link to="/buchung-anfragen" className="btn-gold px-12 py-5 text-black font-bold rounded-sm uppercase tracking-wider text-lg shadow-[0_10px_30px_rgba(235,210,151,0.3)] hover:shadow-[0_15px_40px_rgba(235,210,151,0.5)] transform hover:-translate-y-1 transition-all">
                                        Termin Anfragen
                                    </Link>
                                    <a href="tel:015785585713" className="btn-glass px-10 py-5 text-white font-bold rounded-sm uppercase tracking-wider flex items-center gap-3">
                                        <Phone className="w-5 h-5" />
                                        0157 - 85585713
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <ScrollToTop />
        </div>
    );
};

export default About;