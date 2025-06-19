import Link from 'next/link'
import { getContentByType } from '@/lib/markdown'
import styles from '../styles/Card.module.css'
import Image from 'next/image'

export default async function CoursesPage() {
  const courses = await getContentByType('courses')

  const sortedCourses = courses.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.header}>
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
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            <path d="M12 6h4"/>
            <path d="M12 10h4"/>
            <path d="M12 14h4"/>
            <path d="M8 6h.01"/>
            <path d="M8 10h.01"/>
            <path d="M8 14h.01"/>
          </svg>
          Courses
        </div>
        <div className={styles.timeline}>
          {sortedCourses.map((course, index) => (
            <div key={course.slug} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>
                  {new Date(course.date).toLocaleDateString()}
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
                  href={`/courses/${course.slug}`}
                  className={styles.button}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span>
                    View Details
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
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
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
                    Show Credentials
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
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
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