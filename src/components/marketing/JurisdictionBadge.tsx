import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Jurisdiction = 'gibraltar' | 'luxembourg'
type Product = 'pro' | 'genius'

const META: Record<Jurisdiction, { label: string; regulator: string; mark: string; markBg: string; markColor: string }> = {
  gibraltar: {
    label:     'Gibraltar',
    regulator: 'GFSC-regulated',
    mark:      'GI',
    markBg:    'rgba(91,84,184,0.15)',
    markColor: '#a78bfa',
  },
  luxembourg: {
    label:     'Luxembourg',
    regulator: 'CSSF-regulated',
    mark:      '🇱🇺',
    markBg:    'rgba(96,165,250,0.12)',
    markColor: '#60a5fa',
  },
}

export function JurisdictionBadge({ jurisdiction, product }: { jurisdiction: Jurisdiction; product: Product }) {
  const meta  = META[jurisdiction]
  const other = jurisdiction === 'gibraltar' ? 'luxembourg' : 'gibraltar'
  const otherLabel = META[other].label

  return (
    <div className="inline-flex flex-wrap items-center gap-3 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
        style={{ background: meta.markBg, color: meta.markColor, border: `1px solid ${meta.markBg}` }}>
        <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] rounded-full text-[10px] font-bold"
          style={{ background: 'rgba(255,255,255,0.08)' }}>
          {meta.mark}
        </span>
        <span>{meta.label}</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span style={{ opacity: 0.8 }}>{meta.regulator}</span>
      </div>
      <Link href={`/products/${other}/${product}`}
        className="inline-flex items-center gap-1 text-[11px] font-medium transition-opacity hover:opacity-100"
        style={{ color: 'var(--muted)', opacity: 0.75 }}>
        Switch to {otherLabel}
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}
