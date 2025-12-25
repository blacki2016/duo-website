import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#121212] border-t border-[#ebd297]/20 pt-16 pb-8 relative overflow-hidden">
            {/* Decorative Gold Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#ebd297] to-transparent opacity-50"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* COLUMN 1: BRANDING & SHORT INTRO */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Link to="/" className="inline-block mb-6">
                            <img
                                src={`${import.meta.env.BASE_URL}images/logo.png`}
                                alt="Logo"
                                className="h-24 w-auto object-contain no-zoom"
                            />
                        </Link>

                        {/* QUOTE STYLE INTRO - BOLDER */}
                        <div className="relative mb-8 pl-4 border-l-2 border-[#ebd297]/50 py-1">
                            <p className="text-stone-100 text-base font-semibold leading-relaxed italic font-serif">
                                "[Platzhalter für Zitat/Slogan - Kurzbeschreibung des Künstlerduos]"
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] hover:bg-[#ebd297] hover:text-black transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] hover:bg-[#ebd297] hover:text-black transition-all">
                                <i className="fa-brands fa-tiktok text-sm"></i>
                            </a>
                            <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] hover:bg-[#ebd297] hover:text-black transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] hover:bg-[#ebd297] hover:text-black transition-all">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2: QUICK CONTACT (Kundenbedürfnis Nr. 1) */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-wider border-b-2 border-[#ebd297] pb-2 inline-block">Kontakt</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="tel:[TELEFON]" className="group flex items-center gap-3 text-stone-300 hover:text-[#ebd297] transition-colors">
                                    <div className="w-8 h-8 rounded bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] group-hover:scale-110 transition-transform">
                                        <Phone size={16} />
                                    </div>
                                    <span className="font-bold">[Telefonnummer]</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:[EMAIL]" className="group flex items-center gap-3 text-stone-300 hover:text-[#ebd297] transition-colors">
                                    <div className="w-8 h-8 rounded bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] group-hover:scale-110 transition-transform">
                                        <Mail size={16} />
                                    </div>
                                    <span className="font-bold">[E-Mail]</span>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-stone-300">
                                    <div className="w-8 h-8 rounded bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="font-bold pt-1">[Einsatzgebiet]</span>
                                </div>
                            </li>
                            <li className="pt-4">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-[#ebd297] font-bold rounded-full text-sm hover:bg-[#ebd297] hover:text-black transition-all shadow-lg hover:shadow-[0_0_20px_rgba(235,210,151,0.4)]"
                                >
                                    <i className="fa-brands fa-whatsapp text-xl"></i>
                                    <span>WhatsApp schreiben</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMN 3: SHOWS & NAVIGATION */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-wider border-b-2 border-[#ebd297] pb-2 inline-block">Shows</h3>
                        <ul className="space-y-3 w-full">
                            {[
                                { label: 'Die Show', slug: 'show' },
                            ].map(({ label, slug }) => (
                                <li key={label} className="border-b border-white/5 pb-2 last:border-0">
                                    <Link to={`/${slug}`} className="text-stone-300 hover:text-[#ebd297] hover:pl-2 transition-all flex items-center justify-center md:justify-start gap-2">
                                        <span className="text-[#ebd297] text-xs">●</span> {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4: INFO & LEGAL */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-wider border-b-2 border-[#ebd297] pb-2 inline-block">Informationen</h3>

                        {/* General Links */}
                        <ul className="space-y-3 mb-6">
                            <li><Link to="/ueber-uns" className="text-stone-300 hover:text-[#ebd297] transition-colors font-medium">Über uns</Link></li>
                            <li><Link to="/termine" className="text-stone-300 hover:text-[#ebd297] transition-colors font-medium">Öffentliche Termine</Link></li>
                        </ul>

                        {/* Legal Links (Subtler) */}
                        <ul className="space-y-2 text-sm border-t border-white/10 pt-4 w-full md:w-auto">
                            <li><Link to="/impressum" className="text-stone-300 hover:text-[#ebd297] transition-colors">Impressum</Link></li>
                            <li><Link to="/datenschutz" className="text-stone-300 hover:text-[#ebd297] transition-colors">Datenschutz</Link></li>
                        </ul>

                        <div className="mt-8">
                            <Link to="/buchung-anfragen" className="inline-block border border-[#ebd297] text-[#ebd297] px-6 py-3 font-bold uppercase tracking-wider hover:bg-[#ebd297] hover:text-black transition-all">
                                Jetzt Buchen
                            </Link>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
                    <p>&copy; {currentYear} [Künstlername]. Alle Rechte vorbehalten.</p>
                    <p className="flex gap-4">
                        Designed by WieseWeb2025
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;