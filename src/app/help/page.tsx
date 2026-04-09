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
  { id: 'slack',              label: 'Slack reminders'              },
  { id: 'admin',              label: 'Admin access'                 },
  { id: 'training-flow',      label: 'How training works'           },
  { id: 'records',            label: 'Compliance records & audits' },
  { id: 'sectors',            label: 'Sectors & module mapping'     },
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
                Open the admin dashboard at <code>/admin</code> and switch to the <strong>Team Compliance</strong> tab.
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
                If the email doesn&apos;t arrive (rare — check spam), they can also sign in manually at <code>/auth</code> using the same email address. Their team_member row links automatically on first sign-in.
              </p>
              <p>
                <strong>Tip:</strong> If you have many team members, you can also click the bell icon next to any Overdue row to trigger an immediate Slack reminder for that specific person.
              </p>
            </section>

            <section id="slack">
              <h2>Slack reminders</h2>
              <p>
                ConPly posts a single reminder message to your nominated Slack channel each working day at 09:00 UTC. The message contains a direct link to the day&apos;s training module.
              </p>
              <p>To enable this, you need three things in your environment configuration:</p>
              <ul>
                <li><code>SLACK_BOT_TOKEN</code> — a bot token from your Slack workspace</li>
                <li><code>SLACK_CHANNEL_ID</code> — the ID of the channel that should receive reminders</li>
                <li><code>SLACK_MODULE_ID</code> — the default module to link to (optional; defaults to AML)</li>
              </ul>
              <p>
                For paying customers we configure this for you. If you want to wire it up yourself, create a Slack app, give it the <code>chat:write</code> permission, install it to your workspace, invite the bot to the target channel, and add the three values to your environment.
              </p>
              <p>
                The cron is enforced via Vercel and uses an automatically rotated <code>CRON_SECRET</code> — no action required from you.
              </p>
            </section>

            <section id="admin">
              <h2>Admin access</h2>
              <p>
                The first user to sign up to ConPly does <em>not</em> automatically become an admin. Admin access is set explicitly in the database to prevent accidental privilege escalation.
              </p>
              <p>
                To promote yourself, sign in with your email at <code>/auth</code> at least once so your row exists in the <code>users</code> table. Then run the following in your Supabase SQL editor:
              </p>
              <pre><code>{`UPDATE public.users
  SET role = 'admin'
  WHERE email = 'you@yourfirm.com';`}</code></pre>
              <p>
                After running this, refresh <code>/admin</code> and you&apos;ll see the dashboard with the Modules and Team Compliance tabs.
              </p>
              <p>
                Subsequent admins can be promoted the same way. There is no UI for it on purpose — admin role changes should leave a trail in your database.
              </p>
            </section>

            <section id="training-flow">
              <h2>How training works</h2>
              <p>
                For each module, ConPly generates three unique multiple-choice scenarios using Claude, grounded in real Gibraltar regulation. The user selects an answer, sees an explanation referencing the relevant statute, and progresses to the next scenario. After three, they get a score.
              </p>
              <p>The pass mark is 66% (2 out of 3). Below that, the user can retry the module immediately.</p>
              <p>
                Every completion writes a row to the <code>completions</code> table with the user ID, module ID, score, and timestamp. This is what the admin compliance matrix and individual training history pages render.
              </p>
              <p>
                Users can view their own training history at <code>/progress</code> — it shows all 8 modules with their completion status, average score, and a download button for individual completion records.
              </p>
            </section>

            <section id="records">
              <h2>Compliance records &amp; audits</h2>
              <p>
                Every completed module produces a downloadable PDF record containing the user&apos;s email, the module name, the completion date and time, the score, and a footer identifying ConPly as the issuer. These PDFs are designed to be the kind of evidence a regulator asks for during a supervisory visit.
              </p>
              <p>Records can be downloaded from two places:</p>
              <ul>
                <li><strong>The user&apos;s own progress page</strong> at <code>/progress</code> — they can self-serve their own records</li>
                <li><strong>Immediately after completing a module</strong> — the results screen has a Download completion record button</li>
              </ul>
              <p>
                For full firm-level compliance records, admins can also see every completion across the team in the compliance matrix at <code>/admin</code>. We&apos;re actively working on bulk export — for now, you can download per-user records via the user&apos;s own progress page.
              </p>
            </section>

            <section id="sectors">
              <h2>Sectors &amp; module mapping</h2>
              <p>
                When you add a team member, you assign them to one of three sectors. ConPly uses this to decide which of the 8 modules are required for them:
              </p>
              <ul>
                <li><strong>Crypto</strong> — required: AML, DLT Regulatory Principles, Senior Manager, Sanctions, Market Integrity, KYC, Data Protection (7 modules)</li>
                <li><strong>iGaming</strong> — required: AML, Responsible Gambling, Senior Manager, Sanctions, KYC, Data Protection (6 modules)</li>
                <li><strong>Both</strong> — required: all 8 modules</li>
              </ul>
              <p>
                The compliance matrix shows a dash <code>—</code> in cells where a module isn&apos;t required for that user&apos;s sector, a green tick when they&apos;ve completed it, and a red cross when they haven&apos;t.
              </p>
            </section>

            <section id="faq">
              <h2>FAQ</h2>

              <h3>Can a user retake a module they&apos;ve already passed?</h3>
              <p>
                Yes. Each scenario is freshly generated by Claude, so retaking a module produces three different scenarios. Both attempts are recorded; the most recent score is what shows in the compliance matrix.
              </p>

              <h3>What happens if a staff member changes role or sector?</h3>
              <p>
                For now, contact us and we&apos;ll update the row directly. A self-serve UI for editing team members is on the roadmap.
              </p>

              <h3>What if a team member leaves?</h3>
              <p>
                Their completion records are preserved (they remain in the audit trail) but you can mark them as inactive so they no longer appear as Overdue. This is currently a manual database change — let us know and we&apos;ll sort it.
              </p>

              <h3>Can we use our own logo or brand the platform?</h3>
              <p>
                Custom branding is part of the Enterprise tier. Get in touch and we&apos;ll discuss what you need.
              </p>

              <h3>Is the regulation content kept up to date?</h3>
              <p>
                Yes. Every scenario is grounded in real Gibraltar statute via our retrieval system. When new regulation comes into force (e.g. amendments to the Gambling Act 2025 or new GFSC guidance), we update the underlying source documents and the change is reflected in scenarios immediately — no module rebuild required.
              </p>

              <h3>How do I cancel?</h3>
              <p>
                Email us. There&apos;s no contractual minimum on the Starter or Team tiers — cancel any time and you&apos;ll be billed only for the current month. Your audit trail remains accessible for 90 days after cancellation in case you need to produce records during a regulator transition.
              </p>
            </section>

            <hr />

            <p>
              Still stuck? <Link href="/auth">Get in touch</Link> and we&apos;ll help you get up and running.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
