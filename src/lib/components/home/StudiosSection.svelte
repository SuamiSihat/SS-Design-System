<script>
  import { readableTextOn } from '$lib/utils/contrast.js';

  let { copy } = $props();

  // Interactive Component Workbench State
  let btnVariant = $state('primary'); // 'primary' | 'secondary' | 'outline' | 'subtle'
  let btnSize = $state('md'); // 'sm' | 'md' | 'lg'
  let isToggleActive = $state(true);
  let clickCounter = $state(0);
  let sampleInput = $state('SS Clinic KL Gateway');
  let activeCodeTab = $state('web'); // 'web' | 'flutter' | 'tailwind' | 'token'

  // Interactive Typography Scale Tester
  let customTypePhrase = $state('Clinical Precision. Human-First Design.');

  // Interactive Real-Time Color Morphing Swatch State
  let activeSwatchHex = $state('#043388');
  let activeSwatchName = $state('SS Blue');
  let activeContrastRatio = $state('11.8:1 (AAA)');

  const swatchDetails = {
    '#043388': { name: 'SS Blue', ratio: '11.8:1 (AAA)', role: '30% brand colour: headers, panels and footers' },
    '#022057': { name: 'Prussian Blue', ratio: '14.2:1 (AAA)', role: '30% brand colour: deep panels and dark sections' },
    '#21A1F7': { name: 'Azure Blue', ratio: '7.4:1 (AA+)', role: '10% Action Accent & High-Conversion CTAs' },
    '#6DC6EC': { name: 'Malibu Blue', ratio: '6.8:1 (AA)', role: 'Interactive Highlights & Light Surface Nodes' },
    '#FCE53D': { name: 'Banana Yellow', ratio: '8.1:1 (AAA)', role: 'Energetic Accents & Notice Badges' },
    '#FCFAF6': { name: 'Porcelain White', ratio: '16.5:1 (AAA)', role: '60% light background: pages and cards' }
  };

  function selectSwatch(hex) {
    activeSwatchHex = hex;
    const item = swatchDetails[hex] || { name: hex, ratio: '9.0:1 (AAA)', role: 'Brand Token' };
    activeSwatchName = item.name;
    activeContrastRatio = item.ratio;
    copy(hex, `Copied ${item.name} (${hex}) to clipboard!`);
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

<!-- ================================================================
     CHAPTER 6: DYNAMIC BENTO GRID — LIVING STUDIOS & MORPHING PALETTE
     ================================================================ -->
<section id="studios" class="f-section-block" aria-label="Interactive Living Studios">
  <div class="f-section-overline">
    <span class="f-overline-label">Brand colours and fonts</span>
    <span class="f-overline-rule" aria-hidden="true"></span>
  </div>

  <div class="f-section-head">
    <h2 class="f-section-title">Our colours and fonts</h2>
    <p class="f-section-subtitle">
      Click a colour to copy its code. Try a button. Type your own words to see our fonts.
    </p>
  </div>

  <!-- Chapter 6 Bento Grid -->
  <div class="f-bento-grid">
    <!-- Bento Item 1: Wide 12-Col Real-time Morphing Color Studio -->
    <div class="f-bento-card f-bento-card--hero f-bento-span-12 f-color-morph-card" style="--active-theme-color: {activeSwatchHex};">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 1.25rem; gap: 0.5rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 4px;">Brand colours</h3>
          <span style="font-size: 0.8rem; color: var(--text-secondary);">Click a colour to copy its code.</span>
        </div>
        <span class="f-live-contrast-tag">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color:var(--color-success-fg);"></iconify-icon>
          <span>Readability: <strong>{activeContrastRatio}</strong></span>
        </span>
      </div>

      <div class="f-interactive-palette-box">
        <div class="f-palette-swatches">
          <button 
            type="button" 
            class="f-palette-btn {activeSwatchHex === '#043388' ? 'selected' : ''}" 
            style="--swatch-bg: #043388;" 
            onclick={() => selectSwatch('#043388')} 
            title="Copy SS Blue (#043388)"
          >
            <span class="f-swatch-label">SS Blue</span>
            <span class="f-swatch-code">#043388</span>
          </button>

          <button 
            type="button" 
            class="f-palette-btn {activeSwatchHex === '#022057' ? 'selected' : ''}" 
            style="--swatch-bg: #022057;" 
            onclick={() => selectSwatch('#022057')} 
            title="Copy Prussian Blue (#022057)"
          >
            <span class="f-swatch-label">Prussian</span>
            <span class="f-swatch-code">#022057</span>
          </button>

          <button 
            type="button" 
            class="f-palette-btn {activeSwatchHex === '#21A1F7' ? 'selected' : ''}" 
            style="--swatch-bg: #21A1F7; color: #022057;" 
            onclick={() => selectSwatch('#21A1F7')} 
            title="Copy Azure (#21A1F7)"
          >
            <span class="f-swatch-label">Azure</span>
            <span class="f-swatch-code">#21A1F7</span>
          </button>

          <button 
            type="button" 
            class="f-palette-btn {activeSwatchHex === '#6DC6EC' ? 'selected' : ''}" 
            style="--swatch-bg: #6DC6EC; color: #19191A;" 
            onclick={() => selectSwatch('#6DC6EC')} 
            title="Copy Malibu (#6DC6EC)"
          >
            <span class="f-swatch-label" style="color:#19191A;">Malibu</span>
            <span class="f-swatch-code" style="color:#3A3A39;">#6DC6EC</span>
          </button>

          <button 
            type="button" 
            class="f-palette-btn {activeSwatchHex === '#FCE53D' ? 'selected' : ''}" 
            style="--swatch-bg: #FCE53D; color: #19191A;" 
            onclick={() => selectSwatch('#FCE53D')} 
            title="Copy Banana Yellow (#FCE53D)"
          >
            <span class="f-swatch-label" style="color:#19191A;">Banana</span>
            <span class="f-swatch-code" style="color:#3A3A39;">#FCE53D</span>
          </button>

          <button 
            type="button" 
            class="f-palette-btn {activeSwatchHex === '#FCFAF6' ? 'selected' : ''}" 
            style="--swatch-bg: #FCFAF6; color: #19191A; border: 1px solid rgba(0,0,0,0.12);" 
            onclick={() => selectSwatch('#FCFAF6')} 
            title="Copy Porcelain (#FCFAF6)"
          >
            <span class="f-swatch-label" style="color:#19191A;">Porcelain</span>
            <span class="f-swatch-code" style="color:#3A3A39;">#FCFAF6</span>
          </button>
        </div>

        <div class="f-palette-inspector">
          <div class="f-inspector-chip" style="background: {activeSwatchHex}; color: {readableTextOn(activeSwatchHex)};">
            <span class="f-inspector-name">{activeSwatchName}: <strong>{activeSwatchHex}</strong></span>
            <button type="button" class="f-inspector-copy-btn" onclick={() => copy(activeSwatchHex, `Copied ${activeSwatchName} (${activeSwatchHex})!`)}>
              <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy HEX
            </button>
          </div>
          <span class="f-inspector-hint">{swatchDetails[activeSwatchHex]?.role || 'Authoritative Token'}</span>
        </div>
      </div>
    </div>

    <!-- Bento Item 2: 8-Col Living Component Workbench -->
    <div class="f-bento-card f-bento-span-8">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 1rem;">Try a button (for designers)</h3>
      
      <div class="f-stage-controls" style="margin-bottom: 1.25rem;">
        <div class="f-control-group">
          <span class="f-control-label">Variant</span>
          <div class="f-control-pills">
            <button type="button" class="f-pill-opt {btnVariant === 'primary' ? 'active' : ''}" onclick={() => { btnVariant = 'primary'; }}>Primary</button>
            <button type="button" class="f-pill-opt {btnVariant === 'secondary' ? 'active' : ''}" onclick={() => { btnVariant = 'secondary'; }}>Secondary</button>
            <button type="button" class="f-pill-opt {btnVariant === 'outline' ? 'active' : ''}" onclick={() => { btnVariant = 'outline'; }}>Outline</button>
            <button type="button" class="f-pill-opt {btnVariant === 'subtle' ? 'active' : ''}" onclick={() => { btnVariant = 'subtle'; }}>Subtle</button>
          </div>
        </div>

        <div class="f-control-group">
          <span class="f-control-label">Size</span>
          <div class="f-control-pills">
            <button type="button" class="f-pill-opt {btnSize === 'sm' ? 'active' : ''}" onclick={() => { btnSize = 'sm'; }}>SM</button>
            <button type="button" class="f-pill-opt {btnSize === 'md' ? 'active' : ''}" onclick={() => { btnSize = 'md'; }}>MD</button>
            <button type="button" class="f-pill-opt {btnSize === 'lg' ? 'active' : ''}" onclick={() => { btnSize = 'lg'; }}>LG</button>
          </div>
        </div>
      </div>

      <div class="f-interactive-canvas" style="margin-bottom: 1.25rem;">
        <button 
          type="button" 
          class="f-workbench-btn f-btn-{btnVariant} f-size-{btnSize}" 
          onclick={() => { clickCounter += 1; }}
          title="Click to test live state updates!"
        >
          <iconify-icon icon="fluent:cursor-click-24-regular"></iconify-icon>
          <span>Action ({clickCounter})</span>
        </button>

        <div 
          class="f-workbench-switch-wrap" 
          onclick={() => { isToggleActive = !isToggleActive; }}
          onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); isToggleActive = !isToggleActive; } }}
          role="switch"
          tabindex="0"
          aria-checked={isToggleActive}
        >
          <div class="f-workbench-switch {isToggleActive ? 'on' : ''}">
            <span class="f-workbench-thumb"></span>
          </div>
          <span class="f-workbench-switch-label">{isToggleActive ? 'Notifications On' : 'Muted'}</span>
        </div>

        <div class="f-workbench-input-wrap">
          <iconify-icon icon="fluent:search-16-regular" class="f-input-icon"></iconify-icon>
          <input type="text" bind:value={sampleInput} class="f-workbench-input" placeholder="Type unit name..." />
        </div>
      </div>

      <div class="f-code-box-wrapper">
        <div class="f-code-bar">
          <div class="f-code-tabs">
            <button type="button" class="f-code-tab {activeCodeTab === 'web' ? 'active' : ''}" onclick={() => { activeCodeTab = 'web'; }}>Web (CSS)</button>
            <button type="button" class="f-code-tab {activeCodeTab === 'flutter' ? 'active' : ''}" onclick={() => { activeCodeTab = 'flutter'; }}>Flutter</button>
            <button type="button" class="f-code-tab {activeCodeTab === 'tailwind' ? 'active' : ''}" onclick={() => { activeCodeTab = 'tailwind'; }}>Tailwind</button>
            <button type="button" class="f-code-tab {activeCodeTab === 'token' ? 'active' : ''}" onclick={() => { activeCodeTab = 'token'; }}>Design Tokens</button>
          </div>
          <button type="button" class="f-code-copy-btn" onclick={() => copy(generatedCode(), 'Copied snippet to clipboard!')}>
            <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy Snippet
          </button>
        </div>
        <pre class="f-code-pre"><code>{generatedCode()}</code></pre>
      </div>
    </div>

    <!-- Bento Item 3: 4-Col Foundation Quick Hub -->
    <div class="f-bento-card f-bento-span-4" style="justify-content: space-between;">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Brand guides</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1.25rem;">
          Where to find the official rules and files.
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="/brand-system/" class="f-quick-link-item">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">SuamiSihat® brand page</span>
              <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
            </div>
          </a>
          <a href="/brand-guidelines/" class="f-quick-link-item">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">Brand guide PDFs</span>
              <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
            </div>
          </a>
          <a href="/products/" class="f-quick-link-item">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">Product brands</span>
              <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
            </div>
          </a>
        </div>
      </div>
      <div style="margin-top: 1.5rem;">
        <a href="/components/" class="f-btn-hero-primary" id="card-components" style="width: 100%; justify-content: center;">
          <iconify-icon icon="fluent:puzzle-piece-24-regular"></iconify-icon> All components (for designers)
        </a>
      </div>
    </div>

    <!-- Bento Item 4: 12-Col Typography Scale Lab -->
    <div class="f-bento-card f-bento-span-12">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 1.25rem; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 4px;">Try our fonts</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">Type your own words to see them in our four text sizes.</p>
        </div>
        <div class="f-type-input-bar">
          <input id="customTypeInput" type="text" bind:value={customTypePhrase} class="f-type-input" placeholder="Type a custom phrase..." />
        </div>
      </div>

      <div class="f-type-scale-rows">
        <button 
          type="button" 
          class="f-type-row" 
          onclick={() => copy('--text-strong', 'Copied --text-strong token!')}
        >
          <div class="f-type-meta">
            <span class="f-type-name">Display (H1)</span>
            <span class="f-type-token">--text-strong</span>
          </div>
          <div class="f-type-render f-type-display">{customTypePhrase}</div>
        </button>

        <button 
          type="button" 
          class="f-type-row" 
          onclick={() => copy('--text-primary', 'Copied --text-primary token!')}
        >
          <div class="f-type-meta">
            <span class="f-type-name">Title (H2-H3)</span>
            <span class="f-type-token">--text-primary</span>
          </div>
          <div class="f-type-render f-type-title">{customTypePhrase}</div>
        </button>

        <button 
          type="button" 
          class="f-type-row" 
          onclick={() => copy('--text-secondary', 'Copied --text-secondary token!')}
        >
          <div class="f-type-meta">
            <span class="f-type-name">Body Text</span>
            <span class="f-type-token">--text-secondary</span>
          </div>
          <div class="f-type-render f-type-body">{customTypePhrase}</div>
        </button>

        <button 
          type="button" 
          class="f-type-row" 
          onclick={() => copy('--text-disabled', 'Copied --text-disabled token!')}
        >
          <div class="f-type-meta">
            <span class="f-type-name">Caption &amp; Meta</span>
            <span class="f-type-token">--text-disabled</span>
          </div>
          <div class="f-type-render f-type-caption">{customTypePhrase}</div>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  /* Editorial Section Overline (replaces chapter badge) */
  .f-section-overline {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 1.1rem;
  }

  .f-overline-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-text-accent);
    white-space: nowrap;
  }

  :global([data-theme="dark"]) .f-overline-label {
    color: #6DC6EC;
  }

  .f-overline-rule {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(33, 161, 247, 0.35) 0%, transparent 100%);
    max-width: 200px;
  }

  /* Section Blocks */
  .f-section-block {
    width: 100%;
    box-sizing: border-box;
    padding: 5.5rem clamp(1.5rem, 5vw, 5rem) 3rem;
    margin: 0;
  }

  .f-section-head {
    margin-bottom: 2.5rem;
    max-width: 760px;
  }

  .f-section-title {
    font-size: clamp(2rem, 4.5vw, 3.25rem);
    font-weight: 800;
    color: var(--text-strong, #000000);
    letter-spacing: -0.03em;
    margin: 0 0 0.85rem;
    line-height: 1.12;
  }

  :global([data-theme="dark"]) .f-section-title {
    color: #FFFFFF;
  }

  .f-section-subtitle {
    font-size: 1.05rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    margin: 0;
    max-width: 680px;
    line-height: 1.65;
  }

  :global([data-theme="dark"]) .f-section-subtitle {
    color: rgba(252, 250, 246, 0.65);
  }

  /* Hero Section CTAs */

  .f-btn-hero-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 9999px;
    background: linear-gradient(90deg, #21A1F7 0%, #6DC6EC 100%);
    background-size: 200% 100%;
    background-position: 0% 50%;
    color: #022057;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none !important;
    border: none;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                background-position 0.4s ease;
  }

  .f-btn-hero-primary:hover {
    background-position: 100% 50%;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(33, 161, 247, 0.45);
  }

  .f-btn-hero-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 9999px;
    background: transparent;
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none !important;
    border: 1.5px solid rgba(255, 255, 255, 0.38);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.2s ease,
                color 0.2s ease;
  }

  .f-btn-hero-secondary:hover {
    border-color: rgba(33, 161, 247, 0.7);
    color: var(--color-text-accent);
    transform: translateY(-2px);
  }

  /* Bento Grid */
  .f-bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    .f-bento-grid {
      grid-template-columns: repeat(6, 1fr);
      gap: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .f-bento-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .f-bento-span-12 { grid-column: span 12; }
  .f-bento-span-8 { grid-column: span 8; }
  .f-bento-span-4 { grid-column: span 4; }

  @media (max-width: 1024px) {
    .f-bento-span-8 { grid-column: span 6; }
    .f-bento-span-4 { grid-column: span 6; }
  }

  @media (max-width: 768px) {
    .f-bento-span-12,
    .f-bento-span-8,
    .f-bento-span-4 {
      grid-column: span 1 !important;
    }
  }

  @media (max-width: 480px) {
    .f-section-block {
      padding: 3.5rem 1.25rem 2rem;
    }
    .f-section-head {
      max-width: 100%;
    }
    .f-bento-grid {
      gap: 0.875rem;
    }
  }

  /* Luminous Glassmorphic Bento Cards */
  .f-bento-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    padding: 2rem clamp(1.25rem, 3vw, 2.25rem);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.6);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.25s ease;
    display: flex;
    flex-direction: column;
  }

  :global([data-theme="dark"]) .f-bento-card {
    background: rgba(14, 20, 34, 0.72);
    border-color: rgba(255, 255, 255, 0.07);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.06);
  }

  .f-bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(4, 51, 136, 0.14), inset 0 1px 1px rgba(255, 255, 255, 0.9);
    border-color: rgba(4, 51, 136, 0.28);
  }

  :global([data-theme="dark"]) .f-bento-card:hover {
    border-color: rgba(33, 161, 247, 0.35);
    box-shadow: 0 20px 52px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.12);
  }

  /* Bento Tier: Hero (elevated, glowing) */
  .f-bento-card--hero {
    box-shadow: 0 8px 32px rgba(4, 51, 136, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8);
    border-color: rgba(4, 51, 136, 0.16);
    background: rgba(255, 255, 255, 0.9);
  }

  :global([data-theme="dark"]) .f-bento-card--hero {
    background: rgba(2, 20, 64, 0.82);
    border-color: rgba(33, 161, 247, 0.22);
    box-shadow: 0 12px 40px rgba(33, 161, 247, 0.12), 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.08);
  }

  .f-bento-card--hero:hover {
    box-shadow: 0 20px 52px rgba(4, 51, 136, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.95);
    border-color: rgba(4, 51, 136, 0.35);
  }

  :global([data-theme="dark"]) .f-bento-card--hero:hover {
    box-shadow: 0 24px 60px rgba(33, 161, 247, 0.2), 0 6px 20px rgba(0, 0, 0, 0.5);
    border-color: rgba(33, 161, 247, 0.45);
  }

  .f-card-shimmer-highlight {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
    pointer-events: none;
  }

  :global([data-theme="dark"]) .f-card-shimmer-highlight {
    background: linear-gradient(90deg, transparent 0%, rgba(33, 161, 247, 0.4) 50%, transparent 100%);
  }

  /* Color Morphing Palette Box */
  .f-color-morph-card {
    transition: background 0.4s ease, border-color 0.4s ease;
  }

  .f-live-contrast-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.775rem;
    font-weight: 600;
    color: var(--text-secondary);
    background: rgba(0, 0, 0, 0.04);
    padding: 4px 10px;
    border-radius: 9999px;
  }

  :global([data-theme="dark"]) .f-live-contrast-tag {
    background: rgba(255, 255, 255, 0.08);
  }

  .f-interactive-palette-box {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 0.5rem;
  }

  :global([data-theme="dark"]) .f-interactive-palette-box {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-palette-swatches {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 860px) {
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
    height: 88px;
    border-radius: 14px;
    background: var(--swatch-bg);
    border: 2px solid transparent;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    color: #FFFFFF;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .f-palette-btn:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  }

  .f-palette-btn.selected {
    border-color: #21A1F7;
    box-shadow: 0 0 0 3px rgba(33, 161, 247, 0.45), 0 8px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  .f-swatch-label {
    font-size: 0.775rem;
    font-weight: 700;
  }

  .f-swatch-code {
    font-size: 0.7rem;
    font-weight: 600;
    font-family: monospace;
  }

  .f-palette-inspector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
  }

  :global([data-theme="dark"]) .f-palette-inspector {
    border-color: rgba(255, 255, 255, 0.08);
  }

  .f-inspector-chip {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 0.825rem;
    font-weight: 600;
    transition: background 0.3s ease;
  }

  .f-inspector-copy-btn {
    background: rgba(0, 0, 0, 0.15);
    border: none;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.725rem;
    font-weight: 700;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .f-inspector-hint {
    font-size: 0.775rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  /* Component Workbench */
  .f-stage-controls {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .f-control-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .f-control-label {
    font-size: 0.775rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
  }

  .f-control-pills {
    display: inline-flex;
    background: rgba(0, 0, 0, 0.05);
    padding: 3px;
    border-radius: 10px;
  }

  :global([data-theme="dark"]) .f-control-pills {
    background: rgba(255, 255, 255, 0.08);
  }

  .f-pill-opt {
    background: transparent;
    border: none;
    font-size: 0.775rem;
    font-weight: 600;
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .f-pill-opt.active {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
  }

  :global([data-theme="dark"]) .f-pill-opt.active {
    background: #21A1F7;
    color: #000000;
  }

  .f-interactive-canvas {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    border-radius: 16px;
    padding: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  :global([data-theme="dark"]) .f-interactive-canvas {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-workbench-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  .f-btn-primary {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
    border-radius: 12px;
  }

  :global([data-theme="dark"]) .f-btn-primary {
    background: #21A1F7;
    color: #000000;
  }

  .f-btn-secondary {
    background: #21A1F7;
    color: #022057;
    border-radius: 12px;
  }

  .f-btn-outline {
    background: transparent;
    border: 1.5px solid var(--color-brand-primary, #043388);
    color: var(--color-brand-primary, #043388);
    border-radius: 12px;
  }

  :global([data-theme="dark"]) .f-btn-outline {
    border-color: #21A1F7;
    color: var(--color-text-accent);
  }

  .f-btn-subtle {
    background: rgba(0, 0, 0, 0.06);
    color: var(--text-primary);
    border-radius: 12px;
  }

  :global([data-theme="dark"]) .f-btn-subtle {
    background: rgba(255, 255, 255, 0.08);
    color: #FCFAF6;
  }

  .f-size-sm { padding: 6px 14px; font-size: 0.8rem; border-radius: 8px; }
  .f-size-md { padding: 10px 20px; font-size: 0.9rem; border-radius: 12px; }
  .f-size-lg { padding: 14px 28px; font-size: 1rem; border-radius: 14px; }

  /* Switch */
  .f-workbench-switch-wrap {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
  }

  .f-workbench-switch {
    width: 44px;
    height: 24px;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.15);
    position: relative;
    transition: background 0.2s ease;
  }

  .f-workbench-switch.on {
    background: #22C55E;
  }

  .f-workbench-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #FFFFFF;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .f-workbench-switch.on .f-workbench-thumb {
    transform: translateX(20px);
  }

  .f-workbench-switch-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .f-workbench-input-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .f-input-icon {
    position: absolute;
    left: 12px;
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .f-workbench-input {
    padding: 8px 14px 8px 34px;
    border-radius: 10px;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.12));
    background: var(--color-neutral-bg-2, #FFFFFF);
    color: var(--text-primary);
    font-size: 0.85rem;
  }

  :global([data-theme="dark"]) .f-workbench-input {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  /* Code Tabs */
  .f-code-box-wrapper {
    background: #021440;
    border-radius: 14px;
    overflow: hidden;
  }

  :global([data-theme="dark"]) .f-code-box-wrapper {
    background: #080D1A;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .f-code-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    padding: 6px 12px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .f-code-tabs {
    display: flex;
    gap: 4px;
  }

  .f-code-tab {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.775rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
  }

  .f-code-tab.active {
    background: rgba(33, 161, 247, 0.2);
    color: #6DC6EC;
  }

  .f-code-copy-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.725rem;
    padding: 3px 8px;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .f-code-pre {
    margin: 0;
    padding: 1rem 1.25rem;
    color: #6DC6EC;
    font-size: 0.825rem;
    font-family: monospace;
    overflow-x: auto;
  }

  .f-quick-link-item {
    padding: 1rem;
    border-radius: 14px;
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    text-decoration: none !important;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  :global([data-theme="dark"]) .f-quick-link-item {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-quick-link-item:hover {
    transform: translateY(-2px);
    border-color: var(--color-brand-primary, #043388);
  }

  /* Typography Scale */
  .f-type-input-bar {
    margin: 0;
    min-width: 280px;
  }

  .f-type-input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.12));
    background: var(--color-neutral-bg-1, #FCFAF6);
    color: var(--text-primary);
    font-size: 0.875rem;
  }

  :global([data-theme="dark"]) .f-type-input {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .f-type-scale-rows {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .f-type-row {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  :global([data-theme="dark"]) .f-type-row {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-type-row:hover {
    transform: translateY(-2px);
    border-color: var(--color-brand-primary, #043388);
  }

  .f-type-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .f-type-token {
    font-family: monospace;
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-type-token {
    color: var(--color-text-accent);
  }

  .f-type-display {
    font-size: clamp(1.4rem, 2.5vw, 1.85rem);
    font-weight: 800;
    color: var(--text-strong, #000000);
    letter-spacing: -0.02em;
  }

  :global([data-theme="dark"]) .f-type-display {
    color: #FFFFFF;
  }

  .f-type-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary, #19191A);
  }

  :global([data-theme="dark"]) .f-type-title {
    color: #FCFAF6;
  }

  .f-type-body {
    font-size: 0.95rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.8));
    line-height: 1.6;
  }

  :global([data-theme="dark"]) .f-type-body {
    color: rgba(252, 250, 246, 0.8);
  }

  .f-type-caption {
    font-size: 0.8rem;
    color: var(--color-neutral-fg-3);
  }
</style>
