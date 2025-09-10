import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

  const cards = document.querySelectorAll('.common-cards');
  console.log('Found cards:', cards.length);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log('Observed:', entry.target, 'isIntersecting:', entry.isIntersecting);

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
        console.log('→ Made visible:', entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    rootMargin: '0px 0px -10% 0px', // start earlier before fully visible
    threshold: 0, // trigger as soon as it touches viewport
  });

  cards.forEach((card) => {
    card.classList.add('hidden');
    observer.observe(card);
  });
}
