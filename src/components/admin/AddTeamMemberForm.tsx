'use client'
import { useState } from 'react'
import { CheckCircle2, Mail, X } from 'lucide-react'
import { createClient } from '@/lib/supabase'

type Sector = 'crypto' | 'gambling' | 'both'
type Result = { name: string; email: string; inviteSent: boolean; inviteReason?: string } | null

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
  const [result, setResult]     = useState<Result>(null)

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
      setResult({
        name,
        email,
        inviteSent:    json.invite?.sent ?? false,
        inviteReason:  json.invite?.reason,
      })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Success state — render after the team member is added
  if (result) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: 'rgba(14,12,30,0.75)' }}
        onClick={onClose}
      >
        <div
          className="rounded-2xl w-full max-w-md p-7 text-center"
          style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.4)' }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: '#16a34a' }} />
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
            {result.name} added
          </h2>
          {result.inviteSent ? (
            <div className="space-y-2 mb-6">
              <p className="text-sm flex items-center justify-center gap-2" style={{ color: 'var(--muted)' }}>
                <Mail className="w-4 h-4" /> Invitation sent to {result.email}
              </p>
              <p className="text-xs" style={{ color: 'rgba(169,165,196,0.7)' }}>
                They&apos;ll receive an email with a sign-in link. Their compliance tracking starts the moment they sign in.
              </p>
            </div>
          ) : (
            <div className="space-y-2 mb-6">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Added to your team list, but the invitation email could not be sent.
              </p>
              <p className="text-xs" style={{ color: 'rgba(169,165,196,0.7)' }}>
                Reason: {result.inviteReason ?? 'unknown'}. They can still sign in manually at /auth using this email. Their team_member row will link automatically.
              </p>
            </div>
          )}
          <button onClick={onClose}
            className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'var(--brand)' }}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(14,12,30,0.75)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-full max-w-md p-7 relative overflow-hidden"
        style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(91,84,184,0.06), transparent 70%)' }} />
        <div className="flex items-center justify-between mb-5 relative">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Add team member</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--muted)' }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(91,84,184,0.1)')}
            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
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
              Job title <span style={{ color: 'rgba(169,165,196,0.5)' }}>(optional)</span>
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

          <p className="text-xs pt-2" style={{ color: 'rgba(169,165,196,0.6)' }}>
            They&apos;ll receive an invitation email with a sign-in link. Their training history starts tracking from their first sign-in.
          </p>
        </form>
      </div>
    </div>
  )
}
