import { MODULES, type TrainingModule } from '@/data/modules'

export function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86_400_000) + 1) / 7)
}

type MemberSector = 'crypto' | 'gambling' | 'both'

export function pickModule(opts: {
  date?:     Date
  sector?:   MemberSector
  override?: string
}): TrainingModule {
  if (opts.override) {
    const hit = MODULES.find(m => m.id === opts.override)
    if (hit) return hit
  }
  const candidates = opts.sector
    ? MODULES.filter(m => m.sector === 'both' || m.sector === opts.sector)
    : MODULES.filter(m => m.sector === 'both')
  const pool = candidates.length > 0 ? candidates : MODULES
  const week = isoWeek(opts.date ?? new Date())
  return pool[week % pool.length]
}
