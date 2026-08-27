<script>
  import ColorSwatch from '$lib/components/ColorSwatch.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';
</script>

<svelte:head>
  <title>Brand Guidelines — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Page Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Brand Guidelines</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Official Governance</div>
    <h1 class="display-6 fw-bold mb-2">SuamiSihat™ Brand Guidelines</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      The core standards governing visual hierarchy, typography neutrality, logo pairing, and medical copywriting across all patient touchpoints.
    </p>
  </div>

  <!-- Guideline 1: 60:30:10 Allocation -->
  <div class="card p-4 p-md-5 border rounded-4 shadow-sm mb-5" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center gap-2 mb-3">
      <span class="badge bg-primary px-3 py-2 rounded-pill">RULE 1</span>
      <h2 class="h4 fw-bold mb-0">The 60:30:10 Visual Allocation Standard</h2>
    </div>
    <p class="text-secondary mb-4">
      Every digital and physical interface must strictly enforce the 60:30:10 color ratio to maintain clinical cleanliness and eliminate patient visual fatigue.
    </p>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="p-3 border rounded-3 h-100" style="background: #F8FAFC; border-left: 4px solid #CBD5E1 !important;">
          <h5 class="fw-bold" style="color: #022057;">60% Foundation Canvas</h5>
          <p class="text-secondary mb-2" style="font-size: 0.85rem;">
            Canvas Light (<code>#F8FAFC</code>) and Surface White (<code>#FFFFFF</code>). Creates open breathing room, clinical hygiene, and calm readability.
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 border rounded-3 h-100" style="background: #EBF5FE; border-left: 4px solid #043388 !important;">
          <h5 class="fw-bold" style="color: #022057;">30% Structural Trust</h5>
          <p class="text-secondary mb-2" style="font-size: 0.85rem;">
            Prussian Blue (<code>#022057</code>) and SS Blue (<code>#043388</code>). Organizes layout headers, navigation bars, cards, and corporate footer anchors.
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 border rounded-3 h-100" style="background: #FEF9C3; border-left: 4px solid #21A1F7 !important;">
          <h5 class="fw-bold" style="color: #022057;">10% Primary Conversion Accent</h5>
          <p class="text-secondary mb-2" style="font-size: 0.85rem;">
            Azure Blue (<code>#21A1F7</code>) & Banana Yellow (<code>#F7E143</code>). Strictly reserved for dominant patient conversion CTAs (e.g. "BOOK APPOINTMENT").
          </p>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-6 col-md-3">
        <ColorSwatch name="Canvas Light" hex="#F8FAFC" role="60% Background" allocation="60%" isDarkText={true} />
      </div>
      <div class="col-6 col-md-3">
        <ColorSwatch name="Prussian Blue" hex="#022057" role="30% Layout Structure" allocation="30%" />
      </div>
      <div class="col-6 col-md-3">
        <ColorSwatch name="SuamiSihat Blue" hex="#043388" role="30% Primary Brand" allocation="30%" />
      </div>
      <div class="col-6 col-md-3">
        <ColorSwatch name="Azure Blue" hex="#21A1F7" role="10% Primary Conversion" allocation="10%" />
      </div>
    </div>
  </div>

  <!-- Guideline 2: Neutral Typography -->
  <div class="card p-4 p-md-5 border rounded-4 shadow-sm mb-5" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center gap-2 mb-3">
      <span class="badge bg-primary px-3 py-2 rounded-pill">RULE 2</span>
      <h2 class="h4 fw-bold mb-0">Strict Neutral Typography Standard (#1C1C1C)</h2>
    </div>
    <p class="text-secondary mb-3">
      Body text, labels, and headings on light backgrounds must <strong>strictly use Neutral Black (<code>#1C1C1C</code>)</strong>. Pure black (<code>#000000</code>) causes excessive contrast vibration on high-DPI displays and is strictly prohibited for typography.
    </p>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <div class="p-3 rounded-3" style="background: #ECFDF5; border: 1px solid #10B981;">
          <div class="fw-bold text-success mb-1">✅ CORRECT</div>
          <code style="color: #065F46;">color: #1C1C1C; /* var(--ss-neutral-black) */</code>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-3 rounded-3" style="background: #FEF2F2; border: 1px solid #EF4444;">
          <div class="fw-bold text-danger mb-1">❌ PROHIBITED</div>
          <code style="color: #991B1B;">color: #000000; /* Causes harsh ocular glare */</code>
        </div>
      </div>
    </div>

    <CodeBox 
      title="CSS Typography Token Standard"
      code={`body, h1, h2, h3, h4, h5, h6, p, label, .f-text {
  color: var(--color-neutral-fg-1, #1C1C1C);
  font-family: var(--f-font-family-base, 'Inter', -apple-system, sans-serif);
}`}
    />
  </div>

  <!-- Guideline 3: Elimination of CTA Competition -->
  <div class="card p-4 p-md-5 border rounded-4 shadow-sm mb-5" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center gap-2 mb-3">
      <span class="badge bg-primary px-3 py-2 rounded-pill">RULE 3</span>
      <h2 class="h4 fw-bold mb-0">Elimination of CTA Competition</h2>
    </div>
    <p class="text-secondary mb-3">
      Secondary cards, filter pills, and navigation links must never use solid high-chroma accent fills. Only the single primary patient intent on a page receives the vibrant <strong>10% Accent CTA</strong>.
    </p>
    <div class="p-3 rounded-3" style="background: #F8FAFC; border: 1px solid #CBD5E1;">
      <div class="d-flex align-items-center gap-3 flex-wrap">
        <button class="btn" style="background: #21A1F7; color: #022057; font-weight: 700; border-radius: 8px;">
          Primary CTA: BOOK APPOINTMENT
        </button>
        <button class="btn btn-outline-secondary" style="font-weight: 600; border-radius: 8px;">
          Secondary: Learn More
        </button>
        <span class="text-muted" style="font-size: 0.85rem;">← Clear visual hierarchy without button collision</span>
      </div>
    </div>
  </div>

  <!-- Guideline 4: Downloads & Booklets -->
  <div class="card p-4 p-md-5 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
      <div>
        <h2 class="h4 fw-bold mb-1">Official Brand Manuals & Documentation</h2>
        <p class="text-secondary mb-0">Download full PDF documentation or view the strategic roadmap.</p>
      </div>
      <a href="/public/brand/downloads/" class="btn btn-primary rounded-pill px-4">
        <iconify-icon icon="lucide:download" width="16"></iconify-icon> Brand Asset Kit
      </a>
    </div>

    <div class="row g-3">
      <div class="col-md-6">
        <div class="p-3 border rounded-3 d-flex align-items-center justify-content-between">
          <div>
            <div class="fw-bold">Brand Voice & Copywriting Guide</div>
            <div class="text-muted" style="font-size: 0.8rem;">Clinical authority, discretion, tone</div>
          </div>
          <a href="/doc/?doc=brand-voice" class="btn btn-sm btn-outline-primary">Read Doc</a>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-3 border rounded-3 d-flex align-items-center justify-content-between">
          <div>
            <div class="fw-bold">Design System Roadmap (2026)</div>
            <div class="text-muted" style="font-size: 0.8rem;">Milestones, platform adapters & tokens</div>
          </div>
          <a href="/doc/?doc=roadmap" class="btn btn-sm btn-outline-primary">Read Doc</a>
        </div>
      </div>
    </div>
  </div>

</div>
