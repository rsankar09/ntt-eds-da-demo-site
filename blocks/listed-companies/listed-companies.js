const STOCK_DATA = {
  GAL: {
    label: 'GAL - MARKET OVERVIEW',
    bse: { price: '113.55', change: '1.45 (1.29%)', positive: true },
    nse: { price: '113.55', change: '1.46 (1.30%)', positive: true },
    volume: '9,83,016',
  },
  GPUIL: {
    label: 'GPUIL - MARKET OVERVIEW',
    bse: { price: '100.06', change: '0.96 (0.97%)', positive: true },
    nse: { price: '100.10', change: '1.03 (1.04%)', positive: true },
    volume: '1,23,490',
  },
};

function buildStockPanel(code) {
  const data = STOCK_DATA[code];
  if (!data) return null;
  const panel = document.createElement('div');
  panel.className = 'companiesStock';
  panel.innerHTML = `
    <div class="market-title">${data.label}</div>
    <div class="exchanges">
      <div class="exchange-row"><div class="exchange">BSE</div><div class="exchange_price"><div class="price"><span class="arrow positive">↑</span> ₹${data.bse.price}</div><div class="change positive">${data.bse.change}</div></div></div>
      <div class="exchange-row"><div class="exchange">NSE</div><div class="exchange_price"><div class="price"><span class="arrow positive">↑</span> ₹${data.nse.price}</div><div class="change positive">${data.nse.change}</div></div></div>
    </div>
    <div class="volume">Volume ${data.volume}</div>`;
  return panel;
}

export default function decorate(block) {
  const introRow = block.querySelector(':scope > div:has(h2)');
  const title = introRow?.querySelector('h2') || block.querySelector('h2');
  const intro = introRow?.querySelector('p');
  const headerCta = introRow?.querySelector('a[href]');
  const companyRows = [...block.children].filter((row) => row.querySelector('h3'));

  const wrapper = document.createElement('div');
  wrapper.className = 'listed-companies-inner container spacer';

  const head = document.createElement('header');
  head.className = 'listed-companies-header';
  if (title) head.append(title.cloneNode(true));
  if (intro) head.append(intro.cloneNode(true));
  if (headerCta) {
    const cta = headerCta.cloneNode(true);
    cta.className = 'btn btn-primary';
    head.append(cta);
  }

  const grid = document.createElement('div');
  grid.className = 'companiesCol row';

  companyRows.forEach((row) => {
    const col = document.createElement('div');
    col.className = 'col-lg-6';
    const card = document.createElement('div');
    card.className = 'companiesGrid';

    const item = document.createElement('div');
    item.className = 'listed-company-item';
    const h3 = row.querySelector('h3');
    const desc = row.querySelector('p');
    const code = [...row.querySelectorAll('p')].map((p) => p.textContent.trim()).find((t) => ['GAL', 'GPUIL'].includes(t));
    const website = row.querySelector('a[href^="http"]');
    if (h3) item.append(h3.cloneNode(true));
    if (desc) item.append(desc.cloneNode(true));

    const links = document.createElement('div');
    links.className = 'companies-links';
    if (website) {
      const link = website.cloneNode(true);
      link.className = 'btn btn-circle';
      link.textContent = 'Visit Website';
      links.append(link);
    }

    card.append(item, links);
    if (code) {
      const stock = buildStockPanel(code);
      if (stock) card.append(stock);
    }
    col.append(card);
    grid.append(col);
  });

  wrapper.append(head, grid);
  block.replaceChildren(wrapper);
}
