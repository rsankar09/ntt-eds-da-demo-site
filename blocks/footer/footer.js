export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'nttfooter-wrapper';

  /* -------------------------------------------
     TOP NAVIGATION COLUMNS (About, Insights, Legal)
     ------------------------------------------- */
  const columns = document.createElement('div');
  columns.className = 'nttfooter-columns';

  const col1 = [
    'About us',
    'Our leaders',
    'Our partners'
  ];

  const col2 = [
    'Insights',
    'News',
    'Events'
  ];

  const col3 = [
    'Legal and compliance',
    'Company information',
    'Report ethical concerns',
    'DOL Postings'
  ];

  [col1, col2, col3].forEach(list => {
    const col = document.createElement('div');
    col.className = 'nttfooter-col';
    list.forEach(item => {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = item;
      col.append(a);
    });
    columns.append(col);
  });

  wrapper.append(columns);

  /* -------------------------------------------
     CTA BUTTONS (Contact us, Careers)
     ------------------------------------------- */
  const ctaWrap = document.createElement('div');
  ctaWrap.className = 'nttfooter-cta';

  ['Contact us', 'Careers'].forEach(label => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = label;
    a.className = 'nttfooter-cta-btn';
    ctaWrap.append(a);
  });

  wrapper.append(ctaWrap);

  /* -------------------------------------------
     SOCIAL ICONS
     ------------------------------------------- */
  const socialWrap = document.createElement('div');
  socialWrap.className = 'nttfooter-social';

  ['facebook', 'youtube', 'x', 'instagram', 'linkedin'].forEach(name => {
    const icon = document.createElement('span');
    icon.className = `nttfooter-social-icon icon-${name}`;
    icon.textContent = name;
    socialWrap.append(icon);
  });

  wrapper.append(socialWrap);

  /* -------------------------------------------
     LEGAL LINKS
     ------------------------------------------- */
  const legalWrap = document.createElement('div');
  legalWrap.className = 'nttfooter-legal';

  [
    'Terms of use',
    'Accessibility statement',
    'Privacy policy',
    'Cookie policy',
    'Sitemap',
    'Do not share my personal information'
  ].forEach(label => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = label;
    legalWrap.append(a);
  });

  wrapper.append(legalWrap);

  /* -------------------------------------------
     LANGUAGE SELECTOR
     ------------------------------------------- */
  const lang = document.createElement('div');
  lang.className = 'nttfooter-language';
  lang.textContent = 'United States • English';
  wrapper.append(lang);

  /* -------------------------------------------
     COPYRIGHT
     ------------------------------------------- */
  const copyright = document.createElement('div');
  copyright.className = 'nttfooter-copy';
  copyright.textContent = '© 2026 NTT DATA, Inc.';
  wrapper.append(copyright);

  /* -------------------------------------------
     Replace block
     ------------------------------------------- */
  block.replaceChildren(wrapper);
}
