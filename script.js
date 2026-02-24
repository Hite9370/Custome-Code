/* const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');

let isFullscreen = false;
let isAnimating = false;

window.addEventListener('wheel', (e) => {
  if (isAnimating) return;

  // SCROLL DOWN → EXPAND
  if (e.deltaY > 0 && !isFullscreen) {
    e.preventDefault();
    isAnimating = true;

    document.body.style.overflow = 'hidden';

    heroImage.classList.add('fullscreen');
    heroSection.classList.add('hero-front');

    // After image animation completes → show text
    setTimeout(() => {
      heroText.classList.add('show-text');
      document.body.style.overflow = '';
      isFullscreen = true;
      isAnimating = false;
    }, 600); // match image transition
  }

  // SCROLL UP → HIDE TEXT FIRST
  if (e.deltaY < 0 && isFullscreen && window.scrollY === 0) {
    e.preventDefault();
    isAnimating = true;

    document.body.style.overflow = 'hidden';

    // 1️⃣ Hide text first
    heroText.classList.remove('show-text');

    // Wait for text fade out
    setTimeout(() => {
      // 2️⃣ Then shrink image
      heroImage.classList.remove('fullscreen');
      heroSection.classList.remove('hero-front');

      setTimeout(() => {
        isFullscreen = false;
        isAnimating = false;
      }, 600); // image transition time

    }, 400); // text fade time
  }

}, { passive: false }); */


const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');

let isFullscreen = false;
let isAnimating = false;

window.addEventListener('wheel', (e) => {
  if (isAnimating) return;

  /* =========================
     SCROLL DOWN → EXPAND
  ========================== */
  if (e.deltaY > 0 && !isFullscreen) {
    e.preventDefault();
    isAnimating = true;

    document.body.classList.add('scroll-lock');

    heroImage.classList.add('fullscreen');
    heroSection.classList.add('hero-front');

    // Wait for image animation (600ms)
    setTimeout(() => {

      // Extra delay before text appears (400ms)
      setTimeout(() => {
        heroText.classList.add('show-text');

        document.body.classList.remove('scroll-lock');
        isFullscreen = true;
        isAnimating = false;
      }, 400);

    }, 600);
  }

  /* =========================
     SCROLL UP → SHRINK
  ========================== */
  if (e.deltaY < 0 && isFullscreen && window.scrollY === 0) {
    e.preventDefault();
    isAnimating = true;

    document.body.classList.add('scroll-lock');

    // 1️⃣ Hide text first
    heroText.classList.remove('show-text');

    // Wait for text fade out (500ms)
    setTimeout(() => {

      // 2️⃣ Shrink image
      heroImage.classList.remove('fullscreen');
      heroSection.classList.remove('hero-front');

      setTimeout(() => {
        document.body.classList.remove('scroll-lock');
        isFullscreen = false;
        isAnimating = false;
      }, 600);

    }, 500);
  }

}, { passive: false });
