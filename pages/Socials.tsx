import React, { useEffect } from 'react';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/maximilian.boy?igsh=dGNvd25ldGRxeHUy',
    iconClass: 'fa-brands fa-instagram',
    color: '#E1306C',
    desc: 'Aktuelle Stories, Fotos und Einblicke in den Alltag.'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@maximilian.boy.show?_r=1&_t=ZN-917wgGx3A3S',
    iconClass: 'fa-brands fa-tiktok',
    color: '#00f2ea', // TikTok cyan mix
    desc: 'Kurze Clips, Tricks und virale Momente.'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@maxboyjongleur-feuershow7633',
    iconClass: 'fa-brands fa-youtube',
    color: '#FF0000',
    desc: 'Showreels, ganze Auftritte und längere Videos.'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/maximilian.h.boy/?mibextid=wwXIfr&rdid=SKlWa1j0yKQBb20K&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KFyJVoPPk%2F%3Fmibextid%3DwwXIfr',
    iconClass: 'fa-brands fa-facebook-f',
    color: '#1877F2',
    desc: 'Veranstaltungstermine und Community.'
  },
  {
    name: 'WhatsApp',
    url: 'https://api.whatsapp.com/send/?phone=4915785585713&text&type=phone_number&app_absent=0',
    iconClass: 'fa-brands fa-whatsapp',
    color: '#25D366',
    desc: 'Direkter Kontakt für schnelle Anfragen.'
  }
];

const Socials: React.FC = () => {
    // Reveal effect hook
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.social-reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Styling */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
             style={{
                 backgroundImage: 'radial-gradient(circle at 50% 30%, #4a3b2a 0%, #121212 70%)'
             }}>
        </div>
        
        <div className="relative z-10 max-w-5xl w-full text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#EBD297] mb-6 drop-shadow-lg social-reveal">
                Social Media
            </h1>
            <p className="text-stone-300 text-lg mb-12 max-w-2xl mx-auto social-reveal delay-100 font-sans">
                Folge mir auf meinen Kanälen für exklusive Einblicke hinter die Kulissen, aktuelle Tourdaten und spektakuläre Aufnahmen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                {SOCIAL_LINKS.map((social, index) => (
                    <a 
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-card social-reveal group"
                        style={{transitionDelay: `${index * 100}ms`}}
                    >
                        <div className="icon-wrapper mb-6 text-5xl group-hover:scale-110 transition-transform duration-300" style={{color: social.color}}>
                            <i className={social.iconClass}></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#EBD297] transition-colors">{social.name}</h3>
                        <p className="text-sm text-stone-400 leading-relaxed">{social.desc}</p>
                        
                        <div className="absolute inset-0 border border-[#EBD297]/10 rounded-xl group-hover:border-[#EBD297]/40 transition-colors pointer-events-none"></div>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#EBD297]">
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </div>
                    </a>
                ))}
            </div>
        </div>

        <style>{`
            .social-card {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 12px;
                padding: 2.5rem 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                position: relative;
                backdrop-filter: blur(5px);
                transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
                min-height: 220px;
            }
            .social-card:hover {
                background: rgba(255, 255, 255, 0.06);
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .social-reveal {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .social-reveal.show {
                opacity: 1;
                transform: translateY(0);
            }
        `}</style>
    </div>
  );
};

export default Socials;