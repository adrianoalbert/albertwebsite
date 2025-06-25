import styles from '../styles/HonorsAwardsSection.module.css';
import Image from 'next/image';

const awardsData = [
  {
    institution: 'Rotary Yoneyama Scholarship (ロータリー米山奨学金)',
    details: 'Issued by Rotary Yoneyama Memorial Foundation - Apr 2010',
    link: 'https://www.rotary-yoneyama.or.jp/',
    association: 'Associated with Kyushu Institute of Technology',
    logo: '/images/education/kyutech-logo.svg',
    logoAlt: 'Kyutech',
  },
  {
    institution: 'Young Researcher Award (学術奨励賞)',
    details: 'Issued by The Institute of Electronics, Information and Communication Engineers (IEICE) - Mar 2009',
    link: 'https://www.ieice.org/',
    association: 'Associated with Kyushu Institute of Technology',
    logo: '/images/education/kyutech-logo.svg',
    logoAlt: 'Kyutech',
  },
  {
    institution: 'IEICE Technical Committee on Internet Architecture (IA) - Student Encouragement Award IEICE\nインターネット アーキテクチャ研究会学生研究奨励賞',
    details: 'Issued by 電子情報通信学会通信ソサイエティ - Jan 2009',
    link: '',
    association: 'Associated with Kyushu Institute of Technology',
    logo: '/images/education/kyutech-logo.svg',
    logoAlt: 'Kyutech',
  },
  {
    institution: 'Monbukagakusho Scholarship (文部科学省奨学金)',
    details: 'Issued by Japanese Government MEXT - Apr 2005',
    link: 'https://www.mext.go.jp/',
    association: 'Associated with Kyushu University',
    logo: '/images/education/kyushu-university-logo.svg',
    logoAlt: 'Kyushu University',
  },
];

export default function HonorsAwardsSection() {
  return (
    <section className={styles.honorsSection}>
      <h2 className={styles.header}>🏆 Honors and Awards</h2>
      <div className={styles.awardsList}>
        {awardsData.map((award, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.awardsContent}>
              <div className={styles.institution}>{award.institution}</div>
              <div className={styles.details}>{award.details}</div>
              {award.link && (
                <a className={styles.link} href={award.link} target="_blank" rel="noopener noreferrer">{award.link}</a>
              )}
              <div className={styles.associationDetails}>
                <div className={styles.activities}>{award.association}</div>
                <div className={styles.awardsLogo}>
                  <Image src={award.logo} alt={award.logoAlt} width={48} height={48} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 