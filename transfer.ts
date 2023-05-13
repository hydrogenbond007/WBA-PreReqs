import { Transaction, SystemProgram , Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey  } from "@solana/web3.js";
import wallet from "/Users/madhavgoyal/stuff/airdrop/dev-wallet.json"

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey("GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ");

const connection = new Connection("https://api.devnet.solana.com",'confirmed')

(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey:  to,
                lamports: LAMPORTS_PER_SOL/100,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        
        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log(`Success! Check out your TX here: 
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
