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

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))
  return files
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
}

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
  const post = getPostBySlug(slug)
  if (!post) return null
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(post.content)
  return { meta: post.meta, html: processed.toString() }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = posts.flatMap(p => p.tags)
  return [...new Set(tags)].sort()
}
