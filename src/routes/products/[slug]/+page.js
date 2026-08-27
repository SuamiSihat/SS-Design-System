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
      subProducts: []
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
