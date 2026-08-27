<script>
  import CodeBox from '$lib/components/CodeBox.svelte';

  let selectedComponent = $state('buttons');
</script>

<svelte:head>
  <title>Component Library — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Components</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">UI Component Standard</div>
    <h1 class="display-6 fw-bold mb-2">Fluent 2 Component Library</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      Production-ready UI components designed with the 60:30:10 rule, accessible focus rings, and acrylic backdrop effects.
    </p>

    <!-- Component Category Filter -->
    <div class="d-flex gap-2 mt-4 flex-wrap">
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-3" 
        class:btn-primary={selectedComponent === 'buttons'}
        class:btn-outline-secondary={selectedComponent !== 'buttons'}
        onclick={() => (selectedComponent = 'buttons')}
      >
        Buttons & CTAs
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-3" 
        class:btn-primary={selectedComponent === 'cards'}
        class:btn-outline-secondary={selectedComponent !== 'cards'}
        onclick={() => (selectedComponent = 'cards')}
      >
        Service & Stat Cards
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-3" 
        class:btn-primary={selectedComponent === 'badges'}
        class:btn-outline-secondary={selectedComponent !== 'badges'}
        onclick={() => (selectedComponent = 'badges')}
      >
        Badges & Status
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-3" 
        class:btn-primary={selectedComponent === 'alerts'}
        class:btn-outline-secondary={selectedComponent !== 'alerts'}
        onclick={() => (selectedComponent = 'alerts')}
      >
        Alerts & Messages
      </button>
    </div>
  </div>

  <!-- SECTION: BUTTONS -->
  {#if selectedComponent === 'buttons'}
    <div class="card p-4 p-md-5 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
      <h3 class="h5 fw-bold mb-3">Buttons & Conversion Actions</h3>
      <p class="text-secondary mb-4" style="font-size: 0.9rem;">
        Primary conversion buttons use the 10% Accent (Azure <code>#21A1F7</code>). Secondary actions use subtle neutral styles to eliminate CTA collision.
      </p>

      <!-- Visual Preview -->
      <div class="p-4 border rounded-3 mb-4 bg-light d-flex flex-wrap align-items-center gap-3">
        <button class="btn" style="background: #21A1F7; color: #022057; font-weight: 700; border-radius: 8px; padding: 0.6rem 1.4rem;">
          Primary Accent CTA
        </button>
        <button class="btn" style="background: #022057; color: #FFFFFF; font-weight: 600; border-radius: 8px; padding: 0.6rem 1.4rem;">
          Brand Secondary
        </button>
        <button class="btn btn-outline-secondary" style="border-radius: 8px; padding: 0.6rem 1.4rem; font-weight: 600;">
          Neutral Outline
        </button>
        <button class="btn btn-danger" style="border-radius: 8px; padding: 0.6rem 1.4rem; font-weight: 600;">
          Destructive
        </button>
      </div>

      <CodeBox 
        title="Button HTML Structure"
        language="html"
        code={`<!-- 10% Primary Conversion CTA -->
<button class="f-btn f-btn-primary">Book Appointment</button>

<!-- 30% Secondary Brand Button -->
<button class="f-btn f-btn-secondary">View Services</button>

<!-- Neutral Outline -->
<button class="f-btn f-btn-outline">Cancel</button>`}
      />
    </div>
  {/if}

  <!-- SECTION: CARDS -->
  {#if selectedComponent === 'cards'}
    <div class="card p-4 p-md-5 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
      <h3 class="h5 fw-bold mb-3">Service & Clinical Information Cards</h3>
      <p class="text-secondary mb-4" style="font-size: 0.9rem;">
        Service cards follow the 60% neutral background rule with clean 1px borders and subtle elevation on hover.
      </p>

      <!-- Visual Preview -->
      <div class="p-4 border rounded-3 mb-4 bg-light">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card p-4 border rounded-4 shadow-sm h-100" style="background: #FFFFFF;">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge" style="background: rgba(4, 51, 136, 0.1); color: #043388;">CLINICAL SERVICE</span>
                <span class="text-muted ms-auto" style="font-size: 0.75rem;">30-45 mins</span>
              </div>
              <h4 class="fw-bold mb-2" style="font-size: 1.15rem; color: #1C1C1C;">Erectile Vitality & ED Teleconsult</h4>
              <p class="text-secondary mb-3" style="font-size: 0.85rem; line-height: 1.5;">
                Comprehensive confidential medical consultation with registered doctor and personalized clinical plan.
              </p>
              <div class="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                <span class="fw-bold" style="color: #022057; font-size: 1.1rem;">RM 150</span>
                <a href="#book" class="btn btn-sm text-decoration-none" style="background: #21A1F7; color: #022057; font-weight: 700; border-radius: 6px;">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeBox 
        title="Card HTML & CSS Tokens"
        language="html"
        code={`<div class="f-card f-card-elevated">
  <div class="f-card-header">
    <span class="f-badge">CLINICAL SERVICE</span>
  </div>
  <h4 class="f-card-title">Erectile Vitality & ED Teleconsult</h4>
  <p class="f-card-text">Comprehensive confidential consultation with registered doctor.</p>
  <div class="f-card-footer">
    <span class="f-price">RM 150</span>
    <button class="f-btn f-btn-primary">Book Now</button>
  </div>
</div>`}
      />
    </div>
  {/if}

  <!-- SECTION: BADGES -->
  {#if selectedComponent === 'badges'}
    <div class="card p-4 p-md-5 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
      <h3 class="h5 fw-bold mb-3">Status Badges & Verification Tags</h3>
      
      <div class="p-4 border rounded-3 mb-4 bg-light d-flex flex-wrap gap-2 align-items-center">
        <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #065F46; border: 1px solid #10B981; padding: 0.4rem 0.8rem; border-radius: 9999px;">
          ✓ MOH Registered
        </span>
        <span class="badge" style="background: rgba(33, 161, 247, 0.15); color: #0369A1; border: 1px solid #21A1F7; padding: 0.4rem 0.8rem; border-radius: 9999px;">
          Telehealth Active
        </span>
        <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #92400E; border: 1px solid #F59E0B; padding: 0.4rem 0.8rem; border-radius: 9999px;">
          Pending Consultation
        </span>
        <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #991B1B; border: 1px solid #EF4444; padding: 0.4rem 0.8rem; border-radius: 9999px;">
          Contraindication
        </span>
      </div>

      <CodeBox 
        title="Badge HTML Standard"
        language="html"
        code={`<span class="f-badge f-badge-success">✓ MOH Registered</span>
<span class="f-badge f-badge-info">Telehealth Active</span>
<span class="f-badge f-badge-warning">Pending Consultation</span>`}
      />
    </div>
  {/if}

  <!-- SECTION: ALERTS -->
  {#if selectedComponent === 'alerts'}
    <div class="card p-4 p-md-5 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
      <h3 class="h5 fw-bold mb-3">Alerts & Patient Notices</h3>

      <div class="p-4 border rounded-3 mb-4 bg-light d-flex flex-column gap-3">
        <div class="p-3 rounded-3" style="background: #EBF5FE; border-left: 4px solid #21A1F7; color: #0369A1;">
          <strong>Clinical Note:</strong> All patient data is encrypted and strictly accessible only to your attending medical doctor.
        </div>
        <div class="p-3 rounded-3" style="background: #ECFDF5; border-left: 4px solid #10B981; color: #065F46;">
          <strong>Appointment Confirmed:</strong> Your teleconsult slot is booked for 2:30 PM (Asia/Kuala_Lumpur).
        </div>
      </div>

      <CodeBox 
        title="Alert HTML"
        language="html"
        code={`<div class="f-alert f-alert-info">
  <strong>Clinical Note:</strong> Patient data is encrypted end-to-end.
</div>`}
      />
    </div>
  {/if}

</div>
