import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_gizmL7nS_2nD6WDa9fdPd29A5WMD8Nox2');

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

        let response;
        try {
            response = await resend.emails.send({
                from: 'noreply@resend.dev',
                to: 'leonard@wieseckel.com,info@maximilianboy.de',
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
