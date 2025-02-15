import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { useKeys } from "./auth.actions"
import { useEffect, useState } from "react"

const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"

export function useSolanaBalance() {
	const [solanaBalance, setSolanaBalance] = useState<number | null>(null)
	const { publicKey } = useKeys()

	useEffect(() => {
		if (!publicKey) return
		const fetchBalance = async () => {
			try {
				const connection = new Connection(clusterApiUrl("testnet"), "confirmed")
				const pubKey = new PublicKey(publicKey)
				const balanceInLamports = await connection.getBalance(pubKey)
				const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL
				setSolanaBalance(balanceInSol)
			} catch (error) {
				console.error("Failed to fetch Solana balance:", error)
				setSolanaBalance(null)
			}
		}
		fetchBalance()
	}, [publicKey])

	return { solanaBalance } as const
}
