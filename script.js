const heroSection = document.querySelector('.section_home_hero');
const heroImage = document.querySelector('.home_hero_image-container');

window.addEventListener('scroll', () => {
  const sectionTop = heroSection.offsetTop;
  const scrollPosition = window.scrollY;

  if (scrollPosition > sectionTop) {
    heroImage.classList.add('fullscreen');
  } else {
    heroImage.classList.remove('fullscreen');
  }
});
