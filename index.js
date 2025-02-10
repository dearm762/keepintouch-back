const axios = require('axios')

async function fetchNewTokens() {
    try {
        const url = "https://api.dexscreener.com/latest/dex/pairs/solana"
        const response = await axios.get(url)
        return response.data.pairs || []
    } catch {
        console.error("Error fetching tokens")
        return []
    }
}

function filterTokens(tokens) {
    return tokens.filter(token => {
        const age = token.age || 0
        const liquidity = parseFloat(token.liquidity?.usd || 0)
        const marketCap = parseFloat(token.fdv || 0)
        const volume = parseFloat(token.volume?.h1 || 0)
        const priceChange1h = parseFloat(token.priceChange?.h1 || 0)
        const transactions = (token.txns?.h1?.buys || 0) + (token.txns?.h1?.sells || 0)

        return (
            age <= 180 &&
            liquidity >= 50000 && liquidity <= 500000 &&
            marketCap >= 100000 && marketCap <= 2000000 &&
            volume >= 200000 &&
            priceChange1h >= 10 && priceChange1h <= 500 &&
            transactions >= 1000
        )
    })
}

async function main() {
    console.log("Starting Memecoin Scanner...")
    while (true) {
        console.log("\n🔍 Scanning for new tokens...")
        const tokens = await fetchNewTokens()
        const gems = filterTokens(tokens)

        if (gems.length > 0) {
            console.log("\n🚀 Potential Gems Found:")
            gems.forEach(gem => {
                console.log(`🔹 ${gem.baseToken.name} (${gem.baseToken.symbol})`)
                console.log(`   Age: ${gem.age} min | Liquidity: $${gem.liquidity.usd} | Market Cap: $${gem.fdv}`)
                console.log(`   Volume: $${gem.volume.h1} | 1H Change: ${gem.priceChange.h1}%`)
                console.log(`   DEX: ${gem.url}`)
            })
        } else {
            console.log("No new gems found.")
        }

        console.log("⏳ Waiting 5 minutes before the next scan...")
        await new Promise(resolve => setTimeout(resolve, 300000)) // 5 minutes
    }
}

main()
