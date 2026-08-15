import mountSwiper from "../../utils/swiper.js";

const classification = async () => {
  try {
    const response = await fetch("/db.json");
    const data = await response.json();

    const container = document.querySelector(".mySwiper");
    const wrapper = document.querySelector(".wrapper1");

    // هدر
    const title = document.createElement("h2");

    title.className = `
      text-right
      text-[17px]
      md:text-[22px]
      font-normal
      mb-4
      md:mb-8
      mt-6
      font-vaziri
    `;

    title.textContent = "دسته‌بندی‌ها";

    wrapper.prepend(title);

    // اسلایدها
    container.innerHTML = data.classification
      .map((item) => {
        return `
        <swiper-slide>

          <div class="h-full flex flex-col items-center justify-center gap-2 py-3 md:py-5">

            <img
              src="${item.img}"
              class="w-16 h-16 sm:w-20 sm:h-20 lg:w-25 lg:h-25 object-contain"
            >

            <p class="text-[11px] md:text-[12px] text-center text-black font-vaziri line-clamp-2">
              ${item.title}
            </p>

          </div>

        </swiper-slide>
      `;
      })
      .join("");

    mountSwiper(container, {
      slidesPerView: 3,
      spaceBetween: 8,
      pagination: { clickable: true },
      grid: { rows: 2, fill: "row" },
      breakpoints: {
        480: { slidesPerView: 4, grid: { rows: 2, fill: "row" } },
        768: { slidesPerView: 5, grid: { rows: 2, fill: "row" } },
        1024: { slidesPerView: 7, grid: { rows: 2, fill: "row" } },
        1280: { slidesPerView: 9, grid: { rows: 2, fill: "row" } },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default classification;
