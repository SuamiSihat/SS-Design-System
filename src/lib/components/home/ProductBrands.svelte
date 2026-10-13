<script>
  import { products } from '$lib/products/index.js';

  // SS Clinic already has its own card above.
  const list = products.filter((p) => p.slug !== 'ssclinic');
</script>

<section id="product-brands" class="hm-block" aria-labelledby="product-brands-title">
  <div class="hm-head">
    <p class="hm-eyebrow">Products and partners</p>
    <h2 id="product-brands-title" class="hm-title">Our product brands</h2>
    <p class="hm-sub">Each one has its own page with logos, colours and a downloadable guide.</p>
  </div>

  <ul class="hm-products">
    {#each list as p}
      <li>
        <a class="hm-product" href={`/products/${p.slug}/`}>
          <span class="hm-product-stripe" style={`background: linear-gradient(90deg, ${p.hero?.from ?? '#022057'}, ${p.hero?.to ?? '#043388'});`} aria-hidden="true"></span>
          <span class="hm-product-name">{p.name}</span>
          <span class="hm-product-tag">{p.tagline}</span>
          {#if p.status && p.status !== 'Active'}
            <span class="hm-product-status">{p.status}</span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>

  <p class="hm-more"><a href="/products/">See all product brands &rarr;</a></p>
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
  .hm-products {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  @media (max-width: 1100px) { .hm-products { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) { .hm-products { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) {
    .hm-block { padding: 2.5rem 1.25rem 1rem; }
    .hm-products { grid-template-columns: 1fr; }
  }
  .hm-product {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    height: 100%;
    box-sizing: border-box;
    padding: 1.5rem 1.15rem 1.15rem;
    overflow: hidden;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.1));
    border-radius: 14px;
    background: var(--color-neutral-bg-1, #FCFAF6);
    text-decoration: none !important;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .hm-product:hover,
  .hm-product:focus-visible {
    transform: translateY(-3px);
    border-color: var(--color-brand-primary, #043388);
    box-shadow: 0 10px 24px rgba(4, 51, 136, 0.12);
  }
  .hm-product-stripe { position: absolute; top: 0; left: 0; right: 0; height: 6px; }
  .hm-product-name { font-size: 1.05rem; font-weight: 700; color: var(--text-strong); }
  .hm-product-tag { font-size: 0.85rem; line-height: 1.45; color: var(--text-secondary); }
  .hm-product-status {
    align-self: flex-start;
    margin-top: 0.4rem;
    padding: 2px 10px;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 700;
    border: 1px solid var(--color-neutral-stroke-1, rgba(0, 0, 0, 0.15));
    color: var(--text-secondary);
  }
  .hm-more { margin: 1.25rem 0 0; font-size: 0.95rem; font-weight: 700; }
</style>
