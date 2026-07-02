function getLink(row, index) {
  const cell = row.children[index];
  if (!cell) return '';
  const link = cell.querySelector('a[href]');
  return link ? link.href : '';
}

function getText(row, index) {
  const cell = row.children[index];
  if (!cell) return '';
  return cell.textContent.trim();
}

function getContent(row) {
  const cell = row.children[1];
  if (!cell) return { eyebrow: null, title: null, description: null };
  return {
    eyebrow: cell.querySelector('h3, h4, h5, h6'),
    title: cell.querySelector('h1, h2'),
    description: cell.querySelector('p'),
  };
}

function buildSlide(row, index) {
  const { eyebrow, title, description } = getContent(row);
  const desktopVideo = getLink(row, 3);
  const ctaLabel = getText(row, 4) || 'Know More';
  const ctaHref = getLink(row, 5) || getLink(row, 4) || '#';
  const mobileVideo = getLink(row, 8) || getLink(row, 7) || desktopVideo;

  const slide = document.createElement('div');
  slide.className = 'hero-slide';
  slide.dataset.index = index;

  const media = document.createElement('div');
  media.className = 'hero-media';
  if (desktopVideo) {
    const desktop = document.createElement('video');
    desktop.src = desktopVideo;
    desktop.autoplay = true;
    desktop.loop = true;
    desktop.muted = true;
    desktop.playsInline = true;
    desktop.className = 'hero-video hero-video-desktop';
    media.append(desktop);
  }
  if (mobileVideo && mobileVideo !== desktopVideo) {
    const mobile = document.createElement('video');
    mobile.src = mobileVideo;
    mobile.autoplay = true;
    mobile.loop = true;
    mobile.muted = true;
    mobile.playsInline = true;
    mobile.className = 'hero-video hero-video-mobile';
    media.append(mobile);
  }

  const content = document.createElement('div');
  content.className = 'hero-content';
  const inner = document.createElement('div');
  inner.className = 'container hero-content-inner';
  const desc = document.createElement('div');
  desc.className = 'hero-desc';
  if (eyebrow) desc.append(eyebrow.cloneNode(true));
  if (title) desc.append(title.cloneNode(true));
  if (description) desc.append(description.cloneNode(true));
  const actions = document.createElement('div');
  actions.className = 'hero-actions';
  const cta = document.createElement('a');
  cta.href = ctaHref;
  cta.className = 'btn btn-primary';
  cta.textContent = ctaLabel;
  actions.append(cta);
  inner.append(desc, actions);
  content.append(inner);
  slide.append(media, content);
  return slide;
}

function initCarousel(block, slides, navNums) {
  let current = 0;
  const total = slides.length;

  const show = (index) => {
    current = (index + total) % total;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });
    navNums.forEach((num, i) => {
      num.classList.toggle('active', i === current);
      num.textContent = String(i + 1).padStart(2, '0');
    });
  };

  block.querySelector('.hero-prev')?.addEventListener('click', () => show(current - 1));
  block.querySelector('.hero-next')?.addEventListener('click', () => show(current + 1));
  navNums.forEach((num, i) => num.addEventListener('click', () => show(i)));

  let timer = window.setInterval(() => show(current + 1), 8000);
  block.addEventListener('mouseenter', () => { window.clearInterval(timer); });
  block.addEventListener('mouseleave', () => {
    timer = window.setInterval(() => show(current + 1), 8000);
  });

  show(0);
}

export default async function decorate(block) {
  const rows = [...block.children];
  const slides = rows.map((row, i) => buildSlide(row, i));

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-carousel';

  const track = document.createElement('div');
  track.className = 'hero-track';
  track.append(...slides);

  const nav = document.createElement('div');
  nav.className = 'hero-nav';
  nav.innerHTML = '<div class="container hero-nav-inner"><button class="hero-prev" aria-label="Previous slide"></button><div class="hero-numbers"></div><button class="hero-next" aria-label="Next slide"></button></div>';
  const nums = nav.querySelector('.hero-numbers');
  const navNums = slides.map(() => {
    const span = document.createElement('span');
    span.className = 'hero-num';
    nums.append(span);
    return span;
  });

  const quickLinks = document.createElement('div');
  quickLinks.className = 'quick-links-wrapper';
  quickLinks.innerHTML = `
    <div class="quick-links-dropdown">
      <a href="/investors" class="quick-link-item">Investors<span aria-hidden="true">›</span></a>
      <a href="/about" class="quick-link-item">About GMR<span aria-hidden="true">›</span></a>
      <a href="/careers" class="quick-link-item">Careers<span aria-hidden="true">›</span></a>
    </div>`;

  wrapper.append(track, nav, quickLinks);
  block.replaceChildren(wrapper);
  block.classList.add('hero-banner-initialized');
  initCarousel(block, slides, navNums);
}
