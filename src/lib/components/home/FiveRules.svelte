<script>
  const rules = [
    { icon: 'fluent:image-24-regular', title: 'Use the original logo', text: 'Download the file. Never redraw, stretch or recolour it.' },
    { icon: 'fluent:resize-24-regular', title: 'Give the logo space', text: 'Keep an empty margin around it so it can breathe.' },
    { icon: 'fluent:color-24-regular', title: 'Keep the background light', text: 'About 60% light background, 30% blue, 10% bright accent.' },
    { icon: 'fluent:text-font-24-regular', title: 'Write SuamiSihat®', text: 'One word, capital S twice, with the ® mark.' },
    { icon: 'fluent:chat-24-regular', title: 'Speak with respect', text: 'Be accurate and kind. Never shame the person reading.' }
  ];
</script>

<section id="rules" class="hm-block" aria-labelledby="rules-title">
  <div class="hm-head">
    <p class="hm-eyebrow">The short version</p>
    <h2 id="rules-title" class="hm-title">Five rules that cover most jobs</h2>
    <p class="hm-sub">If you remember nothing else, remember these.</p>
  </div>

  <ol class="hm-rules">
    {#each rules as r, i}
      <li class="hm-rule">
        <span class="hm-rule-num" aria-hidden="true">{i + 1}</span>
        <span class="hm-rule-icon"><iconify-icon icon={r.icon} aria-hidden="true"></iconify-icon></span>
        <h3 class="hm-rule-title">{r.title}</h3>
        <p class="hm-rule-text">{r.text}</p>
      </li>
    {/each}
  </ol>

  <p class="hm-more"><a href="/brand-guidelines/">Read the full brand guides &rarr;</a></p>
</section>

<style>
  .hm-block { padding: 3rem clamp(1.5rem, 5vw, 5rem) 1.5rem; }
  .hm-head { margin-bottom: 1.75rem; }
  .hm-eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-text-accent);
  }
  .hm-title {
    margin: 0;
    font-size: clamp(1.75rem, 3.6vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-strong);
  }
  .hm-sub { margin: 0.6rem 0 0; font-size: 1rem; color: var(--text-secondary); }
  .hm-rules {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
  @media (max-width: 1200px) { .hm-rules { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) { .hm-rules { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) {
    .hm-block { padding: 2.5rem 1.25rem 1rem; }
    .hm-rules { grid-template-columns: 1fr; }
  }
  .hm-rule {
    position: relative;
    padding: 1.25rem;
    border-radius: 16px;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.1));
    background: var(--color-neutral-bg-1, #FCFAF6);
  }
  .hm-rule-num {
    position: absolute;
    top: 0.9rem;
    right: 1rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-secondary);
    opacity: 0.45;
  }
  .hm-rule-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-bottom: 0.75rem;
    border-radius: 12px;
    font-size: 1.25rem;
    background: rgba(4, 51, 136, 0.08);
    color: var(--color-brand-primary, #043388);
  }
  :global([data-theme="dark"]) .hm-rule-icon {
    background: rgba(33, 161, 247, 0.15);
    color: #6DC6EC;
  }
  .hm-rule-title { margin: 0 0 0.35rem; font-size: 1rem; font-weight: 700; color: var(--text-strong); }
  .hm-rule-text { margin: 0; font-size: 0.875rem; line-height: 1.55; color: var(--text-secondary); }
  .hm-more { margin: 1.25rem 0 0; font-size: 0.95rem; font-weight: 700; }
</style>
