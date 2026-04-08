'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { MODULES } from '@/data/modules'
import { ModuleCard } from '@/components/training/ModuleCard'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import Link from 'next/link'

interface User {
  id: string
  email: string
  display_name: string | null
  completions_count: number
  avg_score: number | null
}

export default function AdminPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'modules' | 'users'>('modules')

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }
      try {
        const res = await fetch('/api/admin/users', {
          headers: { 'Authorization': 'Bearer ' + session.access_token },
        })
        if (res.status === 403) { router.push('/'); return }
        if (!res.ok) throw new Error('Failed to fetch users')
        const data = await res.json()
        setUsers(data.users || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
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
          {(['modules', 'users'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded text-sm font-medium capitalize transition-all"
              style={tab === t
                ? { background: 'var(--brand)', color: '#fff' }
                : { color: 'var(--muted)' }}>
              {t === 'modules' ? `Modules (${MODULES.length})` : `Users (${users.length})`}
            </button>
          ))}
        </div>

        {tab === 'modules' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map(m => <ModuleCard key={m.id} module={m} />)}
          </div>
        )}

        {tab === 'users' && (
          <>
            {error && (
              <div className="mb-6 p-4 rounded-lg text-sm text-red-300" style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.4)' }}>
                {error}
              </div>
            )}
            <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--text)' }}>Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: 'var(--text)' }}>Name</th>
                    <th className="px-6 py-3 text-right text-sm font-medium" style={{ color: 'var(--text)' }}>Completions</th>
                    <th className="px-6 py-3 text-right text-sm font-medium" style={{ color: 'var(--text)' }}>Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-center" style={{ color: 'var(--muted)' }}>No users yet</td></tr>
                  ) : users.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--text)' }}>{user.email}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--muted)' }}>{user.display_name || '—'}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium" style={{ color: 'var(--text)' }}>{user.completions_count}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium" style={{ color: 'var(--text)' }}>
                        {user.avg_score ? user.avg_score.toFixed(0) + '%' : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
