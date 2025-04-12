// mock-zswap.js — temporary dev-only mock for ZSwap
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  console.log('📦 Mock ZSwap received transaction payload:', req.body);

  // Simulate success response from a real ZSwap server
  const fakeTxId = 'mocked-tx-' + Math.random().toString(36).substring(2, 10);
  res.status(200).json({ txId: fakeTxId });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock ZSwap running at http://localhost:${PORT}`);
});
