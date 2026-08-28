<script>
  import SSHero from '$lib/components/SSHero.svelte';

  // --- State Variables ---
  let name = $state('John Doe');
  let title = $state('Senior Operations Manager');
  let department = $state('Corporate Strategy & Digital Infrastructure');
  let mmcNo = $state('SSXXXX');
  let entityKey = $state('ssh');
  let phone = $state('+60 12-345 6789');
  let email = $state('john.doe@suamisihat.com.my');
  let location = $state('Kuala Lumpur, Malaysia');
  let website = $state('suamisihat.com.my');
  let whatsapp = $state('+60123456789');

  // Customization Toggles
  let templateId = $state('classic'); // 'classic' | 'clinical' | 'modern' | 'compact'
  let includeSocials = $state(true);
  let linkedin = $state('https://linkedin.com/company/suamisihat');
  let instagram = $state('https://instagram.com/suamisihat.official');

  let includeCtaBanner = $state(true);
  let ctaText = $state('Explore SuamiSihat™ Corporate');
  let ctaUrl = $state('https://suamisihat.com.my');

  let previewMode = $state('light'); // 'light' | 'dark'
  let copiedMode = $state(''); // '' | 'rich' | 'raw'
  let cdnBaseUrl = $state('https://assets.suamisihat.com.my');

  // --- Corporate Entities ---
  const entities = {
    master: {
      name: 'SuamiSihat™ Group Headquarters',
      shortName: 'SuamiSihat™',
      code: 'HQ-MASTER',
      color: '#043388',
      accentColor: '#21A1F7',
      primaryLight: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg',
      primaryDark: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg',
      secondaryLight: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_light.svg',
      secondaryDark: '/public/brand/logos/00_logo_suamisihat/logo_suamisihat_primary_dark.svg',
      markLight: '/public/brand/logos/ss-logomark-light.svg',
      markDark: '/public/brand/logos/ss-logomark-dark.svg',
      site: 'suamisihat.com.my'
    },
    ssh: {
      name: 'SuamiSihat Holding Sdn. Bhd.',
      shortName: 'SuamiSihat Holding',
      code: '01-SSH',
      color: '#022057',
      accentColor: '#21A1F7',
      primaryLight: '/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_light.svg',
      primaryDark: '/public/brand/logos/01_logo_ssHealth/logo_ssh_primary_dark.svg',
      secondaryLight: '/public/brand/logos/01_logo_ssHealth/logo_ssh_secondary_light.svg',
      secondaryDark: '/public/brand/logos/01_logo_ssHealth/logo_ssh_secondary_dark.svg',
      markLight: '/public/brand/logos/ss-logomark-light.svg',
      markDark: '/public/brand/logos/ss-logomark-dark.svg',
      site: 'suamisihat.com.my'
    },
    ssc: {
      name: 'SuamiSihat Clinic Sdn. Bhd.',
      shortName: 'SuamiSihat Clinic',
      code: '02-SSC',
      color: '#043388',
      accentColor: '#21A1F7',
      primaryLight: '/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_light.svg',
      primaryDark: '/public/brand/logos/02_logo_ssClinic/logo_ssc_primary_dark.svg',
      secondaryLight: '/public/brand/logos/02_logo_ssClinic/logo_ssc_secondary_light.svg',
      secondaryDark: '/public/brand/logos/02_logo_ssClinic/logo_ssc_secondary_dark.svg',
      markLight: '/public/brand/logos/ss-logomark-light.svg',
      markDark: '/public/brand/logos/ss-logomark-dark.svg',
      site: 'suamisihat.clinic'
    },
    ssw: {
      name: 'SuamiSihat Wellness Sdn. Bhd.',
      shortName: 'SuamiSihat Wellness',
      code: '03-SSW',
      color: '#21A1F7',
      accentColor: '#043388',
      primaryLight: '/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_light.svg',
      primaryDark: '/public/brand/logos/03_logo_ssWellness/logo_ssw_primary_dark.svg',
      secondaryLight: '/public/brand/logos/03_logo_ssWellness/logo_ssw_secondary_light.svg',
      secondaryDark: '/public/brand/logos/03_logo_ssWellness/logo_ssw_secondary_dark.svg',
      markLight: '/public/brand/logos/ss-logomark-light.svg',
      markDark: '/public/brand/logos/ss-logomark-dark.svg',
      site: 'suamisihatwellness.com'
    },
    sse: {
      name: 'SuamiSihat Ecommerce Sdn. Bhd.',
      shortName: 'SuamiSihat Ecommerce',
      code: '04-SSE',
      color: '#BD9A73',
      accentColor: '#022057',
      primaryLight: '/public/brand/logos/04_logo_ssEcom/logo_sse_primary_light.svg',
      primaryDark: '/public/brand/logos/04_logo_ssEcom/logo_sse_primary_dark.svg',
      secondaryLight: '/public/brand/logos/04_logo_ssEcom/logo_sse_secondary_light.svg',
      secondaryDark: '/public/brand/logos/04_logo_ssEcom/logo_sse_secondary_dark.svg',
      markLight: '/public/brand/logos/ss-logomark-light.svg',
      markDark: '/public/brand/logos/ss-logomark-dark.svg',
      site: 'store.suamisihat.my'
    },
    sst: {
      name: 'SuamiSihat Technology Sdn. Bhd.',
      shortName: 'SuamiSihat Tech',
      code: '05-SST',
      color: '#6DC6EC',
      accentColor: '#022057',
      primaryLight: '/public/brand/logos/05_logo_ssTech/logo_sst_primary_light.svg',
      primaryDark: '/public/brand/logos/05_logo_ssTech/logo_sst_primary_dark.svg',
      secondaryLight: '/public/brand/logos/05_logo_ssTech/logo_sst_secondary_light.svg',
      secondaryDark: '/public/brand/logos/05_logo_ssTech/logo_sst_secondary_dark.svg',
      markLight: '/public/brand/logos/05_logo_ssTech/logo_SSApps_primary_light.svg',
      markDark: '/public/brand/logos/05_logo_ssTech/logo_SSApps_primary_dark.svg',
      site: 'suamisihat.app'
    }
  };

  function selectEntity(key) {
    entityKey = key;
    website = entities[key].site;
  }

  let selectedEntity = $derived(entities[entityKey] || entities.ssh);

  // Preset Profiles
  function loadPresetProfile(profileKey) {
    if (profileKey === 'exec') {
      name = 'John Doe';
      title = 'Senior Operations Manager';
      department = 'Corporate Strategy & Digital Infrastructure';
      mmcNo = 'SSXXXX';
      entityKey = 'ssh';
      phone = '+60 12-345 6789';
      email = 'john.doe@suamisihat.com.my';
      location = 'Kuala Lumpur, Malaysia';
      website = 'suamisihat.com.my';
      whatsapp = '+60123456789';
      templateId = 'classic';
      includeCtaBanner = true;
      ctaText = 'Explore SuamiSihat™ Corporate';
      ctaUrl = 'https://suamisihat.com.my';
    } else if (profileKey === 'doctor') {
      name = 'Dr. Amirul Hakim';
      title = 'Medical Director & Consultant Physician';
      department = 'Clinical Medicine & Andrology';
      mmcNo = 'MMC Registration No: 58492';
      entityKey = 'ssc';
      phone = '+60 3-2100 8888';
      email = 'dr.amirul@suamisihat.clinic';
      location = 'Ampang Medical Hub, Kuala Lumpur';
      website = 'suamisihat.clinic';
      whatsapp = '+60132100888';
      templateId = 'clinical';
      includeCtaBanner = true;
      ctaText = 'Book Teleconsultation / Appointment';
      ctaUrl = 'https://suamisihat.clinic/book';
    } else if (profileKey === 'consultant') {
      name = 'Sarah Tan';
      title = 'Senior Clinical Wellness Advisor';
      department = 'Patient Experience & Care';
      mmcNo = 'SS2045';
      entityKey = 'ssw';
      phone = '+60 17-888 9911';
      email = 'sarah.tan@suamisihatwellness.com';
      location = 'Bangsar Healthcare Centre';
      website = 'suamisihatwellness.com';
      whatsapp = '+60178889911';
      templateId = 'modern';
      includeCtaBanner = true;
      ctaText = 'View Men’s Vitality Assessment';
      ctaUrl = 'https://suamisihatwellness.com/assessment';
    } else if (profileKey === 'ecom') {
      name = 'Rizal Azman';
      title = 'Head of E-Commerce Operations';
      department = 'Digital Commerce & Supply Chain';
      mmcNo = 'SS3088';
      entityKey = 'sse';
      phone = '+60 19-777 3322';
      email = 'rizal@store.suamisihat.my';
      location = 'Shah Alam Logistics Hub';
      website = 'store.suamisihat.my';
      whatsapp = '+60197773322';
      templateId = 'classic';
      includeCtaBanner = true;
      ctaText = 'Shop Verified Formulations';
      ctaUrl = 'https://store.suamisihat.my';
    }
  }

  // --- Helper Function to Render Signature Table ---
  function buildSignatureTable({ isForExport = false }) {
    const brandCol = selectedEntity.color;
    const siteUrl = website.startsWith('http') ? website : `https://${website}`;

    // Common sub-elements
    const ctaBannerHtml = includeCtaBanner && ctaText ? `
      <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #E2E8F0;">
        <a href="${ctaUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: ${brandCol}; color: #FFFFFF; font-size: 11px; font-weight: 700; text-decoration: none; padding: 7px 14px; border-radius: 4px; letter-spacing: 0.03em; text-transform: uppercase;">
          &#9654;&nbsp; ${ctaText}
        </a>
      </div>` : '';

    const socialIconsHtml = includeSocials ? `
      <div style="margin-top: 6px; font-size: 11px; color: ${previewMode === 'dark' ? '#94A3B8' : '#64748B'};">
        <strong style="color: ${previewMode === 'dark' ? '#6DC6EC' : brandCol};">Connect:</strong>
        <a href="${siteUrl}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; font-weight: 600; text-decoration: none; margin-right: 8px;">Website</a>
        ${whatsapp ? `&bull; <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #16A34A; font-weight: 600; text-decoration: none; margin-left: 4px; margin-right: 8px;">WhatsApp</a>` : ''}
        ${linkedin ? `&bull; <a href="${linkedin}" style="color: #0A66C2; font-weight: 600; text-decoration: none; margin-left: 4px; margin-right: 8px;">LinkedIn</a>` : ''}
        ${instagram ? `&bull; <a href="${instagram}" style="color: #E1306C; font-weight: 600; text-decoration: none; margin-left: 4px;">Instagram</a>` : ''}
      </div>` : '';

    const mmcBadgeHtml = mmcNo ? `<span style="display: inline-block; background: #EBF5FE; color: #043388; font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 3px; margin-left: 6px; border: 1px solid #BFDBFE;">${mmcNo}</span>` : '';

    const primaryTextColor = previewMode === 'dark' ? '#FFFFFF' : '#022057';
    const bodyTextColor = previewMode === 'dark' ? '#FCFAF6' : '#1C1C1C';

    // ─────────────────────────────────────────────────────────────────
    // TEMPLATE 1: CLASSIC CORPORATE (Secondary Logo Light/Dark)
    // ─────────────────────────────────────────────────────────────────
    if (templateId === 'classic') {
      const path = previewMode === 'dark' ? selectedEntity.secondaryDark : selectedEntity.secondaryLight;
      const logoUrl = isForExport ? `${cdnBaseUrl.replace(/\/$/, '')}${path}` : path;

      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Outfit', 'Inter', 'Segoe UI', Arial, sans-serif; font-size: 13px; color: ${bodyTextColor}; line-height: 1.45; max-width: 580px;">
  <tr>
    <td style="padding-right: 16px; border-right: 3.5px solid ${brandCol}; vertical-align: top; text-align: center;">
      <img src="${logoUrl}" alt="${selectedEntity.shortName}" width="72" style="display: block; border: 0; max-width: 90px; height: auto; margin: 0 auto;" />
    </td>
    <td style="padding-left: 16px; vertical-align: top;">
      <div style="font-size: 16px; font-weight: 700; color: ${primaryTextColor}; letter-spacing: -0.01em; margin-bottom: 2px;">
        ${name}${mmcBadgeHtml}
      </div>
      <div style="font-size: 12px; color: ${previewMode === 'dark' ? '#6DC6EC' : brandCol}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;">
        ${title} ${department ? `&bull; ${department}` : ''}
      </div>
      <div style="font-size: 11.5px; color: ${previewMode === 'dark' ? '#CBD5E1' : '#475569'}; font-weight: 600; margin-bottom: 6px;">
        ${selectedEntity.name} (${selectedEntity.code})
      </div>
      <div style="font-size: 12px; color: ${previewMode === 'dark' ? '#94A3B8' : '#64748B'}; margin-bottom: 4px;">
        <strong style="color: ${primaryTextColor};">T:</strong> ${phone} &nbsp;|&nbsp; <strong style="color: ${primaryTextColor};">E:</strong> <a href="mailto:${email}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; font-weight: 600; text-decoration: none;">${email}</a>
      </div>
      <div style="font-size: 12px; color: ${previewMode === 'dark' ? '#94A3B8' : '#64748B'};">
        <strong style="color: ${primaryTextColor};">W:</strong> <a href="${siteUrl}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; font-weight: 600; text-decoration: none;">${website}</a> &nbsp;|&nbsp; ${location}
      </div>
      ${socialIconsHtml}
      ${ctaBannerHtml}
    </td>
  </tr>
</table>
`.trim();
    }

    // ─────────────────────────────────────────────────────────────────
    // TEMPLATE 2: CLINICAL SPECIALIST (Primary Dark Logo)
    // ─────────────────────────────────────────────────────────────────
    if (templateId === 'clinical') {
      const path = selectedEntity.primaryDark;
      const logoUrl = isForExport ? `${cdnBaseUrl.replace(/\/$/, '')}${path}` : path;

      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Outfit', 'Inter', 'Segoe UI', Arial, sans-serif; font-size: 13px; color: ${bodyTextColor}; line-height: 1.45; max-width: 580px; border: 1px solid ${previewMode === 'dark' ? '#334155' : '#E2E8F0'}; border-radius: 8px; background-color: ${previewMode === 'dark' ? '#0F172A' : '#FFFFFF'};">
  <tr>
    <td style="background-color: ${brandCol}; padding: 10px 16px; border-top-left-radius: 7px; border-top-right-radius: 7px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="vertical-align: middle;">
            <img src="${logoUrl}" alt="${selectedEntity.shortName}" width="110" style="display: block; border: 0; max-width: 140px; height: auto;" />
          </td>
          <td style="text-align: right; color: #FFFFFF; font-size: 10.5px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
            Clinical Medical Identity
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding: 16px;">
      <div style="font-size: 17px; font-weight: 800; color: ${primaryTextColor}; margin-bottom: 2px;">
        ${name}
      </div>
      <div style="font-size: 12px; color: ${previewMode === 'dark' ? '#6DC6EC' : brandCol}; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px;">
        ${title}
      </div>
      <div style="font-size: 11px; color: ${previewMode === 'dark' ? '#94A3B8' : '#475569'}; margin-bottom: 10px;">
        <span style="background: ${previewMode === 'dark' ? '#1E293B' : '#F1F5F9'}; color: ${previewMode === 'dark' ? '#6DC6EC' : '#0F172A'}; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">${mmcNo || 'MMC Registered Practitioner'}</span>
        &bull; ${department || 'Clinical Medicine'} &bull; ${selectedEntity.name}
      </div>
      
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 12px; color: ${previewMode === 'dark' ? '#CBD5E1' : '#475569'}; background: ${previewMode === 'dark' ? '#1E293B' : '#F8FAFC'}; padding: 10px 12px; border-radius: 6px; margin-bottom: 8px;">
        <tr>
          <td style="padding-bottom: 4px;">
            <strong style="color: ${primaryTextColor};">Direct Appointments:</strong> ${phone} &nbsp;|&nbsp; <strong style="color: ${primaryTextColor};">Email:</strong> <a href="mailto:${email}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; font-weight: 600; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td>
            <strong style="color: ${primaryTextColor};">Clinic Location:</strong> ${location} &nbsp;|&nbsp; <a href="${siteUrl}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; font-weight: 600; text-decoration: none;">${website}</a>
          </td>
        </tr>
      </table>
      ${socialIconsHtml}
      ${ctaBannerHtml}
    </td>
  </tr>
</table>
`.trim();
    }

    // ─────────────────────────────────────────────────────────────────
    // TEMPLATE 3: MODERN MINIMALIST (Secondary Logo Light/Dark)
    // ─────────────────────────────────────────────────────────────────
    if (templateId === 'modern') {
      const path = previewMode === 'dark' ? selectedEntity.secondaryDark : selectedEntity.secondaryLight;
      const logoUrl = isForExport ? `${cdnBaseUrl.replace(/\/$/, '')}${path}` : path;

      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Outfit', 'Inter', 'Segoe UI', Arial, sans-serif; font-size: 13px; color: ${bodyTextColor}; line-height: 1.45; max-width: 540px;">
  <tr>
    <td style="padding-bottom: 12px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align: middle; padding-right: 12px;">
            <img src="${logoUrl}" alt="${selectedEntity.shortName}" width="72" style="display: block; border: 0; max-width: 90px; height: auto;" />
          </td>
          <td style="vertical-align: middle; border-left: 2px solid ${previewMode === 'dark' ? '#334155' : '#E2E8F0'}; padding-left: 12px;">
            <div style="font-size: 16px; font-weight: 800; color: ${primaryTextColor};">${name}</div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${previewMode === 'dark' ? '#6DC6EC' : brandCol}; text-transform: uppercase; letter-spacing: 0.05em;">${title}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px; border-top: 2px solid ${brandCol};">
      <div style="font-size: 11.5px; color: ${previewMode === 'dark' ? '#94A3B8' : '#64748B'}; margin-bottom: 6px;">
        <span style="font-weight: 700; color: ${primaryTextColor};">${selectedEntity.shortName}</span> &bull; ${department || 'Corporate Division'} ${mmcNo ? `&bull; ${mmcNo}` : ''}
      </div>
      <div style="font-size: 12px; color: ${previewMode === 'dark' ? '#CBD5E1' : '#334155'}; line-height: 1.6;">
        <span style="background: ${previewMode === 'dark' ? '#1E293B' : '#F1F5F9'}; padding: 3px 8px; border-radius: 4px; font-weight: 600; display: inline-block; margin-right: 4px; margin-bottom: 4px;">&#9742; ${phone}</span>
        <span style="background: ${previewMode === 'dark' ? '#1E293B' : '#F1F5F9'}; padding: 3px 8px; border-radius: 4px; font-weight: 600; display: inline-block; margin-right: 4px; margin-bottom: 4px;">&#9993; <a href="mailto:${email}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; text-decoration: none;">${email}</a></span>
        <span style="background: ${previewMode === 'dark' ? '#1E293B' : '#F1F5F9'}; padding: 3px 8px; border-radius: 4px; font-weight: 600; display: inline-block; margin-bottom: 4px;">&#127760; <a href="${siteUrl}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; text-decoration: none;">${website}</a></span>
      </div>
      ${socialIconsHtml}
      ${ctaBannerHtml}
    </td>
  </tr>
</table>
`.trim();
    }

    // ─────────────────────────────────────────────────────────────────
    // TEMPLATE 4: EXECUTIVE COMPACT (Logomark Light/Dark)
    // ─────────────────────────────────────────────────────────────────
    const path = previewMode === 'dark' ? selectedEntity.markDark : selectedEntity.markLight;
    const logoUrl = isForExport ? `${cdnBaseUrl.replace(/\/$/, '')}${path}` : path;

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Outfit', 'Inter', 'Segoe UI', Arial, sans-serif; font-size: 12px; color: ${bodyTextColor}; line-height: 1.4; max-width: 580px;">
  <tr>
    <td style="vertical-align: middle; padding-right: 10px;">
      <img src="${logoUrl}" alt="${selectedEntity.shortName}" width="28" height="28" style="display: block; border: 0; border-radius: 4px;" />
    </td>
    <td style="vertical-align: middle;">
      <div style="font-size: 13.5px; font-weight: 700; color: ${primaryTextColor};">
        ${name} <span style="font-weight: 500; color: ${previewMode === 'dark' ? '#6DC6EC' : brandCol}; font-size: 12px;">&bull; ${title}</span>
      </div>
      <div style="font-size: 11px; color: ${previewMode === 'dark' ? '#94A3B8' : '#64748B'};">
        <strong style="color: ${primaryTextColor};">${selectedEntity.shortName}</strong> &nbsp;|&nbsp; T: ${phone} &nbsp;|&nbsp; E: <a href="mailto:${email}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; text-decoration: none; font-weight: 600;">${email}</a> &nbsp;|&nbsp; <a href="${siteUrl}" style="color: ${previewMode === 'dark' ? '#21A1F7' : brandCol}; text-decoration: none;">${website}</a>
      </div>
    </td>
  </tr>
</table>
`.trim();
  }

  // Live preview HTML (uses local relative logo paths)
  let livePreviewHtml = $derived.by(() => buildSignatureTable({ isForExport: false }));

  // Export HTML (uses full CDN URLs for Outlook/Gmail)
  let exportHtml = $derived.by(() => buildSignatureTable({ isForExport: true }));

  // --- Copy Actions ---
  async function copyRichSignature() {
    try {
      const type = 'text/html';
      const blob = new Blob([exportHtml], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      await navigator.clipboard.write(data);
      copiedMode = 'rich';
      setTimeout(() => (copiedMode = ''), 3000);
    } catch (e) {
      await navigator.clipboard.writeText(exportHtml);
      copiedMode = 'rich';
      setTimeout(() => (copiedMode = ''), 3000);
    }
  }

  async function copyRawHtml() {
    try {
      await navigator.clipboard.writeText(exportHtml);
      copiedMode = 'raw';
      setTimeout(() => (copiedMode = ''), 3000);
    } catch (e) {
      console.error(e);
    }
  }

  function downloadHtmlFile() {
    const filename = `suamisihat-signature-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
    const element = document.createElement('a');
    const file = new Blob([exportHtml], { type: 'text/html;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
</script>

<svelte:head>
  <title>Signature Studio — SuamiSihat™ Design System</title>
</svelte:head>

<!-- Art Director Hero Banner -->
<SSHero
  eyebrow="Staff Communications &bull; SuamiSihat™ Corporate"
  title="Signature Studio &amp; Mail Identity"
  subtitle="Art-directed email signature generator powering unified, clinical-grade corporate signatures across Outlook, Gmail, Apple Mail, and Exchange enterprise environments."
  showBadges={false}
>
  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
    <span class="f-hero-badge-item" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.825rem; font-weight: 500; color: rgba(255, 255, 255, 0.9);">
      <iconify-icon icon="fluent:building-24-regular" style="color: #6DC6EC;"></iconify-icon>
      6 Corporate Entities
    </span>
    <span class="f-hero-badge-item" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.825rem; font-weight: 500; color: rgba(255, 255, 255, 0.9);">
      <iconify-icon icon="fluent:stethoscope-24-regular" style="color: #6DC6EC;"></iconify-icon>
      Medical &amp; MMC Compliant
    </span>
    <span class="f-hero-badge-item" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.825rem; font-weight: 500; color: rgba(255, 255, 255, 0.9);">
      <iconify-icon icon="fluent:dark-theme-24-regular" style="color: #6DC6EC;"></iconify-icon>
      Dark Mode Tested
    </span>
    <span class="f-hero-badge-item" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.825rem; font-weight: 500; color: rgba(255, 255, 255, 0.9);">
      <iconify-icon icon="fluent:mail-copy-24-regular" style="color: #6DC6EC;"></iconify-icon>
      Rich HTML Clipboard
    </span>
  </div>
</SSHero>

<div class="w-100 py-5" style="width: 100%; max-width: 100%; padding: 2.5rem clamp(1.5rem, 4vw, 4rem); box-sizing: border-box;">
  
  <!-- Breadcrumb -->
  <nav class="brand-breadcrumb mb-4" aria-label="Breadcrumb" style="font-size: 0.8rem; display: flex; align-items: center; gap: 8px;">
    <a href="/" style="color: var(--color-neutral-fg-3); text-decoration: none;">Home</a>
    <iconify-icon icon="fluent:chevron-right-12-regular" style="color: var(--color-neutral-fg-3);"></iconify-icon>
    <a href="/tools" style="color: var(--color-neutral-fg-3); text-decoration: none;">Staff Tools</a>
    <iconify-icon icon="fluent:chevron-right-12-regular" style="color: var(--color-neutral-fg-3);"></iconify-icon>
    <span style="color:var(--color-neutral-fg-1); font-weight:600;">Signature Studio</span>
  </nav>

  <!-- Quick Preset Profiles Bar -->
  <div class="card p-3 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
      <div style="font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-fg-1); display:flex; align-items:center; gap:6px;">
        <iconify-icon icon="fluent:flash-24-regular" style="color:var(--color-brand-primary);"></iconify-icon>
        Quick Preset Staff Profiles
      </div>
      <span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Click to populate sample executive or medical data</span>
    </div>
    <div class="d-flex flex-wrap gap-2">
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary rounded-pill px-3"
        onclick={() => loadPresetProfile('exec')}
        style="font-size:0.8rem;font-weight:600;"
      >
        <iconify-icon icon="fluent:person-support-24-regular"></iconify-icon> John Doe (Operations Manager)
      </button>
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary rounded-pill px-3"
        onclick={() => loadPresetProfile('doctor')}
        style="font-size:0.8rem;font-weight:600;"
      >
        <iconify-icon icon="fluent:stethoscope-24-regular"></iconify-icon> Dr. Amirul (Medical Director)
      </button>
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary rounded-pill px-3"
        onclick={() => loadPresetProfile('consultant')}
        style="font-size:0.8rem;font-weight:600;"
      >
        <iconify-icon icon="fluent:heart-pulse-24-regular"></iconify-icon> Sarah Tan (Wellness Advisor)
      </button>
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary rounded-pill px-3"
        onclick={() => loadPresetProfile('ecom')}
        style="font-size:0.8rem;font-weight:600;"
      >
        <iconify-icon icon="fluent:cart-24-regular"></iconify-icon> Rizal Azman (E-Commerce Operations)
      </button>
    </div>
  </div>

  <!-- Entity Selector Card -->
  <div class="card p-3 border rounded-4 shadow-sm mb-4" style="background: var(--color-layer-card, #FFFFFF);">
    <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
      <span style="font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-fg-1);">Select Corporate Entity</span>
      <span style="font-size:0.75rem;color:var(--color-neutral-fg-3);">Automatically applies brand color tokens, domain, and vector logos</span>
    </div>
    <div class="d-flex flex-wrap gap-2">
      {#each Object.entries(entities) as [key, ent]}
        <button
          type="button"
          class="btn btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3"
          class:btn-primary={entityKey === key}
          class:btn-outline-secondary={entityKey !== key}
          onclick={() => selectEntity(key)}
          style="font-size:0.8rem;font-weight:600;"
        >
          <span style="width:10px;height:10px;border-radius:50%;background:{ent.color};display:inline-block;"></span>
          {ent.code} &middot; {ent.shortName}
        </button>
      {/each}
    </div>
  </div>

  <div class="row g-4">
    <!-- Form Inputs Sidebar -->
    <div class="col-lg-5">
      <div class="card p-4 border rounded-4 shadow-sm" style="background: var(--color-layer-card, #FFFFFF);">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h4 class="fw-bold mb-0" style="font-size: 1.1rem; color: var(--color-neutral-fg-1);">Staff Credentials</h4>
          <span class="ss-badge ss-badge-brand" style="font-size:0.72rem;">Step 1 of 2</span>
        </div>

        <!-- Template Style Selector -->
        <div class="mb-3 p-3 border rounded-3 bg-light">
          <label for="templateSelect" class="form-label fw-semibold" style="font-size: 0.85rem; color: var(--color-neutral-fg-1);">Signature Layout Template</label>
          <select id="templateSelect" class="form-select" bind:value={templateId}>
            <option value="classic">Classic Corporate (Secondary Logo)</option>
            <option value="clinical">Clinical Specialist (Primary Dark Logo)</option>
            <option value="modern">Modern Minimalist (Secondary Logo)</option>
            <option value="compact">Executive Compact (Logomark Icon)</option>
          </select>
        </div>

        <!-- Personal Info -->
        <div class="mb-3">
          <label for="nameInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Full Name</label>
          <input id="nameInput" type="text" class="form-control" bind:value={name} placeholder="John Doe" />
        </div>

        <div class="row g-2 mb-3">
          <div class="col-6">
            <label for="titleInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Job Title</label>
            <input id="titleInput" type="text" class="form-control" bind:value={title} placeholder="Operations Manager" />
          </div>
          <div class="col-6">
            <label for="deptInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Department / Unit</label>
            <input id="deptInput" type="text" class="form-control" bind:value={department} placeholder="e.g. Clinical Ops" />
          </div>
        </div>

        <div class="mb-3">
          <label for="mmcInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Staff ID / MMC Registration (Optional)</label>
          <input id="mmcInput" type="text" class="form-control" bind:value={mmcNo} placeholder="SSXXXX" />
        </div>

        <!-- Contact Methods -->
        <h5 class="fw-bold mt-4 mb-2" style="font-size: 0.95rem; color: var(--color-brand-primary);">Contact Information</h5>

        <div class="row g-2 mb-3">
          <div class="col-6">
            <label for="phoneInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Direct Phone</label>
            <input id="phoneInput" type="text" class="form-control" bind:value={phone} />
          </div>
          <div class="col-6">
            <label for="whatsappInput" class="form-label fw-semibold" style="font-size: 0.85rem;">WhatsApp Direct</label>
            <input id="whatsappInput" type="text" class="form-control" bind:value={whatsapp} placeholder="+60123456789" />
          </div>
        </div>

        <div class="mb-3">
          <label for="emailInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Work Email</label>
          <input id="emailInput" type="email" class="form-control" bind:value={email} />
        </div>

        <div class="row g-2 mb-3">
          <div class="col-6">
            <label for="websiteInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Official Domain</label>
            <input id="websiteInput" type="text" class="form-control" bind:value={website} />
          </div>
          <div class="col-6">
            <label for="locationInput" class="form-label fw-semibold" style="font-size: 0.85rem;">Office Location</label>
            <input id="locationInput" type="text" class="form-control" bind:value={location} />
          </div>
        </div>

        <!-- Customization Toggles -->
        <h5 class="fw-bold mt-4 mb-2" style="font-size: 0.95rem; color: var(--color-brand-primary);">Layout &amp; Add-ons</h5>

        <!-- Social Media Links -->
        <div class="form-check form-switch mb-2">
          <input class="form-check-input" type="checkbox" id="socialsSwitch" bind:checked={includeSocials}>
          <label class="form-check-label" for="socialsSwitch" style="font-size:0.85rem;font-weight:600;">Include Social Links (LinkedIn / Instagram)</label>
        </div>

        {#if includeSocials}
          <div class="ps-3 border-start mb-3">
            <div class="mb-2">
              <input type="text" class="form-control form-control-sm" bind:value={linkedin} placeholder="LinkedIn URL" />
            </div>
            <div>
              <input type="text" class="form-control form-control-sm" bind:value={instagram} placeholder="Instagram URL" />
            </div>
          </div>
        {/if}

        <!-- Promotional CTA Banner -->
        <div class="form-check form-switch mb-2">
          <input class="form-check-input" type="checkbox" id="ctaSwitch" bind:checked={includeCtaBanner}>
          <label class="form-check-label" for="ctaSwitch" style="font-size:0.85rem;font-weight:600;">Include Call-to-Action (CTA) Banner</label>
        </div>

        {#if includeCtaBanner}
          <div class="ps-3 border-start mb-3">
            <div class="mb-2">
              <input type="text" class="form-control form-control-sm" bind:value={ctaText} placeholder="CTA Button Text" />
            </div>
            <div>
              <input type="text" class="form-control form-control-sm" bind:value={ctaUrl} placeholder="CTA Destination Link" />
            </div>
          </div>
        {/if}

        <!-- Advanced CDN Base URL -->
        <div class="mt-4 pt-3 border-top">
          <label for="cdnUrlInput" class="form-label fw-semibold" style="font-size: 0.75rem; color: var(--color-neutral-fg-3);">Asset CDN Base URL (For Email Exports)</label>
          <input id="cdnUrlInput" type="text" class="form-control form-control-sm" bind:value={cdnBaseUrl} style="font-family: monospace; font-size: 0.75rem;" />
        </div>
      </div>
    </div>

    <!-- Live Preview & Export Column -->
    <div class="col-lg-7">
      <div class="card p-4 border rounded-4 shadow-sm h-100" style="background: var(--color-layer-card, #FFFFFF);">
        
        <!-- Header & Inbox Theme Toggle -->
        <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <div>
            <h4 class="fw-bold mb-0" style="font-size: 1.1rem; color: var(--color-neutral-fg-1);">Live Mail Client Preview</h4>
            <span style="font-size:0.75rem; color: var(--color-neutral-fg-3);">Real-time HTML rendering as seen by recipients</span>
          </div>

          <!-- Preview Mode Toggle (Light vs Dark Email Client) -->
          <div class="btn-group btn-group-sm" role="group" aria-label="Inbox Theme Preview">
            <button
              type="button"
              class="btn"
              class:btn-dark={previewMode === 'dark'}
              class:btn-outline-secondary={previewMode !== 'dark'}
              onclick={() => (previewMode = 'dark')}
              style="font-size: 0.75rem; font-weight: 600;"
            >
              <iconify-icon icon="fluent:weather-moon-24-regular"></iconify-icon> Dark Inbox
            </button>
            <button
              type="button"
              class="btn"
              class:btn-primary={previewMode === 'light'}
              class:btn-outline-secondary={previewMode !== 'light'}
              onclick={() => (previewMode = 'light')}
              style="font-size: 0.75rem; font-weight: 600;"
            >
              <iconify-icon icon="fluent:weather-sunny-24-regular"></iconify-icon> Light Inbox
            </button>
          </div>
        </div>

        <!-- Simulated Email Reader Window -->
        <div 
          class="border rounded-3 mb-4 shadow-sm overflow-hidden" 
          style="transition: background-color 0.2s ease, border-color 0.2s ease;"
        >
          <!-- Email Chrome Bar -->
          <div style="background: {previewMode === 'dark' ? '#0F172A' : '#F1F5F9'}; padding: 10px 16px; border-bottom: 1px solid {previewMode === 'dark' ? '#334155' : '#E2E8F0'}; font-size: 0.78rem; color: {previewMode === 'dark' ? '#94A3B8' : '#64748B'};">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <span><strong>From:</strong> {name} &lt;{email}&gt;</span>
              <span class="badge" style="background: {selectedEntity.color}; color: #FFFFFF;">{selectedEntity.code}</span>
            </div>
            <div><strong>Subject:</strong> SuamiSihat™ Q3 Operations &amp; Clinical Direction</div>
          </div>

          <!-- Canvas Render Pane -->
          <div 
            style="min-height: 240px; padding: 2rem; background: {previewMode === 'dark' ? '#1C1C1C' : '#FFFFFF'}; color: {previewMode === 'dark' ? '#FCFAF6' : '#19191A'}; overflow-x: auto; display: flex; align-items: center;"
          >
            <!-- Render HTML Signature -->
            {@html livePreviewHtml}
          </div>
        </div>

        <!-- Export Buttons Group -->
        <div class="d-flex flex-wrap gap-2 mb-4">
          <button 
            type="button" 
            onclick={copyRichSignature} 
            class="btn btn-primary rounded-pill px-4 btn-md d-inline-flex align-items-center gap-2"
          >
            <iconify-icon icon={copiedMode === 'rich' ? "fluent:checkmark-24-regular" : "fluent:copy-24-regular"} width="18"></iconify-icon>
            <strong>{copiedMode === 'rich' ? 'Copied Rich Signature!' : 'Copy Formatted Signature (Clipboard)'}</strong>
          </button>

          <button 
            type="button" 
            onclick={copyRawHtml} 
            class="btn btn-outline-secondary rounded-pill px-3 btn-md d-inline-flex align-items-center gap-2"
          >
            <iconify-icon icon={copiedMode === 'raw' ? "fluent:checkmark-24-regular" : "fluent:code-24-regular"} width="16"></iconify-icon>
            {copiedMode === 'raw' ? 'Copied HTML Code!' : 'Copy HTML Source'}
          </button>

          <button 
            type="button" 
            onclick={downloadHtmlFile} 
            class="btn btn-outline-secondary rounded-pill px-3 btn-md d-inline-flex align-items-center gap-2"
          >
            <iconify-icon icon="fluent:arrow-download-24-regular" width="16"></iconify-icon>
            Download .HTML File
          </button>
        </div>

        <!-- Installation Instructions Accordion -->
        <div class="card p-3 border rounded-3 bg-light mb-0" style="font-size: 0.85rem;">
          <h5 class="fw-bold mb-2" style="font-size: 0.95rem; color: var(--color-neutral-fg-1);">
            <iconify-icon icon="fluent:book-information-24-regular" style="vertical-align: text-bottom; color: var(--color-brand-primary);"></iconify-icon>
            Installation Guide by Email Client
          </h5>

          <ul class="nav nav-tabs border-bottom-0 mb-2" id="clientTabs" role="tablist" style="font-size: 0.78rem;">
            <li class="nav-item" role="presentation">
              <button class="nav-link active py-1 px-3" id="outlook-tab" data-bs-toggle="tab" data-bs-target="#outlook-pane" type="button" role="tab">Outlook (Desktop/Web)</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link py-1 px-3" id="gmail-tab" data-bs-toggle="tab" data-bs-target="#gmail-pane" type="button" role="tab">Gmail &amp; Workspace</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link py-1 px-3" id="apple-tab" data-bs-toggle="tab" data-bs-target="#apple-pane" type="button" role="tab">Apple Mail (macOS)</button>
            </li>
          </ul>

          <div class="tab-content" id="clientTabContent" style="color: var(--color-neutral-fg-2); line-height: 1.5; font-size: 0.8rem;">
            <div class="tab-pane fade show active" id="outlook-pane" role="tabpanel" aria-labelledby="outlook-tab">
              <ol class="mb-0 ps-3">
                <li>Click <strong>"Copy Formatted Signature (Clipboard)"</strong> above.</li>
                <li>Open Microsoft Outlook &rarr; go to <strong>File &rarr; Options &rarr; Mail &rarr; Signatures...</strong> (or Outlook Settings &rarr; Accounts &rarr; Signatures on Web).</li>
                <li>Create a new signature, click in the edit body box, and press <kbd>Ctrl+V</kbd> (Windows) or <kbd>Cmd+V</kbd> (Mac) to paste.</li>
                <li>Select your new signature for <em>"New messages"</em> and <em>"Replies/forwards"</em>. Save and close.</li>
              </ol>
            </div>
            <div class="tab-pane fade" id="gmail-pane" role="tabpanel" aria-labelledby="gmail-tab">
              <ol class="mb-0 ps-3">
                <li>Click <strong>"Copy Formatted Signature (Clipboard)"</strong> above.</li>
                <li>Open Gmail in your web browser &rarr; click the gear icon &#9881; &rarr; <strong>See all settings</strong>.</li>
                <li>Scroll down to the <strong>Signature</strong> section &rarr; click <strong>+ Create new</strong>.</li>
                <li>Paste (<kbd>Ctrl+V</kbd> / <kbd>Cmd+V</kbd>) into the text editor box.</li>
                <li>Set Signature defaults to your new signature and click <strong>Save Changes</strong> at the bottom of the page.</li>
              </ol>
            </div>
            <div class="tab-pane fade" id="apple-pane" role="tabpanel" aria-labelledby="apple-tab">
              <ol class="mb-0 ps-3">
                <li>Click <strong>"Copy Formatted Signature (Clipboard)"</strong> above.</li>
                <li>Open Apple Mail on macOS &rarr; <strong>Mail &rarr; Settings (Preferences) &rarr; Signatures</strong>.</li>
                <li>Choose your email account and click <strong>+</strong> to add a signature.</li>
                <li>Uncheck <em>"Always match my default message font"</em>, then paste (<kbd>Cmd+V</kbd>) into the preview box.</li>
              </ol>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</div>
