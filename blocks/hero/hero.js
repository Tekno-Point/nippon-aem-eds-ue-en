import { div, video, source } from "../../scripts/dom-helper.js";

export default function decorate(block) {
  const blockChildrens = [...block.children];
  // media query match that indicates mobile/tablet width
  const isDesktop = window.matchMedia('(min-width: 900px)');
  const isVideo = blockChildrens[0].textContent.trim() === 'video';
  const richText = blockChildrens[5];

  if (isVideo) {
    const [deskVid, mobVid] = blockChildrens.slice(3, 5).map(c => c.querySelector('a').getAttribute('href'));
    const videoUrl = isDesktop.matches ? deskVid : mobVid ? mobVid : deskVid;
    const video = getVideos(videoUrl);
    block.textContent = '';
    block.append(video, richText);
  } else {
    const [deskImg, mobImg] = blockChildrens.slice(1, 3);
    const img = isDesktop.matches ? deskImg : mobImg.querySelector('img') ? mobImg : deskImg;
    block.textContent = '';
    block.append(img, richText);
  }
}

function getVideos(url) {
  return video({"autoplay": true,  "muted": true, "playsinline": true},
    source({ src: url, type: 'video/mp4' }, "Your browser does not support the video tag.")
  );
}
