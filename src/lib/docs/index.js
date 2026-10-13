/**
 * The document library: one list that drives the docs landing page, the sidebar,
 * and the previous/next links. Keep ids stable, because they are used in shared links.
 */
export const DOC_GROUPS = [
  {
    id: 'brand',
    label: 'Brand and strategy',
    blurb: 'Who we are, how we speak and how our companies fit together.',
    icon: 'fluent:target-arrow-24-regular',
    docs: [
      { id: 'introduction', title: 'About this hub', summary: 'What the brand hub is and where to find things.', icon: 'fluent:home-24-regular', path: '/content/introduction.md' },
      { id: 'vision-mission', title: 'Vision and mission', summary: 'Why SuamiSihat® exists and where it is going.', icon: 'fluent:eye-24-regular', path: '/content/vision-mission.md' },
      { id: 'our-companies', title: 'Our companies', summary: 'The five companies, what each does and which colour leads.', icon: 'fluent:building-24-regular', path: '/content/our-companies.md' },
      { id: 'brand-voice', title: 'How we write', summary: 'The tone of voice for everything we publish.', icon: 'fluent:megaphone-24-regular', path: '/content/brand-voice.md' },
      { id: 'clinic-positioning', title: 'SS Clinic positioning', summary: 'Taglines, tone and writing guide for the clinics.', icon: 'fluent:stethoscope-24-regular', path: '/content/clinic-positioning.md' }
    ]
  },
  {
    id: 'staff',
    label: 'Guides for staff',
    blurb: 'Short rules for everyday work: colours, text and brand pages.',
    icon: 'fluent:book-open-24-regular',
    docs: [
      { id: 'color-composition-guide', title: 'How much of each colour', summary: 'The 60:30:10 rule, and when to use it.', icon: 'fluent:color-fill-24-regular', path: '/content/color-composition-guide.md' },
      { id: 'text-color-guide', title: 'Text colours', summary: 'Which text colour to use, from headlines to small print.', icon: 'fluent:text-color-24-regular', path: '/content/text-color-guide.md' },
      { id: 'product-page-standard', title: 'Product brand pages', summary: 'What every product brand page must include.', icon: 'fluent:box-checkmark-24-regular', path: '/content/product-page-standard.md' },
      { id: 'contribution-guide', title: 'Suggesting a change', summary: 'How to ask for a change to the brand or this site.', icon: 'fluent:person-heart-24-regular', path: '/content/contribution-guide.md' }
    ]
  },
  {
    id: 'designers',
    label: 'For designers and developers',
    blurb: 'Technical standards for the people who build pages and apps.',
    icon: 'fluent:code-24-regular',
    docs: [
      { id: 'brand-fluent2', title: 'Brand and Fluent 2', summary: 'Which rules come from our brand and which from Fluent 2.', icon: 'fluent:puzzle-piece-24-regular', path: '/content/brand-fluent2.md' },
      { id: 'ss-hero-guide', title: 'Hero banner', summary: 'How to build the large banner at the top of a page.', icon: 'fluent:sparkle-24-regular', path: '/content/ss-hero-guide.md' },
      { id: 'diagnostic-funnel', title: 'Health score quiz', summary: 'The clinic quiz: steps, wording and design.', icon: 'fluent:filter-24-regular', path: '/content/diagnostic-funnel.md' }
    ]
  },
  {
    id: 'about',
    label: 'About this site',
    blurb: 'What changed and what is planned next.',
    icon: 'fluent:info-24-regular',
    docs: [
      { id: 'changelog', title: 'What is new', summary: 'Every change to the brand and this site.', icon: 'fluent:clock-arrow-download-24-regular', path: '/content/changelog.md' },
      { id: 'roadmap', title: 'Roadmap', summary: 'What has shipped and what comes next.', icon: 'fluent:map-drive-24-regular', path: '/content/roadmap.md' }
    ]
  }
];

/** Old document ids that now point at a merged document. */
export const DOC_ALIASES = {
  'ss-clinic': 'our-companies',
  'ss-health': 'our-companies',
  'ss-wellness': 'our-companies',
  'ss-ecom': 'our-companies',
  'ss-tech': 'our-companies'
};

export const ALL_DOCS = DOC_GROUPS.flatMap((g) => g.docs.map((d) => ({ ...d, group: g.id, groupLabel: g.label })));

export function findDoc(id) {
  return ALL_DOCS.find((d) => d.id === (DOC_ALIASES[id] ?? id)) ?? null;
}
