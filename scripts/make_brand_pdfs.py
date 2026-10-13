#!/usr/bin/env python3
"""Build one standard 7-section brand guideline PDF per catalogue brand.
Source of truth: static/products/<Brand>/metadata.json (schema 2).
Missing data is printed as 'TBC'.
"""
import argparse
import datetime
import hashlib
import html
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import quote

SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_ROOT = (SCRIPT_DIR / '..' / 'static').resolve()
DEFAULT_OUT = (SCRIPT_DIR / '..' / 'static' / 'brand-guidelines' / 'pdf').resolve()
SITE = 'https://assets.suamisihat.myds.me'
VERSION = '1.0'
DATE = datetime.datetime.now().strftime('%d %B %Y')

esc = lambda s: html.escape(str(s), quote=True)


# ---------------------------------------------------------------- helpers
def hex_rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def lum(h):
    def f(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = hex_rgb(h)
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def ratio(a, b):
    la, lb = lum(a), lum(b)
    if la < lb:
        la, lb = lb, la
    return (la + 0.05) / (lb + 0.05)


def grade(r):
    if r >= 7:
        return 'AAA'
    if r >= 4.5:
        return 'AA'
    if r >= 3:
        return 'Large text only'
    return 'Fails'


def ink(bg):  # readable text colour on a swatch
    return '#111111' if ratio('#111111', bg) >= ratio('#FFFFFF', bg) else '#FFFFFF'


def tbc(msg='TBC'):
    return f'<span class="tbc">{esc(msg)}</span>'


def svg_is_light(path):
    try:
        s = open(path, encoding='utf-8', errors='ignore').read()
    except Exception:
        return False
    cols = re.findall(r'(?:fill|stroke)\s*[:=]\s*"?(#[0-9a-fA-F]{3,6})\b', s)
    cols = [c for c in cols if len(c.lstrip('#')) in (3, 6) and c.lower() not in ('#none',)]
    if not cols:
        return False
    return sum(lum(c) for c in cols) / len(cols) > 0.6


def panel_dark(logo, hero_from, root_path):
    t = (logo.get('label', '') + ' ' + logo.get('use', '') + ' ' + logo.get('file', '')).lower()
    if re.search(r'dark|black|white|on-dark|reverse', t) and not re.search(r'light backgrounds?|on light|on white', t):
        return True
    p = os.path.join(root_path, logo.get('file', '').lstrip('/'))
    return p.endswith('.svg') and svg_is_light(p)


def fpath(root_path, p):
    clean = p.lstrip('/')
    full = Path(root_path) / clean
    return full.resolve().as_uri()


def url(p):
    return SITE + quote(p)


# ---------------------------------------------------------------- data
BRANDS = [
    ('Androlab', 'androlab'),
    ('DrMitRing', 'drmitring'),
    ('HusbandClinic', 'husbandclinic'),
    ('IsteriSihat', 'isterisihat'),
    ('MENSS', 'menss'),
    ('Mensculine', 'mensculine'),
    ('nuCaffe', 'nucaffe'),
    ('Pertabi', 'pertabi'),
    ('Rejal', 'rejal'),
    ('SsClinic', 'ssclinic'),
]


def load(root_path, folder):
    meta_path = os.path.join(root_path, 'products', folder, 'metadata.json')
    return json.load(open(meta_path, encoding='utf-8'))


def source_hash(root_path, folder):
    """SHA-256 of metadata.json with LF line endings (matches scripts/lint-content.mjs)."""
    with open(os.path.join(root_path, 'products', folder, 'metadata.json'), 'rb') as f:
        return hashlib.sha256(f.read().replace(b'\r\n', b'\n')).hexdigest()


def update_manifest(out_path, entries):
    """Record which metadata.json each PDF was rendered from, so lint can flag stale PDFs."""
    path = os.path.join(out_path, 'manifest.json')
    try:
        manifest = json.load(open(path, encoding='utf-8'))
    except (OSError, ValueError):
        manifest = {}
    manifest.update(entries)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(dict(sorted(manifest.items())), f, indent=2)
        f.write('\n')


def sifusex():
    """No metadata.json exists for Sifu Sex: build a shell from the catalogue card."""
    return {
        'slug': 'sifusex',
        'name': 'Sifu Sex',
        'status': 'Partner',
        'tagline': 'Men’s sexual health education',
        'entity': 'Partner network',
        'category': 'Partner brand (education and referrals)',
        'hero': {'from': '#1C1C1C', 'to': '#2B2B2B', 'accent': '#9A9A9A'},
        'definition': {
            'summary': 'Sifu Sex is a partner brand listed in the SuamiSihat catalogue as a resource for men’s sexual health education and clinical referrals. This summary is taken from the catalogue card; the owner’s approved wording is TBC.',
            'facts': [],
            'range': []
        },
        'images': [],
        'positioning': {},
        'colorScheme': {},
        'pattern': {},
        'guideline': {
            'logos': [{'label': 'Sifu Sex logo', 'file': '/products/Partner-Brands/logos/logo_sifusex.svg', 'use': 'As supplied; usage rules TBC'}]
        },
        'downloads': [
            {'label': 'Sifu Sex logo', 'file': '/products/Partner-Brands/logos/logo_sifusex.svg', 'format': 'SVG'}
        ],
        '_shell': True,
    }


# ---------------------------------------------------------------- html
CSS = """
@page { size: A4; margin: 18mm 18mm 22mm 18mm; }
@page :first { margin: 0; }
*{box-sizing:border-box}
html{font-family:'Inter','Helvetica Neue',Arial,sans-serif;color:#1b1b1f;font-size:9.2pt;line-height:1.45}
tr{break-inside:avoid}
body{margin:0}
h1,h2,h3,.disp{font-family:'Poppins','Inter',sans-serif;margin:0}
.page{position:relative}
.cover{width:210mm;height:297mm;position:relative;overflow:hidden}
.brk{break-before:page}
h2,h3{break-after:avoid}
.cover{color:#fff}
.cover .hero{position:absolute;inset:0}
.cover .inner{position:absolute;inset:0;padding:22mm 20mm 54mm;display:flex;flex-direction:column}
.cover .kicker{font-family:'Poppins';letter-spacing:.22em;font-size:8pt;text-transform:uppercase;opacity:.85}
.cover .logo{margin-top:32mm;height:30mm;display:flex;align-items:center}
.cover .logo img{height:26mm;width:auto;max-width:120mm;object-fit:contain}
.cover .chip{background:#fff;border-radius:6mm;padding:5mm 7mm;display:inline-flex}
.cover h1{font-size:32pt;font-weight:700;line-height:1.1;margin-top:14mm}
.cover .tag{font-size:13pt;margin-top:4mm;opacity:.92;max-width:140mm}
.cover .meta{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font-size:8.6pt}
.cover .meta div{max-width:105mm}
.cover .band{position:absolute;left:0;right:0;bottom:0;height:46mm;background-size:cover;opacity:1}
.cover .band-fade{position:absolute;left:0;right:0;bottom:46mm;height:12mm}
.sec{margin-bottom:7mm}
.sec h2{font-size:15pt;font-weight:600;display:flex;align-items:baseline;gap:3mm;margin-bottom:3mm;color:var(--ink)}
.sec h2 .n{display:inline-flex;width:8mm;height:8mm;border-radius:50%;background:var(--accent);color:var(--accent-ink);align-items:center;justify-content:center;font-size:10pt;flex:none;transform:translateY(-1px)}
h3{font-size:10pt;font-weight:600;margin:4mm 0 1.5mm;color:var(--ink)}
p{margin:0 0 2.5mm}
.lead{font-size:11pt;line-height:1.5}
table{border-collapse:collapse;width:100%}
th,td{text-align:left;vertical-align:top;padding:1.8mm 2.4mm;border-bottom:.3mm solid #d9d9de}
th{font-size:8pt;text-transform:uppercase;letter-spacing:.06em;color:#55555c;font-weight:600;border-bottom:.5mm solid #1b1b1f}
td.k{width:34%;font-weight:600}
.tbc{display:inline-block;padding:0 1.6mm;border:.3mm dashed #b3261e;color:#b3261e;border-radius:1mm;font-size:8pt;font-weight:600;letter-spacing:.04em}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:5mm}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.card{border:.3mm solid #d9d9de;border-radius:2mm;padding:3.2mm 3.6mm;break-inside:avoid}
.card b{font-family:'Poppins';font-weight:600;display:block;margin-bottom:1mm}
ul{margin:0;padding-left:4.5mm} li{margin-bottom:1.2mm}
.do li::marker{color:#1a7f37;content:'\\2713  '} .dont li::marker{color:#b3261e;content:'\\2717  '}
.note{background:#f4f4f6;border-left:1.2mm solid var(--accent);padding:3mm 4mm;border-radius:0 1.5mm 1.5mm 0;break-inside:avoid;margin:3mm 0}
.note b{display:block;margin-bottom:1mm;font-family:'Poppins'}
.warn{background:#fff6e5;border-left-color:#c77700}
.sw{display:flex;border-radius:2mm;overflow:hidden;height:11mm;margin:2mm 0 1mm;border:.3mm solid #b9b9c0}
.sw div{display:flex;align-items:center;justify-content:center;font-size:8pt;font-weight:600}
.chipc{display:flex;gap:3mm;flex-wrap:wrap}
.colour{width:calc(33.3% - 2.1mm);border:.3mm solid #d9d9de;border-radius:2mm;overflow:hidden;break-inside:avoid}
.colour .c{height:14mm}
.colour .t{padding:2mm 2.6mm;font-size:8.2pt;line-height:1.35}
.colour .t b{font-size:8.8pt;display:block}
.pair{display:flex;align-items:center;gap:3mm;border:.3mm solid #d9d9de;border-radius:2mm;padding:2mm;break-inside:avoid;font-size:8.2pt}
.pair .s{width:20mm;height:10mm;border-radius:1.4mm;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11pt;flex:none}
.gal{display:grid;grid-template-columns:repeat(2,1fr);gap:4mm}
.gal figure{margin:0;break-inside:avoid}
.gal img{width:100%;height:46mm;object-fit:contain;background:#f1f1f3;border-radius:2mm}
.gal figcaption{font-size:8pt;color:#55555c;margin-top:1mm}
.logobox{border:.3mm solid #d9d9de;border-radius:2mm;overflow:hidden;break-inside:avoid}
.logobox .p{height:26mm;display:flex;align-items:center;justify-content:center;padding:5mm}
.logobox .p img{max-width:100%;max-height:100%;object-fit:contain}
.logobox .t{padding:2mm 3mm;font-size:8.2pt}
.pattern{height:36mm;border-radius:2mm;background-size:auto 100%;background-repeat:repeat;border:.3mm solid #d9d9de}
a{color:var(--link);text-decoration:none;word-break:break-all}
.toc{display:grid;grid-template-columns:1fr 1fr;gap:1.4mm 8mm;margin-top:3mm;font-size:9pt}
.toc span{display:flex;gap:2mm}.toc i{font-style:normal;font-weight:700;color:var(--accent-dark)}
"""


def page(inner, brand, n, total_label):
    return f'<section class="body" style="{"break-before:page" if n==2 else ""}">{inner}</section>'


def sec(n, title, body):
    return f'<div class="sec" style="{"break-before:page" if n in (4, 6) else ""}"><h2><span class="n">{n}</span>{esc(title)}</h2>{body}</div>'


def kv_table(rows):
    if not rows:
        return ''
    return '<table>' + ''.join(f'<tr><td class="k">{esc(k)}</td><td>{v}</td></tr>' for k, v in rows) + '</table>'


def build_html(b, root_path):
    shell = b.get('_shell', False)
    hero = b.get('hero', {'from': '#1C1C1C', 'to': '#2B2B2B', 'accent': '#888888'})
    accent = hero['accent']
    acc_ink = ink(accent)
    link = accent
    if ratio(accent, '#FFFFFF') < 4.5:
        cands = [c['hex'] for k in ('foundation', 'structure', 'accent') for c in b.get('colorScheme', {}).get(k, {}).get('colors', []) if ratio(c['hex'], '#FFFFFF') >= 4.5]
        link = cands[0] if cands else '#1b1b1f'
    ink_c = '#1b1b1f'
    vars_ = f'--accent:{accent};--accent-ink:{acc_ink};--accent-dark:{link};--link:{link};--ink:{ink_c}'
    d = b.get('definition', {})
    pos = b.get('positioning', {})
    cs = b.get('colorScheme', {})
    pat = b.get('pattern', {})
    g = b.get('guideline', {})
    dl = b.get('downloads', [])
    logos = g.get('logos', [])
    pages = []

    # Cover
    cover_logo = ''
    if logos:
        pick = next((l for l in logos if re.search(r'dark|white|on-dark', (l['label'] + l['file']).lower())), logos[0])
        isdark = panel_dark(pick, hero['from'], root_path)
        inner = f'<img src="{fpath(root_path, pick["file"])}" alt="{esc(b["name"])} logo">'
        cover_logo = f'<div class="logo">{inner if isdark else "<span class=chip>" + inner + "</span>"}</div>'
    band = f'<div class="band" style="background-image:url(\'{fpath(root_path, pat["file"])}\')"></div>' if pat.get('file') else ''
    pages.append(f'''<section class="page cover" style="{vars_}">
      <div class="hero" style="background:linear-gradient(145deg,{hero["from"]},{hero["to"]})"></div>
      {band}
      <div class="inner">
        <div class="kicker">{esc(b["name"])} · SuamiSihat product brand guideline</div>
        {cover_logo}
        <h1>Brand guideline</h1>
        <div class="tag">{esc(b.get("tagline",""))}</div>
        <div class="meta"><div>{esc(b.get("category","")) or tbc()}<br>{esc(b.get("entity","")) or tbc()}</div>
        <div style="text-align:right">Version {VERSION} · {DATE}<br>Prepared from SuamiSihat Design System v3.6.1</div></div>
      </div></section>''')

    # Page 2: contents + definition
    toc_items = ['Product definition', 'Product images', 'Positioning and voice', 'Colour', 'Pattern and graphic devices', 'Brand guideline', 'Downloads']
    toc = '<div class="toc">' + ''.join(f'<span><i>{i+1}</i>{esc(t)}</span>' for i, t in enumerate(toc_items)) + '</div>'
    facts = [(f['label'], esc(f['value'])) for f in d.get('facts', [])]
    labels = ' '.join(f['label'].lower() for f in d.get('facts', []))
    if not re.search(r'trademark|registration', labels):
        facts.append(('Trademark / registration', tbc()))
    if shell:
        facts += [('Audience', tbc()), ('Operating entity', tbc()), ('Owner contact', tbc())]
    rng = d.get('range', [])
    if rng:
        rtab = '<table><tr><th>Product</th><th>Type</th><th>Notes</th></tr>' + ''.join(f'<tr><td><b>{esc(r["name"])}</b></td><td>{esc(r.get("type",""))}</td><td>{esc(r.get("desc",""))}</td></tr>' for r in rng) + '</table>'
    else:
        rtab = f'<p>{tbc("TBC")} Product range not yet supplied.</p>'
    claims = d.get('claimsReview', '')
    claims = re.sub(r'\(tadalafil\)', '(a prescription medicine)', claims)
    claims_html = f'<div class="note warn"><b>Claims review</b>{esc(claims)}</div>' if claims else f'<div class="note warn"><b>Claims review</b> {tbc()} No claims guidance has been supplied. Check every statement with regulatory before publishing.</div>'
    s1 = sec(1, 'Product definition', f'<p class="lead">{esc(d.get("summary",""))}</p>{kv_table(facts)}<h3>Range</h3>{rtab}{claims_html}')
    pages.append(page(f'<div style="{vars_}"><div class="disp" style="font-size:8pt;letter-spacing:.2em;text-transform:uppercase;color:#6b6b73;margin-bottom:2mm">Contents</div>{toc}<div style="height:7mm"></div>{s1}</div>', b, 2, 'Page 2'))

    # Page 3: images + positioning
    imgs = b.get('images', [])
    if imgs:
        figs = ''.join(f'<figure><img src="{fpath(root_path, i["src"])}" alt="{esc(i.get("alt",""))}"><figcaption>{esc(i.get("caption",""))}{" · " + "Photography pending" if i.get("placeholder") else ""}</figcaption></figure>' for i in imgs[:4])
        s2 = f'<div class="gal">{figs}</div>' + (f'<p style="margin-top:2mm">{tbc("TBC")} Product photography is pending; the image above is a brand card.</p>' if any(i.get('placeholder') for i in imgs) else '')
    else:
        s2 = f'<p>{tbc("TBC")} No product images supplied.</p>'
    if pos:
        pill = ''.join(f'<div class="card"><b>{esc(p["title"])}</b>{esc(p["text"])}</div>' for p in pos.get('pillars', []))
        voice = ''.join(f'<li>{esc(v)}</li>' for v in pos.get('voice', []))
        avoid = ''.join(f'<li>{esc(v)}</li>' for v in pos.get('avoid', []))
        s3 = f'<p class="lead">{esc(pos.get("statement",""))}</p><div class="grid3">{pill}</div><div class="grid2" style="margin-top:3mm"><div><h3>Voice</h3><ul>{voice}</ul></div><div><h3>Avoid</h3><ul class="dont">{avoid}</ul></div></div>'
    else:
        s3 = f'<p>{tbc("TBC")} Positioning statement, three pillars, voice traits and things to avoid are not yet defined. Agree these with the brand owner before any campaign work.</p>'
    pages.append(page(f'<div style="{vars_}">' + sec(2, 'Product images', s2) + sec(3, 'Positioning and voice', s3) + '</div>', b, 3, 'Page 3'))

    # Page 4: colour + pattern
    if cs:
        blocks = ''
        bar = ''
        for k, nm in (('foundation', 'Foundation'), ('structure', 'Structure'), ('accent', 'Accent')):
            part = cs.get(k)
            if not part:
                continue
            c0 = part['colors'][0]['hex']
            bar += f'<div style="flex:{part["share"]};background:{c0};color:{ink(c0)}">{part["share"]}% {nm}</div>'
            blocks += f'<h3>{nm} · {part["share"]}% · {esc(part["role"])}</h3><div class="chipc">' + ''.join(
                f'<div class="colour"><div class="c" style="background:{c["hex"]}"></div><div class="t"><b>{esc(c["name"])}</b>{c["hex"].upper()} · RGB {", ".join(map(str, hex_rgb(c["hex"])))}<br>{esc(c.get("use",""))}</div></div>' for c in part['colors']) + '</div>'
        pairs = ''.join(f'<div class="pair"><div class="s" style="background:{p["background"]};color:{p["text"]}">Aa</div><div><b>{ratio(p["text"],p["background"]):.1f}:1 · {grade(ratio(p["text"],p["background"]))}</b><br>{esc(p["use"])}<br><span style="color:#6b6b73">{p["text"].upper()} on {p["background"].upper()}</span></div></div>' for p in cs.get('pairings', []))
        note = f'<div class="note"><b>Accessibility note</b>{esc(cs.get("note",""))}</div>' if cs.get('note') else ''
        hasprint = 'pantone' in json.dumps(cs).lower()
        printref = '' if hasprint else f'<p>Print references (Pantone, CMYK): {tbc()} confirm against a physical swatch and printer proof before production.</p>'
        s4 = f'<div class="sw">{bar}</div><p style="font-size:8pt;color:#6b6b73">Use the three groups in a 60 : 30 : 10 balance.</p>{blocks}<h3>Text and background pairs</h3><div class="grid2">{pairs}</div>{note}{printref}'
    else:
        s4 = f'<p>{tbc("TBC")} Colour scheme (60 : 30 : 10 foundation, structure, accent) and approved text pairs are not yet defined.</p>'
    if pat.get('file'):
        us = ''.join(f'<li>{esc(u)}</li>' for u in pat.get('usage', []))
        s5 = f'<div style="break-inside:avoid"><div class="pattern" style="background-image:url(\'{fpath(root_path, pat["file"])}\')"></div><p style="margin-top:2.5mm"><b>{esc(pat.get("name",""))}.</b> {esc(pat.get("description",""))}</p><ul>{us}</ul></div>'
    else:
        s5 = f'<p>{tbc("TBC")} No brand pattern or graphic device supplied.</p>'
    pages.append(page(f'<div style="{vars_}">' + sec(4, 'Colour', s4) + sec(5, 'Pattern and graphic devices', s5) + '</div>', b, 4, 'Page 4'))

    # Page 5: brand guideline
    if logos:
        boxes = ''
        for l in logos:
            dark = panel_dark(l, hero['from'], root_path)
            bg = hero['from'] if dark else '#F4F4F6'
            boxes += f'<div class="logobox"><div class="p" style="background:{bg}"><img src="{fpath(root_path, l["file"])}" alt="{esc(l["label"])}"></div><div class="t"><b>{esc(l["label"])}</b><br>{esc(l.get("use",""))}</div></div>'
        logos_html = f'<div class="grid2">{boxes}</div>'
    else:
        logos_html = f'<p>{tbc("TBC")} No logo files supplied.</p>'
    rules = kv_table([('Clear space', esc(g['clearSpace']) if g.get('clearSpace') else tbc()),
                      ('Minimum size', esc(g['minimumSize']) if g.get('minimumSize') else tbc())])
    do = ''.join(f'<li>{esc(x)}</li>' for x in g.get('do', []))
    dont = ''.join(f'<li>{esc(x)}</li>' for x in g.get('dont', []))
    dd = f'<div class="grid2" style="margin-top:3mm"><div><h3>Do</h3><ul class="do">{do}</ul></div><div><h3>Don’t</h3><ul class="dont">{dont}</ul></div></div>' if (do or dont) else f'<p>Do and don’t rules: {tbc()}</p>'
    ty = g.get('typography')
    if ty:
        typ = kv_table([('Display', esc(ty.get('display', ''))), ('Body', esc(ty.get('body', ''))), ('Note', esc(ty.get('note', '')))])
    else:
        typ = f'<p>Typography: {tbc()}</p>'
    photo = f'<h3>Photography</h3><p>{esc(g["photography"])}</p>' if g.get('photography') else f'<h3>Photography</h3><p>Direction: {tbc()}</p>'
    s6 = f'<h3 style="margin-top:0">Logos</h3>{logos_html}<h3>Space and size</h3>{rules}{dd}<h3>Typography</h3>{typ}{photo}<p style="font-size:8pt;color:#6b6b73;margin-top:3mm">Never retype a wordmark; always place the supplied logo file.</p>'
    pages.append(page(f'<div style="{vars_}">' + sec(6, 'Brand guideline', s6) + '</div>', b, 5, 'Page 5'))

    # Page 6: downloads
    if dl:
        rows = ''.join(f'<tr><td>{esc(x["label"])}</td><td>{esc(x.get("format",""))}</td><td><a href="{url(x["file"])}">{esc(SITE + x["file"])}</a></td></tr>' for x in dl)
        s7 = f'<table><tr><th>File</th><th>Format</th><th>Link</th></tr>{rows}</table><p style="margin-top:3mm">Links open on the SuamiSihat Design System site and need a staff login. Always download the latest file from the site rather than reusing an old copy.</p>'
    else:
        s7 = f'<p>{tbc("TBC")} No downloadable files.</p>'
    review = f'''<div class="note"><b>Before you publish</b>Check every claim against the claims review in section 1. Items marked <span class="tbc">TBC</span> are not yet agreed; ask the brand owner before using them. Questions: <a href="mailto:branding@suamisihat.com">branding@suamisihat.com</a>.</div>'''
    pages.append(page(f'<div style="{vars_}">' + sec(7, 'Downloads', s7) + review + '</div>', b, 6, 'Page 6'))

    return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{esc(b["name"])} brand guideline v{VERSION}</title><style>{CSS}</style></head><body>{"".join(pages)}</body></html>'


def add_pdf_footer(path, name):
    try:
        import io
        from pypdf import PdfReader, PdfWriter
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import A4
        r = PdfReader(path)
        w = PdfWriter(clone_from=r)
        n = len(w.pages)
        for i, pg in enumerate(w.pages):
            if i == 0:
                continue
            buf = io.BytesIO()
            c = canvas.Canvas(buf, pagesize=A4)
            c.setStrokeColorRGB(.85, .85, .87)
            c.setLineWidth(.6)
            c.line(51, 48, 544, 48)
            c.setFillColorRGB(.42, .42, .45)
            c.setFont('Helvetica', 7.4)
            c.drawString(51, 37, f'{name} brand guideline v{VERSION}  |  {DATE}')
            c.drawRightString(544, 37, f'SuamiSihat Design System  |  Page {i+1} of {n}')
            c.save()
            buf.seek(0)
            pg.merge_page(PdfReader(buf).pages[0])
        w.add_metadata({'/Title': f'{name} brand guideline v{VERSION}', '/Author': 'SuamiSihat', '/Subject': 'Product brand guideline'})
        with open(path, 'wb') as f:
            w.write(f)
    except ImportError:
        pass
    except Exception as e:
        print(f"Warning: could not add running footer to {path}: {e}", file=sys.stderr)


def main():
    parser = argparse.ArgumentParser(description='Build 7-section brand guideline PDFs.')
    parser.add_argument('--root', default=str(DEFAULT_ROOT), help='Path to static assets root')
    parser.add_argument('--out', default=str(DEFAULT_OUT), help='Output directory for generated PDFs')
    parser.add_argument('--brand', default=None, help='Filter to single brand slug (e.g. rejal, androlab)')
    parser.add_argument('--html-only', action='store_true', help='Only generate HTML files, skip PDF rendering')
    args = parser.parse_args()

    root_path = os.path.abspath(args.root)
    out_path = os.path.abspath(args.out)
    os.makedirs(out_path, exist_ok=True)

    todo = []
    sources = {}
    for folder, slug in BRANDS:
        if args.brand and args.brand.lower() != slug.lower():
            continue
        m = load(root_path, folder)
        m['slug'] = slug
        todo.append(m)
        sources[slug] = {
            'source': f'static/products/{folder}/metadata.json',
            'sha256': source_hash(root_path, folder),
        }

    if not args.brand or args.brand.lower() == 'sifusex':
        todo.append(sifusex())

    if not todo:
        print(f"No matching brands found for filter: {args.brand}")
        return

    print(f"Generating guidelines for {len(todo)} brand(s)...")

    if args.html_only:
        for b in todo:
            html_content = build_html(b, root_path)
            html_out = os.path.join(out_path, f"{b['slug']}-brand-guideline-v{VERSION}.html")
            with open(html_out, 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f"Wrote HTML: {html_out}")
        return

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Playwright Python package is not installed. To render PDFs via Playwright, install `playwright` or run with `--html-only`.")
        return

    chrome_exec = os.environ.get('CHROME_PATH')
    with sync_playwright() as p:
        launch_opts = {'args': ['--allow-file-access-from-files']}
        if chrome_exec and os.path.exists(chrome_exec):
            launch_opts['executable_path'] = chrome_exec

        browser = p.chromium.launch(**launch_opts)
        for b in todo:
            html_content = build_html(b, root_path)
            temp_html = os.path.join(out_path, f"_{b['slug']}_temp.html")
            with open(temp_html, 'w', encoding='utf-8') as f:
                f.write(html_content)

            page_inst = browser.new_page()
            page_inst.goto(Path(temp_html).resolve().as_uri(), wait_until='load')
            page_inst.wait_for_timeout(500)

            pdf_out = os.path.join(out_path, f"{b['slug']}-brand-guideline-v{VERSION}.pdf")
            try:
                page_inst.pdf(path=pdf_out, format='A4', print_background=True, prefer_css_page_size=True, tagged=True, outline=True)
            except TypeError:
                page_inst.pdf(path=pdf_out, format='A4', print_background=True, prefer_css_page_size=True)

            page_inst.close()
            try:
                os.remove(temp_html)
            except OSError:
                pass

            add_pdf_footer(pdf_out, b['name'])
            size_kb = os.path.getsize(pdf_out) // 1024
            print(f"Generated: {pdf_out} ({size_kb} KB)")

        browser.close()

    update_manifest(out_path, sources)


if __name__ == '__main__':
    main()
