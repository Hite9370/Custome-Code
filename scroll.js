/*const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;

// ⭐ Start with scroll locked by default
document.body.classList.add('scroll-lock');

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

window.addEventListener('scroll', () => {
  if (isFullscreen && !isAnimating && window.scrollY <= 5) {
    shrinkHero();
  }
});

function expandHero() {
  if (isAnimating) return;
  isAnimating = true;

  // Temporarily allow scroll during animation
  document.body.classList.remove('scroll-lock');

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    heroText.classList.add('show-text');

    setTimeout(() => {
      // After expand, scroll is unlocked naturally
      isFullscreen = true;
      isAnimating = false;
    }, 500);
  }, 600);
}

function shrinkHero() {
  if (isAnimating) return;
  isAnimating = true;

  // Temporarily lock scroll during shrink
  document.body.classList.add('scroll-lock');

  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;

      // After shrink, default scroll-lock is restored
      document.body.classList.add('scroll-lock');
    }, 400);
  }, 200);
}*/









const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;

// ⭐ Default scroll-lock before any animation
document.body.classList.add('scroll-lock');

/* =========================
   NAVBAR BG OBSERVER
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
   FIRST SCROLL TO EXPAND
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
   SHRINK WHEN SCROLL NEAR TOP
========================= */
window.addEventListener('scroll', () => {
  // Shrink when scroll is at top
  if (isFullscreen && !isAnimating && window.scrollY <= 5) {
    shrinkHero();
  }
});

/* =========================
   EXPAND HERO
========================= */
function expandHero() {
  if (isAnimating) return;
  isAnimating = true;

  // ✅ Keep scroll locked during expand
  document.body.classList.add('scroll-lock');

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    heroText.classList.add('show-text');

    setTimeout(() => {
      // ✅ Animation finished → unlock body scroll
      document.body.classList.remove('scroll-lock');
      isFullscreen = true;
      isAnimating = false;
    }, 500);
  }, 600);
}

/* =========================
   SHRINK HERO
========================= */
function shrinkHero() {
  if (isAnimating) return;
  isAnimating = true;

  // ✅ Lock scroll during shrink
  document.body.classList.add('scroll-lock');

  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;

      // ✅ Animation finished → unlock body scroll
      document.body.classList.remove('scroll-lock');
    }, 400);
  }, 200);
}
