import { error } from '@sveltejs/kit';
import { products, getProduct } from '$lib/products/index.js';

export const prerender = true;

export function entries() {
  return products.map((p) => ({ slug: p.slug }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const product = getProduct(params.slug);
  if (!product) error(404, `No brand page for "${params.slug}"`);
  return { product };
}
