import { getContentByType } from '@/lib/markdown'
import styles from '../styles/Card.module.css'
import Link from 'next/link'

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default async function CertificationsPage() {
  const certifications = await getContentByType('certifications')

  const sortedCertifications = certifications.sort((a, b) => {
    const dateA = a.issued ? new Date(a.issued) : new Date(0);
    const dateB = b.issued ? new Date(b.issued) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  const getIssuer = (title: string) => {
    if (title.includes('Microsoft')) return 'Microsoft';
    if (title.includes('CompTIA')) return 'CompTIA';
    if (title.includes('AWS')) return 'Amazon Web Services';
    if (title.includes('Google')) return 'Google';
    if (title.includes('Cisco')) return 'Cisco';
    if (title.includes('Oracle')) return 'Oracle';
    if (title.includes('IBM')) return 'IBM';
    if (title.includes('Red Hat')) return 'Red Hat';
    if (title.includes('VMware')) return 'VMware';
    if (title.includes('Salesforce')) return 'Salesforce';
    return 'Other';
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="52" 
            height="52" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={styles.headerIcon}
          >
            <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
          </svg>
          Certifications
        </div>
        <div className={`${styles.tableContainer} ${styles.certificationsTableWrapper}`}>
          <table className={styles.certTable}>
            <thead>
              <tr>
                <th className={styles.centerHeader}>Certification</th>
                <th>Issuer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Credentials</th>
              </tr>
            </thead>
            <tbody>
          {sortedCertifications.map((cert) => (
                <tr key={cert.slug} className={styles.certRow}>
                  <td>
                    <div className={styles.certInfo}>
                      <div className={styles.certTitle}>
              {cert.image && (
                          <img 
                    src={cert.image}
                            alt={`${cert.title} logo`} 
                            className={`${styles.certLogo} ${
                              cert.title.includes('CompTIA Security Analytics Professional') 
                                ? styles.smallLogo 
                                : styles.largeLogo
                            }`}
                          />
                )}
                        <h3>{cert.title}</h3>
              </div>
                      <div className={styles.skills}>
                        {cert.skills && cert.skills.map((skill) => (
                          <span key={skill} className={styles.skill}>
                      {skill}
                    </span>
                  ))}
                </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.issuer}>{getIssuer(cert.title)}</span>
                  </td>
                  <td>
                    {cert.issued && (
                      <div className={styles.dateInfo}>
                        <div>Issued: {formatDate(cert.issued)}</div>
                        {cert.expires && cert.expires !== 'Does not expire' && (
                          <div>Expires: {formatDate(cert.expires)}</div>
                        )}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`${styles.status} ${cert.expires === 'Does not expire' ? styles.permanent : styles.active}`}>
                      {cert.expires === 'Does not expire' ? 'Permanent' : 'Active'}
                    </span>
                  </td>
                  <td>
              {cert.badge && (
                <Link 
                  href={cert.badge}
                  target="_blank"
                  rel="noopener noreferrer"
                        className={styles.certButton}
                >
                        View
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </Link>
              )}
                  </td>
                </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 