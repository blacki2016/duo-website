import React, { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle, Send, Clock3, MessageSquare, Calendar } from 'lucide-react';
import { ContactStatus } from '../types';
import ScrollToTop from '../components/ScrollToTop';

const FAQS = [
    {
        q: 'Wie früh sollte ich buchen?',
        a: 'Je eher, desto besser – ideal sind 4–8 Wochen im Voraus. Kurzfristige Anfragen sind möglich, falls Termine frei sind.'
    },
    {
        q: 'Welche Infos braucht ihr?',
        a: 'Datum, Ort, Anlass, ungefähre Gästezahl und Technik-Situation. Wir bringen vieles mit, benötigen aber Strom und Mindestfläche.'
    },
    {
        q: 'Reist ihr deutschlandweit?',
        a: 'Ja. Basis in Bayern, Einsätze in ganz D-A-CH. Fahrt- und ggf. Übernachtungskosten kalkulieren wir transparent vorab.'
    }
];

const Booking: React.FC = () => {
    const [status, setStatus] = useState<ContactStatus>(ContactStatus.IDLE);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    // Form State - Simplified to only mandatory fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(ContactStatus.SUBMITTING);

        try {
            const response = await fetch('/api/send-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send');
            }

            setTimeout(() => {
                setStatus(ContactStatus.SUCCESS);
                setFormData({ name: '', email: '', message: '' });
                e.currentTarget.reset();
            }, 1000);
        } catch (err) {
            console.error(err);
            setStatus(ContactStatus.IDLE);
            alert('Fehler beim Versenden. Bitte versuchen Sie es später erneut.');
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] pt-32 pb-20 font-sans relative">

            {/* BACKGROUND IMAGE LAYER */}
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1600x900?text=Kontakt+Background')] bg-cover bg-center opacity-20 blur-sm"></div>
            </div>

            <style>{`
        /* Lively Button Style Copied from Navbar */
        @keyframes btnGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .btn-lively {
            background: linear-gradient(45deg, #d4af37, #ebd297, #fffebb, #b38728, #ebd297);
            background-size: 300% 300%;
            animation: btnGradient 3s ease infinite;
            color: #000 !important;
            font-weight: 800;
            box-shadow: 0 0 20px rgba(235, 210, 151, 0.5);
            transition: all 0.3s ease;
            text-transform: uppercase;
            border: 2px solid #fffebb;
            font-family: 'Montserrat', sans-serif;
        }
        .btn-lively:hover {
            box-shadow: 0 0 30px rgba(235, 210, 151, 1);
            transform: scale(1.02) translateY(-2px);
        }
        .btn-lively:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        /* Gold Inputs */
        .input-gold {
            background-color: #0a0a0a;
            border: 1px solid #292524;
            color: white;
            transition: all 0.3s;
        }
        .input-gold:focus {
            border-color: #ebd297;
            box-shadow: 0 0 0 1px #ebd297;
            outline: none;
        }
      `}</style>

            <div className="relative z-10">
                {/* === COMPACT HERO SECTION === */}
                <div className="container mx-auto px-4 mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] via-[#fffebb] to-[#ebd297] mb-3 drop-shadow-sm">
                        Alles aus erster Hand!
                    </h1>
                    <div className="w-24 h-1 bg-[#ebd297] mx-auto rounded-full mb-4"></div>
                    <p className="text-stone-400 max-w-2xl mx-auto text-lg font-light">
                        Limäx Team: Max & Leo
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white">
                        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-[#ebd297]/30">
                            <Clock3 className="w-4 h-4 text-[#ebd297]" /> Antwort in &lt;24h
                        </div>
                        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-[#ebd297]/30">
                            <MessageSquare className="w-4 h-4 text-[#ebd297]" /> Telefon, E-Mail, WhatsApp
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4">

                    {/* === INTRO SECTION (REDESIGNED) === */}
                    <div className="max-w-6xl mx-auto mb-20 bg-[#141415] rounded-3xl border border-[#ebd297]/10 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ebd297]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                        <div className="grid md:grid-cols-2 gap-0">

                            {/* Box 1: Image - Full height cover (now below text) */}
                            <div className="relative h-[400px] md:h-full min-h-[400px] overflow-hidden group order-2 md:order-2 mt-40 md:mt-24">
                                <picture>
                                    <source srcSet="/images/kontakt.webp" type="image/webp" />
                                    <img
                                        src="/images/kontakt.jpg"
                                        alt="[Künstler]"
                                        loading="lazy"
                                        className="w-full h-full object-cover object-top transition-transform duration-[1.5s] group-hover:scale-105"
                                    />
                                </picture>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141415] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#141415]/80"></div>
                            </div>

                            {/* Box 2: Text - Elegant Layout */}
                            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 order-1 md:order-1">
                                <h3 className="text-4xl font-serif font-bold text-[#ebd297] mb-6">Hallo!</h3>
                                <div className="text-stone-300 space-y-5 font-sans leading-relaxed text-lg font-light">
                                    <p>
                                        [Platzhalter für persönliche Begrüßung und Kontakttext]
                                    </p>
                                    <p>
                                        [Weiterer Text zur Kontaktaufnahme]
                                    </p>
                                    <p>
                                        [Informationen zu Antwortzeiten und Kontaktmöglichkeiten]
                                    </p>
                                    <div className="pt-4 border-t border-[#ebd297]/20 mt-4">
                                        <p className="text-white font-bold text-xl font-serif">
                                            Bis bald, <br />
                                            <span className="text-[#ebd297] italic">[Künstlername]</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map & Availability */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                        <div className="bg-black/40 border border-[#ebd297]/20 rounded-2xl overflow-hidden shadow-lg">
                            <div className="p-4 border-b border-white/5 flex items-center gap-3">
                                <MapPin className="text-[#ebd297]" />
                                <h3 className="text-white font-semibold">Einsatzgebiet</h3>
                            </div>
                            <div className="aspect-video">
                                <iframe
                                    title="Einsatzgebiet"
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=7.5%2C47.2%2C15.5%2C55.1&layer=mapnik"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-4 text-sm text-stone-300">Bayern & deutschlandweit – europaweit auf Anfrage.</div>
                        </div>

                        <div className="bg-black/40 border border-[#ebd297]/20 rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-[#ebd297]" />
                                <div>
                                    <h3 className="text-white font-semibold text-lg">Verfügbarkeit prüfen</h3>
                                    <p className="text-stone-400 text-sm">Wunschtermin angeben, wir antworten meist unter 24h.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className="text-sm text-stone-300">
                                    Startdatum
                                    <input type="date" className="mt-1 w-full bg-stone-900 border border-[#ebd297]/30 rounded-lg px-3 py-2 text-white focus:border-[#ebd297] focus:outline-none" />
                                </label>
                                <label className="text-sm text-stone-300">
                                    Enddatum
                                    <input type="date" className="mt-1 w-full bg-stone-900 border border-[#ebd297]/30 rounded-lg px-3 py-2 text-white focus:border-[#ebd297] focus:outline-none" />
                                </label>
                            </div>
                            <textarea
                                rows={3}
                                className="w-full bg-stone-900 border border-[#ebd297]/30 rounded-lg px-3 py-2 text-white focus:border-[#ebd297] focus:outline-none"
                                placeholder="Event, Ort, Gästezahl, Wünsche"
                            />
                            <button className="btn-lively w-full py-3 rounded-xl font-bold">Verfügbarkeit anfragen</button>
                        </div>
                    </div>

                    {/* Existing Grid for Details & Form */}
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* Contact Info Side */}
                        <div className="space-y-8 order-2 md:order-1">
                            <h2 className="text-2xl font-bold font-serif text-white mb-6 border-l-4 border-[#ebd297] pl-4 uppercase tracking-wider">Kontaktinformationen</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-5 group p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[#ebd297]/10">
                                    <div className="bg-stone-800 p-3 rounded-full text-[#ebd297] group-hover:bg-[#ebd297] group-hover:text-black transition-colors shadow-lg">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-stone-400 text-sm font-medium uppercase tracking-wide mb-1 font-sans">Telefon</h3>
                                        <a href="tel:015785585713" className="text-white hover:text-[#ebd297] transition-colors text-xl font-bold font-sans">
                                            0157-85585713
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-5 group p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[#ebd297]/10">
                                    <div className="bg-stone-800 p-3 rounded-full text-[#ebd297] group-hover:bg-[#ebd297] group-hover:text-black transition-colors shadow-lg">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-stone-400 text-sm font-medium uppercase tracking-wide mb-1 font-sans">E-Mail</h3>
                                        <a href="mailto:info@limaex.de" className="text-white hover:text-[#ebd297] transition-colors text-xl font-bold break-all font-sans">
                                            info@limaex.de
                                        </a>
                                    </div>
                                </div>

                                {/* WhatsApp Button */}
                                <div className="pt-2 pl-2">
                                    <a
                                        href="https://api.whatsapp.com/send/?phone=4915785585713&text&type=phone_number&app_absent=0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-[#ebd297] text-black px-10 py-5 rounded-full font-extrabold text-lg hover:bg-[#b38728] hover:text-white transition-all shadow-[0_0_25px_rgba(235,210,151,0.4)] hover:shadow-[0_0_35px_rgba(235,210,151,0.6)] transform hover:scale-110 duration-200 font-sans"
                                    >
                                        <i className="fa-brands fa-whatsapp text-2xl"></i>
                                        WhatsApp schreiben
                                    </a>
                                </div>

                                <div className="flex items-start space-x-5 border-t border-stone-800 pt-8 mt-6">
                                    <div className="bg-stone-800 p-3 rounded-full text-[#ebd297]">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium text-lg mb-1 font-serif">Einsatzgebiet</h3>
                                        <p className="text-stone-400 leading-relaxed font-sans font-light">
                                            Neuhof an der Zenn<br />
                                            <span className="text-[#ebd297] font-semibold">Bayern & deutschlandweit</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Form Side */}
                        <div className="bg-[#1a1a1b] p-8 md:p-10 rounded-3xl shadow-2xl border border-[#ebd297]/20 order-1 md:order-2 relative">
                            {status === ContactStatus.SUCCESS ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce border border-green-500/20">
                                        <CheckCircle className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-serif">Anfrage übermittelt!</h3>
                                    <p className="text-stone-400 mb-8 max-w-xs mx-auto font-sans">Ihre Nachricht wurde erfolgreich übermittelt. Ich melde mich zeitnah bei Ihnen.</p>
                                    <button
                                        onClick={() => setStatus(ContactStatus.IDLE)}
                                        className="px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors font-medium font-sans"
                                    >
                                        Neue Nachricht schreiben
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex justify-between items-baseline mb-6 border-b border-white/5 pb-4">
                                        <h2 className="text-2xl font-bold text-white font-serif">Nachricht senden</h2>
                                        <span className="text-xs text-[#ebd297] uppercase tracking-wider font-sans">* erforderlich</span>
                                    </div>

                                    {/* PFLICHTFELDER */}
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-bold text-[#ebd297] ml-1 font-sans">Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full rounded-xl px-4 py-4 input-gold text-lg placeholder-stone-600 font-sans"
                                                placeholder="Ihr Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-bold text-[#ebd297] ml-1 font-sans">E-Mail *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-xl px-4 py-4 input-gold text-lg placeholder-stone-600 font-sans"
                                                placeholder="ihre@email.de"
                                            />
                                        </div>
                                    </div>

                                    {/* NACHRICHT PFLICHTFELD */}
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-bold text-[#ebd297] ml-1 font-sans">Ihre Nachricht *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full rounded-xl px-4 py-4 input-gold resize-none text-lg placeholder-stone-600 font-sans"
                                            placeholder="Datum, Art des Events, Wünsche..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === ContactStatus.SUBMITTING}
                                        className="btn-lively w-full py-4 rounded-xl flex items-center justify-center space-x-2 mt-4"
                                    >
                                        {status === ContactStatus.SUBMITTING ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Verarbeite...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Absenden</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 mt-16">
                    <div className="max-w-4xl mx-auto bg-[#141415] border border-[#ebd297]/15 rounded-2xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                        <h2 className="text-3xl font-serif font-bold text-[#ebd297] mb-6 text-center">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {FAQS.map((item, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div key={item.q} className="border border-[#ebd297]/20 rounded-xl overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-black/30 hover:bg-black/40 transition-colors text-left"
                                        >
                                            <span className="text-white font-semibold text-base sm:text-lg">{item.q}</span>
                                            <span className="text-[#ebd297] text-xl font-bold">{isOpen ? '–' : '+'}</span>
                                        </button>
                                        {isOpen && (
                                            <div className="px-4 sm:px-6 pb-4 text-stone-300 leading-relaxed bg-black/20 text-sm sm:text-base">
                                                {item.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Booking;