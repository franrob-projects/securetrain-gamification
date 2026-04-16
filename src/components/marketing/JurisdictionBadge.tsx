import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JurisdictionFlag } from '@/components/ui/JurisdictionFlag'

type Jurisdiction = 'gibraltar' | 'luxembourg'
type Product      = 'pro' | 'genius'

const META: Record<Jurisdiction, { label: string; regulator: string }> = {
  gibraltar:  { label: 'Gibraltar',  regulator: 'GFSC-regulated' },
  luxembourg: { label: 'Luxembourg', regulator: 'CSSF-regulated' },
}

const PRODUCT_ACCENT: Record<Product, { color: string; bg: string; border: string; tag: string }> = {
  pro:    { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)',  border: 'rgba(167,139,250,0.28)', tag: 'Premium'  },
  genius: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.28)',  tag: 'Platinum' },
}

export function JurisdictionBadge({ jurisdiction, product }: { jurisdiction: Jurisdiction; product: Product }) {
  const meta    = META[jurisdiction]
  const accent  = PRODUCT_ACCENT[product]
  const other   = jurisdiction === 'gibraltar' ? 'luxembourg' : 'gibraltar'
  const otherMeta = META[other]

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div
        className="inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-xl"
        style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
      >
        <span
          className="inline-flex items-center justify-center rounded-lg p-1.5"
          style={{ background: 'rgba(14,12,30,0.45)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <JurisdictionFlag slug={jurisdiction} className="w-6 h-auto" />
        </span>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] font-bold uppercase tracking-[0.12em]"
              style={{ color: 'var(--text)' }}
            >
              {meta.label}
            </span>
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ background: `${accent.color}20`, color: accent.color }}
            >
              {accent.tag}
            </span>
          </div>
          <div className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--muted)', opacity: 0.85 }}>
            {meta.regulator}
          </div>
        </div>
      </div>
      <Link
        href={`/products/${other}/${product}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
        style={{ color: 'var(--muted)', border: '1px solid var(--card-border)' }}
      >
        <JurisdictionFlag slug={other} className="w-4 h-auto" />
        Switch to {otherMeta.label}
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}
