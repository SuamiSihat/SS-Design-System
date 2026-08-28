<script>
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';

  let currentDoc = $state('introduction');
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

  const docCategories = [
    {
      label: 'Core Documentation',
      items: [
        { id: 'introduction',        title: 'Introduction & Standards', path: '/content/introduction.md',       icon: 'fluent:home-24-regular' },
        { id: 'brand-fluent2',        title: 'Brand × Fluent 2 Contract', path: '/content/brand-fluent2.md',      icon: 'fluent:puzzle-piece-24-regular' },
        { id: 'ss-hero-guide',       title: 'Hero Banner Standard (ss-hero)', path: '/content/ss-hero-guide.md', icon: 'fluent:sparkle-24-regular' },
        { id: 'text-color-guide',    title: 'Text Color & Hierarchy Guide', path: '/content/text-color-guide.md', icon: 'fluent:text-color-24-regular' },
        { id: 'color-composition-guide', title: 'Colour Composition Standard (60:30:10)', path: '/content/color-composition-guide.md', icon: 'fluent:color-fill-24-regular' },
        { id: 'roadmap',             title: 'Strategic Roadmap 2026',  path: '/content/roadmap.md',             icon: 'fluent:map-drive-24-regular' },
        { id: 'brand-voice',         title: 'Brand Voice & Tone',       path: '/content/brand-voice.md',          icon: 'fluent:megaphone-24-regular' },
        { id: 'changelog',           title: 'System Changelog',          path: '/content/changelog.md',            icon: 'fluent:clock-arrow-download-24-regular' },
        { id: 'contribution-guide',  title: 'Contribution Guide',        path: '/content/contribution-guide.md',   icon: 'fluent:heart-hand-24-regular' },
        { id: 'vision-mission',      title: 'Vision & Mission',          path: '/content/vision-mission.md',       icon: 'fluent:eye-24-regular' }
      ]
    }
  ];

  // Flattened array for quick lookup
  const allDocs = docCategories.flatMap(c => c.items);

  /** Build dynamic TOC from rendered heading elements */
  async function buildTOC() {
    await tick();
    const article = document.getElementById('md-article');
    if (!article) return;
    const headings = article.querySelectorAll('h2, h3');
    tocItems = Array.from(headings).map((h, i) => {
      const id = `doc-heading-${i}`;
      h.id = id;
      return { id, text: h.textContent, level: parseInt(h.tagName[1]) };
    });
    if (tocItems.length > 0) activeHeadingId = tocItems[0].id;
  }

  /** Render mermaid diagrams inside the article */
  async function renderMermaid() {
    if (typeof window === 'undefined' || !window.mermaid) return;
    await tick();
    const article = document.getElementById('md-article');
    if (!article) return;
    // Find code blocks with language 'mermaid'
    article.querySelectorAll('pre code.language-mermaid').forEach((block) => {
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.textContent = block.textContent;
      block.closest('pre').replaceWith(container);
    });
    try {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.classList.contains('dark-mode');
      window.mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'neutral' });
      await window.mermaid.run({ nodes: article.querySelectorAll('.mermaid') });
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
    currentDoc = id;
    isLoading = true;
    tocItems = [];
    content = '';

    const docMeta = allDocs.find(d => d.id === id);
    if (!docMeta) {
      content = '<h1>Document Not Found</h1><p>The requested document does not exist.</p>';
      isLoading = false;
      return;
    }

    try {
      const res = await fetch(docMeta.path);
      if (res.ok) {
        let raw = await res.text();
        // Calculate estimated Medium-style read time
        const wordCount = raw.trim().split(/\s+/).length;
        readTime = Math.max(1, Math.ceil(wordCount / 200));

        // Strip YAML frontmatter if present
        raw = raw.replace(/^---[\s\S]*?---\s*/, '');
        if (typeof window !== 'undefined' && window.marked) {
          window.marked.setOptions({ gfm: true, breaks: false });
          content = window.marked.parse(raw);
        } else {
          content = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
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
    const id = (requested && allDocs.some(d => d.id === requested)) ? requested : 'introduction';
    loadDoc(id);

    // Scroll listener to track active heading for right pane TOC
    const handleScroll = () => {
      const headings = document.querySelectorAll('#md-article h2, #md-article h3');
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
      url.searchParams.set('doc', currentDoc);
      window.history.replaceState({}, '', url.toString());
    }
  });
</script>

<svelte:head>
  <title>{allDocs.find(d => d.id === currentDoc)?.title ?? 'Documentation'} — SuamiSihat™ Design System</title>
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
      <!-- Categorized Doc Library -->
      {#each docCategories as category}
        <div style="padding: 0 1rem;">
          <div style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3); margin-bottom: 0.5rem; padding-left: 4px;">{category.label}</div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px;">
            {#each category.items as doc}
              <li>
                <button
                  type="button"
                  class="doc-nav-btn"
                  class:doc-nav-btn--active={currentDoc === doc.id}
                  onclick={() => loadDoc(doc.id)}
                >
                  <iconify-icon icon={doc.icon} style="font-size: 1rem; flex-shrink: 0;"></iconify-icon>
                  <span>{doc.title}</span>
                </button>
              </li>
            {/each}
          </ul>
        </div>
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
        <a href="/doc/?doc=introduction">Documentation</a>
        {#if allDocs.find(d => d.id === currentDoc)}
          <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
          <span style="color:var(--color-neutral-fg-1);font-weight:600;">{allDocs.find(d => d.id === currentDoc)?.title}</span>
        {/if}
      </nav>

      {#if isLoading}
        <!-- Skeleton loader -->
        <div class="doc-skeleton" aria-busy="true" aria-label="Loading document">
          <div class="skeleton-line skeleton-h1"></div>
          <div class="skeleton-line skeleton-p"></div>
          <div class="skeleton-line skeleton-p" style="width: 80%;"></div>
          <div class="skeleton-line skeleton-h2" style="margin-top: 2rem;"></div>
          <div class="skeleton-line skeleton-p"></div>
          <div class="skeleton-line skeleton-p" style="width: 90%;"></div>
          <div class="skeleton-line skeleton-p" style="width: 70%;"></div>
        </div>
      {:else}
        <!-- Medium-Style Article Header Meta Bar -->
        <div class="medium-article-meta">
          <div class="medium-author-row">
            <div class="medium-avatar">
              <iconify-icon icon="fluent:shield-task-24-regular" style="font-size: 1.35rem; color: var(--color-brand-primary);"></iconify-icon>
            </div>
            <div class="medium-author-details">
              <div class="medium-author-title">
                <span class="medium-author-name">SuamiSihat™ Art Direction</span>
                <span class="medium-pub-badge">Official Standard</span>
              </div>
              <div class="medium-meta-subtext">
                <span>{readTime} min read</span>
                <span class="meta-dot">•</span>
                <span>August 2026</span>
                <span class="meta-dot">•</span>
                <span>Design System v3.5.1</span>
              </div>
            </div>
          </div>
          <div class="medium-meta-actions">
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
              title="Copy link to article"
            >
              <iconify-icon icon={copiedLinkToast ? "fluent:checkmark-20-regular" : "fluent:share-20-regular"} style="font-size:1.1rem;"></iconify-icon>
              <span>{copiedLinkToast ? "Copied Link!" : "Share"}</span>
            </button>
          </div>
        </div>

        <!-- Rendered markdown article -->
        <article id="md-article" class="markdown-body md-content" aria-live="polite">
          {@html content}
        </article>
      {/if}
    </div>
  </main>

  <!-- Right Pane Sticky Outline TOC -->
  {#if tocItems.length > 0}
    <aside class="f-toc-right-pane" aria-label="On this page navigation">
      <div class="toc-sticky-box">
        <div class="toc-header">
          <iconify-icon icon="fluent:list-column-24-regular" style="font-size:0.95rem; color:var(--color-brand-primary);"></iconify-icon>
          <span>On This Page</span>
        </div>
        <ul class="toc-list">
          {#each tocItems as item}
            <li>
              <button
                type="button"
                class="toc-item"
                class:toc-item--h3={item.level === 3}
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
    max-width: 100%;
    width: 100%;
  }

  /* Medium-Style Article Header Meta Bar */
  .medium-article-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.25rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    width: 100%;
  }

  .medium-author-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .medium-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .medium-author-details {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .medium-author-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .medium-author-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-neutral-fg-1, #022057);
  }

  .medium-pub-badge {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 2px 8px;
    border-radius: 9999px;
    background: rgba(33, 161, 247, 0.12);
    color: var(--color-brand-primary, #043388);
  }

  .medium-meta-subtext {
    font-size: 0.775rem;
    color: var(--color-neutral-fg-3, #64748B);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .meta-dot {
    opacity: 0.5;
    font-size: 0.7rem;
  }

  .medium-share-btn {
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

  :global([data-theme="dark"]) .medium-article-meta {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  :global([data-theme="dark"]) .medium-avatar {
    background: rgba(33, 161, 247, 0.12);
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme="dark"]) .medium-author-name {
    color: #F8FAFC;
  }

  :global([data-theme="dark"]) .medium-pub-badge {
    background: rgba(33, 161, 247, 0.2);
    color: #6DC6EC;
  }

  :global([data-theme="dark"]) .medium-share-btn {
    background: #1E293B;
    border-color: rgba(255, 255, 255, 0.15);
    color: #CBD5E1;
  }

  :global([data-theme="dark"]) .medium-share-btn:hover {
    background: rgba(33, 161, 247, 0.15);
    color: #21A1F7;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .toc-item--h3 {
    padding-left: 20px;
    font-size: 0.735rem;
  }

  :global([data-theme="dark"]) .toc-item {
    color: #64748B;
  }

  :global([data-theme="dark"]) .toc-item:hover {
    color: #21A1F7;
    background: rgba(33, 161, 247, 0.08);
  }

  :global([data-theme="dark"]) .toc-item--active {
    color: #21A1F7 !important;
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
    color: #21A1F7;
    border-left-color: #21A1F7;
  }

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
