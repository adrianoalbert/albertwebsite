"""Generate Adriano Albert (AA) personal favicon and brand icons."""
from __future__ import annotations

import struct
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]

BG = (10, 10, 12, 255)
FG = (245, 247, 250, 255)
ACCENT = (90, 168, 196, 255)

FONT_CANDIDATES = [
    Path(r"C:\Windows\Fonts\segoeuib.ttf"),
    Path(r"C:\Windows\Fonts\arialbd.ttf"),
    Path(r"C:\Windows\Fonts\verdanab.ttf"),
]


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def rounded_bg(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = max(2, round(size * 0.18))
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=BG)
    return img


def draw_aa_monogram(size: int) -> Image.Image:
    """Readable AA monogram tuned for favicon sizes."""
    img = rounded_bg(size)
    draw = ImageDraw.Draw(img)

    font_size = max(8, int(size * 0.58))
    font = load_font(font_size)
    tracking = -size * 0.04

    def measure(f: ImageFont.ImageFont) -> tuple[float, float, float, float, float, float]:
        b1 = draw.textbbox((0, 0), "A", font=f)
        w1 = b1[2] - b1[0]
        h = b1[3] - b1[1]
        total_w = w1 + w1 + tracking
        return w1, w1, h, total_w, b1[0], b1[1]

    pad = size * 0.10
    for _ in range(16):
        w1, w2, h, total_w, ox, oy = measure(font)
        if total_w <= size - 2 * pad and h <= size * 0.68:
            break
        font_size = max(6, font_size - 1)
        font = load_font(font_size)

    w1, w2, h, total_w, ox, oy = measure(font)
    start_x = (size - total_w) / 2 - ox
    start_y = (size - h) / 2 - oy - size * 0.06

    draw.text((start_x, start_y), "A", font=font, fill=FG)
    draw.text((start_x + w1 + tracking, start_y), "A", font=font, fill=FG)

    bar_w = max(total_w * 0.62, size * 0.30)
    bar_h = max(1, round(size * 0.06))
    bar_y = start_y + oy + h + size * 0.07
    max_y = size - size * 0.10
    if bar_y + bar_h > max_y:
        bar_y = max_y - bar_h
    draw.rounded_rectangle(
        [(size - bar_w) / 2, bar_y, (size + bar_w) / 2, bar_y + bar_h],
        radius=max(1, bar_h // 2),
        fill=ACCENT,
    )
    return img


def encode_png(img: Image.Image) -> bytes:
    from io import BytesIO

    buf = BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def write_ico(path: Path, images: list[Image.Image]) -> None:
    """Write a multi-size ICO containing PNG-compressed images."""
    pngs = [encode_png(im.convert("RGBA")) for im in images]
    count = len(images)
    offset = 6 + 16 * count
    entries = bytearray()
    payload = bytearray()

    for im, data in zip(images, pngs):
        w, h = im.size
        entries += struct.pack(
            "<BBBBHHII",
            w if w < 256 else 0,
            h if h < 256 else 0,
            0,  # color palette
            0,  # reserved
            1,  # color planes
            32,  # bits per pixel
            len(data),
            offset + len(payload),
        )
        payload += data

    header = struct.pack("<HHH", 0, 1, count)
    path.write_bytes(header + entries + payload)


SVG = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Adriano Albert">
  <rect width="32" height="32" rx="6" fill="#0A0A0C"/>
  <text x="16" y="19" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="15" font-weight="700" fill="#F5F7FA" letter-spacing="-1.2">AA</text>
  <rect x="9.5" y="23.2" width="13" height="1.8" rx="0.9" fill="#5AA8C4"/>
</svg>
"""


def main() -> None:
    brand_dir = ROOT / "public" / "images" / "brand"
    brand_dir.mkdir(parents=True, exist_ok=True)

    master = draw_aa_monogram(512)
    master.save(brand_dir / "aa-icon.png")
    (brand_dir / "aa-icon.svg").write_text(SVG, encoding="utf-8")

    app_dir = ROOT / "src" / "app"
    draw_aa_monogram(32).save(app_dir / "icon.png")
    draw_aa_monogram(180).save(app_dir / "apple-icon.png")

    sizes = [16, 32, 48]
    ico_images = [draw_aa_monogram(sz) for sz in sizes]
    ico_path = app_dir / "favicon.ico"
    write_ico(ico_path, ico_images)

    with Image.open(ico_path) as ico:
        frames = []
        i = 0
        while True:
            try:
                ico.seek(i)
            except EOFError:
                break
            frames.append(ico.size)
            i += 1

    print(f"Wrote {brand_dir / 'aa-icon.png'}")
    print(f"Wrote {brand_dir / 'aa-icon.svg'}")
    print(f"Wrote {app_dir / 'icon.png'}")
    print(f"Wrote {app_dir / 'apple-icon.png'}")
    print(f"Wrote {ico_path} ({ico_path.stat().st_size} bytes, frames={frames})")


if __name__ == "__main__":
    main()
