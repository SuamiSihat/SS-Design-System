<script>
  import { onMount } from 'svelte';
  import FoundationSection from '$lib/components/components-library/FoundationSection.svelte';
  import HeroSection from '$lib/components/components-library/HeroSection.svelte';
  import ActionsSection from '$lib/components/components-library/ActionsSection.svelte';
  import FormsCardsSection from '$lib/components/components-library/FormsCardsSection.svelte';
  import FeedbackOverlaysSection from '$lib/components/components-library/FeedbackOverlaysSection.svelte';
  import StateMatrixSection from '$lib/components/components-library/StateMatrixSection.svelte';
  import PlatformGuidesSection from '$lib/components/components-library/PlatformGuidesSection.svelte';
  import LiveDemoModal from '$lib/components/components-library/LiveDemoModal.svelte';
  import LiveToastContainer from '$lib/components/components-library/LiveToastContainer.svelte';

  let isSidebarMinimized = $state(false);
  let copiedSwatchText = $state('');
  let liveToasts = $state([]);
  let isDemoModalOpen = $state(false);

  function spawnToast(type = 'success', title = 'Action Completed', msg = 'Your changes have been saved.') {
    const id = Date.now() + Math.random();
    const newToast = { id, type, title, msg };
    liveToasts = [...liveToasts, newToast];
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }

  function removeToast(id) {
    liveToasts = liveToasts.filter(t => t.id !== id);
  }

  function handleCopySwatch(text) {
    copiedSwatchText = text;
    setTimeout(() => (copiedSwatchText = ''), 2000);
  }

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  onMount(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.cl-sidebar-link').forEach(l => l.classList.remove('active'));
            document.querySelector(`.cl-sidebar-link[href="#${e.target.id}"]`)?.classList.add('active');
          }
        });
      },
      { threshold: 0.15, rootMargin: '-5% 0px -65% 0px' }
    );

    document.querySelectorAll('.cl-section[id]').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  });
</script>

<svelte:head>
  <title>Component Library — SuamiSihat® Design System</title>
</svelte:head>

<div
  class="f-page-layout"
  class:sidebar-minimized={isSidebarMinimized}
  style="display: grid; grid-template-columns: {isSidebarMinimized ? 'minmax(0, 1fr)' : '260px minmax(0, 1fr)'}; min-height: calc(100vh - 60px); position: relative; transition: grid-template-columns 0.3s ease; width: 100%;"
>
  <!-- Sidebar Toggle Pill -->
  <button
    type="button"
    class="f-sidebar-toggle"
    onclick={toggleSidebar}
    aria-label={isSidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2, #FFFFFF); border: 1px solid var(--color-neutral-stroke-2, #CBD5E1); color: var(--color-neutral-fg-2, #64748B); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Component Sidebar Navigation -->
  {#if !isSidebarMinimized}
    <aside class="f-sidebar" aria-label="Component navigation" style="background: var(--color-neutral-bg-2, #FFFFFF); border-right: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); padding: 1.5rem 0.75rem; position: sticky; top: 60px; height: calc(100vh - 60px); overflow-y: auto;">
      <div class="cl-sidebar-section" style="padding: 0 0.5rem 0.5rem;">
        <span class="cl-sidebar-label" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3, #94A3B8); padding: 0.5rem 0.5rem 0.25rem; display: block;">Foundation</span>
        <a href="#fluent2-guide" class="cl-sidebar-link"><iconify-icon icon="fluent:book-compass-24-regular"></iconify-icon> Fluent 2 Guide</a>
        <a href="#colors" class="cl-sidebar-link"><iconify-icon icon="fluent:color-24-regular"></iconify-icon> Color System</a>
        <a href="#typography" class="cl-sidebar-link"><iconify-icon icon="fluent:text-font-24-regular"></iconify-icon> Typography</a>
        <a href="#spacing" class="cl-sidebar-link"><iconify-icon icon="fluent:auto-fit-width-24-regular"></iconify-icon> Spacing</a>
        <a href="#elevation" class="cl-sidebar-link"><iconify-icon icon="fluent:layer-24-regular"></iconify-icon> Elevation</a>
        <a href="#radius" class="cl-sidebar-link"><iconify-icon icon="fluent:square-24-regular"></iconify-icon> Border Radius</a>
        <a href="#motion" class="cl-sidebar-link"><iconify-icon icon="fluent:play-circle-24-regular"></iconify-icon> Motion</a>
        <a href="#icons" class="cl-sidebar-link"><iconify-icon icon="fluent:icons-24-regular"></iconify-icon> Icons</a>
      </div>

      <div class="cl-divider" style="height: 1px; background: var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); margin: 0.5rem 0.5rem 1rem;"></div>

      <div class="cl-sidebar-section" style="padding: 0 0.5rem 0.5rem;">
        <span class="cl-sidebar-label" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3, #94A3B8); padding: 0.5rem 0.5rem 0.25rem; display: block;">Components</span>
        <a href="#ss-hero" class="cl-sidebar-link"><iconify-icon icon="fluent:sparkle-24-regular"></iconify-icon> SS Hero Banner</a>
        <a href="#buttons" class="cl-sidebar-link"><iconify-icon icon="fluent:rectangle-landscape-24-regular"></iconify-icon> Buttons</a>
        <a href="#badges" class="cl-sidebar-link"><iconify-icon icon="fluent:badge-24-regular"></iconify-icon> Badges &amp; Chips</a>
        <a href="#inputs" class="cl-sidebar-link"><iconify-icon icon="fluent:text-field-24-regular"></iconify-icon> Inputs &amp; Forms</a>
        <a href="#cards" class="cl-sidebar-link"><iconify-icon icon="fluent:card-ui-24-regular"></iconify-icon> Cards</a>
        <a href="#alerts" class="cl-sidebar-link"><iconify-icon icon="fluent:alert-24-regular"></iconify-icon> Alerts</a>
        <a href="#avatars" class="cl-sidebar-link"><iconify-icon icon="fluent:person-circle-24-regular"></iconify-icon> Avatars</a>
        <a href="#progress" class="cl-sidebar-link"><iconify-icon icon="fluent:spinner-ios-20-regular"></iconify-icon> Progress</a>
        <a href="#tabs" class="cl-sidebar-link"><iconify-icon icon="fluent:tab-24-regular"></iconify-icon> Tabs</a>
        <a href="#navigation" class="cl-sidebar-link"><iconify-icon icon="fluent:navigation-24-regular"></iconify-icon> Navigation</a>
        <a href="#modal" class="cl-sidebar-link"><iconify-icon icon="fluent:panel-right-24-regular"></iconify-icon> Modal &amp; Sheet</a>
        <a href="#toast" class="cl-sidebar-link"><iconify-icon icon="fluent:alert-badge-24-regular"></iconify-icon> Toast</a>
        <a href="#empty-state" class="cl-sidebar-link"><iconify-icon icon="fluent:box-24-regular"></iconify-icon> Empty State</a>
        <a href="#list-item" class="cl-sidebar-link"><iconify-icon icon="fluent:list-24-regular"></iconify-icon> List Item</a>
        <a href="#stats" class="cl-sidebar-link"><iconify-icon icon="fluent:data-bar-vertical-24-regular"></iconify-icon> Stats Card</a>
        <a href="#state-matrix" class="cl-sidebar-link"><iconify-icon icon="fluent:table-24-regular"></iconify-icon> State Matrix</a>
      </div>

      <div class="cl-divider" style="height: 1px; background: var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); margin: 0.5rem 0.5rem 1rem;"></div>

      <div class="cl-sidebar-section" style="padding: 0 0.5rem 0.5rem;">
        <span class="cl-sidebar-label" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3, #94A3B8); padding: 0.5rem 0.5rem 0.25rem; display: block;">Platform</span>
        <a href="#tokens-json" class="cl-sidebar-link"><iconify-icon icon="fluent:document-data-24-regular"></iconify-icon> Token Export</a>
        <a href="#flutter" class="cl-sidebar-link"><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Flutter Guide</a>
        <a href="#expo-install" class="cl-sidebar-link"><iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon> Expo Setup</a>
      </div>
    </aside>
  {/if}

  <!-- Main Content Area -->
  <main class="f-main-content" style="width: 100%; min-width: 0; box-sizing: border-box;">
    <!-- Header -->
    <div class="mb-4">
      <nav aria-label="breadcrumb" style="display:flex; align-items:center; gap:6px; font-size:0.8rem; margin-bottom:0.75rem;">
        <a href="/" style="color: var(--color-neutral-fg-3); text-decoration: none;">Home</a>
        <iconify-icon icon="fluent:chevron-right-12-regular" style="color: var(--color-neutral-fg-3);"></iconify-icon>
        <span style="color:var(--color-neutral-fg-1); font-weight:600;">Component Library</span>
      </nav>
      <div class="cl-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">SuamiSihat® Design System</div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.75rem; color: var(--color-neutral-fg-1);">Component Library</h1>
      <p style="font-size: 1.05rem; color: var(--color-neutral-fg-2); line-height: 1.7; max-width: 680px;">The complete visual language of SuamiSihat®. Fluent 2 architecture. One system for web, mobile apps, and internal tools.</p>
      
      <!-- Feature Badges -->
      <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-top: 1rem;">
        <span class="ss-badge ss-badge-brand">Fluent 2</span>
        <span class="ss-badge ss-badge-success">Expo Ready</span>
        <span class="ss-badge ss-badge-neutral">WCAG AA</span>
        <span class="ss-badge ss-badge-neutral">Dark Mode Ready</span>
        {#if copiedSwatchText}
          <span class="ss-badge ss-badge-brand" style="animation: f-fade-in 0.2s ease;">{copiedSwatchText}</span>
        {/if}
      </div>
    </div>

    <!-- 01. Foundation: Fluent 2 Guide, Colors, Typography, Spacing, Elevation, Radii, Motion, Icons -->
    <FoundationSection onCopySwatch={handleCopySwatch} />

    <!-- 02. SS Hero Banner Standard Showcase -->
    <HeroSection />

    <!-- 03. Buttons & Badges -->
    <ActionsSection />

    <!-- 04. Inputs, Form Controls & Cards -->
    <FormsCardsSection />

    <!-- 05. Feedback, Alerts, Avatars, Progress, Tabs, Modal, Toast, Empty State, List Item, Stats -->
    <FeedbackOverlaysSection {spawnToast} onOpenModal={() => isDemoModalOpen = true} />

    <!-- 06. Fluent 2 State Matrix Table -->
    <StateMatrixSection />

    <!-- 07. Platform Integration & Developer Handoff Guides -->
    <PlatformGuidesSection />
  </main>
</div>

<!-- ─── Interactive Live Modal Dialog ─────────────────────────────── -->
<LiveDemoModal bind:isOpen={isDemoModalOpen} {spawnToast} />

<!-- ─── Floating Live Toast Container (Bottom-Right) ───────────────── -->
<LiveToastContainer toasts={liveToasts} onRemoveToast={removeToast} />
