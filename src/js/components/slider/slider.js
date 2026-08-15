import mountSwiper from "../../utils/swiper.js";

const slider = async () => {
  try {
    const data = await fetch("/db.json");
    const res = await data.json();

    const slides = res.slider.map((item) => {
      return `
        <swiper-slide class="relative">
          <a href="${item.link}" class="block w-full">
            <img
              src="${item.image}"
              class="w-full h-40 sm:h-56 md:h-72 lg:h-100 object-cover"
              alt=""
            />
          </a>
        </swiper-slide>
      `;
    });

    const container = document.querySelector(".mainslider");
    container.innerHTML = slides.join("");

    mountSwiper(container, {
      slidesPerView: 1,
      speed: 600,
      loop: true,
      pagination: { clickable: true },
      navigation: true,
      autoplay: { delay: 2500, disableOnInteraction: false },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default slider;
