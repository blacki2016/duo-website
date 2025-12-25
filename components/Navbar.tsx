import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface NavItem {
    label: string;
    path?: string;
    children?: { label: string; path: string; emoji?: string }[];
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const location = useLocation();

    // Scroll Detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock Body Scroll on Mobile Menu
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close Menu on Route Change
    useEffect(() => {
        setIsOpen(false);
        setMobileExpanded(null);
    }, [location.pathname]);

    const toggleMobile = () => setIsOpen(!isOpen);
    const toggleMobileSubmenu = (label: string) => {
        setMobileExpanded(mobileExpanded === label ? null : label);
    };

    // Asset URLs
    const LOGO_TEXT_URL = `/images/text.logo.png`;
    const LOGO_ICON_URL = `/images/logo2.png`; // Das linke Bild im Desktop
    const LOGO_MOBILE_URL = `/images/bild.logo.png`; // Das linke Bild im Mobile

    const navItems: NavItem[] = [
        { label: 'Startseite', path: '/' },
        {
            label: 'Shows',
            children: [
                { label: 'Shows', path: '/shows' },
                { label: 'Ukongu und vieles mehr', path: '/allgemein/impressionen/' },
            ]
        },
        { label: 'Über uns', path: '/allgemein/ueber-uns/' },
        { label: 'Termine', path: '/termine' },
        { label: 'Mehr als nur eine Galerie', path: '/allgemein/impressionen/' },
        {
            label: 'Kontakt',
            children: [
                { label: 'Kontakt', path: '/kontakt' },
                { label: 'Buchung anfragen', path: '/buchung-anfragen' },
            ]
        },
        {
            label: 'Mehr',
            children: [
                { label: 'Feuershow', path: 'https://maximilianboy.de/#/feuershow' },
                { label: 'Socials', path: '/allgemein/socials/' },
                { label: 'Partner', path: '/allgemein/partner/' },
                { label: 'Impressum', path: '/allgemein/impressum/' },
                { label: 'Datenschutzerklärung', path: '/allgemein/datenschutz/' },
            ]
        },
    ];

    return (
        <>
            <style>{`
                :root {
                    --font-title: 'Cinzel', serif;
                    --font-button: 'Montserrat', sans-serif;
                    --gold-primary: #C8A663;
                    --gold-light: #F9EFAF;
                    --gold-dark: #8E6F34;
                }

                /* Font Utilities */
                .font-title { font-family: var(--font-title); }
                .font-button { font-family: var(--font-button); }

                /* Header Base Styles */
                .site-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 50;
                    transition: all 0.4s ease-in-out;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                /* Initial State (Transparent/Blend) */
                .header-transparent {
                    background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
                    backdrop-filter: blur(2px);
                }

                /* Scrolled State (Glassmorphism) */
                .header-scrolled {
                    background: rgba(18, 18, 18, 0.85);
                    backdrop-filter: blur(16px) saturate(140%);
                    border-bottom: 1px solid rgba(200, 166, 99, 0.3);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                /* Mobile Menu Overlay - Starker Glas-Effekt */
                .mobile-overlay {
                    /* Transparenz deutlich erhöht (0.65) und Blur verstärkt */
                    background: rgba(20, 20, 20, 0.65);
                    backdrop-filter: blur(25px) saturate(110%);
                    -webkit-backdrop-filter: blur(25px) saturate(110%);
                }

                /* Buttons */
                .gold-button {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold-primary) 50%, var(--gold-dark) 100%);
                    background-size: 200% auto;
                    color: #1f1f20;
                    font-family: var(--font-button);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .gold-button:hover {
                    background-position: right center;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(200, 166, 99, 0.4);
                }

                .gold-icon-button {
                    color: var(--gold-primary);
                    background: rgba(255,255,255,0.05);
                    padding: 8px;
                    border-radius: 8px;
                    border: 1px solid rgba(200,166,99,0.3);
                    transition: all 0.3s ease;
                }
                .gold-icon-button:hover {
                    background: var(--gold-primary);
                    color: #000;
                }

                /* Nav Links */
                .nav-link {
                    position: relative;
                    font-family: var(--font-title);
                    font-weight: 700;
                    color: var(--gold-primary);
                    transition: color 0.3s;
                }
                .nav-link:hover {
                    color: var(--gold-light);
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    background-color: var(--gold-primary);
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                    width: 100%;
                }

                /* Dropdowns - Starker Glas-Effekt */
                .dropdown-panel {
                    /* Transparenz deutlich erhöht (0.60) */
                    background: rgba(30, 30, 30, 0.60);
                    border: 1px solid rgba(200, 166, 99, 0.25);
                    backdrop-filter: blur(20px) saturate(120%);
                    -webkit-backdrop-filter: blur(20px) saturate(120%);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                }
            `}</style>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div className={`fixed inset-0 z-[100] mobile-overlay transition-all duration-300 lg:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Header inside Overlay */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#C8A663]/20">
                        <span className="font-title text-xl text-[#C8A663]">Menü</span>
                        <button onClick={toggleMobile} className="gold-icon-button">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Links */}
                    <div className="flex-1 px-6 py-6 space-y-4">
                        {navItems.map((item, idx) => (
                            <div key={idx} className="border-b border-[#C8A663]/10 last:border-0 pb-4">
                                {item.children ? (
                                    <div>
                                        <button
                                            onClick={() => toggleMobileSubmenu(item.label)}
                                            className="flex items-center justify-between w-full text-lg font-title font-bold text-[#C8A663]"
                                        >
                                            {item.label}
                                            {mobileExpanded === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <div className={`pl-4 overflow-hidden transition-all duration-300 ${mobileExpanded === item.label ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                                            {item.children.map((child, cIdx) => (
                                                <Link key={cIdx} to={child.path} onClick={toggleMobile} className="block py-2 text-[#F9EFAF] font-medium hover:text-[#C8A663]">
                                                    • {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    item.path?.startsWith('http') ? (
                                        <a href={item.path} target="_blank" rel="noreferrer" className="block text-lg font-title font-bold text-[#C8A663]">
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link to={item.path!} onClick={toggleMobile} className="block text-lg font-title font-bold text-[#C8A663]">
                                            {item.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        ))}
                        <div className="pt-6">
                            <Link to="/buchung-anfragen" onClick={toggleMobile} className="gold-button w-full block">
                                Buchung anfragen
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SEARCH OVERLAY --- */}
            {searchOpen && (
                <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSearchOpen(false)}>
                    <div className="w-full max-w-2xl bg-[#1a1a1a] border border-[#C8A663]/40 rounded-xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-4">
                            <Search className="text-[#C8A663]" size={24} />
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Suche..."
                                className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-gray-500 font-title"
                            />
                            <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MAIN HEADER --- */}
            <nav className={`site-header ${scrolled ? 'header-scrolled py-2' : 'header-transparent py-4'}`}>
                <div className="container mx-auto px-4 max-w-screen-2xl">
                    
                    {/* MOBILE VIEW (< 1024px) */}
                    <div className="lg:hidden flex items-center justify-between">
                        {/* Logo Left */}
                        <Link to="/" className="flex-shrink-0">
                            <img src={LOGO_MOBILE_URL} alt="Logo Small" className="h-10 w-auto object-contain" />
                        </Link>
                        
                        {/* Logo Center */}
                        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
                            <img src={LOGO_TEXT_URL} alt="Duo Limäx" className="h-12 w-auto object-contain drop-shadow-md" />
                        </Link>

                        {/* Menu Trigger Right */}
                        <button onClick={toggleMobile} className="gold-icon-button">
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* DESKTOP VIEW (>= 1024px) */}
                    <div className="hidden lg:flex flex-col w-full">
                        
                        {/* TOP ROW: Logos & Action */}
                        <div className="grid grid-cols-3 items-center w-full mb-4">
                            
                            {/* Left Column: Visual Logo */}
                            <div className="justify-self-start pl-4">
                                <Link to="/">
                                    <img 
                                        src={LOGO_ICON_URL} 
                                        alt="Logo Icon" 
                                        className={`object-contain transition-all duration-500 ${scrolled ? 'h-20' : 'h-28'}`} 
                                    />
                                </Link>
                            </div>

                            {/* Center Column: Text Logo */}
                            <div className="justify-self-center">
                                <Link to="/">
                                    <img 
                                        src={LOGO_TEXT_URL} 
                                        alt="Duo Limäx Text" 
                                        className={`object-contain transition-all duration-500 ${scrolled ? 'h-24' : 'h-32'}`} 
                                    />
                                </Link>
                            </div>

                            {/* Right Column: CTA Button */}
                            <div className="justify-self-end pr-4">
                                <Link to="/buchung-anfragen" className={`gold-button ${scrolled ? 'text-sm px-4 py-2' : 'text-base'}`}>
                                    Buchung anfragen
                                </Link>
                            </div>
                        </div>

                        {/* BOTTOM ROW: Navigation */}
                        <div className="flex justify-center border-t border-[#C8A663]/20 pt-2">
                            <ul className="flex items-center gap-8">
                                {navItems.filter(i => i.label !== 'Startseite').map((item, index) => (
                                    <li key={index} className="relative group py-2">
                                        {item.children ? (
                                            <>
                                                <button className="flex items-center gap-1 nav-link text-base uppercase tracking-wider">
                                                    {item.label}
                                                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                                </button>
                                                {/* Dropdown */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                                    <div className="dropdown-panel rounded-lg min-w-[260px] p-2 flex flex-col gap-1">
                                                        {item.children.map((child, cIdx) => (
                                                            <Link 
                                                                key={cIdx} 
                                                                to={child.path}
                                                                className="block px-4 py-3 text-[#C8A663] hover:text-[#F9EFAF] hover:bg-[#C8A663]/10 rounded transition-colors font-bold text-sm"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            item.path?.startsWith('http') ? (
                                                <a href={item.path} target="_blank" rel="noreferrer" className="nav-link text-base uppercase tracking-wider">
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link to={item.path!} className="nav-link text-base uppercase tracking-wider">
                                                    {item.label}
                                                </Link>
                                            )
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;


