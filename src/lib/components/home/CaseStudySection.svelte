<script>
  let caseStudyState = $state('after'); // 'before' | 'after'
</script>

<!-- ================================================================
     CHAPTER 4: INTERACTIVE CASE STUDY
     ================================================================ -->
<section id="case-study" class="f-section-block" aria-label="Interactive Case Study">
  <div class="f-section-overline">
    <span class="f-overline-label">Before and after</span>
    <span class="f-overline-rule" aria-hidden="true"></span>
  </div>

  <div class="f-section-head">
    <h2 class="f-section-title">What changed when we set one standard</h2>
    <p class="f-section-subtitle">
      Before, each team made its own colours and files. Now everyone works from the same hub.
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
            <div style="display: flex; align-items: center; gap: 8px; color: var(--color-error-fg); font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem;">
              <iconify-icon icon="fluent:warning-24-filled"></iconify-icon>
              <span>Each team did its own thing</span>
            </div>
            <ul class="f-case-points-list">
              <li>&bull; <strong>Colours didn't match:</strong> clinics, packs and social posts used different blues and yellows.</li>
              <li>&bull; <strong>Slow to build:</strong> every new page or app started from scratch.</li>
              <li>&bull; <strong>Work done twice:</strong> the website and the mobile app were styled separately.</li>
              <li>&bull; <strong>Hard to read:</strong> some text colours were too faint on screens.</li>
            </ul>
          </div>
        {:else}
          <div class="f-case-state-box">
            <div style="display: flex; align-items: center; gap: 8px; color: var(--color-success-fg); font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem;">
              <iconify-icon icon="fluent:checkmark-circle-24-filled"></iconify-icon>
              <span>One hub everyone uses</span>
            </div>
            <ul class="f-case-points-list">
              <li>&bull; <strong>One set of colours:</strong> the same colour codes on the website, the apps and the Windows tools.</li>
              <li>&bull; <strong>Every brand in one place:</strong> ANDROLAB, MENSS, Mensculine, REJAL and the rest each have a full brand page.</li>
              <li>&bull; <strong>Checked for readability:</strong> text colours are tested automatically in light and dark mode.</li>
            </ul>
          </div>
        {/if}
      </div>

      <!-- Live Impact Metrics with Micro-Glow -->
      <div class="f-case-metrics-grid">
        <div class="f-metric-card">
          <div class="f-metric-val">AA</div>
          <div class="f-metric-label">Readability standard met</div>
        </div>
        <div class="f-metric-card">
          <div class="f-metric-val">5</div>
          <div class="f-metric-label">Companies covered</div>
        </div>
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
    color: var(--color-text-accent);
  }

  .f-metric-label {
    font-size: 0.775rem;
    font-weight: 600;
    color: var(--text-secondary);
  }
</style>
