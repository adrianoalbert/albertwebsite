import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you requested could not be found.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="not-found-page">
      <Image
        src="/images/brand/aa-icon-v1-geometric.svg"
        alt=""
        width={56}
        height={56}
        className="not-found-mark"
        priority
      />
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-copy">
        That URL doesn&apos;t match anything on this site. Try one of these instead.
      </p>
      <div className="not-found-actions">
        <Link href="/" className="not-found-primary">
          Home
        </Link>
        <Link href="/courses" className="not-found-secondary">
          Courses
        </Link>
        <Link href="/about" className="not-found-secondary">
          About
        </Link>
      </div>
    </div>
  )
}
