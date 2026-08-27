<script>
  let hexInput = $state('#043388');
  let bgHex = $state('#FFFFFF');
  let iconSearch = $state('');
  let copiedIcon = $state('');

  const icons = [
    { id: 'activity', name: 'Activity / Vitality', tags: 'pulse health heart rate vital' },
    { id: 'shield-check', name: 'Shield Check / Verified', tags: 'security trust moh moh-approved medical' },
    { id: 'heart-pulse', name: 'Heart Pulse', tags: 'cardio stamina performance wellness' },
    { id: 'lock', name: 'Lock / Discretion', tags: 'privacy confidential secret encryption' },
    { id: 'stethoscope', name: 'Stethoscope / Doctor', tags: 'clinic physician consult teleconsult' },
    { id: 'pill', name: 'Pill / Formulation', tags: 'androlab capsule medication supplement' },
    { id: 'zap', name: 'Energy / Zap', tags: 'potency vitality fast power' },
    { id: 'calendar', name: 'Calendar / Booking', tags: 'appointment schedule slot date' },
    { id: 'phone-call', name: 'Phone Call / Telehealth', tags: 'contact support teleconsult call' },
    { id: 'user-check', name: 'User Check / Verified Patient', tags: 'patient doctor account register' },
    { id: 'award', name: 'Award / Standard', tags: 'certified gold standard quality' },
    { id: 'sparkles', name: 'Sparkles / AI & Modern', tags: 'ss-cam intelligence modern vitality' }
  ];

  let filteredIcons = $derived(
    iconSearch.trim() === '' 
      ? icons 
      : icons.filter(i => (i.name + ' ' + i.tags).toLowerCase().includes(iconSearch.toLowerCase()))
  );

  async function copyIconSnippet(iconId) {
    const snippet = `<iconify-icon icon="lucide:${iconId}" width="24" height="24"></iconify-icon>`;
    try {
      await navigator.clipboard.writeText(snippet);
      copiedIcon = iconId;
      setTimeout(() => (copiedIcon = ''), 2000);
    } catch (e) {
      console.error(e);
    }
  }

  function hexToRgb(hex) {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function calculateContrast(hex1, hex2) {
    try {
      const rgb1 = hexToRgb(hex1);
      const rgb2 = hexToRgb(hex2);
      const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
      const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
    } catch {
      return '4.50';
    }
  }

  let contrastRatio = $derived(calculateContrast(hexInput, bgHex));
</script>

<svelte:head>
  <title>SS CAM &amp; Tools — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5" style="max-width: 1200px;">
  <!-- Breadcrumb & Header -->
  <div style="margin-bottom: var(--f-space-8);">
    <nav class="brand-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
      <span style="color:var(--color-neutral-fg-1);font-weight:600;">Tools &amp; SSCAM</span>
    </nav>
    <div class="f-section-label">Internal Software &amp; Creative Utilities</div>
    <h1 class="f-section-title" style="font-size: 2.25rem;">Creative Tools &amp; Utilities</h1>
    <p class="f-section-subtitle">Curated desktop applications, design checkers, icon repositories, and staff generators.</p>
  </div>

  <!-- Info Banner -->
  <div class="info-banner" style="display:flex;align-items:flex-start;gap:var(--f-space-4);padding:var(--f-space-4) var(--f-space-5);background:var(--color-info-bg,#EBF5FE);border:1px solid rgba(33,161,247,.18);border-radius:var(--f-radius-lg);margin-bottom:var(--f-space-8);">
    <span class="info-banner-icon" style="font-size:1.25rem;color:var(--color-brand-primary);"><iconify-icon icon="fluent:info-24-regular"></iconify-icon></span>
    <p style="margin:0;font-size:0.85rem;color:var(--color-neutral-fg-2);line-height:1.6;">
      All tools listed here are approved for internal SuamiSihat™ staff use. For technical support or feature requests, contact <a href="mailto:tech@suamisihat.com" style="color:var(--color-brand-primary);font-weight:600;">tech@suamisihat.com</a> or raise an issue on the SSNAS Dashboard.
    </p>
  </div>

  <!-- Featured Tool: SSCAM Windows Desktop Suite -->
  <div class="tool-card mb-5" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);padding:2rem;box-shadow:var(--f-shadow-4);">
    <div class="tool-card-header" style="display:flex;align-items:flex-start;gap:var(--f-space-4);margin-bottom:var(--f-space-4);">
      <div class="tool-icon" style="width:56px;height:56px;border-radius:var(--f-radius-lg);background:var(--color-brand-subtle);color:var(--color-brand-primary);display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;">
        <iconify-icon icon="fluent:camera-24-regular"></iconify-icon>
      </div>
      <div class="tool-card-meta">
        <p class="tool-name" style="font-size:1.35rem;font-weight:700;margin:0 0 4px;color:var(--color-neutral-fg-1);">SSCAM <span class="tool-version" style="font-size:0.75rem;padding:3px 10px;border-radius:9999px;background:var(--color-brand-subtle);color:var(--color-brand-primary);font-weight:700;">v2.1</span></p>
        <p class="tool-platform" style="font-size:0.8rem;color:var(--color-neutral-fg-3);margin:0;"><iconify-icon icon="fluent:desktop-24-regular" style="vertical-align:middle;margin-right:4px;"></iconify-icon> Windows Desktop Application (WPF / .NET 8)</p>
      </div>
    </div>
    <p class="tool-desc" style="font-size:0.9rem;line-height:1.7;color:var(--color-neutral-fg-2);margin-bottom:1.5rem;">
      <strong>SSCAM (SuamiSihat™ Creative Assets Management)</strong> is the official Windows desktop application for internal staff, media teams, and clinic staff. It streamlines asset management, automated brand watermarking, photo/video capture, color preset grading, and one-click cloud/NAS sync.
    </p>

    <!-- Windows Titlebar Mockup & Screenshots Grid -->
    <div style="margin: 1.5rem 0; background: var(--color-neutral-bg-1); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-lg); overflow: hidden; box-shadow: var(--f-shadow-8);">
      <div style="background: var(--color-neutral-bg-3); padding: 0.5rem 1rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-neutral-stroke-1); font-size: 0.78rem; color: var(--color-neutral-fg-3);">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <iconify-icon icon="fluent:window-multiple-24-regular" style="color: var(--color-brand-primary);"></iconify-icon>
          <span style="font-weight: 600; color: var(--color-neutral-fg-1);">SSCAM &mdash; SuamiSihat™ Creative Assets Management (Windows Desktop App)</span>
        </div>
        <div style="display: flex; gap: 12px; opacity: 0.7;">
          <span>&#9472;</span>
          <span>&#9633;</span>
          <span>&#10005;</span>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1rem;">
        <figure style="margin: 0;">
          <img src="/public/brand/images/sscam-app-dashboard.png" alt="SSCAM Windows App Dashboard" style="width: 100%; height: auto; border-radius: var(--f-radius-md); border: 1px solid var(--color-neutral-stroke-1); display: block;" loading="lazy" onerror={(e) => { e.currentTarget.style.display = 'none'; }} />
          <figcaption style="font-size: 0.75rem; color: var(--color-neutral-fg-3); margin-top: 0.5rem; text-align: center;">App Dashboard &amp; Main Workspace</figcaption>
        </figure>
        <figure style="margin: 0;">
          <img src="/public/brand/images/sscam-app-brand-assets.png" alt="SSCAM Windows App Brand Assets" style="width: 100%; height: auto; border-radius: var(--f-radius-md); border: 1px solid var(--color-neutral-stroke-1); display: block;" loading="lazy" onerror={(e) => { e.currentTarget.style.display = 'none'; }} />
          <figcaption style="font-size: 0.75rem; color: var(--color-neutral-fg-3); margin-top: 0.5rem; text-align: center;">Brand Assets &amp; Watermark Presets</figcaption>
        </figure>
      </div>
    </div>

    <ul class="tool-features" style="font-size: 0.85rem; color: var(--color-neutral-fg-2); line-height: 1.8; margin-bottom: 1.5rem; padding-left: 1.25rem;">
      <li>Windows-only WPF desktop application built for high-performance creative workflows.</li>
      <li>On-brand colour grading presets matching the SuamiSihat™ visual identity.</li>
      <li>Auto-watermark with approved logo placement, aspect ratios, and safe margins.</li>
      <li>Export directly to approved formats (WebP, AVIF, MP4 H.265).</li>
      <li>One-click upload to SSNAS shared storage &amp; cloud portals.</li>
    </ul>

    <div class="tool-footer" style="display: flex; gap: 0.75rem; flex-wrap: wrap; border-top: 1px solid var(--color-neutral-stroke-1); padding-top: 1.25rem;">
      <a href="https://github.com/SuamiSihat/ss_cam/releases/latest" class="btn-download" target="_blank" rel="noopener noreferrer" style="background:var(--color-brand-primary);color:#fff;padding:8px 18px;border-radius:var(--f-radius-md);text-decoration:none;font-weight:600;display:inline-flex;align-items:center;gap:6px;">
        <iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon> Download Latest (Windows)
      </a>
      <a href="https://github.com/SuamiSihat/ss_cam" class="btn-secondary" target="_blank" rel="noopener noreferrer" style="background:var(--color-neutral-bg-3);color:var(--color-neutral-fg-1);padding:8px 18px;border-radius:var(--f-radius-md);text-decoration:none;font-weight:500;border:1px solid var(--color-neutral-stroke-2);display:inline-flex;align-items:center;gap:6px;">
        <iconify-icon icon="fluent:code-24-regular"></iconify-icon> Source Code (SuamiSihat/ss_cam)
      </a>
    </div>
  </div>

  <!-- WCAG Contrast Tool & Lucide Icon Explorer -->
  <div class="row g-4 mb-5">
    <!-- WCAG Contrast Calculator -->
    <div class="col-lg-6">
      <div class="p-4 border rounded-4 h-100" style="background: var(--color-neutral-bg-2);">
        <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 0.25rem;">Accessibility Checker</div>
        <h3 class="h5 fw-bold mb-3">WCAG 2.1 Contrast Tool</h3>
        <p class="text-secondary mb-4" style="font-size: 0.85rem;">Verify contrast ratios to ensure patient readability across diverse screens.</p>

        <div class="row g-3 mb-3">
          <div class="col-6">
            <label for="fgInput" class="form-label text-secondary" style="font-size: 0.75rem;">Foreground HEX</label>
            <input id="fgInput" type="text" class="form-control form-control-sm font-monospace" bind:value={hexInput} />
          </div>
          <div class="col-6">
            <label for="bgInput" class="form-label text-secondary" style="font-size: 0.75rem;">Background HEX</label>
            <input id="bgInput" type="text" class="form-control form-control-sm font-monospace" bind:value={bgHex} />
          </div>
        </div>

        <div class="p-4 rounded-3 text-center mb-3" style="background: {bgHex}; color: {hexInput}; border: 1px solid var(--color-neutral-stroke-1);">
          <div class="display-6 fw-bold">{contrastRatio}:1</div>
          <div style="font-size: 0.8rem; font-weight: 600;">{parseFloat(contrastRatio) >= 4.5 ? '✔ WCAG AA Compliant (Passed)' : '✖ Low Contrast Warning'}</div>
        </div>
      </div>
    </div>

    <!-- Lucide Icon Search -->
    <div class="col-lg-6">
      <div class="p-4 border rounded-4 h-100" style="background: var(--color-neutral-bg-2);">
        <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 0.25rem;">Icon Repository</div>
        <h3 class="h5 fw-bold mb-2">Approved Healthcare Icons</h3>
        <p class="text-secondary mb-3" style="font-size: 0.85rem;">Click an icon to copy its HTML snippet.</p>

        <input type="text" class="form-control form-control-sm mb-3" placeholder="Search icons (e.g. clinic, shield, pulse)..." bind:value={iconSearch} />

        <div class="d-flex flex-wrap gap-2" style="max-height: 200px; overflow-y: auto;">
          {#each filteredIcons as icon}
            <button 
              type="button" 
              class="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
              onclick={() => copyIconSnippet(icon.id)}
            >
              <iconify-icon icon="lucide:{icon.id}" width="16"></iconify-icon>
              <span style="font-size: 0.75rem;">{copiedIcon === icon.id ? 'Copied!' : icon.name.split('/')[0]}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
