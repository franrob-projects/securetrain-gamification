'use client'
import { useState, useEffect } from 'react'
import { MODULES } from '@/data/modules'
import { ModuleCard } from '@/components/training/ModuleCard'
import { StreakWidget } from '@/components/gamification/StreakWidget'
import { Sector } from '@/types'
import { Shield, Trophy, LayoutDashboard, BookOpen, Zap, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

interface UserStats {
  streak: number
  longestStreak: number
  badgeCount: number
}

export default function HomePage() {
  const [sectorFilter, setSectorFilter] = useState<Sector | 'all'>('all')
  const [stats, setStats] = useState<UserStats>({ streak: 0, longestStreak: 0, badgeCount: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const [streakRes, badgeRes] = await Promise.all([
        supabase.from('streaks').select('current_streak, longest_streak').eq('user_id', session.user.id).single(),
        supabase.from('user_badges').select('badge_id').eq('user_id', session.user.id),
      ])

      setStats({
        streak: streakRes.data?.current_streak ?? 0,
        longestStreak: streakRes.data?.longest_streak ?? 0,
        badgeCount: badgeRes.data?.length ?? 0,
      })
    }
    fetchStats()
  }, [])

  const filtered = MODULES.filter(m =>
    sectorFilter === 'all' || m.sector === sectorFilter || m.sector === 'both'
  )

  const completed = MODULES.filter(m => m.status === 'completed').length
  const available = MODULES.filter(m => m.status === 'available').length

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-100">SecureTrain</span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-900/50 ml-1">Beta</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/leaderboard" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-all">
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-all">
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-300 ml-1">
            JD
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-3">Security Awareness Training</h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            AI-powered, sector-specific scenarios for crypto and iGaming teams. Every session is unique.
          </p>
        </div>

        {/* Streak + stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="md:col-span-2">
            <StreakWidget currentStreak={stats.streak} longestStreak={stats.longestStreak} />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
            {[
              { label: 'Available', value: available, icon: BookOpen, colour: 'text-blue-400' },
              { label: 'Done',      value: completed, icon: Shield,   colour: 'text-green-400' },
              { label: 'Badges',    value: stats.badgeCount, icon: Award, colour: 'text-purple-400' },
            ].map(({ label, value, icon: Icon, colour }) => (
              <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center gap-3 md:flex-col md:items-start md:p-4">
                <Icon className={`w-4 h-4 ${colour}`} />
                <div>
                  <div className="text-xl font-bold text-slate-100">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector filter */}
        <div className="flex gap-2 mb-6">
          {(['all', 'crypto', 'gambling'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                ${sectorFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
            >
              {s === 'all' ? 'All sectors' : s === 'crypto' ? '⛓ Crypto' : '🎲 iGaming'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => <ModuleCard key={m.id} module={m} />)}
        </div>
      </main>
    </div>
  )
}
