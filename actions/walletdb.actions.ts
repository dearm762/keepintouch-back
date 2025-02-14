import Dexie from "dexie"

class WalletDB extends Dexie {
	secrets: Dexie.Table<{ id: string; value: string }, string>

	constructor() {
		super("WalletDB")
		this.version(1).stores({
			secrets: "id",
		})
		this.secrets = this.table("secrets")
	}
}

const db = new WalletDB()

export const storeSeedPhrase = async (seedPhrase: string): Promise<void> => {
	await db.secrets.put({ id: "seedPhrase", value: seedPhrase })
}

export const getSeedPhrase = async (): Promise<string | null> => {
	const secret = await db.secrets.get("seedPhrase")
	return secret?.value || null
}

export const deleteSeedPhrase = async (): Promise<void> => {
	await db.secrets.delete("seedPhrase")
}
