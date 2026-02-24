const heroImage = document.querySelector('.home_hero_image-container');

let progress = 0;
let animationFinished = false;

document.body.classList.add('scroll-lock');

// Get starting size
const startHeight = heroImage.offsetHeight;
const startWidth = heroImage.offsetWidth;

const maxHeight = window.innerHeight;  // 100svh
const maxWidth = window.innerWidth;    // 100svw

window.addEventListener('wheel', (e) => {
  if (animationFinished) return;

  e.preventDefault();

  progress += e.deltaY * 0.0015;
  progress = Math.min(Math.max(progress, 0), 1);

  const newHeight = startHeight + (maxHeight - startHeight) * progress;
  const newWidth = startWidth + (maxWidth - startWidth) * progress;

  heroImage.style.height = newHeight + 'px';
  heroImage.style.width = newWidth + 'px';

  if (progress >= 1) {
    animationFinished = true;
    document.body.classList.remove('scroll-lock');
  }
}, { passive: false });
