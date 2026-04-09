'use client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { ConplyLogo } from '@/components/ui/ConplyLogo'

type Step = 'email' | 'sent'

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--bg)' }} />}>
      <AuthInner />
    </Suspense>
  )
}

function AuthInner() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') ?? '/'

  const [step, setStep]       = useState<Step>('email')
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  // If user lands here already authenticated (e.g. from magic link), forward them
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.replace(redirect)
    }
    checkSession()
  }, [router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      // Preserve the redirect target across the magic link round-trip
      const redirectUrl = `${window.location.origin}/auth?redirect=${encodeURIComponent(redirect)}`
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectUrl },
      })
      if (err) throw err
      setStep('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>

      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <ConplyLogo size="md" />
        </div>

        {step === 'email' ? (
          <div className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h1 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Sign in</h1>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Enter your work email and we&apos;ll send you a sign-in link.
            </p>

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
                  placeholder="you@company.com"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              {error && (
                <p className="text-xs" style={{ color: '#f87171' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-50"
                style={{ background: 'var(--brand)' }}
                onMouseOver={e => (e.currentTarget.style.background = 'var(--brand-hover)')}
                onMouseOut={e => (e.currentTarget.style.background = 'var(--brand)')}>
                {loading ? 'Sending…' : 'Send sign-in link'}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-xl p-6 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(91,84,184,0.15)', border: '1px solid rgba(91,84,184,0.3)' }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--accent)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>Check your email</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              We sent a sign-in link to <span style={{ color: 'var(--text)' }}>{email}</span>.
              Click it to continue.
            </p>
            <button
              onClick={() => { setStep('email'); setError(null) }}
              className="mt-4 text-xs transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}>
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
