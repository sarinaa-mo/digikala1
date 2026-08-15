import mountSwiper from "../../utils/swiper.js";

const favoritebrands = async () => {
  try {
    const data = await fetch("db.json");
    const res = await data.json();

    const slides = res.story2.map((item) => {
      return `
      <swiper-slide class="brand-slide">
        <a href="#" class="w-full h-full no-underline flex justify-center items-center px-2 box-border flex-col">
          <img
            src="${item.image}"
            alt="brand-${item.id}"
            class="block w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
          />
          <p class="text-[#424750] text-[11px] lg:text-[12px] font-vaziri text-center mt-1 line-clamp-1">
            ${item.title}
          </p>
        </a>
      </swiper-slide>
      `;
    });

    const container = document.querySelector(".mymost-popular-brands");
    container.innerHTML = slides.join("");

    mountSwiper(container, {
      slidesPerView: 3.5,
      spaceBetween: 4,
      freeMode: true,
      breakpoints: {
        480: { slidesPerView: 4.5, spaceBetween: 4 },
        640: { slidesPerView: 6.5, spaceBetween: 4 },
        768: { slidesPerView: 8, spaceBetween: 4 },
        1024: { slidesPerView: 9.35, spaceBetween: 4 },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default favoritebrands;
