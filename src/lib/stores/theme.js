import { writable, get } from 'svelte/store';

export const theme = writable('light');

/**
 * Initialize theme from localStorage or system preference.
 * Safe for SSR and client execution.
 */
export function initTheme() {
  if (typeof window === 'undefined') return;

  const saved = localStorage.getItem('ss-theme') || localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = saved === 'dark' || (!saved && prefersDark) ? 'dark' : 'light';

  applyTheme(activeTheme);
}

/**
 * Apply theme to DOM and save to localStorage
 * @param {'light'|'dark'} mode
 */
export function applyTheme(mode) {
  if (typeof window === 'undefined') return;

  const isDark = mode === 'dark';
  theme.set(mode);

  try {
    localStorage.setItem('ss-theme', mode);
    localStorage.setItem('theme', mode);
  } catch (e) {
    // ignore in private browsing or constrained envs
  }

  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark-mode');
    document.body.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark-mode');
    document.body.removeAttribute('data-theme');
    document.body.classList.remove('dark-mode');
  }

  // Sync meta theme-color tag
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', isDark ? '#021440' : '#022057');
  }
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme() {
  const current = get(theme);
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

