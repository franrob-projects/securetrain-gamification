import Link from 'next/link'
import type { Metadata } from 'next'
import { Shield, Brain, BarChart3, Smartphone } from 'lucide-react'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { AuthRedirect } from '@/components/marketing/AuthRedirect'
import { HeroToggle } from '@/components/marketing/HeroToggle'
import { ComplianceChart } from '@/components/marketing/ComplianceChart'
import { BlogCover } from '@/components/marketing/BlogCover'
import { SlackLogo, TeamsLogo } from '@/components/ui/DeliveryChannels'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/format'
import { BOOKING_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Conply | AI-Powered Compliance Training for iGaming, Crypto & Fintech',
  description: 'Conply delivers AI-generated compliance training scenarios grounded in real regulation. Supporting Gibraltar (GFSC) and Luxembourg (CSSF) regulated firms. Delivered in Slack or Microsoft Teams. Mobile-friendly, on the go. Audit-ready.',
}

const FEATURES = [
  {
    icon: Shield,
    title: 'Jurisdiction-specific regulation',
    body: 'Every scenario references actual statute for your jurisdiction. Gibraltar firms get POCA 2015, GFSC DLT Principles, and the Gambling Act 2025. Luxembourg firms get MiCA (EU 2023/1114), the AML Law of 12 November 2004, DORA, and CSSF supervisory guidance. Not generic EU templates.',
    color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)',
  },
  {
    icon: Brain,
    title: 'Regulated AI agents',
    body: 'Purpose-built AI agents retrieve the real regulation text that governs your firm and generate unique scenarios grounded in actual statute. Every explanation cites the specific section. No hallucinated law.',
    color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)',
  },
  {
    icon: Smartphone,
    title: 'Delivered in Slack & Teams',
    body: 'One message per day in Slack or Microsoft Teams, with a direct link. No login portals, no extra apps. Staff train on the apps they already have open, including on mobile, on the go.',
    color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.25)',
    delivery: true,
  },
  {
    icon: BarChart3,
    title: 'Audit-ready compliance records',
    body: 'See exactly who has completed which modules, their scores, and their status. Download PDF records per user. The audit trail regulators ask for, built in from day one.',
    color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)',
  },
]

const METRICS = [
  { value: '8',    label: 'Regulatory modules',           sub: 'AML, DLT, KYC, Sanctions, MiCA, DORA, and more',           color: '#4ade80' },
  { value: '30+',  label: 'Regulation sources',           sub: 'Across Gibraltar and Luxembourg: POCA, GFSC, MiCA, CSSF', color: '#fbbf24' },
  { value: '<10',  label: 'Minutes per session',          sub: 'Three scenarios, scored, with a compliance record',        color: '#f472b6' },
  { value: '0',    label: 'Slide decks',                  sub: 'AI scenarios replace passive e-learning',                  color: '#a78bfa' },
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
          {/* Background glows */}
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[500px] pointer-events-none"
            style={{ zIndex: 0, background: 'radial-gradient(ellipse, rgba(91,84,184,0.14) 0%, transparent 60%)' }} />
          <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] pointer-events-none"
            style={{ zIndex: 0, background: 'radial-gradient(circle, rgba(122,116,204,0.06) 0%, transparent 50%)' }} />
          <div className="absolute inset-0 dot-grid pointer-events-none" style={{ zIndex: 0, opacity: 0.3 }} />

          <div className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start" style={{ zIndex: 3 }}>
            {/* Left: text */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-6" style={{ letterSpacing: '-0.03em' }}>
                <span style={{ color: 'var(--text)' }}>AI-powered compliance training.{' '}</span>
                <br className="hidden sm:block" />
                <span className="text-gradient">Built for your jurisdiction.</span>
              </h1>
              <p className="text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ color: 'var(--muted)' }}>
                Compliance training grounded in the actual regulation that governs your firm. Completed in under 10 minutes, with audit-ready PDF records.
              </p>
              <p className="text-xs leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--muted)', opacity: 0.75 }}>
                Supporting <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Gibraltar</span> (GFSC) and <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Luxembourg</span> (CSSF).
              </p>

              <div className="mb-10 rounded-2xl p-5 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(98,100,167,0.14), rgba(167,139,250,0.08))', border: '1px solid rgba(98,100,167,0.35)' }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#a5a7de' }}>
                  Delivered where your team already works
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <SlackLogo className="w-9 h-9" />
                    <span className="text-base font-bold" style={{ color: 'var(--text)' }}>Slack</span>
                  </div>
                  <div className="w-px h-7" style={{ background: 'rgba(255,255,255,0.12)' }} />
                  <div className="flex items-center gap-2.5">
                    <TeamsLogo className="w-9 h-9" />
                    <span className="text-base font-bold" style={{ color: 'var(--text)' }}>Microsoft Teams</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-xs" style={{ color: 'var(--muted)' }}>
                  <Smartphone className="w-4 h-4" />
                  Works on the mobile apps. Train on the commute, between meetings, anywhere.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                  className="cta-primary block sm:inline-block text-center px-8 py-3.5 rounded-xl font-semibold text-white text-sm">
                  Book a demo
                </a>
                <Link href="#how-it-works"
                  className="cta-outline block sm:inline-block text-center px-8 py-3.5 rounded-xl font-semibold text-sm"
                  style={{ color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
                  How it works
                </Link>
              </div>
            </div>

            {/* Right: toggled preview */}
            <HeroToggle />
          </div>
        </section>

        {/* Metrics */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                Conply at a glance
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {METRICS.map(m => (
                <div key={m.label} className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-12 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.15), transparent 70%)' }} />
                  <div className="relative">
                    <div className="text-3xl sm:text-5xl font-extrabold mb-2" style={{ letterSpacing: '-0.03em', color: m.color }}>{m.value}</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>{m.label}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)', opacity: 0.75 }}>{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulated AI */}
        <section>
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
                  Powered by regulated AI
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                  AI agents that only speak from the law
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                  Conply doesn&apos;t use generic AI prompts. Purpose-built agents retrieve the actual text of the regulation that governs your firm, whether that is Gibraltar statute or Luxembourg/EU law, and generate training scenarios constrained to what the law says, not what a language model guesses it says.
                </p>
                <div className="space-y-5">
                  {[
                    {
                      label: 'Retrieve',
                      text: 'Agents pull the relevant sections from your jurisdiction\'s primary sources before generating anything. For Gibraltar: POCA 2015, GFSC Principles, the Gambling Act. For Luxembourg: the AML Law of 12 November 2004, MiCA (EU 2023/1114), DORA, and CSSF circulars.',
                    },
                    {
                      label: 'Generate',
                      text: 'Scenarios are built from retrieved regulation text. Each session produces three unique, realistic situations with four options and a scored answer.',
                    },
                    {
                      label: 'Cite',
                      text: 'Every explanation ends with a specific regulation reference: the Act, the section, the principle. No vague "best practice" hand-waving.',
                    },
                  ].map((item, i) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.label}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ComplianceChart />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
              The <span className="text-gradient">training lifecycle</span>
            </h2>
            <p className="text-sm mt-3" style={{ color: 'var(--muted)' }}>
              From team onboarding to audit-ready records. A fully managed loop.
            </p>
          </div>

          <div className="divide-y" style={{ borderColor: 'var(--card-border)' }}>
            {[
              {
                step: '01',
                title: 'Admin invites team',
                body: 'Add staff from the dashboard. They receive an email with a sign-in link. Assign each person a sector (Crypto, iGaming, or Both) and Conply maps the right modules.',
                icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6',
                color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)',
              },
              {
                step: '02',
                title: 'Slack or Teams delivers training',
                body: 'Each working day, one message lands in Slack or Microsoft Teams with a direct link. Staff click, complete three AI-generated scenarios grounded in their firm\'s regulation, and return to work. Works on the mobile apps they already have, train on the commute, between meetings, wherever.',
                icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
                color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)',
              },
              {
                step: '03',
                title: 'AI generates scenarios',
                body: 'Purpose-built agents retrieve real regulation text (POCA 2015 and GFSC Principles for Gibraltar firms, or the AML Law of 2004, MiCA, and CSSF guidance for Luxembourg firms) then generate unique scenarios. Every explanation cites the specific section.',
                icon: 'M12 2a7 7 0 0 0-7 7c0 2.8 1.6 4.5 3 5.5V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.5c1.4-1 3-2.7 3-5.5a7 7 0 0 0-7-7zM9 21h6M10 21v1M14 21v1',
                color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.25)',
              },
              {
                step: '04',
                title: 'Scores are recorded',
                body: 'Every completion writes a timestamped record: user, module, score. The compliance matrix updates in real time. No manual data entry.',
                icon: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zM14 2v6h6M8 13h2M8 17h2M14 13h2M14 17h2',
                color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)',
              },
              {
                step: '05',
                title: 'Audit trail ready',
                body: 'Admins see who is compliant, who is overdue, and can download a PDF completion record for any user. The evidence a regulator asks for during a supervisory visit.',
                icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
                color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)',
              },
            ].map((s, i, arr) => (
              <div key={s.step} className="flex items-start gap-5 py-6 px-4 -mx-4 rounded-xl step-row cursor-default"
                style={{ borderColor: 'rgba(46,42,82,0.4)' }}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center step-icon"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: s.color }}>
                    <path d={s.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-widest mb-2 step-label"
                    style={{ color: 'var(--accent)', transition: 'color 0.3s ease' }}>
                    Step #{s.step}
                  </span>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-16 sm:py-24 relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.08) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="text-center mb-16">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
                What you get
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                Everything a regulator expects
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="glass-card rounded-2xl p-7 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                      style={{ background: `radial-gradient(circle at top right, ${f.bg}, transparent 70%)` }} />
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative"
                        style={{ background: f.bg, border: `1px solid ${f.border}`, boxShadow: `0 0 20px -4px ${f.border}, inset 0 0 12px -4px ${f.border}` }}>
                        <div className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{ background: `radial-gradient(circle, ${f.bg}, transparent 70%)` }} />
                        <Icon style={{ color: f.color, width: '20px', height: '20px', position: 'relative', zIndex: 1 }} />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>{f.title}</h3>
                        {'delivery' in f && f.delivery && (
                          <span className="inline-flex items-center gap-1.5">
                            <SlackLogo className="w-5 h-5" />
                            <TeamsLogo className="w-5 h-5" />
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="border-y" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.04)' }}>
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
            <div className="text-center mb-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
                From the blog
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                Stay ahead of regulation
              </h2>
              <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
                Practical guidance on Gibraltar and Luxembourg compliance obligations, covering POCA 2015, MiCA, CSSF supervisory requirements, AML/CFT, and more.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
              {recentPosts.map(post => (
                <div key={post.slug} className="rounded-xl flex flex-col overflow-hidden card-hover"
                  style={{ background: 'var(--card)' }}
                >
                  <BlogCover tags={post.tags} coverImage={post.coverImage} alt={post.title} className="h-28" />
                  <div className="p-5 flex flex-col gap-3 flex-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full w-fit"
                    style={{ background: 'rgba(91,84,184,0.2)', color: 'var(--accent)' }}>
                    {post.tags[0]}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug line-clamp-3" style={{ color: 'var(--text)' }}>
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--muted)' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                    <span className="text-xs" style={{ color: 'var(--muted)', opacity: 0.75 }}>{formatDate(post.date)}</span>
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

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(91,84,184,0.15), transparent 60%)' }} />
          <div className="glass-card rounded-2xl sm:rounded-3xl p-7 sm:p-14 relative overflow-hidden glow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(167,139,250,0.12), transparent 70%)' }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gradient" style={{ letterSpacing: '-0.03em' }}>
                Get your team compliant in days, not weeks
              </h2>
              <p className="text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
                Select your jurisdiction, onboard your staff, and send the first training module within 24 hours. No implementation project, no content to write.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                  className="cta-primary w-full sm:w-auto px-10 py-4 rounded-2xl font-semibold text-white inline-block text-center">
                  Book a demo
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
          name: 'Conply',
          description: 'AI-powered compliance training for crypto, iGaming, and fintech firms in Gibraltar and Luxembourg',
          url: 'https://www.conply.org',
        })}}
      />
    </div>
  )
}
