/**
 * SS Design System — Gallery Asset Helpers  (DUP-02)
 * Shared utility functions for all product sub-brand gallery pages.
 * Extracted from: products/Androlab, Mensculine, MENSS, Rejal
 *
 * Load this BEFORE any product page inline scripts.
 */

/**
 * Convert a raw filename into a human-readable asset title.
 * Strips the file extension, splits on hyphens/underscores, and
 * title-cases each word with SS-specific abbreviation rules.
 *
 * @param {string} filename  e.g. 'logo_ssh_primary_light.svg'
 * @returns {string}         e.g. 'Logo SS Primary Light'
 */
function formatAssetName(filename) {
    const base = filename.substring(0, filename.lastIndexOf('.')) || filename;
    return base.split(/[-_]/).map(word => {
        const w = word.toLowerCase();
        if (w === 'ssh' || w === 'ss') return 'SS';
        if (w === 'rx') return 'Rx';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

/**
 * Return a human-readable format description based on file extension.
 *
 * @param {string} filename  e.g. 'logo.svg'
 * @returns {string}         e.g. 'Vector SVG · Scalable Resolution'
 */
function getAssetMeta(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === 'svg')  return 'Vector SVG · Scalable Resolution';
    if (ext === 'png')  return 'PNG Image · High Definition';
    if (ext === 'jpg' || ext === 'jpeg') return 'JPEG Image · Compressed Layout';
    return 'Asset File';
}

/**
 * Map a tag string to its CSS class name.
 *
 * @param {string} tag  e.g. 'clinic', 'wellness', 'ecom'
 * @returns {string}    CSS class name
 */
function getTagClass(tag) {
    const t = tag.toLowerCase();
    if (t.includes('clinic'))                       return 'tag-clinic';
    if (t.includes('wellness') || t.includes('supplement')) return 'tag-wellness';
    if (t.includes('ecom') || t.includes('groom')) return 'tag-ecom';
    return 'tag-ss';
}

/**
 * Return an HTML icon string for a given tag.
 *
 * @param {string} tag  e.g. 'clinic', 'wellness', 'ecom'
 * @returns {string}    HTML string with Font Awesome icon
 */
function getTagIcon(tag) {
    const t = tag.toLowerCase();
    if (t.includes('clinic'))                       return '<i class="fa-solid fa-stethoscope me-1"></i>';
    if (t.includes('wellness') || t.includes('supplement')) return '<i class="fa-solid fa-capsules me-1"></i>';
    if (t.includes('ecom') || t.includes('groom')) return '<i class="fa-solid fa-shopping-bag me-1"></i>';
    return '<i class="fa-solid fa-circle-nodes me-1"></i>';
}
