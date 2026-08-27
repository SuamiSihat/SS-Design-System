# SuamiSihat™ Hero Banner Standard (`ss-hero`)

## Overview

The **`ss-hero`** component (and `<SSHero />` in Svelte) is the **official default background and container component for all hero-type banners**, master headers, landing page entrypoints, and product headers across the entire SuamiSihat™ digital ecosystem.

```text
┌─────────────────────────────────────────────────────────────┐
│ 60% Dominant Base: Brand Vertical Gradient (#022057 → #043388)│
│ 30% Structural Depth: Radial Ambient Light Bloom (60px Blur) │
│ 10% Kinetic Motion: Interactive Vitality Wave & ♂ Particles │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Visual Allocation & Composition Rules

The hero banner strictly abides by the **60:30:10 Design System Hierarchy**:

| Layer | Allocation | Specification | Purpose |
|---|---|---|---|
| **Dominant Base** | **60%** | `--gradient-brand-vertical`<br>Light: `#022057` ➔ `#043388`<br>Dark: `#021440` ➔ `#022057` | Instills clinical trust, male wellness foundation, and visual authority. |
| **Structural Depth** | **30%** | `.f-hero-ambient-glow` / `.ss-hero-ambient-glow`<br>Radial gradient bloom (`#21A1F7` at 22% opacity) | Creates atmospheric focal depth without distracting from typography. |
| **Kinetic Motion** | **10%** | `.hero-wave-canvas` (`#heroWaveCanvas`)<br>Sine vitality waves + Mars `♂` particles + Azure/Gold energy nodes | Represents biological energy, vitality, and interactive dynamism. |

---

## 2. Kinetic Particle Wave Dynamics

The kinetic background renders via an HTML5 2D Canvas engine:
- **Sine Vitality Waveform**: Multi-layered flowing wave oscillating at 60 FPS, with vertical amplitudes adjusting smoothly.
- **Mars Gender Nodes (`♂`)**: Floating masculine biological glyphs drifting vertically and reacting to cursor displacement.
- **Energy Spark Nodes**: Azure (`#21A1F7`) and Banana Yellow (`#F7E143`) particles pulsing with soft glow halos.
- **Cursor Interactive Parallax**: Mouse tracking gently lifts wave crests and attracts nearby particles toward the cursor.
- **Accessibility Safeguard**: Automatically pauses motion when `prefers-reduced-motion: reduce` is detected.

---

## 3. Web & Vanilla HTML/CSS Implementation

```html
<!-- HTML Structure -->
<section class="ss-hero" role="region" aria-label="Hero Banner">
  <!-- Interactive Wave & Particle Canvas Background -->
  <canvas id="heroWaveCanvas" class="hero-wave-canvas"></canvas>

  <!-- Ambient Glow Backdrop -->
  <div class="f-hero-ambient-glow"></div>

  <div class="f-hero-inner">
    <div class="f-hero-eyebrow">
      <iconify-icon icon="fluent:record-16-regular"></iconify-icon>
      Design System &mdash; SuamiSihat™
    </div>
    <h1 class="f-hero-title">Ship the SuamiSihat™ brand faster and better.</h1>
    <p class="f-hero-subtitle">The standard background banner component for all hero headers.</p>
    <div class="f-hero-ctas">
      <a href="/brand-system/" class="ss-btn ss-btn-primary">Explore Brand System</a>
    </div>
  </div>
</section>

<!-- Assets script initializes canvas wave animation -->
<script src="assets/js/main.js" defer></script>
```

---

## 4. SvelteKit Svelte 5 Implementation

The design system provides the canonical `<SSHero />` component at `$lib/components/SSHero.svelte`:

```svelte
<script>
  import SSHero from '$lib/components/SSHero.svelte';
</script>

<SSHero
  eyebrow="Design System — SuamiSihat™"
  title="Ship the SuamiSihat™ brand faster and better."
  subtitle="The single source of truth for brand standards, design tokens, and components."
  showBadges={true}
  minHeight="520px"
>
  <div class="f-hero-ctas" style="display:flex; gap:1rem; justify-content:center; margin-top:1.5rem;">
    <a href="/brand-system/" class="ss-btn ss-btn-cta">Explore Brand System</a>
    <a href="/brand-guidelines/" class="ss-btn ss-btn-secondary">Guidelines</a>
  </div>
</SSHero>
```

### Component Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `''` | Main hero heading (`<h1>`). |
| `subtitle` | `string` | `''` | Secondary descriptive paragraph. |
| `eyebrow` | `string` | `''` | Category or pill label above heading. |
| `align` | `'center' \| 'left'` | `'center'` | Text alignment within inner container. |
| `minHeight` | `string` | `'480px'` | Minimum height constraint of banner. |
| `showBadges` | `boolean` | `false` | Displays platform version badges. |
| `showScrollIndicator` | `boolean` | `false` | Displays subtle animated scroll down arrow. |

---

## 5. Expo / React Native Implementation

```tsx
// SSHeroBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SSColors, SSSpacing } from './ss_tokens';

export function SSHeroBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[SSColors.prussianBlue, SSColors.ssBlue, '#021A40']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>SUAMISIHAT™ HERO STANDARD</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 380, justifyContent: 'center', alignItems: 'center', padding: SSSpacing.s6, overflow: 'hidden' },
  content: { alignItems: 'center', maxWidth: 480 },
  eyebrow: { color: SSColors.azure, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
  title: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
```

---

## 6. Flutter Implementation

```dart
// ss_hero_banner.dart
import 'package:flutter/material.dart';

class SSHeroBanner extends StatelessWidget {
  final String title;
  final String subtitle;

  const SSHeroBanner({Key? key, required this.title, required this.subtitle}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minHeight: 420),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFF022057), Color(0xFF043388), Color(0xFF021A40)],
        ),
      ),
      child: Stack(
        children: [
          // Wave & Mars Particle CustomPainter
          Positioned.fill(child: CustomPaint(painter: SSHeroWavePainter())),
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 12),
                  Text(subtitle, textAlign: TextAlign.center, style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 15)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

---

## 7. Agent Rule 6 Reference

All automated tooling and AI agents working in this codebase must adhere to **Rule 6** of `.agents/AGENTS.md`:
1. Use `.ss-hero` / `<SSHero />` whenever creating or updating hero headers.
2. Never replace the background with arbitrary solid blocks or unapproved photographic stock.
3. Preserve the 60% brand vertical gradient, 30% ambient glow bloom, and 10% kinetic wave dynamics.
