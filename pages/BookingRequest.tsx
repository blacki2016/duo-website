import React, { useState, useEffect } from 'react';
import { Calendar, User, MessageSquare, Send, CheckCircle, Phone, Mail } from 'lucide-react';
import { ContactStatus } from '../types';

const SLIDES = [
    'https://maximilianboy.de/mystaging02/wp-content/uploads/2025/12/unnamed-3.jpg'
];

const BookingRequest: React.FC = () => {
    const [status, setStatus] = useState<ContactStatus>(ContactStatus.IDLE);
    const [isFlying, setIsFlying] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        location: '',
        showFormat: '',
        eventType: '',
        foundVia: '',
        message: ''
    });

    // Background Slider (8-Sekunden-Wechsel mit Crossfade)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFlying(true);
        setStatus(ContactStatus.SUBMITTING);

        try {
            const response = await fetch('/api/send-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send');
            }

            setTimeout(() => {
                setStatus(ContactStatus.SUCCESS);
                setIsFlying(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    location: '',
                    showFormat: '',
                    eventType: '',
                    foundVia: '',
                    message: ''
                });
                e.currentTarget.reset();
            }, 1500);
        } catch (err) {
            console.error(err);
            setStatus(ContactStatus.IDLE);
            setIsFlying(false);
            alert('Fehler beim Versenden. Bitte versuchen Sie es später erneut.');
        }
    };

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
            background-position: center 100px;
            background-repeat: no-repeat;
            transition: opacity 2000ms ease-in-out;
            filter: blur(3px) brightness(0.3);
            transform: scale(1.02);
        }

        /* Fly Out Animation */
        @keyframes planeFly {
            0% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
            15% { transform: translate(-20px, 10px) rotate(-10deg) scale(1.1); }
            40% { transform: translate(50px, -50px) rotate(20deg) scale(0.8); opacity: 1; }
            100% { transform: translate(120vw, -120vh) rotate(45deg) scale(0.5); opacity: 0; }
        }
        .fly-away {
            animation: planeFly 1.5s ease-in-out forwards;
            pointer-events: none;
        }

        /* Paper Plane Button Styles */
        .paper-plane-btn {
            background: none;
            border: none;
            cursor: pointer;
            transition: transform 0.3s ease, filter 0.3s ease;
            filter: drop-shadow(0 0 10px rgba(235, 210, 151, 0.3));
            color: #ebd297;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .paper-plane-btn:hover {
            transform: scale(1.1) rotate(-10deg);
            filter: drop-shadow(0 0 20px rgba(235, 210, 151, 0.8));
            color: #fffebb;
        }
        .paper-plane-btn:active {
            transform: scale(0.95);
        }

        /* Custom Input Styles */
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
        /* Remove default date placeholder styling if needed */
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
        }
        
        /* Placeholder styling for selects */
        select:invalid { color: #666; }
        option { color: white; background: #0a0a0a; }
      `}</style>

            <div className="relative z-10 pt-24 pb-20">
                {/* HEADER */}
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] via-[#fffebb] to-[#ebd297] mb-3 drop-shadow-sm">
                        Buchung anfragen
                    </h1>
                    <div className="w-24 h-1 bg-[#ebd297] mx-auto rounded-full mb-6"></div>
                    <p className="text-stone-400 max-w-2xl mx-auto text-xl">
                        Sichern Sie sich Ihren Wunschtermin! <br />
                        Füllen Sie das Formular aus und ich melde mich schnellstmöglich bei Ihnen.
                    </p>
                </div>

                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-[#141415] p-8 md:p-12 rounded-3xl shadow-2xl border border-[#ebd297]/20 relative overflow-hidden">

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ebd297]/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#ebd297]/5 rounded-full blur-[60px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                        {status === ContactStatus.SUCCESS ? (
                            <div className="h-[400px] flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce border border-green-500/20">
                                    <CheckCircle className="w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white mb-4">Anfrage übermittelt! ✅</h3>
                                <p className="text-stone-300 mb-8 max-w-md mx-auto text-xl">
                                    Vielen Dank! Ihre Buchungsanfrage wurde erfolgreich an mich gesendet. Ich melde mich schnellstmöglich bei Ihnen.
                                </p>
                                <button
                                    onClick={() => setStatus(ContactStatus.IDLE)}
                                    className="px-10 py-4 text-lg bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors font-medium border border-stone-600"
                                >
                                    Neue Anfrage stellen
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">

                                {/* SECTION 1: KONTAKTDATEN */}
                                <div>
                                    <h3 className="text-[#ebd297] font-bold text-2xl mb-6 flex items-center gap-2 border-b border-stone-800 pb-3">
                                        <User className="w-6 h-6" /> Kontaktdaten
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Name / Firma + Ansprechpartner 👤 *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full rounded-xl px-5 py-4 input-gold text-lg"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">E-Mail-Adresse 💌 *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-xl px-5 py-4 input-gold text-lg"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Telefon 📞</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full rounded-xl px-5 py-4 input-gold text-lg"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: EVENT DETAILS */}
                                <div>
                                    <h3 className="text-[#ebd297] font-bold text-2xl mb-6 flex items-center gap-2 border-b border-stone-800 pb-3">
                                        <Calendar className="w-6 h-6" /> Details zum Event
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Datum 📅 *</label>
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full rounded-xl px-5 py-4 input-gold text-lg [color-scheme:dark]"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Veranstaltungsort 🌍📍 *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="location"
                                                    required
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="w-full rounded-xl px-5 py-4 input-gold text-lg"
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>

                                        {/* Event Typ */}
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Art der Veranstaltung 💍🎉🏢🥳 *</label>
                                            <select
                                                name="eventType"
                                                value={formData.eventType}
                                                onChange={handleChange}
                                                required
                                                className={`w-full rounded-xl px-5 py-4 input-gold appearance-none cursor-pointer text-lg ${formData.eventType === '' ? 'text-stone-500' : 'text-white'}`}
                                            >
                                                <option value="" disabled>Was gibts zu feiern?</option>
                                                <option value="Hochzeit 💍">Hochzeit 💍</option>
                                                <option value="Stadtfest 🎉">Stadtfest 🎉</option>
                                                <option value="Firmenevent 🏢">Firmenevent 🏢</option>
                                                <option value="Geburtstag 🥳">Geburtstag 🥳</option>
                                                <option value="Sonstiges">Sonstiges / eigenes Event</option>
                                            </select>
                                        </div>

                                        {/* Showformat */}
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Gewünschter Showformat 🔥🤹‍♂️ *</label>
                                            <select
                                                name="showFormat"
                                                value={formData.showFormat}
                                                onChange={handleChange}
                                                required
                                                className={`w-full rounded-xl px-5 py-4 input-gold appearance-none cursor-pointer text-lg ${formData.showFormat === '' ? 'text-stone-500' : 'text-white'}`}
                                            >
                                                <option value="" disabled>Ich glaube ich will...</option>
                                                <option value="Feuershow 🔥">Feuershow 🔥</option>
                                                <option value="Artistikshow 🤹‍♂️">Artistikshow 🤹‍♂️</option>
                                                <option value="Walk Act 🚶">Walk Act 🚶</option>
                                                <option value="Duo Limäx 🪄">Duo Limäx 🪄</option>
                                                <option value="Beratung gewünscht ❓">Weiß ich noch nicht / Beratung gewünscht ❓</option>
                                                <option value="Ich weiß es noch nicht 🤷‍♂️">Ich weiß es noch nicht 🤷‍♂️</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: SONSTIGES & DETAILS */}
                                <div>
                                    <h3 className="text-[#ebd297] font-bold text-2xl mb-6 flex items-center gap-2 border-b border-stone-800 pb-3">
                                        <MessageSquare className="w-6 h-6" /> Sonstiges
                                    </h3>
                                    <div className="space-y-8">

                                        {/* Wie gefunden */}
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Wie hast du mich gefunden? 🔎</label>
                                            <select
                                                name="foundVia"
                                                value={formData.foundVia}
                                                onChange={handleChange}
                                                className={`w-full rounded-xl px-5 py-4 input-gold appearance-none cursor-pointer text-lg ${formData.foundVia === '' ? 'text-stone-500' : 'text-white'}`}
                                            >
                                                <option value="" disabled>Ich hab dich gefunden über...</option>
                                                <option value="Google - Suche 🌐">Google - Suche 🌐</option>
                                                <option value="Instagram 📸">Instagram 📸</option>
                                                <option value="Facebook 📘">Facebook 📘</option>
                                                <option value="TikTok 🎶">TikTok 🎶</option>
                                                <option value="Empfehlung / Bekannte 🤝">Empfehlung / Bekannte 🤝</option>
                                                <option value="Live gesehen / Veranstaltung 👀">Live gesehen / Veranstaltung 👀</option>
                                            </select>
                                        </div>

                                        {/* Nachricht */}
                                        <div className="space-y-3">
                                            <label className="text-lg font-medium text-stone-300 ml-1">Individuelle Details ✏️</label>
                                            <textarea
                                                name="message"
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full rounded-xl px-5 py-4 input-gold resize-none text-lg"
                                                placeholder="Erzähl mir alles oder nichts!"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* SUBMIT BUTTON AS PAPER PLANE */}
                                <div className="pt-12 flex flex-col items-center justify-center border-b border-white/10 pb-12">
                                    <button
                                        type="submit"
                                        disabled={isFlying}
                                        className={`paper-plane-btn group ${isFlying ? 'fly-away' : ''}`}
                                        title="Jetzt Absenden"
                                    >
                                        {/* Huge Paper Plane Icon */}
                                        <Send strokeWidth={0.8} className="w-32 h-32 md:w-40 md:h-40" />

                                        {/* Label Text */}
                                        <span className="text-sm md:text-base font-serif font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity mt-4">
                                            Absenden
                                        </span>
                                    </button>
                                </div>

                                {/* ADDED CONTACT INFO SECTION */}
                                <div className="pt-6 text-center">
                                    <h3 className="text-[#ebd297] font-serif font-bold text-xl mb-6">Doch lieber direkt sprechen?</h3>
                                    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 items-center text-stone-300">

                                        <a href="tel:015785585713" className="flex items-center gap-3 hover:text-[#ebd297] transition-colors group">
                                            <div className="w-10 h-10 rounded-full bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] group-hover:bg-[#ebd297] group-hover:text-black transition-all">
                                                <Phone size={18} />
                                            </div>
                                            <span className="font-bold">0157 - 85585713</span>
                                        </a>

                                        <a href="mailto:info@maximilianboy.de" className="flex items-center gap-3 hover:text-[#ebd297] transition-colors group">
                                            <div className="w-10 h-10 rounded-full bg-[#ebd297]/10 flex items-center justify-center text-[#ebd297] group-hover:bg-[#ebd297] group-hover:text-black transition-all">
                                                <Mail size={18} />
                                            </div>
                                            <span className="font-bold">info@maximilianboy.de</span>
                                        </a>

                                        <a
                                            href="https://api.whatsapp.com/send/?phone=4915785585713&text&type=phone_number&app_absent=0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 hover:text-[#ebd297] transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#ebd297]/20 flex items-center justify-center text-[#ebd297] group-hover:bg-[#ebd297] group-hover:text-black transition-all">
                                                <i className="fa-brands fa-whatsapp text-lg"></i>
                                            </div>
                                            <span className="font-bold">WhatsApp</span>
                                        </a>
                                    </div>
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingRequest;