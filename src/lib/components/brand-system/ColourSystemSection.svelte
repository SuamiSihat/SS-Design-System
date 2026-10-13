<script>
  let { copyHex } = $props();

  const brandColors = [
    {
      group: 'Main colours',
      items: [
        {
          name: 'SS Prussian Blue',
          token: '--ss-prussian-blue',
          hex: '#022057',
          rgb: 'rgb(2, 32, 87)',
          cmyk: '98, 63, 0, 66',
          lab: 'L:14.1, a:11.2, b:-37.8',
          bal_ral: 'RAL 5013 (Cobalt Blue) · BAL 20 C 40',
          pantone: 'Pantone 281 C',
          role: 'Deep blue for headers, menus and large blocks. Gives a serious, trusted look.',
          textColor: '#FFFFFF'
        },
        {
          name: 'SS Blue',
          token: '--ss-blue',
          hex: '#043388',
          rgb: 'rgb(4, 51, 136)',
          cmyk: '97, 63, 0, 47',
          lab: 'L:24.3, a:16.8, b:-53.4',
          bal_ral: 'RAL 5002 (Ultramarine Blue) · BAL 20 C 39',
          pantone: 'Pantone 287 C',
          role: 'The main SuamiSihat® blue. Used in the logo.',
          textColor: '#FFFFFF'
        },
        {
          name: 'Azure',
          token: '--ss-azure',
          hex: '#21A1F7',
          rgb: 'rgb(33, 161, 247)',
          cmyk: '87, 35, 0, 3',
          lab: 'L:64.5, a:-7.6, b:-53.9',
          bal_ral: 'RAL 5012 (Light Blue) · BAL 18 E 53',
          pantone: 'Pantone 299 C',
          role: 'Bright blue for buttons and links. Use sparingly.',
          textColor: '#FFFFFF'
        },
        {
          name: 'Malibu',
          token: '--ss-malibu',
          hex: '#6DC6EC',
          rgb: 'rgb(109, 198, 236)',
          cmyk: '54, 16, 0, 7',
          lab: 'L:76.8, a:-18.2, b:-28.9',
          bal_ral: 'RAL 5024 (Pastel Blue) · BAL 18 C 35',
          pantone: 'Pantone 297 C',
          role: 'Light blue for soft highlights and hover effects.',
          textColor: '#1C1C1C'
        },
        {
          name: 'Carbon Black',
          token: '--ss-neutral-black',
          hex: '#1C1C1C',
          rgb: 'rgb(28, 28, 28)',
          cmyk: '0, 0, 0, 89',
          lab: 'L:11.2, a:0.0, b:0.0',
          bal_ral: 'RAL 9005 (Jet Black) · BAL 00 E 53',
          pantone: 'Pantone Black 6 C',
          role: 'Text colour on light backgrounds.',
          textColor: '#FFFFFF'
        },
        {
          name: 'Porcelain White',
          token: '--ss-neutral-white',
          hex: '#FCFAF6',
          rgb: 'rgb(252, 250, 246)',
          cmyk: '0, 1, 2, 1',
          lab: 'L:98.5, a:-0.2, b:2.4',
          bal_ral: 'RAL 9003 (Signal White) · BAL 00 E 55',
          pantone: 'Pantone 705 C',
          role: 'Text colour on dark backgrounds, and a soft off-white background.',
          textColor: '#1C1C1C'
        }
      ]
    },
    {
      group: 'Warm and highlight colours',
      items: [
        {
          name: 'Lion',
          token: '--ss-lion',
          hex: '#BD9A73',
          rgb: 'rgb(189, 154, 115)',
          cmyk: '0, 19, 39, 26',
          lab: 'L:65.2, a:8.7, b:25.8',
          bal_ral: 'RAL 1024 (Ochre Yellow) · BAL 08 C 35',
          pantone: 'Pantone 4655 C',
          role: 'Warm gold for premium touches and seals.',
          textColor: '#1C1C1C'
        },
        {
          name: 'Fawn',
          token: '--ss-fawn',
          hex: '#CCAC8D',
          rgb: 'rgb(204, 172, 141)',
          cmyk: '0, 16, 31, 20',
          lab: 'L:72.1, a:7.9, b:20.8',
          bal_ral: 'RAL 1015 (Light Ivory) · BAL 08 C 31',
          pantone: 'Pantone 4665 C',
          role: 'Soft warm tone for backgrounds and small badges.',
          textColor: '#1C1C1C'
        },
        {
          name: 'Arylide Yellow',
          token: '--ss-arylide',
          hex: '#E5D15C',
          rgb: 'rgb(229, 209, 92)',
          cmyk: '0, 9, 60, 10',
          lab: 'L:83.4, a:-6.1, b:59.3',
          bal_ral: 'RAL 1018 (Zinc Yellow) · BAL 10 E 50',
          pantone: 'Pantone 108 C',
          role: 'Yellow for highlights and star ratings.',
          textColor: '#1C1C1C'
        },
        {
          name: 'Banana Yellow',
          token: '--ss-banana',
          hex: '#FCE53D',
          rgb: 'rgb(252, 229, 61)',
          cmyk: '0, 9, 76, 1',
          lab: 'L:90.8, a:-7.5, b:81.2',
          bal_ral: 'RAL 1016 (Sulfur Yellow) · BAL 10 E 53',
          pantone: 'Pantone 102 C',
          role: 'Bright yellow for offers and badges that must stand out.',
          textColor: '#1C1C1C'
        }
      ]
    },
    {
      group: 'Backgrounds and status colours',
      items: [
        {
          name: 'Light Background',
          token: '--f-color-canvas-light',
          hex: '#F8FAFC',
          rgb: 'rgb(248, 250, 252)',
          cmyk: '2, 1, 0, 1',
          lab: 'L:98.1, a:-0.6, b:-1.2',
          bal_ral: 'RAL 9003 (Signal White) · BAL 00 E 55',
          pantone: 'Pantone 705 C',
          role: 'Main page background in light mode (about 60% of any page).',
          textColor: '#1C1C1C'
        },
        {
          name: 'Dark Background',
          token: '--f-color-void-dark',
          hex: '#090D16',
          rgb: 'rgb(9, 13, 22)',
          cmyk: '59, 41, 0, 91',
          lab: 'L:4.8, a:0.8, b:-6.7',
          bal_ral: 'RAL 9017 (Traffic Black) · BAL 00 E 53',
          pantone: 'Pantone Black 7 C',
          role: 'Main page background in dark mode.',
          textColor: '#FFFFFF'
        },
        {
          name: 'Card White',
          token: '--color-neutral-bg-1',
          hex: '#FFFFFF',
          rgb: 'rgb(255, 255, 255)',
          cmyk: '0, 0, 0, 0',
          lab: 'L:100.0, a:0.0, b:0.0',
          bal_ral: 'RAL 9016 (Traffic White) · BAL 00 E 55',
          pantone: 'Pantone White',
          role: 'White background for cards and pop-up boxes.',
          textColor: '#1C1C1C'
        },
        {
          name: 'Success Green',
          token: '--color-brand-success',
          hex: '#107C10',
          rgb: 'rgb(16, 124, 16)',
          cmyk: '87, 0, 87, 51',
          lab: 'L:45.3, a:-46.2, b:44.1',
          bal_ral: 'RAL 6029 (Mint Green) · BAL 14 E 53',
          pantone: 'Pantone 355 C',
          role: 'Green for success and "done".',
          textColor: '#FFFFFF'
        },
        {
          name: 'Warning Orange',
          token: '--color-brand-warning',
          hex: '#D83B01',
          rgb: 'rgb(216, 59, 1)',
          cmyk: '0, 73, 100, 15',
          lab: 'L:47.8, a:58.2, b:58.9',
          bal_ral: 'RAL 2004 (Pure Orange) · BAL 04 E 55',
          pantone: 'Pantone 1665 C',
          role: 'Orange for warnings, such as low stock.',
          textColor: '#FFFFFF'
        },
        {
          name: 'Error Red',
          token: '--color-brand-error',
          hex: '#A80000',
          rgb: 'rgb(168, 0, 0)',
          cmyk: '0, 100, 100, 34',
          lab: 'L:32.4, a:58.8, b:47.1',
          bal_ral: 'RAL 3020 (Traffic Red) · BAL 04 E 58',
          pantone: 'Pantone 186 C',
          role: 'Red for errors and urgent alerts.',
          textColor: '#FFFFFF'
        }
      ]
    }
  ];
</script>

<section id="colour" class="bs-section" style="margin-bottom: 4rem; scroll-margin-top: 80px;">
  <div class="bs-section-eyebrow" style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-brand-primary); margin-bottom: 4px;">Colours</div>
  <h2 class="bs-section-title" style="font-size: 1.75rem; font-weight: 800; color: var(--color-neutral-fg-1); margin-bottom: 6px;">Our colours</h2>
  <p class="bs-section-desc" style="font-size: 0.95rem; color: var(--color-neutral-fg-2); margin-bottom: 1.5rem;">Click any colour to copy its code. Use these colours and no others. Print shops can use the Pantone number.</p>

  <!-- Palette Groups -->
  {#each brandColors as group}
    <div style="margin-bottom: 2.5rem;">
      <div style="font-size:0.8rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-neutral-fg-1);margin-bottom:1rem;display:flex;align-items:center;gap:8px;">
        <iconify-icon icon="fluent:color-fill-24-regular" style="color:var(--color-brand-primary);font-size:1.1rem;"></iconify-icon>
        {group.group}
      </div>
      
      <div class="bs-colour-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
        {#each group.items as color}
          <div 
            class="bs-swatch-card" 
            onclick={() => copyHex(color.hex, color.name)} 
            style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow:hidden; cursor:pointer; box-shadow:var(--f-shadow-2); transition:transform 0.15s ease, box-shadow 0.15s ease;"
          >
            <!-- Color Bar Header -->
            <div style="background:{color.hex}; height:90px; padding:0.75rem 1rem; display:flex; justify-content:space-between; align-items:flex-start; position:relative;">
              <span style="font-size:0.7rem; font-weight:700; color:#1C1C1C; background:rgba(255,255,255,0.9); padding:2px 8px; border-radius:4px;">
                {color.pantone}
              </span>
              <button 
                type="button" 
                class="btn btn-sm d-inline-flex align-items-center gap-1"
                style="background:rgba(255,255,255,0.85); color:#1C1C1C; font-size:0.7rem; font-weight:700; border:none; padding:3px 8px; border-radius:4px; box-shadow:0 2px 6px rgba(0,0,0,0.15);"
                onclick={(e) => { e.stopPropagation(); copyHex(color.hex, color.name); }}
              >
                <iconify-icon icon="fluent:copy-16-regular"></iconify-icon> Copy code
              </button>
            </div>

            <!-- Color Data Body -->
            <div style="padding:1rem 1.25rem;">
              <div style="font-weight:800; font-size:1rem; color:var(--color-neutral-fg-1); margin-bottom:2px;">{color.name}</div>
              <div style="font-size:0.75rem; color:var(--color-neutral-fg-2); margin-bottom:0.75rem; line-height:1.4;">{color.role}</div>

              <!-- Specification Key-Values -->
              <div style="display:grid; grid-template-columns:1fr; gap:6px; font-size:0.775rem; border-top:1px solid var(--color-neutral-stroke-1); padding-top:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:var(--color-neutral-fg-3); font-weight:600;">Colour code:</span>
                  <strong style="font-family:monospace; color:var(--color-neutral-fg-1);">{color.hex}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:var(--color-neutral-fg-3); font-weight:600;">Pantone:</span>
                  <span style="font-size:0.725rem; font-weight:700; color:var(--color-brand-primary);">{color.pantone}</span>
                </div>
                <details style="margin-top:2px;">
                  <summary style="cursor:pointer; font-size:0.72rem; font-weight:600; color:var(--color-neutral-fg-3);">More codes</summary>
                  <div style="display:grid; gap:6px; margin-top:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:var(--color-neutral-fg-3); font-weight:600;">Code name:</span>
                  <code style="color:var(--color-brand-primary); font-weight:700; font-size:0.725rem;">{color.token}</code>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:var(--color-neutral-fg-3); font-weight:600;">RGB:</span>
                  <span style="font-family:monospace; color:var(--color-neutral-fg-2);">{color.rgb}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:var(--color-neutral-fg-3); font-weight:600;">CMYK:</span>
                  <span style="font-family:monospace; color:var(--color-neutral-fg-2);">{color.cmyk}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:var(--color-neutral-fg-3); font-weight:600;">CIE-Lab:</span>
                  <span style="font-family:monospace; color:var(--color-neutral-fg-2);">{color.lab}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:var(--color-neutral-fg-3); font-weight:600;">BAL / RAL:</span>
                  <span style="font-size:0.725rem; font-weight:600; color:var(--color-neutral-fg-1);">{color.bal_ral}</span>
                </div>
                  </div>
                </details>

              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <details style="margin-bottom:2rem;">
    <summary style="cursor:pointer; font-weight:700; font-size:0.95rem; color:var(--color-neutral-fg-1); padding:0.75rem 0;">Full colour table for designers and printers</summary>
    <!-- All colour codes in one table Table -->
  <div style="margin-top: 3rem; margin-bottom: 2.5rem;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
      <div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-neutral-fg-1); margin:0 0 4px;">All colour codes in one table</h3>
        <p style="font-size: 0.85rem; color: var(--color-neutral-fg-2); margin:0;">Screen, print and paint codes for every colour.</p>
      </div>
    </div>

    <div style="background:var(--color-neutral-bg-2); border:1px solid var(--color-neutral-stroke-1); border-radius:var(--f-radius-xl); overflow-x:auto; box-shadow:var(--f-shadow-4);">
      <table style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left; min-width:860px;">
        <thead>
          <tr style="background:var(--color-neutral-bg-3); border-bottom:1px solid var(--color-neutral-stroke-1); color:var(--color-neutral-fg-1); font-weight:700;">
            <th style="padding:12px 14px; width:50px;">Swatch</th>
            <th style="padding:12px 14px;">Color Name &amp; Role</th>
            <th style="padding:12px 14px;">Token Name</th>
            <th style="padding:12px 14px;">HEX</th>
            <th style="padding:12px 14px;">RGB</th>
            <th style="padding:12px 14px;">CMYK</th>
            <th style="padding:12px 14px;">CIE-Lab</th>
            <th style="padding:12px 14px;">BAL / RAL Standard</th>
            <th style="padding:12px 14px;">Pantone (PMS)</th>
            <th style="padding:12px 14px; text-align:center;">Copy</th>
          </tr>
        </thead>
        <tbody>
          {#each brandColors as group}
            <tr style="background:var(--color-neutral-bg-3); border-bottom:1px solid var(--color-neutral-stroke-1);">
              <td colspan="10" style="padding:8px 14px; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-brand-primary);">
                {group.group}
              </td>
            </tr>
            {#each group.items as color}
              <tr style="border-bottom:1px solid var(--color-neutral-stroke-1); transition:background 0.15s ease;">
                <td style="padding:10px 14px;">
                  <div style="width:28px; height:28px; border-radius:6px; background:{color.hex}; border:1px solid rgba(0,0,0,0.15); box-shadow:0 2px 4px rgba(0,0,0,0.1);"></div>
                </td>
                <td style="padding:10px 14px;">
                  <strong style="color:var(--color-neutral-fg-1); display:block;">{color.name}</strong>
                  <span style="font-size:0.7rem; color:var(--color-neutral-fg-3);">{color.role}</span>
                </td>
                <td style="padding:10px 14px;">
                  <code style="color:var(--color-brand-primary); font-size:0.75rem;">{color.token}</code>
                </td>
                <td style="padding:10px 14px; font-family:monospace; font-weight:700; color:var(--color-neutral-fg-1);">
                  {color.hex}
                </td>
                <td style="padding:10px 14px; font-family:monospace; font-size:0.75rem; color:var(--color-neutral-fg-2);">
                  {color.rgb}
                </td>
                <td style="padding:10px 14px; font-family:monospace; font-size:0.75rem; color:var(--color-neutral-fg-2);">
                  {color.cmyk}
                </td>
                <td style="padding:10px 14px; font-family:monospace; font-size:0.75rem; color:var(--color-neutral-fg-2);">
                  {color.lab}
                </td>
                <td style="padding:10px 14px; font-weight:600; font-size:0.75rem; color:var(--color-neutral-fg-1);">
                  {color.bal_ral}
                </td>
                <td style="padding:10px 14px;">
                  <span class="ss-badge ss-badge-brand" style="font-size:0.7rem; font-weight:700;">{color.pantone}</span>
                </td>
                <td style="padding:10px 14px; text-align:center;">
                  <button 
                    type="button" 
                    class="ss-btn ss-btn-sm ss-btn-secondary" 
                    onclick={() => copyHex(color.hex, color.name)}
                    aria-label="Copy {color.name} hex"
                  >
                    <iconify-icon icon="fluent:copy-16-regular"></iconify-icon>
                  </button>
                </td>
              </tr>
            {/each}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  </details>

  <!-- 7-Stop Interactive Neutral Grayscale Strip -->
  <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-neutral-fg-3);margin-bottom:0.75rem;">Greys (click to copy)</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));border-radius:var(--f-radius-lg);overflow:hidden;border:1px solid var(--color-neutral-stroke-1);box-shadow:var(--f-shadow-4);margin-bottom:1rem;">
    <button type="button" onclick={() => copyHex('#000000', 'Full Black (BG only)')} style="background:#000000;color:#FFFFFF;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
      <div style="font-size:0.72rem;font-weight:700;">Full Black</div>
      <div style="font-size:0.68rem;">#000000 (BG)</div>
    </button>
    <button type="button" onclick={() => copyHex('#3C3C3B', 'Grey 90')} style="background:#3C3C3B;color:#FFFFFF;border:none;border-left:1px solid rgba(255,255,255,0.15);padding:1rem 0.5rem;text-align:center;cursor:pointer;">
      <div style="font-size:0.72rem;font-weight:700;">Grey 90</div>
      <div style="font-size:0.68rem;">#3C3C3B</div>
    </button>
    <button type="button" onclick={() => copyHex('#575756', 'Grey 80')} style="background:#575756;color:#FFFFFF;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
      <div style="font-size:0.72rem;font-weight:700;">Grey 80</div>
      <div style="font-size:0.68rem;">#575756</div>
    </button>
    <button type="button" onclick={() => copyHex('#666666', 'Grey 60')} style="background:#666666;color:#FFFFFF;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
      <div style="font-size:0.72rem;font-weight:700;">Grey 60</div>
      <div style="font-size:0.68rem;">#666666</div>
    </button>
    <button type="button" onclick={() => copyHex('#999999', 'Grey 40')} style="background:#999999;color:#1C1C1C;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
      <div style="font-size:0.72rem;font-weight:700;">Grey 40</div>
      <div style="font-size:0.68rem;">#999999</div>
    </button>
    <button type="button" onclick={() => copyHex('#CCCCCC', 'Grey 20')} style="background:#CCCCCC;color:#1C1C1C;border:none;padding:1rem 0.5rem;text-align:center;cursor:pointer;">
      <div style="font-size:0.72rem;font-weight:700;">Grey 20</div>
      <div style="font-size:0.68rem;">#CCCCCC</div>
    </button>
    <button type="button" onclick={() => copyHex('#FFFFFF', 'White')} style="background:#FFFFFF;color:#1C1C1C;border:none;border-left:1px solid var(--color-neutral-stroke-1);padding:1rem 0.5rem;text-align:center;cursor:pointer;">
      <div style="font-size:0.72rem;font-weight:700;">White</div>
      <div style="font-size:0.68rem;">#FFFFFF</div>
    </button>
  </div>
</section>
