import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sessionRoutes from './routes/session.js';
import authRoutes from './routes/auth.js'; // ✅ Add this
import itineraryRoutes from './routes/itinerary.js';
import journalRoutes from './routes/journal.js';
import midnightRoutes from './routes/midnight.js';

dotenv.config();

const app = express();
const port = 6300;

app.use(cors());
app.use(express.json());

app.use('/api', sessionRoutes);
app.use('/api', authRoutes); // ✅ Register auth routes
app.use('/api', itineraryRoutes);
app.use('/api', journalRoutes);
app.use('/api', midnightRoutes);

app.listen(port, () => {
  console.log(`🧠 SafeTrip backend listening on http://localhost:${port}`);
});
