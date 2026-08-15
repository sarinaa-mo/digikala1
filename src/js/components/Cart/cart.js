import { toFa, formatPrice } from "../../utils/format.js";
import {
  getCart,
  setQty,
  removeItem,
  clearCart,
} from "../../utils/store.js";
import closeIcon from "../../../images/icons/close.svg";
import basketIcon from "../../../images/icons/basket2.svg";
import trashIcon from "../../../images/MoblieMenu/trash.svg";
import tomanIcon from "../../../images/incredible/toman.svg";

/*
  کشوی سبد خرید. مثل کشوی منو داخل یک شلِ fixed با overflow:hidden
  قرار می‌گیرد تا در حالت بسته عرض اسکرول صفحه را زیاد نکند.
*/

const cart = () => {
  buildDrawer();
  wireTriggers();
  wireDrawer();

  document.addEventListener("cart:change", () => {
    renderBadges();
    renderBody();
  });

  renderBadges();
  renderBody();
};

/*#########################################################
#################### MARKUP ###############################
#########################################################*/

function buildDrawer() {
  if (document.querySelector(".cart-shell")) return;

  const shell = document.createElement("div");

  shell.className = `
    cart-shell
    fixed
    inset-0
    z-[950]
    overflow-hidden
    pointer-events-none
  `;

  shell.innerHTML = `
    <div class="cart-overlay absolute inset-0 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300"></div>

    <aside
      class="cart-panel absolute top-0 left-0 h-full w-[88%] max-w-105 bg-white translate-x-[-100%] transition-transform duration-300 flex flex-col shadow-2xl pointer-events-auto"
    >

      <!-- header -->
      <div class="flex items-center justify-between px-4 h-14 border-b border-[#e0e0e2] shrink-0">

        <div class="flex items-center gap-2">
          <img src="${basketIcon}" alt="" class="w-5 h-5" />
          <span class="text-[14px] font-bold text-[#424750]">سبد خرید</span>
          <span class="cart-count-label text-[12px] text-[#a1a3a8]"></span>
        </div>

        <button class="cart-close w-8 h-8 flex items-center justify-center cursor-pointer" aria-label="بستن سبد خرید">
          <img src="${closeIcon}" alt="" class="w-5 h-5" />
        </button>

      </div>

      <!-- items -->
      <div class="cart-body flex-1 overflow-y-auto overscroll-contain p-3"></div>

      <!-- footer -->
      <div class="cart-footer border-t border-[#e0e0e2] p-4 shrink-0"></div>

    </aside>
  `;

  document.body.appendChild(shell);
}

/*#########################################################
#################### RENDER ###############################
#########################################################*/

function renderBody() {
  const body = document.querySelector(".cart-body");
  const footer = document.querySelector(".cart-footer");
  const countLabel = document.querySelector(".cart-count-label");

  if (!body) return;

  const { items, count, total, discount } = getCart();

  countLabel.textContent = count ? `(${toFa(count)} کالا)` : "";

  /*---------------- سبد خالی ----------------*/

  if (!items.length) {
    body.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
        <img src="${basketIcon}" alt="" class="w-16 h-16 opacity-30" />
        <p class="text-[13px] text-[#a1a3a8]">سبد خرید شما خالی است</p>
      </div>
    `;

    footer.innerHTML = "";

    return;
  }

  /*---------------- لیست کالاها ----------------*/

  body.innerHTML = items
    .map(
      (item) => `
    <div class="flex gap-3 py-3 border-b border-[#f0f0f1] last:border-0">

      <a href="${item.href}" target="_blank" rel="noopener" class="shrink-0">
        <img src="${item.image}" alt="" class="w-20 h-20 object-contain" />
      </a>

      <div class="flex-1 min-w-0 flex flex-col">

        <a href="${item.href}" target="_blank" rel="noopener"
           class="text-[12px] leading-5 text-[#424750] line-clamp-2">
          ${item.title}
        </a>

        <div class="mt-auto pt-2 flex items-center justify-between gap-2">

          <!-- شمارنده -->
          <div class="flex items-center border border-[#e0e0e2] rounded-lg overflow-hidden">

            <button class="qty-dec w-7 h-7 text-[#ef4056] text-lg leading-none cursor-pointer" data-id="${item.id}" aria-label="کاهش">−</button>

            <span class="w-8 text-center text-[13px] font-vaziriNumber">${toFa(item.qty)}</span>

            <button class="qty-inc w-7 h-7 text-[#ef4056] text-lg leading-none cursor-pointer" data-id="${item.id}" aria-label="افزایش">+</button>

          </div>

          <div class="flex items-center gap-1">
            <span class="text-[13px] font-vaziriNumber text-[#0c0c0c]">
              ${formatPrice(item.newPrice * item.qty)}
            </span>
            <img src="${tomanIcon}" alt="تومان" class="w-3.5 h-3.5" />
          </div>

        </div>

      </div>

      <button class="cart-remove shrink-0 w-7 h-7 self-start cursor-pointer" data-id="${item.id}" aria-label="حذف">
        <img src="${trashIcon}" alt="" class="w-4 h-4 opacity-60" />
      </button>

    </div>
  `
    )
    .join("");

  /*---------------- جمع فاکتور ----------------*/

  footer.innerHTML = `
    <div class="flex items-center justify-between text-[13px] text-[#62666d] mb-2">
      <span>قیمت کالاها (${toFa(getCart().count)})</span>
      <span class="font-vaziriNumber">${formatPrice(total + discount)}</span>
    </div>

    ${
      discount > 0
        ? `<div class="flex items-center justify-between text-[13px] text-[#ef4056] mb-2">
             <span>سود شما از خرید</span>
             <span class="font-vaziriNumber">${formatPrice(discount)}</span>
           </div>`
        : ""
    }

    <div class="flex items-center justify-between text-[15px] font-bold text-[#0c0c0c] mb-3 pt-2 border-t border-[#f0f0f1]">
      <span>جمع سبد خرید</span>
      <span class="flex items-center gap-1">
        <span class="font-vaziriNumber">${formatPrice(total)}</span>
        <img src="${tomanIcon}" alt="تومان" class="w-4 h-4" />
      </span>
    </div>

    <button class="cart-checkout w-full h-11 bg-[#ef4056] hover:bg-[#d6304a] transition text-white rounded-lg text-[14px] cursor-pointer">
      ثبت سفارش
    </button>

    <button class="cart-clear w-full h-9 mt-2 text-[12px] text-[#a1a3a8] hover:text-[#ef4056] transition cursor-pointer">
      خالی کردن سبد
    </button>
  `;
}

function renderBadges() {
  const { count } = getCart();

  document.querySelectorAll(".cart-badge").forEach((badge) => {
    badge.textContent = toFa(count);
    badge.classList.toggle("hidden", count === 0);
  });
}

/*#########################################################
#################### EVENTS ###############################
#########################################################*/

function wireTriggers() {
  // هر عنصری با کلاس cart-trigger کشو را باز می‌کند
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".cart-trigger");

    if (!trigger) return;

    e.preventDefault();

    openCart();
  });
}

function wireDrawer() {
  const shell = document.querySelector(".cart-shell");

  shell.querySelector(".cart-close").addEventListener("click", closeCart);
  shell.querySelector(".cart-overlay").addEventListener("click", closeCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  shell.addEventListener("click", (e) => {
    const dec = e.target.closest(".qty-dec");
    const inc = e.target.closest(".qty-inc");
    const remove = e.target.closest(".cart-remove");
    const clear = e.target.closest(".cart-clear");
    const checkout = e.target.closest(".cart-checkout");

    const { items } = getCart();

    if (dec || inc) {
      const id = Number((dec || inc).dataset.id);
      const item = items.find((i) => i.id === id);

      if (item) setQty(id, item.qty + (inc ? 1 : -1));

      return;
    }

    if (remove) {
      removeItem(Number(remove.dataset.id));
      return;
    }

    if (clear) {
      clearCart();
      return;
    }

    if (checkout) {
      alert("این یک پروژه‌ی نمایشی است؛ مرحله‌ی پرداخت پیاده‌سازی نشده.");
    }
  });
}

function openCart() {
  const overlay = document.querySelector(".cart-overlay");
  const panel = document.querySelector(".cart-panel");

  overlay.classList.remove("opacity-0", "pointer-events-none");
  panel.classList.remove("translate-x-[-100%]");

  document.body.classList.add("overflow-hidden");
}

function closeCart() {
  const overlay = document.querySelector(".cart-overlay");
  const panel = document.querySelector(".cart-panel");

  if (!overlay) return;

  overlay.classList.add("opacity-0", "pointer-events-none");
  panel.classList.add("translate-x-[-100%]");

  document.body.classList.remove("overflow-hidden");
}

export default cart;
