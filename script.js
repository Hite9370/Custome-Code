/*const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;
let hasScrolledDown = false; // ⭐ important flag

document.body.classList.add('scroll-lock');

/* =========================
   NAVBAR BG (50%)
========================= 
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
   TRACK REAL PAGE SCROLL
========================= 
window.addEventListener('scroll', () => {
  if (isFullscreen && window.scrollY > 80) {
    hasScrolledDown = true; // user actually explored page
  }
});

/* =========================
   DESKTOP
========================= 
window.addEventListener('wheel', (e) => {
  handleScroll(e.deltaY);
}, { passive: false });

/* =========================
   MOBILE
========================= 
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;
  handleScroll(deltaY);
}, { passive: true });

/* =========================
   MAIN LOGIC
========================= 
function handleScroll(deltaY) {
  if (isAnimating) return;

  /* SCROLL DOWN → EXPAND 
  if (deltaY > 50 && !isFullscreen) {
    expandHero();
  }

  /* SCROLL UP → SHRINK 
  if (
    deltaY < -50 &&
    isFullscreen &&
    window.scrollY <= 2 &&
    hasScrolledDown   // ⭐ only shrink if user actually scrolled page
  ) {
    shrinkHero();
  }
}

/* =========================
   EXPAND
========================= 
function expandHero() {
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
        hasScrolledDown = false; // reset
      }, 500);
    }, 400);
  }, 600);
}

/* =========================
   SHRINK
========================= 
function shrinkHero() {
  isAnimating = true;
  document.body.classList.add('scroll-lock');

  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;
      hasScrolledDown = false; // reset again
    }, 300);
  }, 200);
}*/



const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;

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
  { threshold: [0.5] }
);

observer.observe(heroSection);

/* =========================
   DESKTOP
========================= */
window.addEventListener('wheel', (e) => {
  if (!isFullscreen && e.deltaY > 50) {
    expandHero();
  }
}, { passive: true });

/* =========================
   MOBILE FIRST SCROLL EXPAND
========================= */
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (!isFullscreen && deltaY > 50) {
    expandHero();
  }
}, { passive: true });

/* =========================
   AUTO SHRINK WHEN BACK TO TOP
========================= */
window.addEventListener('scroll', () => {
  if (
    isFullscreen &&
    !isAnimating &&
    window.scrollY <= 1
  ) {
    shrinkHero();
  }
});

/* =========================
   EXPAND
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
    }, 500);

  }, 600);
}

/* =========================
   SHRINK (SMOOTH)
========================= */
function shrinkHero() {
  isAnimating = true;

  // Stop scroll momentum cleanly
  window.scrollTo({ top: 0, behavior: 'instant' });

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
