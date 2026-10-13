<!-- The two brands every member of staff must know. -->
<section id="main-brands" class="hm-block" aria-labelledby="main-brands-title">
  <div class="hm-head">
    <p class="hm-eyebrow">Know these two first</p>
    <h2 id="main-brands-title" class="hm-title">Our two main brands</h2>
  </div>

  <div class="hm-brands">
    <a class="hm-brand" href="/brand-system/">
      <div class="hm-brand-logo">
        <img class="logo-light" src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg" alt="SuamiSihat® logo" />
        <img class="logo-dark" src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg" alt="" aria-hidden="true" />
      </div>
      <h3 class="hm-brand-name">SuamiSihat®</h3>
      <p class="hm-brand-text">The master brand. Every product, clinic and page sits under it.</p>
      <span class="hm-brand-cta">Open the SuamiSihat® guide &rarr;</span>
    </a>

    <a class="hm-brand" href="/products/ssclinic/">
      <div class="hm-brand-logo">
        <img class="logo-light" src="/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.svg" alt="SS Clinic logo" />
        <img class="logo-dark" src="/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_dark.svg" alt="" aria-hidden="true" />
      </div>
      <h3 class="hm-brand-name">SS Clinic</h3>
      <p class="hm-brand-text">Our clinics and telehealth: a proper check before any treatment.</p>
      <span class="hm-brand-cta">Open the SS Clinic guide &rarr;</span>
    </a>
  </div>

  <p class="hm-note">
    SuamiSihat Holding Sdn Bhd is the parent company and uses the SS Health logo.
    <a href="/brand-system/#subbrand">See how the companies fit together</a>.
  </p>
</section>

<style>
  .hm-block { padding: 3rem clamp(1.5rem, 5vw, 5rem) 1.5rem; }
  .hm-head { margin-bottom: 1.75rem; }
  .hm-eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-text-accent);
  }
  .hm-title {
    margin: 0;
    font-size: clamp(1.75rem, 3.6vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-strong);
  }
  .hm-brands { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
  @media (max-width: 768px) { .hm-brands { grid-template-columns: 1fr; } }
  @media (max-width: 480px) { .hm-block { padding: 2.5rem 1.25rem 1rem; } }
  .hm-brand {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.75rem;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.1));
    border-radius: 20px;
    background: var(--color-neutral-bg-1, #FCFAF6);
    text-decoration: none !important;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .hm-brand:hover,
  .hm-brand:focus-visible {
    transform: translateY(-3px);
    border-color: var(--color-brand-primary, #043388);
    box-shadow: 0 12px 28px rgba(4, 51, 136, 0.14);
  }
  .hm-brand-logo {
    display: flex;
    align-items: center;
    height: 72px;
    margin-bottom: 0.75rem;
  }
  .hm-brand-logo img { max-height: 100%; max-width: 100%; object-fit: contain; }
  .logo-dark { display: none; }
  :global([data-theme="dark"]) .logo-light { display: none; }
  :global([data-theme="dark"]) .logo-dark { display: block; }
  .hm-brand-name { margin: 0; font-size: 1.4rem; font-weight: 800; color: var(--text-strong); }
  .hm-brand-text { margin: 0; font-size: 0.95rem; line-height: 1.55; color: var(--text-secondary); }
  .hm-brand-cta { margin-top: 0.75rem; font-size: 0.9rem; font-weight: 700; color: var(--color-brand-primary); }
  :global([data-theme="dark"]) .hm-brand-cta { color: var(--color-text-accent); }
  .hm-note { margin: 1.25rem 0 0; font-size: 0.875rem; line-height: 1.6; color: var(--text-secondary); }
</style>
