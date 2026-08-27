<script>
  /** @type {{ title: string, subtitle?: string, svgPath: string, pngPath?: string, defaultDark?: boolean }} */
  let { title, subtitle = '', svgPath, pngPath = '', defaultDark = false } = $props();

  let overrideDark = $state(null);
  let isDark = $derived(overrideDark !== null ? overrideDark : defaultDark);
</script>

<div class="f-asset-card" style="border: 1px solid var(--color-neutral-stroke-1, #E2E8F0); border-radius: var(--f-radius-large, 12px); overflow: hidden; background: var(--color-layer-card, #FFFFFF); box-shadow: var(--f-shadow-2); display: flex; flex-direction: column;">
  <!-- Preview Stage -->
  <div 
    style="height: 180px; display: flex; align-items: center; justify-content: center; padding: 1.5rem; transition: background 0.2s ease; position: relative; background-color: {isDark ? '#090D16' : '#F8FAFC'};"
  >
    <img src={svgPath} alt={title} style="max-height: 90px; max-width: 80%; width: auto; height: auto; object-fit: contain;" />

    <!-- Canvas Mode Toggle -->
    <button 
      type="button" 
      onclick={() => (overrideDark = !isDark)}
      title="Toggle light/dark canvas"
      style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 4px 6px; color: #FFFFFF; font-size: 0.7rem; cursor: pointer; display: flex; align-items: center; gap: 4px;"
    >
      <iconify-icon icon={isDark ? "lucide:sun" : "lucide:moon"} width="13"></iconify-icon>
      {isDark ? 'Light' : 'Dark'}
    </button>
  </div>

  <!-- Card Info & Download CTAs -->
  <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem;">
    <div>
      <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-neutral-fg-1, #1C1C1C);">{title}</div>
      {#if subtitle}
        <div style="font-size: 0.8rem; color: var(--color-neutral-fg-2, #64748B);">{subtitle}</div>
      {/if}
    </div>

    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <a 
        href={svgPath} 
        download 
        class="btn btn-sm"
        style="flex: 1; min-width: 70px; background: var(--color-brand-subtle, #EBF5FE); color: var(--color-brand-primary, #043388); font-weight: 600; font-size: 0.75rem; border: 1px solid var(--color-brand-stroke, #6DC6EC); border-radius: 6px; text-decoration: none; text-align: center; padding: 0.35rem 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.25rem;"
      >
        <iconify-icon icon="lucide:download" width="13"></iconify-icon> SVG
      </a>
      {#if pngPath}
        <a 
          href={pngPath} 
          download 
          class="btn btn-sm"
          style="flex: 1; min-width: 70px; background: var(--color-neutral-subtle, #F1F5F9); color: var(--color-neutral-fg-1, #1C1C1C); font-weight: 600; font-size: 0.75rem; border: 1px solid var(--color-neutral-stroke-1, #CBD5E1); border-radius: 6px; text-decoration: none; text-align: center; padding: 0.35rem 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.25rem;"
        >
          <iconify-icon icon="lucide:image" width="13"></iconify-icon> PNG
        </a>
      {/if}
    </div>
  </div>
</div>
