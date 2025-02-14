"use client"

import { useState } from "react"
import { ChevronLeft, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import QRCode from "@/components/qr-code"
import { useKeys } from "@/actions/auth.actions"
import { useRouter } from 'next/navigation'

export default function ReceivePage() {
	const { publicKey, error } = useKeys()
	const [copied, setCopied] = useState(false)
	const router = useRouter()

	const handleCopy = async () => {
		if (publicKey) {
			try {
				await navigator.clipboard.writeText(publicKey)
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			} catch (err) {
				console.error("Failed to copy public key", err)
			}
		}
	}

	return (
		<div className="max-w-screen-sm mx-auto min-h-screen flex flex-col items-center gap-4 p-6">
			<div className="w-full">
				<Button variant="link" className="flex items-center" onClick={() => router.push('/')}>
					<ChevronLeft />
					Back
				</Button>
			</div>

			{publicKey && <QRCode publicKey={publicKey} />}

			{publicKey && (
				<div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md w-full justify-center">
					<span className="truncate text-sm font-mono">{publicKey}</span>
					<Button onClick={handleCopy} size="icon" variant="ghost">
						{copied ? <Check className="text-[#1da1f2]" /> : <Copy />}
					</Button>
				</div>
			)}

			{error && <p className="text-red-500">Error: {error}</p>}
		</div>
	)
}
