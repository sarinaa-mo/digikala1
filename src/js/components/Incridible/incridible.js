import mountSwiper from "../../utils/swiper.js";
import amazingLogo from "../../../images/incredible/Amazings.svg";
import amazingBox from "../../../images/incredible/Amazingoff.svg";
import leftWhite from "../../../images/incredible/blueleft.svg";
import leftchevron from "../../../images/incredible/leftchevron.svg";

const firstSlide = `
<div class="flex flex-col justify-center items-center gap-1 sm:gap-2 h-full py-4 px-1">

    <img src="${amazingLogo}" class="w-14 sm:w-18 lg:w-22 mx-auto">

    <div class="time flex justify-center items-center gap-0.5 sm:gap-1 w-full text-white text-[11px] sm:text-sm">

        <div class="second font-vaziriNumber bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-sm text-black text-center leading-5 sm:leading-6">
            00
        </div>

        :

        <div class="minute font-vaziriNumber bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-sm text-black text-center leading-5 sm:leading-6">
            00
        </div>

        :

        <div class="hour font-vaziriNumber bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-sm text-black text-center leading-5 sm:leading-6">
            00
        </div>

    </div>

    <img src="${amazingBox}" alt="" class="w-12 sm:w-16 lg:w-20 block mx-auto" />

    <a href="#" class="flex justify-center items-center text-black text-[10px] sm:text-[12px] font-vaziri bg-white rounded-md py-1 px-2 sm:px-3 gap-1 whitespace-nowrap">

        مشاهده همه

        <img src="${leftchevron}" class="w-2 sm:w-3">

    </a>

</div>
`;

const incridible = async () => {
  try {
    const response = await fetch("/db.json");
    const data = await response.json();

    const html = data.incredible
      .map((item) => {
        return `
<swiper-slide class="h-auto py-4">

  <div class="bg-white h-full flex flex-col p-2">

    <img
      src="${item.img}"
      class="w-full h-24 sm:h-28 lg:h-30 object-contain">

    <p class="h-10 text-[11px] sm:text-[12px] text-gray-800 mt-2 leading-5 line-clamp-2 overflow-hidden font-vaziri">
      ${item.title}
    </p>

    <div class="flex justify-center items-center mt-auto w-full gap-2">

      <span class="bg-red-600 text-white rounded-full px-2 text-[10px] sm:text-xs text-center font-vaziriNumber">
        ${item.discount}
      </span>

      <div class="last price text-[11px] sm:text-[12px] text-[#7f7c7ccc] line-through font-vaziriNumber">
        ${item.oldPrice}
      </div>

    </div>

    <div class="flex flex-row items-center justify-center">

      <span class="text-gray-800 mt-1 text-[12px] sm:text-[14px] gap-1 flex items-center font-vaziriNumber">
        ${item.newPrice}
        <img src="${item.icon}" class="w-4 h-4 sm:w-5 sm:h-5 object-contain">
      </span>

    </div>

  </div>

</swiper-slide>
`;
      })
      .join("");

    const lastSlide = `
<swiper-slide class="h-auto py-4">

  <div class="bg-white h-full rounded-tl-2xl rounded-bl-2xl flex justify-center items-center">

    <a href="#" class="flex flex-col items-center gap-2 sm:gap-4">

      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-500 flex justify-center items-center">
        <img src="${leftWhite}" class="w-5 sm:w-6">
      </div>

      <span class="text-[11px] sm:text-sm text-black font-vaziri whitespace-nowrap">
        مشاهده همه
      </span>

    </a>

  </div>

</swiper-slide>
`;

    document.querySelector(".first-slide").innerHTML = firstSlide;

    const container = document.querySelector(".incredible");
    container.innerHTML = html + lastSlide;

    mountSwiper(container, {
      slidesPerView: 2.2,
      spaceBetween: 4,
      breakpoints: {
        480: { slidesPerView: 2.8, spaceBetween: 6 },
        640: { slidesPerView: 3.5, spaceBetween: 6 },
        768: { slidesPerView: 4.5, spaceBetween: 8 },
        1024: { slidesPerView: 6, spaceBetween: 8 },
        1280: { slidesPerView: 7.2, spaceBetween: 8 },
      },
    });

    startTimer();
  } catch (error) {
    console.log(error);
  }
};

/*================ شمارش معکوس تا نیمه‌شب ================*/

function startTimer() {
  const second = document.querySelector(".second");
  const minute = document.querySelector(".minute");
  const hour = document.querySelector(".hour");

  if (!second || !minute || !hour) return;

  const updateTimer = () => {
    const now = new Date();

    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = Math.floor((midnight - now) / 1000);

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    hour.textContent = String(h).padStart(2, "0");
    minute.textContent = String(m).padStart(2, "0");
    second.textContent = String(s).padStart(2, "0");
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

export default incridible;
