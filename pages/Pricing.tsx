import React, { useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';

const Pricing: React.FC = () => {
    const [selections, setSelections] = useState({
        feuershow: false,
        artistikshow: false,
        walkact: false,
        duolimax: false
    });
    const [kilometers, setKilometers] = useState(0);

    // Preise pro Leistung in EUR
    const prices = {
        feuershow: 600,
        artistikshow: 600,
        walkact: 500,
        duolimax: 1400
    };

    // Fahrtkosten: 0,50 EUR pro km
    const costPerKm = 0.5;

    // Toggle checkbox
    const handleToggle = (key: keyof typeof selections) => {
        setSelections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Berechne Gesamtpreis
    const basePrice = Object.entries(selections).reduce((sum, [key, checked]) => {
        if (checked) {
            return sum + prices[key as keyof typeof prices];
        }
        return sum;
    }, 0);

    const travelCost = kilometers * costPerKm;
    const totalPrice = basePrice + travelCost;

    return (
        <div className="min-h-screen bg-stone-950 pt-32 pb-20 font-sans relative">
            {/* Background Image Layer */}
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/images/kontakt.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
            </div>

            <style>{`
        /* Price Input Styles */
        input[type="number"] {
            background-color: #0a0a0a;
            border: 1px solid #292524;
            color: white;
            padding: 0.75rem;
            border-radius: 0.5rem;
            transition: all 0.3s;
        }
        input[type="number"]:focus {
            border-color: #ebd297;
            box-shadow: 0 0 0 1px #ebd297;
            outline: none;
        }
        input[type="checkbox"] {
            cursor: pointer;
            width: 1.25rem;
            height: 1.25rem;
            accent-color: #ebd297;
        }
      `}</style>

            <div className="relative z-10">
                {/* HEADER */}
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] via-[#fffebb] to-[#ebd297] mb-3 drop-shadow-sm">
                        Preisrechner
                    </h1>
                    <div className="w-24 h-1 bg-[#ebd297] mx-auto rounded-full mb-4"></div>
                    <p className="text-stone-400 max-w-2xl mx-auto text-lg font-light">
                        Wähle deine Leistungen und deinen Standort aus – der Preis wird live berechnet!
                    </p>
                </div>

                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* LEFT: Leistungsauswahl */}
                        <div className="bg-[#141415] p-8 rounded-3xl shadow-2xl border border-[#ebd297]/20">
                            <h2 className="text-2xl font-serif font-bold text-[#ebd297] mb-8">Leistungen</h2>

                            <div className="space-y-4">
                                {[
                                    { key: 'feuershow', label: 'Feuershow' },
                                    { key: 'artistikshow', label: 'Artistikshow' },
                                    { key: 'walkact', label: 'Walk Act (3 x 30 min oder am Stück)' },
                                    { key: 'duolimax', label: 'Duo Limäx (Magie & Illusion)' }
                                ].map(item => (
                                    <label key={item.key} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-all border border-white/5 hover:border-[#ebd297]/20">
                                        <input
                                            type="checkbox"
                                            checked={selections[item.key as keyof typeof selections]}
                                            onChange={() => handleToggle(item.key as keyof typeof selections)}
                                            className="flex-shrink-0"
                                        />
                                        <div className="flex-grow">
                                            <div className="font-semibold text-white">{item.label}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Fahrtkosten */}
                            <div className="mt-8 pt-8 border-t border-stone-700">
                                <h3 className="text-lg font-semibold text-[#ebd297] mb-4">Fahrtkosten</h3>
                                <div className="flex items-end gap-4">
                                    <div className="flex-grow">
                                        <label className="block text-sm text-stone-300 mb-2">Entfernung (km)</label>
                                        <input
                                            type="number"
                                            value={kilometers}
                                            onChange={(e) => setKilometers(Math.max(0, Number(e.target.value)))}
                                            placeholder="z.B. 50"
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm text-stone-400 mb-2">à 0,50€/km</div>
                                        <div className="text-[#ebd297] font-bold text-xl">{travelCost.toFixed(2)}€</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Preisanzeige */}
                        <div className="flex flex-col justify-between">
                            <div className="bg-gradient-to-br from-[#ebd297]/20 to-[#d4af37]/10 border-2 border-[#ebd297]/40 rounded-3xl p-12 shadow-[0_0_40px_rgba(235,210,151,0.15)]">
                                <h2 className="text-xl text-stone-300 mb-2">Gesamtpreis</h2>
                                <div className="text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] to-[#fffebb] mb-6">
                                    {totalPrice.toFixed(2)}€
                                </div>

                                <div className="space-y-3 mb-8 text-stone-300">
                                    {basePrice > 0 && (
                                        <div className="flex justify-between pb-3 border-b border-stone-600">
                                            <span>Leistungen</span>
                                            <span className="font-semibold">{basePrice.toFixed(2)}€</span>
                                        </div>
                                    )}
                                    {kilometers > 0 && (
                                        <div className="flex justify-between pb-3 border-b border-stone-600">
                                            <span>Fahrtkosten</span>
                                            <span className="font-semibold">{travelCost.toFixed(2)}€</span>
                                        </div>
                                    )}
                                </div>

                                {totalPrice === 0 ? (
                                    <p className="text-sm text-stone-400 italic">
                                        Wähle mindestens eine Leistung aus, um einen Preis zu sehen.
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-sm text-stone-400 mb-6">
                                            💡 Dies ist eine Schätzung. Der endgültige Preis hängt von deinen spezifischen Wünschen und Anforderungen ab. Kontaktiere mich gerne für ein individuelles Angebot!
                                        </p>
                                        <a
                                            href="/#/booking-request"
                                            className="block w-full text-center bg-gradient-to-r from-[#ebd297] to-[#d4af37] text-black px-6 py-4 font-bold rounded-full hover:from-[#fffebb] hover:to-[#ebd297] transition-all shadow-[0_0_20px_rgba(235,210,151,0.4)] hover:shadow-[0_0_30px_rgba(235,210,151,0.6)]"
                                        >
                                            Jetzt Anfrage stellen 🔥
                                        </a>
                                    </>
                                )}
                            </div>

                            {/* Info Box */}
                            <div className="mt-8 bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-blue-300 mb-3">ℹ️ Wichtige Info</h3>
                                <ul className="space-y-2 text-sm text-stone-300">
                                    <li>✓ Preise sind Brutto-Schätzungen</li>
                                    <li>✓ Fahrtkosten: 0,50€ pro Kilometer (Hin- und Rückfahrt)</li>
                                    <li>✓ Am besten ist es immer einfach mal direkt anzufragen</li>
                                    <li>✓ Individuelle Pakete auf Anfrage möglich</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Pricing;
