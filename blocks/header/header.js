const isDesktop = window.matchMedia('(min-width: 900px)');

const NAV_ITEMS = [
  {
    label: 'About Us',
    href: '/about',
    megaTitle: 'About GMR',
    links: [
      { label: 'About GMR Group', href: '/about' },
      { label: 'Vision', href: '/about/vision' },
      { label: 'Our Legacy', href: '/about/our-legacy' },
      { label: 'Global Presence', href: '/about/our-presence' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Corporate Governance', href: '/about/corporate-governance' },
      { label: 'Awards & Accolades', href: '/about/awards' },
      { label: 'Partnerships & Alliances', href: '/about/our-partners' },
    ],
  },
  {
    label: 'Businesses',
    href: '#',
    megaTitle: 'Our Businesses',
    links: [
      { label: 'Airports & Aero Services', href: '/airports-and-aero-services' },
      { label: 'Energy', href: '/energy' },
      { label: 'Sports', href: '/sports' },
      { label: 'Transportation & Urban Infrastructure', href: '/transportation-urban-infrastructure' },
      { label: 'Other Services', href: '/other-services' },
    ],
  },
  { label: 'Investors', href: '/investors' },
  {
    label: 'News & Insights',
    href: '#',
    megaTitle: 'News & Insights',
    links: [
      { label: 'Press Releases', href: '/press-releases' },
      { label: 'Media Kit', href: '/media-kit' },
      { label: 'Brand Films & Visuals', href: '/brand-films-visuals' },
      { label: 'Insights & Blogs', href: '/blogs' },
      { label: 'Success Stories', href: '/success-stories' },
    ],
  },
  {
    label: 'Sustainability',
    href: '/sustainability',
    megaTitle: 'About Sustainability',
    links: [
      { label: 'Sustainability Overview', href: '/sustainability' },
      { label: 'Sustainability at GAL', href: '/sustainability/gal' },
      { label: 'Sustainability at GPUIL', href: '/sustainability/gpuil' },
    ],
  },
  {
    label: 'Foundation',
    href: '/foundation',
    megaTitle: 'Foundation',
    links: [
      { label: 'About GMRVF', href: '/foundation' },
      { label: 'Our Impact', href: '/foundation/our-impact' },
      { label: 'Education', href: '/foundation/education' },
      { label: 'Community Development', href: '/foundation/community-development' },
    ],
  },
  {
    label: 'Careers',
    href: '/careers',
    megaTitle: 'About Careers',
    links: [
      { label: 'Career Overview', href: '/careers' },
      { label: 'Working at GMR', href: '/careers/working-at-gmr' },
      { label: 'Life at GMR', href: '/careers/life-at-gmr' },
      { label: 'GMR on Campus', href: '/careers/gmr-on-campus' },
    ],
  },
];

function closeMegaMenus(nav) {
  nav.querySelectorAll('.has-mega').forEach((item) => {
    item.classList.remove('open');
    item.setAttribute('aria-expanded', 'false');
  });
}

function toggleMenu(nav, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  if (expanded) closeMegaMenus(nav);
}

function buildUtilityBar() {
  const utility = document.createElement('div');
  utility.className = 'header-utility';
  utility.innerHTML = `
    <div class="container header-utility-inner">
      <div class="stock-ticker">
        <div class="stock-item"><strong>GAL</strong> BSE ₹113.55 <span class="positive">↑ 1.29%</span></div>
        <div class="stock-item"><strong>GPUIL</strong> BSE ₹100.06 <span class="positive">↑ 0.97%</span></div>
      </div>
      <div class="utility-nav">
        <a href="/contact" class="utility-contact">Contact</a>
        <button type="button" class="utility-search" aria-label="Search">Search</button>
      </div>
    </div>`;
  return utility;
}

function buildMegaMenu(item) {
  const mega = document.createElement('div');
  mega.className = 'mega-wrapper';
  const links = item.links.map((link) => `<div class="cat-item"><a href="${link.href}">${link.label} <span class="arrow">&gt;</span></a></div>`).join('');
  mega.innerHTML = `
    <div class="mega-col mega-left">
      <div class="menu-title">${item.megaTitle}</div>
      <div class="main-category-list">${links}</div>
    </div>
    <div class="mega-details-panel"></div>`;
  return mega;
}

function buildNavList() {
  const ul = document.createElement('ul');
  ul.className = 'nav-list';
  NAV_ITEMS.forEach((item) => {
    const li = document.createElement('li');
    if (item.links) {
      li.className = 'has-mega';
      li.innerHTML = `<p><a href="${item.href}">${item.label}</a></p>`;
      li.append(buildMegaMenu(item));
      li.addEventListener('mouseenter', () => {
        if (!isDesktop.matches) return;
        closeMegaMenus(li.closest('nav'));
        li.classList.add('open');
        li.setAttribute('aria-expanded', 'true');
      });
      li.addEventListener('mouseleave', () => {
        if (!isDesktop.matches) return;
        li.classList.remove('open');
        li.setAttribute('aria-expanded', 'false');
      });
    } else {
      li.innerHTML = `<p><a href="${item.href}">${item.label}</a></p>`;
    }
    ul.append(li);
  });
  return ul;
}

export default async function decorate(block) {
  block.textContent = '';
  block.append(buildUtilityBar());

  const primary = document.createElement('div');
  primary.className = 'primary-header';

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  const container = document.createElement('div');
  container.className = 'container nav-container';

  const brand = document.createElement('a');
  brand.href = '/';
  brand.className = 'navbar-logo';
  brand.setAttribute('aria-label', 'GMR Home');
  brand.innerHTML = '<img src="/icons/gmr-logo.svg" alt="GMR" width="109" height="40" />';

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = '<button type="button" aria-controls="nav" aria-label="Open navigation"><span class="nav-hamburger-icon"></span></button>';
  hamburger.addEventListener('click', () => toggleMenu(nav));

  container.append(brand, buildNavList());
  nav.append(hamburger, container);
  primary.append(nav);
  block.append(primary);

  toggleMenu(nav, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, isDesktop.matches));

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeMegaMenus(nav);
  });
}
