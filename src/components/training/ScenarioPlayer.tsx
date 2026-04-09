'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { TrainingModule } from '@/data/modules'
import { CheckCircle2, XCircle, ExternalLink } from 'lucide-react'

interface Scenario {
  scenario: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const TOTAL = 3

// Split the explanation body from the trailing "Regulation reference: …" line
function splitCitation(explanation: string): { body: string; citation: string | null } {
  const match = explanation.match(/Regulation reference:\s*(.+)$/im)
  if (!match) return { body: explanation.trim(), citation: null }
  const body = explanation.slice(0, match.index).trim()
  return { body, citation: match[0].trim() }
}

export function ScenarioPlayer({ module: m, onComplete }: { module: TrainingModule; onComplete: (score: number, correct: number) => void }) {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [current, setCurrent]     = useState(0)
  const [selected, setSelected]   = useState<number | null>(null)
  const [correct, setCorrect]     = useState(0)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')

  const fetchScenario = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleTitle: m.title, topics: m.topics }),
      })
      if (!res.ok) throw new Error('Failed to generate scenario')
      const data = await res.json()
      setScenarios(prev => [...prev, data])
    } catch {
      setError('Could not load scenario. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [m.title, m.topics])

  useEffect(() => { fetchScenario() }, [fetchScenario])

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === scenarios[current].correctIndex) setCorrect(c => c + 1)
  }

  function handleNext() {
    const finalCorrect = correct + (selected === scenarios[current].correctIndex ? 0 : 0) // already counted in handleAnswer
    const nextIdx = current + 1
    if (nextIdx >= TOTAL) {
      onComplete(Math.round((finalCorrect / TOTAL) * 100), finalCorrect)
      return
    }
    setCurrent(nextIdx)
    setSelected(null)
    if (!scenarios[nextIdx]) fetchScenario()
  }

  if (loading && !scenarios[current]) return (
    <div className="flex flex-col items-center gap-4 py-20">
      <p
        style={{
          color: '#ffffff',
          fontSize: '14px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      >
        Generating scenario from Gibraltar regulation...
      </p>
    </div>
  )

  if (error) return (
    <div className="text-center py-20 space-y-4">
      <p className="text-sm text-red-400">{error}</p>
      <button onClick={fetchScenario} className="text-xs transition-colors" style={{ color: 'var(--accent)' }}>Try again</button>
    </div>
  )

  const s = scenarios[current]
  if (!s) return null

  const answered   = selected !== null
  const wasCorrect = selected === s.correctIndex
  const { body: explanationBody, citation } = splitCitation(s.explanation)

  // Progress as percentage for animated bar
  const progressPct = ((current + (answered ? 1 : 0)) / TOTAL) * 100

  return (
    <div className="space-y-6">
      {/* Animated progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            style={{
              width: `${progressPct}%`,
              height: '100%',
              background: 'var(--brand)',
              transition: 'width 500ms ease-in-out',
            }}
          />
        </div>
        <span className="text-xs whitespace-nowrap" style={{ color: 'var(--muted)' }}>{current + 1} / {TOTAL}</span>
      </div>

      {/* Scenario */}
      <div className="rounded-xl p-5" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>Scenario</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{s.scenario}</p>
      </div>

      {/* Question */}
      <div>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>{s.question}</p>
        <div className="space-y-2">
          {s.options.map((opt, i) => {
            let bg = 'var(--surface)', border = 'var(--border)', color = 'var(--text)'
            if (answered) {
              if (i === s.correctIndex)  { bg = 'rgba(22,163,74,0.1)';  border = 'rgba(22,163,74,0.5)';  color = '#4ade80' }
              else if (i === selected)   { bg = 'rgba(185,28,28,0.1)';  border = 'rgba(185,28,28,0.5)';  color = '#f87171' }
              else                       { color = 'var(--muted)' }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                style={{ border: `1px solid ${border}`, background: bg, color }}>
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-xl p-4 flex gap-3"
          style={{
            border: `1px solid ${wasCorrect ? 'rgba(22,163,74,0.4)' : 'rgba(185,28,28,0.4)'}`,
            background: wasCorrect ? 'rgba(22,163,74,0.08)' : 'rgba(185,28,28,0.08)',
          }}
        >
          {wasCorrect
            ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            : <XCircle      className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
          <div className="flex-1">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{explanationBody}</p>
            {citation && (
              <p style={{ fontSize: '12px', color: '#8b87a8', marginTop: '12px' }}>
                {citation}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {answered && (
        <a href="https://www.gibraltarcompliancetraining.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: 'var(--muted)' }}>
          <ExternalLink className="w-3 h-3" />
          Deep-dive this topic on Conply — Gibraltar Compliance Training
        </a>
      )}

      {answered && (
        <button onClick={handleNext}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-colors text-white"
          style={{ background: 'var(--brand)' }}
          onMouseOver={e => (e.currentTarget.style.background = 'var(--brand-hover)')}
          onMouseOut={e => (e.currentTarget.style.background = 'var(--brand)')}>
          {current + 1 < TOTAL ? 'Next scenario' : 'See results'}
        </button>
      )}
    </div>
  )
}
