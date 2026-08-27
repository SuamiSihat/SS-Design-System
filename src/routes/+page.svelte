<script>
  import SSHero from '$lib/components/SSHero.svelte';
  import { theme } from '$lib/stores/theme.js';

  let isDarkMode = $derived($theme === 'dark');

  // 1. Interactive Component Workbench State
  let btnVariant = $state('primary'); // 'primary' | 'secondary' | 'outline' | 'subtle'
  let btnSize = $state('md'); // 'sm' | 'md' | 'lg'
  let isToggleActive = $state(true);
  let clickCounter = $state(0);
  let sampleInput = $state('SS Clinic KL Gateway');
  let activeCodeTab = $state('web'); // 'web' | 'flutter' | 'tailwind' | 'token'
  let copyFeedback = $state('');

  // 2. Interactive Typography Scale Tester
  let customTypePhrase = $state('Clinical Precision. Human-First Design.');
  let activeTypeLevel = $state('title'); // 'display' | 'title' | 'body' | 'caption'

  // 3. Interactive Color Swatch State
  let activeSwatchHex = $state('#043388');
  let activeSwatchName = $state('SS Blue');

  // Copy helper
  function copyToClipboard(text, message) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      copyFeedback = message || `Copied ${text}!`;
      setTimeout(() => { copyFeedback = ''; }, 2200);
    }
  }

  function selectSwatch(hex, name) {
    activeSwatchHex = hex;
    activeSwatchName = name;
    copyToClipboard(hex, `Copied ${name} (${hex}) to clipboard!`);
  }

  // Dynamic code snippet generator
  let generatedCode = $derived(() => {
    if (activeCodeTab === 'web') {
      return `<button class="ss-btn ss-btn-${btnVariant} ss-btn-${btnSize}">\n  <span>Action (${clickCounter})</span>\n</button>`;
    } else if (activeCodeTab === 'flutter') {
      return `SSButton.${btnVariant}(\n  text: 'Action (${clickCounter})',\n  size: SSButtonSize.${btnSize},\n  onPressed: () {},\n);`;
    } else if (activeCodeTab === 'tailwind') {
      const bgMap = { primary: 'bg-[#043388] text-white hover:bg-[#022057]', secondary: 'bg-[#21A1F7] text-white', outline: 'border border-[#043388] text-[#043388]', subtle: 'bg-black/5 text-[#19191A]' };
      return `<button class="${bgMap[btnVariant]} px-4 py-2 rounded-xl font-medium transition-all">\n  Action (${clickCounter})\n</button>`;
    } else {
      return `{\n  "color": "var(--color-brand-${btnVariant === 'primary' ? 'primary' : 'light'})",\n  "radius": "var(--f-radius-md)",\n  "elevation": "var(--f-shadow-4)"\n}`;
    }
  });
</script>

<svelte:head>
  <title>SuamiSihat™ Design System — Single Source of Truth</title>
</svelte:head>

<!-- Global Toast Notification for One-Click Copied Actions -->
{#if copyFeedback}
  <div class="f-live-toast" role="status" aria-live="polite">
    <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-toast-icon"></iconify-icon>
    <span>{copyFeedback}</span>
  </div>
{/if}

<!-- ================================================================
     1. Master Hero Section (ss-hero Component Standard)
     ================================================================ -->
<SSHero
  eyebrow="<iconify-icon icon='fluent:gender-male-24-regular' style='font-size: 1.15rem; color: #6DC6EC; vertical-align: middle;' aria-hidden='true'></iconify-icon> <span>SuamiSihat™ Design System &bull; v3.5</span>"
  title="One source. Every standard.<br>Ship with confidence."
  subtitle="The authoritative single source of truth for brand tokens, Fluent 2 components, guidelines, and subsidiary standards."
  minHeight="520px"
>
  <div class="f-hero-ctas">
    <a href="/brand-system/" class="f-btn-hero-primary" id="hero-cta-brand">
      <iconify-icon icon="fluent:color-24-regular" aria-hidden="true"></iconify-icon>
      Explore Brand System
    </a>
    <a href="/components/" class="f-btn-hero-secondary" id="hero-cta-components">
      <iconify-icon icon="fluent:puzzle-piece-24-regular" aria-hidden="true"></iconify-icon>
      UI Components
    </a>
  </div>

  <!-- Minimal Glass Trust Badges -->
  <div class="f-hero-badges">
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:checkmark-circle-24-regular" aria-hidden="true"></iconify-icon> Official Assets
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:layer-24-regular" aria-hidden="true"></iconify-icon> Fluent 2 Tokens
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:accessibility-24-regular" aria-hidden="true"></iconify-icon> WCAG AA Compliant
    </span>
  </div>
</SSHero>

<main id="main-content">
  <!-- ================================================================
       2. Section: Brand Foundation & Interactive Color Studio
       ================================================================ -->
  <section id="explore" class="f-section-block" aria-label="Brand Foundation">
    <div class="f-section-head">
      <div class="f-badge-inline"><iconify-icon icon="fluent:color-16-regular"></iconify-icon> Design Foundation</div>
      <h2 class="f-section-title">Visual Identity &amp; Color Tokens</h2>
      <p class="f-section-subtitle">Click any swatch to copy its HEX token and inspect surface contrast in real-time.</p>
    </div>

    <!-- Interactive Palette Bar -->
    <div class="f-interactive-palette-box">
      <div class="f-palette-swatches">
        <button 
          type="button" 
          class="f-palette-btn {activeSwatchHex === '#043388' ? 'selected' : ''}" 
          style="--swatch-bg: #043388;" 
          onclick={() => selectSwatch('#043388', 'SS Blue')}
          title="Click to copy SS Blue (#043388)"
        >
          <span class="f-swatch-label">SS Blue</span>
          <span class="f-swatch-code">#043388</span>
        </button>

        <button 
          type="button" 
          class="f-palette-btn {activeSwatchHex === '#022057' ? 'selected' : ''}" 
          style="--swatch-bg: #022057;" 
          onclick={() => selectSwatch('#022057', 'Prussian Blue')}
          title="Click to copy Prussian Blue (#022057)"
        >
          <span class="f-swatch-label">Prussian</span>
          <span class="f-swatch-code">#022057</span>
        </button>

        <button 
          type="button" 
          class="f-palette-btn {activeSwatchHex === '#21A1F7' ? 'selected' : ''}" 
          style="--swatch-bg: #21A1F7;" 
          onclick={() => selectSwatch('#21A1F7', 'Azure')}
          title="Click to copy Azure (#21A1F7)"
        >
          <span class="f-swatch-label">Azure</span>
          <span class="f-swatch-code">#21A1F7</span>
        </button>

        <button 
          type="button" 
          class="f-palette-btn {activeSwatchHex === '#6DC6EC' ? 'selected' : ''}" 
          style="--swatch-bg: #6DC6EC; color: #19191A;" 
          onclick={() => selectSwatch('#6DC6EC', 'Malibu')}
          title="Click to copy Malibu (#6DC6EC)"
        >
          <span class="f-swatch-label" style="color:#19191A;">Malibu</span>
          <span class="f-swatch-code" style="color:rgba(25,25,26,0.7);">#6DC6EC</span>
        </button>

        <button 
          type="button" 
          class="f-palette-btn {activeSwatchHex === '#FCE53D' ? 'selected' : ''}" 
          style="--swatch-bg: #FCE53D; color: #19191A;" 
          onclick={() => selectSwatch('#FCE53D', 'Banana Yellow')}
          title="Click to copy Banana Yellow (#FCE53D)"
        >
          <span class="f-swatch-label" style="color:#19191A;">Banana</span>
          <span class="f-swatch-code" style="color:rgba(25,25,26,0.7);">#FCE53D</span>
        </button>

        <button 
          type="button" 
          class="f-palette-btn {activeSwatchHex === '#FCFAF6' ? 'selected' : ''}" 
          style="--swatch-bg: #FCFAF6; color: #19191A; border: 1px solid rgba(0,0,0,0.12);" 
          onclick={() => selectSwatch('#FCFAF6', 'Porcelain')}
          title="Click to copy Porcelain (#FCFAF6)"
        >
          <span class="f-swatch-label" style="color:#19191A;">Porcelain</span>
          <span class="f-swatch-code" style="color:rgba(25,25,26,0.7);">#FCFAF6</span>
        </button>
      </div>

      <!-- Live Contrast Indicator -->
      <div class="f-palette-inspector">
        <div class="f-inspector-chip" style="background: {activeSwatchHex}; color: {activeSwatchHex === '#FCE53D' || activeSwatchHex === '#6DC6EC' || activeSwatchHex === '#FCFAF6' ? '#19191A' : '#FFFFFF'};">
          <span class="f-inspector-name">{activeSwatchName} Active</span>
          <button type="button" class="f-inspector-copy-btn" onclick={() => copyToClipboard(activeSwatchHex, `Copied ${activeSwatchHex}!`)}>
            <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy HEX
          </button>
        </div>
        <span class="f-inspector-hint">60:30:10 Brand Harmony Compliant &bull; WCAG 2.1 Pass</span>
      </div>
    </div>

    <!-- Foundation 3-Card Grid -->
    <div class="f-foundation-grid">
      <!-- 1 · Brand System -->
      <a href="/brand-system/" class="f-card-foundation f-card-blue f-animate-up f-delay-1" id="card-brand-system" aria-label="Open Brand System">
        <div class="f-card-top">
          <div class="f-card-icon"><iconify-icon icon="fluent:color-24-regular" aria-hidden="true"></iconify-icon></div>
          <span class="f-badge f-badge-core">Core Standard</span>
        </div>
        <div class="f-card-content">
          <h3 class="f-card-title">Brand System &amp; Tokens</h3>
          <p class="f-card-desc">Typography scales, full color palettes, vector logos, and Figma asset exports.</p>
        </div>
        <div class="f-card-action">
          <span>Explore System</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon>
        </div>
      </a>

      <!-- 2 · Brand Guidelines -->
      <a href="/brand-guidelines/" class="f-card-foundation f-card-teal f-animate-up f-delay-2" id="card-guidelines" aria-label="View Brand Guidelines">
        <div class="f-card-top">
          <div class="f-card-icon"><iconify-icon icon="fluent:book-open-24-regular" aria-hidden="true"></iconify-icon></div>
          <span class="f-badge">Manuals</span>
        </div>
        <div class="f-card-content">
          <h3 class="f-card-title">Brand Guidelines</h3>
          <p class="f-card-desc">Interactive PDF booklets for Logo &amp; Concept and Interior Architecture standards.</p>
        </div>
        <div class="f-card-action">
          <span>Read Manuals</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon>
        </div>
      </a>

      <!-- 3 · Products -->
      <a href="/products/" class="f-card-foundation f-card-warm f-animate-up f-delay-3" id="card-products" aria-label="Browse Product Catalogue">
        <div class="f-card-top">
          <div class="f-card-icon"><iconify-icon icon="fluent:cube-multiple-24-regular" aria-hidden="true"></iconify-icon></div>
          <span class="f-badge f-badge-warning">Products</span>
        </div>
        <div class="f-card-content">
          <h3 class="f-card-title">Product Catalogue</h3>
          <p class="f-card-desc">Comprehensive brand registry for Androlab, MENSS, Mensculine, and Rejal.</p>
        </div>
        <div class="f-card-action">
          <span>Browse Products</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon>
        </div>
      </a>
    </div>
  </section>

  <!-- ================================================================
       3. Section: Interactive Living Component Sandbox (Workbench)
       ================================================================ -->
  <section id="components-stage" class="f-section-block" aria-label="Component Engineering">
    <div class="f-section-head">
      <div class="f-badge-inline"><iconify-icon icon="fluent:puzzle-piece-16-regular"></iconify-icon> Living Component Sandbox</div>
      <h2 class="f-section-title">Interactive Component Workbench</h2>
      <p class="f-section-subtitle">Customize button states, test live toggles, and copy production-ready multi-platform code snippets.</p>
    </div>

    <div class="f-workbench-card">
      <div class="f-workbench-grid">
        <!-- Interactive Stage Left -->
        <div class="f-stage-pane">
          <!-- Variant & Size Controls -->
          <div class="f-stage-controls">
            <div class="f-control-group">
              <span class="f-control-label">Variant</span>
              <div class="f-control-pills">
                <button type="button" class="f-pill-opt {btnVariant === 'primary' ? 'active' : ''}" onclick={() => btnVariant = 'primary'}>Primary</button>
                <button type="button" class="f-pill-opt {btnVariant === 'secondary' ? 'active' : ''}" onclick={() => btnVariant = 'secondary'}>Secondary</button>
                <button type="button" class="f-pill-opt {btnVariant === 'outline' ? 'active' : ''}" onclick={() => btnVariant = 'outline'}>Outline</button>
                <button type="button" class="f-pill-opt {btnVariant === 'subtle' ? 'active' : ''}" onclick={() => btnVariant = 'subtle'}>Subtle</button>
              </div>
            </div>

            <div class="f-control-group">
              <span class="f-control-label">Size</span>
              <div class="f-control-pills">
                <button type="button" class="f-pill-opt {btnSize === 'sm' ? 'active' : ''}" onclick={() => btnSize = 'sm'}>SM</button>
                <button type="button" class="f-pill-opt {btnSize === 'md' ? 'active' : ''}" onclick={() => btnSize = 'md'}>MD</button>
                <button type="button" class="f-pill-opt {btnSize === 'lg' ? 'active' : ''}" onclick={() => btnSize = 'lg'}>LG</button>
              </div>
            </div>
          </div>

          <!-- Live Interactive Element Stage -->
          <div class="f-interactive-canvas">
            <!-- Dynamic Button with Click Counter -->
            <button 
              type="button" 
              class="f-workbench-btn f-btn-{btnVariant} f-size-{btnSize}"
              onclick={() => { clickCounter++; copyFeedback = `Button clicked! (Count: ${clickCounter})`; setTimeout(() => { copyFeedback = ''; }, 1500); }}
            >
              <iconify-icon icon="fluent:flash-24-regular"></iconify-icon>
              <span>Click Me ({clickCounter})</span>
            </button>

            <!-- Dynamic Toggle Switch -->
            <div class="f-workbench-switch-wrap" onclick={() => isToggleActive = !isToggleActive}>
              <div class="f-workbench-switch {isToggleActive ? 'on' : ''}">
                <span class="f-workbench-thumb"></span>
              </div>
              <span class="f-workbench-switch-label">{isToggleActive ? 'Notifications Enabled' : 'Muted'}</span>
            </div>

            <!-- Dynamic Input Preview -->
            <div class="f-workbench-input-wrap">
              <iconify-icon icon="fluent:location-20-regular" class="f-input-icon"></iconify-icon>
              <input type="text" class="f-workbench-input" bind:value={sampleInput} placeholder="Type unit name..." />
            </div>
          </div>

          <!-- Code Snippet Switcher Tabs -->
          <div class="f-code-box-wrapper">
            <div class="f-code-bar">
              <div class="f-code-tabs">
                <button type="button" class="f-code-tab {activeCodeTab === 'web' ? 'active' : ''}" onclick={() => activeCodeTab = 'web'}>Web (CSS)</button>
                <button type="button" class="f-code-tab {activeCodeTab === 'flutter' ? 'active' : ''}" onclick={() => activeCodeTab = 'flutter'}>Flutter</button>
                <button type="button" class="f-code-tab {activeCodeTab === 'tailwind' ? 'active' : ''}" onclick={() => activeCodeTab = 'tailwind'}>Tailwind</button>
                <button type="button" class="f-code-tab {activeCodeTab === 'token' ? 'active' : ''}" onclick={() => activeCodeTab = 'token'}>Design Tokens</button>
              </div>
              <button type="button" class="f-code-copy-btn" onclick={() => copyToClipboard(generatedCode(), 'Code snippet copied!')}>
                <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy Snippet
              </button>
            </div>
            <pre class="f-code-pre"><code>{generatedCode()}</code></pre>
          </div>
        </div>

        <!-- Component Quick Navigation Right -->
        <div class="f-info-pane">
          <h3 class="f-info-title">Living Component Registry</h3>
          <p class="f-info-lead">
            Over 24 foundational UI components built for Fluent 2 spatial aesthetics, full keyboard accessibility, and zero runtime bloat.
          </p>

          <div class="f-quick-jump-grid">
            <a href="/components/#buttons" class="f-jump-item"><iconify-icon icon="fluent:cursor-click-20-regular"></iconify-icon> Buttons</a>
            <a href="/components/#badges" class="f-jump-item"><iconify-icon icon="fluent:tag-20-regular"></iconify-icon> Badges &amp; Tags</a>
            <a href="/components/#cards" class="f-jump-item"><iconify-icon icon="fluent:card-ui-20-regular"></iconify-icon> Surface Cards</a>
            <a href="/components/#inputs" class="f-jump-item"><iconify-icon icon="fluent:textbox-20-regular"></iconify-icon> Form Inputs</a>
            <a href="/components/#motion" class="f-jump-item"><iconify-icon icon="fluent:play-20-regular"></iconify-icon> Motion &amp; Wave</a>
            <a href="/components/#flutter" class="f-jump-item"><iconify-icon icon="fluent:phone-20-regular"></iconify-icon> Flutter Spec</a>
          </div>

          <div class="f-info-footer">
            <a href="/components/" class="f-btn-hero-primary" id="card-components">
              <iconify-icon icon="fluent:puzzle-piece-24-regular"></iconify-icon>
              Explore All 24+ Components
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================
       4. Section: Interactive Typography Specimen Lab
       ================================================================ -->
  <section id="typography-lab" class="f-section-block" aria-label="Typography Scale Lab">
    <div class="f-section-head">
      <div class="f-badge-inline"><iconify-icon icon="fluent:text-font-16-regular"></iconify-icon> Type Scale Lab</div>
      <h2 class="f-section-title">4-Tier Typography Hierarchy</h2>
      <p class="f-section-subtitle">Type your own live test string to evaluate tracking, line heights, and hierarchy levels.</p>
    </div>

    <div class="f-type-lab-card">
      <div class="f-type-input-bar">
        <label for="customTypeInput" class="f-type-input-label">Live Sample Text:</label>
        <input id="customTypeInput" type="text" class="f-type-input" bind:value={customTypePhrase} placeholder="Type a custom phrase..." />
      </div>

      <div class="f-type-scale-rows">
        <!-- Display Scale -->
        <div class="f-type-row" onclick={() => copyToClipboard('var(--text-strong)', 'Copied Display Level 1 Token!')}>
          <div class="f-type-meta">
            <span class="f-type-name">Display (H1)</span>
            <span class="f-type-token">--text-strong</span>
          </div>
          <div class="f-type-render f-type-display">{customTypePhrase}</div>
        </div>

        <!-- Title Scale -->
        <div class="f-type-row" onclick={() => copyToClipboard('var(--text-primary)', 'Copied Title Level 2 Token!')}>
          <div class="f-type-meta">
            <span class="f-type-name">Title (H2-H3)</span>
            <span class="f-type-token">--text-primary</span>
          </div>
          <div class="f-type-render f-type-title">{customTypePhrase}</div>
        </div>

        <!-- Body Scale -->
        <div class="f-type-row" onclick={() => copyToClipboard('var(--text-secondary)', 'Copied Body Level 3 Token!')}>
          <div class="f-type-meta">
            <span class="f-type-name">Body Text</span>
            <span class="f-type-token">--text-secondary</span>
          </div>
          <div class="f-type-render f-type-body">{customTypePhrase}</div>
        </div>

        <!-- Caption Scale -->
        <div class="f-type-row" onclick={() => copyToClipboard('var(--text-disabled)', 'Copied Caption Level 4 Token!')}>
          <div class="f-type-meta">
            <span class="f-type-name">Caption &amp; Meta</span>
            <span class="f-type-token">--text-disabled</span>
          </div>
          <div class="f-type-render f-type-caption">{customTypePhrase}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================
       5. Section: Tools & Operational Resources
       ================================================================ -->
  <section id="tools-section" class="f-section-block" aria-label="Tools and Utilities">
    <div class="f-section-head">
      <div class="f-badge-inline"><iconify-icon icon="fluent:wrench-16-regular"></iconify-icon> Staff Workflow</div>
      <h2 class="f-section-title">Tools &amp; Operational Resources</h2>
      <p class="f-section-subtitle">Practical creative utilities curated for daily marketing, clinical, and staff operations.</p>
    </div>

    <div class="f-tools-grid">
      <!-- Signature -->
      <a href="/signature/" class="f-card-tool f-animate-up f-delay-1" id="card-signature" aria-label="Mail Signature Generator">
        <div class="f-tool-icon"><iconify-icon icon="fluent:mail-template-24-regular"></iconify-icon></div>
        <div class="f-tool-body">
          <h3 class="f-tool-title">Mail Signature</h3>
          <p class="f-tool-desc">Generate official, on-brand SuamiSihat™ email signatures in seconds.</p>
        </div>
        <span class="f-tool-arrow"><iconify-icon icon="fluent:arrow-right-20-regular"></iconify-icon></span>
      </a>

      <!-- SS CAM -->
      <a href="/tools/" class="f-card-tool f-animate-up f-delay-2" id="card-tools" aria-label="Download SS CAM and Tools">
        <div class="f-tool-icon"><iconify-icon icon="fluent:camera-24-regular"></iconify-icon></div>
        <div class="f-tool-body">
          <h3 class="f-tool-title">SS CAM &amp; Tools</h3>
          <p class="f-tool-desc">Download creative desktop apps, asset generators, and contrast tools.</p>
        </div>
        <span class="f-tool-arrow"><iconify-icon icon="fluent:arrow-right-20-regular"></iconify-icon></span>
      </a>

      <!-- Onboarding -->
      <a href="/onboarding/" class="f-card-tool f-animate-up f-delay-3" id="card-onboarding" aria-label="Staff Onboarding">
        <div class="f-tool-icon"><iconify-icon icon="fluent:rocket-24-regular"></iconify-icon></div>
        <div class="f-tool-body">
          <h3 class="f-tool-title">Staff Onboarding</h3>
          <p class="f-tool-desc">Brand orientation, tool setup, team hierarchy, and first-week checklist.</p>
        </div>
        <span class="f-tool-arrow"><iconify-icon icon="fluent:arrow-right-20-regular"></iconify-icon></span>
      </a>

      <!-- Documentation -->
      <a href="/doc/?doc=changelog" class="f-card-tool f-animate-up f-delay-4" id="card-docs" aria-label="Read Documentation">
        <div class="f-tool-icon"><iconify-icon icon="fluent:document-text-24-regular"></iconify-icon></div>
        <div class="f-tool-body">
          <h3 class="f-tool-title">Documentation</h3>
          <p class="f-tool-desc">Living changelogs, contribution standards, and system roadmap.</p>
        </div>
        <span class="f-tool-arrow"><iconify-icon icon="fluent:arrow-right-20-regular"></iconify-icon></span>
      </a>

      <!-- SSNAS External Launchpad -->
      <a href="https://nas.suamisihat.com.my/" class="f-card-tool f-card-tool-ext f-animate-up f-delay-5" id="card-dashboard" target="_blank" rel="noopener noreferrer" aria-label="SSNAS Dashboard">
        <div class="f-tool-icon"><iconify-icon icon="fluent:gauge-24-regular"></iconify-icon></div>
        <div class="f-tool-body">
          <h3 class="f-tool-title">SSNAS Dashboard</h3>
          <p class="f-tool-desc">Central launchpad for internal services and storage (Internal VPN).</p>
        </div>
        <span class="f-tool-arrow"><iconify-icon icon="fluent:open-20-regular"></iconify-icon></span>
      </a>
    </div>
  </section>

  <!-- ================================================================
       6. Section: Subsidiary Brand Network (Corporate Architecture)
       ================================================================ -->
  <section id="ecosystem" class="f-section-block f-subbrand" aria-label="SuamiSihat™ Ecosystem Architecture">
    <div class="f-subbrand-inner">
      <div class="f-section-head">
        <div class="f-subbrand-badge">
          <iconify-icon icon="fluent:layer-diagonal-24-regular" aria-hidden="true"></iconify-icon>
          Ecosystem
        </div>
        <h2 class="f-section-title">Subsidiary Brand Network</h2>
        <p class="f-section-subtitle">Operating entities functioning under unified visual and corporate governance.</p>
      </div>

      <div class="f-subbrand-grid">
        <!-- 1 · SSH -->
        <a href="/brand-system/#subbrand" class="f-subbrand-card f-sub-ssh" aria-label="Explore SS Health guidelines">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSH</span>
            <span class="f-subbrand-status-dot" title="Active Entity"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src={isDarkMode ? "/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_dark.svg" : "/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_light.svg"}
                 alt="SS Health Logo" loading="lazy">
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Health</div>
            <div class="f-subbrand-desc">Corporate &amp; Strategic Steering</div>
          </div>
          <div class="f-subbrand-card-footer">
            <span>Guidelines</span>
            <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
          </div>
        </a>

        <!-- 2 · SSC -->
        <a href="/brand-system/#subbrand" class="f-subbrand-card f-sub-ssc" aria-label="Explore SS Clinic guidelines">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSC</span>
            <span class="f-subbrand-status-dot" title="Active Entity"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src={isDarkMode ? "/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_dark.svg" : "/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.svg"}
                 alt="SS Clinic Logo" loading="lazy">
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Clinic</div>
            <div class="f-subbrand-desc">Medical Centres &amp; Care</div>
          </div>
          <div class="f-subbrand-card-footer">
            <span>Guidelines</span>
            <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
          </div>
        </a>

        <!-- 3 · SSW -->
        <a href="/brand-system/#subbrand" class="f-subbrand-card f-sub-ssw" aria-label="Explore SS Wellness guidelines">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSW</span>
            <span class="f-subbrand-status-dot" title="Active Entity"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src={isDarkMode ? "/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_dark.svg" : "/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_light.svg"}
                 alt="SS Wellness Logo" loading="lazy">
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Wellness</div>
            <div class="f-subbrand-desc">Supplements &amp; Well-being</div>
          </div>
          <div class="f-subbrand-card-footer">
            <span>Guidelines</span>
            <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
          </div>
        </a>

        <!-- 4 · SSE -->
        <a href="/brand-system/#subbrand" class="f-subbrand-card f-sub-sse" aria-label="Explore SS Ecommerce guidelines">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSE</span>
            <span class="f-subbrand-status-dot" title="Active Entity"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src={isDarkMode ? "/public/brand/logos/04_logo_ssEcom/logo_sse_primary_dark.svg" : "/public/brand/logos/04_logo_ssEcom/logo_sse_primary_light.svg"}
                 alt="SS Ecommerce Logo" loading="lazy">
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Ecommerce</div>
            <div class="f-subbrand-desc">Direct-to-Consumer Commerce</div>
          </div>
          <div class="f-subbrand-card-footer">
            <span>Guidelines</span>
            <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
          </div>
        </a>

        <!-- 5 · SST -->
        <a href="/brand-system/#subbrand" class="f-subbrand-card f-sub-sst" aria-label="Explore SS Technology guidelines">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SST</span>
            <span class="f-subbrand-status-dot" title="Active Entity"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src={isDarkMode ? "/public/brand/logos/05_logo_ssTech/logo_sst_primary_dark.svg" : "/public/brand/logos/05_logo_ssTech/logo_sst_primary_light.svg"}
                 alt="SS Technology Logo" loading="lazy">
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Technology</div>
            <div class="f-subbrand-desc">HealthTech Infrastructure</div>
          </div>
          <div class="f-subbrand-card-footer">
            <span>Guidelines</span>
            <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
          </div>
        </a>
      </div>

      <div class="f-subbrand-cta-wrap">
        <a href="/brand-system/#subbrand" class="f-subbrand-cta-link">
          <span>Explore complete sub-brand governance</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon>
        </a>
      </div>
    </div>
  </section>

  <!-- ================================================================
       7. Section: Governance & Manifesto (Vision & Mission)
       ================================================================ -->
  <section id="about" class="f-section-block f-governance-section">
    <div class="f-governance-card">
      <p class="f-section-label">Governance</p>
      <h2 class="f-section-title">One Language. One Brand.</h2>
      <p class="f-governance-lead">
        The SuamiSihat™ Design System is the single authoritative standard governing visual and experiential execution across every digital and physical touchpoint.
      </p>

      <div class="vision-mission-grid">
        <div class="vm-card vision-card">
          <div class="vm-icon" aria-hidden="true">
            <iconify-icon icon="fluent:eye-24-regular"></iconify-icon>
          </div>
          <h3 class="vm-title">Our Vision</h3>
          <p class="vm-text">
            To be the most trusted men's health brand in Southeast Asia &mdash; recognised for clinical precision and human-first design.
          </p>
        </div>
        <div class="vm-card mission-card">
          <div class="vm-icon" aria-hidden="true">
            <iconify-icon icon="fluent:target-arrow-24-regular"></iconify-icon>
          </div>
          <h3 class="vm-title">Our Mission</h3>
          <p class="vm-text">
            To empower every touchpoint with a design language that is consistent, accessible, and purposefully built.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  /* Global Live Toast Notification */
  .f-live-toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 9999px;
    background: #022057;
    color: #FFFFFF;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    animation: f-toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  :global([data-theme="dark"]) .f-live-toast {
    background: #21A1F7;
    color: #000000;
  }

  .f-toast-icon {
    font-size: 1.1rem;
    color: #22C55E;
  }

  :global([data-theme="dark"]) .f-toast-icon {
    color: #000000;
  }

  @keyframes f-toast-in {
    from { opacity: 0; transform: translateY(16px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Section Layout Base */
  .f-section-block {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 4rem clamp(1.5rem, 5vw, 5rem) 2rem;
    margin: 0;
  }

  .f-section-head {
    margin-bottom: 2rem;
  }

  .f-badge-inline {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.725rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-brand-primary, #043388);
    background: rgba(4, 51, 136, 0.05);
    padding: 3px 8px;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  :global([data-theme="dark"]) .f-badge-inline {
    color: #6DC6EC;
    background: rgba(33, 161, 247, 0.12);
  }

  .f-section-title {
    font-size: clamp(1.5rem, 3.5vw, 2.1rem);
    font-weight: 700;
    color: var(--text-strong, #000000);
    letter-spacing: -0.02em;
    margin: 0 0 0.5rem;
  }

  :global([data-theme="dark"]) .f-section-title {
    color: #FFFFFF;
  }

  .f-section-subtitle {
    font-size: 0.925rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    margin: 0;
    max-width: 650px;
    line-height: 1.5;
  }

  :global([data-theme="dark"]) .f-section-subtitle {
    color: rgba(252, 250, 246, 0.65);
  }

  /* ---------------- Interactive Palette Studio ---------------- */
  .f-interactive-palette-box {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  }

  :global([data-theme="dark"]) .f-interactive-palette-box {
    background: rgba(18, 22, 32, 0.7);
    border-color: rgba(255, 255, 255, 0.07);
  }

  .f-palette-swatches {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 900px) {
    .f-palette-swatches {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 480px) {
    .f-palette-swatches {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .f-palette-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 72px;
    padding: 8px 10px;
    border-radius: 12px;
    background: var(--swatch-bg);
    color: #FFFFFF;
    border: 2px solid transparent;
    cursor: pointer;
    text-align: left;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .f-palette-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  .f-palette-btn.selected {
    border-color: #21A1F7;
    box-shadow: 0 0 0 3px rgba(33, 161, 247, 0.35);
  }

  .f-swatch-label {
    font-size: 0.725rem;
    font-weight: 700;
  }

  .f-swatch-code {
    font-size: 0.65rem;
    opacity: 0.85;
    font-family: monospace;
  }

  .f-palette-inspector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.05));
  }

  .f-inspector-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .f-inspector-copy-btn {
    background: rgba(0, 0, 0, 0.15);
    border: none;
    color: inherit;
    font-size: 0.725rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .f-inspector-hint {
    font-size: 0.775rem;
    color: var(--text-secondary);
  }

  /* ---------------- Foundation Cards ---------------- */
  .f-foundation-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    width: 100%;
  }

  @media (max-width: 960px) {
    .f-foundation-grid {
      grid-template-columns: 1fr;
    }
  }

  .f-card-foundation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.75rem;
    border-radius: 20px;
    text-decoration: none;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    background: var(--color-neutral-bg-2, #FFFFFF);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02), 0 8px 24px rgba(2, 32, 87, 0.04);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.2s ease;
  }

  :global([data-theme="dark"]) .f-card-foundation {
    background: rgba(18, 22, 32, 0.7);
    backdrop-filter: blur(20px);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .f-card-foundation:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(4, 51, 136, 0.1);
    border-color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-card-foundation:hover {
    border-color: #21A1F7;
  }

  .f-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .f-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    background: rgba(4, 51, 136, 0.06);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-card-icon {
    background: rgba(33, 161, 247, 0.12);
    color: #6DC6EC;
  }

  .f-card-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-strong, #000000);
    margin: 0 0 0.4rem;
  }

  :global([data-theme="dark"]) .f-card-title {
    color: #FFFFFF;
  }

  .f-card-desc {
    font-size: 0.865rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    line-height: 1.5;
    margin: 0;
  }

  :global([data-theme="dark"]) .f-card-desc {
    color: rgba(252, 250, 246, 0.65);
  }

  .f-card-action {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.825rem;
    font-weight: 600;
    color: var(--color-brand-primary, #043388);
    margin-top: 1.25rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.05));
  }

  :global([data-theme="dark"]) .f-card-action {
    color: #21A1F7;
    border-top-color: rgba(255, 255, 255, 0.05);
  }

  /* ---------------- Workbench Card ---------------- */
  .f-workbench-card {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    border-radius: 24px;
    padding: 2.25rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02), 0 16px 36px rgba(2, 32, 87, 0.04);
  }

  :global([data-theme="dark"]) .f-workbench-card {
    background: rgba(18, 22, 32, 0.7);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .f-workbench-grid {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 2.5rem;
    align-items: flex-start;
  }

  @media (max-width: 980px) {
    .f-workbench-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .f-stage-controls {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }

  .f-control-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .f-control-label {
    font-size: 0.725rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .f-control-pills {
    display: inline-flex;
    background: rgba(0, 0, 0, 0.04);
    padding: 3px;
    border-radius: 8px;
  }

  :global([data-theme="dark"]) .f-control-pills {
    background: rgba(255, 255, 255, 0.06);
  }

  .f-pill-opt {
    background: transparent;
    border: none;
    font-size: 0.725rem;
    font-weight: 600;
    color: var(--text-secondary);
    padding: 3px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .f-pill-opt.active {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
  }

  .f-interactive-canvas {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    padding: 1.5rem;
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    border-radius: 16px;
    margin-bottom: 1.25rem;
  }

  :global([data-theme="dark"]) .f-interactive-canvas {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  /* Dynamic Workbench Buttons */
  .f-workbench-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    border: none;
  }

  .f-size-sm { padding: 6px 12px; font-size: 0.775rem; }
  .f-size-md { padding: 9px 18px; font-size: 0.85rem; }
  .f-size-lg { padding: 12px 24px; font-size: 0.95rem; }

  .f-btn-primary { background: var(--color-brand-primary, #043388); color: #FFFFFF; }
  .f-btn-primary:hover { background: #022057; transform: translateY(-1px); }

  .f-btn-secondary { background: #21A1F7; color: #FFFFFF; }
  .f-btn-secondary:hover { background: #043388; }

  .f-btn-outline { background: transparent; border: 1px solid var(--color-brand-primary, #043388); color: var(--color-brand-primary, #043388); }
  .f-btn-outline:hover { background: rgba(4, 51, 136, 0.08); }

  .f-btn-subtle { background: rgba(0, 0, 0, 0.05); color: var(--text-primary); }
  .f-btn-subtle:hover { background: rgba(0, 0, 0, 0.1); }

  /* Workbench Switch */
  .f-workbench-switch-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .f-workbench-switch {
    width: 36px;
    height: 20px;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.2);
    position: relative;
    transition: background 0.2s ease;
  }

  .f-workbench-switch.on { background: #22C55E; }

  .f-workbench-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #FFFFFF;
    transition: transform 0.2s ease;
  }

  .f-workbench-switch.on .f-workbench-thumb { transform: translateX(16px); }

  .f-workbench-switch-label {
    font-size: 0.775rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  /* Workbench Input */
  .f-workbench-input-wrap {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.1));
  }

  :global([data-theme="dark"]) .f-workbench-input-wrap {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .f-input-icon { color: var(--text-disabled); font-size: 0.9rem; }

  .f-workbench-input {
    border: none;
    background: transparent;
    font-size: 0.8rem;
    color: var(--text-primary);
    outline: none;
  }

  /* Code Box */
  .f-code-box-wrapper {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    background: #090D16;
  }

  .f-code-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .f-code-tabs { display: flex; gap: 4px; }

  .f-code-tab {
    background: transparent;
    border: none;
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    padding: 3px 8px;
    border-radius: 4px;
    cursor: pointer;
  }

  .f-code-tab.active { background: #21A1F7; color: #000000; }

  .f-code-copy-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.72rem;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  .f-code-copy-btn:hover { color: #FFFFFF; }

  .f-code-pre {
    margin: 0;
    padding: 1rem 1.25rem;
    color: #6DC6EC;
    font-family: monospace;
    font-size: 0.775rem;
    overflow-x: auto;
  }

  /* Info Pane Right */
  .f-info-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-strong, #000000);
    margin: 0 0 0.5rem;
  }

  :global([data-theme="dark"]) .f-info-title { color: #FFFFFF; }

  .f-info-lead {
    font-size: 0.885rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }

  :global([data-theme="dark"]) .f-info-lead { color: rgba(252, 250, 246, 0.65); }

  .f-quick-jump-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.65rem;
    margin-bottom: 1.75rem;
  }

  .f-jump-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.825rem;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.03);
    transition: background 0.15s ease, color 0.15s ease;
  }

  :global([data-theme="dark"]) .f-jump-item { background: rgba(255, 255, 255, 0.04); }

  .f-jump-item:hover {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
  }

  /* ---------------- Typography Scale Lab ---------------- */
  .f-type-lab-card {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    border-radius: 20px;
    padding: 1.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  }

  :global([data-theme="dark"]) .f-type-lab-card {
    background: rgba(18, 22, 32, 0.7);
    border-color: rgba(255, 255, 255, 0.07);
  }

  .f-type-input-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
  }

  .f-type-input-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .f-type-input {
    flex: 1;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.12));
    background: var(--color-neutral-bg-1, #FCFAF6);
    color: var(--text-primary);
    font-size: 0.85rem;
    outline: none;
  }

  :global([data-theme="dark"]) .f-type-input {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .f-type-scale-rows {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .f-type-row {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .f-type-row:hover { background: rgba(0, 0, 0, 0.03); }
  :global([data-theme="dark"]) .f-type-row:hover { background: rgba(255, 255, 255, 0.04); }

  .f-type-meta {
    width: 140px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }

  .f-type-name { font-size: 0.75rem; font-weight: 700; color: var(--text-strong); }
  .f-type-token { font-size: 0.65rem; font-family: monospace; color: var(--text-disabled); }

  .f-type-render { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .f-type-display { font-size: clamp(1.4rem, 3vw, 1.85rem); font-weight: 800; color: var(--text-strong); letter-spacing: -0.02em; }
  .f-type-title { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); }
  .f-type-body { font-size: 0.95rem; font-weight: 400; color: var(--text-secondary); }
  .f-type-caption { font-size: 0.8rem; font-weight: 500; color: var(--text-disabled); }

  /* ---------------- Tools Grid ---------------- */
  .f-tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    width: 100%;
  }

  .f-card-tool {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    border-radius: 16px;
    text-decoration: none;
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  :global([data-theme="dark"]) .f-card-tool {
    background: rgba(18, 22, 32, 0.65);
    border-color: rgba(255, 255, 255, 0.07);
  }

  .f-card-tool:hover {
    transform: translateY(-2px);
    border-color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-card-tool:hover {
    border-color: #21A1F7;
  }

  .f-tool-icon {
    font-size: 1.35rem;
    color: var(--color-brand-primary, #043388);
    flex-shrink: 0;
  }

  :global([data-theme="dark"]) .f-tool-icon {
    color: #6DC6EC;
  }

  .f-tool-body {
    flex: 1;
  }

  .f-tool-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-strong, #000000);
    margin: 0 0 2px;
  }

  :global([data-theme="dark"]) .f-tool-title {
    color: #FFFFFF;
  }

  .f-tool-desc {
    font-size: 0.775rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    line-height: 1.4;
    margin: 0;
  }

  :global([data-theme="dark"]) .f-tool-desc {
    color: rgba(252, 250, 246, 0.65);
  }

  .f-tool-arrow {
    color: var(--text-disabled);
    font-size: 1rem;
    flex-shrink: 0;
  }

  /* ---------------- Subbrand Grid ---------------- */
  .f-subbrand-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem;
    width: 100%;
  }

  @media (max-width: 1100px) {
    .f-subbrand-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 720px) {
    .f-subbrand-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .f-subbrand-grid {
      grid-template-columns: 1fr;
    }
  }

  /* ---------------- Governance Section ---------------- */
  .f-governance-section {
    padding-top: 1rem;
    padding-bottom: 4rem;
  }

  .f-governance-card {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.06));
    border-radius: 24px;
    padding: clamp(1.75rem, 4vw, 3rem);
    width: 100%;
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .f-governance-card {
    background: rgba(18, 22, 32, 0.65);
    border-color: rgba(255, 255, 255, 0.07);
  }

  .f-governance-lead {
    font-size: 0.95rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    line-height: 1.65;
    max-width: 680px;
    margin: 0 0 2rem;
  }

  :global([data-theme="dark"]) .f-governance-lead {
    color: rgba(252, 250, 246, 0.65);
  }
</style>
