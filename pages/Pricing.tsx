import React, { useState, useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';

const Pricing: React.FC = () => {
    const [email, setEmail] = useState('');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const [selections, setSelections] = useState({
        feuershow: false,
        artistikshow: false,
        walkact: false,
        duolimax: false,
        fireHeart: false
    });
    const [duolimaxVariant, setDuolimaxVariant] = useState<'mini' | 'abend'>('mini');
    const [postalCode, setPostalCode] = useState('');
    const [kilometers, setKilometers] = useState(0);
    const [hasCalculated, setHasCalculated] = useState(false);

    // Preise pro Leistung in EUR
    const prices = {
        feuershow: 600,
        artistikshow: 600,
        walkact: 500,
        duolimaxMini: 1400,
        duolimaxAbend: 2500,
        fireHeart: 50
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
            // Duo Limäx hat Varianten
            if (key === 'duolimax') {
                return sum + (duolimaxVariant === 'mini' ? prices.duolimaxMini : prices.duolimaxAbend);
            }
            return sum + prices[key as keyof typeof prices];
        }
        return sum;
    }, 0);

    const travelCost = kilometers * costPerKm;
    const totalPrice = basePrice + travelCost;

    // Reset calculated state when inputs change
    useEffect(() => {
        setHasCalculated(false);
    }, [kilometers, duolimaxVariant, selections]);

    // E-Mail-Validierung
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Unlock-Handler
    const handleUnlock = async () => {
        if (!isValidEmail(email)) {
            setSubmitError('Bitte gib eine gültige E-Mail-Adresse ein.');
            return;
        }
        if (!privacyAccepted) {
            setSubmitError('Bitte akzeptiere die Datenschutzerklärung.');
            return;
        }
        setSubmitError('');
        setIsUnlocked(true);
        try {
            await fetch('/api/collect-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
        } catch (e) {
            console.warn('E-Mail konnte nicht geloggt werden');
        }
    };

    // Angebot senden (automatisch beim Berechnen)
    const handleSendOffer = async () => {
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/send-pricing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    selections,
                    duolimaxVariant,
                    kilometers,
                    basePrice,
                    travelCost,
                    totalPrice
                })
            });

            if (!response.ok) {
                throw new Error('Fehler beim Senden');
            }
            // Hinweis optional still halten
        } catch (error) {
            setSubmitError('Fehler beim Senden. Bitte versuche es später erneut.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Preis berechnen und automatisch senden
    const handleCalculate = async () => {
        // Leistungen müssen gesetzt sein
        if (basePrice <= 0) return;
        // PLZ validieren
        if (!/^\d{5}$/.test(postalCode)) {
            setSubmitError('Bitte gib eine gültige deutsche PLZ ein (5-stellig).');
            return;
        }
        try {
            const resp = await fetch('/api/calc-distance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postalCode })
            });
            if (!resp.ok) throw new Error('Distanzberechnung fehlgeschlagen');
            const data = await resp.json();
            const km = Number(data.kilometers) || 0;
            setKilometers(km);
            setHasCalculated(true);
            await handleSendOffer();
        } catch (e) {
            setSubmitError('Distanzberechnung fehlgeschlagen. Bitte versuche es später erneut.');
        }
    };

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
                    {/* E-MAIL GATE (nur wenn noch nicht entsperrt) */}
                    {!isUnlocked ? (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-[#141415] p-10 rounded-3xl shadow-2xl border border-[#ebd297]/20">
                                <div className="text-center mb-8">
                                    <div className="text-6xl mb-4">🔒</div>
                                    <h2 className="text-2xl font-serif font-bold text-[#ebd297] mb-3">Zugang zum Preisrechner</h2>
                                    <p className="text-stone-400">
                                        Um den Preisrechner nutzen zu können, benötigen wir deine E-Mail-Adresse.
                                        Dein errechnetes Angebot wird dir und uns per E-Mail zugeschickt.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {/* E-Mail Input */}
                                    <div>
                                        <label className="block text-sm text-stone-300 mb-2 font-semibold">
                                            E-Mail-Adresse *
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="deine@email.de"
                                            className="w-full bg-[#0a0a0a] border border-stone-700 text-white p-4 rounded-lg focus:border-[#ebd297] focus:outline-none"
                                            required
                                        />
                                    </div>

                                    {/* Datenschutz Checkbox */}
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={privacyAccepted}
                                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                            className="mt-1 flex-shrink-0"
                                        />
                                        <span className="text-sm text-stone-300">
                                            Ich habe die <a href="/#/privacy" className="text-[#ebd297] hover:underline" target="_blank">Datenschutzerklärung</a> zur Kenntnis genommen.
                                            Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für die Angebotserstellung erhoben und verarbeitet werden.
                                            Die Daten werden nach abgeschlossener Bearbeitung deiner Anfrage gelöscht.
                                            Hinweis: Du kannst deine Einwilligung jederzeit für die Zukunft per E-Mail widerrufen. *
                                        </span>
                                    </label>

                                    {/* Fehler Anzeige */}
                                    {submitError && (
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
                                            ⚠️ {submitError}
                                        </div>
                                    )}

                                    {/* Unlock Button */}
                                    <button
                                        onClick={handleUnlock}
                                        disabled={!email || !privacyAccepted}
                                        className="w-full bg-gradient-to-r from-[#ebd297] to-[#d4af37] text-black px-6 py-4 font-bold rounded-full hover:from-[#fffebb] hover:to-[#ebd297] transition-all shadow-[0_0_20px_rgba(235,210,151,0.4)] hover:shadow-[0_0_30px_rgba(235,210,151,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-[#ebd297] disabled:hover:to-[#d4af37]"
                                    >
                                        Preisrechner entsperren 🔓
                                    </button>

                                    <p className="text-xs text-stone-500 text-center mt-4">
                                        🔒 Deine Daten sind sicher und werden gemäß DSGVO verarbeitet.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* PREISRECHNER (nur wenn entsperrt) */}
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* LEFT: Leistungsauswahl */}
                                <div className="bg-[#141415] p-8 rounded-3xl shadow-2xl border border-[#ebd297]/20">
                                    <h2 className="text-2xl font-serif font-bold text-[#ebd297] mb-8">Leistungen</h2>

                                    <div className="space-y-4">
                                        {[
                                            { key: 'feuershow', label: 'Feuershow' },
                                            { key: 'artistikshow', label: 'Artistikshow' },
                                            { key: 'walkact', label: 'Walk Act (3 x 30 min oder am Stück)' }
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

                                        {/* Duo Limäx mit Varianten-Auswahl */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-all border border-white/5 hover:border-[#ebd297]/20">
                                                <input
                                                    type="checkbox"
                                                    checked={selections.duolimax}
                                                    onChange={() => handleToggle('duolimax')}
                                                    className="flex-shrink-0"
                                                />
                                                <div className="flex-grow">
                                                    <div className="font-semibold text-white">Duo Limäx (Magie & Illusion)</div>
                                                </div>
                                            </label>

                                            {/* Varianten-Auswahl (nur wenn Duo Limäx aktiviert) */}
                                            {selections.duolimax && (
                                                <div className="ml-8 p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
                                                    <label className="block text-sm text-stone-300 mb-2 font-semibold">Wähle eine Variante:</label>
                                                    <select
                                                        value={duolimaxVariant}
                                                        onChange={(e) => setDuolimaxVariant(e.target.value as 'mini' | 'abend')}
                                                        className="w-full bg-[#0a0a0a] border border-stone-700 text-white p-3 rounded-lg focus:border-[#ebd297] focus:outline-none cursor-pointer"
                                                    >
                                                        <option value="mini">🎭 UKONGU Mini (20 Minuten)</option>
                                                        <option value="abend">🌟 UKONGU Abendprogramm (90 Minuten)</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>

                                        {/* Romantische Feuerherz-Deko (nur bei Feuershow) */}
                                        {selections.feuershow && (
                                            <label className="flex items-center gap-4 p-4 bg-pink-500/10 rounded-xl hover:bg-pink-500/20 cursor-pointer transition-all border border-pink-400/20 hover:border-pink-400/40 ml-8">
                                                <input
                                                    type="checkbox"
                                                    checked={selections.fireHeart}
                                                    onChange={() => handleToggle('fireHeart')}
                                                    className="flex-shrink-0"
                                                />
                                                <div className="flex-grow">
                                                    <div className="font-semibold text-white">❤️‍🔥 Romantische Feuerherz - Deko</div>
                                                </div>
                                            </label>
                                        )}
                                    </div>

                                    {/* Fahrtkosten */}
                                    <div className="mt-8 pt-8 border-t border-stone-700">
                                        <h3 className="text-lg font-semibold text-[#ebd297] mb-4">Fahrtkosten</h3>
                                        <div className="flex items-end gap-4">
                                            <div className="flex-grow">
                                                <label className="block text-sm text-stone-300 mb-2">Postleitzahl (PLZ)</label>
                                                <input
                                                    type="text"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value.trim())}
                                                    placeholder="z.B. 80331"
                                                    className="w-full bg-white text-black placeholder-stone-500 border border-stone-300 p-3 rounded-lg focus:border-[#ebd297] focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm text-stone-400 mb-2">à 0,50€/km (ab 90616)</div>
                                                <div className="text-[#ebd297] font-bold text-xl">{hasCalculated ? travelCost.toFixed(2) + '€' : '—'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: Preisanzeige */}
                                <div className="flex flex-col justify-between">
                                    <div className="bg-gradient-to-br from-[#ebd297]/20 to-[#d4af37]/10 border-2 border-[#ebd297]/40 rounded-3xl p-12 shadow-[0_0_40px_rgba(235,210,151,0.15)]">
                                        <h2 className="text-xl text-stone-300 mb-2">Gesamtpreis</h2>
                                        <div className="text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] to-[#fffebb] mb-6">
                                            {hasCalculated ? `${totalPrice.toFixed(2)}€` : '—'}
                                        </div>

                                        {hasCalculated && (
                                            <div className="space-y-3 mb-8 text-stone-300">
                                                {basePrice > 0 && (
                                                    <div className="flex justify-between pb-3 border-b border-stone-600">
                                                        <span>Showpreis</span>
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
                                        )}

                                        {!/^\d{5}$/.test(postalCode) ? (
                                            <p className="text-sm text-stone-400 italic">
                                                Bitte gib eine gültige Postleitzahl ein.
                                            </p>
                                        ) : basePrice === 0 ? (
                                            <p className="text-sm text-stone-400 italic">
                                                Wähle mindestens eine Leistung aus.
                                            </p>
                                        ) : !hasCalculated ? (
                                            <button
                                                onClick={handleCalculate}
                                                disabled={isSubmitting}
                                                className="block w-full text-center bg-gradient-to-r from-[#ebd297] to-[#d4af37] text-black px-6 py-4 font-bold rounded-full hover:from-[#fffebb] hover:to-[#ebd297] transition-all shadow-[0_0_20px_rgba(235,210,151,0.4)] hover:shadow-[0_0_30px_rgba(235,210,151,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Wird gesendet...' : 'Preis errechnen'}
                                            </button>
                                        ) : (
                                            <p className="text-sm text-stone-400 mb-2">
                                                💡 Dies ist eine Schätzung. Der endgültige Preis hängt von deinen spezifischen Wünschen und Anforderungen ab.
                                            </p>
                                        )}
                                    </div>

                                    {/* Info Box */}
                                    <div className="mt-8 bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                                        <h3 className="text-lg font-semibold text-blue-300 mb-3">ℹ️ Wichtige Info</h3>
                                        <ul className="space-y-2 text-sm text-stone-300">
                                            <li>✓ Preise sind Brutto-Schätzungen und können immer variieren</li>
                                            <li>✓ Fahrtkosten: 0,50€ pro Kilometer (Hin- und Rückfahrt)</li>
                                            <li>✓ Am besten ist es immer einfach mal direkt anzufragen</li>
                                            <li>✓ Individuelle Pakete auf Anfrage möglich</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Disclaimer: Unverbindlicher Preisrechner */}
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mt-10 text-[11px] leading-relaxed text-stone-500 text-center">
                    <div className="mb-1 font-semibold tracking-wide">Unverbindlicher Preisrechner *</div>
                    <p>
                        * Die hier bereitgestellte Preisermittlung dient ausschließlich der ersten, unverbindlichen Orientierung.
                        Weder für dich als Interessent noch für uns als Anbieter entsteht dadurch eine rechtliche Bindung.
                        Ein rechtsverbindliches Angebot kommt erst durch unsere schriftliche Bestätigung zustande und kann je nach
                        Veranstaltungsort, Rahmenbedingungen, Sicherheitsanforderungen sowie individueller Leistungsgestaltung abweichen.
                    </p>
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Pricing;
