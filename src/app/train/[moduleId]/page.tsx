'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MODULES } from '@/data/modules'
import { ScenarioPlayer } from '@/components/training/ScenarioPlayer'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { ThreatBadge } from '@/components/ui/ThreatBadge'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Phase = 'intro' | 'training' | 'complete'

export default function TrainPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [finalScore, setFinalScore] = useState(0)
  const [saving, setSaving] = useState(false)

  const module = MODULES.find(m => m.id === moduleId)

  // Auth check re-enabled once Supabase is configured

  const handleComplete = useCallback(async (score: number) => {
    setFinalScore(score)
    setPhase('complete')
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setSaving(false); return }
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token },
        body: JSON.stringify({ moduleId, score }),
      })
    } catch (e) {
      console.error('Failed to save progress', e)
    } finally {
      setSaving(false)
    }
  }, [moduleId])

  if (!module) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <p style={{ color: 'var(--muted)' }}>Module not found. <Link href="/" style={{ color: 'var(--accent)' }}>Go back</Link></p>
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

      <main className="max-w-2xl mx-auto px-6 py-10">
        {phase === 'intro' && (
          <div className="space-y-4">
            <ThreatBadge level={module.threatLevel} />
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>{module.title}</h1>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {module.description.length > 120 ? module.description.slice(0, 120).trimEnd() + '…' : module.description}
              </p>
            </div>
            <ul className="space-y-2">
              {module.topics.slice(0, 3).map(t => (
                <li key={t} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand)' }} />
                  {t}
                </li>
              ))}
            </ul>
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
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${finalScore >= 66 ? 'border-green-600' : 'border-red-700'}`}
                style={{ background: finalScore >= 66 ? 'rgba(22,163,74,0.1)' : 'rgba(185,28,28,0.1)' }}>
                <CheckCircle2 className={`w-10 h-10 ${finalScore >= 66 ? 'text-green-400' : 'text-red-400'}`} />
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--text)' }}>{finalScore}%</div>
              <p style={{ color: 'var(--muted)' }}>
                {finalScore === 100 && 'Perfect. Every scenario answered correctly.'}
                {finalScore >= 66 && finalScore < 100 && 'Good work. Review the topics to sharpen further.'}
                {finalScore < 66 && 'This area needs more practice. Try again.'}
              </p>
            </div>
            {saving && <p className="text-xs" style={{ color: 'var(--muted)' }}>Saving progress...</p>}
          </div>
        )}
      </main>
    </div>
  )
}
