<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { initTheme } from '$lib/stores/theme.js';

  let { children } = $props();

  onMount(() => {
    initTheme();
  });
</script>

<div class="f-app-shell">
  <Navbar />
  <div class="f-content-wrapper">
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
  }

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
