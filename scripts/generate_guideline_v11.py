import pymupdf

src_path = 'static/brand-guidelines/rejal-drmitring-brand-guidelines-v1.0.pdf'
out_path = 'static/brand-guidelines/rejal-drmitring-brand-guidelines-v1.1.pdf'

doc = pymupdf.open(src_path)

# Colors
C_DARK = (0.11, 0.11, 0.12)
C_MUTED = (0.37, 0.35, 0.36)
C_WHITE = (1.0, 1.0, 1.0)
C_RED = (0.61, 0.11, 0.11)

# =========================================================================
# 1. PAGE 2 (index 1) - Brand Architecture
# =========================================================================
p2 = doc[1]
# Redact 'Condom accessory\nreusable ring, 2 per pack'
# bbox: [662.0, 338.5, 755.3, 360.4]
r2 = pymupdf.Rect(650.0, 335.0, 780.0, 368.0)
p2.add_redact_annot(r2, fill=C_WHITE)
p2.apply_redactions()
p2.insert_text(pymupdf.Point(662.0, 347.0), 'Male Intimacy Technology', fontname='helv', fontsize=7.6, color=C_DARK)
p2.insert_text(pymupdf.Point(662.0, 358.0), 'reusable ring, 2 per pack', fontname='helv', fontsize=7.6, color=C_MUTED)

# =========================================================================
# 2. PAGE 13 (index 12) - Section B Cover
# =========================================================================
p13 = doc[12]
# Redact 'C O N D O M  F A S T E N E R'
# bbox: [51.0, 323.5, 169.5, 336.1]
r13_title = pymupdf.Rect(48.0, 320.0, 350.0, 342.0)
p13.add_redact_annot(r13_title, fill=C_WHITE)
# Redact subtitle: 'A discreet, reusable condom accessory: a soft lime ring\nthat keeps a condom in place. Direka oleh SuamiSihat.'
# bbox: [51.0, 360.5, 354.3, 393.1]
r13_sub = pymupdf.Rect(48.0, 355.0, 380.0, 400.0)
p13.add_redact_annot(r13_sub, fill=C_WHITE)
p13.apply_redactions()

p13.insert_text(pymupdf.Point(51.0, 334.0), 'M A L E   I N T I M A C Y   T E C H N O L O G Y', fontname='helv', fontsize=10.0, color=C_DARK)
p13.insert_text(pymupdf.Point(51.0, 372.0), 'An MDA-registered Male Intimacy Technology device: a precision', fontname='helv', fontsize=11.0, color=C_DARK)
p13.insert_text(pymupdf.Point(51.0, 389.0), 'ergonomic silicone ring. Direka oleh SuamiSihat.', fontname='helv', fontsize=11.0, color=C_DARK)

# =========================================================================
# 3. PAGE 14 (index 13) - B1 Brand
# =========================================================================
p14 = doc[13]
# Redact 'What Dr Mit Ring is' body: [51.0, 122.3, 277.2, 190.0]
r14_what = pymupdf.Rect(48.0, 120.0, 285.0, 195.0)
p14.add_redact_annot(r14_what, fill=C_WHITE)

# Redact 'What it is not' body: [51.0, 223.6, 273.9, 270.0]
r14_not = pymupdf.Rect(48.0, 220.0, 285.0, 290.0)
p14.add_redact_annot(r14_not, fill=C_WHITE)

# Redact 'Positioning' body: [300.1, 122.3, 503.9, 165.0]
r14_pos = pymupdf.Rect(298.0, 120.0, 520.0, 165.0)
p14.add_redact_annot(r14_pos, fill=C_WHITE)

# Redact Personality: [307.7, 198.6, 494.6, 207.8]
r14_per = pymupdf.Rect(298.0, 195.0, 520.0, 212.0)
p14.add_redact_annot(r14_per, fill=C_WHITE)

# Redact Credit line body: [300.9, 264.3, 529.7, 286.2]
r14_cred = pymupdf.Rect(298.0, 260.0, 530.0, 295.0)
p14.add_redact_annot(r14_cred, fill=C_WHITE)

p14.apply_redactions()

what_text = (
    "An MDA-registered male intimacy technology device\n"
    "(Male Intimacy Technology · M.I.T.): precision silicone\n"
    "ring designed by SuamiSihat. Two rings per pack, foil\n"
    "sachet ('Asian Size'), reusable 3–5 times with proper care."
)
p14.insert_textbox(pymupdf.Rect(51.0, 122.0, 280.0, 192.0), what_text, fontname='helv', fontsize=8.8, color=C_DARK)

not_text = (
    "Not an ingestible medicine; not an unapproved mechanical\n"
    "intervention. Doctor endorsement and sexual-function\n"
    "claim wording are strictly gated to the MDA-registered\n"
    "intended use and written consent."
)
p14.insert_textbox(pymupdf.Rect(51.0, 223.0, 280.0, 285.0), not_text, fontname='helv', fontsize=8.8, color=C_DARK)

pos_text = (
    "Teknologi intim lelaki yang discreet, boleh guna\n"
    "semula, direka di Malaysia. In this category,\n"
    "discretion is clinical authority."
)
p14.insert_textbox(pymupdf.Rect(300.0, 122.0, 515.0, 165.0), pos_text, fontname='helv', fontsize=8.8, color=C_DARK)

per_text = "DISCREET       CONFIDENT       CLINICAL       PRACTICAL"
p14.insert_text(pymupdf.Point(308.0, 205.0), per_text, fontname='helv', fontsize=7.4, color=C_DARK)

cred_text = (
    "Replaces all previous inventor credits. Individual doctor\n"
    "endorsement (Dr Amir, SS Clinic) and sexual-function claims\n"
    "are gated until written consent is on file."
)
p14.insert_textbox(pymupdf.Rect(300.0, 263.0, 525.0, 295.0), cred_text, fontname='helv', fontsize=7.5, color=C_MUTED)

# =========================================================================
# 4. PAGE 15 (index 14) - B2 Logo
# =========================================================================
p15 = doc[14]
# Redact descriptor 'C O N D O M  F A S T E N E R' above pill [627.3, 139.7, 719.4, 149.4]
r15_top = pymupdf.Rect(600.0, 135.0, 750.0, 152.0)
p15.add_redact_annot(r15_top, fill=C_WHITE)

# Redact 'With descriptor\n“CONDOM FASTENER” above the pill...' [557.5, 236.0, 766.8, 256.1]
r15_desc = pymupdf.Rect(555.0, 234.0, 775.0, 260.0)
p15.add_redact_annot(r15_desc, fill=C_WHITE)

# Redact Don't item: 'Add a doctor’s name or photo.' [428.0, 476.0, 540.6, 486.3]
r15_dont = pymupdf.Rect(425.0, 473.0, 560.0, 488.0)
p15.add_redact_annot(r15_dont, fill=C_WHITE)

p15.apply_redactions()

p15.insert_text(pymupdf.Point(610.0, 147.0), 'M A L E   I N T I M A C Y   T E C H', fontname='helv', fontsize=6.8, color=C_DARK)
desc_box = (
    "With descriptor\n"
    "“MALE INTIMACY TECHNOLOGY” above pill on packs/listings."
)
p15.insert_textbox(pymupdf.Rect(557.5, 235.0, 770.0, 258.0), desc_box, fontname='helv', fontsize=7.4, color=C_DARK)
p15.insert_text(pymupdf.Point(428.0, 484.0), 'Publish doctor name/photo without consent on file.', fontname='helv', fontsize=7.4, color=C_DARK)

# =========================================================================
# 5. PAGE 18 (index 17) - B6 Packaging
# =========================================================================
p18 = doc[17]
# Redact table row for descriptor: [520.9, 126.6, 671.7, 137.8]
r18_desc = pymupdf.Rect(518.0, 124.0, 780.0, 150.0)
p18.add_redact_annot(r18_desc, fill=C_WHITE)

# Redact row for Strong & Harder Grip: [527.7, 207.6, 656.2, 218.8]
r18_grip = pymupdf.Rect(518.0, 205.0, 780.0, 230.0)
p18.add_redact_annot(r18_grip, fill=C_WHITE)

# Redact Leaflet note: [520.9, 381.6, 685.5, 392.8]
r18_leaf = pymupdf.Rect(518.0, 379.0, 780.0, 395.0)
p18.add_redact_annot(r18_leaf, fill=C_WHITE)

p18.apply_redactions()

p18.insert_text(pymupdf.Point(520.9, 135.0), '“MALE INTIMACY TECHNOLOGY” replaces “CONDOM FASTENER”', fontname='helv', fontsize=7.5, color=C_DARK)
p18.insert_text(pymupdf.Point(520.9, 216.0), 'Claims must match MDA-registered intended use only', fontname='helv', fontsize=7.5, color=C_DARK)
p18.insert_text(pymupdf.Point(520.9, 389.0), 'atau kebas”. Erection & stamina claims strictly per MDA intended use.', fontname='helv', fontsize=7.4, color=C_DARK)

# =========================================================================
# 6. PAGE 20 (index 19) - B8 Voice & Claims
# =========================================================================
p20 = doc[19]
# Redact title: 'Accessory language only' [51.0, 62.3, 311.2, 90.2]
r20_title = pymupdf.Rect(48.0, 60.0, 330.0, 92.0)
p20.add_redact_annot(r20_title, fill=C_WHITE)

# Redact USE list: [77.8, 136.8, 260.0, 220.0]
r20_use = pymupdf.Rect(75.0, 134.0, 265.0, 220.0)
p20.add_redact_annot(r20_use, fill=C_WHITE)

# Redact NEVER list: [331.1, 136.8, 520.0, 270.0]
r20_never = pymupdf.Rect(328.0, 134.0, 525.0, 275.0)
p20.add_redact_annot(r20_never, fill=C_WHITE)

# Redact Path A channel rules: [584.3, 187.8, 775.0, 240.0]
r20_chan = pymupdf.Rect(580.0, 185.0, 775.0, 245.0)
p20.add_redact_annot(r20_chan, fill=C_WHITE)

p20.apply_redactions()

p20.insert_text(pymupdf.Point(51.0, 83.0), 'Path B · MDA-registered intended use', fontname='helv', fontsize=19.0, color=C_DARK)

use_text = (
    "“Teknologi intim lelaki yang discreet.”\n\n"
    "“M.I.T. (Male Intimacy Technology).”\n\n"
    "“Silikon lembut, boleh guna semula 3–5 kali.”\n\n"
    "“2 cincin dalam satu kotak.”\n\n"
    "“Direka oleh SuamiSihat.”\n\n"
    "“Approved claims (strictly per MDA intended use).”"
)
p20.insert_textbox(pymupdf.Rect(77.8, 136.0, 265.0, 230.0), use_text, fontname='helv', fontsize=7.4, color=C_DARK)

never_text = (
    "Unapproved sexual-function claims outside MDA-registered wording\n\n"
    "Vulgar slang: “lambat pancut / muntah”\n\n"
    "“Venous leakage”, blood flow, or unverified physiological claims\n\n"
    "“Andrologically tested” / “patented” without signed documents\n\n"
    "Doctor endorsement without written consent on file (Dr Amir)\n\n"
    "Retired lineage credits (Dr. Ismail Tambi)"
)
p20.insert_textbox(pymupdf.Rect(331.0, 136.0, 525.0, 275.0), never_text, fontname='helv', fontsize=7.3, color=C_MUTED)

chan_text = (
    "Path B: Medical device registered under Act 737.\n"
    "All advertising must follow MDA/KKM rules.\n"
    "Erection, hardness and stamina claims are allowed\n"
    "strictly in approved wording matching registered use."
)
p20.insert_textbox(pymupdf.Rect(584.0, 187.0, 775.0, 245.0), chan_text, fontname='helv', fontsize=7.3, color=C_MUTED)

# =========================================================================
# 7. PAGE 22 (index 21) - Checklist & Version
# =========================================================================
p22 = doc[21]
# Redact checklist line: [75.4, 197.9, 237.1, 209.0]
r22_doc = pymupdf.Rect(72.0, 195.0, 350.0, 212.0)
p22.add_redact_annot(r22_doc, fill=C_WHITE)

# Redact version: [437.9, 358.0, 762.4, 368.7]
r22_ver = pymupdf.Rect(435.0, 355.0, 780.0, 372.0)
p22.add_redact_annot(r22_ver, fill=C_WHITE)

p22.apply_redactions()

p22.insert_text(pymupdf.Point(75.4, 206.0), 'Dr Amir consent ref verified before doctor name or photo is published', fontname='helv', fontsize=7.8, color=C_DARK)
p22.insert_text(pymupdf.Point(437.9, 366.0), 'Document owner: Branding, SuamiSihat · branding@suamisihat.com · v1.1, 16 Oct 2026', fontname='helv', fontsize=7.6, color=C_MUTED)

# Save v1.1
doc.save(out_path)
print(f'Successfully generated {out_path} ({len(doc)} pages)')
