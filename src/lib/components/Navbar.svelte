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

    const handleScroll = () => {
      const nav = document.getElementById('mainNavbar');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 8);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header id="mainNavbar" class="f-navbar">
  <nav class="f-navbar-inner" aria-label="Global navigation">
    <!-- Brand -->
    <a class="f-navbar-brand" href="/" aria-label="Home">
      <img src="/public/brand/logos/ss-logomark-light.svg" class="logo" alt="SuamiSihat™ Icon" aria-hidden="true" loading="eager" style="height: 28px;">
      <span class="f-navbar-brand-name">SuamiSihat™ Design System</span>
      <span class="f-navbar-version">v3.5</span>
    </a>

    <!-- Nav links (hidden on small screens, toggled by JS) -->
    <ul class="f-nav-links d-none d-lg-flex" id="navLinks" role="menubar">
      {#each navLinks as link}
        <li role="none">
          <a class="f-nav-link" 
             href={link.href} 
             class:active={$page.url.pathname === link.href || ($page.url.pathname !== '/' && $page.url.pathname.startsWith(link.href))}
             role="menuitem">
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Controls -->
    <button id="themeToggle" class="f-theme-btn" onclick={toggleTheme} aria-label="Toggle dark mode" aria-pressed={isDarkMode}>
      <iconify-icon icon={isDarkMode ? "fluent:weather-sunny-24-regular" : "fluent:weather-moon-24-regular"} style="font-size:1.1rem"></iconify-icon>
    </button>
    <button id="mobileMenuBtn" class="f-mobile-menu-btn d-lg-none" onclick={openDrawer} aria-label="Open navigation menu" aria-expanded={drawerOpen} aria-controls="mobileDrawer">
      <iconify-icon icon="fluent:navigation-24-regular" style="font-size:1.2rem"></iconify-icon>
    </button>
  </nav>
</header>

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
    <div class="f-drawer-header">
      <span class="f-drawer-brand">SuamiSihat™ Design System</span>
      <button id="drawerClose" class="f-drawer-close" onclick={closeDrawer} aria-label="Close menu">
        <iconify-icon icon="fluent:dismiss-24-regular" aria-hidden="true"></iconify-icon>
      </button>
    </div>
    <div class="f-drawer-nav">
      <a class="f-drawer-link" href="/brand-system/" onclick={closeDrawer}>
        <iconify-icon icon="fluent:color-24-regular" aria-hidden="true"></iconify-icon>Brand System
      </a>
      <a class="f-drawer-link" href="/brand-guidelines/" onclick={closeDrawer}>
        <iconify-icon icon="fluent:book-open-24-regular" aria-hidden="true"></iconify-icon>Brand Guidelines
      </a>
      <a class="f-drawer-link" href="/components/" onclick={closeDrawer}>
        <iconify-icon icon="fluent:puzzle-piece-24-regular" aria-hidden="true"></iconify-icon>Components
      </a>
      <a class="f-drawer-link" href="/products/" onclick={closeDrawer}>
        <iconify-icon icon="fluent:cube-multiple-24-regular" aria-hidden="true"></iconify-icon>Products
      </a>
      <div class="f-drawer-divider"></div>
      <a class="f-drawer-link" href="/doc/?doc=changelog" onclick={closeDrawer}>
        <iconify-icon icon="fluent:document-text-24-regular" aria-hidden="true"></iconify-icon>Documentation
      </a>
      <a class="f-drawer-link" href="/onboarding/" onclick={closeDrawer}>
        <iconify-icon icon="fluent:person-star-24-regular" aria-hidden="true"></iconify-icon>Staff Onboarding
      </a>
      <a class="f-drawer-link" href="/signature/" onclick={closeDrawer}>
        <iconify-icon icon="fluent:mail-template-24-regular" aria-hidden="true"></iconify-icon>Mail Signature
      </a>
      <a class="f-drawer-link" href="/tools/" onclick={closeDrawer}>
        <iconify-icon icon="fluent:camera-24-regular" aria-hidden="true"></iconify-icon>SS CAM Tools
      </a>
    </div>
    <div class="f-drawer-footer">SuamiSihat™ Design System v3.5</div>
  </aside>
{/if}
