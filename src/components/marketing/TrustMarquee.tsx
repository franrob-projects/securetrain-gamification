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
  const loop = [...ITEMS, ...ITEMS]

  return (
    <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
      <div className="py-6">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(169,165,196,0.5)' }}>
          Mapped to Gibraltar regulation
        </p>
        <div className="trust-marquee" aria-hidden="false">
          <div className="trust-marquee__track">
            {loop.map((item, i) => (
              <div key={`${item}-${i}`} className="trust-marquee__item">
                <span className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: 'rgba(91,84,184,0.4)' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span
                    className="text-xs font-medium whitespace-nowrap"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
