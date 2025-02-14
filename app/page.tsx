'use client'

import { useKeys } from '@/actions/auth.actions'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const { publicKey } = useKeys()

  return (
    <>
      <div className='max-w-screen-sm mx-auto min-h-screen'>
        <h2 className='font-semibold text-5xl my-10 text-center'>122$</h2>
        <Button>Receive</Button>
        <Button>Send</Button>
        { publicKey }
      </div>
    </>
  )
}
