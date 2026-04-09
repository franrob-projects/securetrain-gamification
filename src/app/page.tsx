'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { MODULES } from '@/data/modules'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/auth')
        return
      }

      const { data: completions } = await supabase
        .from('completions')
        .select('module_id')
        .eq('user_id', session.user.id)

      const completedIds = new Set((completions ?? []).map((c: { module_id: string }) => c.module_id))
      const next = MODULES.find(m => !completedIds.has(m.id))

      // If all modules done, loop back to first (retake)
      router.replace(`/train/${(next ?? MODULES[0]).id}`)
    }
    init()
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
