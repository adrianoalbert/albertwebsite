"""Localize remaining English date/duration values in Japanese course files."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1] / "content" / "courses"

MONTHS = {
    "January": "1月",
    "February": "2月",
    "March": "3月",
    "April": "4月",
    "May": "5月",
    "June": "6月",
    "July": "7月",
    "August": "8月",
    "September": "9月",
    "October": "10月",
    "November": "11月",
    "December": "12月",
}


def localize_date(match: re.Match[str]) -> str:
    month, day, year = match.group(1), match.group(2), match.group(3)
    return f"{year}年{MONTHS[month]}{day}日"


def main() -> None:
    for path in sorted(ROOT.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        original = text
        text = re.sub(r"(\d+)\s+days?", r"\1日間", text)
        text = re.sub(
            r"(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})",
            localize_date,
            text,
        )
        text = text.replace("DEVASC completion, 3-5 years of experience", "DEVASC修了、3〜5年の経験")
        text = text.replace("EC-Council", "EC-Council")
        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"updated {path.name}")
        else:
            print(f"unchanged {path.name}")


if __name__ == "__main__":
    main()
