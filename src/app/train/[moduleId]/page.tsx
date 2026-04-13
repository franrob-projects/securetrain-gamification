'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import { MODULES } from '@/data/modules'
import { ScenarioPlayer } from '@/components/training/ScenarioPlayer'
import { ArrowLeft, CheckCircle2, Download } from 'lucide-react'
import { ThreatBadge } from '@/components/ui/ThreatBadge'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Phase = 'intro' | 'training' | 'complete'
const TOTAL = 3

export default function TrainPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const router = useRouter()
  const [phase, setPhase]                 = useState<Phase>('intro')
  const [finalScore, setFinalScore]       = useState(0)
  const [correctCount, setCorrectCount]   = useState(0)
  const [completedAt, setCompletedAt]     = useState<Date | null>(null)
  const [userEmail, setUserEmail]         = useState<string>('')
  const [saving, setSaving]               = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)

  const module = MODULES.find(m => m.id === moduleId)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace(`/auth?redirect=${encodeURIComponent(`/train/${moduleId}`)}`)
        return
      }
      setUserEmail(session.user.email ?? '')
    }
    checkAuth()
  }, [router, moduleId])

  const handleComplete = useCallback(async (score: number, correct: number) => {
    setFinalScore(score)
    setCorrectCount(correct)
    setCompletedAt(new Date())
    setPhase('complete')
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setSessionExpired(true)
        return
      }
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token },
        body: JSON.stringify({ moduleId, score }),
      })
      if (res.status === 401) setSessionExpired(true)
    } catch (e) {
      console.error('Failed to save progress', e)
    } finally {
      setSaving(false)
    }
  }, [moduleId])

  const downloadPdf = () => {
    if (!module || !completedAt) return
    const doc = new jsPDF()
    const dateStr = completedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const timeStr = completedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    doc.setFontSize(20)
    doc.text('Compliance Training | Completion Record', 20, 30)

    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text('Issued by Conply · Gibraltar Compliance Training', 20, 38)

    doc.setDrawColor(200)
    doc.line(20, 44, 190, 44)

    doc.setFontSize(11)
    doc.setTextColor(0)
    let y = 60
    const row = (label: string, value: string) => {
      doc.setFont('helvetica', 'bold')
      doc.text(label, 20, y)
      doc.setFont('helvetica', 'normal')
      doc.text(value, 70, y)
      y += 10
    }
    row('User:',          userEmail || '—')
    row('Module:',        module.title)
    row('Completed:',     `${dateStr} at ${timeStr}`)
    row('Score:',         `${correctCount} of ${TOTAL} correct (${finalScore}%)`)
    row('Status:',        finalScore >= 66 ? 'Passed' : 'Did not pass')

    doc.setFontSize(9)
    doc.setTextColor(120)
    doc.text('Recorded by Conply | Gibraltar Compliance Training', 20, 280)

    const safeName = module.id.replace(/[^a-z0-9-]/gi, '-')
    doc.save(`conply-completion-${safeName}.pdf`)
  }

  if (!module) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <p style={{ color: 'var(--muted)' }}>Module not found. <Link href="/" style={{ color: 'var(--accent)' }}>Go back</Link></p>
    </div>
  )

  const truncDesc = module.description.length > 100
    ? module.description.slice(0, 100).trimEnd() + '...'
    : module.description

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <nav className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <ConplyLogo size="sm" />
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/progress" className="text-xs sm:text-sm transition-colors" style={{ color: 'var(--muted)' }}>
            My progress
          </Link>
          <Link href="/" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm transition-colors" style={{ color: 'var(--muted)' }}>
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        {phase === 'intro' && (
          <div className="space-y-8">
            {/* Module header with visual treatment */}
            <div className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(91,84,184,0.1), transparent 70%)' }} />
              <div className="relative">
                <ThreatBadge level={module.threatLevel} />
                <h1 className="text-2xl font-bold mt-4 mb-3" style={{ color: 'var(--text)' }}>{module.title}</h1>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{truncDesc}</p>
              </div>
            </div>

            {/* What to expect */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ), label: '3 scenarios' },
                { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" />
                    <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ), label: '~10 minutes' },
                { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                    <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ), label: 'PDF record' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl px-3 py-4 text-center"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setPhase('training')}
              className="w-full py-3.5 px-6 rounded-xl font-semibold transition-colors text-white"
              style={{ background: 'var(--brand)' }}
              onMouseOver={e => (e.currentTarget.style.background = 'var(--brand-hover)')}
              onMouseOut={e => (e.currentTarget.style.background = 'var(--brand)')}>
              Start training
            </button>
          </div>
        )}

        {phase === 'training' && (
          <ScenarioPlayer module={module} onComplete={handleComplete} />
        )}

        {phase === 'complete' && (
          <div className="space-y-6">
            {/* Completion certificate card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--card-border)' }}
            >
              {/* Certificate header band */}
              <div className="px-8 py-6 text-center relative overflow-hidden"
                style={{ background: finalScore >= 66 ? 'rgba(22,163,74,0.08)' : 'rgba(217,119,6,0.08)', borderBottom: `1px solid ${finalScore >= 66 ? 'rgba(22,163,74,0.2)' : 'rgba(217,119,6,0.2)'}` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse, ${finalScore >= 66 ? 'rgba(22,163,74,0.08)' : 'rgba(217,119,6,0.08)'}, transparent 70%)` }} />
                <div className="relative">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: finalScore >= 66 ? 'rgba(22,163,74,0.15)' : 'rgba(217,119,6,0.15)', border: `1px solid ${finalScore >= 66 ? 'rgba(22,163,74,0.4)' : 'rgba(217,119,6,0.4)'}` }}>
                      <CheckCircle2 className="w-7 h-7" style={{ color: finalScore >= 66 ? '#16a34a' : '#d97706' }} />
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                    {finalScore >= 66 ? 'Module passed' : 'Module completed'}
                  </h1>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{module.title}</p>
                </div>
              </div>

              {/* Certificate body */}
              <div className="px-8 py-6" style={{ background: 'var(--card)' }}>
                {/* Score display */}
                <div className="flex items-center justify-center gap-8 py-4 mb-4"
                  style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <div className="text-center">
                    <div className="text-4xl font-bold tracking-tight" style={{ color: finalScore >= 66 ? '#16a34a' : '#d97706' }}>{finalScore}%</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Score</div>
                  </div>
                  <div className="w-px h-12" style={{ background: 'var(--card-border)' }} />
                  <div className="text-center">
                    <div className="text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{correctCount}/{TOTAL}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Correct</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-6">
                  {completedAt && (
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--muted)' }}>Date</span>
                      <span style={{ color: 'var(--text)' }}>
                        {completedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at {completedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--muted)' }}>User</span>
                    <span style={{ color: 'var(--text)' }}>{userEmail || '\u2014'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--muted)' }}>Status</span>
                    <span className="font-medium" style={{ color: finalScore >= 66 ? '#16a34a' : '#d97706' }}>
                      {finalScore >= 66 ? 'Passed' : 'Did not pass'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-center mb-6" style={{ color: 'rgba(139,135,168,0.6)' }}>
                  This completion has been recorded in your compliance audit trail.
                </p>

                {/* PDF download */}
                <button onClick={downloadPdf}
                  className="w-full py-3 px-6 rounded-xl font-semibold transition-colors text-white flex items-center justify-center gap-2"
                  style={{ background: 'var(--brand)' }}
                  onMouseOver={e => (e.currentTarget.style.background = 'var(--brand-hover)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'var(--brand)')}>
                  <Download className="w-4 h-4" />
                  Download completion record
                </button>
              </div>
            </motion.div>

            {/* Tertiary actions */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <button onClick={() => { setPhase('intro'); setFinalScore(0); setCorrectCount(0); setCompletedAt(null) }}
                className="text-xs transition-colors" style={{ color: 'var(--muted)' }}>
                Retry
              </button>
              <Link href="/progress" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}>
                My progress
              </Link>
              <Link href="/" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}>
                Back to modules
              </Link>
            </div>

            {saving && <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>Saving progress...</p>}
            {sessionExpired && (
              <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                Session expired.{' '}
                <Link href={`/auth?redirect=${encodeURIComponent(`/train/${moduleId}`)}`} style={{ color: 'var(--accent)' }}>sign in again</Link>
                {' '}to record this completion.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
