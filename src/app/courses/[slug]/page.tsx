import Link from 'next/link'
import { Suspense } from 'react'
import { getContentByType, getContentBySlug } from '@/lib/markdown'
import CourseLanguageSwitcher from '../../components/CourseLanguageSwitcher'
import styles from '../../styles/Card.module.css'
import {
  coursesUi,
  formatCourseDate,
  parseCourseLocale,
  withCourseLang,
} from '../../i18n/courses'

type SearchParams = { lang?: string | string[] }

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const courses = await getContentByType('courses')
  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: { slug: string } | Promise<{ slug: string }>
  searchParams?: SearchParams | Promise<SearchParams>
}) {
  const { slug } = await Promise.resolve(params)
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const locale = parseCourseLocale(resolvedSearchParams.lang)
  const t = coursesUi[locale]
  const course = await getContentBySlug('courses', slug, locale)

  if (!course) {
    return <div>{t.notFound}</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay} aria-hidden="true"></div>
      <div className={styles.content}>
        <div className="course-header-row" style={{ marginBottom: 16 }}>
          <Link href={withCourseLang('/courses', locale)} className="course-back-link">
            ← {t.backToCourses}
          </Link>
          <Suspense fallback={null}>
            <CourseLanguageSwitcher locale={locale} />
          </Suspense>
        </div>

        <div className={styles.textContent} style={{ maxWidth: 900, marginTop: 20 }}>
          <h1 className={styles.title} style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginBottom: 16 }}>
            {course.title}
          </h1>

          <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '1.05rem' }}>
            {formatCourseDate(course.date, locale, 'long')}
          </p>

          {course.tags && course.tags.length > 0 && (
            <div className={styles.tags} style={{ justifyContent: 'flex-start', marginBottom: 28 }}>
              {course.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="course-content"
            dangerouslySetInnerHTML={{ __html: course.content }}
          />
        </div>
      </div>
    </div>
  )
}
