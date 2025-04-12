import express from 'express';
import { connectToDatabase } from '../db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/journal', async (req, res) => {
  const { userId, entry, entryHash } = req.body;

  if (!userId || !entry || !entryHash) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const db = await connectToDatabase();
    const journals = db.collection('journals');

    const result = await journals.insertOne({
      userId: new ObjectId(userId),
      entry,
      hash: entryHash,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Journal saved', id: result.insertedId });
  } catch (err) {
    console.error('❌ Error saving journal:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
