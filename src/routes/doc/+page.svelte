<script>
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';

  let currentDoc = $state('introduction');
  let content = $state('');
  let isLoading = $state(true);
  let isSidebarMinimized = $state(false);
  let tocItems = $state([]);

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  const docCategories = [
    {
      label: 'Core Documentation',
      items: [
        { id: 'introduction',        title: 'Introduction & Standards', path: '/content/introduction.md',       icon: 'fluent:home-24-regular' },
        { id: 'text-color-guide',    title: 'Text Color & Hierarchy Guide', path: '/content/text-color-guide.md', icon: 'fluent:text-color-24-regular' },
        { id: 'roadmap',             title: 'Strategic Roadmap 2026',  path: '/content/roadmap.md',             icon: 'fluent:map-drive-24-regular' },
        { id: 'brand-voice',         title: 'Brand Voice & Tone',       path: '/content/brand-voice.md',          icon: 'fluent:megaphone-24-regular' },
        { id: 'changelog',           title: 'System Changelog',          path: '/content/changelog.md',            icon: 'fluent:clock-arrow-download-24-regular' },
        { id: 'contribution-guide',  title: 'Contribution Guide',        path: '/content/contribution-guide.md',   icon: 'fluent:heart-hand-24-regular' },
        { id: 'vision-mission',      title: 'Vision & Mission',          path: '/content/vision-mission.md',       icon: 'fluent:eye-24-regular' }
      ]
    },
    {
      label: 'Operating Subsidiaries',
      items: [
        { id: 'sub-brands/ss-health',   title: '01-SSH · SS Health Holding',    path: '/content/sub-brands/ss-health.md',   icon: 'fluent:building-multiple-24-regular' },
        { id: 'sub-brands/ss-clinic',   title: '02-SSC · SS Clinic Standard',   path: '/content/sub-brands/ss-clinic.md',   icon: 'fluent:stethoscope-24-regular' },
        { id: 'sub-brands/ss-wellness', title: '03-SSW · SS Wellness Standard', path: '/content/sub-brands/ss-wellness.md', icon: 'fluent:heart-pulse-24-regular' },
        { id: 'sub-brands/ss-ecom',     title: '04-SSE · SS E-Commerce',        path: '/content/sub-brands/ss-ecom.md',     icon: 'fluent:store-microsoft-24-regular' },
        { id: 'sub-brands/ss-tech',     title: '05-SST · SS Technology',        path: '/content/sub-brands/ss-tech.md',     icon: 'fluent:desktop-24-regular' }
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
      window.mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
      await window.mermaid.run({ nodes: article.querySelectorAll('.mermaid') });
    } catch (e) {
      console.warn('Mermaid render error:', e);
    }
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
        const raw = await res.text();
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
    await renderMermaid();
  }

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requested = urlParams.get('doc');
    const id = (requested && allDocs.some(d => d.id === requested)) ? requested : 'introduction';
    loadDoc(id);
  });

  // Scroll TOC item into view on click
  function scrollToHeading(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  class="f-page-layout"
  class:sidebar-minimized={isSidebarMinimized}
  style="display: grid; grid-template-columns: {isSidebarMinimized ? 'minmax(0, 1fr)' : '280px minmax(0, 1fr)'}; min-height: calc(100vh - 60px); position: relative; transition: grid-template-columns 0.3s ease; width: 100%;"
>
  <!-- Sidebar Toggle Pill -->
  <button
    type="button"
    class="f-sidebar-toggle"
    onclick={toggleSidebar}
    aria-label={isSidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '268px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Left Sidebar -->
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

      <!-- Dynamic TOC (On This Page) -->
      {#if tocItems.length > 0}
        <div style="border-top: 1px solid var(--color-neutral-stroke-1); padding: 1rem; margin-top: 0.5rem;">
          <div style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3); margin-bottom: 0.5rem; padding-left: 4px;">On This Page</div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1px;">
            {#each tocItems as item}
              <li>
                <button
                  type="button"
                  class="toc-item"
                  class:toc-item--h3={item.level === 3}
                  onclick={() => scrollToHeading(item.id)}
                >
                  {item.text}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </aside>
  {/if}

  <!-- Main Markdown Article Content -->
  <main class="f-main-content doc-main" style="width: 100%; min-width: 0; box-sizing: border-box;">
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
      <!-- Rendered markdown article -->
      <article id="md-article" class="markdown-body" aria-live="polite">
        {@html content}
      </article>
    {/if}
  </main>
</div>

<style>
  .doc-main {
    padding: 2.5rem clamp(1.5rem, 4vw, 4rem);
    min-width: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .doc-main { padding: 1.5rem 1.25rem; }
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

  /* TOC item */
  .toc-item {
    display: block;
    width: 100%;
    padding: 4px 8px;
    border-radius: 6px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.78rem;
    color: var(--color-neutral-fg-3);
    text-align: left;
    line-height: 1.4;
    transition: color 0.12s ease, background 0.12s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .toc-item:hover {
    color: var(--color-brand-primary, #043388);
    background: var(--color-brand-subtle, rgba(4,51,136,0.04));
  }
  .toc-item--h3 {
    padding-left: 20px;
    font-size: 0.74rem;
  }
  :global([data-theme="dark"]) .toc-item { color: #64748B; }
  :global([data-theme="dark"]) .toc-item:hover { color: #21A1F7; }

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
