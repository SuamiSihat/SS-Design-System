<script>
  import ColorSwatch from '$lib/components/ColorSwatch.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';

  let activeTab = $state('colors');
  let exportPlatform = $state('tailwind');
</script>

<svelte:head>
  <title>Design Tokens & System — SuamiSihat™ Design System</title>
</svelte:head>

<div class="container-xl py-5">
  <!-- Header -->
  <div class="mb-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb" style="font-size: 0.8rem;">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Design Tokens</li>
      </ol>
    </nav>
    <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">W3C Token Architecture</div>
    <h1 class="display-6 fw-bold mb-2">Design Tokens & Fluent 2 Variables</h1>
    <p class="lead text-secondary" style="max-width: 780px;">
      Cross-platform tokens for Web, Expo, Flutter, and Windows WPF (SS-CAM). Standardized for color, typography, elevation, and motion.
    </p>

    <!-- Filter Tabs -->
    <div class="d-flex gap-2 mt-4 flex-wrap">
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'colors'}
        class:btn-outline-secondary={activeTab !== 'colors'}
        onclick={() => (activeTab = 'colors')}
      >
        Colors & Palettes
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'typography'}
        class:btn-outline-secondary={activeTab !== 'typography'}
        onclick={() => (activeTab = 'typography')}
      >
        Typography Scale
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'elevation'}
        class:btn-outline-secondary={activeTab !== 'elevation'}
        onclick={() => (activeTab = 'elevation')}
      >
        Elevation & Shadows
      </button>
      <button 
        type="button" 
        class="btn btn-sm rounded-pill px-4" 
        class:btn-primary={activeTab === 'export'}
        class:btn-outline-secondary={activeTab !== 'export'}
        onclick={() => (activeTab = 'export')}
      >
        Multi-Platform Exports
      </button>
    </div>
  </div>

  <!-- TAB: COLORS -->
  {#if activeTab === 'colors'}
    <section class="mb-5">
      <h3 class="h5 fw-bold mb-3">1. Brand & Structural Core</h3>
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <ColorSwatch name="Prussian Blue" hex="#022057" role="Primary Anchor / Header" allocation="30%" />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="SuamiSihat Blue" hex="#043388" role="Primary Brand Action" allocation="30%" />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Azure Blue" hex="#21A1F7" role="10% Primary Conversion CTA" allocation="10%" />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Banana Yellow" hex="#F7E143" role="10% Vitality Energy" allocation="10%" isDarkText={true} />
        </div>
      </div>

      <h3 class="h5 fw-bold mb-3">2. Neutral & Canvas Scales</h3>
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <ColorSwatch name="Neutral Black" hex="#1C1C1C" role="Primary Text Standard" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Neutral Grey" hex="#64748B" role="Secondary Text & Captions" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Canvas Light" hex="#F8FAFC" role="Clinical Page Canvas" allocation="60%" isDarkText={true} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Pure White" hex="#FFFFFF" role="Surface / Card Elevation" allocation="60%" isDarkText={true} />
        </div>
      </div>

      <h3 class="h5 fw-bold mb-3">3. Medical & Status Semantics</h3>
      <div class="row g-3">
        <div class="col-6 col-md-3">
          <ColorSwatch name="Success Green" hex="#10B981" role="Confirmed / Available / AAA" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Warning Amber" hex="#F59E0B" role="Attention / Pending Review" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Danger Red" hex="#EF4444" role="Critical / Contraindication" isDarkText={false} />
        </div>
        <div class="col-6 col-md-3">
          <ColorSwatch name="Info Sky" hex="#0284C7" role="Informational Patient Note" isDarkText={false} />
        </div>
      </div>
    </section>
  {/if}

  <!-- TAB: TYPOGRAPHY -->
  {#if activeTab === 'typography'}
    <section class="mb-5">
      <div class="card p-4 p-md-5 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
        <h3 class="h5 fw-bold mb-4">Fluent 2 Modular Typography Scale</h3>
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr class="text-secondary" style="font-size: 0.8rem; text-transform: uppercase;">
                <th>Token</th>
                <th>Size / Weight</th>
                <th>Line Height</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--f-font-display</code></td>
                <td>48px / Bold (700)</td>
                <td>1.15</td>
                <td><span style="font-size: 2rem; font-weight: 700; color: #1C1C1C;">Display Hero</span></td>
              </tr>
              <tr>
                <td><code>--f-font-title-1</code></td>
                <td>32px / Bold (700)</td>
                <td>1.2</td>
                <td><span style="font-size: 1.5rem; font-weight: 700; color: #1C1C1C;">Section Title 1</span></td>
              </tr>
              <tr>
                <td><code>--f-font-title-2</code></td>
                <td>24px / SemiBold (600)</td>
                <td>1.25</td>
                <td><span style="font-size: 1.25rem; font-weight: 600; color: #1C1C1C;">Card Heading 2</span></td>
              </tr>
              <tr>
                <td><code>--f-font-body-1</code></td>
                <td>16px / Regular (400)</td>
                <td>1.5</td>
                <td><span style="font-size: 1rem; color: #1C1C1C;">Standard clinical body copy and descriptions.</span></td>
              </tr>
              <tr>
                <td><code>--f-font-caption</code></td>
                <td>12px / Regular (400)</td>
                <td>1.4</td>
                <td><span style="font-size: 0.75rem; color: #64748B;">Helper text, metadata badges and timestamps.</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  {/if}

  <!-- TAB: ELEVATION -->
  {#if activeTab === 'elevation'}
    <section class="mb-5">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="p-4 rounded-4 text-center bg-white" style="box-shadow: var(--f-shadow-2, 0 1px 2px rgba(0,0,0,0.06)); border: 1px solid #E2E8F0;">
            <div class="fw-bold mb-1">Elevation 2</div>
            <code class="text-muted" style="font-size: 0.75rem;">--f-shadow-2</code>
            <p class="mt-2 text-secondary" style="font-size: 0.8rem;">Resting cards & list items</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-4 text-center bg-white" style="box-shadow: var(--f-shadow-8, 0 4px 14px rgba(0,0,0,0.08)); border: 1px solid #E2E8F0;">
            <div class="fw-bold mb-1">Elevation 8</div>
            <code class="text-muted" style="font-size: 0.75rem;">--f-shadow-8</code>
            <p class="mt-2 text-secondary" style="font-size: 0.8rem;">Sticky navbars & hover states</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-4 text-center bg-white" style="box-shadow: var(--f-shadow-28, 0 14px 28px rgba(0,0,0,0.12)); border: 1px solid #E2E8F0;">
            <div class="fw-bold mb-1">Elevation 28</div>
            <code class="text-muted" style="font-size: 0.75rem;">--f-shadow-28</code>
            <p class="mt-2 text-secondary" style="font-size: 0.8rem;">Modals, flyouts & dropdowns</p>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- TAB: MULTI-PLATFORM EXPORTS -->
  {#if activeTab === 'export'}
    <section class="mb-5">
      <div class="card p-4 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div>
            <h4 class="fw-bold mb-1">Multi-Platform Token Code Snippets</h4>
            <p class="text-secondary mb-0" style="font-size: 0.85rem;">
              Export 60:30:10 color tokens directly into your project's native syntax.
            </p>
          </div>
          <div class="d-flex gap-1">
            <button 
              type="button" 
              class="btn btn-sm"
              class:btn-primary={exportPlatform === 'tailwind'}
              class:btn-outline-secondary={exportPlatform !== 'tailwind'}
              onclick={() => (exportPlatform = 'tailwind')}
            >
              Tailwind CSS
            </button>
            <button 
              type="button" 
              class="btn btn-sm"
              class:btn-primary={exportPlatform === 'flutter'}
              class:btn-outline-secondary={exportPlatform !== 'flutter'}
              onclick={() => (exportPlatform = 'flutter')}
            >
              Flutter
            </button>
            <button 
              type="button" 
              class="btn btn-sm"
              class:btn-primary={exportPlatform === 'wpf'}
              class:btn-outline-secondary={exportPlatform !== 'wpf'}
              onclick={() => (exportPlatform = 'wpf')}
            >
              WPF XAML
            </button>
            <button 
              type="button" 
              class="btn btn-sm"
              class:btn-primary={exportPlatform === 'css'}
              class:btn-outline-secondary={exportPlatform !== 'css'}
              onclick={() => (exportPlatform = 'css')}
            >
              CSS Vars
            </button>
            <button 
              type="button" 
              class="btn btn-sm"
              class:btn-primary={exportPlatform === 'json'}
              class:btn-outline-secondary={exportPlatform !== 'json'}
              onclick={() => (exportPlatform = 'json')}
            >
              W3C JSON
            </button>
          </div>
        </div>

        {#if exportPlatform === 'tailwind'}
          <CodeBox 
            title="Tailwind CSS theme.extend.colors"
            language="javascript"
            code={`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: { light: '#F8FAFC', surface: '#FFFFFF', dark: '#090D16' },
        ss: {
          prussian: '#022057', // 30% Structural anchor
          blue: '#043388',     // 30% Brand secondary
          azure: '#21A1F7',    // 10% Primary conversion CTA
          banana: '#F7E143',   // 10% Vitality energy
          black: '#1C1C1C'     // Strict neutral text
        }
      }
    }
  }
};`}
          />
        {/if}

        {#if exportPlatform === 'flutter'}
          <CodeBox 
            title="Flutter Dart Theme Palette"
            language="dart"
            code={`// suamisihat_theme.dart
import 'package:flutter/material.dart';

class SSColors {
  static const Color canvasLight = Color(0xFFF8FAFC);
  static const Color prussianBlue = Color(0xFF022057); // 30% Structure
  static const Color ssBlue = Color(0xFF043388);       // 30% Brand
  static const Color azureBlue = Color(0xFF21A1F7);    // 10% Primary CTA
  static const Color bananaYellow = Color(0xFFF7E143); // 10% Highlight
  static const Color neutralBlack = Color(0xFF1C1C1C); // Typography standard
}`}
          />
        {/if}

        {#if exportPlatform === 'wpf'}
          <CodeBox 
            title="Windows WPF XAML ResourceDictionary"
            language="xml"
            code={`<!-- SuamiSihatTheme.xaml -->
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <SolidColorBrush x:Key="SSCanvasLightBrush" Color="#F8FAFC"/>
    <SolidColorBrush x:Key="SSPrussianBlueBrush" Color="#022057"/>
    <SolidColorBrush x:Key="SSBlueBrush" Color="#043388"/>
    <SolidColorBrush x:Key="SSAzureCTA" Color="#21A1F7"/>
    <SolidColorBrush x:Key="SSBananaEnergy" Color="#F7E143"/>
    <SolidColorBrush x:Key="SSNeutralBlack" Color="#1C1C1C"/>
</ResourceDictionary>`}
          />
        {/if}

        {#if exportPlatform === 'css'}
          <CodeBox 
            title="CSS Custom Properties (:root)"
            language="css"
            code={`:root {
  /* 60% Foundation */
  --ss-canvas-light: #F8FAFC;
  --ss-surface-white: #FFFFFF;
  
  /* 30% Structural Trust */
  --ss-prussian-blue: #022057;
  --ss-blue-primary: #043388;
  
  /* 10% Primary Conversion */
  --ss-azure-cta: #21A1F7;
  --ss-banana-vitality: #F7E143;
  
  /* Neutral Typography */
  --ss-neutral-black: #1C1C1C;
}`}
          />
        {/if}

        {#if exportPlatform === 'json'}
          <CodeBox 
            title="W3C tokens.json"
            language="json"
            code={`{
  "color": {
    "brand": {
      "prussian": { "value": "#022057", "type": "color" },
      "primary": { "value": "#043388", "type": "color" },
      "azure": { "value": "#21A1F7", "type": "color" },
      "banana": { "value": "#F7E143", "type": "color" }
    },
    "neutral": {
      "black": { "value": "#1C1C1C", "type": "color" },
      "canvas": { "value": "#F8FAFC", "type": "color" }
    }
  }
}`}
          />
        {/if}
      </div>
    </section>
  {/if}

</div>
