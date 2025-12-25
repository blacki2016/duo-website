import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type MediaItem = {
    src: string;
    alt: string;
    category: string;
    type?: 'image' | 'video';
    meta?: string;
};

const MEDIA_ITEMS: MediaItem[] = [
    {
        src: `${import.meta.env.BASE_URL}images/limaex.slider7.jpg`,
        alt: 'UKONGU Premiere',
        category: 'UKONGU',
        meta: 'Premiere Forchheim 11/2024'
    },
    {
        src: `${import.meta.env.BASE_URL}images/showformate.limaex.jpg`,
        alt: 'Corporate Show',
        category: 'Corporate',
        meta: 'Galashow'
    },
    {
        src: `${import.meta.env.BASE_URL}images/e85ca38e-53d8-4fcf-ae75-5ccb9b72aad6-2.jpg`,
        alt: 'Illusion Act',
        category: 'Illusion',
        meta: 'Großillusion'
    },
    {
        src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        alt: 'Close-Up Magie',
        category: 'Close-Up',
        meta: 'Interaktiv'
    },
    {
        src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
        alt: 'Musik-Act',
        category: 'Musik',
        meta: 'Piano & Ukulele'
    },
    {
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Hochzeitsshow',
        category: 'Hochzeit',
        meta: 'First Dance Special'
    },
    {
        src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
        alt: 'Feuershow',
        category: 'Outdoor',
        meta: 'Feuer & Pyro'
    },
    {
        src: 'https://www.youtube.com/embed/ysz5S6PUM-U',
        alt: 'Showreel',
        category: 'Video',
        type: 'video',
        meta: 'Showreel (YouTube)'
    },
];

const FILTERS = ['Alle', 'UKONGU', 'Corporate', 'Hochzeit', 'Close-Up', 'Illusion', 'Musik', 'Outdoor', 'Video'];

const Impressions: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('Alle');
    const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!lightboxItem) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, [lightboxItem]);

    const filteredItems = useMemo(() => {
        if (activeFilter === 'Alle') return MEDIA_ITEMS;
        return MEDIA_ITEMS.filter(item => item.category === activeFilter);
    }, [activeFilter]);

    return (
        <div className="min-h-screen pt-28 pb-20 bg-stone-950 text-stone-100">
            <style>{`
                .masonry-grid { column-gap: 1rem; }
                .masonry-item { break-inside: avoid; }
                @media (min-width: 640px) { .masonry-grid { column-count: 2; } }
                @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
            `}</style>
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#ebd297]">Limäx Impressionen</h1>
                    <p className="text-stone-400 mt-3 max-w-3xl mx-auto">
                        Hier einige der bisherigen Höhepunkte und Ausschnitte aus unserem Programm „UKONGU" – plus aktuelle Impressionen aus Corporate-, Hochzeits- und Outdoor-Shows.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${activeFilter === filter ? 'bg-[#ebd297] text-black border-[#ebd297]' : 'border-[#ebd297]/40 text-[#ebd297] hover:border-[#ebd297]'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="masonry-grid">
                    {filteredItems.map((item, i) => (
                        <div key={i} className="masonry-item mb-4">
                            <div className="relative overflow-hidden rounded-2xl border border-[#ebd297]/25 bg-black/30 shadow-lg group cursor-pointer" onClick={() => setLightboxItem(item)}>
                                {item.type === 'video' ? (
                                    <div className="aspect-video w-full bg-black/60 flex items-center justify-center text-[#ebd297] text-xl font-bold">
                                        ▶ Showreel ansehen
                                    </div>
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        loading="lazy"
                                        style={item.src.includes('showformate.limaex.jpg') ? { objectPosition: 'center 20%' } : undefined}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-xs uppercase tracking-widest">
                                    <span className="px-3 py-1 rounded-full bg-black/70 border border-[#ebd297]/40 text-[#ebd297] font-bold">{item.category}</span>
                                    {item.meta && <span className="text-stone-200 text-[11px]">{item.meta}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 flex flex-col gap-4 items-center">
                    <Link to="/kontakt" className="inline-block px-6 py-3 border border-[#ebd297] text-[#ebd297] font-bold rounded-full hover:bg-[#ebd297] hover:text-black transition-colors">Kontakt</Link>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-sm text-stone-400 hover:text-[#ebd297]">Mehr auf Instagram ansehen</a>
                </div>
            </div>

            {lightboxItem && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}>
                    <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-10 right-0 text-[#ebd297] hover:text-white text-3xl"
                            onClick={() => setLightboxItem(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        {lightboxItem.type === 'video' ? (
                            <div className="relative w-full pb-[56.25%]">
                                <iframe
                                    src={`${lightboxItem.src}?rel=0&modestbranding=1`}
                                    title={lightboxItem.alt}
                                    className="absolute inset-0 w-full h-full rounded-xl"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <img src={lightboxItem.src} alt={lightboxItem.alt} className="w-full max-h-[80vh] object-contain rounded-xl border border-[#ebd297]/30 shadow-2xl" />
                        )}
                        <div className="mt-4 flex items-center justify-between text-sm text-stone-200">
                            <span className="uppercase tracking-widest text-[#ebd297] font-bold">{lightboxItem.category}</span>
                            {lightboxItem.meta && <span>{lightboxItem.meta}</span>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Impressions;
