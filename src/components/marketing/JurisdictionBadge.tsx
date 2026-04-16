import { JurisdictionFlag } from '@/components/ui/JurisdictionFlag'

type Jurisdiction = 'gibraltar' | 'luxembourg'
type Product      = 'pro' | 'genius'

const META: Record<Jurisdiction, { label: string; regulator: string }> = {
  gibraltar:  { label: 'Gibraltar',  regulator: 'GFSC-regulated' },
  luxembourg: { label: 'Luxembourg', regulator: 'CSSF-regulated' },
}

const PRODUCT_ACCENT: Record<Product, { bg: string; border: string }> = {
  pro:    { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.28)' },
  genius: { bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.28)'  },
}

export function JurisdictionBadge({ jurisdiction, product }: { jurisdiction: Jurisdiction; product: Product }) {
  const meta   = META[jurisdiction]
  const accent = PRODUCT_ACCENT[product]

  return (
    <div className="mb-6">
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
          <div
            className="text-[13px] font-bold uppercase tracking-[0.12em]"
            style={{ color: 'var(--text)' }}
          >
            {meta.label}
          </div>
          <div className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--muted)', opacity: 0.85 }}>
            {meta.regulator}
          </div>
        </div>
      </div>
    </div>
  )
}
