import { permanentRedirect } from 'next/navigation'

/** Education content lives on About — keep this path as a redirect for old links. */
export default function EducationPage() {
  permanentRedirect('/about')
}
