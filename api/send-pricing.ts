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
        const {
            email,
            selections,
            duolimaxVariant,
            kilometers,
            basePrice,
            travelCost,
            totalPrice
        } = req.body;

        // Erstelle Liste der gewählten Leistungen
        const selectedServices = [];
        if (selections.feuershow) selectedServices.push('🔥 Feuershow (600€)');
        if (selections.artistikshow) selectedServices.push('🎪 Artistikshow (600€)');
        if (selections.walkact) selectedServices.push('🚶 Walk Act (500€)');
        if (selections.duolimax) {
            if (duolimaxVariant === 'mini') {
                selectedServices.push('🎭 Duo Limäx - UKONGU Mini (20 Min) (1.400€)');
            } else {
                selectedServices.push('🌟 Duo Limäx - UKONGU Abendprogramm (90 Min) (2.500€)');
            }
        }
        if (selections.fireHeart) selectedServices.push('❤️‍🔥 Romantische Feuerherz-Deko (+50€)');

        const emailBody = `
Preisanfrage über Preisrechner erhalten:

Kunde E-Mail: ${email}

GEWÄHLTE LEISTUNGEN:
${selectedServices.join('\n')}

FAHRTKOSTEN:
Entfernung: ${kilometers} km
Kosten: ${travelCost.toFixed(2)}€ (0,50€/km)

━━━━━━━━━━━━━━━━━━━━━━━━
PREISKALKULATION:
Leistungen: ${basePrice.toFixed(2)}€
Fahrtkosten: ${travelCost.toFixed(2)}€
━━━━━━━━━━━━━━━━━━━━━━━━
GESAMTPREIS: ${totalPrice.toFixed(2)}€
━━━━━━━━━━━━━━━━━━━━━━━━

Dies ist eine automatische Schätzung. Bitte kontaktiere den Kunden für ein individuelles Angebot.
    `.trim();

        let response;
        try {
            response = await resend.emails.send({
                from: 'noreply@resend.dev',
                to: 'leonard@wieseckel.com',
                replyTo: email,
                subject: `💰 Preisanfrage: ${totalPrice.toFixed(2)}€ - ${email}`,
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
        console.error('Allgemeiner Fehler:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
