
/*const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');

let isFullscreen = false;
let isAnimating = false;

window.addEventListener('wheel', (e) => {
  if (isAnimating) return;

  /* =========================
     SCROLL DOWN → EXPAND
  ========================== 
  if (e.deltaY > 0 && !isFullscreen) {
    e.preventDefault();
    isAnimating = true;

    document.body.classList.add('scroll-lock'); // LOCK SCROLL

    heroImage.classList.add('fullscreen');
    heroSection.classList.add('hero-front');

    // Wait for image animation (600ms)
    setTimeout(() => {

      // Extra delay before text appears (400ms)
      heroText.classList.add('show-text');

      // Wait for text fade-in (500ms) before unlocking scroll
      setTimeout(() => {
        document.body.classList.remove('scroll-lock'); // UNLOCK SCROLL after full animation
        isFullscreen = true;
        isAnimating = false;
      }, 500); // match text fade duration

    }, 600); // match image transition
  }

  /* =========================
     SCROLL UP → SHRINK
  ========================== 
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

      // Wait for image shrink (600ms) before unlocking scroll
      setTimeout(() => {
        document.body.classList.remove('scroll-lock');
        isFullscreen = false;
        isAnimating = false;
      }, 600);

    }, 500);
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

    document.body.classList.add('scroll-lock'); // LOCK SCROLL

    heroImage.classList.add('fullscreen');
    heroSection.classList.add('hero-front');

    // Wait for image animation (600ms)
    setTimeout(() => {

      // 🔹 ADD EXTRA DELAY BEFORE TEXT APPEARS (400ms)
      setTimeout(() => {
        heroText.classList.add('show-text');

        // Wait for text fade-in (500ms) before unlocking scroll
        setTimeout(() => {
          document.body.classList.remove('scroll-lock'); // UNLOCK SCROLL after full animation
          isFullscreen = true;
          isAnimating = false;
        }, 500); // match text fade duration
      }, 400); // delay before showing text

    }, 600); // match image transition
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

      // Wait for image shrink (600ms) before unlocking scroll
      setTimeout(() => {
        document.body.classList.remove('scroll-lock');
        isFullscreen = false;
        isAnimating = false;
      }, 600);

    }, 500);
  }

}, { passive: false });
