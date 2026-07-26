"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  courseLocaleLabels,
  courseLocaleNames,
  courseLocales,
  defaultCourseLocale,
  type CourseLocale,
} from "../i18n/courses";

type Props = {
  locale: CourseLocale;
};

export default function CourseLanguageSwitcher({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLocale = (next: CourseLocale) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (next === defaultCourseLocale) {
      params.delete("lang");
    } else {
      params.set("lang", next);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="course-language-switcher" role="group" aria-label="Language">
      {courseLocales.map((code) => (
        <button
          key={code}
          type="button"
          className={`course-language-option${locale === code ? " active" : ""}`}
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          aria-label={courseLocaleNames[code]}
          title={courseLocaleNames[code]}
        >
          {courseLocaleLabels[code]}
        </button>
      ))}
    </div>
  );
}
