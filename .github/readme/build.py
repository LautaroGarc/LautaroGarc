#!/usr/bin/env python3
"""Genera los SVG del README con el mismo sistema visual que el portfolio.

Uso:  python3 .github/readme/build.py   (desde la raíz del repo, con node_modules instalado)

Las fuentes se subsetean e incrustan en cada SVG, así GitHub las muestra igual que la web.
"""
import base64
import io
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
NM = ROOT / "node_modules"
ARCHIVO = NM / "@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2"
MONO = {
    400: NM / "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
    700: NM / "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2",
}

HAZARD, HAZARD_INK = "#FFC20E", "#4A3B00"
INK, INK2, RULE = "#141414", "#222222", "#3A3A3A"
STEEL, LABEL = "#8A9097", "#F4F4F0"
EASE = "cubic-bezier(0.16,1,0.3,1)"

# ---------------------------------------------------------------- contenido
NAME = "Lautaro García"
TITLE = "Software Developer"
SERIAL = "LG-2026"
PROMISE = ["Resuelvo problemas", "con un proceso,", "no con suerte."]
SUMMARY = (
    "No me defino por frontend o backend. Entiendo el problema, defino qué "
    "significa terminado, construyo y verifico. Por eso la calidad es predecible."
)
METHOD = [
    ("Entender", "Qué problema hay de verdad, para quién, y qué pasa si no se resuelve.", "El problema escrito en una frase"),
    ("Definir", "Qué significa “terminado”, con criterios medibles, antes de escribir código.", "Criterios de aceptación"),
    ("Construir", "La herramienta la elige el problema, no la costumbre.", "Una solución funcionando"),
    ("Verificar", "El resultado se compara contra los criterios. Si no cumple, no sale.", "Conforme o no conforme"),
]
PROJECTS = [
    {
        "slug": "nexandria",
        "model": "Nexandría",
        "kind": "Gestión de bibliotecas en red",
        "problem": "Cada biblioteca administra solo lo suyo, y el lector queda limitado a lo que hay en su sede.",
        "approach": "Una red de bibliotecas: el lector pide el libro que quiere y lo retira en cualquier sede. Diseñado para el problema real, no como un catálogo genérico.",
        "dest": "nexandria.com.ar",
    },
    {
        "slug": "gonext",
        "model": "GoNext",
        "kind": "Framework web backend para Go",
        "problem": "En Go falta un framework con la estructura y las convenciones que NestJS le da a Node.",
        "approach": "Toma la arquitectura de NestJS como referencia de calidad y la lleva a Go, con su rendimiento, su tipado y su simplicidad de despliegue.",
        "dest": "github.com/LautaroGarc/GoNext",
    },
]

# ---------------------------------------------------------------- fuentes
ALL_TEXT = " ".join(
    [NAME, TITLE, SERIAL, SUMMARY, *PROMISE, "N.º", "PLACA DE DATOS MODELO ENTRADA SALIDA PROCESO DE CONTROL VEREDICTO CONFORME OK",
     "Cualquier problema Una solución genuina, verificada", "MISMO PROCESO. SIEMPRE. TIPO PROBLEMA SOLUCIÓN DESTINO",
     "No importa si el problema pide una API, una app o una planilla. Lo que cambia es la herramienta; el método no.",
     "¿TENÉS UN PROBLEMA PARA RESOLVER? LINKEDIN Escribime y empezamos por entenderlo. 0123456789 ↗ ·"]
    + [t for m in METHOD for t in m] + [str(v) for p in PROJECTS for v in p.values()]
)
ALL_TEXT += ALL_TEXT.upper() + ALL_TEXT.lower()


def subset_b64(path: Path, keep_vars=True) -> str:
    font = TTFont(path)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk"]
    if not keep_vars:
        opts.drop_tables += ["fvar", "gvar"]
    sub = subset.Subsetter(opts)
    sub.populate(text=ALL_TEXT)
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = "woff2"
    font.save(buf)
    return base64.b64encode(buf.getvalue()).decode()


print("subseteando fuentes…")
ARCHIVO_B64 = subset_b64(ARCHIVO)
MONO_B64 = {w: subset_b64(p) for w, p in MONO.items()}

FONT_CSS = f"""
@font-face{{font-family:'A';src:url(data:font/woff2;base64,{ARCHIVO_B64}) format('woff2');font-weight:100 900;font-stretch:62% 125%}}
@font-face{{font-family:'M';src:url(data:font/woff2;base64,{MONO_B64[400]}) format('woff2');font-weight:400}}
@font-face{{font-family:'M';src:url(data:font/woff2;base64,{MONO_B64[700]}) format('woff2');font-weight:700}}
text{{font-family:'A',Arial,sans-serif}}
.mk{{font-weight:900;font-stretch:125%;letter-spacing:-0.02em}}
.en{{font-weight:700;font-stretch:112%;font-size:11px;letter-spacing:0.14em}}
.mo{{font-family:'M',monospace}}
"""

# Medición aproximada con la instancia estática correspondiente (para cortar líneas y centrar).
_cache = {}


def _instance(wdth, wght):
    key = (wdth, wght)
    if key not in _cache:
        f = TTFont(ARCHIVO)
        _cache[key] = instancer.instantiateVariableFont(f, {"wdth": wdth, "wght": wght})
    return _cache[key]


def measure(text, size, wdth=100, wght=400, tracking=0.0):
    f = _instance(wdth, wght)
    cmap, hmtx, upm = f.getBestCmap(), f["hmtx"], f["head"].unitsPerEm
    w = sum(hmtx[cmap.get(ord(c), cmap[ord("n")])][0] for c in text)
    return w / upm * size + tracking * size * len(text)


def wrap(text, size, width, wdth=100, wght=400):
    lines, cur = [], ""
    for word in text.split():
        trial = f"{cur} {word}".strip()
        if measure(trial, size, wdth, wght) <= width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def svg(w, h, body, extra_css="", title=""):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{esc(title)}">'
        f"<title>{esc(title)}</title><style>{FONT_CSS}{extra_css}</style>{body}</svg>"
    )


def rivets(x, y, w, h, top=True):
    pts = [(x + 11, y + h - 11), (x + w - 11, y + h - 11)]
    if top:
        pts += [(x + 11, y + 11), (x + w - 11, y + 11)]
    return "".join(
        f'<circle cx="{cx}" cy="{cy}" r="4" fill="{INK}" stroke="{STEEL}" stroke-width="1"/>'
        f'<circle cx="{cx}" cy="{cy}" r="1.6" fill="#3F4347"/>'
        for cx, cy in pts
    )


def plate_frame(x, y, w, h):
    return (
        f'<rect x="{x}" y="{y + 10}" width="{w}" height="{h}" rx="8" fill="{INK}" opacity="0.25" filter="url(#blur)"/>'
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="{INK}"/>'
        f'<rect x="{x + 7.5}" y="{y + 7.5}" width="{w - 15}" height="{h - 15}" rx="3" fill="none" stroke="{RULE}"/>'
    )


BLUR = '<defs><filter id="blur" x="-10%" y="-10%" width="120%" height="140%"><feGaussianBlur stdDeviation="10"/></filter></defs>'


# ---------------------------------------------------------------- header.svg
def build_header():
    W, H = 1000, 590
    b = [BLUR, f'<rect width="{W}" height="{H}" rx="10" fill="{HAZARD}"/>']
    name = NAME.upper()
    size = 80
    while measure(name, size, 125, 900, -0.02) > W - 80:
        size -= 1
    b.append(f'<text x="40" y="{40 + size * 0.86:.0f}" class="mk" font-size="{size}" fill="{INK}">{esc(name)}</text>')
    ry = 40 + size + 16
    b.append(f'<rect x="40" y="{ry}" width="{W - 80}" height="2.5" fill="{INK}"/>')
    b.append(f'<text x="40" y="{ry + 36}" font-size="24" font-weight="800" font-stretch="118%" fill="{INK}">{esc(TITLE.upper())}</text>')

    top = ry + 80
    # promesa + resumen (izquierda)
    for i, line in enumerate(PROMISE):
        b.append(f'<text x="40" y="{top + 30 + i * 36}" font-size="32" font-weight="800" font-stretch="110%" fill="{INK}">{esc(line)}</text>')
    sy = top + 30 + len(PROMISE) * 36 + 22
    for i, line in enumerate(wrap(SUMMARY, 16, 400)):
        b.append(f'<text x="40" y="{sy + i * 26}" font-size="16" fill="{HAZARD_INK}">{esc(line)}</text>')

    # placa de datos (derecha)
    px, py, pw = 520, top - 10, 440
    rows = [("MODELO", TITLE), ("ENTRADA", "Cualquier problema"), ("SALIDA", "Una solución genuina, verificada")]
    frame_at = len(b)
    ix = px + 28
    b.append(f'<text x="{ix}" y="{py + 34}" class="en" fill="{HAZARD}">PLACA DE DATOS</text>')
    b.append(f'<text x="{px + pw - 28}" y="{py + 34}" class="mo" font-size="11" fill="{STEEL}" text-anchor="end">N.º {SERIAL}</text>')
    y = py + 50
    for label, value in rows:
        b.append(f'<rect x="{px + 8}" y="{y}" width="{pw - 16}" height="1" fill="{RULE}"/>')
        b.append(f'<text x="{ix}" y="{y + 25}" class="en" fill="{STEEL}">{label}</text>')
        b.append(f'<text x="{ix + 128}" y="{y + 25}" font-size="15" font-weight="600" fill="{LABEL}">{esc(value)}</text>')
        y += 40
    b.append(f'<rect x="{px + 8}" y="{y}" width="{pw - 16}" height="1" fill="{RULE}"/>')
    b.append(f'<text x="{ix}" y="{y + 26}" class="en" fill="{STEEL}">PROCESO DE CONTROL</text>')
    y += 36
    for i, (verb, _, _) in enumerate(METHOD):
        rw = pw - 56
        b.append(f'<rect class="sw s{i}" x="{ix - 4}" y="{y + 2}" width="{rw + 8}" height="32" fill="{HAZARD}" opacity="0.16"/>')
        b.append(f'<text x="{ix}" y="{y + 23}" class="mo" font-size="11" fill="{STEEL}">0{i + 1}</text>')
        b.append(f'<text x="{ix + 36}" y="{y + 24}" font-size="16" font-weight="700" font-stretch="112%" fill="{LABEL}" letter-spacing="0.03em">{verb}</text>')
        b.append(
            f'<g class="ok o{i}"><rect x="{ix + rw - 26}" y="{y + 8}" width="26" height="19" rx="2" fill="{HAZARD}"/>'
            f'<text x="{ix + rw - 13}" y="{y + 21.5}" class="mo" font-size="10.5" font-weight="700" fill="{INK}" text-anchor="middle">OK</text></g>'
        )
        if i < len(METHOD) - 1:
            b.append(f'<line x1="{ix}" x2="{ix + rw}" y1="{y + 36}" y2="{y + 36}" stroke="{RULE}" stroke-dasharray="3 3"/>')
        y += 36
    y += 10
    b.append(f'<rect x="{px + 8}" y="{y}" width="{pw - 16}" height="1" fill="{RULE}"/>')
    b.append(f'<text x="{ix}" y="{y + 33}" class="en" fill="{STEEL}">VEREDICTO</text>')
    vw = measure("CONFORME", 18, 125, 900, -0.02) + 28
    b.append(
        f'<g class="ok vd"><rect x="{ix + 128}" y="{y + 12}" width="{vw:.0f}" height="34" rx="3" fill="{HAZARD}"/>'
        f'<text x="{ix + 128 + vw / 2:.0f}" y="{y + 35.5}" class="mk" font-size="18" fill="{INK}" text-anchor="middle">CONFORME</text></g>'
    )
    ph = y + 64 - py
    b.insert(frame_at, plate_frame(px, py, pw, ph) + rivets(px, py, pw, ph))
    H = max(H, py + ph + 40)

    css = f"""
.sw{{transform-box:fill-box;transform-origin:left;transform:scaleX(0);animation:sweep .8s {EASE} both}}
.ok{{transform-box:fill-box;transform-origin:center;animation:stamp .5s {EASE} both}}
@keyframes sweep{{0%{{transform:scaleX(0);opacity:.16}}70%{{transform:scaleX(1);opacity:.16}}100%{{transform:scaleX(1);opacity:0}}}}
@keyframes stamp{{from{{opacity:0;transform:scale(1.6)}}to{{opacity:1;transform:scale(1)}}}}
{''.join(f'.s{i}{{animation-delay:{0.5 + i * 0.6:.2f}s}}.o{i}{{animation-delay:{1.0 + i * 0.6:.2f}s}}' for i in range(len(METHOD)))}
.vd{{animation-delay:{1.0 + len(METHOD) * 0.6:.2f}s}}
@media (prefers-reduced-motion:reduce){{.sw{{display:none}}.ok{{animation:none}}}}
"""
    body = "".join(b).replace(f'height="{590}" rx="10"', f'height="{H}" rx="10"')
    return svg(W, H, body, css, f"{NAME} — {TITLE}. {' '.join(PROMISE)}")


# ---------------------------------------------------------------- metodo.svg
def build_method():
    W = 1000
    b = []
    b.append(f'<text x="40" y="84" class="mk" font-size="46" fill="{HAZARD}">MISMO PROCESO. SIEMPRE.</text>')
    sub = "No importa si el problema pide una API, una app o una planilla. Lo que cambia es la herramienta; el método no."
    for i, line in enumerate(wrap(sub, 16, W - 80)):
        b.append(f'<text x="40" y="{122 + i * 26}" font-size="16" fill="{STEEL}">{esc(line)}</text>')
    top = 170
    colw, gap = (W - 80 - 3) / 4, 1
    cols_h = []
    cells = []
    for i, (verb, body, out) in enumerate(METHOD):
        x = 40 + i * (colw + gap)
        tx = x + 22
        c = [f'<rect x="{tx}" y="{top + 24}" width="30" height="30" rx="3" fill="{HAZARD}"/>',
             f'<text x="{tx + 15}" y="{top + 44}" class="mo" font-size="14" font-weight="700" fill="{INK}" text-anchor="middle">{i + 1}</text>',
             f'<rect x="{tx + 42}" y="{top + 38}" width="{colw - 86}" height="2" fill="{RULE}"/>',
             f'<text x="{tx}" y="{top + 100}" class="mk" font-size="25" fill="{LABEL}">{verb.upper()}</text>']
        yy = top + 132
        for line in wrap(body, 14, colw - 44):
            c.append(f'<text x="{tx}" y="{yy}" font-size="14" fill="{LABEL}" fill-opacity="0.8">{esc(line)}</text>')
            yy += 22
        cells.append((c, tx, yy))
    base = max(yy for _, _, yy in cells) + 18
    for i, (c, tx, _) in enumerate(cells):
        x = 40 + i * (colw + gap)
        b.append(f'<rect x="{x}" y="{top}" width="{colw}" height="__H__" fill="{INK}"/>')
        b.extend(c)
        b.append(f'<text x="{tx}" y="{base}" class="en" fill="{STEEL}">SALIDA</text>')
        oy = base + 22
        for line in wrap(METHOD[i][2], 14, colw - 44, wght=600):
            b.append(f'<text x="{tx}" y="{oy}" font-size="14" font-weight="600" fill="{HAZARD}">{esc(line)}</text>')
            oy += 20
        cols_h.append(oy)
    ch = max(cols_h) + 14 - top
    H = top + ch + 40
    body = "".join(b).replace("__H__", f"{ch:.0f}")
    frame = (f'<rect width="{W}" height="{H}" rx="10" fill="{INK}"/>'
             f'<rect x="39" y="{top - 1}" width="{W - 78}" height="{ch + 2:.0f}" rx="6" fill="{RULE}"/>')
    return svg(W, int(H), frame + body, title="Método: Entender, Definir, Construir, Verificar")


# ---------------------------------------------------------------- proyectos
def project_layout(p, W):
    inner = W - 64
    blocks = []
    y = 122
    for label, key in (("TIPO", "kind"), ("PROBLEMA", "problem"), ("SOLUCIÓN", "approach")):
        lines = wrap(p[key], 15, inner)
        blocks.append((label, lines, y))
        y += 34 + len(lines) * 23 + 14
    return blocks, y


def build_project(p, i, H, W=490):
    blocks, y = project_layout(p, W)
    b = [BLUR, plate_frame(8, 6, W - 16, H - 28), rivets(8, 6, W - 16, H - 28, top=False)]
    b.append(f'<rect x="16" y="14" width="{W - 32}" height="92" rx="3" fill="{HAZARD}"/>')
    size = 42
    while measure(p["model"].upper(), size, 125, 900) > W - 130:
        size -= 1
    b.append(f'<text x="32" y="{14 + 92 - 24}" class="mk" font-size="{size}" fill="{INK}">{esc(p["model"].upper())}</text>')
    b.append(f'<text x="{W - 32}" y="{14 + 92 - 26}" class="mo" font-size="11" fill="{INK}" text-anchor="end">N.º 0{i + 1}</text>')
    for label, lines, by in blocks:
        b.append(f'<rect x="16" y="{by}" width="{W - 32}" height="1" fill="{RULE}"/>')
        b.append(f'<text x="32" y="{by + 26}" class="en" fill="{STEEL}">{label}</text>')
        for j, line in enumerate(lines):
            b.append(f'<text x="32" y="{by + 50 + j * 23}" font-size="15" fill="{LABEL}" fill-opacity="0.9">{esc(line)}</text>')
    dy = H - 28 - 6 - 96
    b.append(f'<rect x="16" y="{dy}" width="{W - 32}" height="1" fill="{RULE}"/>')
    b.append(f'<text x="32" y="{dy + 26}" class="en" fill="{STEEL}">DESTINO</text>')
    b.append(f'<rect x="32" y="{dy + 38}" width="{W - 64}" height="44" rx="3" fill="{INK2}"/>')
    b.append(f'<text x="48" y="{dy + 64}" class="mo" font-size="13" font-weight="700" fill="{LABEL}">{esc(p["dest"])}</text>')
    ax, ay = W - 56, dy + 60
    b.append(f'<path d="M{ax - 6} {ay + 6} L{ax + 6} {ay - 6} M{ax - 4} {ay - 6} H{ax + 6} V{ay + 4}" stroke="{LABEL}" stroke-width="2" fill="none"/>')
    return svg(W, H, "".join(b), title=f'{p["model"]}: {p["kind"]}. {p["problem"]} {p["approach"]}')


# ---------------------------------------------------------------- contacto + botón
def build_contact():
    W, H = 1000, 250
    b = [f'<rect width="{W}" height="{H}" rx="10" fill="{HAZARD}"/>']
    b.append(f'<text x="40" y="96" class="mk" font-size="52" fill="{INK}">¿TENÉS UN PROBLEMA</text>')
    b.append(f'<text x="40" y="150" class="mk" font-size="52" fill="{INK}">PARA RESOLVER?</text>')
    b.append(f'<text x="40" y="204" font-size="18" fill="{HAZARD_INK}">Escribime y empezamos por entenderlo.</text>')
    return svg(W, H, "".join(b), title="¿Tenés un problema para resolver? Escribime y empezamos por entenderlo.")


def build_button(label, icon_path, w=210):
    H = 56
    b = [f'<rect width="{w}" height="{H}" rx="5" fill="{HAZARD}"/>',
         f'<g transform="translate(24 18)" fill="{INK}"><path d="{icon_path}" transform="scale(0.8333)"/></g>',
         f'<text x="58" y="35" font-size="16" font-weight="800" font-stretch="115%" letter-spacing="0.05em" fill="{INK}">{label}</text>']
    return svg(w, H, "".join(b), title=label)


LINKEDIN_PATH = ("M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.05 "
                 "3.79-2.05 4.05 0 4.8 2.66 4.8 6.13v5.42h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4v-11Z")

if __name__ == "__main__":
    files = {"header.svg": build_header(), "metodo.svg": build_method(), "contacto.svg": build_contact(),
             "btn-linkedin.svg": build_button("LINKEDIN", LINKEDIN_PATH, 186)}
    H = max(project_layout(p, 490)[1] for p in PROJECTS) + 96 + 40
    for i, p in enumerate(PROJECTS):
        files[f"proyecto-{p['slug']}.svg"] = build_project(p, i, H)
    for name, content in files.items():
        (OUT / name).write_text(content, encoding="utf-8")
        print(f"{name}: {len(content) // 1024} KB")
