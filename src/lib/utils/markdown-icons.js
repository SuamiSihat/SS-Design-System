/**
 * Markdown icon shortcodes.
 * Docs must not use emoji (brand rule). Write {{icon:<fluent-name>}} instead, e.g.
 *   {{icon:checkmark-circle-16-filled}}  {{icon:dismiss-circle-16-filled}}
 * After marked() renders the HTML, this swaps each shortcode for a Fluent System Icon.
 * Short aliases: {{icon:yes}}, {{icon:no}}, {{icon:warning}}, {{icon:info}}.
 */
const ALIASES = {
  yes: 'checkmark-circle-16-filled',
  no: 'dismiss-circle-16-filled',
  warning: 'warning-16-filled',
  info: 'info-16-filled',
  star: 'star-16-filled',
  arrow: 'arrow-right-16-regular'
};

const LABELS = { yes: 'Yes', no: 'No', warning: 'Warning', info: 'Info', star: '', arrow: '' };

export function renderIconShortcodes(html) {
  return html.replace(/\{\{icon:([a-z0-9-]+)\}\}/g, (_, name) => {
    const icon = ALIASES[name] || name;
    const tone = name === 'yes' ? ' ss-md-icon--yes' : name === 'no' ? ' ss-md-icon--no' : '';
    const label = LABELS[name];
    const a11y = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
    return `<iconify-icon class="ss-md-icon${tone}" icon="fluent:${icon}"${a11y}></iconify-icon>`;
  });
}
