/* ------------------------------------------------------------------
   Saudia — Explore Destinations

   Self-rendering block. Uses a baked-in destination set so it works with
   no authored content. Optional authored fields (positional) override the
   section heading / subtitle:
     1  title      2  subtitle
------------------------------------------------------------------- */

const DESTINATIONS = [
  { city: 'Riyadh', country: 'Saudi Arabia', price: 'SAR 499', img: 'riyadh.jpg', tag: 'Domestic' },
  { city: 'Jeddah', country: 'Saudi Arabia', price: 'SAR 449', img: 'jeddah.jpg', tag: 'Domestic' },
  { city: 'AlUla', country: 'Saudi Arabia', price: 'SAR 599', img: 'alula.jpg', tag: 'Trending' },
  { city: 'Dubai', country: 'United Arab Emirates', price: 'SAR 799', img: 'dubai.jpg' },
  { city: 'Istanbul', country: 'Türkiye', price: 'SAR 1,299', img: 'istanbul.jpg' },
  { city: 'London', country: 'United Kingdom', price: 'SAR 2,499', img: 'london.jpg' },
];

const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const STYLE_TOKENS = [
  'font-serif', 'font-mono', 'size-l', 'size-xl',
  'shape-square', 'shape-rounded', 'shape-pill',
  'accent-green', 'accent-sand', 'accent-white',
];

// Read the authorable style variants (Font / Size / Shape / Accent) — data-aue-prop
// in the Universal Editor, config-row token scan on publish.
function readStyleVariants(block, rows) {
  const out = [];
  ['font', 'textsize', 'shape', 'accent'].forEach((prop) => {
    const authored = block.querySelector(`:scope > div [data-aue-prop="${prop}"]`);
    if (authored) { const v = authored.textContent.trim(); if (v) out.push(v); }
  });
  if (!out.length) {
    rows.forEach((d) => {
      const t = d.querySelector('div')?.textContent?.trim() || '';
      if (STYLE_TOKENS.includes(t)) out.push(t);
    });
  }
  return out;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const authored = (i) => rows[i]?.textContent?.trim() || '';
  const title = authored(0) || 'Explore';
  const subtitle = authored(1) || 'Discover our most-loved destinations and find your next escape.';
  readStyleVariants(block, rows).forEach((c) => block.classList.add(c));
  block.textContent = '';

  const cards = DESTINATIONS.map((d) => `
    <a class="dest" href="/en/adventures" aria-label="Explore flights to ${d.city}">
      <img src="/blocks/explore/img/${d.img}" alt="${d.city}, ${d.country}" loading="lazy">
      ${d.tag ? `<span class="dest-tag">${d.tag}</span>` : ''}
      <div class="dest-body">
        <div>
          <p class="dest-city">${d.city}</p>
          <p class="dest-country">${d.country}</p>
        </div>
        <div class="dest-price">
          <span class="label">from</span>
          <span class="amount">${d.price}</span>
        </div>
      </div>
    </a>`).join('');

  block.innerHTML = `
    <div class="explore-head">
      <div class="explore-intro">
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      <a class="explore-all" href="/en/adventures">View all destinations ${ARROW}</a>
    </div>
    <div class="explore-grid">${cards}</div>
  `;
}
