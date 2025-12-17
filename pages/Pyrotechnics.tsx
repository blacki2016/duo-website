import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Heart, Flame } from 'lucide-react';

const Pyrotechnics: React.FC = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Scroll Reveal Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const items = document.querySelectorAll('.pyro-reveal');
    items.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans relative overflow-hidden">
      <style>{`
        /* Custom Styles for Pyro Page */
        .pyro-bg {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;
            background-image: url("https://maximilianboy.de/wp-content/uploads/2023/09/Neu-1-1024x809.jpg");
            background-size: cover; background-position: center;
            filter: blur(4px) brightness(0.25); pointer-events: none;
        }
        
        .pyro-hero {
            position: relative; min-height: 80vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            text-align: center; padding: 6rem 1rem;
        }

        .pyro-hero::after {
            content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 150px;
            background: linear-gradient(to top, #0a0a0a, transparent);
        }

        .pyro-title {
            font-family: 'Cinzel', serif; font-size: clamp(2.5rem, 6vw, 5rem);
            color: #EBD297; text-transform: uppercase; margin-bottom: 1rem;
            text-shadow: 0 0 20px rgba(235, 100, 0, 0.6);
        }

        .pyro-card {
            background: rgba(20, 20, 20, 0.6); border: 1px solid rgba(235, 210, 151, 0.15);
            backdrop-filter: blur(10px); padding: 2rem; border-radius: 12px;
            transition: all 0.3s ease; height: 100%;
        }
        .pyro-card:hover {
            transform: translateY(-5px); border-color: rgba(235, 210, 151, 0.4);
            box-shadow: 0 10px 30px rgba(200, 100, 0, 0.1);
        }

        .pyro-icon-box {
            width: 60px; height: 60px; background: rgba(235, 210, 151, 0.1);
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            margin-bottom: 1.5rem; color: #EBD297;
        }

        .pyro-btn {
            display: inline-block; padding: 14px 32px;
            background: linear-gradient(45deg, #d4af37, #b38728);
            color: #000; font-weight: 800; text-transform: uppercase;
            border-radius: 50px; font-family: 'Montserrat', sans-serif;
            transition: all 0.3s; margin-top: 2rem;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        }
        .pyro-btn:hover {
            transform: scale(1.05); box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
            color: #fff;
        }

        .pyro-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s, transform 0.8s; }
        .pyro-reveal.show { opacity: 1; transform: translateY(0); }

        /* Gallery Grid */
        .pyro-gallery {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;
        }
        .pyro-img {
            width: 100%; height: 300px; object-fit: cover; border-radius: 8px;
            cursor: pointer; transition: transform 0.3s, filter 0.3s;
            filter: grayscale(0.2) brightness(0.8);
        }
        .pyro-img:hover { transform: scale(1.02); filter: grayscale(0) brightness(1.1); }
      `}</style>

      <div className="pyro-bg"></div>

      <div className="relative z-10">
        {/* HERO */}
        <header className="pyro-hero">
            <div className="pyro-reveal">
                <div className="flex justify-center mb-4">
                    <Flame className="w-12 h-12 text-orange-500 animate-pulse" />
                </div>
                <h1 className="pyro-title">Pyrotechnik & SFX</h1>
                <p className="text-xl md:text-2xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
                    Sichere Bühnenpyrotechnik und emotionale Lichterbilder für den perfekten "Wow"-Moment.
                </p>
                <Link to="/booking-request" className="pyro-btn">Jetzt Zünden</Link>
            </div>
        </header>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
            
            {/* INTRO TEXT */}
            <section className="mb-24 text-center pyro-reveal">
                <h2 className="text-3xl font-serif font-bold text-[#EBD297] mb-6">Der Funke, der überspringt</h2>
                <p className="text-stone-300 text-lg leading-relaxed max-w-3xl mx-auto">
                    Als <strong className="text-white">staatlich geprüfter Bühnenpyrotechniker</strong> sorge ich dafür, dass Ihr Event nicht nur glänzt, sondern knallt – und das mit höchster Sicherheit. 
                    Ob ein brennendes Herz zur Hochzeit, sprühende Fontänen beim Einzug oder ein Höhenfeuerwerk als Finale: Ich plane, genehmige und zünde Ihre individuelle Show.
                </p>
            </section>

            {/* SERVICES GRID */}
            <section className="grid md:grid-cols-3 gap-8 mb-24 pyro-reveal">
                <div className="pyro-card">
                    <div className="pyro-icon-box"><ShieldCheck size={32} /></div>
                    <h3 className="text-xl font-bold text-white mb-3 font-serif">Sicherheit & Genehmigung</h3>
                    <p className="text-stone-400">
                        Kein Stress für Sie. Ich kümmere mich um alle behördlichen Genehmigungen, Absprachen mit der Location und die Einhaltung aller Sicherheitsabstände. Versicherung inklusive.
                    </p>
                </div>
                <div className="pyro-card">
                    <div className="pyro-icon-box"><Heart size={32} /></div>
                    <h3 className="text-xl font-bold text-white mb-3 font-serif">Lichterbilder</h3>
                    <p className="text-stone-400">
                        Das emotionale Highlight für Hochzeiten und Jubiläen. Brennende Herzen, Ringe oder Zahlen/Initialen. Ein perfektes Fotomotiv, das lange in Erinnerung bleibt.
                    </p>
                </div>
                <div className="pyro-card">
                    <div className="pyro-icon-box"><Zap size={32} /></div>
                    <h3 className="text-xl font-bold text-white mb-3 font-serif">Bühneneffekte</h3>
                    <p className="text-stone-400">
                        Für Bands, DJs und Shows: Flammenschalen, Funkenfontänen (Sparkulars - auch Indoor möglich!), Nebeljets und Konfetti-Shooter für den großen Auftritt.
                    </p>
                </div>
            </section>

            {/* GALLERY */}
            <section className="mb-24 pyro-reveal">
                <h2 className="text-3xl font-serif font-bold text-[#EBD297] mb-8 text-center">Impressionen</h2>
                <div className="pyro-gallery">
                    {[
                        "https://maximilianboy.de/wp-content/uploads/2023/09/Neu-1-1024x809.jpg", // Heart/Finale
                        "https://i0.wp.com/maximilianboy.de/wp-content/uploads/2023/02/IMG_20210819_124617_236.jpg-neu.jpg?strip=info&w=704&ssl=1", // Flames
                        "https://maximilianboy.de/mystaging02/wp-content/uploads/2025/11/955a3bed-be2e-449c-9372-4383e58d3eb7.jpg" // Sparklers
                    ].map((src, idx) => (
                        <img 
                            key={idx} 
                            src={src} 
                            alt="Pyro Impression" 
                            className="pyro-img"
                            onClick={() => setLightboxSrc(src)}
                        />
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="pyro-reveal max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-[#EBD297] mb-8 text-center">Häufige Fragen</h2>
                <div className="space-y-4">
                    <details className="bg-white/5 border border-[#EBD297]/20 rounded-lg p-4 group cursor-pointer">
                        <summary className="font-bold text-[#EBD297] list-none flex justify-between items-center">
                            <span>Darf überall Pyrotechnik gezündet werden?</span>
                            <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="mt-4 text-stone-300 leading-relaxed">
                            Nicht überall, aber an sehr vielen Orten. Wir prüfen im Vorfeld die Gegebenheiten (Abstände zu Gebäuden, Bäumen etc.) und klären das mit dem Ordnungsamt. In Naturschutzgebieten ist es meist nicht erlaubt.
                        </p>
                    </details>
                    <details className="bg-white/5 border border-[#EBD297]/20 rounded-lg p-4 group cursor-pointer">
                        <summary className="font-bold text-[#EBD297] list-none flex justify-between items-center">
                            <span>Gibt es "leise" Pyrotechnik?</span>
                            <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="mt-4 text-stone-300 leading-relaxed">
                            Ja! Barockfeuerwerk, Lichterbilder und Bodenfontänen sind sehr geräuscharm und oft auch nach 22 Uhr noch genehmigungsfähig, wenn Lärmschutz wichtig ist.
                        </p>
                    </details>
                    <details className="bg-white/5 border border-[#EBD297]/20 rounded-lg p-4 group cursor-pointer">
                        <summary className="font-bold text-[#EBD297] list-none flex justify-between items-center">
                            <span>Wie lange ist die Vorlaufzeit?</span>
                            <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="mt-4 text-stone-300 leading-relaxed">
                            Behördliche Anmeldungen müssen in der Regel 2-4 Wochen vor dem Event eingereicht werden. Je früher Sie anfragen, desto besser können wir planen.
                        </p>
                    </details>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center mt-20 pyro-reveal">
                 <p className="text-stone-400 mb-4">Noch Fragen zu Ihrem speziellen Vorhaben?</p>
                 <Link to="/booking-request" className="text-[#EBD297] border-b border-[#EBD297] hover:text-white pb-1 transition-colors uppercase tracking-widest font-bold">
                    Kontakt aufnehmen
                 </Link>
            </div>
        </div>
      </div>

       {/* LIGHTBOX */}
      {lightboxSrc && (
          <div 
            className="fixed inset-0 z-[99999] bg-black/95 flex justify-center items-center cursor-zoom-out p-4 animate-in fade-in duration-300"
            onClick={() => setLightboxSrc(null)}
          >
            <img 
              src={lightboxSrc} 
              alt="Enlarged view" 
              className="max-w-[95vw] max-h-[95vh] border-2 border-[#EBD297] rounded shadow-[0_0_50px_rgba(212,175,55,0.4)] object-contain"
            />
          </div>
      )}
    </div>
  );
};

export default Pyrotechnics;