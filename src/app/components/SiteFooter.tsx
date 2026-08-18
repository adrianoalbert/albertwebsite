import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiX } from 'react-icons/si'

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/courses', label: 'Courses' },
  { href: '/publications', label: 'Publications' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-home">
            Adriano Albert Muniz, Ph.D.
          </Link>
          <p>IT/OT Systems Engineer &amp; Cybersecurity Professional</p>
        </div>

        <nav className="site-footer-nav" aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer-social">
          <a href="https://x.com/adrianoalbert" target="_blank" rel="noopener noreferrer" aria-label="X">
            <SiX />
          </a>
          <a href="https://github.com/adrianoalbert/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/adrianoalbertmuniz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  )
}
