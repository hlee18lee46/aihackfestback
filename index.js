import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';
import { generateRandomSeed } from '@midnight-ntwrk/wallet-sdk-hd';

function toHexString(buffer) {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function main() {
  const seedBytes = generateRandomSeed();           // Uint8Array
  const seedHex = toHexString(seedBytes);           // Convert to hex string
/*
  const wallet = await WalletBuilder.build(
    'https://indexer.testnet-02.midnight.network/api/v1/graphql',
    'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws',
    'http://localhost:6300',
    'https://rpc.testnet-02.midnight.network',
    seedHex,
    NetworkId.TestNet,
    'info'
  );
*/

const wallet = await WalletBuilder.build(
    'https://indexer.testnet-02.midnight.network/api/v1/graphql',
    'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws',
    'http://localhost:9999', // 👈 this avoids null error
    'https://rpc.testnet-02.midnight.network',
    seedHex,
    NetworkId.TestNet,
    'info'
  );
  
  

  wallet.start();

  wallet.state().subscribe((state) => {
    console.log('📦 Wallet state:', state);
  });
}

main().catch(console.error);