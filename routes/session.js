// routes/session.js
import express from 'express';
import { connectToDatabase } from '../db.js';
import { sendSessionHashToMidnight } from '../utils/sendSessionHash.js'; // ✅ add this line

const router = express.Router();

router.post('/save-session', async (req, res) => {
  try {
    const { userId, sessionText, sessionHash, zkProof } = req.body;

    if (!userId || !sessionText || !sessionHash || !zkProof) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // ✅ Send sessionHash to Midnight chain
    const midnightTxId = await sendSessionHashToMidnight(sessionHash);

    // ✅ Store everything in MongoDB
    const db = await connectToDatabase();
    const collection = db.collection('therapy_sessions');

    const result = await collection.insertOne({
      userId,
      sessionText,
      sessionHash,
      zkProof,
      midnightTxId, // ⬅️ store the returned TX ID
      timestamp: new Date(),
    });

    res.status(200).json({
      message: 'Session saved and anchored to Midnight',
      id: result.insertedId,
      txId: midnightTxId,
    });
  } catch (error) {
    console.error('❌ Error saving session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
