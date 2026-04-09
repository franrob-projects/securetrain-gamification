import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/marketing/Nav'
import { AuthRedirect } from '@/components/marketing/AuthRedirect'
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
    title: 'Gibraltar-specific regulation',
    body: 'Every scenario references actual Gibraltar law — POCA 2015, GFSC DLT Principles, the Gambling Act 2025, and the Commissioner\'s Social Responsibility Codes. Not UK or Malta equivalents.',
  },
  {
    title: 'AI-generated scenarios',
    body: 'Claude generates three unique, realistic scenarios per session. No two users see the same questions. No slide decks, no videos — just decision-making under realistic conditions.',
  },
  {
    title: 'Delivered via Slack',
    body: 'One Slack message per day with a direct link to that day\'s module. No login portals to navigate. Staff click, train, and return to work in under 10 minutes.',
  },
  {
    title: 'Admin compliance dashboard',
    body: 'See exactly who has completed which modules, their scores, and their compliance status. The audit trail regulators ask for — built in from day one.',
  },
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
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6"
            style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
            Built for Gibraltar regulation
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--text)' }}>
            Compliance training your<br />Gibraltar regulator will accept
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'var(--muted)' }}>
            AI-generated scenarios mapped to POCA 2015, GFSC DLT Principles, and the Gambling Act 2025.
            Delivered via Slack. Completed in under 10 minutes. Full audit trail included.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/auth"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-colors"
              style={{ background: 'var(--brand)' }}>
              Request access
            </Link>
            <Link href="/blog"
              className="px-6 py-3 rounded-xl font-semibold transition-colors"
              style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}>
              Read the blog →
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-xl p-6"
                style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blog section */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
              From the blog
            </p>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              Stay ahead of Gibraltar regulation
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            {recentPosts.map(post => (
              <div key={post.slug} className="rounded-xl p-5 flex flex-col gap-3"
                style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full w-fit"
                  style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.25)' }}>
                  {post.tags[0]}
                </span>
                <h3 className="text-sm font-semibold leading-snug line-clamp-3" style={{ color: 'var(--text)' }}>
                  {post.title}
                </h3>
                <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--muted)' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{formatDate(post.date)}</span>
                  <Link href={`/blog/${post.slug}`} className="text-xs font-semibold"
                    style={{ color: 'var(--accent)' }}>
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Link href="/blog" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            View all posts →
          </Link>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
          <div className="rounded-2xl p-10" style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Ready to get your team compliant?
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
              Purpose-built for Gibraltar crypto and iGaming firms. Up and running in a day.
            </p>
            <Link href="/auth"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-colors inline-block"
              style={{ background: 'var(--brand)' }}>
              Request access
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-8" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} ConPly. Gibraltar compliance training.
          </p>
          <div className="flex gap-6">
            <Link href="/blog" className="text-xs" style={{ color: 'var(--muted)' }}>Blog</Link>
            <Link href="/auth" className="text-xs" style={{ color: 'var(--muted)' }}>Log in</Link>
          </div>
        </div>
      </footer>

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
