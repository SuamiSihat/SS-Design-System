<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { theme, initTheme, toggleTheme } from '$lib/stores/theme.js';

  let drawerOpen = $state(false);
  let docsDropdownOpen = $state(false);
  let searchOpen = $state(false);
  let searchQuery = $state('');
  let selectedSearchIndex = $state(0);

  let isDarkMode = $derived($theme === 'dark');

  const navLinks = [
    { label: 'Brand System', href: '/brand-system/' },
    { label: 'Guidelines', href: '/brand-guidelines/' },
    { label: 'Components', href: '/components/' },
    { label: 'Products', href: '/products/' }
  ];

  const docsLinksGroup1 = [
    { label: 'Brand × Fluent 2', href: '/doc/?doc=brand-fluent2', icon: 'fluent:puzzle-piece-24-regular' },
    { label: 'Onboarding Guide', href: '/onboarding/', icon: 'fluent:person-star-24-regular' },
    { label: "What's New", href: '/doc/?doc=changelog', icon: 'fluent:clock-arrow-download-24-regular' },
    { label: 'Roadmap', href: '/doc/?doc=roadmap', icon: 'fluent:map-drive-24-regular' },
    { label: 'Contribution Guide', href: '/doc/?doc=contribution-guide', icon: 'fluent:heart-hand-24-regular' }
  ];

  const docsLinksGroup2 = [
    { label: 'Vision & Mission', href: '/doc/?doc=vision-mission', icon: 'fluent:eye-24-regular' },
    { label: 'Brand Voice', href: '/doc/?doc=brand-voice', icon: 'fluent:megaphone-24-regular' },
    { label: 'Mail Signature', href: '/signature/', icon: 'fluent:mail-template-24-regular' },
    { label: 'SS CAM & Tools', href: '/tools/', icon: 'fluent:camera-24-regular' }
  ];

  const searchIndex = [
    // Architecture & Contract
    { title: 'Brand × Fluent 2 Architectural Contract', cat: 'Docs', href: '/doc/?doc=brand-fluent2', desc: 'Boundary matrix, source-of-truth rules, component anatomy, and state machine standard' },
    { title: 'Brand × Fluent 2 (Brand System Section)', cat: 'Tokens', href: '/brand-system/#brand-fluent2', desc: 'Interactive boundary matrix and two-layer system hierarchy' },

    // Brand Tokens
    { title: 'Brand Colors & 60:30:10 Rule', cat: 'Tokens', href: '/brand-system/#colors', desc: 'Prussian Blue (#022057), SS Blue (#043388), Azure (#21A1F7), Banana Yellow (#FCE53D)' },
    { title: 'Logo System & Proportions', cat: 'Tokens', href: '/brand-system/#logos', desc: 'Safe exclusion zone (1X), math proportions, and please do / don\'t rules' },
    { title: 'Typography Scale', cat: 'Tokens', href: '/brand-system/#typography', desc: 'Display, Title, Subtitle, Body, and Caption tokens' },
    { title: 'Spacing & Radii Scale', cat: 'Tokens', href: '/brand-system/#spacing', desc: '4px grid (--f-space-*) and corner radius (--f-radius-*) tokens' },
    { title: 'Multi-Platform Token Exports', cat: 'Tokens', href: '/brand-system/#tokens', desc: 'Export W3C JSON tokens to Tailwind, Flutter, and WPF' },

    // Components
    { title: 'SS Hero Banner Standard (ss-hero)', cat: 'Components', href: '/components/#ss-hero', desc: 'Default animated vitality wave & particle canvas background for all hero banners' },
    { title: 'Button Components (CTA, Primary, Secondary)', cat: 'Components', href: '/components/#buttons', desc: 'Banana Yellow CTA, primary azure, ghost, and danger buttons' },
    { title: 'Badges & Status Tags', cat: 'Components', href: '/components/#badges', desc: 'Fluent 2 pill badges, neutral tags, and brand badges' },
    { title: 'Input Controls & Switches', cat: 'Components', href: '/components/#inputs', desc: 'Text fields, search inputs, checkboxes, radio buttons, and switches' },
    { title: 'Cards & Elevation Surfaces', cat: 'Components', href: '/components/#cards', desc: 'Acrylic mica surfaces, interactive cards, and drop shadows' },
    { title: 'Modals & Dialogs', cat: 'Components', href: '/components/#modal', desc: 'Fluent 2 modal dialogs with backdrop blur' },
    { title: 'Toast Notifications', cat: 'Components', href: '/components/#toast', desc: 'Slide-in feedback toasts for success, warning, and info' },
    { title: 'Bottom Tab Navigation', cat: 'Components', href: '/components/#navigation', desc: 'Mobile bottom tab bars for React Native Expo & Flutter' },

    // Products
    { title: 'ANDROLAB — Clinical Performance Nutraceuticals', cat: 'Products', href: '/products/androlab/', desc: 'ANDROLAB Alpha sachet & doctor-prescribed ANDROLAB RX' },
    { title: 'MENSS — Modern Intimate Lifestyle & Hardware', cat: 'Products', href: '/products/menss/', desc: 'MENSS FRÉSH Wash, Motorized Penile Pump (VED), and Silicone Rings' },
    { title: 'REJAL — Heritage Functional Superfoods', cat: 'Products', href: '/products/rejal/', desc: 'REJAL Bawang Lanang + Madu Tualang & Stevia Leaf Extract' },
    { title: 'Mensculine — International Brand Care', cat: 'Products', href: '/products/mensculine/', desc: '50g Aluminum tube topical care cream' },
    { title: 'Dr Mit Ring® — Patented Clinical Mechanical Device', cat: 'Products', href: '/products/drmitring/', desc: 'Doctor-patented lime-green medical silicone ring' },
    { title: 'PERTABI — Official Performance Jersey', cat: 'Products', href: '/products/pertabi/', desc: 'Sublimated high-wicking athletic matchday kit' },

    // Tools & Guides
    { title: 'Staff Onboarding Guide', cat: 'Guides', href: '/onboarding/', desc: 'New employee checklist, holding ecosystem, and orientation' },
    { title: 'Email Signature Generator', cat: 'Tools', href: '/signature/', desc: 'Standardized corporate email signatures for Outlook, Apple Mail & Gmail' },
    { title: 'SS CAM Studio (Windows WPF)', cat: 'Tools', href: '/tools/', desc: 'Desktop digital asset watermarking and batch rendering station' },
    { title: 'WCAG Color Contrast Ratio Tool', cat: 'Tools', href: '/tools/#contrast-tool', desc: 'Real-time foreground & background accessibility contrast tester' },
    { title: 'Brand Guidelines Booklets', cat: 'Guides', href: '/brand-guidelines/', desc: 'Logo & Concept and Interior Design official booklets' },
    { title: 'What\'s New (Changelog)', cat: 'Docs', href: '/doc/?doc=changelog', desc: 'Version history, release notes, and latest updates' },
    { title: 'Vision & Mission Statement', cat: 'Docs', href: '/doc/?doc=vision-mission', desc: 'Canonical corporate purpose, vision, and core values' }
  ];

  let filteredResults = $derived(
    searchQuery.trim() === ''
      ? searchIndex.slice(0, 7)
      : searchIndex.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.cat.toLowerCase().includes(searchQuery.toLowerCase())
        )
  );

  function openSearch() {
    searchOpen = true;
    searchQuery = '';
    selectedSearchIndex = 0;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.getElementById('commandPaletteInput')?.focus();
    }, 50);
  }

  function closeSearch() {
    searchOpen = false;
    document.body.style.overflow = '';
  }

  function handleSearchKeydown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedSearchIndex = (selectedSearchIndex + 1) % filteredResults.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedSearchIndex = (selectedSearchIndex - 1 + filteredResults.length) % filteredResults.length;
    } else if (e.key === 'Enter' && filteredResults[selectedSearchIndex]) {
      e.preventDefault();
      window.location.href = filteredResults[selectedSearchIndex].href;
      closeSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
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
    initTheme();

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

    const handleGlobalKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchOpen) closeSearch();
        else openSearch();
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        openSearch();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleGlobalKeydown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  });
</script>

<header id="mainNavbar" class="f-navbar">
  <nav class="f-navbar-inner" aria-label="Global navigation">
    <!-- Brand -->
    <a class="f-navbar-brand" href="/" aria-label="Home">
      <img src={isDarkMode ? "/public/brand/logos/ss-logomark-dark.svg" : "/public/brand/logos/ss-logomark-light.svg"} class="logo" alt="SuamiSihat™ Icon" aria-hidden="true" loading="eager" style="height: 28px;">
      <span class="f-navbar-brand-name">SS Design System</span>
      <span class="f-navbar-version">v3.5.1</span>
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
            {#each docsLinksGroup1 as item}
              <li role="none">
                <a class="f-docs-dropdown-item" href={item.href} onclick={closeDocsDropdown} role="menuitem">
                  <iconify-icon icon={item.icon} aria-hidden="true" style="font-size:1rem; flex-shrink:0;"></iconify-icon>
                  {item.label}
                </a>
              </li>
            {/each}
            <li role="separator" class="f-docs-dropdown-divider" style="height: 1px; background: var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); margin: 4px 6px;"></li>
            {#each docsLinksGroup2 as item}
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

    <!-- Right Controls: Command Search, Theme & Mobile Toggle -->
    <div style="display:flex; align-items:center; gap:8px;">
      <!-- Quick Search Trigger -->
      <button 
        type="button" 
        class="f-nav-search-btn" 
        onclick={openSearch} 
        aria-label="Search design system (Ctrl+K)"
      >
        <iconify-icon icon="fluent:search-20-regular" style="font-size:1.05rem;"></iconify-icon>
        <span class="d-none d-md-inline" style="font-size:0.8rem; font-weight:500;">Search...</span>
        <kbd class="d-none d-md-inline" style="font-size:0.7rem; padding:2px 6px; border-radius:4px; background:var(--color-neutral-bg-3); border:1px solid var(--color-neutral-stroke-1); color:var(--color-neutral-fg-3);">Ctrl+K</kbd>
      </button>

      <!-- Theme Switcher -->
      <button 
        id="themeToggle" 
        class="f-theme-btn" 
        type="button" 
        onclick={(e) => { e.preventDefault(); toggleTheme(); }} 
        aria-label="Toggle dark mode" 
        aria-pressed={isDarkMode}
      >
        <iconify-icon icon={isDarkMode ? "fluent:weather-sunny-24-regular" : "fluent:weather-moon-24-regular"} style="font-size:1.1rem"></iconify-icon>
      </button>

      <!-- Mobile Hamburger -->
      <button id="mobileMenuBtn" class="f-mobile-menu-btn d-lg-none" onclick={openDrawer} aria-label="Open navigation menu" aria-expanded={drawerOpen} aria-controls="mobileDrawer">
        <iconify-icon icon="fluent:navigation-24-regular" style="font-size:1.2rem"></iconify-icon>
      </button>
    </div>
  </nav>
</header>

<!-- Global Command Palette / Spotlight Search Modal -->
{#if searchOpen}
  <div 
    class="f-spotlight-backdrop" 
    onclick={closeSearch}
    onkeydown={(e) => e.key === 'Escape' && closeSearch()}
    role="presentation"
  >
    <!-- Dialog container -->
    <div 
      class="f-spotlight-dialog" 
      onclick={(e) => e.stopPropagation()} 
      onkeydown={handleSearchKeydown}
      role="dialog" 
      aria-modal="true" 
      aria-label="Search Design System"
      tabindex="-1"
    >
      <!-- Search Input Header -->
      <div class="f-spotlight-header">
        <iconify-icon icon="fluent:search-24-regular" style="font-size:1.3rem; color:var(--color-brand-primary);"></iconify-icon>
        <input 
          id="commandPaletteInput"
          type="text" 
          class="f-spotlight-input"
          placeholder="Search tokens, components, products, guides... (Press Esc to exit)"
          bind:value={searchQuery}
        />
        {#if searchQuery}
          <button type="button" class="f-spotlight-clear" onclick={() => searchQuery = ''} aria-label="Clear query">
            <iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon>
          </button>
        {/if}
      </div>

      <!-- Quick Action Chips -->
      <div class="f-spotlight-chips">
        <span style="font-size:0.75rem; color:var(--color-neutral-fg-3); font-weight:600;">Quick jump:</span>
        <button type="button" class="f-spotlight-chip" onclick={() => searchQuery = 'Tokens'}>Tokens</button>
        <button type="button" class="f-spotlight-chip" onclick={() => searchQuery = 'Buttons'}>Buttons</button>
        <button type="button" class="f-spotlight-chip" onclick={() => searchQuery = 'ANDROLAB'}>ANDROLAB</button>
        <button type="button" class="f-spotlight-chip" onclick={() => searchQuery = 'Signature'}>Signature</button>
        <button type="button" class="f-spotlight-chip" onclick={() => searchQuery = 'Onboarding'}>Onboarding</button>
      </div>

      <!-- Search Results List -->
      <div class="f-spotlight-results">
        {#if filteredResults.length === 0}
          <div class="f-spotlight-empty">
            <iconify-icon icon="fluent:search-visual-24-regular" style="font-size:2.2rem; color:var(--color-neutral-fg-3); margin-bottom:8px;"></iconify-icon>
            <div style="font-size:0.9rem; font-weight:600; color:var(--color-neutral-fg-1);">No matching results found</div>
            <div style="font-size:0.8rem; color:var(--color-neutral-fg-3);">Try searching for "Buttons", "Tokens", "MENSS", or "Onboarding"</div>
          </div>
        {:else}
          {#each filteredResults as res, i}
            <a 
              href={res.href} 
              class="f-spotlight-item" 
              class:selected={selectedSearchIndex === i}
              onclick={closeSearch}
              onmouseenter={() => selectedSearchIndex = i}
            >
              <div class="f-spotlight-item-main">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <span class="f-spotlight-badge f-badge-{res.cat.toLowerCase()}">{res.cat}</span>
                  <span class="f-spotlight-item-title">{res.title}</span>
                </div>
                <div class="f-spotlight-item-desc">{res.desc}</div>
              </div>
              <iconify-icon icon="fluent:arrow-right-16-regular" class="f-spotlight-arrow"></iconify-icon>
            </a>
          {/each}
        {/if}
      </div>

      <!-- Footer Info -->
      <div class="f-spotlight-footer">
        <div class="d-flex align-items-center gap-3">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>Enter</kbd> to select</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
        <span style="color:var(--color-neutral-fg-3);">{filteredResults.length} items</span>
      </div>
    </div>
  </div>
{/if}

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
      <button class="f-drawer-link" style="background:none; border:none; width:100%; text-align:left; cursor:pointer;" onclick={() => { closeDrawer(); openSearch(); }}>
        <iconify-icon icon="fluent:search-24-regular" aria-hidden="true"></iconify-icon>Search Knowledge Base...
      </button>
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
      <div class="f-drawer-divider"></div>
      <button class="f-drawer-link" style="background:none; border:none; width:100%; text-align:left; cursor:pointer;" onclick={() => { toggleTheme(); }}>
        <iconify-icon icon={isDarkMode ? "fluent:weather-sunny-24-regular" : "fluent:weather-moon-24-regular"} aria-hidden="true"></iconify-icon>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
    <div class="f-drawer-footer">SuamiSihat™ Design System v3.5.1</div>
  </aside>
{/if}

<style>
  /* Search Button in Navbar */
  .f-nav-search-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: var(--f-radius-full, 9999px);
    background: var(--color-neutral-bg-3, rgba(0,0,0,0.04));
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
    color: var(--color-neutral-fg-2, #64748B);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .f-nav-search-btn:hover {
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    border-color: var(--color-brand-primary, #043388);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-nav-search-btn {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.12);
    color: #94A3B8;
  }

  /* Spotlight Search Backdrop */
  .f-spotlight-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(9, 13, 22, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    z-index: 99999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 10vh 1.5rem 2rem;
    animation: f-fade-in 0.18s ease;
  }

  /* Spotlight Dialog Modal */
  .f-spotlight-dialog {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-2, rgba(0,0,0,0.12));
    border-radius: var(--f-radius-2xl, 20px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.35);
    width: 100%;
    max-width: 680px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: f-fade-up 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  :global([data-theme="dark"]) .f-spotlight-dialog {
    background: #0F172A;
    border-color: rgba(255,255,255,0.15);
  }

  .f-spotlight-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08));
  }

  .f-spotlight-input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1.05rem;
    color: var(--color-neutral-fg-1, #1C1C1C);
    outline: none;
    font-family: inherit;
  }

  :global([data-theme="dark"]) .f-spotlight-input {
    color: #FFFFFF;
  }

  .f-spotlight-clear {
    background: none;
    border: none;
    color: var(--color-neutral-fg-3, #94A3B8);
    cursor: pointer;
    padding: 4px;
  }

  .f-spotlight-chips {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 1.25rem;
    background: var(--color-neutral-bg-3, #F8FAFC);
    border-bottom: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.06));
    overflow-x: auto;
  }

  :global([data-theme="dark"]) .f-spotlight-chips {
    background: #090D16;
  }

  .f-spotlight-chip {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.1));
    border-radius: var(--f-radius-full, 9999px);
    padding: 2px 10px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-neutral-fg-2, #475569);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.12s ease;
  }

  .f-spotlight-chip:hover {
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
    border-color: transparent;
  }

  :global([data-theme="dark"]) .f-spotlight-chip {
    background: #1E293B;
    border-color: rgba(255,255,255,0.1);
    color: #CBD5E1;
  }

  .f-spotlight-results {
    max-height: 380px;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .f-spotlight-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: var(--f-radius-lg, 12px);
    text-decoration: none;
    transition: background 0.12s ease;
    border: 1px solid transparent;
  }

  .f-spotlight-item:hover, .f-spotlight-item.selected {
    background: var(--color-brand-subtle, rgba(4,51,136,0.06));
    border-color: var(--color-brand-light, #21A1F7);
  }

  :global([data-theme="dark"]) .f-spotlight-item:hover,
  :global([data-theme="dark"]) .f-spotlight-item.selected {
    background: rgba(33,161,247,0.12);
    border-color: rgba(33,161,247,0.4);
  }

  .f-spotlight-item-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-neutral-fg-1, #1C1C1C);
  }

  :global([data-theme="dark"]) .f-spotlight-item-title {
    color: #F1F5F9;
  }

  .f-spotlight-item-desc {
    font-size: 0.775rem;
    color: var(--color-neutral-fg-3, #64748B);
    line-height: 1.35;
  }

  .f-spotlight-badge {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(4,51,136,0.1);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-spotlight-badge {
    background: rgba(33,161,247,0.2);
    color: #6DC6EC;
  }

  .f-spotlight-arrow {
    color: var(--color-neutral-fg-3, #94A3B8);
    font-size: 1rem;
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.15s ease;
  }

  .f-spotlight-item:hover .f-spotlight-arrow,
  .f-spotlight-item.selected .f-spotlight-arrow {
    opacity: 1;
    transform: translateX(0);
    color: var(--color-brand-primary, #043388);
  }

  .f-spotlight-empty {
    padding: 3rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .f-spotlight-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 1.25rem;
    background: var(--color-neutral-bg-3, #F8FAFC);
    border-top: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.06));
    font-size: 0.725rem;
    color: var(--color-neutral-fg-3, #64748B);
  }

  :global([data-theme="dark"]) .f-spotlight-footer {
    background: #090D16;
  }

  .f-spotlight-footer kbd {
    background: var(--color-neutral-bg-2, #FFFFFF);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.15));
    border-radius: 3px;
    padding: 1px 4px;
    font-size: 0.7rem;
    font-family: inherit;
  }

  :global([data-theme="dark"]) .f-spotlight-footer kbd {
    background: #1E293B;
  }

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
