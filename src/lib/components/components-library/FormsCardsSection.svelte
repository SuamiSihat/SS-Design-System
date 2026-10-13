<script>
  let emailAlertsOn = $state(false);
  let pushNotificationsOn = $state(true);
</script>

<!-- 8. Inputs & Form Controls -->
<section class="cl-section" id="inputs" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">Form Controls</div>
  <h2 class="cl-section-title">Inputs &amp; Switches</h2>
  <div class="cl-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); padding:1.5rem;">
    <div class="row g-3">
      <div class="col-md-6">
        <div class="ss-input-group">
          <label class="ss-label" for="ex-name">Full Patient Name</label>
          <input class="ss-input" id="ex-name" type="text" placeholder="e.g. Ahmad bin Abdullah" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="ss-input-group">
          <label class="ss-label" for="ex-email">Work Email</label>
          <input class="ss-input" id="ex-email" type="email" placeholder="name@suamisihat.com.my" />
        </div>
      </div>
      <div class="col-12">
        <div class="ss-input-group">
          <label class="ss-label">Preferences &amp; Switches</label>
          <div style="display:flex; gap:1.5rem; flex-wrap:wrap; margin-top:4px;">
            <label class="ss-toggle-wrap" onclick={() => emailAlertsOn = !emailAlertsOn}>
              <div class="ss-toggle" class:on={emailAlertsOn}></div>
              <span class="ss-toggle-label">Email consultations alert</span>
            </label>
            <label class="ss-toggle-wrap" onclick={() => pushNotificationsOn = !pushNotificationsOn}>
              <div class="ss-toggle" class:on={pushNotificationsOn}></div>
              <span class="ss-toggle-label">Push notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 9. Cards -->
<section class="cl-section" id="cards" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">Surfaces &amp; Containers</div>
  <h2 class="cl-section-title">Service &amp; Clinical Cards</h2>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="ss-card" style="height:100%;">
        <div class="ss-card-icon" style="background:var(--color-brand-subtle); color:var(--color-brand-primary);"><iconify-icon icon="fluent:heart-pulse-24-regular" style="font-size:22px"></iconify-icon></div>
        <div class="ss-card-title">SS Health Clinic</div>
        <div class="ss-card-desc">Doctor-led private evaluation of biomarkers and personalized male recovery protocols.</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="ss-card" style="height:100%;">
        <div class="ss-card-icon" style="background:rgba(33,161,247,0.1); color:var(--color-text-accent);"><iconify-icon icon="fluent:store-microsoft-24-regular" style="font-size:22px"></iconify-icon></div>
        <div class="ss-card-title">SS Ecommerce</div>
        <div class="ss-card-desc">Direct-to-consumer discretion, discrete packaging, and verified logistics.</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="ss-card" style="height:100%;">
        <div class="ss-card-icon" style="background:rgba(252,229,61,0.18); color:#7a6200;"><iconify-icon icon="fluent:shield-checkmark-24-regular" style="font-size:22px"></iconify-icon></div>
        <div class="ss-card-title">ANDROLAB RX</div>
        <div class="ss-card-desc">Prescription clinical solutions, NPRA compliant pharmaceutical therapies.</div>
      </div>
    </div>
  </div>
</section>
