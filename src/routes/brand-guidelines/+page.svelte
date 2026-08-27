<script>
  let activeBook = $state(null); // 'logo' | 'interior' | null

  const books = {
    logo: {
      title: 'Logo & Concept',
      series: 'SuamiSihat™ Design System',
      pdf: '/brand-guidelines/Brand%20Guideline%20-%20Logo%20%26%20Concept.pdf',
      img: '/brand-guidelines/SS Health Primary.png',
      size: '1.4 MB'
    },
    interior: {
      title: 'Interior Design',
      series: 'SuamiSihat™ Clinic Standard',
      pdf: '/brand-guidelines/Brand%20Guideline%20-%20Interior%20Design.pdf',
      img: '/brand-guidelines/interior-guidelines-cover.png',
      size: '3.2 MB'
    }
  };

  function openBook(key) {
    activeBook = key;
  }

  function closeBook() {
    activeBook = null;
  }
</script>

<svelte:head>
  <title>Brand Guidelines — SuamiSihat™ Design System</title>
</svelte:head>

<div class="guidelines-page" style="min-height: calc(100vh - 60px); background: var(--color-neutral-bg-1, #F8FAFC); padding-bottom: 4rem;">
  <!-- Breadcrumb & Header -->
  <div class="selection-hero container pt-5 text-center">
    <p class="selection-eyebrow" style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #21A1F7; margin-bottom: 0.5rem;">
      <iconify-icon icon="fluent:book-open-24-regular" style="vertical-align: middle;"></iconify-icon> Official Brand Guidelines
    </p>
    <h1 class="selection-title" style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; color: var(--color-neutral-fg-1, #022057); margin-bottom: 0.75rem;">
      Choose a Guideline to Read
    </h1>
    <p class="selection-subtitle" style="font-size: 1rem; color: var(--color-neutral-fg-2, #64748B); max-width: 540px; margin: 0 auto 2.5rem;">
      Our official brand guideline booklets presented in an interactive reading view. Select a document below or read online.
    </p>
  </div>

  <!-- 3D Book Covers Grid -->
  <div class="covers-grid" style="display: flex; justify-content: center; gap: 3rem; padding: 1rem 1.5rem 3.5rem; flex-wrap: wrap;">
    <!-- Book 1: Logo & Concept -->
    <div class="book-cover-card" 
         onclick={() => openBook('logo')} 
         onkeydown={(e) => e.key === 'Enter' && openBook('logo')}
         role="button" 
         tabindex="0" 
         aria-label="Open Logo & Concept Guideline"
         style="width: 290px; cursor: pointer; transition: transform 0.4s ease;">
      <div class="book-cover-inner" style="border-radius: 4px 10px 10px 4px; overflow: hidden; height: 420px; display: flex; flex-direction: column; box-shadow: -4px 0 10px rgba(0,0,0,0.2), 4px 8px 24px rgba(0,0,0,0.15); background: #022057;">
        <div class="cover-image-area" style="flex: 1; position: relative; overflow: hidden; background: #090D16;">
          <img src="/brand-guidelines/SS Health Primary.png" alt="Logo & Concept Cover" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div class="cover-info" style="background: #022057; padding: 1.25rem 1.25rem 1rem; flex-shrink: 0;">
          <p style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #6DC6EC; margin-bottom: 0.25rem;">SuamiSihat™ Design System</p>
          <h2 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.75rem;">Logo &amp; Concept</h2>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.72rem; color: rgba(255,255,255,0.6);">1.4 MB &bull; PDF</span>
            <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 600; color: #FFFFFF; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 9999px; padding: 4px 12px;">
              <iconify-icon icon="fluent:book-open-24-regular"></iconify-icon> Read
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Book 2: Interior Design -->
    <div class="book-cover-card" 
         onclick={() => openBook('interior')} 
         onkeydown={(e) => e.key === 'Enter' && openBook('interior')}
         role="button" 
         tabindex="0" 
         aria-label="Open Interior Design Guideline"
         style="width: 290px; cursor: pointer; transition: transform 0.4s ease;">
      <div class="book-cover-inner" style="border-radius: 4px 10px 10px 4px; overflow: hidden; height: 420px; display: flex; flex-direction: column; box-shadow: -4px 0 10px rgba(0,0,0,0.2), 4px 8px 24px rgba(0,0,0,0.15); background: #022057;">
        <div class="cover-image-area" style="flex: 1; position: relative; overflow: hidden; background: #090D16;">
          <img src="/brand-guidelines/interior-guidelines-cover.png" alt="Interior Design Cover" style="width: 100%; height: 100%; object-fit: cover;" onerror={(e) => { e.currentTarget.src = '/brand-guidelines/SS Health Primary.png'; }} />
        </div>
        <div class="cover-info" style="background: #022057; padding: 1.25rem 1.25rem 1rem; flex-shrink: 0;">
          <p style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #6DC6EC; margin-bottom: 0.25rem;">SuamiSihat™ Clinic Standard</p>
          <h2 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.75rem;">Interior Design</h2>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.72rem; color: rgba(255,255,255,0.6);">3.2 MB &bull; PDF</span>
            <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 600; color: #FFFFFF; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 9999px; padding: 4px 12px;">
              <iconify-icon icon="fluent:book-open-24-regular"></iconify-icon> Read
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Interactive Modal / Fullscreen PDF Reader -->
  {#if activeBook}
    <div class="reader-modal-overlay" style="position: fixed; inset: 0; z-index: 1050; background: rgba(9, 13, 22, 0.95); display: flex; flex-direction: column;">
      <!-- Toolbar -->
      <div class="reader-toolbar" style="height: 56px; background: rgba(8, 13, 30, 0.98); border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; padding: 0 1.5rem; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="btn btn-sm btn-outline-light" onclick={closeBook} style="display: inline-flex; align-items: center; gap: 6px;">
            <iconify-icon icon="fluent:chevron-left-16-regular"></iconify-icon> Return to Shelf
          </button>
          <span style="font-weight: 700; color: #FFFFFF; font-size: 0.95rem;">{books[activeBook].title}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <a href={books[activeBook].pdf} download class="btn btn-sm btn-primary" style="display: inline-flex; align-items: center; gap: 6px;">
            <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Download PDF
          </a>
          <button class="btn btn-sm btn-outline-danger" onclick={closeBook} aria-label="Close reader">
            <iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon>
          </button>
        </div>
      </div>

      <!-- PDF Frame -->
      <div style="flex: 1; width: 100%; height: calc(100% - 56px); background: #1E293B;">
        <iframe src={books[activeBook].pdf} title={books[activeBook].title} style="width: 100%; height: 100%; border: none;"></iframe>
      </div>
    </div>
  {/if}

  <!-- Core Allocation Standard Container -->
  <div class="container" style="max-width: 1000px; margin-top: 2rem;">
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
              Azure Blue (<code>#21A1F7</code>) &amp; Banana Yellow (<code>#F7E143</code>). Strictly reserved for dominant patient conversion CTAs (e.g. "BOOK APPOINTMENT").
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
