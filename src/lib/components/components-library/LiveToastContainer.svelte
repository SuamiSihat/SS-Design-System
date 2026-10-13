<script>
  let {
    toasts = [],
    onRemoveToast = () => {}
  } = $props();
</script>

<!-- ─── Floating Live Toast Container (Bottom-Right) ───────────────── -->
<div 
  class="ss-live-toast-container" 
  style="position:fixed; bottom:24px; right:24px; z-index:99999; display:flex; flex-direction:column; gap:10px; max-width:380px; width:calc(100vw - 48px); pointer-events:none;"
  aria-live="polite"
>
  {#each toasts as toast (toast.id)}
    <div 
      class="ss-toast ss-toast-{toast.type}" 
      style="pointer-events:auto; box-shadow:0 12px 32px rgba(0,0,0,0.25); animation: f-fade-up 0.25s cubic-bezier(0.16, 1, 0.3, 1);"
      role="status"
    >
      <iconify-icon 
        icon={toast.type === 'success' ? 'fluent:checkmark-circle-24-filled' : toast.type === 'warning' ? 'fluent:warning-24-filled' : toast.type === 'error' ? 'fluent:error-circle-24-filled' : 'fluent:info-24-filled'}
        style="font-size:1.3rem; flex-shrink:0;"
      ></iconify-icon>
      <div class="ss-toast-content" style="flex:1;">
        <div class="ss-toast-title" style="font-weight:700;">{toast.title}</div>
        <div class="ss-toast-msg" style="font-size:0.775rem;">{toast.msg}</div>
      </div>
      <button 
        type="button" 
        class="ss-toast-close" 
        onclick={() => onRemoveToast(toast.id)}
        aria-label="Dismiss toast"
      >
        <iconify-icon icon="fluent:dismiss-16-regular"></iconify-icon>
      </button>
    </div>
  {/each}
</div>
