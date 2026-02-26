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

/*const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;


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

  // ✅ Lock scroll during expand
  document.body.classList.add('scroll-lock');

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    heroText.classList.add('show-text');

    setTimeout(() => {
      // ✅ Animation finished → unlock scroll
      document.body.classList.remove('scroll-lock');
      isFullscreen = true;
      isAnimating = false;
    }, 500);
  }, 600);
}

function shrinkHero() {
  if (isAnimating) return;
  isAnimating = true;

  // ✅ Always lock scroll during shrink
  document.body.classList.add('scroll-lock');

  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;

      // ✅ Unlock scroll after shrink finishes
      document.body.classList.remove('scroll-lock');
    }, 400);
  }, 200);
}*/








/*const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;


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
  // When scroll is near top
  if (window.scrollY <= 5) {
    document.body.classList.add('scroll-top'); // ⭐ Add your class here
  } else {
    document.body.classList.remove('scroll-top'); // Remove when scrolling down
  }

  // Optional: trigger shrink hero
  if (isFullscreen && !isAnimating && window.scrollY <= 5) {
    shrinkHero();
  }
});

function expandHero() {
  if (isAnimating) return;
  isAnimating = true;

  document.body.classList.add('scroll-lock'); // Lock scroll during animation

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    heroText.classList.add('show-text');

    setTimeout(() => {
      document.body.classList.remove('scroll-lock'); // Unlock scroll after expand
      isFullscreen = true;
      isAnimating = false;
    }, 500);
  }, 600);
}

function shrinkHero() {
  if (isAnimating) return;
  isAnimating = true;

  document.body.classList.add('scroll-lock'); // Lock scroll during shrink

  heroText.classList.remove('show-text');

  setTimeout(() => {
    heroImage.classList.remove('fullscreen');
    heroSection.classList.remove('hero-front');

    setTimeout(() => {
      isFullscreen = false;
      isAnimating = false;
      document.body.classList.remove('scroll-lock'); // Unlock scroll after shrink
    }, 400);
  }, 200);
}*/








/* =========================
   ELEMENT SELECTORS
========================= */
const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');
const heroText = document.querySelector('.hero_text_container');
const navbar = document.querySelector('.navbar');

let isFullscreen = false;
let isAnimating = false;
let touchStartY = 0;

// Default scroll-lock at start
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
   FIRST SCROLL / SWIPE TO EXPAND
========================= */
function handleExpandTrigger(deltaY) {
  if (!isFullscreen && !isAnimating && deltaY > 50) {
    expandHero();
  }
}

window.addEventListener('wheel', (e) => handleExpandTrigger(e.deltaY), { passive: true });

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;
  handleExpandTrigger(deltaY);
}, { passive: true });

/* =========================
   SCROLL LISTENER
========================= */
window.addEventListener('scroll', () => {
  // Optional: shrink hero if scrolled near top
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

  document.body.classList.add('scroll-lock');

  heroImage.classList.add('fullscreen');
  heroSection.classList.add('hero-front');

  setTimeout(() => {
    heroText.classList.add('show-text');

    setTimeout(() => {
      document.body.classList.remove('scroll-lock');
      isFullscreen = true;
      isAnimating = false;

      // After animation, manage scroll-top class
      if (window.scrollY <= 5) {
        document.body.classList.add('scroll-top');
      }
    }, 500);
  }, 600);
}

/* =========================
   SHRINK HERO
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
      document.body.classList.remove('scroll-lock');

      // Remove scroll-top only after shrink animation if user is not at top
      if (window.scrollY > 5) {
        document.body.classList.remove('scroll-top');
      } else {
        document.body.classList.add('scroll-top');
      }
    }, 400);
  }, 200);
}
