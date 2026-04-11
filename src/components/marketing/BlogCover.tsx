import { Shield, Scale, FileText, Search, AlertTriangle } from 'lucide-react'

const TOPIC_STYLES: Record<string, {
  icon: typeof Shield
  gradient: string
  accent: string
}> = {
  'gambling-act-2025': {
    icon:     Scale,
    gradient: 'linear-gradient(135deg, rgba(157,151,232,0.15) 0%, rgba(91,84,184,0.08) 100%)',
    accent:   'rgba(157,151,232,0.35)',
  },
  gfsc: {
    icon:     Shield,
    gradient: 'linear-gradient(135deg, rgba(91,84,184,0.18) 0%, rgba(62,58,138,0.08) 100%)',
    accent:   'rgba(91,84,184,0.4)',
  },
  poca: {
    icon:     FileText,
    gradient: 'linear-gradient(135deg, rgba(122,116,204,0.15) 0%, rgba(91,84,184,0.06) 100%)',
    accent:   'rgba(122,116,204,0.35)',
  },
  aml: {
    icon:     Search,
    gradient: 'linear-gradient(135deg, rgba(91,84,184,0.12) 0%, rgba(157,151,232,0.1) 100%)',
    accent:   'rgba(91,84,184,0.35)',
  },
  igaming: {
    icon:     AlertTriangle,
    gradient: 'linear-gradient(135deg, rgba(157,151,232,0.12) 0%, rgba(91,84,184,0.1) 100%)',
    accent:   'rgba(157,151,232,0.3)',
  },
  compliance: {
    icon:     Shield,
    gradient: 'linear-gradient(135deg, rgba(91,84,184,0.14) 0%, rgba(62,58,138,0.06) 100%)',
    accent:   'rgba(91,84,184,0.35)',
  },
}

const DEFAULT_STYLE = {
  icon:     Shield,
  gradient: 'linear-gradient(135deg, rgba(91,84,184,0.1) 0%, rgba(62,58,138,0.05) 100%)',
  accent:   'rgba(91,84,184,0.3)',
}

export function BlogCover({ tags, className }: { tags: string[]; className?: string }) {
  // Pick the first matching topic style
  const style = tags.reduce<typeof DEFAULT_STYLE | null>(
    (found, tag) => found ?? TOPIC_STYLES[tag] ?? null,
    null,
  ) ?? DEFAULT_STYLE

  const Icon = style.icon

  return (
    <div
      className={`flex items-center justify-center relative overflow-hidden ${className ?? ''}`}
      style={{
        background: style.gradient,
        borderBottom: '1px solid var(--card-border)',
      }}
    >
      {/* Large faded icon */}
      <Icon
        style={{
          width: '64px',
          height: '64px',
          color: style.accent,
        }}
        strokeWidth={1.2}
      />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(91,84,184,0.08) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  )
}
