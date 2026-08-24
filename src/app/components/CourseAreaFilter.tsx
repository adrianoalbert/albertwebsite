"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  courseAreas,
  defaultCourseArea,
  type CourseArea,
  type CourseLocale,
  coursesUi,
} from "../i18n/courses";

type Props = {
  locale: CourseLocale;
  area: CourseArea;
};

export default function CourseAreaFilter({ locale, area }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = coursesUi[locale];

  const setArea = (next: CourseArea) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (next === defaultCourseArea) {
      params.delete("area");
    } else {
      params.set("area", next);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="course-area-filter" role="group" aria-label={t.area}>
      {courseAreas.map((code) => (
        <button
          key={code}
          type="button"
          className={`course-language-option${area === code ? " active" : ""}`}
          onClick={() => setArea(code)}
          aria-pressed={area === code}
        >
          {t.areas[code]}
        </button>
      ))}
    </div>
  );
}
