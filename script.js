const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');

let animationFinished = false;
let maxScale = 1.3; // how big it grows
let scrollAmount = 0;

document.body.classList.add('scroll-lock');

window.addEventListener('wheel', (e) => {
  if (animationFinished) return;

  e.preventDefault(); // stop normal scroll

  scrollAmount += e.deltaY * 0.0015;

  // clamp between 0 and 1
  scrollAmount = Math.min(Math.max(scrollAmount, 0), 1);

  const scaleValue = 1 + scrollAmount * (maxScale - 1);
  heroImage.style.transform = `scale(${scaleValue})`;

  // When animation completes
  if (scrollAmount >= 1) {
    animationFinished = true;
    document.body.classList.remove('scroll-lock');
  }
}, { passive: false });
