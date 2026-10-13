<!-- Technical material lives here, away from the staff-facing sections above. -->
<section id="for-designers" class="hm-block" aria-labelledby="for-designers-title">
  <div class="hm-band">
    <div>
      <p class="hm-eyebrow">For designers and developers</p>
      <h2 id="for-designers-title" class="hm-title">Building a page or an app?</h2>
      <p class="hm-sub">Ready-made buttons, colour codes for CSS, Tailwind and Flutter, and the full colour and pattern rules.</p>
    </div>
    <div class="hm-actions">
      <a class="hm-btn hm-btn-primary" href="/components/">Open the components</a>
      <a class="hm-btn" href="/brand-system/">Open the full brand page</a>
    </div>
  </div>
</section>

<style>
  .hm-block { padding: 3rem clamp(1.5rem, 5vw, 5rem) 4rem; }
  @media (max-width: 480px) { .hm-block { padding: 2.5rem 1.25rem 3rem; } }
  .hm-band {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 2rem clamp(1.25rem, 3vw, 2.25rem);
    border-radius: 20px;
    background: linear-gradient(135deg, #022057 0%, #043388 100%);
    color: #FFFFFF;
  }
  .hm-eyebrow {
    margin: 0 0 0.4rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #6DC6EC;
  }
  .hm-title { margin: 0; font-size: clamp(1.4rem, 2.8vw, 1.9rem); font-weight: 800; color: #FFFFFF; }
  .hm-sub { margin: 0.5rem 0 0; max-width: 560px; font-size: 0.95rem; line-height: 1.6; color: rgba(255, 255, 255, 0.85); }
  .hm-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .hm-btn {
    display: inline-flex;
    align-items: center;
    padding: 11px 22px;
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 700;
    color: #FFFFFF;
    border: 1.5px solid rgba(255, 255, 255, 0.45);
    text-decoration: none !important;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .hm-btn:hover { transform: translateY(-2px); border-color: #6DC6EC; }
  .hm-btn-primary { background: #21A1F7; border-color: #21A1F7; color: #022057; }
</style>
