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
      <span class="f-navbar-version">v3.5</span>
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
        class="btn-theme-toggle"
        onclick={toggleTheme}
        title="Toggle Light / Dark Mode"
        aria-label="Toggle dark mode"
      >
        <iconify-icon icon={isDarkMode ? "lucide:sun" : "lucide:moon"} width="16" height="16"></iconify-icon>
      </button>

      <a href="https://github.com/SuamiSihat/SS-Design-System" target="_blank" rel="noopener noreferrer" class="btn-github-nav">
        <iconify-icon icon="lucide:github" width="16"></iconify-icon> GitHub
      </a>
    </div>

    <!-- Mobile Hamburger Toggle -->
    <button 
      type="button" 
      class="d-lg-none btn-mobile-toggle" 
      onclick={toggleMobile}
      aria-label="Toggle navigation menu"
    >
      <iconify-icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} width="24" height="24"></iconify-icon>
    </button>
  </div>

  <!-- Mobile Dropdown Menu -->
  {#if mobileOpen}
    <div class="f-mobile-menu d-lg-none">
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        {#each navLinks as link}
          <a 
            href={link.href} 
            class="f-nav-link" 
            class:active={$page.url.pathname === link.href || $page.url.pathname.startsWith(link.href)}
            onclick={() => (mobileOpen = false)}
          >
            {link.label}
          </a>
        {/each}
        <hr style="margin: 0.5rem 0; border-color: rgba(0,0,0,0.1);" />
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.25rem;">
          <button 
            type="button" 
            class="btn-theme-toggle" 
            onclick={toggleTheme}
            style="width: auto; padding: 0.4rem 0.8rem; gap: 0.5rem;"
          >
            <iconify-icon icon={isDarkMode ? "lucide:sun" : "lucide:moon"} width="16"></iconify-icon>
            <span style="font-size: 0.8rem;">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <a href="https://github.com/SuamiSihat/SS-Design-System" target="_blank" rel="noopener noreferrer" class="btn-github-nav">
            <iconify-icon icon="lucide:github" width="16"></iconify-icon> GitHub
          </a>
        </div>
      </div>
    </div>
  {/if}
</header>

<style>
  .f-navbar {
    position: sticky;
    top: 0;
    z-index: 1030;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    transition: all 0.25s ease;
  }

  :global([data-theme="dark"]) .f-navbar {
    background: rgba(9, 13, 22, 0.88);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .f-navbar-inner {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 64px;
    gap: 1.25rem;
  }

  .f-navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    text-decoration: none;
    flex-shrink: 0;
  }

  .f-navbar-brand-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #022057;
    letter-spacing: -0.01em;
  }

  :global([data-theme="dark"]) .f-navbar-brand-name {
    color: #FFFFFF;
  }

  .f-navbar-version {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 9999px;
    background: rgba(33, 161, 247, 0.12);
    color: #043388;
    border: 1px solid rgba(33, 161, 247, 0.3);
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  :global([data-theme="dark"]) .f-navbar-version {
    color: #21A1F7;
    background: rgba(33, 161, 247, 0.2);
  }

  .f-nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-left: 0.5rem;
  }

  .f-nav-link {
    color: #475569;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    transition: all 0.15s ease;
    display: inline-flex;
    align-items: center;
  }

  :global([data-theme="dark"]) .f-nav-link {
    color: #94A3B8;
  }

  .f-nav-link:hover {
    color: #043388;
    background: rgba(4, 51, 136, 0.06);
  }

  :global([data-theme="dark"]) .f-nav-link:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.08);
  }

  .f-nav-link.active {
    color: #043388;
    background: rgba(33, 161, 247, 0.15);
    font-weight: 700;
  }

  :global([data-theme="dark"]) .f-nav-link.active {
    color: #21A1F7;
    background: rgba(33, 161, 247, 0.2);
  }

  .btn-theme-toggle {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: #1C1C1C;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  :global([data-theme="dark"]) .btn-theme-toggle {
    border-color: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
  }

  .btn-theme-toggle:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :global([data-theme="dark"]) .btn-theme-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn-github-nav {
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: #1C1C1C;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.38rem 0.75rem;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  :global([data-theme="dark"]) .btn-github-nav {
    border-color: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
  }

  .btn-github-nav:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :global([data-theme="dark"]) .btn-github-nav:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn-mobile-toggle {
    margin-left: auto;
    background: transparent;
    border: none;
    color: #1C1C1C;
    cursor: pointer;
    padding: 4px;
  }

  :global([data-theme="dark"]) .btn-mobile-toggle {
    color: #FFFFFF;
  }

  .f-mobile-menu {
    background: rgba(255, 255, 255, 0.96);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem 1.5rem;
  }

  :global([data-theme="dark"]) .f-mobile-menu {
    background: rgba(9, 13, 22, 0.96);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
</style>
