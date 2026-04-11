import Link from 'next/link'
import type { Metadata } from 'next'
import { Shield, Brain, MessageSquare, BarChart3 } from 'lucide-react'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { AuthRedirect } from '@/components/marketing/AuthRedirect'
import { RockSilhouette } from '@/components/marketing/RockSilhouette'
import { LoomEmbed } from '@/components/marketing/LoomEmbed'
import { TrustMarquee } from '@/components/marketing/TrustMarquee'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'ConPly — Gibraltar Compliance Training',
  description: 'AI-powered, role-specific compliance training for Gibraltar-regulated crypto and iGaming firms. Mapped to POCA 2015, GFSC principles, and the Gambling Act 2025.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const FEATURES = [
  {
    icon: Shield,
    title: 'Gibraltar-specific regulation',
    body: 'Every scenario references actual Gibraltar law — POCA 2015, GFSC DLT Principles, the Gambling Act 2025, and the Commissioner\'s Social Responsibility Codes. Not UK or Malta templates.',
  },
  {
    icon: Brain,
    title: 'Regulated AI agents',
    body: 'Purpose-built AI agents retrieve real Gibraltar regulation text and generate unique scenarios grounded in actual statute. Every explanation cites the specific section. No hallucinated law.',
  },
  {
    icon: MessageSquare,
    title: 'Delivered via Slack',
    body: 'One Slack message per day with a direct link. No login portals. Staff click, train, and return to work in under 10 minutes.',
  },
  {
    icon: BarChart3,
    title: 'Audit-ready compliance records',
    body: 'See exactly who has completed which modules, their scores, and their status. Download PDF records per user. The audit trail regulators ask for — built in from day one.',
  },
]

const METRICS = [
  { value: '8',   label: 'Regulatory modules',                  sub: 'AML, DLT, KYC, Sanctions, Gambling, and more' },
  { value: '18',  label: 'Gibraltar regulation sources',        sub: 'POCA, GFSC Principles, Gambling Act, Data Protection' },
  { value: '<10', label: 'Minutes per session',                  sub: 'Three scenarios, scored, with a compliance record' },
  { value: '0',   label: 'Slide decks',                          sub: 'AI scenarios replace passive e-learning' },
]

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <AuthRedirect />

      {/* Nav */}
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: '480px' }}>
          <RockSilhouette className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 1 }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            zIndex: 2,
            background: 'linear-gradient(to right, var(--bg) 30%, rgba(14,12,30,0.5) 60%, transparent 100%)',
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
            zIndex: 2,
            background: 'linear-gradient(to top, var(--bg), transparent)',
          }} />
          <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-28 text-center" style={{ zIndex: 3 }}>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--text)' }}>
              Your team learns real scenarios.{' '}
              <br className="hidden sm:block" />
              Your regulator gets the audit trail.
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10" style={{ color: '#a9a5c4' }}>
              Regulated AI agents generate training scenarios grounded in real Gibraltar statute.
              Delivered in Slack, done in 10 minutes, with PDF records for every session.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href="mailto:hello@conply.gi?subject=ConPly%20enquiry"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-semibold text-white transition-colors"
                style={{ background: 'var(--brand)' }}>
                Get in touch
              </a>
              <Link href="#how-it-works"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-semibold transition-colors"
                style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}>
                How it works →
              </Link>
            </div>

            {/* Video — embedded in hero, no separate heading */}
            <div className="mt-12 max-w-3xl mx-auto">
              <LoomEmbed videoId="cfe3ae0c9a66438c8db3514a07a625e6" title="ConPly product walkthrough" />
            </div>
          </div>
        </section>

        {/* Gradient accent line */}
        <div className="h-px" style={{
          background: 'linear-gradient(to right, transparent, rgba(91,84,184,0.4), transparent)',
        }} />

        {/* Trust marquee */}
        <TrustMarquee />

        {/* Metrics strip */}
        <section className="border-b" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.06)' }}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {METRICS.map(m => (
                <div key={m.label} className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>{m.value}</div>
                  <div className="text-sm font-medium mb-1" style={{ color: '#a9a5c4' }}>{m.label}</div>
                  <div className="text-xs" style={{ color: 'rgba(139,135,168,0.7)' }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
              How it works
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Three steps. No setup overhead.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                step: '01',
                title: 'Set up your team',
                body: 'Invite staff from the admin dashboard. They receive an email with a sign-in link. Assign each person a sector and ConPly maps the right modules to them.',
              },
              {
                step: '02',
                title: 'Slack delivers training daily',
                body: 'Each working day, staff get one Slack message with a direct link to a module. Three AI scenarios, scored, done in 10 minutes.',
              },
              {
                step: '03',
                title: 'Compliance records build automatically',
                body: 'Every completion is recorded with a timestamp and score. Admins see a live compliance matrix. Any module can be exported as a PDF record for regulators.',
              },
            ].map((s, i) => (
              <div key={s.step} className="flex items-stretch">
                <div className="rounded-xl p-6 flex-1"
                  style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
                  <div className="text-3xl font-bold mb-3" style={{ color: 'rgba(157,151,232,0.7)' }}>{s.step}</div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#a9a5c4' }}>{s.body}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex items-center px-3" style={{ color: 'rgba(157,151,232,0.35)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Regulated AI — how the agents work */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                  Powered by regulated AI
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                  AI agents that only speak from the law
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#a9a5c4' }}>
                  ConPly doesn&apos;t use generic AI prompts. Purpose-built agents retrieve the actual text of Gibraltar regulation
                  and generate training scenarios constrained to what the law says — not what a language model guesses it says.
                </p>
                <div className="space-y-5">
                  {[
                    {
                      label: 'Retrieve',
                      text: 'Agents pull the relevant sections from POCA 2015, GFSC Principles, the Gambling Act, and other source documents before generating anything.',
                    },
                    {
                      label: 'Generate',
                      text: 'Scenarios are built from retrieved regulation text. Each session produces three unique, realistic situations with four options and a scored answer.',
                    },
                    {
                      label: 'Cite',
                      text: 'Every explanation ends with a specific regulation reference — the Act, the section, the principle. No vague "best practice" hand-waving.',
                    },
                  ].map((item, i) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.label}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: '#a9a5c4' }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {/* Crypto scenario */}
                <div className="rounded-xl p-5 space-y-3" style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    DLT / Crypto scenario
                  </p>
                  <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid #2e2a52' }}>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>
                      Sarah, the MLRO at a Gibraltar-licensed DLT firm, receives an internal report that a customer has made
                      three large deposits from different bank accounts within 48 hours. What should she do first?
                    </p>
                    <div className="space-y-1.5">
                      {['A. Contact the customer directly', 'B. File an internal SAR and assess', 'C. Freeze the account immediately', 'D. Wait for the next scheduled review'].map((opt, i) => (
                        <div key={opt} className="px-3 py-1.5 rounded-lg text-xs"
                          style={{
                            background: i === 1 ? 'rgba(22,163,74,0.1)' : 'transparent',
                            border: `1px solid ${i === 1 ? 'rgba(22,163,74,0.4)' : '#2e2a52'}`,
                            color: i === 1 ? '#4ade80' : '#a9a5c4',
                          }}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: '#8b87a8' }}>
                    Regulation reference: POCA 2015, Section 28 — Nominated officer reporting obligations.
                  </p>
                </div>

                {/* iGaming scenario */}
                <div className="rounded-xl p-5 space-y-3" style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    iGaming scenario
                  </p>
                  <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid #2e2a52' }}>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>
                      A player at a Gibraltar-licensed iGaming platform requests to reverse a self-exclusion after 3 months,
                      claiming they made the decision impulsively. The minimum exclusion period has not yet elapsed. What is the correct response?
                    </p>
                    <div className="space-y-1.5">
                      {['A. Reverse the exclusion as a goodwill gesture', 'B. Decline — the minimum period must complete', 'C. Offer a reduced exclusion period instead', 'D. Escalate to the player\'s bank'].map((opt, i) => (
                        <div key={opt} className="px-3 py-1.5 rounded-lg text-xs"
                          style={{
                            background: i === 1 ? 'rgba(22,163,74,0.1)' : 'transparent',
                            border: `1px solid ${i === 1 ? 'rgba(22,163,74,0.4)' : '#2e2a52'}`,
                            color: i === 1 ? '#4ade80' : '#a9a5c4',
                          }}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: '#8b87a8' }}>
                    Regulation reference: Gibraltar Gambling Commissioner, Social Responsibility Codes — Self-exclusion obligations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
              What you get
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Everything a Gibraltar regulator expects
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="rounded-xl p-6 card-hover"
                  style={{ background: '#1e1b38' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'rgba(91,84,184,0.12)', border: '1px solid rgba(91,84,184,0.25)' }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: 'var(--accent)', width: '18px', height: '18px' }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#a9a5c4' }}>{f.body}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Blog section — tinted band */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                From the blog
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                Stay ahead of Gibraltar regulation
              </h2>
              <p className="text-sm max-w-lg mx-auto" style={{ color: '#a9a5c4' }}>
                Practical guidance on POCA 2015, GFSC DLT principles, the Gambling Act 2025, and AML/CFT obligations for Gibraltar firms.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {recentPosts.map(post => (
                <div key={post.slug} className="rounded-xl p-5 flex flex-col gap-3 card-hover"
                  style={{ background: '#1e1b38' }}
                >
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full w-fit"
                    style={{ background: 'rgba(91,84,184,0.2)', color: 'var(--accent)' }}>
                    {post.tags[0]}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug line-clamp-3" style={{ color: 'var(--text)' }}>
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: '#a9a5c4' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid #2e2a52' }}>
                    <span className="text-xs" style={{ color: 'rgba(139,135,168,0.7)' }}>{formatDate(post.date)}</span>
                    <Link href={`/blog/${post.slug}`} className="text-xs font-semibold"
                      style={{ color: 'var(--accent)' }}>
                      Read →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/blog" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                View all posts →
              </Link>
            </div>
          </div>
        </section>

        {/* Pullout quote — conversion primer before CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl leading-none select-none"
              style={{ color: 'rgba(91,84,184,0.2)' }}>&ldquo;</div>
            <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed pt-6" style={{ color: 'var(--text)' }}>
              If a regulator asks to see your staff training records, you should be able to produce them in minutes — not days.
            </blockquote>
            <p className="mt-4 text-sm" style={{ color: 'rgba(139,135,168,0.7)' }}>
              The standard the GFSC and the Gambling Commissioner hold firms to
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
          <div className="rounded-2xl p-8 sm:p-10" style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Get your team compliant in days, not weeks
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: '#a9a5c4' }}>
              Onboard your staff and send the first training module within 24 hours. No implementation project, no content to write.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:hello@conply.gi?subject=ConPly%20enquiry"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white transition-colors inline-block text-center"
                style={{ background: 'var(--brand)' }}>
                Get in touch
              </a>
              <Link href="/pricing"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold transition-colors inline-block text-center"
                style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}>
                View pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ConPly',
          description: 'Gibraltar compliance training for crypto and iGaming firms',
          url: 'https://conply.gi',
        })}}
      />
    </div>
  )
}
