/*
  نوار پیشنهاد سوپرمارکتی.
  تعداد دایره‌های محصول بر اساس عرض صفحه محدود می‌شود؛ وگرنه در
  عرض‌های میانی محتوای offer-left از کانتینر بیرون می‌زد.
*/

const visibleCount = () => {
  const w = window.innerWidth;

  if (w < 768) return 3;
  if (w < 1024) return 3;
  if (w < 1280) return 4;

  return 6;
};

const offer = async () => {
  try {
    const data = await fetch("db.json");
    const res = await data.json();

    const all = res.offer.items;

    const list = document.querySelector(".offer-items");

    if (!list) return;

    const render = () => {
      list.innerHTML = all
        .slice(0, visibleCount())
        .map(
          (item) => `
        <li class="my-0 mx-1 md:mx-1.5 flex justify-center items-center shrink-0">
          <a class="block w-11 h-11 md:w-14 md:h-14 lg:w-16.25 lg:h-16.25 bg-white rounded-[50%]" href="${item.href}">
            <img
              class="w-11 h-11 md:w-14 md:h-14 lg:w-16.25 lg:h-16.25 rounded-[50%] object-contain"
              src="${item.image}"
              alt=""
            />
            <p class="relative -top-3.5 md:-top-5 lg:-top-6.25 float-right bg-rose-700 text-[8px] md:text-[11px] flex items-center text-white rounded-[15px] py-0.5 px-1 md:py-1 md:px-1.5 box-border font-vaziriNumber">
              ${item.discount}%
            </p>
          </a>
        </li>
      `
        )
        .join("");
    };

    render();

    // با تغییر بریک‌پوینت تعداد آیتم‌ها عوض می‌شود
    let last = visibleCount();
    let timer;

    window.addEventListener("resize", () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        const now = visibleCount();

        if (now !== last) {
          last = now;
          render();
        }
      }, 150);
    });
  } catch (error) {
    console.log("offer error:", error);
  }
};

export default offer;
