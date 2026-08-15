import mountSwiper from "../../utils/swiper.js";
import { toFa, formatPrice } from "../../utils/format.js";
import { addItem } from "../../utils/store.js";
import tomanIcon from "../../../images/incredible/toman.svg";
import chevronLeft from "../../../images/icons/chevron-left.svg";

/*
  اسلایدر محصول که هم برای ردیف‌های دسته‌بندی، هم پرفروش‌ترین‌ها
  و هم داغ‌ترین‌ها استفاده می‌شود.
*/

/*#########################################################
#################### PRODUCT CARD #########################
#########################################################*/

export function productCard(product, options = {}) {
  const { rank = null } = options;

  const hasDiscount = product.discount > 0 && product.oldPrice;

  return `
  <div class="product-card group relative h-full flex flex-col bg-white rounded-xl p-2 sm:p-3 border border-transparent hover:border-[#e0e0e2] transition">

    ${
      rank !== null
        ? `<span class="absolute top-2 right-2 z-10 text-[11px] font-vaziriNumber text-[#a1a3a8]">${toFa(rank)}</span>`
        : ""
    }

    <a href="${product.href}" target="_blank" rel="noopener" class="block">
      <img
        src="${product.image}"
        alt="${product.title}"
        loading="lazy"
        class="w-full h-28 sm:h-36 lg:h-44 object-contain"
      />
    </a>

    <a href="${product.href}" target="_blank" rel="noopener"
       class="mt-2 text-[11px] sm:text-[12px] leading-5 text-[#424750] line-clamp-2 h-10 overflow-hidden">
      ${product.title}
    </a>

    <div class="mt-auto pt-2 flex items-end justify-between gap-1">

      <button
        class="add-to-cart shrink-0 w-7 h-7 rounded-full bg-[#ef4056] text-white text-lg leading-none flex items-center justify-center cursor-pointer hover:bg-[#d6304a] transition"
        data-id="${product.id}"
        aria-label="افزودن به سبد خرید"
      >+</button>

      <div class="flex flex-col items-end gap-0.5 min-w-0">

        ${
          hasDiscount
            ? `<div class="flex items-center gap-1.5">
                 <span class="bg-[#ef4056] text-white rounded-full px-1.5 text-[10px] sm:text-[11px] font-vaziriNumber">
                   ${toFa(product.discount)}٪
                 </span>
                 <span class="text-[10px] sm:text-[11px] text-[#a1a3a8] line-through font-vaziriNumber">
                   ${formatPrice(product.oldPrice)}
                 </span>
               </div>`
            : ""
        }

        <div class="flex items-center gap-1">
          <span class="text-[13px] sm:text-[15px] text-[#0c0c0c] font-vaziriNumber">
            ${formatPrice(product.newPrice)}
          </span>
          <img src="${tomanIcon}" alt="تومان" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

      </div>

    </div>

  </div>
  `;
}

/*#########################################################
#################### SECTION ##############################
#########################################################*/

/**
 * یک سکشن اسلایدری محصول می‌سازد و به انتهای container اضافه می‌کند.
 *
 * @param {HTMLElement} container   جایی که سکشن اضافه می‌شود
 * @param {object} section          { title, seeMore, products }
 * @param {object} options          { ranked, background }
 */
export function renderProductSection(container, section, options = {}) {
  const { ranked = false, background = "bg-white" } = options;

  if (!section || !section.products || !section.products.length) return;

  const wrapper = document.createElement("section");

  wrapper.className = `dk-container mt-6`;

  wrapper.innerHTML = `
    <div class="${background} rounded-2xl border border-[#f0f0f1] p-3 sm:p-4">

      <div class="flex items-center justify-between mb-3">

        <h2 class="text-[15px] sm:text-[18px] lg:text-[20px] text-[#0c0c0c] font-vaziri">
          ${section.title}
        </h2>

        <a href="${section.seeMore || "#"}" target="_blank" rel="noopener"
           class="flex items-center gap-1 text-[11px] sm:text-[13px] text-[#19bfd3] shrink-0">
          مشاهده همه
          <img src="${chevronLeft}" alt="" class="w-3 h-3" />
        </a>

      </div>

      <swiper-container class="product-swiper" init="false"></swiper-container>

    </div>
  `;

  container.appendChild(wrapper);

  const swiperEl = wrapper.querySelector(".product-swiper");

  swiperEl.innerHTML = section.products
    .map(
      (product, index) => `
      <swiper-slide class="h-auto">
        ${productCard(product, { rank: ranked ? index + 1 : null })}
      </swiper-slide>`
    )
    .join("");

  mountSwiper(swiperEl, {
    slidesPerView: 2.2,
    spaceBetween: 8,
    breakpoints: {
      480: { slidesPerView: 2.8, spaceBetween: 8 },
      640: { slidesPerView: 3.5, spaceBetween: 10 },
      768: { slidesPerView: 4.5, spaceBetween: 10 },
      1024: { slidesPerView: 5.5, spaceBetween: 12 },
      1280: { slidesPerView: 6, spaceBetween: 12 },
    },
    navigation: true,
  });

  wireAddToCart(swiperEl, section.products);

  return wrapper;
}

/*#########################################################
#################### ADD TO CART ##########################
#########################################################*/

function wireAddToCart(root, products) {
  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart");

    if (!btn) return;

    e.preventDefault();

    const product = products.find((p) => String(p.id) === btn.dataset.id);

    if (!product) return;

    addItem(product);

    // بازخورد کوتاه روی دکمه
    btn.textContent = "✓";
    btn.classList.add("bg-green-600");

    setTimeout(() => {
      btn.textContent = "+";
      btn.classList.remove("bg-green-600");
    }, 900);
  });
}
