<script>
  import { contrastRatio } from '$lib/utils/contrast.js';
  import { SECTIONS } from '$lib/products/index.js';

  let { data } = $props();
  const p = $derived(data.product);

  /** 60:30:10 roles in display order */
  const roles = $derived([
    { key: 'foundation', label: 'Foundation', ...p.colorScheme.foundation },
    { key: 'structure', label: 'Structure', ...p.colorScheme.structure },
    { key: 'accent', label: 'Accent', ...p.colorScheme.accent }
  ]);

  let copied = $state('');
  async function copyHex(hex) {
    try {
      await navigator.clipboard.writeText(hex);
      copied = hex;
      setTimeout(() => (copied = ''), 1600);
    } catch {
      copied = '';
    }
  }

  /** @type {HTMLDialogElement | undefined} */
  let dialog = $state();
  let current = $state(0);
  function openImage(i) {
    current = i;
    dialog?.showModal();
  }
  function step(d) {
    current = (current + d + p.images.length) % p.images.length;
  }

  const ratioLabel = (pair) => {
    const r = contrastRatio(pair.text, pair.background);
    return { value: r.toFixed(1), level: r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : 'AA large' };
  };

  const fileName = (f) => f.split('/').pop();
</script>

<svelte:head>
  <title>{p.name} brand guideline · SuamiSihat Design System</title>
  <meta name="description" content={p.definition.summary} />
</svelte:head>

<!-- Hero -->
<header class="pb-hero" style="--hero-from:{p.hero.from}; --hero-to:{p.hero.to}; --pattern:url('{p.pattern.file}');">
  <div class="pb-hero-pattern" aria-hidden="true"></div>
  <div class="pb-hero-inner">
    <nav class="pb-crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <iconify-icon icon="fluent:chevron-right-12-regular" aria-hidden="true"></iconify-icon>
      <a href="/products/">Products</a>
      <iconify-icon icon="fluent:chevron-right-12-regular" aria-hidden="true"></iconify-icon>
      <span aria-current="page">{p.name}</span>
    </nav>
    <div class="pb-hero-body">
      <div class="pb-hero-logo">
        <img src={p.guideline.logos[0].file} alt="{p.name} logo" />
      </div>
      <div class="pb-hero-text">
        <p class="pb-hero-meta">
          <span class="pb-chip">{p.status}</span>
          <span>{p.category}</span>
        </p>
        <h1>{p.name}</h1>
        <p class="pb-hero-tagline">{p.tagline}</p>
        <p class="pb-hero-entity">
          <iconify-icon icon="fluent:organization-16-regular" aria-hidden="true"></iconify-icon>
          {p.entity}
        </p>
      </div>
    </div>
  </div>
</header>

<!-- Section navigation -->
<nav class="pb-sections" aria-label="{p.name} guideline sections">
  <ol>
    {#each SECTIONS as s, i}
      <li>
        <a href="#{s.id}">
          <span class="pb-num" aria-hidden="true">{i + 1}</span>
          <iconify-icon icon={s.icon} aria-hidden="true"></iconify-icon>
          {s.label}
        </a>
      </li>
    {/each}
  </ol>
</nav>

<main class="pb-main" id="main-content">
  <!-- 1. Definition -->
  <section id="definition" class="pb-section" aria-labelledby="h-definition">
    <h2 id="h-definition"><span class="pb-num">1</span> Product definition</h2>
    <p class="pb-lead">{p.definition.summary}</p>

    <dl class="pb-facts">
      {#each p.definition.facts as f}
        <div>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      {/each}
    </dl>

    {#if p.definition.range.length}
      <h3>Range</h3>
      <ul class="pb-range">
        {#each p.definition.range as r}
          <li class="pb-card">
            <span class="pb-tag">{r.type}</span>
            <strong>{r.name}</strong>
            <p>{r.desc}</p>
          </li>
        {/each}
      </ul>
    {/if}

  </section>

  <!-- 2. Images -->
  <section id="images" class="pb-section" aria-labelledby="h-images">
    <h2 id="h-images"><span class="pb-num">2</span> Product images</h2>
    <ul class="pb-gallery">
      {#each p.images as img, i}
        <li>
          <button type="button" class="pb-shot" onclick={() => openImage(i)}>
            <img src={img.src} alt={img.alt} loading="lazy" />
            <span class="pb-shot-caption">
              {img.caption}
              {#if img.placeholder}<span class="pb-tag pb-tag-warn">Photography pending</span>{/if}
            </span>
          </button>
        </li>
      {/each}
    </ul>
    {#if p.guideline.photography}
      <p class="pb-note"><iconify-icon icon="fluent:camera-16-regular" aria-hidden="true"></iconify-icon> {p.guideline.photography}</p>
    {/if}
  </section>

  <!-- 3. Positioning -->
  <section id="positioning" class="pb-section" aria-labelledby="h-positioning">
    <h2 id="h-positioning"><span class="pb-num">3</span> Brand positioning</h2>
    <blockquote class="pb-statement">{p.positioning.statement}</blockquote>
    <ul class="pb-pillars">
      {#each p.positioning.pillars as pillar, i}
        <li class="pb-card">
          <span class="pb-pillar-num">0{i + 1}</span>
          <strong>{pillar.title}</strong>
          <p>{pillar.text}</p>
        </li>
      {/each}
    </ul>
    <div class="pb-two">
      <div class="pb-card">
        <h3><iconify-icon icon="fluent:chat-24-regular" aria-hidden="true"></iconify-icon> Voice</h3>
        <ul class="pb-list pb-list-yes">
          {#each p.positioning.voice as v}<li><iconify-icon icon="fluent:checkmark-circle-16-filled" aria-hidden="true"></iconify-icon>{v}</li>{/each}
        </ul>
      </div>
      <div class="pb-card">
        <h3><iconify-icon icon="fluent:prohibited-24-regular" aria-hidden="true"></iconify-icon> Avoid</h3>
        <ul class="pb-list pb-list-no">
          {#each p.positioning.avoid as v}<li><iconify-icon icon="fluent:dismiss-circle-16-filled" aria-hidden="true"></iconify-icon>{v}</li>{/each}
        </ul>
      </div>
    </div>
  </section>

  <!-- 4. Colour scheme -->
  <section id="colours" class="pb-section" aria-labelledby="h-colours">
    <h2 id="h-colours"><span class="pb-num">4</span> Colour scheme and 60:30:10</h2>
    <div class="pb-ratio-bar" role="img" aria-label="Colour allocation: 60% {roles[0].colors[0].name}, 30% {roles[1].colors[0].name}, 10% {roles[2].colors[0].name}">
      {#each roles as r}
        <div style="flex:{r.share}; background:{r.colors[0].hex};">
          <span class="pb-ratio-label">{r.share}%</span>
        </div>
      {/each}
    </div>

    <div class="pb-roles">
      {#each roles as r}
        <div class="pb-card">
          <h3>{r.share}% {r.label}</h3>
          <p class="pb-muted">{r.role}</p>
          <ul class="pb-swatches">
            {#each r.colors as col}
              <li>
                <button type="button" class="pb-swatch" onclick={() => copyHex(col.hex)}>
                  <span class="pb-swatch-chip" style="background:{col.hex};" aria-hidden="true"></span>
                  <span class="pb-swatch-text">
                    <strong>{col.name}</strong>
                    <code>{col.hex}</code>
                    <span class="pb-muted">{col.use}</span>
                  </span>
                  <span class="pb-swatch-copy">
                    {#if copied === col.hex}
                      <iconify-icon icon="fluent:checkmark-16-regular" aria-hidden="true"></iconify-icon> Copied
                    {:else}
                      <iconify-icon icon="fluent:copy-16-regular" aria-hidden="true"></iconify-icon> Copy
                    {/if}
                  </span>
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <h3>Approved text pairings</h3>
    <div class="pb-table-wrap">
      <table class="pb-table">
        <caption class="visually-hidden">Text and background pairings with WCAG contrast ratio</caption>
        <thead>
          <tr><th scope="col">Sample</th><th scope="col">Text / background</th><th scope="col">Contrast</th><th scope="col">Use</th></tr>
        </thead>
        <tbody>
          {#each p.colorScheme.pairings as pair}
            {@const r = ratioLabel(pair)}
            <tr>
              <td><span class="pb-sample" style="color:{pair.text}; background:{pair.background};">Aa</span></td>
              <td><code>{pair.text}</code> on <code>{pair.background}</code></td>
              <td><span class="pb-tag">{r.value}:1 {pair.largeTextOnly ? 'AA large text' : r.level}</span></td>
              <td>{pair.use}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if p.colorScheme.note}
      <p class="pb-note"><iconify-icon icon="fluent:info-16-regular" aria-hidden="true"></iconify-icon> {p.colorScheme.note}</p>
    {/if}
  </section>

  <!-- 5. Pattern -->
  <section id="pattern" class="pb-section" aria-labelledby="h-pattern">
    <h2 id="h-pattern"><span class="pb-num">5</span> Pattern</h2>
    <div class="pb-two">
      <div class="pb-pattern-preview" style="background-image:url('{p.pattern.file}');" role="img" aria-label="{p.pattern.name} pattern preview"></div>
      <div>
        <h3>{p.pattern.name}</h3>
        <p>{p.pattern.description}</p>
        <ul class="pb-list">
          {#each p.pattern.usage as u}<li><iconify-icon icon="fluent:checkmark-16-regular" aria-hidden="true"></iconify-icon>{u}</li>{/each}
        </ul>
        <a class="ss-btn ss-btn-secondary" href={p.pattern.file} download>
          <iconify-icon icon="fluent:arrow-download-16-regular" aria-hidden="true"></iconify-icon> Download pattern (SVG)
        </a>
      </div>
    </div>
  </section>

  <!-- 6. Guideline -->
  <section id="guideline" class="pb-section" aria-labelledby="h-guideline">
    <h2 id="h-guideline"><span class="pb-num">6</span> Brand guideline</h2>
    <ul class="pb-logos">
      {#each p.guideline.logos as logo}
        <li class="pb-card">
          <div class="pb-logo-tile"><img src={logo.file} alt="{logo.label}" loading="lazy" /></div>
          <strong>{logo.label}</strong>
          <span class="pb-muted">{logo.use}</span>
        </li>
      {/each}
    </ul>

    <dl class="pb-facts">
      <div><dt>Clear space</dt><dd>{p.guideline.clearSpace}</dd></div>
      <div><dt>Minimum size</dt><dd>{p.guideline.minimumSize}</dd></div>
      <div><dt>Display type</dt><dd>{p.guideline.typography.display}</dd></div>
      <div><dt>Body type</dt><dd>{p.guideline.typography.body}</dd></div>
    </dl>

    <div class="pb-two">
      <div class="pb-card pb-do">
        <h3><iconify-icon icon="fluent:checkmark-circle-24-filled" aria-hidden="true"></iconify-icon> Do</h3>
        <ul class="pb-list">{#each p.guideline.do as d}<li>{d}</li>{/each}</ul>
      </div>
      <div class="pb-card pb-dont">
        <h3><iconify-icon icon="fluent:dismiss-circle-24-filled" aria-hidden="true"></iconify-icon> Don't</h3>
        <ul class="pb-list">{#each p.guideline.dont as d}<li>{d}</li>{/each}</ul>
      </div>
    </div>
    {#if p.guideline.typography.note}
      <p class="pb-note"><iconify-icon icon="fluent:text-font-16-regular" aria-hidden="true"></iconify-icon> {p.guideline.typography.note}</p>
    {/if}
  </section>

  <!-- 7. Downloads -->
  <section id="downloads" class="pb-section" aria-labelledby="h-downloads">
    <h2 id="h-downloads"><span class="pb-num">7</span> Assets to download</h2>
    <ul class="pb-downloads">
      {#each [{ label: `${p.name} brand guideline (all seven sections)`, file: `/brand-guidelines/pdf/${p.slug}-brand-guideline-v1.0.pdf`, format: 'PDF' }, ...p.downloads] as f}
        <li>
          <a href={f.file} download={fileName(f.file)} class="pb-download">
            <span class="pb-download-icon" aria-hidden="true">
              <iconify-icon icon={f.format === 'PDF' ? 'fluent:document-pdf-24-regular' : f.format === 'ZIP' ? 'fluent:folder-zip-24-regular' : 'fluent:image-24-regular'}></iconify-icon>
            </span>
            <span class="pb-download-text">
              <strong>{f.label}</strong>
              <span class="pb-muted">{fileName(f.file)}</span>
            </span>
            <span class="pb-tag">{f.format}</span>
            <iconify-icon icon="fluent:arrow-download-20-regular" aria-hidden="true"></iconify-icon>
          </a>
        </li>
      {/each}
    </ul>
    <p class="pb-note">
      <iconify-icon icon="fluent:shield-lock-16-regular" aria-hidden="true"></iconify-icon>
      Brand assets are proprietary to SuamiSihat Holding Sdn. Bhd. See LICENSE-ASSETS before sharing outside the group.
    </p>
  </section>

  <p class="pb-back">
    <a href="/products/" class="ss-btn ss-btn-secondary">
      <iconify-icon icon="fluent:arrow-left-16-regular" aria-hidden="true"></iconify-icon> All brands
    </a>
  </p>
</main>

<dialog bind:this={dialog} class="pb-lightbox" aria-label="Image viewer">
  {#if p.images[current]}
    <figure>
      <img src={p.images[current].src} alt={p.images[current].alt} />
      <figcaption>{p.images[current].caption} ({current + 1} of {p.images.length})</figcaption>
    </figure>
  {/if}
  <div class="pb-lightbox-bar">
    <button type="button" class="ss-btn ss-btn-secondary" onclick={() => step(-1)}>
      <iconify-icon icon="fluent:chevron-left-16-regular" aria-hidden="true"></iconify-icon> Previous
    </button>
    <button type="button" class="ss-btn ss-btn-secondary" onclick={() => step(1)}>
      Next <iconify-icon icon="fluent:chevron-right-16-regular" aria-hidden="true"></iconify-icon>
    </button>
    <button type="button" class="ss-btn ss-btn-primary" onclick={() => dialog?.close()}>
      <iconify-icon icon="fluent:dismiss-16-regular" aria-hidden="true"></iconify-icon> Close
    </button>
  </div>
</dialog>

<style>
  /* Hero: brand gradient with a dark scrim behind the text for contrast */
  .pb-hero {
    position: relative;
    overflow: hidden;
    color: #FFFFFF;
    background: linear-gradient(120deg, var(--hero-from) 0%, var(--hero-from) 45%, var(--hero-to) 100%);
  }
  .pb-hero-pattern {
    position: absolute;
    inset: 0;
    background-image: var(--pattern);
    opacity: 0.35;
    mask-image: linear-gradient(90deg, transparent 30%, #000 85%);
  }
  .pb-hero-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
  }
  .pb-crumbs { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; margin-bottom: 2rem; }
  .pb-crumbs a { color: #FFFFFF; text-decoration: underline; text-underline-offset: 3px; }
  .pb-crumbs [aria-current] { font-weight: 600; }
  .pb-hero-body { display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; }
  .pb-hero-logo {
    background: #FFFFFF;
    border-radius: var(--f-radius-2xl);
    padding: 1.5rem 2rem;
    width: 260px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--f-shadow-16);
  }
  .pb-hero-logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .pb-hero-text {
    flex: 1;
    min-width: 260px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: var(--f-radius-xl);
    padding: 1.25rem 1.5rem;
  }
  .pb-hero-text h1 { color: #FFFFFF !important; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin: 0.25rem 0; letter-spacing: -0.02em; }
  .pb-hero-meta { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; font-size: 0.85rem; margin: 0; color: #FFFFFF !important; }
  .pb-hero-tagline { font-size: 1.15rem; margin: 0 0 0.75rem; color: #FFFFFF !important; }
  .pb-hero-entity { display: flex; gap: 0.4rem; align-items: center; font-size: 0.85rem; margin: 0; color: #FFFFFF !important; }
  .pb-chip { background: #FFFFFF; color: #1C1C1C; border-radius: 999px; padding: 2px 10px; font-weight: 700; font-size: 0.75rem; }

  /* Section nav */
  .pb-sections {
    position: sticky;
    top: 56px;
    z-index: 20;
    background: var(--color-layer-acrylic);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--color-neutral-stroke-1);
  }
  .pb-sections ol { list-style: none; margin: 0 auto; padding: 0.5rem 1rem; max-width: 1200px; display: flex; gap: 0.25rem; overflow-x: auto; }
  .pb-sections a {
    display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap;
    padding: 0.5rem 0.75rem; min-height: 40px; border-radius: var(--f-radius-md);
    color: var(--color-neutral-fg-1); text-decoration: none; font-size: 0.85rem; font-weight: 600;
  }
  .pb-sections a:hover { background: var(--color-brand-subtle); }
  .pb-num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.5em; height: 1.5em; border-radius: 50%;
    background: var(--color-action-bg); color: var(--color-on-action); font-size: 0.75em; font-weight: 700;
  }

  /* Layout */
  .pb-main { max-width: 1200px; margin: 0 auto; padding: 1rem 1.5rem 4rem; width: 100%; }
  .pb-section { padding: 2.5rem 0; border-bottom: 1px solid var(--color-neutral-stroke-1); scroll-margin-top: 120px; }
  .pb-section h2 { display: flex; align-items: center; gap: 0.6rem; font-size: 1.6rem; font-weight: 800; margin: 0 0 1.25rem; color: var(--text-strong); }
  .pb-section h3 { font-size: 1.05rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: var(--color-neutral-fg-1); display: flex; gap: 0.4rem; align-items: center; }
  .pb-lead { font-size: 1.1rem; line-height: 1.7; max-width: 75ch; color: var(--color-neutral-fg-1); }
  .pb-muted { color: var(--color-neutral-fg-2); font-size: 0.85rem; }
  .pb-note { display: flex; gap: 0.5rem; align-items: flex-start; color: var(--color-neutral-fg-2); font-size: 0.9rem; margin-top: 1rem; }
  .pb-card {
    background: var(--color-neutral-bg-2);
    border: 1px solid var(--color-neutral-stroke-1);
    border-radius: var(--f-radius-xl);
    padding: 1.25rem;
    box-shadow: var(--f-shadow-2);
  }
  .pb-card p { margin: 0.4rem 0 0; color: var(--color-neutral-fg-2); line-height: 1.6; }
  .pb-two { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; margin-top: 1.25rem; }
  .pb-tag {
    display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.02em;
    padding: 2px 8px; border-radius: 6px; background: var(--color-brand-subtle); color: var(--color-brand-primary);
  }
  .pb-tag-warn { background: var(--color-warning-bg); color: var(--color-warning-fg); margin-left: 0.4rem; }

  /* Definition */
  .pb-facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem; margin: 1.25rem 0 0; }
  .pb-facts > div { background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-lg); padding: 0.85rem 1rem; }
  .pb-facts dt { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-neutral-fg-2); }
  .pb-facts dd { margin: 0.25rem 0 0; color: var(--color-neutral-fg-1); }
  .pb-range { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
  .pb-range strong { display: block; margin-top: 0.5rem; color: var(--color-neutral-fg-1); }

  /* Images */
  .pb-gallery { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
  .pb-shot {
    width: 100%; padding: 0; border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-xl);
    overflow: hidden; background: var(--color-neutral-bg-2); cursor: zoom-in; text-align: left; color: inherit;
  }
  .pb-shot img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; background: #FFFFFF; }
  .pb-shot-caption { display: block; padding: 0.75rem 1rem; font-size: 0.85rem; color: var(--color-neutral-fg-1); }

  /* Positioning */
  .pb-statement {
    font-size: 1.35rem; line-height: 1.5; font-weight: 600; margin: 0 0 1.5rem; padding: 1.25rem 1.5rem;
    border-left: 4px solid var(--color-action-bg); background: var(--color-brand-subtle); border-radius: 0 var(--f-radius-lg) var(--f-radius-lg) 0;
    color: var(--color-neutral-fg-1);
  }
  .pb-pillars { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
  .pb-pillar-num { display: block; font-weight: 800; color: var(--color-text-accent); font-size: 0.9rem; }
  .pb-pillars strong { display: block; font-size: 1.05rem; color: var(--color-neutral-fg-1); margin-top: 0.25rem; }
  .pb-list { list-style: none; padding: 0; margin: 0.5rem 0 1rem; display: grid; gap: 0.5rem; }
  .pb-list li { display: flex; gap: 0.5rem; align-items: flex-start; color: var(--color-neutral-fg-1); line-height: 1.5; }
  .pb-list iconify-icon { margin-top: 0.2rem; flex-shrink: 0; }
  .pb-list-yes iconify-icon, .pb-do h3 { color: var(--color-success-fg); }
  .pb-list-no iconify-icon, .pb-dont h3 { color: var(--color-error-fg); }
  .pb-do { border-top: 4px solid var(--color-success-fg); }
  .pb-dont { border-top: 4px solid var(--color-error-fg); }
  .pb-do .pb-list li::before, .pb-dont .pb-list li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; margin-top: 0.55rem; flex-shrink: 0; }

  /* Colour */
  .pb-ratio-bar { display: flex; height: 72px; border-radius: var(--f-radius-xl); overflow: hidden; border: 1px solid var(--color-neutral-stroke-2); }
  .pb-ratio-bar > div { display: flex; align-items: flex-end; padding: 0.5rem; }
  .pb-ratio-label { background: #FFFFFF; color: #1C1C1C; font-weight: 800; font-size: 0.8rem; padding: 2px 8px; border-radius: 6px; }
  .pb-roles { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1.25rem; }
  .pb-roles h3 { margin-top: 0; }
  .pb-swatches { list-style: none; padding: 0; margin: 0.75rem 0 0; display: grid; gap: 0.5rem; }
  .pb-swatch {
    width: 100%; display: flex; gap: 0.75rem; align-items: center; text-align: left;
    background: var(--color-neutral-bg-1); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-lg);
    padding: 0.5rem; cursor: pointer; color: inherit;
  }
  .pb-swatch:hover { border-color: var(--color-neutral-stroke-3); }
  .pb-swatch-chip { width: 48px; height: 48px; border-radius: var(--f-radius-md); border: 1px solid var(--color-neutral-stroke-2); flex-shrink: 0; }
  .pb-swatch-text { display: flex; flex-direction: column; flex: 1; min-width: 0; }
  .pb-swatch-text strong { color: var(--color-neutral-fg-1); }
  .pb-swatch-text code { color: var(--color-neutral-fg-1); font-size: 0.8rem; }
  .pb-swatch-copy { font-size: 0.75rem; color: var(--color-neutral-fg-2); display: inline-flex; gap: 0.25rem; align-items: center; }
  .pb-table-wrap { overflow-x: auto; }
  .pb-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .pb-table th, .pb-table td { text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--color-neutral-stroke-1); color: var(--color-neutral-fg-1); }
  .pb-table th { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-fg-2); }
  .pb-table code { color: var(--color-neutral-fg-1); background: var(--color-neutral-bg-3); padding: 1px 5px; border-radius: 4px; }
  .pb-sample { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 36px; border-radius: 6px; font-weight: 800; font-size: 1.1rem; border: 1px solid var(--color-neutral-stroke-2); }

  /* Pattern */
  .pb-pattern-preview { min-height: 260px; border-radius: var(--f-radius-xl); border: 1px solid var(--color-neutral-stroke-2); }

  /* Guideline */
  .pb-logos { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
  .pb-logos li { display: flex; flex-direction: column; gap: 0.35rem; }
  .pb-logos strong { color: var(--color-neutral-fg-1); }
  .pb-logo-tile {
    height: 120px; display: flex; align-items: center; justify-content: center; padding: 1rem;
    border-radius: var(--f-radius-lg); margin-bottom: 0.5rem;
    background: repeating-conic-gradient(#EDEDED 0% 25%, #FFFFFF 0% 50%) 50% / 16px 16px;
  }
  .pb-logo-tile img { max-width: 100%; max-height: 100%; object-fit: contain; }

  /* Downloads */
  .pb-downloads { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 0.75rem; }
  .pb-download {
    display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem; text-decoration: none !important;
    background: var(--color-neutral-bg-2); border: 1px solid var(--color-neutral-stroke-1); border-radius: var(--f-radius-lg);
    color: var(--color-neutral-fg-1) !important;
  }
  .pb-download:hover { border-color: var(--color-action-bg); }
  .pb-download-icon { font-size: 1.5rem; color: var(--color-text-accent); display: inline-flex; }
  .pb-download-text { display: flex; flex-direction: column; flex: 1; min-width: 0; }
  .pb-download-text .pb-muted { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pb-back { margin-top: 2rem; }

  /* Lightbox */
  .pb-lightbox { border: none; border-radius: var(--f-radius-xl); padding: 1rem; max-width: min(92vw, 1100px); background: var(--color-neutral-bg-2); color: var(--color-neutral-fg-1); }
  .pb-lightbox::backdrop { background: rgba(0, 0, 0, 0.75); }
  .pb-lightbox figure { margin: 0; }
  .pb-lightbox img { display: block; max-width: 100%; max-height: 72vh; margin: 0 auto; object-fit: contain; }
  .pb-lightbox figcaption { margin-top: 0.75rem; text-align: center; font-size: 0.9rem; }
  .pb-lightbox-bar { display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; flex-wrap: wrap; }

  @media (max-width: 640px) {
    .pb-hero-logo { width: 100%; }
    .pb-main { padding: 1rem; }
  }
</style>
