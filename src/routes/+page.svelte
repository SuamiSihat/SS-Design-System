<script>
  import SSHero from '$lib/components/SSHero.svelte';
  import { theme } from '$lib/stores/theme.js';

  let isDarkMode = $derived($theme === 'dark');

  // 1. Interactive Group Architecture State
  let selectedEntity = $state('SSH'); // 'SSH' | 'SSC' | 'SSW' | 'SSE' | 'SST'
  const entityData = {
    SSH: { name: 'SuamiSihat Holding Sdn Bhd (SS Health)', role: 'Corporate Governance & IP Ownership', color: '#043388', accent: '#21A1F7', status: 'Primary Authority', tag: '01-SSH' },
    SSC: { name: 'SuamiSihat Clinic', role: 'Physical Clinical Operations & Telemedicine', color: '#022057', accent: '#6DC6EC', status: 'Clinical Practice', tag: '02-SSC' },
    SSW: { name: 'SuamiSihat Wellness', role: 'Preventative Care & Lifestyle Supplements', color: '#043388', accent: '#FCE53D', status: 'Consumer Care', tag: '03-SSW' },
    SSE: { name: 'SuamiSihat Ecommerce', role: 'Direct-to-Patient Fulfillment & Logistics', color: '#022057', accent: '#22C55E', status: 'Digital Retail', tag: '04-SSE' },
    SST: { name: 'SuamiSihat Technology', role: 'Software Platforms, EMR & Design Systems', color: '#043388', accent: '#A855F7', status: 'Engineering Hub', tag: '05-SST' }
  };

  // 2. Interactive Case Study State
  let caseStudyState = $state('after'); // 'before' | 'after'

  // 3. Interactive Role / Persona Hub State
  let activeRole = $state('engineer'); // 'engineer' | 'designer' | 'marketer' | 'clinical'

  // 4. Interactive Component Workbench State
  let btnVariant = $state('primary'); // 'primary' | 'secondary' | 'outline' | 'subtle'
  let btnSize = $state('md'); // 'sm' | 'md' | 'lg'
  let isToggleActive = $state(true);
  let clickCounter = $state(0);
  let sampleInput = $state('SS Clinic KL Gateway');
  let activeCodeTab = $state('web'); // 'web' | 'flutter' | 'tailwind' | 'token'
  let copyFeedback = $state('');

  // 5. Interactive Typography Scale Tester
  let customTypePhrase = $state('Clinical Precision. Human-First Design.');

  // 6. Interactive Real-Time Color Morphing Swatch State
  let activeSwatchHex = $state('#043388');
  let activeSwatchName = $state('SS Blue');
  let activeContrastRatio = $state('11.8:1 (AAA)');

  const swatchDetails = {
    '#043388': { name: 'SS Blue', ratio: '11.8:1 (AAA)', role: '60% Brand Foundation & Clinical Trust' },
    '#022057': { name: 'Prussian Blue', ratio: '14.2:1 (AAA)', role: 'Structural Depth & Deep Canvas' },
    '#21A1F7': { name: 'Azure Blue', ratio: '7.4:1 (AA+)', role: '10% Action Accent & High-Conversion CTAs' },
    '#6DC6EC': { name: 'Malibu Blue', ratio: '6.8:1 (AA)', role: 'Interactive Highlights & Light Surface Nodes' },
    '#FCE53D': { name: 'Banana Yellow', ratio: '8.1:1 (AAA)', role: 'Energetic Accents & Notice Badges' },
    '#FCFAF6': { name: 'Porcelain White', ratio: '16.5:1 (AAA)', role: 'Neutral Light Mode Canvas & Card Surfaces' }
  };

  // Copy helper
  function copyToClipboard(text, message) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      copyFeedback = message || `Copied ${text}!`;
      setTimeout(() => { copyFeedback = ''; }, 2200);
    }
  }

  function selectSwatch(hex) {
    activeSwatchHex = hex;
    const item = swatchDetails[hex] || { name: hex, ratio: '9.0:1 (AAA)', role: 'Brand Token' };
    activeSwatchName = item.name;
    activeContrastRatio = item.ratio;
    copyToClipboard(hex, `Copied ${item.name} (${hex}) to clipboard!`);
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

<!-- Ambient Mesh Gradient Orbs (Kinetic Background) -->
<div class="f-ambient-mesh" aria-hidden="true">
  <div class="f-mesh-orb orb-1"></div>
  <div class="f-mesh-orb orb-2"></div>
  <div class="f-mesh-orb orb-3"></div>
</div>

<!-- ================================================================
     CHAPTER 1: THE MASTER HERO & BRAND MANIFESTO
     ================================================================ -->
<SSHero
  eyebrow="<iconify-icon icon='fluent:sparkle-24-filled' style='font-size: 1.15rem; color: #6DC6EC; vertical-align: middle;' aria-hidden='true'></iconify-icon> <span>SuamiSihat™ Design System &bull; Story Edition</span>"
  title="One Source. Every Standard.<br>The Living Language of Men's Health."
  subtitle="Transforming healthcare across Southeast Asia by replacing clinical stigma with scientific precision, patient dignity, and unmistakable visual clarity."
  minHeight="560px"
>
  <div class="f-hero-ctas">
    <a href="#story" class="f-btn-hero-primary" id="hero-cta-story">
      <iconify-icon icon="fluent:book-compass-24-regular" aria-hidden="true"></iconify-icon>
      Read Brand Story
    </a>
    <a href="/components/" class="f-btn-hero-secondary" id="hero-cta-components">
      <iconify-icon icon="fluent:puzzle-piece-24-regular" aria-hidden="true"></iconify-icon>
      UI Components
    </a>
  </div>

  <!-- Minimal Glass Trust Badges -->
  <div class="f-hero-badges">
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:organization-24-regular" aria-hidden="true"></iconify-icon> 5 Operating Entities
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:layer-24-regular" aria-hidden="true"></iconify-icon> 24+ Fluent 2 Tokens
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:accessibility-24-regular" aria-hidden="true"></iconify-icon> WCAG AA Certified
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:code-circle-24-regular" aria-hidden="true"></iconify-icon> 100% Token Sync
    </span>
  </div>
</SSHero>

<main id="main-content" style="position: relative; z-index: 1;">
  <!-- ================================================================
       CHAPTER 2: DYNAMIC BENTO GRID — PURPOSE & THE 3 PILLARS
       ================================================================ -->
  <section id="story" class="f-section-block" aria-label="Brand Manifesto and Core Pillars">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">1</span>
      <span>The Brand Manifesto &amp; Pillars</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">What SuamiSihat Means as a Brand</h2>
      <p class="f-section-subtitle">
        In men's healthcare, design is not merely decoration — it is the bridge between vulnerability and medical trust.
      </p>
    </div>

    <!-- Chapter 2 Bento Architecture -->
    <div class="f-bento-grid">
      <!-- Bento Item 1: Large 8-Col Manifesto Hero Card with Kinetic Vitality Monitor -->
      <div class="f-bento-card f-bento-hero-card f-bento-span-8">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div class="f-manifesto-grid">
          <div>
            <div class="f-manifesto-badge-pill">
              <span class="f-pulse-dot"></span>
              <span>Core Brand Purpose</span>
            </div>
            <p class="f-manifesto-quote">
              &ldquo;For decades, men's wellness has been trapped between clinical intimidation and back-alley ambiguity. SuamiSihat restores patient dignity, clinical authority, and design excellence.&rdquo;
            </p>
            <p class="f-manifesto-lead">
              Pairing <strong>vitality Navy (<code class="f-code-token" style="color:var(--color-brand-primary);">#043388</code>)</strong> with <strong>radiant Azure (<code class="f-code-token" style="color:#21A1F7;">#21A1F7</code>)</strong> across physical clinics, prescription packaging, and digital teleconsultations.
            </p>
          </div>

          <!-- Pure Self-Contained Kinetic Vitality Monitor -->
          <div class="f-manifesto-animation-pane">
            <div class="f-vitality-beacon">
              <div class="f-beacon-pulse-ring ring-1"></div>
              <div class="f-beacon-pulse-ring ring-2"></div>
              <div class="f-beacon-core">
                <svg viewBox="0 0 64 64" fill="none" class="f-beacon-svg" aria-hidden="true">
                  <!-- Luminous Medical Shield -->
                  <path d="M32 6L14 14V28C14 42 21.8 54.4 32 58C42.2 54.4 50 42 50 28V14L32 6Z" fill="#043388" fill-opacity="0.25" stroke="#21A1F7" stroke-width="2.5" stroke-linejoin="round"/>
                  <!-- Vitality Heartbeat Pulse Path -->
                  <path d="M22 32H27L30 22L34 42L37 32H42" stroke="#21A1F7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="f-ecg-path"/>
                  <!-- Radiant Energy Nodes -->
                  <circle cx="32" cy="18" r="2.5" fill="#FCE53D" class="f-node-glow"/>
                  <circle cx="32" cy="46" r="2" fill="#6DC6EC" class="f-node-glow"/>
                </svg>
              </div>
            </div>
            <div class="f-lottie-caption-wrap">
              <span class="f-lottie-caption">Clinical Vitality Monitor &bull; 60:30:10</span>
              <span class="f-live-sync-chip"><span class="f-pulse-dot-green"></span> Active Token Sync</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bento Item 2: 4-Col Zero Brand Dilution Card -->
      <div class="f-bento-card f-bento-span-4">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div>
          <div class="f-pillar-icon-wrap">
            <div class="f-pillar-icon">
              <iconify-icon icon="fluent:box-multiple-24-regular"></iconify-icon>
            </div>
          </div>
          <h3 class="f-pillar-title">Zero Brand Dilution</h3>
          <p class="f-pillar-desc">
            5 operating subsidiaries and 8+ product lines synchronized under 1 authoritative token system.
          </p>
        </div>
        <div class="f-subsidiary-chips-row">
          <span class="f-sub-chip">SSH</span>
          <span class="f-sub-chip">SSC</span>
          <span class="f-sub-chip">SSW</span>
          <span class="f-sub-chip">SSE</span>
          <span class="f-sub-chip">SST</span>
        </div>
      </div>

      <!-- Bento Item 3: 4-Col Clinical Authority Card -->
      <div class="f-bento-card f-bento-span-4">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div class="f-pillar-icon-wrap">
          <div class="f-pillar-icon">
            <iconify-icon icon="fluent:shield-checkmark-24-regular"></iconify-icon>
          </div>
        </div>
        <h3 class="f-pillar-title">Clinical Authority</h3>
        <p class="f-pillar-desc">
          Strict color pairings and 1X clearspace rules engineered to reassure patients of medical expertise.
        </p>
      </div>

      <!-- Bento Item 4: 4-Col 10x Velocity Metric Card -->
      <div class="f-bento-card f-bento-span-4 f-bento-stat-card">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div class="f-bento-stat-val">10×</div>
        <div class="f-bento-stat-label">Shipping Velocity</div>
        <div class="f-velocity-meter" aria-hidden="true">
          <div class="f-velocity-bar"></div>
        </div>
        <p style="font-size: 0.825rem; color: var(--text-secondary); margin: 0.75rem 0 0; line-height: 1.5;">
          From 4-week turnaround down to 72 hours with ready Fluent 2 components.
        </p>
      </div>

      <!-- Bento Item 5: 4-Col Accessibility Card -->
      <div class="f-bento-card f-bento-span-4">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div class="f-pillar-icon-wrap">
          <div class="f-pillar-icon" style="background: rgba(34, 197, 94, 0.12); color: #22C55E;">
            <iconify-icon icon="fluent:accessibility-24-regular"></iconify-icon>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <h3 class="f-pillar-title" style="margin:0;">WCAG 2.1 AA</h3>
          <span class="f-score-badge">100% Pass</span>
        </div>
        <p class="f-pillar-desc">
          4-tier text contrast matrix strictly audited across canvas, elevated cards, and inverted buttons.
        </p>
      </div>
    </div>
  </section>

  <!-- ================================================================
       CHAPTER 3: INTERACTIVE GROUP ARCHITECTURE FLOW
       ================================================================ -->
  <section id="architecture" class="f-section-block" aria-label="Group Architecture Flow">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">2</span>
      <span>Group Architecture &amp; Token Pipeline</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">One Source of Truth: Group Architecture Flow</h2>
      <p class="f-section-subtitle">
        How the SuamiSihat Holding token engine synchronizes visual governance across the 4 operating companies.
      </p>
    </div>

    <div class="f-bento-card f-arch-flow-card">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      
      <!-- Interactive Architecture Tree -->
      <div class="f-arch-tree-container">
        <!-- Root Node (SSH Holding) -->
        <div class="f-arch-root-wrapper">
          <button 
            type="button" 
            class="f-arch-node-btn root {selectedEntity === 'SSH' ? 'active' : ''}" 
            onclick={() => { selectedEntity = 'SSH'; }}
          >
            <div class="f-node-tag">Group Holding</div>
            <div class="f-node-title">
              <iconify-icon icon="fluent:building-bank-24-filled" style="color:#21A1F7;"></iconify-icon>
              <span>SuamiSihat Holding Sdn Bhd (SS Health)</span>
            </div>
            <div class="f-node-sub">Single Source of Truth Token Pipeline</div>
          </button>
        </div>

        <!-- Glowing Connecting Data Bus Lines -->
        <div class="f-arch-bus-lines" aria-hidden="true">
          <div class="f-bus-vertical-stem"></div>
          <div class="f-bus-horizontal-bar"></div>
          <div class="f-bus-drop-lines">
            <span class="drop-line"></span>
            <span class="drop-line"></span>
            <span class="drop-line"></span>
            <span class="drop-line"></span>
          </div>
        </div>

        <!-- 4 Subsidiary Leaf Nodes -->
        <div class="f-arch-leaves-grid">
          <button 
            type="button" 
            class="f-arch-node-btn leaf {selectedEntity === 'SSC' ? 'active' : ''}" 
            onclick={() => { selectedEntity = 'SSC'; }}
          >
            <div class="f-leaf-badge" style="color: #6DC6EC;">02-SSC</div>
            <div class="f-leaf-name">SS Clinic</div>
            <div class="f-leaf-desc">Practice &amp; Telehealth</div>
          </button>

          <button 
            type="button" 
            class="f-arch-node-btn leaf {selectedEntity === 'SSW' ? 'active' : ''}" 
            onclick={() => { selectedEntity = 'SSW'; }}
          >
            <div class="f-leaf-badge" style="color: #FCE53D;">03-SSW</div>
            <div class="f-leaf-name">SS Wellness</div>
            <div class="f-leaf-desc">Supplements &amp; Care</div>
          </button>

          <button 
            type="button" 
            class="f-arch-node-btn leaf {selectedEntity === 'SSE' ? 'active' : ''}" 
            onclick={() => { selectedEntity = 'SSE'; }}
          >
            <div class="f-leaf-badge" style="color: #22C55E;">04-SSE</div>
            <div class="f-leaf-name">SS Ecommerce</div>
            <div class="f-leaf-desc">D2C Fulfillment</div>
          </button>

          <button 
            type="button" 
            class="f-arch-node-btn leaf {selectedEntity === 'SST' ? 'active' : ''}" 
            onclick={() => { selectedEntity = 'SST'; }}
          >
            <div class="f-leaf-badge" style="color: #A855F7;">05-SST</div>
            <div class="f-leaf-name">SS Technology</div>
            <div class="f-leaf-desc">EMR &amp; Software Hub</div>
          </button>
        </div>
      </div>

      <!-- Entity Inspector Panel -->
      <div class="f-arch-inspector-box">
        <div class="f-inspector-left">
          <div class="f-inspector-entity-badge">{entityData[selectedEntity].tag}</div>
          <div>
            <h3 class="f-inspector-entity-name">{entityData[selectedEntity].name}</h3>
            <p class="f-inspector-entity-role">{entityData[selectedEntity].role}</p>
          </div>
        </div>

        <div class="f-inspector-actions">
          <span class="f-inspector-status-pill">
            <span class="f-pulse-dot-green"></span> {entityData[selectedEntity].status}
          </span>
          <a href="/brand-system/#subbrand" class="f-inspector-link-btn">
            Inspect Subsidiary Tokens &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================
       CHAPTER 4: INTERACTIVE CASE STUDY
       ================================================================ -->
  <section id="case-study" class="f-section-block" aria-label="Interactive Case Study">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">3</span>
      <span>Interactive Case Study</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">Case Study: From 5 Silos to 1 Clinical Ecosystem</h2>
      <p class="f-section-subtitle">
        How standardizing on the SuamiSihat™ Design System transformed digital clinic workflows and physical packaging across the group.
      </p>
    </div>

    <div class="f-case-study-card">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div class="f-case-study-grid">
        <div>
          <div class="f-case-study-toggle-bar">
            <button 
              type="button" 
              class="f-case-toggle-btn {caseStudyState === 'before' ? 'active' : ''}" 
              onclick={() => { caseStudyState = 'before'; }}
            >
              Before System (2024)
            </button>
            <button 
              type="button" 
              class="f-case-toggle-btn {caseStudyState === 'after' ? 'active' : ''}" 
              onclick={() => { caseStudyState = 'after'; }}
            >
              With Design System (2026)
            </button>
          </div>

          {#if caseStudyState === 'before'}
            <div class="f-case-state-box">
              <div style="display: flex; align-items: center; gap: 8px; color: #DC2626; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem;">
                <iconify-icon icon="fluent:warning-24-filled"></iconify-icon>
                <span>Fragmented Silos &amp; Inconsistent Patient Touchpoints</span>
              </div>
              <ul class="f-case-points-list">
                <li>&bull; <strong>Color Drift:</strong> 7 conflicting shades of blue across clinic signage, boxes, and web.</li>
                <li>&bull; <strong>Slow Launches:</strong> Average of 4 weeks to create and clear a new product landing page.</li>
                <li>&bull; <strong>Code Duplication:</strong> Developers re-implemented button and modal styles from scratch for every app.</li>
                <li>&bull; <strong>Compliance Gaps:</strong> Inconsistent contrast on mobile screens failing accessibility audits.</li>
              </ul>
            </div>
          {:else}
            <div class="f-case-state-box">
              <div style="display: flex; align-items: center; gap: 8px; color: #16A34A; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem;">
                <iconify-icon icon="fluent:checkmark-circle-24-filled"></iconify-icon>
                <span>Single Source of Truth &amp; Automated Multi-Platform Sync</span>
              </div>
              <ul class="f-case-points-list">
                <li>&bull; <strong>W3C Token Pipeline:</strong> 1 master JSON updates CSS, Tailwind, Flutter, and WPF simultaneously.</li>
                <li>&bull; <strong>3-Day Turnaround:</strong> Pre-built Fluent 2 components cut landing page creation from 4 weeks to 72 hours.</li>
                <li>&bull; <strong>100% Brand Consistency:</strong> ANDROLAB, MENSS, Mensculine, and Rejal packaging approved with zero drift.</li>
                <li>&bull; <strong>WCAG 2.1 AA Certified:</strong> Strict 4-tier contrast pairing audited on every component.</li>
              </ul>
            </div>
          {/if}
        </div>

        <!-- Live Impact Metrics with Micro-Glow -->
        <div class="f-case-metrics-grid">
          <div class="f-metric-card">
            <div class="f-metric-val">+300%</div>
            <div class="f-metric-label">Release Velocity</div>
          </div>
          <div class="f-metric-card">
            <div class="f-metric-val">100%</div>
            <div class="f-metric-label">Token Parity</div>
          </div>
          <div class="f-metric-card">
            <div class="f-metric-val">0</div>
            <div class="f-metric-label">Brand Drift Incidents</div>
          </div>
          <div class="f-metric-card">
            <div class="f-metric-val">12k+</div>
            <div class="f-metric-label">Standardized Patients</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================
       CHAPTER 5: WHO SHOULD USE THIS? (INTERACTIVE ROLE HUB)
       ================================================================ -->
  <section id="roles" class="f-section-block" aria-label="Audience Hub">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">4</span>
      <span>Audience Persona Hub</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">Who Should Use the SuamiSihat™ System?</h2>
      <p class="f-section-subtitle">
        Explore tailor-made workflows, tools, and direct actions designed for every member of the SuamiSihat ecosystem.
      </p>
    </div>

    <!-- Role Switcher Tabs -->
    <div class="f-roles-nav" role="tablist">
      <button 
        type="button" 
        class="f-role-tab-btn {activeRole === 'engineer' ? 'active' : ''}" 
        onclick={() => { activeRole = 'engineer'; }}
        role="tab"
        aria-selected={activeRole === 'engineer'}
      >
        <iconify-icon icon="fluent:code-24-regular"></iconify-icon>
        <span>Engineers &amp; Developers</span>
      </button>

      <button 
        type="button" 
        class="f-role-tab-btn {activeRole === 'designer' ? 'active' : ''}" 
        onclick={() => { activeRole = 'designer'; }}
        role="tab"
        aria-selected={activeRole === 'designer'}
      >
        <iconify-icon icon="fluent:color-24-regular"></iconify-icon>
        <span>Brand &amp; Visual Designers</span>
      </button>

      <button 
        type="button" 
        class="f-role-tab-btn {activeRole === 'marketer' ? 'active' : ''}" 
        onclick={() => { activeRole = 'marketer'; }}
        role="tab"
        aria-selected={activeRole === 'marketer'}
      >
        <iconify-icon icon="fluent:megaphone-24-regular"></iconify-icon>
        <span>Marketing &amp; Content Creators</span>
      </button>

      <button 
        type="button" 
        class="f-role-tab-btn {activeRole === 'clinical' ? 'active' : ''}" 
        onclick={() => { activeRole = 'clinical'; }}
        role="tab"
        aria-selected={activeRole === 'clinical'}
      >
        <iconify-icon icon="fluent:doctor-24-regular"></iconify-icon>
        <span>Clinical &amp; Executive Operations</span>
      </button>
    </div>

    <!-- Active Persona Pane -->
    <div class="f-role-pane-card">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div class="f-role-grid">
        <div>
          {#if activeRole === 'engineer'}
            <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
              Engineered for Svelte 5, Flutter, Tailwind, &amp; W3C Tokens
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
              Zero runtime bloat, pre-configured CSS tokens, and instant code generation across platforms.
            </p>
            <ul class="f-role-features-list">
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Multi-Platform Tokens:</strong> W3C tokens compiled to CSS, SCSS, Tailwind, and Flutter Dart.</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Living Workbench:</strong> Interactive button variant testing and live code generation.</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Production Build Verified:</strong> Full static generation support with Synology Web Station sync.</span>
              </li>
            </ul>
            <a href="/components/" class="f-btn-hero-primary" style="display: inline-flex;">
              <iconify-icon icon="fluent:puzzle-piece-24-regular"></iconify-icon> Open Component Library
            </a>

          {:else if activeRole === 'designer'}
            <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
              Figma Tokens, Master Vectors, &amp; 1X Exclusion Standards
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
              Authoritative vector marks, clear space calculations, and 60:30:10 visual proportion rules.
            </p>
            <ul class="f-role-features-list">
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Vector Master Kits:</strong> Complete SVG logo packages with dark/light background variants.</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Clear Space Rules:</strong> Visualized 1X exclusion boundaries to preserve brand sanctity.</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>PDF Guidelines:</strong> Downloadable booklets for Logo &amp; Concept and Interior Architecture.</span>
              </li>
            </ul>
            <a href="/brand-system/" class="f-btn-hero-primary" style="display: inline-flex;">
              <iconify-icon icon="fluent:color-24-regular"></iconify-icon> Explore Brand System
            </a>

          {:else if activeRole === 'marketer'}
            <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
              Tone of Voice, SS CAM Desktop, &amp; Email Signatures
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
              Keep every communication on-brand, clinically sound, and visually polished across all campaigns.
            </p>
            <ul class="f-role-features-list">
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>SS CAM Workstation:</strong> Native Windows app for automated watermarking and color grading.</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Mail Signature Generator:</strong> 1-click on-brand email signatures for your subsidiary.</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Brand Voice Guide:</strong> Empathetic, scientifically accurate copywriting principles.</span>
              </li>
            </ul>
            <a href="/tools/" class="f-btn-hero-primary" style="display: inline-flex;">
              <iconify-icon icon="fluent:toolbox-24-regular"></iconify-icon> Access Staff Utilities
            </a>

          {:else}
            <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
              Subsidiary Hierarchy, Governance, &amp; Staff Onboarding
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
              Clear structural governance uniting SuamiSihat Holding and the 4 operating subsidiaries.
            </p>
            <ul class="f-role-features-list">
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Corporate Architecture:</strong> Certified organizational group hierarchy (SSH, SSC, SSW, SSE, SST).</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>First-Week Onboarding:</strong> Interactive checklist and brand orientation for new team members.</span>
              </li>
              <li class="f-role-feature-item">
                <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
                <span><strong>Patient Confidentiality:</strong> Interface standards that prioritize patient privacy and medical dignity.</span>
              </li>
            </ul>
            <a href="/onboarding/" class="f-btn-hero-primary" style="display: inline-flex;">
              <iconify-icon icon="fluent:handshake-24-regular"></iconify-icon> View Onboarding Guide
            </a>
          {/if}
        </div>

        <div class="f-persona-shortcut-card">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-brand-primary); text-transform: uppercase; margin-bottom: 0.5rem;">Quick Launch Shortcut</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-strong); margin-bottom: 0.5rem;">
            {activeRole === 'engineer' ? 'Component Sandbox' : activeRole === 'designer' ? 'Brand System Kit' : activeRole === 'marketer' ? 'SS CAM Desktop' : 'Staff Onboarding'}
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1rem;">
            {activeRole === 'engineer' ? 'Interactive playground with code snippets for web, Flutter, and Tailwind.' : activeRole === 'designer' ? 'Master SVGs, color specifications, and typography hierarchy.' : activeRole === 'marketer' ? 'Download the official Windows workstation for creative assets.' : 'Interactive day-by-day checklist to get up to speed in your first week.'}
          </p>
          <a 
            href={activeRole === 'engineer' ? '/components/' : activeRole === 'designer' ? '/brand-system/' : activeRole === 'marketer' ? '/tools/' : '/onboarding/'}
            class="f-btn-hero-primary" 
            style="width: 100%; justify-content: center; text-decoration: none;"
          >
            Launch Now &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================
       CHAPTER 6: DYNAMIC BENTO GRID — LIVING STUDIOS & MORPHING PALETTE
       ================================================================ -->
  <section id="studios" class="f-section-block" aria-label="Interactive Living Studios">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">5</span>
      <span>Living Studios &amp; Dynamic Tools</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">Visual Identity &amp; Living Studios</h2>
      <p class="f-section-subtitle">
        Explore real-time color morphing palettes, living UI components, and the 4-tier typography scale.
      </p>
    </div>

    <!-- Chapter 6 Bento Grid -->
    <div class="f-bento-grid">
      <!-- Bento Item 1: Wide 12-Col Real-time Morphing Color Studio -->
      <div class="f-bento-card f-bento-span-12 f-color-morph-card" style="--active-theme-color: {activeSwatchHex};">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 1.25rem; gap: 0.5rem;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 4px;">Dynamic Real-Time Color Morphing Studio</h3>
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Click any swatch to morph the ambient canvas atmosphere and calculate live contrast.</span>
          </div>
          <span class="f-live-contrast-tag">
            <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color:#22C55E;"></iconify-icon>
            <span>WCAG Contrast: <strong>{activeContrastRatio}</strong></span>
          </span>
        </div>

        <div class="f-interactive-palette-box">
          <div class="f-palette-swatches">
            <button 
              type="button" 
              class="f-palette-btn {activeSwatchHex === '#043388' ? 'selected' : ''}" 
              style="--swatch-bg: #043388;" 
              onclick={() => selectSwatch('#043388')} 
              title="Click to morph to SS Blue (#043388)"
            >
              <span class="f-swatch-label">SS Blue</span>
              <span class="f-swatch-code">#043388</span>
            </button>

            <button 
              type="button" 
              class="f-palette-btn {activeSwatchHex === '#022057' ? 'selected' : ''}" 
              style="--swatch-bg: #022057;" 
              onclick={() => selectSwatch('#022057')} 
              title="Click to morph to Prussian Blue (#022057)"
            >
              <span class="f-swatch-label">Prussian</span>
              <span class="f-swatch-code">#022057</span>
            </button>

            <button 
              type="button" 
              class="f-palette-btn {activeSwatchHex === '#21A1F7' ? 'selected' : ''}" 
              style="--swatch-bg: #21A1F7;" 
              onclick={() => selectSwatch('#21A1F7')} 
              title="Click to morph to Azure (#21A1F7)"
            >
              <span class="f-swatch-label">Azure</span>
              <span class="f-swatch-code">#21A1F7</span>
            </button>

            <button 
              type="button" 
              class="f-palette-btn {activeSwatchHex === '#6DC6EC' ? 'selected' : ''}" 
              style="--swatch-bg: #6DC6EC; color: #19191A;" 
              onclick={() => selectSwatch('#6DC6EC')} 
              title="Click to morph to Malibu (#6DC6EC)"
            >
              <span class="f-swatch-label" style="color:#19191A;">Malibu</span>
              <span class="f-swatch-code" style="color:rgba(25,25,26,0.7);">#6DC6EC</span>
            </button>

            <button 
              type="button" 
              class="f-palette-btn {activeSwatchHex === '#FCE53D' ? 'selected' : ''}" 
              style="--swatch-bg: #FCE53D; color: #19191A;" 
              onclick={() => selectSwatch('#FCE53D')} 
              title="Click to morph to Banana Yellow (#FCE53D)"
            >
              <span class="f-swatch-label" style="color:#19191A;">Banana</span>
              <span class="f-swatch-code" style="color:rgba(25,25,26,0.7);">#FCE53D</span>
            </button>

            <button 
              type="button" 
              class="f-palette-btn {activeSwatchHex === '#FCFAF6' ? 'selected' : ''}" 
              style="--swatch-bg: #FCFAF6; color: #19191A; border: 1px solid rgba(0,0,0,0.12);" 
              onclick={() => selectSwatch('#FCFAF6')} 
              title="Click to morph to Porcelain (#FCFAF6)"
            >
              <span class="f-swatch-label" style="color:#19191A;">Porcelain</span>
              <span class="f-swatch-code" style="color:rgba(25,25,26,0.7);">#FCFAF6</span>
            </button>
          </div>

          <div class="f-palette-inspector">
            <div class="f-inspector-chip" style="background: {activeSwatchHex}; color: {activeSwatchHex === '#FCFAF6' || activeSwatchHex === '#FCE53D' || activeSwatchHex === '#6DC6EC' ? '#19191A' : '#FFFFFF'};">
              <span class="f-inspector-name">{activeSwatchName}: <strong>{activeSwatchHex}</strong></span>
              <button type="button" class="f-inspector-copy-btn" onclick={() => copyToClipboard(activeSwatchHex, `Copied ${activeSwatchName} (${activeSwatchHex})!`)}>
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
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 1rem;">Living Component Workbench</h3>
        
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
            <button type="button" class="f-code-copy-btn" onclick={() => copyToClipboard(generatedCode(), 'Copied snippet to clipboard!')}>
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
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Core Documentation</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1.25rem;">
            Direct links to authoritative guidelines, PDF manuals, and product registries.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <a href="/brand-system/" class="f-quick-link-item">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">Brand System &amp; Tokens</span>
                <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
              </div>
            </a>
            <a href="/brand-guidelines/" class="f-quick-link-item">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">Brand PDF Manuals</span>
                <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
              </div>
            </a>
            <a href="/products/" class="f-quick-link-item">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">Product Catalogue</span>
                <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
              </div>
            </a>
          </div>
        </div>
        <div style="margin-top: 1.5rem;">
          <a href="/components/" class="f-btn-hero-primary" id="card-components" style="width: 100%; justify-content: center;">
            <iconify-icon icon="fluent:puzzle-piece-24-regular"></iconify-icon> All 24+ Components
          </a>
        </div>
      </div>

      <!-- Bento Item 4: 12-Col Typography Scale Lab -->
      <div class="f-bento-card f-bento-span-12">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 1.25rem; gap: 1rem;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 4px;">4-Tier Typography Hierarchy Lab</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">Type a test phrase to evaluate tracking, contrast, and font weights.</p>
          </div>
          <div class="f-type-input-bar">
            <input id="customTypeInput" type="text" bind:value={customTypePhrase} class="f-type-input" placeholder="Type a custom phrase..." />
          </div>
        </div>

        <div class="f-type-scale-rows">
          <button 
            type="button" 
            class="f-type-row" 
            onclick={() => copyToClipboard('--text-strong', 'Copied --text-strong token!')}
            aria-label="Copy --text-strong token"
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
            onclick={() => copyToClipboard('--text-primary', 'Copied --text-primary token!')}
            aria-label="Copy --text-primary token"
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
            onclick={() => copyToClipboard('--text-secondary', 'Copied --text-secondary token!')}
            aria-label="Copy --text-secondary token"
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
            onclick={() => copyToClipboard('--text-disabled', 'Copied --text-disabled token!')}
            aria-label="Copy --text-disabled token"
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

  <!-- ================================================================
       CHAPTER 7: DYNAMIC BENTO GRID — OPERATIONAL TOOLS & ECOSYSTEM
       ================================================================ -->
  <section id="tools-section" class="f-section-block" aria-label="Tools and Subsidiary Ecosystem">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">6</span>
      <span>Ecosystem &amp; Operational Launchpad</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">Tools &amp; Operational Resources</h2>
      <p class="f-section-subtitle">
        Practical creative utilities curated for daily marketing, clinical, and staff operations.
      </p>
    </div>

    <!-- Chapter 7 Bento Grid -->
    <div class="f-bento-grid">
      <!-- Bento Item 1: 6-Col SS CAM Workstation -->
      <a href="/tools/" class="f-bento-card f-bento-span-6 f-tool-card" id="card-sscam" aria-label="SS CAM Creative Asset Management" style="text-decoration: none;">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
          <div class="f-pillar-icon" style="margin: 0; background: rgba(4, 51, 136, 0.12); color: var(--color-brand-primary);">
            <iconify-icon icon="fluent:camera-24-regular"></iconify-icon>
          </div>
          <span class="f-badge-shimmer">Windows Native App</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">SS CAM (Desktop Workstation)</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Native desktop utility for batch watermarking, LUT color grading, and clinical asset management.
        </p>
        <div style="margin-top: 1.25rem; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; color: var(--color-brand-primary);">
          <span>Launch Tool Workstation</span> &rarr;
        </div>
      </a>

      <!-- Bento Item 2: 6-Col Mail Signature Generator -->
      <a href="/signature/" class="f-bento-card f-bento-span-6 f-tool-card" id="card-signature" aria-label="Mail Signature Generator" style="text-decoration: none;">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
          <div class="f-pillar-icon" style="margin: 0; background: rgba(33, 161, 247, 0.15); color: #21A1F7;">
            <iconify-icon icon="fluent:mail-template-24-regular"></iconify-icon>
          </div>
          <span class="f-badge-shimmer" style="color: #21A1F7; border-color: rgba(33,161,247,0.3);">Daily Utility</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Mail Signature Generator</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Generate standardized, on-brand HTML email signatures for your operating subsidiary in seconds.
        </p>
        <div style="margin-top: 1.25rem; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; color: var(--color-brand-primary);">
          <span>Generate Group Signature</span> &rarr;
        </div>
      </a>

      <!-- Bento Item 3: 4-Col Staff Onboarding -->
      <a href="/onboarding/" class="f-bento-card f-bento-span-4 f-tool-card" id="card-onboarding" aria-label="Staff Onboarding" style="text-decoration: none;">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div class="f-pillar-icon" style="margin: 0 0 1rem;">
          <iconify-icon icon="fluent:handshake-24-regular"></iconify-icon>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Staff Onboarding</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          First-week checklist, tool installations, and brand culture orientation.
        </p>
      </a>

      <!-- Bento Item 4: 4-Col System Docs & Changelog -->
      <a href="/doc/?doc=changelog" class="f-bento-card f-bento-span-4 f-tool-card" id="card-docs" aria-label="Documentation and Changelog" style="text-decoration: none;">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div class="f-pillar-icon" style="margin: 0 0 1rem;">
          <iconify-icon icon="fluent:document-bullet-list-24-regular"></iconify-icon>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">System Docs &amp; Log</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          v3.5 release notes, architecture roadmap, and brand voice standards.
        </p>
      </a>

      <!-- Bento Item 5: 4-Col SSNAS Cloud Server -->
      <a href="https://suamisihat.myds.me" class="f-bento-card f-bento-span-4 f-tool-card" id="card-dashboard" target="_blank" rel="noopener noreferrer" aria-label="SSNAS Dashboard" style="text-decoration: none;">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div class="f-pillar-icon" style="margin: 0 0 1rem; background: rgba(33, 161, 247, 0.12); color: #21A1F7;">
          <iconify-icon icon="fluent:server-24-regular"></iconify-icon>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">SSNAS Dashboard ↗</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Central internal file storage, raw asset packages, and Synology portal.
        </p>
      </a>

      <!-- Bento Item 6: 12-Col Operating Subsidiaries Ribbon -->
      <div class="f-bento-card f-bento-span-12">
        <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
        <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 1rem;">
          Operating Subsidiaries of SuamiSihat Group
        </div>
        <div class="f-subbrand-grid">
          <a href="/brand-system/#subbrand" class="f-subbrand-card" style="border-left: 4px solid #043388;">
            <span class="f-subbrand-code">SSH</span>
            <span class="f-subbrand-name">SuamiSihat Holding Sdn Bhd</span>
            <span class="f-subbrand-role">Holding Corporate (SS Health)</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card" style="border-left: 4px solid #6DC6EC;">
            <span class="f-subbrand-code" style="color:#6DC6EC;">SSC</span>
            <span class="f-subbrand-name">SS Clinic</span>
            <span class="f-subbrand-role">Clinical Practice</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card" style="border-left: 4px solid #FCE53D;">
            <span class="f-subbrand-code" style="color:#D97706;">SSW</span>
            <span class="f-subbrand-name">SS Wellness</span>
            <span class="f-subbrand-role">Lifestyle &amp; Care</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card" style="border-left: 4px solid #22C55E;">
            <span class="f-subbrand-code" style="color:#22C55E;">SSE</span>
            <span class="f-subbrand-name">SS Ecommerce</span>
            <span class="f-subbrand-role">Direct-to-Patient</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card" style="border-left: 4px solid #A855F7;">
            <span class="f-subbrand-code" style="color:#A855F7;">SST</span>
            <span class="f-subbrand-name">SS Technology</span>
            <span class="f-subbrand-role">Software &amp; Digital</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  /* ================================================================
     ULTRA-PREMIUM DYNAMIC BENTO GRID & ANIMATED STYLES
     ================================================================ */

  /* Kinetic Ambient Mesh Background */
  .f-ambient-mesh {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .f-mesh-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.25;
    animation: f-orb-drift 18s ease-in-out infinite alternate;
  }

  :global([data-theme="dark"]) .f-mesh-orb {
    opacity: 0.18;
  }

  .orb-1 {
    width: 480px;
    height: 480px;
    background: #043388;
    top: 15%;
    left: -100px;
  }

  .orb-2 {
    width: 520px;
    height: 520px;
    background: #21A1F7;
    top: 50%;
    right: -150px;
    animation-duration: 22s;
    animation-delay: -5s;
  }

  .orb-3 {
    width: 380px;
    height: 380px;
    background: #6DC6EC;
    bottom: -80px;
    left: 30%;
    animation-duration: 16s;
    animation-delay: -9s;
  }

  @keyframes f-orb-drift {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(60px, 40px) scale(1.1); }
    100% { transform: translate(-40px, 80px) scale(0.95); }
  }

  /* Chapter Badge */
  .f-chapter-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.725rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-brand-primary, #043388);
    background: rgba(4, 51, 136, 0.08);
    padding: 5px 14px;
    border-radius: 9999px;
    margin-bottom: 0.85rem;
    border: 1px solid rgba(4, 51, 136, 0.12);
  }

  :global([data-theme="dark"]) .f-chapter-badge {
    color: #6DC6EC;
    background: rgba(33, 161, 247, 0.12);
    border-color: rgba(33, 161, 247, 0.2);
  }

  .f-chapter-num {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 800;
  }

  :global([data-theme="dark"]) .f-chapter-num {
    background: #21A1F7;
    color: #000000;
  }

  /* Section Blocks */
  .f-section-block {
    width: 100%;
    box-sizing: border-box;
    padding: 4.5rem clamp(1.5rem, 5vw, 5rem) 2.5rem;
    margin: 0;
  }

  .f-section-head {
    margin-bottom: 2.25rem;
  }

  .f-section-title {
    font-size: clamp(1.75rem, 3.75vw, 2.5rem);
    font-weight: 800;
    color: var(--text-strong, #000000);
    letter-spacing: -0.025em;
    margin: 0 0 0.5rem;
    line-height: 1.18;
  }

  :global([data-theme="dark"]) .f-section-title {
    color: #FFFFFF;
  }

  .f-section-subtitle {
    font-size: 1rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    margin: 0;
    max-width: 720px;
    line-height: 1.6;
  }

  :global([data-theme="dark"]) .f-section-subtitle {
    color: rgba(252, 250, 246, 0.65);
  }

  /* Hero Section CTAs */
  .f-hero-ctas {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .f-btn-hero-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 9999px;
    background: #21A1F7;
    color: #022057;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none !important;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }

  .f-btn-hero-primary:hover {
    background: #6DC6EC;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(33, 161, 247, 0.4);
  }

  .f-btn-hero-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.1);
    color: #FFFFFF;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none !important;
    border: 1px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .f-btn-hero-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .f-hero-badges {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .f-hero-badge-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.775rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.08);
    padding: 6px 14px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
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
  .f-bento-span-6 { grid-column: span 6; }
  .f-bento-span-4 { grid-column: span 4; }

  @media (max-width: 1024px) {
    .f-bento-span-8, .f-bento-span-6 { grid-column: span 6; }
    .f-bento-span-4 { grid-column: span 3; }
  }

  @media (max-width: 768px) {
    .f-bento-span-12, .f-bento-span-8, .f-bento-span-6, .f-bento-span-4 {
      grid-column: span 1 !important;
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
    border-color: rgba(255, 255, 255, 0.09);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.08);
  }

  .f-bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(4, 51, 136, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.9);
    border-color: rgba(4, 51, 136, 0.3);
  }

  :global([data-theme="dark"]) .f-bento-card:hover {
    border-color: rgba(33, 161, 247, 0.4);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15);
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

  .f-bento-hero-card {
    background: linear-gradient(135deg, rgba(2, 32, 87, 0.05) 0%, rgba(4, 51, 136, 0.1) 100%);
    border: 1px solid rgba(4, 51, 136, 0.18);
  }

  :global([data-theme="dark"]) .f-bento-hero-card {
    background: linear-gradient(135deg, rgba(2, 20, 64, 0.8) 0%, rgba(4, 51, 136, 0.35) 100%);
    border-color: rgba(33, 161, 247, 0.25);
  }

  /* Stat Card & Velocity Bar */
  .f-bento-stat-card {
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .f-bento-stat-val {
    font-size: clamp(2.25rem, 4.5vw, 3.25rem);
    font-weight: 800;
    color: var(--color-brand-primary, #043388);
    line-height: 1;
    margin-bottom: 0.35rem;
    letter-spacing: -0.02em;
  }

  :global([data-theme="dark"]) .f-bento-stat-val {
    color: #21A1F7;
    text-shadow: 0 0 24px rgba(33, 161, 247, 0.4);
  }

  .f-bento-stat-label {
    font-size: 0.825rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .f-velocity-meter {
    width: 80%;
    height: 6px;
    background: rgba(4, 51, 136, 0.1);
    border-radius: 9999px;
    overflow: hidden;
    margin-top: 0.75rem;
  }

  :global([data-theme="dark"]) .f-velocity-meter {
    background: rgba(255, 255, 255, 0.1);
  }

  .f-velocity-bar {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #21A1F7, #22C55E);
    border-radius: 9999px;
    animation: f-velocity-glow 2.5s ease-in-out infinite alternate;
  }

  @keyframes f-velocity-glow {
    0% { transform: scaleX(0.7); opacity: 0.7; }
    100% { transform: scaleX(1); opacity: 1; filter: drop-shadow(0 0 6px #21A1F7); }
  }

  /* Score Badge */
  .f-score-badge {
    font-size: 0.725rem;
    font-weight: 800;
    background: rgba(34, 197, 94, 0.15);
    color: #22C55E;
    padding: 3px 8px;
    border-radius: 6px;
  }

  /* Code Token in Line */
  .f-code-token {
    font-family: monospace;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: 6px;
  }

  :global([data-theme="dark"]) .f-code-token {
    background: rgba(255, 255, 255, 0.08);
  }

  /* Manifesto Grid & Beacon */
  .f-manifesto-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  @media (max-width: 860px) {
    .f-manifesto-grid {
      grid-template-columns: 1fr;
    }
  }

  .f-manifesto-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-brand-primary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.75rem;
  }

  :global([data-theme="dark"]) .f-manifesto-badge-pill {
    color: #21A1F7;
  }

  .f-pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #21A1F7;
    box-shadow: 0 0 8px #21A1F7;
    animation: f-dot-pulse 1.8s infinite;
  }

  .f-pulse-dot-green {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22C55E;
    box-shadow: 0 0 8px #22C55E;
    animation: f-dot-pulse 1.8s infinite;
    display: inline-block;
  }

  @keyframes f-dot-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: 0.6; }
  }

  .f-manifesto-quote {
    font-size: clamp(1.15rem, 2.2vw, 1.45rem);
    font-weight: 600;
    line-height: 1.55;
    color: var(--text-strong, #000000);
    margin: 0 0 1.25rem;
    letter-spacing: -0.01em;
  }

  :global([data-theme="dark"]) .f-manifesto-quote {
    color: #FFFFFF;
  }

  .f-manifesto-lead {
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-secondary, rgba(25, 25, 26, 0.7));
    margin: 0;
  }

  :global([data-theme="dark"]) .f-manifesto-lead {
    color: rgba(252, 250, 246, 0.7);
  }

  .f-manifesto-animation-pane {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(4, 51, 136, 0.06);
    border: 1px solid rgba(4, 51, 136, 0.15);
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  :global([data-theme="dark"]) .f-manifesto-animation-pane {
    background: rgba(33, 161, 247, 0.08);
    border-color: rgba(33, 161, 247, 0.2);
  }

  /* Vitality Beacon Animated Graphic */
  .f-vitality-beacon {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .f-beacon-pulse-ring {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid #21A1F7;
    animation: f-beacon-pulse 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  .f-beacon-pulse-ring.ring-1 {
    width: 90px;
    height: 90px;
    animation-delay: 0s;
  }

  .f-beacon-pulse-ring.ring-2 {
    width: 120px;
    height: 120px;
    animation-delay: 1.5s;
  }

  @keyframes f-beacon-pulse {
    0% { transform: scale(0.6); opacity: 0.8; }
    100% { transform: scale(1.2); opacity: 0; }
  }

  .f-beacon-core {
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #022057 0%, #043388 100%);
    box-shadow: 0 8px 24px rgba(33, 161, 247, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .f-beacon-svg {
    width: 48px;
    height: 48px;
  }

  .f-ecg-path {
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    animation: f-ecg-dash 2.5s ease-in-out infinite;
  }

  @keyframes f-ecg-dash {
    0% { stroke-dashoffset: 60; }
    50% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -60; }
  }

  .f-node-glow {
    animation: f-node-pulse 2s infinite alternate;
  }

  @keyframes f-node-pulse {
    0% { transform: scale(0.8); opacity: 0.7; }
    100% { transform: scale(1.2); opacity: 1; }
  }

  .f-lottie-caption-wrap {
    margin-top: 0.65rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .f-lottie-caption {
    font-size: 0.775rem;
    font-weight: 700;
    color: var(--color-brand-primary, #043388);
    letter-spacing: 0.02em;
  }

  :global([data-theme="dark"]) .f-lottie-caption {
    color: #6DC6EC;
  }

  .f-live-sync-chip {
    font-size: 0.675rem;
    font-weight: 600;
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  /* Pillar Icon & Details */
  .f-pillar-icon-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 1.25rem;
  }

  .f-pillar-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    background: rgba(4, 51, 136, 0.08);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-pillar-icon {
    background: rgba(33, 161, 247, 0.15);
    color: #6DC6EC;
  }

  .f-pillar-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-strong, #000000);
    margin: 0 0 0.5rem;
  }

  :global([data-theme="dark"]) .f-pillar-title {
    color: #FFFFFF;
  }

  .f-pillar-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    margin: 0;
  }

  :global([data-theme="dark"]) .f-pillar-desc {
    color: rgba(252, 250, 246, 0.65);
  }

  .f-subsidiary-chips-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 1.25rem;
  }

  .f-sub-chip {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 4px 9px;
    border-radius: 6px;
    background: rgba(4, 51, 136, 0.08);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-sub-chip {
    background: rgba(33, 161, 247, 0.15);
    color: #21A1F7;
  }

  /* ================================================================
     CHAPTER 3: INTERACTIVE ARCHITECTURE TREE & GLOWING DATA BUS
     ================================================================ */
  .f-arch-flow-card {
    padding: 2.5rem;
  }

  .f-arch-tree-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .f-arch-root-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .f-arch-node-btn {
    border: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }

  .f-arch-node-btn.root {
    background: linear-gradient(135deg, #022057 0%, #043388 100%);
    color: #FFFFFF;
    padding: 1.25rem 2rem;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(4, 51, 136, 0.35);
    border: 2px solid transparent;
  }

  .f-arch-node-btn.root.active {
    border-color: #21A1F7;
    box-shadow: 0 0 0 4px rgba(33, 161, 247, 0.3), 0 12px 32px rgba(4, 51, 136, 0.5);
    transform: scale(1.03);
  }

  .f-node-tag {
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6DC6EC;
    margin-bottom: 4px;
  }

  .f-node-title {
    font-size: 1.15rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .f-node-sub {
    font-size: 0.775rem;
    opacity: 0.85;
    margin-top: 2px;
  }

  /* Data Bus Lines */
  .f-arch-bus-lines {
    width: 100%;
    max-width: 800px;
    height: 48px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .f-bus-vertical-stem {
    width: 2px;
    height: 24px;
    background: linear-gradient(180deg, #21A1F7, #6DC6EC);
    box-shadow: 0 0 8px #21A1F7;
  }

  .f-bus-horizontal-bar {
    width: 80%;
    height: 2px;
    background: #21A1F7;
    box-shadow: 0 0 8px #21A1F7;
  }

  .f-bus-drop-lines {
    width: 80%;
    display: flex;
    justify-content: space-between;
    height: 22px;
  }

  .drop-line {
    width: 2px;
    height: 100%;
    background: #21A1F7;
    box-shadow: 0 0 8px #21A1F7;
  }

  /* 4 Subsidiary Leaves Grid */
  .f-arch-leaves-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: 920px;
  }

  @media (max-width: 768px) {
    .f-arch-bus-lines {
      display: none;
    }
    .f-arch-leaves-grid {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 1rem;
    }
  }

  .f-arch-node-btn.leaf {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1.5px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.1));
    border-radius: 14px;
    padding: 1rem;
    text-align: center;
  }

  :global([data-theme="dark"]) .f-arch-node-btn.leaf {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .f-arch-node-btn.leaf:hover {
    transform: translateY(-3px);
    border-color: var(--color-brand-primary, #043388);
  }

  .f-arch-node-btn.leaf.active {
    border-color: #21A1F7;
    background: rgba(33, 161, 247, 0.08);
    box-shadow: 0 0 0 3px rgba(33, 161, 247, 0.25);
    transform: translateY(-3px);
  }

  .f-leaf-badge {
    font-size: 0.725rem;
    font-weight: 800;
    margin-bottom: 2px;
  }

  .f-leaf-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-strong);
  }

  .f-leaf-desc {
    font-size: 0.725rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  /* Entity Inspector */
  .f-arch-inspector-box {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  :global([data-theme="dark"]) .f-arch-inspector-box {
    background: rgba(10, 14, 22, 0.7);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-inspector-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .f-inspector-entity-badge {
    font-size: 0.85rem;
    font-weight: 800;
    padding: 6px 12px;
    border-radius: 8px;
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
  }

  :global([data-theme="dark"]) .f-inspector-entity-badge {
    background: #21A1F7;
    color: #000000;
  }

  .f-inspector-entity-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-strong);
    margin: 0;
  }

  .f-inspector-entity-role {
    font-size: 0.825rem;
    color: var(--text-secondary);
    margin: 2px 0 0;
  }

  .f-inspector-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .f-inspector-status-pill {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .f-inspector-link-btn {
    font-size: 0.825rem;
    font-weight: 700;
    color: var(--color-brand-primary);
    text-decoration: none !important;
    padding: 6px 14px;
    border-radius: 8px;
    background: rgba(4, 51, 136, 0.08);
    transition: all 0.2s ease;
  }

  :global([data-theme="dark"]) .f-inspector-link-btn {
    color: #21A1F7;
    background: rgba(33, 161, 247, 0.15);
  }

  .f-inspector-link-btn:hover {
    background: var(--color-brand-primary);
    color: #FFFFFF;
  }

  :global([data-theme="dark"]) .f-inspector-link-btn:hover {
    background: #21A1F7;
    color: #000000;
  }

  /* ================================================================
     CHAPTER 4: CASE STUDY
     ================================================================ */
  .f-case-study-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    padding: 2.25rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  }

  :global([data-theme="dark"]) .f-case-study-card {
    background: rgba(14, 20, 34, 0.72);
    border-color: rgba(255, 255, 255, 0.09);
  }

  .f-case-study-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2.5rem;
    align-items: center;
  }

  @media (max-width: 980px) {
    .f-case-study-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .f-case-study-toggle-bar {
    display: inline-flex;
    background: rgba(0, 0, 0, 0.05);
    padding: 4px;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  :global([data-theme="dark"]) .f-case-study-toggle-bar {
    background: rgba(255, 255, 255, 0.08);
  }

  .f-case-toggle-btn {
    background: transparent;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    padding: 8px 18px;
    border-radius: 9px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .f-case-toggle-btn.active {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(4, 51, 136, 0.25);
  }

  :global([data-theme="dark"]) .f-case-toggle-btn.active {
    background: #21A1F7;
    color: #000000;
    box-shadow: 0 4px 12px rgba(33, 161, 247, 0.3);
  }

  .f-case-state-box {
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    background: var(--color-neutral-bg-1, #FCFAF6);
    min-height: 190px;
  }

  :global([data-theme="dark"]) .f-case-state-box {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-case-points-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .f-case-metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .f-metric-card {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    border-radius: 16px;
    padding: 1.25rem 1rem;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :global([data-theme="dark"]) .f-metric-card {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-metric-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(4, 51, 136, 0.1);
  }

  .f-metric-val {
    font-size: clamp(1.85rem, 3.5vw, 2.5rem);
    font-weight: 800;
    color: var(--color-brand-primary, #043388);
    line-height: 1;
    margin-bottom: 4px;
  }

  :global([data-theme="dark"]) .f-metric-val {
    color: #21A1F7;
  }

  .f-metric-label {
    font-size: 0.775rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  /* Persona Hub */
  .f-roles-nav {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 1.75rem;
  }

  .f-role-tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
  }

  :global([data-theme="dark"]) .f-role-tab-btn {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: #FCFAF6;
  }

  .f-role-tab-btn:hover {
    border-color: var(--color-brand-primary, #043388);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-role-tab-btn:hover {
    border-color: #21A1F7;
    color: #21A1F7;
  }

  .f-role-tab-btn.active {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
    border-color: var(--color-brand-primary, #043388);
    box-shadow: 0 4px 14px rgba(4, 51, 136, 0.25);
  }

  :global([data-theme="dark"]) .f-role-tab-btn.active {
    background: #21A1F7;
    color: #000000;
    border-color: #21A1F7;
    box-shadow: 0 4px 14px rgba(33, 161, 247, 0.3);
  }

  .f-role-pane-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    padding: 2.25rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  }

  :global([data-theme="dark"]) .f-role-pane-card {
    background: rgba(14, 20, 34, 0.72);
    border-color: rgba(255, 255, 255, 0.09);
  }

  .f-role-grid {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  @media (max-width: 900px) {
    .f-role-grid {
      grid-template-columns: 1fr;
    }
  }

  .f-role-features-list {
    list-style: none;
    padding: 0;
    margin: 1.25rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .f-role-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.9rem;
    color: var(--text-primary);
    line-height: 1.5;
  }

  .f-role-feature-icon {
    color: #22C55E;
    font-size: 1.15rem;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .f-persona-shortcut-card {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  :global([data-theme="dark"]) .f-persona-shortcut-card {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
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
    color: #21A1F7;
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
    color: #21A1F7;
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
    color: #21A1F7;
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
    color: var(--text-disabled, rgba(25, 25, 26, 0.45));
  }

  :global([data-theme="dark"]) .f-type-caption {
    color: rgba(252, 250, 246, 0.45);
  }

  /* Tool Card Badges */
  .f-badge-shimmer {
    font-size: 0.725rem;
    font-weight: 700;
    background: rgba(4, 51, 136, 0.08);
    color: var(--color-brand-primary);
    padding: 4px 12px;
    border-radius: 9999px;
    border: 1px solid rgba(4, 51, 136, 0.15);
  }

  :global([data-theme="dark"]) .f-badge-shimmer {
    background: rgba(33, 161, 247, 0.12);
    color: #21A1F7;
    border-color: rgba(33, 161, 247, 0.25);
  }

  /* Subsidiaries Ribbon */
  .f-subbrand-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  .f-subbrand-card {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    border-radius: 14px;
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    text-decoration: none !important;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  :global([data-theme="dark"]) .f-subbrand-card {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-subbrand-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .f-subbrand-code {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--color-brand-primary, #043388);
    margin-bottom: 2px;
  }

  :global([data-theme="dark"]) .f-subbrand-code {
    color: #21A1F7;
  }

  .f-subbrand-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text-strong, #000000);
  }

  :global([data-theme="dark"]) .f-subbrand-name {
    color: #FFFFFF;
  }

  .f-subbrand-role {
    font-size: 0.725rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.6));
    margin-top: 2px;
  }

  /* Live Toast */
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
</style>
