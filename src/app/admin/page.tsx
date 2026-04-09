'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { MODULES } from '@/data/modules'
import { ModuleCard } from '@/components/training/ModuleCard'
import { ComplianceMatrix } from '@/components/admin/ComplianceMatrix'
import { ConplyLogo } from '@/components/ui/ConplyLogo'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'modules' | 'team'>('modules')

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': 'Bearer ' + session.access_token },
      })
      if (res.status === 403) { router.push('/'); return }
      setLoading(false)
    }
    init()
  }, [router])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <p style={{ color: 'var(--muted)' }}>Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <nav className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <ConplyLogo />
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
          Admin
        </span>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg w-fit" style={{ background: 'var(--surface)' }}>
          {(['modules', 'team'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded text-sm font-medium capitalize transition-all"
              style={tab === t
                ? { background: 'var(--brand)', color: '#fff' }
                : { color: 'var(--muted)' }}>
              {t === 'modules' ? `Modules (${MODULES.length})` : 'Team Compliance'}
            </button>
          ))}
        </div>

        {tab === 'modules' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map(m => <ModuleCard key={m.id} module={m} />)}
          </div>
        )}

        {tab === 'team' && <ComplianceMatrix />}
      </main>
    </div>
  )
}
