import Swiper from './swiper.js';

export default function decorate(block) {
  // Prepare Swiper wrapper
  block.classList.add('swiper');
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  // Build Swiper slides from block children
  Array.from(block.children).forEach((element) => {
    element.classList.add('swiper-slide');
    swiperWrapper.appendChild(element);
  });

  // Reset block content
  block.innerHTML = '';
  block.appendChild(swiperWrapper);

  // Navigation UI
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const divPagination = document.createElement('div');
  divPagination.classList.add('swiper-pagination');
  btnWrapper.appendChild(divPagination);

  const leftArrow = document.createElement('div');
  leftArrow.classList.add('swiper-button-prev');
  btnWrapper.appendChild(leftArrow);

  const rightArrow = document.createElement('div');
  rightArrow.classList.add('swiper-button-next');
  btnWrapper.appendChild(rightArrow);

  block.appendChild(btnWrapper);

  // Init Swiper
  const swiperInstance = new Swiper(block, {
    loop: false,
    initialSlide: 0,
    spaceBetween: 20,
    slideToClickedSlide: true,
    breakpoints: {
      0: {
        slidesPerView: 1.3,
        loop: false,
        slidesOffsetAfter: 40,
      },
      768: {
        slidesPerView: 1.5,
      },
    },
    pagination: {
      el: divPagination,
      clickable: true,
    },
    navigation: {
      nextEl: rightArrow,
      prevEl: leftArrow,
    },
  });

  // ✅ Find UL inside the same column block
  const externalUl = block.closest('.columns')?.querySelector('ul')
                 || block.parentElement?.previousElementSibling?.querySelector('ul');

  if (!externalUl) {
    console.warn('Carousel Not Found'); // eslint-disable-line no-console
    return;
  }

  const externalLis = externalUl.querySelectorAll('li');

  // ✅ Bind <li> clicks → Swiper slide
  externalLis.forEach((li, index) => {
    li.addEventListener('click', () => {
      swiperInstance.slideTo(index);
    });
  });

  // ✅ Sync active <li> when Swiper changes
  swiperInstance.on('slideChange', () => {
    externalLis.forEach((li, idx) => {
      li.classList.toggle('active', idx === swiperInstance.activeIndex);
    });
  });

  // ✅ Mark first li active initially
  if (externalLis.length > 0) {
    externalLis[0].classList.add('active');
  }
}
