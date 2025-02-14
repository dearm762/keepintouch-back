import { validateMnemonic } from 'bip39'

export const isValidSeedPhrase = (seedPhrase: string): boolean => {
	const words = seedPhrase.trim().split(/\s+/)
	if (words.length !== 12) return false

	return validateMnemonic(seedPhrase)
}