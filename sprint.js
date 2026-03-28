
//Our Work

/*const items = gsap.utils.toArray(".home-work_card-list-item");
const container = document.querySelector(".home-work_card-left-wrap");
const leftList = document.querySelector(".home-work_card-list");
const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
const cards = gsap.utils.toArray(".home-work_card-image-wrap");

let current = 0;
let position = 0;

const gap = 40; // gap between cards (adjust if needed)
const cardHeight = cards[0].offsetHeight;
const itemHeight = items[0].offsetHeight;
const itemsCount = items.length;

// Total height of all cards + gaps
const totalCardsHeight = itemsCount * cardHeight + (itemsCount - 1) * gap;

// Center offsets
const centerOffsetLeft = (container.offsetHeight / 2) - (itemHeight / 2);
const centerOffsetRight = (container.offsetHeight / 2) - (cardHeight / 2);

// Initial setup
gsap.set(leftList, { y: centerOffsetLeft });
gsap.set(rightWrapper, { y: centerOffsetRight });

items[0].classList.add("active");

let isInteracting = false;
let autoSpeed = 0.4;

// Set active card and left item
function setActive(index) {
  index = Math.max(0, Math.min(itemsCount - 1, index));
  if (index === current) return;

  items[current].classList.remove("active");
  items[index].classList.add("active");

  // Center the right image
  let targetY = centerOffsetRight - index * (cardHeight + gap);
  const minY = container.offsetHeight - totalCardsHeight;
  const maxY = centerOffsetRight;
  targetY = Math.min(maxY, Math.max(minY, targetY));

  gsap.to(rightWrapper, {
    y: targetY,
    duration: 0.8,
    ease: "power3.out"
  });

  current = index; 
}

// Update positions
function updatePosition() {
  gsap.set(leftList, { y: centerOffsetLeft - position });

  const index = Math.round(position / itemHeight);
  setActive(index);
}

// Auto scroll
gsap.ticker.add(() => {
  if (isInteracting) return;

  position += autoSpeed;
  const maxPosition = (items.length - 1) * itemHeight;
  if (position > maxPosition) position = 0;

  updatePosition();
});

// Wheel scroll
window.addEventListener("wheel", (e) => {
  isInteracting = true;

  position += e.deltaY * 0.8;
  const maxPosition = (items.length - 1) * itemHeight;
  position = Math.max(0, Math.min(position, maxPosition));

  updatePosition();

  clearTimeout(window.autoTimeout);
  window.autoTimeout = setTimeout(() => isInteracting = false, 1500);
});

// Drag scroll
let isDown = false;
let startY = 0;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  isInteracting = true;
  startY = e.clientY;
});

window.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  const delta = startY - e.clientY;
  position += delta;
  startY = e.clientY;

  const maxPosition = (items.length - 1) * itemHeight;
  position = Math.max(0, Math.min(position, maxPosition));

  updatePosition();
});

window.addEventListener("mouseup", () => {
  if (!isDown) return;

  isDown = false;

  const snapIndex = Math.round(position / itemHeight);
  gsap.to({}, {
    duration: 0.3,
    onUpdate: () => {
      position = gsap.utils.interpolate(position, snapIndex * itemHeight, 0.2);
      updatePosition();
    }
  });

  setTimeout(() => isInteracting = false, 1500);
});*/
/*
const items = gsap.utils.toArray(".home-work_card-list-item");
const leftList = document.querySelector(".home-work_card-list");
const dragArea = document.querySelector(".home-work_card-list");
const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
const cards = gsap.utils.toArray(".home-work_card-image-wrap");
const containerWrap = document.querySelector(".home-work_card-left-wrap");

let current = 0;
let position = 0;

const listGap = 20; // MUST match CSS gap
const cardGap = 40;

const cardHeight = cards[0].offsetHeight;
const itemHeight = items[0].offsetHeight;
const itemSpacing = itemHeight + listGap;

const itemsCount = items.length;

const totalCardsHeight = itemsCount * cardHeight + (itemsCount - 1) * cardGap;

const centerOffsetLeft = (containerWrap.offsetHeight / 2) - (itemHeight / 2);
const centerOffsetRight = (containerWrap.offsetHeight / 2) - (cardHeight / 2);

gsap.set(leftList, { y: centerOffsetLeft });
gsap.set(rightWrapper, { y: centerOffsetRight });

items[0].classList.add("active");

let isInteracting = false;
let autoSpeed = 0.4;

// ACTIVE STATE
function setActive(index) {
  index = Math.max(0, Math.min(itemsCount - 1, index));
  if (index === current) return;

  items[current].classList.remove("active");
  items[index].classList.add("active");

  let targetY = centerOffsetRight - index * (cardHeight + cardGap);

  const minY = containerWrap.offsetHeight - totalCardsHeight;
  const maxY = centerOffsetRight;

  targetY = Math.min(maxY, Math.max(minY, targetY));

  gsap.to(rightWrapper, {
    y: targetY,
    duration: 0.6,
    ease: "power3.out"
  });

  current = index;
}

// POSITION UPDATE
function updatePosition() {
  gsap.set(leftList, { y: centerOffsetLeft - position });

  const index = Math.round(position / itemSpacing);
  setActive(index);
}

// AUTO SCROLL
gsap.ticker.add(() => {
  if (isInteracting) return;

  position += autoSpeed;

  const maxPosition = (itemsCount - 1) * itemSpacing;

  if (position > maxPosition) position = 0;

  updatePosition();
});

// WHEEL (ONLY ON LIST)
dragArea.addEventListener("wheel", (e) => {
  isInteracting = true;

  position += e.deltaY * 0.8;

  const maxPosition = (itemsCount - 1) * itemSpacing;
  position = Math.max(0, Math.min(position, maxPosition));

  updatePosition();

  clearTimeout(window.autoTimeout);
  window.autoTimeout = setTimeout(() => isInteracting = false, 1200);
});

// DRAG ONLY ON LIST
let isDown = false;
let startY = 0;

dragArea.addEventListener("mousedown", (e) => {
  isDown = true;
  isInteracting = true;
  startY = e.clientY;
});

dragArea.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  const delta = startY - e.clientY;
  position += delta;
  startY = e.clientY;

  const maxPosition = (itemsCount - 1) * itemSpacing;
  position = Math.max(0, Math.min(position, maxPosition));

  updatePosition();
});

dragArea.addEventListener("mouseup", () => {
  if (!isDown) return;

  isDown = false;

  const snapIndex = Math.round(position / itemSpacing);

  gsap.to({}, {
    duration: 0.3,
    onUpdate: () => {
      position = gsap.utils.interpolate(position, snapIndex * itemSpacing, 0.2);
      updatePosition();
    }
  });

  setTimeout(() => isInteracting = false, 1200);
});

dragArea.addEventListener("mouseleave", () => {
  isDown = false;
});
*/


// window.addEventListener("load", () => {

// const items = gsap.utils.toArray(".home-work_card-list-item");
// const leftList = document.querySelector(".home-work_card-list");
// const dragArea = document.querySelector(".home-work_card-list");
// const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
// const cards = gsap.utils.toArray(".home-work_card-image-wrap");
// const containerWrap = document.querySelector(".home-work_card-left-wrap");

// let current = 0;
// let position = 0;

// // ✅ Get REAL gap from CSS
// const listStyles = window.getComputedStyle(leftList);
// const listGap = parseFloat(listStyles.rowGap || listStyles.gap) || 0;

// const cardGap = 40;

// const cardHeight = cards[0].offsetHeight;
// const itemHeight = items[0].offsetHeight;
// const itemSpacing = itemHeight + listGap;

// const itemsCount = items.length;

// const totalCardsHeight = itemsCount * cardHeight + (itemsCount - 1) * cardGap;

// const centerOffsetLeft = (containerWrap.offsetHeight / 2) - (itemHeight / 2);
// const centerOffsetRight = (containerWrap.offsetHeight / 2) - (cardHeight / 2);

// // INIT
// gsap.set(leftList, { y: centerOffsetLeft });
// gsap.set(rightWrapper, { y: centerOffsetRight });

// items[0].classList.add("active");

// let isInteracting = false;
// let autoSpeed = 0.4;

// // ACTIVE
// function setActive(index) {
//   index = Math.max(0, Math.min(itemsCount - 1, index));
//   if (index === current) return;

//   items[current].classList.remove("active");
//   items[index].classList.add("active");

//   let targetY = centerOffsetRight - index * (cardHeight + cardGap);

//   const minY = containerWrap.offsetHeight - totalCardsHeight;
//   const maxY = centerOffsetRight;

//   targetY = Math.min(maxY, Math.max(minY, targetY));

//   gsap.to(rightWrapper, {
//     y: targetY,
//     duration: 0.6,
//     ease: "power3.out"
//   });

//   current = index;
// }

// // UPDATE
// function updatePosition() {
//   gsap.set(leftList, { y: centerOffsetLeft - position });

//   const index = Math.round(position / itemSpacing);
//   setActive(index);
// }

// // AUTO SCROLL
// gsap.ticker.add(() => {
//   if (isInteracting) return;

//   position += autoSpeed;

//   const maxPosition = (itemsCount - 1) * itemSpacing;

//   if (position > maxPosition) position = 0;

//   updatePosition();
// });

// // WHEEL
// dragArea.addEventListener("wheel", (e) => {
//   isInteracting = true;

//   position += e.deltaY * 0.8;

//   const maxPosition = (itemsCount - 1) * itemSpacing;
//   position = Math.max(0, Math.min(position, maxPosition));

//   updatePosition();

//   clearTimeout(window.autoTimeout);
//   window.autoTimeout = setTimeout(() => isInteracting = false, 1200);
// });

// // DRAG
// let isDown = false;
// let startY = 0;

// dragArea.addEventListener("mousedown", (e) => {
//   isDown = true;
//   isInteracting = true;
//   startY = e.clientY;
// });

// dragArea.addEventListener("mousemove", (e) => {
//   if (!isDown) return;

//   const delta = startY - e.clientY;
//   position += delta;
//   startY = e.clientY;

//   const maxPosition = (itemsCount - 1) * itemSpacing;
//   position = Math.max(0, Math.min(position, maxPosition));

//   updatePosition();
// });

// window.addEventListener("mouseup", () => {
//   if (!isDown) return;

//   isDown = false;

//   const snapIndex = Math.round(position / itemSpacing);

//   gsap.to({}, {
//     duration: 0.3,
//     onUpdate: () => {
//       position = gsap.utils.interpolate(position, snapIndex * itemSpacing, 0.2);
//       updatePosition();
//     }
//   });

//   setTimeout(() => isInteracting = false, 1200);
// });

// });


window.addEventListener("load", () => {
    const items = gsap.utils.toArray(".home-work_card-list-item");
    const leftList = document.querySelector(".home-work_card-list");
    const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
    const cards = gsap.utils.toArray(".home-work_card-image-wrap");
    const leftContainer = document.querySelector(".home-work_card-left-wrap");
    const rightContainer = document.querySelector(".home-work_card-right-wrap");

    const cardGap = 24; 
    const listGap = 34;

    // Get measurements
    const cardHeight = cards[0].offsetHeight;
    const itemHeight = items[0].offsetHeight;

    function goToIndex(index) {
        // Update Classes
        items.forEach((el, i) => el.classList.toggle("active", i === index));

        // Calculate Centers
        const centerY_Left = (leftContainer.offsetHeight / 2) - (itemHeight / 2) - (index * (itemHeight + listGap));
        const centerY_Right = (rightContainer.offsetHeight / 2) - (cardHeight / 2) - (index * (cardHeight + cardGap));

        // Animate Left
        gsap.to(leftList, {
            y: centerY_Left,
            duration: 0.8,
            ease: "power3.out"
        });

        // Animate Right
        gsap.to(rightWrapper, {
            y: centerY_Right,
            duration: 1,
            ease: "power3.out"
        });
    }

    // Bind Clicks
    items.forEach((item, index) => {
        item.addEventListener("click", () => goToIndex(index));
    });

    // Start at Index 0
    goToIndex(0);
});





// build-tabs
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".home-build_list-item");
  const cards = document.querySelectorAll(".home-build_image-card");
  const numberEl = document.querySelector(".home-build_right-card-num .heading-style-h4");

  function setActive(index) {
    // remove active classes
    tabs.forEach(tab => tab.classList.remove("active"));
    cards.forEach(card => card.classList.remove("active"));

    // add active to current
    tabs[index].classList.add("active");
    cards[index].classList.add("active");

    // update number (01, 02, 03...)
    numberEl.textContent = (index + 1).toString().padStart(2, "0");
  }

  // click event
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      setActive(index);
    });
  });

  // default first item active
  setActive(0);
});




const pricingSwiper = new Swiper(".pricingswiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,

    navigation: {
      nextEl: ".pricing-next",
      prevEl: ".pricing-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      }
    }
  });

const casestudiesswiper = new Swiper(".casestudiesswiper", {
    slidesPerView: 3.5,
    spaceBetween: 20,
    loop: false,

    navigation: {
      nextEl: ".casestudies-next",
      prevEl: ".casestudies-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2.5,
      },
      1200: {
        slidesPerView: 3.5,
      }
    }
  });


document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".home-faq_item");

  // Open first by default
  if (items.length > 0) {
    const first = items[0];
    const firstAns = first.querySelector(".home-faq_item-ans-wrap");

    first.classList.add("active");
    firstAns.style.maxHeight = firstAns.scrollHeight + "px";
  }

  items.forEach(item => {
    const question = item.querySelector(".home-faq_item-quetion");
    const answer = item.querySelector(".home-faq_item-ans-wrap");

    question.addEventListener("click", () => {

      // If already open → close it
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
        return;
      }

      // Close all
      items.forEach(i => {
        i.classList.remove("active");
        const ans = i.querySelector(".home-faq_item-ans-wrap");
        ans.style.maxHeight = null;
      });

      // Open clicked
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";

    });
  });
});



const links = document.querySelectorAll('.home-process_left-list-item');
const cards = document.querySelectorAll('.home-process_right-card');
const wrappers = document.querySelectorAll('.home-process_card');

// 1. CLICK TO SCROLL (Precise Calculation)
links.forEach((link, index) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    
    // Calculate position relative to document
    const rect = targetEl.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const finalPosition = rect.top + scrollTop - 100; // 100 is your sticky top

    window.scrollTo({
      top: finalPosition,
      behavior: 'smooth'
    });
  });
});

// 2. THE DUAL-DIRECTION SCROLL LOGIC
function handleScroll() {
  let activeIndex = 0;
  const stickyThreshold = 120; // The point (in pixels) where the card "sticks"

  wrappers.forEach((wrapper, index) => {
    const rect = wrapper.getBoundingClientRect();

    // LOGIC: 
    // If the top of the wrapper has hit the sticky point 
    // AND the bottom hasn't left the sticky point yet...
    if (rect.top <= stickyThreshold && rect.bottom > stickyThreshold) {
      activeIndex = index;
    }
  });

  // Update Sidebar Links
  links.forEach((link, i) => {
    link.classList.toggle('active', i === activeIndex);
  });

  // Update Right Cards
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === activeIndex);
  });
}

// Listen for scroll and initial load
window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', handleScroll);
