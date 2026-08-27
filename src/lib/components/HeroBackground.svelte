<script>
  import { onMount } from 'svelte';

  /** @type {{ isStandbyMode?: boolean, title?: string, subtitle?: string }} */
  let {
    isStandbyMode = false,
    title = "SuamiSihat™ Brand Assets & Design System",
    subtitle = "The authoritative single source of truth for brand guidelines, vector marks, W3C design tokens, and multi-platform digital health collateral."
  } = $props();

  let canvas = $state();
  let animId;

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.2,
      isGold: Math.random() > 0.4
    }));

    let step = 0;

    function render() {
      step += 0.004;
      ctx.clearRect(0, 0, width, height);

      // 60% Dominant Base
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#090D16');
      baseGrad.addColorStop(0.5, '#022057');
      baseGrad.addColorStop(1, '#043388');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 30% Structural Fluid Waves
      ctx.save();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yOffset = height * 0.6 + i * 35;
        ctx.moveTo(0, height);
        ctx.lineTo(0, yOffset);

        for (let x = 0; x <= width; x += 20) {
          const y = yOffset + Math.sin(x * 0.003 + step + i) * 30 + Math.cos(x * 0.001 - step) * 18;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = i === 0 ? 'rgba(4, 51, 136, 0.45)' : i === 1 ? 'rgba(2, 32, 87, 0.6)' : 'rgba(9, 13, 22, 0.85)';
        ctx.fill();
      }
      ctx.restore();

      // 10% Gold & Azure Radiant Energy Nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold ? `rgba(247, 225, 67, ${p.alpha})` : `rgba(33, 161, 247, ${p.alpha * 0.8})`;
        ctx.shadowColor = p.isGold ? '#F7E143' : '#21A1F7';
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  });
</script>

<div class="f-hero relative w-full min-h-[520px] flex items-center justify-center overflow-hidden" style="background: #090D16; position: relative; padding: 4rem 1.5rem; text-align: center; color: #FFFFFF;">
  <canvas bind:this={canvas} style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;"></canvas>

  <div class="f-hero-content" style="position: relative; z-index: 2; max-width: 900px; margin: 0 auto; padding: 2.5rem; background: rgba(9, 13, 22, 0.72); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 1.25rem; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); box-shadow: 0 20px 45px rgba(0,0,0,0.5);">
    <div style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #21A1F7; background: rgba(33, 161, 247, 0.12); border: 1px solid rgba(33, 161, 247, 0.35); padding: 0.35rem 0.9rem; border-radius: 9999px; margin-bottom: 1.25rem;">
      <span style="width: 8px; height: 8px; border-radius: 50%; background: #21A1F7; display: inline-block;"></span>
      {isStandbyMode ? 'STANDBY & REPOSITORY READY' : 'OFFICIAL DESIGN SYSTEM v3.4.0 (SVELTEKIT)'}
    </div>

    <h1 style="font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; color: #FFFFFF; line-height: 1.15; margin-bottom: 1rem; letter-spacing: -0.02em;">
      {title}
    </h1>
    <p style="color: #CBD5E1; font-size: clamp(0.95rem, 2vw, 1.125rem); line-height: 1.6; margin-bottom: 2rem; max-width: 720px; margin-left: auto; margin-right: auto;">
      {subtitle}
    </p>

    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">
      <a href="/components/" style="background: #21A1F7; color: #022057; font-weight: 700; padding: 0.85rem 1.75rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 14px rgba(33, 161, 247, 0.35); transition: all 0.2s ease;">
        Explore Components →
      </a>
      <a href="/brand-guidelines/" style="background: rgba(255, 255, 255, 0.1); color: #FFFFFF; font-weight: 600; padding: 0.85rem 1.75rem; border-radius: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.2); text-decoration: none; backdrop-filter: blur(8px); transition: all 0.2s ease;">
        Brand Guidelines
      </a>
      <a href="/brand-system/" style="background: rgba(255, 255, 255, 0.1); color: #FFFFFF; font-weight: 600; padding: 0.85rem 1.75rem; border-radius: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.2); text-decoration: none; backdrop-filter: blur(8px); transition: all 0.2s ease;">
        Design Tokens
      </a>
    </div>
  </div>
</div>
