<script>
  import CodeBox from '$lib/components/CodeBox.svelte';

  let exportPlatform = $state('tailwind');

  const tokenExports = {
    tailwind: `// tailwind.config.js - SuamiSihat® Fluent 2 Design Tokens
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
    flutter: `// ss_colors.dart - SuamiSihat® Flutter Design Tokens
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
    wpf: `<!-- SSColors.xaml - SuamiSihat® WPF XAML Tokens -->
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
    css: `/* ss_tokens.css - SuamiSihat® W3C CSS Variables */
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
