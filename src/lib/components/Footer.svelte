<script>
  import { theme } from '$lib/stores/theme.js';

  let logoSrc = $derived(
    $theme === 'dark'
      ? '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg'
      : '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg'
  );
</script>

<footer class="f-footer">
    <div class="f-footer-inner">
        <div>
            <img src={logoSrc} 
                 alt="SuamiSihat™ Logo" 
                 class="f-footer-logo" 
                 loading="lazy">
            <p class="f-footer-tagline">The single source of truth for the SuamiSihat™ design ecosystem. For internal staff use.</p>
        </div>
        <div>
            <p class="f-footer-heading">Hub</p>
            <ul class="f-footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/brand-system/">Brand System</a></li>
                <li><a href="/brand-guidelines/">Guidelines</a></li>
                <li><a href="/components/">Components</a></li>
                <li><a href="/products/">Products</a></li>
                <li><a href="/signature/">Mail Signature</a></li>
                <li><a href="/tools/">SS CAM &amp; Tools</a></li>
                <li><a href="/onboarding/">Onboarding</a></li>
            </ul>
        </div>
        <div>
            <p class="f-footer-heading">Resources</p>
            <ul class="f-footer-links">
                <li><a href="/doc/?doc=changelog">What's New</a></li>
                <li><a href="/doc/?doc=roadmap">Roadmap</a></li>
                <li><a href="/doc/?doc=contribution-guide">Contribution Guide</a></li>
                <li><a href="/doc/?doc=vision-mission">Vision &amp; Mission</a></li>
                <li><a href="https://nas.suamisihat.com.my/" target="_blank" rel="noopener noreferrer">SSNAS Dashboard &#8599;</a></li>
                <li><a href="https://suamisihat.com.my/brand-assets/" target="_blank" rel="noopener noreferrer">Official Brand Assets &#8599;</a></li>
            </ul>
        </div>
    </div>
    <div class="f-footer-bottom">
        <span class="f-footer-copy">&copy; 2026 SuamiSihat™. SuamiSihat Holding Sdn Bhd. All Rights Reserved.</span>
        <span class="f-footer-copy">SS Design System v3.5</span>
    </div>
</footer>

<style>
  .f-footer {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border-top: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    padding: var(--f-space-12, 3rem) clamp(1.5rem, 4vw, 4rem) var(--f-space-8, 2rem);
    transition: background 0.25s ease, border-color 0.25s ease;
    margin-top: auto;
    width: 100%;
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .f-footer {
    background: #090D16;
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .f-footer-inner {
    width: 100%;
    max-width: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: var(--f-space-8, 2rem);
  }

  @media (max-width: 768px) {
    .f-footer-inner {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .f-footer-logo {
    height: 64px;
    width: auto;
    margin-bottom: 0.75rem;
    display: block;
  }

  .f-footer-tagline {
    font-size: 0.85rem;
    color: var(--color-neutral-fg-2, #64748B);
    line-height: 1.6;
    max-width: 480px;
    margin: 0;
  }

  :global([data-theme="dark"]) .f-footer-tagline {
    color: #94A3B8;
  }

  .f-footer-heading {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-neutral-fg-3, #94A3B8);
    margin-bottom: 0.75rem;
  }

  .f-footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .f-footer-links a {
    font-size: 0.875rem;
    color: var(--color-neutral-fg-2, #64748B);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  :global([data-theme="dark"]) .f-footer-links a {
    color: #94A3B8;
  }

  .f-footer-links a:hover {
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-footer-links a:hover {
    color: #21A1F7;
  }

  .f-footer-bottom {
    width: 100%;
    max-width: 100%;
    margin: 2.5rem 0 0;
    padding-top: 1.25rem;
    border-top: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  :global([data-theme="dark"]) .f-footer-bottom {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .f-footer-copy {
    font-size: 0.85rem;
    color: var(--color-neutral-fg-3, #94A3B8);
  }
</style>
