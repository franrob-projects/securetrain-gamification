'use client'

import { useState, useEffect } from 'react'
import { Check, Star } from 'lucide-react'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { JurisdictionFlag } from '@/components/ui/JurisdictionFlag'
import { BOOKING_URL } from '@/lib/constants'

type Jurisdiction = 'gibraltar' | 'luxembourg'

const JURISDICTION_META: Record<Jurisdiction, { label: string; regulator: string; pitch: string }> = {
  gibraltar:  { label: 'Gibraltar',  regulator: 'GFSC', pitch: 'Training grounded in POCA 2015, GFSC Principles, and the Gambling Act 2025.' },
  luxembourg: { label: 'Luxembourg', regulator: 'CSSF', pitch: 'Training grounded in MiCA (EU 2023/1114), the AML Law of 12 November 2004, and DORA.' },
}

const TIER_COPY: Record<Jurisdiction, { pro: { description: string; firstFeature: string }; genius: { description: string; firstFeature: string } }> = {
  gibraltar: {
    pro: {
      description:  'Team-wide compliance training, shared curriculum, full audit trail.',
      firstFeature: 'All Gibraltar compliance modules (POCA 2015, GFSC, Gambling Act)',
    },
    genius: {
      description:  'Personalised learning journeys, adaptive scenarios, per-user compliance profiles.',
      firstFeature: 'Everything in Pro, personalised per user',
    },
  },
  luxembourg: {
    pro: {
      description:  'Team-wide compliance training, shared curriculum, full audit trail.',
      firstFeature: 'All Luxembourg compliance modules (MiCA, AML Law 2004, DORA, CSSF)',
    },
    genius: {
      description:  'Personalised learning journeys, adaptive scenarios, per-user compliance profiles.',
      firstFeature: 'Everything in Pro, personalised per user',
    },
  },
}

function makeTiers(j: Jurisdiction) {
  const copy = TIER_COPY[j]
  return [
    {
      name: 'Pro',
      annualPrice: 12,
      minUsers: 10,
      description: copy.pro.description,
      cta: 'Book a demo',
      featured: false,
      features: [
        copy.pro.firstFeature,
        'AI-generated scenarios grounded in real statute',
        'Delivered in Slack or Microsoft Teams',
        'Mobile-friendly, train on the go',
        'Team compliance matrix',
        'PDF completion records',
        'Sector-based module assignment',
      ],
    },
    {
      name: 'Genius',
      annualPrice: 22,
      minUsers: 10,
      description: copy.genius.description,
      cta: 'Book a demo',
      featured: true,
      features: [
        copy.genius.firstFeature,
        'Per-user learning paths',
        'Adaptive scenario difficulty',
        'Topic-level regulation mapping',
        'Individual compliance profiles',
        'Regulation-level coverage per user',
        'Priority support',
      ],
    },
  ]
}

const FAQ = [
  {
    q: 'How does per-user pricing work?',
    a: 'You pay per active team member per month. An active member is anyone who has been invited and has access to training. You can add or remove users at any time.',
  },
  {
    q: 'What counts as a user?',
    a: 'Any team member you invite from the admin dashboard. Admins count as users. Removing a user stops billing for them at the next cycle.',
  },
  {
    q: 'Which jurisdictions do you support?',
    a: 'Conply currently supports Gibraltar (POCA 2015, GFSC Principles, the Gambling Act 2025, Commissioner\'s Codes) and Luxembourg (MiCA, the AML Law of 12 November 2004, DORA, CSSF circulars). If you\'re regulated elsewhere, the content will not map to your obligations, get in touch if you\'d like to see your jurisdiction added.',
  },
  {
    q: 'Are completion records suitable for regulator audits?',
    a: 'Yes. Every completion is recorded against a named user with the date, time, and score. Admins can export PDF completion records for any user and any module from the dashboard.',
  },
  {
    q: 'Can we trial Conply before committing?',
    a: 'Yes. Book a demo and we\'ll set up a 14-day trial with your team. No credit card required.',
  },
] as const

function formatFloor(pricePerUser: number, minUsers: number) {
  return `${(pricePerUser * minUsers).toLocaleString('en-GB')}`
}

function calcAnnualSaving(annualPrice: number, minUsers: number) {
  const monthlyPrice = Math.round(annualPrice * 1.2)
  const saving = (monthlyPrice - annualPrice) * minUsers * 12
  return saving >= 1000 ? `${(saving / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${saving}`
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true)
  const [jx, setJx] = useState<Jurisdiction>('gibraltar')

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('conply:jurisdiction') : null
    if (saved === 'gibraltar' || saved === 'luxembourg') setJx(saved)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('conply:jurisdiction', jx)
  }, [jx])

  const tiers = makeTiers(jx)
  const meta  = JURISDICTION_META[jx]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 sm:pt-24 pb-8 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
            Pricing
          </p>
          <h1 className="text-3xl sm:text-5xl tracking-tight font-bold leading-tight mb-5" style={{ color: 'var(--text)' }}>
            Simple per-user pricing for{' '}
            <br className="hidden sm:block" />
            regulated firms
          </h1>
          <p className="text-base max-w-xl mx-auto mb-6" style={{ color: 'var(--muted)' }}>
            All plans include the full set of compliance modules for your jurisdiction, AI-generated scenarios, and the audit trail your regulator expects. Billed annually or monthly.
          </p>

          {/* Jurisdiction toggle */}
          <div className="inline-flex items-center gap-1 rounded-xl p-1 mb-4"
            style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            {(Object.keys(JURISDICTION_META) as Jurisdiction[]).map(k => {
              const m = JURISDICTION_META[k]
              const active = jx === k
              return (
                <button key={k}
                  onClick={() => setJx(k)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: active ? 'var(--brand)' : 'transparent',
                    color:      active ? '#fff'        : 'var(--muted)',
                  }}>
                  <JurisdictionFlag slug={k} className="w-5 h-auto" />
                  {m.label}
                  <span style={{ opacity: active ? 0.7 : 0.5 }}>· {m.regulator}</span>
                </button>
              )
            })}
          </div>
          <p className="text-xs max-w-lg mx-auto mb-8" style={{ color: 'var(--muted)', opacity: 0.8 }}>
            {meta.pitch}
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 rounded-xl px-1.5 py-1.5"
            style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: annual ? 'var(--brand)' : 'transparent',
                color: annual ? '#fff' : 'var(--muted)',
              }}>
              Annual
              <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: annual ? 'rgba(255,255,255,0.2)' : 'rgba(74,222,128,0.15)', color: annual ? '#fff' : '#4ade80' }}>
                Save 20%
              </span>
            </button>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: !annual ? 'var(--brand)' : 'transparent',
                color: !annual ? '#fff' : 'var(--muted)',
              }}>
              Monthly
            </button>
          </div>
        </section>

        {/* Tier cards */}
        <section className="max-w-4xl mx-auto px-6 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {tiers.map(tier => {
              const price = annual ? tier.annualPrice : Math.round(tier.annualPrice * 1.2)
              const floor = price * tier.minUsers
              const saving = calcAnnualSaving(tier.annualPrice, tier.minUsers)

              return (
                <div
                  key={tier.name}
                  className="rounded-2xl flex flex-col relative overflow-hidden"
                  style={{
                    background: tier.featured ? 'rgba(91,84,184,0.08)' : 'var(--card)',
                    border: tier.featured ? '1px solid rgba(91,84,184,0.5)' : '1px solid var(--card-border)',
                  }}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-40 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.12), transparent 70%)' }} />
                  )}

                  <div className="p-7 flex flex-col flex-1 relative">
                    {tier.featured && (
                      <div className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
                        style={{ color: 'var(--accent)' }}>
                        <Star className="w-3 h-3" fill="currentColor" />
                        Most popular
                      </div>
                    )}
                    <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{tier.name}</h2>
                    <p className="text-xs mb-5 leading-relaxed" style={{ color: 'var(--muted)' }}>{tier.description}</p>

                    <div className="mb-2">
                      <span className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>£{price}</span>
                      <span className="text-sm" style={{ color: 'var(--muted)' }}>/user/mo</span>
                    </div>
                    <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>
                      From £{formatFloor(price, tier.minUsers)}/month (min {tier.minUsers} users)
                    </p>
                    {annual && (
                      <p className="text-xs font-medium mb-6" style={{ color: '#4ade80' }}>
                        Save £{saving}/year vs monthly
                      </p>
                    )}
                    {!annual && <div className="mb-6" />}

                    <div className="h-px mb-6" style={{ background: 'var(--card-border)' }} />

                    <ul className="space-y-3 mb-7 flex-1">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--muted)' }}>
                          <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.featured ? '#4ade80' : 'var(--accent)' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                      className={`block text-center py-3.5 rounded-xl text-sm font-semibold ${tier.featured ? 'cta-primary text-white' : 'cta-outline'}`}
                      style={tier.featured
                        ? {}
                        : { color: 'var(--accent)', border: '1px solid var(--border)' }
                      }>
                      {tier.cta}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
            <div className="text-center mb-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
                FAQ
              </p>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                Common questions
              </h2>
            </div>
            <div className="space-y-0 rounded-xl overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
              {FAQ.map((item, i) => (
                <details key={item.q} className="group"
                  style={{
                    background: 'var(--card)',
                    borderTop: i > 0 ? '1px solid var(--card-border)' : undefined,
                  }}>
                  <summary className="px-6 py-5 cursor-pointer text-sm font-semibold flex items-center gap-3 select-none"
                    style={{ color: 'var(--text)' }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs transition-transform group-open:rotate-45"
                      style={{ background: 'rgba(91,84,184,0.12)', color: 'var(--accent)' }}>+</span>
                    {item.q}
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)', paddingLeft: '3.25rem' }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
