'use client'

import { usePathname } from 'next/navigation'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) {
    return <>{children}</>
  }

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  )
}
