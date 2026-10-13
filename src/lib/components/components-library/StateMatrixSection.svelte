<!-- 18. Fluent 2 State Matrix Table -->
<section class="cl-section" id="state-matrix" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="cl-section-eyebrow">UX Architecture</div>
  <h2 class="cl-section-title">Fluent 2 State Matrix</h2>
  <p class="cl-section-desc">Unified interaction matrix enforced across web and mobile surfaces.</p>

  <div class="cl-card" style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow-x:auto;">
    <table style="width:100%; border-collapse:collapse; font-size:0.825rem; text-align:left;">
      <thead>
        <tr style="border-bottom:1px solid var(--color-neutral-stroke-1); background:var(--color-neutral-bg-3);">
          <th style="padding:10px 14px; font-weight:700;">Component State</th>
          <th style="padding:10px 14px; font-weight:700;">Surface Feedback</th>
          <th style="padding:10px 14px; font-weight:700;">Elevation / Shadow</th>
          <th style="padding:10px 14px; font-weight:700;">Accessibility Trigger</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
          <td style="padding:10px 14px;"><strong>Rest / Normal</strong></td>
          <td style="padding:10px 14px;">Default token color &amp; 100% opacity</td>
          <td style="padding:10px 14px;"><code>--f-shadow-2</code></td>
          <td style="padding:10px 14px;">WCAG AA contrast &ge; 4.5:1</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
          <td style="padding:10px 14px;"><strong>Hover</strong></td>
          <td style="padding:10px 14px;"><code>--color-neutral-bg-4</code> (+8% brightness)</td>
          <td style="padding:10px 14px;"><code>--f-shadow-4</code> + translateY(-1px)</td>
          <td style="padding:10px 14px;">Mouse pointer cursor</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
          <td style="padding:10px 14px;"><strong>Pressed / Active</strong></td>
          <td style="padding:10px 14px;">Scale(0.98) tactile spring bounce</td>
          <td style="padding:10px 14px;"><code>--f-shadow-2</code></td>
          <td style="padding:10px 14px;">Haptic click feedback</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-neutral-stroke-1);">
          <td style="padding:10px 14px;"><strong>Focus (Keyboard)</strong></td>
          <td style="padding:10px 14px;">2px solid <code>#21A1F7</code> Azure ring</td>
          <td style="padding:10px 14px;">2px offset outline</td>
          <td style="padding:10px 14px;">Tab keyboard navigation</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;"><strong>Disabled</strong></td>
          <td style="padding:10px 14px;">Opacity 0.45 &amp; pointer-events: none</td>
          <td style="padding:10px 14px;">None</td>
          <td style="padding:10px 14px;"><code>aria-disabled="true"</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
