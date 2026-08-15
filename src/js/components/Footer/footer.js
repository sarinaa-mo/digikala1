import logoImage from "../../../images/Logo/logo.svg";
import chevronDown from "../../../images/icons/chevron-down.svg";
import supportIcon from "../../../images/icons/support.svg";

/*
  فوتر کامل به سبک دیجی‌کالا.
  در موبایل ستون‌های لینک به آکاردئون تبدیل می‌شوند.
*/

const FEATURES = [
  { title: "امکان تحویل اکسپرس", icon: "🚚" },
  { title: "امکان پرداخت در محل", icon: "💳" },
  { title: "۷ روز هفته، ۲۴ ساعته", icon: "🕐" },
  { title: "ضمانت اصل بودن کالا", icon: "✅" },
];

const LINK_COLUMNS = [
  {
    title: "با دیجی‌کالا",
    links: [
      "اتاق خبر دیجی‌کالا",
      "فروش در دیجی‌کالا",
      "فرصت‌های شغلی",
      "تماس با دیجی‌کالا",
      "درباره دیجی‌کالا",
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      "پاسخ به پرسش‌های متداول",
      "رویه‌های بازگرداندن کالا",
      "شرایط استفاده",
      "حریم خصوصی",
      "گزارش باگ",
    ],
  },
  {
    title: "راهنمای خرید از دیجی‌کالا",
    links: [
      "نحوه ثبت سفارش",
      "رویه ارسال سفارش",
      "شیوه‌های پرداخت",
      "پیگیری سفارش",
    ],
  },
];

const footer = () => {
  const host = document.querySelector(".site-footer");

  if (!host) return;

  host.innerHTML = `
  <div class="w-full bg-white border-t border-[#e0e0e2] mt-8">

    <div class="dk-container py-6">

      <!--#region top -->
      <div class="flex items-center justify-between pb-4 border-b border-[#f0f0f1]">

        <a href="index.html" class="shrink-0">
          <img src="${logoImage}" alt="دیجی‌کالا" class="w-24 lg:w-36 object-contain" />
        </a>

        <button
          class="scroll-top flex items-center gap-2 text-[11px] lg:text-[13px] text-[#62666d] border border-[#e0e0e2] rounded-lg px-3 py-2 cursor-pointer hover:border-[#ef4056] hover:text-[#ef4056] transition"
        >
          بازگشت به بالا
          <img src="${chevronDown}" alt="" class="w-4 h-4 rotate-180" />
        </button>

      </div>
      <!--#endregion top -->

      <!--#region features -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-[#f0f0f1]">
        ${FEATURES.map(
          (f) => `
          <div class="flex flex-col items-center gap-2 text-center">
            <span class="text-2xl lg:text-3xl">${f.icon}</span>
            <span class="text-[11px] lg:text-[12px] text-[#62666d]">${f.title}</span>
          </div>
        `
        ).join("")}
      </div>
      <!--#endregion features -->

      <!--#region links -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-2 py-6 border-b border-[#f0f0f1]">

        ${LINK_COLUMNS.map(
          (col) => `
          <div class="footer-col border-b border-[#f0f0f1] md:border-0 pb-2 md:pb-0">

            <button class="footer-col-toggle w-full flex items-center justify-between py-2 md:pointer-events-none cursor-pointer">
              <h3 class="text-[13px] font-bold text-[#424750]">${col.title}</h3>
              <img src="${chevronDown}" alt="" class="footer-col-chevron w-4 h-4 md:hidden transition-transform" />
            </button>

            <ul class="footer-col-list hidden md:block">
              ${col.links
                .map(
                  (link) => `
                <li class="mb-2">
                  <a href="#" class="text-[12px] text-[#62666d] hover:text-[#ef4056] transition">${link}</a>
                </li>
              `
                )
                .join("")}
            </ul>

          </div>
        `
        ).join("")}

        <!-- تماس و شبکه‌های اجتماعی -->
        <div class="pt-2 md:pt-0">

          <h3 class="text-[13px] font-bold text-[#424750] mb-3">همراه ما باشید!</h3>

          <div class="flex items-center gap-3 mb-4">
            ${["📷", "✈️", "🐦", "▶️"]
              .map(
                (icon) => `
              <a href="#" class="w-8 h-8 rounded-full border border-[#e0e0e2] flex items-center justify-center text-sm hover:border-[#ef4056] transition">${icon}</a>
            `
              )
              .join("")}
          </div>

          <div class="flex items-center gap-2 text-[12px] text-[#62666d]">
            <img src="${supportIcon}" alt="" class="w-5 h-5" />
            <span>پشتیبانی ۲۴ ساعته: <span class="font-vaziriNumber">۶۱۹۳۰۰۰۰-۰۲۱</span></span>
          </div>

        </div>

      </div>
      <!--#endregion links -->

      <!--#region newsletter -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-3 py-5 border-b border-[#f0f0f1]">

        <p class="text-[12px] text-[#62666d] text-center md:text-right">
          از جدیدترین تخفیف‌ها باخبر شوید
        </p>

        <form class="newsletter flex items-center gap-2 w-full md:w-auto">

          <input
            type="email"
            placeholder="ایمیل شما"
            class="flex-1 md:w-64 h-10 bg-[#f0f0f1] rounded-lg px-3 text-[12px] outline-none border-none"
          />

          <button type="submit" class="h-10 px-4 bg-[#424750] text-white rounded-lg text-[12px] cursor-pointer shrink-0">
            ثبت
          </button>

        </form>

      </div>
      <!--#endregion newsletter -->

      <!--#region about -->
      <div class="py-5 text-[11px] leading-6 text-[#a1a3a8] text-justify">

        <h4 class="text-[13px] text-[#424750] font-bold mb-2">
          فروشگاه اینترنتی دیجی‌کالا، بررسی، انتخاب و خرید آنلاین
        </h4>

        <p>
          دیجی‌کالا با بیش از یک دهه فعالیت، بزرگ‌ترین فروشگاه اینترنتی ایران است
          که با ارائه‌ی میلیون‌ها کالا در دسته‌بندی‌های متنوع، تجربه‌ی خریدی
          آسان و مطمئن را برای کاربران فراهم می‌کند. امکان بازگشت کالا، ضمانت
          اصالت و پشتیبانی شبانه‌روزی از مزیت‌های خرید از این فروشگاه است.
        </p>

        <p class="mt-3 text-center text-[10px]">
          استفاده از مطالب فروشگاه اینترنتی دیجی‌کالا فقط برای مقاصد غیرتجاری و
          با ذکر منبع بلامانع است. این یک پروژه‌ی آموزشی است.
        </p>

      </div>
      <!--#endregion about -->

    </div>

  </div>
  `;

  wireFooter(host);
};

/*#########################################################
#################### EVENTS ###############################
#########################################################*/

function wireFooter(host) {
  // بازگشت به بالا
  host.querySelector(".scroll-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // آکاردئون ستون‌ها - فقط موبایل
  host.querySelectorAll(".footer-col-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const list = toggle.parentElement.querySelector(".footer-col-list");
      const chevron = toggle.querySelector(".footer-col-chevron");

      list.classList.toggle("hidden");
      chevron.classList.toggle("rotate-180");
    });
  });

  // خبرنامه
  host.querySelector(".newsletter").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = e.target.querySelector("input");

    if (!input.value.trim()) return;

    input.value = "";
    input.placeholder = "ثبت شد ✓";

    setTimeout(() => {
      input.placeholder = "ایمیل شما";
    }, 2000);
  });
}

export default footer;
