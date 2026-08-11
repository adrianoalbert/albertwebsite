"""Generate Adriano Albert (AA) favicon and brand icons from the geometric mark."""
from __future__ import annotations

import struct
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]

# Match public/images/brand/aa-icon-v1-geometric.svg
BG = (10, 17, 23, 255)  # #0A1117
FG = (242, 245, 247, 255)  # #F2F5F7
FG_SECOND = (242, 245, 247, 235)  # ~0.92 opacity
ACCENT = (90, 168, 196, 255)  # #5AA8C4
VIEW = 64.0

GEOMETRIC_SVG = (ROOT / "public" / "images" / "brand" / "aa-icon-v1-geometric.svg").read_text(
    encoding="utf-8"
)


def scale_pt(x: float, y: float, size: int) -> tuple[float, float]:
    return x / VIEW * size, y / VIEW * size


def stroke_round_polyline(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[float, float]],
    *,
    fill: tuple[int, int, int, int],
    width: int,
) -> None:
    if len(points) < 2:
        return
    draw.line(points, fill=fill, width=width, joint="curve")
    r = width / 2
    for x, y in points:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=fill)


def draw_geometric_aa(size: int) -> Image.Image:
    """Rasterize the overlapping geometric AA mark for favicon sizes."""
    render = max(size * 4, 128)
    img = Image.new("RGBA", (render, render), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    radius = max(2, round(14 / VIEW * render))
    draw.rounded_rectangle([0, 0, render - 1, render - 1], radius=radius, fill=BG)

    stroke_a = max(2, round(5.5 / VIEW * render))
    stroke_bar = max(2, round(4 / VIEW * render))

    a1 = [scale_pt(18, 46, render), scale_pt(28, 14, render), scale_pt(38, 46, render)]
    bar1 = [scale_pt(22.5, 34, render), scale_pt(33.5, 34, render)]
    a2 = [scale_pt(30, 46, render), scale_pt(40, 14, render), scale_pt(50, 46, render)]
    bar2 = [scale_pt(34.5, 34, render), scale_pt(45.5, 34, render)]

    stroke_round_polyline(draw, a1, fill=FG, width=stroke_a)
    stroke_round_polyline(draw, bar1, fill=ACCENT, width=stroke_bar)
    stroke_round_polyline(draw, a2, fill=FG_SECOND, width=stroke_a)
    stroke_round_polyline(draw, bar2, fill=ACCENT, width=stroke_bar)

    if render != size:
        img = img.resize((size, size), Image.Resampling.LANCZOS)
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


def main() -> None:
    brand_dir = ROOT / "public" / "images" / "brand"
    brand_dir.mkdir(parents=True, exist_ok=True)
    app_dir = ROOT / "src" / "app"

    master = draw_geometric_aa(512)
    master.save(brand_dir / "aa-icon.png")
    (brand_dir / "aa-icon.svg").write_text(GEOMETRIC_SVG, encoding="utf-8")
    (app_dir / "icon.svg").write_text(GEOMETRIC_SVG, encoding="utf-8")

    draw_geometric_aa(32).save(app_dir / "icon.png")
    draw_geometric_aa(180).save(app_dir / "apple-icon.png")

    sizes = [16, 32, 48]
    ico_images = [draw_geometric_aa(sz) for sz in sizes]
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
    print(f"Wrote {app_dir / 'icon.svg'}")
    print(f"Wrote {app_dir / 'icon.png'}")
    print(f"Wrote {app_dir / 'apple-icon.png'}")
    print(f"Wrote {ico_path} ({ico_path.stat().st_size} bytes, frames={frames})")


if __name__ == "__main__":
    main()
