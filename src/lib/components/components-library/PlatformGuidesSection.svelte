<script>
  import CodeBox from '$lib/components/CodeBox.svelte';
</script>

<!-- 19. Platform Integration Guides -->
<section class="cl-section" id="tokens-json" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">Platform Integration</div>
  <h2 class="cl-section-title">Developer Handoff &amp; SDK Guides</h2>

  <!-- Raw JSON Tokens Export -->
  <div class="cl-card mb-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
    <div class="cl-card-header" style="padding:1rem 1.25rem; font-weight:700; border-bottom:1px solid var(--color-neutral-stroke-1);">W3C Design Tokens JSON (design-tokens.json)</div>
    <CodeBox code={`{
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
}`} language="json" />
  </div>

  <!-- Flutter Guide -->
  <div class="cl-card mb-4" id="flutter" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
    <div class="cl-card-header" style="padding:1rem 1.25rem; font-weight:700; border-bottom:1px solid var(--color-neutral-stroke-1);">Flutter Design Tokens (ss_tokens.dart)</div>
    <CodeBox code={`// pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  fluentui_system_icons: ^1.1.195

// ss_tokens.dart
import 'package:flutter/material.dart';

abstract class SSColors {
  static const prussianBlue = Color(0xFF022057);
  static const ssBlue       = Color(0xFF043388);
  static const azure        = Color(0xFF21A1F7);
  static const malibu       = Color(0xFF6DC6EC);
  static const bananaYellow = Color(0xFFFCE53D);
  static const neutralBlack = Color(0xFF1C1C1C);
}`} language="dart" />
  </div>

  <!-- Expo Setup Checklist -->
  <div class="cl-card" id="expo-install" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem;">
    <h4 style="font-size:1.1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:1rem;">Expo React Native Setup (SDK 51+)</h4>
    <div style="display:flex; flex-direction:column; gap:10px; font-size:0.85rem;">
      <div><strong>Step 1:</strong> <code>npx create-expo-app@latest ss-app --template blank-typescript</code></div>
      <div><strong>Step 2:</strong> <code>npx expo install @fluentui/react-native-icons react-native-svg @expo-google-fonts/inter</code></div>
      <div><strong>Step 3:</strong> <code>npx expo install @react-navigation/native @react-navigation/bottom-tabs</code></div>
      <div><strong>Step 4:</strong> <code>npx expo install @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler</code></div>
      <div><strong>Step 5:</strong> <code>npx expo install react-native-toast-message</code></div>
    </div>
  </div>
</section>
