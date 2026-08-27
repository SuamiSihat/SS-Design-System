<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let currentDoc = $state('roadmap');
  let content = $state('Loading document...');

  const docs = [
    { id: 'roadmap', title: 'Strategic Roadmap 2026', path: '/content/roadmap.md' },
    { id: 'brand-voice', title: 'Brand Voice & Tone', path: '/content/brand-voice.md' },
    { id: 'changelog', title: 'System Changelog', path: '/content/changelog.md' },
    { id: 'introduction', title: 'System Introduction', path: '/content/introduction.md' },
    { id: 'vision-mission', title: 'Vision & Mission', path: '/content/vision-mission.md' }
  ];

  async function loadDoc(id) {
    currentDoc = id;
    const docMeta = docs.find(d => d.id === id);
    if (!docMeta) {
      content = '# Document Not Found\nThe requested document does not exist.';
      return;
    }
    try {
      const res = await fetch(docMeta.path);
      if (res.ok) {
        content = await res.text();
      } else {
        content = `# Error Loading Document\nCould not fetch \`${docMeta.path}\`.`;
      }
    } catch {
      content = `# Error\nNetwork error loading \`${docMeta.path}\`.`;
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
  <title>Documentation Viewer — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Header -->
  <div class="mb-4">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Documentation</li>
      </ol>
    </nav>
    <h1 class="display-6 fw-bold mb-2">System Documentation</h1>
  </div>

  <div class="row g-4">
    <!-- Sidebar Navigation -->
    <div class="col-lg-3">
      <div class="card p-3 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
        <div class="fw-bold text-uppercase text-secondary mb-2" style="font-size: 0.75rem; letter-spacing: 0.05em;">Documents</div>
        <div class="d-flex flex-column gap-1">
          {#each docs as d}
            <button 
              type="button" 
              class="btn btn-sm text-start rounded-3" 
              class:btn-primary={currentDoc === d.id}
              class:btn-light={currentDoc !== d.id}
              onclick={() => loadDoc(d.id)}
              style="padding: 0.5rem 0.75rem; font-size: 0.85rem;"
            >
              {d.title}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Markdown Content Viewer -->
    <div class="col-lg-9">
      <div class="card p-4 p-md-5 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF); min-height: 500px;">
        <div class="markdown-body" style="white-space: pre-wrap; font-family: inherit; font-size: 0.95rem; line-height: 1.65; color: var(--color-neutral-fg-1, #1C1C1C);">
          {content}
        </div>
      </div>
    </div>
  </div>
</div>
