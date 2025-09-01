
export default function decorate(block) {
  const imagesContainer = block.querySelector('[name="imagesContainer"]');
  const videosContainer = block.querySelector('[name="videosContainer"]');
  const images = imagesContainer.querySelectorAll('img');
  const videos = videosContainer.querySelectorAll('video');
  if (images.length > 0) {
    images.forEach((image) => {
      image.closest('div').classList.add('image');
    });
  }
  if (videos.length > 0) {
    videos.forEach((video) => {
      video.closest('div').classList.add('video');
    });
  }
}