'use client'

import { useIsAuthorized } from '@/actions/auth.actions'
import { useRouter } from 'next/navigation'
import SeedPhraseForm from '@/components/seed-phrase-form'

export default function AuthPage() {
  const { isAuthorized } = useIsAuthorized()
  const router = useRouter()

  if (isAuthorized) {
    router.push("/")
    return null
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <SeedPhraseForm />
    </main>
  )
}

