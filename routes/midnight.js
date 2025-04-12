import express from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../db.js';
import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';

const router = express.Router();

router.post('/anchor-hash', async (req, res) => {
  const { userId, hash } = req.body;

  if (!userId || !hash) {
    return res.status(400).json({ message: 'Missing userId or hash' });
  }

  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user?.wallet?.seedHex) {
      return res.status(404).json({ message: 'Wallet not found for user' });
    }

    const wallet = await WalletBuilder.build(
      'https://indexer.testnet-02.midnight.network/api/v1/graphql',
      'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws',
      'http://localhost:9999',
      'https://rpc.testnet-02.midnight.network',
      user.wallet.seedHex,
      NetworkId.TestNet,
      'info'
    );

    await wallet.start();

    const walletState = await new Promise((resolve) => {
      wallet.state().subscribe((state) => {
        console.log('✅ Wallet state:', state);
        resolve(state);
      });
    });

    // ✅ Simulate successful submission (no ZK)
    console.log('📦 Anchored hash (mock):', hash);

    res.status(200).json({
      message: 'Hash mock-anchored (no ZK)',
      txId: 'mock-tx-' + Date.now(),
      walletAddress: walletState.address,
    });
  } catch (err) {
    console.error('❌ Midnight anchor error:', err);
    res.status(500).json({ message: 'Failed to anchor hash', error: err.message });
  }
});

export default router;
