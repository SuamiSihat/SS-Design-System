<script>
  let searchQuery = $state('');
  let selectedCategory = $state('all');
  let isSidebarMinimized = $state(false);

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  const allProducts = [
    {
      id: 'androlab',
      name: 'ANDROLAB',
      type: 'Core SS Brand',
      category: 'supplements',
      desc: 'Clinical testosterone support, male hormonal balance, and premium vitality formulations.',
      logo: '/products/Androlab/logo_Androlab.svg',
      tags: ['Core Brand', 'Clinical', 'Supplements'],
      folder: '/products/Androlab/'
    },
    {
      id: 'menss',
      name: 'MENSS',
      type: 'Core SS Brand',
      category: 'lifestyle',
      desc: 'Male performance lifestyle, endurance protocols, and sexual vitality support.',
      logo: '/products/MENSS/logo_MENSS.svg',
      tags: ['Core Brand', 'Lifestyle', 'Vitality'],
      folder: '/products/MENSS/'
    },
    {
      id: 'mensculine',
      name: 'Mensculine',
      type: 'Core SS Brand',
      category: 'lifestyle',
      desc: 'Modern masculine grooming, energy optimisation, and daily performance wellness.',
      logo: '/products/Mensculine/logo_Mensculine.svg',
      tags: ['Core Brand', 'Lifestyle', 'Grooming'],
      folder: '/products/Mensculine/'
    },
    {
      id: 'drmitring',
      name: 'Dr Mit Ring®',
      type: 'Medical Device',
      category: 'clinical',
      desc: 'Clinical circumcision devices and medical-grade procedural solutions.',
      logo: '/products/DrMitRing/logo_DrMitRing.svg',
      tags: ['Medical Device', 'Clinical', 'MOH Approved'],
      folder: '/products/DrMitRing/'
    },
    {
      id: 'rejal',
      name: 'REJAL',
      type: 'Core SS Brand',
      category: 'superfood',
      desc: 'Herbal vitality teas, premium natural tonics, and daily botanical rejuvenation.',
      logo: '/products/Rejal/logo_Rejal.svg',
      tags: ['Superfood', 'Botanical', 'Vitality'],
      folder: '/products/Rejal/'
    },
    {
      id: 'nucaffe',
      name: 'nuCaffe®',
      type: 'Partner Brand',
      category: 'superfood',
      desc: 'Functional wellness coffee enriched with standardized Tongkat Ali Physta® extract.',
      logo: '/products/nuCaffe/logo_nuCaffe.svg',
      tags: ['Partner Brand', 'Superfood', 'Physta®'],
      folder: '/products/nuCaffe/'
    },
    {
      id: 'pertabi',
      name: 'PERTABI',
      type: 'Advocacy & NGO',
      category: 'programme',
      desc: 'National Malaysian male wellness advocacy, educational workshops, and community health.',
      logo: '/products/Pertabi/logo_Pertabi.svg',
      tags: ['Advocacy', 'Community', 'Education'],
      folder: '/products/Pertabi/'
    },
    {
      id: 'physta',
      name: 'Biotropics Physta®',
      type: 'Bioactive Science',
      category: 'supplements',
      desc: 'Patented water-soluble freeze-dried Tongkat Ali extract with published clinical trials.',
      logo: '/products/Biotropics/logo_Physta.svg',
      tags: ['Bioactive', 'Clinical Science', 'Patented'],
      folder: '/products/Biotropics/'
    }
  ];

  let filteredProducts = $derived(
    allProducts.filter(p => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        (p.name + ' ' + p.desc + ' ' + p.tags.join(' ')).toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
  );
</script>

<svelte:head>
  <title>Product Catalogue — SuamiSihat™ Design System</title>
</svelte:head>

<div class="f-page-layout" class:sidebar-minimized={isSidebarMinimized} style="display: grid; grid-template-columns: {isSidebarMinimized ? '0 1fr' : '260px 1fr'}; min-height: calc(100vh - 60px); position: relative; transition: all 0.3s ease;">
  <!-- Sidebar Toggle Pill -->
  <button class="f-sidebar-toggle" onclick={toggleSidebar} aria-label="Toggle sidebar" style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;">
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Product Sidebar -->
  <aside class="f-sidebar acrylic" aria-label="Product navigation" style="display: {isSidebarMinimized ? 'none' : 'block'}; padding: 1.5rem 1rem;">
    <div style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3); margin-bottom: 0.75rem; padding-left: 0.5rem;">Categories</div>
    <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 4px;">
      <li>
        <button 
          class="btn btn-sm w-100 text-start d-flex align-items-center justify-content-between" 
          class:btn-primary={selectedCategory === 'all'} 
          class:btn-light={selectedCategory !== 'all'}
          onclick={() => (selectedCategory = 'all')}
          style="border-radius: 8px; font-weight: 600; font-size: 0.825rem;"
        >
          <span><iconify-icon icon="fluent:apps-24-regular" style="vertical-align: middle; margin-right: 6px;"></iconify-icon> All Products</span>
          <span class="badge bg-secondary rounded-pill">{allProducts.length}</span>
        </button>
      </li>
      <li>
        <button 
          class="btn btn-sm w-100 text-start d-flex align-items-center justify-content-between" 
          class:btn-primary={selectedCategory === 'supplements'} 
          class:btn-light={selectedCategory !== 'supplements'}
          onclick={() => (selectedCategory = 'supplements')}
          style="border-radius: 8px; font-weight: 600; font-size: 0.825rem;"
        >
          <span><iconify-icon icon="fluent:pill-24-regular" style="vertical-align: middle; margin-right: 6px;"></iconify-icon> Supplements</span>
        </button>
      </li>
      <li>
        <button 
          class="btn btn-sm w-100 text-start d-flex align-items-center justify-content-between" 
          class:btn-primary={selectedCategory === 'clinical'} 
          class:btn-light={selectedCategory !== 'clinical'}
          onclick={() => (selectedCategory = 'clinical')}
          style="border-radius: 8px; font-weight: 600; font-size: 0.825rem;"
        >
          <span><iconify-icon icon="fluent:stethoscope-24-regular" style="vertical-align: middle; margin-right: 6px;"></iconify-icon> Clinical &amp; Devices</span>
        </button>
      </li>
      <li>
        <button 
          class="btn btn-sm w-100 text-start d-flex align-items-center justify-content-between" 
          class:btn-primary={selectedCategory === 'lifestyle'} 
          class:btn-light={selectedCategory !== 'lifestyle'}
          onclick={() => (selectedCategory = 'lifestyle')}
          style="border-radius: 8px; font-weight: 600; font-size: 0.825rem;"
        >
          <span><iconify-icon icon="fluent:heart-pulse-24-regular" style="vertical-align: middle; margin-right: 6px;"></iconify-icon> Lifestyle &amp; Grooming</span>
        </button>
      </li>
      <li>
        <button 
          class="btn btn-sm w-100 text-start d-flex align-items-center justify-content-between" 
          class:btn-primary={selectedCategory === 'superfood'} 
          class:btn-light={selectedCategory !== 'superfood'}
          onclick={() => (selectedCategory = 'superfood')}
          style="border-radius: 8px; font-weight: 600; font-size: 0.825rem;"
        >
          <span><iconify-icon icon="fluent:leaf-three-24-regular" style="vertical-align: middle; margin-right: 6px;"></iconify-icon> Superfoods &amp; Teas</span>
        </button>
      </li>
      <li>
        <button 
          class="btn btn-sm w-100 text-start d-flex align-items-center justify-content-between" 
          class:btn-primary={selectedCategory === 'programme'} 
          class:btn-light={selectedCategory !== 'programme'}
          onclick={() => (selectedCategory = 'programme')}
          style="border-radius: 8px; font-weight: 600; font-size: 0.825rem;"
        >
          <span><iconify-icon icon="fluent:people-community-24-regular" style="vertical-align: middle; margin-right: 6px;"></iconify-icon> Advocacy &amp; NGOs</span>
        </button>
      </li>
    </ul>
  </aside>

  <!-- Product Content -->
  <main class="cat-main f-main-content" style="padding: 2.5rem; max-width: 1200px;">
    <!-- Breadcrumb & Header -->
    <div style="margin-bottom: 2rem;">
      <nav class="brand-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
        <span style="color:var(--color-neutral-fg-1);font-weight:600;">Product Brands</span>
      </nav>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
        <div>
          <h1 style="font-size:2.25rem;font-weight:700;color:var(--color-neutral-fg-1);margin:0 0 4px;">Product Catalogue</h1>
          <p style="font-size:0.95rem;color:var(--color-neutral-fg-2);margin:0;">All SuamiSihat™ brands, clinical devices, and partner formulations.</p>
        </div>
        <div style="min-width: 260px;">
          <input 
            type="search" 
            class="form-control" 
            placeholder="Search products & formulations..." 
            bind:value={searchQuery}
            style="border-radius: 8px;"
          />
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="row g-4">
      {#each filteredProducts as product}
        <div class="col-md-6 col-lg-4">
          <div class="product-card h-100" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);padding:1.5rem;display:flex;flex-direction:column;box-shadow:var(--f-shadow-2);">
            <!-- High-Contrast White Tile for Logo -->
            <div style="height:90px;background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:var(--f-radius-lg);display:flex;align-items:center;justify-content:center;padding:1rem;margin-bottom:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <img src={product.logo} alt={product.name} style="max-height:50px;max-width:85%;object-fit:contain;" onerror={(e) => { e.currentTarget.src = '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg'; }} />
            </div>

            <div style="font-size:0.75rem;font-weight:700;color:var(--color-brand-primary);text-transform:uppercase;margin-bottom:4px;">{product.type}</div>
            <h3 style="font-size:1.15rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:6px;">{product.name}</h3>
            <p style="font-size:0.85rem;color:var(--color-neutral-fg-2);line-height:1.55;flex:1;margin-bottom:1rem;">{product.desc}</p>

            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:1rem;">
              {#each product.tags as tag}
                <span class="badge bg-light text-dark border" style="font-size:0.68rem;">{tag}</span>
              {/each}
            </div>

            <div style="border-top:1px solid var(--color-neutral-stroke-1);padding-top:0.75rem;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Vector SVG Assets</span>
              <a href={product.logo} download class="btn btn-sm btn-outline-primary" style="font-size:0.75rem;">
                <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> SVG
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </main>
</div>
