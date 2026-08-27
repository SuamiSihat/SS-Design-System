<script>
  import { onMount } from 'svelte';

  const checklistItems = [
    { id: 'd1-1', period: 'Day 1', text: 'Receive and set up your work laptop / device' },
    { id: 'd1-2', period: 'Day 1', text: 'Set up your @suamisihat.com work email' },
    { id: 'd1-3', period: 'Day 1', text: 'Generate your mail signature using the Signature Generator', link: '/signature/' },
    { id: 'd1-4', period: 'Day 1', text: 'Log into the SSNAS Dashboard and bookmark it', link: 'https://suamisihat.myds.me' },
    { id: 'd1-5', period: 'Day 1', text: 'Complete HR paperwork and emergency contact form' },
    { id: 'd2-1', period: 'Days 2-3', text: 'Read through the Brand System - especially Logo Rules and Colour Tokens', link: '/brand-system/' },
    { id: 'd2-2', period: 'Days 2-3', text: 'Review the Brand Guidelines PDF booklets', link: '/brand-guidelines/' },
    { id: 'd2-3', period: 'Days 2-3', text: 'Download SS CAM and tools relevant to your role', link: '/tools/' },
    { id: 'd2-4', period: 'Days 2-3', text: 'Meet your team and schedule a 1-to-1 with your manager' },
    { id: 'w1-1', period: 'Week 1', text: 'Understand your KPIs and your department OKRs' },
    { id: 'w1-2', period: 'Week 1', text: 'Familiarise yourself with our products (Product Catalogue)', link: '/products/' },
    { id: 'w1-3', period: 'Week 1', text: 'Complete the data privacy and confidentiality briefing' },
    { id: 'w1-4', period: 'Week 1', text: 'Join relevant team channels (WhatsApp / email groups)' },
    { id: 'w1-5', period: 'Week 1', text: 'Share your first-week reflections with your manager' }
  ];

  let completed = $state({});

  function toggle(id) {
    completed[id] = !completed[id];
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ss-onboarding-v1', JSON.stringify(completed));
    }
  }

  let totalItems = checklistItems.length;
  let checkedCount = $derived(Object.values(completed).filter(Boolean).length);
  let progressPct = $derived(totalItems ? Math.round((checkedCount / totalItems) * 100) : 0);

  onMount(() => {
    try {
      const saved = localStorage.getItem('ss-onboarding-v1');
      if (saved) {
        completed = JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
  });
</script>

<svelte:head>
  <title>Staff Onboarding — SuamiSihat™ Design System</title>
</svelte:head>

<!-- Hero Banner -->
<div class="ob-hero" style="position:relative;overflow:hidden;background:var(--gradient-brand-vertical,#022057);padding:4.5rem 1.5rem 4rem;text-align:center;">
  <div class="f-hero-ambient-glow" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,rgba(33,161,247,0.25),transparent 70%);pointer-events:none;"></div>
  <div style="position:relative;z-index:2;max-width:700px;margin:0 auto;">
    <div style="display:inline-flex;align-items:center;gap:6px;font-size:0.75rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6DC6EC;margin-bottom:0.75rem;background:rgba(255,255,255,0.1);padding:4px 14px;border-radius:9999px;">
      <iconify-icon icon="fluent:hand-wave-24-regular"></iconify-icon> Welcome to the team
    </div>
    <h1 style="font-size:clamp(2rem,4vw,3.25rem);font-weight:800;color:#FFFFFF;margin-bottom:1rem;line-height:1.2;">
      Your First Stop at SuamiSihat™
    </h1>
    <p style="font-size:1.05rem;color:rgba(255,255,255,0.85);line-height:1.7;margin-bottom:2rem;">
      Everything you need to get up to speed. Brand orientation, tools, team structure, and a first-week checklist all in one place.
    </p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      <a href="#checklist" class="ss-btn ss-btn-primary px-4 py-2" style="border-radius:9999px;">
        <iconify-icon icon="fluent:task-list-square-ltr-24-regular"></iconify-icon> Jump to Checklist
      </a>
      <a href="#brand" class="ss-btn ss-btn-secondary px-4 py-2" style="border-radius:9999px;color:#FFFFFF;border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.08);">
        <iconify-icon icon="fluent:color-24-regular"></iconify-icon> Brand Orientation
      </a>
    </div>
  </div>
</div>

<div class="f-page-layout w-100 py-5" style="display:grid;grid-template-columns:260px 1fr;gap:2rem;width:100%;max-width:100%;padding:2.5rem clamp(1.5rem, 4vw, 4rem);box-sizing:border-box;">
  <!-- Left Sidebar Navigation -->
  <aside class="f-sidebar" style="position:sticky;top:80px;height:fit-content;background:var(--color-neutral-bg-2);padding:1.5rem;border-radius:var(--f-radius-xl);border:1px solid var(--color-neutral-stroke-1);box-shadow:var(--f-shadow-2);">
    <!-- Progress Indicator -->
    <div style="margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:6px;">
        <span>Progress</span>
        <span>{progressPct}% complete</span>
      </div>
      <div style="height:8px;background:var(--color-neutral-bg-4,#E2E8F0);border-radius:9999px;overflow:hidden;">
        <div style="width:{progressPct}%;height:100%;background:#16A34A;transition:width 0.3s ease;"></div>
      </div>
    </div>

    <div style="font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-neutral-fg-3);margin-bottom:0.75rem;">Sections</div>
    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;">
      <li><a href="#welcome" style="color:var(--color-neutral-fg-2);text-decoration:none;display:flex;align-items:center;gap:8px;font-weight:600;"><span style="width:22px;height:22px;border-radius:50%;background:var(--color-brand-subtle);color:var(--color-brand-primary);display:inline-flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">1</span>Welcome</a></li>
      <li><a href="#brand" style="color:var(--color-neutral-fg-2);text-decoration:none;display:flex;align-items:center;gap:8px;font-weight:600;"><span style="width:22px;height:22px;border-radius:50%;background:var(--color-brand-subtle);color:var(--color-brand-primary);display:inline-flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">2</span>Brand &amp; Identity</a></li>
      <li><a href="#ecosystem" style="color:var(--color-neutral-fg-2);text-decoration:none;display:flex;align-items:center;gap:8px;font-weight:600;"><span style="width:22px;height:22px;border-radius:50%;background:var(--color-brand-subtle);color:var(--color-brand-primary);display:inline-flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">3</span>Our Ecosystem</a></li>
      <li><a href="#tools-sec" style="color:var(--color-neutral-fg-2);text-decoration:none;display:flex;align-items:center;gap:8px;font-weight:600;"><span style="width:22px;height:22px;border-radius:50%;background:var(--color-brand-subtle);color:var(--color-brand-primary);display:inline-flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">4</span>Tools &amp; Systems</a></li>
      <li><a href="#checklist" style="color:var(--color-brand-primary);text-decoration:none;display:flex;align-items:center;gap:8px;font-weight:700;"><span style="width:22px;height:22px;border-radius:50%;background:var(--color-brand-primary);color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">5</span>First Week Checklist</a></li>
    </ul>
  </aside>

  <!-- Main Content -->
  <main class="f-main-content" style="padding:0;">
    <!-- 1. Welcome Section -->
    <section id="welcome" style="margin-bottom:3.5rem;scroll-margin-top:80px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
        <div style="width:40px;height:40px;border-radius:8px;background:rgba(4,51,136,.08);color:#043388;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">
          <iconify-icon icon="fluent:handshake-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-neutral-fg-1);margin:0;">Welcome to SuamiSihat™</h2>
          <p style="font-size:0.85rem;color:var(--color-neutral-fg-3);margin:0;">A note to get you started</p>
        </div>
      </div>
      <p style="font-size:0.95rem;color:var(--color-neutral-fg-2);line-height:1.7;margin-bottom:1rem;">
        We are Southeast Asia's fastest-growing men's health brand, built on the belief that every man deserves clear, dignified, and accessible healthcare. You're now part of that mission. This guide covers your brand orientation, daily tools, and a first-week checklist.
      </p>
      <p style="font-size:0.95rem;color:var(--color-neutral-fg-2);line-height:1.7;margin-bottom:1.5rem;">
        If you have questions not answered here, your line manager or <a href="mailto:hr@suamisihat.com" style="color:var(--color-brand-primary);font-weight:600;">hr@suamisihat.com</a> is your first stop.
      </p>

      <!-- Vision / Mission / Values Cards -->
      <div class="row g-3">
        <div class="col-md-4">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);">
            <div style="color:#043388;font-size:1.5rem;margin-bottom:0.5rem;"><iconify-icon icon="fluent:eye-24-regular"></iconify-icon></div>
            <strong style="color:var(--color-neutral-fg-1);font-size:1rem;display:block;margin-bottom:0.25rem;">Our Vision</strong>
            <p style="font-size:0.825rem;color:var(--color-neutral-fg-2);line-height:1.5;margin:0;">To be the most trusted men's health brand in Southeast Asia.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);">
            <div style="color:#043388;font-size:1.5rem;margin-bottom:0.5rem;"><iconify-icon icon="fluent:target-arrow-24-regular"></iconify-icon></div>
            <strong style="color:var(--color-neutral-fg-1);font-size:1rem;display:block;margin-bottom:0.25rem;">Our Mission</strong>
            <p style="font-size:0.825rem;color:var(--color-neutral-fg-2);line-height:1.5;margin:0;">Empower every touchpoint with a design language that is consistent, accessible, and purposefully built.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="cl-card p-4 h-100" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);">
            <div style="color:#BD9A73;font-size:1.5rem;margin-bottom:0.5rem;"><iconify-icon icon="fluent:star-24-regular"></iconify-icon></div>
            <strong style="color:var(--color-neutral-fg-1);font-size:1rem;display:block;margin-bottom:0.25rem;">Our Values</strong>
            <p style="font-size:0.825rem;color:var(--color-neutral-fg-2);line-height:1.5;margin:0;">Clinical precision, human-first design, and the courage to redefine what healthcare looks like.</p>
          </div>
        </div>
      </div>
    </section>

    <hr style="border:none;border-top:1px solid var(--color-neutral-stroke-1);margin:2.5rem 0;" />

    <!-- 2. Brand & Identity Section -->
    <section id="brand" style="margin-bottom:3.5rem;scroll-margin-top:80px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
        <div style="width:40px;height:40px;border-radius:8px;background:rgba(4,51,136,.08);color:#043388;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">
          <iconify-icon icon="fluent:color-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-neutral-fg-1);margin:0;">Brand &amp; Identity</h2>
          <p style="font-size:0.85rem;color:var(--color-neutral-fg-3);margin:0;">How we look and sound</p>
        </div>
      </div>
      <p style="font-size:0.95rem;color:var(--color-neutral-fg-2);line-height:1.7;margin-bottom:1.25rem;">
        Our brand centres on SS Prussian Blue (<code>#022057</code>) and SS Blue (<code>#043388</code>), accented by Azure (<code>#21A1F7</code>). Warm gold tones (Lion <code>#BD9A73</code>, Arylide <code>#E5D15C</code>) and Banana Yellow (<code>#FCE53D</code>) are used for premium accents. Never use off-brand colours in external materials.
      </p>

      <!-- 7-Stop Brand Color Strip -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(80px, 1fr));gap:8px;margin-bottom:1.5rem;">
        <div style="text-align:center;"><div style="background:#022057;height:45px;border-radius:8px;margin-bottom:4px;"></div><span style="font-size:0.7rem;font-weight:600;color:var(--color-neutral-fg-2);">Prussian</span></div>
        <div style="text-align:center;"><div style="background:#043388;height:45px;border-radius:8px;margin-bottom:4px;"></div><span style="font-size:0.7rem;font-weight:600;color:var(--color-neutral-fg-2);">SS Blue</span></div>
        <div style="text-align:center;"><div style="background:#21A1F7;height:45px;border-radius:8px;margin-bottom:4px;"></div><span style="font-size:0.7rem;font-weight:600;color:var(--color-neutral-fg-2);">Azure</span></div>
        <div style="text-align:center;"><div style="background:#6DC6EC;height:45px;border-radius:8px;margin-bottom:4px;"></div><span style="font-size:0.7rem;font-weight:600;color:var(--color-neutral-fg-2);">Malibu</span></div>
        <div style="text-align:center;"><div style="background:#BD9A73;height:45px;border-radius:8px;margin-bottom:4px;"></div><span style="font-size:0.7rem;font-weight:600;color:var(--color-neutral-fg-2);">Lion</span></div>
        <div style="text-align:center;"><div style="background:#E5D15C;height:45px;border-radius:8px;margin-bottom:4px;"></div><span style="font-size:0.7rem;font-weight:600;color:var(--color-neutral-fg-2);">Arylide</span></div>
        <div style="text-align:center;"><div style="background:#FCE53D;height:45px;border-radius:8px;margin-bottom:4px;"></div><span style="font-size:0.7rem;font-weight:600;color:var(--color-neutral-fg-2);">Banana</span></div>
      </div>

      <!-- Quick Link Cards -->
      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        <a href="/brand-system/" class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:var(--color-brand-subtle);color:var(--color-brand-primary);display:flex;align-items:center;justify-content:center;font-size:1.1rem;"><iconify-icon icon="fluent:color-24-regular"></iconify-icon></div>
            <div><strong style="color:var(--color-neutral-fg-1);font-size:0.95rem;display:block;">Brand System</strong><span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Full interactive reference &mdash; logo rules, tokens, sub-brands, download kits</span></div>
          </div>
          <iconify-icon icon="fluent:arrow-right-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
        </a>

        <a href="/brand-guidelines/" class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(33,161,247,0.1);color:#21A1F7;display:flex;align-items:center;justify-content:center;font-size:1.1rem;"><iconify-icon icon="fluent:book-open-24-regular"></iconify-icon></div>
            <div><strong style="color:var(--color-neutral-fg-1);font-size:0.95rem;display:block;">Brand Guidelines PDF</strong><span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Interior Design and Logo &amp; Concept booklets</span></div>
          </div>
          <iconify-icon icon="fluent:arrow-right-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
        </a>

        <a href="https://suamisihat.com.my/brand-assets/" target="_blank" rel="noopener noreferrer" class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(189,154,115,0.1);color:#BD9A73;display:flex;align-items:center;justify-content:center;font-size:1.1rem;"><iconify-icon icon="fluent:arrow-download-24-regular"></iconify-icon></div>
            <div><strong style="color:var(--color-neutral-fg-1);font-size:0.95rem;display:block;">Official Brand Assets</strong><span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Download logo files, colour swatches and typography packs</span></div>
          </div>
          <iconify-icon icon="fluent:open-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
        </a>
      </div>
    </section>

    <hr style="border:none;border-top:1px solid var(--color-neutral-stroke-1);margin:2.5rem 0;" />

    <!-- 3. Our Ecosystem -->
    <section id="ecosystem" style="margin-bottom:3.5rem;scroll-margin-top:80px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
        <div style="width:40px;height:40px;border-radius:8px;background:rgba(33,161,247,.08);color:#21A1F7;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">
          <iconify-icon icon="fluent:organization-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-neutral-fg-1);margin:0;">Our Ecosystem</h2>
          <p style="font-size:0.85rem;color:var(--color-neutral-fg-3);margin:0;">One master brand, one parent company and four operating subsidiaries</p>
        </div>
      </div>
      <p style="font-size:0.95rem;color:var(--color-neutral-fg-2);line-height:1.7;margin-bottom:1.5rem;">
        SuamiSihat™ is the public-facing master brand. Operations are governed by the parent company (SuamiSihat™ Holding Sdn. Bhd. / SS Health) and executed across four operating subsidiaries.
      </p>

      <div class="cl-card p-4 mb-4" style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);text-align:center;">
        <div style="padding:1rem;background:var(--color-neutral-bg-1);border-radius:var(--f-radius-lg);border:1px solid var(--color-neutral-stroke-1);display:inline-block;max-width:320px;width:100%;margin-bottom:1rem;">
          <strong style="color:var(--color-brand-primary);font-size:1.05rem;display:block;">SuamiSihat™ (Master Brand)</strong>
          <span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Public-facing master brand &amp; ecosystem</span>
        </div>
        <div style="width:2px;height:24px;background:var(--color-neutral-stroke-2);margin:0 auto 1rem;"></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(170px, 1fr));gap:0.75rem;">
          <div style="padding:0.75rem;background:var(--color-neutral-bg-1);border-radius:var(--f-radius-md);border:1px solid var(--color-neutral-stroke-1);">
            <strong style="font-size:0.85rem;display:block;color:var(--color-neutral-fg-1);">SS Health</strong>
            <span style="font-size:0.7rem;color:var(--color-neutral-fg-3);">SuamiSihat Holding Sdn. Bhd.</span>
          </div>
          <div style="padding:0.75rem;background:var(--color-neutral-bg-1);border-radius:var(--f-radius-md);border:1px solid var(--color-neutral-stroke-1);">
            <strong style="font-size:0.85rem;display:block;color:var(--color-neutral-fg-1);">SS Clinic</strong>
            <span style="font-size:0.7rem;color:var(--color-neutral-fg-3);">SuamiSihat Clinic Sdn. Bhd.</span>
          </div>
          <div style="padding:0.75rem;background:var(--color-neutral-bg-1);border-radius:var(--f-radius-md);border:1px solid var(--color-neutral-stroke-1);">
            <strong style="font-size:0.85rem;display:block;color:var(--color-neutral-fg-1);">SS Wellness</strong>
            <span style="font-size:0.7rem;color:var(--color-neutral-fg-3);">SuamiSihat Wellness Sdn. Bhd.</span>
          </div>
          <div style="padding:0.75rem;background:var(--color-neutral-bg-1);border-radius:var(--f-radius-md);border:1px solid var(--color-neutral-stroke-1);">
            <strong style="font-size:0.85rem;display:block;color:var(--color-neutral-fg-1);">SS Ecommerce</strong>
            <span style="font-size:0.7rem;color:var(--color-neutral-fg-3);">SuamiSihat Ecommerce Sdn. Bhd.</span>
          </div>
          <div style="padding:0.75rem;background:var(--color-neutral-bg-1);border-radius:var(--f-radius-md);border:1px solid var(--color-neutral-stroke-1);">
            <strong style="font-size:0.85rem;display:block;color:var(--color-neutral-fg-1);">SS Technology</strong>
            <span style="font-size:0.7rem;color:var(--color-neutral-fg-3);">SuamiSihat Technology Sdn. Bhd.</span>
          </div>
        </div>
      </div>

      <!-- Corporate Hierarchy Diagram Card -->
      <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);overflow:hidden;box-shadow:var(--f-shadow-4);">
        <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);background:var(--color-neutral-bg-3);display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:0.875rem;color:var(--color-neutral-fg-1);">Corporate Group Hierarchy &amp; Organizational Chart</strong>
          <span class="ss-badge ss-badge-brand" style="font-size:0.7rem;">Official Structure</span>
        </div>
        <div style="padding:1.5rem;background:#FFFFFF;display:flex;align-items:center;justify-content:center;">
          <img src="/assets/images/sshealth-org.svg" alt="SuamiSihat Holding Corporate Organization Hierarchy Chart" style="max-height:280px;max-width:100%;object-fit:contain;" loading="lazy" />
        </div>
        <div style="padding:1rem 1.5rem;font-size:0.8rem;color:var(--color-neutral-fg-2);line-height:1.5;">
          The holding corporate structure centralizes executive oversight, clinical review boards, creative design systems, and software engineering for all operating entities.
        </div>
      </div>
    </section>

    <hr style="border:none;border-top:1px solid var(--color-neutral-stroke-1);margin:2.5rem 0;" />

    <!-- 4. Tools & Systems -->
    <section id="tools-sec" style="margin-bottom:3.5rem;scroll-margin-top:80px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
        <div style="width:40px;height:40px;border-radius:8px;background:rgba(189,154,115,.12);color:#BD9A73;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">
          <iconify-icon icon="fluent:toolbox-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-neutral-fg-1);margin:0;">Tools &amp; Systems</h2>
          <p style="font-size:0.85rem;color:var(--color-neutral-fg-3);margin:0;">What you will use every day</p>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        <a href="https://suamisihat.myds.me" target="_blank" rel="noopener noreferrer" class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(33,161,247,0.1);color:#21A1F7;display:flex;align-items:center;justify-content:center;font-size:1.1rem;"><iconify-icon icon="fluent:gauge-24-regular"></iconify-icon></div>
            <div><strong style="color:var(--color-neutral-fg-1);font-size:0.95rem;display:block;">SSNAS Dashboard</strong><span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Main internal launchpad &mdash; shared drives, apps, and tools</span></div>
          </div>
          <iconify-icon icon="fluent:open-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
        </a>

        <a href="/signature/" class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(4,51,136,0.08);color:#043388;display:flex;align-items:center;justify-content:center;font-size:1.1rem;"><iconify-icon icon="fluent:mail-template-24-regular"></iconify-icon></div>
            <div><strong style="color:var(--color-neutral-fg-1);font-size:0.95rem;display:block;">Mail Signature Generator</strong><span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Set up your official email signature on day one</span></div>
          </div>
          <iconify-icon icon="fluent:arrow-right-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
        </a>

        <a href="/tools/" class="cl-card" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-lg);background:var(--color-neutral-bg-2);text-decoration:none;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(22,163,74,0.1);color:#16A34A;display:flex;align-items:center;justify-content:center;font-size:1.1rem;"><iconify-icon icon="fluent:camera-24-regular"></iconify-icon></div>
            <div><strong style="color:var(--color-neutral-fg-1);font-size:0.95rem;display:block;">SS CAM &amp; Creative Tools</strong><span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Download SS CAM and other approved staff utilities</span></div>
          </div>
          <iconify-icon icon="fluent:arrow-right-24-regular" style="color:var(--color-neutral-fg-2);"></iconify-icon>
        </a>
      </div>
    </section>

    <hr style="border:none;border-top:1px solid var(--color-neutral-stroke-1);margin:2.5rem 0;" />

    <!-- 5. First Week Checklist -->
    <section id="checklist" style="margin-bottom:3.5rem;scroll-margin-top:80px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
        <div style="width:40px;height:40px;border-radius:8px;background:rgba(22,163,74,.08);color:#16A34A;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">
          <iconify-icon icon="fluent:task-list-square-ltr-24-regular"></iconify-icon>
        </div>
        <div>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-neutral-fg-1);margin:0;">First Week Checklist</h2>
          <p style="font-size:0.85rem;color:var(--color-neutral-fg-3);margin:0;">Click each item to mark it done. Progress is saved in your browser.</p>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        {#each ['Day 1', 'Days 2-3', 'Week 1'] as period}
          <div style="background:var(--color-neutral-bg-2);border:1px solid var(--color-neutral-stroke-1);border-radius:var(--f-radius-xl);padding:1.5rem;box-shadow:var(--f-shadow-2);">
            <h3 style="font-size:1rem;font-weight:700;color:var(--color-neutral-fg-1);margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:1px solid var(--color-neutral-stroke-1);">{period}</h3>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              {#each checklistItems.filter(i => i.period === period) as item}
                <div 
                  class="d-flex align-items-start gap-3 p-2 rounded-3" 
                  style="cursor:pointer;background:{completed[item.id] ? 'rgba(22,163,74,0.08)' : 'transparent'};transition:background 0.2s ease;"
                  onclick={() => toggle(item.id)}
                  onkeydown={(e) => e.key === 'Enter' && toggle(item.id)}
                  role="checkbox"
                  aria-checked={!!completed[item.id]}
                  tabindex="0"
                >
                  <input type="checkbox" class="form-check-input mt-1" checked={!!completed[item.id]} tabindex="-1" style="cursor:pointer;" />
                  <span style="font-size:0.875rem;color:var(--color-neutral-fg-1);text-decoration:{completed[item.id] ? 'line-through' : 'none'};">
                    {item.text}
                    {#if item.link}
                      &nbsp;<a href={item.link} style="color:var(--color-brand-primary);font-weight:600;text-decoration:underline;" onclick={(e) => e.stopPropagation()}>Open Link &rarr;</a>
                    {/if}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>
