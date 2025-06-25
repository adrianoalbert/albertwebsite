import styles from '../styles/EducationSection.module.css';
import Image from 'next/image';

const educationData = [
  {
    logo: '/images/education/kyutech-logo.svg',
    institution: 'Kyushu Institute of Technology',
    degree: 'Doctor of Philosophy - PhD, Computer Science and Systems Engineering',
    duration: '2009 - 2015',
    activities: 'Activities and societies: President and Vice President of Foreign Student Association of Kyushu Institute of Technology (Iizuka Campus)',
  },
  {
    logo: '/images/education/kyutech-logo.svg',
    institution: 'Kyushu Institute of Technology',
    degree: 'Master of Engineering - MEng, Computer Science and Systems Engineering',
    duration: '2007 - 2009',
    activities: '',
  },
  {
    logo: '/images/education/kyushu-university-logo.svg',
    institution: 'Kyushu University',
    degree: 'Research Student, Computer Science and Communication Engineering',
    duration: '2005 - 2007',
    activities: 'Activities and societies: International Student Residence Supporter',
  },
  {
    logo: '/images/education/kyushu-university-logo.svg',
    institution: 'Kyushu University',
    degree: 'Intensive Japanese Language Course',
    duration: '2005 - 2005',
    activities: 'Completed the intensive Japanese Language Course given at the International Student Center Kyushu University from April, 2005 to September, 2005',
  },
  {
    logo: '/images/education/uespi-logo.svg',
    institution: 'Universidade Estadual do Piauí',
    degree: "Bachelor's degree, Computer Science",
    duration: '1998 - 2003',
    activities: '',
  },
];

export default function EducationSection() {
  return (
    <section className={styles.educationSection}>
      <h2 className={styles.header}>🎓 Education</h2>
      <div className={styles.educationList}>
        {educationData.map((edu, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.logoWrap}>
              <Image src={edu.logo} alt={edu.institution} width={60} height={60} className={styles.logo} />
            </div>
            <div className={styles.eduContent}>
              <div className={styles.institution}>{edu.institution}</div>
              <div className={styles.degree}>{edu.degree}</div>
              <div className={styles.duration}>{edu.duration}</div>
              {edu.activities && <div className={styles.activities}>{edu.activities}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 