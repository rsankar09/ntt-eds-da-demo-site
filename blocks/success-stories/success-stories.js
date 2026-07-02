export default function decorate(block) {
  const introRow = block.querySelector(':scope > div:has(h2)');
  const title = introRow?.querySelector('h2') || block.querySelector('h2');
  const intro = introRow?.querySelector('p');
  const cta = introRow?.querySelector('a[href]');
  const cards = [...block.children].filter((row) => row.querySelector('h3') && !row.querySelector('h2'));

  const wrapper = document.createElement('div');
  wrapper.className = 'success-stories-runtime container spacer';

  const inner = document.createElement('div');
  inner.className = 'success-stories-layout row';

  const left = document.createElement('div');
  left.className = 'col-lg-4 success-stories-intro';
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
  if (cta) {
    const link = cta.cloneNode(true);
    link.className = 'btn btn-primary';
    left.append(link);
  }

  const controls = document.createElement('div');
  controls.className = 'success-stories-controls';
  controls.innerHTML = '<button class="ss-prev" aria-label="Previous">‹</button><button class="ss-next" aria-label="Next">›</button>';
  left.append(controls);

  const right = document.createElement('div');
  right.className = 'col-lg-8 success-stories-track-wrap';
  const track = document.createElement('div');
  track.className = 'success-stories-track';

  cards.forEach((row) => {
    const card = document.createElement('article');
    card.className = 'success-card';
    const picture = row.querySelector('picture, img');
    const h3 = row.querySelector('h3');
    const link = row.querySelector('a[href]');
    if (picture) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'success-card-image';
      imgWrap.append(picture.cloneNode(true));
      card.append(imgWrap);
    }
    const body = document.createElement('div');
    body.className = 'success-card-body';
    if (h3) body.append(h3.cloneNode(true));
    if (link) {
      const readMore = link.cloneNode(true);
      readMore.className = 'btn-link';
      readMore.textContent = readMore.textContent.trim() || 'Read More';
      body.append(readMore);
    }
    card.append(body);
    track.append(card);
  });

  right.append(track);
  inner.append(left, right);
  wrapper.append(inner);
  block.replaceChildren(wrapper);

  let offset = 0;
  const update = () => {
    const card = track.querySelector('.success-card');
    const step = card ? card.offsetWidth + 24 : 300;
    track.style.transform = `translateX(-${offset}px)`;
  };

  controls.querySelector('.ss-prev')?.addEventListener('click', () => {
    const card = track.querySelector('.success-card');
    const step = card ? card.offsetWidth + 24 : 300;
    offset = Math.max(0, offset - step);
    update();
  });
  controls.querySelector('.ss-next')?.addEventListener('click', () => {
    const card = track.querySelector('.success-card');
    const step = card ? card.offsetWidth + 24 : 300;
    const max = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
    offset = Math.min(max, offset + step);
    update();
  });
}
