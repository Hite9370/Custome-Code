const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;
let lastScrollY = 0;

document.body.classList.add('scroll-lock');

/* =========================
   NAVBAR BG (50%)
========================= */
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
  { threshold: 0.5 }
);

observer.observe(heroSection);

/* =========================
   EXPAND (DESKTOP)
========================= */
window.addEventListener('wheel', (e) => {
  if (!isFullscreen && !isAnimating && e.deltaY > 50) {
    expandHero();
  }
}, { passive: true });

/* =========================
   EXPAND (MOBILE)
========================= */
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (!isFullscreen && !isAnimating && deltaY > 50) {
    expandHero();
  }
}, { passive: true });

/* =========================
   SMART SHRINK WHEN RETURNING TO TOP
========================= */
window.addEventListener('scroll', () => {

  if (
    isFullscreen &&
    !isAnimating &&
    window.scrollY <= 1 &&
    lastScrollY > 50   // Only if user was actually scrolling down before
  ) {
    shrinkHero();
  }

  lastScrollY = window.scrollY;
});

/* =========================
   EXPAND
========================= */
function expandHero() {
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
      lastScrollY = 0; // reset properly
    }, 500);

  }, 600);
}

/* =========================
   SHRINK
========================= */
function shrinkHero() {
  isAnimating = true;

  window.scrollTo(0, 0);

  document.body.classList.add('scroll-lock');
  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;
    }, 400);

  }, 200);
}
