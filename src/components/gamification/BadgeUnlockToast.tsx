'use client'
import { useEffect, useState } from 'react'
import { BadgeDefinition, TIER_STYLES } from '@/data/badges'
import { X } from 'lucide-react'

interface Props {
  badges: Pick<BadgeDefinition, 'id' | 'name' | 'icon' | 'tier'>[]
  onDismiss: () => void
}

export function BadgeUnlockToast({ badges, onDismiss }: Props) {
  const [visible, setVisible] = useState(true)
  const [current, setCurrent] = useState(0)

  // Auto-advance through multiple badges
  useEffect(() => {
    if (badges.length <= 1) return
    const t = setTimeout(() => {
      if (current < badges.length - 1) setCurrent(c => c + 1)
    }, 3000)
    return () => clearTimeout(t)
  }, [current, badges.length])

  // Auto-dismiss after last badge
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 400)
    }, badges.length * 3000 + 1000)
    return () => clearTimeout(t)
  }, [badges.length, onDismiss])

  if (!visible || badges.length === 0) return null

  const badge = badges[current]
  const ts = TIER_STYLES[badge.tier as keyof typeof TIER_STYLES]

  return (
    <div className={`
      fixed bottom-6 right-6 z-50 rounded-2xl border p-5 shadow-2xl
      flex items-center gap-4 min-w-[280px] max-w-[340px]
      transition-all duration-400
      ${ts.bg} ${ts.border}
      animate-[slideUp_0.4s_ease-out]
    `}
    style={{ animationFillMode: 'both' }}>
      {/* Badge icon */}
      <div className={`
        w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0
        border ${ts.border} bg-black/20
      `}>
        {badge.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${ts.text}`}>
          Badge unlocked — {badge.tier}
        </p>
        <p className="font-semibold text-slate-100 text-sm">{badge.name}</p>
        {badges.length > 1 && (
          <p className="text-xs text-slate-500 mt-1">{current + 1} of {badges.length}</p>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={() => { setVisible(false); setTimeout(onDismiss, 400) }}
        className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
        <div
          className={`h-full ${ts.text.replace('text-', 'bg-')} opacity-60`}
          style={{
            animation: 'shrink 3s linear forwards',
            width: '100%',
          }}
        />
      </div>
    </div>
  )
}
