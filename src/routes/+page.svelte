<script>
  import SSHero from '$lib/components/SSHero.svelte';
  import { theme } from '$lib/stores/theme.js';

  let isDarkMode = $derived($theme === 'dark');
</script>

<svelte:head>
  <title>SuamiSihat™ Design System — Single Source of Truth</title>
</svelte:head>

<!-- ================================================================
     Hero Section — Official ss-hero Component Standard
     ================================================================ -->
<SSHero
  eyebrow="<iconify-icon icon='fluent:gender-male-24-regular' style='font-size: 1.15rem; color: #6DC6EC; vertical-align: middle;' aria-hidden='true'></iconify-icon> <span>SuamiSihat™ Design System &bull; v3.5</span>"
  title="One source. Every standard.<br>Ship with confidence."
  subtitle="The authoritative single source of truth for the SuamiSihat™ brand ecosystem &mdash; unifying design tokens, Fluent 2 components, guidelines, and subsidiary standards."
  minHeight="540px"
>
  <div class="f-hero-ctas">
    <a href="/brand-system/" class="f-btn-hero-primary" id="hero-cta-brand">
      <iconify-icon icon="fluent:color-24-regular" aria-hidden="true"></iconify-icon>
      Explore Brand System
    </a>
    <a href="/components/" class="f-btn-hero-secondary" id="hero-cta-components">
      <iconify-icon icon="fluent:puzzle-piece-24-regular" aria-hidden="true"></iconify-icon>
      UI Components
    </a>
  </div>

  <!-- Glassmorphic Trust Badges -->
  <div class="f-hero-badges">
    <span class="f-hero-badge-item"><iconify-icon icon="fluent:checkmark-circle-24-regular" aria-hidden="true"></iconify-icon> Official Brand Assets</span>
    <span class="f-hero-badge-item"><iconify-icon icon="fluent:layer-24-regular" aria-hidden="true"></iconify-icon> Fluent 2 Tokens</span>
    <span class="f-hero-badge-item"><iconify-icon icon="fluent:accessibility-24-regular" aria-hidden="true"></iconify-icon> WCAG AA Compliant</span>
  </div>
</SSHero>

<!-- ================================================================
     Main Content: Hub Modules
     ================================================================ -->
<main id="main-content">
  <section id="explore" class="f-portal-section" aria-label="Navigate to hub sections">
    <p class="f-section-label">Knowledge Hub</p>
    <h2 class="f-section-title">Every standard. Every asset. One place.</h2>
    <p class="f-section-subtitle">Eliminate inconsistency across every touchpoint. Curated brand tokens, component standards, product documentation, and operational resources.</p>

    <div class="f-portal-grid">

      <!-- 1 · Brand System -->
      <a href="/brand-system/" class="f-portal-card f-card-blue f-animate-up f-delay-1" id="card-brand-system" aria-label="Open Brand System">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:color-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">Brand System</h3>
          <p class="f-portal-card-desc">Interactive design reference &mdash; logo rules, typography scales, full color palettes, and Figma asset exports.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Explore <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge">Core</span>
          </div>
        </div>
      </a>

      <!-- 2 · Brand Guidelines -->
      <a href="/brand-guidelines/" class="f-portal-card f-card-teal f-animate-up f-delay-2" id="card-guidelines" aria-label="View Brand Guidelines">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:book-open-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">Brand Guidelines</h3>
          <p class="f-portal-card-desc">Official guideline booklets &mdash; Interior Design and Logo &amp; Concept, presented as interactive PDFs.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Read <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge">Core</span>
          </div>
        </div>
      </a>

      <!-- 3 · Products -->
      <a href="/products/" class="f-portal-card f-card-warm f-animate-up f-delay-3" id="card-products" aria-label="Browse Product Catalogue">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:cube-multiple-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">Products</h3>
          <p class="f-portal-card-desc">Full product encyclopaedia &mdash; Androlab, MENSS, Mensculine, Rejal and our partner brand network.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Browse <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge f-badge-warning">Products</span>
          </div>
        </div>
      </a>

      <!-- 4 · Documentation -->
      <a href="/doc/?doc=changelog" class="f-portal-card f-card-dark f-animate-up f-delay-4" id="card-docs" aria-label="Read Documentation">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:document-text-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">Documentation</h3>
          <p class="f-portal-card-desc">Changelogs, contribution guides, Vision &amp; Mission &mdash; rendered dynamically from Markdown.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Read Docs <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge">Docs</span>
          </div>
        </div>
      </a>

      <!-- 5 · Mail Signature -->
      <a href="/signature/" class="f-portal-card f-card-blue f-animate-up f-delay-5" id="card-signature" aria-label="Generate your SS Mail Signature">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:mail-template-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">Mail Signature</h3>
          <p class="f-portal-card-desc">Generate and copy your official SuamiSihat™ email signature in seconds &mdash; always on-brand.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Generate <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge f-badge-new">Tool</span>
          </div>
        </div>
      </a>

      <!-- 6 · SS CAM Tools -->
      <a href="/tools/" class="f-portal-card f-card-teal f-animate-up f-delay-6" id="card-tools" aria-label="Download SS CAM and design tools">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:camera-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">SS CAM &amp; Tools</h3>
          <p class="f-portal-card-desc">Download SS CAM and other internal creative utilities. Latest releases from GitHub, curated for staff.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Download <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge f-badge-new">Tool</span>
          </div>
        </div>
      </a>

      <!-- 7 · Onboarding -->
      <a href="/onboarding/" class="f-portal-card f-card-green f-animate-up f-delay-7" id="card-onboarding" aria-label="Staff Onboarding guide">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:rocket-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">Onboarding</h3>
          <p class="f-portal-card-desc">New to SuamiSihat™? Start here. Brand orientation, team structure, tools, and first-week checklist.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Get Started <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge f-badge-new">New</span>
          </div>
        </div>
      </a>

      <!-- 8 · Component Library -->
      <a href="/components/" class="f-portal-card f-card-blue f-animate-up f-delay-8" id="card-components" aria-label="Browse the SuamiSihat™ Component Library">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:puzzle-piece-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">Component Library</h3>
          <p class="f-portal-card-desc">Fluent 2 tokens, UI components, motion, icons &mdash; live showcase with Flutter &amp; web code snippets.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta">Explore <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge f-badge-new">New</span>
          </div>
        </div>
      </a>

      <!-- 9 · SSNAS Dashboard -->
      <a href="https://nas.suamisihat.com.my/" class="f-portal-card f-card-ext f-animate-up f-delay-8" id="card-dashboard" target="_blank" rel="noopener noreferrer" aria-label="Open SSNAS Dashboard in a new tab">
        <div class="f-portal-card-icon"><iconify-icon icon="fluent:gauge-24-regular" aria-hidden="true"></iconify-icon></div>
        <div class="f-portal-card-body">
          <h3 class="f-portal-card-title">SSNAS Dashboard</h3>
          <p class="f-portal-card-desc">Main services launchpad &mdash; quick access to all SuamiSihat™ platforms, internal apps and web services.</p>
          <div class="f-portal-card-footer">
            <span class="f-portal-card-cta f-portal-card-cta-ext">Launch <iconify-icon icon="fluent:open-24-regular" aria-hidden="true"></iconify-icon></span>
            <span class="f-badge">Internal VPN</span>
          </div>
        </div>
      </a>

    </div>
  </section>

  <!-- About This Hub -->
  <section id="about" class="f-portal-section" style="padding-top:0;">
    <hr class="f-divider">
    <p class="f-section-label">Governance</p>
    <h2 class="f-section-title">One Language. One Brand.</h2>
    <p style="font-size:0.95rem;color:var(--color-neutral-fg-2);line-height:1.75;max-width:680px;margin-bottom:var(--f-space-6);">
      The SuamiSihat™ Design System governs the visual and experiential language across every digital and physical touchpoint. 
      Whether you are developing clinical applications, producing brand communications, or engaging healthcare partners &mdash; this is your authoritative reference standard. 
      For design enquiries, contact <a href="mailto:branding@suamisihat.com" style="color:var(--color-brand-primary); font-weight: 500;">branding@suamisihat.com</a>.
    </p>

    <!-- Vision & Mission -->
    <div class="vision-mission-grid">
      <div class="vm-card vision-card">
        <div class="vm-icon" aria-hidden="true"><iconify-icon icon="fluent:eye-24-regular"></iconify-icon></div>
        <h3 class="vm-title">Our Vision</h3>
        <p class="vm-text">To be the most trusted men's health brand in Southeast Asia &mdash; recognised for clinical precision, human-first design, and the courage to redefine what healthcare looks like.</p>
      </div>
      <div class="vm-card mission-card">
        <div class="vm-icon" aria-hidden="true"><iconify-icon icon="fluent:target-arrow-24-regular"></iconify-icon></div>
        <h3 class="vm-title">Our Mission</h3>
        <p class="vm-text">To empower every touchpoint of the SuamiSihat™ ecosystem with a design language that is consistent, accessible, and purposefully built.</p>
      </div>
    </div>
  </section>
</main>

<!-- ================================================================
     Sub-brand Ecosystem Showcase (Animated & Modern)
     ================================================================ -->
<section id="ecosystem" class="f-subbrand" aria-label="SuamiSihat™ Ecosystem Architecture">
  <!-- Ambient animated glow aura -->
  <div class="f-subbrand-ambient" aria-hidden="true"></div>

  <div class="f-subbrand-inner">
    <div class="f-subbrand-header">
      <div class="f-subbrand-badge">
        <iconify-icon icon="fluent:layer-diagonal-24-regular" aria-hidden="true"></iconify-icon>
        Corporate Ecosystem
      </div>
      <h2 class="f-subbrand-title">Subsidiary Brand Network</h2>
      <p class="f-subbrand-subtitle">Each entity in the SuamiSihat™ family operates under a unified governance framework with tailored visual identities.</p>
    </div>

    <div class="f-subbrand-grid">
      <!-- 1 · SSH -->
      <a href="/brand-system/#subbrand" class="f-subbrand-card" aria-label="Explore SS Health guidelines">
        <div class="f-subbrand-card-top">
          <span class="f-subbrand-pill">SSH</span>
          <span class="f-subbrand-status-dot" title="Active Entity"></span>
        </div>
        <div class="f-subbrand-logo-wrap">
          <img src={isDarkMode ? "/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_dark.svg" : "/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_light.svg"}
               alt="SS Health Logo" loading="lazy">
        </div>
        <div class="f-subbrand-card-body">
          <div class="f-subbrand-name">SS Health</div>
          <div class="f-subbrand-desc">Corporate governance, investor relations, and strategic steering.</div>
        </div>
        <div class="f-subbrand-card-footer">
          <span>Guidelines</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
        </div>
      </a>

      <!-- 2 · SSC -->
      <a href="/brand-system/#subbrand" class="f-subbrand-card" aria-label="Explore SS Clinic guidelines">
        <div class="f-subbrand-card-top">
          <span class="f-subbrand-pill">SSC</span>
          <span class="f-subbrand-status-dot" title="Active Entity"></span>
        </div>
        <div class="f-subbrand-logo-wrap">
          <img src={isDarkMode ? "/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_dark.svg" : "/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.svg"}
               alt="SS Clinic Logo" loading="lazy">
        </div>
        <div class="f-subbrand-card-body">
          <div class="f-subbrand-name">SS Clinic</div>
          <div class="f-subbrand-desc">Clinical excellence, physical medical centres, and patient care.</div>
        </div>
        <div class="f-subbrand-card-footer">
          <span>Guidelines</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
        </div>
      </a>

      <!-- 3 · SSW -->
      <a href="/brand-system/#subbrand" class="f-subbrand-card" aria-label="Explore SS Wellness guidelines">
        <div class="f-subbrand-card-top">
          <span class="f-subbrand-pill">SSW</span>
          <span class="f-subbrand-status-dot" title="Active Entity"></span>
        </div>
        <div class="f-subbrand-logo-wrap">
          <img src={isDarkMode ? "/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_dark.svg" : "/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_light.svg"}
               alt="SS Wellness Logo" loading="lazy">
        </div>
        <div class="f-subbrand-card-body">
          <div class="f-subbrand-name">SS Wellness</div>
          <div class="f-subbrand-desc">Wellness products, health tracking, supplements, and daily well-being.</div>
        </div>
        <div class="f-subbrand-card-footer">
          <span>Guidelines</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
        </div>
      </a>

      <!-- 4 · SSE -->
      <a href="/brand-system/#subbrand" class="f-subbrand-card" aria-label="Explore SS Ecommerce guidelines">
        <div class="f-subbrand-card-top">
          <span class="f-subbrand-pill">SSE</span>
          <span class="f-subbrand-status-dot" title="Active Entity"></span>
        </div>
        <div class="f-subbrand-logo-wrap">
          <img src={isDarkMode ? "/public/brand/logos/04_logo_ssEcom/logo_sse_primary_dark.svg" : "/public/brand/logos/04_logo_ssEcom/logo_sse_primary_light.svg"}
               alt="SS Ecommerce Logo" loading="lazy">
        </div>
        <div class="f-subbrand-card-body">
          <div class="f-subbrand-name">SS Ecommerce</div>
          <div class="f-subbrand-desc">Direct-to-consumer health products, discretion, and delivery.</div>
        </div>
        <div class="f-subbrand-card-footer">
          <span>Guidelines</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
        </div>
      </a>

      <!-- 5 · SST -->
      <a href="/brand-system/#subbrand" class="f-subbrand-card" aria-label="Explore SS Technology guidelines">
        <div class="f-subbrand-card-top">
          <span class="f-subbrand-pill">SST</span>
          <span class="f-subbrand-status-dot" title="Active Entity"></span>
        </div>
        <div class="f-subbrand-logo-wrap">
          <img src={isDarkMode ? "/public/brand/logos/05_logo_ssTech/logo_sst_primary_dark.svg" : "/public/brand/logos/05_logo_ssTech/logo_sst_primary_light.svg"}
               alt="SS Technology Logo" loading="lazy">
        </div>
        <div class="f-subbrand-card-body">
          <div class="f-subbrand-name">SS Technology</div>
          <div class="f-subbrand-desc">HealthTech systems, patient portals, and core infrastructure.</div>
        </div>
        <div class="f-subbrand-card-footer">
          <span>Guidelines</span>
          <iconify-icon icon="fluent:arrow-right-24-regular" class="f-subbrand-arrow" aria-hidden="true"></iconify-icon>
        </div>
      </a>
    </div>

    <div class="f-subbrand-cta-wrap">
      <a href="/brand-system/#subbrand" class="f-subbrand-cta-link">
        <span>Explore the complete sub-brand governance standards</span>
        <iconify-icon icon="fluent:arrow-right-24-regular" aria-hidden="true"></iconify-icon>
      </a>
    </div>
  </div>
</section>
