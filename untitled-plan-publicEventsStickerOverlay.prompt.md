## Plan: KI-Sticker auf PublicEvents-Bild

Ziel: Das oberste Bild auf der Seite „Öffentliche Termine“ erhält einen kleinen, dezenten Sticker „*KI generiert“ als Overlay. Wir platzieren ein `span` mit absoluter Positionierung innerhalb des relativ positionierten Bildcontainers, nutzen Tailwind-Utilities oder eine schlanke eigene CSS-Klasse, und setzen `pointer-events: none`, damit bestehende Bildinteraktionen unverändert bleiben.

### Steps
1. Öffne die Seite pages/PublicEvents.tsx und finde `img.fs-sign-image` im Container `div.fs-image-col` innerhalb `div.fs-content-split`.
2. Sicherstellen, dass `fs-image-col` relativ positioniert ist (entweder via bestehendem Styleblock oder `className="relative"`).
3. Direkt nach `img.fs-sign-image` ein `span` mit Text „*KI generiert“ einfügen und absolut positionieren.
4. Styling-Variante A (Tailwind): `absolute top-3 left-3 z-10 px-2 py-1 text-xs font-semibold rounded bg-black/70 text-amber-300 border border-amber-400 backdrop-blur-sm pointer-events-none`.
5. Styling-Variante B (eigene Klasse `.fs-ai-badge`): Klassendefinition im lokalen Styleblock der Seite, mit analogen Werten (Position, Farben, Border, Blur, z-Index, Responsivität).
6. Responsiv verfeinern: z. B. `top-2 left-2 sm:top-3 sm:left-3` und `text-[10px] sm:text-xs` für gute Lesbarkeit auf Mobilgeräten.
7. Visueller Check: Kontrastwirkung gegenüber dem Motiv prüfen; ggf. Farben oder Position (links/rechts) feinjustieren.

### Overlay-Empfehlung & Einfügepunkt
- Einfügepunkt: Innerhalb des Containers `div.fs-image-col`, direkt nach der Zeile mit `img.fs-sign-image`.
- Begründung: `fs-image-col` ist (oder wird) `position: relative`; idealer Anker für ein absolut positioniertes Badge. Das Bild selbst hat keine absolute Position, sodass das Badge stabil bleibt.
- Event-Handling: `pointer-events: none` verhindert, dass das Badge Klicks abfängt (relevant für eventuelle Lightbox- oder Click-Handler auf dem Bild).

### Style-Rahmenbedingungen
- Framework: Tailwind-Utilities werden bereits eingesetzt (z. B. in anderen Seiten/Komponenten), alternativ existiert ein lokaler Styleblock in PublicEvents.tsx.
- Layout: Globale Effekte (GlobalFX-Canvas) liegen mit niedrigem z-Index hinter dem Content; kein Konflikt zu erwarten.
- Seiten-Wrapper: `public-events-wrapper` ist relativ; Badge innerhalb von `fs-image-col` bleibt lokal positioniert.

### Accessibility & i18n
- Alt-Text des Bildes belassen (vorhanden in PublicEvents.tsx). Badge benötigt i. d. R. kein eigenes `aria-label`; optional: `aria-label="KI generiert"`.
- i18n: Keine Lokalisierungsbibliothek gefunden; Inhalte sind statisch deutsch.

### Nächste Schritte
- Variante wählen (Tailwind-Utilities oder `.fs-ai-badge`).
- Implementieren, lokal prüfen (Desktop/Mobil), Feinschliff an Farben/Position.
- Bei Bedarf Sticker-Position auf Top-Right ändern, falls Motiv links stark.
