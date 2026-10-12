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
        <div className={cardStyles.header}>
          <div className={product.pageHeader}>
            <span>{copy.pageTitle}</span>
            <Suspense fallback={null}>
              <ProductLanguageSwitcher locale={locale} />
            </Suspense>
          </div>
        </div>
        <div className={styles.bioSection}>
          <div className={`${styles.textContent} ${product.panel}`}>
            <h1>NetPort Pro</h1>
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
              <a className={product.button} href="/downloads/NetPortProTrial.exe" download>
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
