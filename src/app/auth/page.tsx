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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.08) 0%, transparent 70%)' }} />

      <div className="w-full max-w-sm relative">
        <div className="flex justify-center mb-8">
          <ConplyLogo size="md" />
        </div>

        {step === 'email' ? (
          <div className="rounded-2xl p-7 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(91,84,184,0.08), transparent 70%)' }} />
            <div className="relative">
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
                    className="w-full px-3.5 py-3 rounded-xl text-sm outline-none transition-colors"
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
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50"
                  style={{ background: 'var(--brand)' }}
                  onMouseOver={e => (e.currentTarget.style.background = 'var(--brand-hover)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'var(--brand)')}>
                  {loading ? 'Sending...' : 'Send sign-in link'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl p-7 text-center relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.1), transparent 70%)' }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(91,84,184,0.12)', border: '1px solid rgba(91,84,184,0.3)' }}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--accent)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Check your email</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                We sent a sign-in link to <span className="font-medium" style={{ color: 'var(--text)' }}>{email}</span>.
                Click it to continue.
              </p>
              <button
                onClick={() => { setStep('email'); setError(null) }}
                className="mt-5 text-xs transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}>
                Use a different email
              </button>
            </div>
          </div>
        )}

        {/* Trust note */}
        <p className="text-center mt-6 text-xs" style={{ color: 'rgba(139,135,168,0.5)' }}>
          Gibraltar compliance training for crypto and iGaming firms
        </p>
      </div>
    </div>
  )
}
