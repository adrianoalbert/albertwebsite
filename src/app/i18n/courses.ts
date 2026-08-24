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

export const courseAreas = [
  "all",
  "security",
  "cloud",
  "networking",
  "ai-ml",
] as const;

export type CourseArea = (typeof courseAreas)[number];

export const defaultCourseArea: CourseArea = "all";

/** Primary area per course slug. */
export const coursePrimaryArea: Record<string, Exclude<CourseArea, "all">> = {
  "cpent-certified-penetration-testing": "security",
  "cnd-certified-network-defender": "security",
  "ceh-certified-ethical-hacker": "security",
  "ccse-certified-cloud-security-engineer": "security",
  "linux-security": "security",
  "azure-administrator-az104": "cloud",
  "cisco-devcor": "networking",
  "cisco-devasc": "networking",
  "cisco-csau": "networking",
  "python-machine-learning-deep-learning": "ai-ml",
};

/** Extra areas a course should appear under (dual-list). */
export const courseSecondaryAreas: Record<string, Exclude<CourseArea, "all">[]> =
  {
    "ccse-certified-cloud-security-engineer": ["cloud"],
  };

export type CoursesUiCopy = {
  title: string;
  viewDetails: string;
  showCredentials: string;
  language: string;
  area: string;
  notFound: string;
  backToCourses: string;
  areas: Record<CourseArea, string>;
};

export const coursesUi: Record<CourseLocale, CoursesUiCopy> = {
  en: {
    title: "Courses",
    viewDetails: "View Details",
    showCredentials: "Show Credentials",
    language: "Language",
    area: "Area",
    notFound: "Course not found",
    backToCourses: "Back to Courses",
    areas: {
      all: "All",
      security: "Security",
      cloud: "Cloud",
      networking: "Networking / Automation",
      "ai-ml": "AI / ML",
    },
  },
  ja: {
    title: "コース",
    viewDetails: "詳細を見る",
    showCredentials: "資格・証明書を表示",
    language: "言語",
    area: "分野",
    notFound: "コースが見つかりません",
    backToCourses: "コース一覧へ戻る",
    areas: {
      all: "すべて",
      security: "セキュリティ",
      cloud: "クラウド",
      networking: "ネットワーク / 自動化",
      "ai-ml": "AI / ML",
    },
  },
};

export function parseCourseArea(
  value: string | string[] | undefined | null
): CourseArea {
  const raw = Array.isArray(value) ? value[0] : value;
  return courseAreas.includes(raw as CourseArea)
    ? (raw as CourseArea)
    : defaultCourseArea;
}

export function courseMatchesArea(slug: string, area: CourseArea): boolean {
  if (area === "all") return true;
  const primary = coursePrimaryArea[slug];
  if (primary === area) return true;
  return courseSecondaryAreas[slug]?.includes(area) ?? false;
}

/** Index-card copy: one-line summary + at most two tags. */
export const courseCardMeta: Record<
  string,
  { summary: Record<CourseLocale, string>; tags: [string, string] }
> = {
  "cpent-certified-penetration-testing": {
    summary: {
      en: "Advanced penetration testing for real-world red-team engagements.",
      ja: "実環境を想定した高度なペネトレーションテスト研修。",
    },
    tags: ["EC-Council", "Penetration Testing"],
  },
  "cnd-certified-network-defender": {
    summary: {
      en: "Defensive network security and blue-team fundamentals.",
      ja: "ネットワーク防御とブルーチームの基礎を学ぶ研修。",
    },
    tags: ["EC-Council", "Network Defense"],
  },
  "ceh-certified-ethical-hacker": {
    summary: {
      en: "Ethical hacking methods, tools, and attacker-minded defense.",
      ja: "倫理的ハッキングの手法と防御視点を体系的に学ぶ研修。",
    },
    tags: ["EC-Council", "Ethical Hacking"],
  },
  "ccse-certified-cloud-security-engineer": {
    summary: {
      en: "Cloud security engineering across major cloud platforms.",
      ja: "主要クラウドにおけるクラウドセキュリティエンジニアリング研修。",
    },
    tags: ["Cloud Security", "CCSE"],
  },
  "linux-security": {
    summary: {
      en: "Linux hardening and operating-system security fundamentals.",
      ja: "LinuxのハードニングとOSセキュリティの基礎研修。",
    },
    tags: ["Linux", "Security"],
  },
  "azure-administrator-az104": {
    summary: {
      en: "Administer Azure identity, compute, storage, and networking.",
      ja: "AzureのID・コンピュート・ストレージ・ネットワーク管理研修。",
    },
    tags: ["Microsoft Azure", "Cloud"],
  },
  "cisco-devcor": {
    summary: {
      en: "Build apps on Cisco platforms with core APIs and DevOps practices.",
      ja: "Cisco基盤とAPIを用いたアプリケーション開発・DevOps研修。",
    },
    tags: ["Cisco", "Network Automation"],
  },
  "cisco-devasc": {
    summary: {
      en: "Automate workflows and apps using Cisco core platforms and APIs.",
      ja: "Cisco基盤のAPIを活用したアプリ開発と自動化ワークフロー研修。",
    },
    tags: ["Cisco", "Automation"],
  },
  "cisco-csau": {
    summary: {
      en: "Fundamentals of network automation for Cisco solutions.",
      ja: "Ciscoソリューション向けネットワーク自動化の基礎研修。",
    },
    tags: ["Cisco", "Automation"],
  },
  "python-machine-learning-deep-learning": {
    summary: {
      en: "Hands-on machine learning and deep learning with Python.",
      ja: "Pythonによる機械学習・ディープラーニングの実践研修。",
    },
    tags: ["Python", "Machine Learning"],
  },
};

export function getCourseCardMeta(slug: string, locale: CourseLocale) {
  const meta = courseCardMeta[slug];
  if (!meta) return null;
  return {
    summary: meta.summary[locale],
    tags: meta.tags,
  };
}

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
