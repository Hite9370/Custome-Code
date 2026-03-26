
//Our Work

const items = gsap.utils.toArray(".home-work_card-list-item");
const container = document.querySelector(".home-work_card-left-wrap");
const leftList = document.querySelector(".home-work_card-list");
const rightWrapper = document.querySelector(".home-work_card-image-scroll-wrap");
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

  // Animate left text scale and opacity
  items.forEach((el, i) => {
    gsap.to(el.querySelector(".home-work_card-list-heading"), {
      scale: i === current ? 1.15 : 1,
      opacity: i === current ? 1 : 0.3,
      duration: 0.3
    });
  });
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
});


// build-tabs
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".home-build_list-item");
  const cards = document.querySelectorAll(".home-build_image-card");
  const numberEl = document.querySelector(".home-build_right-card-num .heading-style-h4");

  function setActive(index) {
    // remove active
    tabs.forEach(t => t.classList.remove("active"));
    cards.forEach(c => c.classList.remove("active"));

    // add active
    tabs[index].classList.add("active");
    cards[index].classList.add("active");

    // update number (01, 02...)
    numberEl.textContent = String(index + 1).padStart(2, "0");
  }

  // click events
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActive(index);
    });
  });

  // default state
  setActive(0);
});
