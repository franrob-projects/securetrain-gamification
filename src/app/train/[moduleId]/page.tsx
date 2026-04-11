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
    doc.text('Compliance Training — Completion Record', 20, 30)

    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text('Issued by ConPly · Gibraltar Compliance Training', 20, 38)

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
    doc.text('Recorded by ConPly — Gibraltar Compliance Training', 20, 280)

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
          <div className="space-y-6">
            <ThreatBadge level={module.threatLevel} />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{module.title}</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{truncDesc}</p>
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
          <div className="space-y-8">
            {/* Primary confirmation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-center space-y-3"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.4)' }}>
                  <CheckCircle2 className="w-9 h-9" style={{ color: '#16a34a' }} />
                </div>
              </div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Module completed</h1>
              {completedAt && (
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  Completed {completedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at {completedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{module.title}</p>
            </motion.div>

            {/* Secondary score */}
            <div className="text-center pt-2">
              <p className="text-base" style={{ color: 'var(--text)' }}>
                You answered <span className="font-semibold">{correctCount}</span> of {TOTAL} scenarios correctly
              </p>
              <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
                This completion has been recorded in your compliance audit trail.
              </p>
            </div>

            {/* PDF download */}
            <button onClick={downloadPdf}
              className="w-full py-3 px-6 rounded-xl font-semibold transition-colors text-white flex items-center justify-center gap-2"
              style={{ background: 'var(--brand)' }}
              onMouseOver={e => (e.currentTarget.style.background = 'var(--brand-hover)')}
              onMouseOut={e => (e.currentTarget.style.background = 'var(--brand)')}>
              <Download className="w-4 h-4" />
              Download completion record
            </button>

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

            {saving && <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>Saving progress…</p>}
            {sessionExpired && (
              <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                Session expired —{' '}
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
