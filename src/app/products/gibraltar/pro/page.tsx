import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { JurisdictionBadge } from '@/components/marketing/JurisdictionBadge'
import { BOOKING_URL } from '@/lib/constants'
import { Database, BookOpen, FileText, CheckCircle, Users, BarChart3, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Conply Pro Gibraltar | GFSC & POCA 2015 Compliance Training',
  description: 'Team-wide Gibraltar compliance training with a shared regulation database covering POCA 2015, GFSC Principles, and the Gambling Act 2025. Audit-ready PDF records for every module.',
}

const FEATURES = [
  { icon: Database,    title: 'Shared regulation database',     desc: 'One central database of Gibraltar regulation sources covers your entire team. POCA 2015, GFSC Principles, the Gambling Act, and more.', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)' },
  { icon: BookOpen,    title: 'Curriculum-based progression',    desc: 'Staff work through modules in order. Each module covers a regulation area. Complete it, tick it off, move to the next.', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)' },
  { icon: FileText,    title: 'PDF completion records',          desc: 'Every module completion generates a downloadable PDF with user, date, score, and regulation reference. Audit-ready from day one.', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)' },
  { icon: BarChart3,   title: 'Team compliance dashboard',       desc: 'See who has completed what, who is overdue, and download records for any user. The matrix regulators expect.', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.25)' },
  { icon: Users,       title: 'Sector-based module assignment',  desc: 'Assign staff to Crypto, iGaming, or Both. Conply maps the right modules automatically. No manual configuration.', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)' },
  { icon: Shield,      title: 'AI-generated scenarios',          desc: 'Three unique scenarios per session, grounded in Gibraltar regulation text. Scored answers with statute citations.', color: '#38bdf8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)' },
]

export default function ProPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="max-w-3xl">
            <JurisdictionBadge jurisdiction="gibraltar" product="pro" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-6" style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}>
              Conply <span style={{ color: '#a78bfa' }}>Pro</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
              Team-wide compliance training powered by a shared Gibraltar regulation database. Staff work through modules, tick off regulations as they go, and generate audit-ready records.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="cta-primary inline-block px-8 py-3.5 rounded-xl font-semibold text-white text-sm">
              Book a demo
            </a>
          </div>
        </section>

        {/* Architecture diagram */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
            <div className="text-center mb-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: '#a78bfa' }}>
                The Pro architecture
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
                From regulation source to team-wide training
              </h2>
              <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
                One shared regulation database feeds the AI, which generates scored scenarios for every module. The whole team works through the same curriculum.
              </p>
            </div>

            <div className="space-y-5">

              {/* Stage intro */}
              <div className="max-w-2xl mx-auto text-center pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#a78bfa' }}>
                  Stage 1 &middot; Ingest
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  We take the primary sources of Gibraltar compliance law and break them into citable chunks. Each chunk keeps its source, section, and surrounding context. This is the single source of truth every scenario will be grounded in.
                </p>
              </div>

              {/* Row 1: Regulation sources + shared database */}
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

                <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(167,139,250,0.2)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#a78bfa' }}>
                    2. Shared regulation database
                  </p>
                  <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                    <div className="space-y-2">
                      {[
                        { source: 'POCA 2015', section: 'Section 28', content: 'Nominated officer reporting obligations...' },
                        { source: 'Gambling Act', section: 'Section 42', content: 'Staff competence standard requirements...' },
                        { source: 'GFSC DLT', section: 'Principle 7', content: 'Systems, controls, and human resources...' },
                      ].map((chunk, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs">
                          <Database className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#a78bfa', opacity: 0.6 }} />
                          <div>
                            <span className="font-medium" style={{ color: 'var(--text)' }}>{chunk.source}, {chunk.section}</span>
                            <span className="ml-2" style={{ color: 'var(--muted)', opacity: 0.6 }}>{chunk.content}</span>
                          </div>
                        </div>
                      ))}
                      <p className="text-[10px] text-center pt-1" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                        One database shared across the entire firm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <svg width="2" height="24" viewBox="0 0 2 24"><line x1="1" y1="0" x2="1" y2="20" stroke="rgba(167,139,250,0.3)" strokeWidth="2" strokeDasharray="4 4" /><polygon points="0,20 2,20 1,24" fill="rgba(167,139,250,0.4)" /></svg>
              </div>

              {/* Stage intro */}
              <div className="max-w-2xl mx-auto text-center pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#a78bfa' }}>
                  Stage 2 &middot; Generate
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  When a staff member starts a module, the AI pulls the relevant regulation chunks and builds three unique multiple-choice scenarios. Every answer is scored and every explanation cites the exact statute. Retry the module and you get three fresh scenarios.
                </p>
              </div>

              {/* Row 2: AI generation + scenario output */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* AI generation */}
                <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: 'var(--card)', border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 30px -8px rgba(167,139,250,0.1)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.08), transparent 70%)' }} />
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3 relative" style={{ color: '#a78bfa' }}>
                    3. AI scenario generation
                  </p>
                  <div className="relative space-y-3">
                    <div className="rounded-lg p-3 text-center" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                      <Sparkles className="w-6 h-6 mx-auto mb-1.5" style={{ color: '#a78bfa' }} />
                      <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>AI</p>
                      <p className="text-[10px]" style={{ color: 'var(--muted)' }}>Retrieves regulation text and generates scored scenarios per module</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--muted)' }}>
                      <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#a78bfa' }} />
                      Same scenarios for all staff in each module
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--muted)' }}>
                      <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#a78bfa' }} />
                      Every explanation cites the specific regulation
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--muted)' }}>
                      <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#a78bfa' }} />
                      Fresh scenarios on every retry
                    </div>
                  </div>
                </div>

                {/* Scenario output */}
                <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(74,222,128,0.2)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#4ade80' }}>
                      4. Generated scenario
                    </p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded"
                      style={{ background: 'rgba(96,165,250,0.1)', color: '#60a5fa' }}>
                      2 of 3
                    </span>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text)' }}>
                      A customer at your Gibraltar-licensed exchange deposits funds from three different bank accounts within 48 hours. What should you do first?
                    </p>
                    <div className="space-y-1">
                      {['A. Contact the customer directly', 'B. File an internal SAR and assess', 'C. Freeze the account', 'D. Wait for the next review'].map((o, i) => (
                        <div key={o} className="px-2 py-1 rounded text-[10px]"
                          style={{
                            background: i === 1 ? 'rgba(74,222,128,0.08)' : 'transparent',
                            border: `1px solid ${i === 1 ? 'rgba(74,222,128,0.4)' : 'var(--card-border)'}`,
                            color: i === 1 ? '#4ade80' : 'var(--muted)',
                          }}>
                          {o}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] mt-2" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                      Ref: POCA 2015, Section 28
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <svg width="2" height="24" viewBox="0 0 2 24"><line x1="1" y1="0" x2="1" y2="20" stroke="rgba(167,139,250,0.3)" strokeWidth="2" strokeDasharray="4 4" /><polygon points="0,20 2,20 1,24" fill="rgba(167,139,250,0.4)" /></svg>
              </div>

              {/* Stage intro */}
              <div className="max-w-2xl mx-auto text-center pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#a78bfa' }}>
                  Stage 3 &middot; Evidence
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Every completion is recorded against the user with date, time, score, and module. Admins see a live team compliance matrix, staff can download PDF certificates, and Slack delivers the next training to the whole team the following working day.
                </p>
              </div>

              {/* Row 3: Outputs - compliance matrix + PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#4ade80' }}>
                      Compliance matrix
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Sarah M.', status: 'Compliant', color: '#4ade80' },
                      { name: 'James H.', status: 'In progress', color: '#fbbf24' },
                      { name: 'David C.', status: 'Overdue', color: '#f87171' },
                    ].map(r => (
                      <div key={r.name} className="flex items-center justify-between text-xs px-2 py-1.5 rounded"
                        style={{ background: 'var(--bg)' }}>
                        <span style={{ color: 'var(--text)' }}>{r.name}</span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: `${r.color}15`, color: r.color }}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl px-5 py-4 text-center flex flex-col items-center justify-center"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <FileText className="w-5 h-5 mb-2" style={{ color: '#fbbf24' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>PDF records</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>Per-user completion certificates</p>
                </div>

                <div className="rounded-xl px-5 py-4 text-center flex flex-col items-center justify-center"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <Shield className="w-5 h-5 mb-2" style={{ color: '#60a5fa' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Slack delivery</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>Daily training reminders</p>
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

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Ready to get started?
          </h2>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            We&apos;ll walk you through the platform and set up a trial with your team. 30 minutes, no commitment.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="cta-primary inline-block px-10 py-4 rounded-xl font-semibold text-white text-sm">
            Book a demo
          </a>
        </section>

        {/* Upgrade nudge */}
        <section className="border-t" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: '#fbbf24' }}>
              Need more?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Personalised learning journeys with Genius
            </h2>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
              Map regulation topics directly to each user&apos;s role and sector. Adaptive scenarios, personalised progress tracking, and individual compliance roadmaps.
            </p>
            <Link href="/products/gibraltar/genius"
              className="inline-block px-8 py-3.5 rounded-xl font-semibold text-sm"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
              Explore Genius
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
