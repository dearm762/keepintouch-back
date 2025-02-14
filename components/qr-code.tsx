"use client"

import { useState, useEffect, FC } from "react"
import { toDataURL } from "qrcode"

const QRCode: FC<{ publicKey: string }> = ({ publicKey }) => {
	const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

	useEffect(() => {
		const generateQRCode = async () => {
			if (publicKey) {
				try {
					const url = await toDataURL(publicKey, { width: 300 })
					setQrCodeUrl(url)
				} catch (err) {
					console.error("Failed to generate QR code", err)
				}
			}
		}

		generateQRCode()
	}, [publicKey])

	return (
		<div className="flex flex-col items-center gap-4">
			<h2 className="text-xl font-bold">Only Send Your Solana Blockchain Assets</h2>
			{qrCodeUrl ? (
				<img src={qrCodeUrl} alt="QR Code for Public Key" className="w-48 h-48" />
			) : (
				<p>Generating QR code...</p>
			)}
		</div>
	)
}

export default QRCode