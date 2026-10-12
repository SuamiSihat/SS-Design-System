# SuamiSihat Design System Roadmap

What has shipped, what is next, and what still needs a decision.

---

## Principles

1. **One source of truth.** Tokens, assets and docs live once, in `static/`, and everything else reads from them.
2. **Brand first, Fluent 2 for interaction.** SuamiSihat owns colour, type, marks and voice; Fluent 2 owns component anatomy, states and accessibility.
3. **Accessible by default.** WCAG 2.2 AA in light and dark theme, checked on every build.
4. **No hype.** Brand pages describe products; they do not make health claims.

---

## Current status (v3.6.0, October 2026)

| Area | Status |
| --- | --- |
| Release | v3.6.0 |
| Framework | SvelteKit 2, Svelte 5, static build |
| Hosting | Synology NAS, https://assets.suamisihat.myds.me/, built site only |
| Accessibility | axe WCAG 2.2 A/AA: 0 violations on all pages, light and dark |
| Colour contrast | Token matrix and all product pairings pass |
| Product pages | 9 brands on the seven-section standard |
| Third-party CDNs | None |

---

## Shipped in v3.6.0

| ID | Item | Notes |
| --- | --- | --- |
| `SEC-DEPLOY` | Deploy the built site only, over an SSH key | Replaces `git reset --hard` in the web root |
| `SEC-ACCESS` | Server-side login and file blocking in `.htaccess` | Login switches on when the password file exists |
| `SEC-NPRA` | NPRA formula PDF removed from the repository and history | |
| `ONE-SOURCE` | `static/` is the only asset source | Root duplicates and build output removed |
| `SANITISE` | Emoji replaced by Fluent icons; lint guard | Includes emoji entities and mojibake |
| `A11Y-AA` | WCAG 2.2 AA in both themes | New contrast-safe tokens |
| `PRODUCT-STD` | Seven-section product page standard | REJAL and Dr Mit Ring first, then all brands |
| `SELF-HOST` | Fonts, icons, Bootstrap, marked and mermaid self-hosted | Strict CSP |

---

## Next (v3.7, target Q1 2027)

| ID | Item | Priority |
| --- | --- | --- |
| `CLAIMS-REVIEW` | Regulatory review of the claims flagged on each product page (REJAL, Dr Mit Ring, ANDROLAB RX, MENSS devices, catalogue entries such as Physta) | High |
| `PHOTO` | Product photography for Mensculine, nuCaffe, Husband Clinic and Isteri Sihat (brand cards today) | High |
| `TYPE-DECISION` | Decide the display typeface: Brand System section 04 lists Poppins; older docs and the email signature use Outfit | High |
| `DMR-PHOTO` | Dr Mit Ring product photography (packaging artwork only today) | Medium |
| `SPLIT-PAGES` | Split the 120 to 135 KB page files (home, brand system, components) into components | Medium |
| `INLINE-STYLES` | Move inline styles to classes and tokens so contrast fixes live in one place | Medium |
| `FOLDER-CASE` | Rename `static/products/<Brand>` folders to lower-case slugs | Low |
| `I18N` | Bahasa Melayu and English switch for docs and product pages | Medium |
| `APCA` | APCA contrast calculator in Tools | Low |

---

## Later (v4.0, 2027)

| Initiative | Deliverable |
| --- | --- |
| Svelte component package | `@suamisihat/ui-svelte` for internal portals |
| Token packages | npm and Dart packages generated from `tokens.json` |
| Tailwind v4 theme | `@theme` export of the tokens |
| Token API | Versioned JSON endpoint for other apps |

---

## Feedback

- Email: branding@suamisihat.com
- Repository: https://github.com/SuamiSihat/SS-Design-System
- Contribution guide: [Contribution Guide](/doc/?doc=contribution-guide)
