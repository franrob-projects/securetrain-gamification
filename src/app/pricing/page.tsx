import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { CONTACT_EMAIL } from '@/lib/constants'

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
    cta: 'Get in touch',
    mailto: 'mailto:francisroberts@live.com?subject=ConPly%20Starter%20enquiry',
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
    cta: 'Get in touch',
    mailto: 'mailto:francisroberts@live.com?subject=ConPly%20Team%20enquiry',
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
    mailto: 'mailto:francisroberts@live.com?subject=ConPly%20Enterprise%20enquiry',
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
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
            Pricing
          </p>
          <h1 className="text-3xl sm:text-5xl tracking-tight font-bold leading-tight mb-5" style={{ color: 'var(--text)' }}>
            Simple pricing for{' '}
            <br className="hidden sm:block" />
            Gibraltar firms
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
                  background: tier.featured ? 'rgba(91,84,184,0.12)' : 'var(--card)',
                  border: tier.featured ? '1px solid rgba(91,84,184,0.5)' : '1px solid var(--card-border)',
                }}
              >
                {tier.featured && (
                  <div className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3"
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

                <a href={tier.mailto}
                  className="block text-center py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={tier.featured
                    ? { background: 'var(--brand)', color: '#fff' }
                    : { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border)' }
                  }>
                  {tier.cta}
                </a>
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
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Modules overview */}
        <section id="modules" className="max-w-4xl mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent)' }}>
              What&apos;s included
            </p>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              8 Gibraltar compliance modules
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'AML & Financial Crime Prevention',           sector: 'All firms',  reg: 'POCA 2015' },
              { title: 'DLT Regulatory Principles',                  sector: 'Crypto',     reg: 'GFSC DLT Principles' },
              { title: 'Responsible Gambling & Social Responsibility', sector: 'iGaming',   reg: 'Gambling Act 2025' },
              { title: 'Senior Manager & Director Responsibilities',  sector: 'All firms',  reg: 'GFSC Fit & Proper Test' },
              { title: 'Sanctions Screening & POCA Compliance',       sector: 'All firms',  reg: 'POCA 2015, HM Treasury' },
              { title: 'Market Integrity & Market Abuse',             sector: 'Crypto',     reg: 'GFSC Market Conduct' },
              { title: 'KYC & Customer Due Diligence',                sector: 'All firms',  reg: 'GFSC AML/CFT Guidance' },
              { title: 'Data Protection & GDPR',                      sector: 'All firms',  reg: 'Gibraltar DPA / UK GDPR' },
            ].map(m => (
              <div key={m.title} className="rounded-lg px-5 py-4 flex items-start justify-between gap-4"
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{m.title}</h3>
                  <p className="text-xs" style={{ color: 'rgba(139,135,168,0.7)' }}>{m.reg}</p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)' }}>
                  {m.sector}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
          <div className="rounded-2xl p-10" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Not sure which plan fits?
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
              Tell us about your firm and we&apos;ll recommend the right tier — and set up a trial if it makes sense.
            </p>
            <a href={CONTACT_EMAIL}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-colors inline-block"
              style={{ background: 'var(--brand)' }}>
              Get in touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
