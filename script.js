/*const heroImage = document.querySelector('.home_hero_image-container');

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

}, { passive: false }); */


const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');

let isFullscreen = false;
let isAnimating = false;

window.addEventListener('wheel', (e) => {
  if (isAnimating) return;

  // Scroll Down → Expand
  if (e.deltaY > 0 && !isFullscreen) {
    e.preventDefault();
    isAnimating = true;

    document.body.style.overflow = 'hidden';

    heroImage.classList.add('fullscreen');
    heroSection.classList.add('hero-front'); // 🔥 increase z-index

    setTimeout(() => {
      document.body.style.overflow = '';
      isFullscreen = true;
      isAnimating = false;
    }, 600);
  }

  // Scroll Up → Shrink (only at top)
  if (e.deltaY < 0 && isFullscreen && window.scrollY === 0) {
    e.preventDefault();
    isAnimating = true;

    document.body.style.overflow = 'hidden';

    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front'); // 🔥 reset z-index

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;
    }, 600);
  }

}, { passive: false });
