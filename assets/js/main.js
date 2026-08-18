/**
 * SS Brand Assets - Main JavaScript
 * Handles interactive features including color copying, theme toggling, and navigation
 */

// ============================================================================
// Configuration & Constants
// ============================================================================

var CONFIG = {
    ANIMATION_DURATION: 200,
    FEEDBACK_DURATION: 2000,
    THEME_STORAGE_KEY: 'theme',
    LOGO_PATHS: {
        LIGHT: 'public/brand/logos/ss-logomark-light.svg',
        DARK: 'public/brand/logos/ss-logomark-dark.svg'
    },
    FULL_LOGO_PATHS: {
        LIGHT: 'public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg',
        DARK: 'public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg'
    },
    THEME_COLORS: {
        LIGHT: '#043388',
        DARK: '#021A40'
    }
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// ============================================================================
// LogoSelector — Logo Variant Selection Utility
// ============================================================================
//
// Two rules govern which full-wordmark logo to use:
//
//  Rule 1 · Theme Mode
//  ─────────────────────────────────────────────────────────────
//  | Theme  | Logo                                |
//  |--------|-------------------------------------|
//  | light  | logo_suamisihat_primary_light.svg   |
//  | dark   | logo_suamisihat_primary_dark.svg    |
//
//  Rule 2 · Background Brightness (for static / non-themed surfaces)
//  ─────────────────────────────────────────────────────────────
//  | Background                  | Logo                                |
//  |-----------------------------|-------------------------------------|
//  | Light / bright  (L >= 50%)  | logo_suamisihat_primary_light.svg   |
//  | Dark  / dim     (L  < 50%)  | logo_suamisihat_primary_dark.svg    |
//
// Usage:
//   LogoSelector.forTheme('dark')          → path string (Rule 1)
//   LogoSelector.forBackground('#043388')  → path string (Rule 2)
//   LogoSelector.apply(prefix)             → updates all .footer-logo on page
// ============================================================================

var LogoSelector = (function () {
    'use strict';

    var PATHS = {
        FULL_LIGHT: '00_logo_suamisihat/logo_suamisihat_primary_light.svg',
        FULL_DARK:  '00_logo_suamisihat/logo_suamisihat_primary_dark.svg',
        MARK_LIGHT: 'ss-logomark-light.svg',
        MARK_DARK:  'ss-logomark-dark.svg'
    };

    /**
     * Convert a hex colour string to its HSL Lightness value (0–100).
     * Accepts 3- or 6-digit hex, with or without leading '#'.
     * Returns null when the input cannot be parsed.
     *
     * @param {string} hex  e.g. '#043388' or '043388' or '#036'
     * @returns {number|null}  HSL Lightness 0–100, or null on parse failure
     */
    function hexToLightness(hex) {
        if (!hex || typeof hex !== 'string') return null;
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(function (c) { return c + c; }).join('');
        }
        if (hex.length !== 6) return null;

        var r = parseInt(hex.slice(0, 2), 16) / 255;
        var g = parseInt(hex.slice(2, 4), 16) / 255;
        var b = parseInt(hex.slice(4, 6), 16) / 255;

        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var l = (max + min) / 2; // 0–1

        return Math.round(l * 100); // 0–100
    }

    /**
     * Convert a CSS rgb() / rgba() string to HSL Lightness (0–100).
     * Handles both "rgb(r, g, b)" and "rgba(r, g, b, a)" formats.
     * Returns null on parse failure.
     *
     * @param {string} rgb  e.g. 'rgb(4, 51, 136)'
     * @returns {number|null}
     */
    function rgbToLightness(rgb) {
        if (!rgb || typeof rgb !== 'string') return null;
        var m = rgb.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
        if (!m) return null;
        var r = parseInt(m[1], 10) / 255;
        var g = parseInt(m[2], 10) / 255;
        var b = parseInt(m[3], 10) / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        return Math.round(((max + min) / 2) * 100);
    }

    /**
     * Walk up the DOM from el until we find an ancestor that has a non-transparent
     * background-color, then return its computed value. Falls back to '#000' (dark).
     *
     * @param {Element} el
     * @returns {string}  rgb(...) string or '#000'
     */
    function resolveBackground(el) {
        var node = el;
        while (node && node !== document.body) {
            var bg = window.getComputedStyle(node).backgroundColor;
            // transparent / rgba(0,0,0,0) means no colour set on this element
            if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
                return bg;
            }
            node = node.parentElement;
        }
        // Fall back to body background
        return window.getComputedStyle(document.body).backgroundColor || '#000';
    }

    /**
     * Resolve the correct path prefix based on current page depth.
     * Can be overridden by passing an explicit prefix.
     *
     * @returns {string}
     */
    function autoPrefix() {
        var href = window.location.href.toLowerCase();
        if (href.includes('/products/') || href.includes('\\products\\')) {
            return '../../public/brand/logos/';
        }
        if (href.includes('/pages/') || href.includes('\\pages\\')) {
            return '../public/brand/logos/';
        }
        return 'public/brand/logos/';
    }

    return {

        /**
         * Rule 1 — Return the full-wordmark logo path for a given theme mode.
         *
         * @param {'light'|'dark'} theme
         * @param {string} [prefix]  optional path prefix (auto-detected when omitted)
         * @returns {string}  resolved logo src path
         */
        forTheme: function (theme, prefix) {
            var base = prefix !== undefined ? prefix : autoPrefix();
            return base + (theme === 'dark' ? PATHS.FULL_DARK : PATHS.FULL_LIGHT);
        },

        /**
         * Rule 2 — Return the full-wordmark logo path for a given background colour.
         * A background with HSL Lightness < 50 is considered dark → use _dark.svg.
         *
         * @param {string} hexColour  e.g. '#043388'
         * @param {string} [prefix]   optional path prefix (auto-detected when omitted)
         * @returns {string}  resolved logo src path
         */
        forBackground: function (hexColour, prefix) {
            var base = prefix !== undefined ? prefix : autoPrefix();
            if (hexColour && typeof hexColour === 'string') {
                var normalized = hexColour.trim().toLowerCase();
                // Explicit brand rule: Prussian, SS Blue, Azure, Malibu, and Black pair with primary dark logo
                if (['#022057', '#043388', '#21a1f7', '#6dc6ec', '#000000', '#000'].indexOf(normalized) !== -1) {
                    return base + PATHS.FULL_DARK;
                }
            }
            var l = hexToLightness(hexColour);
            if (l === null) {
                console.warn('[LogoSelector] Could not parse colour: ' + hexColour + '. Falling back to dark variant.');
                return base + PATHS.FULL_DARK;
            }
            // Dark background (L < 50) → white wordmark (_dark)
            // Light background (L ≥ 50) → navy wordmark (_light)
            return base + (l < 50 ? PATHS.FULL_DARK : PATHS.FULL_LIGHT);
        },

        /**
         * Apply dark wordmark logo to all footers
         * @param {string} [theme]
         * @param {string} [prefix]
         */
        applyToFooter: function (theme, prefix) {
            var self = this;
            var base = prefix !== undefined ? prefix : autoPrefix();

            document.querySelectorAll('.footer-logo, .f-footer-logo, footer img[src*="logo_suamisihat"]').forEach(function (img) {
                // SuamiSihat brand rule: Footers always render on dark Prussian Blue background
                // and must strictly display the dark/white wordmark variant
                img.src = base + PATHS.FULL_DARK + '?v=10';
                img.alt = 'SuamiSihat™ logo';
            });
        },

        /**
         * Convenience: return only the logomark (S-icon) path.
         * Rule mirrors background-brightness but for the icon-only variant.
         *
         * @param {'light'|'dark'} theme
         * @param {string} [prefix]
         * @returns {string}
         */
        markForTheme: function (theme, prefix) {
            var base = prefix !== undefined ? prefix : autoPrefix();
            return base + (theme === 'dark' ? PATHS.MARK_DARK : PATHS.MARK_LIGHT);
        }
    };
}());


// ============================================================================

/**
 * Copy text to clipboard with fallback support
 * @param {string} text - Text to copy
 * @param {Element} element - Element to animate
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text, element) {
    try {
        // Modern clipboard API
        await navigator.clipboard.writeText(text);
        showFeedback(`Copied: ${text}`);
        animateClick(element);
        return true;
    } catch (err) {
        console.warn('Modern clipboard API failed, trying fallback:', err);
        
        try {
            // Fallback method for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                showFeedback(`Copied: ${text} (legacy method)`);
                animateClick(element);
                return true;
            } else {
                throw new Error('execCommand copy failed');
            }
        } catch (fallbackErr) {
            console.error('Fallback clipboard method failed:', fallbackErr);
            showFeedback('Failed to copy color', true);
            return false;
        }
    }
}

// ============================================================================
// User Feedback System
// ============================================================================

/**
 * Show feedback message to user
 * @param {string} message - Message to display
 * @param {boolean} isAlert - Whether to use alert instead of toast
 */
function showFeedback(message, isAlert = false) {
    if (isAlert) {
        alert(message);
        return;
    }

    // Remove existing feedback
    const existingFeedback = document.querySelector('.copy-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Create new feedback element
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = message;
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(feedback);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, CONFIG.FEEDBACK_DURATION);
}

/**
 * Animate element click effect
 * @param {Element} element - Element to animate
 */
function animateClick(element) {
    if (!element) return;
    
    element.style.transform = 'scale(0.95)';
    element.style.transition = `transform ${CONFIG.ANIMATION_DURATION}ms ease`;
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.transition = '';
    }, CONFIG.ANIMATION_DURATION);
}

// ============================================================================
// Theme Management
// ============================================================================

/**
 * Theme management class
 */
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.logo = document.querySelector('.logo');
        this.footerLogos = document.querySelectorAll('.footer-logo, .f-footer-logo');
        this.metaThemeColor = document.querySelector('meta[name="theme-color"]');
        this.currentTheme = this.getInitialTheme();
        
        this.init();
    }

    /**
     * Get initial theme from storage or system preference
     * @returns {string} Theme name
     */
    getInitialTheme() {
        const savedTheme = localStorage.getItem(CONFIG.THEME_STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (prefersDark ? 'dark' : 'light');
    }

    /**
     * Initialize theme manager
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
        this.setupSystemThemeListener();
    }

    /**
     * Apply theme to document
     * @param {string} theme - Theme to apply
     */
    applyTheme(theme) {
        const isDark = theme === 'dark';
        
        // Toggle body class
        document.body.classList.toggle('dark-mode', isDark);
        
        // Update logo
        const isSubpage = window.location.href.toLowerCase().includes('/pages/') || 
                          window.location.href.toLowerCase().includes('\\pages\\');
        const isProductPage = window.location.href.toLowerCase().includes('/products/') ||
                              window.location.href.toLowerCase().includes('\\products\\');
        const prefix = isProductPage ? '../../' : (isSubpage ? '../' : '');

        // Update navbar logo (icon/logomark) — Rule 1: theme mode
        if (this.logo) {
            this.logo.src = LogoSelector.markForTheme(theme);
            this.logo.alt = `SuamiSihat™ Logo (${theme} mode)`;
        }

        // Update footer logos (full wordmark) — Rule 1: theme mode via LogoSelector
        LogoSelector.applyToFooter(theme);

        // BRAND-STATIC-01: Auto-invert sub-brand logos on theme change
        this.applyToSubBrandLogos(isDark);

        
        // Update meta theme color
        if (this.metaThemeColor) {
            this.metaThemeColor.setAttribute('content', 
                isDark ? CONFIG.THEME_COLORS.DARK : CONFIG.THEME_COLORS.LIGHT
            );
        }

        // Update theme toggle button accessibility and icon
        if (this.themeToggle) {
            this.themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            this.themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            
            // Support both Iconify (<iconify-icon>) and Font Awesome (<i>) toggle icons
            const iconifyIcon = this.themeToggle.querySelector('iconify-icon');
            const faIcon = this.themeToggle.querySelector('i');
            if (iconifyIcon) {
                iconifyIcon.setAttribute('icon', isDark
                    ? 'fluent:weather-sunny-24-regular'
                    : 'fluent:weather-moon-24-regular');
            } else if (faIcon) {
                faIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        }
        
        // Save to storage
        localStorage.setItem(CONFIG.THEME_STORAGE_KEY, theme);
        this.currentTheme = theme;
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    /**
     * Listen for system theme changes
     */
    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem(CONFIG.THEME_STORAGE_KEY)) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
            }
        });
    }

    /**
     * BRAND-STATIC-01 — Auto-invert sub-brand logos on dark/light mode change.
     * Reads data-dark-src / data-light-src from each .sub-brand-bg-toggle button
     * and updates the corresponding logo image in its target area.
     *
     * @param {boolean} isDark - true when switching to dark mode
     */
    applyToSubBrandLogos(isDark) {
        document.querySelectorAll('.sub-brand-bg-toggle').forEach(btn => {
            const targetId = btn.dataset.target;
            if (!targetId) return;
            const area = document.getElementById(targetId);
            if (!area) return;
            const img = area.querySelector('img');
            if (!img) return;

            const src = isDark ? btn.dataset.darkSrc : btn.dataset.lightSrc;
            if (src) {
                img.src = src;
                // Sync the dark-bg class so manual toggle stays consistent
                if (isDark) {
                    area.classList.add('dark-bg');
                } else {
                    area.classList.remove('dark-bg');
                }
            }
        });
    }
}

// ============================================================================
// Navigation Management
// ============================================================================

/**
 * Navigation management class
 */
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbarCollapse = document.getElementById('navbarNav');
        this.navbarToggler = document.querySelector('.navbar-toggler');
        
        this.init();
    }

    /**
     * Initialize navigation
     */
    init() {
        this.bindEvents();
        this.setupSmoothScrolling();
        this.setupScrollSpy();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.handleNavClick());
        });
    }

    /**
     * Handle navigation link clicks
     */
    handleNavClick() {
        // Only collapse if navbar is visible (mobile view)
        if (this.navbarToggler && 
            window.getComputedStyle(this.navbarToggler).display !== 'none') {
            this.collapseNavbar();
        }
    }

    /**
     * Collapse navbar
     */
    collapseNavbar() {
        if (this.navbarCollapse && typeof bootstrap !== 'undefined') {
            new bootstrap.Collapse(this.navbarCollapse, { toggle: false }).hide();
        }
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * Setup scroll spy and navbar shrinking effect
     */
    setupScrollSpy() {
        const navbar = document.getElementById('mainNavbar');
        const sections = document.querySelectorAll('section[id]');
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.onScrollSpy(navbar, sections);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Perform scroll spy checks on animation frame
     */
    onScrollSpy(navbar, sections) {
        if (!navbar) return;
        // Navbar shrink effect
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Scroll spy for active links
        let current = '';
        const scrollPos = window.scrollY || document.documentElement.scrollTop;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPos >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ============================================================================
// Color System Management
// ============================================================================

/**
 * Color system management class
 */
class ColorSystem {
    constructor() {
        this.colorCards = document.querySelectorAll('.color-card');
        this.colorStrips = document.querySelectorAll('.color-strip');
        this.logoButtons = document.querySelectorAll('.color-list button');
        
        this.init();
    }

    /**
     * Initialize color system
     */
    init() {
        this.bindColorCards();
        this.bindColorStrips();
        this.bindLogoButtons();
    }

    /**
     * Bind color card events
     */
    bindColorCards() {
        this.colorCards.forEach(card => {
            card.addEventListener('click', () => {
                const hex = card.getAttribute('data-hex');
                if (hex) {
                    copyToClipboard(hex, card);
                }
            });
        });
    }

    /**
     * Bind color strip events
     */
    bindColorStrips() {
        this.colorStrips.forEach(strip => {
            // Remove any existing onclick attributes
            strip.removeAttribute('onclick');
            
            strip.addEventListener('click', () => {
                const hexMatch = strip.textContent.match(/HEX: (#[0-9A-F]{6})/i);
                if (hexMatch) {
                    copyToClipboard(hexMatch[1], strip);
                }
            });
        });
    }

    /**
     * Bind logo selection button events
     */
    bindLogoButtons() {
        this.logoButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                const imgSrc = btn.dataset.img;
                
                if (color && imgSrc) {
                    this.updateLogoDisplay(color, imgSrc);
                }
            });
        });
    }

    /**
     * Update logo display with new background and image
     * @param {string} color - Background color
     * @param {string} imgSrc - Image source
     */
    updateLogoDisplay(color, imgSrc) {
        const logoDisplay = document.getElementById('logoDisplay');
        const logoImg = document.getElementById('logoImg');
        
        if (logoDisplay) {
            logoDisplay.style.backgroundColor = color;
        }
        
        if (logoImg) {
            logoImg.src = imgSrc;
            logoImg.alt = `SuamiSihat™ Logo on ${color} background`;
        }
    }
}

// ============================================================================
// Sub-brand System Management
// ============================================================================

/**
 * Sub-brand system management class
 */
class SubBrandSystem {
    constructor() {
        this.bgTogglers = document.querySelectorAll('.sub-brand-bg-toggle');
        this.init();
    }

    init() {
        this.bindBgTogglers();
    }

    bindBgTogglers() {
        this.bgTogglers.forEach(toggler => {
            toggler.addEventListener('click', () => {
                const card = toggler.closest('.sub-brand-card');
                if (!card) return;

                const display = card.querySelector('.sub-brand-logo-display');
                const img = card.querySelector('.sub-brand-logo-img');
                if (!display || !img) return;

                const isLightBg = display.classList.contains('light-bg');

                if (isLightBg) {
                    // Switch to dark background (Prussian Blue)
                    display.classList.remove('light-bg');
                    display.style.backgroundColor = '#022057';
                    
                    // Swap to dark version logo (which is white)
                    if (img.src.includes('_light.svg')) {
                        img.src = img.src.replace('_light.svg', '_dark.svg');
                    }
                } else {
                    // Switch to light background
                    display.classList.add('light-bg');
                    display.style.backgroundColor = '#f8f9fa';
                    
                    // Swap to light version logo (which is dark text)
                    if (img.src.includes('_dark.svg')) {
                        img.src = img.src.replace('_dark.svg', '_light.svg');
                    }
                }
                
                animateClick(toggler);
            });
        });
    }
}

// ============================================================================
// Logomark Toggle System
// ============================================================================

/**
 * Handles the interactive toggle card for light/dark logomarks
 */
class LogomarkToggleSystem {
    constructor() {
        this.toggleCard = document.getElementById('logomarkToggleCard');
        this.init();
    }

    init() {
        if (!this.toggleCard) return;
        this.bindEvents();
    }

    bindEvents() {
        this.toggleCard.addEventListener('click', () => {
            const toggleBg = document.getElementById('logomarkToggleBg');
            const pillLight = document.getElementById('pillLight');
            const pillDark = document.getElementById('pillDark');
            const img = document.getElementById('logomarkImg');
            const title = document.getElementById('logomarkTitle');
            
            if (!toggleBg || !img) return;
            
            const isLightBg = toggleBg.classList.contains('bg-light');
            
            if (isLightBg) {
                // Switch to dark mode
                toggleBg.classList.remove('bg-light');
                toggleBg.classList.add('bg-dark');
                title.classList.add('text-white');
                pillLight.classList.add('opacity-50');
                pillDark.classList.remove('opacity-50');
                
                if (img.src.includes('-light.svg')) {
                    img.src = img.src.replace('-light.svg', '-dark.svg');
                }
            } else {
                // Switch to light mode
                toggleBg.classList.remove('bg-dark');
                toggleBg.classList.add('bg-light');
                title.classList.remove('text-white');
                pillLight.classList.remove('opacity-50');
                pillDark.classList.add('opacity-50');
                
                if (img.src.includes('-dark.svg')) {
                    img.src = img.src.replace('-dark.svg', '-light.svg');
                }
            }
            
            animateClick(this.toggleCard);
        });
        
        // Keyboard support
        this.toggleCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleCard.click();
            }
        });
    }
}

// ============================================================================
// Scroll To Top System
// ============================================================================

/**
 * Scroll to top management class
 */
class ScrollToTopSystem {
    constructor() {
        this.btn = document.getElementById('scrollToTopBtn');
        this.init();
    }

    init() {
        if (!this.btn) return;
        this.bindEvents();
    }

    bindEvents() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        this.btn.classList.add('show');
                    } else {
                        this.btn.classList.remove('show');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        this.btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Remove focus from button after click
            this.btn.blur();
        });
    }
}

// ============================================================================
// Performance & Accessibility Enhancements
// ============================================================================

/**
 * Performance and accessibility enhancements
 */
class PerformanceEnhancer {
    constructor() {
        this.init();
    }

    /**
     * Initialize performance enhancements
     */
    init() {
        this.setupIntersectionObserver();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
    }

    /**
     * Setup intersection observer for lazy loading
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add stagger delay based on DOM order if it's part of a group
                        const parent = entry.target.parentElement;
                        if (parent) {
                            const siblings = Array.from(parent.children).filter(el => 
                                el.classList.contains('color-card') || 
                                el.classList.contains('logo-card') || 
                                el.classList.contains('sub-brand-card')
                            );
                            const index = siblings.indexOf(entry.target);
                            if (index > 0) {
                                entry.target.style.transitionDelay = `${index * 100}ms`;
                            }
                        }
                        
                        // Small timeout to ensure transition delay applies before adding class
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, 10);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            // Observe cards and sections
            document.querySelectorAll('.color-card, .font-card, .logo-card, .sub-brand-card').forEach(el => {
                observer.observe(el);
            });
        }
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        // Add keyboard support for interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                if (target.classList.contains('color-card') || 
                    target.classList.contains('color-strip')) {
                    e.preventDefault();
                    target.click();
                }
            }
        });
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Ensure focus indicators are visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// ============================================================================
// SuamiSihat™ Dynamic Hero Wave & Particle Engine
// ============================================================================

class SuamiSihatHeroWave {
    constructor() {
        this.canvas = document.getElementById('heroWaveCanvas') || document.querySelector('.hero-wave-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.container = this.canvas.parentElement;
        this.width = 0;
        this.height = 0;
        this.mouseX = -1000;
        this.mouseY = -1000;
        this.targetMouseX = -1000;
        this.targetMouseY = -1000;
        this.stars = [];
        this.floatingLogos = [];
        this.time = 0;

        // Preload SuamiSihat™ SS Icon Mark SVG with correct relative path
        const isSubDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/products/');
        const prefix = isSubDir ? (window.location.pathname.includes('/products/') && window.location.pathname.split('/').length > 4 ? '../../' : '../') : '';

        this.logoImg = new Image();
        this.logoImg.src = prefix + 'public/brand/logos/ss-logomark-light.svg';
        this.logoImgLoaded = false;
        this.logoImg.onload = () => { this.logoImgLoaded = true; };
        
        this.init();
    }

    init() {
        this.resize();
        this.createElements();
        this.bindEvents();
        this.animate();
    }

    resize() {
        if (!this.container || !this.canvas) return;
        const dpr = window.devicePixelRatio || 1;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = Math.floor(this.width * dpr);
        this.canvas.height = Math.floor(this.height * dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    createElements() {
        // 1. Scattered Small Men/Mars Symbols (Star field)
        this.stars = [];
        const starCount = Math.min(65, Math.floor((this.width * this.height) / 11000));
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                baseY: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 8 + 6,
                baseOpacity: Math.random() * 0.25 + 0.1,
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.01,
                isFragment: i % 3 === 0
            });
        }

        // 2. Floating SuamiSihat™ SS Logomarks
        this.floatingLogos = [];
        const logoCount = 5;
        for (let i = 0; i < logoCount; i++) {
            this.floatingLogos.push({
                x: (this.width / (logoCount + 1)) * (i + 1) + (Math.random() - 0.5) * 120,
                y: this.height * 0.55 + (Math.random() - 0.5) * 150,
                baseY: this.height * 0.55 + (Math.random() - 0.5) * 150,
                vx: (Math.random() - 0.5) * 0.25,
                size: Math.random() * 16 + 28,
                opacity: Math.random() * 0.25 + 0.15,
                floatSpeed: Math.random() * 0.002 + 0.001,
                floatAmp: Math.random() * 20 + 15,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize(), { passive: true });
        
        if (this.container) {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.targetMouseX = e.clientX - rect.left;
                this.targetMouseY = e.clientY - rect.top;
            }, { passive: true });

            this.container.addEventListener('mouseleave', () => {
                this.targetMouseX = -1000;
                this.targetMouseY = -1000;
            }, { passive: true });
        }
    }

    animate() {
        if (!this.canvas || !this.ctx) return;
        this.time += 0.02;
        
        // Smooth mouse dampening
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;

        this.ctx.clearRect(0, 0, this.width, this.height);

        const isDark = document.body.classList.contains('dark-mode');

        // 1. Draw Flowing Particle Wave Stream (Waving Stream directly behind text)
        // this.drawParticleWaveStream(isDark);

        // 2. Draw Scattered Men/Mars Star Symbols
        this.drawMenStars(isDark);

        // 3. Draw Floating SuamiSihat™ SS Logomarks
        this.drawFloatingLogos(isDark);

        requestAnimationFrame(() => this.animate());
    }

    drawParticleWaveStream(isDark) {
        const streamColor = isDark ? 'rgba(33, 161, 247, ' : 'rgba(109, 198, 236, ';
        const lineCount = 3;
        
        // Dynamically locate vertical center of the hero headline text
        let titleCenterY = this.height * 0.70;
        const heroTitle = document.querySelector('.f-hero-title');
        if (heroTitle && this.container) {
            const containerRect = this.container.getBoundingClientRect();
            const titleRect = heroTitle.getBoundingClientRect();
            if (containerRect.height > 0) {
                titleCenterY = (titleRect.top - containerRect.top) + (titleRect.height * 0.5);
            }
        }
        
        for (let l = 0; l < lineCount; l++) {
            this.ctx.beginPath();
            // Wave streams directly centered behind the hero title
            const yCenter = titleCenterY + (l - 1) * 28;
            const freq = 0.0035 + l * 0.0015;
            const amp = 35 + l * 12;
            const speed = this.time * (0.6 + l * 0.2);

            for (let x = 0; x <= this.width; x += 15) {
                // Interactive mouse disturbance
                const dx = x - this.mouseX;
                const dy = yCenter - this.mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const mouseForce = dist < 180 ? Math.sin((180 - dist) / 180 * Math.PI) * 25 : 0;

                const y = yCenter + Math.sin(x * freq + speed) * amp + Math.cos(x * 0.008 - speed * 0.5) * (amp * 0.5) + mouseForce;

                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }

                // Draw glowing node dots along wave line
                if (x % 45 === 0) {
                    this.ctx.save();
                    this.ctx.fillStyle = isDark ? '#6DC6EC' : '#ffffff';
                    this.ctx.globalAlpha = 0.35 + Math.sin(x + this.time * 3) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                }
            }

            this.ctx.strokeStyle = `${streamColor}${0.22 - l * 0.05})`;
            this.ctx.lineWidth = 1.8 - l * 0.4;
            this.ctx.stroke();
        }
    }

    drawMenStars(isDark) {
        const starColor = isDark ? '#21A1F7' : '#ffffff';

        this.stars.forEach(s => {
            // Drift position
            s.x += s.vx;
            s.y += s.vy;
            if (s.x < -20) s.x = this.width + 20;
            if (s.x > this.width + 20) s.x = -20;
            if (s.y < -20) s.y = this.height + 20;
            if (s.y > this.height + 20) s.y = -20;

            s.rotation += s.rotSpeed;

            // Twinkle effect
            const opacity = Math.max(0.05, s.baseOpacity + Math.sin(this.time * s.twinkleSpeed * 50 + s.twinkleOffset) * 0.15);

            // Mouse Repulsion
            const dx = s.x - this.mouseX;
            const dy = s.y - this.mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let pushX = 0, pushY = 0;
            if (dist < 140 && dist > 0) {
                const force = (140 - dist) / 140;
                pushX = (dx / dist) * force * 20;
                pushY = (dy / dist) * force * 20;
            }

            this.ctx.save();
            this.ctx.translate(s.x + pushX, s.y + pushY);
            this.ctx.rotate(s.rotation);
            this.ctx.globalAlpha = opacity;
            this.ctx.strokeStyle = starColor;
            this.ctx.fillStyle = starColor;
            this.ctx.lineWidth = 1.2;

            const sz = s.size;

            if (s.isFragment) {
                // Shattered Mars symbol fragment (Arrow + Arc shard)
                this.ctx.beginPath();
                this.ctx.arc(0, 0, sz * 0.35, 0, Math.PI * 1.3);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(sz * 0.2, -sz * 0.2);
                this.ctx.lineTo(sz * 0.65, -sz * 0.65);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(sz * 0.65, -sz * 0.65);
                this.ctx.lineTo(sz * 0.35, -sz * 0.65);
                this.ctx.lineTo(sz * 0.65, -sz * 0.35);
                this.ctx.closePath();
                this.ctx.fill();
            } else {
                // Classic Men's / Mars symbol ♂ star particle
                this.ctx.beginPath();
                this.ctx.arc(-sz * 0.15, sz * 0.15, sz * 0.35, 0, Math.PI * 2);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(sz * 0.1, -sz * 0.1);
                this.ctx.lineTo(sz * 0.55, -sz * 0.55);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(sz * 0.55, -sz * 0.55);
                this.ctx.lineTo(sz * 0.3, -sz * 0.55);
                this.ctx.lineTo(sz * 0.55, -sz * 0.3);
                this.ctx.closePath();
                this.ctx.fill();
            }

            this.ctx.restore();
        });
    }

    drawFloatingLogos(isDark) {
        let titleCenterY = this.height * 0.70;
        const heroTitle = document.querySelector('.f-hero-title');
        if (heroTitle && this.container) {
            const containerRect = this.container.getBoundingClientRect();
            const titleRect = heroTitle.getBoundingClientRect();
            if (containerRect.height > 0) {
                titleCenterY = (titleRect.top - containerRect.top) + (titleRect.height * 0.5);
            }
        }

        this.floatingLogos.forEach(l => {
            l.x += l.vx;
            if (l.x < -60) l.x = this.width + 60;
            if (l.x > this.width + 60) l.x = -60;

            const floatY = titleCenterY + (l.phase % 1 - 0.5) * 80 + Math.sin(this.time * l.floatSpeed * 50 + l.phase) * l.floatAmp;

            // Mouse Repulsion
            const dx = l.x - this.mouseX;
            const dy = floatY - this.mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let pushX = 0, pushY = 0;
            if (dist < 160 && dist > 0) {
                const force = (160 - dist) / 160;
                pushX = (dx / dist) * force * 25;
                pushY = (dy / dist) * force * 25;
            }

            this.ctx.save();
            this.ctx.translate(l.x + pushX, floatY + pushY);
            this.ctx.globalAlpha = l.opacity;

            if (this.logoImgLoaded && this.logoImg) {
                // Draw actual SuamiSihat™ SS Icon Mark SVG
                const s = l.size * 1.6;
                this.ctx.drawImage(this.logoImg, -s / 2, -s / 2, s, s);
            } else {
                // High-precision vector S-curve fallback
                const color = isDark ? '#6DC6EC' : '#ffffff';
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 2.5;
                this.ctx.beginPath();
                this.ctx.arc(0, -l.size * 0.2, l.size * 0.35, Math.PI * 0.5, Math.PI * 1.8);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.arc(0, l.size * 0.2, l.size * 0.35, Math.PI * 1.5, Math.PI * 0.8, true);
                this.ctx.stroke();
            }

            this.ctx.restore();
        });
    }
}

// ============================================================================
// Error Handling & Logging
// ============================================================================

/**
 * Error handling and logging utility
 */
class ErrorHandler {
    static log(message, level = 'info', error = null) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        
        switch (level) {
            case 'error':
                console.error(logMessage, error);
                break;
            case 'warn':
                console.warn(logMessage, error);
                break;
            case 'info':
            default:
                console.log(logMessage);
                break;
        }
    }

    static handleError(error, context = '') {
        this.log(`Error in ${context}: ${error.message}`, 'error', error);
        
        // Show user-friendly error message
        showFeedback(`An error occurred: ${error.message}`, true);
    }
}

// ============================================================================
// Application Initialization
// ============================================================================

/**
 * Main application class
 */
class SSBrandApp {
    constructor() {
        this.themeManager = null;
        this.navigationManager = null;
        this.colorSystem = null;
        this.performanceEnhancer = null;
        this.heroWave = null;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Enable JavaScript dependent styling (like scroll animations)
            document.body.classList.add('js-ready');

            // Initialize all managers
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.colorSystem = new ColorSystem();
            this.performanceEnhancer = new PerformanceEnhancer();
            this.subBrandSystem = new SubBrandSystem();
            this.logomarkToggleSystem = new LogomarkToggleSystem();
            this.scrollToTopSystem = new ScrollToTopSystem();
            this.heroWave = new SuamiSihatHeroWave();
            this.fluentNavManager = new FluentNavManager();
            initPortalCardRipple();
            initFluentScrollReveal();
            initFluentSidebarToggle();
            LogoSelector.applyToFooter();

            // Setup global error handling
            this.setupGlobalErrorHandling();

            ErrorHandler.log('SuamiSihat™ Design System application initialized successfully');
        } catch (error) {
            ErrorHandler.handleError(error, 'Application initialization');
        }
    }

    /**
     * Setup global error handling
     */
    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            ErrorHandler.handleError(event.error, 'Global error');
        });

        window.addEventListener('unhandledrejection', (event) => {
            ErrorHandler.handleError(event.reason, 'Unhandled promise rejection');
        });
    }
}

// ============================================================================
// Fluent 2 Enhancements — v3.0
// Handles Fluent navbar, acrylic scroll, theme sync across all page types
// ============================================================================

class FluentNavManager {
    constructor() {
        // Fluent navbar (index.html style)
        this.fluentNav = document.getElementById('mainNavbar');
        // Fluent page topbars (signature / tools / onboarding)
        this.pageTopbar = document.querySelector('.page-topbar');
        this.init();
    }

    init() {
        this.bindScroll();
        this.markActiveFNavLink();
    }

    bindScroll() {
        if (!this.fluentNav && !this.pageTopbar) return;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 8;
            if (this.fluentNav)  this.fluentNav.classList.toggle('scrolled', scrolled);
        }, { passive: true });
    }

    markActiveFNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.f-nav-link').forEach(link => {
            const href = link.getAttribute('href') || '';
            const linkFile = href.split('/').pop().split('?')[0];
            if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

class FluentThemeSync {
    /**
     * Extends ThemeManager to sync icon state on ALL theme buttons:
     * #themeToggle, .topbar-theme-btn, .f-theme-btn
     */
    static syncAllButtons(isDark) {
        const allBtns = document.querySelectorAll(
            '#themeToggle, .topbar-theme-btn, .f-theme-btn'
        );
        allBtns.forEach(btn => {
            const iconify = btn.querySelector('iconify-icon');
            const icon = btn.querySelector('i');
            if (iconify) {
                iconify.setAttribute('icon', isDark ? 'fluent:weather-sunny-24-regular' : 'fluent:weather-moon-24-regular');
            } else if (icon) {
                if (icon.classList.contains('fa-circle-half-stroke')) return;
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
            btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }
}

// Monkey-patch ThemeManager.applyTheme to also call FluentThemeSync
const _origApply = ThemeManager.prototype.applyTheme;
ThemeManager.prototype.applyTheme = function(theme) {
    _origApply.call(this, theme);
    FluentThemeSync.syncAllButtons(theme === 'dark');
};

// Portal card subtle ripple on click
function initPortalCardRipple() {
    document.querySelectorAll('.f-portal-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't interfere with normal link navigation
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - 60;
            const y = e.clientY - rect.top - 60;
            const ripple = document.createElement('span');
            ripple.style.cssText = 
                `position:absolute;pointer-events:none;border-radius:50%;` +
                `transform:scale(0);animation:f-ripple .5s linear;` +
                `background:rgba(4,51,136,0.08);` +
                `width:120px;height:120px;` +
                `left:${x}px;top:${y}px;`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 520);
        });
    });
}

// Inject ripple keyframes once
if (!document.getElementById('f-ripple-style')) {
    const s = document.createElement('style');
    s.id = 'f-ripple-style';
    s.textContent = '@keyframes f-ripple{to{transform:scale(4);opacity:0;}}';
    document.head.appendChild(s);
}

// Observe f-animate-up elements for scroll reveal
function initFluentScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.f-animate-up, .f-animate-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

/**
 * Global Sidebar Toggle initialization for Fluent 2 page layouts
 */
function initFluentSidebarToggle() {
    const toggleBtns = document.querySelectorAll('.f-sidebar-toggle, .brand-sidebar-toggle');
    toggleBtns.forEach(toggleBtn => {
        if (toggleBtn.dataset.bound) return;
        toggleBtn.dataset.bound = 'true';

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const layoutWrapper = toggleBtn.closest('.f-page-layout') || document.querySelector('.f-page-layout');
            if (!layoutWrapper) return;

            layoutWrapper.classList.toggle('sidebar-minimized');
            const isMinimized = layoutWrapper.classList.contains('sidebar-minimized');
            toggleBtn.setAttribute('aria-label', isMinimized ? 'Expand sidebar' : 'Minimize sidebar');

            const icon = toggleBtn.querySelector('iconify-icon, i');
            if (icon) {
                if (icon.tagName.toLowerCase() === 'iconify-icon') {
                    icon.setAttribute('icon', isMinimized ? 'fluent:chevron-right-16-regular' : 'fluent:chevron-left-16-regular');
                } else if (icon.classList.contains('fa-chevron-left') || icon.classList.contains('fa-chevron-right')) {
                    icon.classList.toggle('fa-chevron-left', !isMinimized);
                    icon.classList.toggle('fa-chevron-right', isMinimized);
                }
            }
        });
    });
}

// Auto-bind immediately or on DOMContentLoaded
if (typeof document !== 'undefined') {
    if (document.readyState !== 'loading') {
        initFluentSidebarToggle();
        initCleanUrlMasking();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            initFluentSidebarToggle();
            initCleanUrlMasking();
        });
    }
}

/**
 * URL Masking & Clean Path Normalization
 * Automatically normalizes /pages/*.html in browser address bar to clean routes
 */
function initCleanUrlMasking() {
    try {
        if (typeof window === 'undefined' || !window.history || !window.location) return;
        if (!window.location.protocol.startsWith('http')) return; // Avoid local file:// security limits

        const pathname = window.location.pathname;
        // Clean .html extension while preserving directory hierarchy (e.g. /pages/brand-system)
        if (pathname.endsWith('.html')) {
            const cleanPath = pathname.replace(/\.html$/i, '');
            const search = window.location.search || '';
            const hash = window.location.hash || '';
            window.history.replaceState(null, '', cleanPath + search + hash);
        }
    } catch (e) {
        // Silently continue if history API is restricted
    }
}

// ============================================================================
// Application Startup
// ============================================================================

// Initialize application when all classes and managers are defined
const app = new SSBrandApp();
app.init().catch(error => {
    ErrorHandler.handleError(error, 'Application startup');
});

