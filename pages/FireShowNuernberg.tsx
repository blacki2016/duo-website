import React from 'react';
import { Link } from 'react-router-dom';
import FireShow from './FireShow';

const FireShowNuernberg: React.FC = () => {
    return (
        <div>
            {/* Custom Nürnberg Hero */}
            <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/feuer.hero.jpg')] bg-cover bg-center"></div>

                <div className="relative z-20 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 text-white drop-shadow-2xl">
                        Feuershow in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Nürnberg</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-stone-100 mb-4 drop-shadow-lg">
                        Professionelle Entertainment für die Nürnberger Region
                    </p>
                    <p className="text-lg text-stone-300 mb-8 drop-shadow-lg">
                        Hochzeiten, Firmenfeste, Festivals – Maximilian Boy liefert spektakuläre Live-Shows
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/buchung-anfragen"
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            In Nürnberg buchen 📍
                        </Link>
                    </div>
                </div>
            </section>

            {/* Rest der FireShow Komponente */}
            <FireShow />
        </div>
    );
};

export default FireShowNuernberg;
