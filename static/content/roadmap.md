# Roadmap

What is finished, what is next, and what is waiting for a decision.

---

## How we work

1. **One source for everything.** Each logo, colour and document is kept in one place, and everything else reads from it.
2. **Our brand first.** SuamiSihat® decides colour, fonts, logos and voice. Fluent 2 decides how buttons, forms and screens behave.
3. **Easy for everyone to use.** Every page meets the WCAG 2.2 AA accessibility standard in light and dark mode, checked on every update.
4. **No hype.** Brand pages describe products. They do not make health claims.

---

## Where we are now (v3.6.2, October 2026)

| Area | Status |
| --- | --- |
| Version | v3.6.2 |
| Built with | SvelteKit 2 and Svelte 5, as a static site |
| Where it runs | Synology NAS, https://assets.suamisihat.myds.me/ (only the finished site is published) |
| Accessibility | No problems found on any page, light or dark |
| Readability | All colour pairs pass, including every product |
| Product pages | 9 brands, each with the same seven sections |
| Outside services | None. Fonts, icons and scripts are all kept on our own server |
| Brand guide PDFs | One per brand, and a check warns if one is out of date |

---

## Finished in v3.6.2

- **Display font settled:** Poppins.
- **Pages split into smaller parts:** Home, Brand and Components, so they are easier to change. They look the same.
- **Readability check in Tools:** now also shows the APCA score.
- **Brand guide PDFs:** one per brand, with a warning when a PDF is out of date (`npm run generate:pdfs`).
- **Health claims removed from the product catalogue:** the partner and ingredient cards no longer make health or "patented" claims. We are still waiting for the licensor's wording for Physta®.

---

## Finished in v3.6.0

- **Safer publishing:** only the finished site is uploaded, using a secure key.
- **Server protection:** private files are blocked, and a login can be switched on.
- **Confidential file removed:** the NPRA formula PDF was deleted from the repository and its history.
- **One home for files:** `static/` is the only place assets live. Duplicates were removed.
- **Emoji replaced by Fluent icons,** with an automatic check to keep it that way.
- **Accessibility to WCAG 2.2 AA** in both light and dark mode, with new colours that are easier to read.
- **Seven-section product page standard:** REJAL and Dr. MIT Ring first, then every brand.
- **Everything self-hosted:** fonts, icons and scripts come from our own server, under a strict security policy.

---

## Next (v3.7, target Q1 2027)

| Item | Priority |
| --- | --- |
| **Regulatory review of claims** flagged on the product pages (REJAL, Dr. MIT Ring, ANDROLAB RX, MENSS devices), and Physta® wording approved by the licensor. The catalogue part was done in v3.6.2. See `docs/claims-review/audit-2026-10-13.md` | High |
| **Product photos** for Mensculine, nuCaffe, Husband Clinic and Isteri Sihat (they show brand cards for now) | High |
| **Dr. MIT Ring photos** (only packaging artwork for now) | Medium |
| **Bahasa Melayu and English switch** for documents and product pages | Medium |
| **Tidy the code** so a colour fix only has to be made in one place | Medium |
| **Rename product folders** to lower-case names | Low |

---

## Later (v4.0, 2027)

- A ready-made Svelte parts package for internal portals (`@suamisihat/ui-svelte`).
- Colour and font packages for npm and Dart, built from one file.
- A Tailwind v4 theme.
- A web address other apps can read the brand colours from.

---

## Tell us what you think

- Email: branding@suamisihat.com
- Repository: https://github.com/SuamiSihat/SS-Design-System
- How to suggest a change: [Suggesting a change](/doc/?doc=contribution-guide)
