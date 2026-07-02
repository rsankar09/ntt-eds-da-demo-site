const FOOTER_COLUMNS = [
  {
    title: 'About Us',
    links: ['About GMR Group', 'Vision', 'Our Legacy', 'Leadership', 'Corporate Governance'],
  },
  {
    title: 'Businesses',
    links: ['Airports & Aero Services', 'Energy', 'Sports', 'Transportation & Urban Infrastructure'],
  },
  {
    title: 'Media & Insights',
    links: ['Press Releases', 'Media Kit', 'Insights & Blogs', 'Success Stories'],
  },
  {
    title: 'Sustainability',
    links: ['Sustainability Overview', 'Sustainability at GAL', 'Sustainability at GPUIL'],
  },
  {
    title: 'Foundation',
    links: ['About GMRVF', 'Our Impact', 'Education', 'Community Development'],
  },
  {
    title: 'Careers',
    links: ['Career Overview', 'Working at GMR', 'Life at GMR', 'GMR on Campus'],
  },
];

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'page-footer';

  const topbar = document.createElement('div');
  topbar.className = 'footer-topbar';
  topbar.innerHTML = `
    <div class="container footer-topbar-inner">
      <a href="/" class="footer-logo"><img src="/icons/gmr-logo.svg" alt="GMR" width="109" height="40" /></a>
      <div class="footer-social">
        <a href="https://www.linkedin.com/company/gmr-group/" aria-label="LinkedIn">LinkedIn</a>
        <a href="https://www.facebook.com/gmrgroup.in" aria-label="Facebook">Facebook</a>
        <a href="https://www.youtube.com/channel/UCjusUoQlPw-XW-1omi95c0Q" aria-label="YouTube">YouTube</a>
      </div>
      <button type="button" class="btn btn-primary footer-group-sites">Group Sites</button>
    </div>`;

  const links = document.createElement('div');
  links.className = 'footer-links';
  const linksInner = document.createElement('div');
  linksInner.className = 'container footer-links-grid';
  FOOTER_COLUMNS.forEach((col) => {
    const column = document.createElement('div');
    column.className = 'footer-col';
    column.innerHTML = `<h4>${col.title}</h4><ul>${col.links.map((l) => `<li><a href="#">${l}</a></li>`).join('')}</ul>`;
    linksInner.append(column);
  });
  links.append(linksInner);

  const bottom = document.createElement('div');
  bottom.className = 'footer-bottom';
  bottom.innerHTML = `
    <div class="container footer-bottom-inner">
      <p>© ${new Date().getFullYear()} GMR Group. All rights reserved.</p>
      <div class="footer-legal">
        <a href="/sitemap">Sitemap</a>
        <a href="/disclaimer">Disclaimer</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/cookie-policy">Cookie Policy</a>
        <a href="/contact">Contact Us</a>
      </div>
    </div>`;

  wrapper.append(topbar, links, bottom);
  block.replaceChildren(wrapper);
}
