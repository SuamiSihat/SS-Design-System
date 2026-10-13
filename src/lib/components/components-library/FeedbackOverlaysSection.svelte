<script>
  import CodeBox from '$lib/components/CodeBox.svelte';

  let {
    spawnToast = () => {},
    onOpenModal = () => {}
  } = $props();

  let activeBottomTab = $state('home');

  let activeCodeTabs = $state({
    nav: 'web',
    modal: 'web',
    toast: 'web',
    empty: 'web',
    list: 'web'
  });

  function setCodeTab(group, platform) {
    activeCodeTabs[group] = platform;
  }

  const codeSnippets = {
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
      <iconify-icon icon="fluent:heart-pulse-24-filled" style="color:var(--color-text-accent);font-size:20px"></iconify-icon>
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

<!-- 10. Alerts -->
<section class="cl-section" id="alerts" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">Feedback &amp; Status</div>
  <h2 class="cl-section-title">Alerts &amp; Notice Banners</h2>
  <div style="display:flex; flex-direction:column; gap:10px;">
    <div class="ss-alert ss-alert-info"><iconify-icon icon="fluent:info-24-regular" style="color:var(--color-text-accent); font-size:18px;"></iconify-icon><div><strong>Clinical Info:</strong> Blood biomarker testing requires minimum 8-hour fasting.</div></div>
    <div class="ss-alert ss-alert-success"><iconify-icon icon="fluent:checkmark-circle-24-regular" style="color:var(--color-success-fg); font-size:18px;"></iconify-icon><div><strong>Success:</strong> Consultation session booked with SS Clinic.</div></div>
    <div class="ss-alert ss-alert-warning"><iconify-icon icon="fluent:warning-24-regular" style="color:#CA8A04; font-size:18px;"></iconify-icon><div><strong>Warning:</strong> TRT prescriptions require recurring 90-day haematology screening.</div></div>
    <div class="ss-alert ss-alert-danger"><iconify-icon icon="fluent:error-circle-24-regular" style="color:var(--color-error-fg); font-size:18px;"></iconify-icon><div><strong>Error:</strong> Medical device order validation failed. Invalid staff ID.</div></div>
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
            <div class="ss-avatar" style="background:var(--color-action-bg); color:var(--color-on-action);">RN</div>
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
        onclick={onOpenModal}
      >
        <iconify-icon icon="fluent:window-new-24-regular"></iconify-icon> Open Live Dialog Demo
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
        <button type="button" class="ss-btn ss-btn-sm ss-btn-secondary" onclick={() => spawnToast('warning', 'Low Inventory', 'Dr. MIT Ring Size 3 is running low in stock.')}>
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
            <div style="width:36px; height:36px; border-radius:8px; background:rgba(33,161,247,0.1); color:var(--color-text-accent); display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
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
      <div style="width:36px; height:36px; border-radius:8px; background:rgba(33,161,247,0.1); color:var(--color-text-accent); display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem;">
        <iconify-icon icon="fluent:heart-pulse-24-filled"></iconify-icon>
      </div>
      <div style="font-size:1.5rem; font-weight:800; color:var(--color-neutral-fg-1);">118/76</div>
      <div style="font-size:0.78rem; color:var(--color-neutral-fg-3);">Blood Pressure (mmHg)</div>
    </div>
    <div class="ss-stat-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.25rem;">
      <div style="width:36px; height:36px; border-radius:8px; background:rgba(22,163,74,0.1); color:var(--color-success-fg); display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem;">
        <iconify-icon icon="fluent:steps-24-filled"></iconify-icon>
      </div>
      <div style="font-size:1.5rem; font-weight:800; color:var(--color-neutral-fg-1);">7,842</div>
      <div style="font-size:0.78rem; color:var(--color-neutral-fg-3);">Steps Today</div>
    </div>
  </div>
</section>
