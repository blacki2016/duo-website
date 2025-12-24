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

                    <h2>7. Kontakt- und Buchungsanfragen</h2>
                    <p>Bei Kontakt- und Buchungsanfragen verarbeiten wir die von Ihnen eingegebenen Daten (z. B. Name, E-Mail, Telefonnummer, Veranstaltungsdatum, Ort, Eventtyp, Nachricht), um Ihre Anfrage zu beantworten und Angebote zu erstellen.</p>
                    <p>Die Formularübermittlung erfolgt an unseren Server und wird per E-Mail über den Dienst <strong>Resend</strong> (Resend, 2261 Market Street #4486, San Francisco, CA 94114, USA) an uns weitergeleitet. Dabei werden Ihre Angaben an Resend in die USA übermittelt.</p>
                    <p><strong>Rechtsgrundlagen:</strong></p>
                    <ul>
                        <li>Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Vertragsanbahnung)</li>
                        <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der effizienten Bearbeitung von Anfragen)</li>
                    </ul>
                    <p><strong>Speicherdauer:</strong> bis zur abschließenden Bearbeitung und nachfolgend nach gesetzlichen Aufbewahrungsfristen (z. B. Handels- und Steuerrecht) oder bis zum Widerruf/Widerspruch.</p>

                    <hr />

                    <h2>8. Preisrechner & Distanzberechnung</h2>
                    <p>Der Preisrechner verarbeitet Ihre E-Mail-Adresse, gewählte Leistungen und die eingegebene Location, um eine unverbindliche Preisschätzung zu berechnen.</p>
                    <ul>
                        <li><strong>Geocoding:</strong> Zur Distanzberechnung wird die eingegebene Adresse an den Dienst <strong>Nominatim</strong> (OpenStreetMap) gesendet. Dabei wird ein User-Agent übertragen; IP-Adresse und eingegebene Adresse werden serverseitig verarbeitet.</li>
                        <li><strong>E-Mail-Versand:</strong> Das Ergebnis wird per E-Mail über <strong>Resend</strong> an uns weitergeleitet (USA-Transfer).</li>
                    </ul>
                    <p><strong>Rechtsgrundlagen:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an schneller Angebotserstellung).</p>

                    <hr />

                    <h2>9. E-Mail-Speicherung (Lead-Formular)</h2>
                    <p>Sofern Sie freiwillig Ihre E-Mail-Adresse hinterlassen (z. B. für Rückruf/Follow-up), wird diese serverseitig gespeichert. Es erfolgt keine Weitergabe an Dritte.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Kommunikation).</p>
                    <p><strong>Speicherdauer:</strong> bis Widerruf/Widerspruch oder Wegfall des Zwecks.</p>

                    <hr />

                    <h2>10. Eingebettete Videos (YouTube)</h2>
                    <p>Wir binden Videos von YouTube im <strong>„erweiterten Datenschutzmodus“</strong> über die Domain <strong>youtube-nocookie.com</strong> ein. Erst beim Abspielen kann YouTube Nutzungsdaten verarbeiten (z. B. IP-Adresse, Geräteinformationen) und ggf. Cookies setzen.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an attraktiver Darstellung). Wenn Sie einwilligen, erfolgt die Verarbeitung auf Art. 6 Abs. 1 lit. a DSGVO.</p>
                    <p>Datenschutzerklärung YouTube/Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></p>

                    <hr />

                    <h2>11. Externe Ressourcen & Schriftarten</h2>
                    <p>Zur Darstellung und Funktionalität werden externe Ressourcen nachgeladen:</p>
                    <ul>
                        <li><strong>Google Fonts</strong> (Cinzel, Montserrat) von fonts.googleapis.com / fonts.gstatic.com</li>
                        <li><strong>Font Awesome</strong> Icons von cdnjs.cloudflare.com</li>
                        <li><strong>Tailwind CSS</strong> von cdn.tailwindcss.com</li>
                        <li>JavaScript-Bundles über <strong>esm.sh</strong> (u. a. React, Router)</li>
                        <li>Vorgeladene Bilder von <strong>maximilianboy.de</strong> (WordPress-Medien)</li>
                    </ul>
                    <p>Hierbei werden technische Nutzungsdaten (z. B. IP-Adresse, Timestamp, User-Agent) an die jeweiligen Anbieter übertragen. Es kann zu einer Übermittlung in Drittländer (insbesondere USA) kommen.</p>
                    <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einheitlicher Darstellung und Performance). Bei Einbindung mit Einwilligung: Art. 6 Abs. 1 lit. a DSGVO.</p>

                    <hr />

                    <h2>12. Widerruf Ihrer Einwilligung</h2>
                    <p>Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt unberührt.</p>

                    <hr />

                    <h2>13. Aktualität und Änderung dieser Datenschutzerklärung</h2>
                    <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand <strong>Dezember 2025</strong>. Durch Weiterentwicklung der Website oder gesetzliche Änderungen kann eine Anpassung erforderlich werden.</p>

                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Privacy;