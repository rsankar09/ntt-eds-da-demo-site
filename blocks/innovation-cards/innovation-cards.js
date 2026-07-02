export default function decorate(block) {
  const introRow = block.querySelector(':scope > div:has(h2)');
  const title = introRow?.querySelector('h2') || block.querySelector('h2');
  const intro = introRow?.querySelector('p');
  const cards = [...block.children].filter((row) => row.querySelector('h3') && !row.querySelector('h2'));

  const wrapper = document.createElement('div');
  wrapper.className = 'innovation-cards-inner container spacer';

  const head = document.createElement('header');
  head.className = 'innovation-header text-center';
  if (title) {
    const h2 = title.cloneNode(true);
    h2.className = 'sec-title';
    head.append(h2);
  }
  if (intro) head.append(intro.cloneNode(true));

  const grid = document.createElement('div');
  grid.className = 'innovation-grid row';

  cards.forEach((row) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4';
    const card = document.createElement('article');
    card.className = 'innovation-card';
    const picture = row.querySelector('picture, img');
    const h3 = row.querySelector('h3');
    const link = row.querySelector('a[href]');
    if (picture) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'innovation-card-image';
      imgWrap.append(picture.cloneNode(true));
      card.append(imgWrap);
    }
    const body = document.createElement('div');
    body.className = 'innovation-card-body';
    if (h3) body.append(h3.cloneNode(true));
    if (link) {
      const cta = link.cloneNode(true);
      cta.className = 'btn-link';
      cta.textContent = cta.textContent.trim() || 'Read More';
      body.append(cta);
    }
    card.append(body);
    col.append(card);
    grid.append(col);
  });

  wrapper.append(head, grid);
  block.replaceChildren(wrapper);
}
