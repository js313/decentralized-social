import { Wallet, verifyMessage } from 'ethers';

const wallet = Wallet.createRandom();
console.log('Generated Wallet Address:', wallet.address);

const message = 'Log in to Decentralized Social App';
const signature = await wallet.signMessage(message);
console.log('Signed Message:', signature);

const recovered = verifyMessage(message, signature);
console.log('Recovered Address:', recovered);

console.log(
  '✅ Valid:',
  recovered.toLowerCase() === wallet.address.toLowerCase(),
);
