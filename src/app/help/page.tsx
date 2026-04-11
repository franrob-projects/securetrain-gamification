import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'

export const metadata: Metadata = {
  title: 'Help & Setup Guide',
  description: 'Everything you need to get ConPly running for your Gibraltar firm: inviting team members, Slack reminders, admin access, and exporting compliance records.',
}

const SECTIONS = [
  { id: 'getting-started',    label: 'Getting started'              },
  { id: 'invite-team',        label: 'Inviting team members'        },
  { id: 'training-flow',      label: 'How training works'           },
  { id: 'records',            label: 'Compliance records & audits' },
  { id: 'sectors',            label: 'Sectors & module mapping'     },
  { id: 'security',           label: 'Security & data'              },
  { id: 'technical',          label: 'Technical setup'              },
  { id: 'faq',                label: 'FAQ'                          },
] as const

export default function HelpPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Page header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Help &amp; setup
          </p>
          <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            Get ConPly running for your firm
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--muted)' }}>
            Everything you need to set up team members, enable Slack reminders, and produce compliance records.
            Most firms are live within a day.
          </p>
        </div>

        <div className="flex gap-12 flex-col lg:flex-row">
          {/* Sticky table of contents */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="lg:sticky lg:top-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
                On this page
              </p>
              <ul className="space-y-2">
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-sm transition-colors" style={{ color: 'var(--muted)' }}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="flex-1 max-w-2xl prose-conply">
            <section id="getting-started">
              <h2>Getting started</h2>
              <p>
                ConPly delivers role-specific Gibraltar compliance training to your staff via Slack and tracks every completion in an audit-ready dashboard. You only need three things to be operational:
              </p>
              <ol>
                <li>An admin account (yours)</li>
                <li>Your team members invited from the admin dashboard</li>
                <li>The daily Slack reminder configured for your channel</li>
              </ol>
              <p>
                The first two are covered below. The Slack reminder is enabled by default for paying customers — we set it up during onboarding.
              </p>
            </section>

            <section id="invite-team">
              <h2>Inviting team members</h2>
              <p>
                Open the admin dashboard and switch to the <strong>Team Compliance</strong> tab.
                Click <strong>Add team member</strong> in the top right.
              </p>
              <p>You&apos;ll be asked for:</p>
              <ul>
                <li><strong>Work email</strong> — they&apos;ll use this to sign in</li>
                <li><strong>Full name</strong> — appears in the compliance matrix</li>
                <li><strong>Job title</strong> (optional) — useful context for audits</li>
                <li><strong>Sector</strong> — Crypto, iGaming, or Both. This determines which modules are required for them.</li>
              </ul>
              <p>
                Once added, they&apos;ll receive an invitation email from ConPly with a sign-in link. They click it, land on the platform, and start training immediately. Their row appears in the compliance matrix the moment you add them, marked as <strong>Overdue</strong> until they complete their first module.
              </p>
              <p>
                <strong>Tip:</strong> Click the bell icon next to any Overdue row to send an immediate Slack reminder to that person.
              </p>
            </section>

            <section id="training-flow">
              <h2>How training works</h2>
              <p>
                For each module, ConPly&apos;s AI agents retrieve relevant sections of Gibraltar regulation, then generate three unique multiple-choice scenarios grounded in that text. The user selects an answer, sees an explanation citing the specific statute, and progresses to the next scenario. After three, they get a score.
              </p>
              <p>The pass mark is 66% (2 out of 3). Below that, the user can retry the module immediately. Each retry generates entirely new scenarios.</p>
              <p>
                Users can view their own training history at any time — it shows all 8 modules with their completion status, scores, and a download button for individual completion records.
              </p>
            </section>

            <section id="records">
              <h2>Compliance records &amp; audits</h2>
              <p>
                Every completed module produces a downloadable PDF record containing the user&apos;s email, the module name, the completion date and time, the score, and a footer identifying ConPly as the issuer. These are designed to be the evidence a regulator asks for during a supervisory visit.
              </p>
              <p>Records can be downloaded from two places:</p>
              <ul>
                <li><strong>The user&apos;s own progress page</strong> — staff can self-serve their own records</li>
                <li><strong>Immediately after completing a module</strong> — the results screen has a Download button</li>
              </ul>
              <p>
                Admins can see every completion across the team in the compliance matrix. Bulk export is on the roadmap — for now, you can download individual records per user.
              </p>
            </section>

            <section id="sectors">
              <h2>Sectors &amp; module mapping</h2>
              <p>
                When you add a team member, you assign them to one of three sectors. ConPly uses this to decide which of the 8 modules are required for them:
              </p>
              <ul>
                <li><strong>Crypto</strong> — AML, DLT Regulatory Principles, Senior Manager, Sanctions, Market Integrity, KYC, Data Protection (7 modules)</li>
                <li><strong>iGaming</strong> — AML, Responsible Gambling, Senior Manager, Sanctions, KYC, Data Protection (6 modules)</li>
                <li><strong>Both</strong> — all 8 modules</li>
              </ul>
              <p>
                The compliance matrix shows a dash in cells where a module isn&apos;t required for that user&apos;s sector, a green tick when they&apos;ve completed it, and a red cross when they haven&apos;t.
              </p>
            </section>

            <section id="security">
              <h2>Security &amp; data</h2>
              <p>
                ConPly takes the security of your staff training data seriously. Here is how your data is handled:
              </p>
              <ul>
                <li><strong>Hosting</strong> — ConPly is hosted on Vercel (edge network) with a Supabase database (EU region). All data stays within EU-regulated infrastructure.</li>
                <li><strong>Encryption</strong> — all data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Database connections use SSL.</li>
                <li><strong>Access control</strong> — your staff training data is isolated per firm. Only your admin users can see your team&apos;s data. ConPly staff access production data only for support purposes and only with your consent.</li>
                <li><strong>GDPR</strong> — ConPly processes personal data (name, email, training completion records) under a legitimate interest basis for the purpose of delivering compliance training services. Data subjects can request access, correction, or deletion by contacting us.</li>
                <li><strong>Data retention</strong> — training completion records are retained for the duration of your subscription plus 90 days to allow for regulator transitions. After cancellation, data is deleted on request.</li>
                <li><strong>AI processing</strong> — scenarios are generated by Anthropic&apos;s Claude API. The prompts contain module topics and regulation text only — no personal data is sent to the AI model.</li>
              </ul>
              <p>
                If you require a data processing agreement (DPA) or have specific security questions, <a href="mailto:hello@conply.gi">contact us</a>.
              </p>
            </section>

            <section id="technical">
              <h2>Technical setup</h2>
              <p>
                This section is for technical administrators setting up ConPly&apos;s infrastructure. If you&apos;re a compliance officer using the platform, you can skip this — we handle the setup for paying customers during onboarding.
              </p>

              <h3>Slack reminders</h3>
              <p>
                ConPly posts a daily reminder message to your nominated Slack channel at 09:00 UTC on working days. To enable this, you need:
              </p>
              <ul>
                <li><code>SLACK_BOT_TOKEN</code> — a bot token from your Slack workspace</li>
                <li><code>SLACK_CHANNEL_ID</code> — the ID of the target channel</li>
                <li><code>SLACK_MODULE_ID</code> — the default module to link to (optional; defaults to AML)</li>
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
                Subsequent admins can be promoted the same way. There is no self-serve UI for admin promotion on purpose — role changes should leave a trail in the database.
              </p>
            </section>

            <section id="faq">
              <h2>FAQ</h2>

              <h3>Can a user retake a module they&apos;ve already passed?</h3>
              <p>
                Yes. Each scenario is freshly generated, so retaking a module produces three new scenarios. Both attempts are recorded; the most recent score is what shows in the compliance matrix.
              </p>

              <h3>What happens if a staff member changes role or sector?</h3>
              <p>
                Contact us and we&apos;ll update their record. A self-serve UI for editing team members is on the roadmap.
              </p>

              <h3>What if a team member leaves?</h3>
              <p>
                Their completion records are preserved in the audit trail. We can mark them as inactive so they no longer appear as Overdue. Let us know and we&apos;ll sort it.
              </p>

              <h3>Can we use our own logo or brand the platform?</h3>
              <p>
                Custom branding is part of the Enterprise tier. <a href="mailto:hello@conply.gi">Get in touch</a> and we&apos;ll discuss what you need.
              </p>

              <h3>Is the regulation content kept up to date?</h3>
              <p>
                Yes. Scenarios are grounded in real Gibraltar statute via our retrieval system. When new regulation comes into force, we update the source documents and the change is reflected in generated scenarios immediately.
              </p>

              <h3>How do I cancel?</h3>
              <p>
                <a href="mailto:hello@conply.gi">Email us</a>. There&apos;s no contractual minimum on the Starter or Team tiers — cancel any time. Your audit trail remains accessible for 90 days after cancellation in case you need to produce records during a regulator transition.
              </p>
            </section>

            <hr />

            <p>
              Still stuck? <a href="mailto:hello@conply.gi">Email us at hello@conply.gi</a> and we&apos;ll help you get up and running.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
