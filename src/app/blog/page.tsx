import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { BlogCover } from '@/components/marketing/BlogCover'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Compliance Blog',
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
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent)' }}>
            From the blog
          </p>
          <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            Stay ahead of Gibraltar regulation
          </h1>
          <p className="text-sm mb-8 max-w-lg" style={{ color: 'var(--muted)' }}>
            Practical guidance on POCA 2015, GFSC DLT principles, the Gambling Act 2025, and AML/CFT obligations.
          </p>

          {/* Filter bar */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => {
              const active = (f.value === '' && !tag) || f.value === tag
              return (
                <Link
                  key={f.value}
                  href={f.value ? `/blog?tag=${f.value}` : '/blog'}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={active
                    ? { background: 'var(--brand)', color: '#fff' }
                    : { background: 'var(--card)', color: 'var(--muted)', border: '1px solid var(--card-border)' }
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
          <div>
            {/* Featured first post */}
            {posts.length > 0 && (
              <div className="rounded-xl overflow-hidden mb-8 flex flex-col sm:flex-row"
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                <BlogCover tags={posts[0].tags} className="h-48 sm:h-auto sm:w-72 flex-shrink-0" />
                <div className="p-6 sm:p-8 flex flex-col gap-3 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    {posts[0].tags.slice(0, 2).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.25)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-bold leading-snug" style={{ color: 'var(--text)' }}>
                    {posts[0].title}
                  </h2>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{formatDate(posts[0].date)}</span>
                      <span className="text-xs" style={{ color: 'rgba(139,135,168,0.6)' }}>{posts[0].readingTime}</span>
                    </div>
                    <Link href={`/blog/${posts[0].slug}`}
                      className="text-xs font-semibold"
                      style={{ color: 'var(--accent)' }}>
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining posts in grid */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.slice(1).map(post => (
                  <div key={post.slug} className="rounded-xl flex flex-col overflow-hidden card-hover"
                    style={{ background: 'var(--card)' }}>
                    <BlogCover tags={post.tags} className="h-36" />

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

                      <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--card-border)' }}>
                        <div className="flex items-center gap-3">
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
