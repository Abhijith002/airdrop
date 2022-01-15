const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const keyPair = new Keypair();
console.log(keyPair);

const publicKey = new PublicKey(keyPair.publicKey).toString();

const secretKey = keyPair.secretKey;

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(`Wallet Balance: ${walletBalance}`);
  } catch (err) {
    console.log(err);
  }
};

const airdropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log(`-- Airdropping 2 SOL --`);
    const formAirdropSign = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(formAirdropSign);
  } catch (err) {
    console.log(err);
  }
};

const driverFunction = async () => {
  await getWalletBalance();
  await airdropSol();
  await getWalletBalance();
};

driverFunction();
