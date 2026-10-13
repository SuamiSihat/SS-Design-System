<script>
  let selectedEntity = $state('SSH'); // 'SSH' | 'SSC' | 'SSW' | 'SSE' | 'SST'
  const entityData = {
    SSH: { name: 'SuamiSihat Holding Sdn Bhd (SS Health)', role: 'Owns the SuamiSihat® brand and its trademarks', color: '#043388', accent: '#21A1F7', status: 'Parent company', tag: '01-SSH' },
    SSC: { name: 'SuamiSihat Clinic', role: 'Runs the clinics and telehealth', color: '#022057', accent: '#6DC6EC', status: 'Clinical Practice', tag: '02-SSC' },
    SSW: { name: 'SuamiSihat Wellness', role: 'Supplements and everyday health products', color: '#043388', accent: '#FCE53D', status: 'Consumer Care', tag: '03-SSW' },
    SSE: { name: 'SuamiSihat Ecommerce', role: 'Online sales and delivery', color: '#022057', accent: '#22C55E', status: 'Digital Retail', tag: '04-SSE' },
    SST: { name: 'SuamiSihat Technology', role: 'Apps, websites and internal systems', color: '#043388', accent: '#A855F7', status: 'Technology', tag: '05-SST' }
  };
</script>

<!-- ================================================================
     CHAPTER 3: INTERACTIVE GROUP ARCHITECTURE FLOW
     ================================================================ -->
<section id="architecture" class="f-section-block" aria-label="Group Architecture Flow">
  <div class="f-section-overline">
    <span class="f-overline-label">Our companies</span>
    <span class="f-overline-rule" aria-hidden="true"></span>
  </div>

  <div class="f-section-head">
    <h2 class="f-section-title">One brand, five companies</h2>
    <p class="f-section-subtitle">
      SuamiSihat Holding Sdn. Bhd. owns the SuamiSihat® brand and uses the SS Health logo. Four companies use the brand: SS Clinic, SS Wellness, SS Ecommerce and SS Technology.
    </p>
  </div>

  <div class="f-bento-card f-arch-flow-card">
    <div class="f-card-shimmer-highlight" aria-hidden="true"></div>
    
    <!-- Interactive Architecture Tree -->
    <div class="f-arch-tree-container">
      <!-- Root Node (SSH Holding) -->
      <div class="f-arch-root-wrapper">
        <button 
          type="button" 
          class="f-arch-node-btn root {selectedEntity === 'SSH' ? 'active' : ''}" 
          onclick={() => { selectedEntity = 'SSH'; }}
        >
          <div class="f-node-tag">Parent company</div>
          <div class="f-node-title">
            <iconify-icon icon="fluent:building-bank-24-filled" style="color:var(--color-text-accent);"></iconify-icon>
            <span>SuamiSihat Holding Sdn Bhd (SS Health)</span>
          </div>
          <div class="f-node-sub">Owns the brand · SS Health logo</div>
        </button>
      </div>

      <!-- Glowing Connecting Data Bus Lines -->
      <div class="f-arch-bus-lines" aria-hidden="true">
        <div class="f-bus-vertical-stem"></div>
        <div class="f-bus-horizontal-bar"></div>
        <div class="f-bus-drop-lines">
          <span class="drop-line"></span>
          <span class="drop-line"></span>
          <span class="drop-line"></span>
          <span class="drop-line"></span>
        </div>
      </div>

      <!-- 4 Subsidiary Leaf Nodes -->
      <div class="f-arch-leaves-grid">
        <button 
          type="button" 
          class="f-arch-node-btn leaf {selectedEntity === 'SSC' ? 'active' : ''}" 
          onclick={() => { selectedEntity = 'SSC'; }}
        >
          <div class="f-leaf-badge" style="--leaf: #6DC6EC;">02-SSC</div>
          <div class="f-leaf-name">SS Clinic</div>
          <div class="f-leaf-desc">Clinics and telehealth</div>
        </button>

        <button 
          type="button" 
          class="f-arch-node-btn leaf {selectedEntity === 'SSW' ? 'active' : ''}" 
          onclick={() => { selectedEntity = 'SSW'; }}
        >
          <div class="f-leaf-badge" style="--leaf: #FCE53D;">03-SSW</div>
          <div class="f-leaf-name">SS Wellness</div>
          <div class="f-leaf-desc">Supplements and daily care</div>
        </button>

        <button 
          type="button" 
          class="f-arch-node-btn leaf {selectedEntity === 'SSE' ? 'active' : ''}" 
          onclick={() => { selectedEntity = 'SSE'; }}
        >
          <div class="f-leaf-badge" style="--leaf: #22C55E;">04-SSE</div>
          <div class="f-leaf-name">SS Ecommerce</div>
          <div class="f-leaf-desc">Online shop and delivery</div>
        </button>

        <button 
          type="button" 
          class="f-arch-node-btn leaf {selectedEntity === 'SST' ? 'active' : ''}" 
          onclick={() => { selectedEntity = 'SST'; }}
        >
          <div class="f-leaf-badge" style="--leaf: #A855F7;">05-SST</div>
          <div class="f-leaf-name">SS Technology</div>
          <div class="f-leaf-desc">Apps, websites and systems</div>
        </button>
      </div>
    </div>

    <!-- Entity Inspector Panel -->
    <div class="f-arch-inspector-box">
      <div class="f-inspector-left">
        <div class="f-inspector-entity-badge">{entityData[selectedEntity].tag}</div>
        <div>
          <h3 class="f-inspector-entity-name">{entityData[selectedEntity].name}</h3>
          <p class="f-inspector-entity-role">{entityData[selectedEntity].role}</p>
        </div>
      </div>

      <div class="f-inspector-actions">
        <span class="f-inspector-status-pill">
          <span class="f-pulse-dot-green"></span> {entityData[selectedEntity].status}
        </span>
        <a href="/brand-system/#subbrand" class="f-inspector-link-btn">
          See the company brands &rarr;
        </a>
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

  @media (max-width: 480px) {
    .f-section-block {
      padding: 3.5rem 1.25rem 2rem;
    }
    .f-section-head {
      max-width: 100%;
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

  /* Manifesto Grid & Beacon */

  .f-pulse-dot-green {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22C55E;
    box-shadow: 0 0 8px #22C55E;
    animation: f-dot-pulse 1.8s infinite;
    display: inline-block;
  }

  @keyframes f-dot-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: 0.6; }
  }

  /* ================================================================
     CHAPTER 3: INTERACTIVE ARCHITECTURE TREE & GLOWING DATA BUS
     ================================================================ */
  .f-arch-flow-card {
    padding: 2.5rem;
  }

  .f-arch-tree-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .f-arch-root-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .f-arch-node-btn {
    border: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }

  .f-arch-node-btn.root {
    background: linear-gradient(135deg, #022057 0%, #043388 100%);
    color: #FFFFFF;
    padding: 1.25rem 2rem;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(4, 51, 136, 0.35);
    border: 2px solid transparent;
  }

  .f-arch-node-btn.root.active {
    border-color: #21A1F7;
    box-shadow: 0 0 0 4px rgba(33, 161, 247, 0.3), 0 12px 32px rgba(4, 51, 136, 0.5);
    transform: scale(1.03);
  }

  .f-node-tag {
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6DC6EC;
    margin-bottom: 4px;
  }

  .f-node-title {
    font-size: 1.15rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .f-node-sub {
    font-size: 0.775rem;
    margin-top: 2px;
  }

  /* Data Bus Lines */
  .f-arch-bus-lines {
    width: 100%;
    max-width: 800px;
    height: 48px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .f-bus-vertical-stem {
    width: 2px;
    height: 24px;
    background: linear-gradient(180deg, #21A1F7, #6DC6EC);
    box-shadow: 0 0 8px #21A1F7;
  }

  .f-bus-horizontal-bar {
    width: 80%;
    height: 2px;
    background: #21A1F7;
    box-shadow: 0 0 8px #21A1F7;
  }

  .f-bus-drop-lines {
    width: 80%;
    display: flex;
    justify-content: space-between;
    height: 22px;
  }

  .drop-line {
    width: 2px;
    height: 100%;
    background: #21A1F7;
    box-shadow: 0 0 8px #21A1F7;
  }

  /* 4 Subsidiary Leaves Grid */
  .f-arch-leaves-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: 920px;
  }

  @media (max-width: 768px) {
    .f-arch-bus-lines {
      display: none;
    }
    .f-arch-leaves-grid {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 1rem;
    }
  }

  .f-arch-node-btn.leaf {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1.5px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.1));
    border-radius: 14px;
    padding: 1rem;
    text-align: center;
  }

  :global([data-theme="dark"]) .f-arch-node-btn.leaf {
    background: rgba(10, 14, 22, 0.6);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .f-arch-node-btn.leaf:hover {
    transform: translateY(-3px);
    border-color: var(--color-brand-primary, #043388);
  }

  .f-arch-node-btn.leaf.active {
    border-color: #21A1F7;
    background: rgba(33, 161, 247, 0.08);
    box-shadow: 0 0 0 3px rgba(33, 161, 247, 0.25);
    transform: translateY(-3px);
  }

  .f-leaf-badge {
    font-size: 0.725rem;
    font-weight: 800;
    margin-bottom: 2px;
    color: var(--color-neutral-fg-1);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  /* Brand colour shown as a marker; the label keeps neutral, AA-safe text */
  .f-leaf-badge::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--leaf, var(--ss-azure));
  }

  .f-leaf-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-strong);
  }

  .f-leaf-desc {
    font-size: 0.725rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  /* Entity Inspector */
  .f-arch-inspector-box {
    background: var(--color-neutral-bg-1, #FCFAF6);
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.08));
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  :global([data-theme="dark"]) .f-arch-inspector-box {
    background: rgba(10, 14, 22, 0.7);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .f-inspector-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .f-inspector-entity-badge {
    font-size: 0.85rem;
    font-weight: 800;
    padding: 6px 12px;
    border-radius: 8px;
    background: var(--color-brand-primary, #043388);
    color: #FFFFFF;
  }

  :global([data-theme="dark"]) .f-inspector-entity-badge {
    background: #21A1F7;
    color: #000000;
  }

  .f-inspector-entity-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-strong);
    margin: 0;
  }

  .f-inspector-entity-role {
    font-size: 0.825rem;
    color: var(--text-secondary);
    margin: 2px 0 0;
  }

  .f-inspector-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .f-inspector-status-pill {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .f-inspector-link-btn {
    font-size: 0.825rem;
    font-weight: 700;
    color: var(--color-brand-primary);
    text-decoration: none !important;
    padding: 6px 14px;
    border-radius: 8px;
    background: rgba(4, 51, 136, 0.08);
    transition: all 0.2s ease;
  }

  :global([data-theme="dark"]) .f-inspector-link-btn {
    color: var(--color-text-accent);
    background: rgba(33, 161, 247, 0.15);
  }

  .f-inspector-link-btn:hover {
    background: var(--color-action-bg); color: var(--color-on-action);
  }

  :global([data-theme="dark"]) .f-inspector-link-btn:hover {
    background: #21A1F7;
    color: #000000;
  }
</style>
