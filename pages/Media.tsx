import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

const MEDIA_ASSETS = [
    { title: 'Pressemappe (PDF)', link: '#', desc: 'Kurzprofil, Referenzen, Kontakt' },
    { title: 'High-Res Fotos (ZIP)', link: '#', desc: 'Bühne, Portraits, Action' },
    { title: 'Logo-Paket (PNG/SVG)', link: '#', desc: 'Hell/Dunkel Varianten' },
    { title: 'Tech-Rider', link: '#', desc: 'Bühnenmaße, Strom, Licht, Audio' },
];

const Media: React.FC = () => {
    return (
        <div className="min-h-screen bg-stone-950 text-stone-100 pt-28 pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#ebd297]">Media & Downloads</h1>
                    <p className="text-stone-400 mt-3 max-w-3xl mx-auto">Pressemappe, Bildmaterial und Logos für Veranstalter. Dateien folgen; Platzhalter zum Download.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {MEDIA_ASSETS.map(item => (
                        <a key={item.title} href={item.link} className="block bg-black/40 border border-[#ebd297]/20 rounded-2xl p-6 shadow-lg hover:border-[#ebd297]/50 transition-colors">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-serif font-bold text-[#ebd297]">{item.title}</h2>
                                    <p className="text-stone-300 text-sm mt-1">{item.desc}</p>
                                </div>
                                <span className="text-[#ebd297] font-bold">↓</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Media;
