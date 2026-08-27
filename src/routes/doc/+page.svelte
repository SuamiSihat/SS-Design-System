<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let currentDoc = $state('roadmap');
  let content = $state('Loading document...');
  let isSidebarMinimized = $state(false);

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  const docs = [
    { id: 'roadmap', title: 'Strategic Roadmap 2026', path: '/content/roadmap.md', icon: 'fluent:map-drive-24-regular' },
    { id: 'brand-voice', title: 'Brand Voice & Tone', path: '/content/brand-voice.md', icon: 'fluent:megaphone-24-regular' },
    { id: 'changelog', title: 'System Changelog', path: '/content/changelog.md', icon: 'fluent:clock-arrow-download-24-regular' },
    { id: 'contribution-guide', title: 'Contribution Guide', path: '/content/contribution-guide.md', icon: 'fluent:heart-hand-24-regular' },
    { id: 'vision-mission', title: 'Vision & Mission', path: '/content/vision-mission.md', icon: 'fluent:eye-24-regular' }
  ];

  async function loadDoc(id) {
    currentDoc = id;
    const docMeta = docs.find(d => d.id === id);
    if (!docMeta) {
      content = '<h1>Document Not Found</h1><p>The requested document does not exist.</p>';
      return;
    }
    try {
      const res = await fetch(docMeta.path);
      if (res.ok) {
        const raw = await res.text();
        // Simple fast markdown to HTML formatter if marked is not loaded yet
        if (typeof window !== 'undefined' && window.marked) {
          content = window.marked.parse(raw);
        } else {
          content = raw
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            .replace(/\n\n/gim, '<p></p>')
            .replace(/\n/gim, '<br>');
        }
      } else {
        content = `<h1>Error</h1><p>Could not fetch ${docMeta.path}</p>`;
      }
    } catch {
      content = `<h1>Error</h1><p>Network error loading ${docMeta.path}</p>`;
    }
  }

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requested = urlParams.get('doc');
    if (requested && docs.some(d => d.id === requested)) {
      loadDoc(requested);
    } else {
      loadDoc('roadmap');
    }
  });
</script>

<svelte:head>
  <title>Documentation — SuamiSihat™ Design System</title>
</svelte:head>

<div class="f-page-layout" class:sidebar-minimized={isSidebarMinimized} style="display: grid; grid-template-columns: {isSidebarMinimized ? '0 1fr' : '280px 1fr'}; min-height: calc(100vh - 60px); position: relative; transition: all 0.3s ease;">
  <!-- Sidebar Toggle Pill -->
  <button class="f-sidebar-toggle" onclick={toggleSidebar} aria-label="Toggle sidebar" style="position: fixed; left: {isSidebarMinimized ? '12px' : '268px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;">
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Sidebar -->
  <aside class="f-sidebar" aria-label="Documentation navigation" style="display: {isSidebarMinimized ? 'none' : 'block'}; padding: 1.5rem 1rem;">
    <div style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3); margin-bottom: 0.75rem; padding-left: 0.5rem;">Documentation Library</div>
    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
      {#each docs as doc}
        <li>
          <button 
            type="button" 
            class="btn btn-sm w-100 text-start d-flex align-items-center gap-2" 
            class:btn-primary={currentDoc === doc.id} 
            class:btn-light={currentDoc !== doc.id}
            onclick={() => loadDoc(doc.id)}
            style="border-radius: 8px; font-weight: 600; font-size: 0.85rem; padding: 8px 12px;"
          >
            <iconify-icon icon={doc.icon} style="font-size: 1.1rem; flex-shrink: 0;"></iconify-icon>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{doc.title}</span>
          </button>
        </li>
      {/each}
    </ul>
  </aside>

  <!-- Main Markdown Article Content -->
  <main class="f-main-content" style="padding: 2.5rem; max-width: 960px;">
    <div class="doc-breadcrumb" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--color-neutral-fg-3); margin-bottom: 1.5rem;">
      <a href="/" style="color: var(--color-neutral-fg-2); text-decoration: none;">Home</a>
      <span>&rsaquo;</span>
      <span style="color: var(--color-brand-primary); font-weight: 600;">{docs.find(d => d.id === currentDoc)?.title || 'Document'}</span>
    </div>

    <article class="markdown-body p-4 p-md-5 border rounded-4 shadow-sm" style="background: var(--color-neutral-bg-2, #FFFFFF); min-height: 500px;">
      {@html content}
    </article>
  </main>
</div>
