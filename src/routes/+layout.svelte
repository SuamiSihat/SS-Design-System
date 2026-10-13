<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { initTheme } from '$lib/stores/theme.js';
  import { browser } from '$app/environment';
  import fluentIcons from '$lib/icons/fluent-subset.json';

  // Self-hosted fonts (no third-party font requests)
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '@fontsource/inter/700.css';
  import '@fontsource/inter/800.css';
  import '@fontsource/poppins/600.css';
  import '@fontsource/poppins/700.css';

  // Fluent System Icons are bundled at build time (scripts/build-icons.mjs) and
  // registered before the <iconify-icon> element is defined, so no icon API calls.
  if (browser) {
    import('iconify-icon').then(({ addCollection }) => addCollection(fluentIcons));
  }

  let { children } = $props();

  onMount(() => {
    initTheme();
  });
</script>

<svelte:head>
  <title>SuamiSihat® Design System</title>
</svelte:head>

<a class="f-skip-link" href="#page-content">Skip to main content</a>
<div class="f-app-shell">
  <Navbar />
  <div class="f-content-wrapper" id="page-content" tabindex="-1">
    {@render children?.()}
  </div>
  <Footer />
</div>

<style>
  .f-app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-neutral-bg-1, #F8FAFC);
    color: var(--color-neutral-fg-1, #1C1C1C);
    transition: opacity 0.3s ease;
  }

  .f-skip-link {
    position: absolute;
    left: 1rem;
    top: -4rem;
    z-index: 10000;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    background: #043388;
    color: #fff;
    font-weight: 600;
    text-decoration: none;
  }

  .f-skip-link:focus {
    top: 0.75rem;
    outline: 3px solid #21A1F7;
    outline-offset: 2px;
  }

  .f-content-wrapper:focus { outline: none; }
  .f-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: var(--f-font-family-base, 'Inter', 'Segoe UI', system-ui, sans-serif);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-neutral-bg-1, #F8FAFC);
    color: var(--color-neutral-fg-1, #1C1C1C);
  }

  :global([data-theme="dark"] body) {
    background-color: #090D16 !important;
    color: #F8FAFC !important;
  }

  :global([data-theme="dark"] .f-app-shell) {
    background-color: #090D16 !important;
    color: #F8FAFC !important;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    color: var(--color-neutral-fg-1, #1C1C1C);
  }

  :global([data-theme="dark"] h1),
  :global([data-theme="dark"] h2),
  :global([data-theme="dark"] h3),
  :global([data-theme="dark"] h4),
  :global([data-theme="dark"] h5),
  :global([data-theme="dark"] h6) {
    color: #FFFFFF !important;
  }

  :global(a) {
    text-decoration: none;
  }
</style>
