import { getContentByType, getContentBySlug } from '@/lib/markdown'

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export async function generateStaticParams() {
  const courses = await getContentByType('courses')
  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getContentBySlug('courses', slug)
  
  if (!course) {
    return <div>Course not found</div>
  }

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
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85))'
      }}></div>
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          padding: '40px',
          marginTop: '20px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>{course.title}</h1>
          
          <p style={{
            color: '#ccc',
            marginBottom: '30px',
            fontSize: '18px'
          }}>
            {formatDate(course.date)}
          </p>

          {course.tags && course.tags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '30px'
            }}>
              {course.tags.map((tag) => (
                <span key={tag} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '16px'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div 
            style={{
              fontSize: '20px',
              lineHeight: '1.8'
            }}
            dangerouslySetInnerHTML={{ __html: course.content }} 
          />
        </div>
      </div>
    </div>
  )
} 