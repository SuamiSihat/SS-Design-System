<script>
  import { onMount } from 'svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';

  let isSidebarMinimized = $state(false);
  let activeLogoColor = $state('#022057');
  let activeLogoImg = $state('/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg');
  let exportPlatform = $state('tailwind');
  let copyToastText = $state('');
  let showToast = $state(false);

  function selectLogoSwatch(swatch) {
    activeLogoColor = swatch.color;
    activeLogoImg = swatch.img;
    if (typeof document !== 'undefined') {
      const stage = document.getElementById('logoContrastStage');
      const img = document.getElementById('logoContrastImg');
      const info = document.getElementById('logoContrastInfo');
      if (stage) stage.style.backgroundColor = swatch.color;
      if (img) {
        img.src = swatch.img;
        img.alt = `SuamiSihat Logo on ${swatch.color}`;
      }
      if (info) {
        info.innerHTML = `<iconify-icon icon="fluent:info-24-regular" style="font-size:0.875rem;margin-right:6px;vertical-align:middle;color:var(--color-brand-primary)"></iconify-icon> Current background: <strong>${swatch.color}</strong> &bull; Auto-selected logo file: <code>${swatch.img.split('/').pop()}</code>`;
      }
    }
  }

  // Logomark icon toggle mode and surfaces
  let logomarkMode = $state('light');

  function setLogomarkMode(mode) {
    logomarkMode = mode;
    if (typeof document !== 'undefined') {
      const img = document.getElementById('logomarkImg');
      const stage = document.getElementById('logomarkStage');
      if (img) {
        img.src = mode === 'dark' ? '/public/brand/logos/ss-logomark-dark.svg' : '/public/brand/logos/ss-logomark-light.svg';
        img.alt = `SS Logomark Icon on ${mode === 'dark' ? '#022057' : '#FCFAF6'}`;
      }
      if (stage) {
        stage.style.backgroundColor = mode === 'dark' ? '#022057' : '#FCFAF6';
      }
    }
  }

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  function copyHex(hex, name, customMsg) {
    navigator.clipboard.writeText(hex);
    copyToastText = customMsg || `Copied ${name || hex} (${hex}) to clipboard!`;
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 2200);
  }

  const logoSwatches = [
    { name: 'Black', color: '#000000', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Prussian', color: '#022057', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'SS Blue', color: '#043388', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Azure', color: '#21A1F7', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Malibu', color: '#6DC6EC', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg' },
    { name: 'Banana', color: '#FCE53D', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Arylide', color: '#E5D15C', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Lion', color: '#BD9A73', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Fawn', color: '#CCAC8D', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'White', color: '#FFFFFF', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg' },
    { name: 'Mono', color: '#F5F5F5', img: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_mono.svg' }
  ];

  const brandColors = [
    {
      group: 'Primary Official Palette',
      items: [
        {
          name: 'SS Prussian Blue',
          token: '--ss-prussian-blue',
          hex: '#022057',
          rgb: 'rgb(2, 32, 87)',
          cmyk: '98, 63, 0, 66',
          lab: 'L:14.1, a:11.2, b:-37.8',
          bal_ral: 'RAL 5013 (Cobalt Blue) · BAL 20 C 40',
          pantone: 'Pantone 281 C',
          role: '30% Secondary & Foundation Structure (Clinical Authority)',
          textColor: '#FFFFFF'
        },
        {
          name: 'SS Blue',
          token: '--ss-blue',
          hex: '#043388',
          rgb: 'rgb(4, 51, 136)',
          cmyk: '97, 63, 0, 47',
          lab: 'L:24.3, a:16.8, b:-53.4',
          bal_ral: 'RAL 5002 (Ultramarine Blue) · BAL 20 C 39',
          pantone: 'Pantone 287 C',
          role: 'Core Corporate Identity & Brand Seal',
          textColor: '#FFFFFF'
        },
        {
          name: 'Azure (10% Accent)',
          token: '--ss-azure',
          hex: '#21A1F7',
          rgb: 'rgb(33, 161, 247)',
          cmyk: '87, 35, 0, 3',
          lab: 'L:64.5, a:-7.6, b:-53.9',
          bal_ral: 'RAL 5012 (Light Blue) · BAL 18 E 53',
          pantone: 'Pantone 299 C',
          role: '10% High-Conversion Interactive Accent & Primary Buttons',
          textColor: '#FFFFFF'
        },
        {
          name: 'Malibu',
          token: '--ss-malibu',
          hex: '#6DC6EC',
          rgb: 'rgb(109, 198, 236)',
          cmyk: '54, 16, 0, 7',
          lab: 'L:76.8, a:-18.2, b:-28.9',
          bal_ral: 'RAL 5024 (Pastel Blue) · BAL 18 C 35',
          pantone: 'Pantone 297 C',
          role: 'Tint Accent, Glows, & Light Interactive State Washes',
          textColor: '#1C1C1C'
        },
        {
          name: 'Neutral Black',
          token: '--ss-neutral-black',
          hex: '#1C1C1C',
          rgb: 'rgb(28, 28, 28)',
          cmyk: '0, 0, 0, 89',
          lab: 'L:11.2, a:0.0, b:0.0',
          bal_ral: 'RAL 9005 (Jet Black) · BAL 00 E 53',
          pantone: 'Pantone Black 6 C',
          role: 'Default Text on Light Mode (Carbon / Neutral Black Typography)',
          textColor: '#FFFFFF'
        },
        {
          name: 'Neutral White (Porcelain)',
          token: '--ss-neutral-white',
          hex: '#FCFAF6',
          rgb: 'rgb(252, 250, 246)',
          cmyk: '0, 1, 2, 1',
          lab: 'L:98.5, a:-0.2, b:2.4',
          bal_ral: 'RAL 9003 (Signal White) · BAL 00 E 55',
          pantone: 'Pantone 705 C',
          role: 'Default Text on Dark Mode & Base Light Canvas Surface',
          textColor: '#1C1C1C'
        }
      ]
    },
    {
      group: 'Secondary Warm & Accent Palette',
      items: [
        {
          name: 'Lion',
          token: '--ss-lion',
          hex: '#BD9A73',
          rgb: 'rgb(189, 154, 115)',
          cmyk: '0, 19, 39, 26',
          lab: 'L:65.2, a:8.7, b:25.8',
          bal_ral: 'RAL 1024 (Ochre Yellow) · BAL 08 C 35',
          pantone: 'Pantone 4655 C',
          role: 'Premium Gold Accent & Clinical Seal Border',
          textColor: '#1C1C1C'
        },
        {
          name: 'Fawn',
          token: '--ss-fawn',
          hex: '#CCAC8D',
          rgb: 'rgb(204, 172, 141)',
          cmyk: '0, 16, 31, 20',
          lab: 'L:72.1, a:7.9, b:20.8',
          bal_ral: 'RAL 1015 (Light Ivory) · BAL 08 C 31',
          pantone: 'Pantone 4665 C',
          role: 'Subtle Warm Surface & Secondary Badge Tone',
          textColor: '#1C1C1C'
        },
        {
          name: 'Arylide Yellow',
          token: '--ss-arylide',
          hex: '#E5D15C',
          rgb: 'rgb(229, 209, 92)',
          cmyk: '0, 9, 60, 10',
          lab: 'L:83.4, a:-6.1, b:59.3',
          bal_ral: 'RAL 1018 (Zinc Yellow) · BAL 10 E 50',
          pantone: 'Pantone 108 C',
          role: 'Vitality Highlight & Star Rating Fill',
          textColor: '#1C1C1C'
        },
        {
          name: 'Banana Yellow',
          token: '--ss-banana',
          hex: '#FCE53D',
          rgb: 'rgb(252, 229, 61)',
          cmyk: '0, 9, 76, 1',
          lab: 'L:90.8, a:-7.5, b:81.2',
          bal_ral: 'RAL 1016 (Sulfur Yellow) · BAL 10 E 53',
          pantone: 'Pantone 102 C',
          role: 'High-Visibility Conversion Badges & Yellow CTA',
          textColor: '#1C1C1C'
        }
      ]
    },
    {
      group: 'Foundation Surfaces & Semantic Tokens',
      items: [
        {
          name: 'Canvas Light (60%)',
          token: '--f-color-canvas-light',
          hex: '#F8FAFC',
          rgb: 'rgb(248, 250, 252)',
          cmyk: '2, 1, 0, 1',
          lab: 'L:98.1, a:-0.6, b:-1.2',
          bal_ral: 'RAL 9003 (Signal White) · BAL 00 E 55',
          pantone: 'Pantone 705 C',
          role: '60% Light Mode Canvas & Layout Background',
          textColor: '#1C1C1C'
        },
        {
          name: 'Void Dark (60%)',
          token: '--f-color-void-dark',
          hex: '#090D16',
          rgb: 'rgb(9, 13, 22)',
          cmyk: '59, 41, 0, 91',
          lab: 'L:4.8, a:0.8, b:-6.7',
          bal_ral: 'RAL 9017 (Traffic Black) · BAL 00 E 53',
          pantone: 'Pantone Black 7 C',
          role: '60% Dark Mode Canvas & Deep Void Atmosphere',
          textColor: '#FFFFFF'
        },
        {
          name: 'Mica Surface (Cards)',
          token: '--color-neutral-bg-1',
          hex: '#FFFFFF',
          rgb: 'rgb(255, 255, 255)',
          cmyk: '0, 0, 0, 0',
          lab: 'L:100.0, a:0.0, b:0.0',
          bal_ral: 'RAL 9016 (Traffic White) · BAL 00 E 55',
          pantone: 'Pantone White',
          role: 'Elevated Container Surface, Modals & Floating Cards',
          textColor: '#1C1C1C'
        },
        {
          name: 'Semantic Success',
          token: '--color-brand-success',
          hex: '#107C10',
          rgb: 'rgb(16, 124, 16)',
          cmyk: '87, 0, 87, 51',
          lab: 'L:45.3, a:-46.2, b:44.1',
          bal_ral: 'RAL 6029 (Mint Green) · BAL 14 E 53',
          pantone: 'Pantone 355 C',
          role: 'Success Feedback, Verified Badges & Positive Status',
          textColor: '#FFFFFF'
        },
        {
          name: 'Semantic Warning',
          token: '--color-brand-warning',
          hex: '#D83B01',
          rgb: 'rgb(216, 59, 1)',
          cmyk: '0, 73, 100, 15',
          lab: 'L:47.8, a:58.2, b:58.9',
          bal_ral: 'RAL 2004 (Pure Orange) · BAL 04 E 55',
          pantone: 'Pantone 1665 C',
          role: 'Low Inventory, Caution Banners & Prescription Expiry',
          textColor: '#FFFFFF'
        },
        {
          name: 'Semantic Error / Danger',
          token: '--color-brand-error',
          hex: '#A80000',
          rgb: 'rgb(168, 0, 0)',
          cmyk: '0, 100, 100, 34',
          lab: 'L:32.4, a:58.8, b:47.1',
          bal_ral: 'RAL 3020 (Traffic Red) · BAL 04 E 58',
          pantone: 'Pantone 186 C',
          role: 'Critical Clinical Alerts, Destructive CTA & Errors',
          textColor: '#FFFFFF'
        }
      ]
    }
  ];

  onMount(() => {
    // Expose helpers globally on window
    if (typeof window !== 'undefined') {
      window.selectLogoSwatch = selectLogoSwatch;
      window.selectLogomark = selectLogomark;
      window.setLogomarkMode = setLogomarkMode;
      window.copyHex = copyHex;
    }

    // Direct event listener binding for logoSwatches
    document.querySelectorAll('.logo-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        const img = btn.getAttribute('data-img');
        const name = btn.getAttribute('data-name');
        if (color && img) {
          selectLogoSwatch({ color, img, name });
          document.querySelectorAll('.logo-swatch-btn').forEach(b => {
            b.classList.remove('ss-btn-primary');
            b.classList.add('ss-btn-secondary');
          });
          btn.classList.remove('ss-btn-secondary');
          btn.classList.add('ss-btn-primary');
        }
      });
    });

    // Direct event listener binding for logomarkSwatches
    document.querySelectorAll('.logomark-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        const img = btn.getAttribute('data-img');
        const name = btn.getAttribute('data-name');
        if (color && img) {
          selectLogomark({ color, img, name });
          document.querySelectorAll('.logomark-swatch-btn').forEach(b => {
            b.classList.remove('ss-btn-primary');
            b.classList.add('ss-btn-secondary');
          });
          btn.classList.remove('ss-btn-secondary');
          btn.classList.add('ss-btn-primary');
        }
      });
    });

    // Direct binding for light/dark mode buttons
    document.getElementById('btnLogomarkLight')?.addEventListener('click', () => setLogomarkMode('light'));
    document.getElementById('btnLogomarkDark')?.addEventListener('click', () => setLogomarkMode('dark'));

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.brand-sidebar-nav a').forEach(l => l.classList.remove('active'));
            document.querySelector(`.brand-sidebar-nav a[href="#${e.target.id}"]`)?.classList.add('active');
          }
        });
      },
      { threshold: 0.15, rootMargin: '-5% 0px -65% 0px' }
    );

    document.querySelectorAll('.bs-section[id]').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  });

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
        'ss-banana-yellow': '#FCE53D',
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
  static const Color bananaYellow = Color(0xFFFCE53D);
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
    <SolidColorBrush x:Key="SS.BananaYellow" Color="#FCE53D"/>
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
  --ss-banana-yellow: #FCE53D;
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
      "banana-yellow": { "value": "#FCE53D", "type": "color" },
      "neutral-black": { "value": "#1C1C1C", "type": "color" }
    }
  }
}`
  };
</script>

<svelte:head>
  <title>Brand System — SuamiSihat™ Design System</title>
</svelte:head>

<div
  class="f-page-layout"
  class:sidebar-minimized={isSidebarMinimized}
  id="pageLayout"
  style="display: grid; grid-template-columns: {isSidebarMinimized ? 'minmax(0, 1fr)' : '260px minmax(0, 1fr)'}; min-height: calc(100vh - 60px); position: relative; transition: grid-template-columns 0.3s ease; width: 100%;"
>
  <!-- Sidebar Toggle -->
  <button
    type="button"
    class="f-sidebar-toggle"
    onclick={toggleSidebar}
    aria-label={isSidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-2); color: var(--color-neutral-fg-2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Sidebar Navigation -->
  {#if !isSidebarMinimized}
    <aside class="f-sidebar" id="pageSidebar" aria-label="Brand system navigation" style="background: var(--color-neutral-bg-2); border-right: 1px solid var(--color-neutral-stroke-1); padding: 1.5rem 0.75rem; position: sticky; top: 60px; height: calc(100vh - 60px); overflow-y: auto;">
      <p class="brand-sidebar-title" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3); padding: 0.5rem; margin: 0;">Brand System</p>
      <ul class="brand-sidebar-nav" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
        <li><a href="#logomark" class="cl-sidebar-link"><iconify-icon icon="fluent:trophy-24-regular"></iconify-icon> Logomark</a></li>
        <li><a href="#colour" class="cl-sidebar-link"><iconify-icon icon="fluent:color-24-regular"></iconify-icon> Colour System</a></li>
        <li><a href="#patterns" class="cl-sidebar-link"><iconify-icon icon="fluent:color-background-24-regular"></iconify-icon> Color Patterns</a></li>
        <li><a href="#typography" class="cl-sidebar-link"><iconify-icon icon="fluent:text-field-24-regular"></iconify-icon> Typography</a></li>
        <li><a href="#subbrand" class="cl-sidebar-link"><iconify-icon icon="fluent:layer-diagonal-24-regular"></iconify-icon> Sub-Brands</a></li>
        <li><a href="#icons" class="cl-sidebar-link"><iconify-icon icon="fluent:shapes-24-regular"></iconify-icon> Icons & Usage</a></li>
        <li><a href="#downloads" class="cl-sidebar-link"><iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon> Download Kits</a></li>
        <li><a href="#client-representation" class="cl-sidebar-link"><iconify-icon icon="fluent:shield-person-24-regular"></iconify-icon> Client Dignity</a></li>
        <li><a href="#tokens-export" class="cl-sidebar-link"><iconify-icon icon="fluent:code-24-regular"></iconify-icon> Tokens Export</a></li>
      </ul>
    </aside>
  {/if}

  <!-- Main Content -->
  <main class="brand-main f-main-content" id="main-content" style="padding: 2.5rem clamp(1.5rem, 4vw, 4rem); width: 100%; min-width: 0; box-sizing: border-box;">
    <!-- Breadcrumb -->
    <nav class="brand-breadcrumb" aria-label="Breadcrumb" style="font-size: 0.8rem; display: flex; align-items: center; gap: 8px; margin-bottom: 1rem;">
      <a href="/" style="color: var(--color-neutral-fg-3); text-decoration: none;">Home</a>
      <iconify-icon icon="fluent:chevron-right-12-regular" style="color: var(--color-neutral-fg-3);"></iconify-icon>
      <span style="color:var(--color-neutral-fg-1);font-weight:600;">Brand System</span>
    </nav>

    <!-- Page Header -->
    <div style="margin-bottom: 2rem;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">Design Language Standard</div>
      <h1 class="bs-section-title" style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.75rem; color: var(--color-neutral-fg-1);">Brand System &amp; Visual Identity</h1>
      <p class="bs-section-desc" style="font-size: 1.05rem; color: var(--color-neutral-fg-2); line-height: 1.7; max-width: 720px;">The authoritative single source of truth for SuamiSihat™ vector marks, typography scales, Fluent 2 design tokens, and multi-platform color hierarchies.</p>
    </div>

    <!-- Corporate Entity Facts Deck -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; margin-bottom: 3.5rem;">
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Official Brand</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 1.05rem;">SuamiSihat™</strong>
      </div>
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Registered Entity</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 0.92rem; display: block; line-height: 1.3;">SUAMISIHAT HOLDING SDN. BHD.</strong>
      </div>
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Primary Market</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 1.05rem;">Malaysia</strong>
      </div>
      <div style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.1rem 1.25rem; box-shadow: var(--f-shadow-2);">
        <span style="font-size: 0.7rem; color: var(--color-neutral-fg-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Core Focus</span>
        <strong style="color: var(--color-neutral-fg-1); font-size: 0.95rem;">Men's Health, Wellness &amp; Tech</strong>
      </div>
    </div>

    <!-- ================================================================
         1. LOGOMARK SECTION
         ================================================================ -->
    <section id="logomark" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">01 &middot; Visual Marks</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Logomark &amp; Master Identity</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">The official SuamiSihat™ mark represents medical precision, vitality, and masculine dignity.</p>

      <!-- Three Logo Variants Cards -->
      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
            <div style="background:#FFFFFF;padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center;min-height:140px;">
              <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg" alt="SuamiSihat Primary Light" style="max-height:60px;max-width:90%;" loading="lazy" />
            </div>
            <div style="padding:0.75rem 1.25rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);font-size:0.8rem;font-weight:700;color:var(--color-neutral-fg-1);">
              Primary Logo <span style="font-weight:400;color:var(--color-neutral-fg-3);font-size:0.75rem;">On Light Surface</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
            <div style="background:#022057;padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center;min-height:140px;">
              <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg" alt="SuamiSihat Primary Dark" style="max-height:60px;max-width:90%;" loading="lazy" />
            </div>
            <div style="padding:0.75rem 1.25rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);font-size:0.8rem;font-weight:700;color:var(--color-neutral-fg-1);">
              Secondary Logo <span style="font-weight:400;color:var(--color-neutral-fg-3);font-size:0.75rem;">On Dark Surface</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
            <div style="background:#F1F5F9;padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center;min-height:140px;">
              <img src="/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_mono.svg" alt="SuamiSihat Primary Mono" style="max-height:60px;max-width:90%;" loading="lazy" />
            </div>
            <div style="padding:0.75rem 1.25rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);font-size:0.8rem;font-weight:700;color:var(--color-neutral-fg-1);">
              Mono Type <span style="font-weight:400;color:var(--color-neutral-fg-3);font-size:0.75rem;">Monochrome</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 10-Color Interactive Logo Background Picker (Full Width Banner) -->
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);margin-bottom:var(--f-space-6);width:100%;">
        <div style="padding:0.85rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;width:100%;">
          <span style="font-size:0.9rem;font-weight:700;color:var(--color-neutral-fg-1);">Logo Contrast Tester (10 Color Swatches)</span>
          <span style="font-size:0.78rem;color:var(--color-neutral-fg-3);">Select surface color to preview variant</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;padding:0.85rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-2);width:100%;">
          {#each logoSwatches as swatch}
            <button
              type="button"
              class="ss-btn ss-btn-sm logo-swatch-btn"
              class:ss-btn-primary={activeLogoColor === swatch.color}
              class:ss-btn-secondary={activeLogoColor !== swatch.color}
              data-color={swatch.color}
              data-img={swatch.img}
              data-name={swatch.name}
              onclick={() => selectLogoSwatch(swatch)}
              style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:0.8rem;"
            >
              <span style="width:12px;height:12px;border-radius:50%;background:{swatch.color};border:1px solid rgba(0,0,0,0.2);display:inline-block;pointer-events:none;"></span>
              <span style="pointer-events:none;">{swatch.name}</span>
            </button>
          {/each}
        </div>
        <div id="logoContrastStage" style="padding: 2.5rem 1.5rem; display: flex; align-items: center; justify-content: center; min-height: 220px; width: 100%; background: {activeLogoColor}; transition: background 0.3s ease;">
          <img id="logoContrastImg" src={activeLogoImg} alt="SuamiSihat Logo on {activeLogoColor}" style="max-height: 110px; max-width: 90%; width: auto; object-fit: contain; filter: drop-shadow(0 4px 16px rgba(0,0,0,0.12)); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);" />
        </div>
        <div id="logoContrastInfo" style="padding: 0.75rem 1.5rem; background: var(--color-neutral-bg-3); border-top: 1px solid var(--color-neutral-stroke-1); font-size: 0.8rem; color: var(--color-neutral-fg-2); width: 100%;">
          <iconify-icon icon="fluent:info-24-regular" style="font-size:0.95rem;margin-right:6px;vertical-align:middle;color:var(--color-brand-primary)"></iconify-icon>
          Current background: <strong>{activeLogoColor}</strong> &bull; Auto-selected logo file: <code>{activeLogoImg.split('/').pop()}</code>
        </div>
      </div>

      <!-- Clear Space, Exclusion Zone & Proportions -->
      <div class="row g-4 mb-4">
        <div class="col-lg-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;">
            <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">1X Clear Space &amp; Exclusion Zone</strong>
              <span class="ss-badge ss-badge-brand" style="font-size:0.7rem;">Isolation Standard</span>
            </div>
            <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;min-height:220px;width:100%;box-sizing:border-box;">
              <img src="/assets/images/safe_zone.svg" alt="SuamiSihat 1X Safe Zone and Clear Space Diagram" style="width:100%;max-height:240px;object-fit:contain;display:block;" loading="lazy" />
            </div>
            <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
              Maintain an unobstructed exclusion margin around all four perimeters of the wordmark equal to the height of the lowercase character <code>x</code>. No typography or graphical elements may encroach within this boundary.
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;">
            <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">Logomark Mathematical Construction &amp; Proportions</strong>
              <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">Grid Geometry</span>
            </div>
            <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;min-height:220px;width:100%;box-sizing:border-box;">
              <img src="/assets/images/ss_logo_proportions.svg" alt="SuamiSihat S-Logomark Mathematical Geometry and Grid Proportions" style="width:100%;max-height:240px;object-fit:contain;display:block;" loading="lazy" />
            </div>
            <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
              The S-shaped logomark is constructed from concentric circular arcs and precise 45-degree angle vectors representing the fusion of medical science with masculine vitality.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         2. COLOUR SECTION
         ================================================================ -->
    <section id="colour" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">02 &middot; Color Palette &amp; Master Standards</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Brand Color Palette &amp; Multi-Format Specification</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">The official cross-platform color standard for SuamiSihat™. Provides certified conversion formulas across <strong>HEX, RGB, CMYK, CIE-Lab, BAL / RAL Standard, and Pantone (PMS)</strong>.</p>

      <!-- Palette Groups -->
      {#each brandColors as group}
        <div style="margin-bottom: 2.5rem;">
          <div style="font-size:0.8rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-neutral-fg-1);margin-bottom:1rem;display:flex;align-items:center;gap:8px;">
            <iconify-icon icon="fluent:color-fill-24-regular" style="color:var(--color-brand-primary);font-size:1.1rem;"></iconify-icon>
            {group.group}
          </div>
          
          <div class="bs-colour-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
            {#each group.items as color}
              <div 
                class="bs-swatch-card" 
                onclick={() => copyHex(color.hex, color.name)} 
                role="button" 
                tabindex="0" 
                onkeydown={(e) => e.key === 'Enter' && copyHex(color.hex, color.name)} 
                style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; cursor:pointer; box-shadow:var(--f-shadow-2); transition:transform 0.15s ease, box-shadow 0.15s ease;"
              >
                <!-- Color Bar Header -->
                <div style="background:{color.hex}; height:90px; padding:0.75rem 1rem; display:flex; justify-content:space-between; align-items:flex-start; position:relative;">
                  <span style="font-size:0.7rem; font-weight:700; color:{color.textColor}; background:rgba(0,0,0,0.25); padding:2px 8px; border-radius:4px; backdrop-filter:blur(4px);">
                    {color.pantone}
                  </span>
                  <button 
                    type="button" 
                    class="btn btn-sm d-inline-flex align-items-center gap-1"
                    style="background:rgba(255,255,255,0.85); color:#1C1C1C; font-size:0.7rem; font-weight:700; border:none; padding:3px 8px; border-radius:4px; box-shadow:0 2px 6px rgba(0,0,0,0.15);"
                    onclick={(e) => { e.stopPropagation(); copyHex(color.hex, color.name); }}
                  >
                    <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy HEX
                  </button>
                </div>

                <!-- Color Data Body -->
                <div style="padding:1rem 1.25rem;">
                  <div style="font-weight:800; font-size:1rem; color:var(--color-neutral-fg-1); margin-bottom:2px;">{color.name}</div>
                  <div style="font-size:0.75rem; color:var(--color-neutral-fg-2); margin-bottom:0.75rem; line-height:1.4;">{color.role}</div>

                  <!-- Specification Key-Values -->
                  <div style="display:grid; grid-template-columns:1fr; gap:6px; font-size:0.775rem; border-top:1px solid var(--color-neutral-stroke-1); padding-top:0.75rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:var(--color-neutral-fg-3); font-weight:600;">Design Token:</span>
                      <code style="color:var(--color-brand-primary); font-weight:700; font-size:0.725rem;">{color.token}</code>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:var(--color-neutral-fg-3); font-weight:600;">HEX:</span>
                      <strong style="font-family:monospace; color:var(--color-neutral-fg-1);">{color.hex}</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:var(--color-neutral-fg-3); font-weight:600;">RGB:</span>
                      <span style="font-family:monospace; color:var(--color-neutral-fg-2);">{color.rgb}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:var(--color-neutral-fg-3); font-weight:600;">CMYK:</span>
                      <span style="font-family:monospace; color:var(--color-neutral-fg-2);">{color.cmyk}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:var(--color-neutral-fg-3); font-weight:600;">CIE-Lab:</span>
                      <span style="font-family:monospace; color:var(--color-neutral-fg-2);">{color.lab}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:var(--color-neutral-fg-3); font-weight:600;">BAL / RAL:</span>
                      <span style="font-size:0.725rem; font-weight:600; color:var(--color-neutral-fg-1);">{color.bal_ral}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="color:var(--color-neutral-fg-3); font-weight:600;">Pantone:</span>
                      <span style="font-size:0.725rem; font-weight:700; color:var(--color-brand-primary);">{color.pantone}</span>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}

      <!-- Master Color Specification Matrix Table -->
      <div style="margin-top: 3rem; margin-bottom: 2.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-neutral-fg-1); margin:0 0 4px;">Master Color Specification Matrix</h3>
            <p style="font-size: 0.85rem; color: var(--color-neutral-fg-2); margin:0;">Complete digital and physical print conversion table for brand compliance and industrial procurement.</p>
          </div>
        </div>

        <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow-x:auto; box-shadow:var(--f-shadow-4);">
          <table style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left; min-width:860px;">
            <thead>
              <tr style="background:var(--color-neutral-bg-3); border-bottom:1px solid var(--color-neutral-stroke-1); color:var(--color-neutral-fg-1); font-weight:700;">
                <th style="padding:12px 14px; width:50px;">Swatch</th>
                <th style="padding:12px 14px;">Color Name &amp; Role</th>
                <th style="padding:12px 14px;">Token Name</th>
                <th style="padding:12px 14px;">HEX</th>
                <th style="padding:12px 14px;">RGB</th>
                <th style="padding:12px 14px;">CMYK</th>
                <th style="padding:12px 14px;">CIE-Lab</th>
                <th style="padding:12px 14px;">BAL / RAL Standard</th>
                <th style="padding:12px 14px;">Pantone (PMS)</th>
                <th style="padding:12px 14px; text-align:center;">Copy</th>
              </tr>
            </thead>
            <tbody>
              {#each brandColors as group}
                <tr style="background:var(--color-neutral-bg-3); border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <td colspan="10" style="padding:8px 14px; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-brand-primary);">
                    {group.group}
                  </td>
                </tr>
                {#each group.items as color}
                  <tr style="border-bottom:1px solid var(--color-neutral-stroke-1); transition:background 0.15s ease;">
                    <td style="padding:10px 14px;">
                      <div style="width:28px; height:28px; border-radius:6px; background:{color.hex}; border:1px solid rgba(0,0,0,0.15); box-shadow:0 2px 4px rgba(0,0,0,0.1);"></div>
                    </td>
                    <td style="padding:10px 14px;">
                      <strong style="color:var(--color-neutral-fg-1); display:block;">{color.name}</strong>
                      <span style="font-size:0.7rem; color:var(--color-neutral-fg-3);">{color.role}</span>
                    </td>
                    <td style="padding:10px 14px;">
                      <code style="color:var(--color-brand-primary); font-size:0.75rem;">{color.token}</code>
                    </td>
                    <td style="padding:10px 14px; font-family:monospace; font-weight:700; color:var(--color-neutral-fg-1);">
                      {color.hex}
                    </td>
                    <td style="padding:10px 14px; font-family:monospace; font-size:0.75rem; color:var(--color-neutral-fg-2);">
                      {color.rgb}
                    </td>
                    <td style="padding:10px 14px; font-family:monospace; font-size:0.75rem; color:var(--color-neutral-fg-2);">
                      {color.cmyk}
                    </td>
                    <td style="padding:10px 14px; font-family:monospace; font-size:0.75rem; color:var(--color-neutral-fg-2);">
                      {color.lab}
                    </td>
                    <td style="padding:10px 14px; font-weight:600; font-size:0.75rem; color:var(--color-neutral-fg-1);">
                      {color.bal_ral}
                    </td>
                    <td style="padding:10px 14px;">
                      <span class="ss-badge ss-badge-brand" style="font-size:0.7rem; font-weight:700;">{color.pantone}</span>
                    </td>
                    <td style="padding:10px 14px; text-align:center;">
                      <button 
                        type="button" 
                        class="ss-btn ss-btn-sm ss-btn-secondary" 
                        onclick={() => copyHex(color.hex, color.name)}
                        aria-label="Copy {color.name} hex"
                      >
                        <iconify-icon icon="fluent:copy-16-regular"></iconify-icon>
                      </button>
                    </td>
                  </tr>
                {/each}
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 7-Stop Interactive Neutral Grayscale Strip -->
      <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-neutral-fg-3);margin-bottom:0.75rem;">7-Stop Interactive Neutral Grayscale Strip (Click to Copy)</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));border-radius:var(--f-radius-lg);overflow:hidden;border:1px solid var(--color-neutral-stroke-1);box-shadow:var(--f-shadow-4);margin-bottom:1rem;">
        <button type="button" onclick={() => copyHex('#000000', 'Full Black (BG only)')} style="background:#000000;color:#FFFFFF;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
          <div style="font-size:0.72rem;font-weight:700;">Full Black</div>
          <div style="font-size:0.68rem;opacity:0.8;">#000000 (BG)</div>
        </button>
        <button type="button" onclick={() => copyHex('#3C3C3B', 'Grey 90')} style="background:#3C3C3B;color:#FFFFFF;border:none;border-left:1px solid rgba(255,255,255,0.15);padding:1rem 0.5rem;text-align:center;cursor:pointer;">
          <div style="font-size:0.72rem;font-weight:700;">Grey 90</div>
          <div style="font-size:0.68rem;opacity:0.8;">#3C3C3B</div>
        </button>
        <button type="button" onclick={() => copyHex('#575756', 'Grey 80')} style="background:#575756;color:#FFFFFF;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
          <div style="font-size:0.72rem;font-weight:700;">Grey 80</div>
          <div style="font-size:0.68rem;opacity:0.8;">#575756</div>
        </button>
        <button type="button" onclick={() => copyHex('#666666', 'Grey 60')} style="background:#666666;color:#FFFFFF;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
          <div style="font-size:0.72rem;font-weight:700;">Grey 60</div>
          <div style="font-size:0.68rem;opacity:0.8;">#666666</div>
        </button>
        <button type="button" onclick={() => copyHex('#999999', 'Grey 40')} style="background:#999999;color:#FFFFFF;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
          <div style="font-size:0.72rem;font-weight:700;">Grey 40</div>
          <div style="font-size:0.68rem;opacity:0.8;">#999999</div>
        </button>
        <button type="button" onclick={() => copyHex('#CCCCCC', 'Grey 20')} style="background:#CCCCCC;color:#1C1C1C;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
          <div style="font-size:0.72rem;font-weight:700;">Grey 20</div>
          <div style="font-size:0.68rem;opacity:0.8;">#CCCCCC</div>
        </button>
        <button type="button" onclick={() => copyHex('#FFFFFF', 'White')} style="background:#FFFFFF;color:#1C1C1C;border:none;border-left:1px solid var(--color-neutral-stroke-1);padding:1rem 0.5rem;text-align:center;cursor:pointer;">
          <div style="font-size:0.72rem;font-weight:700;">White</div>
          <div style="font-size:0.68rem;opacity:0.8;">#FFFFFF</div>
        </button>
      </div>
    </section>

    <!-- ================================================================
         3. CURATED COLOR PATTERNS (60:30:10 SCHEMES)
         ================================================================ -->
    <section id="patterns" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">03 &middot; Applied Visual Harmony</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Curated Color Patterns (60:30:10 Schemes)</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Production-ready surface combinations engineered for clinical trust, digital conversion, and accessibility compliance. Each pattern strictly enforces the <b>60:30:10 hierarchy</b> with <b>Neutral Black (<code>#1C1C1C</code>)</b> typography.</p>

      <div class="row g-4 mb-4">
        <!-- Pattern 1: Clinical Conversion (Flagship Light) -->
        <div class="col-lg-4 col-md-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;display:flex;flex-direction:column;">
            <div style="display:flex;height:12px;width:100%;">
              <div style="flex:60;background:#F8FAFC;border-right:1px solid #E2E8F0;" title="60% Foundation"></div>
              <div style="flex:30;background:#022057;border-right:1px solid rgba(255,255,255,0.2);" title="30% Secondary"></div>
              <div style="flex:10;background:#21A1F7;" title="10% Azure Accent"></div>
            </div>
            <div style="padding:var(--f-space-5);flex:1;display:flex;flex-direction:column;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--f-space-2);">
                <span class="ss-badge ss-badge-brand" style="font-size:0.68rem;">Flagship Light</span>
                <span style="font-size:0.72rem;color:var(--color-neutral-fg-3);font-weight:600;">Main Web &amp; Services</span>
              </div>
              <h3 style="font-size:1.05rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:var(--f-space-2);">The Clinical Conversion</h3>
              <p style="font-size:0.8125rem;color:var(--color-neutral-fg-2);line-height:1.5;margin-bottom:var(--f-space-4);">
                Engineered for high-traffic patient onboarding and service vertical pages. The clean white canvas instills medical hygiene, Prussian Blue anchors clinical trust, and high-potency <strong>Azure (#21A1F7)</strong> directs focus to booking appointments.
              </p>

              <!-- Mini Live UI Component Preview -->
              <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:var(--f-radius-lg);padding:var(--f-space-4);margin-bottom:var(--f-space-4);margin-top:auto;">
                <div style="background:#FFFFFF;border:1px solid rgba(4,51,136,0.12);border-radius:var(--f-radius-md);padding:var(--f-space-3);box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                  <div style="font-size:0.72rem;font-weight:700;color:#022057;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:2px;">Consultation</div>
                  <div style="font-size:0.875rem;font-weight:700;color:#1C1C1C;margin-bottom:4px;">Men's Hormone Therapy</div>
                  <div style="font-size:0.75rem;color:#525252;line-height:1.4;margin-bottom:var(--f-space-3);">Doctor-led clinical evaluation with personalized testosterone recovery protocols.</div>
                  <button type="button" style="background:#21A1F7;color:#FFFFFF;font-weight:700;font-size:0.72rem;padding:6px 14px;border:none;border-radius:var(--f-radius-sm);display:inline-flex;align-items:center;gap:4px;cursor:default;">
                    <iconify-icon icon="fluent:calendar-ltr-24-filled" style="font-size:0.85rem;"></iconify-icon> BOOK APPOINTMENT
                  </button>
                </div>
              </div>

              <!-- Allocation Breakdown -->
              <div style="font-size:0.75rem;color:var(--color-neutral-fg-3);display:grid;gap:4px;padding-top:var(--f-space-2);border-top:1px solid var(--color-neutral-stroke-1);">
                <div><strong>60% Foundation:</strong> #F8FAFC (Body) &amp; #FFFFFF (Card Surface)</div>
                <div><strong>30% Secondary:</strong> #022057 (Prussian Blue) &amp; #043388 (SS Blue)</div>
                <div><strong>10% Accent:</strong> #21A1F7 (Azure Primary Conversion CTA)</div>
                <div><strong>Typography:</strong> #1C1C1C (Neutral Black body &amp; headers)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pattern 2: Executive Discretion (Signature Dark) -->
        <div class="col-lg-4 col-md-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;display:flex;flex-direction:column;">
            <div style="display:flex;height:12px;width:100%;">
              <div style="flex:60;background:#090D16;border-right:1px solid rgba(255,255,255,0.1);" title="60% Foundation"></div>
              <div style="flex:30;background:#0F172A;border-right:1px solid rgba(255,255,255,0.15);" title="30% Secondary"></div>
              <div style="flex:10;background:#21A1F7;" title="10% Azure Accent"></div>
            </div>
            <div style="padding:var(--f-space-5);flex:1;display:flex;flex-direction:column;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--f-space-2);">
                <span class="ss-badge ss-badge-brand" style="font-size:0.68rem;background:rgba(33,161,247,0.12);color:var(--ss-azure);">Signature Dark</span>
                <span style="font-size:0.72rem;color:var(--color-neutral-fg-3);font-weight:600;">Executive &amp; VIP Portals</span>
              </div>
              <h3 style="font-size:1.05rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:var(--f-space-2);">The Executive Discretion</h3>
              <p style="font-size:0.8125rem;color:var(--color-neutral-fg-2);line-height:1.5;margin-bottom:var(--f-space-4);">
                Crafted for patient privacy, confidential medical records, and executive health programs. Deep slate surfaces eliminate glare while luminous <strong>Azure (#21A1F7)</strong> glows distinctly for active navigation.
              </p>

              <!-- Mini Live UI Component Preview -->
              <div style="background:#090D16;border:1px solid rgba(255,255,255,0.1);border-radius:var(--f-radius-lg);padding:var(--f-space-4);margin-bottom:var(--f-space-4);margin-top:auto;">
                <div style="background:#0F172A;border:1px solid rgba(255,255,255,0.12);border-radius:var(--f-radius-md);padding:var(--f-space-3);box-shadow:0 4px 16px rgba(0,0,0,0.4);">
                  <div style="font-size:0.72rem;font-weight:700;color:#6DC6EC;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:2px;">Confidential VIP</div>
                  <div style="font-size:0.875rem;font-weight:700;color:#FFFFFF;margin-bottom:4px;">Executive Wellness Suite</div>
                  <div style="font-size:0.75rem;color:#ABABAB;line-height:1.4;margin-bottom:var(--f-space-3);">Private physician concierge with comprehensive discreet biomarkers.</div>
                  <button type="button" style="background:#21A1F7;color:#FFFFFF;font-weight:700;font-size:0.72rem;padding:6px 14px;border:none;border-radius:var(--f-radius-sm);display:inline-flex;align-items:center;gap:4px;cursor:default;box-shadow:0 0 12px rgba(33,161,247,0.4);">
                    <iconify-icon icon="fluent:shield-checkmark-24-filled" style="font-size:0.85rem;"></iconify-icon> ACCESS PORTAL
                  </button>
                </div>
              </div>

              <!-- Allocation Breakdown -->
              <div style="font-size:0.75rem;color:var(--color-neutral-fg-3);display:grid;gap:4px;padding-top:var(--f-space-2);border-top:1px solid var(--color-neutral-stroke-1);">
                <div><strong>60% Foundation:</strong> #090D16 (Void Dark) &amp; #141414 (Canvas)</div>
                <div><strong>30% Secondary:</strong> #0F172A (Slate 900) &amp; #022057 (Prussian Blue)</div>
                <div><strong>10% Accent:</strong> #21A1F7 (Luminous Azure Focal Points)</div>
                <div><strong>Typography:</strong> #FFFFFF (Pure White) &amp; #ABABAB (Slate Muted)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pattern 3: Clinical Warmth (Wellness & Fertility) -->
        <div class="col-lg-4 col-md-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;display:flex;flex-direction:column;">
            <div style="display:flex;height:12px;width:100%;">
              <div style="flex:60;background:#FDFCFB;border-right:1px solid #EFEAE4;" title="60% Foundation"></div>
              <div style="flex:30;background:#022057;border-right:1px solid rgba(255,255,255,0.2);" title="30% Secondary"></div>
              <div style="flex:10;background:#21A1F7;" title="10% Azure Accent"></div>
            </div>
            <div style="padding:var(--f-space-5);flex:1;display:flex;flex-direction:column;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--f-space-2);">
                <span class="ss-badge ss-badge-brand" style="font-size:0.68rem;background:rgba(189,154,115,0.15);color:#8A6538;border-color:rgba(189,154,115,0.3);">Trust &amp; Warmth</span>
                <span style="font-size:0.72rem;color:var(--color-neutral-fg-3);font-weight:600;">Fertility &amp; Doctor Trust</span>
              </div>
              <h3 style="font-size:1.05rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:var(--f-space-2);">The Clinical Warmth</h3>
              <p style="font-size:0.8125rem;color:var(--color-neutral-fg-2);line-height:1.5;margin-bottom:var(--f-space-4);">
                Harmonizes medical precision with empathetic warmth for couples and fertility journeys. Soft ivory backdrops and <strong>Lion Gold (#BD9A73)</strong> trust badges reinforce doctor credibility.
              </p>

              <!-- Mini Live UI Component Preview -->
              <div style="background:#FDFCFB;border:1px solid #EFEAE4;border-radius:var(--f-radius-lg);padding:var(--f-space-4);margin-bottom:var(--f-space-4);margin-top:auto;">
                <div style="background:#FFFFFF;border:1px solid rgba(189,154,115,0.25);border-radius:var(--f-radius-md);padding:var(--f-space-3);box-shadow:0 2px 8px rgba(189,154,115,0.06);">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
                    <div style="font-size:0.72rem;font-weight:700;color:#022057;text-transform:uppercase;letter-spacing:0.04em;">Fertility Care</div>
                    <span style="font-size:0.68rem;font-weight:700;background:rgba(189,154,115,0.15);color:#8A6538;padding:2px 6px;border-radius:4px;">⭐ 4.9 Certified</span>
                  </div>
                  <div style="font-size:0.875rem;font-weight:700;color:#1C1C1C;margin-bottom:4px;">Men's Reproductive Health</div>
                  <div style="font-size:0.75rem;color:#525252;line-height:1.4;margin-bottom:var(--f-space-3);">Compassionate specialist consultations with advanced semen analysis.</div>
                  <button type="button" style="background:#21A1F7;color:#FFFFFF;font-weight:700;font-size:0.72rem;padding:6px 14px;border:none;border-radius:var(--f-radius-sm);display:inline-flex;align-items:center;gap:4px;cursor:default;">
                    <iconify-icon icon="fluent:calendar-star-24-filled" style="font-size:0.85rem;"></iconify-icon> SCHEDULE CONSULTATION
                  </button>
                </div>
              </div>

              <!-- Allocation Breakdown -->
              <div style="font-size:0.75rem;color:var(--color-neutral-fg-3);display:grid;gap:4px;padding-top:var(--f-space-2);border-top:1px solid var(--color-neutral-stroke-1);">
                <div><strong>60% Foundation:</strong> #FDFCFB (Warm Ivory Canvas) &amp; #FFFFFF (Card)</div>
                <div><strong>30% Secondary:</strong> #022057 (Prussian Blue) &amp; #BD9A73 (Lion Gold)</div>
                <div><strong>10% Accent:</strong> #21A1F7 (Azure Primary Booking Action)</div>
                <div><strong>Typography:</strong> #1C1C1C (Neutral Black text)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pattern 4 / Hero Motion Standard: ss-hero Component -->
        <div class="col-12 mt-2">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
            <div style="padding:1.5rem 1.75rem; border-bottom:1px solid var(--color-neutral-stroke-1); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <span class="ss-badge ss-badge-brand mb-1">Standard Banner Component</span>
                <h3 style="font-size:1.25rem; font-weight:800; color:var(--color-neutral-fg-1); margin:0;">Default Hero Motion Standard (<code>ss-hero</code>)</h3>
              </div>
              <span style="font-size:0.75rem; color:var(--color-brand-primary); font-weight:700; background:var(--color-brand-subtle); padding:4px 10px; border-radius:9999px;">Rule 6 Standard</span>
            </div>
            <div style="padding:1.5rem 1.75rem;">
              <p style="font-size:0.9rem; color:var(--color-neutral-fg-2); line-height:1.6; margin-bottom:1.25rem;">
                The <code>ss-hero</code> component is the <strong>official default background for all hero-type banners</strong> across SuamiSihat™ portals, landing pages, and product master headers.
              </p>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
                <div style="background:var(--color-neutral-bg-1); padding:1rem; border-radius:var(--f-radius-lg); border:1px solid var(--color-neutral-stroke-1);">
                  <div style="font-size:0.75rem; font-weight:700; color:var(--color-brand-primary); margin-bottom:4px;">60% Dominant Base</div>
                  <div style="font-size:0.825rem; color:var(--color-neutral-fg-1); font-weight:600; margin-bottom:4px;">Brand Vertical Gradient</div>
                  <div style="font-size:0.75rem; color:var(--color-neutral-fg-3);"><code>#022057</code> (Prussian Blue) to <code>#043388</code> (SS Blue) in light mode; <code>#021440</code> to <code>#022057</code> in dark mode.</div>
                </div>
                <div style="background:var(--color-neutral-bg-1); padding:1rem; border-radius:var(--f-radius-lg); border:1px solid var(--color-neutral-stroke-1);">
                  <div style="font-size:0.75rem; font-weight:700; color:var(--color-brand-primary); margin-bottom:4px;">30% Structural Glow</div>
                  <div style="font-size:0.825rem; color:var(--color-neutral-fg-1); font-weight:600; margin-bottom:4px;">Ambient Radial Light Bloom</div>
                  <div style="font-size:0.75rem; color:var(--color-neutral-fg-3);">Radial light bloom (<code>.f-hero-ambient-glow</code>) pulsing gently with 60px blur to create depth and clinical atmosphere.</div>
                </div>
                <div style="background:var(--color-neutral-bg-1); padding:1rem; border-radius:var(--f-radius-lg); border:1px solid var(--color-neutral-stroke-1);">
                  <div style="font-size:0.75rem; font-weight:700; color:var(--color-brand-primary); margin-bottom:4px;">10% Kinetic Vitality</div>
                  <div style="font-size:0.825rem; color:var(--color-neutral-fg-1); font-weight:600; margin-bottom:4px;">Interactive Mars ♂ Particles</div>
                  <div style="font-size:0.75rem; color:var(--color-neutral-fg-3);">Interactive canvas wave (<code>.hero-wave-canvas</code>) with radiant Azure (<code>#21A1F7</code>) &amp; Gold (<code>#F7E143</code>) nodes and cursor tracking.</div>
                </div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; background:var(--color-brand-subtle); padding:0.875rem 1.25rem; border-radius:var(--f-radius-md);">
                <span style="font-size:0.825rem; color:var(--color-neutral-fg-1);">Explore component implementation and multi-framework code snippets in the Component Library.</span>
                <a href="/components/#ss-hero" class="ss-btn ss-btn-primary ss-btn-sm"><iconify-icon icon="fluent:sparkle-24-regular"></iconify-icon> View ss-hero in Components</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         4. TYPOGRAPHY SECTION
         ================================================================ -->
    <section id="typography" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">04 &middot; Typography System</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Approved Font Families</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Four approved typefaces calibrated for digital platforms, marketing collaterals, and clinical documents.</p>

      <div class="row g-4 mb-4">
        <!-- Poppins -->
        <div class="col-md-6 col-lg-3">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl);">
            <span class="ss-badge ss-badge-brand mb-2">Display &amp; Hero</span>
            <h3 style="font-family:'Poppins',sans-serif; font-size:1.5rem; font-weight:700; color:var(--color-neutral-fg-1); margin:8px 0 4px;">Poppins</h3>
            <p style="font-size:0.8rem; color:var(--color-neutral-fg-3); margin-bottom:12px;">Geometric Sans &bull; 600, 700, 800</p>
            <p style="font-size:0.825rem; color:var(--color-neutral-fg-2); line-height:1.6;">Used for bold marketing headers, key numbers, and landing hero statements.</p>
          </div>
        </div>

        <!-- Montserrat -->
        <div class="col-md-6 col-lg-3">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl);">
            <span class="ss-badge ss-badge-brand mb-2">Subtitles &amp; UI</span>
            <h3 style="font-family:'Montserrat',sans-serif; font-size:1.5rem; font-weight:700; color:var(--color-neutral-fg-1); margin:8px 0 4px;">Montserrat</h3>
            <p style="font-size:0.8rem; color:var(--color-neutral-fg-3); margin-bottom:12px;">Urban Sans &bull; 500, 600, 700</p>
            <p style="font-size:0.825rem; color:var(--color-neutral-fg-2); line-height:1.6;">Modern headers, card labels, badges, and secondary promotional titles.</p>
          </div>
        </div>

        <!-- Helvetica Neue -->
        <div class="col-md-6 col-lg-3">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl);">
            <span class="ss-badge ss-badge-neutral mb-2">Body &amp; Web</span>
            <h3 style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:1.5rem; font-weight:700; color:var(--color-neutral-fg-1); margin:8px 0 4px;">Helvetica</h3>
            <p style="font-size:0.8rem; color:var(--color-neutral-fg-3); margin-bottom:12px;">Neo-Grotesque &bull; 400, 500, 700</p>
            <p style="font-size:0.825rem; color:var(--color-neutral-fg-2); line-height:1.6;">Clean clinical documentation, medical dosage charts, and long-form reading.</p>
          </div>
        </div>

        <!-- Calibri -->
        <div class="col-md-6 col-lg-3">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl);">
            <span class="ss-badge ss-badge-neutral mb-2">Office &amp; Email</span>
            <h3 style="font-family:Calibri,sans-serif; font-size:1.5rem; font-weight:700; color:var(--color-neutral-fg-1); margin:8px 0 4px;">Calibri</h3>
            <p style="font-size:0.8rem; color:var(--color-neutral-fg-3); margin-bottom:12px;">Humanist Sans &bull; 400, 700</p>
            <p style="font-size:0.825rem; color:var(--color-neutral-fg-2); line-height:1.6;">Standard email signatures, Word documents, PowerPoint presentations, and staff spreadsheets.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         5. SUB-BRANDS
         ================================================================ -->
    <section id="subbrand" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">05 &middot; Brand Architecture</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Brand Architecture &amp; Operating Model</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">One master holding company, four specialized operating subsidiaries, and clinical/lifestyle product brands.</p>

      <!-- Brand Architecture Pyramid & Sub-Brands Diagrams -->
      <div class="row g-4 mb-4">
        <div class="col-lg-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;">
            <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">Brand Architecture Model</strong>
              <span class="ss-badge ss-badge-brand" style="font-size:0.7rem;">Group Governance</span>
            </div>
            <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;min-height:220px;">
              <img src="/assets/images/brand_architecture_model.svg" alt="SuamiSihat Brand Architecture Model Pyramid" style="max-height:200px;max-width:100%;object-fit:contain;" loading="lazy" />
            </div>
            <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
              Defines the structural relationship between SuamiSihat Holding (parent), operating divisions (Clinic, Wellness, Ecom, Tech), and commercial product lines.
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);height:100%;">
            <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">Operating Subsidiaries Hierarchy</strong>
              <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">5 Operating Entities</span>
            </div>
            <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;min-height:220px;">
              <img src="/assets/images/sub-brands.svg" alt="SuamiSihat Operating Sub-Brands Hierarchy Chart" style="max-height:200px;max-width:100%;object-fit:contain;" loading="lazy" />
            </div>
            <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
              Each subsidiary maintains a standardized color-coded identity bar and dedicated service purview while sharing the core master logomark.
            </div>
          </div>
        </div>
      </div>

      <div class="f-subbrand-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
        <!-- SSH (Parent Company) -->
        <div class="f-subbrand-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--f-shadow-4);">
          <div>
            <div class="f-subbrand-card-top" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span class="f-subbrand-pill ss-badge ss-badge-brand">Parent Company</span>
              <span class="f-subbrand-status-dot" style="width:8px; height:8px; border-radius:50%; background:#16A34A; display:inline-block;" title="Active Entity"></span>
            </div>
            <div class="f-subbrand-logo-wrap" style="height:70px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; background:var(--color-neutral-bg-1); border-radius:var(--f-radius-lg); padding:0.5rem;">
              <img src="/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_light.svg" alt="SS Health Logo" style="max-height:45px; max-width:85%;" loading="lazy" />
            </div>
            <div class="f-subbrand-card-body">
              <div style="font-weight:800; color:var(--color-neutral-fg-1); font-size:1.1rem; margin-bottom:2px;">SS Health</div>
              <div style="font-size:0.75rem; font-weight:600; color:var(--color-brand-primary); margin-bottom:6px;">SuamiSihat Holding Sdn. Bhd.</div>
              <div class="f-subbrand-desc" style="font-size:0.8rem; color:var(--color-neutral-fg-3); line-height:1.5; margin-bottom:1rem;">The corporate parent responsible for group strategy, governance, legal, and investor relations.</div>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; border-top:1px solid var(--color-neutral-stroke-1); padding-top:1rem; margin-top:auto;">
            <a href="/public/brand/downloads/01_logo_ssHealth.zip" download class="ss-btn ss-btn-primary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Corporate Kit
            </a>
          </div>
        </div>

        <!-- 01 · SSC (SS Clinic) -->
        <div class="f-subbrand-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--f-shadow-4);">
          <div>
            <div class="f-subbrand-card-top" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span class="f-subbrand-pill ss-badge ss-badge-brand">01 &bull; Clinical Care</span>
              <span class="f-subbrand-status-dot" style="width:8px; height:8px; border-radius:50%; background:#16A34A; display:inline-block;" title="Active Entity"></span>
            </div>
            <div class="f-subbrand-logo-wrap" style="height:70px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; background:var(--color-neutral-bg-1); border-radius:var(--f-radius-lg); padding:0.5rem;">
              <img src="/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.svg" alt="SS Clinic Logo" style="max-height:45px; max-width:85%;" loading="lazy" />
            </div>
            <div class="f-subbrand-card-body">
              <div style="font-weight:800; color:var(--color-neutral-fg-1); font-size:1.1rem; margin-bottom:2px;">SS Clinic</div>
              <div style="font-size:0.75rem; font-weight:600; color:var(--color-brand-primary); margin-bottom:6px;">SuamiSihat Clinic Sdn. Bhd.</div>
              <div class="f-subbrand-desc" style="font-size:0.8rem; color:var(--color-neutral-fg-3); line-height:1.5; margin-bottom:1rem;">Clinical men's health services, medical consultations, and evidence-informed patient care.</div>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; border-top:1px solid var(--color-neutral-stroke-1); padding-top:1rem; margin-top:auto;">
            <a href="https://suamisihat.clinic/" target="_blank" rel="noopener noreferrer" class="ss-btn ss-btn-secondary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:open-16-regular"></iconify-icon> Website
            </a>
            <a href="/public/brand/downloads/02_logo_ssClinic.zip" download class="ss-btn ss-btn-primary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Logo Kit
            </a>
          </div>
        </div>

        <!-- 02 · SSW (SS Wellness) -->
        <div class="f-subbrand-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--f-shadow-4);">
          <div>
            <div class="f-subbrand-card-top" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span class="f-subbrand-pill ss-badge ss-badge-brand">02 &bull; Wellness</span>
              <span class="f-subbrand-status-dot" style="width:8px; height:8px; border-radius:50%; background:#16A34A; display:inline-block;" title="Active Entity"></span>
            </div>
            <div class="f-subbrand-logo-wrap" style="height:70px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; background:var(--color-neutral-bg-1); border-radius:var(--f-radius-lg); padding:0.5rem;">
              <img src="/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_light.svg" alt="SS Wellness Logo" style="max-height:45px; max-width:85%;" loading="lazy" />
            </div>
            <div class="f-subbrand-card-body">
              <div style="font-weight:800; color:var(--color-neutral-fg-1); font-size:1.1rem; margin-bottom:2px;">SS Wellness</div>
              <div style="font-size:0.75rem; font-weight:600; color:var(--color-brand-primary); margin-bottom:6px;">SuamiSihat Wellness Sdn. Bhd.</div>
              <div class="f-subbrand-desc" style="font-size:0.8rem; color:var(--color-neutral-fg-3); line-height:1.5; margin-bottom:1rem;">Physiotherapy, rehabilitation, holistic vitality recovery, and daily performance care.</div>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; border-top:1px solid var(--color-neutral-stroke-1); padding-top:1rem; margin-top:auto;">
            <a href="https://suamisihatwellness.com/" target="_blank" rel="noopener noreferrer" class="ss-btn ss-btn-secondary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:open-16-regular"></iconify-icon> Website
            </a>
            <a href="/public/brand/downloads/03_logo_ssWellness.zip" download class="ss-btn ss-btn-primary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Logo Kit
            </a>
          </div>
        </div>

        <!-- 03 · SSE (SS Ecommerce) -->
        <div class="f-subbrand-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--f-shadow-4);">
          <div>
            <div class="f-subbrand-card-top" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span class="f-subbrand-pill ss-badge ss-badge-brand">03 &bull; Commerce</span>
              <span class="f-subbrand-status-dot" style="width:8px; height:8px; border-radius:50%; background:#16A34A; display:inline-block;" title="Active Entity"></span>
            </div>
            <div class="f-subbrand-logo-wrap" style="height:70px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; background:var(--color-neutral-bg-1); border-radius:var(--f-radius-lg); padding:0.5rem;">
              <img src="/public/brand/logos/04_logo_ssEcom/logo_sse_primary_light.svg" alt="SSE Logo" style="max-height:45px; max-width:85%;" loading="lazy" />
            </div>
            <div class="f-subbrand-card-body">
              <div style="font-weight:800; color:var(--color-neutral-fg-1); font-size:1.1rem; margin-bottom:2px;">SS Ecommerce</div>
              <div style="font-size:0.75rem; font-weight:600; color:var(--color-brand-primary); margin-bottom:6px;">SuamiSihat Ecommerce Sdn. Bhd.</div>
              <div class="f-subbrand-desc" style="font-size:0.8rem; color:var(--color-neutral-fg-3); line-height:1.5; margin-bottom:1rem;">The official commerce platform for approved SuamiSihat™ products, discretion, and delivery.</div>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; border-top:1px solid var(--color-neutral-stroke-1); padding-top:1rem; margin-top:auto;">
            <a href="https://store.suamisihat.my/" target="_blank" rel="noopener noreferrer" class="ss-btn ss-btn-secondary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:open-16-regular"></iconify-icon> Store
            </a>
            <a href="/public/brand/downloads/04_logo_ssEcom.zip" download class="ss-btn ss-btn-primary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Logo Kit
            </a>
          </div>
        </div>

        <!-- 04 · SST (SS Technology) -->
        <div class="f-subbrand-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--f-shadow-4);">
          <div>
            <div class="f-subbrand-card-top" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span class="f-subbrand-pill ss-badge ss-badge-brand">04 &bull; HealthTech</span>
              <span class="f-subbrand-status-dot" style="width:8px; height:8px; border-radius:50%; background:#16A34A; display:inline-block;" title="Active Entity"></span>
            </div>
            <div class="f-subbrand-logo-wrap" style="height:70px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; background:var(--color-neutral-bg-1); border-radius:var(--f-radius-lg); padding:0.5rem;">
              <img src="/public/brand/logos/05_logo_ssTech/logo_sst_primary_light.svg" alt="SST Logo" style="max-height:45px; max-width:85%;" loading="lazy" />
            </div>
            <div class="f-subbrand-card-body">
              <div style="font-weight:800; color:var(--color-neutral-fg-1); font-size:1.1rem; margin-bottom:2px;">SS Technology</div>
              <div style="font-size:0.75rem; font-weight:600; color:var(--color-brand-primary); margin-bottom:6px;">SuamiSihat Technology Sdn. Bhd.</div>
              <div class="f-subbrand-desc" style="font-size:0.8rem; color:var(--color-neutral-fg-3); line-height:1.5; margin-bottom:1rem;">Digital health products, patient portals, EHR integrations, and technology infrastructure.</div>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; border-top:1px solid var(--color-neutral-stroke-1); padding-top:1rem; margin-top:auto;">
            <a href="https://www.suamisihat.app/" target="_blank" rel="noopener noreferrer" class="ss-btn ss-btn-secondary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:open-16-regular"></iconify-icon> App
            </a>
            <a href="/public/brand/downloads/05_logo_ssTech.zip" download class="ss-btn ss-btn-primary ss-btn-sm" style="flex:1; justify-content:center;">
              <iconify-icon icon="fluent:arrow-download-16-regular"></iconify-icon> Logo Kit
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         6. ICONS & LOGO USAGE SECTION
         ================================================================ -->
    <section id="icons" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">06 &middot; Usage &amp; Rules</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Icons &amp; Logomark Usage</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Clear signals, every time. Our standalone S-shaped logomark follows strict background brightness conventions.</p>

      <!-- Interactive Logomark Surface Tester -->
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);margin-bottom:2rem;">
        <div style="padding:0.85rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
          <div style="display:flex;align-items:center;gap:10px;">
            <strong style="font-size:0.925rem;color:var(--color-neutral-fg-1);">Standalone Logomark Surface Contrast Tester</strong>
            <span class="ss-badge {logomarkMode === 'dark' ? 'ss-badge-brand' : 'ss-badge-neutral'}" style="font-size:0.7rem;font-weight:700;">
              {logomarkMode === 'dark' ? 'Prussian Dark Surface (#022057)' : 'Porcelain Light Canvas (#FCFAF6)'}
            </span>
          </div>
          
          <!-- Mode Toggle Buttons -->
          <div style="display:flex;gap:8px;">
            <button
              type="button"
              id="btnLogomarkLight"
              class="ss-btn ss-btn-sm"
              class:ss-btn-primary={logomarkMode === 'light'}
              class:ss-btn-secondary={logomarkMode !== 'light'}
              onclick={() => setLogomarkMode('light')}
              style="padding:6px 14px;border-radius:var(--f-radius-pill);font-weight:600;font-size:0.8rem;display:inline-flex;align-items:center;gap:6px;"
            >
              <iconify-icon icon="fluent:weather-sunny-24-regular" style="pointer-events:none;"></iconify-icon>
              <span style="pointer-events:none;">Light Surface</span>
            </button>
            <button
              type="button"
              id="btnLogomarkDark"
              class="ss-btn ss-btn-sm"
              class:ss-btn-primary={logomarkMode === 'dark'}
              class:ss-btn-secondary={logomarkMode !== 'dark'}
              onclick={() => setLogomarkMode('dark')}
              style="padding:6px 14px;border-radius:var(--f-radius-pill);font-weight:600;font-size:0.8rem;display:inline-flex;align-items:center;gap:6px;"
            >
              <iconify-icon icon="fluent:weather-moon-24-regular" style="pointer-events:none;"></iconify-icon>
              <span style="pointer-events:none;">Dark Surface</span>
            </button>
          </div>
        </div>

        <!-- Stage with Big Logo on Left, Lorem Ipsum on Right -->
        <div
          id="logomarkStage"
          style="background:{logomarkMode === 'dark' ? '#022057' : '#FCFAF6'};padding:3rem 2.5rem;display:grid;grid-template-columns:auto 1fr;gap:3rem;align-items:center;transition:background 0.3s ease;min-height:220px;"
        >
          <!-- Left: Big Standalone Logomark Icon -->
          <div style="display:flex;align-items:center;justify-content:center;padding:2rem;background:{logomarkMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'};border-radius:var(--f-radius-2xl, 24px);border:1px solid {logomarkMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'};min-width:220px;min-height:220px;">
            <img
              id="logomarkImg"
              src={logomarkMode === 'dark' ? '/public/brand/logos/ss-logomark-dark.svg' : '/public/brand/logos/ss-logomark-light.svg'}
              alt="SuamiSihat Standalone Logomark on {logomarkMode === 'dark' ? 'Dark' : 'Light'} Surface"
              style="height:180px;width:180px;max-width:100%;object-fit:contain;transition:all 0.3s ease;filter:drop-shadow(0 8px 24px rgba(0,0,0,0.16));"
            />
          </div>

          <!-- Right: Lorem Ipsum & Typographic Copy -->
          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="ss-badge {logomarkMode === 'dark' ? 'ss-badge-brand' : 'ss-badge-neutral'}" style="font-size:0.7rem;font-weight:700;">
                {logomarkMode === 'dark' ? 'Dark Background' : 'Light Background'}
              </span>
              <span style="font-size:0.75rem;font-weight:600;color:{logomarkMode === 'dark' ? 'rgba(252,250,246,0.6)' : 'rgba(25,25,26,0.6)'};">
                WCAG AAA Compliant &bull; Contrast Ratio 12.8:1
              </span>
            </div>
            <h3 style="font-size:1.45rem;font-weight:800;margin:0;color:{logomarkMode === 'dark' ? '#FFFFFF' : '#000000'};font-family:'Poppins',sans-serif;letter-spacing:-0.02em;">
              SuamiSihat™ Standalone Logomark
            </h3>
            <p style="font-size:0.925rem;line-height:1.7;margin:0;color:{logomarkMode === 'dark' ? '#FCFAF6' : '#19191A'};">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p style="font-size:0.825rem;line-height:1.6;margin:0;color:{logomarkMode === 'dark' ? 'rgba(252,250,246,0.7)' : 'rgba(25,25,26,0.7)'};">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
            </p>
          </div>
        </div>

        <!-- Info Footer -->
        <div style="padding:0.75rem 1.5rem;border-top:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;font-size:0.78rem;color:var(--color-neutral-fg-2);">
          <div id="logomarkInfo" style="display:flex;align-items:center;gap:6px;">
            <iconify-icon icon="fluent:info-24-regular" style="font-size:0.95rem;color:var(--color-brand-primary)"></iconify-icon>
            <span>Surface: <strong style="color:var(--color-neutral-fg-1);">{logomarkMode === 'dark' ? 'Prussian Dark (#022057)' : 'Porcelain Canvas (#FCFAF6)'}</strong> &bull; Selected icon: <code style="color:var(--color-brand-primary);font-weight:700;">{logomarkMode === 'dark' ? 'ss-logomark-dark.svg' : 'ss-logomark-light.svg'}</code></span>
          </div>
          <div style="font-size:0.75rem;color:var(--color-neutral-fg-3);">
            Lightness L {logomarkMode === 'dark' ? '< 50%' : '>= 50%'} &bull; Always pair light icon with dark surfaces and dark icon with light surfaces
          </div>
        </div>
      </div>

      <!-- Please Do / Please Don't Rules -->
      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-top:3px solid #16A34A;border-radius:var(--f-radius-xl);padding:1.5rem;box-shadow:var(--f-shadow-4);height:100%;">
            <div style="font-weight:700;color:#16A34A;margin-bottom:0.75rem;display:flex;align-items:center;gap:6px;">
              <iconify-icon icon="fluent:checkmark-circle-24-filled" style="font-size:1.1rem;"></iconify-icon> Please Do
            </div>
            <ul style="margin:0;padding-left:1.25rem;font-size:0.825rem;color:var(--color-neutral-fg-2);line-height:1.7;">
              <li>Use official artwork supplied by SuamiSihat™ without modification.</li>
              <li>Select the correct light, dark or monochrome logo version for background contrast.</li>
              <li>Maintain the illustrated <code>x</code>-based clear space around all sides.</li>
              <li>Scale logos proportionally &mdash; preserve symbol and wordmark proportions.</li>
              <li>Place logos on clean, uncluttered backgrounds with high contrast ratio.</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-top:3px solid #DC2626;border-radius:var(--f-radius-xl);padding:1.5rem;box-shadow:var(--f-shadow-4);height:100%;">
            <div style="font-weight:700;color:#DC2626;margin-bottom:0.75rem;display:flex;align-items:center;gap:6px;">
              <iconify-icon icon="fluent:dismiss-circle-24-filled" style="font-size:1.1rem;"></iconify-icon> Please Don't
            </div>
            <ul style="margin:0;padding-left:1.25rem;font-size:0.825rem;color:var(--color-neutral-fg-2);line-height:1.7;">
              <li>Stretch, compress, rotate, skew or crop the logo.</li>
              <li>Recolour, swap palette hues or rearrange the wordmark elements.</li>
              <li>Add drop shadows, outlines, gradients, glows, or 3D bevel effects.</li>
              <li>Place the logo on visually noisy, busy or low-contrast backgrounds.</li>
              <li>Imply unapproved endorsement, certification, or false medical claims.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Visual Prohibited Logo Misuse Board -->
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);margin-bottom:2rem;">
        <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">Prohibited Logo Treatments Visual Reference</strong>
          <span class="ss-badge ss-badge-danger" style="font-size:0.7rem;">Brand Violations</span>
        </div>
        <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;width:100%;box-sizing:border-box;">
          <img src="/assets/images/dont.png" alt="SuamiSihat Prohibited Logo Misuse Visual Board" style="width:100%;height:auto;display:block;border-radius:var(--f-radius-md);box-shadow:0 1px 3px rgba(0,0,0,0.06);" loading="lazy" />
        </div>
        <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
          Under no circumstances should the SuamiSihat™ master logomark or wordmark be altered, rotated, recolored, given unapproved drop shadows, stretched, or placed over unapproved colored patterns.
        </div>
      </div>
    </section>

    <!-- ================================================================
         7. DOWNLOADS SECTION (All 10 Kits)
         ================================================================ -->
    <section id="downloads" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">07 &middot; Production Assets</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Direct Asset Download Kits (10 Packages)</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Download raw vector SVG marks, high-resolution ZIP asset kits, font packages, and subsidiary brand kits.</p>

      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:2rem;">
        <!-- 1. Master Brand Kit -->
        <a href="/public/brand/downloads/00_logo_suamisihat.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:var(--color-brand-subtle);color:var(--color-brand-primary);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:star-24-filled"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-brand-primary);font-size:0.92rem;">SuamiSihat™ Master Brand Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Master vector logos (Light, Dark, Mono)</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-brand" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-brand-primary);"></iconify-icon>
          </div>
        </a>

        <!-- 2. SS App Icon -->
        <a href="/public/brand/downloads/ss-app-icon.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(33,161,247,0.1);color:#21A1F7;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:apps-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS App Icon Package</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">iOS &amp; Android app icons with rounded squircle vectors</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 3. SS Colour Palette -->
        <a href="/public/brand/downloads/ss_colour_theme.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(33,161,247,0.08);color:#21A1F7;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:color-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Colour Palette Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">ASE Adobe Swatch Exchange &amp; digital palettes</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 4. SS Typeface Kit -->
        <a href="/public/brand/downloads/ss_typeface_font.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(189,154,115,0.1);color:#BD9A73;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:text-font-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Typeface &amp; Font Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Poppins, Montserrat, Helvetica, Calibri (TTF/OTF/WOFF2)</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 5. SS Icon Logomark -->
        <a href="/public/brand/downloads/ss_icon_logomark.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(229,209,92,0.15);color:#7a6200;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:trophy-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Icon Logomark Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Standalone S-symbol marks (Dark, Light, Monochrome vectors)</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 6. SS Health Corporate Kit -->
        <a href="/public/brand/downloads/01_logo_ssHealth.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(2,32,87,0.07);color:#022057;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:building-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Health Corporate Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Holding company corporate logos and governance assets</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 7. SS Clinic Kit -->
        <a href="/public/brand/downloads/02_logo_ssClinic.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(4,51,136,0.08);color:#043388;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:heart-pulse-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Clinic Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Clinical marks and medical consultation graphics</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 8. SS Wellness Kit -->
        <a href="/public/brand/downloads/03_logo_ssWellness.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(33,161,247,0.08);color:#21A1F7;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:sport-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Wellness Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Preventative health, physiotherapy, and wellness assets</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 9. SS Ecommerce Kit -->
        <a href="/public/brand/downloads/04_logo_ssEcom.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(189,154,115,0.1);color:#BD9A73;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:shopping-bag-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Ecommerce Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Official store vectors, packaging, and digital retail kits</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>

        <!-- 10. SS Technology Kit -->
        <a href="/public/brand/downloads/05_logo_ssTech.zip" download class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;transition:transform 0.15s ease, background 0.15s ease;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(109,198,236,0.1);color:#0e7fc5;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">
              <iconify-icon icon="fluent:code-24-regular"></iconify-icon>
            </div>
            <div>
              <strong style="color:var(--color-neutral-fg-1);font-size:0.92rem;">SS Technology Kit</strong>
              <div style="font-size:0.72rem;color:var(--color-neutral-fg-3);">Digital health app icons, SDK marks, and developer graphics</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="ss-badge ss-badge-neutral" style="font-size:0.7rem;">ZIP</span>
            <iconify-icon icon="fluent:arrow-download-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
          </div>
        </a>
      </div>
    </section>

    <!-- ================================================================
         8. CLIENT REPRESENTATION & DIGNITY STANDARD
         ================================================================ -->
    <section id="client-representation" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">08 &middot; Governance &amp; Ecosystem Delivery</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Client Representation &amp; Dignity Standards</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">How internal staff, developers, and designers must represent the SuamiSihat™ brand across patient-facing portals, teleconsultation interfaces, clinics, and packaging.</p>

      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);box-shadow:var(--f-shadow-4);">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
              <div style="width:40px;height:40px;border-radius:var(--f-radius-md);background:var(--color-brand-subtle);color:var(--color-brand-primary);display:flex;align-items:center;justify-content:center;font-size:1.25rem;">
                <iconify-icon icon="fluent:color-background-24-regular"></iconify-icon>
              </div>
              <h3 style="margin:0;font-size:1.1rem;font-weight:700;color:var(--color-neutral-fg-1);">60:30:10 Visual Hierarchy</h3>
            </div>
            <p style="color:var(--color-neutral-fg-2);line-height:1.6;font-size:0.875rem;">
              Every client-facing screen must maintain a clean visual mass distribution: <strong>60% Foundation</strong> (clinical canvas), <strong>30% Secondary</strong> (structure &amp; cards), and <strong>10% Accent</strong> (reserved for the primary booking CTA).
            </p>
            <ul style="margin:0;padding-left:1.25rem;font-size:0.8125rem;color:var(--color-neutral-fg-2);line-height:1.6;">
              <li><strong>60% Canvas:</strong> <code>#F8FAFC</code> / <code>#FFFFFF</code> (Light) or <code>#090D16</code> (Dark)</li>
              <li><strong>30% Structure:</strong> <code>#022057</code> (Prussian Blue) &amp; <code>#043388</code> (SS Blue)</li>
              <li><strong>10% Focal CTA:</strong> <code>#21A1F7</code> (Azure) or <code>#FCE53D</code> (Banana Yellow)</li>
            </ul>
          </div>
        </div>

        <div class="col-md-6">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);box-shadow:var(--f-shadow-4);">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
              <div style="width:40px;height:40px;border-radius:var(--f-radius-md);background:rgba(22,163,74,0.10);color:#16a34a;display:flex;align-items:center;justify-content:center;font-size:1.25rem;">
                <iconify-icon icon="fluent:shield-checkmark-24-regular"></iconify-icon>
              </div>
              <h3 style="margin:0;font-size:1.1rem;font-weight:700;color:var(--color-neutral-fg-1);">Dignity &amp; Claims Integrity</h3>
            </div>
            <p style="color:var(--color-neutral-fg-2);line-height:1.6;font-size:0.875rem;">
              Our positioning is <strong>Modern Masculine Healthcare</strong>. We speak with clinical precision, empathy, and dignity.
            </p>
            <ul style="margin:0;padding-left:1.25rem;font-size:0.8125rem;color:var(--color-neutral-fg-2);line-height:1.6;">
              <li><strong>MASCULINE &ne; MACHO:</strong> Zero emasculation shame, bro-science myths, or fake urgency.</li>
              <li><strong>MOH / NPRA Truth:</strong> Zero 100% cure guarantees or unscientific claims.</li>
              <li><strong>Strict Text Neutrality:</strong> Text strictly uses <code>#1C1C1C</code>. Pure <code>#000000</code> is forbidden for text.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
         9. TOKENS EXPORT SECTION
         ================================================================ -->
    <section id="tokens-export" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">09 &middot; Developer Handoff</div>
      <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Multi-Platform Token Exporters</h2>
      <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Instantly export standardized design tokens ready for production deployment across Web, Flutter, and WPF desktop.</p>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <button class="ss-btn ss-btn-sm" class:ss-btn-primary={exportPlatform === 'tailwind'} class:ss-btn-secondary={exportPlatform !== 'tailwind'} onclick={() => (exportPlatform = 'tailwind')}>Tailwind CSS</button>
        <button class="ss-btn ss-btn-sm" class:ss-btn-primary={exportPlatform === 'flutter'} class:ss-btn-secondary={exportPlatform !== 'flutter'} onclick={() => (exportPlatform = 'flutter')}>Flutter (Dart)</button>
        <button class="ss-btn ss-btn-sm" class:ss-btn-primary={exportPlatform === 'wpf'} class:ss-btn-secondary={exportPlatform !== 'wpf'} onclick={() => (exportPlatform = 'wpf')}>WPF (XAML)</button>
        <button class="ss-btn ss-btn-sm" class:ss-btn-primary={exportPlatform === 'css'} class:ss-btn-secondary={exportPlatform !== 'css'} onclick={() => (exportPlatform = 'css')}>CSS Variables</button>
        <button class="ss-btn ss-btn-sm" class:ss-btn-primary={exportPlatform === 'json'} class:ss-btn-secondary={exportPlatform !== 'json'} onclick={() => (exportPlatform = 'json')}>W3C JSON</button>
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
