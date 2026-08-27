<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let drawerOpen = $state(false);
  let isDarkMode = $state(false);
  let docsDropdownOpen = $state(false);

  const navLinks = [
    { label: 'Brand System', href: '/brand-system/' },
    { label: 'Guidelines', href: '/brand-guidelines/' },
    { label: 'Components', href: '/components/' },
    { label: 'Products', href: '/products/' }
  ];

  const docsLinks = [
    { label: 'Onboarding Guide', href: '/onboarding/', icon: 'fluent:person-star-24-regular' },
    { label: "What's New", href: '/doc/?doc=changelog', icon: 'fluent:clock-arrow-download-24-regular' },
    { label: 'Roadmap', href: '/doc/?doc=roadmap', icon: 'fluent:map-drive-24-regular' },
    { label: 'Contribution Guide', href: '/doc/?doc=contribution-guide', icon: 'fluent:heart-hand-24-regular' },
    { label: 'Vision & Mission', href: '/doc/?doc=vision-mission', icon: 'fluent:eye-24-regular' },
    { label: 'Brand Voice', href: '/doc/?doc=brand-voice', icon: 'fluent:megaphone-24-regular' },
    { label: 'Mail Signature', href: '/signature/', icon: 'fluent:mail-template-24-regular' }
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

  function toggleDocsDropdown() {
    docsDropdownOpen = !docsDropdownOpen;
  }

  function closeDocsDropdown() {
    docsDropdownOpen = false;
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

    const handleClickOutside = (e) => {
      if (!e.target.closest('.f-nav-docs-dropdown')) {
        docsDropdownOpen = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<header id="mainNavbar" class="f-navbar">
  <nav class="f-navbar-inner" aria-label="Global navigation">
    <!-- Brand -->
    <a class="f-navbar-brand" href="/" aria-label="Home">
      <img src="/public/brand/logos/ss-logomark-light.svg" class="logo" alt="SuamiSihat™ Icon" aria-hidden="true" loading="eager" style="height: 28px;">
      <span class="f-navbar-brand-name">SS Design System</span>
      <span class="f-navbar-version">v3.5</span>
    </a>

    <!-- Nav links (hidden on small screens) -->
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

      <!-- Docs dropdown -->
      <li role="none" class="f-nav-docs-dropdown" style="position: relative;">
        <button
          class="f-nav-link f-nav-docs-btn"
          class:active={$page.url.pathname.startsWith('/doc') || $page.url.pathname.startsWith('/onboarding') || $page.url.pathname.startsWith('/signature')}
          onclick={toggleDocsDropdown}
          aria-haspopup="true"
          aria-expanded={docsDropdownOpen}
          role="menuitem"
          type="button"
        >
          Docs
          <iconify-icon icon="fluent:chevron-down-16-regular" style="font-size:0.75rem; margin-left:2px; vertical-align:middle; transition: transform 0.2s ease;" style:transform={docsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'}></iconify-icon>
        </button>

        {#if docsDropdownOpen}
          <ul class="f-docs-dropdown-menu" role="menu" aria-label="Documentation links">
            {#each docsLinks as item}
              <li role="none">
                <a class="f-docs-dropdown-item" href={item.href} onclick={closeDocsDropdown} role="menuitem">
                  <iconify-icon icon={item.icon} aria-hidden="true" style="font-size:1rem; flex-shrink:0;"></iconify-icon>
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </li>
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

<style>
  /* Docs dropdown button — matches f-nav-link styling */
  .f-nav-docs-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font: inherit;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  /* Docs dropdown menu panel */
  .f-docs-dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 220px;
    list-style: none;
    padding: 6px;
    margin: 0;
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    border-radius: var(--f-radius-lg, 12px);
    box-shadow: var(--f-shadow-brand-md, 0 8px 24px rgba(4,51,136,0.12));
    z-index: 2000;
    animation: dropdownFadeIn 0.15s ease;
  }

  :global([data-theme="dark"]) .f-docs-dropdown-menu {
    background: #0d1527;
    border-color: rgba(255,255,255,0.1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  @keyframes dropdownFadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Docs dropdown item */
  .f-docs-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: var(--f-radius-md, 8px);
    font-size: 0.8375rem;
    font-weight: 500;
    color: var(--color-neutral-fg-2, #475569);
    text-decoration: none;
    transition: background 0.12s ease, color 0.12s ease;
  }

  .f-docs-dropdown-item:hover {
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-docs-dropdown-item {
    color: #94A3B8;
  }

  :global([data-theme="dark"]) .f-docs-dropdown-item:hover {
    background: rgba(33,161,247,0.1);
    color: #21A1F7;
  }
</style>
