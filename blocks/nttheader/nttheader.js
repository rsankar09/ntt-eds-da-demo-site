export default async function decorate(block) {
    // Read JSON path from first <a> inside the block
    const jsonLink = block.querySelector('a');
    if (!jsonLink) {
      console.error('No JSON link found in header block.');
      return;
    }
  
    const jsonPath = jsonLink.href;
    const res = await fetch(jsonPath);
    const { data } = await res.json();
  
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
       NAVIGATION
       ------------------------------------------- */
    const nav = document.createElement('ul');
    nav.className = 'nttheader-nav';
  
    // Flyout container (global)
    const flyout = document.createElement('div');
    flyout.className = 'nttheader-flyout';
  
    // Left column (groups)
    const flyoutLeft = document.createElement('div');
    flyoutLeft.className = 'flyout-left';
  
    // Right column (items)
    const flyoutRight = document.createElement('div');
    flyoutRight.className = 'flyout-right';
  
    flyout.append(flyoutLeft, flyoutRight);
    wrapper.append(flyout);
  
    data.sections.forEach(section => {
      const li = document.createElement('li');
  
      const hasGroups =
        Array.isArray(section.categories) &&
        section.categories.length > 0;
  
      li.className = hasGroups ? 'nav-item nav-drop' : 'nav-item';
      li.textContent = section.name;
  
      if (hasGroups) {
        const arrow = document.createElement('span');
        arrow.className = 'nav-arrow';
        arrow.textContent = '▼';
        li.append(arrow);
  
        // Hover → show flyout
        li.addEventListener('mouseenter', () => {
          flyoutLeft.innerHTML = '';
          flyoutRight.innerHTML = '';
          flyout.classList.add('open');
  
          // Build left column (groups)
          section.categories.forEach(group => {
            const groupEl = document.createElement('div');
            groupEl.className = 'flyout-group';
            groupEl.textContent = group.groupName;
  
            // Hover group → show items on right
            groupEl.addEventListener('mouseenter', () => {
              flyoutRight.innerHTML = '';
  
              const ul = document.createElement('ul');
              ul.className = 'flyout-items';
  
              (group.items || []).forEach(item => {
                const liItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = item.link;
                link.textContent = item.title;
                liItem.append(link);
                ul.append(liItem);
              });
  
              flyoutRight.append(ul);
            });
  
            flyoutLeft.append(groupEl);
          });
        });
  
        // Leave nav → hide flyout
        li.addEventListener('mouseleave', () => {
          flyout.classList.remove('open');
        });
  
        flyout.addEventListener('mouseleave', () => {
          flyout.classList.remove('open');
        });
      }
  
      nav.append(li);
    });
  
    wrapper.append(nav);
  
    /* -------------------------------------------
       TOOLS
       ------------------------------------------- */
    const tools = document.createElement('div');
    tools.className = 'nttheader-tools';
  
    const lang = document.createElement('span');
    lang.className = 'nttheader-lang';
    lang.textContent = 'United States • English';
  
    const search = document.createElement('span');
    search.className = 'nttheader-icon icon-search';
    search.textContent = data.search?.name || 'Search';
  
    const contact = document.createElement('a');
    contact.className = 'nttheader-icon icon-contact';
    contact.href = data.contactUs.link;
    contact.textContent = data.contactUs.name;
  
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
  