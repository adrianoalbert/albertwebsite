import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";

export const metadata: Metadata = {
  title: {
    absolute: "Adriano Albert Muniz, Ph.D. | IT/OT Systems Engineer & Cybersecurity Professional",
  },
  description:
    "IT/OT Systems Engineer and Cybersecurity Professional with a Ph.D. in computer networks — industrial automation and professional training.",
};

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-overlay"></div>

      <div className="home-content">
        <Image
          src="/images/brand/aa-icon-v1-geometric.svg"
          alt="AA"
          width={72}
          height={72}
          className="brand-mark"
          priority
        />
        <div className="brand-mark-accent" aria-hidden="true" />
        <h1>Adriano Albert Muniz, Ph.D.</h1>
        <p className="subtitle">
          <span className="subtitle-line">IT/OT Systems Engineer &amp; Cybersecurity Professional</span>
          <span className="subtitle-tagline">
            Engineering secure and reliable industrial systems through expertise in IT/OT, computer networks, and cybersecurity.
          </span>
        </p>
        <nav className="main-nav" aria-label="Primary">
          <Link href="/about">About</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/publications">Publications</Link>
        </nav>

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
    </div>
  );
}
