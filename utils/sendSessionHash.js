import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';
import { generateRandomSeed } from '@midnight-ntwrk/wallet-sdk-hd';

function toHexString(buffer) {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sendSessionHashToMidnight(sessionHash) {
  const seedBytes = generateRandomSeed(); // Or load from secure storage in prod
  const seedHex = toHexString(seedBytes);

  const wallet = await WalletBuilder.build(
    'https://indexer.testnet-02.midnight.network/api/v1/graphql',
    'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws',
    'http://localhost:9999', // local service port for zswap proxy
    'https://rpc.testnet-02.midnight.network',
    seedHex,
    NetworkId.TestNet,
    'info'
  );

  await wallet.start();

  const txId = await wallet.sendData(sessionHash); // Sends a simple data payload

  console.log('📤 Sent to Midnight:', txId);

  return txId;
}
