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
      tagline: 'Vitality Science & Clinical Performance',
      type: 'Core SS Brand',
      entity: '01-SSH · 02-SSC',
      logoLight: '/products/Androlab/logos/logo_androlab_primary.svg',
      logoDark: '/products/Androlab/logos/logo_androlab_primary.svg',
      hero: { from: '#101820', mid: '#022057', to: '#0A89FA' },
      accent: '#0A89FA',
      contentFile: '/content/products/androlab.md',
      subProducts: [
        { name: 'ANDROLAB Alpha', desc: 'Daily botanical sachet drinks with L-Citrulline, Ashwagandha & Saffron for natural male vitality support.', type: 'OTC Supplement' },
        { name: 'Androlab RX', desc: 'Doctor-prescribed formulations: Tadalafil, Lidocaine spray, Testosterone cream & NeuroCalm.', type: 'Prescription' }
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
      tagline: 'Modern Intimate Lifestyle & Hardware',
      type: 'Core SS Brand',
      entity: '05-SSE · 02-SSC',
      logoLight: '/products/MENSS/logos/logo_menss.svg',
      logoDark: '/products/MENSS/logos/logo_menss.svg',
      hero: { from: '#030404', mid: '#01233A', to: '#0E92CC' },
      accent: '#0E92CC',
      contentFile: '/content/products/menss.md',
      subProducts: [
        { name: 'MENSS : FRÉSH Wash', desc: 'Intimate dermatological wash for male hygiene with pH-balanced, dermatologist-formulated care.', type: 'Personal Care' },
        { name: 'MENSS Penile Pump (VED)', desc: 'Motorized vacuum erection device with luxury drawer unboxing and clinical-grade pressure control.', type: 'Medical Device' },
        { name: 'MENSS Ring Series', desc: 'Silicone constriction ring collection (Core, Duo, Carry) for enhanced performance maintenance.', type: 'Lifestyle Device' }
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
      tagline: 'SuamiSihat™ International Brand',
      type: 'Core SS Brand',
      entity: '05-SSE · International',
      logoLight: '/products/Mensculine/logos/logo_mensculine_primary.svg',
      logoDark: '/products/Mensculine/logos/logo_mensculine_primary.svg',
      hero: { from: '#1C1C1C', mid: '#0A1A3A', to: '#038AFA' },
      accent: '#038AFA',
      contentFile: '/content/products/mensculine.md',
      subProducts: [
        { name: 'Mensculine Care Cream', desc: '50g aluminum tube topical care cream with Physta® Tongkat Ali & L-Arginine. NPRA-registered cosmetic formula.', type: 'Cosmetic' }
      ],
      gallery: [
        { src: '/products/Mensculine/logos/logo_mensculine_primary.svg', title: 'Mensculine Primary Identity Vector', sub: 'International cross-border brand logotype with bold geometric letterforms.' },
        { src: '/products/Mensculine/logos/logo_mensculine_secondary.svg', title: 'Mensculine Secondary Mark', sub: 'Horizontal lockup for compact digital applications.' }
      ]
    },
    drmitring: {
      slug: 'drmitring',
      name: 'Dr Mit Ring®',
      tagline: 'Patented Clinical Mechanical Device',
      type: 'Medical Device',
      entity: '05-SSE · 02-SSC',
      logoLight: '/products/DrMitRing/logos/logo_drmitring.svg',
      logoDark: '/products/DrMitRing/logos/logo_drmitring.svg',
      hero: { from: '#1C1C1C', mid: '#1A3A1A', to: '#6AB845' },
      accent: '#6AB845',
      contentFile: '/content/products/drmitring.md',
      subProducts: [
        { name: 'Dr Mit Ring® Standard', desc: 'Lime-green medical-grade silicone ring with urethral relief curve. 100% drug-free mechanical erection support.', type: 'Medical Device' }
      ],
      gallery: [
        { src: '/products/DrMitRing/logos/logo_drmitring.svg', title: 'Dr Mit Ring® Clinical Wordmark', sub: 'Doctor-patented clinical silicone ring device identity.' }
      ]
    },
    rejal: {
      slug: 'rejal',
      name: 'REJAL',
      tagline: 'Heritage Functional Superfoods',
      type: 'Core SS Brand',
      entity: '05-SSE · Superfood',
      logoLight: '/products/Rejal/logos/logo_rejal.svg',
      logoDark: '/products/Rejal/logos/logo_rejal.svg',
      hero: { from: '#1C1C1C', mid: '#3A2A00', to: '#C8A14A' },
      accent: '#C8A14A',
      contentFile: '/content/products/rejal.md',
      subProducts: [
        { name: 'REJAL Stevia', desc: 'Zero-calorie natural sweetener from stevia leaf extract. Apple-grade aesthetic packaging.', type: 'Superfood' },
        { name: 'REJAL Madu Tualang Pahang', desc: 'Raw wild forest honey from Pahang, available in 500g and 1kg variants.', type: 'Superfood' },
        { name: 'REJAL Bawang Lanang + Madu Tualang', desc: '450g fermented black solo garlic in wild honey. Premium heritage functional food.', type: 'Superfood' }
      ],
      gallery: [
        { src: '/products/Rejal/sub-products/bawang-lanang/gallery/Premium_product_photo_luxury_202608250951.jpeg', title: 'REJAL Bawang Lanang Luxury Studio Shot', sub: 'Fermented black solo garlic cloves aged in pure wild Tualang forest honey.' },
        { src: '/products/Rejal/sub-products/bawang-lanang/gallery/Garlic_and_honey_jar_action_202608250958.jpeg', title: 'Bioactive Honey Viscosity Action', sub: 'Studio splash demonstration of unpasteurized raw forest honey.' },
        { src: '/products/Rejal/sub-products/bawang-lanang/gallery/Macro_product_photography_texture_202608250951_2.jpeg', title: 'Macro Texture & Fermentation Detail', sub: 'Soft-clove black garlic texture infused with antioxidant bio-compounds.' },
        { src: '/products/Rejal/sub-products/bawang-lanang/gallery/Product_bundle_set_flat_lay_202608250951_2.jpeg', title: 'REJAL Heritage 3-Jar Gift Bundle', sub: 'Premium matte black gift box flat lay with gold foil stamped typography.' },
        { src: '/products/Rejal/sub-products/madu-tualang/gallery/Create_honey_bottle_mockup_202608250945.jpeg', title: 'Madu Tualang Pahang Glass Bottle', sub: '500g amber glass bottle mockup protecting raw enzymes from UV degradation.' }
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
