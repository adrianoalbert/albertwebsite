'use client';

import { useState } from 'react';
import styles from '../styles/Card.module.css';

interface AccordionProps {
  title: string;
  count: number;
  icon: string;
  children: React.ReactNode;
}

export default function Accordion({ title, count, icon, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.accordionGroup} ${isOpen ? styles.active : ''}`}>
      <button 
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.categoryIcon}>{icon}</span>
        {title}
        <span className={styles.accordionCount}>{count}</span>
      </button>
      <div className={styles.accordionContent}>
        {children}
      </div>
    </div>
  );
} 