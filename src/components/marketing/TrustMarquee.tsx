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
      <div className="py-8">
        <div className="trust-marquee" aria-hidden="false">
          <div className="trust-marquee__track">
            {loop.map((item, i) => (
              <div key={`${item}-${i}`} className="trust-marquee__item">
                <span
                  className="text-xs font-medium px-4 py-2 rounded-lg whitespace-nowrap"
                  style={{
                    color: 'var(--accent)',
                    background: 'rgba(91,84,184,0.1)',
                    border: '1px solid rgba(91,84,184,0.25)',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
