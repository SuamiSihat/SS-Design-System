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

<!-- Hero Section -->
<div class="tools-hero" style="background:var(--gradient-brand-diagonal, linear-gradient(135deg, #022057 0%, #043388 100%)); padding: 4rem 1.5rem 3.5rem; text-align: center; position: relative; overflow: hidden;">
  <div style="position: absolute; inset: 0; background: radial-gradient(ellipse 50% 60% at 80% 30%, rgba(109,198,236,0.2) 0%, transparent 70%); pointer-events: none;"></div>
  <div style="position: relative; z-index: 2; max-width: 680px; margin: 0 auto;">
    <p style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin: 0 0 0.5rem;">Staff Tools &amp; Software Hub</p>
    <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin: 0 0 0.75rem;">SS CAM &amp; Creative Tools</h1>
    <p style="font-size: 1.05rem; color: rgba(255,255,255,0.85); max-width: 560px; margin: 0 auto; line-height: 1.6;">
      Official download hub for SuamiSihat™ creative utilities, desktop software, design checkers, and daily workflow accelerators.
    </p>
  </div>
</div>

<div class="w-100 py-5" style="width: 100%; max-width: 100%; padding: 2.5rem clamp(1.5rem, 4vw, 4rem); box-sizing: border-box;">
  <!-- Breadcrumb -->
  <nav class="brand-breadcrumb" aria-label="Breadcrumb" style="margin-bottom: var(--f-space-6); font-size: 0.8rem; display: flex; align-items: center; gap: 8px;">
    <a href="/" style="color: var(--color-neutral-fg-3); text-decoration: none;">Home</a>
    <iconify-icon icon="fluent:chevron-right-12-regular" style="color: var(--color-neutral-fg-3);"></iconify-icon>
    <span style="color:var(--color-neutral-fg-1); font-weight:600;">SS CAM &amp; Tools</span>
  </nav>

  <!-- Info Banner -->
  <div class="info-banner" style="display:flex; align-items:flex-start; gap:var(--f-space-4); padding:var(--f-space-4) var(--f-space-5); background:var(--color-info-bg,#EBF5FE); border:1px solid rgba(33,161,247,.18); border-radius:var(--f-radius-lg); margin-bottom:var(--f-space-8);">
    <span class="info-banner-icon" style="font-size:1.25rem; color:var(--color-brand-primary); margin-top: 2px;"><iconify-icon icon="fluent:info-24-regular"></iconify-icon></span>
    <p style="margin:0; font-size:0.875rem; color:var(--color-neutral-fg-2); line-height:1.6;">
      All tools listed here are approved for internal SuamiSihat™ staff use. For support, contact <a href="mailto:tech@suamisihat.com" style="color:var(--color-brand-primary); font-weight:600;">tech@suamisihat.com</a> or raise an issue on the SSNAS Dashboard.
    </p>
  </div>

  <!-- SECTION 1: Featured SS CAM Desktop App -->
  <div style="margin-bottom: 4rem;">
    <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">Featured Desktop Software</div>
    <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">SSCAM Windows Application</h2>
    <p style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">SuamiSihat™ Creative Assets Management — purpose-built Windows desktop workstation.</p>

    <!-- Card -->
    <div class="tool-card" style="background: var(--color-neutral-bg-2, #FFFFFF); border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); border-radius: var(--f-radius-xl, 16px); padding: 2rem; box-shadow: var(--f-shadow-4, 0 4px 16px rgba(0,0,0,0.06));">
      <div style="display: flex; align-items: flex-start; gap: 1.25rem; margin-bottom: 1.25rem;">
        <div style="width: 60px; height: 60px; border-radius: var(--f-radius-lg, 12px); background: var(--gradient-brand-diagonal, #043388); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0;">
          <iconify-icon icon="fluent:camera-24-regular"></iconify-icon>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--color-neutral-fg-1); margin: 0;">SSCAM</h3>
            <span class="ss-badge ss-badge-brand" style="font-size: 0.75rem;">v2.4 Production</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--color-neutral-fg-3); margin-top: 4px;">
            <iconify-icon icon="fluent:desktop-24-regular" style="vertical-align: middle;"></iconify-icon> Windows Only (WPF .NET 8 / WinUI 3)
          </p>
        </div>
      </div>

      <p style="font-size: 0.925rem; line-height: 1.7; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">
        <strong>SSCAM (SuamiSihat™ Creative Assets Management)</strong> is the official desktop workstation for media designers, content creators, and clinic staff. It streamlines brand watermarking, photo/video capture grading, color preset pipelines, and one-click cloud/SSNAS synchronization.
      </p>

      <!-- Mockup & Screenshots Grid -->
      <div style="margin: 1.5rem 0; background: var(--color-neutral-bg-1, #F8FAFC); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-lg); overflow: hidden; box-shadow: var(--f-shadow-4);">
        <div style="background: var(--color-neutral-bg-3, #E2E8F0); padding: 8px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-neutral-stroke-1); font-size: 0.78rem; color: var(--color-neutral-fg-3);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <iconify-icon icon="fluent:window-multiple-24-regular" style="color: var(--color-brand-primary);"></iconify-icon>
            <span style="font-weight: 600; color: var(--color-neutral-fg-1);">SSCAM — Creative Assets Management (Desktop Workstation)</span>
          </div>
          <div style="display: flex; gap: 10px; opacity: 0.7;">
            <span>&#9472;</span>
            <span>&#9633;</span>
            <span>&#10005;</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; padding: 1.25rem;">
          <figure style="margin: 0;">
            <img src="/public/brand/images/sscam-app-dashboard.png" alt="SSCAM Dashboard" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--color-neutral-stroke-1); display: block;" onerror={(e) => { e.currentTarget.style.display = 'none'; }} />
            <figcaption style="font-size: 0.75rem; color: var(--color-neutral-fg-3); margin-top: 6px; text-align: center;">Main Workspace &amp; Asset Browser</figcaption>
          </figure>
          <figure style="margin: 0;">
            <img src="/public/brand/images/sscam-app-brand-assets.png" alt="SSCAM Brand Assets" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--color-neutral-stroke-1); display: block;" onerror={(e) => { e.currentTarget.style.display = 'none'; }} />
            <figcaption style="font-size: 0.75rem; color: var(--color-neutral-fg-3); margin-top: 6px; text-align: center;">Watermarking &amp; Logo Grading</figcaption>
          </figure>
          <figure style="margin: 0;">
            <img src="/public/brand/images/sscam-app-project-creator.png" alt="SSCAM Project Creator" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--color-neutral-stroke-1); display: block;" onerror={(e) => { e.currentTarget.style.display = 'none'; }} />
            <figcaption style="font-size: 0.75rem; color: var(--color-neutral-fg-3); margin-top: 6px; text-align: center;">Media Export &amp; LUT Presets</figcaption>
          </figure>
          <figure style="margin: 0;">
            <img src="/public/brand/images/sscam-app-search-copy.png" alt="SSCAM Search & Copy" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--color-neutral-stroke-1); display: block;" onerror={(e) => { e.currentTarget.style.display = 'none'; }} />
            <figcaption style="font-size: 0.75rem; color: var(--color-neutral-fg-3); margin-top: 6px; text-align: center;">Search &amp; Direct Sync Utility</figcaption>
          </figure>
        </div>
      </div>

      <!-- Feature Checklist -->
      <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.5rem;">
        <li style="font-size: 0.85rem; color: var(--color-neutral-fg-2); display: flex; align-items: center; gap: 8px;">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color: #16A34A;"></iconify-icon> Native WPF .NET 8 desktop engine
        </li>
        <li style="font-size: 0.85rem; color: var(--color-neutral-fg-2); display: flex; align-items: center; gap: 8px;">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color: #16A34A;"></iconify-icon> On-brand colour grading presets (LUTs)
        </li>
        <li style="font-size: 0.85rem; color: var(--color-neutral-fg-2); display: flex; align-items: center; gap: 8px;">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color: #16A34A;"></iconify-icon> Auto-watermark with approved exclusion zones
        </li>
        <li style="font-size: 0.85rem; color: var(--color-neutral-fg-2); display: flex; align-items: center; gap: 8px;">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color: #16A34A;"></iconify-icon> WebP, AVIF &amp; MP4 H.265 accelerated export
        </li>
        <li style="font-size: 0.85rem; color: var(--color-neutral-fg-2); display: flex; align-items: center; gap: 8px;">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color: #16A34A;"></iconify-icon> Patient privacy face-blurring automation
        </li>
        <li style="font-size: 0.85rem; color: var(--color-neutral-fg-2); display: flex; align-items: center; gap: 8px;">
          <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color: #16A34A;"></iconify-icon> One-click sync to SSNAS shared drives
        </li>
      </ul>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; border-top: 1px solid var(--color-neutral-stroke-1); padding-top: 1.25rem;">
        <a href="https://github.com/SuamiSihat/ss_cam/releases/latest" class="ss-btn ss-btn-primary" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
          <iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon> Download Latest (Windows)
        </a>
        <a href="https://github.com/SuamiSihat/ss_cam/releases" class="ss-btn ss-btn-secondary" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
          <iconify-icon icon="fluent:code-circle-24-regular"></iconify-icon> Release Notes
        </a>
        <a href="https://github.com/SuamiSihat/ss_cam" class="ss-btn ss-btn-secondary" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
          <iconify-icon icon="fluent:code-24-regular"></iconify-icon> Source Repo (SuamiSihat/ss_cam)
        </a>
      </div>
    </div>
  </div>

  <!-- SECTION 2: Other Staff Utilities Grid -->
  <div style="margin-bottom: 4rem;">
    <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">Staff Ecosystem</div>
    <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Other Staff Utilities</h2>
    <p style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Curated web applications and shared services for daily operations.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <!-- Mail Signature -->
      <div class="tool-card" style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.5rem; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 48px; height: 48px; border-radius: var(--f-radius-md); background: rgba(4,51,136,.08); color: #043388; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
            <iconify-icon icon="fluent:mail-template-24-regular"></iconify-icon>
          </div>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-neutral-fg-1); margin: 0;">Mail Signature Generator</h4>
            <span style="font-size: 0.75rem; color: var(--color-neutral-fg-3);">Web &bull; Client-side</span>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-neutral-fg-2); line-height: 1.6; flex: 1; margin-bottom: 1.25rem;">
          Generate your verified, on-brand SuamiSihat™ email signature with HTML clipboard copy.
        </p>
        <a href="/signature/" class="ss-btn ss-btn-secondary" style="text-decoration: none; justify-content: center; display: inline-flex; align-items: center; gap: 6px;">
          Open Generator <iconify-icon icon="fluent:arrow-right-16-regular"></iconify-icon>
        </a>
      </div>

      <!-- Brand Assets Library -->
      <div class="tool-card" style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.5rem; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 48px; height: 48px; border-radius: var(--f-radius-md); background: rgba(33,161,247,.12); color: #21A1F7; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
            <iconify-icon icon="fluent:folder-open-24-regular"></iconify-icon>
          </div>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-neutral-fg-1); margin: 0;">Brand Asset Library</h4>
            <span style="font-size: 0.75rem; color: var(--color-neutral-fg-3);">Official Cloud Repository</span>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-neutral-fg-2); line-height: 1.6; flex: 1; margin-bottom: 1.25rem;">
          Official master vector files, PNG transparency packages, and font installers.
        </p>
        <a href="https://suamisihat.com.my/brand-assets/" target="_blank" rel="noopener noreferrer" class="ss-btn ss-btn-secondary" style="text-decoration: none; justify-content: center; display: inline-flex; align-items: center; gap: 6px;">
          Visit Assets <iconify-icon icon="fluent:open-16-regular"></iconify-icon>
        </a>
      </div>

      <!-- SSNAS Dashboard -->
      <div class="tool-card" style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.5rem; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 48px; height: 48px; border-radius: var(--f-radius-md); background: rgba(247,225,67,.18); color: #9A7B00; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
            <iconify-icon icon="fluent:server-24-regular"></iconify-icon>
          </div>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-neutral-fg-1); margin: 0;">SSNAS Dashboard</h4>
            <span style="font-size: 0.75rem; color: var(--color-neutral-fg-3);">Internal NAS Storage</span>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-neutral-fg-2); line-height: 1.6; flex: 1; margin-bottom: 1.25rem;">
          Access internal network drives, clinical databases, media raw files, and server tools.
        </p>
        <a href="https://suamisihat.myds.me" target="_blank" rel="noopener noreferrer" class="ss-btn ss-btn-secondary" style="text-decoration: none; justify-content: center; display: inline-flex; align-items: center; gap: 6px;">
          Launch SSNAS <iconify-icon icon="fluent:open-16-regular"></iconify-icon>
        </a>
      </div>
    </div>
  </div>

  <!-- SECTION 3: Design Utilities & Accessibility Checkers -->
  <div>
    <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">Developer &amp; Designer Utilities</div>
    <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Interactive Brand Checkers</h2>
    <p style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Real-time WCAG 2.1 contrast compliance evaluation and Fluent/Lucide icon repository.</p>

    <!-- Contrast Calculator -->
    <div class="row g-4 mb-4">
      <div class="col-lg-6">
        <div class="cl-card p-4" style="background:var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); height: 100%;">
          <div style="font-size:0.75rem;font-weight:700;color:var(--color-brand-primary);text-transform:uppercase;margin-bottom:4px;">Accessibility Audit</div>
          <h3 style="font-size:1.15rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:1rem;">Color Contrast Ratio Tool</h3>
          
          <div class="row g-3 mb-3">
            <div class="col-6">
              <label for="fg-hex" style="font-size:0.75rem;font-weight:600;color:var(--color-neutral-fg-2);display:block;margin-bottom:4px;">Foreground Color</label>
              <div style="display:flex;gap:6px;align-items:center;">
                <input type="color" bind:value={hexInput} style="width:36px;height:36px;padding:0;border:none;border-radius:6px;cursor:pointer;" />
                <input id="fg-hex" type="text" bind:value={hexInput} class="ss-input" style="font-family:monospace;font-size:0.85rem;" />
              </div>
            </div>
            <div class="col-6">
              <label for="bg-hex" style="font-size:0.75rem;font-weight:600;color:var(--color-neutral-fg-2);display:block;margin-bottom:4px;">Background Color</label>
              <div style="display:flex;gap:6px;align-items:center;">
                <input type="color" bind:value={bgHex} style="width:36px;height:36px;padding:0;border:none;border-radius:6px;cursor:pointer;" />
                <input id="bg-hex" type="text" bind:value={bgHex} class="ss-input" style="font-family:monospace;font-size:0.85rem;" />
              </div>
            </div>
          </div>

          <!-- Preview & Result -->
          <div style="background:{bgHex};color:{hexInput};padding:1.5rem;border-radius:var(--f-radius-lg);border:1px solid var(--color-neutral-stroke-1);text-align:center;margin-bottom:1rem;transition:all 0.2s ease;">
            <div style="font-size:1.25rem;font-weight:700;margin-bottom:4px;">The quick brown fox jumps over the lazy dog</div>
            <div style="font-size:0.85rem;">Medical Precision &bull; Dignified Men's Health Design</div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;background:var(--color-neutral-bg-1);border-radius:var(--f-radius-md);border:1px solid var(--color-neutral-stroke-1);">
            <span style="font-size:0.85rem;color:var(--color-neutral-fg-2);font-weight:600;">Contrast Ratio: <strong style="color:var(--color-neutral-fg-1);font-size:1.1rem;">{contrastRatio}:1</strong></span>
            <div>
              {#if Number(contrastRatio) >= 7.0}
                <span class="ss-badge ss-badge-success" style="font-size:0.75rem;">WCAG AAA Passed</span>
              {:else if Number(contrastRatio) >= 4.5}
                <span class="ss-badge ss-badge-success" style="font-size:0.75rem;">WCAG AA Passed</span>
              {:else if Number(contrastRatio) >= 3.0}
                <span class="ss-badge ss-badge-warning" style="font-size:0.75rem;">Large Text Only</span>
              {:else}
                <span class="ss-badge ss-badge-danger" style="font-size:0.75rem;">Fails WCAG AA</span>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Icon Browser -->
      <div class="col-lg-6">
        <div class="cl-card p-4" style="background:var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); height: 100%;">
          <div style="font-size:0.75rem;font-weight:700;color:var(--color-brand-primary);text-transform:uppercase;margin-bottom:4px;">Iconography Library</div>
          <h3 style="font-size:1.15rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:1rem;">Icon Search &amp; Copy</h3>

          <div style="margin-bottom:1rem;">
            <input type="text" bind:value={iconSearch} placeholder="Search health, medical, lock, vital icons..." class="ss-input" style="font-size:0.85rem;" />
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(75px, 1fr));gap:0.5rem;max-height:240px;overflow-y:auto;padding-right:4px;">
            {#each filteredIcons as icon}
              <button 
                onclick={() => copyIconSnippet(icon.id)}
                class="cl-icon-item" 
                style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:0.75rem 0.5rem;border-radius:var(--f-radius-md);border:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-1);cursor:pointer;transition:all 0.15s ease;"
                title="Click to copy icon snippet"
              >
                <iconify-icon icon="lucide:{icon.id}" style="font-size:1.4rem;color:var(--color-brand-primary);"></iconify-icon>
                <span style="font-size:0.6rem;color:var(--color-neutral-fg-3);text-align:center;overflow:hidden;text-overflow:ellipsis;width:100%;">{icon.id}</span>
              </button>
            {/each}
          </div>

          {#if copiedIcon}
            <div style="font-size:0.75rem;color:#16A34A;font-weight:600;margin-top:0.75rem;text-align:center;">
              Copied &lt;iconify-icon icon="lucide:{copiedIcon}"&gt; snippet to clipboard!
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
