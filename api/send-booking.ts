import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: any, res: any) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY fehlt oder ist nicht gesetzt!');
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, phone, date, location, showFormat, eventType, foundVia, message } = req.body;

        const emailBody = `
Neue Buchungsanfrage erhalten:

Name / Firma: ${name}
E-Mail: ${email}
Telefon: ${phone}
Datum: ${date}
Ort: ${location}
Showformat: ${showFormat}
Art des Events: ${eventType}
Gefunden über: ${foundVia}

Individuelle Details:
${message}
    `.trim();

        // Entwicklungsmodus: Wenn kein API-Key, simuliere erfolgreichen Versand
        if (!process.env.RESEND_API_KEY) {
            console.log('📧 [DEV MODE] Buchungsanfrage (nicht versendet):', { name, email, phone, date, location, showFormat, eventType });
            return res.status(200).json({ success: true, dev: true, message: 'Dev-Modus: E-Mail wurde nicht versendet' });
        }

        let response;
        try {
            response = await resend.emails.send({
                from: 'noreply@limaex.de',
                to: 'info@limaex.de',
                replyTo: email,
                subject: `Buchungsanfrage: ${eventType} am ${date} - ${name}`,
                text: emailBody,
            });
        } catch (err) {
            console.error('Resend API-Fehler:', err);
            return res.status(500).json({ error: 'Fehler beim E-Mail-Versand (Resend API)', details: String(err) });
        }

        if (response.error) {
            console.error('Resend Error:', response.error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        return res.status(200).json({ success: true, id: response.data?.id });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
