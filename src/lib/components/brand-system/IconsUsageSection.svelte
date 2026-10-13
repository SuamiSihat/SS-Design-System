<script>
  let logomarkMode = $state('light');

  function setLogomarkMode(mode) {
    logomarkMode = mode;
    if (typeof document !== 'undefined') {
      const img = document.getElementById('logomarkImg');
      const stage = document.getElementById('logomarkStage');
      if (img) {
        img.src = mode === 'dark' ? '/public/brand/logos/ss-logomark-dark.svg' : '/public/brand/logos/ss-logomark-light.svg';
        img.alt = `SS Logomark Icon on ${mode === 'dark' ? '#022057' : '#FCFAF6'}`;
      }
      if (stage) {
        stage.style.backgroundColor = mode === 'dark' ? '#022057' : '#FCFAF6';
      }
    }
  }
</script>

<section id="icons" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">06 &middot; Usage &amp; Rules</div>
  <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Icons &amp; Logomark Usage</h2>
  <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Clear signals, every time. Our standalone S-shaped logomark follows strict background brightness conventions.</p>

  <!-- Interactive Logomark Surface Tester -->
  <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);margin-bottom:2rem;">
    <div style="padding:0.85rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
      <div style="display:flex;align-items:center;gap:10px;">
        <strong style="font-size:0.925rem;color:var(--color-neutral-fg-1);">Standalone Logomark Surface Contrast Tester</strong>
        <span class="ss-badge {logomarkMode === 'dark' ? 'ss-badge-brand' : 'ss-badge-neutral'}" style="font-size:0.7rem;font-weight:700;">
          {logomarkMode === 'dark' ? 'Prussian Dark Surface (#022057)' : 'Porcelain Light Canvas (#FCFAF6)'}
        </span>
      </div>
      
      <!-- Mode Toggle Buttons -->
      <div style="display:flex;gap:8px;">
        <button
          type="button"
          id="btnLogomarkLight"
          class="ss-btn ss-btn-sm"
          class:ss-btn-primary={logomarkMode === 'light'}
          class:ss-btn-secondary={logomarkMode !== 'light'}
          onclick={() => setLogomarkMode('light')}
          style="padding:6px 14px;border-radius:var(--f-radius-pill);font-weight:600;font-size:0.8rem;display:inline-flex;align-items:center;gap:6px;"
        >
          <iconify-icon icon="fluent:weather-sunny-24-regular" style="pointer-events:none;"></iconify-icon>
          <span style="pointer-events:none;">Light Surface</span>
        </button>
        <button
          type="button"
          id="btnLogomarkDark"
          class="ss-btn ss-btn-sm"
          class:ss-btn-primary={logomarkMode === 'dark'}
          class:ss-btn-secondary={logomarkMode !== 'dark'}
          onclick={() => setLogomarkMode('dark')}
          style="padding:6px 14px;border-radius:var(--f-radius-pill);font-weight:600;font-size:0.8rem;display:inline-flex;align-items:center;gap:6px;"
        >
          <iconify-icon icon="fluent:weather-moon-24-regular" style="pointer-events:none;"></iconify-icon>
          <span style="pointer-events:none;">Dark Surface</span>
        </button>
      </div>
    </div>

    <!-- Stage with Big Logo on Left, Lorem Ipsum on Right -->
    <div
      id="logomarkStage"
      class={logomarkMode === 'dark' ? 'ss-surface-dark' : 'ss-surface-light'}
      style="background:{logomarkMode === 'dark' ? '#022057' : '#FCFAF6'};padding:3rem 2.5rem;display:grid;grid-template-columns:auto 1fr;gap:3rem;align-items:center;transition:background 0.3s ease;min-height:220px;"
    >
      <!-- Left: Big Standalone Logomark Icon -->
      <div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:{logomarkMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'};border-radius:var(--f-radius-2xl, 24px);border:1px solid {logomarkMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'};min-width:220px;min-height:220px;">
        <img
          id="logomarkImg"
          src={logomarkMode === 'dark' ? '/public/brand/logos/ss-logomark-dark.svg' : '/public/brand/logos/ss-logomark-light.svg'}
          alt="SuamiSihat Standalone Logomark on {logomarkMode === 'dark' ? 'Dark' : 'Light'} Surface"
          style="height:180px;width:180px;max-width:100%;object-fit:contain;transition:all 0.3s ease;filter:drop-shadow(0 8px 24px rgba(0,0,0,0.16));"
        />
      </div>

      <!-- Right: Lorem Ipsum & Typographic Copy -->
      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="ss-badge {logomarkMode === 'dark' ? 'ss-badge-brand' : 'ss-badge-neutral'}" style="font-size:0.7rem;font-weight:700;">
            {logomarkMode === 'dark' ? 'Dark Background' : 'Light Background'}
          </span>
          <span style="font-size:0.75rem;font-weight:600;color:{logomarkMode === 'dark' ? 'rgba(252,250,246,0.6)' : 'rgba(25,25,26,0.6)'};">
            WCAG AAA Compliant &bull; Contrast Ratio 12.8:1
          </span>
        </div>
        <h3 style="font-size:1.45rem;font-weight:800;margin:0;color:{logomarkMode === 'dark' ? '#FFFFFF' : '#000000'};font-family:'Poppins',sans-serif;letter-spacing:-0.02em;">
          SuamiSihat™ Standalone Logomark
        </h3>
        <p style="font-size:0.925rem;line-height:1.7;margin:0;color:{logomarkMode === 'dark' ? '#FCFAF6' : '#19191A'};">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p style="font-size:0.825rem;line-height:1.6;margin:0;color:{logomarkMode === 'dark' ? 'rgba(252,250,246,0.7)' : 'rgba(25,25,26,0.7)'};">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
        </p>
      </div>
    </div>

    <!-- Info Footer -->
    <div style="padding:0.75rem 1.5rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;font-size:0.78rem;color:var(--color-neutral-fg-2);">
      <div id="logomarkInfo" style="display:flex;align-items:center;gap:6px;">
        <iconify-icon icon="fluent:info-24-regular" style="font-size:0.95rem;color:var(--color-brand-primary)"></iconify-icon>
        <span>Surface: <strong style="color:var(--color-neutral-fg-1);">{logomarkMode === 'dark' ? 'Prussian Dark (#022057)' : 'Porcelain Canvas (#FCFAF6)'}</strong> &bull; Selected icon: <code style="color:var(--color-brand-primary);font-weight:700;">{logomarkMode === 'dark' ? 'ss-logomark-dark.svg' : 'ss-logomark-light.svg'}</code></span>
      </div>
      <div style="font-size:0.75rem;color:var(--color-neutral-fg-3);">
        Lightness L {logomarkMode === 'dark' ? '< 50%' : '>= 50%'} &bull; Always pair light icon with dark surfaces and dark icon with light surfaces
      </div>
    </div>
  </div>

  <!-- Please Do / Please Don't Rules -->
  <div class="row g-4 mb-4">
    <div class="col-md-6">
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-top:3px solid #16A34A;border-radius:var(--f-radius-xl);padding:1.5rem;box-shadow:var(--f-shadow-4);height:100%;">
        <div style="font-weight:700;color:var(--color-success-fg);margin-bottom:0.75rem;display:flex;align-items:center;gap:6px;">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="font-size:1.1rem;"></iconify-icon> Please Do
        </div>
        <ul style="margin:0;padding-left:1.25rem;font-size:0.825rem;color:var(--color-neutral-fg-2);line-height:1.7;">
          <li>Use official artwork supplied by SuamiSihat™ without modification.</li>
          <li>Select the correct light, dark or monochrome logo version for background contrast.</li>
          <li>Maintain the illustrated <code>x</code>-based clear space around all sides.</li>
          <li>Scale logos proportionally &mdash; preserve symbol and wordmark proportions.</li>
          <li>Place logos on clean, uncluttered backgrounds with high contrast ratio.</li>
        </ul>
      </div>
    </div>
    <div class="col-md-6">
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-top:3px solid #DC2626;border-radius:var(--f-radius-xl);padding:1.5rem;box-shadow:var(--f-shadow-4);height:100%;">
        <div style="font-weight:700;color:var(--color-error-fg);margin-bottom:0.75rem;display:flex;align-items:center;gap:6px;">
          <iconify-icon icon="fluent:dismiss-circle-24-filled" style="font-size:1.1rem;"></iconify-icon> Please Don't
        </div>
        <ul style="margin:0;padding-left:1.25rem;font-size:0.825rem;color:var(--color-neutral-fg-2);line-height:1.7;">
          <li>Stretch, compress, rotate, skew or crop the logo.</li>
          <li>Recolour, swap palette hues or rearrange the wordmark elements.</li>
          <li>Add drop shadows, outlines, gradients, glows, or 3D bevel effects.</li>
          <li>Place the logo on visually noisy, busy or low-contrast backgrounds.</li>
          <li>Imply unapproved endorsement, certification, or false medical claims.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Visual Prohibited Logo Misuse Board -->
  <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);margin-bottom:2rem;">
    <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
      <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">Prohibited Logo Treatments Visual Reference</strong>
      <span class="ss-badge ss-badge-danger" style="font-size:0.7rem;">Brand Violations</span>
    </div>
    <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;width:100%;box-sizing:border-box;">
      <img src="/assets/images/dont.png" alt="SuamiSihat Prohibited Logo Misuse Visual Board" style="width:100%;height:auto;display:block;border-radius:var(--f-radius-md);box-shadow:0 1px 3px rgba(0,0,0,0.06);" loading="lazy" />
    </div>
    <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
      Under no circumstances should the SuamiSihat™ master logomark or wordmark be altered, rotated, recolored, given unapproved drop shadows, stretched, or placed over unapproved colored patterns.
    </div>
  </div>
</section>
