<script>
  let name = $state('Harussani');
  let title = $state('Director of Technology & Infrastructure');
  let entity = $state('SuamiSihat Holdings');
  let phone = $state('+60 12-345 6789');
  let email = $state('haru@suamisihat.com.my');
  let location = $state('Kuala Lumpur, Malaysia');

  let copied = $state(false);

  let signatureHtml = $derived(`
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #1C1C1C; line-height: 1.4;">
  <tr>
    <td style="padding-right: 18px; border-right: 2px solid #043388; vertical-align: top;">
      <img src="https://assets.suamisihat.com.my/public/brand/logos/ss-logomark-light.png" alt="SuamiSihat" width="56" height="56" style="display: block; border-radius: 8px;" />
    </td>
    <td style="padding-left: 18px; vertical-align: top;">
      <div style="font-size: 16px; font-weight: bold; color: #022057; margin-bottom: 2px;">${name}</div>
      <div style="font-size: 13px; color: #043388; font-weight: 600; margin-bottom: 6px;">${title} • ${entity}</div>
      <div style="font-size: 12px; color: #64748B; margin-bottom: 4px;">
        <strong>T:</strong> ${phone} &nbsp;|&nbsp; <strong>E:</strong> <a href="mailto:${email}" style="color: #21A1F7; text-decoration: none;">${email}</a>
      </div>
      <div style="font-size: 12px; color: #64748B;">
        <strong>W:</strong> <a href="https://suamisihat.com.my" style="color: #21A1F7; text-decoration: none;">suamisihat.com.my</a> &nbsp;|&nbsp; ${location}
      </div>
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
      // Fallback to text copy
      await navigator.clipboard.writeText(signatureHtml);
      copied = true;
      setTimeout(() => (copied = false), 2500);
    }
  }
</script>

<svelte:head>
  <title>Email Signature Generator — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
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
          <label for="entityInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Entity / Subsidiary</label>
          <select id="entityInput" class="form-select" bind:value={entity}>
            <option value="SuamiSihat Holdings">SuamiSihat Holdings (01-SSH)</option>
            <option value="SuamiSihat Clinic">SuamiSihat Clinic (02-SSC)</option>
            <option value="SuamiSihat Group">SuamiSihat Group (03-SSG)</option>
            <option value="SuamiSihat Tech">SuamiSihat Tech (04-SST)</option>
            <option value="SuamiSihat E-Commerce">SuamiSihat E-Commerce (05-SSE)</option>
          </select>
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
          <label for="locationInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Location</label>
          <input id="locationInput" type="text" class="form-control" bind:value={location} />
        </div>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="col-lg-7">
      <div class="card p-4 border rounded-4 shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF);">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h4 class="fw-bold mb-0" style="font-size: 1.1rem;">Live Signature Preview</h4>
          <button 
            type="button" 
            onclick={copySignature} 
            class="btn btn-primary rounded-pill px-4 btn-sm"
          >
            <iconify-icon icon={copied ? "lucide:check" : "lucide:copy"} width="15"></iconify-icon>
            {copied ? 'Copied to Clipboard!' : 'Copy Formatted Signature'}
          </button>
        </div>

        <div class="p-4 border rounded-3 bg-white mb-4 shadow-sm" style="min-height: 180px; display: flex; align-items: center;">
          <!-- Signature Render -->
          {@html signatureHtml}
        </div>

        <div class="alert alert-info py-2 px-3" style="font-size: 0.8rem;">
          💡 <strong>Tip:</strong> Click "Copy Formatted Signature", then paste directly (Ctrl+V / Cmd+V) into your email client's signature preferences.
        </div>
      </div>
    </div>
  </div>
</div>
