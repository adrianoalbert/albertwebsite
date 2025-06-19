import { getContentByType } from '@/lib/markdown'
import styles from '../styles/About.module.css'

export default async function EducationPage() {
  const education = await getContentByType('education')
  const content = education[0] // Get the first (and only) education file

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span style={{ fontSize: '40px' }}>🎓</span>
          Education
        </div>
        <div 
          className={styles.textContent}
          dangerouslySetInnerHTML={{ __html: content.content }} 
        />
      </div>
    </div>
  )
} 