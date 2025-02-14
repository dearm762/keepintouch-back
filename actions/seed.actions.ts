import { Keypair } from "@solana/web3.js"
import { validateMnemonic, mnemonicToSeed } from 'bip39'
import { derivePath } from "ed25519-hd-key"
import bs58 from "bs58"

export const isValidSeedPhrase = (seedPhrase: string): boolean => {
	const words = seedPhrase.trim().split(/\s+/)
	if (words.length !== 12) return false

	return validateMnemonic(seedPhrase)
}

export const getKeys = async (seedPhrase: string | undefined) => {
	if (!seedPhrase) throw new Error("Seed phrase is required.")

	const seed = await mnemonicToSeed(seedPhrase)
	const derivationPath = "m/44'/501'/0'/0'"
	const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key
	const keypair = Keypair.fromSeed(derivedSeed)

	return {
		publicKey: keypair.publicKey.toBase58(),
		privateKey: bs58.encode(keypair.secretKey)
	}
}
