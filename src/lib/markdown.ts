import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type ContentLocale = 'en' | 'ja'

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

/** Fallback English titles when a course still has a Japanese base title. */
const ENGLISH_TITLES: Record<string, string> = {
  'linux-security': 'Linux Security',
  'azure-administrator-az104': 'Microsoft Azure Administrator (AZ-104T00)',
  'python-machine-learning-deep-learning':
    'Hands-on Machine Learning and Deep Learning with Python - scikit-learn, LightGBM, Keras / TensorFlow',
}

function hasJapanese(text: string): boolean {
  return /[\u3040-\u30ff\u3400-\u9fff]/.test(text)
}

async function markdownToHtml(content: string, sanitize = false): Promise<string> {
  const processedContent = await remark()
    .use(html, { sanitize })
    .process(content)
  return processedContent.toString()
}

function readMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return matter(fileContents)
}

function localizedPath(type: string, slug: string, locale: ContentLocale): string | null {
  // Japanese uses the base course files (existing Japanese module content).
  // English overlays live in content/<type>/en/<slug>.md
  if (locale === 'ja') return null
  const candidate = path.join(contentDirectory, type, locale, `${slug}.md`)
  return fs.existsSync(candidate) ? candidate : null
}

function toContentItem(
  slug: string,
  data: Record<string, unknown>,
  contentHtml: string,
  fallback?: ContentItem,
  locale: ContentLocale = 'en'
): ContentItem {
  const localizedTags = Array.isArray(data.tags)
    ? (data.tags as string[]).filter(Boolean)
    : []

  let title = String(data.title || fallback?.title || '')
  if (locale === 'en' && (hasJapanese(title) || !title)) {
    title = ENGLISH_TITLES[slug] || title
  }

  return {
    slug,
    title,
    date: String(data.date || fallback?.date || ''),
    author: String(data.author || fallback?.author || ''),
    tags: localizedTags.length > 0 ? localizedTags : (fallback?.tags ?? []),
    content: contentHtml,
    badge: String(data.badge || fallback?.badge || ''),
    certificate: String(data.certificate || fallback?.certificate || ''),
    issued: String(data.issued || fallback?.issued || ''),
    expires: String(data.expires || fallback?.expires || ''),
    skills: (data.skills as string[] | undefined) ?? fallback?.skills ?? [],
    image: String(data.image || fallback?.image || ''),
    category: String(data.category || fallback?.category || ''),
  }
}

export async function getContentByType(
  type: string,
  locale: ContentLocale = 'en'
): Promise<ContentItem[]> {
  try {
    const fullPath = path.join(contentDirectory, type)

    if (!fs.existsSync(fullPath)) {
      console.log(`Directory ${fullPath} does not exist, returning empty array`)
      return []
    }

    const fileNames = fs
      .readdirSync(fullPath)
      .filter((fileName) => fileName.endsWith('.md'))

    if (fileNames.length === 0) {
      console.log(`No markdown files found in ${fullPath}`)
      return []
    }

    const allContent = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const basePath = path.join(fullPath, fileName)
        const { data, content } = readMarkdownFile(basePath)
        const contentHtml = await markdownToHtml(content, false)
        const baseItem = toContentItem(
          slug,
          data as Record<string, unknown>,
          contentHtml,
          undefined,
          locale
        )

        const enPath = localizedPath(type, slug, locale)
        if (!enPath) return baseItem

        const localized = readMarkdownFile(enPath)
        const localizedHtml = await markdownToHtml(localized.content, false)
        return toContentItem(
          slug,
          localized.data as Record<string, unknown>,
          localizedHtml,
          baseItem,
          locale
        )
      })
    )

    return allContent
  } catch (error) {
    console.error(`Error loading content from ${type}:`, error)
    return []
  }
}

export async function getContentBySlug(
  type: string,
  slug: string,
  locale: ContentLocale = 'en'
): Promise<ContentItem | null> {
  try {
    const basePath = path.join(contentDirectory, type, `${slug}.md`)
    const { data, content } = readMarkdownFile(basePath)
    const contentHtml = await markdownToHtml(content)
    const baseItem = toContentItem(
      slug,
      data as Record<string, unknown>,
      contentHtml,
      undefined,
      locale
    )

    const enPath = localizedPath(type, slug, locale)
    if (!enPath) return baseItem

    const localized = readMarkdownFile(enPath)
    const localizedHtml = await markdownToHtml(localized.content)
    return toContentItem(
      slug,
      localized.data as Record<string, unknown>,
      localizedHtml,
      baseItem,
      locale
    )
  } catch (error) {
    console.error(`Error loading content ${slug} from ${type}:`, error)
    return null
  }
}
