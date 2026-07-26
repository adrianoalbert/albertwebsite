"""Convert English Course Details headers in base course files to Japanese."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "content" / "courses"

REPLACEMENTS = [
    ("## Course Details", "## コース詳細"),
    ("- **Duration**:", "- **期間**:"),
    ("- **Start Date**:", "- **開始日**:"),
    ("- **End Date**:", "- **終了日**:"),
    ("- **Level**:", "- **レベル**:"),
    ("- **Lab Environment**:", "- **ラボ環境**:"),
    ("- **Course Code**:", "- **コースコード**:"),
    ("- **Provider**:", "- **提供元**:"),
    ("- **Format**:", "- **形式**:"),
    ("- **Technologies**:", "- **技術**:"),
    ("- **Prerequisites**:", "- **前提条件**:"),
    ("Intermediate to Advanced", "中級〜上級"),
    ("Beginner to Intermediate", "初級〜中級"),
    ("Intermediate", "中級"),
    ("Advanced", "上級"),
    ("Cisco Remote Labs", "Ciscoリモートラボ"),
    ("Remote Lab Access", "リモートラボ"),
    ("Hands-on workshop with practical exercises", "ハンズオン形式の実習中心ワークショップ"),
]


def main() -> None:
    for path in sorted(ROOT.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"updated {path.name}")
        else:
            print(f"unchanged {path.name}")


if __name__ == "__main__":
    main()
