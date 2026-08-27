<script>
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';

  let { data } = $props();
  const product = $derived(data.product);
  const slug = $derived(data.slug);

  let renderedContent = $state('');
  let isSidebarMinimized = $state(false);
  let activeSection = $state('section-history');

  const portfolioLinks = [
    { slug: 'androlab',    label: 'ANDROLAB',     icon: 'fluent:pill-24-regular' },
    { slug: 'menss',       label: 'MENSS',         icon: 'fluent:heart-pulse-24-regular' },
    { slug: 'mensculine',  label: 'Mensculine',    icon: 'fluent:globe-24-regular' },
    { slug: 'drmitring',   label: 'Dr Mit Ring®',  icon: 'fluent:stethoscope-24-regular' },
    { slug: 'rejal',       label: 'REJAL',         icon: 'fluent:leaf-three-24-regular' },
    { slug: 'pertabi',     label: 'PERTABI',       icon: 'fluent:people-community-24-regular' }
  ];

  onMount(async () => {
    // Scroll spy
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) activeSection = e.target.id;
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('[data-section]').forEach(el => obs.observe(el));

    // Render markdown content if present
    if (data.content && typeof window !== 'undefined' && window.marked) {
      window.marked.setOptions({ gfm: true, breaks: false });
      renderedContent = window.marked.parse(data.content);
      await tick();
      // Render mermaid if any
      if (window.mermaid) {
        try {
          window.mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
          const el = document.getElementById('brand-md-content');
          if (el) {
            el.querySelectorAll('pre code.language-mermaid').forEach(block => {
              const div = document.createElement('div');
              div.className = 'mermaid';
              div.textContent = block.textContent;
              block.closest('pre').replaceWith(div);
            });
            await window.mermaid.run({ nodes: el.querySelectorAll('.mermaid') });
          }
        } catch {}
      }
    }

    return () => obs.disconnect();
  });
</script>

<svelte:head>
  {#if product}
    <title>{product.name} Brand Hub — SuamiSihat™ Design System</title>
    <meta name="description" content="SuamiSihat™ Design System — {product.name}: {product.tagline}" />
  {:else}
    <title>Brand Not Found — SuamiSihat™ Design System</title>
  {/if}
</svelte:head>

<!-- ─── 404 State ──────────────────────────────────────────────── -->
{#if !product}
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:1rem;text-align:center;padding:3rem;">
    <iconify-icon icon="fluent:cube-dismiss-24-regular" style="font-size:3rem;color:var(--color-neutral-fg-3);"></iconify-icon>
    <h1 style="font-size:2rem;font-weight:700;color:var(--color-neutral-fg-1);">Brand Not Found</h1>
    <p style="color:var(--color-neutral-fg-2);">The product brand hub "<code>{slug}</code>" does not exist in this Design System.</p>
    <a href="/products/" class="btn btn-primary">← Back to Product Catalogue</a>
  </div>
{:else}

<!-- ─── Full-Width Hero ────────────────────────────────────────── -->
<div
  class="brand-master-hero"
  style="background: linear-gradient(135deg, {product.hero.from} 0%, {product.hero.mid} 60%, {product.hero.to} 100%);"
>
  <div class="brand-hero-inner">
    <nav class="brand-breadcrumb brand-breadcrumb--light" aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a>
      <iconify-icon icon="fluent:chevron-right-12-regular" style="color:rgba(255,255,255,0.5);"></iconify-icon>
      <a href="/products/" style="color:rgba(255,255,255,0.7);">Products</a>
      <iconify-icon icon="fluent:chevron-right-12-regular" style="color:rgba(255,255,255,0.5);"></iconify-icon>
      <span style="color:#fff;font-weight:600;">{product.name}</span>
    </nav>

    <div class="brand-hero-content">
      <div class="brand-hero-logo-wrap">
        <img src={product.logoLight} alt="{product.name} logo" class="brand-hero-logo" loading="eager" />
      </div>
      <div class="brand-hero-text">
        <div class="brand-hero-type">{product.type} · {product.entity}</div>
        <h1 class="brand-hero-title">{product.name}</h1>
        <p class="brand-hero-tagline">{product.tagline}</p>
        <div class="brand-hero-actions">
          <a href="#section-assets" class="btn-brand-hero-primary">
            <iconify-icon icon="fluent:color-24-regular"></iconify-icon>
            Brand Assets
          </a>
          <a href="#section-products" class="btn-brand-hero-outline">
            <iconify-icon icon="fluent:box-multiple-24-regular"></iconify-icon>
            Sub-Products
          </a>
          <a href="/products/" class="btn-brand-hero-outline">
            <iconify-icon icon="fluent:grid-24-regular"></iconify-icon>
            All Brands
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ─── Sticky Sub-nav ─────────────────────────────────────────── -->
<nav class="sub-nav-sticky" aria-label="Brand page sections">
  <div class="sub-nav-inner">
    <ul class="sub-nav-links">
      <li><a href="#section-history"  class:active={activeSection === 'section-history'}>1. Brand History</a></li>
      <li><a href="#section-assets"   class:active={activeSection === 'section-assets'}>2. Assets & Guidelines</a></li>
      <li><a href="#section-products" class:active={activeSection === 'section-products'}>3. Sub-Products</a></li>
      <li><a href="#section-synergy"  class:active={activeSection === 'section-synergy'}>4. Synergy & Bundles</a></li>
      <li><a href="#section-cta"      class:active={activeSection === 'section-cta'}>5. Downloads & Shop</a></li>
    </ul>
  </div>
</nav>

<!-- ─── Page Layout with Sidebar ──────────────────────────────── -->
<div
  class="f-page-layout"
  style="display: grid; grid-template-columns: {isSidebarMinimized ? '0 1fr' : '260px 1fr'}; min-height: 60vh; position: relative; transition: grid-template-columns 0.3s ease;"
>
  <!-- Sidebar Toggle Pill -->
  <button
    class="f-sidebar-toggle"
    onclick={() => isSidebarMinimized = !isSidebarMinimized}
    aria-label="Toggle sidebar"
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 50vh; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Left Sidebar -->
  <aside class="f-sidebar acrylic" aria-label="Brand navigation" style="display: {isSidebarMinimized ? 'none' : 'block'}; overflow-y: auto;">
    <!-- Brand Navigation -->
    <div class="cat-sidebar-section">
      <p class="cat-sidebar-heading">Brand Navigation</p>
      <ul class="cat-nav">
        <li><a href="#section-history"  class:active={activeSection === 'section-history'}><span class="cat-icon"><iconify-icon icon="fluent:book-compass-24-regular"></iconify-icon></span>1. Brand History</a></li>
        <li><a href="#section-assets"   class:active={activeSection === 'section-assets'}><span class="cat-icon"><iconify-icon icon="fluent:color-24-regular"></iconify-icon></span>2. Assets & Guidelines</a></li>
        <li><a href="#section-products" class:active={activeSection === 'section-products'}><span class="cat-icon"><iconify-icon icon="fluent:box-multiple-24-regular"></iconify-icon></span>3. Sub-Products</a></li>
        <li><a href="#section-synergy"  class:active={activeSection === 'section-synergy'}><span class="cat-icon"><iconify-icon icon="fluent:apps-list-detail-24-regular"></iconify-icon></span>4. Synergy & Bundles</a></li>
        <li><a href="#section-cta"      class:active={activeSection === 'section-cta'}><span class="cat-icon"><iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon></span>5. Downloads & Shop</a></li>
      </ul>
    </div>

    <!-- Brand Portfolio -->
    <div class="cat-sidebar-section">
      <p class="cat-sidebar-heading">Brand Portfolio</p>
      <ul class="cat-nav">
        {#each portfolioLinks as link}
          <li>
            <a href="/products/{link.slug}/" class:active={slug === link.slug}>
              <span class="cat-icon"><iconify-icon icon={link.icon}></iconify-icon></span>
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Navigate -->
    <div class="cat-sidebar-section">
      <p class="cat-sidebar-heading">Navigate</p>
      <ul class="cat-nav">
        <li><a href="/products/"><span class="cat-icon"><iconify-icon icon="fluent:grid-24-regular"></iconify-icon></span>Products Catalogue</a></li>
        <li><a href="/brand-system/"><span class="cat-icon"><iconify-icon icon="fluent:color-line-24-regular"></iconify-icon></span>Brand System</a></li>
        <li><a href="/brand-guidelines/"><span class="cat-icon"><iconify-icon icon="fluent:book-open-24-regular"></iconify-icon></span>Guidelines PDF</a></li>
        <li><a href="/"><span class="cat-icon"><iconify-icon icon="fluent:home-24-regular"></iconify-icon></span>Home</a></li>
      </ul>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="brand-hub-main" id="main-content">

    <!-- ── Section 1: Brand History / Markdown Content ─────────── -->
    <section id="section-history" data-section class="brand-section">
      <div class="brand-section-header">
        <div class="brand-section-icon" style="background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">
          <iconify-icon icon="fluent:book-compass-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 class="brand-section-title">Brand History & Context</h2>
          <p class="brand-section-desc">Origin story, positioning, and market context for {product.name}</p>
        </div>
      </div>

      {#if renderedContent}
        <!-- Full markdown content from /content/products/[slug].md -->
        <div id="brand-md-content" class="markdown-body brand-section-card">
          {@html renderedContent}
        </div>
      {:else}
        <!-- Fallback when no markdown file exists yet -->
        <div class="brand-section-card brand-placeholder">
          <iconify-icon icon="fluent:document-add-24-regular" style="font-size:2rem;color:var(--color-neutral-fg-3);display:block;margin-bottom:0.75rem;"></iconify-icon>
          <p style="color:var(--color-neutral-fg-2);margin:0;">
            Brand narrative content for <strong>{product.name}</strong> is coming soon.
            Create <code>/content/products/{slug}.md</code> to add brand history, positioning, and documentation here.
          </p>
        </div>
      {/if}
    </section>

    <!-- ── Section 2: Assets & Guidelines ─────────────────────── -->
    <section id="section-assets" data-section class="brand-section">
      <div class="brand-section-header">
        <div class="brand-section-icon" style="background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">
          <iconify-icon icon="fluent:color-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 class="brand-section-title">Assets & Guidelines</h2>
          <p class="brand-section-desc">Logo variants, color tokens, and usage rules</p>
        </div>
      </div>

      <div class="brand-section-card">
        <!-- Logo tile -->
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem;">
          <div class="logo-preview-tile logo-tile-white">
            <img src={product.logoLight} alt="{product.name} logo on white" style="max-height:60px;max-width:100%;object-fit:contain;" />
            <span class="logo-tile-label">Light Background</span>
          </div>
          <div class="logo-preview-tile logo-tile-dark" style="background: {product.hero.from};">
            <img src={product.logoDark} alt="{product.name} logo on dark" style="max-height:60px;max-width:100%;object-fit:contain;" />
            <span class="logo-tile-label" style="color:rgba(255,255,255,0.7);">Dark Background</span>
          </div>
        </div>

        <!-- Color accent swatch -->
        <div style="margin-bottom:1rem;">
          <p style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-fg-3);margin-bottom:0.5rem;">Brand Accent</p>
          <div class="token-swatch" style="background: {product.accent}; max-width: 280px;">
            <span style="font-size:0.85rem;font-weight:600;">{product.name} Accent</span>
            <code style="font-size:0.75rem;opacity:0.85;">{product.accent}</code>
          </div>
        </div>

        <!-- Download logo button -->
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <a href={product.logoLight} download class="product-assets-btn">
            <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon>
            Download Logo SVG
          </a>
          <a href="/products/" class="btn-outline-small">
            <iconify-icon icon="fluent:arrow-left-16-regular"></iconify-icon>
            Back to Catalogue
          </a>
        </div>
      </div>
    </section>

    <!-- ── Section 3: Sub-Products ─────────────────────────────── -->
    {#if product.subProducts?.length > 0}
      <section id="section-products" data-section class="brand-section">
        <div class="brand-section-header">
          <div class="brand-section-icon" style="background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">
            <iconify-icon icon="fluent:box-multiple-24-regular"></iconify-icon>
          </div>
          <div>
            <h2 class="brand-section-title">Sub-Products & SKUs</h2>
            <p class="brand-section-desc">{product.subProducts.length} product line{product.subProducts.length > 1 ? 's' : ''} under {product.name}</p>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:1rem;">
          {#each product.subProducts as sub}
            <article class="product-spec-article">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:0.5rem;">
                <h3 style="font-size:1.1rem;font-weight:600;color:var(--color-neutral-fg-1);margin:0;">{sub.name}</h3>
                <span style="font-size:0.7rem;font-weight:700;padding:3px 10px;border-radius:999px;background:var(--color-brand-subtle);color:var(--color-brand-primary);white-space:nowrap;flex-shrink:0;">{sub.type}</span>
              </div>
              <p style="font-size:0.875rem;color:var(--color-neutral-fg-2);line-height:1.6;margin:0;">{sub.desc}</p>
            </article>
          {/each}
        </div>
      </section>
    {:else}
      <section id="section-products" data-section class="brand-section">
        <div class="brand-section-header">
          <div class="brand-section-icon" style="background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">
            <iconify-icon icon="fluent:box-multiple-24-regular"></iconify-icon>
          </div>
          <div>
            <h2 class="brand-section-title">Sub-Products & SKUs</h2>
            <p class="brand-section-desc">Product lines under {product.name}</p>
          </div>
        </div>
        <div class="brand-section-card brand-placeholder">
          <p style="color:var(--color-neutral-fg-2);margin:0;">Sub-product details for <strong>{product.name}</strong> will be listed here.</p>
        </div>
      </section>
    {/if}

    <!-- ── Section 4: Synergy & Bundles ───────────────────────── -->
    <section id="section-synergy" data-section class="brand-section">
      <div class="brand-section-header">
        <div class="brand-section-icon" style="background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">
          <iconify-icon icon="fluent:apps-list-detail-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 class="brand-section-title">Synergy & Bundles</h2>
          <p class="brand-section-desc">Cross-brand collaborations, bundle strategies, and ecosystem synergies</p>
        </div>
      </div>
      <div class="brand-section-card brand-placeholder">
        <p style="color:var(--color-neutral-fg-2);margin:0;">Bundle documentation for <strong>{product.name}</strong> will appear here. See <a href="/brand-system/">Brand System</a> for ecosystem positioning.</p>
      </div>
    </section>

    <!-- ── Section 5: Downloads & Shop ────────────────────────── -->
    <section id="section-cta" data-section class="brand-section">
      <div class="brand-section-header">
        <div class="brand-section-icon" style="background: rgba(4,51,136,0.08); color: var(--color-brand-primary);">
          <iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 class="brand-section-title">Downloads & Shop</h2>
          <p class="brand-section-desc">Brand asset downloads and official purchase channels</p>
        </div>
      </div>
      <div class="brand-section-card">
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <a href={product.logoLight} download class="product-assets-btn">
            <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon>
            Logo SVG (Light)
          </a>
          <a href={product.logoDark} download class="product-assets-btn">
            <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon>
            Logo SVG (Dark)
          </a>
          <a href="https://suamisihat.com.my" target="_blank" rel="noopener noreferrer" class="product-assets-btn" style="background: var(--color-brand-primary); color:#fff; border-color: transparent;">
            <iconify-icon icon="fluent:open-24-regular"></iconify-icon>
            Shop at SuamiSihat.com.my ↗
          </a>
        </div>
      </div>
    </section>

  </main>
</div>

{/if}

<style>
  /* ── Hero ──────────────────────────────────── */
  .brand-master-hero {
    padding: 4.5rem 0 3.5rem;
    color: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .brand-master-hero::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 85% 20%, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .brand-hero-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
    position: relative;
    z-index: 1;
  }
  .brand-hero-content {
    display: flex;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }
  .brand-hero-logo-wrap {
    width: 180px; height: 120px;
    background: #ffffff;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }
  .brand-hero-logo { max-height: 72px; max-width: 100%; object-fit: contain; }
  .brand-hero-type { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7; margin-bottom: 6px; }
  .brand-hero-title { font-size: 3rem; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.02em; }
  .brand-hero-tagline { font-size: 1.1rem; opacity: 0.85; margin: 0 0 1.5rem; }
  .brand-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .btn-brand-hero-primary {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.2); color: #fff;
    border: 1px solid rgba(255,255,255,0.35);
    backdrop-filter: blur(8px);
    padding: 8px 18px; border-radius: 8px;
    font-weight: 600; font-size: 0.875rem;
    text-decoration: none; transition: background 0.2s;
  }
  .btn-brand-hero-primary:hover { background: rgba(255,255,255,0.3); color: #fff; }
  .btn-brand-hero-outline {
    display: inline-flex; align-items: center; gap: 6px;
    background: transparent; color: rgba(255,255,255,0.85);
    border: 1px solid rgba(255,255,255,0.25);
    padding: 7px 16px; border-radius: 8px;
    font-weight: 600; font-size: 0.875rem;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-brand-hero-outline:hover { background: rgba(255,255,255,0.1); color: #fff; }

  /* ── Sticky sub-nav ───────────────────────── */
  .sub-nav-sticky {
    position: sticky;
    top: 60px;
    z-index: 100;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-neutral-stroke-2, rgba(0,0,0,0.08));
    padding: 0.75rem 0;
  }
  :global([data-theme="dark"]) .sub-nav-sticky {
    background: rgba(7,13,24,0.92);
    border-bottom-color: rgba(255,255,255,0.08);
  }
  .sub-nav-inner { max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
  .sub-nav-links { display: flex; gap: 1.5rem; list-style: none; padding: 0; margin: 0; overflow-x: auto; white-space: nowrap; }
  .sub-nav-links a { font-size: 0.8125rem; font-weight: 600; color: var(--color-neutral-fg-2); text-decoration: none; padding: 4px 0; transition: color 0.15s ease; border-bottom: 2px solid transparent; }
  .sub-nav-links a:hover, .sub-nav-links a.active { color: var(--color-brand-primary, #043388); border-bottom-color: var(--color-brand-primary, #043388); }

  /* ── Main layout ──────────────────────────── */
  .brand-hub-main {
    padding: 2.5rem 3rem;
    min-width: 0;
    width: 100%;
  }
  @media (max-width: 768px) { .brand-hub-main { padding: 1.5rem 1.25rem; } }

  /* ── Sidebar styles ───────────────────────── */
  .cat-sidebar-section { padding: 0 1rem 1rem; margin-top: 1rem; }
  .cat-sidebar-heading { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3); margin-bottom: 6px; padding: 0 4px; }
  .cat-nav { list-style: none; padding: 0; margin: 0; }
  .cat-nav li { margin-bottom: 2px; }
  .cat-nav a { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; font-size: 0.8375rem; font-weight: 500; color: var(--color-neutral-fg-2); text-decoration: none; transition: all 0.12s ease; }
  .cat-nav a:hover { background: var(--color-neutral-bg-3, #f1f5f9); color: var(--color-neutral-fg-1); }
  .cat-nav a.active { background: var(--color-brand-subtle, rgba(4,51,136,0.06)); color: var(--color-brand-primary, #043388); font-weight: 600; }
  :global([data-theme="dark"]) .cat-nav a { color: #94A3B8; }
  :global([data-theme="dark"]) .cat-nav a:hover { background: rgba(255,255,255,0.05); color: #F8FAFC; }
  :global([data-theme="dark"]) .cat-nav a.active { background: rgba(33,161,247,0.1); color: #21A1F7; }
  .cat-icon { display: flex; align-items: center; font-size: 1rem; flex-shrink: 0; }

  /* ── Sections ─────────────────────────────── */
  .brand-section { margin-bottom: 2.5rem; }
  .brand-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-neutral-stroke-1); }
  .brand-section-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
  .brand-section-title { font-size: 1.35rem; font-weight: 600; color: var(--color-neutral-fg-1); margin: 0; }
  .brand-section-desc { font-size: 0.85rem; color: var(--color-neutral-fg-2); margin: 0; }
  .brand-section-card { background: var(--color-neutral-bg-1, #ffffff); border: 1px solid var(--color-neutral-stroke-2, rgba(0,0,0,0.08)); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
  :global([data-theme="dark"]) .brand-section-card { background: var(--color-neutral-bg-2, #0d1527); border-color: rgba(255,255,255,0.08); }
  .product-spec-article { background: var(--color-neutral-bg-1, #ffffff); border: 1px solid var(--color-neutral-stroke-2, rgba(0,0,0,0.08)); border-radius: 16px; padding: 1.5rem; transition: all 0.3s ease; }
  :global([data-theme="dark"]) .product-spec-article { background: var(--color-neutral-bg-2, #0d1527); border-color: rgba(255,255,255,0.08); }
  .product-spec-article:hover { border-color: var(--color-brand-primary, #043388); box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .brand-placeholder { text-align: center; padding: 2.5rem; }

  /* ── Logo preview tiles ───────────────────── */
  .logo-preview-tile { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1.5rem 2rem; border-radius: 12px; min-width: 160px; }
  .logo-tile-white { background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); }
  .logo-tile-dark  { }
  .logo-tile-label { font-size: 0.72rem; color: var(--color-neutral-fg-3); font-weight: 600; }

  /* ── Color swatch ─────────────────────────── */
  .token-swatch { border-radius: 12px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; color: #ffffff; }

  /* ── Buttons ──────────────────────────────── */
  .product-assets-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; padding: 6px 14px; border-radius: 8px; background: var(--color-brand-subtle); color: var(--color-brand-primary); text-decoration: none; border: 1px solid var(--color-neutral-stroke-1); transition: all 0.15s ease; }
  .product-assets-btn:hover { background: var(--color-brand-primary); color: #fff; border-color: transparent; }
  .btn-outline-small { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; padding: 6px 14px; border-radius: 8px; background: transparent; color: var(--color-neutral-fg-2); text-decoration: none; border: 1px solid var(--color-neutral-stroke-1); transition: all 0.15s ease; }
  .btn-outline-small:hover { color: var(--color-neutral-fg-1); border-color: var(--color-neutral-stroke-2); }
</style>
