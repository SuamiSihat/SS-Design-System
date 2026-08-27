<script>
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme.js';

  /**
   * @typedef {Object} Props
   * @property {string} [eyebrow] - Eyebrow label / badge text
   * @property {string} [title] - Main headline
   * @property {string} [subtitle] - Subtitle descriptive paragraph
   * @property {string} [minHeight] - Minimum hero container height (e.g. '500px', '100vh')
   * @property {boolean} [showBadges] - Whether to render default trust badges
   * @property {string} [align] - Content alignment ('center' | 'left')
   * @property {import('svelte').Snippet} [children] - Optional custom hero content
   */

  /** @type {Props} */
  let {
    eyebrow = 'Design System — SuamiSihat™',
    title = 'Ship the SuamiSihat™ brand faster and better.',
    subtitle = 'The single source of truth for how we look, feel, and sound. Standardized Fluent 2 design tokens, UI components, and brand collateral.',
    minHeight = '520px',
    showBadges = false,
    align = 'center',
    children
  } = $props();

  let canvas = $state();
  let animId;
  let isDarkMode = $derived($theme === 'dark');

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth || window.innerWidth || 1200;
      height = Math.max(parent.clientHeight || parent.offsetHeight || 500, 360);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();
    }

    function initParticles() {
      stars.length = 0;
      const count = Math.min(50, Math.max(20, Math.floor((width * height) / 16000)));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 8 + 14,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.012,
          isGold: Math.random() > 0.65,
          opacity: Math.random() * 0.4 + 0.15,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          phase: Math.random() * Math.PI * 2
        });
      }

      floatingLogos.length = 0;
      for (let i = 0; i < 4; i++) {
        floatingLogos.push({
          x: (width / 5) * (i + 1) + (Math.random() - 0.5) * 80,
          y: height * 0.5 + (Math.random() - 0.5) * 120,
          baseY: height * 0.5 + (Math.random() - 0.5) * 120,
          vx: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 14 + 24,
          opacity: Math.random() * 0.2 + 0.1,
          floatSpeed: Math.random() * 0.002 + 0.001,
          floatAmp: Math.random() * 15 + 10,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function handleMouseMove(e) {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      targetMouseX = -1000;
      targetMouseY = -1000;
    }

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove, { passive: true });
      parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }
    window.addEventListener('resize', resize, { passive: true });

    resize();

    function render() {
      if (!canvas || !ctx) return;
      time += 0.02;

      mouseX += 0.08 * (targetMouseX - mouseX);
      mouseY += 0.08 * (targetMouseY - mouseY);

      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode;

      // 1. Draw flowing energy stream waves
      const waveColor = dark ? 'rgba(33, 161, 247, ' : 'rgba(109, 198, 236, ';
      const cy = height * 0.65;
      for (let s = 0; s < 3; s++) {
        ctx.beginPath();
        const yOff = cy + 24 * (s - 1);
        const freq = 0.003 + 0.0012 * s;
        const amp = 28 + 10 * s;
        const speed = time * (0.5 + 0.15 * s);

        for (let x = 0; x <= width; x += 15) {
          const dx = x - mouseX;
          const dy = yOff - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseLift = dist < 160 ? 20 * Math.sin(((160 - dist) / 160) * Math.PI) : 0;
          const y = yOff + Math.sin(x * freq + speed) * amp + Math.cos(0.006 * x - 0.4 * speed) * (0.4 * amp) + mouseLift;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

          // Energy nodes
          if (x % 50 === 0) {
            ctx.save();
            ctx.fillStyle = s === 0 ? '#F7E143' : (dark ? '#6DC6EC' : '#ffffff');
            ctx.globalAlpha = 0.3 + 0.2 * Math.sin(x + 3 * time);
            ctx.beginPath();
            ctx.arc(x, y, s === 0 ? 2.5 : 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        ctx.strokeStyle = `${waveColor}${0.2 - 0.04 * s})`;
        ctx.lineWidth = 1.6 - 0.3 * s;
        ctx.stroke();
      }

      // 2. Draw floating Mars symbols & particles
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < -30) star.x = width + 30;
        if (star.x > width + 30) star.x = -30;
        if (star.y < -30) star.y = height + 30;
        if (star.y > height + 30) star.y = -30;

        star.rotation += star.rotSpeed;
        const currentOpacity = Math.max(0.05, star.opacity + 0.12 * Math.sin(time * 2 + star.phase));

        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0;
        let pushY = 0;
        if (dist < 140 && dist > 0) {
          const factor = (140 - dist) / 140;
          pushX = (dx / dist) * factor * 18;
          pushY = (dy / dist) * factor * 18;
        }

        ctx.save();
        ctx.translate(star.x + pushX, star.y + pushY);
        ctx.rotate(star.rotation);
        ctx.globalAlpha = currentOpacity;
        const starCol = star.isGold ? '#F7E143' : (dark ? '#21A1F7' : '#FFFFFF');
        ctx.strokeStyle = starCol;
        ctx.fillStyle = starCol;
        ctx.lineWidth = 1.2;

        const sz = star.size;
        // Mars symbol ♂
        ctx.beginPath();
        ctx.arc(0, 0, sz * 0.32, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sz * 0.22, sz * -0.22);
        ctx.lineTo(sz * 0.52, sz * -0.52);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sz * 0.52, sz * -0.52);
        ctx.lineTo(sz * 0.28, sz * -0.52);
        ctx.lineTo(sz * 0.52, sz * -0.28);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      // 3. Draw subtle floating logomarks
      floatingLogos.forEach((fl) => {
        fl.x += fl.vx;
        if (fl.x < -60) fl.x = width + 60;
        if (fl.x > width + 60) fl.x = -60;

        const targetY = fl.baseY + Math.sin(time * fl.floatSpeed * 50 + fl.phase) * fl.floatAmp;
        const dx = fl.x - mouseX;
        const dy = targetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0;
        let pushY = 0;
        if (dist < 150 && dist > 0) {
          const factor = (150 - dist) / 150;
          pushX = (dx / dist) * factor * 20;
          pushY = (dy / dist) * factor * 20;
        }

        ctx.save();
        ctx.translate(fl.x + pushX, targetY + pushY);
        ctx.globalAlpha = fl.opacity;
        if (logoImgLoaded && logoImg) {
          const sz = fl.size * 1.5;
          ctx.drawImage(logoImg, -sz / 2, -sz / 2, sz, sz);
        }
        ctx.restore();
      });

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    if (!prefersReducedMotion) {
      render();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animId) cancelAnimationFrame(animId);
    };
  });
</script>

<section
  class="ss-hero f-hero relative overflow-hidden"
  role="region"
  aria-label="Hero banner"
  style="min-height: {minHeight}; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; background: var(--gradient-brand-vertical, linear-gradient(180deg, #022057 0%, #043388 60%, #021A40 100%)); padding: 4rem 1.5rem; text-align: {align};"
>
  <!-- Interactive Wave & Particle Canvas Background -->
  <canvas bind:this={canvas} class="hero-wave-canvas" style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;"></canvas>

  <!-- Ambient Glow Backdrop -->
  <div class="f-hero-ambient-glow" style="position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1;"></div>

  <div class="f-hero-inner" style="position: relative; z-index: 2; max-width: 860px; margin: 0 auto; width: 100%;">
    {#if eyebrow}
      <div class="f-hero-eyebrow" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.20); font-size: 0.75rem; font-weight: 600; color: rgba(255, 255, 255, 0.88); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1.25rem; backdrop-filter: blur(8px);">
        <iconify-icon icon="fluent:record-16-regular" aria-hidden="true"></iconify-icon>
        {@html eyebrow}
      </div>
    {/if}

    {#if title}
      <h1 class="f-hero-title" style="font-size: clamp(2.2rem, 5vw, 3.75rem); font-weight: 800; line-height: 1.15; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 1.25rem;">
        {@html title}
      </h1>
    {/if}

    {#if subtitle}
      <p class="f-hero-subtitle" style="font-size: clamp(1rem, 2vw, 1.15rem); color: rgba(255, 255, 255, 0.8); line-height: 1.7; margin-bottom: 2rem; max-width: 680px; margin-left: auto; margin-right: auto;">
        {@html subtitle}
      </p>
    {/if}

    {#if children}
      {@render children()}
    {/if}

    {#if showBadges}
      <div class="f-hero-badges" style="display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 1.5rem;">
        <span class="f-hero-badge-item" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.825rem; font-weight: 500; color: rgba(255, 255, 255, 0.9);">
          <iconify-icon icon="fluent:checkmark-circle-24-regular" style="color: #6DC6EC;"></iconify-icon>
          Official Brand Assets
        </span>
        <span class="f-hero-badge-item" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.825rem; font-weight: 500; color: rgba(255, 255, 255, 0.9);">
          <iconify-icon icon="fluent:layer-24-regular" style="color: #6DC6EC;"></iconify-icon>
          Fluent 2 Tokens
        </span>
        <span class="f-hero-badge-item" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.825rem; font-weight: 500; color: rgba(255, 255, 255, 0.9);">
          <iconify-icon icon="fluent:accessibility-24-regular" style="color: #6DC6EC;"></iconify-icon>
          WCAG AA Compliant
        </span>
      </div>
    {/if}
  </div>
</section>
