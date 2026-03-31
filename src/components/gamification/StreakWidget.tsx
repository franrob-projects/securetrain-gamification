'use client'
import { Flame, Zap } from 'lucide-react'

interface Props {
  currentStreak: number
  longestStreak: number
}

export function StreakWidget({ currentStreak, longestStreak }: Props) {
  const isActive = currentStreak > 0

  return (
    <div className={`
      rounded-xl border p-4 flex items-center gap-4
      ${isActive
        ? 'border-orange-800/50 bg-orange-950/30'
        : 'border-slate-800 bg-slate-900/60'
      }
    `}>
      {/* Flame icon */}
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
        ${isActive ? 'bg-orange-900/50' : 'bg-slate-800'}
      `}>
        <Flame className={`w-6 h-6 ${isActive ? 'text-orange-400' : 'text-slate-600'}`} />
      </div>

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${isActive ? 'text-orange-300' : 'text-slate-500'}`}>
            {currentStreak}
          </span>
          <span className={`text-sm ${isActive ? 'text-orange-400/70' : 'text-slate-600'}`}>
            day streak
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {isActive
            ? currentStreak === 1
              ? 'Good start — come back tomorrow to extend it'
              : `Keep going! Best: ${longestStreak} days`
            : 'Complete a module today to start your streak'
          }
        </p>
      </div>

      {/* Streak milestone dots */}
      <div className="flex gap-1.5 flex-shrink-0">
        {[1, 3, 7, 14, 30].map((milestone) => (
          <div
            key={milestone}
            title={`${milestone}-day milestone`}
            className={`
              w-2 h-2 rounded-full transition-all
              ${currentStreak >= milestone
                ? 'bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.6)]'
                : 'bg-slate-700'
              }
            `}
          />
        ))}
      </div>
    </div>
  )
}
