import React from 'react';
import { Link } from 'react-router-dom';

interface Partner {
    name: string;
    url: string;
}

interface PartnerCategory {
    title: string;
    partners: Partner[];
}

const partnerCategories: PartnerCategory[] = [
    {
        title: 'Porträt & Showfotografie',
        partners: [
            { name: 'Svend Krumnacker', url: 'https://svend.de' }
        ]
    },
    {
        title: 'WebDesign & Hosting',
        partners: [
            { name: 'Leo Wieseckel - WieseWeb', url: 'https://webdesign.wieseckel.com' }
        ]
    },
    {
        title: 'Pyrotechnik',
        partners: [
            { name: 'Jorima', url: 'https://jorima.de' },
            { name: 'Pyaz', url: 'https://pyaz.de' },
            { name: 'Pyro Tirol', url: 'https://pyro.tirol' },
            { name: 'SStotz', url: 'https://sstotz.de' },
            { name: 'Belaser', url: 'https://belaser.de' }
        ]
    },
    {
        title: 'Locations',
        partners: [
            { name: 'Parks Nürnberg', url: 'https://parks-nuernberg.de' },
            { name: 'Hotel Riesengebirge', url: 'https://hotel-riesengebirge.net' },
            { name: 'Schwarzer Adler Neuhof', url: 'https://schwarzer-adler-neuhof.de' },
            { name: 'Schloss Thurnau', url: 'https://schloss-thurnau.de' },
            { name: 'Pflugsmühle', url: 'https://pflugsmuehle.de' }
        ]
    },
    {
        title: 'DJ und Band',
        partners: [
            { name: 'Mirage Band', url: 'https://mirage-band.de' },
            { name: 'Pino Barone', url: 'https://pinobarone.de' },
            { name: 'Deserted Horizon', url: 'https://deserted-horizon.de' },
            { name: 'DJ Jürgen Party', url: 'https://djjuergen-party.de' }
        ]
    },
    {
        title: 'Hochzeitsplanung',
        partners: [
            { name: 'Kola Weddingz', url: 'https://kola-weddingz.com' }
        ]
    },
    {
        title: 'Freie Rednerin',
        partners: [
            { name: 'Wortreich Anna', url: 'https://wortreich-anna.de' }
        ]
    },
    {
        title: 'Agenturen',
        partners: [
            { name: 'Sopp Films Agency', url: 'https://agency.soppfilms.com' },
            { name: 'ATBL Music', url: 'https://atbl-music.com' },
            { name: '8Events', url: 'https://8events.com' },
            { name: 'Freddy Events', url: 'https://www.freddy.events' },
            { name: 'Zuprotype', url: 'https://zuprotype.de' }
        ]
    },
    {
        title: 'Weitere Dienstleister und Künstler',
        partners: [
            { name: 'Hochzeitsfotograf Vogt', url: 'https://hochzeitsfotograf-vogt.com' },
            { name: 'Nighttrons', url: 'https://nighttrons.com' },
            { name: 'AJ Designs', url: 'https://ajdesigns.de' },
            { name: 'Tame Kinderbetreuung', url: 'https://tame-kinderbetreuung.de' },
            { name: 'Fotobox42', url: 'https://fotobox42.de' },
            { name: 'Genuss Konditorei', url: 'https://genuss-konditorei.de' },
            { name: 'Wir sind Film', url: 'https://wir-sind-film.de' },
            { name: 'Pferdefahrkultur', url: 'https://pferdefahrkultur.com' }
        ]
    }
];

const Partner: React.FC = () => {
    return (
        <>
            <div className="min-h-screen relative overflow-hidden">
                {/* Fixed Background Layer */}
                <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/images/partner.jpeg')",
                            filter: 'blur(3px) brightness(0.3)',
                            transform: 'scale(1.02)'
                        }}
                    />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-1">
                    {/* Header */}
                    <div className="pt-32 pb-16 px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#ebd297] mb-6">
                            Partner
                        </h1>
                        <p className="text-xl text-stone-400 max-w-2xl mx-auto">
                            Gemeinsam für unvergessliche Events – meine geschätzten Partner und Netzwerk.
                        </p>
                    </div>

                    {/* Partner Grid */}
                    <div className="container mx-auto px-4 py-16">
                        <div className="space-y-16 max-w-6xl mx-auto">
                            {partnerCategories.map((category, idx) => (
                                <div key={idx} className="partner-category">
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#ebd297] mb-8 text-center">
                                        {category.title}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {category.partners.map((partner, pidx) => (
                                            <a
                                                key={pidx}
                                                href={partner.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="partner-card group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[#ebd297] font-bold transition-colors">
                                                        {partner.name}
                                                    </span>
                                                    <svg
                                                        className="w-5 h-5 text-stone-500 group-hover:text-[#ebd297] transition-colors"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="text-sm text-stone-500 group-hover:text-stone-400 transition-colors mt-1">
                                                    {partner.url.replace('https://', '').replace('http://', '')}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="py-16 bg-stone-900/80 border-t border-stone-800 text-center px-4">
                        <h2 className="text-3xl font-serif font-bold text-white mb-6">
                            Möchten Sie Partner werden?
                        </h2>
                        <Link
                            to="/booking-request"
                            className="inline-block px-10 py-4 bg-gradient-to-r from-[#ebd297] to-[#d4b56a] text-black font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            Kontakt aufnehmen
                        </Link>
                    </div>
                </div>

                <style>{`
        .partner-card {
          display: block;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(235, 210, 151, 0.15), rgba(235, 210, 151, 0.08));
          border: 1px solid rgba(235, 210, 151, 0.25);
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 4px rgba(235, 210, 151, 0.18), 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .partner-card:hover {
          background: linear-gradient(135deg, rgba(235, 210, 151, 0.22), rgba(235, 210, 151, 0.12));
          border-color: rgba(235, 210, 151, 0.45);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 5px rgba(235, 210, 151, 0.25);
        }

        .partner-category {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
            </div>
        </>
    );
};

export default Partner;
