'use client'
import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { MODULES } from '@/data/modules'
import { ScenarioPlayer } from '@/components/training/ScenarioPlayer'
import { BadgeUnlockToast } from '@/components/gamification/BadgeUnlockToast'
import { Shield, ArrowLeft, CheckCircle2, Flame } from 'lucide-react'
import { ThreatBadge } from '@/components/ui/ThreatBadge'
import { SectorBadge } from '@/components/ui/SectorBadge'
import { formatDuration } from '@/lib/utils'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Phase = 'intro' | 'training' | 'complete'

interface NewBadge {
  id: string
  name: string
  icon: string
  tier: string
}

export default function TrainPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const [phase, setPhase] = useState<Phase>('intro')
  const [finalScore, setFinalScore] = useState(0)
  const [newStreak, setNewStreak] = useState<number | null>(null)
  const [newBadges, setNewBadges] = useState<NewBadge[]>([])
  const [saving, setSaving] = useState(false)

  const module = MODULES.find(m => m.id === moduleId)

  const handleComplete = useCallback(async (score: number) => {
    setFinalScore(score)
    setPhase('complete')
    setSaving(true)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) { setSaving(false); return }

      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({ moduleId, score }),
      })

      const data = await res.json()
      if (data.streak !== undefined) setNewStreak(data.streak)
      if (data.newBadges?.length > 0) setNewBadges(data.newBadges)
    } catch (e) {
      console.error('Failed to save progress', e)
    } finally {
      setSaving(false)
    }
  }, [moduleId])

  if (!module) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <p className="text-slate-400">Module not found. <Link href="/" className="text-blue-400">Go back</Link></p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="text-slate-700">/</span>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-slate-300 font-medium">{module.title}</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        {phase === 'intro' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <SectorBadge sector={module.sector} />
              <ThreatBadge level={module.threatLevel} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100 mb-3">{module.title}</h1>
              <p className="text-slate-400 leading-relaxed">{module.description}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <p className="text-sm font-medium text-slate-300">What you will face</p>
              <ul className="space-y-2">
                {module.topics.map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4">
              <p className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-2">How it works</p>
              <p className="text-sm text-amber-200/70 leading-relaxed">
                3 AI-generated scenarios, each unique to this session. Scores are saved and count toward your streak and badges. Estimated time: <strong className="text-amber-300">{formatDuration(module.durationMins)}</strong>.
              </p>
            </div>
            <button onClick={() => setPhase('training')} className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
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
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${finalScore >= 66 ? 'bg-green-950/50 border-2 border-green-700' : 'bg-red-950/50 border-2 border-red-800'}`}>
                <CheckCircle2 className={`w-10 h-10 ${finalScore >= 66 ? 'text-green-400' : 'text-red-400'}`} />
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-slate-100 mb-2">{finalScore}%</div>
              <p className="text-slate-400">
                {finalScore === 100 && 'Perfect. Every threat identified correctly.'}
                {finalScore >= 66 && finalScore < 100 && 'Good work. Review the red flags to sharpen further.'}
                {finalScore < 66 && 'This threat type needs more practice. Try again.'}
              </p>
            </div>
            {newStreak !== null && newStreak > 0 && (
              <div className="rounded-xl border border-orange-800/40 bg-orange-950/20 p-4 flex items-center justify-center gap-3">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-orange-300 font-medium">{newStreak}-day streak!</span>
              </div>
            )}
            {newBadges.length > 0 && (
              <div className="rounded-xl border border-purple-900/40 bg-purple-950/20 p-4">
                <p className="text-xs text-purple-400 font-medium uppercase tracking-wider mb-3">
                  {newBadges.length === 1 ? 'New badge unlocked' : newBadges.length + ' badges unlocked'}
                </p>
                <div className="flex justify-center gap-3">
                  {newBadges.map(b => (
                    <div key={b.id} className="text-center">
                      <span className="text-2xl">{b.icon}</span>
                      <p className="text-xs text-slate-400 mt-1">{b.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {saving && <p className="text-xs text-slate-500">Saving progress...</p>}
            <div className="flex gap-3">
              <button onClick={() => setPhase('training')} className="flex-1 py-3 px-5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors">
                Retry module
              </button>
              <Link href="/" className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors text-center">
                Back to modules
              </Link>
            </div>
          </div>
        )}
      </main>

      {newBadges.length > 0 && (
        <BadgeUnlockToast badges={newBadges} onDismiss={() => setNewBadges([])} />
      )}
    </div>
  )
}
