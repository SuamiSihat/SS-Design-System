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

<footer id="fluent2-footer" class="fluent2-footer">
  <div class="footer-content">
    <!-- Top Section: Logo on Left, Navigation on Right -->
    <section class="footer-top">
      <div class="footer-logo-wrap">
        <a href="/" aria-label="SuamiSihat Homepage">
          <img src={logoSrc} 
               alt="SuamiSihat™ Design System" 
               class="footer-logo" 
               loading="lazy">
        </a>
      </div>

      <ul class="footer-links" aria-label="Bottom navigation">
        <li><a href="/" class="footer-link">Home</a></li>
        <li><a href="/brand-system/" class="footer-link">Brand System</a></li>
        <li><a href="/brand-guidelines/" class="footer-link">Guidelines</a></li>
        <li><a href="/components/" class="footer-link">Components</a></li>
        <li><a href="/products/" class="footer-link">Products</a></li>
        <li><a href="/tools/" class="footer-link">Tools</a></li>
        <li><a href="/signature/" class="footer-link">Signature</a></li>
        <li><a href="https://suamisihat.myds.me" target="_blank" rel="noopener noreferrer" class="footer-link footer-ext">SSNAS ↗</a></li>
      </ul>
    </section>

    <!-- Fluent 2 Hairline Separator -->
    <hr class="sep">

    <!-- Bottom Section: Entity Icons on Left, Legal & Feedback on Right -->
    <section class="footer-bottom">
      <div class="social-links" aria-label="Operating Entities">
        <a href="/brand-system/#subbrand" class="social-icon-btn" title="SS Health (SSH)">
          <span>SSH</span>
        </a>
        <a href="/brand-system/#subbrand" class="social-icon-btn" title="SS Clinic (SSC)">
          <span>SSC</span>
        </a>
        <a href="/brand-system/#subbrand" class="social-icon-btn" title="SS Wellness (SSW)">
          <span>SSW</span>
        </a>
        <a href="/brand-system/#subbrand" class="social-icon-btn" title="SS Ecommerce (SSE)">
          <span>SSE</span>
        </a>
        <a href="/brand-system/#subbrand" class="social-icon-btn" title="SS Technology (SST)">
          <span>SST</span>
        </a>
      </div>

      <ul class="external-links">
        <li>
          <button id="feedback-button" type="button" class="feedback-btn" onclick={triggerFeedback}>
            {feedbackSent ? '✓ Thank you!' : 'Feedback'}
          </button>
        </li>
        <li><a href="mailto:branding@suamisihat.com" class="ext-link">Contact SuamiSihat</a></li>
        <li><a href="/doc/?doc=vision-mission" class="ext-link">Vision &amp; Mission</a></li>
        <li><a href="/doc/?doc=contribution-guide" class="ext-link">Contribution Guide</a></li>
        <li><a href="/doc/?doc=changelog" class="ext-link">Changelog</a></li>
        <li class="copy">&copy; SuamiSihat <span id="copy-year">2026</span></li>
      </ul>
    </section>
  </div>
</footer>

<style>
  /* ================================================================
     Microsoft Fluent 2 Official Compact Horizon Footer Specification
     ================================================================ */
  .fluent2-footer {
    width: 100%;
    box-sizing: border-box;
    background: #F5F5F7;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    padding: 1.15rem clamp(1.5rem, 5vw, 5rem) 1rem;
    margin-top: auto;
    font-family: inherit;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  :global([data-theme="dark"]) .fluent2-footer {
    background: #141414;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .footer-content {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }

  /* Top Section */
  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
  }

  .footer-logo-wrap a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  .footer-logo {
    height: 24px;
    width: auto;
    display: block;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.25rem 1.75rem;
  }

  @media (max-width: 768px) {
    .footer-links {
      gap: 0.75rem 1.25rem;
    }
  }


