/**
 * SS Design System — Markdown Loader
 * Fetches .md files from the /content/ directory and renders them
 * using marked.js into the designated #md-content element.
 *
 * Usage: pages/doc.html?doc=changelog
 * This will fetch: /content/changelog.md
 */

(function () {
    'use strict';

    // ──────────────────────────────────────────────
    // Config
    // ──────────────────────────────────────────────
    const CONTENT_BASE = '../content/';
    const CONTENT_ELEMENT_ID = 'md-content';
    const TOC_ELEMENT_ID = 'doc-toc-list';
    const PAGE_TITLE_ID = 'doc-page-title';
    const ALLOWED_DOCS = [
        'vision-mission',
        'introduction',
        'changelog',
        'contribution-guide',
        'sub-brands/ss-health',
        'sub-brands/ss-clinic',
        'sub-brands/ss-wellness',
        'sub-brands/ss-ecom',
        'sub-brands/ss-tech',
    ];

    // ──────────────────────────────────────────────
    // Helpers
    // ──────────────────────────────────────────────

    /** Read doc parameter from URL query string or clean pathname */
    function getDocParam() {
        // 1. Try standard query parameter (doc.html?doc=changelog)
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get('doc');
        if (queryParam) return queryParam;

        // 2. Try clean URL path parameter (pages/doc-changelog)
        const path = window.location.pathname;
        const docIndex = path.toLowerCase().indexOf('doc-');
        if (docIndex !== -1) {
            let docSlug = path.substring(docIndex + 4).replace(/\/$/, ''); // extract after 'doc-'
            docSlug = docSlug.replace('.html', ''); // strip extension if present
            if (docSlug) return docSlug;
        }

        return 'introduction';
    }

    /** Render a skeleton loader while fetching */
    function showSkeleton(container) {
        container.innerHTML = `
            <div class="md-skeleton title"></div>
            <div class="md-skeleton wide"></div>
            <div class="md-skeleton mid"></div>
            <div class="md-skeleton wide"></div>
            <div class="md-skeleton short"></div>
            <br>
            <div class="md-skeleton wide"></div>
            <div class="md-skeleton mid"></div>
            <div class="md-skeleton wide"></div>
        `;
    }

    /** Show a friendly error state */
    function showError(container, docId) {
        container.innerHTML = `
            <div style="text-align:center;padding:4rem 2rem;">
                <div style="font-size:3rem;margin-bottom:1rem;">📄</div>
                <h2 style="color:var(--heading-color)">Page not found</h2>
                <p style="color:var(--text-color);opacity:0.7;">
                    Could not load <code>${docId}.md</code>. 
                    The document may not exist yet.
                </p>
                <a href="/" class="btn btn-primary mt-3">
                    ← Back to Design System
                </a>
            </div>
        `;
    }

    /** Build a Table of Contents from H2/H3 headings in the rendered HTML */
    function buildTOC(container, tocList) {
        if (!tocList) return;
        const headings = container.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            tocList.closest('.doc-toc')?.remove();
            return;
        }

        const fragment = document.createDocumentFragment();
        headings.forEach((heading, i) => {
            // Ensure heading has an id
            if (!heading.id) {
                heading.id = heading.textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-') + '-' + i;
            }
            const li = document.createElement('li');
            if (heading.tagName === 'H3') li.classList.add('toc-h3');
            li.innerHTML = `<a href="#${heading.id}">${heading.textContent}</a>`;
            fragment.appendChild(li);
        });
        tocList.appendChild(fragment);

        // Highlight active TOC item on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const link = tocList.querySelector(`a[href="#${entry.target.id}"]`);
                if (link) link.classList.toggle('active', entry.isIntersecting);
            });
        }, { rootMargin: '-10% 0px -80% 0px' });

        headings.forEach(h => observer.observe(h));
    }

    /** Update <title> and breadcrumb with document name */
    function updatePageTitle(docId) {
        const formatted = docId
            .split('/')
            .pop()
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

        document.title = `${formatted} — SS Design System`;

        const titleEl = document.getElementById(PAGE_TITLE_ID);
        if (titleEl) titleEl.textContent = formatted;
    }

    // ──────────────────────────────────────────────
    // Main
    // ──────────────────────────────────────────────
    async function loadMarkdown() {
        const contentEl = document.getElementById(CONTENT_ELEMENT_ID);
        if (!contentEl) return;

        const docId = getDocParam();

        // Validate doc ID (security: prevent path traversal)
        if (!ALLOWED_DOCS.includes(docId)) {
            showError(contentEl, docId);
            return;
        }

        showSkeleton(contentEl);
        updatePageTitle(docId);

        const url = `${CONTENT_BASE}${docId}.md`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const markdown = await response.text();

            // marked.js must be loaded before this script
            if (typeof marked === 'undefined') {
                contentEl.innerHTML = '<p>Markdown renderer not loaded.</p>';
                return;
            }

            // Configure marked
            marked.setOptions({
                breaks: true,
                gfm: true,
            });

            contentEl.innerHTML = marked.parse(markdown);
            contentEl.classList.add('md-content');

            // Build ToC after render
            const tocList = document.getElementById(TOC_ELEMENT_ID);
            buildTOC(contentEl, tocList);

        } catch (err) {
            console.error('[SS Markdown Loader] Failed to load:', url, err);
            showError(contentEl, docId);
        }
    }

    // Boot when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMarkdown);
    } else {
        loadMarkdown();
    }

})();
