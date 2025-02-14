import { useState, useEffect } from "react"
import { getKeys, isValidSeedPhrase } from "@/actions/seed.actions"
import { decrypt, encrypt } from './encrypt.actions'
import { getSeedPhrase, storeSeedPhrase } from './walletdb.actions'
import { useRouter } from 'next/navigation'

const SEEDPHRASE = process.env.NEXT_PUBLIC_SEED_PHRASE!
export function useAuth() {
	const [seedPhrase, setSeedPhrase] = useState<Array<string>>(SEEDPHRASE.split(" "))  // Array(12).fill("") in production
	const [error, setError] = useState("")
	const [isValid, setIsValid] = useState(false)
	const router = useRouter()

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
			router.push("/")
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

export function useKeys() {
	const [seedPhrase, setSeedPhrase] = useState<string | null>(null)
	const [publicKey, setPublicKey] = useState<string | null>(null)
	const [privateKey, setPrivateKey] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchKeys = async () => {
			try {
				const seed = await getSeedPhrase()
				if (!seed) {
					setError("No seed phrase found.")
					return
				}
				setSeedPhrase(seed)
				const decryptedSeedPhrase = decrypt(seed)
				const { publicKey, privateKey } = await getKeys(decryptedSeedPhrase)
				setPublicKey(publicKey)
				setPrivateKey(privateKey)
			} catch (err) {
				setError("Failed to retrieve keys.")
				console.error(err)
			}
		}
		fetchKeys()
	}, [])

	return {
		seedPhrase,
		publicKey,
		privateKey,
		error
	} as const
}
