import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllPosts, getPostHtml } from '@/lib/blog'
import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'
import { BlogCover } from '@/components/marketing/BlogCover'
import { formatDate } from '@/lib/format'

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostHtml(slug)
  if (!post) return {}
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://conply.gi'
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
      tags: post.meta.tags,
      url: `${base}/blog/${slug}`,
    },
    twitter: { card: 'summary_large_image', title: post.meta.title, description: post.meta.excerpt },
    alternates: { canonical: `${base}/blog/${slug}` },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostHtml(slug)
  if (!post) notFound()

  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://conply.gi'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.excerpt,
    datePublished: post.meta.date,
    author: { '@type': 'Organization', name: post.meta.author },
    publisher: { '@type': 'Organization', name: 'ConPly', url: base },
    url: `${base}/blog/${slug}`,
    keywords: post.meta.tags.join(', '),
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <Nav />
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)' }}>Home</Link>
          <span>/</span>
          <Link href="/blog" style={{ color: 'var(--muted)' }}>Blog</Link>
          <span>/</span>
          <span className="line-clamp-1" style={{ color: 'var(--text)' }}>{post.meta.title}</span>
        </nav>

        {/* Cover image */}
        <BlogCover tags={post.meta.tags} className="h-48 rounded-xl mb-10" />

        {/* Post header */}
        <div className="mb-10">
          <div className="flex gap-2 flex-wrap mb-4">
            {post.meta.tags.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.25)' }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold leading-snug mb-4" style={{ color: 'var(--text)' }}>
            {post.meta.title}
          </h1>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
            <span>{post.meta.author}</span>
            <span>·</span>
            <span>{formatDate(post.meta.date)}</span>
            <span>·</span>
            <span>{post.meta.readingTime}</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose-conply"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/blog" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            ← Back to blog
          </Link>
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
