import { PUBLISH_DOMAIN } from '../../scripts/config.js';
import { div, video, source } from '../../scripts/dom-helper.js';

function getVideos(url) {
  return video(
    {
      class: 'size-full', autoplay: true, muted: true, playsinline: true,
    },
    source({ src: PUBLISH_DOMAIN + url, type: 'video/mp4' }, 'Your browser does not support the video tag.'),
  );
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

export default function decorate(block) {
  const blockChildrens = [...block.children];
  // media query match that indicates mobile/tablet width
  const isDesktop = window.matchMedia('(min-width: 900px)');
  const isVideo = blockChildrens[0].textContent.trim() === 'video';
  const [richText] = blockChildrens.slice(5);

  if (isVideo) {
    const [deskVid, mobVid] = blockChildrens.slice(3, 5).map((c) => c.querySelector('a')?.getAttribute('href'));
    const videoUrl = isDesktop.matches ? deskVid : mobVid || deskVid;
    const videoEl = getVideos(videoUrl);
    block.textContent = '';
    block.append(videoEl, richText);
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
