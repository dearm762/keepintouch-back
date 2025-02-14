import { Keypair } from "@solana/web3.js"
import * as bip39 from "bip39"
import { derivePath } from "ed25519-hd-key"
import bs58 from "bs58"
const seedPhrase = process.env.SEED_PHRASE!

async function getKeypairFromSeedPhrase(seedPhrase: string) {
	if (!seedPhrase) throw new Error("Seed phrase is required.")
		
	const seed = await bip39.mnemonicToSeed(seedPhrase)
	const derivationPath = "m/44'/501'/0'/0'"
	const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key
	const keypair = Keypair.fromSeed(derivedSeed)
	return keypair
}

(
	async () => {
	const keypair = await getKeypairFromSeedPhrase(seedPhrase)
	console.log("Public Key:", keypair.publicKey.toBase58())
	console.log("Private Key (Base58):", bs58.encode(keypair.secretKey))
})()
