'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { MODULES } from '@/data/modules'

// Silently redirects authenticated users to their next training module.
// Unauthenticated users remain on the marketing homepage.
export function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data: completions } = await supabase
        .from('completions')
        .select('module_id')
        .eq('user_id', session.user.id)

      const completedIds = new Set((completions ?? []).map((c: { module_id: string }) => c.module_id))
      const next = MODULES.find(m => !completedIds.has(m.id))
      router.replace(`/train/${(next ?? MODULES[0]).id}`)
    }
    check()
  }, [router])

  return null
}
