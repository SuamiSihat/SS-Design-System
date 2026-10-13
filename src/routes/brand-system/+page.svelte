<script>
  import { onMount } from 'svelte';
  import BrandFluentContract from '$lib/components/brand-system/BrandFluentContract.svelte';
  import LogomarkSection from '$lib/components/brand-system/LogomarkSection.svelte';
  import ColourSystemSection from '$lib/components/brand-system/ColourSystemSection.svelte';
  import ColorPatternsSection from '$lib/components/brand-system/ColorPatternsSection.svelte';
  import TypographySection from '$lib/components/brand-system/TypographySection.svelte';
  import SubbrandsSection from '$lib/components/brand-system/SubbrandsSection.svelte';
  import IconsUsageSection from '$lib/components/brand-system/IconsUsageSection.svelte';
  import DownloadKitsSection from '$lib/components/brand-system/DownloadKitsSection.svelte';
  import ClientDignitySection from '$lib/components/brand-system/ClientDignitySection.svelte';
  import TokensExportSection from '$lib/components/brand-system/TokensExportSection.svelte';

  let isSidebarMinimized = $state(false);
  let copyToastText = $state('');
  let showToast = $state(false);

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  function copyHex(hex, name, customMsg) {
    navigator.clipboard.writeText(hex);
    copyToastText = customMsg || `Copied ${name || hex} (${hex}) to clipboard!`;
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 2200);
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.copyHex = copyHex;
    }

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.brand-sidebar-nav a').forEach(l => l.classList.remove('active'));
            document.querySelector(`.brand-sidebar-nav a[href="#${e.target.id}"]`)?.classList.add('active');
          }
        });
      },
      { threshold: 0.15, rootMargin: '-5% 0px -65% 0px' }
    );

    document.querySelectorAll('.bs-section[id]').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  });
</script>

<svelte:head>
  <title>Brand System — SuamiSihat™ Design System</title>
</svelte:head>

<div
  class="f-page-layout"
  class:sidebar-minimized={isSidebarMinimized}
  id="pageLayout"
  style="display: grid; grid-template-columns: {isSidebarMinimized ? 'minmax(0, 1fr)' : '260px minmax(0, 1fr)'}; min-height: calc(100vh - 60px); position: relative; transition: grid-template-columns 0.3s ease; width: 100%;"
>
  <!-- Sidebar Toggle -->
  <button
    type="button"
    class="f-sidebar-toggle"
    onclick={toggleSidebar}
    aria-label={isSidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Sidebar Navigation -->
  {#if !isSidebarMinimized}
    <aside class="f-sidebar" id="pageSidebar" aria-label="Brand system navigation" style="background: var(--color-neutral-bg-2); border-right: 1px solid var(--color-neutral-stroke-1); padding: 1.5rem 0.75rem; position: sticky; top: 60px; height: calc(100vh - 60px); overflow-y: auto;">
      <p class="brand-sidebar-title" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3); padding: 0.5rem; margin: 0;">Brand System</p>
      <ul class="brand-sidebar-nav" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
        <li><a href="#brand-fluent2" class="cl-sidebar-link"><iconify-icon icon="fluent:puzzle-piece-24-regular"></iconify-icon> Brand × Fluent 2</a></li>
        <li><a href="#logomark" class="cl-sidebar-link"><iconify-icon icon="fluent:trophy-24-regular"></iconify-icon> Logomark</a></li>
        <li><a href="#colour" class="cl-sidebar-link"><iconify-icon icon="fluent:color-24-regular"></iconify-icon> Colour System</a></li>
        <li><a href="#patterns" class="cl-sidebar-link"><iconify-icon icon="fluent:color-background-24-regular"></iconify-icon> Color Patterns</a></li>
        <li><a href="#typography" class="cl-sidebar-link"><iconify-icon icon="fluent:text-field-24-regular"></iconify-icon> Typography</a></li>
        <li><a href="#subbrand" class="cl-sidebar-link"><iconify-icon icon="fluent:layer-diagonal-24-regular"></iconify-icon> Sub-Brands</a></li>
        <li><a href="#icons" class="cl-sidebar-link"><iconify-icon icon="fluent:shapes-24-regular"></iconify-icon> Icons & Usage</a></li>
        <li><a href="#downloads" class="cl-sidebar-link"><iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon> Download Kits</a></li>
        <li><a href="#client-representation" class="cl-sidebar-link"><iconify-icon icon="fluent:person-shield-24-regular"></iconify-icon> Client Dignity</a></li>
        <li><a href="#tokens-export" class="cl-sidebar-link"><iconify-icon icon="fluent:code-24-regular"></iconify-icon> Tokens Export</a></li>
      </ul>
    </aside>
  {/if}

  <!-- Main Content -->
  <main class="brand-main f-main-content" id="main-content" style="padding: 2.5rem clamp(1.5rem, 4vw, 4rem); width: 100%; min-width: 0; box-sizing: border-box;">
    <!-- Breadcrumb -->
    <nav class="brand-breadcrumb" aria-label="Breadcrumb" style="font-size: 0.8rem; display: flex; align-items: center; gap: 8px; margin-bottom: 1rem;">
      <a href="/" style="color: var(--color-neutral-fg-3); text-decoration: none;">Home</a>
      <iconify-icon icon="fluent:chevron-right-12-regular" style="color: var(--color-neutral-fg-3);"></iconify-icon>
      <span style="color:var(--color-neutral-fg-1);font-weight:600;">Brand System</span>
    </nav>

    <!-- Page Header -->
    <div style="margin-bottom: 2rem;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">Design Language Standard</div>
      <h1 class="bs-section-title" style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.75rem; color: var(--color-neutral-fg-1);">Brand System &amp; Visual Identity</h1>
      <p class="bs-section-desc" style="font-size: 1.05rem; color: var(--color-neutral-fg-2); line-height: 1.7; max-width: 720px;">The authoritative single source of truth for SuamiSihat™ vector marks, typography scales, Fluent 2 design tokens, and multi-platform color hierarchies.</p>
    </div>

    <!-- Corporate Entity Facts Deck -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; margin-bottom: 3.5rem;">
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Official Brand</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 1.05rem;">SuamiSihat™</strong>
      </div>
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Registered Entity</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 0.92rem; display: block; line-height: 1.3;">SUAMISIHAT HOLDING SDN. BHD.</strong>
      </div>
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Primary Market</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 1.05rem;">Malaysia</strong>
      </div>
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Core Focus</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 0.95rem;">Men's Health, Wellness &amp; Tech</strong>
      </div>
    </div>

    <!-- 00. Brand × Fluent 2 Architectural Contract -->
    <BrandFluentContract />

    <!-- 01. Logomark & Master Identity -->
    <LogomarkSection />

    <!-- 02. Color Palette & Master Standards -->
    <ColourSystemSection {copyHex} />

    <!-- 03. Curated Color Patterns (60:30:10 Schemes) -->
    <ColorPatternsSection />

    <!-- 04. Typography System -->
    <TypographySection />

    <!-- 05. Brand Architecture & Operating Model -->
    <SubbrandsSection />

    <!-- 06. Icons & Logomark Usage -->
    <IconsUsageSection />

    <!-- 07. Direct Asset Download Kits -->
    <DownloadKitsSection />

    <!-- 08. Client Representation & Dignity Standards -->
    <ClientDignitySection />

    <!-- 09. Multi-Platform Token Exporters -->
    <TokensExportSection />
  </main>
</div>

<!-- Copy Toast -->
{#if showToast}
  <div class="bs-copy-toast show" style="position: fixed; bottom: 1.5rem; right: 1.5rem; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-left: 4px solid #16A34A; border-radius: 8px; padding: 0.75rem 1.25rem; box-shadow: var(--f-shadow-16); font-size: 0.85rem; font-weight: 600; color: var(--color-neutral-fg-1); z-index: 2000;">
    {copyToastText}
  </div>
{/if}
