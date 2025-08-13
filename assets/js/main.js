/**
 * SS Brand Assets - Main JavaScript
 * Handles interactive features including color copying, theme toggling, and navigation
 */

// ============================================================================
// Configuration & Constants
// ============================================================================

const CONFIG = {
    ANIMATION_DURATION: 200,
    FEEDBACK_DURATION: 2000,
    THEME_STORAGE_KEY: 'theme',
    LOGO_PATHS: {
        LIGHT: 'core-assets/icons/ss_icon_light.png',
        DARK: 'core-assets/icons/ss_icon_dark.png'
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

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================================================
// Clipboard Management
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
        if (this.logo) {
            this.logo.src = isDark ? CONFIG.LOGO_PATHS.DARK : CONFIG.LOGO_PATHS.LIGHT;
            this.logo.alt = `SS Health Logo (${theme} mode)`;
        }
        
        // Update meta theme color
        if (this.metaThemeColor) {
            this.metaThemeColor.setAttribute('content', 
                isDark ? CONFIG.THEME_COLORS.DARK : CONFIG.THEME_COLORS.LIGHT
            );
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
                if (href.startsWith('#')) {
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
            logoImg.alt = `SS Health Logo on ${color} background`;
        }
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
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            // Observe cards and sections
            document.querySelectorAll('.color-card, .font-card, section').forEach(el => {
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

            // Initialize all managers
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.colorSystem = new ColorSystem();
            this.performanceEnhancer = new PerformanceEnhancer();

            // Setup global error handling
            this.setupGlobalErrorHandling();

            ErrorHandler.log('SS Brand Assets application initialized successfully');
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
// Application Startup
// ============================================================================

// Initialize application when DOM is ready
const app = new SSBrandApp();
app.init().catch(error => {
    ErrorHandler.handleError(error, 'Application startup');
});