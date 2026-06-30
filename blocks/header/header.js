export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'nttheader-wrapper';

  /* -------------------------------------------
     BRAND
     ------------------------------------------- */
  const brand = document.createElement('div');
  brand.className = 'nttheader-brand';
  

  const logo = document.createElement('img');
  logo.src = 'https://dam.nttdata.com/api/public/content/NTT-DATA-Logo?v=4ba3b0db';
  logo.alt = 'NTT DATA Logo';
  logo.width = 140;
  logo.height = 32;
  logo.className = 'nttheader-logo';

  brand.append(logo);
  wrapper.append(brand);

  /* -------------------------------------------
     NAVIGATION
     ------------------------------------------- */
  const nav = document.createElement('ul');
  nav.className = 'nttheader-nav';

  const navItems = [
    { label: 'What we do', dropdown: true },
    { label: 'What we think', dropdown: true },
    { label: 'Who we are', dropdown: false },
    { label: 'Newsroom', dropdown: false },
    { label: 'Careers', dropdown: false },
  ];

  navItems.forEach(item => {
    const li = document.createElement('li');
    li.className = item.dropdown ? 'nav-item nav-drop' : 'nav-item';
    li.textContent = item.label;

    if (item.dropdown) {
      const arrow = document.createElement('span');
      arrow.className = 'nav-arrow';
      arrow.textContent = '▼';
      li.append(arrow);
    }

    nav.append(li);
  });

  wrapper.append(nav);

  /* -------------------------------------------
     TOOLS (Language, Search, Contact)
     ------------------------------------------- */
  const tools = document.createElement('div');
  tools.className = 'nttheader-tools';

  const lang = document.createElement('span');
  lang.className = 'nttheader-lang';
  lang.textContent = 'United States • English';

  const search = document.createElement('span');
  search.className = 'nttheader-icon icon-search';
  search.textContent = '🔍';

  const contact = document.createElement('span');
  contact.className = 'nttheader-icon icon-contact';
  contact.textContent = '✉️';

  tools.append(lang, search, contact);
  wrapper.append(tools);

  /* -------------------------------------------
     MOBILE HAMBURGER
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
