<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Maximilian Boy – Website

## Lokale Entwicklung

Voraussetzungen: Node.js

- Abhängigkeiten installieren:
  
```bash
npm install
```

- Dev-Server starten (Frontend):

```bash
npm run dev
```

- API-Server starten (Formulare/Preisrechner):

```bash
npm run api
```

Die Frontend-Aufrufe verwenden `/api/...` und werden in der Dev-Umgebung via Vite-Proxy auf `http://localhost:3001` umgeschrieben.

### Umgebungsvariablen

Für den E-Mail-Versand über Resend wird ein API-Key benötigt:

- Setze `RESEND_API_KEY` in deiner Shell oder einer `.env`-Datei, bevor du den API-Server startest.
  
Beispiel macOS (temporär für die Session):

```bash
export RESEND_API_KEY=re_xxx_your_key
npm run api
```

## Produktion

Für die Produktionsumgebung muss der API-Server unter derselben Domain bereitstehen oder die Frontend-Endpoints auf die korrekte API-URL zeigen. Die Dev-Proxy-Einstellung (`vite.config.ts`) gilt nur lokal.
