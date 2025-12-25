import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

async function sendTest() {
    const result = await resend.emails.send({
        from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
        to: process.env.RESEND_TO_CONTACT ?? 'leonard@wieseckel.com',
        subject: 'Test Email from Booking Forms',
        html: '<p>Das ist eine <strong>Test-E-Mail</strong> von deinem Buchungsformular!</p><p>Wenn du das siehst, funktioniert Resend ✅</p>'
    });

    console.log('Result:', result);
}

sendTest().catch(console.error);
