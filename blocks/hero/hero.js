import { div, video, source } from "../../scripts/dom-helper.js";

export default function decorate(block) {
  const blockChildrens = [...block.children];
  // media query match that indicates mobile/tablet width
  const isDesktop = window.matchMedia('(min-width: 900px)');
  const isVideo = blockChildrens[0].textContent.trim() === 'video';

  if (isVideo) {
    const [deskVid, mobVid] = blockChildrens.slice(3, 5).map(c => c.querySelector('a').getAttribute('href'));
    const videoUrl = isDesktop.matches ? deskVid : mobVid ? mobVid : deskVid;
    const video = getVideos(videoUrl);
    block.append(video);
    blockChildrens.slice(0, 5).forEach(c => block.removeChild(c));
  } else {
    const [deskImg, mobImg] = blockChildrens.slice(1, 3);
    const img = isDesktop.matches ? deskImg : mobImg.querySelector('img') ? mobImg : deskImg;
    blockChildrens.slice(0, 5).forEach(c => block.removeChild(c));
    block.append(img);
  }
}

function getVideos(url) {
  return video({ autoplay: true, playsinline: true, loop: true, muted: true, controls: true },
    source({ src: url, type: 'video/mp4' }, "Your browser does not support the video tag.")
  );
}
