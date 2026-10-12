/**
 * Product brand data (schema 2). One metadata.json per brand in static/products/<Folder>/.
 * Validated at lint time by scripts/product-schema.mjs.
 */
const modules = import.meta.glob('/static/products/*/metadata.json', { eager: true, import: 'default' });

/** Display order on the catalogue and navigation. */
const ORDER = ['androlab', 'menss', 'mensculine', 'drmitring', 'rejal', 'nucaffe', 'pertabi', 'husbandclinic', 'isterisihat'];

export const products = Object.values(modules)
  .filter((p) => p && p.schema === 2)
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.slug);
    const ib = ORDER.indexOf(b.slug);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

export function getProduct(slug) {
  return products.find((p) => p.slug === slug?.toLowerCase()) ?? null;
}

/** The seven required sections, in page order. */
export const SECTIONS = [
  { id: 'definition', label: 'Product definition', icon: 'fluent:info-24-regular' },
  { id: 'images', label: 'Product images', icon: 'fluent:image-multiple-24-regular' },
  { id: 'positioning', label: 'Brand positioning', icon: 'fluent:target-arrow-24-regular' },
  { id: 'colours', label: 'Colour scheme', icon: 'fluent:color-24-regular' },
  { id: 'pattern', label: 'Pattern', icon: 'fluent:grid-dots-24-regular' },
  { id: 'guideline', label: 'Brand guideline', icon: 'fluent:book-open-24-regular' },
  { id: 'downloads', label: 'Assets to download', icon: 'fluent:arrow-download-24-regular' }
];
