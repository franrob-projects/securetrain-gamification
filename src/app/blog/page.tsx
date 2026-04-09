import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { Nav } from '@/components/marketing/Nav'

export const metadata: Metadata = {
  title: 'Compliance Blog — ConPly',
  description: 'Practical guidance on Gibraltar compliance obligations for crypto and iGaming firms. POCA 2015, GFSC principles, Gambling Act 2025, and more.',
  openGraph: {
    title: 'Compliance Blog — ConPly',
    description: 'Practical guidance on Gibraltar compliance obligations for crypto and iGaming firms.',
    type: 'website',
  },
}

const FILTERS = [
  { label: 'All',        value: ''         },
  { label: 'iGaming',   value: 'igaming'  },
  { label: 'Crypto',    value: 'crypto'   },
  { label: 'AML',       value: 'aml'      },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const allPosts = getAllPosts()
  const posts = tag
    ? allPosts.filter(p => p.sector === tag || p.tags.includes(tag))
    : allPosts

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            From the blog
          </p>
          <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            Stay ahead of Gibraltar regulation
          </h1>

          {/* Filter bar */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => {
              const active = (f.value === '' && !tag) || f.value === tag
              return (
                <Link
                  key={f.value}
                  href={f.value ? `/blog?tag=${f.value}` : '/blog'}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={active
                    ? { background: 'var(--brand)', color: '#fff' }
                    : { background: '#1e1b38', color: 'var(--muted)', border: '1px solid #2e2a52' }
                  }
                >
                  {f.label}
                </Link>
              )
            })}
          </div>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(post => (
              <div key={post.slug} className="rounded-xl flex flex-col overflow-hidden"
                style={{ background: '#1e1b38', border: '1px solid #2e2a52' }}>
                {/* Cover placeholder */}
                <div className="h-36 flex items-center justify-center"
                  style={{ background: 'rgba(91,84,184,0.08)', borderBottom: '1px solid #2e2a52' }}>
                  <span className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'rgba(157,151,232,0.4)' }}>
                    ConPly
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.25)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-sm font-semibold leading-snug line-clamp-3" style={{ color: 'var(--text)' }}>
                    {post.title}
                  </h2>

                  <p className="text-xs leading-relaxed line-clamp-3 flex-1" style={{ color: 'var(--muted)' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid #2e2a52' }}>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{formatDate(post.date)}</span>
                      <span className="text-xs" style={{ color: 'rgba(139,135,168,0.6)' }}>{post.readingTime}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}
                      className="text-xs font-semibold"
                      style={{ color: 'var(--accent)' }}>
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t px-6 py-8 mt-16" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} ConPly. Gibraltar compliance training.
          </p>
          <Link href="/" className="text-xs" style={{ color: 'var(--muted)' }}>← Back to home</Link>
        </div>
      </footer>
    </div>
  )
}
