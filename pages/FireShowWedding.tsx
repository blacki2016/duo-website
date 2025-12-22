import React from 'react';
import { Link } from 'react-router-dom';
import FireShow from './FireShow';

const FireShowWedding: React.FC = () => {
    return (
        <div>
            {/* Custom Wedding Hero */}
            <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/hochzeit.hintergrund.jpg')] bg-cover bg-center"></div>

                <div className="relative z-20 text-center px-4 max-w-6xl flex flex-col md:flex-row items-center gap-8">
                    {/* Feuerherz Bild */}
                    <div className="flex-shrink-0">
                        <img
                            src="/images/feuerherz.jpg"
                            alt="Brennendes Herz"
                            className="w-64 md:w-80 h-auto rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                        <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 text-white drop-shadow-2xl">
                            Feuershow zur <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-300">Hochzeit</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-100 mb-8 drop-shadow-lg">
                            Das emotionale Highlight für euren großen Tag
                        </p>

                        {/* Hochzeit Test Bild */}
                        <div className="mb-8 flex justify-center">
                            <img
                                src="/images/hochzeit.test.png"
                                alt="Hochzeit Referenz"
                                className="w-full max-w-md h-auto rounded-lg shadow-xl"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/booking-request"
                                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
                            >
                                Anfragen 💕
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rest der FireShow Komponente */}
            <FireShow />
        </div>
    );
};

export default FireShowWedding;
