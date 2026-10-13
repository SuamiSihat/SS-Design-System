<script>
  let activeRole = $state('marketer'); // 'engineer' | 'designer' | 'marketer' | 'clinical'
</script>

<!-- ================================================================
     CHAPTER 5: WHO SHOULD USE THIS? (INTERACTIVE ROLE HUB)
     ================================================================ -->
<section id="roles" class="f-section-block" aria-label="Audience Hub">
  <div class="f-section-overline">
    <span class="f-overline-label">Start here</span>
    <span class="f-overline-rule" aria-hidden="true"></span>
  </div>

  <div class="f-section-head">
    <h2 class="f-section-title">What are you working on?</h2>
    <p class="f-section-subtitle">
      Pick what fits and we'll point you to the right place.
    </p>
  </div>

  <!-- Role Switcher Tabs -->
  <div class="f-roles-nav" role="tablist">
    <button 
      type="button" 
      class="f-role-tab-btn {activeRole === 'marketer' ? 'active' : ''}" 
      onclick={() => { activeRole = 'marketer'; }}
      role="tab"
      aria-selected={activeRole === 'marketer'}
    >
      <iconify-icon icon="fluent:megaphone-24-regular"></iconify-icon>
      <span>I'm making a poster or post</span>
    </button>
    <button 
      type="button" 
      class="f-role-tab-btn {activeRole === 'clinical' ? 'active' : ''}" 
      onclick={() => { activeRole = 'clinical'; }}
      role="tab"
      aria-selected={activeRole === 'clinical'}
    >
      <iconify-icon icon="fluent:doctor-24-regular"></iconify-icon>
      <span>I work in the clinic</span>
    </button>
    <button 
      type="button" 
      class="f-role-tab-btn {activeRole === 'designer' ? 'active' : ''}" 
      onclick={() => { activeRole = 'designer'; }}
      role="tab"
      aria-selected={activeRole === 'designer'}
    >
      <iconify-icon icon="fluent:color-24-regular"></iconify-icon>
      <span>I'm a designer</span>
    </button>
    <button 
      type="button" 
      class="f-role-tab-btn {activeRole === 'engineer' ? 'active' : ''}" 
      onclick={() => { activeRole = 'engineer'; }}
      role="tab"
      aria-selected={activeRole === 'engineer'}
    >
      <iconify-icon icon="fluent:code-24-regular"></iconify-icon>
      <span>I'm building an app or website</span>
    </button>
  </div>

  <!-- Active Persona Pane -->
  <div class="f-role-pane-card">
    <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
    <div class="f-role-grid">
      <div>
        {#if activeRole === 'engineer'}
          <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
            Colours, fonts and buttons in code
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
            Ready-made colour codes and buttons for websites and apps, so you don't have to guess.
          </p>
          <ul class="f-role-features-list">
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Colour codes:</strong> ready for CSS, Tailwind and Flutter.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Try-out area:</strong> change a button and copy its code.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Tested:</strong> every change is checked before it goes live.</span>
            </li>
          </ul>
          <a href="/components/" class="f-btn-hero-primary" style="display: inline-flex;">
            <iconify-icon icon="fluent:puzzle-piece-24-regular"></iconify-icon> Open the components
          </a>

        {:else if activeRole === 'designer'}
          <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
            Logos, colours and layout rules
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
            The original logo files, how much space to leave around them, and how much of each colour to use.
          </p>
          <ul class="f-role-features-list">
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Logo files:</strong> every logo, for light and dark backgrounds.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Clear space:</strong> how much empty space to keep around the logo.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Brand guide PDFs:</strong> booklets to download, including logo and interior design.</span>
            </li>
          </ul>
          <a href="/brand-system/" class="f-btn-hero-primary" style="display: inline-flex;">
            <iconify-icon icon="fluent:color-24-regular"></iconify-icon> Open the brand page
          </a>

        {:else if activeRole === 'marketer'}
          <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
            Posts, posters, videos and email
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
            Everything you need to make content that looks and sounds like us.
          </p>
          <ul class="f-role-features-list">
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>SS CAM:</strong> Windows app that adds our watermark and colour style to photos and videos.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Email signature:</strong> make your official signature in a minute.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>How we speak:</strong> respectful, accurate, never shaming.</span>
            </li>
          </ul>
          <a href="/tools/" class="f-btn-hero-primary" style="display: inline-flex;">
            <iconify-icon icon="fluent:toolbox-24-regular"></iconify-icon> Open the tools
          </a>

        {:else}
          <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">
            Clinic materials and your first week
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
            The SS Clinic guide, how our companies fit together, and a checklist for new staff.
          </p>
          <ul class="f-role-features-list">
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Our companies:</strong> who does what across the group.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>First week:</strong> a checklist to get you started.</span>
            </li>
            <li class="f-role-feature-item">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-role-feature-icon"></iconify-icon>
              <span><strong>Patient privacy:</strong> rules that protect patients' privacy and dignity.</span>
            </li>
          </ul>
          <a href="/onboarding/" class="f-btn-hero-primary" style="display: inline-flex;">
            <iconify-icon icon="fluent:handshake-24-regular"></iconify-icon> Open the onboarding guide
          </a>
        {/if}
      </div>

      <div class="f-persona-shortcut-card">
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-brand-primary); text-transform: uppercase; margin-bottom: 0.5rem;">Quickest way in</div>
        <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-strong); margin-bottom: 0.5rem;">
          {activeRole === 'engineer' ? 'Try a button' : activeRole === 'designer' ? 'Logo and colour kit' : activeRole === 'marketer' ? 'Email signature' : 'SS Clinic guide'}
        </div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1rem;">
          {activeRole === 'engineer' ? 'Change a button and copy its code.' : activeRole === 'designer' ? 'Logo files, colours and fonts.' : activeRole === 'marketer' ? 'Make your official email signature in a minute.' : 'Logos, colours, the brand promise and rules for SS Clinic.'}
        </p>
        <a 
          href={activeRole === 'engineer' ? '/components/' : activeRole === 'designer' ? '/brand-system/' : activeRole === 'marketer' ? '/signature/' : '/products/ssclinic/'}
          class="f-btn-hero-primary" 
          style="width: 100%; justify-content: center; text-decoration: none;"
        >
          Open &rarr;
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
