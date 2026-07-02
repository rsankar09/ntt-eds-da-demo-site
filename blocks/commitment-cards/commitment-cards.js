export default function decorate(block) {
  const title = block.querySelector(':scope > div:has(h2) h2, h2');
  const cards = [...block.children].filter((row) => row.querySelector('h3') && !row.querySelector(':scope > div > h2'));

  const wrapper = document.createElement('section');
  wrapper.className = 'sec-commitment spacer';

  const container = document.createElement('div');
  container.className = 'container';

  const head = document.createElement('div');
  head.className = 'sec-head text-center';
  if (title) {
    const h2 = title.cloneNode(true);
    h2.className = 'sec-title';
    head.append(h2);
  }

  const grid = document.createElement('div');
  grid.className = 'row';

  cards.forEach((row) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 comm-card';
    const picture = row.querySelector('picture, img');
    const h3 = row.querySelector('h3');
    const desc = row.querySelector('p');
    const cta = row.querySelector('a[href]');

    if (picture) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'comm-card-img';
      imgWrap.append(picture.cloneNode(true));
      col.append(imgWrap);
    }

    const body = document.createElement('div');
    body.className = 'comm-card-body';
    if (h3) {
      const titleWrap = document.createElement('div');
      titleWrap.className = 'comm-card-title';
      titleWrap.append(h3.cloneNode(true));
      body.append(titleWrap);
    }
    if (desc) {
      const descWrap = document.createElement('div');
      descWrap.className = 'comm-card-desc';
      descWrap.append(desc.cloneNode(true));
      body.append(descWrap);
    }
    if (cta) {
      const link = cta.cloneNode(true);
      link.className = 'btn btn-primary';
      body.append(link);
    }
    col.append(body);
    grid.append(col);
  });

  container.append(head, grid);
  wrapper.append(container);
  block.replaceChildren(wrapper);
}
