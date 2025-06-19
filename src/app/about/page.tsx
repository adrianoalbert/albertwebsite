import { getContentByType } from '@/lib/markdown'
import styles from '../styles/Card.module.css'

export default async function About() {
  const about = await getContentByType('about');
  const content = about[0]; // Get the first (and only) about file

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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          About Me
        </div>
        <div className={styles.textContent} dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    </div>
  )
} 