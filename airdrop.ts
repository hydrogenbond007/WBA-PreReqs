import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const publicKey = new PublicKey('8UQSPaYq1dAoRXjDMrTRYvTnugBdhTHsuZ5thRpZN48S');
const amount = 2; // in lamports

await connection.requestAirdrop(publicKey, amount);