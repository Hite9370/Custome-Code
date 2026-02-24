document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  let hero = document.querySelector(".home_hero_image-container");
  let heroTextContainer = document.querySelector(".hero_text_container");
  let heroText = document.querySelector(".hero-text");
  let body = document.body;
  let heroSection = document.querySelector(".section_home_hero");
  let navMenu = document.querySelector(".nav_menu"); // Select the navigation menu

  let expanded = false;
  let shrunk = true;
  let webflowAnimationDone = false;

  let originalWidth = hero.offsetWidth;
  let originalHeight = hero.offsetHeight;

  body.classList.add("lock-scroll");

  function unlockScroll() {
    body.classList.remove("lock-scroll");
    body.style.overflow = "auto";
    body.style.overflowX = "hidden";
  }

  function lockScroll() {
    body.classList.add("lock-scroll");
    body.style.overflow = "hidden";
    body.style.overflowX = "hidden";
  }

  function isNavMenuOpen() {
   let isMobile = window.matchMedia("(max-width: 991px)").matches; // Adjust based on tablet breakpoint
    if (!isMobile || !navMenu) return false;
    let computedStyle = window.getComputedStyle(navMenu);
    return computedStyle.display !== "none" && computedStyle.opacity !== "0";
  }

  function startHeroExpansion() {
    setTimeout(() => {
    webflowAnimationDone = true;
  }, 700);
  }

  let webflowElement = document.querySelector(".nav_menu_link");
  if (webflowElement) {
    let observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          let computedStyle = window.getComputedStyle(webflowElement);
          if (computedStyle.opacity === "1" || computedStyle.display !== "none") {
            startHeroExpansion();
            observer.disconnect();
          }
        }
      });
    });
    observer.observe(webflowElement, { attributes: true, subtree: true });
  } else {
    setTimeout(startHeroExpansion, 3000);
  }

  function expandHero() {
    if (!webflowAnimationDone || expanded || isNavMenuOpen()) return;
    expanded = true;
    shrunk = false;

    heroSection.style.zIndex = "10";

    gsap.to(hero, {
      width: "100svw",
      height: "100svh",
      marginTop: "0px",
      duration: 1,
      ease: "sine.inOut",
      onUpdate: function () {
        if (this.progress() > 0.8) {
          gsap.set(heroTextContainer, { display: "block" });
         gsap.fromTo(
  heroText, 
  { y: 100, opacity: 0 },  // Start from 100px below its original position
  { y: 0, opacity: 1, duration: 0.7, ease: "power1.inOut" } // Slide up to its original position
);

gsap.fromTo(
  heroTextContainer, 
  { y: 100, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 0.7, ease: "power1.inOut" } // Small delay for stagger effect
);

        }
      },
     /* onComplete: () => {
        heroSection.style.zIndex = "10"; 
        gsap.set(heroTextContainer, { display: "block" });
        unlockScroll();
        setTimeout(unlockScroll, 300);
      }*/
      onComplete: () => {
  heroSection.style.zIndex = "10"; 
  gsap.set(heroTextContainer, { display: "block" });

  // Wait for text animation to complete (~700ms), then unlock scroll
  setTimeout(() => {
    unlockScroll();
  }, 1500); // 700ms animation + buffer
}
    });
  }

  function shrinkHero() {
    if (!expanded || shrunk || isNavMenuOpen()) return;
    shrunk = true;
    expanded = false;

    gsap.killTweensOf(heroTextContainer);
    gsap.killTweensOf(heroText);
    gsap.killTweensOf(hero);

    gsap.set(heroTextContainer, { opacity: 0, display: "none" });
    gsap.set(heroText, { opacity: 0, y: 50 });
    heroSection.style.zIndex = "0"; 

    gsap.to(hero, {
      width: originalWidth + "px",
      height: originalHeight + "px",
      marginTop: "60px",
      duration: 1,
      ease: "power2.out",
    });

    setTimeout(lockScroll, 500);
  }

let lastScrollTime = 0;
let scrollTimeout;

function handleScroll(event) {
  if (!webflowAnimationDone || isNavMenuOpen()) return;

  let now = performance.now();
  let scrollDelta = event.deltaY || event.wheelDelta || -event.detail;

  // Prevent rapid multiple triggers
  if (now - lastScrollTime < 500) return;
  lastScrollTime = now;

  // Clear previous timeout to avoid unnecessary triggers
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    if (scrollDelta > 0) {
      expandHero();
    } else if (window.scrollY === 0) {
      shrinkHero();
    }
  }, 50);
}


  let touchStartY = 0;
  let touchEndY = 0;

  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    touchEndY = event.changedTouches[0].clientY;
    let deltaY = touchEndY - touchStartY;

    if (!isNavMenuOpen()) {
      if (deltaY < -50) {
        expandHero();
      } else if (deltaY > 50 && window.scrollY === 0) {
        shrinkHero();
      }
    }
  }

  window.addEventListener("wheel", handleScroll, { passive: true });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });
});

