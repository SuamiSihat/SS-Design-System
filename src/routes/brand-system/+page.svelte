<script>
  import { onMount } from 'svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';

  let isSidebarMinimized = $state(false);
  let logoVariant = $state('dark');
  let exportPlatform = $state('tailwind');
  let copyToastText = $state('');
  let showToast = $state(false);

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  function copyHex(hex, name) {
    navigator.clipboard.writeText(hex);
    copyToastText = `Copied ${name || hex} (${hex}) to clipboard!`;
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 2200);
  }

  const tokenExports = {
    tailwind: `// tailwind.config.js - SuamiSihat™ Fluent 2 Design Tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        'ss-prussian-blue': '#022057',
        'ss-blue': '#043388',
        'ss-azure': '#21A1F7',
        'ss-malibu': '#6DC6EC',
        'ss-banana-yellow': '#F7E143',
        'ss-neutral-black': '#1C1C1C',
        'ss-canvas-light': '#F8FAFC',
        'ss-void-dark': '#090D16',
      }
    }
  }
};`,
    flutter: `// ss_colors.dart - SuamiSihat™ Flutter Design Tokens
import 'package:flutter/material.dart';

class SSColors {
  static const Color prussianBlue = Color(0xFF022057);
  static const Color ssBlue = Color(0xFF043388);
  static const Color azure = Color(0xFF21A1F7);
  static const Color malibu = Color(0xFF6DC6EC);
  static const Color bananaYellow = Color(0xFFF7E143);
  static const Color neutralBlack = Color(0xFF1C1C1C);
  static const Color canvasLight = Color(0xFFF8FAFC);
  static const Color voidDark = Color(0xFF090D16);
}`,
    wpf: `<!-- SSColors.xaml - SuamiSihat™ WPF XAML Tokens -->
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <SolidColorBrush x:Key="SS.PrussianBlue" Color="#022057"/>
    <SolidColorBrush x:Key="SS.Blue" Color="#043388"/>
    <SolidColorBrush x:Key="SS.Azure" Color="#21A1F7"/>
    <SolidColorBrush x:Key="SS.Malibu" Color="#6DC6EC"/>
    <SolidColorBrush x:Key="SS.BananaYellow" Color="#F7E143"/>
    <SolidColorBrush x:Key="SS.NeutralBlack" Color="#1C1C1C"/>
    <SolidColorBrush x:Key="SS.CanvasLight" Color="#F8FAFC"/>
    <SolidColorBrush x:Key="SS.VoidDark" Color="#090D16"/>
</ResourceDictionary>`,
    css: `/* ss_tokens.css - SuamiSihat™ W3C CSS Variables */
:root {
  --ss-prussian-blue: #022057;
  --ss-blue: #043388;
  --ss-azure: #21A1F7;
  --ss-malibu: #6DC6EC;
  --ss-banana-yellow: #F7E143;
  --ss-neutral-black: #1C1C1C;
  --ss-canvas-light: #F8FAFC;
  --ss-void-dark: #090D16;
}`,
    json: `{
  "color": {
    "brand": {
      "prussian-blue": { "value": "#022057", "type": "color" },
      "ss-blue": { "value": "#043388", "type": "color" },
      "azure": { "value": "#21A1F7", "type": "color" },
      "malibu": { "value": "#6DC6EC", "type": "color" },
      "banana-yellow": { "value": "#F7E143", "type": "color" },
      "neutral-black": { "value": "#1C1C1C", "type": "color" }
    }
  }
}`
  };
</script>

<svelte:head>
  <title>Brand System — SuamiSihat™ Design System</title>
</svelte:head>

<div class="f-page-layout" class:sidebar-minimized={isSidebarMinimized} id="pageLayout" style="display: grid; grid-template-columns: {isSidebarMinimized ? '0 1fr' : '260px 1fr'}; min-height: calc(100vh - 60px); position: relative; transition: all 0.3s ease;">
  <!-- Sidebar Toggle -->
  <button class="f-sidebar-toggle" onclick={toggleSidebar} aria-label="Toggle sidebar" style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;">
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Sidebar Navigation -->
  <aside class="f-sidebar" id="pageSidebar" aria-label="Brand system navigation" style="display: {isSidebarMinimized ? 'none' : 'block'};">
    <p class="brand-sidebar-title">Brand System</p>
    <ul class="brand-sidebar-nav">
      <li><a href="#logomark"><span class="nav-icon"><iconify-icon icon="fluent:trophy-24-regular"></iconify-icon></span>Logomark</a></li>
      <li><a href="#colour"><span class="nav-icon"><iconify-icon icon="fluent:color-24-regular"></iconify-icon></span>Colour</a></li>
      <li><a href="#sixty-thirty-ten"><span class="nav-icon"><iconify-icon icon="fluent:fraction-24-regular"></iconify-icon></span>60:30:10 Rule</a></li>
      <li><a href="#typography"><span class="nav-icon"><iconify-icon icon="fluent:text-field-24-regular"></iconify-icon></span>Typography</a></li>
      <li><a href="#subbrand"><span class="nav-icon"><iconify-icon icon="fluent:layer-diagonal-24-regular"></iconify-icon></span>Sub-Brands</a></li>
      <li><a href="#downloads"><span class="nav-icon"><iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon></span>Downloads</a></li>
      <li><a href="#architecture"><span class="nav-icon"><iconify-icon icon="fluent:org-chart-24-regular"></iconify-icon></span>Architecture</a></li>
      <li><a href="#tokens-export"><span class="nav-icon"><iconify-icon icon="fluent:code-24-regular"></iconify-icon></span>Tokens Export</a></li>
    </ul>
  </aside>

  <!-- Main Content -->
  <main class="brand-main f-main-content" id="main-content" style="padding: 2.5rem; max-width: 1200px;">
    <!-- Breadcrumb -->
    <nav class="brand-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <iconify-icon icon="fluent:chevron-right-12-regular"></iconify-icon>
      <span style="color:var(--color-neutral-fg-1);font-weight:600;">Brand System</span>
    </nav>

    <!-- Page Header -->
    <div style="margin-bottom: var(--f-space-10);">
      <div class="bs-section-eyebrow">Design Language Standard</div>
      <h1 class="bs-section-title">Brand System &amp; Visual Identity</h1>
      <p class="bs-section-desc">The authoritative single source of truth for SuamiSihat™ vector marks, typography scales, Fluent 2 design tokens, and multi-platform color hierarchies.</p>
    </div>

    <!-- ================================================================
         1. LOGOMARK SECTION
         ================================================================ -->
    <section id="logomark" class="bs-section" style="margin-bottom: 4rem;">
      <div class="bs-section-eyebrow">01 &middot; Visual Marks</div>
      <h2 class="bs-section-title">Logomark &amp; Master Identity</h2>
      <p class="bs-section-desc">The official SuamiSihat™ mark represents medical precision, vitality, and masculine dignity. Use primary full marks on core touchpoints and logomarks on compact digital apps.</p>

      <!-- Interactive Logo Picker -->
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);margin-bottom:var(--f-space-6);">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);flex-wrap:wrap;gap:0.5rem;">
          <span style="font-size:0.875rem;font-weight:700;color:var(--color-neutral-fg-1);">Interactive Logo Variant Viewer</span>
          <div style="display:flex;gap:0.5rem;">
            <button class="btn btn-sm" class:btn-primary={logoVariant === 'dark'} class:btn-outline-secondary={logoVariant !== 'dark'} onclick={() => (logoVariant = 'dark')}>Primary Dark Surface</button>
            <button class="btn btn-sm" class:btn-primary={logoVariant === 'light'} class:btn-outline-secondary={logoVariant !== 'light'} onclick={() => (logoVariant = 'light')}>Primary Light Surface</button>
            <button class="btn btn-sm" class:btn-primary={logoVariant === 'mono'} class:btn-outline-secondary={logoVariant !== 'mono'} onclick={() => (logoVariant = 'mono')}>Monochrome</button>
          </div>
        </div>
        <div style="padding: 3.5rem; display: flex; align-items: center; justify-content: center; min-height: 260px; background: {logoVariant === 'dark' ? '#022057' : (logoVariant === 'mono' ? '#F1F5F9' : '#FFFFFF')}; transition: background 0.3s ease;">
          {#if logoVariant === 'dark'}
            <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg" alt="SuamiSihat Primary Dark" style="max-height: 120px; max-width: 90%; filter: drop-shadow(0 4px 16px rgba(0,0,0,0.2));" />
          {:else if logoVariant === 'light'}
            <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg" alt="SuamiSihat Primary Light" style="max-height: 120px; max-width: 90%; filter: drop-shadow(0 4px 16px rgba(0,0,0,0.08));" />
          {:else}
            <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_mono.svg" alt="SuamiSihat Primary Mono" style="max-height: 120px; max-width: 90%;" />
          {/if}
        </div>
        <div style="padding: 0.75rem 1.5rem; background: var(--color-neutral-bg-3); border-top: 1px solid var(--color-neutral-stroke-1); font-size: 0.78rem; color: var(--color-neutral-fg-2);">
          <strong>Variant:</strong> {logoVariant === 'dark' ? 'Primary on Dark (#022057 Prussian Blue)' : (logoVariant === 'light' ? 'Primary on Light (#FFFFFF / #F8FAFC)' : 'Single Color Black / Grayscale')} &bull; Clean vector SVG
        </div>
      </div>
    </section>

    <!-- ================================================================
         2. COLOUR & 60:30:10 RULE
         ================================================================ -->
    <section id="colour" class="bs-section" style="margin-bottom: 4rem;">
      <div class="bs-section-eyebrow">02 &middot; Color Palette</div>
      <h2 class="bs-section-title">Brand Color Palette &amp; Fluent 2 Tokens</h2>
      <p class="bs-section-desc">Click any swatch to copy its HEX value to your clipboard.</p>

      <div class="bs-colour-group-label">Core Brand &amp; Structural Trust</div>
      <div class="bs-colour-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem;">
        <!-- Prussian Blue -->
        <div class="bs-swatch-card" onclick={() => copyHex('#022057', 'SS Prussian Blue')} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && copyHex('#022057', 'SS Prussian Blue')}>
          <div class="bs-swatch-color" style="background:#022057;height:100px;"></div>
          <div class="bs-swatch-body" style="padding:1rem;">
            <div class="bs-swatch-name" style="font-weight:700;">SS Prussian Blue</div>
            <div class="bs-swatch-hex" style="font-family:monospace;color:var(--color-brand-primary);">#022057</div>
            <div class="bs-swatch-token" style="font-size:0.75rem;color:var(--color-neutral-fg-3);">--ss-prussian-blue</div>
          </div>
        </div>

        <!-- SS Blue -->
        <div class="bs-swatch-card" onclick={() => copyHex('#043388', 'SS Blue')} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && copyHex('#043388', 'SS Blue')}>
          <div class="bs-swatch-color" style="background:#043388;height:100px;"></div>
          <div class="bs-swatch-body" style="padding:1rem;">
            <div class="bs-swatch-name" style="font-weight:700;">SS Blue</div>
            <div class="bs-swatch-hex" style="font-family:monospace;color:var(--color-brand-primary);">#043388</div>
            <div class="bs-swatch-token" style="font-size:0.75rem;color:var(--color-neutral-fg-3);">--ss-blue</div>
          </div>
        </div>

        <!-- Azure Accent -->
        <div class="bs-swatch-card" onclick={() => copyHex('#21A1F7', 'Azure Accent')} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && copyHex('#21A1F7', 'Azure Accent')}>
          <div class="bs-swatch-color" style="background:#21A1F7;height:100px;"></div>
          <div class="bs-swatch-body" style="padding:1rem;">
            <div class="bs-swatch-name" style="font-weight:700;">Azure (10% Accent)</div>
            <div class="bs-swatch-hex" style="font-family:monospace;color:var(--color-brand-primary);">#21A1F7</div>
            <div class="bs-swatch-token" style="font-size:0.75rem;color:var(--color-neutral-fg-3);">--ss-azure</div>
          </div>
        </div>

        <!-- Malibu -->
        <div class="bs-swatch-card" onclick={() => copyHex('#6DC6EC', 'Malibu')} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && copyHex('#6DC6EC', 'Malibu')}>
          <div class="bs-swatch-color" style="background:#6DC6EC;height:100px;"></div>
          <div class="bs-swatch-body" style="padding:1rem;">
            <div class="bs-swatch-name" style="font-weight:700;">Malibu</div>
            <div class="bs-swatch-hex" style="font-family:monospace;color:var(--color-brand-primary);">#6DC6EC</div>
            <div class="bs-swatch-token" style="font-size:0.75rem;color:var(--color-neutral-fg-3);">--ss-malibu</div>
          </div>
        </div>

        <!-- Neutral Black Typography -->
        <div class="bs-swatch-card" onclick={() => copyHex('#1C1C1C', 'Neutral Black')} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && copyHex('#1C1C1C', 'Neutral Black')}>
          <div class="bs-swatch-color" style="background:#1C1C1C;height:100px;"></div>
          <div class="bs-swatch-body" style="padding:1rem;">
            <div class="bs-swatch-name" style="font-weight:700;">Neutral Black Typography</div>
            <div class="bs-swatch-hex" style="font-family:monospace;color:var(--color-brand-primary);">#1C1C1C</div>
            <div class="bs-swatch-token" style="font-size:0.75rem;color:var(--color-neutral-fg-3);">--ss-neutral-black</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         3. 60:30:10 RULE SHOWCASE
         ================================================================ -->
    <section id="sixty-thirty-ten" class="bs-section" style="margin-bottom: 4rem;">
      <div class="bs-section-eyebrow">03 &middot; Visual Hierarchy</div>
      <h2 class="bs-section-title">The 60:30:10 Visual Allocation Standard</h2>
      <p class="bs-section-desc">Every interface across web, mobile apps, and clinical portals strictly adheres to this ratio.</p>

      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);padding:1.75rem;box-shadow:var(--f-shadow-4);">
        <!-- Proportion Bar -->
        <div style="display:flex;height:24px;border-radius:var(--f-radius-md);overflow:hidden;margin-bottom:var(--f-space-4);box-shadow:var(--f-shadow-4);">
          <div style="flex:60;background:#F8FAFC;border-right:2px solid var(--color-neutral-stroke-2);" title="60% Foundation"></div>
          <div style="flex:30;background:#022057;border-right:2px solid var(--color-neutral-stroke-2);" title="30% Secondary"></div>
          <div style="flex:10;background:#21A1F7;" title="10% Azure Accent"></div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;font-size:0.8rem;font-weight:600;">
          <div><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#F8FAFC;border:1px solid #CBD5E1;margin-right:4px;"></span><strong>60%</strong> Foundation (Canvas &amp; Whitespace)</div>
          <div><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#022057;margin-right:4px;"></span><strong>30%</strong> Secondary (Structure &amp; Cards)</div>
          <div><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#21A1F7;margin-right:4px;"></span><strong>10%</strong> Accent (Primary CTA &mdash; Azure)</div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         4. SUB-BRANDS
         ================================================================ -->
    <section id="subbrand" class="bs-section" style="margin-bottom: 4rem;">
      <div class="bs-section-eyebrow">04 &middot; Brand Architecture</div>
      <h2 class="bs-section-title">Operating Sub-Brands</h2>
      <p class="bs-section-desc">Unified corporate identity standard for the five operational pillars of SuamiSihat™.</p>

      <div class="f-subbrand-grid">
        <!-- SSH -->
        <div class="f-subbrand-card">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSH</span>
            <span class="f-subbrand-status-dot"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg" alt="SSH Logo" loading="lazy" />
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Holding</div>
            <div class="f-subbrand-desc">Corporate governance, investor relations, and strategic steering.</div>
          </div>
        </div>

        <!-- SSC -->
        <div class="f-subbrand-card">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSC</span>
            <span class="f-subbrand-status-dot"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src="/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.svg" alt="SSC Logo" loading="lazy" />
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Clinic</div>
            <div class="f-subbrand-desc">Clinical excellence, physical medical centres, and patient care.</div>
          </div>
        </div>

        <!-- SSG -->
        <div class="f-subbrand-card">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSG</span>
            <span class="f-subbrand-status-dot"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg" alt="SSG Logo" loading="lazy" />
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Group</div>
            <div class="f-subbrand-desc">Health consultations, group initiatives, and community outreach.</div>
          </div>
        </div>

        <!-- SSE -->
        <div class="f-subbrand-card">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SSE</span>
            <span class="f-subbrand-status-dot"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src="/public/brand/logos/04_logo_ssEcom/logo_sse_primary_light.svg" alt="SSE Logo" loading="lazy" />
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Ecommerce</div>
            <div class="f-subbrand-desc">Direct-to-consumer health products, discretion, and delivery.</div>
          </div>
        </div>

        <!-- SST -->
        <div class="f-subbrand-card">
          <div class="f-subbrand-card-top">
            <span class="f-subbrand-pill">SST</span>
            <span class="f-subbrand-status-dot"></span>
          </div>
          <div class="f-subbrand-logo-wrap">
            <img src="/public/brand/logos/05_logo_ssTech/logo_sst_primary_light.svg" alt="SST Logo" loading="lazy" />
          </div>
          <div class="f-subbrand-card-body">
            <div class="f-subbrand-name">SS Technology</div>
            <div class="f-subbrand-desc">HealthTech systems, patient portals, and core infrastructure.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         5. MULTI-PLATFORM TOKENS EXPORT
         ================================================================ -->
    <section id="tokens-export" class="bs-section" style="margin-bottom: 4rem;">
      <div class="bs-section-eyebrow">05 &middot; Developer Handoff</div>
      <h2 class="bs-section-title">Multi-Platform Token Exporters</h2>
      <p class="bs-section-desc">Instantly export standardized design tokens ready for production deployment across Web, Flutter, and WPF desktop.</p>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <button class="btn btn-sm" class:btn-primary={exportPlatform === 'tailwind'} class:btn-outline-secondary={exportPlatform !== 'tailwind'} onclick={() => (exportPlatform = 'tailwind')}>Tailwind CSS</button>
        <button class="btn btn-sm" class:btn-primary={exportPlatform === 'flutter'} class:btn-outline-secondary={exportPlatform !== 'flutter'} onclick={() => (exportPlatform = 'flutter')}>Flutter (Dart)</button>
        <button class="btn btn-sm" class:btn-primary={exportPlatform === 'wpf'} class:btn-outline-secondary={exportPlatform !== 'wpf'} onclick={() => (exportPlatform = 'wpf')}>WPF (XAML)</button>
        <button class="btn btn-sm" class:btn-primary={exportPlatform === 'css'} class:btn-outline-secondary={exportPlatform !== 'css'} onclick={() => (exportPlatform = 'css')}>CSS Variables</button>
        <button class="btn btn-sm" class:btn-primary={exportPlatform === 'json'} class:btn-outline-secondary={exportPlatform !== 'json'} onclick={() => (exportPlatform = 'json')}>W3C JSON</button>
      </div>

      <CodeBox code={tokenExports[exportPlatform]} language={exportPlatform === 'flutter' ? 'dart' : (exportPlatform === 'wpf' ? 'xml' : (exportPlatform === 'json' ? 'json' : 'javascript'))} />
    </section>
  </main>
</div>

<!-- Copy Toast -->
{#if showToast}
  <div class="bs-copy-toast show" style="position: fixed; bottom: 1.5rem; right: 1.5rem; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-left: 4px solid #16A34A; border-radius: 8px; padding: 0.75rem 1.25rem; box-shadow: var(--f-shadow-16); font-size: 0.85rem; font-weight: 600; color: var(--color-neutral-fg-1); z-index: 2000;">
    {copyToastText}
  </div>
{/if}
