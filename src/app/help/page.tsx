import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { Shield, Clock, Users, FileText, Layers, Lock, Settings, HelpCircle, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help & Setup Guide',
  description: 'Everything you need to get Conply running for your Gibraltar firm: inviting team members, Slack reminders, admin access, and exporting compliance records.',
}

const SECTIONS = [
  { id: 'getting-started',    label: 'Getting started',             icon: Zap },
  { id: 'invite-team',        label: 'Inviting team members',       icon: Users },
  { id: 'training-flow',      label: 'How training works',          icon: Clock },
  { id: 'records',            label: 'Compliance records & audits', icon: FileText },
  { id: 'sectors',            label: 'Sectors & module mapping',    icon: Layers },
  { id: 'security',           label: 'Security & data',             icon: Lock },
  { id: 'technical',          label: 'Technical setup',             icon: Settings },
  { id: 'faq',                label: 'FAQ',                         icon: HelpCircle },
] as const

function Callout({ type = 'info', children }: { type?: 'info' | 'tip' | 'warning'; children: React.ReactNode }) {
  const styles = {
    info:    { bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.25)',  icon: Info,           color: '#60a5fa' },
    tip:     { bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.25)',  icon: CheckCircle,    color: '#4ade80' },
    warning: { bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.25)',  icon: AlertTriangle,  color: '#fbbf24' },
  }
  const s = styles[type]
  const Icon = s.icon
  return (
    <div className="rounded-xl px-5 py-4 flex gap-3 items-start my-6"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: s.color }} />
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{children}</div>
    </div>
  )
}

function StepCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 flex gap-4 items-start"
      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
        style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.25)' }}>
        {number}
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{title}</h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{children}</p>
      </div>
    </div>
  )
}

export default function HelpPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Page header */}
        <div className="mb-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent)' }}>
            Help &amp; setup
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            Get Conply running for your firm
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--muted)' }}>
            Everything you need to set up team members, enable Slack reminders, and produce compliance records.
            Most firms are live within a day.
          </p>
        </div>

        <div className="flex gap-12 flex-col lg:flex-row">
          {/* Sticky table of contents */}
          <aside className="lg:w-60 flex-shrink-0">
            <nav className="lg:sticky lg:top-8 rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--accent)' }}>
                On this page
              </p>
              <ul className="space-y-0.5">
                {SECTIONS.map(s => {
                  const Icon = s.icon
                  return (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="help-toc-link text-sm flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
                        style={{ color: 'var(--muted)' }}>
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ opacity: 0.6 }} />
                        {s.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="flex-1 max-w-2xl prose-conply">

            {/* ── Getting started ── */}
            <section id="getting-started">
              <h2>Getting started</h2>
              <p>
                Conply delivers role-specific Gibraltar compliance training to your staff via Slack and tracks every completion in an audit-ready dashboard.
              </p>

              <Callout type="info">
                You only need three things to go live. Most firms complete setup in under an hour.
              </Callout>

              <div className="space-y-3 my-6">
                <StepCard number="1" title="Create your admin account">
                  Sign up at conply.gi. Your account becomes the firm admin automatically.
                </StepCard>
                <StepCard number="2" title="Invite your team">
                  Add staff from the admin dashboard. They get a sign-in link by email.
                </StepCard>
                <StepCard number="3" title="Enable the Slack reminder">
                  We configure this during onboarding. Your team gets one message per working day with a direct training link.
                </StepCard>
              </div>
            </section>

            {/* ── Inviting team members ── */}
            <section id="invite-team">
              <h2>Inviting team members</h2>
              <p>
                Open the admin dashboard and switch to the <strong>Team Compliance</strong> tab.
                Click <strong>Add team member</strong> in the top right.
              </p>

              <p>You&apos;ll be asked for:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                {[
                  { label: 'Work email', desc: 'They\'ll use this to sign in' },
                  { label: 'Full name', desc: 'Appears in the compliance matrix' },
                  { label: 'Job title', desc: 'Optional, useful context for audits' },
                  { label: 'Sector', desc: 'Crypto, iGaming, or Both' },
                ].map(f => (
                  <div key={f.label} className="rounded-lg px-4 py-3"
                    style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{f.label}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{f.desc}</p>
                  </div>
                ))}
              </div>

              <p>
                Once added, they&apos;ll receive an invitation email with a sign-in link. They click it, land on the platform, and start training immediately. Their row appears in the compliance matrix marked as <strong>Overdue</strong> until they complete their first module.
              </p>

              <Callout type="tip">
                Click the bell icon next to any <strong>Overdue</strong> row to send an immediate Slack reminder to that person.
              </Callout>
            </section>

            {/* ── How training works ── */}
            <section id="training-flow">
              <h2>How training works</h2>
              <p>
                For each module, Conply&apos;s AI agents retrieve relevant sections of Gibraltar regulation, then generate three unique multiple-choice scenarios grounded in that text. The user selects an answer, sees an explanation citing the specific statute, and progresses to the next scenario.
              </p>

              <div className="rounded-xl overflow-hidden my-6" style={{ border: '1px solid var(--card-border)' }}>
                <div className="grid grid-cols-3 text-center divide-x" style={{ borderColor: 'var(--card-border)' }}>
                  <div className="p-4" style={{ background: 'var(--card)' }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: '#4ade80' }}>3</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Scenarios per session</div>
                  </div>
                  <div className="p-4" style={{ background: 'var(--card)' }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: '#fbbf24' }}>66%</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Pass mark</div>
                  </div>
                  <div className="p-4" style={{ background: 'var(--card)' }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: '#60a5fa' }}>&lt;10</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Minutes per session</div>
                  </div>
                </div>
              </div>

              <p>
                Below the pass mark, the user can retry immediately. Each retry generates entirely new scenarios. Users can view their own training history at any time, showing all 8 modules with completion status, scores, and download buttons.
              </p>
            </section>

            {/* ── Compliance records ── */}
            <section id="records">
              <h2>Compliance records &amp; audits</h2>
              <p>
                Every completed module produces a downloadable PDF record containing the user&apos;s email, the module name, the completion date and time, the score, and a footer identifying Conply as the issuer.
              </p>

              <Callout type="info">
                These PDFs are designed to be the evidence a regulator asks for during a supervisory visit. They can be produced on demand.
              </Callout>

              <p>Records can be downloaded from two places:</p>
              <ul>
                <li><strong>The user&apos;s own progress page</strong>: staff can self-serve their own records</li>
                <li><strong>Immediately after completing a module</strong>: the results screen has a Download button</li>
              </ul>
              <p>
                Admins can see every completion across the team in the compliance matrix. Bulk export is on the roadmap. For now, you can download individual records per user.
              </p>
            </section>

            {/* ── Sectors ── */}
            <section id="sectors">
              <h2>Sectors &amp; module mapping</h2>
              <p>
                When you add a team member, you assign them to one of three sectors. Conply uses this to decide which of the 8 modules are required for them:
              </p>

              <div className="rounded-xl overflow-hidden my-6" style={{ border: '1px solid var(--card-border)' }}>
                {[
                  { sector: 'Crypto',  modules: 'AML, DLT Regulatory Principles, Senior Manager, Sanctions, Market Integrity, KYC, Data Protection', count: '7 modules', color: '#a78bfa' },
                  { sector: 'iGaming', modules: 'AML, Responsible Gambling, Senior Manager, Sanctions, KYC, Data Protection',                         count: '6 modules', color: '#f472b6' },
                  { sector: 'Both',    modules: 'All 8 modules',                                                                                       count: '8 modules', color: '#4ade80' },
                ].map((s, i) => (
                  <div key={s.sector} className="flex items-center gap-4 px-5 py-4"
                    style={{
                      background: 'var(--card)',
                      borderTop: i > 0 ? '1px solid var(--card-border)' : undefined,
                    }}>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md flex-shrink-0"
                      style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>
                      {s.sector}
                    </span>
                    <span className="text-sm flex-1" style={{ color: 'var(--muted)' }}>{s.modules}</span>
                    <span className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--muted)', opacity: 0.6 }}>{s.count}</span>
                  </div>
                ))}
              </div>

              <p>
                The compliance matrix shows a dash where a module isn&apos;t required for that user&apos;s sector, a green tick when they&apos;ve completed it, and a red cross when they haven&apos;t.
              </p>
            </section>

            {/* ── Security ── */}
            <section id="security">
              <h2>Security &amp; data</h2>

              <div className="space-y-3 my-6">
                {[
                  { label: 'Hosting',        icon: Shield, desc: 'Vercel (edge network) with a Supabase database (EU region). All data stays within EU-regulated infrastructure.' },
                  { label: 'Encryption',      icon: Lock,   desc: 'All data encrypted in transit (TLS 1.2+) and at rest (AES-256). Database connections use SSL.' },
                  { label: 'Access control',  icon: Users,  desc: 'Staff training data is isolated per firm. Only your admin users can see your team\'s data.' },
                  { label: 'GDPR',            icon: FileText, desc: 'Personal data processed under legitimate interest for delivering compliance training. Data subjects can request access, correction, or deletion.' },
                  { label: 'Data retention',  icon: Clock,  desc: 'Records retained for your subscription plus 90 days for regulator transitions. Deleted on request after cancellation.' },
                  { label: 'AI processing',   icon: Zap,    desc: 'Scenarios generated by Anthropic\'s Claude API. Prompts contain module topics and regulation text only. No personal data is sent to the AI model.' },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="rounded-xl px-5 py-4 flex gap-4 items-start"
                      style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                      <div>
                        <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{item.label}</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p>
                If you require a data processing agreement (DPA) or have specific security questions, <a href="mailto:francisrobeets@gmail.com">contact us</a>.
              </p>
            </section>

            {/* ── Technical setup ── */}
            <section id="technical">
              <h2>Technical setup</h2>

              <Callout type="warning">
                This section is for technical administrators. If you&apos;re a compliance officer using the platform, you can skip this. We handle setup for paying customers during onboarding.
              </Callout>

              <h3>Slack reminders</h3>
              <p>
                Conply posts a daily reminder message to your nominated Slack channel at 09:00 UTC on working days. To enable this, you need:
              </p>
              <ul>
                <li><code>SLACK_BOT_TOKEN</code>: a bot token from your Slack workspace</li>
                <li><code>SLACK_CHANNEL_ID</code>: the ID of the target channel</li>
                <li><code>SLACK_MODULE_ID</code>: the default module to link to (optional; defaults to AML)</li>
              </ul>
              <p>
                Create a Slack app with the <code>chat:write</code> permission, install it to your workspace, invite the bot to the channel, and set the environment variables.
              </p>

              <h3>Admin access</h3>
              <p>
                Admin access is set explicitly in the database to prevent accidental privilege escalation. Sign in at least once so your user row exists, then run this SQL in the Supabase SQL editor:
              </p>
              <pre><code>{`UPDATE public.users
  SET role = 'admin'
  WHERE email = 'you@yourfirm.com';`}</code></pre>
              <p>
                Subsequent admins can be promoted the same way. There is no self-serve UI for admin promotion on purpose. Role changes should leave a trail in the database.
              </p>
            </section>

            {/* ── FAQ ── */}
            <section id="faq">
              <h2>Frequently asked questions</h2>

              <div className="space-y-4 my-6">
                {[
                  {
                    q: 'Can a user retake a module they\'ve already passed?',
                    a: 'Yes. Each scenario is freshly generated, so retaking a module produces three new scenarios. Both attempts are recorded; the most recent score is what shows in the compliance matrix.',
                  },
                  {
                    q: 'What happens if a staff member changes role or sector?',
                    a: 'Contact us and we\'ll update their record. A self-serve UI for editing team members is on the roadmap.',
                  },
                  {
                    q: 'What if a team member leaves?',
                    a: 'Their completion records are preserved in the audit trail. We can mark them as inactive so they no longer appear as Overdue. Let us know and we\'ll sort it.',
                  },
                  {
                    q: 'Can we use our own logo or brand the platform?',
                    a: 'Custom branding is part of the Enterprise tier. Book a demo and we\'ll discuss what you need.',
                  },
                  {
                    q: 'Is the regulation content kept up to date?',
                    a: 'Yes. Scenarios are grounded in real Gibraltar statute via our retrieval system. When new regulation comes into force, we update the source documents and the change is reflected in generated scenarios immediately.',
                  },
                  {
                    q: 'How do I cancel?',
                    a: 'Email us. There\'s no contractual minimum on the Starter or Team tiers. Cancel any time. Your audit trail remains accessible for 90 days after cancellation in case you need to produce records during a regulator transition.',
                  },
                ].map(item => (
                  <details key={item.q} className="group rounded-xl overflow-hidden"
                    style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                    <summary className="px-5 py-4 cursor-pointer text-sm font-semibold flex items-center gap-3 select-none"
                      style={{ color: 'var(--text)' }}>
                      <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs transition-transform group-open:rotate-45"
                        style={{ background: 'rgba(91,84,184,0.12)', color: 'var(--accent)' }}>+</span>
                      {item.q}
                    </summary>
                    <div className="px-5 pb-4 pl-13 text-sm leading-relaxed" style={{ color: 'var(--muted)', paddingLeft: '3.25rem' }}>
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            <hr />

            <div className="rounded-xl p-6 text-center my-6"
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Still stuck?</p>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                We&apos;re happy to help you get up and running.
              </p>
              <a href="mailto:francisrobeets@gmail.com"
                className="inline-block px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'var(--brand)' }}>
                Email us
              </a>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
