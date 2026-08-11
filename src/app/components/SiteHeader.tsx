'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/courses', label: 'Courses' },
  { href: '/publications', label: 'Publications' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Home">
          <Image
            src="/images/brand/aa-icon-v1-geometric.svg"
            alt=""
            width={36}
            height={36}
            className="site-brand-mark"
            priority
          />
          <span className="site-brand-text">
            <span className="site-brand-name">Adriano Albert Muniz</span>
            <span className="site-brand-role">Lead IT/OT Systems Engineer</span>
          </span>
        </Link>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="site-nav-toggle-bar" aria-hidden="true" />
          <span className="site-nav-toggle-bar" aria-hidden="true" />
          <span className="site-nav-toggle-bar" aria-hidden="true" />
        </button>

        <nav
          id="site-primary-nav"
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
