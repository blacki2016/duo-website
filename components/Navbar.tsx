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
  const LOGO_URL = "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/10/cropped-cropped-cropped-cropped-cropped-cropped-659aa219-a326-43d5-b6bb-5b02d64a3c40_2-removebg-preview.png";

  const navItems: NavItem[] = [
    { label: 'Startseite', path: '/' },
    { 
      label: 'Showformate', 
      children: [
        { label: 'Alle Showformate ⚡️', path: '/shows' },
        { label: 'Feuershow 🔥', path: '/feuershow' },
        { label: 'Artistikshow 🤹‍♂️', path: '/artistikshow' },
        { label: 'Walk Act 🎪', path: '/walkact' },
        { label: 'Duo Limäx 🪄', path: '/duolimax' }
      ]
    },
    { label: 'Öffentliche Termine', path: '/termine' }, 
    { label: 'Über mich', path: '/about' },
    { 
      label: 'Kontakt', 
      children: [
        { label: 'Kontakt 📲', path: '/booking' },
        { label: 'Buchung anfragen 🗒️', path: '/booking-request' }
      ]
    },
    { 
      label: 'Mehr', 
      children: [
        { label: 'Pyrotechnik 💥', path: '/pyrotechnik' },
        { label: 'Socials 📸', path: '/socials' },
        { label: 'Partner 🤝', path: '/' },
        { label: 'Impressum 📝', path: '/impressum' },
        { label: 'Datenschutzerklärung 🦺', path: '/datenschutz' }
      ]
    }
  ];

  return (
    <>
      <style>{`
        /* Title Gradient - Static Gold */
        .title-gold {
            background: linear-gradient(
                to right,
                #b38728 0%,
                #ebd297 50%,
                #fffebb 100%
            );
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(235, 210, 151, 0.4);
        }

        /* Logo Shimmer - Subtle */
        @keyframes logoShimmer {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(235, 210, 151, 0.2)) brightness(1); }
            50% { filter: drop-shadow(0 0 8px rgba(235, 210, 151, 0.6)) brightness(1.1); }
        }
        
        .logo-hover:hover {
            animation: logoShimmer 2s infinite;
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
      `}</style>
      
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
            scrolled 
            ? 'bg-[#121212]/95 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-[#ebd297]/10' 
            : 'bg-gradient-to-b from-black via-black/80 to-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-4 group relative z-50">
                <img 
                    src={LOGO_URL} 
                    alt="Maximilian Boy Logo" 
                    className={`w-auto object-contain logo-hover transition-all duration-500 ${
                        scrolled ? 'h-12' : 'h-16 md:h-20'
                    }`}
                />
                <div className="flex flex-col justify-center">
                    <span className={`font-serif font-bold tracking-wide title-gold leading-none transition-all duration-500 ${
                        scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                    }`}>
                        MAXIMILIAN BOY
                    </span>
                    <span className={`text-stone-400 uppercase tracking-[0.2em] group-hover:text-[#ebd297] transition-all duration-500 ${
                         scrolled ? 'text-[0.6rem] md:text-[0.7rem]' : 'text-xs md:text-sm mt-1'
                    }`}>
                        Feuer & Artistik
                    </span>
                </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
                {navItems.map((item, index) => (
                    <div key={index} className="relative group px-2 py-2">
                        {item.children ? (
                            <>
                                <button className={`flex items-center gap-1 font-medium text-stone-200 hover:text-[#ebd297] transition-colors nav-link-hover uppercase tracking-wider ${
                                    scrolled ? 'text-sm' : 'text-base'
                                }`}>
                                    {item.label} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                {/* Dropdown */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                    <div className="bg-[#1a1a1b] border border-[#ebd297]/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden min-w-[240px] backdrop-blur-md p-2">
                                        {item.children.map((child, cIdx) => (
                                            <Link 
                                                key={cIdx} 
                                                to={child.path}
                                                className="block px-4 py-3 text-sm text-stone-300 hover:text-white hover:bg-[#ebd297]/10 rounded-lg transition-colors flex items-center justify-between group/item"
                                            >
                                                <span>{child.label.replace(/ .*/, '')}</span>
                                                <span className="text-xs opacity-70 transform group-hover/item:scale-125 transition-transform">{child.label.split(' ').pop()}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link 
                                to={item.path!} 
                                className={`font-medium text-stone-200 hover:text-[#ebd297] transition-colors nav-link-hover uppercase tracking-wider ${
                                    scrolled ? 'text-sm' : 'text-base'
                                }`}
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            
            {/* CTA BUTTON DESKTOP */}
            <div className="hidden lg:block ml-4">
                <Link 
                    to="/booking-request"
                    className={`bg-transparent border border-[#ebd297] text-[#ebd297] rounded-full font-bold uppercase tracking-widest hover:bg-[#ebd297] hover:text-black transition-all shadow-[0_0_15px_rgba(235,210,151,0.2)] hover:shadow-[0_0_25px_rgba(235,210,151,0.6)] hover:scale-105 flex items-center justify-center ${
                        scrolled ? 'px-5 py-2 text-xs' : 'px-8 py-3 text-sm'
                    }`}
                >
                    Anfragen
                </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button 
                onClick={toggleMobile}
                className="lg:hidden text-[#ebd297] p-2 focus:outline-none z-50 hover:bg-[#ebd297]/10 rounded-lg transition-colors"
            >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
        </div>

        {/* MOBILE MENU */}
        <div 
            className={`fixed inset-0 bg-black/98 backdrop-blur-xl z-40 lg:hidden flex flex-col pt-28 px-6 transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
            }`}
        >
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[85vh] pb-10">
                {navItems.map((item, index) => (
                    <div key={index} className="border-b border-white/10 last:border-0 pb-2">
                        {item.children ? (
                            <div>
                                <button 
                                    onClick={() => toggleMobileSubmenu(item.label)}
                                    className="flex items-center justify-between w-full py-3 text-xl font-serif text-stone-200"
                                >
                                    {item.label}
                                    {mobileExpanded === item.label ? <ChevronUp size={24} className="text-[#ebd297]" /> : <ChevronDown size={24} />}
                                </button>
                                <div 
                                    className={`pl-4 flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
                                        mobileExpanded === item.label ? 'max-h-[500px] mt-2 mb-4 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    {item.children.map((child, cIdx) => (
                                        <Link 
                                            key={cIdx} 
                                            to={child.path}
                                            className="text-stone-400 hover:text-[#ebd297] py-2 flex items-center gap-3 text-lg"
                                        >
                                            <span className="w-1.5 h-1.5 bg-[#ebd297] rounded-full"></span>
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link 
                                to={item.path!} 
                                className="block py-3 text-xl font-serif text-stone-200 hover:text-[#ebd297]"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
                
                <div className="mt-8">
                    <Link 
                        to="/booking-request"
                        className="block w-full text-center py-5 bg-[#ebd297] text-black font-bold text-lg uppercase rounded-xl hover:bg-white transition-colors shadow-lg"
                    >
                        Jetzt Buchen
                    </Link>
                </div>

                {/* Socials Mobile */}
                <div className="mt-8 flex justify-center gap-8 text-[#ebd297]">
                    <a href="https://www.instagram.com/maximilian.boy" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram text-3xl"></i></a>
                    <a href="https://www.facebook.com/maximilian.h.boy" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook text-3xl"></i></a>
                    <a href="https://wa.me/4915785585713" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp text-3xl"></i></a>
                </div>
            </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;