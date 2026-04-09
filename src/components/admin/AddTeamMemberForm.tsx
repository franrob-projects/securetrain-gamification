'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { createClient } from '@/lib/supabase'

type Sector = 'crypto' | 'gambling' | 'both'

export function AddTeamMemberForm({
  onClose,
  onAdded,
}: {
  onClose: () => void
  onAdded: () => void
}) {
  const [email, setEmail]       = useState('')
  const [name, setName]         = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [sector, setSector]     = useState<Sector>('both')
  const [error, setError]       = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('You need to be signed in.')
        return
      }
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({ email, name, job_title: jobTitle, sector }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Failed to add team member')
        return
      }
      onAdded()
      onClose()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(14,12,30,0.75)' }}
      onClick={onClose}
    >
      <div
        className="rounded-xl w-full max-w-md p-6"
        style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Add team member</h2>
          <button onClick={onClose} className="p-1 rounded transition-colors"
            style={{ color: 'var(--muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
              Work email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="alice@company.com"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
              Full name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Alice Chen"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
              Job title <span style={{ color: 'rgba(139,135,168,0.5)' }}>(optional)</span>
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder="MLRO, Compliance Analyst, Senior Manager…"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
              Sector
            </label>
            <div className="flex gap-2">
              {(['crypto', 'gambling', 'both'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSector(s)}
                  className="flex-1 px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors"
                  style={sector === s
                    ? { background: 'var(--brand)', color: '#fff' }
                    : { background: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)' }
                  }>
                  {s === 'gambling' ? 'iGaming' : s === 'both' ? 'Both' : 'Crypto'}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs" style={{ color: '#f87171' }}>{error}</p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-50"
              style={{ background: 'var(--brand)' }}>
              {submitting ? 'Adding…' : 'Add member'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs transition-colors"
              style={{ color: 'var(--muted)' }}>
              Cancel
            </button>
          </div>

          <p className="text-xs pt-2" style={{ color: 'rgba(139,135,168,0.6)' }}>
            They&apos;ll be able to sign in with this email via the magic link on the auth page. Their training history will start tracking from their first sign-in.
          </p>
        </form>
      </div>
    </div>
  )
}
