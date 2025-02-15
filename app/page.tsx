'use client'

import { ArrowLeftRight, DollarSign, QrCode as QRCodeIcon, Send, History } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSolanaBalance } from '@/actions/solana.actions'

export default function HomePage() {
  const router = useRouter()
  const { solanaBalance } = useSolanaBalance()

  return (
    <>
      <div className='max-w-screen-sm mx-auto min-h-screen flex flex-col'>
        <h2 className='font-semibold text-5xl my-10 text-center'>0$</h2>
        <div className='flex gap-5 justify-center'>
          <Button className='flex flex-col h-20 w-20' onClick={() => router.push('/receive')}>
            <QRCodeIcon size={30} />
            Receive
          </Button>
          <Button className='flex flex-col h-20 w-20'>
            <Send size={30} />
            Send
          </Button>
          <Button className='flex flex-col h-20 w-20'>
            <ArrowLeftRight size={30} />
            Swap
          </Button>
          <Button className='flex flex-col h-20 w-20'>
            <DollarSign size={30} />
            Buy
          </Button>
          <Button className='flex flex-col h-20 w-20'>
            <History size={30} />
            History
          </Button>
        </div>

        <div>
          <h2>Solana Balance</h2>
          {solanaBalance !== null ? (
            <p>Balance: {solanaBalance} SOL</p>
          ) : (
            <p>Loading balance...</p>
          )}
        </div>
      </div>
    </>
  )
}
