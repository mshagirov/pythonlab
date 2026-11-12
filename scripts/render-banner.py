"""Render assets/banner.txt as transparent SVGs and PNGs (no dependencies).

Run with Python 3: python3 scripts/render-banner.py
Section headings specify the banner part and its color, e.g. [logo.blue].
Only the requested glyphs are used; spaces remain transparent.
"""

import math
from pathlib import Path
import struct
import zlib
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / 'static'
CELL = 24
SAMPLES = 4
# Opacity of the *-detail palettes, so they stay subtle on dark backgrounds.
DETAIL_OPACITY = 0.45
PARTS = {
    'logo': (24, 24),
    'wordmark': (55, 7),
    'wordmark-mobile': (35, 16),
}


def ink(character, x, y):
    """Geometric outlines of the circle and square character glyphs."""
    distance = math.hypot(x - 0.5, y - 0.5)
    square = max(abs(x - 0.5), abs(y - 0.5))
    if character == '●':
        return distance <= 0.39
    if character == '○':
        return 0.29 <= distance <= 0.39
    if character == '⋅':
        return distance <= 0.12
    if character == '■':
        return square <= 0.4
    if character == '□':
        return 0.29 <= square <= 0.4
    if character == '▪':
        return square <= 0.19
    if character == ' ':
        return False
    raise ValueError(f'Unsupported character: {character!r}')


def chunk(kind, data):
    return (struct.pack('!I', len(data)) + kind + data
            + struct.pack('!I', zlib.crc32(kind + data)))


def write_png(path, width, height, pixels):
    rows = b''.join(b'\0' + pixels[y * width * 4:(y + 1) * width * 4]
                    for y in range(height))
    header = struct.pack('!2I5B', width, height, 8, 6, 0, 0, 0)
    path.write_bytes(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', header)
                     + chunk(b'IDAT', zlib.compress(rows, 9)) + chunk(b'IEND', b''))


def render(part, columns, rows, entries):
    width, height = columns * CELL, rows * CELL
    pixels = bytearray(width * height * 4)
    vectors = []
    for entry in entries:
        if entry['part'] != part:
            continue
        row, column = int(entry['row']), int(entry['column'])
        rgb = bytes.fromhex(entry['color'].removeprefix('#'))
        if len(rgb) != 3:
            raise ValueError('Colors must be six-digit hex RGB values')
        for offset, character in enumerate(entry['text']):
            if character == ' ':
                continue
            if not (0 <= row < rows and 0 <= column + offset < columns):
                raise ValueError(f'Character outside {part} bounds')
            cx, cy = (column + offset + 0.5) * CELL, (row + 0.5) * CELL
            color = entry['color']
            opacity = entry['opacity']
            label = escape(character)
            if character in '○●⋅':
                radius = CELL * (0.34 if character == '○' else 0.39 if character == '●' else 0.12)
                paint = (f'fill="none" stroke="{color}" stroke-width="{CELL * 0.1}"'
                         if character == '○' else f'fill="{color}"')
                if opacity != 1:
                    paint += f' opacity="{opacity}"'
                vectors.append(f'<circle aria-label="{label}" cx="{cx}" cy="{cy}" r="{radius}" {paint}/>')
            else:
                half = CELL * (0.345 if character == '□' else 0.4 if character == '■' else 0.19)
                paint = (f'fill="none" stroke="{color}" stroke-width="{CELL * 0.11}"'
                         if character == '□' else f'fill="{color}"')
                if opacity != 1:
                    paint += f' opacity="{opacity}"'
                vectors.append(f'<rect aria-label="{label}" x="{cx - half}" y="{cy - half}" width="{half * 2}" height="{half * 2}" {paint}/>')
            for y in range(CELL):
                for x in range(CELL):
                    coverage = sum(
                        ink(character, (x + (sx + 0.5) / SAMPLES) / CELL,
                            (y + (sy + 0.5) / SAMPLES) / CELL)
                        for sy in range(SAMPLES) for sx in range(SAMPLES)
                    )
                    if coverage:
                        index = ((row * CELL + y) * width
                                 + (column + offset) * CELL + x) * 4
                        pixels[index:index + 4] = rgb + bytes([
                            round(255 * opacity * coverage / SAMPLES ** 2)
                        ])
    write_png(STATIC / f'pythonlab-{part}.png', width, height, pixels)
    svg = ''.join(vectors)
    write_svg(STATIC / f'pythonlab-{part}.svg', width, height, svg)
    return width, height, pixels, svg


def write_svg(path, width, height, content):
    path.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}" role="img" aria-label="Python Lab">'
        f'<title>Python Lab — character art</title>{content}</svg>\n', encoding='utf-8')


def read_art():
    colors = {
        'blue': '#3776ab', 'yellow': '#e0a900',
        'blue-detail': '#a8becf', 'yellow-detail': '#d9c88f',
    }
    entries = []
    part, color, row = None, None, 0
    for line in (ROOT / 'assets' / 'banner.txt').read_text(encoding='utf-8').splitlines():
        if line.startswith('#'):
            continue
        if line.startswith('['):
            label, *position = line.strip('[]').split()
            part, palette = label.split('.')
            row, column = map(int, position) if position else (0, 0)
            color = colors[palette]
        elif part is not None:
            entries.append({'part': part, 'row': row, 'column': column, 'text': line, 'color': color,
                            'opacity': DETAIL_OPACITY if palette.endswith('-detail') else 1})
            row += 1
    return entries


def main():
    entries = read_art()
    unknown = {entry['part'] for entry in entries} - PARTS.keys()
    if unknown:
        raise ValueError(f'Unknown banner parts: {unknown}')
    rendered = {part: render(part, *size, entries) for part, size in PARTS.items()}

    # Also export the complete banner as a single PNG for reuse outside the site.
    compose_banner(rendered, 'wordmark', 'banner', 2)
    compose_banner(rendered, 'wordmark-mobile', 'banner-mobile', 1)
    print('Rendered transparent Python Lab SVG and PNG banners from assets/banner.txt')


def compose_banner(rendered, text_part, name, scale):
    logo_width, height, logo, logo_svg = rendered['logo']
    text_width, text_height, text, text_svg = rendered[text_part]
    gap = CELL * 4
    width = logo_width + gap + text_width * scale
    pixels = bytearray(width * height * 4)
    for y in range(height):
        start = y * width * 4
        pixels[start:start + logo_width * 4] = logo[y * logo_width * 4:(y + 1) * logo_width * 4]
    top = (height - text_height * scale) // 2
    for y in range(text_height * scale):
        for x in range(text_width * scale):
            source = ((y // scale) * text_width + x // scale) * 4
            destination = ((top + y) * width + logo_width + gap + x) * 4
            pixels[destination:destination + 4] = text[source:source + 4]
    write_png(STATIC / f'pythonlab-{name}.png', width, height, pixels)
    write_svg(STATIC / f'pythonlab-{name}.svg', width, height,
              logo_svg + f'<g transform="translate({logo_width + gap} {top}) scale({scale})">'
              + text_svg + '</g>')


if __name__ == '__main__':
    main()
