<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let drawerOpen = $state(false);
  let isDarkMode = $state(false);

  const navLinks = [
    { label: 'Brand System', href: '/brand-system/' },
    { label: 'Guidelines', href: '/brand-guidelines/' },
    { label: 'Components', href: '/components/' },
    { label: 'Products', href: '/products/' },
    { label: 'Docs', href: '/doc/?doc=roadmap' }
  ];

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
      localStorage.setItem('ss-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('ss-theme', 'light');
    }
  }

  function openDrawer() {
    drawerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawerOpen = false;
    document.body.style.overflow = '';
  }

  onMount(() => {
    const saved = localStorage.getItem('ss-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    }
  });
</script>

<nav class="f-navbar" id="mainNavbar" aria-label="Main Navigation">
  <div class="f-navbar-inner">
    <a href="/" class="f-navbar-brand" aria-label="SuamiSihat Design System Home">
      <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg"
           data-light-src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg"
           data-dark-src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg"
           alt="SuamiSihat™" height="32" width="auto">
      <span class="f-navbar-brand-name d-none d-sm-inline">SuamiSihat™ <span style="font-weight:400;opacity:0.75;">Design System</span></span>
      <span class="f-navbar-version">v3.5</span>
    </a>

    <!-- Desktop nav links -->
    <ul class="f-nav-links d-none d-lg-flex" role="menubar">
      {#each navLinks as link}
        <li role="none">
          <a href={link.href} 
             class="f-nav-link" 
             class:active={$page.url.pathname === link.href || ($page.url.pathname !== '/' && $page.url.pathname.startsWith(link.href))}
             role="menuitem">
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Theme toggle button -->
    <button class="f-theme-btn ms-auto ms-lg-2" 
            onclick={toggleTheme}
            id="themeToggleBtn"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle theme">
      <iconify-icon icon={isDarkMode ? "fluent:weather-sunny-24-regular" : "fluent:weather-moon-24-regular"} width="18"></iconify-icon>
    </button>

    <!-- Mobile menu trigger -->
    <button class="f-mobile-menu-btn d-lg-none" 
            id="mobileMenuBtn" 
            onclick={openDrawer}
            aria-label="Open Navigation Menu"
            aria-expanded={drawerOpen}>
      <iconify-icon icon="fluent:navigation-24-regular" width="20"></iconify-icon>
    </button>
  </div>
</nav>

<!-- Mobile Drawer Overlay -->
{#if drawerOpen}
  <div class="f-drawer-overlay open visible" 
       id="drawerOverlay" 
       onclick={closeDrawer}
       onkeydown={(e) => e.key === 'Escape' && closeDrawer()}
       role="presentation"
       tabindex="-1">
  </div>
  
  <aside class="f-drawer open" id="mobileDrawer" aria-label="Mobile Navigation">
    <div class="f-drawer-header" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid var(--color-neutral-stroke-1);">
      <span class="f-navbar-brand-name">Navigation</span>
      <button class="f-drawer-close" 
              onclick={closeDrawer}
              style="background:none;border:none;color:var(--color-neutral-fg-1);cursor:pointer;padding:4px;"
              aria-label="Close Navigation Menu">
        <iconify-icon icon="fluent:dismiss-24-regular" width="22"></iconify-icon>
      </button>
    </div>
    <nav class="f-drawer-body" style="padding:1rem 1.25rem;display:flex;flex-direction:column;gap:0.5rem;">
      {#each navLinks as link}
        <a href={link.href} 
           class="f-drawer-link" 
           class:active={$page.url.pathname === link.href}
           onclick={closeDrawer}
           style="padding:0.6rem 0.8rem;border-radius:var(--f-radius-md);text-decoration:none;font-weight:600;color:var(--color-neutral-fg-1);">
          {link.label}
        </a>
      {/each}
      <hr style="border-color:var(--color-neutral-stroke-1);margin:0.5rem 0;">
      <a href="/signature/" class="f-drawer-link" onclick={closeDrawer} style="padding:0.6rem 0.8rem;text-decoration:none;color:var(--color-neutral-fg-2);">Mail Signature</a>
      <a href="/tools/" class="f-drawer-link" onclick={closeDrawer} style="padding:0.6rem 0.8rem;text-decoration:none;color:var(--color-neutral-fg-2);">SS CAM &amp; Tools</a>
      <a href="/onboarding/" class="f-drawer-link" onclick={closeDrawer} style="padding:0.6rem 0.8rem;text-decoration:none;color:var(--color-neutral-fg-2);">Onboarding</a>
    </nav>
  </aside>
{/if}
