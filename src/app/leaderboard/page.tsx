'use client'
import { useEffect, useState } from 'react'
import { Shield, ArrowLeft, Trophy, Flame, Medal } from 'lucide-react'
import Link from 'next/link'
import { Spinner } from '@/components/ui/Spinner'

interface LeaderboardRow {
  id: string
  name: string
  modules_completed: number
  avg_score: number
  streak: number
  badge_count: number
  risk_score: number
}

const RANK_STYLES = [
  { bg: 'bg-yellow-950/40', border: 'border-yellow-700/40', text: 'text-yellow-400', icon: '🥇' },
  { bg: 'bg-slate-800/60',  border: 'border-slate-600/40',  text: 'text-slate-300',  icon: '🥈' },
  { bg: 'bg-orange-950/30', border: 'border-orange-800/40', text: 'text-orange-400', icon: '🥉' },
]

function RiskBar({ score }: { score: number }) {
  const colour = score <= 30 ? 'bg-green-500' : score <= 60 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${colour} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-slate-400 w-6 text-right">{score}</span>
    </div>
  )
}

export default function LeaderboardPage() {
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(data => { setRows(data); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <span className="text-slate-700">/</span>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-slate-300 font-medium">Leaderboard</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Team Leaderboard</h1>
          <p className="text-slate-400 text-sm">Ranked by modules completed and average score. Lower risk score = better.</p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-5 text-center">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {/* Top 3 podium */}
            {rows.slice(0, 3).map((row, i) => {
              const s = RANK_STYLES[i]
              return (
                <div key={row.id} className={`rounded-xl border p-5 ${s.bg} ${s.border}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl w-8 text-center">{s.icon}</span>
                    <div className="flex-1">
                      <p className={`font-semibold ${s.text}`}>{row.name}</p>
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Shield className="w-3 h-3" /> {row.modules_completed} modules
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Medal className="w-3 h-3" /> {row.avg_score}% avg
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Flame className="w-3 h-3" /> {row.streak}d streak
                        </span>
                        <span className="text-xs text-slate-400">
                          {row.badge_count} badges
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1">risk score</p>
                      <RiskBar score={row.risk_score} />
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Rest of the table */}
            {rows.length > 3 && (
              <div className="rounded-xl border border-slate-800 overflow-hidden mt-4">
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0">
                  {/* Header */}
                  {['#', 'Name', 'Modules', 'Avg', 'Streak', 'Risk'].map(h => (
                    <div key={h} className="px-4 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-800 bg-slate-900/60">
                      {h}
                    </div>
                  ))}
                  {/* Rows */}
                  {rows.slice(3).map((row, i) => (
                    <>
                      <div key={`rank-${row.id}`} className="px-4 py-3.5 text-sm text-slate-500 border-b border-slate-800/50 flex items-center">{i + 4}</div>
                      <div key={`name-${row.id}`} className="px-4 py-3.5 text-sm text-slate-200 border-b border-slate-800/50 flex items-center">{row.name}</div>
                      <div key={`mods-${row.id}`} className="px-4 py-3.5 text-sm text-slate-300 border-b border-slate-800/50 flex items-center">{row.modules_completed}</div>
                      <div key={`avg-${row.id}`} className="px-4 py-3.5 text-sm text-slate-300 border-b border-slate-800/50 flex items-center">{row.avg_score}%</div>
                      <div key={`str-${row.id}`} className="px-4 py-3.5 text-sm text-slate-300 border-b border-slate-800/50 flex items-center">{row.streak}d</div>
                      <div key={`risk-${row.id}`} className="px-4 py-3.5 border-b border-slate-800/50 flex items-center">
                        <RiskBar score={row.risk_score} />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}

            {rows.length === 0 && (
              <div className="text-center py-16">
                <Trophy className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400">No entries yet — complete a module to appear here</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
