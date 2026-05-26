    const swiper = new Swiper(".swiper", {
      loop: true,

      slidesPerView: 4,
      spaceBetween: 16,


      // Responsive
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });
