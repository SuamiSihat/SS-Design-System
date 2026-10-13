<script>
  let activeRole = $state('engineer'); // 'engineer' | 'designer' | 'marketer' | 'clinical'
</script>

<!-- ================================================================
     CHAPTER 5: WHO SHOULD USE THIS? (INTERACTIVE ROLE HUB)
     ================================================================ -->
<section id="roles" class="f-section-block" aria-label="Audience Hub">
  <div class="f-section-overline">
    <span class="f-overline-label">Audience Persona Hub</span>
    <span class="f-overline-rule" aria-hidden="true"></span>
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
              <span><strong>Corporate Architecture:</strong> Documented organisational group hierarchy (SSH, SSC, SSW, SSE, SST).</span>
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

  /* Bento Grid */

  @media (max-width: 480px) {
    .f-section-block {
      padding: 3.5rem 1.25rem 2rem;
    }
    .f-section-head {
      max-width: 100%;
    }
  }

  /* Bento Tier: Hero (elevated, glowing) */

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
    color: var(--color-text-accent);
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
    color: var(--color-success-fg);
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
</style>
