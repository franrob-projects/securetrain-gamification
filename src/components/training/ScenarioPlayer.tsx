'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { TrainingModule } from '@/data/modules'
import { CheckCircle2, XCircle, FileText, HelpCircle } from 'lucide-react'

interface Scenario {
  scenario: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const TOTAL = 3

const OPTION_COLORS = [
  { idle: 'rgba(96,165,250,0.06)',  border: 'rgba(96,165,250,0.15)',  letter: '#60a5fa' },
  { idle: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.15)', letter: '#a78bfa' },
  { idle: 'rgba(244,114,182,0.06)', border: 'rgba(244,114,182,0.15)', letter: '#f472b6' },
  { idle: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.15)',  letter: '#fbbf24' },
]

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

  useEffect(() => {
    fetchScenario()
    fetchScenario()
    fetchScenario()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === scenarios[current].correctIndex) setCorrect(c => c + 1)
  }

  function handleNext() {
    const nextIdx = current + 1
    if (nextIdx >= TOTAL) {
      const finalCorrect = correct
      onComplete(Math.round((finalCorrect / TOTAL) * 100), finalCorrect)
      return
    }
    setCurrent(nextIdx)
    setSelected(null)
    if (!scenarios[nextIdx]) fetchScenario()
  }

  if (loading && !scenarios[current]) return (
    <div className="flex flex-col items-center gap-5 py-20">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(91,84,184,0.12)', border: '1px solid rgba(91,84,184,0.25)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--accent)', animation: 'pulse 1.5s ease-in-out infinite' }}>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M8 13h2" /><path d="M8 17h2" />
          <path d="M14 13h2" /><path d="M14 17h2" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
          Generating scenario
        </p>
        <p className="text-xs" style={{ color: 'var(--muted)', animation: 'pulse 1.5s ease-in-out infinite' }}>
          Retrieving Gibraltar regulation text...
        </p>
      </div>
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

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div
                style={{
                  width: i < current ? '100%' : i === current && answered ? '100%' : i === current ? '50%' : '0%',
                  height: '100%',
                  background: i < current || (i === current && answered) ? '#4ade80' : 'rgba(91,84,184,0.4)',
                  transition: 'width 500ms ease-in-out',
                  borderRadius: 'inherit',
                }}
              />
            </div>
          ))}
        </div>
        <span className="text-xs font-medium whitespace-nowrap px-2.5 py-1 rounded-lg" style={{ color: 'var(--accent)', background: 'rgba(91,84,184,0.1)', border: '1px solid rgba(91,84,184,0.2)' }}>
          {current + 1} of {TOTAL}
        </span>
      </div>

      {/* Scenario card */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
        {/* Header strip */}
        <div className="px-6 py-3 flex items-center gap-2"
          style={{ background: 'rgba(91,84,184,0.08)', borderBottom: '1px solid var(--card-border)' }}>
          <FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} />
          <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            Scenario
          </span>
        </div>
        {/* Body */}
        <div className="px-6 py-5" style={{ background: 'var(--surface)' }}>
          <p className="text-sm leading-[1.85]" style={{ color: 'var(--text)' }}>{s.scenario}</p>
        </div>
      </div>

      {/* Question */}
      <div>
        <div className="flex items-start gap-3 mb-5">
          <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#60a5fa' }} />
          <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--text)' }}>{s.question}</p>
        </div>

        <div className="space-y-3">
          {s.options.map((opt, i) => {
            const c = OPTION_COLORS[i]
            let bg = c.idle, border = c.border, textColor = 'var(--text)', letterColor = c.letter
            if (answered) {
              if (i === s.correctIndex)  { bg = 'rgba(22,163,74,0.1)';  border = 'rgba(22,163,74,0.5)';  textColor = '#4ade80'; letterColor = '#4ade80' }
              else if (i === selected)   { bg = 'rgba(185,28,28,0.1)';  border = 'rgba(185,28,28,0.5)';  textColor = '#f87171'; letterColor = '#f87171' }
              else                       { textColor = 'var(--muted)'; letterColor = 'var(--muted)'; bg = 'transparent'; border = 'var(--card-border)' }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                className="w-full text-left px-5 py-4 rounded-xl text-sm transition-all flex items-start gap-4 group"
                style={{ border: `1px solid ${border}`, background: bg, color: textColor }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all"
                  style={{ background: answered ? 'transparent' : `${c.letter}15`, color: letterColor, border: `1px solid ${border}` }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-relaxed pt-0.5">{opt}</span>
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
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${wasCorrect ? 'rgba(22,163,74,0.3)' : 'rgba(185,28,28,0.3)'}` }}
        >
          {/* Feedback header */}
          <div className="px-5 py-3 flex items-center gap-2"
            style={{
              background: wasCorrect ? 'rgba(22,163,74,0.08)' : 'rgba(185,28,28,0.08)',
              borderBottom: `1px solid ${wasCorrect ? 'rgba(22,163,74,0.15)' : 'rgba(185,28,28,0.15)'}`,
            }}>
            {wasCorrect
              ? <CheckCircle2 className="w-4 h-4 text-green-400" />
              : <XCircle className="w-4 h-4 text-red-400" />}
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: wasCorrect ? '#4ade80' : '#f87171' }}>
              {wasCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </div>
          {/* Explanation body */}
          <div className="px-5 py-4" style={{ background: 'var(--surface)' }}>
            <p className="text-sm leading-[1.85]" style={{ color: 'var(--muted)' }}>{explanationBody}</p>
            {citation && (
              <div className="mt-4 pt-4 flex items-start gap-2.5" style={{ borderTop: '1px solid var(--card-border)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--accent)' }}>
                  {citation}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Actions */}
      {answered && (
        <button onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-colors text-white text-center"
          style={{ background: 'var(--brand)' }}
          onMouseOver={e => (e.currentTarget.style.background = 'var(--brand-hover)')}
          onMouseOut={e => (e.currentTarget.style.background = 'var(--brand)')}>
          {current + 1 < TOTAL ? 'Next scenario' : 'See results'}
        </button>
      )}
    </div>
  )
}
