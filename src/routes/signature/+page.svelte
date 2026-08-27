<script>
  let name = $state('Harussani');
  let title = $state('Director of Technology & Infrastructure');
  let entityKey = $state('ssh');
  let phone = $state('+60 12-345 6789');
  let email = $state('haru@suamisihat.com.my');
  let location = $state('Kuala Lumpur, Malaysia');
  let website = $state('suamisihat.com.my');
  let includeDisclaimer = $state(true);

  let copied = $state(false);

  const entities = {
    master: { name: 'SuamiSihat™', code: 'Master Brand', color: '#043388', logo: 'https://assets.suamisihat.com.my/public/brand/logos/ss-logomark-light.png', site: 'suamisihat.com.my' },
    ssh:    { name: 'SuamiSihat Holding Sdn. Bhd.', code: '01-SSH', color: '#022057', logo: 'https://assets.suamisihat.com.my/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_light.png', site: 'suamisihat.com.my' },
    ssc:    { name: 'SuamiSihat Clinic Sdn. Bhd.', code: '02-SSC', color: '#043388', logo: 'https://assets.suamisihat.com.my/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.png', site: 'suamisihat.clinic' },
    ssw:    { name: 'SuamiSihat Wellness Sdn. Bhd.', code: '03-SSW', color: '#21A1F7', logo: 'https://assets.suamisihat.com.my/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_light.png', site: 'suamisihatwellness.com' },
    sse:    { name: 'SuamiSihat Ecommerce Sdn. Bhd.', code: '04-SSE', color: '#BD9A73', logo: 'https://assets.suamisihat.com.my/public/brand/logos/04_logo_ssEcom/logo_sse_primary_light.png', site: 'store.suamisihat.my' },
    sst:    { name: 'SuamiSihat Technology Sdn. Bhd.', code: '05-SST', color: '#6DC6EC', logo: 'https://assets.suamisihat.com.my/public/brand/logos/05_logo_ssTech/logo_sst_primary_light.png', site: 'suamisihat.app' }
  };

  function selectEntity(key) {
    entityKey = key;
    website = entities[key].site;
  }

  let selectedEntity = $derived(entities[entityKey] || entities.ssh);

  let signatureHtml = $derived(`
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #1C1C1C; line-height: 1.45;">
  <tr>
    <td style="padding-right: 18px; border-right: 3px solid ${selectedEntity.color}; vertical-align: top;">
      <img src="${selectedEntity.logo}" alt="${selectedEntity.name}" width="54" height="54" style="display: block; border-radius: 8px; border: 0;" />
    </td>
    <td style="padding-left: 18px; vertical-align: top;">
      <div style="font-size: 16px; font-weight: 700; color: #022057; margin-bottom: 2px;">${name}</div>
      <div style="font-size: 12px; color: ${selectedEntity.color}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;">${title} &bull; ${selectedEntity.name} (${selectedEntity.code})</div>
      <div style="font-size: 12px; color: #64748B; margin-bottom: 4px;">
        <strong style="color: #022057;">T:</strong> ${phone} &nbsp;|&nbsp; <strong style="color: #022057;">E:</strong> <a href="mailto:${email}" style="color: #043388; font-weight: 600; text-decoration: none;">${email}</a>
      </div>
      <div style="font-size: 12px; color: #64748B;">
        <strong style="color: #022057;">W:</strong> <a href="https://${website}" style="color: #043388; font-weight: 600; text-decoration: none;">${website}</a> &nbsp;|&nbsp; ${location}
      </div>
      ${includeDisclaimer ? `
      <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #E2E8F0; font-size: 10px; color: #94A3B8; line-height: 1.4; max-width: 480px;">
        <strong>Confidentiality Notice:</strong> This message and any attachments are intended solely for the recipient and may contain privileged healthcare/corporate information. If received in error, please notify the sender and delete immediately.
      </div>` : ''}
    </td>
  </tr>
</table>
`.trim());

  async function copySignature() {
    try {
      const type = 'text/html';
      const blob = new Blob([signatureHtml], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      await navigator.clipboard.write(data);
      copied = true;
      setTimeout(() => (copied = false), 2500);
    } catch (e) {
      await navigator.clipboard.writeText(signatureHtml);
      copied = true;
      setTimeout(() => (copied = false), 2500);
    }
  }
</script>

<svelte:head>
  <title>Email Signature Generator — SuamiSihat™ Design System</title>
</svelte:head>

<div class="w-100 py-5" style="width: 100%; max-width: 100%; padding: 2.5rem clamp(1.5rem, 4vw, 4rem); box-sizing: border-box;">
  <!-- Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Signature Generator</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Staff Tools</div>
    <h1 class="display-6 fw-bold mb-2">Email Signature Generator</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      Generate standardized corporate email signatures compliant with SuamiSihat™ brand standards for Outlook, Apple Mail, and Gmail.
    </p>
  </div>

  <!-- Quick Entity Selector Chips -->
  <div class="card p-3 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
      <span style="font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-fg-3);">Quick Entity Selector</span>
      <span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Select subsidiary to automatically configure brand palette &amp; links</span>
    </div>
    <div class="d-flex flex-wrap gap-2">
      {#each Object.entries(entities) as [key, ent]}
        <button
          type="button"
          class="btn btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3"
          class:btn-primary={entityKey === key}
          class:btn-outline-secondary={entityKey !== key}
          onclick={() => selectEntity(key)}
          style="font-size:0.8rem;font-weight:600;"
        >
          <span style="width:10px;height:10px;border-radius:50%;background:{ent.color};display:inline-block;"></span>
          {ent.code} &middot; {ent.name}
        </button>
      {/each}
    </div>
  </div>

  <div class="row g-4">
    <!-- Form Inputs -->
    <div class="col-lg-5">
      <div class="card p-4 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
        <h4 class="fw-bold mb-3" style="font-size: 1.1rem;">Your Information</h4>

        <div class="mb-3">
          <label for="nameInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Full Name</label>
          <input id="nameInput" type="text" class="form-control" bind:value={name} />
        </div>

        <div class="mb-3">
          <label for="titleInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Job Title</label>
          <input id="titleInput" type="text" class="form-control" bind:value={title} />
        </div>

        <div class="mb-3">
          <label for="phoneInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Direct Phone</label>
          <input id="phoneInput" type="text" class="form-control" bind:value={phone} />
        </div>

        <div class="mb-3">
          <label for="emailInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Work Email</label>
          <input id="emailInput" type="email" class="form-control" bind:value={email} />
        </div>

        <div class="mb-3">
          <label for="websiteInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Official Website</label>
          <input id="websiteInput" type="text" class="form-control" bind:value={website} />
        </div>

        <div class="mb-3">
          <label for="locationInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Location</label>
          <input id="locationInput" type="text" class="form-control" bind:value={location} />
        </div>

        <div class="form-check form-switch mt-3">
          <input class="form-check-input" type="checkbox" id="disclaimerSwitch" bind:checked={includeDisclaimer}>
          <label class="form-check-label" for="disclaimerSwitch" style="font-size:0.85rem;font-weight:600;">Include Confidentiality Disclaimer</label>
        </div>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="col-lg-7">
      <div class="card p-4 border rounded-4 shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF);">
        <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <h4 class="fw-bold mb-0" style="font-size: 1.1rem;">Live Signature Preview</h4>
          <button 
            type="button" 
            onclick={copySignature} 
            class="btn btn-primary rounded-pill px-4 btn-sm"
          >
            <iconify-icon icon={copied ? "fluent:checkmark-16-regular" : "fluent:copy-16-regular"} width="15"></iconify-icon>
            {copied ? 'Copied to Clipboard!' : 'Copy Formatted Signature'}
          </button>
        </div>

        <div class="p-4 border rounded-3 bg-white mb-4 shadow-sm" style="min-height: 220px; display: flex; align-items: center; overflow-x: auto;">
          <!-- Signature Render -->
          {@html signatureHtml}
        </div>

        <div class="alert alert-info py-2 px-3 mb-0" style="font-size: 0.8rem;">
          💡 <strong>How to install:</strong> Click "Copy Formatted Signature", then paste directly (Ctrl+V / Cmd+V) into Outlook Preferences &rarr; Signatures, Apple Mail, or Gmail Settings &rarr; Signature.
        </div>
      </div>
    </div>
  </div>
</div>
