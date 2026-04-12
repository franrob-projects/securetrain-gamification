import Link from 'next/link'
import type { Metadata } from 'next'
import { Shield, Brain, MessageSquare, BarChart3 } from 'lucide-react'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { AuthRedirect } from '@/components/marketing/AuthRedirect'
import { RockSilhouette } from '@/components/marketing/RockSilhouette'
import { LoomEmbed } from '@/components/marketing/LoomEmbed'
import { TrustMarquee } from '@/components/marketing/TrustMarquee'
import { BlogCover } from '@/components/marketing/BlogCover'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/format'
import { CONTACT_EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'ConPly — Gibraltar Compliance Training',
  description: 'AI-powered, role-specific compliance training for Gibraltar-regulated crypto and iGaming firms. Mapped to POCA 2015, GFSC principles, and the Gambling Act 2025.',
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
        <section className="relative overflow-hidden">
          {/* Multi-layered glow background */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
            style={{ zIndex: 0, background: 'radial-gradient(ellipse, rgba(91,84,184,0.18) 0%, transparent 60%)' }} />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] pointer-events-none"
            style={{ zIndex: 0, background: 'radial-gradient(circle, rgba(122,116,204,0.08) 0%, transparent 50%)' }} />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] pointer-events-none"
            style={{ zIndex: 0, background: 'radial-gradient(circle, rgba(157,151,232,0.06) 0%, transparent 50%)' }} />
          {/* Dot grid pattern */}
          <div className="absolute inset-0 dot-grid pointer-events-none" style={{ zIndex: 0, opacity: 0.4 }} />
          <RockSilhouette className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 1 }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            zIndex: 2,
            background: 'linear-gradient(to right, var(--bg) 25%, rgba(14,12,30,0.4) 55%, transparent 100%)',
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
            zIndex: 2,
            background: 'linear-gradient(to top, var(--bg), transparent)',
          }} />
          <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-36 text-center" style={{ zIndex: 3 }}>
            <h1 className="text-3xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] mb-6 text-gradient" style={{ letterSpacing: '-0.03em' }}>
              Your team learns real scenarios.{' '}
              <br className="hidden sm:block" />
              Your regulator gets the audit trail.
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-12" style={{ color: '#a9a5c4' }}>
              Regulated AI agents generate training scenarios grounded in real Gibraltar statute.
              Delivered in Slack, done in 10 minutes, with PDF records for every session.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href={CONTACT_EMAIL}
                className="cta-primary w-full sm:w-auto text-center px-8 py-4 rounded-2xl font-semibold text-white">
                Get in touch
              </a>
              <Link href="#how-it-works"
                className="cta-outline w-full sm:w-auto text-center px-8 py-4 rounded-2xl font-semibold"
                style={{ color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
                How it works →
              </Link>
            </div>

            {/* Video — glassmorphism wrapper */}
            <div className="mt-14 max-w-3xl mx-auto glass-card rounded-2xl p-1.5 glow-md">
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

        {/* Metrics strip — glass cards */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {METRICS.map(m => (
              <div key={m.label} className="glass-card rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-12 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.15), transparent 70%)' }} />
                <div className="relative">
                  <div className="text-4xl sm:text-5xl font-extrabold mb-2 text-gradient" style={{ letterSpacing: '-0.03em' }}>{m.value}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>{m.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(139,135,168,0.6)' }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-28">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
              How it works
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              Three steps. No setup overhead.
            </h2>
          </div>

          {/* Step 1 — full width, left-aligned with icon */}
          <div className="relative rounded-2xl p-8 mb-5"
            style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(91,84,184,0.12)', border: '1px solid rgba(91,84,184,0.3)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(157,151,232,0.6)' }}>Step 01</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Set up your team</h3>
                <p className="text-sm leading-relaxed max-w-xl" style={{ color: '#a9a5c4' }}>
                  Invite staff from the admin dashboard. They receive an email with a sign-in link. Assign each person a sector and ConPly maps the right modules to them.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 & 3 — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Step 2 */}
            <div className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: 'rgba(91,84,184,0.08)', border: '1px solid rgba(91,84,184,0.25)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(91,84,184,0.12), transparent 70%)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(157,151,232,0.6)' }}>Step 02</span>
              <div className="mt-4 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M8 13h2" /><path d="M8 17h2" />
                  <path d="M14 13h2" /><path d="M14 17h2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Slack delivers training daily</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a9a5c4' }}>
                Each working day, staff get one Slack message with a direct link to a module. Three AI scenarios, scored, done in 10 minutes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
              <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle at bottom left, rgba(22,163,74,0.06), transparent 70%)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(157,151,232,0.6)' }}>Step 03</span>
              <div className="mt-4 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4ade80' }}>
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Compliance records build automatically</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a9a5c4' }}>
                Every completion is recorded with a timestamp and score. Admins see a live compliance matrix. Any module can be exported as a PDF record for regulators.
              </p>
            </div>
          </div>
        </section>

        {/* Regulated AI — how the agents work */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-6xl mx-auto px-6 py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
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
                <div className="rounded-xl p-5 space-y-3" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    DLT / Crypto scenario
                  </p>
                  <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
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
                <div className="rounded-xl p-5 space-y-3" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    iGaming scenario
                  </p>
                  <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
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

        {/* Section divider — decorative dots */}
        <div className="flex items-center justify-center gap-2 py-4">
          <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
            <circle cx="4" cy="4" r="2" fill="rgba(91,84,184,0.15)" />
            <circle cx="20" cy="4" r="2" fill="rgba(91,84,184,0.2)" />
            <circle cx="36" cy="4" r="2.5" fill="rgba(91,84,184,0.3)" />
            <circle cx="52" cy="4" r="3" fill="rgba(91,84,184,0.4)" />
            <circle cx="68" cy="4" r="3" fill="rgba(91,84,184,0.4)" />
            <circle cx="84" cy="4" r="2.5" fill="rgba(91,84,184,0.3)" />
            <circle cx="100" cy="4" r="2" fill="rgba(91,84,184,0.2)" />
            <circle cx="116" cy="4" r="2" fill="rgba(91,84,184,0.15)" />
          </svg>
        </div>

        {/* Features — bento grid with glass cards */}
        <section className="max-w-6xl mx-auto px-6 py-28 relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.08) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="text-center mb-16">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
                What you get
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                Everything a Gibraltar regulator expects
              </h2>
            </div>
            {/* Bento layout: 2 large + 2 small */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => {
                const Icon = f.icon
                const isLarge = i === 0 || i === 3
                return (
                  <div key={f.title} className={`glass-card rounded-2xl ${isLarge ? 'p-8 md:col-span-2' : 'p-7'} relative overflow-hidden`}>
                    {/* Corner glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                      style={{ background: `radial-gradient(circle at top right, rgba(91,84,184,${isLarge ? '0.12' : '0.08'}), transparent 70%)` }} />
                    <div className={`relative ${isLarge ? 'flex flex-col sm:flex-row gap-6 items-start' : ''}`}>
                      <div className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} rounded-xl flex items-center justify-center flex-shrink-0 ${isLarge ? '' : 'mb-5'}`}
                        style={{ background: 'rgba(91,84,184,0.12)', border: '1px solid rgba(91,84,184,0.25)' }}>
                        <Icon style={{ color: 'var(--accent)', width: isLarge ? '24px' : '20px', height: isLarge ? '24px' : '20px' }} />
                      </div>
                      <div>
                        <h3 className={`${isLarge ? 'text-lg' : 'text-base'} font-semibold mb-2`} style={{ color: 'var(--text)' }}>{f.title}</h3>
                        <p className={`text-sm leading-relaxed ${isLarge ? 'max-w-2xl' : ''}`} style={{ color: '#a9a5c4' }}>{f.body}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Blog section — tinted band */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-6xl mx-auto px-6 py-28">
            <div className="text-center mb-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
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
                <div key={post.slug} className="rounded-xl flex flex-col overflow-hidden card-hover"
                  style={{ background: 'var(--card)' }}
                >
                  <BlogCover tags={post.tags} className="h-28" />
                  <div className="p-5 flex flex-col gap-3 flex-1">
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
                  <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                    <span className="text-xs" style={{ color: 'rgba(139,135,168,0.7)' }}>{formatDate(post.date)}</span>
                    <Link href={`/blog/${post.slug}`} className="text-xs font-semibold"
                      style={{ color: 'var(--accent)' }}>
                      Read →
                    </Link>
                  </div>
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
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="relative rounded-2xl p-10 sm:p-14"
            style={{ background: 'rgba(91,84,184,0.04)', border: '1px solid rgba(91,84,184,0.12)' }}>
            <div className="absolute top-4 left-8 select-none pointer-events-none"
              style={{ color: 'rgba(91,84,184,0.15)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed" style={{ color: 'var(--text)' }}>
              If a regulator asks to see your staff training records, you should be able to produce them in minutes — not days.
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: 'rgba(91,84,184,0.3)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                The standard the GFSC and the Gambling Commissioner hold firms to
              </p>
              <div className="h-px w-8" style={{ background: 'rgba(91,84,184,0.3)' }} />
            </div>
          </div>
        </section>

        {/* CTA — dramatic glow */}
        <section className="max-w-3xl mx-auto px-6 pb-28 text-center relative">
          {/* Background glow behind the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.15), transparent 60%)' }} />
          <div className="glass-card rounded-3xl p-10 sm:p-14 relative overflow-hidden glow-lg">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(91,84,184,0.1), transparent)' }} />
            <div className="relative">
              <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-gradient" style={{ letterSpacing: '-0.03em' }}>
                Get your team compliant in days, not weeks
              </h2>
              <p className="text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: '#a9a5c4' }}>
                Onboard your staff and send the first training module within 24 hours. No implementation project, no content to write.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={CONTACT_EMAIL}
                  className="cta-primary w-full sm:w-auto px-10 py-4 rounded-2xl font-semibold text-white inline-block text-center">
                  Get in touch
                </a>
                <Link href="/pricing"
                  className="cta-outline w-full sm:w-auto px-10 py-4 rounded-2xl font-semibold inline-block text-center"
                  style={{ color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
                  View pricing
                </Link>
              </div>
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
