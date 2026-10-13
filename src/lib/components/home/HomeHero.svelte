<script>
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
  eyebrow={`<iconify-icon icon='fluent:design-ideas-24-regular' style='font-size: 1.15rem; color: #6DC6EC; vertical-align: middle;' aria-hidden='true'></iconify-icon> <span>SuamiSihat® Brand Hub</span>`}
  title="Our brand,<br>all in one place."
  subtitle="Logos, colours, brand guides and templates for SuamiSihat®, SS Clinic and every product brand. Find it, download it, get back to work."
  minHeight="520px"
>
  <div class="f-hero-ctas">
    <a href="/brand-system/#downloads" class="f-btn-hero-primary" id="hero-cta-brand">
      <iconify-icon icon="fluent:arrow-download-24-regular" aria-hidden="true"></iconify-icon>
      Get the logo
    </a>
    <a href="/brand-guidelines/" class="f-btn-hero-secondary" id="hero-cta-components">
      <iconify-icon icon="fluent:book-open-24-regular" aria-hidden="true"></iconify-icon>
      Open the brand guides
    </a>
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
</style>
