import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import styles from '../styles/About.module.css'
import cardStyles from '../styles/Card.module.css'
import EducationSection from '../components/EducationSection'
import HonorsAwardsSection from '../components/HonorsAwardsSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'IT/OT Systems Engineer and Cybersecurity Professional with 10+ years in IT/OT, global OT project experience, and cybersecurity countermeasures for delivered systems.',
}

export default async function About() {
  const fullPath = path.join(process.cwd(), 'content/about/about.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content)
  const contentHtml = processedContent.toString()

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={cardStyles.header}>
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
            className={cardStyles.headerIcon}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          About Me
        </div>
        <div className={styles.bioSection}>
          <div
            className={styles.textContent}
            style={{
              fontSize: 'clamp(18px, 2vw, 22px)'
            }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
        <EducationSection />
        <HonorsAwardsSection />
      </div>
    </div>
  )
} 