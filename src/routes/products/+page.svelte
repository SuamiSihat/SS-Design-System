<script>
  import { onMount, tick } from 'svelte';
  import { getProduct } from '$lib/products/index.js';

  let searchQuery = $state('');
  let selectedFilter = $state('all');   // 'all' | category slug
  let showArchived = $state(false);

  /** Internal company codes shown as plain names */
  const COMPANY_NAMES = { '01-SSH': 'SS Health', '02-SSC': 'SS Clinic', '03-SSW': 'SS Wellness', '05-SSE': 'SS Ecommerce' };
  const plainEntity = (e) => e.replace(/0[0-9]-SS[A-Z]/g, (c) => COMPANY_NAMES[c] ?? c);
  let isSidebarMinimized = $state(false);
  let activeSection = $state('section-ss');

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  // ── Product Data ────────────────────────────────────────────────
  const ssSections = [
    {
      id: 'section-ss',
      title: 'SS Products & Global Lines',
      desc: 'Authoritative brand portfolio owned and operated under the SuamiSihat® ecosystem',
      icon: 'fluent:star-24-regular',
      iconClass: 'ps-icon-ss',
      products: [
        {
          id: 'androlab',
          name: 'ANDROLAB',
          type: 'Core SS Brand',
          category: ['supplements', 'clinical'],
          tags: ['SuamiSihat®', 'Clinic programme', 'Alpha Sachet'],
          tagClasses: ['tag-ss', 'tag-clinic', 'tag-wellness'],
          entity: '01-SSH · 02-SSC',
          entityIcon: 'fluent:organization-24-regular',
          logo: '/products/Androlab/logos/logo_androlab_primary.svg',
          href: '/products/androlab/',
          accent: 'linear-gradient(135deg, #101820, #0A89FA)',
          desc: 'Vitality science and clinical performance. Features <strong>ANDROLAB Alpha</strong> (daily botanical sachet drinks with L-Citrulline, Ashwagandha &amp; Saffron) and <a href="/doc/?doc=clinic-positioning" class="text-decoration-underline" style="color:inherit;"><strong>ANDROLAB RX</strong></a> (doctor-led programmes delivered inside <a href="/doc/?doc=clinic-positioning" class="text-decoration-underline" style="color:inherit;">SS Clinic</a>).',
          searchData: 'androlab alpha rx sachet drinks prescription supplements clinical clinic'
        },
        {
          id: 'menss',
          name: 'MENSS',
          type: 'Core SS Brand',
          category: ['lifestyle', 'clinical'],
          tags: ['SuamiSihat®', 'FRÉSH Wash', 'Penile Pump (VED)', 'Ring Series'],
          tagClasses: ['tag-ss', 'tag-wellness', 'tag-clinic', 'tag-ecom'],
          entity: '05-SSE · 02-SSC',
          entityIcon: 'fluent:organization-24-regular',
          logo: '/products/MENSS/logos/logo_menss.svg',
          href: '/products/menss/',
          accent: 'linear-gradient(135deg, #030404, #0E92CC)',
          desc: 'Modern intimate lifestyle, hygiene, and hardware. Features <strong>MENSS : FRÉSH Wash</strong> (intimate dermatological wash), the motorized <strong>MENSS Penile Pump (VED)</strong> with luxury drawer unboxing, and the <strong>MENSS Ring Series</strong> (Core, Duo, Carry) — integrated with <a href="/doc/?doc=clinic-positioning" class="text-decoration-underline" style="color:inherit;">SS Clinic</a> clinical protocols.',
          searchData: 'menss fresh wash penile pump ring intimate lifestyle clinical hardware clinic'
        },
        {
          id: 'ssclinic',
          name: 'SS Clinic',
          type: 'Core Clinical Brand',
          category: ['clinical', 'programme'],
          tags: ['SuamiSihat®', '02-SSC', 'Direct Patient Care', 'Telehealth'],
          tagClasses: ['tag-ss', 'tag-clinic', 'tag-wellness'],
          entity: '02-SSC · SS Clinic',
          entityIcon: 'fluent:stethoscope-24-regular',
          logo: '/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.svg',
          href: '/products/ssclinic/',
          accent: 'linear-gradient(135deg, #022057, #0F4C75)',
          desc: 'Direct patient care, medical diagnostics, telehealth, and personalised treatment plans for Malaysian husbands. Governed by the core directive <em>"Kami Tak Jual Rawatan. Kami Cari Punca."</em> with centres in Subang Jaya and Kota Bharu.',
          searchData: 'ss clinic suamisihat clinic ssc doctor consultation diagnostics telehealth subang kota bharu'
        },
        {
          id: 'mensculine',
          name: 'Mensculine',
          type: 'Core SS Brand',
          category: ['lifestyle'],
          tags: ['Global Brand', 'Care Cream', 'Whitelabel FRÉSH'],
          tagClasses: ['tag-ss', 'tag-ecom', 'tag-wellness'],
          entity: '05-SSE · International',
          entityIcon: 'fluent:organization-24-regular',
          logo: '/products/Mensculine/logos/logo_mensculine_primary.svg',
          href: '/products/mensculine/',
          accent: 'linear-gradient(135deg, #1C1C1C, #038AFA)',
          desc: '<strong>International branding of SuamiSihat®</strong> for global cross-border markets. Features <strong>Mensculine Care Cream</strong> (50g aluminum tube with Physta® &amp; L-Arginine) — the whitelabel counterpart of MENSS : FRÉSH Wash.',
          searchData: 'mensculine international branding care cream fresh wash whitelabel lifestyle skincare'
        },
        {
          id: 'drmitring',
          name: 'Dr. MIT Ring®',
          type: 'Condom Accessory',
          category: ['clinical'],
          tags: ['Condom Fastener', 'Reusable', 'Designed by SuamiSihat'],
          tagClasses: ['tag-ss', 'tag-ecom', 'tag-wellness'],
          entity: '05-SSE',
          entityIcon: 'fluent:organization-24-regular',
          logo: '/products/DrMitRing/logos/logo_drmitring.svg',
          href: '/products/drmitring/',
          accent: 'linear-gradient(135deg, #1C1C1C, #6AB845)',
          desc: 'Reusable soft silicone <strong>condom fastener</strong> (alat penahan kondom) that helps keep a condom in place. Two rings per box. Designed by SuamiSihat.',
          searchData: 'dr mit ring condom fastener alat penahan kondom reusable ring accessory'
        },
        {
          id: 'rejal',
          name: 'REJAL™',
          type: 'Heritage Food',
          badgeSuffix: '(Previously Rijal)',
          category: ['superfood'],
          tags: ['Madu Tualang', 'Bawang Lanang', 'Stevia'],
          tagClasses: ['tag-ss', 'tag-wellness', 'tag-ecom'],
          entity: '05-SSE',
          entityIcon: 'fluent:organization-24-regular',
          logo: '/products/Rejal/logos/rejal-wordmark-black.svg',
          href: '/products/rejal/',
          accent: 'linear-gradient(135deg, #231F20, #4480C2)',
          desc: 'Heritage Malay food: <strong>REJAL Madu Tualang Asli</strong> (500 g / 1 kg wild Tualang honey), <strong>REJAL Bawang Lanang + Madu Tualang</strong> (mini jar, 240 g and 500 ml jar) and <strong>REJAL Stevia</strong> (10 ml). Kesihatan itu satu pelaburan.',
          searchData: 'rejal rijal madu tualang asli pahang bawang lanang honey stevia heritage food'
        },
        {
          id: 'nucaffe',
          name: 'nuCaffe®',
          type: 'Partner Brand',
          badgeSuffix: '[Limited Batch]',
          badgeSuffixClass: 'text-warning',
          category: ['superfood'],
          tags: ['While Stocks Last', 'nuCaffe Black', 'nuCaffe Latte'],
          tagClasses: ['tag-ecom', 'tag-wellness', 'tag-ss'],
          entity: '05-SSE · FMCG',
          entityIcon: 'fluent:drink-coffee-24-regular',
          logo: '/products/logo_nuCaffe.svg',
          href: '/products/nucaffe/',
          accent: 'linear-gradient(135deg, #1C1C1C, #DF2127)',
          desc: 'Functional premium Arabica &amp; Robusta coffee with <strong>Physta®</strong> Tongkat Ali extract. Available while stocks last: <strong>nuCaffe Black</strong> (Dark Roast Zero Sugar) and <strong>nuCaffe Latte</strong> (Smooth Creamy Roast).',
          searchData: 'nucaffe coffee physta tongkat ali black latte fmcg superfood'
        },
        {
          id: 'mfx',
          name: "Men's Formula X (MFX)",
          type: 'Legacy Product',
          badgeSuffix: '[Archived]',
          badgeSuffixClass: 'text-danger',
          isArchived: true,
          category: ['supplements'],
          tags: ['Archived', 'MAL23046127T', 'Legacy MFX'],
          tagClasses: ['tag-archived', 'tag-ss', 'tag-wellness'],
          entity: '01-SSH · Archived',
          entityIcon: 'fluent:history-24-regular',
          logo: "/products/logo_mensformulax.svg",
          logoStyle: 'filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3)); max-height: 55px;',
          logoTileBg: '#0559B5',
          href: null,
          hrefLabel: 'Superseded by ANDROLAB',
          accent: 'linear-gradient(135deg, #475569, #64748B)',
          cardStyle: '',
          desc: '<em>Archived.</em> An earlier SuamiSihat® capsule product, no longer sold. Replaced by the <strong>ANDROLAB</strong> range. Shown here for reference only.',
          searchData: 'mfx mens formula x tongkat ali supplement deprecated archive'
        },
        {
          id: 'xprimal',
          name: 'Xprimal',
          type: 'Deprecated',
          badgeSuffix: '[Deprecated]',
          badgeSuffixClass: 'text-danger',
          isArchived: true,
          category: ['lifestyle'],
          tags: ['Archived', 'Legacy Vitality', 'Replaced by MENSS'],
          tagClasses: ['tag-archived', 'tag-wellness', 'tag-ss'],
          entity: '01-SSH · Archived',
          entityIcon: 'fluent:history-24-regular',
          logo: '/products/logo_Xprimal.svg',
          logoStyle: 'filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15)); max-height: 55px;',
          href: '/products/menss/',
          hrefLabel: 'MENSS Hub',
          accent: 'linear-gradient(135deg, #443C91, #64748B)',
          cardStyle: '',
          desc: '<em>Archived.</em> An earlier SuamiSihat® product, no longer sold. Replaced by <strong>MENSS Care Cream</strong>. Shown here for reference only.',
          searchData: 'xprimal endurance vitality formulation deprecated archive menss'
        }
      ]
    },
    {
      id: 'section-partners',
      title: 'Partner Brands',
      desc: 'Associated healthcare clinics, NGOs, and digital consultation networks',
      icon: 'fluent:handshake-24-regular',
      iconClass: 'ps-icon-partner',
      count: '4 brands',
      products: [
        {
          id: 'husbandclinic',
          name: 'Husband Clinic',
          type: 'Partner Network',
          category: ['clinical', 'programme'],
          tags: ['Partner', 'Clinical'],
          tagClasses: ['tag-partner', 'tag-clinic'],
          entity: 'Partner Network',
          entityIcon: 'fluent:handshake-24-regular',
          logo: '/products/Partner-Brands/logos/logo_husbandclinic.svg',
          href: '/products/husbandclinic/',
          accent: 'linear-gradient(135deg, #022057, #043388)',
          desc: 'A dedicated men\'s health clinic network providing comprehensive consultations, diagnostics, and treatment — with a focus on making healthcare accessible and non-intimidating for men.',
          searchData: 'husband clinic men health clinical partner consult male doctor'
        },
        {
          id: 'isterisihat',
          name: 'Isteri Sihat',
          type: 'Partner Brand',
          category: ['lifestyle', 'programme'],
          tags: ['Partner', "Women's Health"],
          tagClasses: ['tag-partner', 'tag-women'],
          entity: 'Partner Network',
          entityIcon: 'fluent:handshake-24-regular',
          logo: '/products/Partner-Brands/logos/logo_isterisihat.svg',
          href: '/products/isterisihat/',
          accent: 'linear-gradient(135deg, #c04f88, #e895c0)',
          desc: "Women's health platform complementing the SuamiSihat® ecosystem. Isteri Sihat provides holistic healthcare resources and community support for women — completing the family health picture.",
          searchData: 'isteri sihat women health partner lifestyle wellness community family'
        },
        {
          id: 'pertabi',
          name: 'PERTABI',
          type: 'Advocacy & NGO',
          category: ['programme'],
          tags: ['Partner NGO', 'Advocacy', 'Merchandise'],
          tagClasses: ['tag-partner', 'tag-wellness', 'tag-ecom'],
          entity: 'Partner Network',
          entityIcon: 'fluent:handshake-24-regular',
          logo: '/products/Pertabi/logos/logo_pertabi_horizontal-light.svg',
          href: '/products/pertabi/',
          accent: 'linear-gradient(135deg, #1D3464, #66BED8)',
          desc: 'Persatuan Taat Bersama Isteri Malaysia (ROS: PPM-023-10-15122021). A national NGO dedicated to uplifting family institutions, educating husbands, conducting grassroots research, and fostering healthy marital leadership across Malaysia.',
          searchData: 'pertabi persatuan taat bersama isteri malaysia ngo advocacy leadership family'
        },
        {
          id: 'sifusex',
          name: 'Sifu Sex',
          type: 'Partner Brand',
          category: ['clinical', 'lifestyle'],
          tags: ['Partner', 'Sexual Health'],
          tagClasses: ['tag-partner', 'tag-clinic'],
          entity: 'Partner Network',
          entityIcon: 'fluent:handshake-24-regular',
          logo: '/products/Partner-Brands/logos/logo_sifusex.svg',
          href: null,
          accent: 'linear-gradient(135deg, #BD9A73, #CCAC8D)',
          desc: "Partner brand for men's sexual health education and clinical referrals, helping men talk about sexual health without shame.",
          searchData: 'sifu sex sexual health clinical lifestyle partner programme education'
        }
      ]
    },
    {
      id: 'section-bioactives',
      title: 'Bioactives, Ingredients & Science Partners',
      desc: 'Ingredient suppliers and research partners whose marks appear on SuamiSihat products',
      icon: 'fluent:beaker-24-regular',
      iconClass: 'ps-icon-science',
      count: '2 assets',
      products: [
        {
          id: 'biotropics',
          name: 'Biotropics Malaysia',
          type: 'Research Partner',
          category: ['supplements'],
          tags: ['Research Partner', 'Biotechnology'],
          tagClasses: ['tag-partner', 'tag-clinic'],
          entity: 'Bioactive Provenance',
          entityIcon: 'fluent:certificate-24-regular',
          logo: '/products/logo_biotropics.svg',
          logoDownload: '/products/logo_biotropics.svg',
          href: null,
          accent: 'linear-gradient(135deg, #B86900, #04A54A)',
          desc: 'Malaysian biotechnology company that produces standardised botanical extracts, including Physta®.',
          searchData: 'biotropics malaysia science botanical partner clinical biotechnology khazanah'
        },
        {
          id: 'physta',
          name: 'Physta®',
          type: 'Bioactive Science',
          badgeSuffix: '(Tongkat Ali extract)',
          category: ['supplements'],
          tags: ['Ingredient', 'Licensed mark'],
          tagClasses: ['tag-wellness', 'tag-clinic'],
          entity: 'Active Compound',
          entityIcon: 'fluent:beaker-24-regular',
          logo: '/products/logo_Physta.svg',
          logoDownload: '/products/logo_Physta.svg',
          href: null,
          accent: 'linear-gradient(135deg, #ED1C24, #231F20)',
          desc: 'Water-soluble <em>Eurycoma longifolia</em> (Tongkat Ali) extract from Biotropics Malaysia, used in nuCaffe®.',
          searchData: 'physta tongkat ali eurycoma longifolia extract ingredient biotropics nucaffe'
        }
      ]
    }
  ];

  // Brands with a guideline page take their description from static/products/<Brand>/metadata.json,
  // so the catalogue and the brand page never disagree.
  for (const s of ssSections) {
    for (const prod of s.products) {
      const slug = prod.href?.match(/^\/products\/([a-z0-9-]+)\/$/)?.[1];
      const meta = slug && getProduct(slug);
      if (meta && meta.name === prod.name) prod.desc = meta.definition.summary;
    }
  }

  // Flatten for search
  const allProducts = ssSections.flatMap(s => s.products.map(p => ({ ...p, sectionId: s.id })));

  // Reactive filtered products
  let filteredMap = $derived(() => {
    const q = searchQuery.trim().toLowerCase();
    const result = {};
    ssSections.forEach(s => {
      result[s.id] = s.products.filter(p => {
        const categoryMatch = selectedFilter === 'all' || p.category.includes(selectedFilter);
        const searchMatch = !q || (p.searchData + ' ' + p.name + ' ' + p.desc).toLowerCase().includes(q);
        const statusMatch = showArchived || !p.isArchived;
        return categoryMatch && searchMatch && statusMatch;
      });
    });
    return result;
  });

  const totalVisible = $derived(() => Object.values(filteredMap()).reduce((a, arr) => a + arr.length, 0));

  // Scroll spy for active section
  onMount(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) activeSection = e.target.id;
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('.product-section').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
</script>

<svelte:head>
  <title>Product Catalogue — SuamiSihat® Design System</title>
</svelte:head>

<div
  class="f-page-layout"
  class:sidebar-minimized={isSidebarMinimized}
  id="pageLayout"
  style="display: grid; grid-template-columns: {isSidebarMinimized ? 'minmax(0, 1fr)' : '260px minmax(0, 1fr)'}; min-height: calc(100vh - 60px); position: relative; transition: grid-template-columns 0.3s ease; width: 100%;"
>
  <!-- Sidebar Toggle Pill -->
  <button
    type="button"
    class="f-sidebar-toggle"
    onclick={toggleSidebar}
    aria-label={isSidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Left Sidebar -->
  {#if !isSidebarMinimized}
    <aside class="f-sidebar acrylic" aria-label="Product catalogue navigation" style="overflow-y: auto;">

      <!-- Group 1: Section scroll-spy anchors -->
      <div class="cat-sidebar-section">
        <p class="cat-sidebar-heading">All Products</p>
        <ul class="cat-nav">
          {#each ssSections as section}
            <li>
              <a href="#{section.id}" class:active={activeSection === section.id}>
                <span class="cat-icon"><iconify-icon icon={section.icon}></iconify-icon></span>
                {section.title.split(' ')[0]} {section.title.split(' ')[1] || ''}
                <span class="cat-count">{section.products.length}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Group 2: Brand Hubs — direct links -->
      <div class="cat-sidebar-section">
        <p class="cat-sidebar-heading">Brand Hubs</p>
        <ul class="cat-nav">
          <li><a href="/products/androlab/"><span class="cat-icon"><iconify-icon icon="fluent:pill-24-regular"></iconify-icon></span>ANDROLAB</a></li>
          <li><a href="/products/menss/"><span class="cat-icon"><iconify-icon icon="fluent:heart-pulse-24-regular"></iconify-icon></span>MENSS</a></li>
          <li><a href="/products/ssclinic/"><span class="cat-icon"><iconify-icon icon="fluent:stethoscope-24-regular"></iconify-icon></span>SS Clinic</a></li>
          <li><a href="/products/mensculine/"><span class="cat-icon"><iconify-icon icon="fluent:globe-24-regular"></iconify-icon></span>Mensculine</a></li>
          <li><a href="/products/drmitring/"><span class="cat-icon"><iconify-icon icon="fluent:stethoscope-24-regular"></iconify-icon></span>Dr. MIT Ring®</a></li>
          <li><a href="/products/rejal/"><span class="cat-icon"><iconify-icon icon="fluent:leaf-three-24-regular"></iconify-icon></span>REJAL</a></li>
          <li><a href="/products/pertabi/"><span class="cat-icon"><iconify-icon icon="fluent:people-community-24-regular"></iconify-icon></span>PERTABI</a></li>
        </ul>
      </div>

      <!-- Group 3: Category filter -->
      <div class="cat-sidebar-section">
        <p class="cat-sidebar-heading">By Category</p>
        <ul class="cat-nav">
          {#each [
            { id: 'all',         label: 'All Products',        icon: 'fluent:apps-24-regular' },
            { id: 'supplements', label: 'Supplements',          icon: 'fluent:pill-24-regular' },
            { id: 'clinical',    label: 'Clinical & Devices',   icon: 'fluent:stethoscope-24-regular' },
            { id: 'lifestyle',   label: 'Lifestyle & Grooming', icon: 'fluent:heart-pulse-24-regular' },
            { id: 'superfood',   label: 'Superfoods & Teas',    icon: 'fluent:leaf-three-24-regular' },
            { id: 'programme',   label: "Advocacy & NGOs",      icon: 'fluent:people-community-24-regular' }
          ] as cat}
            <li>
              <button
                type="button"
                class="cat-nav-btn"
                class:active={selectedFilter === cat.id}
                onclick={() => { selectedFilter = cat.id; }}
              >
                <span class="cat-icon"><iconify-icon icon={cat.icon}></iconify-icon></span>
                {cat.label}
              </button>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Group 4: Navigate -->
      <div class="cat-sidebar-section">
        <p class="cat-sidebar-heading">Navigate</p>
        <ul class="cat-nav">
          <li><a href="/"><span class="cat-icon"><iconify-icon icon="fluent:home-24-regular"></iconify-icon></span>Home</a></li>
          <li><a href="/brand-system/"><span class="cat-icon"><iconify-icon icon="fluent:color-24-regular"></iconify-icon></span>Brand</a></li>
          <li><a href="/brand-guidelines/"><span class="cat-icon"><iconify-icon icon="fluent:book-open-24-regular"></iconify-icon></span>Guides</a></li>
        </ul>
      </div>
    </aside>
  {/if}

  <!-- Main Content -->
  <main class="cat-main f-main-content" id="main-content">
    <!-- Breadcrumb & Header -->
    <div style="margin-bottom: 2rem;">
      <nav class="brand-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
        <span style="color:var(--color-neutral-fg-1);font-weight:600;">Product Brands</span>
      </nav>
      <div class="cat-page-header">
        <div>
          <h1 class="cat-page-title">Product Catalogue</h1>
          <p class="cat-page-subtitle">All SuamiSihat® brands, medical devices, superfoods and partner lines in one place.</p>
        </div>
        <div class="cat-search-wrap">
          <iconify-icon icon="fluent:search-24-regular" class="cat-search-icon" aria-hidden="true"></iconify-icon>
          <input
            type="search"
            class="cat-search"
            placeholder="Search products or ingredients…"
            aria-label="Search products"
            bind:value={searchQuery}
          />
        </div>
      </div>

      <!-- Quick Interactive Category Chips Bar -->
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3 pt-2" style="border-top:1px solid var(--color-neutral-stroke-1);">
        <div class="d-flex flex-wrap gap-2">
          {#each [
            { id: 'all',         label: 'All Products',        icon: 'fluent:apps-24-regular' },
            { id: 'supplements', label: 'Supplements',          icon: 'fluent:pill-24-regular' },
            { id: 'clinical',    label: 'Clinical & Devices',   icon: 'fluent:stethoscope-24-regular' },
            { id: 'lifestyle',   label: 'Lifestyle & Grooming', icon: 'fluent:heart-pulse-24-regular' },
            { id: 'superfood',   label: 'Superfoods & Teas',    icon: 'fluent:leaf-three-24-regular' },
            { id: 'programme',   label: "Advocacy & NGOs",      icon: 'fluent:people-community-24-regular' }
          ] as cat}
            <button
              type="button"
              class="btn btn-sm d-inline-flex align-items-center gap-1 rounded-pill px-3"
              class:btn-primary={selectedFilter === cat.id}
              class:btn-outline-secondary={selectedFilter !== cat.id}
              onclick={() => { selectedFilter = cat.id; }}
              style="font-size:0.775rem; font-weight:600;"
            >
              <iconify-icon icon={cat.icon} style="font-size:0.9rem;"></iconify-icon>
              {cat.label}
            </button>
          {/each}
        </div>
        <label class="d-inline-flex align-items-center gap-2" style="font-size:0.8rem; font-weight:600; cursor:pointer;">
          <input type="checkbox" bind:checked={showArchived} />
          Show archived products
        </label>
        <span class="ss-badge ss-badge-neutral" style="font-size:0.75rem; font-weight:600;">
          Showing {totalVisible()} {totalVisible() === 1 ? 'entry' : 'entries'}
        </span>
      </div>
    </div>

    <!-- No results -->
    {#if totalVisible() === 0}
      <div class="no-results visible" aria-live="polite">
        <iconify-icon icon="fluent:search-24-regular" style="font-size:2rem;margin-bottom:0.75rem;display:block;"></iconify-icon>
        No products match your search or filter.
      </div>
    {/if}

    <!-- Sections -->
    {#each ssSections as section}
      {#if (filteredMap()[section.id] ?? []).length > 0}
        <section class="product-section" id={section.id}>
          <!-- Section Header -->
          <div class="product-section-header">
            <div class="product-section-icon {section.iconClass}">
              <iconify-icon icon={section.icon} aria-hidden="true"></iconify-icon>
            </div>
            <div>
              <h2 class="product-section-title">{section.title}</h2>
              <p class="product-section-desc">{section.desc}</p>
            </div>
            <span class="product-section-count">{(filteredMap()[section.id] ?? []).length} {section.id === 'section-bioactives' ? 'assets' : section.id === 'section-partners' ? 'brands' : 'brand lines'}</span>
          </div>

          <!-- Product Grid -->
          <div class="product-grid">
            {#each filteredMap()[section.id] as product}
              <article
                class="product-card"
                style="--card-accent: {product.accent}; {product.cardStyle ?? ''}"
              >
                <!-- Logo Tile -->
                <div
                  class="product-logo-area"
                  style={product.logoTileBg ? `background: ${product.logoTileBg} !important; position: relative;` : 'position: relative;'}
                >
                  <img
                    src={product.logo}
                    alt="{product.name} logo"
                    loading="lazy"
                    style={product.logoStyle ?? ''}
                    onerror={(e) => { e.currentTarget.src = '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg'; }}
                  />
                  {#if product.isArchived}
                    <span class="archived-badge">Archived</span>
                  {/if}
                </div>

                <!-- Info -->
                <div style="font-size:0.72rem;font-weight:700;color:var(--color-brand-primary);text-transform:uppercase;margin-bottom:2px;">{product.type}</div>
                <h3 class="product-name">
                  {product.name}
                  {#if product.badgeSuffix}
                    <small class="product-name-badge {product.badgeSuffixClass ?? ''}">{product.badgeSuffix}</small>
                  {/if}
                </h3>
                <p class="product-desc">{@html product.desc}</p>

                <!-- Tags -->
                <div class="product-tags">
                  {#each product.tags as tag, i}
                    <span class="product-tag {product.tagClasses?.[i] ?? ''}">{tag}</span>
                  {/each}
                </div>

                <!-- Footer Actions -->
                <div class="product-actions">
                  <span class="product-subbrand">
                    <iconify-icon icon={product.entityIcon} class="me-1"></iconify-icon>
                    {plainEntity(product.entity)}
                  </span>
                  {#if product.logoDownload}
                    <a href={product.logoDownload} download class="product-assets-btn" aria-label="Vector (.SVG): download {product.name} logo">
                      Vector (.SVG) <iconify-icon icon="fluent:arrow-download-24-regular" class="ms-1" aria-hidden="true"></iconify-icon>
                    </a>
                  {:else if product.href}
                    <a href={product.href} class="product-assets-btn" aria-label="{product.hrefLabel ?? 'Open brand page'}: {product.name}">
                      {product.hrefLabel ?? 'Open brand page'} <iconify-icon icon="fluent:chevron-right-24-regular" class="ms-1" aria-hidden="true"></iconify-icon>
                    </a>
                  {:else if product.hrefLabel}
                    <span style="font-size:0.75rem;font-weight:500;color:var(--color-neutral-fg-3);">{product.hrefLabel}</span>
                  {/if}
                </div>
              </article>
            {/each}
          </div>
        </section>
      {/if}
    {/each}
  </main>
</div>

<style>
  /* ── Layout ─────────────────────────────────── */
  .cat-main {
    padding: var(--f-space-8, 2rem) clamp(1.5rem, 4vw, 4rem);
    min-width: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  /* ── Page Header ──────────────────────────── */
  .cat-page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .cat-page-title {
    font-size: 2.25rem;
    font-weight: 600;
    color: var(--color-neutral-fg-1);
    margin: 0 0 4px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  .cat-page-subtitle {
    font-size: 0.95rem;
    color: var(--color-neutral-fg-2);
    margin: 0;
  }

  /* ── Search ────────────────────────────────── */
  .cat-search-wrap {
    position: relative;
    min-width: 280px;
  }
  .cat-search {
    width: 100%;
    padding: 8px 14px 8px 36px;
    border-radius: var(--f-radius-md, 8px);
    border: 1px solid var(--color-neutral-stroke-1);
    background: var(--color-neutral-bg-2);
    color: var(--color-neutral-fg-1);
    font-size: 0.875rem;
    font-family: inherit;
    transition: all 0.15s ease;
    outline: none;
  }
  .cat-search:focus {
    border-color: var(--color-focus-ring, #21A1F7);
    box-shadow: 0 0 0 2px rgba(33,161,247,0.2);
  }
  .cat-search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-neutral-fg-2);
    font-size: 0.9rem;
    pointer-events: none;
  }

  /* ── Sidebar ──────────────────────────────── */
  .cat-sidebar-section {
    padding: 0 var(--f-space-4, 1rem) var(--f-space-4, 1rem);
    margin-top: var(--f-space-4, 1rem);
  }
  .cat-sidebar-heading {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-neutral-fg-3);
    margin-bottom: 6px;
    padding: 0 4px;
  }
  .cat-nav { list-style: none; padding: 0; margin: 0; }
  .cat-nav li { margin-bottom: 2px; }
  .cat-nav a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: var(--f-radius-md, 8px);
    font-size: 0.8375rem;
    font-weight: 500;
    color: var(--color-neutral-fg-2);
    text-decoration: none;
    transition: all 0.12s ease;
  }
  .cat-nav a:hover {
    background: var(--color-neutral-bg-3, #f1f5f9);
    color: var(--color-neutral-fg-1);
  }
  .cat-nav a.active {
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    color: var(--color-brand-primary, #043388);
    font-weight: 600;
  }
  /* Button variant of cat-nav link (used for category filter) */
  .cat-nav-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 6px 10px;
    border-radius: var(--f-radius-md, 8px);
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.8375rem;
    font-weight: 500;
    color: var(--color-neutral-fg-2);
    text-align: left;
    transition: all 0.12s ease;
    font-family: inherit;
  }
  .cat-nav-btn:hover { background: var(--color-neutral-bg-3, #f1f5f9); color: var(--color-neutral-fg-1); }
  .cat-nav-btn.active { background: var(--color-brand-subtle, rgba(4,51,136,0.06)); color: var(--color-brand-primary, #043388); font-weight: 600; }
  :global([data-theme="dark"]) .cat-nav-btn { color: #94A3B8; }
  :global([data-theme="dark"]) .cat-nav-btn:hover { background: rgba(255,255,255,0.05); color: #F8FAFC; }
  :global([data-theme="dark"]) .cat-nav-btn.active { background: rgba(33,161,247,0.1); color: var(--color-text-accent); }
  :global([data-theme="dark"]) .cat-nav a { color: #94A3B8; }
  :global([data-theme="dark"]) .cat-nav a:hover { background: rgba(255,255,255,0.05); color: #F8FAFC; }
  :global([data-theme="dark"]) .cat-nav a.active { background: rgba(33,161,247,0.1); color: var(--color-text-accent); }
  .cat-icon { display: flex; align-items: center; font-size: 1rem; flex-shrink: 0; }
  .cat-count { margin-left: auto; font-size: 0.7rem; background: var(--color-brand-subtle); color: var(--color-brand-primary); padding: 2px 8px; border-radius: 999px; font-weight: 600; }

  /* ── Section Header ──────────────────────── */
  .product-section { margin-bottom: 3rem; }
  .product-section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: var(--f-space-5, 1.25rem);
    padding-bottom: var(--f-space-3, 0.75rem);
    border-bottom: 1px solid var(--color-neutral-stroke-1);
  }
  .product-section-icon {
    width: 40px; height: 40px;
    border-radius: var(--f-radius-lg, 12px);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.95rem; flex-shrink: 0;
  }
  .ps-icon-ss      { background: var(--color-brand-subtle); color: var(--color-brand-primary); }
  .ps-icon-partner { background: rgba(189,154,115,0.12); color: var(--color-text-warm); }
  .ps-icon-science { background: rgba(10,137,250,0.12); color: #0A89FA; }
  .product-section-title { font-size: 1.35rem; font-weight: 600; color: var(--color-neutral-fg-1); margin: 0; }
  .product-section-desc  { font-size: 0.85rem; color: var(--color-neutral-fg-2); margin: 0; }
  .product-section-count { margin-left: auto; font-size: 0.75rem; font-weight: 600; color: var(--color-neutral-fg-3); flex-shrink: 0; }

  /* ── Product Grid ────────────────────────── */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--f-space-5, 1.25rem);
  }

  /* ── Product Card ────────────────────────── */
  .product-card {
    background: var(--color-neutral-bg-2);
    border: 1px solid var(--color-neutral-stroke-1);
    border-radius: var(--f-radius-xl, 16px);
    padding: var(--f-space-5, 1.25rem);
    display: flex; flex-direction: column; gap: var(--f-space-3, 0.75rem);
    box-shadow: var(--f-shadow-2);
    transition: box-shadow 0.25s ease, border-color 0.15s ease;
    position: relative; overflow: hidden;
  }
  .product-card:hover {
    box-shadow: var(--f-shadow-brand-md, 0 8px 24px rgba(4,51,136,0.12));
    border-color: var(--color-brand-subtle-hover, rgba(4,51,136,0.2));
  }

  /* Logo tile — always white for maximum contrast */
  .product-logo-area {
    display: flex; align-items: center; justify-content: center;
    height: 96px;
    border-radius: var(--f-radius-lg, 12px);
    padding: 12px 20px;
    background: #FFFFFF !important;
    border: 1px solid rgba(0,0,0,0.08) !important;
    box-shadow: var(--f-shadow-2);
    transition: all 0.15s ease;
    overflow: hidden;
  }
  :global([data-theme="dark"]) .product-logo-area {
    background: #FFFFFF !important;
    border-color: rgba(255,255,255,0.2) !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.4);
  }
  .product-logo-area img {
    max-height: 54px; max-width: 100%; object-fit: contain;
    transition: transform 0.25s ease;
  }
  .product-card:hover .product-logo-area img { transform: scale(1.05); }

  /* Archived badge overlay */
  .archived-badge {
    position: absolute; top: 6px; right: 8px;
    font-size: 0.65rem; background: #B91C1C; color: #fff;
    padding: 2px 6px; border-radius: 4px; font-weight: 700; text-transform: uppercase;
  }

  /* Product info */
  .product-name {
    font-size: 1.1rem; font-weight: 600;
    color: var(--color-neutral-fg-1); margin: 0;
    letter-spacing: -0.01em;
  }
  .product-name-badge {
    font-size: 0.72rem; font-weight: 500;
    color: var(--color-neutral-fg-2); margin-left: 4px;
  }
  .product-name-badge.text-danger { color: #e11d48; font-weight: 600; }
  .product-name-badge.text-warning { color: #b45309; font-weight: 600; }
  .product-desc {
    font-size: 0.85rem; line-height: 1.55;
    color: var(--color-neutral-fg-2); margin: 0; flex: 1;
  }

  /* Tags */
  .product-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
  .product-tag {
    display: inline-flex; align-items: center;
    font-size: 0.68rem; font-weight: 600;
    padding: 2px 8px; border-radius: 999px;
    letter-spacing: 0.03em; text-transform: uppercase;
    border: 1px solid var(--color-neutral-stroke-1);
  }
  .tag-ss       { background: var(--color-brand-subtle); color: var(--color-brand-primary); }
  .tag-wellness { background: rgba(33,161,247,0.1); color: var(--color-text-accent); }
  .tag-clinic   { background: var(--color-brand-subtle); color: var(--color-brand-primary); }
  .tag-ecom     { background: rgba(189,154,115,0.12); color: var(--color-text-warm); }
  .tag-partner  { background: rgba(189,154,115,0.12); color: var(--color-text-warm); }
  .tag-women    { background: rgba(220,100,150,0.1); color: #BE185D; }
  .tag-archived { background: rgba(225,29,72,0.1); color: var(--color-error-fg); border-color: rgba(225,29,72,0.3); }
  :global([data-theme="dark"]) .tag-women { background: rgba(220,100,150,0.15); color: #F0A5C8; }

  /* Footer actions */
  .product-actions {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid var(--color-neutral-stroke-1);
  }
  .product-subbrand { font-size: 0.72rem; color: var(--color-neutral-fg-2); font-weight: 500; }
  .product-assets-btn {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 0.75rem; font-weight: 600;
    padding: 4px 10px; border-radius: var(--f-radius-md, 8px);
    background: var(--color-brand-subtle); color: var(--color-brand-primary);
    text-decoration: none; border: 1px solid var(--color-neutral-stroke-1);
    transition: all 0.15s ease;
  }
  .product-assets-btn:hover {
    background: var(--color-action-bg); color: var(--color-on-action); border-color: transparent;
  }

  /* No results */
  .no-results {
    text-align: center; padding: 3rem;
    color: var(--color-neutral-fg-2);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .cat-main { padding: 1.25rem 1rem; }
    .product-grid { grid-template-columns: 1fr; }
    .cat-page-header { flex-direction: column; }
    .cat-search-wrap { width: 100%; }
  }
</style>
