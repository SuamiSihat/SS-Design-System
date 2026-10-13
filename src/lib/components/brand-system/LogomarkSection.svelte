<script>
  let activeLogoColor = $state('#022057');
  let activeLogoImg = $state('/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg');

  const logoSwatches = [
    { name: 'Black', color: '#000000', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Prussian', color: '#022057', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'SS Blue', color: '#043388', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Azure', color: '#21A1F7', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Malibu', color: '#6DC6EC', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Banana', color: '#FCE53D', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Arylide', color: '#E5D15C', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Lion', color: '#BD9A73', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Fawn', color: '#CCAC8D', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'White', color: '#FFFFFF', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Mono', color: '#F5F5F5', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_mono.svg' }
  ];

  function selectLogoSwatch(swatch) {
    activeLogoColor = swatch.color;
    activeLogoImg = swatch.img;
    if (typeof document !== 'undefined') {
      const stage = document.getElementById('logoContrastStage');
      const img = document.getElementById('logoContrastImg');
      const info = document.getElementById('logoContrastInfo');
      if (stage) stage.style.backgroundColor = swatch.color;
      if (img) {
        img.src = swatch.img;
        img.alt = `SuamiSihat Logo on ${swatch.color}`;
      }
      if (info) {
        info.innerHTML = `<iconify-icon icon="fluent:info-24-regular" style="font-size:0.875rem;margin-right:6px;vertical-align:middle;color:var(--color-brand-primary)"></iconify-icon> Background: <strong>${swatch.color}</strong> &bull; Logo file: <code>${swatch.img.split('/').pop()}</code>`;
      }
    }
  }
</script>

<section id="logomark" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">Logo</div>
  <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Our logo</h2>
  <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Use the logo version that matches the background. Download files from the Downloads section below.</p>

  <!-- Three Logo Variants Cards -->
  <div class="row g-4 mb-4">
    <div class="col-md-4">
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
        <div style="background:#FFFFFF;padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center;min-height:140px;">
          <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg" alt="SuamiSihat Primary Light" style="max-height:60px;max-width:90%;" loading="lazy" />
        </div>
        <div style="padding:0.75rem 1.25rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);font-size:0.8rem;font-weight:700;color:var(--color-neutral-fg-1);">
          Main logo <span style="font-weight:400;color:var(--color-neutral-fg-3);font-size:0.75rem;">For light backgrounds</span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
        <div style="background:#022057;padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center;min-height:140px;">
          <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg" alt="SuamiSihat Primary Dark" style="max-height:60px;max-width:90%;" loading="lazy" />
        </div>
        <div style="padding:0.75rem 1.25rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);font-size:0.8rem;font-weight:700;color:var(--color-neutral-fg-1);">
          Light logo <span style="font-weight:400;color:var(--color-neutral-fg-3);font-size:0.75rem;">For dark backgrounds</span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
        <div style="background:#F1F5F9;padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center;min-height:140px;">
          <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_mono.svg" alt="SuamiSihat Primary Mono" style="max-height:60px;max-width:90%;" loading="lazy" />
        </div>
        <div style="padding:0.75rem 1.25rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);font-size:0.8rem;font-weight:700;color:var(--color-neutral-fg-1);">
          One-colour logo <span style="font-weight:400;color:var(--color-neutral-fg-3);font-size:0.75rem;">For print in one colour</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 10-Color Interactive Logo Background Picker (Full Width Banner) -->
  <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);margin-bottom:var(--f-space-6);width:100%;">
    <div style="padding:0.85rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;width:100%;">
      <span style="font-size:0.9rem;font-weight:700;color:var(--color-neutral-fg-1);">Try the logo on different backgrounds</span>
      <span style="font-size:0.78rem;color:var(--color-neutral-fg-3);">Pick a colour. The right logo is chosen for you.</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;padding:0.85rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-2);width:100%;">
      {#each logoSwatches as swatch}
        <button
          type="button"
          class="ss-btn ss-btn-sm logo-swatch-btn"
          class:ss-btn-primary={activeLogoColor === swatch.color}
          class:ss-btn-secondary={activeLogoColor !== swatch.color}
          data-color={swatch.color}
          data-img={swatch.img}
          data-name={swatch.name}
          onclick={() => selectLogoSwatch(swatch)}
          style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:0.8rem;"
        >
          <span style="width:12px;height:12px;border-radius:50%;background:{swatch.color};border:1px solid rgba(0,0,0,0.2);display:inline-block;pointer-events:none;"></span>
          <span style="pointer-events:none;">{swatch.name}</span>
        </button>
      {/each}
    </div>
    <div id="logoContrastStage" style="padding: 2.5rem 1.5rem; display: flex; align-items: center; justify-content: center; min-height: 220px; width: 100%; background: {activeLogoColor}; transition: background 0.3s ease;">
      <img id="logoContrastImg" src={activeLogoImg} alt="SuamiSihat Logo on {activeLogoColor}" style="max-height: 110px; max-width: 90%; width: auto; object-fit: contain; filter: drop-shadow(0 4px 16px rgba(0,0,0,0.12)); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);" />
    </div>
    <div id="logoContrastInfo" style="padding: 0.75rem 1.5rem; background: var(--color-neutral-bg-3); border-top: 1px solid var(--color-neutral-stroke-1); font-size: 0.8rem; color: var(--color-neutral-fg-2); width: 100%;">
      <iconify-icon icon="fluent:info-24-regular" style="font-size:0.95rem;margin-right:6px;vertical-align:middle;color:var(--color-brand-primary)"></iconify-icon>
      Background: <strong>{activeLogoColor}</strong> &bull; Logo file: <code>{activeLogoImg.split('/').pop()}</code>
    </div>
  </div>

  <!-- Clear Space, Exclusion Zone & Proportions -->
  <div class="row g-4 mb-4">
    <div class="col-lg-6">
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;">
        <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">Keep space around the logo</strong>
          <span class="ss-badge ss-badge-brand" style="font-size:0.7rem;">Clear space</span>
        </div>
        <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;min-height:220px;width:100%;box-sizing:border-box;">
          <img src="/assets/images/safe_zone.svg" alt="SuamiSihat 1X Safe Zone and Clear Space Diagram" style="width:100%;max-height:240px;object-fit:contain;display:block;" loading="lazy" />
        </div>
        <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
          Leave empty space on all four sides of the logo, at least as wide as the letter “x” in the name. Keep text and pictures out of this space.
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;">
        <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">How the S is drawn</strong>
          <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">For designers</span>
        </div>
        <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;min-height:220px;width:100%;box-sizing:border-box;">
          <img src="/assets/images/ss_logo_proportions.svg" alt="SuamiSihat S-Logomark Mathematical Geometry and Grid Proportions" style="width:100%;max-height:240px;object-fit:contain;display:block;" loading="lazy" />
        </div>
        <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
          The S is built from circular curves and 45-degree angles. Designers need this only when redrawing the logo, which should rarely happen.
        </div>
      </div>
    </div>
  </div>
</section>
