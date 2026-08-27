<script>
  /** @type {{ name: string, hex: string, role: string, allocation?: string, isDarkText?: boolean }} */
  let { name, hex, role, allocation = '', isDarkText = false } = $props();

  let copied = $state(false);

  async function copyHex() {
    try {
      await navigator.clipboard.writeText(hex);
      copied = true;
      setTimeout(() => (copied = false), 1800);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  }
</script>

<div 
  class="f-color-card" 
  role="button"
  tabindex="0"
  onclick={copyHex}
  onkeydown={(e) => e.key === 'Enter' && copyHex()}
  style="cursor: pointer; position: relative; border-radius: var(--f-radius-large, 12px); overflow: hidden; border: 1px solid var(--color-neutral-stroke-1, #E2E8F0); background: var(--color-layer-card, #FFFFFF); box-shadow: var(--f-shadow-2); transition: transform 0.2s ease, box-shadow 0.2s ease;"
>
  <div 
    style="height: 110px; background-color: {hex}; display: flex; flex-direction: column; justify-content: space-between; padding: 0.75rem; color: {isDarkText ? '#1C1C1C' : '#FFFFFF'}; position: relative;"
  >
    {#if allocation}
      <span style="font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; background: {isDarkText ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)'}; padding: 2px 6px; border-radius: 4px; align-self: flex-start;">
        {allocation}
      </span>
    {/if}

    <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
      <span style="font-family: monospace; font-size: 0.85rem; font-weight: 700;">{hex}</span>
      <span style="font-size: 0.75rem; opacity: 0.9;">
        {copied ? '✓ Copied!' : 'Click to copy'}
      </span>
    </div>
  </div>

  <div style="padding: 0.85rem 1rem;">
    <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-neutral-fg-1, #1C1C1C); margin-bottom: 0.25rem;">
      {name}
    </div>
    <div style="font-size: 0.8rem; color: var(--color-neutral-fg-2, #64748B); line-height: 1.4;">
      {role}
    </div>
  </div>
</div>
