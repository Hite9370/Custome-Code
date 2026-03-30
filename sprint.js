
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



window.addEventListener("load", () => {
    const items = gsap.utils.toArray(".home-work_card-list-item");
    const leftList = document.querySelector(".home-work_card-list");
    const rightWrapper = document.querySelector(".home-work_card-image-wrapper");
    const cards = gsap.utils.toArray(".home-work_card-image-wrap");
    
    const leftVisibleWindow = document.querySelector(".home-work_card-list-wrap");
    const rightParent = document.querySelector(".home-work_card-right-wrap");

    const listGap = 34;
    const cardGap = 24;

    function isMobile() {
        return window.innerWidth <= 767;
    }

    let userClicked = false;

    function goToIndex(index, isUserAction = false) {

        if (isUserAction) userClicked = true;

        items.forEach((el, i) => el.classList.toggle("active", i === index));

        // ✅ MOBILE
        if (isMobile()) {

            // ❌ block auto scroll
            if (!isUserAction) return;

            gsap.set(leftList, { y: 0 });
            gsap.set(rightWrapper, { y: 0 });

            const container = leftVisibleWindow;
            const item = items[index];

            const containerRect = container.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const currentScroll = container.scrollTop;

            const offset =
                itemRect.top - containerRect.top + currentScroll;

            const scrollPosition =
                offset - (container.clientHeight / 2) + (item.clientHeight / 2);

            container.scrollTo({
                top: scrollPosition,
                behavior: "smooth"
            });

            cards[index].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });

            return;
        }

        // ✅ DESKTOP
        const itemHeight = items[index].offsetHeight;
        const cardHeight = cards[index].offsetHeight;

        let distanceToItem = 0;
        for (let i = 0; i < index; i++) {
            distanceToItem += items[i].offsetHeight + listGap;
        }

        let distanceToCard = 0;
        for (let i = 0; i < index; i++) {
            distanceToCard += cards[i].offsetHeight + cardGap;
        }

        const centerY_Left =
            (leftVisibleWindow.offsetHeight / 2) -
            (itemHeight / 2) -
            distanceToItem;

        const centerY_Right =
            (rightParent.offsetHeight / 2) -
            (cardHeight / 2) -
            distanceToCard;

        gsap.to(leftList, {
            y: centerY_Left,
            duration: 0.8,
            ease: "power3.inOut"
        });

        gsap.to(rightWrapper, {
            y: centerY_Right,
            duration: 1,
            ease: "power3.inOut"
        });
    }

    // ✅ CLICK (important fix)
    items.forEach((item, index) => {
        item.addEventListener("click", () => goToIndex(index, true));
    });

    // ✅ INIT
    if (!isMobile()) {
        goToIndex(0);
    }

    // ✅ RESIZE (safe)
    window.addEventListener("resize", () => {
        // only reset transforms, no scroll
        if (isMobile()) {
            gsap.set(leftList, { y: 0 });
            gsap.set(rightWrapper, { y: 0 });
        }
    });

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


document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".home-build_list-item");
  const cards = document.querySelectorAll(".home-build_image-card");
  const indicator = document.querySelector(".tabs-indicator");
  const numberEl = document.querySelector(".home-build_right-card-num .heading-style-h4");

  function setActive(index) {
    const activeTab = tabs[index];

    // 1. Move indicator vertically
    if (activeTab && indicator) {
      indicator.style.height = `${activeTab.offsetHeight}px`;
      // Use translateY for better performance
      indicator.style.transform = `translateY(${activeTab.offsetTop}px)`;
    }

    // 2. Toggle Active Classes
    tabs.forEach(tab => tab.classList.remove("active"));
    cards.forEach(card => card.classList.remove("active"));

    activeTab.classList.add("active");
    if (cards[index]) cards[index].classList.add("active");

    // 3. Update Number
    if (numberEl) {
      numberEl.textContent = (index + 1).toString().padStart(2, "0");
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setActive(index));
  });

  // Handle window resize to keep border aligned
  window.addEventListener("resize", () => {
    const currentIndex = Array.from(tabs).findIndex(t => t.classList.contains("active"));
    setActive(currentIndex);
  });

  // Init
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
        slidesPerView: 1.5,
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
        slidesPerView: 1.5,
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







const cards = document.querySelectorAll('.home-process_card');
const navItems = document.querySelectorAll('.home-process_left-list-item');

function updateActive() {
  let currentId = null;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();

    // middle trigger zone
    if (
      rect.top <= window.innerHeight * 0.4 &&
      rect.bottom >= window.innerHeight * 0.4
    ) {
      currentId = card.id;
    }
  });

  if (currentId) {
    navItems.forEach((item) => {
      item.classList.remove('active');
      item.classList.remove('w--current'); // remove Webflow default
    });

    const activeItem = document.querySelector(
      `.home-process_left-list-item[href="#${currentId}"]`
    );

    if (activeItem) {
      activeItem.classList.add('active');
    }
  }
}

// scroll listener (smooth + performant)
window.addEventListener('scroll', () => {
  requestAnimationFrame(updateActive);
});

// run on load
window.addEventListener('load', updateActive);


// OPTIONAL: smooth scroll
navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();

    const target = document.querySelector(item.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
