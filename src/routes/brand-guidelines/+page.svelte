<script>
  import { onMount } from 'svelte';

  let activeBook = $state(null); // 'logo' | 'interior' | null
  let isFullscreen = $state(false);
  let isPdfLoading = $state(false);

  const books = {
    logo: {
      key: 'logo',
      title: 'Logo & Concept',
      series: 'SuamiSihat™ Design System',
      pdf: '/brand-guidelines/Brand Guideline - Logo & Concept.pdf',
      img: '/brand-guidelines/cover-logo-concept.png',
      size: '1.4 MB'
    },
    interior: {
      key: 'interior',
      title: 'Interior Design',
      series: 'SuamiSihat™ Clinic Standard',
      pdf: '/brand-guidelines/Brand Guideline - Interior Design.pdf',
      img: '/brand-guidelines/cover-interior-design.png',
      size: '3.2 MB'
    }
  };

  function openBook(key) {
    if (!books[key]) return;
    activeBook = key;
    isPdfLoading = true;
    const url = new URL(window.location.href);
    url.searchParams.set('open', key);
    window.history.replaceState({}, '', url);
  }

  function closeBook() {
    activeBook = null;
    isPdfLoading = false;
    const url = new URL(window.location.href);
    url.searchParams.delete('open');
    window.history.replaceState({}, '', url);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function toggleFullscreen() {
    const el = document.getElementById('reader-screen');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => (isFullscreen = true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => (isFullscreen = false)).catch(() => {});
    }
  }

  onMount(() => {
    // Check deep link parameter
    const params = new URLSearchParams(window.location.search);
    const openParam = params.get('open')?.toLowerCase();
    if (openParam && books[openParam]) {
      openBook(openParam);
    }

    // Keyboard navigation (Escape key to dismiss)
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && activeBook) {
        closeBook();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    // Fullscreen change listener
    const handleFsChange = () => {
      isFullscreen = !!document.fullscreenElement;
    };
    document.addEventListener('fullscreenchange', handleFsChange);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  });
</script>

<svelte:head>
  <title>Brand Guidelines &amp; PDFs — SuamiSihat™ Design System</title>
</svelte:head>

<div class="guidelines-page" style="min-height: calc(100vh - 60px); background: var(--color-neutral-bg-1, #F8FAFC); padding-bottom: 4rem;">
  <!-- Breadcrumb & Header -->
  <div class="selection-hero w-100 pt-5 text-center" style="width: 100%; max-width: 100%; padding: 0 clamp(1.5rem, 4vw, 4rem); box-sizing: border-box;">
    <p class="selection-eyebrow" style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #21A1F7; margin-bottom: 0.5rem;">
      <iconify-icon icon="fluent:book-open-24-regular" style="vertical-align: middle;"></iconify-icon> Official Publications
    </p>
    <h1 class="selection-title" style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; color: var(--color-neutral-fg-1, #022057); margin-bottom: 0.75rem;">
      Brand Guideline Booklets
    </h1>
    <p class="selection-subtitle" style="font-size: 1rem; color: var(--color-neutral-fg-2, #64748B); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;">
      Authoritative brand and spatial design standards for SuamiSihat™. Select a booklet below to read online or download the official PDF publication.
    </p>
  </div>

  <!-- Horizontal Booklet Cards Grid -->
  <div class="covers-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(460px, 1fr)); gap: 2rem; padding: 1rem clamp(1.5rem, 4vw, 4rem) 3.5rem;">
    <!-- Book 1: Logo & Concept -->
    <div class="book-horizontal-card" 
         onclick={() => openBook('logo')} 
         onkeydown={(e) => e.key === 'Enter' && openBook('logo')}
         role="button" 
         tabindex="0" 
         aria-label="Open Logo & Concept Guideline">
      <div class="book-thumbnail-wrap">
        <img src="/brand-guidelines/cover-logo-concept.png" alt="Logo & Concept Guideline Cover" class="book-cover-img" loading="eager" />
        <div class="book-cover-overlay">
          <span class="read-badge"><iconify-icon icon="fluent:book-open-24-regular"></iconify-icon> Read Online</span>
        </div>
      </div>
      <div class="book-content-wrap">
        <div class="book-meta-top">
          <span class="ss-badge ss-badge-brand" style="font-size: 0.72rem;">Identity Standard</span>
          <span class="book-size">1.4 MB &bull; PDF</span>
        </div>
        <h2 class="book-title">Logo &amp; Concept</h2>
        <p class="book-desc">
          Authoritative visual identity standard covering the SuamiSihat™ logomark, 1X exclusion space, typography scales, and multi-platform color hierarchies.
        </p>
        <div class="book-actions">
          <button class="ss-btn ss-btn-primary ss-btn-sm" onclick={(e) => { e.stopPropagation(); openBook('logo'); }}>
            <iconify-icon icon="fluent:book-open-24-regular"></iconify-icon> Read Online
          </button>
          <a href="/brand-guidelines/Brand Guideline - Logo & Concept.pdf" download class="ss-btn ss-btn-secondary ss-btn-sm" onclick={(e) => e.stopPropagation()}>
            <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Download PDF
          </a>
        </div>
      </div>
    </div>

    <!-- Book 2: Interior Design -->
    <div class="book-horizontal-card" 
         onclick={() => openBook('interior')} 
         onkeydown={(e) => e.key === 'Enter' && openBook('interior')}
         role="button" 
         tabindex="0" 
         aria-label="Open Interior Design Guideline">
      <div class="book-thumbnail-wrap">
        <img src="/brand-guidelines/cover-interior-design.png" alt="Interior Design Guideline Cover" class="book-cover-img" loading="eager" />
        <div class="book-cover-overlay">
          <span class="read-badge"><iconify-icon icon="fluent:book-open-24-regular"></iconify-icon> Read Online</span>
        </div>
      </div>
      <div class="book-content-wrap">
        <div class="book-meta-top">
          <span class="ss-badge ss-badge-success" style="font-size: 0.72rem;">Spatial Standard</span>
          <span class="book-size">3.2 MB &bull; PDF</span>
        </div>
        <h2 class="book-title">Interior Design</h2>
        <p class="book-desc">
          Official architectural and clinic interior guidelines detailing physical clinic environments, consultation suites, privacy partitions, and ambient lighting.
        </p>
        <div class="book-actions">
          <button class="ss-btn ss-btn-primary ss-btn-sm" onclick={(e) => { e.stopPropagation(); openBook('interior'); }}>
            <iconify-icon icon="fluent:book-open-24-regular"></iconify-icon> Read Online
          </button>
          <a href="/brand-guidelines/Brand Guideline - Interior Design.pdf" download class="ss-btn ss-btn-secondary ss-btn-sm" onclick={(e) => e.stopPropagation()}>
            <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Download PDF
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Interactive Modal / Fullscreen PDF Reader -->
  {#if activeBook}
    <div id="reader-screen" class="reader-modal-overlay" style="position: fixed; inset: 0; z-index: 2000; background: rgba(9, 13, 22, 0.98); display: flex; flex-direction: column;">
      <!-- Toolbar -->
      <div class="reader-toolbar" style="height: 56px; background: rgba(8, 13, 30, 0.98); border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; padding: 0 1.25rem; justify-content: space-between; gap: 1rem;">
        <!-- Left: Close & Title -->
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="ss-btn ss-btn-secondary ss-btn-sm" onclick={closeBook} style="display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; border-color: rgba(255,255,255,0.2);">
            <iconify-icon icon="fluent:chevron-left-16-regular"></iconify-icon> Shelf
          </button>
          <div class="tb-sep" style="width: 1px; height: 20px; background: rgba(255,255,255,0.15);"></div>
          
          <!-- In-Reader Doc Tabs Switcher -->
          <div class="doc-tabs" style="display: flex; gap: 6px;">
            <button class="doc-tab" class:active={activeBook === 'logo'} onclick={() => openBook('logo')} style="background: {activeBook === 'logo' ? 'rgba(33,161,247,0.2)' : 'transparent'}; border: 1px solid {activeBook === 'logo' ? '#21A1F7' : 'transparent'}; color: {activeBook === 'logo' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}; border-radius: 6px; padding: 4px 10px; font-size: 0.78rem; cursor: pointer;">
              <iconify-icon icon="fluent:document-24-regular"></iconify-icon> Logo &amp; Concept
            </button>
            <button class="doc-tab" class:active={activeBook === 'interior'} onclick={() => openBook('interior')} style="background: {activeBook === 'interior' ? 'rgba(33,161,247,0.2)' : 'transparent'}; border: 1px solid {activeBook === 'interior' ? '#21A1F7' : 'transparent'}; color: {activeBook === 'interior' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}; border-radius: 6px; padding: 4px 10px; font-size: 0.78rem; cursor: pointer;">
              <iconify-icon icon="fluent:building-24-regular"></iconify-icon> Interior Design
            </button>
          </div>
        </div>

        <!-- Right Actions: Fullscreen, Download, Dismiss -->
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <button class="ss-btn ss-btn-secondary ss-btn-sm" onclick={toggleFullscreen} title="Toggle Fullscreen" style="color: #FFFFFF; border-color: rgba(255,255,255,0.2); padding: 4px 8px;">
            <iconify-icon icon={isFullscreen ? "fluent:arrow-minimize-16-regular" : "fluent:arrow-maximize-16-regular"}></iconify-icon>
          </button>
          <a href={books[activeBook].pdf} download class="ss-btn ss-btn-primary ss-btn-sm" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
            <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Download PDF
          </a>
          <button class="ss-btn ss-btn-secondary ss-btn-sm" onclick={closeBook} aria-label="Close reader (Esc)" style="color: #FF6B6B; border-color: rgba(255,107,107,0.3); padding: 4px 8px;">
            <iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon>
          </button>
        </div>
      </div>

      <!-- PDF Frame with Loading Overlay -->
      <div style="flex: 1; width: 100%; height: calc(100% - 56px); background: #0F172A; position: relative;">
        {#if isPdfLoading}
          <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0F172A; z-index: 10; color: #FFFFFF;">
            <iconify-icon icon="fluent:spinner-ios-20-regular" style="font-size: 2.5rem; animation: spin 1s linear infinite; color: #21A1F7;"></iconify-icon>
            <p style="font-size: 0.85rem; margin-top: 1rem; color: rgba(255,255,255,0.7);">Loading {books[activeBook].title}...</p>
          </div>
        {/if}
        <iframe 
          src="{books[activeBook].pdf}#toolbar=1" 
          title={books[activeBook].title} 
          onload={() => (isPdfLoading = false)}
          style="width: 100%; height: 100%; border: none;">
        </iframe>
      </div>
    </div>
  {/if}

  <!-- Core Allocation Standard Container -->
  <div class="w-100" style="width: 100%; max-width: 100%; padding: 0 clamp(1.5rem, 4vw, 4rem); box-sizing: border-box; margin-top: 2rem;">
    <div style="background: var(--color-neutral-bg-2, #FFFFFF); border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); border-radius: var(--f-radius-xl); padding: 2.5rem; box-shadow: var(--f-shadow-4);">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <span class="ss-badge ss-badge-brand" style="font-size: 0.75rem;">CORE STANDARD</span>
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-neutral-fg-1); margin: 0;">The 60:30:10 Visual Allocation Standard</h2>
      </div>
      <p style="font-size: 0.9rem; color: var(--color-neutral-fg-2); line-height: 1.65; margin-bottom: 1.5rem;">
        Every digital and physical interface must strictly enforce the 60:30:10 color ratio to maintain clinical cleanliness and eliminate patient visual fatigue.
      </p>

      <div class="row g-3">
        <div class="col-md-4">
          <div style="padding: 1.25rem; border: 1px solid var(--color-neutral-stroke-1); border-left: 4px solid #CBD5E1; border-radius: var(--f-radius-md); background: var(--color-neutral-bg-1); height: 100%;">
            <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--color-neutral-fg-1); margin-bottom: 0.5rem;">60% Foundation Canvas</h3>
            <p style="font-size: 0.8rem; color: var(--color-neutral-fg-2); line-height: 1.5; margin: 0;">
              Canvas Light (<code>#F8FAFC</code>) and Surface White (<code>#FFFFFF</code>). Creates open breathing room, clinical hygiene, and calm readability.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div style="padding: 1.25rem; border: 1px solid var(--color-neutral-stroke-1); border-left: 4px solid #043388; border-radius: var(--f-radius-md); background: var(--color-neutral-bg-1); height: 100%;">
            <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--color-neutral-fg-1); margin-bottom: 0.5rem;">30% Structural Trust</h3>
            <p style="font-size: 0.8rem; color: var(--color-neutral-fg-2); line-height: 1.5; margin: 0;">
              Prussian Blue (<code>#022057</code>) and SS Blue (<code>#043388</code>). Organizes layout headers, navigation bars, cards, and corporate footer anchors.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div style="padding: 1.25rem; border: 1px solid var(--color-neutral-stroke-1); border-left: 4px solid #21A1F7; border-radius: var(--f-radius-md); background: var(--color-neutral-bg-1); height: 100%;">
            <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--color-neutral-fg-1); margin-bottom: 0.5rem;">10% Primary Conversion Accent</h3>
            <p style="font-size: 0.8rem; color: var(--color-neutral-fg-2); line-height: 1.5; margin: 0;">
              Azure Blue (<code>#21A1F7</code>) &amp; Banana Yellow (<code>#F7E143</code>). Strictly reserved for dominant patient conversion CTAs (e.g. &ldquo;BOOK APPOINTMENT&rdquo;).
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .book-horizontal-card {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    border-radius: var(--f-radius-xl, 16px);
    overflow: hidden;
    box-shadow: var(--f-shadow-4);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .book-horizontal-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--f-shadow-16);
    border-color: var(--color-brand-primary, #043388);
  }
  .book-thumbnail-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #022057;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .book-cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
  .book-horizontal-card:hover .book-cover-img {
    transform: scale(1.03);
  }
  .book-cover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(2, 32, 87, 0.75) 100%);
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    opacity: 0.9;
    transition: opacity 0.2s ease;
  }
  .read-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.92);
    color: #022057;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 9999px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }
  .book-content-wrap {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .book-meta-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.6rem;
  }
  .book-size {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-neutral-fg-3, #94A3B8);
  }
  .book-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-neutral-fg-1);
    margin: 0 0 0.5rem;
    letter-spacing: -0.01em;
  }
  .book-desc {
    font-size: 0.85rem;
    color: var(--color-neutral-fg-2);
    line-height: 1.6;
    margin-bottom: 1.25rem;
    flex: 1;
  }
  .book-actions {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    padding-top: 1rem;
    border-top: 1px solid var(--color-neutral-stroke-1);
  }
</style>
