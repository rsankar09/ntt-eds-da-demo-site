export default function decorate(block) {
  const title = block.querySelector(':scope > div:has(h2) h2, h2');
  const contentRow = [...block.children].find((row) => row.querySelector('h3'));
  const ctaRow = [...block.children].find((row) => row.querySelector('a[href]') && !row.querySelector('h3'));
  const imageRows = [...block.children].filter((row) => row.querySelector('img') && !row.querySelector('h2') && !row.querySelector('h3'));
  const content = contentRow?.querySelector('h3, p');
  const cta = ctaRow?.querySelector('a[href]');
  const pictures = imageRows.flatMap((row) => [...row.querySelectorAll('img')]);

  const wrapper = document.createElement('section');
  wrapper.className = 'sec-career spacer';

  const container = document.createElement('div');
  container.className = 'container';

  const head = document.createElement('header');
  head.className = 'text-center';
  if (title) {
    const h2 = title.cloneNode(true);
    h2.className = 'sec-title';
    head.append(h2);
  }

  const grid = document.createElement('div');
  grid.className = 'careers-grid row';

  const left = document.createElement('div');
  left.className = 'col-lg-4 careers-images-left';
  pictures.slice(0, 2).forEach((pic, i) => {
    const wrap = document.createElement('div');
    wrap.className = `careerImg pic${i + 1}`;
    wrap.append(pic.cloneNode(true));
    left.append(wrap);
  });

  const center = document.createElement('div');
  center.className = 'col-lg-4';
  const card = document.createElement('div');
  card.className = 'cardContent';
  if (contentRow) {
    contentRow.querySelectorAll('h3, p').forEach((el) => card.append(el.cloneNode(true)));
  }
  center.append(card);

  const right = document.createElement('div');
  right.className = 'col-lg-4 careers-images-right';
  if (pictures[2]) {
    const wrap = document.createElement('div');
    wrap.className = 'careerImg picthree';
    wrap.append(pictures[2].cloneNode(true));
    right.append(wrap);
  }
  if (cta) {
    const btnWrap = document.createElement('div');
    btnWrap.className = 'careerBtn';
    const link = cta.cloneNode(true);
    link.className = 'btn btn-primary btn-lg w-100';
    btnWrap.append(link);
    right.append(btnWrap);
  }

  grid.append(left, center, right);
  container.append(head, grid);
  wrapper.append(container);
  block.replaceChildren(wrapper);
}
