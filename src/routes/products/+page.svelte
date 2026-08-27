<script>
  import BrandAssetCard from '$lib/components/BrandAssetCard.svelte';

  let selectedFilter = $state('all');

  const products = [
    {
      name: "Androlab™",
      category: "own",
      description: "Men's clinical hormonal health, testosterone support & vitality lab formulations.",
      svg: "/public/brand/logos/logo_suamisihat_primary_light.svg"
    },
    {
      name: "MENSS™",
      category: "own",
      description: "Male performance and reproductive wellness protocol suites.",
      svg: "/public/brand/logos/logo_suamisihat_primary_dark.svg",
      dark: true
    },
    {
      name: "Rejal™",
      category: "own",
      description: "Premium masculine daily hygiene, grooming, and intimate wellness line.",
      svg: "/public/brand/logos/ss-logomark-light.svg"
    },
    {
      name: "Biotropics Physta®",
      category: "partner",
      description: "Patented premium standardized Tongkat Ali water-soluble extract for vitality.",
      svg: "/products/logo_Physta.svg"
    },
    {
      name: "nuCaffe™",
      category: "partner",
      description: "Premium functional coffee blend enriched with Tongkat Ali Physta.",
      svg: "/products/logo_nuCaffe.svg"
    },
    {
      name: "Men's Formula X™",
      category: "partner",
      description: "Clinical-grade multivitamin and herbal male endurance formula.",
      svg: "/products/logo_Men'sFormulaX.svg"
    }
  ];

  let filteredProducts = $derived(
    selectedFilter === 'all' ? products : products.filter(p => p.category === selectedFilter)
  );
</script>

<svelte:head>
  <title>Product Brands Catalogue — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Products</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Brand Ecosystem</div>
    <h1 class="display-6 fw-bold mb-2">Product Brands & Sub-Brand Assets</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      Official vector logos, brand marks, and packaging guidelines across SuamiSihat™ proprietary product lines and certified partner brands.
    </p>

    <!-- Filters -->
    <div class="d-flex gap-2 mt-4 flex-wrap">
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-3" 
        class:btn-primary={selectedFilter === 'all'}
        class:btn-outline-secondary={selectedFilter !== 'all'}
        onclick={() => (selectedFilter = 'all')}
      >
        All Brands ({products.length})
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-3" 
        class:btn-primary={selectedFilter === 'own'}
        class:btn-outline-secondary={selectedFilter !== 'own'}
        onclick={() => (selectedFilter = 'own')}
      >
        SuamiSihat Proprietary Brands
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-3" 
        class:btn-primary={selectedFilter === 'partner'}
        class:btn-outline-secondary={selectedFilter !== 'partner'}
        onclick={() => (selectedFilter = 'partner')}
      >
        Certified Partner Brands & Bio-Actives
      </button>
    </div>
  </div>

  <!-- Product Grid -->
  <div class="row g-4 mb-5">
    {#each filteredProducts as prod}
      <div class="col-md-6 col-lg-4">
        <BrandAssetCard 
          title={prod.name} 
          subtitle={prod.description} 
          svgPath={prod.svg} 
          defaultDark={prod.dark || false} 
        />
      </div>
    {/each}
  </div>

</div>
