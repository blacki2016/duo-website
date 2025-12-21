import express from 'express';
import sendBooking from './api/send-booking';
import sendContact from './api/send-contact';

const app = express();
const PORT = 3001;

app.use(express.json());

// API Routes
app.post('/send-booking', sendBooking);
app.post('/send-contact', sendContact);

app.listen(PORT, () => {
    console.log(`✅ API Server running on http://localhost:${PORT}`);
});
