<script>
  import { VERSION } from '$lib/version.js';
  import SSHero from '$lib/components/SSHero.svelte';
</script>

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
  eyebrow={`<iconify-icon icon='fluent:design-ideas-24-regular' style='font-size: 1.15rem; color: #6DC6EC; vertical-align: middle;' aria-hidden='true'></iconify-icon> <span>SuamiSihat® Design System &bull; v${VERSION}</span>`}
  title="The Single Source of Truth<br>for Design at SuamiSihat®."
  subtitle="Design tokens, Fluent 2 components, brand guidelines, and multi-platform export tools — everything your team needs to build consistent, on-brand products faster."
  minHeight="560px"
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
      <iconify-icon icon="fluent:color-24-regular" aria-hidden="true"></iconify-icon> Design Tokens
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:puzzle-piece-24-regular" aria-hidden="true"></iconify-icon> 24+ Components
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:accessibility-24-regular" aria-hidden="true"></iconify-icon> WCAG AA
    </span>
    <span class="f-hero-badge-item">
      <iconify-icon icon="fluent:phone-laptop-24-regular" aria-hidden="true"></iconify-icon> 4 Platforms
    </span>
  </div>

  <!-- Stat Rail -->
  <div class="f-hero-stat-rail">
    <div class="f-hero-stat-item">
      <span class="f-hero-stat-val">v{VERSION}</span>
      <span class="f-hero-stat-label">Current Release</span>
    </div>
    <div class="f-hero-stat-item">
      <span class="f-hero-stat-val">124</span>
      <span class="f-hero-stat-label">Tests Passing</span>
    </div>
    <div class="f-hero-stat-item">
      <span class="f-hero-stat-val">5</span>
      <span class="f-hero-stat-label">Sub-brands</span>
    </div>
    <div class="f-hero-stat-item">
      <span class="f-hero-stat-val">4</span>
      <span class="f-hero-stat-label">Platforms</span>
    </div>
  </div>
</SSHero>

<style>
  /* Kinetic Ambient Mesh Background — scoped to hero zone only */
  .f-ambient-mesh {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 640px;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .f-mesh-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(110px);
    opacity: 0.18;
    animation: f-orb-drift 18s ease-in-out infinite alternate;
  }

  :global([data-theme="dark"]) .f-mesh-orb {
    opacity: 0.12;
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

  .f-hero-badges {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 2rem;
  }

  .f-hero-badge-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.07);
    padding: 5px 13px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Hero Stat Rail */
  .f-hero-stat-rail {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin: 2rem 0 0;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .f-hero-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .f-hero-stat-val {
    font-size: 1.5rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .f-hero-stat-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }
</style>
