<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let mobileOpen = $state(false);
  let isDarkMode = $state(false);

  const navLinks = [
    { label: 'Brand Guidelines', href: '/brand-guidelines/' },
    { label: 'Design Tokens', href: '/brand-system/' },
    { label: 'Components', href: '/components/' },
    { label: 'Products', href: '/products/' },
    { label: 'Tools', href: '/tools/' },
    { label: 'Signature', href: '/signature/' },
    { label: 'Onboarding', href: '/onboarding/' }
  ];

  function toggleMobile() {
    mobileOpen = !mobileOpen;
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('ss-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('ss-theme', 'light');
    }
  }

  onMount(() => {
    const saved = localStorage.getItem('ss-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });
</script>

<header class="f-navbar">
  <div class="f-navbar-inner">
    <a href="/" class="f-navbar-brand">
      <img src="/public/brand/logos/ss-logomark-light.svg" alt="SuamiSihat Logo" width="32" height="32" />
      <span class="f-navbar-brand-name">SuamiSihat™ <span style="font-weight: 400; opacity: 0.85;">Design System</span></span>
      <span class="f-navbar-version">v3.4</span>
    </a>

    <nav class="f-nav-links d-none d-lg-flex">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="f-nav-link" 
          class:active={$page.url.pathname === link.href || $page.url.pathname.startsWith(link.href)}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="f-nav-actions d-none d-lg-flex" style="margin-left: auto; gap: 0.5rem; align-items: center;">
      <!-- Theme Toggle -->
      <button 
        type="button" 
        class="btn btn-sm"
        onclick={toggleTheme}
        title="Toggle Light / Dark Mode"
        style="border: 1px solid var(--color-neutral-stroke-1); color: var(--color-neutral-fg-1); display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: var(--f-radius-medium); padding: 0;"
        aria-label="Toggle dark mode"
      >
        <iconify-icon icon={isDarkMode ? "lucide:sun" : "lucide:moon"} width="16" height="16"></iconify-icon>
      </button>

      <a href="https://github.com/SuamiSihat/SS-Design-System" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="border: 1px solid var(--color-neutral-stroke-1); color: var(--color-neutral-fg-1); display: inline-flex; align-items: center; gap: 0.35rem; border-radius: var(--f-radius-medium); font-size: 0.8rem; padding: 0.35rem 0.75rem;">
        <iconify-icon icon="lucide:github" width="16"></iconify-icon> GitHub
      </a>
    </div>

    <!-- Mobile Hamburger Toggle -->
    <button 
      type="button" 
      class="d-lg-none btn btn-sm p-1" 
      style="margin-left: auto; background: transparent; border: none; color: var(--color-neutral-fg-1);"
      onclick={toggleMobile}
      aria-label="Toggle navigation menu"
    >
      <iconify-icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} width="24" height="24"></iconify-icon>
    </button>
  </div>

  <!-- Mobile Dropdown Menu -->
  {#if mobileOpen}
    <div class="d-lg-none" style="background: var(--color-layer-card); border-bottom: 1px solid var(--color-neutral-stroke-1); padding: 1rem 1.5rem;">
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        {#each navLinks as link}
          <a 
            href={link.href} 
            class="f-nav-link" 
            class:active={$page.url.pathname === link.href || $page.url.pathname.startsWith(link.href)}
            onclick={() => (mobileOpen = false)}
            style="padding: 0.5rem 0; font-size: 0.95rem;"
          >
            {link.label}
          </a>
        {/each}
        <hr style="margin: 0.5rem 0; border-color: var(--color-neutral-stroke-1);" />
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button 
            type="button" 
            class="btn btn-sm" 
            onclick={toggleTheme}
            style="border: 1px solid var(--color-neutral-stroke-1); color: var(--color-neutral-fg-1); display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; border-radius: 6px;"
          >
            <iconify-icon icon={isDarkMode ? "lucide:sun" : "lucide:moon"} width="16"></iconify-icon>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <a href="https://github.com/SuamiSihat/SS-Design-System" target="_blank" rel="noopener noreferrer" style="color: var(--color-neutral-fg-2); text-decoration: none; font-size: 0.875rem; display: flex; align-items: center; gap: 0.35rem;">
            <iconify-icon icon="lucide:github" width="16"></iconify-icon> GitHub
          </a>
        </div>
      </div>
    </div>
  {/if}
</header>
