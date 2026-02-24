const heroImage = document.querySelector('.home_hero_image-container');

let triggered = false;

document.body.classList.add('scroll-lock');

window.addEventListener('wheel', (e) => {
  if (triggered) return;

  if (e.deltaY > 0) {  // scrolling down
    triggered = true;

    heroImage.style.height = '100svh';
    heroImage.style.width = '100svw';

    setTimeout(() => {
      document.body.classList.remove('scroll-lock');
    }, 600); // must match CSS transition time
  }
}, { passive: false });
