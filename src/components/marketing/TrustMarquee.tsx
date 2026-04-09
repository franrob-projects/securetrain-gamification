const ITEMS = [
  'Gibraltar Financial Services Commission',
  'Gibraltar Gambling Commissioner',
  'POCA 2015',
  'DLT Provider Regulations 2020',
  'Gambling Act 2025',
  'GFSC AML/CFT Guidance Notes',
  'Social Responsibility Codes of Practice',
  'Data Protection Act (Gibraltar)',
]

export function TrustMarquee() {
  // Render the list twice so the loop is seamless
  const loop = [...ITEMS, ...ITEMS]

  return (
    <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-center" style={{ color: 'rgba(157,151,232,0.6)' }}>
          Mapped to the actual Gibraltar regulatory framework
        </p>

        <div className="trust-marquee" aria-hidden="false">
          <div className="trust-marquee__track">
            {loop.map((item, i) => (
              <div key={`${item}-${i}`} className="trust-marquee__item">
                <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
