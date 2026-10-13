<script>
  import { VERSION } from '$lib/version.js';
  import { renderIconShortcodes } from '$lib/utils/markdown-icons.js';
  import { marked } from 'marked';
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';
  import { DOC_GROUPS, ALL_DOCS, findDoc } from '$lib/docs/index.js';

  // An empty id means the docs landing page
  let currentDoc = $state('');
  let content = $state('');
  let isLoading = $state(true);
  let isSidebarMinimized = $state(false);
  let tocItems = $state([]);
  let activeHeadingId = $state('');
  let readTime = $state(1);
  let copiedLinkToast = $state(false);

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  const current = $derived(findDoc(currentDoc));
  const currentIndex = $derived(ALL_DOCS.findIndex((d) => d.id === currentDoc));
  const prevDoc = $derived(currentIndex > 0 ? ALL_DOCS[currentIndex - 1] : null);
  const nextDoc = $derived(currentIndex >= 0 && currentIndex < ALL_DOCS.length - 1 ? ALL_DOCS[currentIndex + 1] : null);

  function goHome() {
    currentDoc = '';
    content = '';
    tocItems = [];
    isLoading = false;
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  }

  /** Build dynamic TOC from rendered heading elements */
  async function buildTOC() {
    await tick();
    const article = document.getElementById('md-article');
    if (!article) return;
    const headings = article.querySelectorAll('h2');
    tocItems = Array.from(headings).map((h, i) => {
      const id = `doc-heading-${i}`;
      h.id = id;
      return { id, text: h.textContent, level: parseInt(h.tagName[1]) };
    });
    if (tocItems.length > 0) activeHeadingId = tocItems[0].id;
  }

  /** Render mermaid diagrams inside the article */
  async function renderMermaid() {
    if (typeof window === 'undefined') return;
    await tick();
    const article = document.getElementById('md-article');
    if (!article || !article.querySelector('pre code.language-mermaid')) return;
    // Mermaid is large, so it is only loaded for documents that contain diagrams
    const mermaid = (await import('mermaid')).default;
    // Find code blocks with language 'mermaid'
    article.querySelectorAll('pre code.language-mermaid').forEach((block) => {
      const container = document.createElement('div');
      container.className = 'mermaid';
      // Labels are drawn as plain text, so drop bold tags and use "and" for ampersands
      container.textContent = block.textContent.replace(/<\/?b>/g, '').replace(/\s&\s/g, ' and ');
      block.closest('pre').replaceWith(container);
    });
    try {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.classList.contains('dark-mode');
      mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'neutral', flowchart: { htmlLabels: false } });
      await mermaid.run({ nodes: article.querySelectorAll('.mermaid') });
    } catch (e) {
      console.warn('Mermaid render error:', e);
    }
  }

  /** Enhance rendered DOM with callout cards, code copy buttons, and responsive tables */
  async function postProcessDOM() {
    await tick();
    const article = document.getElementById('md-article');
    if (!article) return;

    // 1. Wrap tables in responsive container
    article.querySelectorAll('table').forEach((tbl) => {
      if (!tbl.parentElement.classList.contains('table-responsive')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        tbl.parentNode.insertBefore(wrapper, tbl);
        wrapper.appendChild(tbl);
      }
    });

    // 2. Enhance code blocks with language badge & Copy Code button
    article.querySelectorAll('pre').forEach((pre) => {
      if (pre.closest('.code-block-wrapper') || pre.querySelector('.mermaid')) return;
      const code = pre.querySelector('code');
      const langClass = Array.from(code?.classList || []).find(c => c.startsWith('language-'));
      const lang = langClass ? langClass.replace('language-', '') : 'code';

      if (lang === 'mermaid') return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      const header = document.createElement('div');
      header.className = 'code-block-header';

      const langSpan = document.createElement('span');
      langSpan.textContent = lang.toUpperCase();

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'code-copy-btn';
      copyBtn.innerHTML = '<iconify-icon icon="fluent:copy-16-regular"></iconify-icon> <span>Copy</span>';

      copyBtn.onclick = () => {
        const textToCopy = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyBtn.innerHTML = '<iconify-icon icon="fluent:checkmark-16-regular"></iconify-icon> <span>Copied!</span>';
          setTimeout(() => {
            copyBtn.innerHTML = '<iconify-icon icon="fluent:copy-16-regular"></iconify-icon> <span>Copy</span>';
          }, 2000);
        });
      };

      header.appendChild(langSpan);
      header.appendChild(copyBtn);

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });

    // 3. Enhance GFM Callouts / Blockquotes
    article.querySelectorAll('blockquote').forEach((bq) => {
      if (bq.classList.contains('callout-card')) return;
      const html = bq.innerHTML.trim();
      let type = 'default';
      let icon = 'fluent:info-24-regular';
      let title = '';

      if (/\[!NOTE\]/i.test(html) || /^\s*<p>\s*<strong>Note/i.test(html)) {
        type = 'note'; icon = 'fluent:info-24-regular'; title = 'Note';
      } else if (/\[!TIP\]/i.test(html)) {
        type = 'tip'; icon = 'fluent:lightbulb-24-regular'; title = 'Tip';
      } else if (/\[!WARNING\]/i.test(html) || /\[!CAUTION\]/i.test(html)) {
        type = 'warning'; icon = 'fluent:warning-24-regular'; title = 'Warning';
      } else if (/\[!IMPORTANT\]/i.test(html)) {
        type = 'important'; icon = 'fluent:alert-24-regular'; title = 'Important';
      } else if (/<strong>Decision<\/strong>/i.test(html) || /<strong>Decision:<\/strong>/i.test(html)) {
        type = 'decision'; icon = 'fluent:star-24-regular'; title = 'Decision';
      }

      if (type !== 'default') {
        bq.className = `callout-card callout-${type}`;
        bq.innerHTML = bq.innerHTML.replace(/\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]/gi, '');
        const headerDiv = document.createElement('div');
        headerDiv.className = 'callout-header';
        headerDiv.innerHTML = `<iconify-icon icon="${icon}" style="font-size:1.1rem;"></iconify-icon> <span>${title}</span>`;
        bq.insertBefore(headerDiv, bq.firstChild);
      }
    });
  }

  async function loadDoc(id) {
    const docMeta = findDoc(id);
    if (!docMeta) return goHome();
    currentDoc = docMeta.id;
    isLoading = true;
    tocItems = [];
    content = '';
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });

    try {
      const res = await fetch(docMeta.path);
      if (res.ok) {
        let raw = await res.text();
        // Calculate estimated Medium-style read time
        const wordCount = raw.trim().split(/\s+/).length;
        readTime = Math.max(1, Math.ceil(wordCount / 200));

        // Strip YAML frontmatter if present
        raw = raw.replace(/^---[\s\S]*?---\s*/, '');
        marked.setOptions({ gfm: true, breaks: false });
        content = renderIconShortcodes(marked.parse(raw));
      } else {
        content = `<h1>Error ${res.status}</h1><p>Could not load <code>${docMeta.path}</code>.</p>`;
      }
    } catch (err) {
      content = `<h1>Network Error</h1><p>${err.message}</p>`;
    }

    isLoading = false;
    await buildTOC();
    await postProcessDOM();
    await renderMermaid();
  }

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requested = urlParams.get('doc');
    // On phones the sidebar would fill the screen, and the landing page already lists every document
    if (window.innerWidth < 768) isSidebarMinimized = true;
    if (requested && findDoc(requested)) loadDoc(requested);
    else isLoading = false;

    // Scroll listener to track active heading for right pane TOC
    const handleScroll = () => {
      const headings = document.querySelectorAll('#md-article h2');
      let currentId = '';
      for (const h of headings) {
        const rect = h.getBoundingClientRect();
        if (rect.top <= 140) {
          currentId = h.id;
        } else {
          break;
        }
      }
      if (currentId) activeHeadingId = currentId;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Scroll TOC item into view on click
  function scrollToHeading(id) {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  $effect(() => {
    // Sync URL param when doc changes (client-side navigation)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (currentDoc) url.searchParams.set('doc', currentDoc);
      else url.searchParams.delete('doc');
      window.history.replaceState({}, '', url.toString());
    }
  });
</script>

<svelte:head>
  <title>{current?.title ?? 'Documentation'} — SuamiSihat® Brand Hub</title>
</svelte:head>

<div
  class="f-page-layout doc-layout-container"
  class:sidebar-minimized={isSidebarMinimized}
  class:has-toc={tocItems.length > 0}
>
  <!-- Sidebar Toggle Pill -->
  <button
    type="button"
    class="f-sidebar-toggle"
    onclick={toggleSidebar}
    aria-label={isSidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Left Sidebar (Categories Navigation) -->
  {#if !isSidebarMinimized}
    <aside
      class="f-sidebar"
      aria-label="Documentation navigation"
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem 0; overflow-y: auto;"
    >
      <button type="button" class="doc-nav-home" class:doc-nav-btn--active={!currentDoc} onclick={goHome}>
        <iconify-icon icon="fluent:library-24-regular" style="font-size: 1rem; flex-shrink: 0;"></iconify-icon>
        <span>All documents</span>
      </button>

      {#each DOC_GROUPS as group}
        <details class="doc-nav-group" open={!currentDoc || current?.group === group.id}>
          <summary>{group.label}</summary>
          <ul class="doc-nav-list">
            {#each group.docs as doc}
              <li>
                <button
                  type="button"
                  class="doc-nav-btn"
                  class:doc-nav-btn--active={currentDoc === doc.id}
                  aria-current={currentDoc === doc.id ? 'page' : undefined}
                  onclick={() => loadDoc(doc.id)}
                >
                  <iconify-icon icon={doc.icon} style="font-size: 1rem; flex-shrink: 0;"></iconify-icon>
                  <span>{doc.title}</span>
                </button>
              </li>
            {/each}
          </ul>
        </details>
      {/each}
    </aside>
  {/if}

  <!-- Main Markdown Article Content -->
  <main class="f-main-content doc-main">
    <div class="doc-article-container">
      <!-- Breadcrumb -->
      <nav class="brand-breadcrumb" aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
        <a href="/">Home</a>
        <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
        {#if current}
          <a href="/doc/" onclick={(e) => { e.preventDefault(); goHome(); }}>Docs</a>
          <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
          <span>{current.groupLabel}</span>
          <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
          <span style="color:var(--color-neutral-fg-1);font-weight:600;">{current.title}</span>
        {:else}
          <span style="color:var(--color-neutral-fg-1);font-weight:600;">Docs</span>
        {/if}
      </nav>

      {#if isLoading}
        <!-- Skeleton loader -->
        <div class="doc-skeleton" role="status" aria-busy="true" aria-label="Loading document">
          <div class="skeleton-line skeleton-h1"></div>
          <div class="skeleton-line skeleton-p"></div>
          <div class="skeleton-line skeleton-p" style="width: 80%;"></div>
          <div class="skeleton-line skeleton-h2" style="margin-top: 2rem;"></div>
          <div class="skeleton-line skeleton-p"></div>
          <div class="skeleton-line skeleton-p" style="width: 90%;"></div>
          <div class="skeleton-line skeleton-p" style="width: 70%;"></div>
        </div>
      {:else if !current}
        <header class="docs-home-head">
          <h1>Brand documents</h1>
          <p>Everything written down about our brand, in four groups. New here? Start with <button type="button" class="docs-link-btn" onclick={() => loadDoc('introduction')}>About this hub</button>.</p>
        </header>

        <div class="docs-home-grid">
          {#each DOC_GROUPS as group}
            <section class="docs-home-group" aria-labelledby={`dg-${group.id}`}>
              <h2 id={`dg-${group.id}`}>
                <iconify-icon icon={group.icon} aria-hidden="true"></iconify-icon>
                {group.label}
              </h2>
              <p class="docs-home-blurb">{group.blurb}</p>
              <ul>
                {#each group.docs as doc}
                  <li>
                    <button type="button" class="docs-home-card" onclick={() => loadDoc(doc.id)}>
                      <span class="docs-home-card-title">{doc.title}</span>
                      <span class="docs-home-card-text">{doc.summary}</span>
                    </button>
                  </li>
                {/each}
              </ul>
            </section>
          {/each}
        </div>
      {:else}
        <div class="doc-meta-bar">
          <span>{readTime} min read</span>
          <span class="meta-dot" aria-hidden="true">•</span>
          <span>Version {VERSION}</span>
          <button
            type="button"
            class="medium-share-btn"
            onclick={() => {
              if (typeof navigator !== 'undefined') {
                navigator.clipboard.writeText(window.location.href);
                copiedLinkToast = true;
                setTimeout(() => copiedLinkToast = false, 2000);
              }
            }}
            title="Copy link to this page"
          >
            <iconify-icon icon={copiedLinkToast ? "fluent:checkmark-20-regular" : "fluent:share-20-regular"} style="font-size:1.1rem;"></iconify-icon>
            <span>{copiedLinkToast ? "Link copied" : "Share"}</span>
          </button>
        </div>

        <!-- Rendered markdown article -->
        <article id="md-article" class="markdown-body md-content" aria-live="polite">
          {@html content}
        </article>

        <nav class="doc-pager" aria-label="More documents">
          {#if prevDoc}
            <button type="button" class="doc-pager-btn" onclick={() => loadDoc(prevDoc.id)}>
              <span class="doc-pager-label">&larr; Previous</span>
              <span class="doc-pager-title">{prevDoc.title}</span>
            </button>
          {:else}<span></span>{/if}
          {#if nextDoc}
            <button type="button" class="doc-pager-btn doc-pager-next" onclick={() => loadDoc(nextDoc.id)}>
              <span class="doc-pager-label">Next &rarr;</span>
              <span class="doc-pager-title">{nextDoc.title}</span>
            </button>
          {/if}
        </nav>
      {/if}
    </div>
  </main>

  <!-- Right Pane Sticky Outline TOC -->
  {#if tocItems.length > 0 && current}
    <aside class="f-toc-right-pane" aria-label="On this page navigation">
      <div class="toc-sticky-box">
        <div class="toc-header">
          <iconify-icon icon="fluent:text-column-one-24-regular" style="font-size:0.95rem; color:var(--color-brand-primary);"></iconify-icon>
          <span>On this page</span>
        </div>
        <ul class="toc-list">
          {#each tocItems as item}
            <li>
              <button
                type="button"
                class="toc-item"
                class:toc-item--active={activeHeadingId === item.id}
                onclick={() => scrollToHeading(item.id)}
              >
                {item.text}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    </aside>
  {/if}
</div>

<style>
  /* 3-Column Grid Layout Container */
  .doc-layout-container {
    display: grid;
    grid-template-columns: 260px minmax(0, 1fr);
    min-height: calc(100vh - 60px);
    position: relative;
    transition: grid-template-columns 0.3s ease;
    width: 100%;
  }

  .doc-layout-container.has-toc {
    grid-template-columns: 260px minmax(0, 1fr) 250px;
  }

  .doc-layout-container.sidebar-minimized {
    grid-template-columns: minmax(0, 1fr);
  }

  .doc-layout-container.sidebar-minimized.has-toc {
    grid-template-columns: minmax(0, 1fr) 250px;
  }

  .doc-main {
    padding: 2.5rem clamp(1.5rem, 3.5vw, 3.5rem);
    min-width: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .doc-article-container {
    max-width: 52rem;
    width: 100%;
    margin: 0 auto;
  }

  /* Slim line above the article */
  .doc-meta-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 1rem;
    margin-bottom: 1.75rem;
    border-bottom: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    font-size: 0.8rem;
    color: var(--color-neutral-fg-3, #64748B);
  }

  :global([data-theme="dark"]) .doc-meta-bar {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .meta-dot {
    opacity: 0.5;
    font-size: 0.7rem;
  }

  .medium-share-btn {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 9999px;
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.12));
    color: var(--color-neutral-fg-2, #475569);
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .medium-share-btn:hover {
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    border-color: var(--color-brand-primary, #043388);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .medium-share-btn {
    background: #1E293B;
    border-color: rgba(255, 255, 255, 0.15);
    color: #CBD5E1;
  }

  :global([data-theme="dark"]) .medium-share-btn:hover {
    background: rgba(33, 161, 247, 0.15);
    color: var(--color-text-accent);
    border-color: #21A1F7;
  }

  /* Right Pane Sticky Outline TOC */
  .f-toc-right-pane {
    padding: 2.5rem 1.25rem 2.5rem 0.75rem;
    border-left: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.06));
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .f-toc-right-pane {
    border-left-color: rgba(255, 255, 255, 0.08);
  }

  .toc-sticky-box {
    position: sticky;
    top: 85px;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .toc-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-neutral-fg-3, #64748B);
    padding-left: 4px;
    margin-bottom: 4px;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .toc-item {
    display: block;
    width: 100%;
    padding: 5px 8px 5px 10px;
    border-radius: 6px;
    border: none;
    border-left: 2px solid transparent;
    background: none;
    cursor: pointer;
    font-size: 0.775rem;
    color: var(--color-neutral-fg-3, #64748B);
    text-align: left;
    line-height: 1.4;
    transition: all 0.15s ease;
  }

  .toc-item:hover {
    color: var(--color-brand-primary, #043388);
    background: var(--color-brand-subtle, rgba(4,51,136,0.04));
  }

  .toc-item--active {
    color: var(--color-brand-primary, #043388) !important;
    border-left-color: var(--color-brand-primary, #043388) !important;
    background: var(--color-brand-subtle, rgba(4,51,136,0.06)) !important;
    font-weight: 600;
  }

  :global([data-theme="dark"]) .toc-item {
    color: #A3A3A3;
  }

  :global([data-theme="dark"]) .toc-item:hover {
    color: var(--color-text-accent);
    background: rgba(33, 161, 247, 0.08);
  }

  :global([data-theme="dark"]) .toc-item--active {
    color: var(--color-text-accent) !important;
    border-left-color: #21A1F7 !important;
    background: rgba(33, 161, 247, 0.12) !important;
  }

  @media (max-width: 1100px) {
    .doc-layout-container.has-toc,
    .doc-layout-container.sidebar-minimized.has-toc {
      grid-template-columns: 260px minmax(0, 1fr);
    }
    .f-toc-right-pane {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .doc-main { padding: 1.5rem 1.25rem; }

    .doc-layout-container,
    .doc-layout-container.has-toc,
    .doc-layout-container.sidebar-minimized {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  /* Doc nav button */
  .doc-nav-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.8375rem;
    font-weight: 500;
    color: var(--color-neutral-fg-2);
    text-align: left;
    transition: background 0.12s ease, color 0.12s ease;
  }
  .doc-nav-btn:hover {
    background: var(--color-neutral-bg-3, #f1f5f9);
    color: var(--color-neutral-fg-1);
  }
  .doc-nav-btn--active {
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    color: var(--color-brand-primary, #043388);
    font-weight: 600;
    border-left: 3px solid var(--color-brand-primary, #043388);
    border-radius: 4px 8px 8px 4px;
    padding-left: 9px;
  }
  :global([data-theme="dark"]) .doc-nav-btn { color: #94A3B8; }
  :global([data-theme="dark"]) .doc-nav-btn:hover { background: rgba(255,255,255,0.05); color: #F8FAFC; }
  :global([data-theme="dark"]) .doc-nav-btn--active {
    background: rgba(33,161,247,0.12);
    color: var(--color-text-accent);
    border-left-color: #21A1F7;
  }

  /* Collapsed document ID block inside articles */
  :global(.doc-details) {
    margin: 0 0 1.5rem;
    padding: 0.6rem 1rem;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.1));
    border-radius: 10px;
    font-size: 0.85rem;
    color: var(--color-neutral-fg-2);
  }
  :global(.doc-details > summary) { cursor: pointer; font-weight: 600; }

  /* Sidebar groups */
  .doc-nav-home {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 1rem;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background: none;
    cursor: pointer;
    font-size: 0.8375rem;
    font-weight: 600;
    color: var(--color-neutral-fg-1);
    text-align: left;
  }
  .doc-nav-home:hover { background: var(--color-neutral-bg-3, #f1f5f9); }
  .doc-nav-home.doc-nav-btn--active {
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    color: var(--color-brand-primary, #043388);
  }
  :global([data-theme="dark"]) .doc-nav-home { color: #F8FAFC; }
  :global([data-theme="dark"]) .doc-nav-home:hover { background: rgba(255,255,255,0.05); }
  :global([data-theme="dark"]) .doc-nav-home.doc-nav-btn--active { background: rgba(33,161,247,0.12); color: var(--color-text-accent); }

  .doc-nav-group { padding: 0 1rem; }
  .doc-nav-group > summary {
    cursor: pointer;
    list-style: none;
    padding: 6px 4px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-neutral-fg-3);
  }
  .doc-nav-group > summary::-webkit-details-marker { display: none; }
  .doc-nav-group > summary::after { content: '+'; float: right; font-weight: 400; }
  .doc-nav-group[open] > summary::after { content: '–'; }
  .doc-nav-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  /* Docs landing page */
  .docs-home-head h1 { margin: 0 0 0.5rem; font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.02em; }
  .docs-home-head p { margin: 0 0 2rem; font-size: 1.05rem; color: var(--color-neutral-fg-2); line-height: 1.6; }
  .docs-link-btn {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    color: var(--color-brand-primary, #043388);
    text-decoration: underline;
  }
  :global([data-theme="dark"]) .docs-link-btn { color: var(--color-text-accent); }
  .docs-home-grid { display: flex; flex-direction: column; gap: 2.25rem; }
  .docs-home-group h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 0.25rem;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .docs-home-blurb { margin: 0 0 0.9rem; font-size: 0.9rem; color: var(--color-neutral-fg-3); }
  .docs-home-group ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }
  @media (max-width: 600px) { .docs-home-group ul { grid-template-columns: 1fr; } }
  .docs-home-card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1rem 1.15rem;
    text-align: left;
    cursor: pointer;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.1));
    border-radius: 12px;
    background: var(--color-neutral-bg-1, #FCFAF6);
    transition: transform 0.15s ease, border-color 0.15s ease;
  }
  .docs-home-card:hover { transform: translateY(-2px); border-color: var(--color-brand-primary, #043388); }
  .docs-home-card-title { font-size: 0.975rem; font-weight: 700; color: var(--color-neutral-fg-1); }
  .docs-home-card-text { font-size: 0.85rem; line-height: 1.45; color: var(--color-neutral-fg-2); }

  /* Previous and next */
  .doc-pager {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
  }
  .doc-pager-btn {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 48%;
    padding: 0.75rem 1rem;
    text-align: left;
    cursor: pointer;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.1));
    border-radius: 12px;
    background: var(--color-neutral-bg-1, #FCFAF6);
  }
  .doc-pager-btn:hover { border-color: var(--color-brand-primary, #043388); }
  .doc-pager-next { margin-left: auto; text-align: right; }
  .doc-pager-label { font-size: 0.75rem; color: var(--color-neutral-fg-3); }
  .doc-pager-title { font-size: 0.95rem; font-weight: 700; color: var(--color-neutral-fg-1); }

  /* Skeleton loading animation */
  .doc-skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
  .skeleton-line {
    background: var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    border-radius: 6px;
    margin-bottom: 0.75rem;
    width: 100%;
  }
  .skeleton-h1 { height: 2.25rem; width: 60%; }
  .skeleton-h2 { height: 1.5rem; width: 40%; }
  .skeleton-p  { height: 1rem; }
  :global([data-theme="dark"]) .skeleton-line { background: rgba(255,255,255,0.06); }
</style>
