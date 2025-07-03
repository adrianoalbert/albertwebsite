import styles from '../styles/Card.module.css'

export default async function ProjectsPage() {
  // Projects directory doesn't exist, so we'll show a coming soon page
  const projects = []

  return (
    <div className={styles.container}>
      <div className={styles.overlay} style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.85))' }}></div>
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
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
            <path d="M8 21l8-4-8-4"/>
          </svg>
          Projects
        </div>
        
        {/* Simple Coming Soon Message */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#4a90e2'
          }}>
            Coming Soon
          </h2>
          <p style={{
            fontSize: '24px',
            color: '#e2e8f0'
          }}>
            Stay tuned.
          </p>
        </div>
      </div>
    </div>
  )
} 