import type { Metadata } from "next";
import { Suspense } from "react";
import ProductLanguageSwitcher from "../product/LanguageSwitcher";
import { parsePrivacyLocale, privacyCopy } from "../i18n/privacy";
import styles from "../styles/About.module.css";
import cardStyles from "../styles/Card.module.css";
import product from "../styles/Product.module.css";

type SearchParams = { lang?: string | string[] };

async function readLocale(searchParams?: SearchParams | Promise<SearchParams>) {
  const resolved = await Promise.resolve(searchParams ?? {});
  return parsePrivacyLocale(resolved.lang);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}): Promise<Metadata> {
  const locale = await readLocale(searchParams);
  const copy = privacyCopy[locale];
  return {
    title: copy.pageTitle,
    description: copy.description,
  };
}

export const dynamic = "force-dynamic";

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const locale = await readLocale(searchParams);
  const copy = privacyCopy[locale];

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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {copy.heading}
            </div>
            <Suspense fallback={null}>
              <ProductLanguageSwitcher locale={locale} />
            </Suspense>
          </div>
        </div>
        <div className={styles.bioSection}>
          <div className={`${styles.textContent} ${product.panel}`}>
            <h1>NetPort Pro</h1>
            <p className={product.lead}>{copy.lead}</p>
            <p>{copy.intro}</p>

            <h2>{copy.collectTitle}</h2>
            <p>{copy.collectIntro}</p>
            <ul>
              {copy.collectItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{copy.collectNot}</p>

            <h2>{copy.whyTitle}</h2>
            <p>{copy.whyBody}</p>

            <h2>{copy.storageTitle}</h2>
            <p>{copy.storageLocal}</p>
            <p>{copy.storageTransmit}</p>

            <h2>{copy.sharingTitle}</h2>
            <p>{copy.sharingBody}</p>

            <h2>{copy.contactTitle}</h2>
            <p>{copy.contactIntro}</p>
            <ul>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/adrianoalbertmuniz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/adrianoalbertmuniz
                </a>
              </li>
              <li>
                Website:{" "}
                <a href="https://www.adrianoalbert.com">www.adrianoalbert.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
