import type { Metadata } from "next";
import { Suspense } from "react";
import styles from "../styles/About.module.css";
import cardStyles from "../styles/Card.module.css";
import product from "../styles/Product.module.css";
import { listReviews } from "../lib/reviews";
import { parseProductLocale, productCopy } from "../i18n/product";
import ReviewSection from "./ReviewSection";
import ProductLanguageSwitcher from "./LanguageSwitcher";

type SearchParams = { lang?: string | string[] };

async function readLocale(searchParams?: SearchParams | Promise<SearchParams>) {
  const resolved = await Promise.resolve(searchParams ?? {});
  return parseProductLocale(resolved.lang);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}): Promise<Metadata> {
  const locale = await readLocale(searchParams);
  const copy = productCopy[locale];
  return {
    title: copy.pageTitle,
    description: copy.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const locale = await readLocale(searchParams);
  const copy = productCopy[locale];
  const reviews = await listReviews();
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={`${cardStyles.header} course-page-header`}>
          <div className="course-header-row">
            <div className="course-header-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cardStyles.headerIcon}
                aria-hidden="true"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              {copy.pageTitle}
            </div>
            <Suspense fallback={null}>
              <ProductLanguageSwitcher locale={locale} />
            </Suspense>
          </div>
        </div>
        <div className={styles.bioSection}>
          <div className={`${styles.textContent} ${product.panel}`}>
            <h1>NetPort Pro</h1>
            <p className={product.lead}>{copy.introTitle}</p>
            <p>{copy.intro}</p>
            <img
              className={product.shot}
              src="/images/product/netport-pro.png?v=2"
              alt={copy.screenshotAlt}
            />
            <h2>{copy.trialTitle}</h2>
            <p>{copy.trialBody}</p>
            <p>{copy.credentialsBody}</p>
            <div className={product.actions}>
              <a className={product.button} href="/downloads/NetPortProTrial.exe?v=20261022" download>
                {copy.downloadTrial}
              </a>
              <a className={product.buttonSecondary} href="/downloads/credentials.ini" download>
                {copy.downloadCredentials}
              </a>
            </div>
            <p className={product.note}>{copy.windowsNote}</p>
            <ReviewSection initialReviews={reviews} copy={copy} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
