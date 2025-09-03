import { div, video, source, fetchPlaceholders } from '../../scripts/dom-helper.js';

async function getVideos(url) {
  const { publisherUrl } = await fetchPlaceholders();

  const videoElement = video(
    {
      class: 'size-full',
      autoplay: true,      // Autoplay should work if muted
      muted: true,         // Autoplay requires the video to be muted
      playsinline: true    // Optional for mobile devices to play inline
    },
    source(
      {
        src: publisherUrl + url,
        type: 'video/mp4'
      },
      'Your browser does not support the video tag.'
    )
  );

  videoElement.addEventListener('canplay', () => {
    videoElement.muted = true;
    videoElement.play();
  });


  return videoElement;
}

function getImg(isDesktop, deskImg, mobImg) {
  if (isDesktop.matches) {
    return deskImg;
  }

  if (mobImg.querySelector('img')) {
    return mobImg;
  }

  return deskImg;
}

export default async function decorate(block) {
  const blockChildrens = [...block.children];
  // media query match that indicates mobile/tablet width
  const isDesktop = window.matchMedia('(min-width: 900px)');
  const isVideo = blockChildrens[0].textContent.trim() === 'video';
  const [richText] = blockChildrens.slice(5);
  richText.classList.add('richtext');

  if (isVideo) {
    const [deskVid, mobVid] = blockChildrens.slice(3, 5).map((c) => c.querySelector('a')?.getAttribute('href'));
    const videoUrl = isDesktop.matches ? deskVid : mobVid || deskVid;
    const videoEl = await getVideos(videoUrl);
    block.textContent = '';
    block.append(videoEl, richText);
    videoEl.addEventListener('canplay', () => {
      block.dataset.embedLoaded = true;
    });
  } else {
    const [deskImg, mobImg] = blockChildrens.slice(1, 3);
    const img = getImg(isDesktop, deskImg, mobImg);
    block.textContent = '';
    block.append(img, richText);
  }

  if (block.classList.contains('has-bg-ovrl')) {
    block.append(div({ class: 'hero-bg-overlay' }, ''));
  }
}
