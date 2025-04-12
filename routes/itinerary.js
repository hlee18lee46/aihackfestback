import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from '../db.js';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.get('/itinerary/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const db = await connectToDatabase();
    const itineraries = db.collection('itineraries');

    const data = await itineraries
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Failed to fetch itineraries:', err);
    res.status(500).json({ message: 'Error fetching itinerary history' });
  }
});


router.post('/itinerary', async (req, res) => {
  const { userId, destination, days, interests } = req.body;

  if (!destination || !days || !interests || !userId) {
    return res.status(400).json({ message: 'Missing input fields' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Create a ${days}-day travel itinerary for ${destination} focusing on: ${interests}. Include daily schedules, cultural tips, safety notes, and a packing list.`,
    });

    const text = response.text || '[No text returned]';

    const db = await connectToDatabase();
    const itineraries = db.collection('itineraries');

    const doc = await itineraries.insertOne({
      userId,
      destination,
      days,
      interests,
      result: text,
      createdAt: new Date(),
    });

    res.status(200).json({ _id: doc.insertedId, result: text });
  } catch (err) {
    console.error('❌ Gemini API error:', err);
    res.status(500).json({ message: 'Gemini request failed', error: err.message });
  }
});

export default router;
