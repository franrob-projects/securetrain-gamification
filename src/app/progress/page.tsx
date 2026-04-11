'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import jsPDF from 'jspdf'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Download } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { MODULES, TrainingModule } from '@/data/modules'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import { ThreatBadge } from '@/components/ui/ThreatBadge'

interface Completion {
  module_id:  string
  score:      number
  created_at: string
}

const TOTAL_SCENARIOS = 3

export default function ProgressPage() {
  const router = useRouter()
  const [completions, setCompletions] = useState<Completion[]>([])
  const [userEmail, setUserEmail]     = useState('')
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/auth?redirect=/progress')
        return
      }
      setUserEmail(session.user.email ?? '')

      const { data } = await supabase
        .from('completions')
        .select('module_id, score, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      setCompletions((data ?? []) as Completion[])
      setLoading(false)
    }
    init()
  }, [router])

  // Latest completion per module — for the "current state" view
  const latestByModule = new Map<string, Completion>()
  for (const c of completions) {
    if (!latestByModule.has(c.module_id)) latestByModule.set(c.module_id, c)
  }

  // Stats
  const uniqueCompleted = latestByModule.size
  const totalModules    = MODULES.length
  const avgScore        = completions.length > 0
    ? Math.round(completions.reduce((sum, c) => sum + c.score, 0) / completions.length)
    : 0
  const latest = completions[0]

  // Per-completion PDF download
  const downloadPdf = (m: TrainingModule, completion: Completion) => {
    const date    = new Date(completion.created_at)
    const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const timeStr = date.toLocaleTimeString('en-GB',  { hour: '2-digit', minute: '2-digit' })
    const correct = Math.round((completion.score / 100) * TOTAL_SCENARIOS)

    const doc = new jsPDF()
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
      doc.setFont('helvetica', 'bold');   doc.text(label, 20, y)
      doc.setFont('helvetica', 'normal'); doc.text(value, 70, y)
      y += 10
    }
    row('User:',      userEmail || '—')
    row('Module:',    m.title)
    row('Completed:', `${dateStr} at ${timeStr}`)
    row('Score:',     `${correct} of ${TOTAL_SCENARIOS} correct (${completion.score}%)`)
    row('Status:',    completion.score >= 66 ? 'Passed' : 'Did not pass')

    doc.setFontSize(9)
    doc.setTextColor(120)
    doc.text('Recorded by ConPly — Gibraltar Compliance Training', 20, 280)

    const safeName = m.id.replace(/[^a-z0-9-]/gi, '-')
    doc.save(`conply-completion-${safeName}.pdf`)
  }

  const formatDateShort = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <p style={{ color: 'var(--muted)' }}>Loading your progress…</p>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <nav className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <ConplyLogo size="sm" />
        <Link href="/" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: 'var(--muted)' }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>My training history</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>{userEmail}</p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl px-5 py-5 relative overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(91,84,184,0.08), transparent 70%)' }} />
            <div className="relative">
              {/* Progress ring */}
              <div className="flex items-center gap-4">
                <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border)" strokeWidth="3" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="var(--brand)" strokeWidth="3"
                    strokeDasharray={`${(uniqueCompleted / totalModules) * 125.6} 125.6`}
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                    style={{ transition: 'stroke-dasharray 0.5s ease' }} />
                </svg>
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                    {uniqueCompleted}<span className="text-sm font-normal" style={{ color: 'var(--muted)' }}> / {totalModules}</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Modules completed</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl px-5 py-5 relative overflow-hidden" style={{ background: 'var(--card)', border: `1px solid ${avgScore >= 66 ? 'rgba(22,163,74,0.15)' : 'var(--card-border)'}` }}>
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${avgScore >= 66 ? 'rgba(22,163,74,0.06)' : 'rgba(217,119,6,0.06)'}, transparent 70%)` }} />
            <div className="relative">
              <div className="text-3xl font-extrabold mb-1 tracking-tight"
                style={{ color: avgScore >= 66 ? '#16a34a' : avgScore > 0 ? '#d97706' : 'var(--muted)' }}>
                {completions.length > 0 ? `${avgScore}%` : '\u2014'}
              </div>
              <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Average score</div>
            </div>
          </div>
          <div className="rounded-xl px-5 py-5 relative overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <div className="relative">
              <div className="text-base font-semibold mb-1 truncate" style={{ color: 'var(--text)' }}>
                {latest ? formatDateShort(latest.created_at) : '\u2014'}
              </div>
              <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Last completion</div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {completions.length === 0 ? (
          <div className="rounded-xl p-10 text-center"
            style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>You haven&apos;t completed any modules yet.</p>
            <Link href={`/train/${MODULES[0].id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: 'var(--brand)' }}>
              Start your first module <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
              All modules
            </h2>
            {MODULES.map(m => {
              const c = latestByModule.get(m.id)
              const completed = !!c
              return (
                <div key={m.id} className="rounded-xl p-4 sm:p-5 flex items-start sm:items-center gap-3 sm:gap-4"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderLeft: completed ? '3px solid #16a34a' : '3px solid var(--card-border)' }}>
                  {completed
                    ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: '#16a34a' }} />
                    : <Clock         className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: 'var(--muted)' }} />}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{m.title}</h3>
                      <ThreatBadge level={m.threatLevel} />
                    </div>
                    {completed && c
                      ? <p className="text-xs" style={{ color: 'var(--muted)' }}>
                          Completed {formatDateShort(c.created_at)} · scored {c.score}%
                        </p>
                      : <p className="text-xs" style={{ color: 'var(--muted)' }}>Not started</p>
                    }
                  </div>

                  {completed && c ? (
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button onClick={() => downloadPdf(m, c)}
                        title="Download completion record"
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--accent)' }}
                        onMouseOver={e => (e.currentTarget.style.background = 'rgba(91,84,184,0.15)')}
                        onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                        <Download className="w-4 h-4" />
                      </button>
                      <Link href={`/train/${m.id}`}
                        className="text-xs font-semibold transition-colors"
                        style={{ color: 'var(--accent)' }}>
                        Retake
                      </Link>
                    </div>
                  ) : (
                    <Link href={`/train/${m.id}`}
                      className="flex items-center gap-1 text-xs font-semibold flex-shrink-0"
                      style={{ color: 'var(--accent)' }}>
                      Start <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <p className="mt-10 text-xs" style={{ color: 'rgba(139,135,168,0.5)' }}>
          All completions are recorded in your compliance audit trail. Download the PDF record for any completed module above.
        </p>
      </main>
    </div>
  )
}
