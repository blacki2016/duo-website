import React from 'react';
import { Link } from 'react-router-dom';
import FireShow from './FireShow';

const FireShowWedding: React.FC = () => {
    return (
        <div>
            {/* Custom Wedding Hero */}
            <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black mt-24">
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/70 z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/hochzeit.test.png')] bg-cover bg-center scale-105"></div>

                {/* Dekorative Wedding-Visuals */}
                <div className="absolute inset-0 flex items-end justify-between px-4 sm:px-10 pb-8 sm:pb-12 gap-4 sm:gap-8 z-10 pointer-events-none">
                    <img
                        src="/images/feuerherz.jpg"
                        alt="Feuerherz"
                        className="hidden md:block w-32 sm:w-44 lg:w-56 rounded-xl shadow-[0_20px_50px_rgba(255,128,128,0.35)] border border-white/15 bg-white/5 backdrop-blur-sm ring-1 ring-white/20 brightness-105 contrast-110"
                    />
                    <img
                        src="/images/hochzeit.test.png"
                        alt="Hochzeitsmoment"
                        className="hidden sm:block w-28 sm:w-40 lg:w-52 rounded-xl shadow-[0_20px_50px_rgba(255,221,186,0.35)] border border-white/15 bg-white/5 backdrop-blur-sm ring-1 ring-white/20 brightness-105 contrast-110"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 text-white drop-shadow-2xl">
                        Feuershow zur <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-300">Hochzeit</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-stone-100 mb-8 drop-shadow-lg">
                        Das emotionale Highlight für euren großen Tag
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/booking-request"
                            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            Anfragen 💕
                        </Link>
                    </div>
                </div>
            </section>

            {/* Rest der FireShow Komponente */}
            <FireShow />
        </div>
    );
};

export default FireShowWedding;
