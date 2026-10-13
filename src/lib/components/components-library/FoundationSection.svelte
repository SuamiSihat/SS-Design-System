<script>
  let { onCopySwatch = () => {} } = $props();

  let copiedIcon = $state('');

  function copySwatch(hex, name) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(hex);
    }
    const text = `Copied ${name} (${hex})`;
    onCopySwatch(text);
  }

  function copyText(text, iconName) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (iconName) {
      copiedIcon = iconName;
      setTimeout(() => (copiedIcon = ''), 1800);
    }
  }
</script>

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
          <div class="ss-surface-light" style="background:#FCFAF6; border-radius:var(--f-radius-lg); padding:1rem; border:1px solid #E2E8F0;">
            <div style="font-size:1.2rem; font-weight:900; color:#000000; margin-bottom:2px; letter-spacing:-0.01em;">Heading in #000000</div>
            <div style="font-size:0.85rem; color:#19191A; line-height:1.6; margin-bottom:6px;">Body text uses <code>#19191A</code> for comfortable reading. Reduced visual aggression, high contrast ratio.</div>
            <div style="font-size:0.72rem; color:rgba(25,25,26,0.65); margin-bottom:4px;">Secondary metadata — dates, tags · <code>rgba(25,25,26,0.65)</code></div>
            <button type="button" disabled class="ss-disabled-sample" style="font-size:0.72rem; color:rgba(25,25,26,0.35);">Disabled label · <code style="color:inherit;">rgba(25,25,26,0.35)</code></button>
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
          <div style="background:#1C1C1C; border-radius:var(--f-radius-lg); padding:1rem; border:1px solid #3C3C3B;">
            <div style="font-size:1.2rem; font-weight:900; color:#FFFFFF; margin-bottom:2px; letter-spacing:-0.01em;">Heading in #FFFFFF</div>
            <div style="font-size:0.85rem; color:#FCFAF6; line-height:1.6; margin-bottom:6px;">Body text uses <code style="color:#6DC6EC;">#FCFAF6</code> — Porcelain White for comfortable dark-mode reading.</div>
            <div style="font-size:0.72rem; color:rgba(252,250,246,0.65); margin-bottom:4px;">Secondary metadata · <code style="color:rgba(109,198,236,0.8);">rgba(252,250,246,0.65)</code></div>
            <button type="button" disabled class="ss-disabled-sample" style="font-size:0.72rem; color:rgba(252,250,246,0.35);">Disabled label · <code style="color:inherit;">rgba(252,250,246,0.35)</code></button>
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
              <span style="color:var(--color-neutral-fg-3);">#000 bg <iconify-icon icon="fluent:arrow-right-12-regular" aria-hidden="true"></iconify-icon> #FFF text</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="background:#FFFFFF; padding:3px 10px; border-radius:4px; color:#19191A; border:1px solid #CBD5E1;">Button</div>
              <span style="color:var(--color-neutral-fg-3);">#FFF bg <iconify-icon icon="fluent:arrow-right-12-regular" aria-hidden="true"></iconify-icon> #19191A text</span>
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
  <span style="color:var(--color-brand-primary);">--text-strong</span>:    <span style="color:var(--color-success-fg);">#000000</span>;
  <span style="color:var(--color-brand-primary);">--text-primary</span>:   <span style="color:var(--color-success-fg);">#19191a</span>;
  <span style="color:var(--color-brand-primary);">--surface-canvas</span>: <span style="color:var(--color-success-fg);">#fcfaf6</span>;
  <span style="color:var(--color-brand-primary);">--surface-elev</span>:   <span style="color:var(--color-success-fg);">#ffffff</span>;
&#125;

<span style="color:var(--color-neutral-fg-3);">/* DARK MODE */</span>
[data-theme="dark"] &#123;
  <span style="color:var(--color-brand-primary);">--text-strong</span>:    <span style="color:var(--color-text-accent);">#ffffff</span>;
  <span style="color:var(--color-brand-primary);">--text-primary</span>:   <span style="color:var(--color-text-accent);">#fcfaf6</span>;
  <span style="color:var(--color-brand-primary);">--surface-canvas</span>: <span style="color:var(--color-text-accent);">#1c1c1c</span>;
  <span style="color:var(--color-brand-primary);">--surface-elev</span>:   <span style="color:var(--color-text-accent);">#000000</span>;
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
  <span style="color:var(--color-success-fg);">rgba(25, 25, 26, 0.65)</span>;
<span style="color:var(--color-brand-primary);">--text-disabled</span>:
  <span style="color:var(--color-success-fg);">rgba(25, 25, 26, 0.35)</span>;

<span style="color:var(--color-neutral-fg-3);">/* Dark */</span>
<span style="color:var(--color-brand-primary);">--text-secondary</span>:
  <span style="color:var(--color-text-accent);">rgba(252, 250, 246, 0.65)</span>;
<span style="color:var(--color-brand-primary);">--text-disabled</span>:
  <span style="color:var(--color-text-accent);">rgba(252, 250, 246, 0.35)</span>;</pre>
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
          <strong style="color:#FCFAF6;">Strong</strong> <iconify-icon icon="fluent:arrow-right-12-regular" aria-hidden="true"></iconify-icon> <code style="color:#6DC6EC;">#000000 / #FFFFFF</code><br>
          <strong style="color:#FCFAF6;">Primary</strong> <iconify-icon icon="fluent:arrow-right-12-regular" aria-hidden="true"></iconify-icon> <code style="color:#6DC6EC;">#19191A / #FCFAF6</code><br>
          <strong style="color:#FCFAF6;">Secondary</strong> <iconify-icon icon="fluent:arrow-right-12-regular" aria-hidden="true"></iconify-icon> Derived from Primary at 65% opacity<br>
          <strong style="color:#FCFAF6;">Disabled</strong> <iconify-icon icon="fluent:arrow-right-12-regular" aria-hidden="true"></iconify-icon> Derived from Primary at 35% opacity
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:6px; font-family:monospace; font-size:0.75rem;">
        <div style="background:rgba(255,255,255,0.08); padding:4px 12px; border-radius:6px; color:#FFFFFF; font-weight:800; letter-spacing:0.02em;">████ STRONG</div>
        <div style="background:rgba(255,255,255,0.05); padding:4px 12px; border-radius:6px; color:#FCFAF6;">████ Primary</div>
        <div style="background:rgba(255,255,255,0.03); padding:4px 12px; border-radius:6px; color:rgba(252,250,246,0.65);">████ Secondary</div>
        <button type="button" disabled class="ss-disabled-sample" style="background:rgba(255,255,255,0.02); padding:4px 12px; border-radius:6px; color:rgba(252,250,246,0.35);">████ Disabled</button>
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
      <div style="font-size:0.75rem; color:var(--color-success-fg); font-weight:600; margin-top:8px; text-align:center;">Copied icon snippet &lt;iconify-icon icon="fluent:{copiedIcon}"&gt;</div>
    {/if}
  </div>
</section>
