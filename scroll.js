const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let expandedOnce = false;

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
   EXPAND WHEN USER STARTS SCROLLING
========================= */
window.addEventListener('scroll', () => {

  // EXPAND (only once when at top)
  if (
    !isFullscreen &&
    !isAnimating &&
    window.scrollY > 10 &&
    !expandedOnce
  ) {
    expandHero();
  }

  // SHRINK (when coming back to top)
  if (
    isFullscreen &&
    !isAnimating &&
    window.scrollY <= 0
  ) {
    shrinkHero();
  }

});

/* =========================
   EXPAND
========================= */
function expandHero() {
  isAnimating = true;
  expandedOnce = true;

  window.scrollTo(0, 0);
  document.body.classList.add('scroll-lock');

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    heroText.classList.add('show-text');

    setTimeout(() => {
      document.body.classList.remove('scroll-lock');
      isFullscreen = true;
      isAnimating = false;
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
      expandedOnce = false;
    }, 400);

  }, 200);
}
