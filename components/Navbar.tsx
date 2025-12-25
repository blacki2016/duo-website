import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

interface NavItem {
    label: string;
    path?: string;
    children?: { label: string; path: string; emoji?: string }[];
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setMobileExpanded(null);
    }, [location.pathname]);

    const toggleMobile = () => setIsOpen(!isOpen);
    const toggleMobileSubmenu = (label: string) => {
        setMobileExpanded(mobileExpanded === label ? null : label);
    };

    // Logo URL
    const LOGO_URL = `/images/logo.limaex.png`;

    const navItems: NavItem[] = [
        { label: 'Home', path: '/' },
        { label: 'Über uns', path: '/allgemein/ueber-uns/' },
        { label: 'Impressionen', path: '/allgemein/impressionen/' },
        { label: 'Kontakt', path: '/kontakt' },
        { label: 'Feuershow', path: 'https://maximilianboy.de/#/feuershow' },
    ];

    return (
        <>
            <style>{`
        :root {
            --font-title: 'Cinzel', serif;
            --font-button: 'Montserrat', sans-serif;
            --font-dropdown: 'Montserrat', sans-serif;
        }

        /* Ensure header stays fixed on scroll */
        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            transform: translateZ(0); /* avoid flicker on mobile */
        }

        /* Utility: explicit title font class */
        .font-title { font-family: var(--font-title); }
        .font-button { font-family: var(--font-button); }

        /* Title Gradient - Gold Shine per spec */
        .title-gold {
            background: linear-gradient(
                to right,
                #bf953f,
                #fffebb,
                #b38728,
                #fbf5b7,
                #aa771c,
                #bf953f
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(235, 210, 151, 0.4);
        }

        /* Gold Shimmer Animation */
        @keyframes goldShimmer {
            0%, 100% {
                box-shadow: 0 0 15px rgba(235, 210, 151, 0.3), inset 0 0 15px rgba(235, 210, 151, 0.1);
            }
            50% {
                box-shadow: 0 0 30px rgba(235, 210, 151, 0.6), inset 0 0 20px rgba(235, 210, 151, 0.3);
            }
        }

        .booking-button {
            font-family: var(--font-button);
            animation: goldShimmer 3s ease-in-out infinite;
        }

        /* Set menu + dropdown font to title font */
        .main-nav .nav-button,
        .main-nav a {
            font-family: var(--font-title);
            white-space: nowrap; /* prevent label wrapping */
        }

        /* Override: use dropdown font for items inside dropdown panel */
        .main-nav .dropdown-panel a {
            font-family: var(--font-dropdown);
            font-weight: 700; /* bold */
        }

        /* Shine animation (6s linear infinite) */
        @keyframes shine {
            from { background-position: 0% 50%; }
            to   { background-position: 200% 50%; }
        }
        .title-gold-animated {
            animation: shine 6s linear infinite;
        }

        /* CTA Shine / Pulse / Float */
        @keyframes shineGradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 18px rgba(235, 210, 151, 0.35); }
            50% { box-shadow: 0 0 34px rgba(235, 210, 151, 0.65); }
        }
        @keyframes floatUp {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
        }
        .cta-animated {
            background-image: linear-gradient(90deg, #ebd297, #b38728, #fffebb, #b38728, #ebd297);
            background-size: 300% 100%;
            animation: shineGradient 6s linear infinite, pulseGlow 3s ease-in-out infinite, floatUp 4s ease-in-out infinite;
        }

        /* Logo Shimmer - Subtle */
        @keyframes logoShimmer {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(235, 210, 151, 0.2)) brightness(1); }
            50% { filter: drop-shadow(0 0 8px rgba(235, 210, 151, 0.6)) brightness(1.1); }
        }
        
        .logo-hover:hover {
            animation: logoShimmer 2s infinite;
        }

        /* Balanced wrapping for long mobile titles */
        .title-balance { text-wrap: balance; }

        /* Glassmorphism Header when scrolled */
        .glass-header {
            background: rgba(18, 18, 18, 0.45);
            backdrop-filter: blur(16px) saturate(140%);
            -webkit-backdrop-filter: blur(16px) saturate(140%);
            border-bottom: 1px solid rgba(235, 210, 151, 0.12);
            box-shadow: 0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .glass-header::before {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0));
        }

        /* Menu Link Hover Underline */
        .nav-link-hover {
            position: relative;
        }
        .nav-link-hover::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: #ebd297;
            transition: width 0.3s ease-in-out;
        }
        .nav-link-hover:hover::after {
            width: 100%;
        }

                /* Safe-Area Support for Mobile (Notch) */
                @supports (padding: max(0px)) {
                    .site-header { padding-top: max(env(safe-area-inset-top), 0px); }
                    .mobile-menu { padding-bottom: max(env(safe-area-inset-bottom), 0px); }
                }
      `}</style>

            {/* MOBILE MENU OVERLAY - Outside nav for proper layering */}
            <div
                className={`fixed inset-0 bg-black/98 backdrop-blur-xl z-[100] lg:hidden transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                <div className="h-full w-full flex flex-col overflow-y-auto overscroll-contain safe-top safe-bottom">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                        <span className="text-[#ebd297] font-serif font-bold text-lg">Menü</span>
                        <button
                            onClick={toggleMobile}
                            aria-label="Menü schließen"
                            className="text-[#ebd297] h-11 w-11 flex items-center justify-center hover:bg-[#ebd297]/10 rounded-lg transition-colors touch-manipulation"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* Menu Content */}
                    <div className="flex-1 px-6 py-6 space-y-2">
                        {navItems.map((item, index) => (
                            <div key={index} className="border-b border-white/10 last:border-0 pb-2">
                                {item.children ? (
                                    <div>
                                        <button
                                            onClick={() => toggleMobileSubmenu(item.label)}
                                            type="button"
                                            className="flex items-center justify-between w-full py-4 text-xl font-title font-bold text-[#ebd297] touch-manipulation"
                                        >
                                            {item.label}
                                            {mobileExpanded === item.label ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                                        </button>
                                        <div
                                            className={`pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-300 ${mobileExpanded === item.label ? 'max-h-[700px] mt-2 mb-3 opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            {item.children.map((child, cIdx) => (
                                                <Link
                                                    key={cIdx}
                                                    to={child.path}
                                                    className="font-bold text-[#ebd297] hover:text-white py-3 flex items-center gap-4 text-lg min-h-[48px] touch-manipulation"
                                                >
                                                    <span className="w-2 h-2 bg-[#ebd297] rounded-full shrink-0"></span>
                                                    <span>{child.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    item.path?.startsWith('http') ? (
                                        <a
                                            href={item.path}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block py-4 text-xl font-title font-bold text-[#ebd297] hover:text-white min-h-[48px] touch-manipulation"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={item.path!}
                                            className="block py-4 text-xl font-title font-bold text-[#ebd297] hover:text-white min-h-[48px] touch-manipulation"
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        ))}

                        <div className="pt-6">
                            <Link
                                to="/buchung-anfragen"
                                className="booking-button block w-full text-center py-4 bg-gradient-to-br from-[#ebd297] to-[#b38728] text-black font-button font-bold text-base rounded-xl hover:from-white hover:to-[#ebd297] transition-all shadow-[0_0_20px_rgba(235,210,151,0.4)] hover:shadow-[0_0_30px_rgba(235,210,151,0.8)] touch-manipulation"
                            >
                                Buchung anfragen
                            </Link>

                            {/* Socials Mobile */}
                            <div className="mt-8 flex justify-center gap-8 text-[#ebd297]">
                                <a href="https://www.instagram.com/maximilian.boy" target="_blank" rel="noreferrer" className="touch-manipulation"><i className="fa-brands fa-instagram text-3xl"></i></a>
                                <a href="https://www.facebook.com/maximilian.h.boy" target="_blank" rel="noreferrer" className="touch-manipulation"><i className="fa-brands fa-facebook text-3xl"></i></a>
                                <a href="https://wa.me/4015785585713" target="_blank" rel="noreferrer" className="touch-manipulation"><i className="fa-brands fa-whatsapp text-3xl"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav
                className={`site-header fixed top-0 left-0 w-full z-[90] transition-all duration-500 ease-in-out ${scrolled
                    ? 'glass-header scrolled'
                    : 'bg-gradient-to-b from-black via-black/80 to-transparent'
                    }`}
            >
                <div className="header-container container max-w-screen-2xl mx-auto pl-6 md:pl-8 xl:pl-10 pr-3 md:pr-4 xl:pr-6">

                    {/* MOBILE: 3 Spalten (Logo | Titel | Menü) */}
                    <div className="lg:hidden flex items-center justify-between px-4 py-3">
                        {/* Logo links */}
                        <Link to="/" className="flex items-center group">
                            <img
                                src={LOGO_URL}
                                alt="Maximilian Boy Logo"
                                className={`header-logo h-14 sm:h-16 md:h-16 w-auto object-contain logo-hover transition-all duration-500`}
                            />
                        </Link>

                        {/* Titel mittig */}
                        <div className="flex-1 px-3 text-center">
                            <span className={`header-title title-gold title-gold-animated text-sm sm:text-base md:text-lg font-serif font-bold tracking-wide leading-snug title-balance break-words`}>
                                MAXIMILIAN BOY & MB FEUERENTERTAINMENT
                            </span>
                        </div>

                        {/* Menü-Icon rechts */}
                        <button
                            onClick={toggleMobile}
                            aria-expanded={isOpen}
                            aria-label="Menü öffnen"
                            className="text-[#ebd297] h-11 w-11 flex items-center justify-center focus:outline-none hover:bg-[#ebd297]/10 rounded-lg transition-colors touch-manipulation"
                        >
                            <Menu size={28} />
                        </button>
                    </div>

                    {/* DESKTOP: Drei Bereiche (Links/Mitte/Rechts) */}
                    <div className="hidden lg:grid grid-cols-3 items-center gap-12">
                        {/* Links: Logo (Unterzeile entfernt) */}
                        <div className="flex items-center justify-start">
                            <Link to="/" className="flex flex-col items-start group">
                                <img
                                    src={LOGO_URL}
                                    alt="Maximilian Boy Logo"
                                    className={`header-logo h-28 w-auto object-contain logo-hover transition-all duration-500`}
                                />
                            </Link>
                        </div>

                        {/* Mitte: Titel (Zeile 1) + Navigation (Zeile 2) */}
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <span className={`header-title title-gold title-gold-animated text-3xl font-serif font-bold tracking-widest whitespace-nowrap leading-tight transition-all duration-500`}>
                                MAXIMILIAN BOY & MB FEUERENTERTAINMENT
                            </span>

                            <div className="main-nav py-3 flex items-center justify-center gap-4 xl:gap-8">
                                {navItems.filter(i => i.label !== 'Home').map((item, index) => (
                                    <div key={index} className="relative group px-2 py-2">
                                        {item.children ? (
                                            <>
                                                <button className={`nav-button flex items-center gap-2 font-title font-extrabold text-[#ebd297] hover:text-white transition-colors nav-link-hover uppercase tracking-wider`}>
                                                    {item.label} <ChevronDown size={18} className="group-hover:rotate-180 transition-transform duration-300" />
                                                </button>
                                                {/* Dropdown */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                                                    <div className="dropdown-panel bg-[#1f1f20]/60 border border-[#ebd297]/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden min-w-[280px] backdrop-blur-lg p-2">
                                                        {item.children.map((child, cIdx) => {
                                                            const parts = child.label.split(' ');
                                                            const emoji = parts.length > 1 ? parts.pop() : '';
                                                            const text = parts.join(' ');

                                                            return (
                                                                <Link
                                                                    key={cIdx}
                                                                    to={child.path}
                                                                    className="block px-4 py-3 text-base font-bold text-[#ebd297] hover:text-white hover:bg-[#ebd297]/10 rounded-lg transition-colors flex items-center justify-between group/item"
                                                                >
                                                                    <span>{text}</span>
                                                                    <span className="text-2xl opacity-90 leading-none transform group-hover/item:scale-110 transition-transform">{emoji}</span>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            item.path?.startsWith('http') ? (
                                                <a
                                                    href={item.path}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`font-title font-extrabold text-[#ebd297] hover:text-white transition-colors nav-link-hover uppercase tracking-wider px-1`}
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={item.path!}
                                                    className={`font-title font-extrabold text-[#ebd297] hover:text-white transition-colors nav-link-hover uppercase tracking-wider px-1`}
                                                >
                                                    {item.label}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rechts: Ghost-Button CTA */}
                        <div className="flex justify-end">
                            <Link
                                to="/kontakt"
                                className={`cta-animated text-black rounded-full font-button font-bold shadow-[0_0_20px_rgba(235,210,151,0.35)] hover:shadow-[0_0_30px_rgba(235,210,151,0.6)] transition-transform duration-300 hover:scale-110 transform -translate-y-1 md:-translate-y-2 flex items-center justify-center text-center ${scrolled ? 'px-6 py-3 text-sm' : 'px-9 py-4 text-base'}`}
                            >
                                Buchung anfragen
                            </Link>
                        </div>
                    </div>

                    {/* (Button oben entfernt, da im 3-Spalten-Header integriert) */}
                </div>

            </nav>
        </>
    );
};

export default Navbar;