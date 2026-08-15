import mountSwiper from "../../utils/swiper.js";

const story = async () => {
  try {
    const data = await fetch("/db.json");
    const res = await data.json();

    const storyItems = res.story.map((item) => {
      return `
        <swiper-slide class="story-slide">
          <div class="swiper-slide-item">
            <div class="story-slide-image flex flex-col justify-center items-center p-1 sm:p-2 gap-2">
              <div class="rounded-full overflow-hidden w-16 h-16 sm:w-18 sm:h-18 lg:w-22 lg:h-22 bg-linear-to-b from-[#95489c] to-[#c84198] p-0.5">
                <img
                  src="${item.image}"
                  alt="${item.caption}"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
              <p>${item.title}</p>
            </div>
          </div>
        </swiper-slide>
      `;
    });

    const container = document.querySelector(".myStory");
    container.innerHTML = storyItems.join("");

    mountSwiper(container, {
      slidesPerView: 4.5,
      spaceBetween: 8,
      breakpoints: {
        480: { slidesPerView: 5.5, spaceBetween: 8 },
        640: { slidesPerView: 7.5, spaceBetween: 10 },
        768: { slidesPerView: 9.5, spaceBetween: 10 },
        1024: { slidesPerView: 12, spaceBetween: 12 },
      },
    });
  } catch (error) {
    console.log("story error:", error);
  }
};

export default story;
