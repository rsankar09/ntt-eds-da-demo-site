export default function decorate(block) {
  const rows = [...block.children].filter((row) => row.querySelector('h3'));
  const headerRow = block.querySelector('h2')?.closest(':scope > div');

  const wrapper = document.createElement('div');
  wrapper.className = 'businesses-section-inner container spacer';

  const sectionHeader = document.createElement('header');
  sectionHeader.className = 'business-accordion-header';
  const headerTitle = headerRow?.querySelector('h2') || block.querySelector('h2');
  if (headerTitle) sectionHeader.append(headerTitle.cloneNode(true));

  const accordion = document.createElement('div');
  accordion.className = 'business-accordion-container';

  const preview = document.createElement('div');
  preview.className = 'business-image-preview';
  const previewImg = document.createElement('div');
  preview.append(previewImg);

  const list = document.createElement('div');
  list.className = 'accordion';

  rows.forEach((row, index) => {
    const titleEl = row.querySelector('h3, h4');
    const description = row.querySelector('p');
    const picture = row.querySelector('picture, img');
    const cta = row.querySelector('a[href]');

    const item = document.createElement('div');
    item.className = `accordion-item${index === 0 ? ' active' : ''}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'accordion-button';
    button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
    button.innerHTML = `<span class="business-title">${titleEl?.textContent || ''}</span><span class="accordion-icon">${index === 0 ? '−' : '+'}</span>`;

    const body = document.createElement('div');
    body.className = 'accordion-body';
    if (description) body.append(description.cloneNode(true));
    if (cta) {
      const ctaWrap = document.createElement('div');
      ctaWrap.className = 'business-cta';
      const link = cta.cloneNode(true);
      link.className = 'btn-link';
      ctaWrap.append(link);
      body.append(ctaWrap);
    }
    if (picture) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'business-image';
      imgWrap.append(picture.cloneNode(true));
      body.append(imgWrap);
    }

    button.addEventListener('click', () => {
      list.querySelectorAll('.accordion-item').forEach((el, i) => {
        const active = el === item;
        el.classList.toggle('active', active);
        el.querySelector('.accordion-button')?.setAttribute('aria-expanded', active ? 'true' : 'false');
        const icon = el.querySelector('.accordion-icon');
        if (icon) icon.textContent = active ? '−' : '+';
      });
      if (picture) previewImg.replaceChildren(picture.cloneNode(true));
    });

    item.append(button, body);
    list.append(item);
    if (index === 0 && picture) previewImg.replaceChildren(picture.cloneNode(true));
  });

  accordion.append(preview, list);
  wrapper.append(sectionHeader, accordion);
  block.replaceChildren(wrapper);
}
