# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 3.6.x   | Yes |
| < 3.6   | No. Versions before 3.6 deployed the whole repository to the web root; upgrade. |

## Reporting a vulnerability

Do not open a public issue. Email **branding@suamisihat.com** with:

- A description of the issue
- Steps or a proof of concept to reproduce it
- The impact you expect

We reply within two working days.

## How the site is protected

- Only the built site (`build/`) is deployed. Source code, `.git`, QA reports and agent files are never on the web server.
- Apache (`static/.htaccess`) blocks hidden and source files, sends a strict Content Security Policy, `X-Frame-Options: DENY` and `X-Robots-Tag: noindex`.
- Server-side login (HTTP Basic Auth) protects the site once the password file exists on the NAS. The in-page welcome puzzle is a convenience, not access control. Brand logos under `/public/brand/` stay public for email signatures.
- No third-party scripts, styles or fonts are loaded.
- Deployment uses an SSH deploy key stored as a GitHub secret.

## What must never be committed

- Regulatory submissions, product formulas, contracts or other confidential documents
- Patient or customer data, including in screenshots
- Passwords, keys, `.env` files or `deploy.config` files

If something confidential is committed, tell the brand team at once: it must be removed from git history and the affected credentials changed.
