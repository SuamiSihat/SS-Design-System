# 12 — Deployment & Container Audit Report

## 1. Overview
Evaluation of all documented deployment methods, Docker configurations, Apache server settings, and environment portability.

---

## 2. Deployment Method Verification

### 1. Local Python HTTP Server
- **Command**: `python -m http.server 8000`
- **Result**: Serves static pages, assets, and processes fetch requests for `content/*.md` without CORS issues. **PASS**.

### 2. Node.js Serve
- **Command**: `npx serve -p 8000`
- **Result**: Serves static workspace on port 8000 cleanly. **PASS**.

### 3. Docker Containerization (`Dockerfile`)
- **Base Image**: `httpd:2.4-alpine`
- **Configuration**: Copies workspace files to `/usr/local/apache2/htdocs/`, enables `mod_rewrite`, and exposes port `80`.
- **Result**: Docker build compiles cleanly and container runs in lightweight Alpine environment. **PASS**.

### 4. Docker Compose (`docker-compose.yml`)
- **Port Mapping**: `8080:80`
- **Command**: `docker compose up --build -d`
- **Result**: Starts container in background, accessible at `http://localhost:8080`. **PASS**.

---

## 3. Server Rewrites & Configuration (`.htaccess`)

- `DirectoryIndex index.html`
- Custom error page handling:
  - `ErrorDocument 403 /pages/403.html`
  - `ErrorDocument 404 /pages/404.html`
  - `ErrorDocument 500 /pages/500.html`

All server rewrite rules operate cleanly under Apache.
