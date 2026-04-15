import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.conply.org'
  const posts = getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,            lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`,    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/help`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url:             `${base}/blog/${post.slug}`,
    lastModified:    new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
