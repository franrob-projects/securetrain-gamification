import { BADGES, BadgeDefinition } from '@/data/badges'
import { MODULES } from '@/data/modules'

export interface CompletionRecord {
  module_id: string
  score: number
  completed_at: string
}

export interface UserState {
  completions: CompletionRecord[]
  current_streak: number
  earned_badge_ids: string[]
}

/**
 * Given the user's current state, returns any newly earned badge IDs.
 * Call this after saving a new completion.
 */
export function evaluateNewBadges(
  state: UserState,
  latestCompletion: CompletionRecord
): BadgeDefinition[] {
  const already = new Set(state.earned_badge_ids)
  const newBadges: BadgeDefinition[] = []

  for (const badge of BADGES) {
    if (already.has(badge.id)) continue
    if (checkCondition(badge, state, latestCompletion)) {
      newBadges.push(badge)
    }
  }

  return newBadges
}

function checkCondition(
  badge: BadgeDefinition,
  state: UserState,
  latest: CompletionRecord
): boolean {
  const { condition } = badge
  const { completions, current_streak } = state

  switch (condition.type) {
    case 'first_completion':
      return completions.length === 1

    case 'perfect_score':
      return latest.score === 100

    case 'module_score':
      return (
        latest.module_id === condition.moduleId &&
        latest.score >= (condition.value ?? 100)
      )

    case 'streak':
      return current_streak >= (condition.value ?? 1)

    case 'completions_count':
      return completions.length >= (condition.value ?? 1)

    case 'sector_sweep': {
      const sectorModuleIds = MODULES
        .filter(m => m.sector === condition.sector || m.sector === 'both')
        .map(m => m.id)
      const completedIds = new Set(completions.map(c => c.module_id))
      return sectorModuleIds.every(id => completedIds.has(id))
    }

    case 'threat_level': {
      const criticalModuleIds = MODULES
        .filter(m => m.threatLevel === 'critical')
        .map(m => m.id)
      const completedCritical = completions.filter(c =>
        criticalModuleIds.includes(c.module_id)
      )
      return completedCritical.length >= (condition.value ?? 1)
    }

    default:
      return false
  }
}

/**
 * Calculate streak: given all completion dates + last_activity,
 * return { current_streak, longest_streak }
 */
export function calculateStreak(
  completions: CompletionRecord[],
  lastActivity: string | null
): { current_streak: number; longest_streak: number } {
  if (completions.length === 0) return { current_streak: 0, longest_streak: 0 }

  // Get unique dates of activity
  const dates = [...new Set(
    completions.map(c => c.completed_at.split('T')[0])
  )].sort()

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // Check if streak is still active (activity today or yesterday)
  const lastDate = dates[dates.length - 1]
  if (lastDate !== today && lastDate !== yesterday) {
    return { current_streak: 0, longest_streak: calcLongest(dates) }
  }

  // Count backwards
  let streak = 1
  for (let i = dates.length - 1; i > 0; i--) {
    const curr = new Date(dates[i])
    const prev = new Date(dates[i - 1])
    const diff = (curr.getTime() - prev.getTime()) / 86400000
    if (diff === 1) streak++
    else break
  }

  return { current_streak: streak, longest_streak: calcLongest(dates) }
}

function calcLongest(sortedDates: string[]): number {
  let max = 1, curr = 1
  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1])
    const next = new Date(sortedDates[i])
    if ((next.getTime() - prev.getTime()) / 86400000 === 1) {
      curr++
      max = Math.max(max, curr)
    } else {
      curr = 1
    }
  }
  return max
}
