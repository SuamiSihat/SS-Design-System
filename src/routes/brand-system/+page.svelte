<script>
  import ColorSwatch from '$lib/components/ColorSwatch.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';

  let activeTab = $state('colors');
</script>

<svelte:head>
  <title>Design Tokens & System — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Design Tokens</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">W3C Token Architecture</div>
    <h1 class="display-6 fw-bold mb-2">Design Tokens & Fluent 2 Variables</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      Cross-platform tokens for Web, Expo, Flutter, and Windows WPF (SS-CAM). Standardized for color, typography, elevation, and motion.
    </p>

    <!-- Filter Tabs -->
    <div class="d-flex gap-2 mt-4 flex-wrap">
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'colors'}
        class:btn-outline-secondary={activeTab !== 'colors'}
        onclick={() => (activeTab = 'colors')}
      >
        Colors & Palettes
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'typography'}
        class:btn-outline-secondary={activeTab !== 'typography'}
        onclick={() => (activeTab = 'typography')}
      >
        Typography Scale
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'elevation'}
        class:btn-outline-secondary={activeTab !== 'elevation'}
        onclick={() => (activeTab = 'elevation')}
      >
        Elevation & Shadows
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'export'}
        class:btn-outline-secondary={activeTab !== 'export'}
        onclick={() => (activeTab = 'export')}
      >
        Token Exports (JSON/CSS)
      </button>
    </div>
  </div>

  <!-- TAB: COLORS -->
  {#if activeTab === 'colors'}
    <section class="mb-5">
      <h3 class="h5 fw-bold mb-3">1. Brand & Structural Core</h3>
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <ColorSwatch name="Prussian Blue" hex="#022057" role="Primary Anchor / Header" allocation="30%" />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="SuamiSihat Blue" hex="#043388" role="Primary Brand Action" allocation="30%" />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Azure Blue" hex="#21A1F7" role="10% Primary Conversion CTA" allocation="10%" />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Banana Yellow" hex="#F7E143" role="10% Vitality Energy" allocation="10%" isDarkText={true} />
        </div>
      </div>

      <h3 class="h5 fw-bold mb-3">2. Neutral & Canvas Scales</h3>
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <ColorSwatch name="Neutral Black" hex="#1C1C1C" role="Primary Text Standard" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Neutral Grey" hex="#64748B" role="Secondary Text & Captions" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Canvas Light" hex="#F8FAFC" role="Clinical Page Canvas" allocation="60%" isDarkText={true} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Pure White" hex="#FFFFFF" role="Surface / Card Elevation" allocation="60%" isDarkText={true} />
        </div>
      </div>

      <h3 class="h5 fw-bold mb-3">3. Medical & Status Semantics</h3>
      <div class="row g-3">
        <div class="col-6 col-md-3">
          <ColorSwatch name="Success Green" hex="#10B981" role="Confirmed / Available / AAA" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Warning Amber" hex="#F59E0B" role="Attention / Pending Review" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Danger Red" hex="#EF4444" role="Critical / Contraindication" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Info Sky" hex="#0284C7" role="Informational Patient Note" isDarkText={false} />
        </div>
      </div>
    </section>
  {/if}

  <!-- TAB: TYPOGRAPHY -->
  {#if activeTab === 'typography'}
    <section class="mb-5">
      <div class="card p-4 p-md-5 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
        <h3 class="h5 fw-bold mb-4">Fluent 2 Modular Typography Scale</h3>
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr class="text-secondary" style="font-size: 0.8rem; text-transform: uppercase;">
                <th>Token</th>
                <th>Size / Weight</th>
                <th>Line Height</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--f-font-display</code></td>
                <td>48px / Bold (700)</td>
                <td>1.15</td>
                <td><span style="font-size: 2rem; font-weight: 700; color: #1C1C1C;">Display Hero</span></td>
              </tr>
              <tr>
                <td><code>--f-font-title-1</code></td>
                <td>32px / Bold (700)</td>
                <td>1.2</td>
                <td><span style="font-size: 1.5rem; font-weight: 700; color: #1C1C1C;">Section Title 1</span></td>
              </tr>
              <tr>
                <td><code>--f-font-title-2</code></td>
                <td>24px / SemiBold (600)</td>
                <td>1.25</td>
                <td><span style="font-size: 1.25rem; font-weight: 600; color: #1C1C1C;">Card Heading 2</span></td>
              </tr>
              <tr>
                <td><code>--f-font-body-1</code></td>
                <td>16px / Regular (400)</td>
                <td>1.5</td>
                <td><span style="font-size: 1rem; color: #1C1C1C;">Standard clinical body copy and descriptions.</span></td>
              </tr>
              <tr>
                <td><code>--f-font-caption</code></td>
                <td>12px / Regular (400)</td>
                <td>1.4</td>
                <td><span style="font-size: 0.75rem; color: #64748B;">Helper text, metadata badges and timestamps.</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  {/if}

  <!-- TAB: ELEVATION -->
  {#if activeTab === 'elevation'}
    <section class="mb-5">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="p-4 rounded-4 text-center bg-white" style="box-shadow: var(--f-shadow-2, 0 1px 2px rgba(0,0,0,0.06)); border: 1px solid #E2E8F0;">
            <div class="fw-bold mb-1">Elevation 2</div>
            <code class="text-muted" style="font-size: 0.75rem;">--f-shadow-2</code>
            <p class="mt-2 text-secondary" style="font-size: 0.8rem;">Resting cards & list items</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-4 text-center bg-white" style="box-shadow: var(--f-shadow-8, 0 4px 14px rgba(0,0,0,0.08)); border: 1px solid #E2E8F0;">
            <div class="fw-bold mb-1">Elevation 8</div>
            <code class="text-muted" style="font-size: 0.75rem;">--f-shadow-8</code>
            <p class="mt-2 text-secondary" style="font-size: 0.8rem;">Sticky navbars & hover states</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-4 text-center bg-white" style="box-shadow: var(--f-shadow-28, 0 14px 28px rgba(0,0,0,0.12)); border: 1px solid #E2E8F0;">
            <div class="fw-bold mb-1">Elevation 28</div>
            <code class="text-muted" style="font-size: 0.75rem;">--f-shadow-28</code>
            <p class="mt-2 text-secondary" style="font-size: 0.8rem;">Modals, flyouts & dropdowns</p>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- TAB: EXPORTS -->
  {#if activeTab === 'export'}
    <section class="mb-5">
      <div class="card p-4 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
        <h4 class="fw-bold mb-2">Raw W3C Tokens JSON</h4>
        <p class="text-secondary mb-3" style="font-size: 0.85rem;">
          Directly consumable by Style Dictionary, Expo / React Native, Flutter, and WPF build tools.
        </p>
        <a href="/assets/tokens/tokens.json" target="_blank" class="btn btn-outline-primary btn-sm rounded-pill px-3 align-self-start mb-3">
          <iconify-icon icon="lucide:download" width="14"></iconify-icon> Open /assets/tokens/tokens.json
        </a>
        <CodeBox 
          title="Sample tokens.json snippet"
          language="json"
          code={`{
  "color": {
    "brand": {
      "primary": { "value": "#022057", "type": "color" },
      "secondary": { "value": "#043388", "type": "color" },
      "accent": { "value": "#21A1F7", "type": "color" },
      "vitality": { "value": "#F7E143", "type": "color" }
    },
    "neutral": {
      "black": { "value": "#1C1C1C", "type": "color" },
      "canvas": { "value": "#F8FAFC", "type": "color" }
    }
  }
}`}
        />
      </div>
    </section>
  {/if}

</div>
