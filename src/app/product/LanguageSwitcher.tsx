"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  defaultProductLocale,
  productLocaleLabels,
  productLocaleNames,
  productLocales,
  type ProductLocale,
} from "../i18n/product";

type Props = {
  locale: ProductLocale;
};

export default function ProductLanguageSwitcher({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLocale = (next: ProductLocale) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (next === defaultProductLocale) {
      params.delete("lang");
    } else {
      params.set("lang", next);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="course-language-switcher" role="group" aria-label="Language">
      {productLocales.map((code) => (
        <button
          key={code}
          type="button"
          className={`course-language-option${locale === code ? " active" : ""}`}
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          aria-label={productLocaleNames[code]}
          title={productLocaleNames[code]}
        >
          {productLocaleLabels[code]}
        </button>
      ))}
    </div>
  );
}
