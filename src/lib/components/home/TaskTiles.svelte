<script>
  // What staff ask for most, in plain words. One tile = one job.
  const tiles = [
    { href: '/brand-system/#downloads', icon: 'fluent:arrow-download-24-regular', title: 'Get the logo', text: 'Logo files for print, screen and social.' },
    { href: '/brand-system/#colour', icon: 'fluent:color-24-regular', title: 'Brand colours and fonts', text: 'The exact colours and fonts to use.' },
    { href: '/signature/', icon: 'fluent:mail-template-24-regular', title: 'Email signature', text: 'Make your official signature in a minute.' },
    { href: '/tools/', icon: 'fluent:camera-24-regular', title: 'Photo watermark', text: 'SS CAM adds our look to photos and videos.' },
    { href: '/brand-guidelines/', icon: 'fluent:book-open-24-regular', title: 'Brand guides', text: 'Guides to read or download for each brand.' },
    { href: '/products/ssclinic/', icon: 'fluent:stethoscope-24-regular', title: 'SS Clinic guide', text: 'Logo, colours and promise for the clinics.' },
    { href: '/products/', icon: 'fluent:box-24-regular', title: 'Product brands', text: 'One page for every product we sell.' },
    { href: '/onboarding/', icon: 'fluent:handshake-24-regular', title: 'New here?', text: 'Your first-week checklist.' }
  ];
</script>

<section id="tasks" class="hm-block" aria-labelledby="tasks-title">
  <div class="hm-head">
    <p class="hm-eyebrow">Start here</p>
    <h2 id="tasks-title" class="hm-title">What do you need today?</h2>
  </div>

  <ul class="hm-tiles">
    {#each tiles as t}
      <li>
        <a class="hm-tile" href={t.href}>
          <span class="hm-tile-icon"><iconify-icon icon={t.icon} aria-hidden="true"></iconify-icon></span>
          <span class="hm-tile-title">{t.title}</span>
          <span class="hm-tile-text">{t.text}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .hm-block { padding: 4rem clamp(1.5rem, 5vw, 5rem) 1.5rem; }
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
  .hm-tiles {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  @media (max-width: 1024px) { .hm-tiles { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) {
    .hm-block { padding: 3rem 1.25rem 1rem; }
    .hm-tiles { grid-template-columns: 1fr; }
  }
  .hm-tile {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    height: 100%;
    box-sizing: border-box;
    padding: 1.25rem;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.1));
    border-radius: 16px;
    background: var(--color-neutral-bg-1, #FCFAF6);
    text-decoration: none !important;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .hm-tile:hover,
  .hm-tile:focus-visible {
    transform: translateY(-3px);
    border-color: var(--color-brand-primary, #043388);
    box-shadow: 0 10px 24px rgba(4, 51, 136, 0.12);
  }
  .hm-tile-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin-bottom: 0.5rem;
    border-radius: 12px;
    font-size: 1.35rem;
    background: rgba(4, 51, 136, 0.08);
    color: var(--color-brand-primary, #043388);
  }
  :global([data-theme="dark"]) .hm-tile-icon {
    background: rgba(33, 161, 247, 0.15);
    color: #6DC6EC;
  }
  .hm-tile-title { font-size: 1.05rem; font-weight: 700; color: var(--text-strong); }
  .hm-tile-text { font-size: 0.875rem; line-height: 1.5; color: var(--text-secondary); }
</style>
