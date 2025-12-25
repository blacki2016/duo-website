import 'dotenv/config';
import express from 'express';
import sendBooking from './api/send-booking';
import sendContact from './api/send-contact';
import sendPricing from './api/send-pricing';
import collectEmail from './api/collect-email';
import calcDistance from './api/calc-distance';

const app = express();
const PORT = 3001;

app.use(express.json());

// API Routes
app.post('/send-booking', sendBooking);
app.post('/send-contact', sendContact);
app.post('/send-pricing', sendPricing);
app.post('/collect-email', collectEmail);
app.post('/calc-distance', calcDistance);

app.listen(PORT, () => {
    console.log(`✅ API Server running on http://localhost:${PORT}`);
});
