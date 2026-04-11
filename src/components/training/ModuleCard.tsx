import Link from 'next/link'
import { CheckCircle2, Lock, ArrowRight, Clock } from 'lucide-react'
import { TrainingModule } from '@/data/modules'
import { ThreatBadge } from '@/components/ui/ThreatBadge'
import { SectorBadge } from '@/components/ui/SectorBadge'
import { formatDuration } from '@/lib/utils'

export function ModuleCard({ module: m }: { module: TrainingModule }) {
  const locked    = m.status === 'locked'
  const completed = m.status === 'completed'

  return (
    <div
      className={`rounded-xl flex flex-col overflow-hidden transition-all group ${locked ? 'opacity-60' : ''}`}
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderTop: '2px solid #2e2a52', transition: 'border-top-color 0.2s ease' }}
      onMouseOver={e => { if (!locked) (e.currentTarget as HTMLDivElement).style.borderTopColor = '#5B54B8' }}
      onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = '#2e2a52' }}
    >
      <div className="px-5 py-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <SectorBadge sector={m.sector} />
            <ThreatBadge level={m.threatLevel} />
          </div>
          {completed && <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--brand)' }} />}
          {locked     && <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--muted)' }} />}
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-1 leading-snug" style={{ color: 'var(--text)' }}>{m.title}</h3>
          <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--muted)' }}>{m.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
            <Clock className="w-3 h-3" /> {formatDuration(m.durationMins)}
          </span>
          {!locked ? (
            <Link
              href={`/train/${m.id}`}
              className="flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-white"
              style={{ color: '#9d97e8' }}
              onMouseOver={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseOut={e => (e.currentTarget.style.color = '#9d97e8')}
            >
              {completed ? 'Retake' : 'Start'} <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>Locked</span>
          )}
        </div>
      </div>
    </div>
  )
}
