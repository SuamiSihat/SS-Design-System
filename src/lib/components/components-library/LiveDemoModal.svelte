<script>
  let {
    isOpen = $bindable(false),
    spawnToast = () => {}
  } = $props();

  function closeModal() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div 
    class="ss-lightbox open" 
    style="display:flex; z-index:99999;"
    onclick={closeModal}
    onkeydown={(e) => e.key === 'Escape' && closeModal()}
    role="presentation"
  >
    <div 
      class="ss-modal" 
      style="max-width:440px; width:90%; background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-2); border-radius:var(--f-radius-2xl); padding:2rem; box-shadow:0 24px 60px rgba(0,0,0,0.4); animation: f-fade-up 0.2s ease;"
      onclick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalDemoTitle"
      tabindex="-1"
    >
      <div style="width:40px; height:4px; border-radius:2px; background:var(--color-neutral-stroke-2); margin:0 auto 1.25rem;"></div>
      <div class="d-flex align-items-center gap-2 mb-2">
        <div style="width:36px; height:36px; border-radius:8px; background:rgba(33,161,247,0.12); color:var(--color-text-accent); display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
          <iconify-icon icon="fluent:calendar-checkmark-24-regular"></iconify-icon>
        </div>
        <h3 id="modalDemoTitle" style="font-size:1.2rem; font-weight:800; color:var(--color-neutral-fg-1); margin:0;">Book Clinical Consultation</h3>
      </div>
      <p style="font-size:0.875rem; color:var(--color-neutral-fg-2); line-height:1.6; margin-bottom:1.5rem;">
        Confirm your private appointment with Dr. Ahmad Zaki at SuamiSihat Clinic (Mid Valley). An SMS confirmation and encrypted digital pass will be issued.
      </p>
      <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
        <button 
          type="button" 
          class="ss-btn ss-btn-secondary ss-btn-sm" 
          onclick={() => { isOpen = false; spawnToast('info', 'Appointment Cancelled', 'No consultation was scheduled.'); }}
        >
          Cancel
        </button>
        <button 
          type="button" 
          class="ss-btn ss-btn-primary ss-btn-sm" 
          onclick={() => { isOpen = false; spawnToast('success', 'Consultation Confirmed!', 'Appointment booked with Dr. Ahmad Zaki for 14 Aug at 10:00 AM.'); }}
        >
          <iconify-icon icon="fluent:checkmark-circle-24-regular"></iconify-icon> Confirm Booking
        </button>
      </div>
    </div>
  </div>
{/if}
