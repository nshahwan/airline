/* ------------------------------------------------------------------
   Saudia — Hero + Flight Booking Engine (interactive demo)

   Self-rendering block: works with no authored content. Optional authored
   fields (positional) override the defaults:
     1  badge      2  title      3  subtitle
------------------------------------------------------------------- */

const AIRPORTS = [
  { code: 'JED', city: 'Jeddah' },
  { code: 'RUH', city: 'Riyadh' },
  { code: 'DMM', city: 'Dammam' },
  { code: 'MED', city: 'Madinah' },
  { code: 'AUH', city: 'Abu Dhabi' },
  { code: 'DXB', city: 'Dubai' },
  { code: 'CAI', city: 'Cairo' },
  { code: 'IST', city: 'Istanbul' },
  { code: 'LHR', city: 'London' },
  { code: 'CDG', city: 'Paris' },
  { code: 'FCO', city: 'Rome' },
  { code: 'JFK', city: 'New York' },
];

const ICONS = {
  plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  land: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20M3.8 16.5l16.5 3c.5.1 1-.2 1.2-.7.2-.6-.1-1.2-.7-1.4L16 15.5l-2-9.5c-.1-.5-.5-.9-1-1l-.8-.2c-.6-.1-1.1.4-1 1l.6 6.8-4-1-1-2.3c-.1-.3-.4-.5-.7-.5H4.5c-.4 0-.7.4-.6.8L5 12l-2 .8c-.4.2-.6.6-.5 1l.3 1.5c.1.5.5.8 1 .7z"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
};

function opts(selected) {
  return AIRPORTS.map((a) => `<option value="${a.code}" ${a.code === selected ? 'selected' : ''}>${a.city} (${a.code})</option>`).join('');
}

function todayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export default function decorate(block) {
  // Read optional authored overrides (positional), then clear the block.
  const rows = [...block.querySelectorAll(':scope > div')];
  const authored = (i) => rows[i]?.textContent?.trim() || '';
  const badge = authored(0) || 'Fly with Saudia';
  const title = authored(1) || 'Where will you go next?';
  const subtitle = authored(2) || 'Book flights to over 100 destinations across the globe.';
  block.textContent = '';

  block.innerHTML = `
    <div class="booking-hero">
      <span class="booking-badge">${badge}</span>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
    <form class="booking-engine" novalidate>
      <div class="trip-types" role="tablist">
        <button type="button" class="trip-type" data-trip="round" role="tab" aria-selected="true">Round trip</button>
        <button type="button" class="trip-type" data-trip="oneway" role="tab" aria-selected="false">One way</button>
        <button type="button" class="trip-type" data-trip="multi" role="tab" aria-selected="false">Multi-city</button>
      </div>
      <div class="booking-fields">
        <div class="field">
          <label for="bk-from">From</label>
          <div class="control">${ICONS.plane}<select id="bk-from">${opts('JED')}</select></div>
        </div>
        <button type="button" class="swap" aria-label="Swap origin and destination">${ICONS.swap}</button>
        <div class="field">
          <label for="bk-to">To</label>
          <div class="control">${ICONS.land}<select id="bk-to">${opts('DXB')}</select></div>
        </div>
        <div class="field">
          <label for="bk-depart">Depart</label>
          <div class="control">${ICONS.cal}<input type="date" id="bk-depart" value="${todayPlus(14)}" min="${todayPlus(0)}"></div>
        </div>
        <div class="field return-field">
          <label for="bk-return">Return</label>
          <div class="control">${ICONS.cal}<input type="date" id="bk-return" value="${todayPlus(21)}" min="${todayPlus(1)}"></div>
        </div>
        <div class="field pax-field">
          <label>Passengers &amp; class</label>
          <div class="control" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">
            ${ICONS.user}<span class="pax-value">1 Adult, Economy</span>
          </div>
          <div class="pax-popover" role="dialog" aria-label="Passengers and cabin class">
            <div class="pax-row" data-pax="adults">
              <div><div class="pax-label">Adults</div><div class="pax-sub">12+ years</div></div>
              <div class="stepper"><button type="button" class="dec" aria-label="Fewer adults">&minus;</button><span class="count">1</span><button type="button" class="inc" aria-label="More adults">+</button></div>
            </div>
            <div class="pax-row" data-pax="children">
              <div><div class="pax-label">Children</div><div class="pax-sub">2&ndash;11 years</div></div>
              <div class="stepper"><button type="button" class="dec" aria-label="Fewer children">&minus;</button><span class="count">0</span><button type="button" class="inc" aria-label="More children">+</button></div>
            </div>
            <div class="pax-row" data-pax="infants">
              <div><div class="pax-label">Infants</div><div class="pax-sub">Under 2</div></div>
              <div class="stepper"><button type="button" class="dec" aria-label="Fewer infants">&minus;</button><span class="count">0</span><button type="button" class="inc" aria-label="More infants">+</button></div>
            </div>
            <div class="cabin-select">
              <button type="button" data-cabin="Economy" aria-pressed="true">Economy</button>
              <button type="button" data-cabin="Premium" aria-pressed="false">Premium</button>
              <button type="button" data-cabin="Business" aria-pressed="false">Business</button>
              <button type="button" data-cabin="First" aria-pressed="false">First</button>
            </div>
          </div>
        </div>
        <button type="submit" class="search-btn">${ICONS.search}<span>Search flights</span></button>
      </div>
    </form>
    <div class="booking-toast" role="status" aria-live="polite"></div>
  `;

  const $ = (sel) => block.querySelector(sel);
  const fromSel = $('#bk-from');
  const toSel = $('#bk-to');
  const returnField = $('.return-field .control');
  const paxControl = $('.pax-field .control');
  const paxPopover = $('.pax-popover');
  const paxValue = $('.pax-value');
  const pax = { adults: 1, children: 0, infants: 0 };
  let cabin = 'Economy';

  // --- Trip type ---
  block.querySelectorAll('.trip-type').forEach((tab) => {
    tab.addEventListener('click', () => {
      block.querySelectorAll('.trip-type').forEach((t) => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      returnField.classList.toggle('disabled', tab.dataset.trip !== 'round');
    });
  });

  // --- Swap ---
  $('.swap').addEventListener('click', () => {
    const tmp = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = tmp;
  });

  // --- Passengers popover ---
  const updatePaxLabel = () => {
    const total = pax.adults + pax.children + pax.infants;
    const noun = total === 1 ? 'Passenger' : 'Passengers';
    paxValue.textContent = `${total} ${noun}, ${cabin}`;
  };
  paxControl.addEventListener('click', () => {
    const open = paxPopover.classList.toggle('open');
    paxControl.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!block.querySelector('.pax-field').contains(e.target)) {
      paxPopover.classList.remove('open');
      paxControl.setAttribute('aria-expanded', 'false');
    }
  });
  block.querySelectorAll('.pax-row').forEach((row) => {
    const key = row.dataset.pax;
    const countEl = row.querySelector('.count');
    const dec = row.querySelector('.dec');
    const inc = row.querySelector('.inc');
    const sync = () => {
      countEl.textContent = pax[key];
      dec.disabled = pax[key] <= (key === 'adults' ? 1 : 0);
      updatePaxLabel();
    };
    inc.addEventListener('click', () => { pax[key] += 1; sync(); });
    dec.addEventListener('click', () => { pax[key] = Math.max(key === 'adults' ? 1 : 0, pax[key] - 1); sync(); });
    sync();
  });
  block.querySelectorAll('.cabin-select button').forEach((btn) => {
    btn.addEventListener('click', () => {
      block.querySelectorAll('.cabin-select button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      cabin = btn.dataset.cabin;
      updatePaxLabel();
    });
  });

  // --- Search (demo) ---
  const toast = $('.booking-toast');
  $('.booking-engine').addEventListener('submit', (e) => {
    e.preventDefault();
    const fromCity = fromSel.options[fromSel.selectedIndex].text.replace(/\s*\(.*\)/, '');
    const toCity = toSel.options[toSel.selectedIndex].text.replace(/\s*\(.*\)/, '');
    if (fromSel.value === toSel.value) {
      toast.innerHTML = 'Please choose two different cities.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
      return;
    }
    toast.innerHTML = `<span class="spinner"></span> Searching Saudia flights from ${fromCity} to ${toCity}…`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  });
}
