export const courseLocales = ["en", "ja"] as const;

export type CourseLocale = (typeof courseLocales)[number];

export const defaultCourseLocale: CourseLocale = "en";

export const courseLocaleLabels: Record<CourseLocale, string> = {
  en: "EN",
  ja: "JA",
};

export const courseLocaleNames: Record<CourseLocale, string> = {
  en: "English",
  ja: "日本語",
};

export type CoursesUiCopy = {
  title: string;
  viewDetails: string;
  showCredentials: string;
  language: string;
  notFound: string;
  backToCourses: string;
};

export const coursesUi: Record<CourseLocale, CoursesUiCopy> = {
  en: {
    title: "Courses",
    viewDetails: "View Details",
    showCredentials: "Show Credentials",
    language: "Language",
    notFound: "Course not found",
    backToCourses: "Back to Courses",
  },
  ja: {
    title: "コース",
    viewDetails: "詳細を見る",
    showCredentials: "資格・証明書を表示",
    language: "言語",
    notFound: "コースが見つかりません",
    backToCourses: "コース一覧へ戻る",
  },
};

export function parseCourseLocale(
  value: string | string[] | undefined | null
): CourseLocale {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "ja" ? "ja" : "en";
}

export function withCourseLang(path: string, locale: CourseLocale): string {
  if (locale === defaultCourseLocale) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=${locale}`;
}

function parseDateParts(dateString: string): {
  year: number;
  month: number;
  day: number;
} {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
  if (match) {
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
    };
  }

  const date = new Date(dateString);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

const EN_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatCourseDate(
  dateString: string,
  locale: CourseLocale,
  style: "short" | "long" = "short"
): string {
  const { year, month, day } = parseDateParts(dateString);

  // Timeline/list dates use the same compact English style in both languages.
  if (style === "short") {
    return `${EN_MONTHS[month - 1]} ${day} ${year}`;
  }

  if (locale === "ja") {
    return `${year}年${month}月${day}日`;
  }

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
