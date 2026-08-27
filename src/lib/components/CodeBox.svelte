<script>
  /** @type {{ code: string, language?: string, title?: string }} */
  let { code, language = 'css', title = '' } = $props();

  let copied = $state(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="f-code-box" style="border-radius: var(--f-radius-medium, 8px); overflow: hidden; border: 1px solid var(--color-neutral-stroke-1, #334155); background: #090D16; color: #F8FAFC; margin: 1rem 0;">
  <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; background: #0F172A; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; color: #94A3B8;">
    <span style="font-weight: 600; text-transform: uppercase;">{title || language}</span>
    <button 
      type="button" 
      onclick={copyCode}
      style="background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #E2E8F0; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.3rem;"
    >
      <iconify-icon icon={copied ? "lucide:check" : "lucide:copy"} width="14"></iconify-icon>
      {copied ? 'Copied' : 'Copy'}
    </button>
  </div>
  <pre style="margin: 0; padding: 1rem; overflow-x: auto; font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.5; color: #E2E8F0;"><code>{code}</code></pre>
</div>
