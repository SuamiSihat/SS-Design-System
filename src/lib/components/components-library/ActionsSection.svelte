<script>
  import CodeBox from '$lib/components/CodeBox.svelte';

  let activeButtonCodeTab = $state('web');

  const codeSnippets = {
    buttonsWeb: `<!-- Banana Yellow CTA Button (#FCE53D bg, #1C1C1C Neutral Black text) -->
<button class="ss-btn ss-btn-cta">
  <iconify-icon icon="fluent:flash-24-filled"></iconify-icon> BOOK APPOINTMENT
</button>

<!-- Primary Action Button -->
<button class="ss-btn ss-btn-primary">
  <iconify-icon icon="fluent:checkmark-24-regular"></iconify-icon> Primary Action
</button>`,
    buttonsExpo: `// Expo React Native (TSX)
import { Pressable, Text } from 'react-native';
import { Flash24Filled, Checkmark24Regular } from '@fluentui/react-native-icons';
import { SSColors, SSBase, SSIcon } from './ss_tokens';

export function ActionButtons() {
  return (
    <>
      <Pressable style={[SSBase.btnBase, SSBase.btnCta]}>
        <Flash24Filled width={SSIcon.md} height={SSIcon.md} color={SSColors.neutralBlack} />
        <Text style={SSBase.btnTextCta}>BOOK APPOINTMENT</Text>
      </Pressable>
      <Pressable style={[SSBase.btnBase, SSBase.btnPrimary]}>
        <Checkmark24Regular width={SSIcon.md} height={SSIcon.md} color={SSColors.white} />
        <Text style={SSBase.btnTextPrimary}>Primary Action</Text>
      </Pressable>
    </>
  );
}`
  };
</script>

<!-- 7. Buttons & Calls to Action -->
<section class="cl-section" id="buttons" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">Interactive Controls</div>
  <h2 class="cl-section-title">Buttons &amp; Calls to Action</h2>
  <p class="cl-section-desc">Fluent 2 buttons with 44px touch targets, accessible focus indicators, and spring transitions.</p>

  <div class="cl-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; margin-bottom:1.5rem;">
    <div style="padding:1.5rem; display:flex; flex-wrap:wrap; gap:12px; align-items:center; background:var(--color-neutral-bg-1);">
      <button class="ss-btn ss-btn-primary"><iconify-icon icon="fluent:checkmark-24-regular"></iconify-icon> Primary Action</button>
      <button class="ss-btn ss-btn-cta"><iconify-icon icon="fluent:flash-24-filled"></iconify-icon> BOOK APPOINTMENT</button>
      <button class="ss-btn ss-btn-secondary"><iconify-icon icon="fluent:add-24-regular"></iconify-icon> Secondary Action</button>
      <button class="ss-btn ss-btn-ghost">Ghost Link</button>
      <button class="ss-btn ss-btn-danger"><iconify-icon icon="fluent:delete-24-regular"></iconify-icon> Destructive</button>
      <button class="ss-btn ss-btn-primary" disabled>Disabled</button>
    </div>

    <!-- Code Tabs: Web vs Expo -->
    <div style="border-top:1px solid var(--color-neutral-stroke-1); padding:0.5rem 1rem; background:var(--color-neutral-bg-3); display:flex; gap:0.5rem;">
      <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeButtonCodeTab === 'web'} class:ss-btn-secondary={activeButtonCodeTab !== 'web'} onclick={() => activeButtonCodeTab = 'web'}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> Web</button>
      <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeButtonCodeTab === 'expo'} class:ss-btn-secondary={activeButtonCodeTab !== 'expo'} onclick={() => activeButtonCodeTab = 'expo'}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
    </div>
    <CodeBox code={activeButtonCodeTab === 'expo' ? codeSnippets.buttonsExpo : codeSnippets.buttonsWeb} language={activeButtonCodeTab === 'expo' ? 'typescript' : 'html'} />
  </div>
</section>

<!-- 8. Badges & Chips -->
<section class="cl-section" id="badges" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">Metadata &amp; Filtering</div>
  <h2 class="cl-section-title">Badges, Pills &amp; Chips</h2>
  <div class="cl-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem;">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:1rem;">
      <span class="ss-badge ss-badge-brand">Brand Core</span>
      <span class="ss-badge ss-badge-success"><iconify-icon icon="fluent:checkmark-circle-24-regular"></iconify-icon> Verified Doctor</span>
      <span class="ss-badge ss-badge-warning"><iconify-icon icon="fluent:warning-24-regular"></iconify-icon> Pending Lab</span>
      <span class="ss-badge ss-badge-danger">Urgent Action</span>
      <span class="ss-badge ss-badge-neutral">Internal Note</span>
    </div>
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <span class="ss-chip ss-chip-selected"><iconify-icon icon="fluent:checkmark-24-regular"></iconify-icon> All Services</span>
      <span class="ss-chip">Clinical RX</span>
      <span class="ss-chip">Hardware (VED)</span>
      <span class="ss-chip">Superfoods</span>
    </div>
  </div>
</section>
