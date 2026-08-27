<script>
  import SSHero from '$lib/components/SSHero.svelte';
  import { theme } from '$lib/stores/theme.js';

  let isDarkMode = $derived($theme === 'dark');

  // 1. Interactive Case Study State
  let caseStudyState = $state('after'); // 'before' | 'after'

  // 2. Interactive Role / Persona Hub State
  let activeRole = $state('engineer'); // 'engineer' | 'designer' | 'marketer' | 'clinical'

  // 3. Interactive Component Workbench State
  let btnVariant = $state('primary'); // 'primary' | 'secondary' | 'outline' | 'subtle'
  let btnSize = $state('md'); // 'sm' | 'md' | 'lg'
  let isToggleActive = $state(true);
  let clickCounter = $state(0);
  let sampleInput = $state('SS Clinic KL Gateway');
  let activeCodeTab = $state('web'); // 'web' | 'flutter' | 'tailwind' | 'token'
  let copyFeedback = $state('');

  // 4. Interactive Typography Scale Tester
  let customTypePhrase = $state('Clinical Precision. Human-First Design.');

  // 5. Interactive Color Swatch State
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
     CHAPTER 1: THE MASTER HERO & BRAND MANIFESTO
     ================================================================ -->
<SSHero
  eyebrow="<iconify-icon icon='fluent:sparkle-24-filled' style='font-size: 1.15rem; color: #6DC6EC; vertical-align: middle;' aria-hidden='true'></iconify-icon> <span>SuamiSihat™ Design System &bull; Story Edition</span>"
  title="One Source. Every Standard.<br>The Living Language of Men's Health."
  subtitle="Transforming healthcare across Southeast Asia by replacing clinical stigma with scientific precision, patient dignity, and unmistakable visual clarity."
  minHeight="540px"
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

<main id="main-content">
  <!-- ================================================================
       CHAPTER 2: BENTO GRID — WHAT IT MEANS & THE 3 PILLARS
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
      <!-- Bento Item 1: Large 8-Col Manifesto Card with Lottie Beacon -->
      <div class="f-bento-card f-bento-hero-card f-bento-span-8">
        <div class="f-manifesto-grid">
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-brand-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;">
              Core Brand Purpose
            </div>
            <p class="f-manifesto-quote">
              &ldquo;For decades, men's wellness has been trapped between clinical intimidation and back-alley ambiguity. SuamiSihat restores patient dignity, clinical authority, and design excellence.&rdquo;
            </p>
            <p class="f-manifesto-lead">
              Pairing <strong>vitality Navy (<code style="color:var(--color-brand-primary);">#043388</code>)</strong> with <strong>radiant Azure (<code style="color:#21A1F7;">#21A1F7</code>)</strong> across physical clinics, prescription packaging, and teleconsultations.
            </p>
          </div>

          <div class="f-manifesto-animation-pane">
            <div class="f-lottie-wrap">
              <dotlottie-player
                src="https://lottie.host/80a2ba19-75a6-43d9-9524-ae13f05b00cb/nB9sM4WqgB.lottie"
                background="transparent"
                speed="1"
                style="width: 130px; height: 130px;"
                loop
                autoplay
              ></dotlottie-player>
            </div>
            <span class="f-lottie-caption">Clinical Trust &bull; 60:30:10 Ratio</span>
          </div>
        </div>
      </div>

      <!-- Bento Item 2: 4-Col Zero Brand Dilution Card -->
      <div class="f-bento-card f-bento-span-4" style="justify-content: space-between;">
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
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 1.25rem;">
          <span style="font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">SSH</span>
          <span style="font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">SSC</span>
          <span style="font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">SSW</span>
          <span style="font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">SSE</span>
          <span style="font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">SST</span>
        </div>
      </div>

      <!-- Bento Item 3: 4-Col Clinical Authority Card -->
      <div class="f-bento-card f-bento-span-4">
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
      <div class="f-bento-card f-bento-span-4" style="text-align: center; justify-content: center; align-items: center;">
        <div class="f-bento-stat-val">10×</div>
        <div class="f-bento-stat-label">Shipping Velocity</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0.5rem 0 0;">
          From 4-week turnaround down to 72 hours with ready Fluent 2 components.
        </p>
      </div>

      <!-- Bento Item 5: 4-Col Accessibility Card -->
      <div class="f-bento-card f-bento-span-4">
        <div class="f-pillar-icon-wrap">
          <div class="f-pillar-icon" style="background: rgba(22, 163, 74, 0.1); color: #16A34A;">
            <iconify-icon icon="fluent:accessibility-24-regular"></iconify-icon>
          </div>
        </div>
        <h3 class="f-pillar-title">WCAG 2.1 AA Certified</h3>
        <p class="f-pillar-desc">
          4-tier text contrast matrix strictly audited across canvas, elevated cards, and inverted buttons.
        </p>
      </div>
    </div>
  </section>

  <!-- ================================================================
       CHAPTER 3: INTERACTIVE CASE STUDY
       ================================================================ -->
  <section id="case-study" class="f-section-block" aria-label="Interactive Case Study" style="background: rgba(4, 51, 136, 0.02);">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">2</span>
      <span>Interactive Case Study</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">Case Study: From 5 Silos to 1 Clinical Ecosystem</h2>
      <p class="f-section-subtitle">
        How standardizing on the SuamiSihat™ Design System transformed digital clinic workflows and physical packaging across the group.
      </p>
    </div>

    <div class="f-case-study-card">
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
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.875rem; color: var(--text-secondary);">
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
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.875rem; color: var(--text-secondary);">
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
       CHAPTER 4: WHO SHOULD USE THIS? (INTERACTIVE ROLE HUB)
       ================================================================ -->
  <section id="roles" class="f-section-block" aria-label="Audience Hub">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">3</span>
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

        <div style="background: var(--color-neutral-bg-1); border: 1px solid var(--color-neutral-stroke-1); border-radius: 16px; padding: 1.5rem; text-align: center;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-brand-primary); text-transform: uppercase; margin-bottom: 0.5rem;">Quick Launch Shortcut</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-strong); margin-bottom: 0.5rem;">
            {activeRole === 'engineer' ? 'Component Sandbox' : activeRole === 'designer' ? 'Brand System Kit' : activeRole === 'marketer' ? 'SS CAM Desktop' : 'Staff Onboarding'}
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1rem;">
            {activeRole === 'engineer' ? 'Interactive playground with code snippets for web, Flutter, and Tailwind.' : activeRole === 'designer' ? 'Master SVGs, color specifications, and typography hierarchy.' : activeRole === 'marketer' ? 'Download the official Windows workstation for creative assets.' : 'Interactive day-by-day checklist to get up to speed in your first week.'}
          </p>
          <a 
            href={activeRole === 'engineer' ? '/components/' : activeRole === 'designer' ? '/brand-system/' : activeRole === 'marketer' ? '/tools/' : '/onboarding/'}
            class="ss-btn ss-btn-secondary" 
            style="width: 100%; justify-content: center; text-decoration: none;"
          >
            Launch Now &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================
       CHAPTER 5: BENTO GRID — LIVING STUDIOS & CAPABILITIES
       ================================================================ -->
  <section id="studios" class="f-section-block" aria-label="Interactive Living Studios">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">4</span>
      <span>Living Studios &amp; Tools</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">Visual Identity &amp; Living Studios</h2>
      <p class="f-section-subtitle">
        Explore interactive color palettes, living UI components, and the 4-tier typography scale.
      </p>
    </div>

    <!-- Chapter 5 Bento Grid -->
    <div class="f-bento-grid">
      <!-- Bento Item 1: Wide 12-Col Color Studio -->
      <div class="f-bento-card f-bento-span-12">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0;">Interactive Color Harmony Studio</h3>
          <span style="font-size: 0.775rem; color: var(--text-secondary);">Click any swatch to copy HEX &amp; inspect contrast</span>
        </div>

        <div class="f-interactive-palette-box" style="margin: 0;">
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

          <div class="f-palette-inspector">
            <div class="f-inspector-chip" style="background: {activeSwatchHex}; color: {activeSwatchHex === '#FCFAF6' || activeSwatchHex === '#FCE53D' || activeSwatchHex === '#6DC6EC' ? '#19191A' : '#FFFFFF'};">
              <span class="f-inspector-name">{activeSwatchName}: <strong>{activeSwatchHex}</strong></span>
              <button type="button" class="f-inspector-copy-btn" onclick={() => copyToClipboard(activeSwatchHex, `Copied ${activeSwatchName} (${activeSwatchHex})!`)}>
                <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy HEX
              </button>
            </div>
            <span class="f-inspector-hint">60:30:10 Brand Harmony &bull; WCAG 2.1 Pass</span>
          </div>
        </div>
      </div>

      <!-- Bento Item 2: 8-Col Living Component Workbench -->
      <div class="f-bento-card f-bento-span-8">
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
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Core Documentation</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1.25rem;">
            Direct links to authoritative guidelines, PDF manuals, and product registries.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <a href="/brand-system/" class="f-card-foundation" id="card-brand-system" style="padding: 1rem; border-radius: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">Brand System &amp; Tokens</span>
                <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
              </div>
            </a>
            <a href="/brand-guidelines/" class="f-card-foundation" id="card-guidelines" style="padding: 1rem; border-radius: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-strong);">Brand PDF Manuals</span>
                <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
              </div>
            </a>
            <a href="/products/" class="f-card-foundation" id="card-products" style="padding: 1rem; border-radius: 14px;">
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
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 1.25rem;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 4px;">4-Tier Typography Hierarchy Lab</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">Type a test phrase to evaluate tracking, contrast, and font weights.</p>
          </div>
          <div class="f-type-input-bar" style="margin: 0; min-width: 280px;">
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
       CHAPTER 6: BENTO GRID — OPERATIONAL TOOLS & ECOSYSTEM
       ================================================================ -->
  <section id="tools-section" class="f-section-block" aria-label="Tools and Subsidiary Ecosystem">
    <div class="f-chapter-badge">
      <span class="f-chapter-num">5</span>
      <span>Ecosystem &amp; Tools</span>
    </div>

    <div class="f-section-head">
      <h2 class="f-section-title">Tools &amp; Operational Resources</h2>
      <p class="f-section-subtitle">
        Practical creative utilities curated for daily marketing, clinical, and staff operations.
      </p>
    </div>

    <!-- Chapter 6 Bento Grid -->
    <div class="f-bento-grid">
      <!-- Bento Item 1: 6-Col SS CAM Workstation -->
      <a href="/tools/" class="f-bento-card f-bento-span-6" id="card-sscam" aria-label="SS CAM Creative Asset Management" style="text-decoration: none;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
          <div class="f-pillar-icon" style="margin: 0;">
            <iconify-icon icon="fluent:camera-24-regular"></iconify-icon>
          </div>
          <span style="font-size: 0.725rem; font-weight: 700; background: rgba(4,51,136,0.08); color: var(--color-brand-primary); padding: 4px 10px; border-radius: 9999px;">Windows App</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">SS CAM (Desktop Workstation)</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Native desktop utility for batch watermarking, LUT color grading, and clinical asset management.
        </p>
        <div style="margin-top: 1.25rem; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; color: var(--color-brand-primary);">
          <span>Launch Tool</span> &rarr;
        </div>
      </a>

      <!-- Bento Item 2: 6-Col Mail Signature Generator -->
      <a href="/signature/" class="f-bento-card f-bento-span-6" id="card-signature" aria-label="Mail Signature Generator" style="text-decoration: none;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
          <div class="f-pillar-icon" style="margin: 0;">
            <iconify-icon icon="fluent:mail-template-24-regular"></iconify-icon>
          </div>
          <span style="font-size: 0.725rem; font-weight: 700; background: rgba(33,161,247,0.12); color: #21A1F7; padding: 4px 10px; border-radius: 9999px;">Daily Utility</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Mail Signature Generator</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Generate standardized, on-brand HTML email signatures for your operating subsidiary in seconds.
        </p>
        <div style="margin-top: 1.25rem; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; color: var(--color-brand-primary);">
          <span>Generate Signature</span> &rarr;
        </div>
      </a>

      <!-- Bento Item 3: 4-Col Staff Onboarding -->
      <a href="/onboarding/" class="f-bento-card f-bento-span-4" id="card-onboarding" aria-label="Staff Onboarding" style="text-decoration: none;">
        <div class="f-pillar-icon" style="margin: 0 0 1rem;">
          <iconify-icon icon="fluent:handshake-24-regular"></iconify-icon>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Staff Onboarding</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          First-week checklist, tool installations, and brand culture orientation.
        </p>
      </a>

      <!-- Bento Item 4: 4-Col System Docs & Changelog -->
      <a href="/doc/?doc=changelog" class="f-bento-card f-bento-span-4" id="card-docs" aria-label="Documentation and Changelog" style="text-decoration: none;">
        <div class="f-pillar-icon" style="margin: 0 0 1rem;">
          <iconify-icon icon="fluent:document-bullet-list-24-regular"></iconify-icon>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">System Docs &amp; Log</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          v3.5 release notes, architecture roadmap, and brand voice standards.
        </p>
      </a>

      <!-- Bento Item 5: 4-Col SSNAS Cloud Server -->
      <a href="https://suamisihat.myds.me" class="f-bento-card f-bento-span-4" id="card-dashboard" target="_blank" rel="noopener noreferrer" aria-label="SSNAS Dashboard" style="text-decoration: none;">
        <div class="f-pillar-icon" style="margin: 0 0 1rem; background: rgba(33, 161, 247, 0.1); color: #21A1F7;">
          <iconify-icon icon="fluent:server-24-regular"></iconify-icon>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">SSNAS Dashboard ↗</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Central internal file storage, raw asset packages, and Synology portal.
        </p>
      </a>

      <!-- Bento Item 6: 12-Col Operating Subsidiaries Ribbon -->
      <div class="f-bento-card f-bento-span-12">
        <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 1rem;">
          Operating Subsidiaries of SuamiSihat Group
        </div>
        <div class="f-subbrand-grid">
          <a href="/brand-system/#subbrand" class="f-subbrand-card">
            <span class="f-subbrand-code">SSH</span>
            <span class="f-subbrand-name">SS Health</span>
            <span class="f-subbrand-role">Holding Corporate</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card">
            <span class="f-subbrand-code">SSC</span>
            <span class="f-subbrand-name">SS Clinic</span>
            <span class="f-subbrand-role">Clinical Practice</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card">
            <span class="f-subbrand-code">SSW</span>
            <span class="f-subbrand-name">SS Wellness</span>
            <span class="f-subbrand-role">Lifestyle &amp; Care</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card">
            <span class="f-subbrand-code">SSE</span>
            <span class="f-subbrand-name">SS Ecommerce</span>
            <span class="f-subbrand-role">Direct-to-Patient</span>
          </a>
          <a href="/brand-system/#subbrand" class="f-subbrand-card">
            <span class="f-subbrand-code">SST</span>
            <span class="f-subbrand-name">SS Technology</span>
            <span class="f-subbrand-role">Software &amp; Digital</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
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

  /* Manifesto Grid & Lottie Animation Pane */
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

  .f-manifesto-animation-pane {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(4, 51, 136, 0.05);
    border: 1px solid rgba(4, 51, 136, 0.12);
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
  }

  :global([data-theme="dark"]) .f-manifesto-animation-pane {
    background: rgba(33, 161, 247, 0.06);
    border-color: rgba(33, 161, 247, 0.15);
  }

  .f-lottie-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .f-lottie-caption {
    font-size: 0.775rem;
    font-weight: 600;
    color: var(--color-brand-primary, #043388);
    margin-top: 0.5rem;
    letter-spacing: 0.02em;
  }

  :global([data-theme="dark"]) .f-lottie-caption {
    color: #6DC6EC;
  }

  /* Pillar Icon Glows */
  .f-pillar-icon-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 1.25rem;
  }

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
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    text-decoration: none !important;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .f-subbrand-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-brand-primary, #043388);
  }

  .f-subbrand-code {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--color-brand-primary, #043388);
    margin-bottom: 2px;
  }

  .f-subbrand-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text-strong, #000000);
  }

  .f-subbrand-role {
    font-size: 0.725rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.6));
    margin-top: 2px;
  }
</style>
