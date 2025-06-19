import { getContentByType } from '@/lib/markdown'

export default async function ProjectsPage() {
  const projects = await getContentByType('projects')

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      backgroundImage: 'url(/bg-tech-2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}></div>
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <div className="page-header">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
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