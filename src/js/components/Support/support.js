import supportIcon from "../../../images/icons/support.svg";
import closeIcon from "../../../images/icons/close.svg";
import chevronLeft from "../../../images/icons/chevron-left.svg";

/*
  پشتیبانی: دکمه‌ای در نوار منوی هدر که یک مودال وسط صفحه باز می‌کند
  - مثل خود دیجی‌کالا، نه منوی کشویی.
*/

const QUICK_LINKS = [
  { title: "پاسخ به پرسش‌های متداول", desc: "پرتکرارترین سوال‌ها", href: "#" },
  { title: "پیگیری سفارش", desc: "وضعیت مرسوله‌ی خود را ببینید", href: "#" },
  { title: "رویه‌های بازگرداندن کالا", desc: "شرایط مرجوعی و بازپرداخت", href: "#" },
  { title: "ثبت شکایت", desc: "انتقاد و پیشنهاد خود را بگویید", href: "#" },
];

const CHANNELS = [
  { icon: "📞", title: "تماس تلفنی", value: "۶۱۹۳۰۰۰۰-۰۲۱", note: "۷ روز هفته، ۲۴ ساعته" },
  { icon: "💬", title: "گفتگوی آنلاین", value: "شروع گفتگو", note: "میانگین انتظار: ۲ دقیقه" },
  { icon: "✉️", title: "ایمیل", value: "support@digikala.com", note: "پاسخ تا ۲۴ ساعت" },
];

const support = (container) => {
  if (!container) return;

  /*---------------- دکمه‌ی هدر ----------------*/

  const btn = document.createElement("button");

  btn.type = "button";

  btn.className = `
    support-btn
    flex
    items-center
    gap-1.5
    h-full
    px-3
    text-[12px]
    text-[#62666d]
    hover:text-red-500
    transition
    cursor-pointer
  `;

  btn.innerHTML = `
    <img src="${supportIcon}" alt="" class="w-5 h-5" />
    <span class="whitespace-nowrap">پشتیبانی</span>
  `;

  container.appendChild(btn);

  createSupportModal();

  btn.addEventListener("click", openSupportModal);
};

/*#########################################################
#################### MODAL ################################
#########################################################*/

function createSupportModal() {
  if (document.querySelector(".support-modal")) return;

  const modal = document.createElement("div");

  modal.className = `
    support-modal
    fixed
    inset-0
    hidden
    justify-center
    items-center
    bg-black/40
    z-[999]
    p-3
  `;

  modal.innerHTML = `
    <div class="bg-white w-full max-w-150 max-h-[92vh] rounded-xl overflow-hidden flex flex-col">

      <!-- header -->
      <div class="flex justify-between items-center border-b border-[#e0e0e2] px-5 py-4 shrink-0">

        <div class="flex items-center gap-2">
          <img src="${supportIcon}" alt="" class="w-6 h-6" />
          <h2 class="font-bold text-[16px] text-[#0c0c0c]">پشتیبانی دیجی‌کالا</h2>
        </div>

        <button class="close-support w-8 h-8 flex items-center justify-center cursor-pointer" aria-label="بستن">
          <img src="${closeIcon}" alt="" class="w-5 h-5" />
        </button>

      </div>

      <!-- body -->
      <div class="p-5 overflow-y-auto flex-1">

        <!-- راه‌های ارتباطی -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          ${CHANNELS.map(
            (c) => `
            <div class="border border-[#e0e0e2] rounded-xl p-3 flex flex-col items-center text-center gap-1 hover:border-[#ef4056] transition cursor-pointer">
              <span class="text-2xl">${c.icon}</span>
              <span class="text-[12px] text-[#62666d]">${c.title}</span>
              <span class="text-[13px] font-bold text-[#0c0c0c] font-vaziriNumber">${c.value}</span>
              <span class="text-[10px] text-[#a1a3a8]">${c.note}</span>
            </div>
          `
          ).join("")}
        </div>

        <!-- لینک‌های پرکاربرد -->
        <h3 class="text-[13px] font-bold text-[#424750] mb-3">موضوع درخواست خود را انتخاب کنید</h3>

        <div class="flex flex-col gap-2">
          ${QUICK_LINKS.map(
            (link) => `
            <a href="${link.href}"
               class="border border-[#e0e0e2] rounded-xl flex justify-between items-center p-3 hover:border-[#ef4056] transition">

              <div class="flex flex-col">
                <span class="text-[13px] text-[#0c0c0c]">${link.title}</span>
                <span class="text-[11px] text-[#a1a3a8]">${link.desc}</span>
              </div>

              <img src="${chevronLeft}" alt="" class="w-4 h-4 opacity-50 shrink-0" />

            </a>
          `
          ).join("")}
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  /*---------------- رویدادها ----------------*/

  const close = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  };

  modal.querySelector(".close-support").addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function openSupportModal() {
  const modal = document.querySelector(".support-modal");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.body.classList.add("overflow-hidden");
}

export default support;
