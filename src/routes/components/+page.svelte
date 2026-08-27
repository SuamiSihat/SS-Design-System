<script>
  import { onMount } from 'svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';

  let isSidebarMinimized = $state(false);
  let activeTab = $state('overview');
  let activeCodeTabs = $state({
    nav: 'web',
    modal: 'web',
    toast: 'web',
    empty: 'web',
    list: 'web',
    buttons: 'web'
  });
  let activeBottomTab = $state('home');
  let emailAlertsOn = $state(false);
  let pushNotificationsOn = $state(true);
  let copiedIcon = $state('');
  let copiedSwatchText = $state('');
  let liveToasts = $state([]);
  let isDemoModalOpen = $state(false);

  function spawnToast(type = 'success', title = 'Action Completed', msg = 'Your changes have been saved.') {
    const id = Date.now() + Math.random();
    const newToast = { id, type, title, msg };
    liveToasts = [...liveToasts, newToast];
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }

  function removeToast(id) {
    liveToasts = liveToasts.filter(t => t.id !== id);
  }

  function copySwatch(hex, name) {
    navigator.clipboard.writeText(hex);
    copiedSwatchText = `Copied ${name} (${hex})`;
    setTimeout(() => (copiedSwatchText = ''), 2000);
  }

  function toggleSidebar() {
    isSidebarMinimized = !isSidebarMinimized;
  }

  function setCodeTab(group, platform) {
    activeCodeTabs[group] = platform;
  }

  function copyText(text, iconName) {
    navigator.clipboard.writeText(text);
    if (iconName) {
      copiedIcon = iconName;
      setTimeout(() => (copiedIcon = ''), 1800);
    }
  }

  onMount(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.cl-sidebar-link').forEach(l => l.classList.remove('active'));
            document.querySelector(`.cl-sidebar-link[href="#${e.target.id}"]`)?.classList.add('active');
          }
        });
      },
      { threshold: 0.15, rootMargin: '-5% 0px -65% 0px' }
    );

    document.querySelectorAll('.cl-section[id]').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  });

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
}`,
    navWeb: `<div class="ss-bottom-tab">
  <div class="ss-tab-item active">
    <iconify-icon icon="fluent:home-24-filled"></iconify-icon><span>Home</span>
  </div>
  <div class="ss-tab-item">
    <iconify-icon icon="fluent:heart-pulse-24-regular"></iconify-icon><span>Health</span>
  </div>
  <div class="ss-tab-item">
    <iconify-icon icon="fluent:calendar-24-regular"></iconify-icon><span>Schedule</span>
  </div>
  <div class="ss-tab-item">
    <iconify-icon icon="fluent:person-24-regular"></iconify-icon><span>Profile</span>
  </div>
</div>`,
    navExpo: `// npx expo install @react-navigation/bottom-tabs @fluentui/react-native-icons react-native-svg
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home24Filled, Home24Regular, HeartPulse24Regular, Calendar24Regular, Person24Regular } from '@fluentui/react-native-icons';
import { SSColors, SSIcon } from './ss_tokens';

const Tab = createBottomTabNavigator();

export function AppTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        if (route.name === 'Home')
          return focused ? <Home24Filled width={SSIcon.lg} height={SSIcon.lg} color={color} /> : <Home24Regular width={SSIcon.lg} height={SSIcon.lg} color={color} />;
        return <HeartPulse24Regular width={SSIcon.lg} height={SSIcon.lg} color={color} />;
      },
      tabBarActiveTintColor: SSColors.ssBlue,
      tabBarInactiveTintColor: SSColors.fgPlaceholder,
      tabBarStyle: { backgroundColor: SSColors.bgSurface, borderTopColor: SSColors.stroke1, height: 60 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
    </Tab.Navigator>
  );
}`,
    modalWeb: `<div class="ss-modal-overlay">
  <div class="ss-modal">
    <div class="ss-modal-handle"></div>
    <div class="ss-modal-title">Book Appointment</div>
    <div class="ss-modal-body">Select your preferred date and time with Dr. Ahmad.</div>
    <div class="ss-modal-actions">
      <button class="ss-btn ss-btn-secondary ss-btn-sm">Cancel</button>
      <button class="ss-btn ss-btn-primary ss-btn-sm"><iconify-icon icon="fluent:checkmark-circle-24-regular"></iconify-icon> Confirm</button>
    </div>
  </div>
</div>`,
    modalExpo: `// npx expo install @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Text, Pressable } from 'react-native';
import { SSColors, SSSpacing, SSRadius, SSFont, SSBase } from './ss_tokens';

export function AppointmentSheet({ snapPoints = ['50%'] }) {
  return (
    <BottomSheet snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: SSColors.stroke2, width: 36, height: 4 }}
      backgroundStyle={{ backgroundColor: SSColors.bgSurface, borderTopLeftRadius: SSRadius.xl, borderTopRightRadius: SSRadius.xl }}>
      <BottomSheetView style={{ padding: SSSpacing.s5 }}>
        <Text style={[SSFont.scale.title, { color: SSColors.fgPrimary }]}>Book Appointment</Text>
        <Text style={[SSFont.scale.body, { color: SSColors.fgSecondary, marginTop: SSSpacing.s2 }]}>Select your preferred date and time.</Text>
        <View style={{ flexDirection:'row', gap: SSSpacing.s2, marginTop: SSSpacing.s5 }}>
          <Pressable style={[SSBase.btnBase, SSBase.btnSecondary]}><Text style={SSBase.btnTextSecondary}>Cancel</Text></Pressable>
          <Pressable style={[SSBase.btnBase, SSBase.btnPrimary, { flex: 1 }]}><Text style={SSBase.btnTextPrimary}>Confirm</Text></Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}`,
    toastWeb: `<div class="ss-toast ss-toast-success">
  <iconify-icon icon="fluent:checkmark-circle-24-filled"></iconify-icon>
  <div class="ss-toast-content">
    <div class="ss-toast-title">Appointment confirmed</div>
    <div class="ss-toast-msg">Dr. Ahmad · 14 Aug at 10:00 AM</div>
  </div>
  <button class="ss-toast-close"><iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon></button>
</div>`,
    toastExpo: `// npx expo install react-native-toast-message
import Toast from 'react-native-toast-message';

// Trigger anywhere:
Toast.show({
  type: 'success',
  text1: 'Appointment confirmed',
  text2: 'Dr. Ahmad · 14 Aug at 10:00 AM',
  position: 'bottom',
  visibilityTime: 4000,
});`,
    emptyWeb: `<div class="ss-empty">
  <div class="ss-empty-icon"><iconify-icon icon="fluent:calendar-empty-24-regular"></iconify-icon></div>
  <div class="ss-empty-title">No appointments yet</div>
  <div class="ss-empty-desc">Book your first appointment with a SuamiSihat™ clinic.</div>
  <button class="ss-btn ss-btn-primary"><iconify-icon icon="fluent:add-circle-24-regular"></iconify-icon> Book Appointment</button>
</div>`,
    emptyExpo: `import { View, Text, Pressable } from 'react-native';
import { Calendar24Regular } from '@fluentui/react-native-icons';
import { SSColors, SSSpacing, SSRadius, SSFont, SSBase, SSIcon } from './ss_tokens';

export function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <View style={{ alignItems:'center', padding: SSSpacing.s12 }}>
      <View style={{ width:72, height:72, borderRadius: SSRadius.xl2, backgroundColor: SSColors.brandSubtle, alignItems:'center', justifyContent:'center', marginBottom: SSSpacing.s5 }}>
        <Calendar24Regular width={SSIcon.xl} height={SSIcon.xl} color={SSColors.ssBlue} />
      </View>
      <Text style={[SSFont.scale.subtitle, { color: SSColors.fgPrimary, marginBottom: SSSpacing.s2 }]}>{title}</Text>
      <Text style={[SSFont.scale.body, { color: SSColors.fgSecondary, textAlign:'center', maxWidth: 280, marginBottom: SSSpacing.s5 }]}>{description}</Text>
      <Pressable style={[SSBase.btnBase, SSBase.btnPrimary]} onPress={onAction}><Text style={SSBase.btnTextPrimary}>{actionLabel}</Text></Pressable>
    </View>
  );
}`,
    listWeb: `<div class="ss-list">
  <div class="ss-list-item">
    <div class="ss-list-icon" style="background:rgba(33,161,247,0.1)">
      <iconify-icon icon="fluent:heart-pulse-24-filled" style="color:#21A1F7;font-size:20px"></iconify-icon>
    </div>
    <div class="ss-list-body">
      <div class="ss-list-title">Blood Pressure</div>
      <div class="ss-list-sub">Last recorded 2h ago</div>
    </div>
    <div class="ss-list-right">
      <span class="ss-badge ss-badge-success">Normal</span>
      <iconify-icon icon="fluent:chevron-right-16-regular"></iconify-icon>
    </div>
  </div>
</div>`,
    listExpo: `import { View, Text, Pressable } from 'react-native';
import { HeartPulse24Filled, ChevronRight16Regular } from '@fluentui/react-native-icons';
import { SSColors, SSSpacing, SSRadius, SSFont } from './ss_tokens';

export function SSListItem({ title, subtitle, trailing, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{
      flexDirection:'row', alignItems:'center', gap: SSSpacing.s3,
      padding: SSSpacing.s3, paddingHorizontal: SSSpacing.s4,
      backgroundColor: pressed ? SSColors.bgHover : SSColors.bgSurface,
    }]}>
      <View style={{ width:40, height:40, borderRadius: SSRadius.md, backgroundColor: SSColors.brandSubtle, alignItems:'center', justifyContent:'center' }}>
        <HeartPulse24Filled width={20} height={20} color={SSColors.ssBlue} />
      </View>
      <View style={{ flex:1 }}>
        <Text style={[SSFont.scale.body, { fontWeight:'600', color: SSColors.fgPrimary }]}>{title}</Text>
        {subtitle && <Text style={[SSFont.scale.caption, { color: SSColors.fgPlaceholder }]}>{subtitle}</Text>}
      </View>
      {trailing}
      <ChevronRight16Regular width={16} height={16} color={SSColors.fgPlaceholder} />
    </Pressable>
  );
}`
  };
</script>

<svelte:head>
  <title>Component Library — SuamiSihat™ Design System</title>
</svelte:head>

<div
  class="f-page-layout"
  class:sidebar-minimized={isSidebarMinimized}
  style="display: grid; grid-template-columns: {isSidebarMinimized ? 'minmax(0, 1fr)' : '260px minmax(0, 1fr)'}; min-height: calc(100vh - 60px); position: relative; transition: grid-template-columns 0.3s ease; width: 100%;"
>
  <!-- Sidebar Toggle Pill -->
  <button
    type="button"
    class="f-sidebar-toggle"
    onclick={toggleSidebar}
    aria-label={isSidebarMinimized ? "Expand sidebar" : "Minimize sidebar"}
    style="position: fixed; left: {isSidebarMinimized ? '12px' : '248px'}; top: 180px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-neutral-bg-2, #FFFFFF); border: 1px solid var(--color-neutral-stroke-2, #CBD5E1); color: var(--color-neutral-fg-2, #64748B); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1010; box-shadow: var(--f-shadow-2); transition: all 0.3s ease;"
  >
    <iconify-icon icon={isSidebarMinimized ? "fluent:chevron-right-16-regular" : "fluent:chevron-left-16-regular"}></iconify-icon>
  </button>

  <!-- Component Sidebar Navigation -->
  {#if !isSidebarMinimized}
    <aside class="f-sidebar" aria-label="Component navigation" style="background: var(--color-neutral-bg-2, #FFFFFF); border-right: 1px solid var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); padding: 1.5rem 0.75rem; position: sticky; top: 60px; height: calc(100vh - 60px); overflow-y: auto;">
      <div class="cl-sidebar-section" style="padding: 0 0.5rem 0.5rem;">
        <span class="cl-sidebar-label" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3, #94A3B8); padding: 0.5rem 0.5rem 0.25rem; display: block;">Foundation</span>
        <a href="#fluent2-guide" class="cl-sidebar-link"><iconify-icon icon="fluent:book-compass-24-regular"></iconify-icon> Fluent 2 Guide</a>
        <a href="#colors" class="cl-sidebar-link"><iconify-icon icon="fluent:color-24-regular"></iconify-icon> Color System</a>
        <a href="#typography" class="cl-sidebar-link"><iconify-icon icon="fluent:text-font-24-regular"></iconify-icon> Typography</a>
        <a href="#spacing" class="cl-sidebar-link"><iconify-icon icon="fluent:spacing-horizontal-24-regular"></iconify-icon> Spacing</a>
        <a href="#elevation" class="cl-sidebar-link"><iconify-icon icon="fluent:layer-24-regular"></iconify-icon> Elevation</a>
        <a href="#radius" class="cl-sidebar-link"><iconify-icon icon="fluent:border-radius-24-regular"></iconify-icon> Border Radius</a>
        <a href="#motion" class="cl-sidebar-link"><iconify-icon icon="fluent:play-circle-24-regular"></iconify-icon> Motion</a>
        <a href="#icons" class="cl-sidebar-link"><iconify-icon icon="fluent:icons-24-regular"></iconify-icon> Icons</a>
      </div>

      <div class="cl-divider" style="height: 1px; background: var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); margin: 0.5rem 0.5rem 1rem;"></div>

      <div class="cl-sidebar-section" style="padding: 0 0.5rem 0.5rem;">
        <span class="cl-sidebar-label" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3, #94A3B8); padding: 0.5rem 0.5rem 0.25rem; display: block;">Components</span>
        <a href="#buttons" class="cl-sidebar-link"><iconify-icon icon="fluent:rectangle-24-regular"></iconify-icon> Buttons</a>
        <a href="#badges" class="cl-sidebar-link"><iconify-icon icon="fluent:badge-24-regular"></iconify-icon> Badges &amp; Chips</a>
        <a href="#inputs" class="cl-sidebar-link"><iconify-icon icon="fluent:text-field-24-regular"></iconify-icon> Inputs &amp; Forms</a>
        <a href="#cards" class="cl-sidebar-link"><iconify-icon icon="fluent:card-ui-24-regular"></iconify-icon> Cards</a>
        <a href="#alerts" class="cl-sidebar-link"><iconify-icon icon="fluent:alert-24-regular"></iconify-icon> Alerts</a>
        <a href="#avatars" class="cl-sidebar-link"><iconify-icon icon="fluent:person-circle-24-regular"></iconify-icon> Avatars</a>
        <a href="#progress" class="cl-sidebar-link"><iconify-icon icon="fluent:spinner-ios-20-regular"></iconify-icon> Progress</a>
        <a href="#tabs" class="cl-sidebar-link"><iconify-icon icon="fluent:tab-24-regular"></iconify-icon> Tabs</a>
        <a href="#navigation" class="cl-sidebar-link"><iconify-icon icon="fluent:navigation-24-regular"></iconify-icon> Navigation</a>
        <a href="#modal" class="cl-sidebar-link"><iconify-icon icon="fluent:panel-right-24-regular"></iconify-icon> Modal &amp; Sheet</a>
        <a href="#toast" class="cl-sidebar-link"><iconify-icon icon="fluent:alert-badge-24-regular"></iconify-icon> Toast</a>
        <a href="#empty-state" class="cl-sidebar-link"><iconify-icon icon="fluent:box-24-regular"></iconify-icon> Empty State</a>
        <a href="#list-item" class="cl-sidebar-link"><iconify-icon icon="fluent:list-24-regular"></iconify-icon> List Item</a>
        <a href="#stats" class="cl-sidebar-link"><iconify-icon icon="fluent:data-bar-vertical-24-regular"></iconify-icon> Stats Card</a>
        <a href="#state-matrix" class="cl-sidebar-link"><iconify-icon icon="fluent:table-24-regular"></iconify-icon> State Matrix</a>
      </div>

      <div class="cl-divider" style="height: 1px; background: var(--color-neutral-stroke-1, rgba(0,0,0,0.08)); margin: 0.5rem 0.5rem 1rem;"></div>

      <div class="cl-sidebar-section" style="padding: 0 0.5rem 0.5rem;">
        <span class="cl-sidebar-label" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-fg-3, #94A3B8); padding: 0.5rem 0.5rem 0.25rem; display: block;">Platform</span>
        <a href="#tokens-json" class="cl-sidebar-link"><iconify-icon icon="fluent:document-data-24-regular"></iconify-icon> Token Export</a>
        <a href="#flutter" class="cl-sidebar-link"><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Flutter Guide</a>
        <a href="#expo-install" class="cl-sidebar-link"><iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon> Expo Setup</a>
      </div>
    </aside>
  {/if}

  <!-- Main Content Area -->
  <main class="f-main-content" style="width: 100%; min-width: 0; box-sizing: border-box;">
    <!-- Header -->
    <div class="mb-4">
      <nav aria-label="breadcrumb" style="display:flex; align-items:center; gap:6px; font-size:0.8rem; margin-bottom:0.75rem;">
        <a href="/" style="color: var(--color-neutral-fg-3); text-decoration: none;">Home</a>
        <iconify-icon icon="fluent:chevron-right-12-regular" style="color: var(--color-neutral-fg-3);"></iconify-icon>
        <span style="color:var(--color-neutral-fg-1); font-weight:600;">Component Library</span>
      </nav>
      <div class="cl-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">SuamiSihat™ Design System</div>
      <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.75rem; color: var(--color-neutral-fg-1);">Component Library</h1>
      <p style="font-size: 1.05rem; color: var(--color-neutral-fg-2); line-height: 1.7; max-width: 680px;">The complete visual language of SuamiSihat™. Fluent 2 architecture. One system for web, mobile apps, and internal tools.</p>
      
      <!-- Feature Badges -->
      <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-top: 1rem;">
        <span class="ss-badge ss-badge-brand">Fluent 2</span>
        <span class="ss-badge ss-badge-success">Expo Ready</span>
        <span class="ss-badge ss-badge-neutral">WCAG AA</span>
        <span class="ss-badge ss-badge-neutral">Dark Mode Ready</span>
        {#if copiedSwatchText}
          <span class="ss-badge ss-badge-brand" style="animation: f-fade-in 0.2s ease;">{copiedSwatchText}</span>
        {/if}
      </div>
    </div>

    <!-- 1. Fluent 2 Guide -->
    <section class="cl-section" id="fluent2-guide" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Official Standard</div>
      <h2 class="cl-section-title">Microsoft Fluent 2 Guidelines &amp; UX Framework</h2>
      <p class="cl-section-desc">SuamiSihat™'s design system strictly adopts Microsoft's Fluent 2 design language adapted to our brand palette. Grounded in 4 core principles, 8 design dimensions, and a unified UX state framework.</p>

      <div class="row g-4 mb-4">
        <div class="col-md-6 col-lg-3">
          <div class="cl-card h-100 p-4" style="background:var(--color-neutral-bg-2);">
            <div class="tool-icon mb-3" style="background:var(--color-brand-subtle); color:var(--color-brand-primary); width:48px; height:48px; border-radius:var(--f-radius-lg); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              <iconify-icon icon="fluent:leaf-two-24-regular"></iconify-icon>
            </div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:6px;">1. Natural</h4>
            <p style="font-size:.825rem; color:var(--color-neutral-fg-2); line-height:1.6; margin:0;">Feels intuitive and responsive. Smooth spring motion curves, organic wave motion, and fluid interactive feedback matching human touch.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="cl-card h-100 p-4" style="background:var(--color-neutral-bg-2);">
            <div class="tool-icon mb-3" style="background:var(--color-brand-subtle); color:var(--color-brand-primary); width:48px; height:48px; border-radius:var(--f-radius-lg); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              <iconify-icon icon="fluent:people-24-regular"></iconify-icon>
            </div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:6px;">2. Inclusive</h4>
            <p style="font-size:.825rem; color:var(--color-neutral-fg-2); line-height:1.6; margin:0;">Built for everyone. Strict WCAG 2.1 AA/AAA contrast ratios, keyboard accessibility, focus rings, and high-contrast dark mode support.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="cl-card h-100 p-4" style="background:var(--color-neutral-bg-2);">
            <div class="tool-icon mb-3" style="background:var(--color-brand-subtle); color:var(--color-brand-primary); width:48px; height:48px; border-radius:var(--f-radius-lg); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              <iconify-icon icon="fluent:flash-24-regular"></iconify-icon>
            </div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:6px;">3. Effortless</h4>
            <p style="font-size:.825rem; color:var(--color-neutral-fg-2); line-height:1.6; margin:0;">Reduces cognitive load. Clean visual hierarchy, predictable component states, clear action targets (44px min), and contextual tokens.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="cl-card h-100 p-4" style="background:var(--color-neutral-bg-2);">
            <div class="tool-icon mb-3" style="background:var(--color-brand-subtle); color:var(--color-brand-primary); width:48px; height:48px; border-radius:var(--f-radius-lg); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              <iconify-icon icon="fluent:target-arrow-24-regular"></iconify-icon>
            </div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:6px;">4. Intentional</h4>
            <p style="font-size:.825rem; color:var(--color-neutral-fg-2); line-height:1.6; margin:0;">Every detail has a purpose. Single source-of-truth tokens across Web and Expo React Native, with consistent component contracts.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Colors & 60:30:10 -->
    <section class="cl-section" id="colors" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Foundation</div>
      <h2 class="cl-section-title">Color System &amp; 60:30:10 Hierarchy</h2>
      <p class="cl-section-desc">Our design system enforces a disciplined <b>60:30:10 visual color hierarchy</b> across web and mobile. Click any swatch below to copy its raw hex code.</p>

      <!-- 60:30:10 Rule Card -->
      <div class="cl-card mb-4" style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.5rem;">
        <div style="display:flex; height:24px; border-radius:var(--f-radius-full); overflow:hidden; border:1px solid var(--color-neutral-stroke-1); margin-bottom:1rem; box-shadow:var(--f-shadow-2);">
          <div style="flex:60; background:#E2E8F0;" title="60% Foundation"></div>
          <div style="flex:30; background:#022057;" title="30% Secondary"></div>
          <div style="flex:10; background:#21A1F7;" title="10% Accent (Azure)"></div>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; font-size:0.82rem; font-weight:600;">
          <div><span style="width:14px; height:14px; border-radius:3px; background:#E2E8F0; border:1px solid #CBD5E1; display:inline-block; vertical-align:middle; margin-right:4px;"></span><strong>60%</strong> Foundation (Canvas &amp; Whitespace)</div>
          <div><span style="width:14px; height:14px; border-radius:3px; background:#022057; display:inline-block; vertical-align:middle; margin-right:4px;"></span><strong>30%</strong> Secondary (Structure &amp; Cards)</div>
          <div><span style="width:14px; height:14px; border-radius:3px; background:#21A1F7; display:inline-block; vertical-align:middle; margin-right:4px;"></span><strong>10%</strong> Accent (Primary CTA &mdash; Azure)</div>
        </div>
      </div>

      <!-- Interactive Palette Grid -->
      <div class="cl-card" style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); overflow:hidden;">
        <div class="cl-card-header" style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-neutral-stroke-1); font-weight: 700; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <span>SS Official Brand Colors (Multi-Format Specification)</span>
          <span style="font-size:0.75rem; color:var(--color-neutral-fg-3); font-weight:normal;">Click any swatch to copy HEX to clipboard</span>
        </div>
        <div style="padding: 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; align-items: stretch;">
          <!-- Prussian Blue -->
          <button type="button" class="cl-swatch" onclick={() => copySwatch('#022057', 'SS Prussian Blue')} style="border:none; background:none; padding:0; text-align:left; cursor:pointer; display:flex; flex-direction:column; height:100%;">
            <div class="cl-swatch-color" style="background:#022057; height:70px; border-radius:8px 8px 0 0; padding:6px 8px; display:flex; justify-content:flex-end;">
              <span style="font-size:0.65rem; font-weight:700; color:#FFFFFF; background:rgba(0,0,0,0.35); padding:1px 6px; border-radius:3px;">Pantone 281 C</span>
            </div>
            <div style="padding: 10px 12px; background:var(--color-neutral-bg-1); border-radius:0 0 8px 8px; border:1px solid var(--color-neutral-stroke-1); border-top:none; flex:1; display:flex; flex-direction:column; justify-content:space-between; min-height:96px;">
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-1);">SS Prussian Blue</div>
                <div style="font-size:0.7rem; color:var(--color-brand-primary); font-family:monospace; font-weight:700;">#022057 · <code>--ss-prussian-blue</code></div>
              </div>
              <div style="margin-top:6px;">
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">RGB: 2, 32, 87 · CMYK: 98, 63, 0, 66</div>
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">Lab: 14.1, 11.2, -37.8 · RAL 5013</div>
              </div>
            </div>
          </button>

          <!-- SS Blue -->
          <button type="button" class="cl-swatch" onclick={() => copySwatch('#043388', 'SS Blue')} style="border:none; background:none; padding:0; text-align:left; cursor:pointer; display:flex; flex-direction:column; height:100%;">
            <div class="cl-swatch-color" style="background:#043388; height:70px; border-radius:8px 8px 0 0; padding:6px 8px; display:flex; justify-content:flex-end;">
              <span style="font-size:0.65rem; font-weight:700; color:#FFFFFF; background:rgba(0,0,0,0.35); padding:1px 6px; border-radius:3px;">Pantone 287 C</span>
            </div>
            <div style="padding: 10px 12px; background:var(--color-neutral-bg-1); border-radius:0 0 8px 8px; border:1px solid var(--color-neutral-stroke-1); border-top:none; flex:1; display:flex; flex-direction:column; justify-content:space-between; min-height:96px;">
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-1);">SS Blue</div>
                <div style="font-size:0.7rem; color:var(--color-brand-primary); font-family:monospace; font-weight:700;">#043388 · <code>--ss-blue</code></div>
              </div>
              <div style="margin-top:6px;">
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">RGB: 4, 51, 136 · CMYK: 97, 63, 0, 47</div>
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">Lab: 24.3, 16.8, -53.4 · RAL 5002</div>
              </div>
            </div>
          </button>

          <!-- Azure -->
          <button type="button" class="cl-swatch" onclick={() => copySwatch('#21A1F7', 'Azure')} style="border:none; background:none; padding:0; text-align:left; cursor:pointer; display:flex; flex-direction:column; height:100%;">
            <div class="cl-swatch-color" style="background:#21A1F7; height:70px; border-radius:8px 8px 0 0; padding:6px 8px; display:flex; justify-content:flex-end;">
              <span style="font-size:0.65rem; font-weight:700; color:#FFFFFF; background:rgba(0,0,0,0.35); padding:1px 6px; border-radius:3px;">Pantone 299 C</span>
            </div>
            <div style="padding: 10px 12px; background:var(--color-neutral-bg-1); border-radius:0 0 8px 8px; border:1px solid var(--color-neutral-stroke-1); border-top:none; flex:1; display:flex; flex-direction:column; justify-content:space-between; min-height:96px;">
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-1);">Azure (10% Accent)</div>
                <div style="font-size:0.7rem; color:var(--color-brand-primary); font-family:monospace; font-weight:700;">#21A1F7 · <code>--ss-azure</code></div>
              </div>
              <div style="margin-top:6px;">
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">RGB: 33, 161, 247 · CMYK: 87, 35, 0, 3</div>
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">Lab: 64.5, -7.6, -53.9 · RAL 5012</div>
              </div>
            </div>
          </button>

          <!-- Malibu -->
          <button type="button" class="cl-swatch" onclick={() => copySwatch('#6DC6EC', 'Malibu')} style="border:none; background:none; padding:0; text-align:left; cursor:pointer; display:flex; flex-direction:column; height:100%;">
            <div class="cl-swatch-color" style="background:#6DC6EC; height:70px; border-radius:8px 8px 0 0; padding:6px 8px; display:flex; justify-content:flex-end;">
              <span style="font-size:0.65rem; font-weight:700; color:#1C1C1C; background:rgba(255,255,255,0.6); padding:1px 6px; border-radius:3px;">Pantone 297 C</span>
            </div>
            <div style="padding: 10px 12px; background:var(--color-neutral-bg-1); border-radius:0 0 8px 8px; border:1px solid var(--color-neutral-stroke-1); border-top:none; flex:1; display:flex; flex-direction:column; justify-content:space-between; min-height:96px;">
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-1);">Malibu</div>
                <div style="font-size:0.7rem; color:var(--color-brand-primary); font-family:monospace; font-weight:700;">#6DC6EC · <code>--ss-malibu</code></div>
              </div>
              <div style="margin-top:6px;">
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">RGB: 109, 198, 236 · CMYK: 54, 16, 0, 7</div>
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">Lab: 76.8, -18.2, -28.9 · RAL 5024</div>
              </div>
            </div>
          </button>

          <!-- Banana Yellow -->
          <button type="button" class="cl-swatch" onclick={() => copySwatch('#FCE53D', 'Banana Yellow')} style="border:none; background:none; padding:0; text-align:left; cursor:pointer; display:flex; flex-direction:column; height:100%;">
            <div class="cl-swatch-color" style="background:#FCE53D; height:70px; border-radius:8px 8px 0 0; padding:6px 8px; display:flex; justify-content:flex-end;">
              <span style="font-size:0.65rem; font-weight:700; color:#1C1C1C; background:rgba(255,255,255,0.6); padding:1px 6px; border-radius:3px;">Pantone 102 C</span>
            </div>
            <div style="padding: 10px 12px; background:var(--color-neutral-bg-1); border-radius:0 0 8px 8px; border:1px solid var(--color-neutral-stroke-1); border-top:none; flex:1; display:flex; flex-direction:column; justify-content:space-between; min-height:96px;">
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-1);">Banana Yellow</div>
                <div style="font-size:0.7rem; color:var(--color-brand-primary); font-family:monospace; font-weight:700;">#FCE53D · <code>--ss-banana</code></div>
              </div>
              <div style="margin-top:6px;">
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">RGB: 252, 229, 61 · CMYK: 0, 9, 76, 1</div>
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">Lab: 90.8, -7.5, 81.2 · RAL 1016</div>
              </div>
            </div>
          </button>

          <!-- Neutral Black (Default Text Light Mode) -->
          <button type="button" class="cl-swatch" onclick={() => copySwatch('#1C1C1C', 'Neutral Black')} style="border:none; background:none; padding:0; text-align:left; cursor:pointer; display:flex; flex-direction:column; height:100%;">
            <div class="cl-swatch-color" style="background:#1C1C1C; height:70px; border-radius:8px 8px 0 0; padding:6px 8px; display:flex; justify-content:flex-end;">
              <span style="font-size:0.65rem; font-weight:700; color:#FFFFFF; background:rgba(255,255,255,0.2); padding:1px 6px; border-radius:3px;">Pantone Black 6 C</span>
            </div>
            <div style="padding: 10px 12px; background:var(--color-neutral-bg-1); border-radius:0 0 8px 8px; border:1px solid var(--color-neutral-stroke-1); border-top:none; flex:1; display:flex; flex-direction:column; justify-content:space-between; min-height:96px;">
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-1);">Neutral Black</div>
                <div style="font-size:0.7rem; color:var(--color-brand-primary); font-family:monospace; font-weight:700;">#1C1C1C · <code>--ss-neutral-black</code></div>
              </div>
              <div style="margin-top:6px;">
                <div style="font-size:0.675rem; color:var(--color-brand-primary); font-weight:700;">Default Text (Light Mode)</div>
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">RGB: 28, 28, 28 · Lab: 11.2, 0, 0</div>
              </div>
            </div>
          </button>

          <!-- Neutral White / Porcelain (Default Text Dark Mode) -->
          <button type="button" class="cl-swatch" onclick={() => copySwatch('#FCFAF6', 'Neutral White')} style="border:none; background:none; padding:0; text-align:left; cursor:pointer; display:flex; flex-direction:column; height:100%;">
            <div class="cl-swatch-color" style="background:#FCFAF6; height:70px; border-radius:8px 8px 0 0; padding:6px 8px; display:flex; justify-content:flex-end; border:1px solid var(--color-neutral-stroke-1); border-bottom:none;">
              <span style="font-size:0.65rem; font-weight:700; color:#1C1C1C; background:rgba(0,0,0,0.08); padding:1px 6px; border-radius:3px;">Pantone 705 C</span>
            </div>
            <div style="padding: 10px 12px; background:var(--color-neutral-bg-1); border-radius:0 0 8px 8px; border:1px solid var(--color-neutral-stroke-1); border-top:none; flex:1; display:flex; flex-direction:column; justify-content:space-between; min-height:96px;">
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-1);">Neutral White (Porcelain)</div>
                <div style="font-size:0.7rem; color:var(--color-brand-primary); font-family:monospace; font-weight:700;">#FCFAF6 · <code>--ss-neutral-white</code></div>
              </div>
              <div style="margin-top:6px;">
                <div style="font-size:0.675rem; color:var(--color-brand-primary); font-weight:700;">Default Text (Dark Mode)</div>
                <div style="font-size:0.675rem; color:var(--color-neutral-fg-3);">RGB: 252, 250, 246 · RAL 9003</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- ── Text Color Usage Guide ──────────────────────────────────────── -->
      <div style="margin-top: 2.5rem;">
        <div style="font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; color:var(--color-brand-primary); margin-bottom:4px;">Text Color System</div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-neutral-fg-1); margin:0 0 6px;">Text Color Usage Guide</h3>
        <p style="font-size: 0.9rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem; line-height:1.6;">
          This palette uses <strong>four levels of text emphasis</strong> across light and dark interfaces.
          <br><strong>Core rule:</strong> Do not treat every colour as a text colour. Each token has a specific hierarchy role.
        </p>

        <!-- Token Summary Table -->
        <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; margin-bottom:1.5rem; box-shadow:var(--f-shadow-2);">
          <div style="padding:0.875rem 1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:800; font-size:0.85rem; color:var(--color-neutral-fg-1); display:flex; align-items:center; gap:8px;">
            <iconify-icon icon="fluent:text-color-24-regular" style="color:var(--color-brand-primary);font-size:1.1rem;"></iconify-icon>
            1. Text Color Tokens
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:0.82rem; min-width:500px;">
              <thead>
                <tr style="background:var(--color-neutral-bg-3); border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <th style="padding:10px 14px; text-align:left; font-weight:700; color:var(--color-neutral-fg-1);">Token</th>
                  <th style="padding:10px 14px; text-align:left; font-weight:700; color:var(--color-neutral-fg-1);">Light / Dark HEX</th>
                  <th style="padding:10px 14px; text-align:left; font-weight:700; color:var(--color-neutral-fg-1);">Primary Role</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <td style="padding:10px 14px;"><code style="color:var(--color-brand-primary); font-weight:700;">--text-strong</code></td>
                  <td style="padding:10px 14px; font-family:monospace;">
                    <span style="background:#000000; color:#fff; padding:2px 7px; border-radius:3px; font-size:0.75rem; margin-right:4px;">#000000</span>
                    <span style="background:#FFFFFF; color:#1C1C1C; padding:2px 7px; border-radius:3px; font-size:0.75rem; border:1px solid #CBD5E1;">#FFFFFF</span>
                  </td>
                  <td style="padding:10px 14px; color:var(--color-neutral-fg-2);">Maximum emphasis — H1, key numbers, critical CTAs</td>
                </tr>
                <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <td style="padding:10px 14px;"><code style="color:var(--color-brand-primary); font-weight:700;">--text-primary</code></td>
                  <td style="padding:10px 14px; font-family:monospace;">
                    <span style="background:#19191A; color:#fff; padding:2px 7px; border-radius:3px; font-size:0.75rem; margin-right:4px;">#19191A</span>
                    <span style="background:#FCFAF6; color:#1C1C1C; padding:2px 7px; border-radius:3px; font-size:0.75rem; border:1px solid #CBD5E1;">#FCFAF6</span>
                  </td>
                  <td style="padding:10px 14px; color:var(--color-neutral-fg-2);">Standard readable content — body, labels, nav</td>
                </tr>
                <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <td style="padding:10px 14px;"><code style="color:var(--color-brand-primary); font-weight:700;">--text-inverse</code></td>
                  <td style="padding:10px 14px; font-family:monospace;">
                    <span style="background:#FFFFFF; color:#1C1C1C; padding:2px 7px; border-radius:3px; font-size:0.75rem; border:1px solid #CBD5E1; margin-right:4px;">#FFFFFF</span>
                    <span style="background:#000000; color:#fff; padding:2px 7px; border-radius:3px; font-size:0.75rem;">#000000</span>
                  </td>
                  <td style="padding:10px 14px; color:var(--color-neutral-fg-2);">Text on inverse surfaces — dark buttons, light overlays</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;"><code style="color:var(--color-brand-primary); font-weight:700;">--text-disabled</code></td>
                  <td style="padding:10px 14px; font-family:monospace; color:var(--color-neutral-fg-3); font-style:italic;">Derived token (opacity)</td>
                  <td style="padding:10px 14px; color:var(--color-neutral-fg-2);">Disabled or unavailable state</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Light / Dark Mode side-by-side -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">

          <!-- Light Mode -->
          <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; box-shadow:var(--f-shadow-2);">
            <div style="padding:0.875rem 1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:800; font-size:0.85rem; display:flex; align-items:center; gap:8px; color:var(--color-neutral-fg-1);">
              <iconify-icon icon="fluent:weather-sunny-24-regular" style="color:#F59E0B; font-size:1.1rem;"></iconify-icon>
              2. Light Mode
            </div>
            <div style="padding:1.25rem;">
              <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-neutral-fg-3); margin-bottom:0.5rem;">Base Surfaces</div>
              <div style="display:flex; gap:8px; margin-bottom:1rem; flex-wrap:wrap;">
                <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem;">
                  <div style="width:24px; height:24px; background:#FCFAF6; border-radius:4px; border:1px solid #CBD5E1;"></div>
                  <span style="font-family:monospace; color:var(--color-neutral-fg-2);">Canvas <strong>#FCFAF6</strong></span>
                </div>
                <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem;">
                  <div style="width:24px; height:24px; background:#FFFFFF; border-radius:4px; border:1px solid #CBD5E1;"></div>
                  <span style="font-family:monospace; color:var(--color-neutral-fg-2);">Elevated <strong>#FFFFFF</strong></span>
                </div>
              </div>
              <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-neutral-fg-3); margin-bottom:0.5rem;">Text Hierarchy</div>
              <!-- Visual hierarchy bar -->
              <div style="background:#FCFAF6; border-radius:var(--f-radius-lg); padding:1rem; border:1px solid #E2E8F0;">
                <div style="font-size:1.2rem; font-weight:900; color:#000000; margin-bottom:2px; letter-spacing:-0.01em;">Heading in #000000</div>
                <div style="font-size:0.85rem; color:#19191A; line-height:1.6; margin-bottom:6px;">Body text uses <code>#19191A</code> for comfortable reading. Reduced visual aggression, high contrast ratio.</div>
                <div style="font-size:0.72rem; color:rgba(25,25,26,0.65); margin-bottom:4px;">Secondary metadata — dates, tags · <code>rgba(25,25,26,0.65)</code></div>
                <div style="font-size:0.72rem; color:rgba(25,25,26,0.35);">Disabled label · <code>rgba(25,25,26,0.35)</code></div>
              </div>
              <div style="margin-top:0.875rem; border:1px solid var(--color-neutral-stroke-1); border-radius:8px; overflow:hidden; font-family:monospace; font-size:0.75rem;">
                <div style="background:var(--color-neutral-bg-3); padding:6px 12px; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:700; color:var(--color-neutral-fg-3);">Hierarchy</div>
                <div style="padding:8px 12px; display:flex; flex-direction:column; gap:4px;">
                  <div style="display:flex; align-items:center; gap:8px;"><div style="width:14px; height:14px; background:#000000; border-radius:3px; flex-shrink:0;"></div><span><strong>#000000</strong> — TEXT STRONG</span></div>
                  <div style="display:flex; align-items:center; gap:8px;"><div style="width:14px; height:14px; background:#19191A; border-radius:3px; flex-shrink:0;"></div><span><strong>#19191A</strong> — Text Primary</span></div>
                  <div style="height:1px; background:var(--color-neutral-stroke-1); margin:2px 0;"></div>
                  <div style="display:flex; align-items:center; gap:8px; opacity:0.6;"><div style="width:14px; height:14px; background:#FCFAF6; border-radius:3px; border:1px solid #CBD5E1; flex-shrink:0;"></div><span>#FCFAF6 — Surface / Canvas</span></div>
                  <div style="display:flex; align-items:center; gap:8px; opacity:0.6;"><div style="width:14px; height:14px; background:#FFFFFF; border-radius:3px; border:1px solid #CBD5E1; flex-shrink:0;"></div><span>#FFFFFF — Elevated Surface</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dark Mode -->
          <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; box-shadow:var(--f-shadow-2);">
            <div style="padding:0.875rem 1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:800; font-size:0.85rem; display:flex; align-items:center; gap:8px; color:var(--color-neutral-fg-1);">
              <iconify-icon icon="fluent:weather-moon-24-regular" style="color:#6DC6EC; font-size:1.1rem;"></iconify-icon>
              3. Dark Mode
            </div>
            <div style="padding:1.25rem;">
              <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-neutral-fg-3); margin-bottom:0.5rem;">Base Surfaces</div>
              <div style="display:flex; gap:8px; margin-bottom:1rem; flex-wrap:wrap;">
                <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem;">
                  <div style="width:24px; height:24px; background:#1C1C1C; border-radius:4px; border:1px solid #3C3C3B;"></div>
                  <span style="font-family:monospace; color:var(--color-neutral-fg-2);">Canvas <strong>#1C1C1C</strong></span>
                </div>
                <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem;">
                  <div style="width:24px; height:24px; background:#000000; border-radius:4px; border:1px solid #3C3C3B;"></div>
                  <span style="font-family:monospace; color:var(--color-neutral-fg-2);">Deep <strong>#000000</strong></span>
                </div>
              </div>
              <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-neutral-fg-3); margin-bottom:0.5rem;">Text Hierarchy</div>
              <!-- Visual hierarchy bar dark -->
              <div style="background:#1C1C1C; border-radius:var(--f-radius-lg); padding:1rem; border:1px solid #3C3C3B;">
                <div style="font-size:1.2rem; font-weight:900; color:#FFFFFF; margin-bottom:2px; letter-spacing:-0.01em;">Heading in #FFFFFF</div>
                <div style="font-size:0.85rem; color:#FCFAF6; line-height:1.6; margin-bottom:6px;">Body text uses <code style="color:#6DC6EC;">#FCFAF6</code> — Porcelain White for comfortable dark-mode reading.</div>
                <div style="font-size:0.72rem; color:rgba(252,250,246,0.65); margin-bottom:4px;">Secondary metadata · <code style="color:rgba(109,198,236,0.8);">rgba(252,250,246,0.65)</code></div>
                <div style="font-size:0.72rem; color:rgba(252,250,246,0.35);">Disabled label · <code style="color:rgba(109,198,236,0.6);">rgba(252,250,246,0.35)</code></div>
              </div>
              <div style="margin-top:0.875rem; border:1px solid var(--color-neutral-stroke-1); border-radius:8px; overflow:hidden; font-family:monospace; font-size:0.75rem;">
                <div style="background:var(--color-neutral-bg-3); padding:6px 12px; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:700; color:var(--color-neutral-fg-3);">Hierarchy</div>
                <div style="padding:8px 12px; display:flex; flex-direction:column; gap:4px;">
                  <div style="display:flex; align-items:center; gap:8px;"><div style="width:14px; height:14px; background:#FFFFFF; border-radius:3px; border:1px solid #CBD5E1; flex-shrink:0;"></div><span><strong>#FFFFFF</strong> — TEXT STRONG</span></div>
                  <div style="display:flex; align-items:center; gap:8px;"><div style="width:14px; height:14px; background:#FCFAF6; border-radius:3px; border:1px solid #CBD5E1; flex-shrink:0;"></div><span><strong>#FCFAF6</strong> — Text Primary</span></div>
                  <div style="height:1px; background:var(--color-neutral-stroke-1); margin:2px 0;"></div>
                  <div style="display:flex; align-items:center; gap:8px; opacity:0.6;"><div style="width:14px; height:14px; background:#1C1C1C; border-radius:3px; border:1px solid #3C3C3B; flex-shrink:0;"></div><span>#1C1C1C — Canvas</span></div>
                  <div style="display:flex; align-items:center; gap:8px; opacity:0.6;"><div style="width:14px; height:14px; background:#000000; border-radius:3px; border:1px solid #3C3C3B; flex-shrink:0;"></div><span>#000000 — Deep Surface</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hierarchy Rules -->
        <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; margin-bottom:1.5rem; box-shadow:var(--f-shadow-2);">
          <div style="padding:0.875rem 1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:800; font-size:0.85rem; color:var(--color-neutral-fg-1); display:flex; align-items:center; gap:8px;">
            <iconify-icon icon="fluent:text-paragraph-24-regular" style="color:var(--color-brand-primary);font-size:1.1rem;"></iconify-icon>
            4. Hierarchy Rules
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:0; border-top:none;">

            <!-- Level 1 Strong -->
            <div style="padding:1.25rem; border-right:1px solid var(--color-neutral-stroke-1); border-bottom:1px solid var(--color-neutral-stroke-1);">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.5rem;">
                <div style="width:10px; height:10px; background:#000000; border-radius:50%; border:1px solid #CBD5E1;"></div>
                <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-neutral-fg-3);">Level 1 — Strong</span>
              </div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:4px;">Maximum attention, maximum contrast</div>
              <div style="font-size:0.78rem; color:var(--color-neutral-fg-2); margin-bottom:0.75rem; line-height:1.5;">Use only when content needs immediate attention. <strong>Do not</strong> set entire paragraphs in text-strong — it destroys hierarchy.</div>
              <div style="display:flex; gap:6px; flex-wrap:wrap; font-size:0.72rem; font-family:monospace; margin-bottom:0.5rem;">
                <span style="background:#000000; color:#fff; padding:2px 8px; border-radius:4px;">Light: #000000</span>
                <span style="background:#FFFFFF; color:#1C1C1C; padding:2px 8px; border-radius:4px; border:1px solid #CBD5E1;">Dark: #FFFFFF</span>
              </div>
              <div style="font-size:0.72rem; color:var(--color-neutral-fg-3); line-height:1.5;">
                H1 · Key statistics · Prices · Critical numbers · Short emphasis
              </div>
            </div>

            <!-- Level 2 Primary -->
            <div style="padding:1.25rem; border-right:1px solid var(--color-neutral-stroke-1); border-bottom:1px solid var(--color-neutral-stroke-1);">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.5rem;">
                <div style="width:10px; height:10px; background:#19191A; border-radius:50%;"></div>
                <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-neutral-fg-3);">Level 2 — Primary</span>
              </div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:4px;">Default reading colour</div>
              <div style="font-size:0.78rem; color:var(--color-neutral-fg-2); margin-bottom:0.75rem; line-height:1.5;">The workhorse of the system. <strong>If unsure which text colour to use — use this.</strong></div>
              <div style="display:flex; gap:6px; flex-wrap:wrap; font-size:0.72rem; font-family:monospace; margin-bottom:0.5rem;">
                <span style="background:#19191A; color:#fff; padding:2px 8px; border-radius:4px;">Light: #19191A</span>
                <span style="background:#FCFAF6; color:#1C1C1C; padding:2px 8px; border-radius:4px; border:1px solid #CBD5E1;">Dark: #FCFAF6</span>
              </div>
              <div style="font-size:0.72rem; color:var(--color-neutral-fg-3); line-height:1.5;">
                Body text · H2–H6 · Navigation · Buttons · Form labels · Long-form
              </div>
            </div>

            <!-- Level 3 Inverse -->
            <div style="padding:1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1);">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.5rem;">
                <div style="width:10px; height:10px; background:var(--color-brand-primary); border-radius:50%;"></div>
                <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-neutral-fg-3);">Level 3 — Inverse</span>
              </div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:4px;">Opposite tonal environment</div>
              <div style="font-size:0.78rem; color:var(--color-neutral-fg-2); margin-bottom:0.75rem; line-height:1.5;">Applied when text sits on a contrasting surface (e.g. text inside dark-filled buttons on light canvas).</div>
              <div style="display:flex; flex-direction:column; gap:4px; font-size:0.72rem; font-family:monospace;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="background:#000000; padding:3px 10px; border-radius:4px; color:#FFFFFF;">Button</div>
                  <span style="color:var(--color-neutral-fg-3);">#000 bg → #FFF text</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="background:#FFFFFF; padding:3px 10px; border-radius:4px; color:#19191A; border:1px solid #CBD5E1;">Button</div>
                  <span style="color:var(--color-neutral-fg-3);">#FFF bg → #19191A text</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Pairing Matrix -->
        <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; margin-bottom:1.5rem; box-shadow:var(--f-shadow-2);">
          <div style="padding:0.875rem 1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:800; font-size:0.85rem; color:var(--color-neutral-fg-1); display:flex; align-items:center; gap:8px;">
            <iconify-icon icon="fluent:table-24-regular" style="color:var(--color-brand-primary);font-size:1.1rem;"></iconify-icon>
            5. Text Pairing Matrix — Approved Combinations
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:0.82rem; min-width:450px;">
              <thead>
                <tr style="background:var(--color-neutral-bg-3); border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <th style="padding:10px 14px; text-align:left; font-weight:700; color:var(--color-neutral-fg-1);">Background</th>
                  <th style="padding:10px 14px; text-align:left; font-weight:700; color:var(--color-neutral-fg-1);">Strong Text</th>
                  <th style="padding:10px 14px; text-align:left; font-weight:700; color:var(--color-neutral-fg-1);">Primary Text</th>
                  <th style="padding:10px 14px; text-align:left; font-weight:700; color:var(--color-neutral-fg-1);">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <td style="padding:10px 14px; font-family:monospace;"><span style="display:inline-block; width:14px; height:14px; background:#FCFAF6; border-radius:3px; border:1px solid #CBD5E1; vertical-align:middle; margin-right:6px;"></span>#FCFAF6</td>
                  <td style="padding:10px 14px; font-family:monospace; font-weight:700;">#000000</td>
                  <td style="padding:10px 14px; font-family:monospace;">#19191A</td>
                  <td style="padding:10px 14px;"><div style="background:#FCFAF6; padding:6px 10px; border-radius:6px; border:1px solid #E2E8F0;"><span style="font-size:0.78rem; font-weight:900; color:#000000;">Strong</span> <span style="font-size:0.75rem; color:#19191A;">Primary</span></div></td>
                </tr>
                <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <td style="padding:10px 14px; font-family:monospace;"><span style="display:inline-block; width:14px; height:14px; background:#FFFFFF; border-radius:3px; border:1px solid #CBD5E1; vertical-align:middle; margin-right:6px;"></span>#FFFFFF</td>
                  <td style="padding:10px 14px; font-family:monospace; font-weight:700;">#000000</td>
                  <td style="padding:10px 14px; font-family:monospace;">#19191A</td>
                  <td style="padding:10px 14px;"><div style="background:#FFFFFF; padding:6px 10px; border-radius:6px; border:1px solid #E2E8F0;"><span style="font-size:0.78rem; font-weight:900; color:#000000;">Strong</span> <span style="font-size:0.75rem; color:#19191A;">Primary</span></div></td>
                </tr>
                <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
                  <td style="padding:10px 14px; font-family:monospace;"><span style="display:inline-block; width:14px; height:14px; background:#1C1C1C; border-radius:3px; vertical-align:middle; margin-right:6px;"></span>#1C1C1C</td>
                  <td style="padding:10px 14px; font-family:monospace; font-weight:700;">#FFFFFF</td>
                  <td style="padding:10px 14px; font-family:monospace;">#FCFAF6</td>
                  <td style="padding:10px 14px;"><div style="background:#1C1C1C; padding:6px 10px; border-radius:6px; border:1px solid #3C3C3B;"><span style="font-size:0.78rem; font-weight:900; color:#FFFFFF;">Strong</span> <span style="font-size:0.75rem; color:#FCFAF6;">Primary</span></div></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px; font-family:monospace;"><span style="display:inline-block; width:14px; height:14px; background:#000000; border-radius:3px; vertical-align:middle; margin-right:6px;"></span>#000000</td>
                  <td style="padding:10px 14px; font-family:monospace; font-weight:700;">#FFFFFF</td>
                  <td style="padding:10px 14px; font-family:monospace;">#FCFAF6</td>
                  <td style="padding:10px 14px;"><div style="background:#000000; padding:6px 10px; border-radius:6px; border:1px solid #3C3C3B;"><span style="font-size:0.78rem; font-weight:900; color:#FFFFFF;">Strong</span> <span style="font-size:0.75rem; color:#FCFAF6;">Primary</span></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Design Tokens CSS + Secondary/Disabled -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">

          <!-- Token Definitions -->
          <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; box-shadow:var(--f-shadow-2);">
            <div style="padding:0.875rem 1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:800; font-size:0.85rem; color:var(--color-neutral-fg-1); display:flex; align-items:center; gap:8px;">
              <iconify-icon icon="fluent:code-24-regular" style="color:var(--color-brand-primary);font-size:1.1rem;"></iconify-icon>
              6. Design Token Definitions
            </div>
            <div style="padding:1rem 1.25rem;">
              <pre style="font-size:0.75rem; line-height:1.7; color:var(--color-neutral-fg-2); margin:0; font-family:'Cascadia Code', 'JetBrains Mono', 'Fira Code', monospace; white-space:pre-wrap; overflow-x:auto;"><span style="color:var(--color-neutral-fg-3);">/* LIGHT MODE */</span>
:root &#123;
  <span style="color:var(--color-brand-primary);">--text-strong</span>:    <span style="color:#107C10;">#000000</span>;
  <span style="color:var(--color-brand-primary);">--text-primary</span>:   <span style="color:#107C10;">#19191a</span>;
  <span style="color:var(--color-brand-primary);">--surface-canvas</span>: <span style="color:#107C10;">#fcfaf6</span>;
  <span style="color:var(--color-brand-primary);">--surface-elev</span>:   <span style="color:#107C10;">#ffffff</span>;
&#125;

<span style="color:var(--color-neutral-fg-3);">/* DARK MODE */</span>
[data-theme="dark"] &#123;
  <span style="color:var(--color-brand-primary);">--text-strong</span>:    <span style="color:#6DC6EC;">#ffffff</span>;
  <span style="color:var(--color-brand-primary);">--text-primary</span>:   <span style="color:#6DC6EC;">#fcfaf6</span>;
  <span style="color:var(--color-brand-primary);">--surface-canvas</span>: <span style="color:#6DC6EC;">#1c1c1c</span>;
  <span style="color:var(--color-brand-primary);">--surface-elev</span>:   <span style="color:#6DC6EC;">#000000</span>;
&#125;</pre>
            </div>
          </div>

          <!-- Secondary + Disabled -->
          <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; box-shadow:var(--f-shadow-2);">
            <div style="padding:0.875rem 1.25rem; border-bottom:1px solid var(--color-neutral-stroke-1); font-weight:800; font-size:0.85rem; color:var(--color-neutral-fg-1); display:flex; align-items:center; gap:8px;">
              <iconify-icon icon="fluent:warning-24-regular" style="color:#D83B01;font-size:1.1rem;"></iconify-icon>
              7. Missing Layer — Secondary &amp; Disabled
            </div>
            <div style="padding:1.25rem;">
              <p style="font-size:0.8rem; color:var(--color-neutral-fg-2); line-height:1.5; margin-bottom:0.875rem;">The base palette does <strong>not</strong> provide a secondary text colour. Solve with <strong>opacity-derived semantic tokens</strong> — never pick an arbitrary grey.</p>
              <pre style="font-size:0.75rem; line-height:1.7; color:var(--color-neutral-fg-2); margin:0 0 0.875rem; font-family:'Cascadia Code', 'JetBrains Mono', 'Fira Code', monospace; white-space:pre-wrap;"><span style="color:var(--color-neutral-fg-3);">/* Light */</span>
<span style="color:var(--color-brand-primary);">--text-secondary</span>:
  <span style="color:#107C10;">rgba(25, 25, 26, 0.65)</span>;
<span style="color:var(--color-brand-primary);">--text-disabled</span>:
  <span style="color:#107C10;">rgba(25, 25, 26, 0.35)</span>;

<span style="color:var(--color-neutral-fg-3);">/* Dark */</span>
<span style="color:var(--color-brand-primary);">--text-secondary</span>:
  <span style="color:#6DC6EC;">rgba(252, 250, 246, 0.65)</span>;
<span style="color:var(--color-brand-primary);">--text-disabled</span>:
  <span style="color:#6DC6EC;">rgba(252, 250, 246, 0.35)</span>;</pre>
              <div style="font-size:0.75rem; color:var(--color-neutral-fg-3);">
                Secondary: Metadata · Dates · Helper text · Labels<br>
                Disabled: Unavailable actions · Inactive fields
              </div>
            </div>
          </div>
        </div>

        <!-- Art Direction Rule -->
        <div style="background: linear-gradient(135deg, #022057 0%, #043388 60%, #021A40 100%); border-radius:var(--f-radius-xl); padding:1.5rem 1.75rem; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; box-shadow:var(--f-shadow-4);">
          <div>
            <div style="font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; color:#6DC6EC; margin-bottom:4px;">Final Art Direction Rule</div>
            <p style="font-size:0.95rem; color:#FCFAF6; font-style:italic; font-weight:600; margin:0 0 8px; line-height:1.5;">"Black and white create emphasis. Carbon Black and Porcelain create readability."</p>
            <div style="font-size:0.78rem; color:rgba(252,250,246,0.75); line-height:1.7;">
              <strong style="color:#FCFAF6;">Strong</strong> → <code style="color:#6DC6EC;">#000000 / #FFFFFF</code><br>
              <strong style="color:#FCFAF6;">Primary</strong> → <code style="color:#6DC6EC;">#19191A / #FCFAF6</code><br>
              <strong style="color:#FCFAF6;">Secondary</strong> → Derived from Primary at 65% opacity<br>
              <strong style="color:#FCFAF6;">Disabled</strong> → Derived from Primary at 35% opacity
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; font-family:monospace; font-size:0.75rem;">
            <div style="background:rgba(255,255,255,0.08); padding:4px 12px; border-radius:6px; color:#FFFFFF; font-weight:800; letter-spacing:0.02em;">████ STRONG</div>
            <div style="background:rgba(255,255,255,0.05); padding:4px 12px; border-radius:6px; color:#FCFAF6;">████ Primary</div>
            <div style="background:rgba(255,255,255,0.03); padding:4px 12px; border-radius:6px; color:rgba(252,250,246,0.65);">████ Secondary</div>
            <div style="background:rgba(255,255,255,0.02); padding:4px 12px; border-radius:6px; color:rgba(252,250,246,0.35);">████ Disabled</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Typography -->
    <section class="cl-section" id="typography" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Foundation</div>
      <h2 class="cl-section-title">Typography</h2>
      <p class="cl-section-desc">Inter &bull; Fluent 2-compatible typeface scale from Display to Label. Identical token naming across web, Flutter, and Expo.</p>
      <div class="cl-card" style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.5rem;">
        <div class="cl-type-row" style="display:flex; align-items:baseline; gap:1.5rem; padding:0.75rem 0; border-bottom:1px solid var(--color-neutral-stroke-1);"><div style="width:120px; font-size:0.7rem; font-weight:700; color:var(--color-neutral-fg-3); text-transform:uppercase;">Display</div><div style="font-size:2.5rem; font-weight:800; letter-spacing:-0.03em; color:var(--color-neutral-fg-1);">SuamiSihat™</div></div>
        <div class="cl-type-row" style="display:flex; align-items:baseline; gap:1.5rem; padding:0.75rem 0; border-bottom:1px solid var(--color-neutral-stroke-1);"><div style="width:120px; font-size:0.7rem; font-weight:700; color:var(--color-neutral-fg-3); text-transform:uppercase;">Title Large</div><div style="font-size:1.75rem; font-weight:700; color:var(--color-neutral-fg-1);">Brand System</div></div>
        <div class="cl-type-row" style="display:flex; align-items:baseline; gap:1.5rem; padding:0.75rem 0; border-bottom:1px solid var(--color-neutral-stroke-1);"><div style="width:120px; font-size:0.7rem; font-weight:700; color:var(--color-neutral-fg-3); text-transform:uppercase;">Subtitle</div><div style="font-size:1.15rem; font-weight:600; color:var(--color-neutral-fg-1);">Fluent 2 Design Tokens</div></div>
        <div class="cl-type-row" style="display:flex; align-items:baseline; gap:1.5rem; padding:0.75rem 0; border-bottom:1px solid var(--color-neutral-stroke-1);"><div style="width:120px; font-size:0.7rem; font-weight:700; color:var(--color-neutral-fg-3); text-transform:uppercase;">Body</div><div style="font-size:0.95rem; line-height:1.6; color:var(--color-neutral-fg-2);">The quick brown fox jumps over the lazy dog. Standard clinical readability.</div></div>
        <div class="cl-type-row" style="display:flex; align-items:baseline; gap:1.5rem; padding:0.75rem 0;"><div style="width:120px; font-size:0.7rem; font-weight:700; color:var(--color-neutral-fg-3); text-transform:uppercase;">Caption</div><div style="font-size:0.75rem; color:var(--color-neutral-fg-3);">Timestamps, legal disclaimers, metadata pills</div></div>
      </div>
    </section>

    <!-- 4. Spacing Scale -->
    <section class="cl-section" id="spacing" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Foundation</div>
      <h2 class="cl-section-title">Spacing Scale</h2>
      <p class="cl-section-desc">4px base grid. All values via <code>--f-space-*</code>. Touch target minimum: 44px.</p>
      <div class="cl-card" style="background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl); padding: 1.5rem;">
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; align-items:center; gap:12px;"><div style="width:4px; height:18px; background:var(--color-brand-primary);"></div><span style="font-family:monospace; font-size:0.8rem;">--f-space-1 = 4px</span></div>
          <div style="display:flex; align-items:center; gap:12px;"><div style="width:8px; height:18px; background:var(--color-brand-primary);"></div><span style="font-family:monospace; font-size:0.8rem;">--f-space-2 = 8px</span></div>
          <div style="display:flex; align-items:center; gap:12px;"><div style="width:16px; height:18px; background:var(--color-brand-primary);"></div><span style="font-family:monospace; font-size:0.8rem;">--f-space-4 = 16px (Default container padding)</span></div>
          <div style="display:flex; align-items:center; gap:12px;"><div style="width:24px; height:18px; background:var(--color-brand-primary);"></div><span style="font-family:monospace; font-size:0.8rem;">--f-space-6 = 24px (Card padding)</span></div>
          <div style="display:flex; align-items:center; gap:12px;"><div style="width:32px; height:18px; background:var(--color-brand-primary);"></div><span style="font-family:monospace; font-size:0.8rem;">--f-space-8 = 32px (Section gap)</span></div>
        </div>
      </div>
    </section>

    <!-- 5. Elevation, Radii & Motion -->
    <section class="cl-section" id="elevation" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Foundation</div>
      <h2 class="cl-section-title">Elevation, Radii &amp; Motion</h2>
      <div class="row g-4 mb-4">
        <div class="col-md-6" id="radius">
          <div class="cl-card p-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); height:100%;">
            <h4 style="font-size:1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:1rem;">Corner Radii</h4>
            <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
              <div style="width:40px; height:40px; border-radius:4px; border:2px solid var(--color-brand-primary); background:var(--color-brand-subtle); display:flex; align-items:center; justify-content:center; font-size:0.65rem;">sm 4px</div>
              <div style="width:48px; height:48px; border-radius:8px; border:2px solid var(--color-brand-primary); background:var(--color-brand-subtle); display:flex; align-items:center; justify-content:center; font-size:0.65rem;">md 8px</div>
              <div style="width:56px; height:56px; border-radius:12px; border:2px solid var(--color-brand-primary); background:var(--color-brand-subtle); display:flex; align-items:center; justify-content:center; font-size:0.65rem;">lg 12px</div>
              <div style="width:64px; height:64px; border-radius:16px; border:2px solid var(--color-brand-primary); background:var(--color-brand-subtle); display:flex; align-items:center; justify-content:center; font-size:0.65rem;">xl 16px</div>
              <div style="width:56px; height:56px; border-radius:9999px; border:2px solid var(--color-brand-primary); background:var(--color-brand-subtle); display:flex; align-items:center; justify-content:center; font-size:0.65rem;">full</div>
            </div>
          </div>
        </div>

        <div class="col-md-6" id="motion">
          <div class="cl-card p-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); height:100%;">
            <h4 style="font-size:1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:1rem;">Motion Curves</h4>
            <div style="display:flex; flex-direction:column; gap:6px; font-size:0.8rem;">
              <div><code>--f-curve-easy-ease</code>: Hover, color fades</div>
              <div><code>--f-curve-decelerate</code>: Entering modals &amp; sheets</div>
              <div><code>--f-curve-accelerate</code>: Exiting &amp; dismissing elements</div>
              <div><code>--f-curve-spring</code>: Button tactile press, card hover</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Icons Showcase -->
      <div id="icons" class="cl-card p-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl);">
        <div style="font-size:0.75rem; font-weight:700; color:var(--color-brand-primary); text-transform:uppercase; margin-bottom:4px;">Iconography Vocabulary</div>
        <h4 style="font-size:1.15rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:1rem;">Fluent UI System Icons (Click to Copy)</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(70px, 1fr)); gap:8px;">
          {#each ['home-24-regular', 'person-24-regular', 'settings-24-regular', 'search-24-regular', 'alert-24-regular', 'mail-24-regular', 'calendar-24-regular', 'heart-24-regular', 'star-24-regular', 'checkmark-24-regular', 'doctor-24-regular', 'pill-24-regular', 'heart-pulse-24-regular', 'home-24-filled', 'person-24-filled', 'heart-24-filled'] as iconName}
            <button onclick={() => copyText(`<iconify-icon icon="fluent:${iconName}"></iconify-icon>`, iconName)} class="cl-icon-item" style="display:flex; flex-direction:column; align-items:center; gap:4px; padding:8px 4px; border-radius:6px; border:1px solid var(--color-neutral-stroke-1); background:var(--color-neutral-bg-1); cursor:pointer;">
              <iconify-icon icon="fluent:{iconName}" style="font-size:1.3rem; color:var(--color-brand-primary);"></iconify-icon>
              <span style="font-size:0.55rem; color:var(--color-neutral-fg-3); overflow:hidden; text-overflow:ellipsis; width:100%; text-align:center;">{iconName.replace('-24-', ' ')}</span>
            </button>
          {/each}
        </div>
        {#if copiedIcon}
          <div style="font-size:0.75rem; color:#16A34A; font-weight:600; margin-top:8px; text-align:center;">Copied icon snippet &lt;iconify-icon icon="fluent:{copiedIcon}"&gt;</div>
        {/if}
      </div>
    </section>

    <!-- 6. Buttons & Calls to Action -->
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
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.buttons === 'web'} class:ss-btn-secondary={activeCodeTabs.buttons !== 'web'} onclick={() => setCodeTab('buttons', 'web')}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> Web</button>
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.buttons === 'expo'} class:ss-btn-secondary={activeCodeTabs.buttons !== 'expo'} onclick={() => setCodeTab('buttons', 'expo')}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
        </div>
        <CodeBox code={activeCodeTabs.buttons === 'expo' ? codeSnippets.buttonsExpo : codeSnippets.buttonsWeb} language={activeCodeTabs.buttons === 'expo' ? 'typescript' : 'html'} />
      </div>
    </section>

    <!-- 7. Badges & Chips -->
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

    <!-- 8. Inputs & Form Controls -->
    <section class="cl-section" id="inputs" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Form Controls</div>
      <h2 class="cl-section-title">Inputs &amp; Switches</h2>
      <div class="cl-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem;">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="ss-input-group">
              <label class="ss-label" for="ex-name">Full Patient Name</label>
              <input class="ss-input" id="ex-name" type="text" placeholder="e.g. Ahmad bin Abdullah" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="ss-input-group">
              <label class="ss-label" for="ex-email">Work Email</label>
              <input class="ss-input" id="ex-email" type="email" placeholder="name@suamisihat.com.my" />
            </div>
          </div>
          <div class="col-12">
            <div class="ss-input-group">
              <label class="ss-label">Preferences &amp; Switches</label>
              <div style="display:flex; gap:1.5rem; flex-wrap:wrap; margin-top:4px;">
                <label class="ss-toggle-wrap" onclick={() => emailAlertsOn = !emailAlertsOn}>
                  <div class="ss-toggle" class:on={emailAlertsOn}></div>
                  <span class="ss-toggle-label">Email consultations alert</span>
                </label>
                <label class="ss-toggle-wrap" onclick={() => pushNotificationsOn = !pushNotificationsOn}>
                  <div class="ss-toggle" class:on={pushNotificationsOn}></div>
                  <span class="ss-toggle-label">Push notifications</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. Cards -->
    <section class="cl-section" id="cards" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Surfaces &amp; Containers</div>
      <h2 class="cl-section-title">Service &amp; Clinical Cards</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="ss-card" style="height:100%;">
            <div class="ss-card-icon" style="background:var(--color-brand-subtle); color:var(--color-brand-primary);"><iconify-icon icon="fluent:heart-pulse-24-regular" style="font-size:22px"></iconify-icon></div>
            <div class="ss-card-title">SS Health Clinic</div>
            <div class="ss-card-desc">Doctor-led private evaluation of biomarkers and personalized male recovery protocols.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="ss-card" style="height:100%;">
            <div class="ss-card-icon" style="background:rgba(33,161,247,0.1); color:#21A1F7;"><iconify-icon icon="fluent:store-microsoft-24-regular" style="font-size:22px"></iconify-icon></div>
            <div class="ss-card-title">SS Ecommerce</div>
            <div class="ss-card-desc">Direct-to-consumer discretion, discrete packaging, and verified logistics.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="ss-card" style="height:100%;">
            <div class="ss-card-icon" style="background:rgba(252,229,61,0.18); color:#7a6200;"><iconify-icon icon="fluent:shield-checkmark-24-regular" style="font-size:22px"></iconify-icon></div>
            <div class="ss-card-title">ANDROLAB RX</div>
            <div class="ss-card-desc">Prescription clinical solutions, NPRA compliant pharmaceutical therapies.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 10. Alerts -->
    <section class="cl-section" id="alerts" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Feedback &amp; Status</div>
      <h2 class="cl-section-title">Alerts &amp; Notice Banners</h2>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div class="ss-alert ss-alert-info"><iconify-icon icon="fluent:info-24-regular" style="color:#21A1F7; font-size:18px;"></iconify-icon><div><strong>Clinical Info:</strong> Blood biomarker testing requires minimum 8-hour fasting.</div></div>
        <div class="ss-alert ss-alert-success"><iconify-icon icon="fluent:checkmark-circle-24-regular" style="color:#16A34A; font-size:18px;"></iconify-icon><div><strong>Success:</strong> Consultation session booked with Dr. Ismail Tambi.</div></div>
        <div class="ss-alert ss-alert-warning"><iconify-icon icon="fluent:warning-24-regular" style="color:#CA8A04; font-size:18px;"></iconify-icon><div><strong>Warning:</strong> TRT prescriptions require recurring 90-day haematology screening.</div></div>
        <div class="ss-alert ss-alert-danger"><iconify-icon icon="fluent:error-circle-24-regular" style="color:#DC2626; font-size:18px;"></iconify-icon><div><strong>Error:</strong> Medical device order validation failed. Invalid staff ID.</div></div>
      </div>
    </section>

    <!-- 11. Avatars & Progress -->
    <section class="cl-section" id="avatars" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Data &amp; Identity</div>
      <h2 class="cl-section-title">Avatars, Progress &amp; Skeletons</h2>
      <div class="row g-4" id="progress">
        <div class="col-md-6">
          <div class="cl-card p-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); height:100%;">
            <h4 style="font-size:1rem; font-weight:700; margin-bottom:1rem; color:var(--color-neutral-fg-1);">Avatars &amp; Groups</h4>
            <div style="display:flex; align-items:center; gap:1rem;">
              <div class="ss-avatar ss-avatar-sm">AH</div>
              <div class="ss-avatar">IT</div>
              <div class="ss-avatar ss-avatar-lg">SS</div>
              <div class="ss-avatar-group">
                <div class="ss-avatar" style="background:#043388; color:#fff;">DR</div>
                <div class="ss-avatar" style="background:#21A1F7; color:#fff;">RN</div>
                <div class="ss-avatar" style="background:#E2E8F0; color:#1C1C1C;">+4</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="cl-card p-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); height:100%;">
            <h4 style="font-size:1rem; font-weight:700; margin-bottom:1rem; color:var(--color-neutral-fg-1);">Progress Trackers</h4>
            <div class="ss-progress-wrap mb-3"><div class="ss-progress-label"><span>Onboarding Guide</span><span>85%</span></div><div class="ss-progress-track"><div class="ss-progress-bar" style="width:85%"></div></div></div>
            <div class="ss-skeleton" style="height:12px; width:80%; margin-bottom:6px;"></div>
            <div class="ss-skeleton" style="height:12px; width:60%;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 12. Tabs & Navigation Bar -->
    <section class="cl-section" id="navigation" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Navigation &amp; Mobile UI</div>
      <h2 class="cl-section-title">Tabs &amp; Mobile Bottom Tab Bar</h2>
      <div class="cl-card mb-4" id="tabs" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
        <div class="cl-preview" style="display:block;padding:0;background:var(--color-neutral-bg-3)">
          <div style="max-width:375px;margin:1.5rem auto;background:var(--color-neutral-bg-2);border-radius:var(--f-radius-xl);overflow:hidden;border:1px solid var(--color-neutral-stroke-1);">
            <div style="padding:1.5rem;height:140px;display:flex;align-items:center;justify-content:center;color:var(--color-neutral-fg-3);font-size:0.875rem;">Screen Content Area</div>
            <div class="ss-bottom-tab" style="display:flex;background:var(--color-layer-acrylic);border-top:1px solid var(--color-neutral-stroke-1);padding:6px 0;">
              <button class="ss-tab-item" class:active={activeBottomTab === 'home'} onclick={() => activeBottomTab = 'home'} style="border:none;background:none;cursor:pointer;flex:1;display:flex;flex-direction:column;align-items:center;font-size:0.75rem;color:var(--color-neutral-fg-2);">
                <iconify-icon icon={activeBottomTab === 'home' ? 'fluent:home-24-filled' : 'fluent:home-24-regular'} style="font-size:1.25rem;color:{activeBottomTab === 'home' ? 'var(--color-brand-primary)' : 'inherit'};"></iconify-icon>
                <span>Home</span>
              </button>
              <button class="ss-tab-item" class:active={activeBottomTab === 'health'} onclick={() => activeBottomTab = 'health'} style="border:none;background:none;cursor:pointer;flex:1;display:flex;flex-direction:column;align-items:center;font-size:0.75rem;color:var(--color-neutral-fg-2);">
                <iconify-icon icon={activeBottomTab === 'health' ? 'fluent:heart-pulse-24-filled' : 'fluent:heart-pulse-24-regular'} style="font-size:1.25rem;color:{activeBottomTab === 'health' ? 'var(--color-brand-primary)' : 'inherit'};"></iconify-icon>
                <span>Health</span>
              </button>
              <button class="ss-tab-item" class:active={activeBottomTab === 'schedule'} onclick={() => activeBottomTab = 'schedule'} style="border:none;background:none;cursor:pointer;flex:1;display:flex;flex-direction:column;align-items:center;font-size:0.75rem;color:var(--color-neutral-fg-2);">
                <iconify-icon icon={activeBottomTab === 'schedule' ? 'fluent:calendar-24-filled' : 'fluent:calendar-24-regular'} style="font-size:1.25rem;color:{activeBottomTab === 'schedule' ? 'var(--color-brand-primary)' : 'inherit'};"></iconify-icon>
                <span>Schedule</span>
              </button>
              <button class="ss-tab-item" class:active={activeBottomTab === 'profile'} onclick={() => activeBottomTab = 'profile'} style="border:none;background:none;cursor:pointer;flex:1;display:flex;flex-direction:column;align-items:center;font-size:0.75rem;color:var(--color-neutral-fg-2);">
                <iconify-icon icon={activeBottomTab === 'profile' ? 'fluent:person-24-filled' : 'fluent:person-24-regular'} style="font-size:1.25rem;color:{activeBottomTab === 'profile' ? 'var(--color-brand-primary)' : 'inherit'};"></iconify-icon>
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>

        <div style="border-top:1px solid var(--color-neutral-stroke-1); padding:0.5rem 1rem; background:var(--color-neutral-bg-3); display:flex; gap:0.5rem;">
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.nav === 'web'} class:ss-btn-secondary={activeCodeTabs.nav !== 'web'} onclick={() => setCodeTab('nav', 'web')}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> Web</button>
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.nav === 'expo'} class:ss-btn-secondary={activeCodeTabs.nav !== 'expo'} onclick={() => setCodeTab('nav', 'expo')}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
        </div>
        <CodeBox code={activeCodeTabs.nav === 'expo' ? codeSnippets.navExpo : codeSnippets.navWeb} language={activeCodeTabs.nav === 'expo' ? 'typescript' : 'html'} />
      </div>
    </section>

    <!-- 13. Modal & Bottom Sheet -->
    <section class="cl-section" id="modal" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Overlays &amp; Sheets</div>
      <h2 class="cl-section-title">Modal &amp; Bottom Sheet</h2>
      <p class="cl-section-desc">Interactive bottom sheet for mobile interactions, doctor booking confirmations, and dosage instructions.</p>

      <div class="cl-card mb-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
        <div style="padding:1.5rem; background:var(--color-neutral-bg-3); display:flex; flex-direction:column; align-items:center; gap:1rem;">
          <div class="ss-modal" style="max-width:380px; width:100%; background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem; box-shadow:var(--f-shadow-16);">
            <div style="width:36px; height:4px; border-radius:2px; background:var(--color-neutral-stroke-2); margin:0 auto 1rem;"></div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:0.5rem;">Book Appointment</div>
            <div style="font-size:0.85rem; color:var(--color-neutral-fg-2); line-height:1.5; margin-bottom:1.25rem;">Select your preferred date and time with Dr. Ahmad Zaki. A confirmation SMS will be sent.</div>
            <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
              <button type="button" class="ss-btn ss-btn-secondary ss-btn-sm" onclick={() => spawnToast('info', 'Cancelled', 'Appointment booking dismissed.')}>Cancel</button>
              <button type="button" class="ss-btn ss-btn-primary ss-btn-sm" onclick={() => spawnToast('success', 'Confirmed', 'Booking request received.')}><iconify-icon icon="fluent:checkmark-circle-24-regular"></iconify-icon> Confirm</button>
            </div>
          </div>
          <button 
            type="button" 
            class="ss-btn ss-btn-primary"
            onclick={() => isDemoModalOpen = true}
          >
            <iconify-icon icon="fluent:window-sparkle-24-regular"></iconify-icon> Open Live Dialog Demo
          </button>
        </div>

        <div style="border-top:1px solid var(--color-neutral-stroke-1); padding:0.5rem 1rem; background:var(--color-neutral-bg-3); display:flex; gap:0.5rem;">
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.modal === 'web'} class:ss-btn-secondary={activeCodeTabs.modal !== 'web'} onclick={() => setCodeTab('modal', 'web')}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> Web</button>
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.modal === 'expo'} class:ss-btn-secondary={activeCodeTabs.modal !== 'expo'} onclick={() => setCodeTab('modal', 'expo')}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
        </div>
        <CodeBox code={activeCodeTabs.modal === 'expo' ? codeSnippets.modalExpo : codeSnippets.modalWeb} language={activeCodeTabs.modal === 'expo' ? 'typescript' : 'html'} />
      </div>
    </section>

    <!-- 14. Toast Notifications -->
    <section class="cl-section" id="toast" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Feedback</div>
      <h2 class="cl-section-title">Toast &amp; Snackbar</h2>
      <div class="cl-card mb-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
        <div style="padding:1.5rem;">
          <div class="ss-toast-stack mb-3" style="display:flex; flex-direction:column; gap:8px;">
            <div class="ss-toast ss-toast-success"><iconify-icon icon="fluent:checkmark-circle-24-filled"></iconify-icon><div class="ss-toast-content"><div class="ss-toast-title">Appointment confirmed</div><div class="ss-toast-msg">Dr. Ahmad &bull; 14 Aug at 10:00 AM</div></div><button class="ss-toast-close" type="button" aria-label="Close static toast"><iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon></button></div>
            <div class="ss-toast ss-toast-error"><iconify-icon icon="fluent:error-circle-24-filled"></iconify-icon><div class="ss-toast-content"><div class="ss-toast-title">Sync failed</div><div class="ss-toast-msg">Check connection and try again</div></div><button class="ss-toast-close" type="button" aria-label="Close static toast"><iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon></button></div>
          </div>

          <!-- Live Interactive Toast Spawners -->
          <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--color-neutral-fg-2);">Trigger Live Toasts:</span>
            <button type="button" class="ss-btn ss-btn-sm ss-btn-secondary" onclick={() => spawnToast('success', 'Sync Successful', 'All offline clinic records are synchronized.')}>
              <iconify-icon icon="fluent:checkmark-circle-24-filled" style="color:var(--color-brand-success, #107C10);"></iconify-icon> Success Toast
            </button>
            <button type="button" class="ss-btn ss-btn-sm ss-btn-secondary" onclick={() => spawnToast('warning', 'Low Inventory', 'Dr Mit Ring Size 3 is running low in stock.')}>
              <iconify-icon icon="fluent:warning-24-filled" style="color:var(--color-brand-warning, #D83B01);"></iconify-icon> Warning Toast
            </button>
            <button type="button" class="ss-btn ss-btn-sm ss-btn-secondary" onclick={() => spawnToast('error', 'API Timeout', 'Could not establish connection to NAS auth server.')}>
              <iconify-icon icon="fluent:error-circle-24-filled" style="color:var(--color-brand-error, #A80000);"></iconify-icon> Error Toast
            </button>
            <button type="button" class="ss-btn ss-btn-sm ss-btn-secondary" onclick={() => spawnToast('info', 'New Update Available', 'SSCAM v3.5.2 is ready for download.')}>
              <iconify-icon icon="fluent:info-24-filled" style="color:var(--color-brand-primary);"></iconify-icon> Info Toast
            </button>
          </div>
        </div>
        <div style="border-top:1px solid var(--color-neutral-stroke-1); padding:0.5rem 1rem; background:var(--color-neutral-bg-3); display:flex; gap:0.5rem;">
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.toast === 'web'} class:ss-btn-secondary={activeCodeTabs.toast !== 'web'} onclick={() => setCodeTab('toast', 'web')}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> Web</button>
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.toast === 'expo'} class:ss-btn-secondary={activeCodeTabs.toast !== 'expo'} onclick={() => setCodeTab('toast', 'expo')}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
        </div>
        <CodeBox code={activeCodeTabs.toast === 'expo' ? codeSnippets.toastExpo : codeSnippets.toastWeb} language={activeCodeTabs.toast === 'expo' ? 'typescript' : 'html'} />
      </div>
    </section>

    <!-- 15. Empty State -->
    <section class="cl-section" id="empty-state" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Zero Data Views</div>
      <h2 class="cl-section-title">Empty State</h2>
      <div class="cl-card mb-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
        <div style="padding:2.5rem 1.5rem; display:flex; justify-content:center; text-align:center;">
          <div class="ss-empty" style="max-width:340px;">
            <div style="width:64px; height:64px; border-radius:16px; background:var(--color-brand-subtle); color:var(--color-brand-primary); display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1rem;">
              <iconify-icon icon="fluent:calendar-empty-24-regular"></iconify-icon>
            </div>
            <h4 style="font-size:1.15rem; font-weight:700; color:var(--color-neutral-fg-1); margin-bottom:0.5rem;">No appointments yet</h4>
            <p style="font-size:0.85rem; color:var(--color-neutral-fg-2); line-height:1.5; margin-bottom:1.25rem;">Book your first appointment with a SuamiSihat™ clinic. We'll send a reminder 24 hours before.</p>
            <button class="ss-btn ss-btn-primary"><iconify-icon icon="fluent:add-circle-24-regular"></iconify-icon> Book Appointment</button>
          </div>
        </div>
        <div style="border-top:1px solid var(--color-neutral-stroke-1); padding:0.5rem 1rem; background:var(--color-neutral-bg-3); display:flex; gap:0.5rem;">
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.empty === 'web'} class:ss-btn-secondary={activeCodeTabs.empty !== 'web'} onclick={() => setCodeTab('empty', 'web')}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> Web</button>
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.empty === 'expo'} class:ss-btn-secondary={activeCodeTabs.empty !== 'expo'} onclick={() => setCodeTab('empty', 'expo')}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
        </div>
        <CodeBox code={activeCodeTabs.empty === 'expo' ? codeSnippets.emptyExpo : codeSnippets.emptyWeb} language={activeCodeTabs.empty === 'expo' ? 'typescript' : 'html'} />
      </div>
    </section>

    <!-- 16. List Item -->
    <section class="cl-section" id="list-item" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Structured Rows</div>
      <h2 class="cl-section-title">Clinical List Item</h2>
      <div class="cl-card mb-4" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden;">
        <div style="padding:1.5rem;">
          <div class="ss-list" style="display:flex; flex-direction:column; gap:8px;">
            <div class="ss-list-item" style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem 1rem; border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-lg); background:var(--color-neutral-bg-1);">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:36px; height:36px; border-radius:8px; background:rgba(33,161,247,0.1); color:#21A1F7; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                  <iconify-icon icon="fluent:heart-pulse-24-filled"></iconify-icon>
                </div>
                <div>
                  <strong style="color:var(--color-neutral-fg-1); font-size:0.9rem; display:block;">Blood Pressure</strong>
                  <span style="color:var(--color-neutral-fg-3); font-size:0.75rem;">Last recorded 2h ago</span>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="ss-badge ss-badge-success">Normal</span>
                <iconify-icon icon="fluent:chevron-right-16-regular" style="color:var(--color-neutral-fg-3);"></iconify-icon>
              </div>
            </div>
          </div>
        </div>
        <div style="border-top:1px solid var(--color-neutral-stroke-1); padding:0.5rem 1rem; background:var(--color-neutral-bg-3); display:flex; gap:0.5rem;">
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.list === 'web'} class:ss-btn-secondary={activeCodeTabs.list !== 'web'} onclick={() => setCodeTab('list', 'web')}><iconify-icon icon="fluent:globe-24-regular"></iconify-icon> Web</button>
          <button class="ss-btn ss-btn-sm" class:ss-btn-primary={activeCodeTabs.list === 'expo'} class:ss-btn-secondary={activeCodeTabs.list !== 'expo'} onclick={() => setCodeTab('list', 'expo')}><iconify-icon icon="fluent:phone-24-regular"></iconify-icon> Expo</button>
        </div>
        <CodeBox code={activeCodeTabs.list === 'expo' ? codeSnippets.listExpo : codeSnippets.listWeb} language={activeCodeTabs.list === 'expo' ? 'typescript' : 'html'} />
      </div>
    </section>

    <!-- 17. Stats Card -->
    <section class="cl-section" id="stats" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">Metrics</div>
      <h2 class="cl-section-title">Stats Metric Cards</h2>
      <div class="ss-stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div class="ss-stat-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.25rem;">
          <div style="width:36px; height:36px; border-radius:8px; background:rgba(33,161,247,0.1); color:#21A1F7; display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem;">
            <iconify-icon icon="fluent:heart-pulse-24-filled"></iconify-icon>
          </div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--color-neutral-fg-1);">118/76</div>
          <div style="font-size:0.78rem; color:var(--color-neutral-fg-3);">Blood Pressure (mmHg)</div>
        </div>
        <div class="ss-stat-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.25rem;">
          <div style="width:36px; height:36px; border-radius:8px; background:rgba(22,163,74,0.1); color:#16A34A; display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem;">
            <iconify-icon icon="fluent:steps-24-filled"></iconify-icon>
          </div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--color-neutral-fg-1);">7,842</div>
          <div style="font-size:0.78rem; color:var(--color-neutral-fg-3);">Steps Today</div>
        </div>
      </div>
    </section>

    <!-- 18. Fluent 2 State Matrix Table -->
    <section class="cl-section" id="state-matrix" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
      <div class="cl-section-eyebrow">UX Architecture</div>
      <h2 class="cl-section-title">Fluent 2 State Matrix</h2>
      <p class="cl-section-desc">Unified interaction matrix enforced across web and mobile surfaces.</p>

      <div class="cl-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.825rem; text-align:left;">
          <thead>
            <tr style="border-bottom:1px solid var(--color-neutral-stroke-1); background:var(--color-neutral-bg-3);">
              <th style="padding:10px 14px; font-weight:700;">Component State</th>
              <th style="padding:10px 14px; font-weight:700;">Surface Feedback</th>
              <th style="padding:10px 14px; font-weight:700;">Elevation / Shadow</th>
              <th style="padding:10px 14px; font-weight:700;">Accessibility Trigger</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
              <td style="padding:10px 14px;"><strong>Rest / Normal</strong></td>
              <td style="padding:10px 14px;">Default token color &amp; 100% opacity</td>
              <td style="padding:10px 14px;"><code>--f-shadow-2</code></td>
              <td style="padding:10px 14px;">WCAG AA contrast &ge; 4.5:1</td>
            </tr>
            <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
              <td style="padding:10px 14px;"><strong>Hover</strong></td>
              <td style="padding:10px 14px;"><code>--color-neutral-bg-4</code> (+8% brightness)</td>
              <td style="padding:10px 14px;"><code>--f-shadow-4</code> + translateY(-1px)</td>
              <td style="padding:10px 14px;">Mouse pointer cursor</td>
            </tr>
            <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
              <td style="padding:10px 14px;"><strong>Pressed / Active</strong></td>
              <td style="padding:10px 14px;">Scale(0.98) tactile spring bounce</td>
              <td style="padding:10px 14px;"><code>--f-shadow-2</code></td>
              <td style="padding:10px 14px;">Haptic click feedback</td>
            </tr>
            <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
              <td style="padding:10px 14px;"><strong>Focus (Keyboard)</strong></td>
              <td style="padding:10px 14px;">2px solid <code>#21A1F7</code> Azure ring</td>
              <td style="padding:10px 14px;">2px offset outline</td>
              <td style="padding:10px 14px;">Tab keyboard navigation</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;"><strong>Disabled</strong></td>
              <td style="padding:10px 14px;">Opacity 0.45 &amp; pointer-events: none</td>
              <td style="padding:10px 14px;">None</td>
              <td style="padding:10px 14px;"><code>aria-disabled="true"</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

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
  </main>
</div>

<!-- ─── Interactive Live Modal Dialog ─────────────────────────────── -->
{#if isDemoModalOpen}
  <div 
    class="ss-lightbox open" 
    style="display:flex; z-index:99999;"
    onclick={() => isDemoModalOpen = false}
    onkeydown={(e) => e.key === 'Escape' && (isDemoModalOpen = false)}
    role="presentation"
  >
    <div 
      class="ss-modal" 
      style="max-width:440px; width:90%; background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-2); border-radius:var(--f-radius-2xl); padding:2rem; box-shadow:0 24px 60px rgba(0,0,0,0.4); animation: f-fade-up 0.2s ease;"
      onclick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalDemoTitle"
      tabindex="-1"
    >
      <div style="width:40px; height:4px; border-radius:2px; background:var(--color-neutral-stroke-2); margin:0 auto 1.25rem;"></div>
      <div class="d-flex align-items-center gap-2 mb-2">
        <div style="width:36px; height:36px; border-radius:8px; background:rgba(33,161,247,0.12); color:#21A1F7; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
          <iconify-icon icon="fluent:calendar-checkmark-24-regular"></iconify-icon>
        </div>
        <h3 id="modalDemoTitle" style="font-size:1.2rem; font-weight:800; color:var(--color-neutral-fg-1); margin:0;">Book Clinical Consultation</h3>
      </div>
      <p style="font-size:0.875rem; color:var(--color-neutral-fg-2); line-height:1.6; margin-bottom:1.5rem;">
        Confirm your private appointment with Dr. Ahmad Zaki at SuamiSihat Clinic (Mid Valley). An SMS confirmation and encrypted digital pass will be issued.
      </p>
      <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
        <button 
          type="button" 
          class="ss-btn ss-btn-secondary ss-btn-sm" 
          onclick={() => { isDemoModalOpen = false; spawnToast('info', 'Appointment Cancelled', 'No consultation was scheduled.'); }}
        >
          Cancel
        </button>
        <button 
          type="button" 
          class="ss-btn ss-btn-primary ss-btn-sm" 
          onclick={() => { isDemoModalOpen = false; spawnToast('success', 'Consultation Confirmed!', 'Appointment booked with Dr. Ahmad Zaki for 14 Aug at 10:00 AM.'); }}
        >
          <iconify-icon icon="fluent:checkmark-circle-24-regular"></iconify-icon> Confirm Booking
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- ─── Floating Live Toast Container (Bottom-Right) ───────────────── -->
<div 
  class="ss-live-toast-container" 
  style="position:fixed; bottom:24px; right:24px; z-index:99999; display:flex; flex-direction:column; gap:10px; max-width:380px; width:calc(100vw - 48px); pointer-events:none;"
  aria-live="polite"
>
  {#each liveToasts as toast (toast.id)}
    <div 
      class="ss-toast ss-toast-{toast.type}" 
      style="pointer-events:auto; box-shadow:0 12px 32px rgba(0,0,0,0.25); animation: f-fade-up 0.25s cubic-bezier(0.16, 1, 0.3, 1);"
      role="status"
    >
      <iconify-icon 
        icon={toast.type === 'success' ? 'fluent:checkmark-circle-24-filled' : toast.type === 'warning' ? 'fluent:warning-24-filled' : toast.type === 'error' ? 'fluent:error-circle-24-filled' : 'fluent:info-24-filled'}
        style="font-size:1.3rem; flex-shrink:0;"
      ></iconify-icon>
      <div class="ss-toast-content" style="flex:1;">
        <div class="ss-toast-title" style="font-weight:700;">{toast.title}</div>
        <div class="ss-toast-msg" style="font-size:0.775rem;">{toast.msg}</div>
      </div>
      <button 
        type="button" 
        class="ss-toast-close" 
        onclick={() => removeToast(toast.id)}
        aria-label="Dismiss toast"
      >
        <iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon>
      </button>
    </div>
  {/each}
</div>
