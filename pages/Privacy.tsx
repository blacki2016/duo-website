import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

const Privacy: React.FC = () => {
    return (
        <div className="min-h-screen relative w-full overflow-x-hidden">
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
            font-size: 1.8rem; 
        }

        .legal-container h2 {
            font-family: var(--font-title);
            color: var(--text-gold) !important;
            font-size: 1.4rem;
            margin-top: 40px;
            margin-bottom: 15px;
        }

        .legal-container h3 { 
            font-family: var(--font-main); 
            color: var(--text-gold) !important; 
            font-size: 1.1rem; 
            margin-top: 25px; 
            margin-bottom: 10px; 
            font-weight: 600; 
            text-transform: uppercase; 
        }

        .legal-container p, .legal-container li {
            color: var(--text-gray) !important;
            font-weight: 300;
            font-size: 1.05rem;
            margin-bottom: 15px;
            line-height: 1.6;
        }

        .legal-container ul { padding-left: 20px; margin-bottom: 15px; list-style-type: disc; }

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

        /* --- MOBILE ANPASSUNG --- */
        @media (max-width: 768px) {
            .legal-container {
                margin: 100px auto 40px;
                padding: 30px 15px;
                width: 95%;
            }

            .legal-container h1 {
                font-size: 15px !important;
                display: inline-block; 
                max-width: 100%;
                padding-bottom: 4px; 
                margin-bottom: 20px;
                border-bottom-width: 1px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .legal-container h2 {
                font-size: 1.2rem;
            }

            .legal-container h3 { 
                font-size: 1rem; 
                margin-top: 30px; 
            }

            .legal-container p, .legal-container li {
                font-size: 1rem;
            }
        }
      `}</style>

            <div className="legal-page-wrapper">
                <div className="legal-container">
                    <h1>Datenschutzerklärung</h1>

                    <h2>1. Datenschutz auf einen Blick</h2>
                    <h3>Allgemeine Hinweise</h3>
                    <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

                    <h3>Datenerfassung auf dieser Website</h3>
                    <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

                    <hr />

                    <h2>2. Verantwortliche Stelle</h2>
                    <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                    <p>
                        <strong>Maximilian Boy</strong><br />
                        Schafhof 5<br />
                        90616 Neuhof an der Zenn<br />
                        Deutschland
                    </p>
                    <p>
                        Telefon: 0157-85585713<br />
                        E-Mail: <a href="mailto:info@maximilianboy.de">info@maximilianboy.de</a>
                    </p>
                    <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>

                    <hr />

                    <h2>3. Hosting</h2>
                    <p>Diese Website wird bei folgendem Anbieter gehostet:</p>
                    <h3>Alpha Hosting GmbH</h3>
                    <p>(Deutschland)</p>
                    <p>Der Einsatz des Hosters erfolgt zum Zwecke der sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter.</p>
                    <p>Dabei werden alle Daten verarbeitet, die für den Betrieb und die Nutzung der Website erforderlich sind (z. B. IP-Adressen, Meta- und Kommunikationsdaten, Websitezugriffe).</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website)</p>

                    <hr />

                    <h2>4. Allgemeine Hinweise und Pflichtinformationen</h2>

                    <h3>Datenschutz</h3>
                    <p>Der Betreiber dieser Seiten nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

                    <h3>SSL- bzw. TLS-Verschlüsselung</h3>
                    <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an der „https://“-Adresszeile Ihres Browsers.</p>

                    <hr />

                    <h2>5. Ihre Rechte als betroffene Person</h2>
                    <p>Sie haben jederzeit das Recht auf:</p>
                    <ul>
                        <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
                        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                    </ul>
                    <p>Außerdem haben Sie das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.</p>

                    <hr />

                    <h2>6. Datenerfassung auf dieser Website</h2>

                    <h3>Server-Log-Dateien</h3>
                    <p>Der Hostinganbieter erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:</p>
                    <ul>
                        <li>Browsertyp und Browserversion</li>
                        <li>verwendetes Betriebssystem</li>
                        <li>Referrer-URL</li>
                        <li>Hostname des zugreifenden Rechners</li>
                        <li>Uhrzeit der Serveranfrage</li>
                        <li>IP-Adresse</li>
                    </ul>
                    <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO</p>

                    <hr />

                    <h2>7. Kontaktformulare & Buchungsanfragen (Forminator)</h2>
                    <p>Wenn Sie uns per Formular Anfragen zukommen lassen (z. B. Kontakt- oder Buchungsanfragen), werden Ihre Angaben inklusive der von Ihnen angegebenen Kontaktdaten gespeichert, um Ihre Anfrage zu bearbeiten.</p>
                    <p>Die Daten verbleiben bei uns, bis der Zweck der Speicherung entfällt oder Sie deren Löschung verlangen.</p>
                    <p><strong>Rechtsgrundlagen:</strong></p>
                    <ul>
                        <li>Art. 6 Abs. 1 lit. b DSGVO (Vertrag / Vertragsanbahnung)</li>
                        <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung Ihrer Anfrage)</li>
                    </ul>

                    <hr />

                    <h2>8. WordPress Jetpack</h2>
                    <p>Diese Website nutzt Funktionen des Plugins <strong>Jetpack</strong>, bereitgestellt von Automattic Inc., USA. Jetpack kann technische Informationen über Seitenaufrufe erfassen.</p>
                    <p>Dabei können Cookies gesetzt und Daten an Server von Automattic übertragen werden.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO<br />
                        Datenschutzerklärung: <a href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer">https://automattic.com/privacy/</a></p>

                    <hr />

                    <h2>9. Live-Chat (Tawk.to)</h2>
                    <p>Diese Website nutzt den Live-Chat-Dienst <strong>Tawk.to</strong>, bereitgestellt von tawk.to Inc., USA. Über den Chat können personenbezogene Daten wie Name, E-Mail-Adresse oder Chatverläufe verarbeitet werden.</p>
                    <p>Die Nutzung erfolgt freiwillig.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO<br />
                        Datenschutzerklärung: <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer">https://www.tawk.to/privacy-policy/</a></p>

                    <hr />

                    <h2>10. Instagram Feed (Smash Balloon)</h2>
                    <p>Diese Website nutzt das Plugin <strong>Smash Balloon Instagram Feed</strong>, um Inhalte von Instagram darzustellen. Beim Aufruf entsprechender Seiten können personenbezogene Daten (z. B. IP-Adresse) an Meta Platforms Inc. übermittelt werden.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO<br />
                        Datenschutzerklärung Instagram: <a href="https://privacycenter.instagram.com/" target="_blank" rel="noopener noreferrer">https://privacycenter.instagram.com/</a></p>

                    <hr />

                    <h2>11. Pop and Convert</h2>
                    <p>Diese Website nutzt <strong>Pop and Convert</strong>, um interaktive Pop-ups und Hinweise darzustellen. Dabei können technische Informationen wie Gerätetyp oder IP-Adresse verarbeitet werden.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO</p>

                    <hr />

                    <h2>12. YouTube (eingebettete Videos)</h2>
                    <p>Diese Website bindet Videos der Plattform <strong>YouTube</strong> ein, betrieben von Google Ireland Limited. Beim Aufruf einer Seite mit eingebettetem YouTube-Video wird eine Verbindung zu den Servern von YouTube hergestellt.</p>
                    <p>Dabei können Cookies gesetzt und Nutzungsdaten verarbeitet werden.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO<br />
                        Datenschutzerklärung: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></p>

                    <hr />

                    <h2>13. Widerruf Ihrer Einwilligung</h2>
                    <p>Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt unberührt.</p>

                    <hr />

                    <h2>14. Aktualität und Änderung dieser Datenschutzerklärung</h2>
                    <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand <strong>Dezember 2025</strong>. Durch Weiterentwicklung der Website oder gesetzliche Änderungen kann eine Anpassung erforderlich werden.</p>

                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Privacy;