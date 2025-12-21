import { Resend } from 'resend';

const resend = new Resend('re_gizmL7nS_2nD6WDa9fdPd29A5WMD8Nox2');

async function sendTest() {
    const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'leonard@wieseckel.com',
        subject: 'Test Email from Booking Forms',
        html: '<p>Das ist eine <strong>Test-E-Mail</strong> von deinem Buchungsformular!</p><p>Wenn du das siehst, funktioniert Resend ✅</p>'
    });

    console.log('Result:', result);
}

sendTest().catch(console.error);
