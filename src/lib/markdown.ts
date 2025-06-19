import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface ContentItem {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  content: string
  badge?: string
  certificate?: string
  issued?: string
  expires?: string
  skills?: string[]
  image?: string
  category: string
}

const contentDirectory = path.join(process.cwd(), 'content')

export async function getContentByType(type: string): Promise<ContentItem[]> {
  try {
    const fullPath = path.join(contentDirectory, type)
    const fileNames = fs.readdirSync(fullPath)
      .filter(fileName => fileName.endsWith('.md')) // Only get .md files
    const allContent = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(contentDirectory, type, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        // Process the content with remark
        const processedContent = await remark()
          .use(html, { sanitize: false }) // Disable sanitization to allow HTML
          .process(content)
        
        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          author: data.author || '',
          tags: data.tags || [],
          content: processedContent.toString(),
          badge: data.badge || '',
          certificate: data.certificate || '',
          issued: data.issued || '',
          expires: data.expires || '',
          skills: data.skills || [],
          image: data.image || '',
          category: data.category || ''
        }
      })
    )

    return allContent
  } catch (error) {
    console.error(`Error loading content from ${type}:`, error)
    return []
  }
}

export async function getContentBySlug(type: string, slug: string): Promise<ContentItem | null> {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      content: contentHtml,
      badge: data.badge || '',
      certificate: data.certificate || '',
      issued: data.issued || '',
      expires: data.expires || '',
      skills: data.skills || [],
      image: data.image || '',
      category: data.category || ''
    }
  } catch (error) {
    console.error(`Error loading content ${slug} from ${type}:`, error)
    return null
  }
} 