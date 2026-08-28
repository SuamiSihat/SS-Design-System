<script>
  import { theme } from '$lib/stores/theme.js';

  let logoSrc = $derived(
    $theme === 'dark'
      ? '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg'
      : '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg'
  );

  let feedbackSent = $state(false);

  function triggerFeedback() {
    feedbackSent = true;
    setTimeout(() => { feedbackSent = false; }, 3000);
  }
</script>

<footer id="fluent2-footer" class="fluent2-footer f-footer">
  <div class="f2-footer-content">
    <!-- Top Section: Wordmark on Left, Primary Nav Links on Right -->
    <section class="f2-footer-top">
      <div class="f2-footer-logo-wrap">
        <a href="/" aria-label="SuamiSihat Homepage">
          <img src={logoSrc} 
               alt="SuamiSihat™ Design System" 
               class="f2-footer-logo" 
               loading="lazy">
        </a>
      </div>

      <div>
        <p class="f-footer-heading">Resources</p>
        <ul class="f-footer-links">
            <li><a href="/doc/?doc=changelog">What's New</a></li>
            <li><a href="/doc/?doc=roadmap">Roadmap</a></li>
            <li><a href="/doc/?doc=brand-fluent2">Brand × Fluent 2</a></li>
            <li><a href="/doc/?doc=contribution-guide">Contribution Guide</a></li>
            <li><a href="/doc/?doc=vision-mission">Vision &amp; Mission</a></li>
            <li><a href="https://nas.suamisihat.com.my/" target="_blank" rel="noopener noreferrer">SSNAS Dashboard ↗</a></li>
            <li><a href="https://suamisihat.com.my/brand-assets/" target="_blank" rel="noopener noreferrer">Official Brand Assets ↗</a></li>
        </ul>
      </div>

      <ul class="f2-footer-links" aria-label="Bottom navigation">
        <li><a href="/" class="f2-footer-link">Home</a></li>
        <li><a href="/brand-system/" class="f2-footer-link">Brand System</a></li>
        <li><a href="/brand-guidelines/" class="f2-footer-link">Guidelines</a></li>
        <li><a href="/components/" class="f2-footer-link">Components</a></li>
        <li><a href="/products/" class="f2-footer-link">Products</a></li>
        <li><a href="/tools/" class="f2-footer-link">Tools</a></li>
        <li><a href="/signature/" class="f2-footer-link">Signature</a></li>
        <li><a href="https://suamisihat.myds.me" target="_blank" rel="noopener noreferrer" class="f2-footer-link f2-footer-ext">SSNAS ↗</a></li>
      </ul>
    </section>

    <!-- Fluent 2 Hairline Separator -->
    <hr class="f2-footer-sep">

    <!-- Bottom Section: Operating Entities on Left, Legal & Feedback on Right -->
    <section class="f2-footer-bottom">
      <div class="f2-social-links" aria-label="Operating Entities">
        <a href="/brand-system/#subbrand" class="f2-social-icon-btn" title="SuamiSihat Holding Sdn Bhd (SS Health)">
          <span>SSH</span>
        </a>
        <a href="/brand-system/#subbrand" class="f2-social-icon-btn" title="SS Clinic (SSC)">
          <span>SSC</span>
        </a>
        <a href="/brand-system/#subbrand" class="f2-social-icon-btn" title="SS Wellness (SSW)">
          <span>SSW</span>
        </a>
        <a href="/brand-system/#subbrand" class="f2-social-icon-btn" title="SS Ecommerce (SSE)">
          <span>SSE</span>
        </a>
        <a href="/brand-system/#subbrand" class="f2-social-icon-btn" title="SS Technology (SST)">
          <span>SST</span>
        </a>
      </div>

      <ul class="f2-external-links">
        <li>
          <button id="feedback-button" type="button" class="f2-feedback-btn" onclick={triggerFeedback}>
            {feedbackSent ? '✓ Thank you!' : 'Feedback'}
          </button>
        </li>
        <li><a href="mailto:branding@suamisihat.com" class="f2-ext-link">Contact SuamiSihat</a></li>
        <li><a href="/doc/?doc=vision-mission" class="f2-ext-link">Vision &amp; Mission</a></li>
        <li><a href="/doc/?doc=contribution-guide" class="f2-ext-link">Contribution Guide</a></li>
        <li><a href="/doc/?doc=changelog" class="f2-ext-link">Changelog</a></li>
        <li class="f2-copy">&copy; SuamiSihat <span id="copy-year">2026</span></li>
      </ul>
    </section>
  </div>
</footer>

<style>
  .f-footer {
    position: relative;
    background: var(--surface-canvas, #FCFAF6);
    padding: 3.5rem clamp(1.5rem, 5vw, 5rem) 2rem;
  }

  .f-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #022057 0%, #21A1F7 50%, #043388 100%);
  }

  :global([data-theme="dark"]) .f-footer {
    background: var(--surface-canvas-dark, #0D1220);
  }

  .fluent2-footer {
    width: 100%;
    box-sizing: border-box;
    background: #F5F5F7;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    padding: 1.15rem clamp(1.5rem, 5vw, 5rem) 1rem;
    margin-top: auto;
    font-family: inherit;
    transition: background 0.2s ease, border-color 0.2s ease;
    position: relative;
    z-index: 10;
  }

  :global([data-theme="dark"]) .fluent2-footer {
    background: #141414;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .f2-footer-content {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }

  .f2-footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
  }

  .f2-footer-logo-wrap a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  .f2-footer-logo {
    height: 24px;
    width: auto;
    display: block;
  }

  .f2-footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.25rem 1.75rem;
  }

  @media (max-width: 768px) {
    .f2-footer-links {
      gap: 0.75rem 1.25rem;
    }
  }

  .f2-footer-link {
    font-size: 0.825rem;
    font-weight: 500;
    color: var(--text-primary, #19191A) !important;
    text-decoration: none !important;
    opacity: 1 !important;
    transition: color 0.15s ease;
  }

  :global([data-theme="dark"]) .f2-footer-link {
    color: var(--text-primary, #FCFAF6) !important;
  }

  .f2-footer-link:hover {
    color: var(--color-brand-primary, #043388) !important;
  }

  :global([data-theme="dark"]) .f2-footer-link:hover {
    color: var(--color-accent, #21A1F7) !important;
  }

  .f2-footer-ext {
    font-weight: 600;
  }

  .f2-footer-sep {
    border: 0;
    height: 1px;
    background: var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    margin: 0.75rem 0 0.65rem;
    padding: 0;
  }

  :global([data-theme="dark"]) .f2-footer-sep {
    background: var(--color-neutral-stroke-1, rgba(255, 255, 255, 0.08));
  }

  .f2-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
  }

  .f2-social-links {
    display: flex;
    align-items: center;
    gap: 6px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .f2-social-icon-btn {
    width: 26px;
    height: 22px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-secondary, rgba(25, 25, 26, 0.7)) !important;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none !important;
    transition: background 0.15s ease, color 0.15s ease;
  }

  :global([data-theme="dark"]) .f2-social-icon-btn {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-secondary, rgba(252, 250, 246, 0.7)) !important;
  }

  .f2-social-icon-btn:hover {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF !important;
  }

  :global([data-theme="dark"]) .f2-social-icon-btn:hover {
    background: var(--color-accent, #21A1F7);
    color: #000000 !important;
  }

  .f2-external-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.15rem;
    font-size: 0.725rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65)) !important;
  }

  :global([data-theme="dark"]) .f2-external-links {
    color: var(--text-secondary, rgba(252, 250, 246, 0.65)) !important;
  }

  .f2-feedback-btn {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 0.725rem;
    font-family: inherit;
    font-weight: 500;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65)) !important;
    cursor: pointer;
    transition: color 0.15s ease;
  }

  :global([data-theme="dark"]) .f2-feedback-btn {
    color: var(--text-secondary, rgba(252, 250, 246, 0.65)) !important;
  }

  .f2-feedback-btn:hover {
    color: var(--color-brand-primary, #043388) !important;
  }

  :global([data-theme="dark"]) .f2-feedback-btn:hover {
    color: var(--color-accent, #21A1F7) !important;
  }

  .f2-ext-link {
    color: var(--text-secondary, rgba(25, 25, 26, 0.65)) !important;
    text-decoration: none !important;
    transition: color 0.15s ease;
  }

  :global([data-theme="dark"]) .f2-ext-link {
    color: var(--text-secondary, rgba(252, 250, 246, 0.65)) !important;
  }

  .f2-ext-link:hover {
    color: var(--text-strong, #000000) !important;
  }

  :global([data-theme="dark"]) .f2-ext-link:hover {
    color: var(--text-strong, #FFFFFF) !important;
  }

  .f2-copy {
    color: var(--text-secondary, rgba(25, 25, 26, 0.65)) !important;
    font-weight: 400;
  }

  :global([data-theme="dark"]) .f2-copy {
    color: var(--text-secondary, rgba(252, 250, 246, 0.65)) !important;
  }
</style>
