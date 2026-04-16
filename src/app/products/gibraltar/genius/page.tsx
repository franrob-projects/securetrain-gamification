import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { JurisdictionBadge } from '@/components/marketing/JurisdictionBadge'
import { BOOKING_URL } from '@/lib/constants'
import { Crown, Database, Brain, Users, FileText, BarChart3, Shield, Layers, Target, GitBranch, User, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Conply Genius Gibraltar | Personalised GFSC Compliance Training',
  description: 'Role-mapped compliance training for Gibraltar-regulated firms. POCA 2015, GFSC Principles, Gambling Act 2025. Adaptive scenarios and individual compliance roadmaps.',
}

const FEATURES = [
  { icon: Target,     title: 'Per-user learning paths',        desc: 'Each staff member gets a training journey mapped to their role, sector, and knowledge gaps. No two journeys are the same.', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)' },
  { icon: Brain,      title: 'Adaptive scenario generation',   desc: 'The AI adapts scenarios based on what each user has completed, where they scored low, and which regulations they haven\'t covered.', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.25)' },
  { icon: GitBranch,  title: 'Topic-level regulation mapping', desc: 'Regulation chunks are mapped to individual topics. The system knows exactly which sections of POCA or the Gambling Act each user has been tested on.', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)' },
  { icon: Users,      title: 'Individual compliance profiles', desc: 'Each user has a compliance profile showing their coverage across regulation sources, not just module completions.', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)' },
  { icon: Layers,     title: 'Progressive difficulty',         desc: 'Scenarios increase in complexity as users demonstrate competence. Early sessions cover fundamentals; later sessions cover edge cases.', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)' },
  { icon: Shield,     title: 'Everything in Pro, plus more',   desc: 'All Pro features included: shared database, PDF records, compliance matrix, Slack delivery, and audit-ready reporting.', color: '#38bdf8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)' },
]

export default function GeniusPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="max-w-3xl">
            <JurisdictionBadge jurisdiction="gibraltar" product="genius" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-medium uppercase tracking-widest"
              style={{ color: '#fbbf24', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <Crown className="w-3.5 h-3.5" />
              Platinum
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-6" style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}>
              Conply <span style={{ color: '#fbbf24' }}>Genius</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
              Personalised learning journeys that map regulation topics directly to each user. The AI knows what they&apos;ve covered, where they&apos;re weak, and what to test them on next.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="cta-genius inline-block px-8 py-3.5 rounded-xl font-semibold text-sm text-black"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
              Book a demo
            </a>
          </div>
        </section>

        {/* Architecture diagram */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
            <div className="text-center mb-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: '#fbbf24' }}>
                The Genius architecture
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
                From regulation source to personalised scenario
              </h2>
              <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
                Each user&apos;s learning journey is assembled from the regulation database, filtered by their role and progress, and generated uniquely by the AI.
              </p>
            </div>

            {/* Full diagram */}
            <div className="space-y-5">

              {/* Stage intro */}
              <div className="max-w-2xl mx-auto text-center pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#fbbf24' }}>
                  Stage 1 &middot; Ingest
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Primary Gibraltar statute is broken into citable chunks and indexed with vector embeddings. Every chunk retains its source, section, and context so scenarios can cite the exact law later.
                </p>
              </div>

              {/* Row 1: Regulation sources feed into chunks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
                    1. Regulation sources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'POCA 2015', sections: '42 sections' },
                      { name: 'GFSC DLT Principles', sections: '9 principles' },
                      { name: 'Gambling Act 2025', sections: '38 sections' },
                      { name: 'AML/CFT Guidance', sections: '6 chapters' },
                      { name: 'Social Responsibility Codes', sections: '12 codes' },
                      { name: 'Data Protection Act', sections: '8 parts' },
                    ].map(r => (
                      <div key={r.name} className="rounded-lg px-3 py-2"
                        style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                        <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>{r.name}</p>
                        <p className="text-[10px]" style={{ color: 'var(--muted)', opacity: 0.6 }}>{r.sections}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#fbbf24' }}>
                    2. Regulation chunks (embeddings)
                  </p>
                  <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                    <div className="space-y-2">
                      {[
                        { source: 'POCA 2015', section: 'Section 28', content: 'Nominated officer reporting obligations...' },
                        { source: 'Gambling Act', section: 'Section 42', content: 'Staff competence standard requirements...' },
                        { source: 'GFSC DLT', section: 'Principle 7', content: 'Systems, controls, and human resources...' },
                      ].map((chunk, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs">
                          <Database className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24', opacity: 0.6 }} />
                          <div>
                            <span className="font-medium" style={{ color: 'var(--text)' }}>{chunk.source}, {chunk.section}</span>
                            <span className="ml-2" style={{ color: 'var(--muted)', opacity: 0.6 }}>{chunk.content}</span>
                          </div>
                        </div>
                      ))}
                      <p className="text-[10px] text-center pt-1" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                        + hundreds more chunks, each with a vector embedding
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <svg width="2" height="24" viewBox="0 0 2 24"><line x1="1" y1="0" x2="1" y2="20" stroke="rgba(251,191,36,0.3)" strokeWidth="2" strokeDasharray="4 4" /><polygon points="0,20 2,20 1,24" fill="rgba(251,191,36,0.4)" /></svg>
              </div>

              {/* Stage intro */}
              <div className="max-w-2xl mx-auto text-center pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#fbbf24' }}>
                  Stage 2 &middot; Personalise
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  This is the difference from Pro. The AI reads each user&apos;s profile, sector, past scores, and regulation coverage map before generating scenarios. Mastered topics are skipped, weak areas get drilled, new territory starts with foundations.
                </p>
              </div>

              {/* Row 2: User profile + AI */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* User profile */}
                <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(96,165,250,0.2)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#60a5fa' }}>
                    3. User profile
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}>
                        <User className="w-4 h-4" style={{ color: '#60a5fa' }} />
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>Sarah Mitchell</p>
                        <p className="text-[10px]" style={{ color: 'var(--muted)' }}>MLRO, Crypto sector</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { label: 'AML', status: 'completed', score: '100%' },
                        { label: 'DLT Principles', status: 'completed', score: '67%' },
                        { label: 'Sanctions', status: 'in-progress', score: '' },
                        { label: 'Market Integrity', status: 'not-started', score: '' },
                      ].map(m => (
                        <div key={m.label} className="flex items-center justify-between text-xs px-2 py-1 rounded"
                          style={{ background: 'var(--bg)' }}>
                          <span style={{ color: 'var(--muted)' }}>{m.label}</span>
                          <span style={{ color: m.status === 'completed' ? '#4ade80' : m.status === 'in-progress' ? '#fbbf24' : 'var(--muted)' }}>
                            {m.status === 'completed' ? m.score : m.status === 'in-progress' ? 'In progress' : '...'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI + RAG */}
                <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: 'var(--card)', border: '1px solid rgba(251,191,36,0.3)', boxShadow: '0 0 30px -8px rgba(251,191,36,0.1)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.08), transparent 70%)' }} />
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3 relative" style={{ color: '#fbbf24' }}>
                    4. Personalised generation
                  </p>
                  <div className="relative space-y-3">
                    <div className="rounded-lg p-3 text-center" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                      <Brain className="w-6 h-6 mx-auto mb-1.5" style={{ color: '#fbbf24' }} />
                      <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>AI</p>
                      <p className="text-[10px]" style={{ color: 'var(--muted)' }}>Retrieves relevant chunks for this user&apos;s gaps</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--muted)' }}>
                      <ArrowRight className="w-3 h-3" style={{ color: '#fbbf24' }} />
                      User completed AML at 100%, skip basic AML scenarios
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--muted)' }}>
                      <ArrowRight className="w-3 h-3" style={{ color: '#fbbf24' }} />
                      DLT score was 67%, retrieve Principle 7 edge cases
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--muted)' }}>
                      <ArrowRight className="w-3 h-3" style={{ color: '#fbbf24' }} />
                      Sanctions not started, begin with foundational scenarios
                    </div>
                  </div>
                </div>

                {/* Generated output */}
                <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(74,222,128,0.2)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#4ade80' }}>
                    5. Personalised scenario
                  </p>
                  <div className="rounded-lg p-3" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text)' }}>
                      Sarah, as MLRO you receive a report that a DLT customer has conducted three rapid cross-chain transfers...
                    </p>
                    <div className="space-y-1">
                      {['A. Escalate to GFIU', 'B. File internal SAR', 'C. Freeze wallet', 'D. Monitor further'].map((o, i) => (
                        <div key={o} className="px-2 py-1 rounded text-[10px]"
                          style={{
                            border: `1px solid ${i === 1 ? 'rgba(74,222,128,0.4)' : 'var(--card-border)'}`,
                            color: i === 1 ? '#4ade80' : 'var(--muted)',
                            background: i === 1 ? 'rgba(74,222,128,0.08)' : 'transparent',
                          }}>
                          {o}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] mt-2" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                      Ref: POCA 2015, Section 28
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />
                    <span className="text-[10px] font-medium" style={{ color: '#4ade80' }}>Tailored to Sarah&apos;s MLRO role + crypto sector</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <svg width="2" height="24" viewBox="0 0 2 24"><line x1="1" y1="0" x2="1" y2="20" stroke="rgba(251,191,36,0.3)" strokeWidth="2" strokeDasharray="4 4" /><polygon points="0,20 2,20 1,24" fill="rgba(251,191,36,0.4)" /></svg>
              </div>

              {/* Stage intro */}
              <div className="max-w-2xl mx-auto text-center pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#fbbf24' }}>
                  Stage 3 &middot; Adapt
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Every answer updates the user&apos;s compliance profile. Admins see regulation-level coverage per person, not just module ticks. The roadmap tells each user what to learn next. The system gets smarter the longer your team uses it.
                </p>
              </div>

              {/* Row 3: Outputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl px-5 py-4 text-center" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <FileText className="w-5 h-5 mx-auto mb-2" style={{ color: '#4ade80' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Per-user PDF records</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>Individual completion certificates with regulation coverage</p>
                </div>
                <div className="rounded-xl px-5 py-4 text-center" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" style={{ color: '#60a5fa' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Compliance profiles</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>Regulation-level coverage per user, not just module ticks</p>
                </div>
                <div className="rounded-xl px-5 py-4 text-center" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <Target className="w-5 h-5 mx-auto mb-2" style={{ color: '#fbbf24' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Adaptive roadmap</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>Each user sees what to learn next based on their gaps</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>What&apos;s included</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="glass-card rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${f.bg}, transparent 70%)` }} />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative"
                      style={{ background: f.bg, border: `1px solid ${f.border}`, boxShadow: `0 0 20px -4px ${f.border}, inset 0 0 12px -4px ${f.border}` }}>
                      <div className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${f.bg}, transparent 70%)` }} />
                      <Icon className="w-5 h-5 relative z-10" style={{ color: f.color }} />
                    </div>
                    <h3 className="text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Genius vs Pro comparison */}
        <section className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>Genius vs Pro</h2>
          </div>
          <div className="rounded-xl overflow-x-auto" style={{ border: '1px solid var(--card-border)' }}>
            <div className="grid grid-cols-3 text-center text-xs font-semibold uppercase tracking-wider min-w-[480px]"
              style={{ background: 'rgba(91,84,184,0.06)', borderBottom: '1px solid var(--card-border)' }}>
              <div className="px-4 py-3" style={{ color: 'var(--muted)' }}>Feature</div>
              <div className="px-4 py-3" style={{ color: '#a78bfa' }}>Pro</div>
              <div className="px-4 py-3" style={{ color: '#fbbf24' }}>Genius</div>
            </div>
            {[
              { feature: 'Regulation database',           pro: true,  genius: true },
              { feature: 'AI scenario generation',        pro: true,  genius: true },
              { feature: 'PDF completion records',        pro: true,  genius: true },
              { feature: 'Team compliance matrix',        pro: true,  genius: true },
              { feature: 'Slack delivery',                pro: true,  genius: true },
              { feature: 'Per-user learning paths',       pro: false, genius: true },
              { feature: 'Adaptive difficulty',           pro: false, genius: true },
              { feature: 'Regulation-level coverage map', pro: false, genius: true },
              { feature: 'Individual compliance profiles',pro: false, genius: true },
              { feature: 'Topic-level gap analysis',      pro: false, genius: true },
            ].map((row, i) => (
              <div key={row.feature} className="grid grid-cols-3 text-center text-sm items-center"
                style={{ background: 'var(--card)', borderTop: i > 0 ? '1px solid var(--card-border)' : undefined }}>
                <div className="px-4 py-3 text-left" style={{ color: 'var(--muted)' }}>{row.feature}</div>
                <div className="px-4 py-3">
                  {row.pro
                    ? <CheckCircle className="w-4 h-4 mx-auto" style={{ color: '#4ade80' }} />
                    : <span style={{ color: 'var(--muted)', opacity: 0.3 }}>-</span>
                  }
                </div>
                <div className="px-4 py-3">
                  <CheckCircle className="w-4 h-4 mx-auto" style={{ color: '#4ade80' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              See Genius in action
            </h2>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
              We&apos;ll walk you through a personalised demo using your firm&apos;s sector and team structure. 30 minutes, no commitment.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="cta-genius inline-block px-8 py-3.5 rounded-xl font-semibold text-sm text-black"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
              Book a demo
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
