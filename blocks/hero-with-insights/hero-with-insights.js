// import { fetchPlaceholders } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const jsonPath = [...block.querySelectorAll('a')].map((a) => a.href);
  console.log('jsonPath', jsonPath)
//   const jsonPath = block.dataset.json;
//   console.log('jsonPath', jsonPath)
  const res = await fetch(jsonPath);
  const { data } = await res.json();
  console.log('data', data)
  const wrapper = document.createElement('div');
  wrapper.className = 'hwi-wrapper';

  /* -------------------------------------------
     HERO BACKGROUND
     ------------------------------------------- */
  const bg = document.createElement('div');
  bg.className = 'hwi-bg';

  const bgImg = document.createElement('img');
  bgImg.src = data.hero.backgroundImage;
  bgImg.alt = 'Hero background';
  bg.append(bgImg);

  wrapper.append(bg);

  /* -------------------------------------------
     GRADIENT OVERLAY
     ------------------------------------------- */
  if (data.hero.gradientOverlay) {
    const overlay = document.createElement('div');
    overlay.className = 'hwi-overlay';
    wrapper.append(overlay);
  }

  /* -------------------------------------------
     PERSON IMAGE
     ------------------------------------------- */
  const person = document.createElement('div');
  person.className = 'hwi-person';

  const personImg = document.createElement('img');
  personImg.src = data.hero.personImage;
  personImg.alt = 'Hero person';
  person.append(personImg);

  wrapper.append(person);

  /* -------------------------------------------
     HERO TEXT
     ------------------------------------------- */
  const text = document.createElement('div');
  text.className = 'hwi-text';

  const h1 = document.createElement('h1');
  h1.textContent = data.hero.title;

  const p = document.createElement('p');
  p.textContent = data.hero.subtitle;

  text.append(h1, p);
  wrapper.append(text);

  /* -------------------------------------------
     INSIGHTS SECTION
     ------------------------------------------- */
  const insights = document.createElement('div');
  insights.className = 'hwi-insights';

  const title = document.createElement('h2');
  title.textContent = data.insightsTitle;
  insights.append(title);

  const slider = document.createElement('div');
  slider.className = 'hwi-slider';

  data.insights.forEach((card) => {
    const c = document.createElement('div');
    c.className = 'hwi-card';

    const cat = document.createElement('div');
    cat.className = 'hwi-card-category';
    cat.textContent = card.category;

    const desc = document.createElement('div');
    desc.className = 'hwi-card-desc';
    desc.textContent = card.description;

    const cta = document.createElement('a');
    cta.className = 'hwi-card-cta';
    cta.href = card.ctaLink;
    cta.textContent = card.ctaLabel;

    c.append(cat, desc, cta);
    slider.append(c);
  });

  insights.append(slider);
  wrapper.append(insights);

  block.replaceChildren(wrapper);
}
