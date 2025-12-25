import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Impressions: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const images = [
        `https://via.placeholder.com/800x600?text=Bild+1`,
        `https://via.placeholder.com/800x600?text=Bild+2`,
        `https://via.placeholder.com/800x600?text=Bild+3`,
        `https://via.placeholder.com/800x600?text=Bild+4`,
    ];

    return (
        <div className="min-h-screen pt-28 pb-16 bg-stone-950 text-stone-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#ebd297]">Impressionen</h1>
                    <p className="text-stone-400 mt-3">[Platzhalter] Einblicke in unsere Auftritte und Shows.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((src, i) => (
                        <div key={i} className="relative overflow-hidden rounded-xl border border-[#ebd297]/20 bg-black/20">
                            <img src={src} alt={`Impressions ${i + 1}`} className="w-full h-64 object-cover" />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/kontakt" className="inline-block px-6 py-3 border border-[#ebd297] text-[#ebd297] font-bold rounded-full hover:bg-[#ebd297] hover:text-black transition-colors">Kontakt</Link>
                </div>
            </div>
        </div>
    );
};

export default Impressions;
