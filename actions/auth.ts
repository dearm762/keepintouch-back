import { useState, useEffect } from "react"
import { isValidSeedPhrase } from "@/actions/seed.actions"
import { encrypt } from './encrypt.actions'
import { getSeedPhrase, storeSeedPhrase } from './walletdb.actions'

const SEEDPHRASE = process.env.NEXT_PUBLIC_SEED_PHRASE!
export function useAuth() {
	const [seedPhrase, setSeedPhrase] = useState<Array<string>>(SEEDPHRASE.split(" "))  // Array(12).fill("") in production
	const [error, setError] = useState("")
	const [isValid, setIsValid] = useState(false)

	useEffect(() => {
		setError("")
		if (seedPhrase.some((word) => word.trim() === "")) {
			setIsValid(false)
			return
		}
		setIsValid(isValidSeedPhrase(seedPhrase.join(" ")))
	}, [seedPhrase])

	const handleInputChange = (index: number, value: string) => {
		const newSeedPhrase = [...seedPhrase]
		newSeedPhrase[index] = value
		setSeedPhrase(newSeedPhrase)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (seedPhrase.some((word) => word.trim() === "")) {
			setError("Please fill in all words of the seed phrase.")
		} else if (!isValid) {
			setError("Invalid seed phrase. Please check your words.")
		} else {
			setError("")
			const encryptedSeedPhrase = encrypt(seedPhrase.join(" "))
			storeSeedPhrase(encryptedSeedPhrase)
		}
	}

	return {
		seedPhrase,
		handleInputChange,
		handleSubmit,
		isValid,
		error
	} as const
}

export function useIsAuthorized() {
	const [isAuthorized, setIsAuthorized] = useState(false)

	useEffect(() => {
		const checkAuthorization = async () => {
			const seedPhrase = await getSeedPhrase()
			setIsAuthorized(!!seedPhrase)
		}
		checkAuthorization()
	}, [])

	return {
		isAuthorized
	} as const
}