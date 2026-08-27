<script>
  let completedItems = $state({});

  const checklist = [
    { id: 'c1', role: 'All Staff', task: 'Read and understand the 60:30:10 Visual Hierarchy and Neutral Black (#1C1C1C) rule.' },
    { id: 'c2', role: 'All Staff', task: 'Generate your official corporate email signature using the Signature Tool.' },
    { id: 'c3', role: 'Designers', task: 'Download the official Vector Marks Kit (.svg / .png) from the Downloads repository.' },
    { id: 'c4', role: 'Developers', task: 'Import /assets/css/fluent.css and /assets/css/ss_theme.css into your app shell.' },
    { id: 'c5', role: 'Clinic Team', task: 'Install SS-CAM desktop suite for Windows clinical camera integration.' }
  ];

  function toggleCheck(id) {
    completedItems[id] = !completedItems[id];
  }
</script>

<svelte:head>
  <title>Staff Onboarding — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Onboarding</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Team Enablement</div>
    <h1 class="display-6 fw-bold mb-2">Staff Onboarding & Guidelines</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      Welcome to the SuamiSihat™ team. Follow this onboarding checklist to get your digital tools, design assets, and communications set up.
    </p>
  </div>

  <div class="row g-4">
    <!-- Checklist -->
    <div class="col-lg-7">
      <div class="card p-4 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
        <h4 class="fw-bold mb-3" style="font-size: 1.15rem;">New Joiner Checklist</h4>
        
        <div class="d-flex flex-column gap-3">
          {#each checklist as item}
            <div 
              class="p-3 border rounded-3 d-flex align-items-start gap-3" 
              style="background: {completedItems[item.id] ? '#ECFDF5' : '#F8FAFC'}; transition: background 0.2s ease; cursor: pointer;"
              onclick={() => toggleCheck(item.id)}
              onkeydown={(e) => e.key === 'Enter' && toggleCheck(item.id)}
              role="checkbox"
              aria-checked={!!completedItems[item.id]}
              tabindex="0"
            >
              <input 
                type="checkbox" 
                class="form-check-input mt-1" 
                checked={!!completedItems[item.id]} 
                tabindex="-1"
                aria-label={item.task}
              />
              <div>
                <span class="badge mb-1" style="background: rgba(4, 51, 136, 0.1); color: #043388; font-size: 0.7rem;">{item.role}</span>
                <div style="font-size: 0.9rem; color: var(--color-neutral-fg-1, #1C1C1C);" class:text-decoration-line-through={completedItems[item.id]}>
                  {item.task}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Quick Tool Cards -->
    <div class="col-lg-5">
      <div class="card p-4 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
        <h4 class="fw-bold mb-3" style="font-size: 1.15rem;">Essential Resources</h4>
        <ul class="list-unstyled d-flex flex-column gap-3 mb-0" style="font-size: 0.875rem;">
          <li>
            <a href="/signature/" class="d-flex align-items-center gap-2 text-decoration-none fw-semibold">
              <iconify-icon icon="lucide:mail" width="18" class="text-primary"></iconify-icon>
              Email Signature Generator
            </a>
          </li>
          <li>
            <a href="/public/brand/downloads/" class="d-flex align-items-center gap-2 text-decoration-none fw-semibold">
              <iconify-icon icon="lucide:download" width="18" class="text-primary"></iconify-icon>
              Download Full Brand Asset Pack
            </a>
          </li>
          <li>
            <a href="/doc/?doc=roadmap" class="d-flex align-items-center gap-2 text-decoration-none fw-semibold">
              <iconify-icon icon="lucide:map" width="18" class="text-primary"></iconify-icon>
              Strategic Roadmap (2026)
            </a>
          </li>
          <li>
            <a href="https://github.com/SuamiSihat/SS-Design-System" target="_blank" class="d-flex align-items-center gap-2 text-decoration-none fw-semibold">
              <iconify-icon icon="lucide:github" width="18" class="text-primary"></iconify-icon>
              GitHub Design System Repository
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
