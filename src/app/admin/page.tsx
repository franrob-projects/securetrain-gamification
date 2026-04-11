'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { MODULES } from '@/data/modules'
import { ComplianceMatrix } from '@/components/admin/ComplianceMatrix'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import { ThreatBadge } from '@/components/ui/ThreatBadge'
import { SectorBadge } from '@/components/ui/SectorBadge'
import { Clock } from 'lucide-react'
import { formatDuration } from '@/lib/utils'

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
          <div>
            <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>
              All modules available to your team. Module assignment is based on each member&apos;s sector.
            </p>
            <div className="space-y-3">
              {MODULES.map(m => (
                <div key={m.id} className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{m.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>{m.description}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <SectorBadge sector={m.sector} />
                    <ThreatBadge level={m.threatLevel} />
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                      <Clock className="w-3 h-3" /> {formatDuration(m.durationMins)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'team' && <ComplianceMatrix />}
      </main>
    </div>
  )
}
