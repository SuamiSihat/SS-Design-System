<script>
  import CodeBox from '$lib/components/CodeBox.svelte';
  import SSHero from '$lib/components/SSHero.svelte';

  let activeCodeTab = $state('svelte');

  const codeSnippets = {
    heroSvelte: `<!-- SvelteKit Component Usage -->
<` + `script>
  import SSHero from '$lib/components/SSHero.svelte';
<` + `/script>

<SSHero
  eyebrow="Design System — SuamiSihat®"
  title="Ship the SuamiSihat® brand faster and better."
  subtitle="The single source of truth for brand standards, design tokens, and components."
  showBadges={true}
  minHeight="480px"
>
  <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
    <a href="/brand-system/" class="ss-btn ss-btn-cta">Explore Brand System</a>
    <a href="/brand-guidelines/" class="ss-btn ss-btn-secondary">Guidelines</a>
  </div>
</SSHero>`,
    heroWeb: `<!-- Vanilla HTML/CSS Default Hero Standard -->
<section class="ss-hero" role="region" aria-label="Hero Banner">
  <!-- Interactive Wave & Particle Canvas Background -->
  <canvas id="heroWaveCanvas" class="hero-wave-canvas"></canvas>

  <!-- Ambient Glow Backdrop -->
  <div class="f-hero-ambient-glow"></div>

  <div class="f-hero-inner">
    <div class="f-hero-eyebrow">
      <iconify-icon icon="fluent:record-16-regular"></iconify-icon>
      Design System &mdash; SuamiSihat®
    </div>
    <h1 class="f-hero-title">Ship the SuamiSihat® brand faster and better.</h1>
    <p class="f-hero-subtitle">The standard background banner component for all hero headers.</p>
    <div class="f-hero-ctas">
      <a href="#explore" class="ss-btn ss-btn-primary">Explore Brand System</a>
    </div>
  </div>
</section>

<!-- Static HTML: the canvas wave is decorative and optional.
     In SvelteKit use <SSHero />, which runs the animation. -->`,
    heroExpo: `// Expo React Native (TSX)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SSColors, SSRadius, SSSpacing, SSFont } from './ss_tokens';

export function SSHeroBanner({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[SSColors.prussianBlue, SSColors.ssBlue, '#021A40']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>DESIGN SYSTEM — SUAMISIHAT®</Text>
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
});`,
    heroFlutter: `// Flutter CustomPainter Animated Hero Banner
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
}`
  };
</script>

<!-- 6. SS Hero Component (Default Hero Banner Standard) -->
<section class="cl-section" id="ss-hero" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">Standard Container</div>
  <h2 class="cl-section-title">SS Hero Banner (<code>ss-hero</code>)</h2>
  <p class="cl-section-desc">
    The official default background and container component for all hero-type banners, landing headers, and product master headers across SuamiSihat®. Combines the 60:30 brand base gradient, a 30% ambient glow bloom, and a 10% interactive kinetic particle wave canvas with Mars-symbol energy nodes.
  </p>

  <!-- Live Interactive Demo of SSHero -->
  <div class="cl-card mb-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
    <div style="border-radius:var(--f-radius-xl); overflow:hidden;">
      <SSHero
        eyebrow="OFFICIAL HERO STANDARD"
        titleTag="h2"
        title="Interactive Vitality Wave &amp; Energy Particles"
        subtitle="Default background for all SuamiSihat® hero banners with mouse-reactive kinetic waves and ambient glow."
        minHeight="360px"
        showBadges={true}
      />
    </div>

    <!-- Code Tabs: Svelte vs Web vs Expo vs Flutter -->
    <div style="border-top:1px solid var(--color-neutral-stroke-1); padding:0.5rem 1rem; background:var(--color-neutral-bg-3); display:flex; gap:0.5rem; flex-wrap:wrap;">
      <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTab === 'svelte'} class:ss-btn-secondary={activeCodeTab !== 'svelte'} onclick={() => activeCodeTab = 'svelte'}><iconify-icon icon="fluent:flash-24-regular"></iconify-icon> Svelte</button>
      <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTab === 'web'} class:ss-btn-secondary={activeCodeTab !== 'web'} onclick={() => activeCodeTab = 'web'}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> HTML/CSS</button>
      <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTab === 'expo'} class:ss-btn-secondary={activeCodeTab !== 'expo'} onclick={() => activeCodeTab = 'expo'}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
      <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTab === 'flutter'} class:ss-btn-secondary={activeCodeTab !== 'flutter'} onclick={() => activeCodeTab = 'flutter'}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Flutter</button>
    </div>
    <CodeBox
      code={activeCodeTab === 'svelte' ? codeSnippets.heroSvelte : activeCodeTab === 'web' ? codeSnippets.heroWeb : activeCodeTab === 'expo' ? codeSnippets.heroExpo : codeSnippets.heroFlutter}
      language={activeCodeTab === 'svelte' ? 'html' : activeCodeTab === 'web' ? 'html' : activeCodeTab === 'expo' ? 'typescript' : 'dart'}
    />
  </div>
</section>
