export default function decorate(block) {
  const introRow = block.querySelector(':scope > div:has(h2)');
  const title = introRow?.querySelector('h2') || block.querySelector('h2');
  const intro = introRow?.querySelector('p');
  const headerCta = introRow?.querySelector('a[href]');
  const cards = [...block.children].filter((row) => row.querySelector('h3') && !row.querySelector('h2'));

  const section = document.createElement('section');
  section.className = 'sec-news bg-sky-blue spacer';

  const container = document.createElement('div');
  container.className = 'container';

  const header = document.createElement('div');
  header.className = 'news-header';
  const left = document.createElement('div');
  left.className = 'news-header-left';
  if (title) {
    const h2 = title.cloneNode(true);
    h2.className = 'text-primary sec-title';
    left.append(h2);
  }
  if (intro) {
    const desc = document.createElement('div');
    desc.className = 'sec-desc';
    desc.append(intro.cloneNode(true));
    left.append(desc);
  }
  header.append(left);
  if (headerCta) {
    const cta = headerCta.cloneNode(true);
    cta.className = 'btn btn-primary';
    header.append(cta);
  }

  const grid = document.createElement('div');
  grid.className = 'row';

  cards.forEach((row) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4';
    const card = document.createElement('article');
    card.className = 'card card-news';

    const picture = row.querySelector('picture, img');
    const badge = row.querySelector('p:first-of-type, .badge');
    const date = [...row.querySelectorAll('p')][1];
    const h3 = row.querySelector('h3');
    const link = row.querySelector('a[href]');

    if (picture) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'card-img';
      imgWrap.append(picture.cloneNode(true));
      card.append(imgWrap);
    }

    const body = document.createElement('div');
    body.className = 'card-body';
    const meta = document.createElement('div');
    meta.className = 'card-meta';
    if (badge) {
      const span = document.createElement('span');
      span.className = 'badge press-release';
      span.textContent = badge.textContent.trim();
      meta.append(span);
    }
    if (date) {
      const span = document.createElement('span');
      span.className = 'meta-date';
      span.textContent = date.textContent.trim();
      meta.append(span);
    }
    body.append(meta);
    if (h3) body.append(h3.cloneNode(true));
    if (link) {
      const readMore = link.cloneNode(true);
      readMore.className = 'btn-link';
      readMore.textContent = 'Read More';
      body.append(readMore);
    }
    card.append(body);
    col.append(card);
    grid.append(col);
  });

  container.append(header, grid);
  section.append(container);
  block.replaceChildren(section);
}
