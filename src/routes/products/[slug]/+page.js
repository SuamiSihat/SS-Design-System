export const prerender = true;

export function entries() {
  return [
    { slug: 'androlab' },
    { slug: 'menss' },
    { slug: 'mensculine' },
    { slug: 'drmitring' },
    { slug: 'rejal' },
    { slug: 'nucaffe' },
    { slug: 'pertabi' },
    { slug: 'husbandclinic' },
    { slug: 'isterisihat' }
  ];
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const slug = params.slug?.toLowerCase();

  // Product brand hub data map
  // Each entry contains metadata + structured content sections for the brand hub
  const productData = {
    androlab: {
      slug: 'androlab',
      name: 'ANDROLAB',
      tagline: 'Clinical Vitality Science & Therapeutic Performance',
      type: 'Core Brand',
      entity: '01-SSH · 02-SSC',
      logoLight: '/products/Androlab/logos/logo_androlab_primary.svg',
      logoDark: '/products/Androlab/logos/logo_androlab_primary.svg',
      hero: { from: '#101820', mid: '#022057', to: '#0A89FA' },
      accent: '#0A89FA',
      contentFile: '/content/products/androlab.md',
      subProducts: [
        { name: 'ANDROLAB Alpha', desc: 'Daily botanical sachet formulation with L-Citrulline, KSM-66 Ashwagandha, and Saffron for sustained vitality and microcirculation support.', type: 'Nutraceutical' },
        { name: 'Androlab RX', desc: 'Physician-supervised clinical therapeutics: customized protocol formulations including Tadalafil, delay therapy, and metabolic support.', type: 'Clinical Protocol' }
      ],
      gallery: [
        { src: '/products/Androlab/sub-products/androlab-alpha/gallery/Render_Mockup_3840_1876_2025-11-07.png', title: 'ANDROLAB Alpha 3D Studio Packshot', sub: 'Photorealistic 4K studio render of sachet carton packaging.' },
        { src: '/products/Androlab/sub-products/androlab-alpha/gallery/Render_Mockup_3840_1916_2025-11-07.png', title: 'ANDROLAB Alpha Perspective View', sub: 'Angled render showcasing matte soft-touch finish and foil seal.' },
        { src: '/products/Androlab/sub-products/androlab-alpha/gallery/sachet P0104 - ENG.png', title: 'Sachet Artwork (International English)', sub: 'Primary 4-layer aluminum foil sachet packaging design.' },
        { src: '/products/Androlab/sub-products/androlab-alpha/gallery/sachet P0104.png', title: 'Sachet Artwork (Standard Domestic)', sub: 'NPRA-compliant standard domestic sachet graphic layout.' }
      ]
    },
    menss: {
      slug: 'menss',
      name: 'MENSS',
      tagline: 'Modern Intimate Wellness & Dermatological Care',
      type: 'Core Brand',
      entity: '05-SSE · 02-SSC',
      logoLight: '/products/MENSS/logos/logo_menss.svg',
      logoDark: '/products/MENSS/logos/logo_menss.svg',
      hero: { from: '#030404', mid: '#01233A', to: '#0E92CC' },
      accent: '#0E92CC',
      contentFile: '/content/products/menss.md',
      subProducts: [
        { name: 'MENSS : FRÉSH Wash', desc: 'Dermatologist-formulated intimate wash engineered for male skin hygiene, moisture barrier balance, and daily comfort.', type: 'Personal Care' },
        { name: 'MENSS Penile Pump (VED)', desc: 'Medical-grade motorized vacuum conditioning device designed for non-invasive physical therapy and vascular rehabilitation.', type: 'Medical Device' },
        { name: 'MENSS Ring Series', desc: 'Precision silicone support rings (Core, Duo, Carry) crafted with medical-grade elastomer for intimate performance maintenance.', type: 'Wellness Device' }
      ],
      gallery: [
        { src: '/products/MENSS/sub-products/penile-pump/gallery/202509_D0062_Menss_Packaging_Penile Pump_v1.png', title: 'MENSS Vacuum Device Luxury Drawer Box', sub: 'High-end drawer unboxing packaging with EVA foam insert.' },
        { src: '/products/MENSS/sub-products/penile-pump/gallery/Render_Mockup_1080_1920_2025-10-14.jpg', title: 'MENSS Motorized VED Studio Render (Vertical)', sub: 'Precision medical-grade polycarbonate cylinder with digital pressure sensor.' },
        { src: '/products/MENSS/sub-products/penile-pump/gallery/Render_Mockup_1920_1080_2025-10-14.jpg', title: 'MENSS Clinical Studio Render (Horizontal)', sub: 'Ergonomic handle and clinical pressure gauge overview.' },
        { src: '/products/MENSS/sub-products/penile-pump/gallery/MENSS-PP-Box.png', title: 'MENSS Retail Packaging Storefront View', sub: 'Standard retail box asset for digital storefronts.' },
        { src: '/products/MENSS/sub-products/penile-pump/gallery/Pump Silhuatte.png', title: 'Hardware Schematic Silhouette', sub: 'Clean engineering silhouette of the ergonomic pump handle.' }
      ]
    },
    mensculine: {
      slug: 'mensculine',
      name: 'Mensculine',
      tagline: 'Global Botanical Science & Men’s Care',
      type: 'International Brand',
      entity: '05-SSE · International',
      logoLight: '/products/Mensculine/logos/logo_mensculine_primary.svg',
      logoDark: '/products/Mensculine/logos/logo_mensculine_primary.svg',
      hero: { from: '#1C1C1C', mid: '#0A1A3A', to: '#038AFA' },
      accent: '#038AFA',
      contentFile: '/content/products/mensculine.md',
      subProducts: [
        { name: 'Mensculine Care Cream', desc: 'Premium topical care emulsion formulated with standardized Physta® Tongkat Ali extract and L-Arginine for skin vitality and tissue conditioning.', type: 'Dermatological' }
      ],
      gallery: [
        { src: '/products/Mensculine/logos/logo_mensculine_primary.svg', title: 'Mensculine Primary Identity Vector', sub: 'International cross-border brand logotype with bold geometric letterforms.' },
        { src: '/products/Mensculine/logos/logo_mensculine_secondary.svg', title: 'Mensculine Secondary Mark', sub: 'Horizontal lockup for compact digital applications.' }
      ]
    },
    drmitring: {
      slug: 'drmitring',
      name: 'Dr Mit Ring®',
      tagline: 'Patented Mechanical Support & Non-Medicinal Care',
      type: 'Medical Device',
      entity: '05-SSE · 02-SSC',
      logoLight: '/products/DrMitRing/logos/logo_drmitring.svg',
      logoDark: '/products/DrMitRing/logos/logo_drmitring.svg',
      hero: { from: '#1C1C1C', mid: '#1A3A1A', to: '#6AB845' },
      accent: '#6AB845',
      contentFile: '/content/products/drmitring.md',
      subProducts: [
        { name: 'Dr Mit Ring® Standard', desc: 'Patented ergonomic silicone device with anatomical urethral relief contour. 100% drug-free mechanical intimate support.', type: 'Medical Device' }
      ],
      gallery: [
        { src: '/products/DrMitRing/sub-products/dr-mit-ring-standard/gallery/Cover Image_2025-11-20.png', title: 'Dr Mit Ring® Master Packaging Render', sub: '3D packaging visual with signature lime-green brand accents.' },
        { src: '/products/DrMitRing/sub-products/dr-mit-ring-standard/gallery/Dr Mit Ring.png', title: 'Medical-Grade Torus Ring Isometric View', sub: 'Precision silicone hardware showing anatomical relief contour.' }
      ]
    },
    rejal: {
      slug: 'rejal',
      name: 'REJAL',
      tagline: 'Heritage Superfoods & Metabolic Vitality',
      type: 'Core Brand',
      entity: '05-SSE · Superfood',
      logoLight: '/products/Rejal/logos/logo_rejal.svg',
      logoDark: '/products/Rejal/logos/logo_rejal.svg',
      hero: { from: '#1C1C1C', mid: '#3A2A00', to: '#C8A14A' },
      accent: '#C8A14A',
      contentFile: '/content/products/rejal.md',
      subProducts: [
        { name: 'REJAL Stevia', desc: 'Zero-calorie botanical sweetener derived from standardized high-purity stevia leaf extract.', type: 'Superfood' },
        { name: 'REJAL Madu Tualang Pahang', desc: 'Raw, unpasteurized wild rainforest Tualang honey sustainably harvested from virgin Pahang canopies.', type: 'Superfood' },
        { name: 'REJAL Bawang Lanang + Madu Tualang', desc: 'Slow-fermented single-clove black garlic steeped in wild Tualang honey for cardiovascular vitality and nitric oxide support.', type: 'Superfood' }
      ],
      gallery: [
        { src: '/products/Rejal/sub-products/bawang-lanang-madu-tualang/gallery/450g Bawang Lanang.png', title: 'Bawang Lanang + Madu Tualang 450g Packshot', sub: 'Frosted matte-black jar with tamper-evident seal and heritage gold typography.' },
        { src: '/products/Rejal/sub-products/bawang-lanang-madu-tualang/gallery/Render_Mockup_3840_1916_2025-11-07.png', title: 'Black Garlic + Tualang Honey Studio Render', sub: '3D studio presentation of the luxury food packaging.' }
      ]
    },
    nucaffe: {
      slug: 'nucaffe',
      name: 'nuCaffe®',
      tagline: 'Functional Physta® Tongkat Ali Coffee (While Stocks Last)',
      type: 'FMCG Superfood',
      entity: '05-SSE · FMCG',
      logoLight: '/products/logo_nuCaffe.svg',
      logoDark: '/products/logo_nuCaffe.svg',
      hero: { from: '#1C1C1C', mid: '#3D1C18', to: '#DF2127' },
      accent: '#DF2127',
      contentFile: '/content/products/nucaffe.md',
      subProducts: [
        { name: 'nuCaffe Black', desc: 'Premium dark roast instant coffee with standardized Physta® Tongkat Ali. Zero added sugar.', type: 'Dark Roast' },
        { name: 'nuCaffe Latte', desc: 'Smooth, creamy white roast instant coffee with Physta® Tongkat Ali.', type: 'Creamy Roast' }
      ],
      gallery: [
        { src: '/products/logo_nuCaffe.svg', title: 'nuCaffe® Standard Logomark', sub: 'Functional Physta® Tongkat Ali instant coffee brand mark.' }
      ]
    },
    pertabi: {
      slug: 'pertabi',
      name: 'PERTABI',
      tagline: 'Persatuan Taat Bersama Isteri Malaysia',
      type: 'Partner NGO',
      entity: 'Partner Network',
      logoLight: '/products/Pertabi/logos/logo_pertabi_horizontal-light.svg',
      logoDark: '/products/Pertabi/logos/logo_pertabi_horizontal-light.svg',
      hero: { from: '#1D3464', mid: '#1A3050', to: '#66BED8' },
      accent: '#66BED8',
      contentFile: '/content/products/pertabi.md',
      subProducts: [
        { name: 'PERTABI Official Matchday Jersey', desc: 'Premium sublimation sports jersey for community events, family runs, and men\'s health awareness.', type: 'Apparel' }
      ],
      gallery: [
        { src: '/products/Pertabi/sub-products/jersey/gallery/Pertabi_jersy_1.png', title: 'PERTABI Official Matchday Jersey (Front)', sub: 'Sublimation technical polyester athletic jersey with high-definition crest.' },
        { src: '/products/Pertabi/sub-products/jersey/gallery/Pertabi_jersy_2.png', title: 'PERTABI Official Jersey (Rear)', sub: 'Breathable honeycomb rear mesh panel with community motto.' },
        { src: '/products/Pertabi/sub-products/jersey/gallery/Pertabi_jersy_3.png', title: 'Collar & Embroidery Detail', sub: 'Precision woven silicone crest and reinforcement stitching.' }
      ]
    },
    husbandclinic: {
      slug: 'husbandclinic',
      name: 'Husband Clinic',
      tagline: "Malaysia's Men's Health Clinic Network",
      type: 'Partner Network',
      entity: 'Partner Network',
      logoLight: '/products/Partner-Brands/logos/logo_husbandclinic.svg',
      logoDark: '/products/Partner-Brands/logos/logo_husbandclinic.svg',
      hero: { from: '#022057', mid: '#032A6A', to: '#043388' },
      accent: '#21A1F7',
      contentFile: '/content/products/husbandclinic.md',
      subProducts: []
    },
    isterisihat: {
      slug: 'isterisihat',
      name: 'Isteri Sihat',
      tagline: "Women's Health Companion Platform",
      type: 'Partner Brand',
      entity: 'Partner Network',
      logoLight: '/products/Partner-Brands/logos/logo_isterisihat.svg',
      logoDark: '/products/Partner-Brands/logos/logo_isterisihat.svg',
      hero: { from: '#6B1A3A', mid: '#9C2A5A', to: '#e895c0' },
      accent: '#e895c0',
      contentFile: '/content/products/isterisihat.md',
      subProducts: []
    }
  };

  const product = productData[slug];

  if (!product) {
    return { product: null, content: null, slug };
  }

  // Try to load markdown content file
  let content = null;
  try {
    const res = await fetch(product.contentFile);
    if (res.ok) {
      content = await res.text();
    }
  } catch {
    // Content file not yet created — page will render with structured data only
  }

  return { product, content, slug };
}
