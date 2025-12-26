import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { ContactStatus } from '../types';
import ScrollToTop from '../components/ScrollToTop';

const Contact: React.FC = () => {
    const [status, setStatus] = useState<ContactStatus>(ContactStatus.IDLE);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                e.currentTarget.reset();
            }, 1500);
        } catch (err) {
            console.error(err);
            setStatus(ContactStatus.IDLE);
            alert('Fehler beim Versenden. Bitte versuchen Sie es später erneut.');
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col text-stone-200 bg-stone-900 font-sans selection:bg-[#ebd297] selection:text-black">
            <style>{`
        .font-cinzel { font-family: 'Cinzel', serif; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        .input-gold {
          background-color: #0a0a0a;
          border: 1px solid #292524;
          color: #e7e5e4;
          transition: all 0.3s ease;
        }
        .input-gold:focus {
          border-color: #ebd297;
          box-shadow: 0 0 10px rgba(235, 210, 151, 0.3);
          outline: none;
        }

        .btn-gold {
          background: linear-gradient(135deg, #8E6F34 0%, #C8A663 50%, #8E6F34 100%);
          background-size: 200% auto;
          transition: all 0.5s ease;
        }
        .btn-gold:hover {
          background-position: right center;
          box-shadow: 0 0 25px rgba(200, 166, 99, 0.7);
          transform: translateY(-2px);
        }
      `}</style>

            <div className="h-24"></div>

            {/* --- HERO SECTION --- */}
            <div className="relative z-10 py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <span className="text-[#ebd297] text-sm font-bold tracking-[0.2em] uppercase">Kontakt & Support</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-white mb-6 animate-fade-up">
                            Wir freuen uns<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebd297] to-[#C8A663]">auf Ihre Nachricht</span>
                        </h1>
                        <p className="text-stone-300 text-lg max-w-2xl mx-auto animate-fade-up delay-100">
                            Haben Sie Fragen? Kontaktieren Sie uns direkt. Wir antworten schnellstmöglich!
                        </p>
                    </div>
                </div>
            </div>

            {/* --- CONTACT INFO CARDS --- */}
            <div className="relative z-10 px-4 mb-24">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                        {/* Telefon */}
                        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#ebd297]/20 rounded-xl p-8 text-center group hover:border-[#ebd297]/60 transition-all">
                            <div className="w-12 h-12 bg-[#ebd297]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ebd297] group-hover:text-black transition-all">
                                <Phone className="w-6 h-6 text-[#ebd297] group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-cinzel font-bold text-white mb-3">Telefon</h3>
                            <a href="tel:015785585713" className="text-[#ebd297] hover:text-white transition-colors font-bold text-lg">
                                0157 - 85585713
                            </a>
                            <p className="text-stone-400 text-sm mt-2">Mo–So, 10:00–20:00 Uhr</p>
                        </div>

                        {/* Email */}
                        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#ebd297]/20 rounded-xl p-8 text-center group hover:border-[#ebd297]/60 transition-all">
                            <div className="w-12 h-12 bg-[#ebd297]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ebd297] group-hover:text-black transition-all">
                                <Mail className="w-6 h-6 text-[#ebd297] group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-cinzel font-bold text-white mb-3">E-Mail</h3>
                            <a href="mailto:info@limaex.de" className="text-[#ebd297] hover:text-white transition-colors font-bold text-lg">
                                info@limaex.de
                            </a>
                            <p className="text-stone-400 text-sm mt-2">Schnelle Antwort garantiert</p>
                        </div>

                        {/* Adresse */}
                        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#ebd297]/20 rounded-xl p-8 text-center group hover:border-[#ebd297]/60 transition-all">
                            <div className="w-12 h-12 bg-[#ebd297]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ebd297] group-hover:text-black transition-all">
                                <MapPin className="w-6 h-6 text-[#ebd297] group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-cinzel font-bold text-white mb-3">Basis</h3>
                            <p className="text-[#ebd297] font-bold text-lg">Nürnberg Region</p>
                            <p className="text-stone-400 text-sm mt-2">Deutschlandweit & International</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTACT FORM & ADDITIONAL INFO --- */}
            <div className="relative z-10 px-4 mb-24">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* --- FORM COLUMN --- */}
                        <div className="lg:col-span-2">
                            {status === ContactStatus.SUCCESS ? (
                                <div className="bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm border-2 border-[#ebd297] rounded-2xl p-12 text-center">
                                    <CheckCircle className="w-16 h-16 text-[#ebd297] mx-auto mb-6" />
                                    <h2 className="text-3xl font-cinzel font-bold text-white mb-4">Nachricht erhalten!</h2>
                                    <p className="text-stone-300 mb-8">
                                        Vielen Dank für Ihre Nachricht. Wir werden uns schnellstmöglich bei Ihnen melden!
                                    </p>
                                    <button
                                        onClick={() => setStatus(ContactStatus.IDLE)}
                                        className="btn-gold px-8 py-3 text-black font-bold uppercase tracking-wider rounded-sm"
                                    >
                                        Neue Nachricht
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#ebd297]/20 rounded-2xl p-8">
                                    <div className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-[#ebd297] font-bold mb-2 text-sm uppercase tracking-wider">Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="input-gold w-full px-4 py-3 rounded-lg"
                                                placeholder="Ihr Name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-[#ebd297] font-bold mb-2 text-sm uppercase tracking-wider">E-Mail *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="input-gold w-full px-4 py-3 rounded-lg"
                                                placeholder="ihre@email.de"
                                            />
                                        </div>

                                        {/* Telefon */}
                                        <div>
                                            <label className="block text-[#ebd297] font-bold mb-2 text-sm uppercase tracking-wider">Telefon (Optional)</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="input-gold w-full px-4 py-3 rounded-lg"
                                                placeholder="0157 85585713"
                                            />
                                        </div>

                                        {/* Betreff */}
                                        <div>
                                            <label className="block text-[#ebd297] font-bold mb-2 text-sm uppercase tracking-wider">Betreff *</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="input-gold w-full px-4 py-3 rounded-lg"
                                                placeholder="Worum geht es?"
                                            />
                                        </div>

                                        {/* Nachricht */}
                                        <div>
                                            <label className="block text-[#ebd297] font-bold mb-2 text-sm uppercase tracking-wider">Nachricht *</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="input-gold w-full px-4 py-3 rounded-lg resize-none"
                                                placeholder="Ihre Nachricht..."
                                            ></textarea>
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={status === ContactStatus.SUBMITTING}
                                            className={`btn-gold w-full py-4 text-black font-bold uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-3 ${status === ContactStatus.SUBMITTING ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {status === ContactStatus.SUBMITTING ? 'Wird versendet...' : 'Nachricht Senden'} <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* --- INFO COLUMN --- */}
                        <div className="space-y-8">
                            {/* Öffnungszeiten */}
                            <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#ebd297]/20 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-6 h-6 text-[#ebd297]" />
                                    <h3 className="text-lg font-cinzel font-bold text-white">Öffnungszeiten</h3>
                                </div>
                                <div className="space-y-2 text-stone-400 text-sm">
                                    <p><span className="text-white font-bold">Montag–Freitag:</span> 10:00–18:00 Uhr</p>
                                    <p><span className="text-white font-bold">Samstag:</span> 10:00–16:00 Uhr</p>
                                    <p><span className="text-white font-bold">Sonntag:</span> Nach Vereinbarung</p>
                                </div>
                            </div>

                            {/* Schnelle Links */}
                            <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#ebd297]/20 rounded-xl p-6">
                                <h3 className="text-lg font-cinzel font-bold text-white mb-4">Schnelle Links</h3>
                                <div className="space-y-3">
                                    <a href="/buchung-anfragen" className="block text-[#ebd297] hover:text-white transition-colors font-bold text-sm">
                                        → Show Buchen
                                    </a>
                                    <a href="/allgemein/ueber-uns/" className="block text-[#ebd297] hover:text-white transition-colors font-bold text-sm">
                                        → Über Uns
                                    </a>
                                    <a href="/shows" className="block text-[#ebd297] hover:text-white transition-colors font-bold text-sm">
                                        → Shows Entdecken
                                    </a>
                                    <a href="/datenschutz" className="block text-[#ebd297] hover:text-white transition-colors font-bold text-sm">
                                        → Datenschutz
                                    </a>
                                </div>
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href="https://api.whatsapp.com/send/?phone=4915785585713"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-gradient-to-r from-[#8E6F34] to-[#C8A663] rounded-xl p-6 text-center text-black font-bold uppercase tracking-wider hover:shadow-lg transition-all"
                            >
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1"></div>
            <ScrollToTop />
        </div>
    );
};

export default Contact;
