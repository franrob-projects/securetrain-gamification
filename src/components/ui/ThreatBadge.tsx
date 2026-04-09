const styles: Record<string, { border: string; color: string; background: string }> = {
  low:      { border: '1px solid rgba(139,135,168,0.3)', color: '#8b87a8', background: 'rgba(139,135,168,0.08)' },
  medium:   { border: '1px solid rgba(157,151,232,0.4)', color: '#9d97e8', background: 'rgba(157,151,232,0.08)' },
  high:     { border: '1px solid rgba(122,116,204,0.5)', color: '#7A74CC', background: 'rgba(122,116,204,0.10)' },
  critical: { border: '1px solid rgba(239,68,68,0.4)',   color: '#f87171', background: 'rgba(239,68,68,0.08)'   },
}

const labels: Record<string, string> = {
  low:      'Optional',
  medium:   'Recommended',
  high:     'Required',
  critical: 'Mandatory',
}

export function ThreatBadge({ level }: { level: keyof typeof styles }) {
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
      style={styles[level]}>
      {labels[level] ?? level}
    </span>
  )
}
