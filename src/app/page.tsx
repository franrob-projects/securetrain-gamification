'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MODULES } from '@/data/modules'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const next = MODULES.find(m => m.status === 'available')
    if (next) {
      router.replace(`/train/${next.id}`)
    } else {
      router.replace('/admin')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--brand)' }} />
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Loading your training…</p>
      </div>
    </div>
  )
}
