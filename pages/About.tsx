import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  '/images/übermich.jpg'
];

const timelineEvents = [
  { year: '1993', text: <>👶 Geburt von <strong>Maximilian Boy</strong> in Schwabach (Bayern).</> },
  { year: '2000 – 2006', text: 'Frühe Begeisterung für Bühne, Musik und Theater – erste kleine Schulauftritte und Kinderzirkus-Erfahrungen.' },
  { year: '2009 – 2012', text: <>Ausbildung als <strong>Zootierpfleger im Erlebnis Zoo Hannover</strong> – parallel wächst die Leidenschaft für Artistik, Jonglage und Feuer.</> },
  { year: '2013', text: <>Ausbildung als <strong>Sprecher, Synchronsprecher und TV Moderator</strong>.<br />Moderation von Tierpräsentationen und erste Schauspielerfahrung im Theater sowie bei kleineren Filmprojekten.</> },
  { year: '2014', text: <>Offizieller Start in die <strong>Selbstständigkeit als Feuerkünstler</strong> – Gründung von <strong>MB Feuerentertainment</strong>.</> },
  { year: '2015', text: <>Ausbildung als <strong>Bühnenpyrotechniker</strong>.</> },
  { year: '2016 – 2017', text: <>Redakteur und Moderator bei <strong>Radio max neo Nürnberg</strong>.</> },
  { year: '2018', text: 'Erweiterung der Shows in den Bereichen Jonglage und Zauberei.' },
  { year: 'Mai 2019', text: 'Kennenlernen des späteren Bühnenpartners Leo Wieseckel – Beginn der Zusammenarbeit für Illusionsprojekte.' },
  { year: 'Nov 2019 – Feb 2020', text: <>Mitarbeit bei der <strong>Andrea Berg „Mosaik“-Arena-Tour</strong> – Pyrotechnik und Spezialeffekte.</> },
  { year: 'Aug 2020', text: <>Erster großer Duo-Auftritt im <strong>E-Werk Erlangen</strong> – offizielle Premiere von <strong>Duo Limäx</strong>.</> },
  { year: '2021', text: 'Ausbau des Showrepertoires: Großillusionen und Feuerinszenierungen.' },
  { year: 'Jan 2022', text: 'Erweiterung der Shows im Bereich Handstandakrobatik und Rola Rola.' },
  { year: 'Nov/ Dez 2022', text: <>Mitarbeit bei der <strong>Kelly Family Weihnachtstour</strong> – Pyrotechnik und Spezialeffekte.</> },
  { year: '2023 – 2024', text: <>Mitarbeit bei der <strong>Schlager-Nacht des Jahres Tour</strong> Spezialeffekte sowie weitere Großevents in allen Formaten.</> },
  { year: 'Nov 2024', text: <>Premiere der neuen Duo Limäx Produktion <strong>„Ukongu“</strong> – Kombination aus Illusion, Artistik und Comedy.</> },
  { year: 'Heute', text: <>Etablierter Künstler mit einem vielseitigem Portfolio aus <strong>Feuershow, Artistik, Moderation, Musik und Magie</strong>.</> },
];

const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Intersection Observer for Timeline Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.event').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Background Slider (8-Sekunden-Wechsel mit Crossfade)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className="fs-slide"
            style={{
              backgroundImage: `url('${slide}')`,
              opacity: idx === currentSlide ? 1 : 0
            }}
          />
        ))}
      </div>
      <style>{`
        /* Background Slides mit Crossfade */
        .fs-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center -40px;
          background-repeat: no-repeat;
          transition: opacity 2000ms ease-in-out;
          filter: blur(3px) brightness(0.3);
          transform: scale(1.02);
        }

        /* Wrapper with relative positioning */
        .about-wrapper {
          position: relative;
          z-index: 1;
        }
        :root {
          --gold-primary: #ebd297;
          --gold-glow: rgba(235, 210, 151, 0.3);
        }
        
        /* Timeline Container */
        .timeline-container {
          position: relative;
          padding: 20px 0;
          max-width: 800px;
          margin: 0 auto;
        }

        /* The vertical line */
        .timeline {
          position: relative;
          padding: 20px 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 20px;
          width: 2px;
          background: linear-gradient(to bottom, transparent, var(--gold-primary), transparent);
          box-shadow: 0 0 10px var(--gold-primary);
        }

        @media (min-width: 768px) {
          .timeline::before {
            left: 50%;
            margin-left: -1px;
          }
        }

        /* Event Container */
        .event {
          position: relative;
          margin-bottom: 50px;
          width: 100%;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .event.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .event-content {
          position: relative;
          margin-left: 50px;
          background: linear-gradient(135deg, rgba(235, 210, 151, 0.15), rgba(235, 210, 151, 0.08));
          border: 1px solid rgba(235, 210, 151, 0.25);
          padding: 20px;
          border-radius: 12px;
          box-shadow: inset 0 1px 4px rgba(235, 210, 151, 0.18), 0 12px 30px rgba(0,0,0,0.3);
          backdrop-filter: blur(6px);
        }

        .event-year {
          position: absolute;
          top: 0;
          left: -50px;
          width: 48px;
          text-align: right;
          color: #f4e6c3;
          font-weight: bold;
          font-family: serif;
          letter-spacing: 0.5px;
        }
        
        /* Dot on the line */
        .event::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: var(--gold-primary);
            border: 4px solid #1c1917; /* stone-900 */
            border-radius: 50%;
            top: 20px;
            left: 13px;
            z-index: 1;
            box-shadow: 0 0 10px var(--gold-primary);
        }

        @media (min-width: 768px) {
            .event {
                width: 50%;
                padding-left: 0;
                padding-right: 40px;
                margin-left: 0;
            }
            
            .event:nth-child(even) {
                margin-left: 50%;
                padding-right: 0;
                padding-left: 40px;
            }

            .event-content {
                margin-left: 0;
            }

            .event-year {
                position: static;
                margin-bottom: 8px;
                text-align: left;
                width: auto;
            }

            .event:nth-child(odd) .event-content {
                text-align: right;
            }
            
            .event:nth-child(odd) .event-year {
                text-align: right;
            }
            
            .event::after {
                left: auto;
                right: -8px;
                top: 20px;
            }
            
            .event:nth-child(even)::after {
                right: auto;
                left: -8px;
            }
        }
      `}</style>

      {/* Content Wrapper */}
      <div className="about-wrapper">
        {/* Header */}
        <div className="pt-32 pb-16 px-4 text-center text-stone-200">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#ebd297] mb-6">Über Mich</h1>
          <p className="text-xl text-stone-400 max-width-2xl mx-auto">
            Vom Zootierpfleger zum Feuerkünstler – eine Reise voller Leidenschaft, Funken und Magie.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="container mx-auto px-4 pb-24">
          <div className="timeline-container">
            <div className="timeline">
              {timelineEvents.map((event, index) => (
                <div key={index} className="event">
                  <div className="event-content">
                    <div className="event-year text-lg">{event.year}</div>
                    <div className="text-stone-300 leading-relaxed">
                      {event.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-stone-900/80 border-t border-stone-800 text-center px-4">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Lernen wir uns kennen!</h2>
          <Link
            to="/booking-request"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#ebd297] to-[#d4b56a] text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;