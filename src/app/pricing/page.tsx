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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {TIERS.map(tier => (
              <div
                key={tier.name}
                className="rounded-2xl flex flex-col relative overflow-hidden"
                style={{
                  background: tier.featured ? 'rgba(91,84,184,0.08)' : 'var(--card)',
                  border: tier.featured ? '1px solid rgba(91,84,184,0.5)' : '1px solid var(--card-border)',
                }}
              >
                {/* Featured glow */}
                {tier.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-40 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.12), transparent 70%)' }} />
                )}

                <div className="p-7 flex flex-col flex-1 relative">
                  {tier.featured && (
                    <div className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
                      style={{ color: 'var(--accent)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Most popular
                    </div>
                  )}
                  <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{tier.name}</h2>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: 'var(--muted)' }}>{tier.description}</p>

                  <div className="mb-6 pb-6" style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <span className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>{tier.price}</span>
                    <span className="text-sm" style={{ color: 'var(--muted)' }}>{tier.cadence}</span>
                  </div>

                  <ul className="space-y-3 mb-7 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--muted)' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.featured ? '#4ade80' : 'var(--accent)' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={tier.mailto}
                    className="block text-center py-3.5 rounded-xl text-sm font-semibold transition-colors"
                    style={tier.featured
                      ? { background: 'var(--brand)', color: '#fff' }
                      : { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border)' }
                    }>
                    {tier.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 pb-24">
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
              <div key={item.q} className="px-6 py-5"
                style={{
                  background: 'var(--card)',
                  borderTop: i > 0 ? '1px solid var(--card-border)' : undefined,
                }}>
                <h3 className="text-sm font-semibold mb-2 flex items-start gap-3" style={{ color: 'var(--text)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: 'rgba(91,84,184,0.12)', color: 'var(--accent)' }}>?</span>
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed pl-8" style={{ color: 'var(--muted)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section divider */}
        <div className="flex items-center justify-center py-4">
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(91,84,184,0.3))' }} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="mx-4" style={{ color: 'rgba(91,84,184,0.3)' }}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(91,84,184,0.3))' }} />
        </div>

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
              { title: 'AML & Financial Crime Prevention',           sector: 'All firms',  reg: 'POCA 2015',                 icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
              { title: 'DLT Regulatory Principles',                  sector: 'Crypto',     reg: 'GFSC DLT Principles',        icon: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' },
              { title: 'Responsible Gambling & Social Responsibility', sector: 'iGaming',   reg: 'Gambling Act 2025',          icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
              { title: 'Senior Manager & Director Responsibilities',  sector: 'All firms',  reg: 'GFSC Fit & Proper Test',    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
              { title: 'Sanctions Screening & POCA Compliance',       sector: 'All firms',  reg: 'POCA 2015, HM Treasury',    icon: 'M18.36 6.64a9 9 0 1 1-12.73 0' },
              { title: 'Market Integrity & Market Abuse',             sector: 'Crypto',     reg: 'GFSC Market Conduct',        icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
              { title: 'KYC & Customer Due Diligence',                sector: 'All firms',  reg: 'GFSC AML/CFT Guidance',     icon: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' },
              { title: 'Data Protection & GDPR',                      sector: 'All firms',  reg: 'Gibraltar DPA / UK GDPR',   icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
            ].map((m, i) => (
              <div key={m.title} className="rounded-xl px-5 py-4 flex items-start gap-4"
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(91,84,184,0.08)', border: '1px solid rgba(91,84,184,0.15)' }}>
                  <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{m.title}</h3>
                  <p className="text-xs" style={{ color: 'rgba(139,135,168,0.7)' }}>{m.reg}</p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: m.sector === 'Crypto' ? 'rgba(122,116,204,0.15)' : m.sector === 'iGaming' ? 'rgba(157,151,232,0.15)' : 'rgba(91,84,184,0.1)', color: 'var(--accent)' }}>
                  {m.sector}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
          <div className="rounded-2xl p-10 sm:p-12 relative overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.08), transparent 70%)' }} />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                Not sure which plan fits?
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
                Tell us about your firm and we&apos;ll recommend the right tier — and set up a trial if it makes sense.
              </p>
              <a href={CONTACT_EMAIL}
                className="px-8 py-3.5 rounded-xl font-semibold text-white transition-colors inline-block"
                style={{ background: 'var(--brand)' }}>
                Get in touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
