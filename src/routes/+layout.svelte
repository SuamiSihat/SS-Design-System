<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<div class="f-app-shell" style="display: flex; flex-direction: column; min-height: 100vh; background-color: var(--color-neutral-bg-1, #F8FAFC); color: var(--color-neutral-fg-1, #1C1C1C);">
  <Navbar />
  <main style="flex: 1; display: flex; flex-direction: column;">
    {@render children?.()}
  </main>
  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: var(--f-font-family-base, 'Inter', 'Segoe UI', system-ui, sans-serif);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-neutral-bg-1, #F8FAFC);
    color: var(--color-neutral-fg-1, #1C1C1C);
  }

  :global(h1, h2, h3, h4, h5, h6) {
    color: var(--color-neutral-fg-1, #1C1C1C);
    font-weight: 700;
  }

  :global(a) {
    color: var(--color-brand-primary, #043388);
    transition: color 0.15s ease;
  }
  :global(a:hover) {
    color: var(--color-brand-hover, #022057);
  }
</style>
