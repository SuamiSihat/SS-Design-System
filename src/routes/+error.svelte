<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Page Not Found — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5 text-center d-flex flex-column align-items-center justify-content-center" style="min-height: 60vh;">
  <div class="card p-5 border rounded-4 shadow-sm" style="max-width: 540px; background: var(--color-layer-card, #FFFFFF);">
    <div style="font-size: 4rem; font-weight: 800; color: #043388; line-height: 1; margin-bottom: 1rem;">
      {$page.status || 404}
    </div>
    <h1 class="h4 fw-bold mb-2">Resource Not Found</h1>
    <p class="text-secondary mb-4" style="font-size: 0.9rem;">
      {$page.error?.message || 'The design token, component or document you are looking for does not exist or has been relocated.'}
    </p>
    <div>
      <a href="/" class="btn btn-primary rounded-pill px-4">
        ← Back to Design System Hub
      </a>
    </div>
  </div>
</div>
