export default async function decorate(block) {
  // Read JSON path from first <a> inside the block
  const jsonPath = 'https://da-sc.adobeaem.workers.dev/preview/rsankar09/ntt-eds-da-demo-site/forms/header';
  console.log('jsonPath', jsonPath)
  const res = await fetch(jsonPath);
  const { data } = await res.json();
  console.log('data', data)

  // const jsonLink = block.querySelector('a');
  // if (!jsonLink) {
  //   console.error('No JSON link found in header block.');
  //   return;
  // }

  // const jsonPath = jsonLink.href;
  // const res = await fetch(jsonPath);
  // const { data } = await res.json();

  const wrapper = document.createElement('div');
  wrapper.className = 'nttheader-wrapper';

  /* -------------------------------------------
     BRAND
     ------------------------------------------- */
  const brand = document.createElement('div');
  brand.className = 'nttheader-brand';

  const logo = document.createElement('img');
  logo.src = data.logo.image;
  logo.alt = data.logo.title;
  logo.width = 140;
  logo.height = 32;
  logo.className = 'nttheader-logo';

  brand.append(logo);
  wrapper.append(brand);

  /* -------------------------------------------
     NAVIGATION (Dynamic)
     ------------------------------------------- */
  const nav = document.createElement('ul');
  nav.className = 'nttheader-nav';

  data.sections.forEach(section => {
    const li = document.createElement('li');

    const hasDropdown =
      Array.isArray(section.categories) &&
      section.categories.length > 0;

    li.className = hasDropdown ? 'nav-item nav-drop' : 'nav-item';
    li.textContent = section.name;

    if (hasDropdown) {
      const arrow = document.createElement('span');
      arrow.className = 'nav-arrow';
      arrow.textContent = '▼';
      li.append(arrow);
    }

    nav.append(li);
  });

  wrapper.append(nav);

  /* -------------------------------------------
     TOOLS (Dynamic)
     ------------------------------------------- */
  const tools = document.createElement('div');
  tools.className = 'nttheader-tools';

  const lang = document.createElement('span');
  lang.className = 'nttheader-lang';
  lang.textContent = 'United States • English';

  const search = document.createElement('span');
  search.className = 'nttheader-icon icon-search';
  search.textContent = data.search?.name || '🔍';

  const contact = document.createElement('a');
  contact.className = 'nttheader-icon icon-contact';
  contact.href = data.contactUs.link;
  contact.textContent = data.contactUs.name || '✉️';

  tools.append(lang, search, contact);
  wrapper.append(tools);

  /* -------------------------------------------
     MOBILE BURGER
     ------------------------------------------- */
  const burger = document.createElement('button');
  burger.className = 'nttheader-burger';
  burger.textContent = '☰';

  burger.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });

  wrapper.append(burger);

  block.replaceChildren(wrapper);
}