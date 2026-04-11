import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  title: string
  slug: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  sector: string
  coverImage: string
  readingTime: string
}

export interface Post {
  meta: PostMeta
  content: string
}

// Module-level cache — blog content is static, so one read per cold start is enough
let _postsCache: PostMeta[] | null = null

export function getAllPosts(): PostMeta[] {
  if (_postsCache) return _postsCache
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))
  _postsCache = files
    .map(filename => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      const rt = readingTime(content)
      return {
        title:       data.title       as string,
        slug:        data.slug        as string,
        date:        data.date        as string,
        author:      data.author      as string,
        excerpt:     data.excerpt     as string,
        tags:        (data.tags       as string[]) ?? [],
        sector:      data.sector      as string,
        coverImage:  data.coverImage  as string,
        readingTime: rt.text,
      } satisfies PostMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return _postsCache
}

// Per-slug HTML cache — avoids re-parsing the same post in generateMetadata + page render
const _htmlCache = new Map<string, { meta: PostMeta; html: string }>()

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    meta: {
      title:       data.title       as string,
      slug:        data.slug        as string,
      date:        data.date        as string,
      author:      data.author      as string,
      excerpt:     data.excerpt     as string,
      tags:        (data.tags       as string[]) ?? [],
      sector:      data.sector      as string,
      coverImage:  data.coverImage  as string,
      readingTime: rt.text,
    },
    content,
  }
}

export async function getPostHtml(slug: string): Promise<{ meta: PostMeta; html: string } | null> {
  const cached = _htmlCache.get(slug)
  if (cached) return cached

  const post = getPostBySlug(slug)
  if (!post) return null
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(post.content)
  const result = { meta: post.meta, html: processed.toString() }
  _htmlCache.set(slug, result)
  return result
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap(p => p.tags))].sort()
}
