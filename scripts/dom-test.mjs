/**
 * SuamiSihat™ Design System — Comprehensive DOM & Structural Test Suite (v3.5.0)
 * Validates DOM hierarchy, critical semantic elements, attributes, anchors, logo rules, and dark mode tokens.
 *
 * Usage: node scripts/dom-test.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD_DIR = join(ROOT, 'build');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, description) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔\x1b[0m [PASS] ${description}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✖\x1b[0m [FAIL] ${description}`);
  }
}

function loadHtml(relPath) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) {
    assert(false, `HTML file must exist: ${relPath}`);
    return '';
  }
  return readFileSync(fullPath, 'utf8');
}

function testDom(pageName, html, rules) {
  console.log(`\n📄 [DOM Test] Validating: ${pageName}`);
  for (const rule of rules) {
    if (typeof rule.test === 'function') {
      const result = rule.test(html);
      assert(result, rule.desc);
    } else if (rule.pattern instanceof RegExp) {
      assert(rule.pattern.test(html), rule.desc);
    } else if (typeof rule.pattern === 'string') {
      assert(html.includes(rule.pattern), rule.desc);
    }
  }
}

console.log('\n======================================================');
console.log('  🌐 SuamiSihat™ Design System — DOM Validation Suite');
console.log('======================================================');

// 1. Root & Layout DOM Testing
const indexHtml = loadHtml('build/index.html');
testDom('Home Page (build/index.html)', indexHtml, [
  { desc: 'Contains main navigation bar (<nav)', pattern: /<nav/i },
  { desc: 'Contains navbar brand with SuamiSihat identity', pattern: /SuamiSihat/i },
  { desc: 'Contains logomark icon in header', pattern: /ss-logomark-light\.svg|ss-logomark-dark\.svg/i },
  { desc: 'Contains theme toggle button or hook', pattern: /Theme|theme-toggle|data-theme/i },
  { desc: 'Contains global footer element', pattern: /<footer/i },
  { desc: 'Footer contains wordmark logo', pattern: /logo_suamisihat_primary_(light|dark)\.svg/i },
  { desc: 'Footer contains link to Home', pattern: /href="[^"]*(\/|\/index\.html)"[^>]*>Home<\/a>/i },
  { desc: 'Footer contains link to Brand System', pattern: /href="[^"]*brand-system/i },
  { desc: 'Footer contains link to Guidelines', pattern: /href="[^"]*brand-guidelines/i },
  { desc: 'Footer contains link to Products', pattern: /href="[^"]*products/i }
]);

// 2. Component Library DOM Testing
const componentsHtml = loadHtml('build/components/index.html');
testDom('Component Library (build/components/index.html)', componentsHtml, [
  { desc: 'Contains sidebar with Foundation section', pattern: /Foundation/i },
  { desc: 'Sidebar links to #fluent2-guide', pattern: /href="#fluent2-guide"/i },
  { desc: 'Sidebar links to #colors', pattern: /href="#colors"/i },
  { desc: 'Sidebar links to #typography', pattern: /href="#typography"/i },
  { desc: 'Sidebar links to #spacing', pattern: /href="#spacing"/i },
  { desc: 'Sidebar links to #elevation', pattern: /href="#elevation"/i },
  { desc: 'Sidebar links to #radius', pattern: /href="#radius"/i },
  { desc: 'Sidebar links to #motion', pattern: /href="#motion"/i },
  { desc: 'Sidebar links to #icons', pattern: /href="#icons"/i },
  { desc: 'Sidebar links to #buttons', pattern: /href="#buttons"/i },
  { desc: 'Sidebar links to #badges', pattern: /href="#badges"/i },
  { desc: 'Sidebar links to #inputs', pattern: /href="#inputs"/i },
  { desc: 'Sidebar links to #cards', pattern: /href="#cards"/i },
  { desc: 'Sidebar links to #alerts', pattern: /href="#alerts"/i },
  { desc: 'Sidebar links to #avatars', pattern: /href="#avatars"/i },
  { desc: 'Sidebar links to #progress', pattern: /href="#progress"/i },
  { desc: 'Sidebar links to #tabs', pattern: /href="#tabs"/i },
  { desc: 'Sidebar links to #navigation', pattern: /href="#navigation"/i },
  { desc: 'Sidebar links to #modal', pattern: /href="#modal"/i },
  { desc: 'Sidebar links to #toast', pattern: /href="#toast"/i },
  { desc: 'Sidebar links to #stats', pattern: /href="#stats"/i },
  { desc: 'Sidebar links to #flutter', pattern: /href="#flutter"/i },
  { desc: 'Sidebar links to #expo-install', pattern: /href="#expo-install"/i },
  { desc: 'Contains 60:30:10 visual proportion allocation rule', pattern: /60:30:10/i },
  { desc: 'Contains 4-tier Text Color Usage Guide', pattern: /Text Color Usage Guide|--text-strong|--text-primary/i },
  { desc: 'Contains Text Pairing Matrix', pattern: /Text Pairing Matrix|#FCFAF6.*#19191A/s },
  { desc: 'Contains Art Direction rule', pattern: /Black and white create emphasis/i },
  { desc: 'Contains Fluent UI system icons reference', pattern: /fluent:/i },
  { desc: 'Contains Primary and CTA buttons', pattern: /ss-btn-primary|ss-btn-cta/i }
]);

// 3. Brand System DOM Testing
const brandSystemHtml = loadHtml('build/brand-system/index.html');
testDom('Brand System (build/brand-system/index.html)', brandSystemHtml, [
  { desc: 'Contains interactive logo variant selector', pattern: /Logo Contrast Tester|Primary Logo|Secondary Logo/i },
  { desc: 'Contains Logo Clear Space and 1X exclusion rule or guidelines', pattern: /Clear Space|clear space|safe_zone\.svg/i },
  { desc: 'Contains safe_zone.svg and ss_logo_proportions.svg diagrams', pattern: /safe_zone\.svg.*ss_logo_proportions\.svg/s },
  { desc: 'Contains Brand Architecture Model pyramid diagram', pattern: /brand_architecture_model\.svg/i },
  { desc: 'Contains visual Prohibited Logo Treatments board (dont.png)', pattern: /dont\.png/i },
  { desc: 'Contains Logo Usage and Please Do / Don\'t rules', pattern: /Please Do|Please Don\'t/i },
  { desc: 'Contains Poppins font family specification', pattern: /Poppins/i },
  { desc: 'Contains Montserrat font family specification', pattern: /Montserrat/i },
  { desc: 'Contains Helvetica font family specification', pattern: /Helvetica/i },
  { desc: 'Contains Calibri font family specification', pattern: /Calibri/i },
  { desc: 'Contains 5 Sub-Brands (SSH, SSC, SSW, SSE, SST)', pattern: /SSH.*SSC.*SSW.*SSE.*SST|SS Health.*SS Clinic.*SS Wellness/s },
  { desc: 'Contains Corporate Entity Facts overview bar', pattern: /SUAMISIHAT HOLDING SDN\. BHD\.|Registered Entity/i },
  { desc: 'Contains Direct Asset Download Kits (10 Packages)', pattern: /Direct Asset Download Kits|Master Brand Kit/i },
  { desc: 'Contains Neutral White (#FCFAF6) and Neutral Black in Primary Color specification', pattern: /Neutral White.*#FCFAF6|#FCFAF6.*Neutral White/s },
  { desc: 'Contains Standalone Logomark Surface Contrast Tester', pattern: /Standalone Logomark Surface Contrast Tester/i },
  { desc: 'Contains Logomark Light & Dark toggle buttons', pattern: /Light Surface.*Dark Surface/s },
  { desc: 'Contains multi-platform token export options (Tailwind, Flutter, WPF, CSS, JSON)', pattern: /Tailwind|Flutter|WPF|JSON/i },
  { desc: 'Contains vector master SVG download links', pattern: /\.svg/i }
]);

// 4. Creative Tools & SSCAM DOM Testing
const toolsHtml = loadHtml('build/tools/index.html');
testDom('Tools & SSCAM (build/tools/index.html)', toolsHtml, [
  { desc: 'Contains SS CAM desktop workstation title', pattern: /SSCAM/i },
  { desc: 'Contains Windows platform requirement indicator', pattern: /Windows Only|WPF \.NET 8/i },
  { desc: 'Contains SSCAM download CTA', pattern: /Download Latest \(Windows\)/i },
  { desc: 'Contains Mail Signature Generator utility card', pattern: /Mail Signature/i },
  { desc: 'Contains Brand Asset Library utility card', pattern: /Brand Asset Library/i },
  { desc: 'Contains SSNAS Dashboard utility card', pattern: /SSNAS/i },
  { desc: 'Contains real-time WCAG Color Contrast Ratio Tool', pattern: /Contrast Ratio/i },
  { desc: 'Contains Icon Search and Copy utility', pattern: /Icon Search|copyIconSnippet|lucide:/i }
]);

// 5. Brand Guidelines DOM Testing
const guidelinesHtml = loadHtml('build/brand-guidelines/index.html');
testDom('Brand Guidelines (build/brand-guidelines/index.html)', guidelinesHtml, [
  { desc: 'Contains Logo & Concept booklet cover', pattern: /Logo &amp; Concept|Logo & Concept/i },
  { desc: 'Contains Interior Design booklet cover', pattern: /Interior Design/i },
  { desc: 'Contains 60:30:10 Visual Allocation Standard', pattern: /60:30:10/i },
  { desc: 'Contains 60% Foundation Canvas token (#F8FAFC)', pattern: /#F8FAFC/i },
  { desc: 'Contains 30% Structural Trust token (#022057)', pattern: /#022057/i },
  { desc: 'Contains 10% Primary Conversion Accent token (#21A1F7)', pattern: /#21A1F7/i }
]);

// 6. Products Hub DOM Testing
const productsHtml = loadHtml('build/products/index.html');
testDom('Products Hub (build/products/index.html)', productsHtml, [
  { desc: 'Contains ANDROLAB product card', pattern: /ANDROLAB/i },
  { desc: 'Contains MENSS product card', pattern: /MENSS/i },
  { desc: 'Contains Mensculine product card', pattern: /Mensculine/i },
  { desc: 'Contains Dr Mit Ring product card', pattern: /Dr Mit Ring/i },
  { desc: 'Contains REJAL product card', pattern: /REJAL/i }
]);

// 7. Product Brand Hub Gallery DOM Testing (ANDROLAB & MENSS)
const androlabHtml = loadHtml('build/products/androlab/index.html');
testDom('Product Hub: ANDROLAB (build/products/androlab/index.html)', androlabHtml, [
  { desc: 'Contains Product Renders & Photography section', pattern: /Product Renders &amp; Photography|Product Renders & Photography/i },
  { desc: 'Contains Interactive Gallery stage', pattern: /ss-gallery-stage/i },
  { desc: 'Contains click to zoom lightbox badge', pattern: /Click to Zoom/i },
  { desc: 'Contains high-resolution studio packshot image', pattern: /Render_Mockup_3840/i }
]);

// 8. Email Signature Generator DOM Testing
const signatureHtml = loadHtml('build/signature/index.html');
testDom('Signature Generator (build/signature/index.html)', signatureHtml, [
  { desc: 'Contains Quick Entity Selector chips', pattern: /Quick Entity Selector/i },
  { desc: 'Contains multiple operating subsidiary chips (01-SSH, 02-SSC, 03-SSW, etc.)', pattern: /01-SSH.*02-SSC.*03-SSW/s },
  { desc: 'Contains formatted signature copy button', pattern: /Copy Formatted Signature/i },
  { desc: 'Contains confidentiality disclaimer toggle', pattern: /Include Confidentiality Disclaimer/i }
]);

// 9. Global Navigation & Spotlight Command Palette DOM Testing
testDom('Global Navigation & Search (build/index.html)', indexHtml, [
  { desc: 'Contains global spotlight search button (Ctrl+K trigger)', pattern: /f-nav-search-btn/i },
  { desc: 'Contains ⌘K keyboard badge', pattern: /⌘K|Ctrl\+K/i }
]);

// 10. Interactive Components Sandbox DOM Testing
testDom('Components Sandbox Interactivity (build/components/index.html)', componentsHtml, [
  { desc: 'Contains live floating toast notification container', pattern: /ss-live-toast-container/i },
  { desc: 'Contains interactive live modal trigger', pattern: /Open Live Dialog Demo|Book Clinical Consultation/i },
  { desc: 'Contains interactive color swatches with hex copy', pattern: /cl-swatch.*Prussian Blue/s }
]);

console.log('\n======================================================');
console.log(`  📊 DOM Validation Summary: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 All DOM and structural assertions PASSED with 100% success!\n');
  process.exit(0);
}
