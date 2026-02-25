const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;
let hasScrolledDown = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 0.5) {
        navbar.classList.add('navbar-bg');
      } else {
        navbar.classList.remove('navbar-bg');
      }
    });
  },
  { threshold: [0.5] }
);

observer.observe(heroSection);

/* =========================
   TRACK USER SCROLL
========================= */
window.addEventListener('scroll', () => {
  if (isFullscreen && window.scrollY > 80) {
    hasScrolledDown = true;
  }

  // ⭐ Smooth shrink when reaching top
  if (isFullscreen && !isAnimating && window.scrollY <= 0 && hasScrolledDown) {
    shrinkHero();
  }
});

/* =========================
   FIRST SCROLL DETECTION
========================= */
window.addEventListener('wheel', (e) => {
  if (!isFullscreen && !isAnimating && e.deltaY > 50) expandHero();
}, { passive: true });

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (!isFullscreen && !isAnimating && deltaY > 50) expandHero();
}, { passive: true });

/* =========================
   EXPAND FUNCTION
========================= */
function expandHero() {
  if (isAnimating) return;
  isAnimating = true;

  document.body.classList.add('scroll-lock');

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    heroText.classList.add('show-text');

    setTimeout(() => {
      document.body.classList.remove('scroll-lock');
      isFullscreen = true;
      isAnimating = false;
      hasScrolledDown = false;
    }, 500);
  }, 600);
}

/* =========================
   SHRINK FUNCTION
========================= */
function shrinkHero() {
  if (isAnimating) return;
  isAnimating = true;

  document.body.classList.add('scroll-lock');

  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;
      hasScrolledDown = false;
      document.body.classList.remove('scroll-lock');
    }, 400);
  }, 200);
}
