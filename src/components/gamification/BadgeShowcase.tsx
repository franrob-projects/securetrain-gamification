'use client'
import { useState } from 'react'
import { BadgeDefinition, TIER_STYLES, BADGE_TIER_ORDER } from '@/data/badges'
import { Lock } from 'lucide-react'

interface EarnedBadge extends BadgeDefinition {
  earned: boolean
  earned_at: string | null
}

interface Props {
  badges: EarnedBadge[]
}

export function BadgeShowcase({ badges }: Props) {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all')

  const displayed = badges.filter(b =>
    filter === 'all' ? true :
    filter === 'earned' ? b.earned :
    !b.earned
  )

  const earnedCount = badges.filter(b => b.earned).length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-100">Badges</h3>
          <p className="text-xs text-slate-500 mt-0.5">{earnedCount} of {badges.length} earned</p>
        </div>
        <div className="flex gap-1.5">
          {(['all', 'earned', 'locked'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-3 py-1 rounded-lg text-xs font-medium transition-all capitalize
                ${filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tier groups */}
      {BADGE_TIER_ORDER.slice().reverse().map(tier => {
        const tierBadges = displayed.filter(b => b.tier === tier)
        if (tierBadges.length === 0) return null
        const ts = TIER_STYLES[tier]

        return (
          <div key={tier} className="mb-6">
            <div className={`text-xs font-medium uppercase tracking-wider ${ts.text} mb-3`}>
              {ts.label}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tierBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )
      })}

      {displayed.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-8">No badges to show</p>
      )}
    </div>
  )
}

function BadgeCard({ badge }: { badge: EarnedBadge }) {
  const ts = TIER_STYLES[badge.tier]

  return (
    <div className={`
      rounded-xl border p-4 text-center transition-all
      ${badge.earned
        ? `${ts.bg} ${ts.border}`
        : 'border-slate-800 bg-slate-900/40 opacity-50'
      }
    `}>
      <div className="text-3xl mb-2 relative inline-block">
        {badge.icon}
        {!badge.earned && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded">
            <Lock className="w-4 h-4 text-slate-500" />
          </div>
        )}
      </div>
      <p className={`text-xs font-semibold mb-1 ${badge.earned ? ts.text : 'text-slate-600'}`}>
        {badge.name}
      </p>
      <p className="text-xs text-slate-500 leading-snug">{badge.description}</p>
      {badge.earned && badge.earned_at && (
        <p className="text-xs text-slate-600 mt-2">
          {new Date(badge.earned_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </p>
      )}
    </div>
  )
}
