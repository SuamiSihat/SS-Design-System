<script>
  import HeroBackground from '$lib/components/HeroBackground.svelte';
  import ColorSwatch from '$lib/components/ColorSwatch.svelte';
  import BrandAssetCard from '$lib/components/BrandAssetCard.svelte';
</script>

<svelte:head>
  <title>SuamiSihat™ Design System — Single Source of Truth</title>
</svelte:head>

<!-- Interactive Hero Canvas -->
<HeroBackground />

<!-- Main Content Container -->
<div class="container-xl py-5">

  <!-- Section: Core 60:30:10 Color Allocation -->
  <section class="mb-5">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
      <div>
        <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Core Brand Architecture</div>
        <h2 class="h3 fw-bold mb-1">The 60:30:10 Visual Allocation Standard</h2>
        <p class="text-secondary mb-0">Engineered for clinical trust, zero CTA competition, and high-converting patient flows.</p>
      </div>
      <a href="/brand-guidelines/" class="btn btn-outline-primary btn-sm rounded-pill px-3">
        View Full Guidelines →
      </a>
    </div>

    <!-- 60:30:10 Visual Ratio Bar -->
    <div class="mb-4 p-3 rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF); border: 1px solid var(--color-neutral-stroke-1, #E2E8F0);">
      <div style="display: flex; height: 28px; border-radius: 8px; overflow: hidden; margin-bottom: 0.75rem; font-weight: 700; font-size: 0.75rem; color: #FFFFFF; text-align: center; line-height: 28px;">
        <div style="width: 60%; background: #F8FAFC; color: #1C1C1C; border-right: 1px solid #CBD5E1;">60% Canvas & Whitespace</div>
        <div style="width: 30%; background: #022057;">30% Structural Trust</div>
        <div style="width: 10%; background: #21A1F7; color: #022057;">10% Accent</div>
      </div>
      <div class="d-flex justify-content-between text-muted" style="font-size: 0.75rem;">
        <span><strong>60% Foundation:</strong> Canvas Light (#F8FAFC) / White (#FFFFFF)</span>
        <span><strong>30% Structure:</strong> Prussian Blue (#022057) & SS Blue (#043388)</span>
        <span><strong>10% Accent:</strong> Azure (#21A1F7) & Banana (#F7E143)</span>
      </div>
    </div>

    <!-- Swatch Cards Grid -->
    <div class="row g-3">
      <div class="col-6 col-md-4 col-lg-2">
        <ColorSwatch name="Canvas Light" hex="#F8FAFC" role="Page base & background" allocation="60%" isDarkText={true} />
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <ColorSwatch name="Pure White" hex="#FFFFFF" role="Cards & surface elevation" allocation="60%" isDarkText={true} />
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <ColorSwatch name="Prussian Blue" hex="#022057" role="Headers, navbars & anchors" allocation="30%" />
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <ColorSwatch name="SuamiSihat Blue" hex="#043388" role="Brand accent & containers" allocation="30%" />
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <ColorSwatch name="Azure Blue" hex="#21A1F7" role="Primary conversion CTAs" allocation="10%" />
      </div>
      <div class="col-6 col-md-4 col-lg-2">
        <ColorSwatch name="Banana Yellow" hex="#F7E143" role="Vitality highlights & badges" allocation="10%" isDarkText={true} />
      </div>
    </div>
  </section>

  <!-- Section: Multi-Platform System Hubs -->
  <section class="mb-5">
    <div class="mb-4">
      <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Multi-Platform Ecosystem</div>
      <h2 class="h3 fw-bold mb-1">Single Token Pipeline, Universal Delivery</h2>
      <p class="text-secondary mb-0">Tokens compile across web, mobile apps, desktop suites, and clinic operating platforms.</p>
    </div>

    <div class="row g-4">
      <div class="col-md-6 col-lg-3">
        <div class="card h-100 p-4 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
          <div class="d-flex align-items-center gap-2 mb-3">
            <div style="background: rgba(33, 161, 247, 0.15); color: #043388; padding: 0.6rem; border-radius: 10px;">
              <iconify-icon icon="lucide:globe" width="24" height="24"></iconify-icon>
            </div>
            <div>
              <h5 class="fw-bold mb-0" style="font-size: 1rem;">Web Platforms</h5>
              <span class="text-muted" style="font-size: 0.75rem;">CSS Tokens & HTML/JS</span>
            </div>
          </div>
          <p class="text-secondary mb-3" style="font-size: 0.85rem; line-height: 1.5;">
            Patient portal, clinic appointments, and service landing pages utilizing pure W3C CSS variables.
          </p>
          <a href="/components/" class="mt-auto text-decoration-none fw-bold" style="font-size: 0.85rem; color: #043388;">
            View Component Suite →
          </a>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card h-100 p-4 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
          <div class="d-flex align-items-center gap-2 mb-3">
            <div style="background: rgba(33, 161, 247, 0.15); color: #043388; padding: 0.6rem; border-radius: 10px;">
              <iconify-icon icon="lucide:smartphone" width="24" height="24"></iconify-icon>
            </div>
            <div>
              <h5 class="fw-bold mb-0" style="font-size: 1rem;">Expo & Flutter</h5>
              <span class="text-muted" style="font-size: 0.75rem;">JSON Tokens</span>
            </div>
          </div>
          <p class="text-secondary mb-3" style="font-size: 0.85rem; line-height: 1.5;">
            SuamiSihat Mobile health app consuming JSON tokens for dark/light themes and teleconsult flows.
          </p>
          <a href="/brand-system/" class="mt-auto text-decoration-none fw-bold" style="font-size: 0.85rem; color: #043388;">
            View JSON Tokens →
          </a>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card h-100 p-4 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
          <div class="d-flex align-items-center gap-2 mb-3">
            <div style="background: rgba(33, 161, 247, 0.15); color: #043388; padding: 0.6rem; border-radius: 10px;">
              <iconify-icon icon="lucide:monitor" width="24" height="24"></iconify-icon>
            </div>
            <div>
              <h5 class="fw-bold mb-0" style="font-size: 1rem;">SS-CAM Desktop</h5>
              <span class="text-muted" style="font-size: 0.75rem;">WPF XAML & Fluent 2</span>
            </div>
          </div>
          <p class="text-secondary mb-3" style="font-size: 0.85rem; line-height: 1.5;">
            Windows .NET/WPF clinical suite with acrylic Mica materials and high-contrast dark medical scopes.
          </p>
          <a href="https://github.com/SuamiSihat/ss_cam" target="_blank" class="mt-auto text-decoration-none fw-bold" style="font-size: 0.85rem; color: #043388;">
            SS-CAM Repository →
          </a>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card h-100 p-4 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
          <div class="d-flex align-items-center gap-2 mb-3">
            <div style="background: rgba(33, 161, 247, 0.15); color: #043388; padding: 0.6rem; border-radius: 10px;">
              <iconify-icon icon="lucide:layers" width="24" height="24"></iconify-icon>
            </div>
            <div>
              <h5 class="fw-bold mb-0" style="font-size: 1rem;">Operating Brands</h5>
              <span class="text-muted" style="font-size: 0.75rem;">Sub-Brand Marks</span>
            </div>
          </div>
          <p class="text-secondary mb-3" style="font-size: 0.85rem; line-height: 1.5;">
            Rejal™, Androlab™, MENSS™, Pertabi™, and partner bio-actives adhering to group guidelines.
          </p>
          <a href="/products/" class="mt-auto text-decoration-none fw-bold" style="font-size: 0.85rem; color: #043388;">
            Explore Brand Catalogue →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section: Primary Vector Marks & Downloads -->
  <section class="mb-5">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
      <div>
        <div class="text-uppercase fw-bold text-primary" style="font-size: 0.8rem; letter-spacing: 0.08em;">Official Assets</div>
        <h2 class="h3 fw-bold mb-1">Core Brand Vectors & Logomarks</h2>
        <p class="text-secondary mb-0">Production-certified vector marks for print, digital, and clinic POSM.</p>
      </div>
      <a href="/public/brand/downloads/" class="btn btn-outline-primary btn-sm rounded-pill px-3">
        Download All Pack (ZIP) →
      </a>
    </div>

    <div class="row g-3">
      <div class="col-md-6 col-lg-3">
        <BrandAssetCard 
          title="Primary Dark Logo" 
          subtitle="White wordmark on dark surfaces" 
          svgPath="/public/brand/logos/logo_suamisihat_primary_dark.svg" 
          defaultDark={true} 
        />
      </div>
      <div class="col-md-6 col-lg-3">
        <BrandAssetCard 
          title="Primary Light Logo" 
          subtitle="Blue wordmark on white surfaces" 
          svgPath="/public/brand/logos/logo_suamisihat_primary_light.svg" 
          defaultDark={false} 
        />
      </div>
      <div class="col-md-6 col-lg-3">
        <BrandAssetCard 
          title="Logomark (Emblem)" 
          subtitle="Icon badge for app & favicon" 
          svgPath="/public/brand/logos/ss-logomark-light.svg" 
          defaultDark={false} 
        />
      </div>
      <div class="col-md-6 col-lg-3">
        <BrandAssetCard 
          title="SSCAM Monogram" 
          subtitle="Desktop suite clinical emblem" 
          svgPath="/public/brand/logos/sscam_logo.svg" 
          defaultDark={true} 
        />
      </div>
    </div>
  </section>

  <!-- Section: Quick Navigation Cards -->
  <section>
    <div class="mb-4">
      <h2 class="h3 fw-bold mb-1">Design System Modules</h2>
      <p class="text-secondary mb-0">Jump directly to documentation, tools, or staff onboarding.</p>
    </div>

    <div class="row g-3">
      <div class="col-md-4">
        <a href="/brand-guidelines/" class="card p-4 border rounded-4 text-decoration-none shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF); transition: transform 0.2s ease;">
          <div class="d-flex align-items-center gap-3">
            <div style="background: #EBF5FE; color: #043388; padding: 0.75rem; border-radius: 12px;">
              <iconify-icon icon="lucide:book-open" width="26" height="26"></iconify-icon>
            </div>
            <div>
              <h5 class="fw-bold mb-1" style="color: var(--color-neutral-fg-1, #1C1C1C); font-size: 1.05rem;">Brand Guidelines</h5>
              <span class="text-secondary" style="font-size: 0.8rem;">Rules, typography, and voice</span>
            </div>
          </div>
        </a>
      </div>

      <div class="col-md-4">
        <a href="/components/" class="card p-4 border rounded-4 text-decoration-none shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF); transition: transform 0.2s ease;">
          <div class="d-flex align-items-center gap-3">
            <div style="background: #EBF5FE; color: #043388; padding: 0.75rem; border-radius: 12px;">
              <iconify-icon icon="lucide:box" width="26" height="26"></iconify-icon>
            </div>
            <div>
              <h5 class="fw-bold mb-1" style="color: var(--color-neutral-fg-1, #1C1C1C); font-size: 1.05rem;">Component Library</h5>
              <span class="text-secondary" style="font-size: 0.8rem;">Buttons, cards, alerts & modals</span>
            </div>
          </div>
        </a>
      </div>

      <div class="col-md-4">
        <a href="/signature/" class="card p-4 border rounded-4 text-decoration-none shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF); transition: transform 0.2s ease;">
          <div class="d-flex align-items-center gap-3">
            <div style="background: #EBF5FE; color: #043388; padding: 0.75rem; border-radius: 12px;">
              <iconify-icon icon="lucide:mail" width="26" height="26"></iconify-icon>
            </div>
            <div>
              <h5 class="fw-bold mb-1" style="color: var(--color-neutral-fg-1, #1C1C1C); font-size: 1.05rem;">Signature Generator</h5>
              <span class="text-secondary" style="font-size: 0.8rem;">Official Outlook/Gmail signatures</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

</div>
