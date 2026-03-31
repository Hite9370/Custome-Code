
// const cards = document.querySelectorAll('.home-process_card');
// const navItems = document.querySelectorAll('.home-process_left-list-item');

// function updateActive() {
//   let currentId = null;

//   cards.forEach((card) => {
//     const rect = card.getBoundingClientRect();

//     // middle trigger zone
//     if (
//       rect.top <= window.innerHeight * 0.4 &&
//       rect.bottom >= window.innerHeight * 0.4
//     ) {
//       currentId = card.id;
//     }
//   });

//   if (currentId) {
//     navItems.forEach((item) => {
//       item.classList.remove('active');
//       item.classList.remove('w--current'); // remove Webflow default
//     });

//     const activeItem = document.querySelector(
//       `.home-process_left-list-item[href="#${currentId}"]`
//     );

//     if (activeItem) {
//       activeItem.classList.add('active');
//     }
//   }
// }

// // scroll listener (smooth + performant)
// window.addEventListener('scroll', () => {
//   requestAnimationFrame(updateActive);
// });

// // run on load
// window.addEventListener('load', updateActive);


// // OPTIONAL: smooth scroll
// navItems.forEach((item) => {
//   item.addEventListener('click', (e) => {
//     e.preventDefault();

//     const target = document.querySelector(item.getAttribute('href'));

//     if (target) {
//       target.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   });
// });


const cards = document.querySelectorAll('.home-process_card');
const navItems = document.querySelectorAll('.home-process_left-list-item');

function updateActive() {
  let currentId = null;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const stickyTop = parseInt(getComputedStyle(card).top); // each card's sticky top

    // Trigger as soon as card reaches its sticky top
    if (rect.top <= stickyTop + 10 && rect.bottom > stickyTop + 10) {
      currentId = card.id;
    }
  });

  if (currentId) {
    navItems.forEach((item) => item.classList.remove('active'));

    const activeItem = document.querySelector(
      `.home-process_left-list-item[href="#${currentId}"]`
    );

    if (activeItem) activeItem.classList.add('active');
  }
}

window.addEventListener('scroll', () => requestAnimationFrame(updateActive));
window.addEventListener('load', updateActive);

// disable clicking
navItems.forEach((item) => item.addEventListener('click', (e) => e.preventDefault()));
  



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


// window.addEventListener("load", () => {
//     const items = gsap.utils.toArray(".home-work_card-list-item");
//     const leftList = document.querySelector(".home-work_card-list");
//     const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
//     const cards = gsap.utils.toArray(".home-work_card-image-wrap");
    
//     // Parent Containers
//     const leftVisibleWindow = document.querySelector(".home-work_card-list-wrap");
//     const rightParent = document.querySelector(".home-work_card-right-wrap");

//     const listGap = 34;
//     const cardGap = 24;

//     function goToIndex(index) {
//         items.forEach((el, i) => el.classList.toggle("active", i === index));

//         const itemHeight = items[index].offsetHeight;
//         const cardHeight = cards[index].offsetHeight;

//         // Math to calculate distance from top of list to the target item
//         let distanceToItem = 0;
//         for(let i=0; i < index; i++) {
//             distanceToItem += items[i].offsetHeight + listGap;
//         }

//         let distanceToCard = 0;
//         for(let i=0; i < index; i++) {
//             distanceToCard += cards[i].offsetHeight + cardGap;
//         }

//         // CENTER = (The height of the visible area / 2) - (The height of the clicked item / 2) - distanceToItem
//         const centerY_Left = (leftVisibleWindow.offsetHeight / 2) - (itemHeight / 2) - distanceToItem;
//         const centerY_Right = (rightParent.offsetHeight / 2) - (cardHeight / 2) - distanceToCard;

//         gsap.to(leftList, {
//             y: centerY_Left,
//             duration: 0.8,
//             ease: "power3.inOut"
//         });

//         gsap.to(rightWrapper, {
//             y: centerY_Right,
//             duration: 1,
//             ease: "power3.inOut"
//         });
//     }

//     items.forEach((item, index) => {
//         item.addEventListener("click", () => goToIndex(index));
//     });

//     goToIndex(0);
// });







// window.addEventListener("load", () => {
//     const items = gsap.utils.toArray(".home-work_card-list-item");
//     const leftList = document.querySelector(".home-work_card-list");
//     const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
//     const cards = gsap.utils.toArray(".home-work_card-image-wrap");
    
//     const leftVisibleWindow = document.querySelector(".home-work_card-list-wrap");
//     const rightParent = document.querySelector(".home-work_card-right-wrap");

//     const listGap = 34;
//     const cardGap = 24;

//     function isMobile() {
//         return window.innerWidth <= 767;
//     }

//     function goToIndex(index) {

//         items.forEach((el, i) => el.classList.toggle("active", i === index));

//         // ✅ MOBILE (<=767)
//         if (isMobile()) {

//             // stop GSAP transforms
//             gsap.set(leftList, { y: 0 });
//             gsap.set(rightWrapper, { y: 0 });

//             // scroll LEFT list
//             items[index].scrollIntoView({
//                 behavior: "smooth",
//                 block: "center"
//             });

//             // scroll RIGHT images (horizontal)
//             cards[index].scrollIntoView({
//                 behavior: "smooth",
//                 inline: "center"
//             });

//             return;
//         }

//         // ✅ DESKTOP (your original logic)
//         const itemHeight = items[index].offsetHeight;
//         const cardHeight = cards[index].offsetHeight;

//         let distanceToItem = 0;
//         for (let i = 0; i < index; i++) {
//             distanceToItem += items[i].offsetHeight + listGap;
//         }

//         let distanceToCard = 0;
//         for (let i = 0; i < index; i++) {
//             distanceToCard += cards[i].offsetHeight + cardGap;
//         }

//         const centerY_Left =
//             (leftVisibleWindow.offsetHeight / 2) -
//             (itemHeight / 2) -
//             distanceToItem;

//         const centerY_Right =
//             (rightParent.offsetHeight / 2) -
//             (cardHeight / 2) -
//             distanceToCard;

//         gsap.to(leftList, {
//             y: centerY_Left,
//             duration: 0.8,
//             ease: "power3.inOut"
//         });

//         gsap.to(rightWrapper, {
//             y: centerY_Right,
//             duration: 1,
//             ease: "power3.inOut"
//         });
//     }

//     items.forEach((item, index) => {
//         item.addEventListener("click", () => goToIndex(index));
//     });

//     // init
//     goToIndex(0);

//     // handle resize
//     window.addEventListener("resize", () => {
//         goToIndex(0);
//     });
// });



// window.addEventListener("load", () => {
//     const items = gsap.utils.toArray(".home-work_card-list-item");
//     const leftList = document.querySelector(".home-work_card-list");
//     const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
//     const cards = gsap.utils.toArray(".home-work_card-image-wrap");
    
//     const leftVisibleWindow = document.querySelector(".home-work_card-list-wrap");
//     const rightParent = document.querySelector(".home-work_card-right-wrap");

//     const listGap = 34;
//     const cardGap = 24;

//     function isMobile() {
//         return window.innerWidth <= 767;
//     }

//     let userClicked = false;

//     function goToIndex(index, isUserAction = false) {

//         if (isUserAction) userClicked = true;

//         items.forEach((el, i) => el.classList.toggle("active", i === index));

//         // ✅ MOBILE
//         if (isMobile()) {

//             // ❌ block auto scroll
//             if (!isUserAction) return;

//             gsap.set(leftList, { y: 0 });
//             gsap.set(rightWrapper, { y: 0 });

//             const container = leftVisibleWindow;
//             const item = items[index];

//             const containerRect = container.getBoundingClientRect();
//             const itemRect = item.getBoundingClientRect();
//             const currentScroll = container.scrollTop;

//             const offset =
//                 itemRect.top - containerRect.top + currentScroll;

//             const scrollPosition =
//                 offset - (container.clientHeight / 2) + (item.clientHeight / 2);

//             container.scrollTo({
//                 top: scrollPosition,
//                 behavior: "smooth"
//             });

//             cards[index].scrollIntoView({
//                 behavior: "smooth",
//                 inline: "center",
//                 block: "nearest"
//             });

//             return;
//         }

//         // ✅ DESKTOP
//         const itemHeight = items[index].offsetHeight;
//         const cardHeight = cards[index].offsetHeight;

//         let distanceToItem = 0;
//         for (let i = 0; i < index; i++) {
//             distanceToItem += items[i].offsetHeight + listGap;
//         }

//         let distanceToCard = 0;
//         for (let i = 0; i < index; i++) {
//             distanceToCard += cards[i].offsetHeight + cardGap;
//         }

//         const centerY_Left =
//             (leftVisibleWindow.offsetHeight / 2) -
//             (itemHeight / 2) -
//             distanceToItem;

//         const centerY_Right =
//             (rightParent.offsetHeight / 2) -
//             (cardHeight / 2) -
//             distanceToCard;

//         gsap.to(leftList, {
//             y: centerY_Left,
//             duration: 0.8,
//             ease: "power3.inOut"
//         });

//         gsap.to(rightWrapper, {
//             y: centerY_Right,
//             duration: 1,
//             ease: "power3.inOut"
//         });
//     }

//     // ✅ CLICK (important fix)
//     items.forEach((item, index) => {
//         item.addEventListener("click", () => goToIndex(index, true));
//     });

//     // ✅ INIT
//     if (!isMobile()) {
//         goToIndex(0);
//     }

//     // ✅ RESIZE (safe)
//     window.addEventListener("resize", () => {
//         // only reset transforms, no scroll
//         if (isMobile()) {
//             gsap.set(leftList, { y: 0 });
//             gsap.set(rightWrapper, { y: 0 });
//         }
//     });

// });


window.addEventListener("load", () => {
    const list = document.querySelector(".home-work_card-list");
    const wrapper = document.querySelector(".home-work_card-image-wrapper");
    const listWrap = document.querySelector(".home-work_card-list-wrap");
    const rightWrap = document.querySelector(".home-work_card-right-wrap");

    // 1. Setup the Triple Loop (Original + Clone + Clone)
    const originalHTML = list.innerHTML;
    const originalImgHTML = wrapper.innerHTML;
    
    list.innerHTML = originalHTML + originalHTML + originalHTML;
    wrapper.innerHTML = originalImgHTML + originalImgHTML + originalImgHTML;

    let items = Array.from(document.querySelectorAll(".home-work_card-list-item"));
    let cards = Array.from(document.querySelectorAll(".home-work_card-image-wrap"));
    
    const count = items.length / 3; // The actual number of unique items
    let index = count; // Start at the first item of the middle set
    let isMoving = false;

    function goTo(i, animate = true) {
        if (isMoving && animate) return;
        index = i;

        // Update Active States based on the real index
        items.forEach((item, idx) => {
            item.classList.toggle("active", idx % count === index % count);
        });

        // Calculate positions
        const textItem = items[index];
        const cardItem = cards[index];

        // Vertical Logic for Text
        const textY = -(textItem.offsetTop - (listWrap.clientHeight / 2) + (textItem.clientHeight / 2));
        
        // Vertical Logic for Images
        const imgY = -(cardItem.offsetTop - (rightWrap.clientHeight / 2) + (cardItem.clientHeight / 2));

        if (animate) {
            isMoving = true;
            gsap.to(list, { y: textY, duration: 1, ease: "power3.inOut" });
            gsap.to(wrapper, { 
                y: imgY, 
                duration: 1.2, 
                ease: "power3.inOut",
                onComplete: () => {
                    isMoving = false;
                    checkBoundary();
                }
            });
        } else {
            gsap.set(list, { y: textY });
            gsap.set(wrapper, { y: imgY });
        }
    }

    // This function handles the "Invisble Jump" to keep it infinite
    function checkBoundary() {
        // If we reach the start of the 3rd set, jump back to the start of the 2nd set
        if (index >= count * 2) {
            index = count;
            goTo(index, false);
        }
        // If we go backwards to the 1st set, jump to the 2nd set
        if (index < count) {
            index = count * 2 - 1;
            goTo(index, false);
        }
    }

    // Auto Loop
    let autoPlay = setInterval(() => {
        goTo(index + 1);
    }, 3000);

    // Click to Navigate
    items.forEach((item, i) => {
        item.addEventListener("click", () => {
            clearInterval(autoPlay);
            goTo(i);
        });
    });

    // Initialize
    goTo(index, false);
});







// window.addEventListener("load", () => {
//     const items = gsap.utils.toArray(".home-work_card-list-item");
//     const leftList = document.querySelector(".home-work_card-list");
//     const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
//     const cards = gsap.utils.toArray(".home-work_card-image-wrap");
    
//     const leftVisibleWindow = document.querySelector(".home-work_card-list-wrap");
//     const rightParent = document.querySelector(".home-work_card-right-wrap");

//     const listGap = 34;
//     const cardGap = 24;

//     function isMobile() {
//         return window.innerWidth <= 767;
//     }

//     // ✅ FIX: Add padding so first/last item can center
//     function setListPadding() {
//         if (isMobile()) {
//             const containerHeight = leftVisibleWindow.clientHeight;
//             const itemHeight = items[0].clientHeight;

//             const padding = (containerHeight / 2) - (itemHeight / 2);

//             leftList.style.paddingTop = padding + "px";
//             leftList.style.paddingBottom = padding + "px";
//         } else {
//             leftList.style.paddingTop = "0px";
//             leftList.style.paddingBottom = "0px";
//         }
//     }

//     function goToIndex(index) {

//         items.forEach((el, i) => el.classList.toggle("active", i === index));

//         // ✅ MOBILE
//         if (isMobile()) {

//             // stop GSAP transforms
//             gsap.set(leftList, { y: 0 });
//             gsap.set(rightWrapper, { y: 0 });

//             const container = leftVisibleWindow;
//             const item = items[index];

//             // accurate position
//             const containerRect = container.getBoundingClientRect();
//             const itemRect = item.getBoundingClientRect();
//             const currentScroll = container.scrollTop;

//             const offset =
//                 itemRect.top - containerRect.top + currentScroll;

//             const scrollPosition =
//                 offset - (container.clientHeight / 2) + (item.clientHeight / 2);

//             container.scrollTo({
//                 top: scrollPosition,
//                 behavior: "smooth"
//             });

//             // right side scroll
//             cards[index].scrollIntoView({
//                 behavior: "smooth",
//                 inline: "center",
//                 block: "nearest"
//             });

//             return;
//         }

//         // ✅ DESKTOP (original logic)
//         const itemHeight = items[index].offsetHeight;
//         const cardHeight = cards[index].offsetHeight;

//         let distanceToItem = 0;
//         for (let i = 0; i < index; i++) {
//             distanceToItem += items[i].offsetHeight + listGap;
//         }

//         let distanceToCard = 0;
//         for (let i = 0; i < index; i++) {
//             distanceToCard += cards[i].offsetHeight + cardGap;
//         }

//         const centerY_Left =
//             (leftVisibleWindow.offsetHeight / 2) -
//             (itemHeight / 2) -
//             distanceToItem;

//         const centerY_Right =
//             (rightParent.offsetHeight / 2) -
//             (cardHeight / 2) -
//             distanceToCard;

//         gsap.to(leftList, {
//             y: centerY_Left,
//             duration: 0.8,
//             ease: "power3.inOut"
//         });

//         gsap.to(rightWrapper, {
//             y: centerY_Right,
//             duration: 1,
//             ease: "power3.inOut"
//         });
//     }

//     // click events
//     items.forEach((item, index) => {
//         item.addEventListener("click", () => goToIndex(index));
//     });

//     // init
//     setListPadding();
//     goToIndex(0);

//     // resize fix
//     window.addEventListener("resize", () => {
//         setListPadding();
//         goToIndex(0);
//     });

// });




// // build-tabs
// document.addEventListener("DOMContentLoaded", function () {
//   const tabs = document.querySelectorAll(".home-build_list-item");
//   const cards = document.querySelectorAll(".home-build_image-card");
//   const numberEl = document.querySelector(".home-build_right-card-num .heading-style-h4");

//   function setActive(index) {
//     // remove active classes
//     tabs.forEach(tab => tab.classList.remove("active"));
//     cards.forEach(card => card.classList.remove("active"));

//     // add active to current
//     tabs[index].classList.add("active");
//     cards[index].classList.add("active");

//     // update number (01, 02, 03...)
//     numberEl.textContent = (index + 1).toString().padStart(2, "0");
//   }

//   // click event
//   tabs.forEach((tab, index) => {
//     tab.addEventListener("click", function () {
//       setActive(index);
//     });
//   });

//   // default first item active
//   setActive(0);
// });


// document.addEventListener("DOMContentLoaded", function () {
//   const tabs = document.querySelectorAll(".home-build_list-item");
//   const cards = document.querySelectorAll(".home-build_image-card");
//   const indicator = document.querySelector(".tabs-indicator");
//   const numberEl = document.querySelector(".home-build_right-card-num .heading-style-h4");

//   function setActive(index) {
//     const activeTab = tabs[index];

//     // 1. Move indicator vertically
//     if (activeTab && indicator) {
//       indicator.style.height = `${activeTab.offsetHeight}px`;
//       // Use translateY for better performance
//       indicator.style.transform = `translateY(${activeTab.offsetTop}px)`;
//     }

//     // 2. Toggle Active Classes
//     tabs.forEach(tab => tab.classList.remove("active"));
//     cards.forEach(card => card.classList.remove("active"));

//     activeTab.classList.add("active");
//     if (cards[index]) cards[index].classList.add("active");

//     // 3. Update Number
//     if (numberEl) {
//       numberEl.textContent = (index + 1).toString().padStart(2, "0");
//     }
//   }

//   tabs.forEach((tab, index) => {
//     tab.addEventListener("click", () => setActive(index));
//   });

//   // Handle window resize to keep border aligned
//   window.addEventListener("resize", () => {
//     const currentIndex = Array.from(tabs).findIndex(t => t.classList.contains("active"));
//     setActive(currentIndex);
//   });

//   // Init
//   setActive(0);
// });


// document.addEventListener("DOMContentLoaded", function () {
//   const tabs = document.querySelectorAll(".home-build_list-item");
//   const cards = document.querySelectorAll(".home-build_image-card");
//   const indicator = document.querySelector(".tabs-indicator");
//   const numberEl = document.querySelector(".heading-style-h4");

//   let currentIndex = 0;
//   let autoSwitch;

//   function setActive(index) {
//     currentIndex = index;

//     const activeTab = tabs[index];

//     if (activeTab && indicator) {
//       indicator.style.height = `${activeTab.offsetHeight}px`;
//       indicator.style.transform = `translateY(${activeTab.offsetTop}px)`;
//     }

//     tabs.forEach(tab => tab.classList.remove("active"));
//     cards.forEach(card => card.classList.remove("active"));

//     activeTab.classList.add("active");
//     if (cards[index]) cards[index].classList.add("active");

//     numberEl.textContent = (index + 1).toString().padStart(2, "0");
//   }

//   function startAutoSwitch() {
//     autoSwitch = setInterval(() => {
//       let nextIndex = (currentIndex + 1) % tabs.length;
//       setActive(nextIndex);
//     }, 4000);
//   }

//   function resetAutoSwitch() {
//     clearInterval(autoSwitch);
//     startAutoSwitch();
//   }

//   tabs.forEach((tab, index) => {
//     tab.addEventListener("click", () => {
//       setActive(index);
//       resetAutoSwitch();
//     });
//   });

//   window.addEventListener("resize", () => {
//     setActive(currentIndex);
//   });

//   setActive(0);
//   startAutoSwitch();
// });















document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".home-build_wrapper");

  const tabs = wrapper.querySelectorAll(".home-build_list-item");
  const cards = wrapper.querySelectorAll(".home-build_image-card");
  const indicator = wrapper.querySelector(".tabs-indicator");
  const numberEl = wrapper.querySelector(".home-build_right-card-num .heading-style-h4");

  let currentIndex = 0;
  let autoSwitch;

  function setActive(index) {
    currentIndex = index;

    const activeTab = tabs[index];

    // Move indicator
    if (activeTab && indicator) {
      indicator.style.height = `${activeTab.offsetHeight}px`;
      indicator.style.transform = `translateY(${activeTab.offsetTop}px)`;
    }

    // Toggle classes
    tabs.forEach(tab => tab.classList.remove("active"));
    cards.forEach(card => card.classList.remove("active"));

    if (tabs[index]) tabs[index].classList.add("active");
    if (cards[index]) cards[index].classList.add("active");

    // Update number
    if (numberEl) {
      numberEl.textContent = (index + 1).toString().padStart(2, "0");
    }
  }

  function startAutoSwitch() {
    autoSwitch = setInterval(() => {
      let nextIndex = (currentIndex + 1) % tabs.length;
      setActive(nextIndex);
    }, 4000);
  }

  function resetAutoSwitch() {
    clearInterval(autoSwitch);
    startAutoSwitch();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActive(index);
      resetAutoSwitch();
    });
  });

  window.addEventListener("resize", () => {
    setActive(currentIndex);
  });

  // Init
  setActive(0);
  startAutoSwitch();
});




const pricingSwiper = new Swiper(".pricingswiper", {
    slidesPerView: 3.5,
    spaceBetween: 34,
    loop: false,

    navigation: {
      nextEl: ".pricing-next",
      prevEl: ".pricing-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1.2,
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
        slidesPerView: 3.5,
        spaceBetween: 24,
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
        slidesPerView: 1.2,
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
        slidesPerView: 3.2,
      }
    }
  });


document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".home-faq_item");

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











// const links = document.querySelectorAll('.home-process_left-list-item');
// const cards = document.querySelectorAll('.home-process_right-card');
// const wrappers = document.querySelectorAll('.home-process_card');

// // 1. CLICK TO SCROLL (Precise Calculation)
// links.forEach((link, index) => {
//   link.addEventListener('click', function(e) {
//     e.preventDefault();
//     const targetId = this.getAttribute('href').substring(1);
//     const targetEl = document.getElementById(targetId);
    
//     // Calculate position relative to document
//     const rect = targetEl.getBoundingClientRect();
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     const finalPosition = rect.top + scrollTop - 100; // 100 is your sticky top

//     window.scrollTo({
//       top: finalPosition,
//       behavior: 'smooth'
//     });
//   });
// });

// // 2. THE DUAL-DIRECTION SCROLL LOGIC
// function handleScroll() {
//   let activeIndex = 0;
//   const stickyThreshold = 120; // The point (in pixels) where the card "sticks"

//   wrappers.forEach((wrapper, index) => {
//     const rect = wrapper.getBoundingClientRect();

//     // LOGIC: 
//     // If the top of the wrapper has hit the sticky point 
//     // AND the bottom hasn't left the sticky point yet...
//     if (rect.top <= stickyThreshold && rect.bottom > stickyThreshold) {
//       activeIndex = index;
//     }
//   });

//   // Update Sidebar Links
//   links.forEach((link, i) => {
//     link.classList.toggle('active', i === activeIndex);
//   });

//   // Update Right Cards
//   cards.forEach((card, i) => {
//     card.classList.toggle('active', i === activeIndex);
//   });
// }

// // Listen for scroll and initial load
// window.addEventListener('scroll', handleScroll);
// window.addEventListener('DOMContentLoaded', handleScroll);













// window.addEventListener("load", () => {
//   const list = document.querySelector(".work__list");
//   const media = document.querySelector(".work__media");
//   const listMask = document.querySelector(".work__list-mask");
//   const right = document.querySelector(".work__right");

//   const originalList = list.innerHTML;
//   const originalMedia = media.innerHTML;

//   list.innerHTML = originalList.repeat(3);
//   media.innerHTML = originalMedia.repeat(3);

//   const items = [...document.querySelectorAll(".work__item")];
//   const cards = [...document.querySelectorAll(".work__card")];

//   const count = items.length / 3;
//   let index = count;
//   let moving = false;

//   function goTo(i, animate = true) {
//     if (moving && animate) return;

//     index = i;
//     const real = index % count;

//     items.forEach((el, idx) => {
//       el.classList.toggle("active", idx % count === real);
//     });

//     const isMobile = window.innerWidth <= 767;

//     const itemH = items[0].offsetHeight + 34;

//     const textY =
//       -(index * itemH) +
//       (listMask.clientHeight / 2 - itemH / 2);

//     if (animate) {
//       moving = true;

//       gsap.to(list, { y: textY, duration: 1 });

//       if (isMobile) {
//         const card = cards[index];
//         const cRect = card.getBoundingClientRect();
//         const wRect = right.getBoundingClientRect();
//         const currentX = gsap.getProperty(media, "x");

//         const x =
//           currentX +
//           (wRect.left + wRect.width / 2) -
//           (cRect.left + cRect.width / 2);

//         gsap.to(media, {
//           x,
//           duration: 1.2,
//           onComplete: () => {
//             moving = false;
//             fixLoop();
//           }
//         });

//       } else {
//         const cardH = cards[0].offsetHeight + 40;

//         const y =
//           -(index * cardH) +
//           (right.clientHeight / 2 - cards[0].offsetHeight / 2);

//         gsap.to(media, {
//           y,
//           duration: 1.2,
//           onComplete: () => {
//             moving = false;
//             fixLoop();
//           }
//         });
//       }

//     } else {
//       gsap.set(list, { y: textY });
//     }
//   }

//   function fixLoop() {
//     if (index >= count * 2) {
//       index -= count;
//       goTo(index, false);
//     }

//     if (index < count) {
//       index += count;
//       goTo(index, false);
//     }
//   }

//   setInterval(() => goTo(index + 1), 3000);

//   items.forEach((el, i) => {
//     el.addEventListener("click", () => goTo(i));
//   });

//   goTo(index, false);
// });


window.addEventListener("load", () => {
  const list = document.querySelector(".work__list");
  const media = document.querySelector(".work__media");
  const listMask = document.querySelector(".work__list-mask");
  const rightWrap = document.querySelector(".work__right");

  // 1. Setup Triple Loop
  const rawList = list.innerHTML;
  const rawMedia = media.innerHTML;
  list.innerHTML = rawList + rawList + rawList;
  media.innerHTML = rawMedia + rawMedia + rawMedia;

  let items = Array.from(document.querySelectorAll(".work__item"));
  let cards = Array.from(document.querySelectorAll(".work__card"));
  const count = items.length / 3;

  let index = count; 
  let isMoving = false;
  let autoTimer;

  function goTo(targetIndex, animate = true) {
    if (isMoving && animate) return;
    
    index = targetIndex;
    const isMobile = window.innerWidth <= 767;

    // Set active states
    items.forEach((item, i) => {
      item.classList.toggle("active", i % count === index % count);
    });

    // --- TEXT POS ---
    const activeText = items[index];
    const textY = -(activeText.offsetTop - (listMask.clientHeight / 2) + (activeText.clientHeight / 2));

    // --- MEDIA POS ---
    const activeCard = cards[index];
    let mediaPos = {};

    if (isMobile) {
      const mediaX = -(activeCard.offsetLeft - (window.innerWidth / 2) + (activeCard.clientWidth / 2));
      mediaPos = { x: mediaX, y: 0 }; // Clear Y axis
    } else {
      const mediaY = -(activeCard.offsetTop - (rightWrap.clientHeight / 2) + (activeCard.clientHeight / 2));
      mediaPos = { y: mediaY, x: 0 }; // Clear X axis
    }

    if (animate) {
      isMoving = true;
      gsap.to(list, { y: textY, duration: 0.8, ease: "power2.inOut" });
      gsap.to(media, {
        ...mediaPos,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          isMoving = false;
          checkLoop();
        }
      });
    } else {
      gsap.set(list, { y: textY });
      gsap.set(media, mediaPos);
    }
  }

  function checkLoop() {
    // Invisible jump to the center set
    if (index >= count * 2) {
      index = count;
      goTo(index, false);
    } else if (index < count) {
      index = (count * 2) - 1;
      goTo(index, false);
    }
  }

  function startAuto() {
    autoTimer = setInterval(() => {
      goTo(index + 1);
    }, 3000);
  }

  // Click interaction
  items.forEach((item, i) => {
    item.addEventListener("click", () => {
      clearInterval(autoTimer);
      goTo(i);
      startAuto();
    });
  });

  // Handle Window Resize
  window.addEventListener("resize", () => {
    gsap.set([list, media], { clearProps: "all" });
    goTo(index, false);
  });

  // Initialization
  goTo(index, false);
  startAuto();
});
