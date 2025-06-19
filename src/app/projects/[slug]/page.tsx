import { getContentBySlug } from '@/lib/markdown'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPost({ params }: Props) {
  const { slug } = await params
  const project = await getContentBySlug('projects', slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div className="flex items-center text-gray-600 mb-8">
              <span className="mr-4">{project.date}</span>
              <span>By {project.author}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        </article>
      </div>
    </div>
  )
} 