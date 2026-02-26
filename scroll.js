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
   FIRST SCROLL TO EXPAND (KEEP ORIGINAL BEHAVIOR)
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
  // Use threshold for mobile momentum scroll
  if (isFullscreen && !isAnimating && window.scrollY <= 5) {
    shrinkHero();
  }
});

/* =========================
   EXPAND (KEEP ORIGINAL FLOW)
========================= */
function expandHero() {
  if (isAnimating) return;
  isAnimating = true;

  document.body.classList.add('scroll-lock');

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    setTimeout(() => {
      heroText.classList.add('show-text');

      setTimeout(() => {
        // ✅ First expand finishes → remove scroll-lock (keep exactly as you have)
        document.body.classList.remove('scroll-lock');
        isFullscreen = true;
        isAnimating = false;
      }, 500);
    }, 400);
  }, 600);
}

/* =========================
   SHRINK (SMOOTH ON MOBILE)
========================= */
function shrinkHero() {
  if (isAnimating) return;
  isAnimating = true;

  // Lock scroll during shrink animation
  document.body.classList.add('scroll-lock');

  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;

      // Unlock body after shrink
      document.body.classList.remove('scroll-lock');
    }, 400);
  }, 200);
}
