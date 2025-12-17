import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Loader2, Sparkles, User, Bot } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hallo! 👋 Ich bin der digitale Assistent von Maximilian Boy. Hast du Fragen zu den Shows, Terminen oder zur Technik?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize Gemini
      // Assuming process.env.API_KEY is available as per instructions.
      // If running locally without a proxy, this might expose the key, 
      // but strictly following the prompt instructions for the environment setup.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const systemInstruction = `
        Du bist der freundliche, digitale Assistent auf der Website von Maximilian Boy (Feuerkünstler & Entertainer).
        
        Deine Aufgaben:
        1. Beantworte Fragen kurz, prägnant und freundlich (max 3-4 Sätze).
        2. Duzen ist okay ("Du").
        3. Ziel: Den Nutzer dazu bringen, eine Buchungsanfrage zu stellen oder die Show-Seiten zu besuchen.
        
        Wichtige Fakten über Maximilian Boy:
        - Shows: Feuershow (Outdoor), Artistikshow (Indoor, Licht), Walk Act (Stelzen), Duo Limäx (Magie & Comedy mit Leo Wieseckel).
        - USP: Staatlich geprüfter Bühnenpyrotechniker (Sicherheit!), eigene Technik (Ton/Licht), Basis bei Nürnberg aber deutschlandweit tätig.
        - Kontakt: 0157-85585713, info@maximilianboy.de.
        - Pyrotechnik: Er bietet auch reine Pyrotechnik, Lichterbilder (brennende Herzen) und Spezialeffekte an.
        
        Wenn du etwas nicht weißt, verweise freundlich auf das Kontaktformular oder die Telefonnummer.
        Gib keine Preise direkt an, sondern sage, dass diese individuell je nach Aufwand und Ort kalkuliert werden.
      `;

      const model = ai.models;
      
      // Construct history for context
      // Note: In a real complex app we might manage chat history properly with ai.chats.create
      // For this quick widget, we send the prompt with context.
      const historyText = messages.map(m => `${m.role === 'user' ? 'Nutzer' : 'Assistent'}: ${m.text}`).join('\n');
      const prompt = `${historyText}\nNutzer: ${userMsg}\nAssistent:`;

      const response = await model.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            maxOutputTokens: 150,
        }
      });

      const text = response.text || "Entschuldigung, ich habe gerade Verbindungsprobleme. Bitte kontaktiere Max direkt per WhatsApp.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Hoppla, da ist ein Funke übergesprungen. Ich kann gerade nicht antworten. Schreib uns doch einfach über das Kontaktformular!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full shadow-[0_0_20px_rgba(235,210,151,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-[#141415] text-[#EBD297] rotate-90' : 'bg-gradient-to-r from-[#d4af37] to-[#b38728] text-black'}`}
        aria-label="Chat öffnen"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} fill="currentColor" />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-[#121212]"></span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 z-[9990] w-[90vw] max-w-[380px] bg-[#141415] border border-[#EBD297]/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}
        style={{ height: 'min(500px, 70vh)' }}
      >
        {/* Header */}
        <div className="bg-[#1f1f20] p-4 border-b border-[#EBD297]/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBD297]/10 flex items-center justify-center text-[#EBD297] border border-[#EBD297]/20">
                <Sparkles size={20} />
            </div>
            <div>
                <h3 className="font-serif font-bold text-[#EBD297] leading-none">Max' Assistent</h3>
                <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-[#333] text-gray-300' : 'bg-[#EBD297] text-black'}`}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
                    </div>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-[#333] text-white rounded-tr-none' 
                        : 'bg-[#EBD297]/10 text-stone-200 border border-[#EBD297]/20 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#EBD297] text-black flex items-center justify-center">
                        <Bot size={18} />
                    </div>
                    <div className="bg-[#EBD297]/10 p-3 rounded-2xl rounded-tl-none border border-[#EBD297]/20 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-[#EBD297]" />
                        <span className="text-xs text-stone-400">Tippt...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-[#1f1f20] border-t border-[#EBD297]/20">
            <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-full px-4 py-2 border border-[#333] focus-within:border-[#EBD297]/50 transition-colors">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Frag mich etwas..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-stone-500"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="text-[#EBD297] hover:text-white transition-colors disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
            <div className="text-[10px] text-center text-stone-600 mt-2">
                KI-generierte Antworten. Fehler möglich.
            </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;