<script>
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme.js';

  let canvas = $state();
  let animId;
  let isDarkMode = $derived($theme === 'dark');

  onMount(() => {
    const cvs = canvas || document.getElementById('heroWaveCanvas');
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const stars = [];
    const floatingLogos = [];
    const logoImg = new Image();
    logoImg.src = '/public/brand/logos/ss-logomark-light.svg';
    let logoImgLoaded = false;
    logoImg.onload = () => { logoImgLoaded = true; };

    function resize() {
      if (!cvs) return;
      const parent = cvs.parentElement || document.querySelector('.f-hero');
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth || window.innerWidth || 1200;
      height = Math.max(parent.clientHeight || parent.offsetHeight || 500, 480);
      
      cvs.width = Math.floor(width * dpr);
      cvs.height = Math.floor(height * dpr);
      cvs.style.width = `${width}px`;
      cvs.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();
    }

    function initParticles() {
      stars.length = 0;
      // Men's / Mars ♂ symbol particle count
      const count = Math.min(55, Math.max(28, Math.floor((width * height) / 14000)));
      for (let i = 0; i < count; i++) {
        const colorType = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 10 + 16,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.015,
          baseOpacity: Math.random() * 0.35 + 0.35,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
          isFragment: i % 3 === 0,
          color: colorType > 0.75 ? '#F7E143' : colorType > 0.45 ? '#21A1F7' : colorType > 0.2 ? '#6DC6EC' : '#FFFFFF'
        });
      }

      floatingLogos.length = 0;
      const logoCount = Math.min(6, Math.max(3, Math.floor(width / 260)));
      for (let i = 0; i < logoCount; i++) {
        floatingLogos.push({
          x: (width / (logoCount + 1)) * (i + 1) + (Math.random() - 0.5) * 80,
          y: height * 0.5 + (Math.random() - 0.5) * 160,
          size: Math.random() * 14 + 32,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.18,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.005,
          phase: Math.random() * Math.PI * 2,
          floatSpeed: Math.random() * 0.02 + 0.01,
          floatAmp: Math.random() * 18 + 10,
          alpha: Math.random() * 0.25 + 0.18
        });
      }
    }

    function handleMouseMove(e) {
      if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      targetMouseX = -1000;
      targetMouseY = -1000;
    }

    const heroSection = cvs.parentElement || document.querySelector('.f-hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
      heroSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    function render() {
      time += 0.018;
      
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Flowing Sine Wave Energy Streams (Centered Across Hero Title)
      drawWaveStreams();

      // 2. Draw Floating SuamiSihat Logomark Marks
      drawLogos();

      // 3. Draw Men's / Mars (♂) Star Particles & Shards
      drawMarsParticles();

      animId = requestAnimationFrame(render);
    }

    function drawWaveStreams() {
      const streamColors = [
        'rgba(33, 161, 247, 0.42)',  // Azure
        'rgba(109, 198, 236, 0.32)', // Malibu
        'rgba(247, 225, 67, 0.26)',  // Banana Gold
        'rgba(255, 255, 255, 0.20)'  // White
      ];

      const yCenter = height * 0.52;

      for (let l = 0; l < 4; l++) {
        ctx.beginPath();
        const yBase = yCenter + (l - 1.5) * 34;
        const freq = 0.0026 + l * 0.0012;
        const amp = 30 + l * 10;
        const speed = time * (0.7 + l * 0.25);

        for (let x = 0; x <= width; x += 12) {
          const dx = x - mouseX;
          const dy = yBase - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseForce = dist < 160 ? Math.sin((160 - dist) / 160 * Math.PI) * 26 : 0;

          const y = yBase + Math.sin(x * freq + speed) * amp + Math.cos(x * 0.006 - speed * 0.5) * (amp * 0.35) + mouseForce;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          // Glowing node dots
          if (x % 50 === 0) {
            ctx.save();
            ctx.fillStyle = l === 2 ? '#F7E143' : '#6DC6EC';
            ctx.globalAlpha = 0.65 + Math.sin(x * 0.04 + time * 3) * 0.25;
            ctx.shadowColor = l === 2 ? '#F7E143' : '#21A1F7';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(x, y, 2.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        ctx.strokeStyle = streamColors[l];
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    }

    function drawLogos() {
      for (const l of floatingLogos) {
        l.x += l.vx;
        if (l.x < -60) l.x = width + 60;
        if (l.x > width + 60) l.x = -60;

        const floatY = l.y + Math.sin(time * l.floatSpeed * 40 + l.phase) * l.floatAmp;

        // Mouse Repulsion
        const dx = l.x - mouseX;
        const dy = floatY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0, pushY = 0;
        if (dist < 160 && dist > 0) {
          const force = (160 - dist) / 160;
          pushX = (dx / dist) * force * 28;
          pushY = (dy / dist) * force * 28;
        }

        ctx.save();
        ctx.translate(l.x + pushX, floatY + pushY);
        ctx.rotate(l.rot);
        ctx.globalAlpha = l.alpha;

        if (logoImgLoaded && logoImg) {
          ctx.drawImage(logoImg, -l.size / 2, -l.size / 2, l.size, l.size);
        } else {
          // Precise vector S-logomark fallback
          ctx.strokeStyle = '#6DC6EC';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.arc(0, -l.size * 0.22, l.size * 0.32, Math.PI * 0.5, Math.PI * 1.8);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, l.size * 0.22, l.size * 0.32, Math.PI * 1.5, Math.PI * 0.8, true);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    function drawMarsParticles() {
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -30) s.x = width + 30;
        if (s.x > width + 30) s.x = -30;
        if (s.y < -30) s.y = height + 30;
        if (s.y > height + 30) s.y = -30;

        s.rotation += s.rotSpeed;

        const opacity = Math.max(0.2, s.baseOpacity + Math.sin(time * s.twinkleSpeed * 50 + s.twinkleOffset) * 0.25);

        // Mouse Repulsion
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0, pushY = 0;
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140;
          pushX = (dx / dist) * force * 24;
          pushY = (dy / dist) * force * 24;
        }

        ctx.save();
        ctx.translate(s.x + pushX, s.y + pushY);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = opacity;

        ctx.strokeStyle = s.color;
        ctx.fillStyle = s.color;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;

        const sz = s.size;

        if (s.isFragment) {
          // Shard fragment: Arc + Angled arrow head
          ctx.beginPath();
          ctx.arc(0, 0, sz * 0.35, 0, Math.PI * 1.3);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(sz * 0.2, -sz * 0.2);
          ctx.lineTo(sz * 0.65, -sz * 0.65);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(sz * 0.65, -sz * 0.65);
          ctx.lineTo(sz * 0.35, -sz * 0.65);
          ctx.lineTo(sz * 0.65, -sz * 0.35);
          ctx.closePath();
          ctx.fill();
        } else {
          // Classic Mars / Men's gender symbol ♂
          // 1. Circle at lower-left
          ctx.beginPath();
          ctx.arc(-sz * 0.16, sz * 0.16, sz * 0.35, 0, Math.PI * 2);
          ctx.stroke();

          // 2. Arrow stem pointing 45° upper-right
          ctx.beginPath();
          ctx.moveTo(sz * 0.1, -sz * 0.1);
          ctx.lineTo(sz * 0.6, -sz * 0.6);
          ctx.stroke();

          // 3. Arrow tip
          ctx.beginPath();
          ctx.moveTo(sz * 0.6, -sz * 0.6);
          ctx.lineTo(sz * 0.28, -sz * 0.6);
          ctx.lineTo(sz * 0.6, -sz * 0.28);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  });
</script>

<svelte:head>
  <title>SuamiSihat™ Design System — Single Source of Truth</title>
</svelte:head>

<!-- ================================================================
     Hero Section
     ================================================================ -->
<section class="f-hero" aria-label="Hub introduction">
  <!-- Interactive Wave & Particle Canvas Background -->
  <canvas bind:this={canvas} id="heroWaveCanvas" class="hero-wave-canvas"></canvas>

  <!-- Clean Ambient Glow Backdrop -->
  <div class="f-hero-ambient-glow"></div>

  <div class="f-hero-inner f-animate-up">
    <div class="f-hero-eyebrow">
      <iconify-icon icon="fluent:gender-male-24-regular" style="font-size: 1.15rem; color: #6DC6EC; vertical-align: middle;" aria-hidden="true"></iconify-icon>
      <span>SuamiSihat™ Design System &bull; v3.5</span>
    </div>
    <h1 class="f-hero-title">
      One source. Every standard.<br>Ship with confidence.
    </h1>
    <p class="f-hero-subtitle">
      The authoritative single source of truth for the SuamiSihat™ brand ecosystem &mdash; unifying design tokens, Fluent 2 components, guidelines, and subsidiary standards.
    </p>
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
  </div>
</section>

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
