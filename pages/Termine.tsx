import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

const EVENTS = [
    { date: '23.11.2025', city: 'Forchheim', title: 'UKONGU Premiere', link: '#', type: 'Öffentlich' },
    { date: '02.10.2025', city: 'Wallhausen', title: 'Jubiläumsshow', link: '#', type: 'Öffentlich' },
];

const Termine: React.FC = () => {
    return (
        <div className="min-h-screen bg-stone-950 text-stone-100 pt-28 pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#ebd297]">Termine</h1>
                    <p className="text-stone-400 mt-3 max-w-3xl mx-auto">Öffentliche Shows und Events. Ticket-Link, falls verfügbar.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {EVENTS.map(ev => (
                        <div key={ev.title + ev.date} className="bg-black/40 border border-[#ebd297]/20 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 shadow-lg">
                            <div className="text-center md:text-left md:w-1/4">
                                <div className="text-[#ebd297] font-bold text-lg">{ev.date}</div>
                                <div className="text-stone-300 text-sm">{ev.city}</div>
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-semibold text-lg">{ev.title}</div>
                                <div className="text-xs uppercase tracking-widest text-stone-400">{ev.type}</div>
                            </div>
                            <div className="md:w-1/4 text-center md:text-right">
                                <a href={ev.link} className="text-[#ebd297] font-bold hover:text-white transition-colors">Tickets/Info →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Termine;
