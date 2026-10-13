<script>
  import { VERSION } from '$lib/version.js';

  let { copy } = $props();
</script>

<!-- ================================================================
     CHAPTER 7: DYNAMIC BENTO GRID — OPERATIONAL TOOLS & ECOSYSTEM
     ================================================================ -->
<section id="tools-section" class="f-section-block" aria-label="Tools and Subsidiary Ecosystem">
  <div class="f-section-overline">
    <span class="f-overline-label">Tools</span>
    <span class="f-overline-rule" aria-hidden="true"></span>
  </div>

  <div class="f-section-head">
    <h2 class="f-section-title">Tools for everyday work</h2>
    <p class="f-section-subtitle">
      Apps and pages that save you time.
    </p>
  </div>

  <!-- Chapter 7 Bento Grid -->
  <div class="f-bento-grid">
    <!-- Bento Item 1: 6-Col SS CAM Workstation -->
    <a href="/tools/" class="f-bento-card f-bento-span-6 f-tool-card" id="card-sscam" style="text-decoration: none;">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
        <div class="f-pillar-icon" style="margin: 0; background: rgba(4, 51, 136, 0.12); color: var(--color-brand-primary);">
          <iconify-icon icon="fluent:camera-24-regular"></iconify-icon>
        </div>
        <span class="f-badge-shimmer">Windows app</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">SS CAM</h3>
      <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
        Adds our watermark and colour style to photos and videos, many at once.
      </p>
      <div style="margin-top: 1.25rem; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; color: var(--color-brand-primary);">
        <span>Get SS CAM</span> &rarr;
      </div>
    </a>

    <!-- Bento Item 2: 6-Col Mail Signature Generator -->
    <a href="/signature/" class="f-bento-card f-bento-span-6 f-tool-card" id="card-signature" style="text-decoration: none;">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
        <div class="f-pillar-icon" style="margin: 0; background: rgba(33, 161, 247, 0.15); color: var(--color-text-accent);">
          <iconify-icon icon="fluent:mail-template-24-regular"></iconify-icon>
        </div>
        <span class="f-badge-shimmer" style="color: var(--color-text-accent); border-color: rgba(33,161,247,0.3);">Takes a minute</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Email signature</h3>
      <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
        Make your official email signature for Outlook, Gmail or Apple Mail.
      </p>
      <div style="margin-top: 1.25rem; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; color: var(--color-brand-primary);">
        <span>Make my signature</span> &rarr;
      </div>
    </a>

    <!-- Bento Item 3: 4-Col Staff Onboarding -->
    <a href="/onboarding/" class="f-bento-card f-bento-span-4 f-tool-card" id="card-onboarding" style="text-decoration: none;">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div class="f-pillar-icon" style="margin: 0 0 1rem;">
        <iconify-icon icon="fluent:handshake-24-regular"></iconify-icon>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">Staff Onboarding</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
        Your first-week checklist, the tools to install, and how we work.
      </p>
    </a>

    <!-- Bento Item 4: 4-Col System Docs & Changelog -->
    <a href="/doc/?doc=changelog" class="f-bento-card f-bento-span-4 f-tool-card" id="card-docs" style="text-decoration: none;">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div class="f-pillar-icon" style="margin: 0 0 1rem;">
        <iconify-icon icon="fluent:document-bullet-list-24-regular"></iconify-icon>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">What's new</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
        Recent changes to the brand and this site.
      </p>
    </a>

    <!-- Bento Item 5: 4-Col SSNAS Cloud Server -->
    <a href="https://suamisihat.myds.me" class="f-bento-card f-bento-span-4 f-tool-card" id="card-dashboard" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div class="f-pillar-icon" style="margin: 0 0 1rem; background: rgba(33, 161, 247, 0.12); color: var(--color-text-accent);">
        <iconify-icon icon="fluent:server-24-regular"></iconify-icon>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-strong); margin: 0 0 0.5rem;">SSNAS Dashboard <iconify-icon icon="fluent:open-16-regular" aria-hidden="true"></iconify-icon></h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
        Shared company drive for raw photos, videos and files.
      </p>
    </a>

    <!-- Bento Item 6: 12-Col Multi-Platform Token Exporter Hub (Unique Non-Duplicate Developer Utility) -->
    <div class="f-bento-card f-bento-span-12 f-token-export-card">
      <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem;">
        <div>
          <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">
            For designers and developers
          </div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-strong); margin: 0;">Brand colours as code, ready to paste</h3>
        </div>
        <span class="f-badge-shimmer" style="color: var(--color-success-fg); border-color: rgba(34,197,94,0.3);">
          <iconify-icon icon="fluent:checkmark-circle-16-filled"></iconify-icon> W3C Spec v{VERSION} Compliant
        </span>
      </div>
      
      <div class="f-export-grid">
        <div class="f-export-card">
          <div class="f-export-header">
            <span class="f-export-tech">CSS Custom Properties</span>
            <button type="button" class="f-export-copy" onclick={() => copy(`:root {\n  --color-brand-primary: #043388;\n  --color-brand-Prussian: #022057;\n  --color-brand-azure: #21A1F7;\n  --color-brand-malibu: #6DC6EC;\n  --text-strong: #000000;\n  --text-primary: #19191A;\n  --text-secondary: rgba(25, 25, 26, 0.65);\n  --text-disabled: rgba(25, 25, 26, 0.35);\n}`, 'Copied CSS Variables!')}>
              <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy
            </button>
          </div>
          <p class="f-export-desc">Native CSS custom variables with light &amp; dark mode scoping.</p>
        </div>

        <div class="f-export-card">
          <div class="f-export-header">
            <span class="f-export-tech">Tailwind v4 Theme</span>
            <button type="button" class="f-export-copy" onclick={() => copy(`@theme {\n  --color-ss-primary: #043388;\n  --color-ss-prussian: #022057;\n  --color-ss-azure: #21A1F7;\n  --color-ss-malibu: #6DC6EC;\n  --color-ss-porcelain: #FCFAF6;\n}`, 'Copied Tailwind theme tokens!')}>
              <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy
            </button>
          </div>
          <p class="f-export-desc">CSS theme declarations for Tailwind CSS v4 &amp; v3.</p>
        </div>

        <div class="f-export-card">
          <div class="f-export-header">
            <span class="f-export-tech">Flutter Dart Theme</span>
            <button type="button" class="f-export-copy" onclick={() => copy(`class SSColors {\n  static const primary = Color(0xFF043388);\n  static const prussian = Color(0xFF022057);\n  static const azure = Color(0xFF21A1F7);\n  static const malibu = Color(0xFF6DC6EC);\n  static const porcelain = Color(0xFFFCFAF6);\n}`, 'Copied Flutter Dart tokens!')}>
              <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy
            </button>
          </div>
          <p class="f-export-desc">Static Dart constants for Flutter mobile &amp; tablet apps.</p>
        </div>

        <div class="f-export-card">
          <div class="f-export-header">
            <span class="f-export-tech">W3C Token JSON</span>
            <button type="button" class="f-export-copy" onclick={() => copy(`{\n  "color": {\n    "brand": {\n      "primary": { "$value": "#043388", "$type": "color" },\n      "azure": { "$value": "#21A1F7", "$type": "color" }\n    }\n  }\n}`, 'Copied W3C Tokens JSON!')}>
              <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy
            </button>
          </div>
          <p class="f-export-desc">Cross-platform JSON token tree for automated CI/CD builds.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Editorial Section Overline (replaces chapter badge) */
  .f-section-overline {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 1.1rem;
  }

  .f-overline-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-text-accent);
    white-space: nowrap;
  }

  :global([data-theme="dark"]) .f-overline-label {
    color: #6DC6EC;
  }

  .f-overline-rule {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(33, 161, 247, 0.35) 0%, transparent 100%);
    max-width: 200px;
  }

  /* Section Blocks */
  .f-section-block {
    width: 100%;
    box-sizing: border-box;
    padding: 5.5rem clamp(1.5rem, 5vw, 5rem) 3rem;
    margin: 0;
  }

  .f-section-head {
    margin-bottom: 2.5rem;
    max-width: 760px;
  }

  .f-section-title {
    font-size: clamp(2rem, 4.5vw, 3.25rem);
    font-weight: 800;
    color: var(--text-strong, #000000);
    letter-spacing: -0.03em;
    margin: 0 0 0.85rem;
    line-height: 1.12;
  }

  :global([data-theme="dark"]) .f-section-title {
    color: #FFFFFF;
  }

  .f-section-subtitle {
    font-size: 1.05rem;
    color: var(--text-secondary, rgba(25, 25, 26, 0.65));
    margin: 0;
    max-width: 680px;
    line-height: 1.65;
  }

  :global([data-theme="dark"]) .f-section-subtitle {
    color: rgba(252, 250, 246, 0.65);
  }

  /* Bento Grid */
  .f-bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    .f-bento-grid {
      grid-template-columns: repeat(6, 1fr);
      gap: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .f-bento-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .f-bento-span-12 { grid-column: span 12; }
  .f-bento-span-6 { grid-column: span 6; }
  .f-bento-span-4 { grid-column: span 4; }

  @media (max-width: 1024px) {
    .f-bento-span-6 { grid-column: span 6; }
    .f-bento-span-4 { grid-column: span 6; }
  }

  @media (max-width: 768px) {
    .f-bento-span-12,
    .f-bento-span-6,
    .f-bento-span-4 {
      grid-column: span 1 !important;
    }
  }

  @media (max-width: 480px) {
    .f-section-block {
      padding: 3.5rem 1.25rem 2rem;
    }
    .f-section-head {
      max-width: 100%;
    }
    .f-bento-grid {
      gap: 0.875rem;
    }
  }

  /* Luminous Glassmorphic Bento Cards */
  .f-bento-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    padding: 2rem clamp(1.25rem, 3vw, 2.25rem);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.6);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.25s ease;
    display: flex;
    flex-direction: column;
  }

  :global([data-theme="dark"]) .f-bento-card {
    background: rgba(14, 20, 34, 0.72);
    border-color: rgba(255, 255, 255, 0.07);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.06);
  }

  .f-bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(4, 51, 136, 0.14), inset 0 1px 1px rgba(255, 255, 255, 0.9);
    border-color: rgba(4, 51, 136, 0.28);
  }

  :global([data-theme="dark"]) .f-bento-card:hover {
    border-color: rgba(33, 161, 247, 0.35);
    box-shadow: 0 20px 52px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.12);
  }

  /* Bento Tier: Hero (elevated, glowing) */

  .f-card-shimmer-highlight {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
    pointer-events: none;
  }

  :global([data-theme="dark"]) .f-card-shimmer-highlight {
    background: linear-gradient(90deg, transparent 0%, rgba(33, 161, 247, 0.4) 50%, transparent 100%);
  }

  /* Pillar Icon & Details */

  .f-pillar-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    background: rgba(4, 51, 136, 0.08);
    color: var(--color-brand-primary, #043388);
  }

  :global([data-theme="dark"]) .f-pillar-icon {
    background: rgba(33, 161, 247, 0.15);
    color: #6DC6EC;
  }

  /* Multi-Platform Token Exporter Hub */
  .f-token-export-card {
    background: linear-gradient(135deg, rgba(2, 32, 87, 0.03) 0%, rgba(4, 51, 136, 0.08) 100%);
  }

  :global([data-theme="dark"]) .f-token-export-card {
    background: linear-gradient(135deg, rgba(2, 20, 64, 0.7) 0%, rgba(4, 51, 136, 0.25) 100%);
  }

  .f-export-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  @media (max-width: 1024px) {
    .f-export-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .f-export-grid {
      grid-template-columns: 1fr;
    }
  }

  .f-export-card {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 14px;
    padding: 1.15rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :global([data-theme="dark"]) .f-export-card {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .f-export-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(4, 51, 136, 0.08);
  }

  .f-export-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .f-export-tech {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-strong);
  }

  .f-export-copy {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.725rem;
    font-weight: 700;
    color: var(--color-brand-primary);
    background: rgba(4, 51, 136, 0.08);
    border: none;
    padding: 3px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  :global([data-theme="dark"]) .f-export-copy {
    color: var(--color-text-accent);
    background: rgba(33, 161, 247, 0.12);
  }

  .f-export-copy:hover {
    background: var(--color-action-bg); color: var(--color-on-action);
  }

  :global([data-theme="dark"]) .f-export-copy:hover {
    background: #21A1F7;
    color: #000000;
  }

  .f-export-desc {
    font-size: 0.775rem;
    color: var(--text-secondary);
    line-height: 1.45;
    margin: 0;
  }

  /* Tool Card Badges */
  .f-badge-shimmer {
    font-size: 0.725rem;
    font-weight: 700;
    background: rgba(4, 51, 136, 0.08);
    color: var(--color-brand-primary);
    padding: 4px 12px;
    border-radius: 9999px;
    border: 1px solid rgba(4, 51, 136, 0.15);
  }

  :global([data-theme="dark"]) .f-badge-shimmer {
    background: rgba(33, 161, 247, 0.12);
    color: var(--color-text-accent);
    border-color: rgba(33, 161, 247, 0.25);
  }
</style>
