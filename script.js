/*const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar'); // ← your navbar class


let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;

document.body.classList.add('scroll-lock');

/* =========================
   DESKTOP (Wheel)
========================= 
window.addEventListener('wheel', (e) => {
  handleScroll(e.deltaY);
}, { passive: false });

/* =========================
   MOBILE (Touch)
========================= 
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  let touchEndY = e.touches[0].clientY;
  let deltaY = touchStartY - touchEndY;

  handleScroll(deltaY);
}, { passive: false });

/* =========================
   MAIN LOGIC
========================= 
function handleScroll(deltaY) {
  if (isAnimating) return;

  /* SCROLL DOWN → EXPAND 
  if (deltaY > 30 && !isFullscreen) {
    isAnimating = true;
    document.body.classList.add('scroll-lock');

    heroImage.classList.add('fullscreen');
    heroSection.classList.add('hero-front');

    setTimeout(() => {
      setTimeout(() => {
        heroText.classList.add('show-text');

        setTimeout(() => {
          document.body.classList.remove('scroll-lock');
          isFullscreen = true;
          isAnimating = false;
        }, 500);
       navbar.classList.add('navbar-bg'); // ✅ ADD BG HERE         
      }, 400);
    }, 600);
  }

  /* SCROLL UP → SHRINK 
  if (deltaY < -30 && isFullscreen && window.scrollY === 0) {
    isAnimating = true;
    document.body.classList.add('scroll-lock');

    heroText.classList.remove('show-text');

    setTimeout(() => {
      heroImage.classList.remove('fullscreen');
      heroSection.classList.remove('hero-front');

      setTimeout(() => {
        document.body.classList.add('scroll-lock');
        navbar.classList.remove('navbar-bg'); // ✅ REMOVE BG HERE
        isFullscreen = false;
        isAnimating = false;
      }, 300);
    }, 200);
  }
}*/

const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;
let scrollLocked = true; // start locked

/* =========================
   SCROLL LOCK SYSTEM
========================= */
function lockScroll() {
  if (scrollLocked) return;
  document.body.classList.add('scroll-lock');
  scrollLocked = true;
}

function unlockScroll() {
  if (!scrollLocked) return;
  document.body.classList.remove('scroll-lock');
  scrollLocked = false;
}

lockScroll();

/* =========================
   DESKTOP (WHEEL)
========================= */
window.addEventListener('wheel', (e) => {

  if (isAnimating) {
    e.preventDefault();
    return;
  }

  handleScroll(e.deltaY);

}, { passive: false });

/* =========================
   MOBILE (TOUCH)
========================= */
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {

  if (isAnimating) {
    e.preventDefault();
    return;
  }

  const touchEndY = e.touches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  // 🔥 Force reverse if pulling down at top
  if (isFullscreen && window.scrollY <= 0 && deltaY < -15) {
    handleScroll(-100);
    e.preventDefault();
    return;
  }

  handleScroll(deltaY);

}, { passive: false });

/* =========================
   MAIN LOGIC
========================= */
function handleScroll(deltaY) {

  if (isAnimating) return;

  // Prevent micro scroll triggers
  if (Math.abs(deltaY) < 50) return;

  /* ======================
     SCROLL DOWN → EXPAND
  ====================== */
  if (deltaY > 0 && !isFullscreen) {

    isAnimating = true;
    lockScroll();

    heroImage.classList.add('fullscreen');
    heroSection.classList.add('hero-front');
    navbar.classList.add('navbar-bg');

    // Wait for CSS transition to finish
    heroImage.addEventListener('transitionend', expandComplete, { once: true });
  }

  /* ======================
     SCROLL UP → SHRINK
  ====================== */
  if (deltaY < 0 && isFullscreen) {

    isAnimating = true;
    lockScroll();

    heroText.classList.remove('show-text');

    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');
    navbar.classList.remove('navbar-bg');

    heroImage.addEventListener('transitionend', shrinkComplete, { once: true });
  }
}

/* =========================
   ANIMATION COMPLETE
========================= */
function expandComplete() {
  heroText.classList.add('show-text');

  isFullscreen = true;
  isAnimating = false;

  unlockScroll();
}

function shrinkComplete() {
  isFullscreen = false;
  isAnimating = false;

  unlockScroll();
}
