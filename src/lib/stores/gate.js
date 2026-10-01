import { writable } from 'svelte/store';

const STORAGE_KEY = 'ss_gate_unlocked';
const EXPIRY_DAYS = 30;
const EXPIRY_MS = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

/**
 * Check if the gate is currently unlocked and session is still valid (within 30 days)
 * @returns {boolean}
 */
export function checkGateStatus() {
  if (typeof window === 'undefined') {
    // In SSR / prerender mode, return true so static crawlers can build pages
    return true;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const data = JSON.parse(raw);
    if (!data || !data.timestamp || !data.verified) return false;

    const now = Date.now();
    if (now - data.timestamp > EXPIRY_MS) {
      // Session has expired
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = `${STORAGE_KEY}=; Max-Age=0; path=/;`;
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

// Initial evaluation (instant in browser, permissive in SSR)
const initialUnlocked = typeof window !== 'undefined' ? checkGateStatus() : false;

export const gateState = writable({
  isUnlocked: initialUnlocked,
  isReady: typeof window !== 'undefined'
});

/**
 * Initialize gate check from localStorage / cookie on mount.
 */
export function initGate() {
  if (typeof window === 'undefined') return;

  const valid = checkGateStatus();
  gateState.set({
    isUnlocked: valid,
    isReady: true
  });
}

/**
 * Unlock the gate and persist for 30 days.
 */
export function unlockGate() {
  if (typeof window === 'undefined') return;

  const payload = {
    verified: true,
    timestamp: Date.now(),
    expiresInDays: EXPIRY_DAYS
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    const maxAge = EXPIRY_DAYS * 24 * 60 * 60;
    document.cookie = `${STORAGE_KEY}=verified; max-age=${maxAge}; path=/; SameSite=Lax`;
  } catch (e) {
    console.warn('[Gatekeeper] Failed to save session:', e);
  }

  gateState.set({
    isUnlocked: true,
    isReady: true
  });
}

/**
 * Relock the site and remove session credentials.
 */
export function relockGate() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${STORAGE_KEY}=; Max-Age=0; path=/;`;
  } catch (e) {
    // Ignore in constrained environments
  }

  gateState.set({
    isUnlocked: false,
    isReady: true
  });
}
