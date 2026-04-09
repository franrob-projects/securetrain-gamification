import Link from 'next/link'
import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple per-firm pricing for Gibraltar compliance training. Starter, Team, and Enterprise plans for crypto and iGaming firms.',
}

const TIERS = [
  {
    name: 'Starter',
    price: '£249',
    cadence: '/month',
    description: 'For small Gibraltar firms — boutique DLT providers, B2B iGaming suppliers, and early-stage operators.',
    cta: 'Request access',
    featured: false,
    features: [
      'Up to 10 staff members',
      'All 8 Gibraltar compliance modules',
      'AI-generated scenarios',
      'Slack delivery',
      'PDF completion records',
      'Email support',
    ],
  },
  {
    name: 'Team',
    price: '£749',
    cadence: '/month',
    description: 'For mid-sized crypto and iGaming operators who need a real audit trail and admin oversight.',
    cta: 'Request access',
    featured: true,
    features: [
      'Up to 50 staff members',
      'Everything in Starter, plus:',
      'Admin compliance dashboard',
      'Per-user reminders via Slack',
      'Per-user training history',
      'Priority support (4hr response)',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    description: 'For larger licence holders, multi-entity groups, and firms needing custom regulation modules or dedicated onboarding.',
    cta: 'Talk to us',
    featured: false,
    features: [
      'Unlimited staff members',
      'Everything in Team, plus:',
      'Custom regulation modules',
      'SSO (Google Workspace / Microsoft 365)',
      'Dedicated success manager',
      'Service-level agreement',
    ],
  },
] as const

const FAQ = [
  {
    q: 'How does Slack delivery work?',
    a: 'Each working day, your staff receive a single Slack message linking directly to that day\'s module. They click, complete three AI-generated scenarios, and return to their work in under 10 minutes. No login portal to navigate.',
  },
  {
    q: 'Do you support firms outside Gibraltar?',
    a: 'ConPly is purpose-built for Gibraltar regulation — POCA 2015, GFSC DLT Principles, the Gambling Act 2025, and the Commissioner\'s Codes. If you\'re regulated elsewhere, the content will not map to your obligations.',
  },
  {
    q: 'What happens if a staff member changes role or sector?',
    a: 'Admins can update a team member\'s sector at any time. The compliance matrix automatically recalculates which modules are required for them and which they\'ve completed.',
  },
  {
    q: 'Are completion records suitable for regulator audits?',
    a: 'Yes. Every completion is recorded against a named user with the date, time, and score. Admins can export PDF completion records for any user and any module from the dashboard.',
  },
  {
    q: 'Can we trial ConPly before committing?',
    a: 'Yes. Get in touch and we\'ll set up a 14-day trial with your team. No credit card required.',
  },
] as const

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--text)' }}>
            Simple pricing for<br />Gibraltar firms
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
            Per-firm pricing. Billed monthly, cancel any time. All plans include
            the full set of Gibraltar compliance modules and the audit trail
            your regulator expects.
          </p>
        </section>

        {/* Tier cards */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIERS.map(tier => (
              <div
                key={tier.name}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  background: tier.featured ? 'rgba(91,84,184,0.12)' : '#1e1b38',
                  border: tier.featured ? '1px solid rgba(91,84,184,0.5)' : '1px solid #2e2a52',
                }}
              >
                {tier.featured && (
                  <div className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: 'var(--accent)' }}>
                    Most popular
                  </div>
                )}
                <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{tier.name}</h2>
                <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>{tier.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: 'var(--text)' }}>{tier.price}</span>
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>{tier.cadence}</span>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth"
                  className="block text-center py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={tier.featured
                    ? { background: 'var(--brand)', color: '#fff' }
                    : { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border)' }
                  }>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: 'var(--text)' }}>
            Common questions
          </h2>
          <div className="space-y-4">
            {FAQ.map(item => (
              <div key={item.q} className="rounded-xl p-6"
                style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
          <div className="rounded-2xl p-10" style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Not sure which plan fits?
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
              Tell us about your firm and we&apos;ll recommend the right tier — and set up a trial if it makes sense.
            </p>
            <Link href="/auth"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-colors inline-block"
              style={{ background: 'var(--brand)' }}>
              Get in touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
