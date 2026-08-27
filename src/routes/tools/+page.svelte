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
      return 'N/A';
    }
  }

  let contrastRatio = $derived(calculateContrast(hexInput, bgHex));
</script>

<svelte:head>
  <title>Design Tools & Utilities — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Tools</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Design Utilities</div>
    <h1 class="display-6 fw-bold mb-2">Color & Accessibility Tools</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      Interactive utilities for testing WCAG color contrast, validating 60:30:10 allocations, and searching healthcare system icons.
    </p>
  </div>

  <div class="row g-4 mb-5">
    <!-- Tool 1: WCAG Contrast Evaluator -->
    <div class="col-lg-6">
      <div class="card p-4 border rounded-4 shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF);">
        <h4 class="fw-bold mb-3" style="font-size: 1.15rem;">WCAG 2.1 Contrast Checker</h4>
        
        <div class="row g-3 mb-4">
          <div class="col-6">
            <label for="fgColor" class="form-label fw-semibold" style="font-size: 0.85rem;">Foreground Color</label>
            <div class="input-group">
              <input id="fgColor" type="color" class="form-control form-control-color" bind:value={hexInput} style="width: 48px;" />
              <input type="text" class="form-control" bind:value={hexInput} />
            </div>
          </div>
          <div class="col-6">
            <label for="bgColor" class="form-label fw-semibold" style="font-size: 0.85rem;">Background Color</label>
            <div class="input-group">
              <input id="bgColor" type="color" class="form-control form-control-color" bind:value={bgHex} style="width: 48px;" />
              <input type="text" class="form-control" bind:value={bgHex} />
            </div>
          </div>
        </div>

        <!-- Contrast Output Box -->
        <div class="p-4 rounded-3 text-center mb-4" style="background-color: {bgHex}; color: {hexInput}; border: 1px solid #CBD5E1;">
          <div style="font-size: 2.25rem; font-weight: 800; line-height: 1;">
            {contrastRatio}:1
          </div>
          <div class="mt-2 fw-semibold" style="font-size: 0.9rem;">
            Clinical Sample Text Preview
          </div>
        </div>

        <!-- Compliance Badges -->
        <div class="d-flex gap-2 justify-content-center">
          <span class="badge" style="background: {parseFloat(contrastRatio) >= 4.5 ? '#10B981' : '#EF4444'}; color: #FFFFFF; padding: 0.5rem 1rem;">
            {parseFloat(contrastRatio) >= 4.5 ? '✓ WCAG AA (Normal Text)' : '✗ Fails AA'}
          </span>
          <span class="badge" style="background: {parseFloat(contrastRatio) >= 7.0 ? '#10B981' : '#F59E0B'}; color: #FFFFFF; padding: 0.5rem 1rem;">
            {parseFloat(contrastRatio) >= 7.0 ? '✓ WCAG AAA (Enhanced)' : 'Fails AAA'}
          </span>
        </div>
      </div>
    </div>

    <!-- Tool 2: 60:30:10 Quick Cheatsheet -->
    <div class="col-lg-6">
      <div class="card p-4 border rounded-4 shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF);">
        <h4 class="fw-bold mb-3" style="font-size: 1.15rem;">60:30:10 Surface Rules</h4>
        <ul class="list-unstyled d-flex flex-column gap-3" style="font-size: 0.875rem;">
          <li class="p-3 rounded-3" style="background: #F8FAFC; border-left: 4px solid #CBD5E1; color: #1C1C1C;">
            <strong>60% Foundation Canvas:</strong> Always default body background to <code>#F8FAFC</code> or surface cards to <code>#FFFFFF</code>. Never paint primary canvases with dark saturated blue.
          </li>
          <li class="p-3 rounded-3" style="background: #EBF5FE; border-left: 4px solid #022057; color: #022057;">
            <strong>30% Structure:</strong> Use <code>#022057</code> for the top navbar, section dividers, and footer. Keeps the page anchored without visual noise.
          </li>
          <li class="p-3 rounded-3" style="background: #FEF9C3; border-left: 4px solid #21A1F7; color: #022057;">
            <strong>10% Accent:</strong> Reserve <code>#21A1F7</code> and <code>#F7E143</code> strictly for interactive focal points. Maximum 1-2 accent CTAs per viewport.
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Tool 3: Interactive Lucide Icon Search & Copier -->
  <section class="card p-4 p-md-5 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
      <div>
        <h3 class="h5 fw-bold mb-1">Healthcare & System Icon Explorer</h3>
        <p class="text-secondary mb-0" style="font-size: 0.9rem;">
          Search clinical, vitality, and interface icons. Click any card to copy its component code.
        </p>
      </div>
      <div style="max-width: 280px; width: 100%;">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Search icons (e.g. clinic, heart)..." 
          bind:value={iconSearch}
        />
      </div>
    </div>

    <div class="row g-3">
      {#each filteredIcons as ico}
        <div class="col-6 col-md-4 col-lg-3">
          <div 
            class="p-3 border rounded-3 text-center h-100 d-flex flex-column align-items-center justify-content-center"
            style="background: var(--color-neutral-bg-1, #F8FAFC); cursor: pointer; transition: all 0.2s ease;"
            onclick={() => copyIconSnippet(ico.id)}
            onkeydown={(e) => e.key === 'Enter' && copyIconSnippet(ico.id)}
            role="button"
            tabindex="0"
          >
            <div style="color: var(--color-brand-primary, #043388); margin-bottom: 0.5rem;">
              <iconify-icon icon="lucide:{ico.id}" width="32" height="32"></iconify-icon>
            </div>
            <div class="fw-bold mb-1" style="font-size: 0.85rem; color: var(--color-neutral-fg-1, #1C1C1C);">
              {ico.name}
            </div>
            <code class="text-muted" style="font-size: 0.75rem;">
              {copiedIcon === ico.id ? '✓ Copied!' : `lucide:${ico.id}`}
            </code>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
