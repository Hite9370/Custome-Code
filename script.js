const heroImage = document.querySelector('.home_hero_image-container');

let isFullscreen = false;
let isAnimating = false;

window.addEventListener('wheel', (e) => {
  if (isAnimating) return;

  // SCROLL DOWN → EXPAND
  if (e.deltaY > 0 && !isFullscreen) {
    e.preventDefault();
    isAnimating = true;

    document.body.classList.add('scroll-lock');
    heroImage.classList.add('fullscreen');

    setTimeout(() => {
      document.body.classList.remove('scroll-lock');
      isFullscreen = true;
      isAnimating = false;
    }, 600); // match CSS transition
  }

  // SCROLL UP → SHRINK
  if (e.deltaY < 0 && isFullscreen && window.scrollY === 0) {
    e.preventDefault();
    isAnimating = true;

    document.body.classList.add('scroll-lock');
    heroImage.classList.remove('fullscreen');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;
    }, 600);
  }

}, { passive: false });
