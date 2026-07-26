import Link from 'next/link'
import { Suspense } from 'react'
import { getContentByType } from '@/lib/markdown'
import styles from '../styles/Card.module.css'
import CourseLanguageSwitcher from '../components/CourseLanguageSwitcher'
import {
  coursesUi,
  formatCourseDate,
  parseCourseLocale,
  withCourseLang,
} from '../i18n/courses'

type SearchParams = { lang?: string | string[] }

export const dynamic = 'force-dynamic'

export default async function CoursesPage({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const locale = parseCourseLocale(resolvedSearchParams.lang)
  const t = coursesUi[locale]
  const courses = await getContentByType('courses', locale)

  const sortedCourses = courses.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.85))',
        }}
      ></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className="course-header-row">
            <div className="course-header-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.headerIcon}
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M12 6h4" />
                <path d="M12 10h4" />
                <path d="M12 14h4" />
                <path d="M8 6h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
              {t.title}
            </div>
            <Suspense fallback={null}>
              <CourseLanguageSwitcher locale={locale} />
            </Suspense>
          </div>
        </div>
        <div className={styles.timeline}>
          {sortedCourses.map((course) => (
            <div key={course.slug} className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineDate}>
                  {formatCourseDate(course.date, locale, 'short')}
                </div>
                <div className={styles.timelineCard}>
                  <h2 className={styles.title}>{course.title}</h2>
                  {course.tags && course.tags.length > 0 && (
                    <div className={styles.tags}>
                      {course.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className={styles.timelineActions}>
                    <Link
                      href={withCourseLang(`/courses/${course.slug}`, locale)}
                      className={styles.button}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <span>
                        {t.viewDetails}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                    {course.certificate && (
                      <Link
                        href={course.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.button}
                        style={{ backgroundColor: 'rgba(76, 175, 80, 0.8)' }}
                      >
                        {t.showCredentials}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
