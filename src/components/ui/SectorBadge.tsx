export function SectorBadge({ sector }: { sector: string }) {
  const style = { border: '1px solid rgba(91,84,184,0.4)', color: '#9d97e8', background: 'rgba(91,84,184,0.1)' }
  const label = sector === 'crypto' ? '⛓ Crypto / DLT' : sector === 'gambling' ? '🎲 iGaming' : '🌐 All Sectors'
  return <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={style}>{label}</span>
}
