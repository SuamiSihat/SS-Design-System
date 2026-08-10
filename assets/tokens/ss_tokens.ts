/**
 * SuamiSihat Design System — Expo / React Native Tokens
 * ss_tokens.ts  |  v3.1.0
 *
 * AUTO-DERIVED from assets/tokens/design-tokens.json
 * DO NOT EDIT MANUALLY — update design-tokens.json instead.
 *
 * Expo installation:
 *   npx expo install expo-font @expo-google-fonts/inter
 *   npx expo install react-native-svg
 *   npx expo install @fluentui/react-native-icons
 *
 * Usage:
 *   import { SSColors, SSSpacing, SSRadius, SSFont, SSShadow, SSMotion, SSBase } from './ss_tokens';
 */

import { Platform, StyleSheet, Easing } from 'react-native';

// ─────────────────────────────────────────────────────────────
// BRAND COLOURS
// ─────────────────────────────────────────────────────────────

export const SSColors = {
  // SS Brand Palette (design-tokens.json → color.brand.*)
  prussianBlue: '#022057',
  ssBlue:       '#043388',
  azure:        '#21A1F7',
  malibu:       '#6DC6EC',
  lion:         '#BD9A73',
  fawn:         '#CCAC8D',
  arylide:      '#E5D15C',
  banana:       '#FCE53D',

  // Semantic — Light Mode (design-tokens.json → color.semantic.light.*)
  fgPrimary:      '#1A1A1A',
  fgSecondary:    '#525252',
  fgPlaceholder:  '#737373',
  fgDisabled:     '#999999',
  fgInverse:      '#FFFFFF',
  bgCanvas:       '#F5F5F5',
  bgSurface:      '#FFFFFF',
  bgSubtle:       '#EBEBEB',
  bgHover:        '#E0E0E0',
  stroke1:        'rgba(0,0,0,0.08)',
  stroke2:        'rgba(0,0,0,0.14)',
  stroke3:        'rgba(0,0,0,0.20)',
  brandSubtle:    'rgba(4,51,136,0.06)',
  focusRing:      '#21A1F7',

  // Status (design-tokens.json → color.status.*)
  successBg: '#F0FDF4',
  successFg: '#16A34A',
  warningBg: '#FEFCE8',
  warningFg: '#CA8A04',
  errorBg:   '#FEF2F2',
  errorFg:   '#DC2626',
  infoBg:    'rgba(4,51,136,0.06)',
  infoFg:    '#043388',
} as const;

// Dark mode overrides — merge with SSColors using useSSColors()
export const SSColorsDark: Partial<typeof SSColors> = {
  fgPrimary:     '#FFFFFF',
  fgSecondary:   '#ABABAB',
  fgPlaceholder: '#767676',
  fgDisabled:    '#4A4A4A',
  fgInverse:     '#1A1A1A',
  bgCanvas:      '#141414',
  bgSurface:     '#1F1F1F',
  bgSubtle:      '#292929',
  bgHover:       '#333333',
  stroke1:       'rgba(255,255,255,0.08)',
  stroke2:       'rgba(255,255,255,0.14)',
  stroke3:       'rgba(255,255,255,0.22)',
  brandSubtle:   'rgba(33,161,247,0.10)',
  focusRing:     '#6DC6EC',
};

/** Use inside components: const colors = useSSColors(colorScheme); */
export function useSSColors(colorScheme: 'light' | 'dark' | null | undefined) {
  return colorScheme === 'dark'
    ? { ...SSColors, ...SSColorsDark }
    : SSColors;
}

// ─────────────────────────────────────────────────────────────
// SPACING  (4px base grid)
// design-tokens.json → spacing.*
// ─────────────────────────────────────────────────────────────

export const SSSpacing = {
  s1:  4,
  s2:  8,
  s3:  12,
  s4:  16,
  s5:  20,
  s6:  24,
  s8:  32,
  s10: 40,
  s12: 48,
  s16: 64,
  s20: 80,
  /** WCAG 2.1 + iOS HIG minimum touch target */
  touchMin: 44,
} as const;

// ─────────────────────────────────────────────────────────────
// BORDER RADIUS
// design-tokens.json → radius.*
// ─────────────────────────────────────────────────────────────

export const SSRadius = {
  none: 0,
  sm:   4,    // Badges, chips, tags
  md:   8,    // Cards, inputs, buttons
  lg:   12,   // Panels, modals, drawers
  xl:   16,   // Large cards, sheets
  xl2:  20,   // Feature cards
  xl3:  28,   // Hero panels
  full: 9999, // Pills, avatars
} as const;

// ─────────────────────────────────────────────────────────────
// TYPOGRAPHY
// Font: Inter — load via @expo-google-fonts/inter
// design-tokens.json → typography.*
// ─────────────────────────────────────────────────────────────

export const SSFont = {
  family: {
    regular:  'Inter_400Regular',
    medium:   'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold:     'Inter_700Bold',
  },
  scale: {
    display:  { fontSize: 48, fontWeight: '700' as const, letterSpacing: -1.44, lineHeight: 56 },
    titleL:   { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.64, lineHeight: 40 },
    title:    { fontSize: 24, fontWeight: '600' as const, letterSpacing: 0,     lineHeight: 32 },
    subtitle: { fontSize: 18, fontWeight: '600' as const, letterSpacing: 0,     lineHeight: 26 },
    bodyL:    { fontSize: 16, fontWeight: '400' as const, letterSpacing: 0,     lineHeight: 27 },
    body:     { fontSize: 14, fontWeight: '400' as const, letterSpacing: 0,     lineHeight: 22 },
    caption:  { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0,     lineHeight: 18 },
    label:    { fontSize: 11, fontWeight: '700' as const, letterSpacing: 0.88,  lineHeight: 16 },
  },
} as const;

// ─────────────────────────────────────────────────────────────
// ICON SIZES  (@fluentui/react-native-icons)
// Rule: Regular = default/inactive  |  Filled = active/selected
// Naming mirrors Iconify web: fluent:home-24-regular → Home24Regular
// design-tokens.json → icon.size.*
// ─────────────────────────────────────────────────────────────

export const SSIcon = {
  xs:  12,
  sm:  16,
  md:  20,
  lg:  24,  // Default — matches web Fluent 24-regular
  xl:  32,
  xl2: 48,
} as const;

// ─────────────────────────────────────────────────────────────
// ELEVATION / SHADOWS
// iOS: shadowColor + shadowOffset + shadowOpacity + shadowRadius
// Android: elevation
// design-tokens.json → shadow.*
// ─────────────────────────────────────────────────────────────

export const SSShadow = {
  level2: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.12, shadowRadius: 2 },
    android: { elevation: 2 },
    default: {},
  }),
  level4: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.14, shadowRadius: 4 },
    android: { elevation: 4 },
    default: {},
  }),
  level8: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.14, shadowRadius: 8 },
    android: { elevation: 8 },
    default: {},
  }),
  level16: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.14, shadowRadius: 16 },
    android: { elevation: 12 },
    default: {},
  }),
  brandSm: Platform.select({
    ios:     { shadowColor: '#043388', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 16 },
    android: { elevation: 6 },
    default: {},
  }),
  brandMd: Platform.select({
    ios:     { shadowColor: '#043388', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 32 },
    android: { elevation: 10 },
    default: {},
  }),
} as const;

// ─────────────────────────────────────────────────────────────
// MOTION / ANIMATION
// Use with Animated API or react-native-reanimated
// design-tokens.json → motion.*
// ─────────────────────────────────────────────────────────────

export const SSMotion = {
  duration: {
    ultraFast: 50,
    fast:      150,
    normal:    200,
    gentle:    250,
    slow:      300,
    slower:    400,
  },
  easing: {
    /** Hover, colour transitions — Easing.inOut(Easing.ease) */
    easyEase:   Easing.inOut(Easing.ease),
    /** Entering elements — Easing.out(Easing.ease) */
    decelerate: Easing.out(Easing.ease),
    /** Exiting elements — Easing.in(Easing.ease) */
    accelerate: Easing.in(Easing.ease),
  },
  /**
   * Spring config for react-native-reanimated withSpring()
   * Equivalent to CSS cubic-bezier(0.16, 1, 0.3, 1)
   */
  spring: {
    damping:           20,
    stiffness:         300,
    mass:              0.8,
    overshootClamping: false,
  },
} as const;

// ─────────────────────────────────────────────────────────────
// BASE COMPONENT STYLES
// Reusable StyleSheet presets — extend in your components,
// do not override values directly here.
// ─────────────────────────────────────────────────────────────

export const SSBase = StyleSheet.create({

  // ── Buttons ──────────────────────────────────────────────
  btnBase: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    gap:               SSSpacing.s2,
    borderRadius:      SSRadius.md,
    minHeight:         SSSpacing.touchMin,
    paddingHorizontal: SSSpacing.s5,
    paddingVertical:   SSSpacing.s2,
  },
  btnPrimary: {
    backgroundColor: SSColors.ssBlue,
  },
  btnSecondary: {
    backgroundColor: SSColors.bgSubtle,
    borderWidth:     1,
    borderColor:     SSColors.stroke2,
  },
  btnGhost: {
    backgroundColor: 'transparent',
  },
  btnDanger: {
    backgroundColor: SSColors.errorBg,
    borderWidth:     1,
    borderColor:     'rgba(220,38,38,0.18)',
  },
  btnDisabled: { opacity: 0.38 },
  btnSmall:    { minHeight: 36, paddingHorizontal: SSSpacing.s3 },
  btnLarge:    { minHeight: 52, paddingHorizontal: SSSpacing.s6 },

  // ── Button Text ───────────────────────────────────────────
  btnTextPrimary: {
    fontSize: 14, fontWeight: '600', color: '#FFFFFF',
  },
  btnTextSecondary: {
    fontSize: 14, fontWeight: '600', color: SSColors.fgPrimary,
  },
  btnTextGhost: {
    fontSize: 14, fontWeight: '600', color: SSColors.ssBlue,
  },
  btnTextDanger: {
    fontSize: 14, fontWeight: '600', color: SSColors.errorFg,
  },

  // ── Cards ─────────────────────────────────────────────────
  card: {
    backgroundColor: SSColors.bgSurface,
    borderRadius:    SSRadius.xl,
    borderWidth:     1,
    borderColor:     SSColors.stroke1,
    padding:         SSSpacing.s5,
  },

  // ── Inputs ────────────────────────────────────────────────
  inputBase: {
    height:            SSSpacing.touchMin,
    borderRadius:      SSRadius.md,
    borderWidth:       1,
    borderColor:       SSColors.stroke3,
    backgroundColor:   SSColors.bgSurface,
    paddingHorizontal: SSSpacing.s3,
    fontSize:          14,
    color:             SSColors.fgPrimary,
  },
  inputFocused: { borderColor: SSColors.ssBlue },
  inputError:   { borderColor: SSColors.errorFg },

  // ── Labels ────────────────────────────────────────────────
  label: {
    fontSize: 13, fontWeight: '600', color: SSColors.fgPrimary,
    marginBottom: SSSpacing.s1,
  },
  labelHint: {
    fontSize: 12, color: SSColors.fgPlaceholder,
    marginTop: SSSpacing.s1,
  },
  labelError: {
    fontSize: 12, color: SSColors.errorFg,
    marginTop: SSSpacing.s1,
  },

  // ── Badges ────────────────────────────────────────────────
  badgeBase: {
    flexDirection:    'row',
    alignItems:       'center',
    gap:              4,
    paddingVertical:  2,
    paddingHorizontal:SSSpacing.s2,
    borderRadius:     SSRadius.full,
    alignSelf:        'flex-start',
  },
  badgeBrand:   { backgroundColor: SSColors.brandSubtle },
  badgeSuccess: { backgroundColor: SSColors.successBg },
  badgeWarning: { backgroundColor: SSColors.warningBg },
  badgeDanger:  { backgroundColor: SSColors.errorBg },
  badgeNeutral: { backgroundColor: SSColors.bgHover },

  badgeTextBrand:   { fontSize: 11, fontWeight: '700', color: SSColors.ssBlue },
  badgeTextSuccess: { fontSize: 11, fontWeight: '700', color: SSColors.successFg },
  badgeTextWarning: { fontSize: 11, fontWeight: '700', color: SSColors.warningFg },
  badgeTextDanger:  { fontSize: 11, fontWeight: '700', color: SSColors.errorFg },

  // ── Avatars ───────────────────────────────────────────────
  avatarBase: {
    alignItems:      'center',
    justifyContent:  'center',
    backgroundColor: SSColors.brandSubtle,
    borderRadius:    SSRadius.full,
  },
  avatarSm: { width: 28, height: 28 },
  avatarMd: { width: 40, height: 40 },
  avatarLg: { width: 56, height: 56 },

  avatarTextSm: { fontSize: 11, fontWeight: '700', color: SSColors.ssBlue },
  avatarTextMd: { fontSize: 14, fontWeight: '700', color: SSColors.ssBlue },
  avatarTextLg: { fontSize: 18, fontWeight: '700', color: SSColors.ssBlue },

  // ── Alerts ────────────────────────────────────────────────
  alertBase: {
    flexDirection: 'row',
    gap:           SSSpacing.s3,
    padding:       SSSpacing.s4,
    borderRadius:  SSRadius.md,
    borderLeftWidth: 4,
  },
  alertInfo:    { backgroundColor: SSColors.infoBg,    borderLeftColor: SSColors.azure },
  alertSuccess: { backgroundColor: SSColors.successBg, borderLeftColor: SSColors.successFg },
  alertWarning: { backgroundColor: SSColors.warningBg, borderLeftColor: SSColors.warningFg },
  alertDanger:  { backgroundColor: SSColors.errorBg,   borderLeftColor: SSColors.errorFg },
  alertText:    { fontSize: 14, lineHeight: 22, color: SSColors.fgPrimary, flex: 1 },

  // ── Divider ───────────────────────────────────────────────
  divider: {
    height:          1,
    backgroundColor: SSColors.stroke1,
    marginVertical:  SSSpacing.s6,
  },

  // ── Progress ──────────────────────────────────────────────
  progressTrack: {
    height:          6,
    backgroundColor: SSColors.bgSubtle,
    borderRadius:    SSRadius.full,
    overflow:        'hidden',
  },
  progressBar: {
    height:          '100%' as any,
    borderRadius:    SSRadius.full,
    backgroundColor: SSColors.ssBlue,
  },

  // ── Screen / Layout ───────────────────────────────────────
  screenContainer: {
    flex:            1,
    backgroundColor: SSColors.bgCanvas,
  },
  contentPadding: {
    paddingHorizontal: SSSpacing.s4,
    paddingTop:        SSSpacing.s4,
  },
});

// ─────────────────────────────────────────────────────────────
// ICON USAGE REFERENCE
// ─────────────────────────────────────────────────────────────
//
// Install:
//   npx expo install @fluentui/react-native-icons react-native-svg
//
// Import (tree-shake — only import icons you use):
//   import { Home24Regular, Home24Filled } from '@fluentui/react-native-icons';
//
// Usage:
//   <Home24Regular width={SSIcon.lg} height={SSIcon.lg} color={SSColors.ssBlue} />
//   <Home24Filled  width={SSIcon.lg} height={SSIcon.lg} color={SSColors.ssBlue} />
//
// Rule:  Regular = default / inactive state
//        Filled  = active  / selected  state
//
// Web ↔ Expo naming parity:
//   Iconify web:         fluent:home-24-regular
//   Expo import name:    Home24Regular
//   Same icon, different syntax — one vocabulary in Figma, web, and mobile.
//
