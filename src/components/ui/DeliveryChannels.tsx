import { Smartphone } from 'lucide-react'

export function SlackLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/slack.svg" alt="Slack" className={className} style={{ display: 'block' }} />
  )
}

export function TeamsLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/teams.svg" alt="Microsoft Teams" className={className} style={{ display: 'block' }} />
  )
}

type Variant = 'inline' | 'card' | 'pill'

export function DeliveryChannels({
  variant = 'inline',
  showMobile = true,
  label,
  className = '',
}: {
  variant?: Variant
  showMobile?: boolean
  label?: string
  className?: string
}) {
  if (variant === 'card') {
    return (
      <div
        className={`rounded-xl p-4 ${className}`}
        style={{ background: 'rgba(98,100,167,0.08)', border: '1px solid rgba(98,100,167,0.25)' }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: '#a5a7de' }}>
          {label ?? 'Delivered in'}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlackLogo className="w-7 h-7" />
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Slack</span>
          </div>
          <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="flex items-center gap-2">
            <TeamsLogo className="w-7 h-7" />
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Teams</span>
          </div>
        </div>
        {showMobile && (
          <div className="flex items-center gap-1.5 mt-3 text-[11px]" style={{ color: 'var(--muted)' }}>
            <Smartphone className="w-3.5 h-3.5" />
            Works on mobile, train on the go
          </div>
        )}
      </div>
    )
  }

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full ${className}`}
        style={{ background: 'rgba(98,100,167,0.1)', border: '1px solid rgba(98,100,167,0.25)' }}
      >
        <SlackLogo className="w-4 h-4" />
        <TeamsLogo className="w-4 h-4" />
        <span className="text-[11px] font-medium" style={{ color: 'var(--text)' }}>
          {label ?? 'Delivered in Slack & Teams'}
        </span>
      </div>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <SlackLogo className="w-4 h-4" />
      <TeamsLogo className="w-4 h-4" />
    </span>
  )
}
