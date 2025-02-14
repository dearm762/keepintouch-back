import CryptoJS from "crypto-js"
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!

export const encrypt = (data: string): string => {
	return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

export const decrypt = (ciphertext: string): string => {
	return CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(CryptoJS.enc.Utf8)
}