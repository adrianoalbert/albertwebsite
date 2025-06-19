import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-overlay"></div>
      
      <div className="home-content">
        <h1>Adriano Albert Muniz, Ph.D.</h1>
        <div className="subtitle">Lead IT/OT Systems Engineer | Experienced in Computer Networks Research</div>
        <nav className="main-nav">
          <Link href="/about">About</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/publications">Publications</Link>
          <Link href="/projects">Projects</Link>
        </nav>
      </div>

      <div className="social-icons">
        <a href="https://x.com/adrianoalbert" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <SiX className="social-icon" />
        </a>
        <a href="https://github.com/adrianoalbert/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/adrianoalbertmuniz/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin className="social-icon" />
        </a>
      </div>
    </div>
  );
}
