import React from 'react';

const Imprint: React.FC = () => {
  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* 
        Injecting specific styles provided by the user for the Legal pages.
        Using a style tag ensures exact match to the requested design.
      */}
      <style>{`
        :root {
            --bg-dark: #1f1f20;
            --text-gold: #ebd297;
            --text-gray: #b0b0b0;
            --font-title: 'Cinzel', serif;
            --font-main: 'Montserrat', sans-serif;
        }

        .legal-page-wrapper {
            background-color: #141415;
            background-image: radial-gradient(circle at 50% 50%, #1f1f20 0%, #000000 100%);
            color: var(--text-gray) !important;
            font-family: var(--font-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .legal-container {
            width: 90%;
            max-width: 900px;
            margin: 120px auto 60px;
            padding: 50px;
            background: rgba(20, 20, 21, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(235, 210, 151, 0.15);
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
            border-radius: 4px;
            box-sizing: border-box;
            text-align: left;
        }

        .legal-container h1 {
            font-family: var(--font-title);
            color: var(--text-gold) !important;
            margin-top: 0;
            margin-bottom: 30px;
            text-transform: uppercase;
            border-bottom: 2px solid var(--text-gold);
            display: inline-block;
            padding-bottom: 10px;
            line-height: 1.1;
            font-size: 2.5rem;
        }

        .legal-container h2 {
            font-family: var(--font-title);
            color: var(--text-gold) !important;
            font-size: 1.4rem;
            margin-top: 40px;
            margin-bottom: 15px;
        }

        .legal-container p, .legal-container li {
            color: var(--text-gray) !important;
            font-weight: 300;
            font-size: 1.05rem;
            margin-bottom: 15px;
            line-height: 1.6;
        }

        .legal-container strong {
            color: var(--text-gold) !important;
            font-weight: 600;
        }

        .legal-container hr {
            border: 0;
            border-top: 1px solid rgba(235, 210, 151, 0.2);
            margin: 30px 0;
        }

        .legal-container a {
            color: var(--text-gold) !important;
            text-decoration: none;
            border-bottom: 1px dotted var(--text-gold);
            transition: all 0.3s;
            word-break: break-all;
        }

        .legal-container a:hover {
            color: #fff !important;
            border-bottom-style: solid;
        }

        /* --- MOBILE RADICAL FIX --- */
        @media (max-width: 768px) {
            .legal-container {
                margin: 100px auto 40px;
                padding: 30px 15px;
                width: 95%;
            }

            .legal-container h1 {
                font-size: 25px !important;
                display: inline-block; 
                max-width: 100%;
                padding-bottom: 6px; 
                margin-bottom: 25px;
                border-bottom-width: 1px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .legal-container h2 {
                font-size: 1.2rem;
            }

            .legal-container p, .legal-container li {
                font-size: 1rem;
            }
        }
      `}</style>

      <div className="legal-page-wrapper">
        <div className="legal-container">
            <h1>Impressum</h1>

            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
                <strong>Maximilian Boy</strong><br/>
                Schafhof 5<br/>
                90616 Neuhof an der Zenn<br/>
                Deutschland
            </p>

            <p><strong>Rechtsform:</strong> Einzelunternehmer</p>

            <hr/>

            <h2>Kontakt</h2>
            <p>
                Telefon: <a href="tel:015785585713">0157-85585713</a><br/>
                E-Mail: <a href="mailto:info@maximilianboy.de">info@maximilianboy.de</a>
            </p>

            <hr/>

            <h2>Umsatzsteuer</h2>
            <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).</p>

            <hr/>

            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
                <strong>Maximilian Boy</strong><br/>
                Schafhof 5<br/>
                90616 Neuhof an der Zenn
            </p>

            <hr/>

            <h2>Haftung für Inhalte</h2>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

            <hr/>

            <h2>Haftung für Links</h2>
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

            <hr/>

            <h2>Urheberrecht</h2>
            <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>

            <hr/>

            <h2>Online-Streitbeilegung (OS)</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br/>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a></p>
            <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </div>
    </div>
  );
};

export default Imprint;