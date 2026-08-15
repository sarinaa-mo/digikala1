import burgerIcon from "../../../images/icons/burger.svg";
import closeIcon from "../../../images/icons/close.svg";
import chevronLeft from "../../../images/icons/chevron-left.svg";
import userIcon from "../../../images/icons/user.svg";
import basketIcon from "../../../images/icons/basket2.svg";
import menuIcon from "../../../images/menu/menu.svg";
import supportIcon from "../../../images/icons/support.svg";
import logoImage from "../../../images/Logo/logo.svg";
import { getCart } from "../../utils/store.js";

/*
  منوی موبایل: کشوی کناری با ناوبری تودرتو + نوار ثابت پایین صفحه.
  هر دو از داده‌ی menu در db.json ساخته می‌شوند تا با مگامنوی دسکتاپ یکی بمانند.
*/

const mobileMenu = async () => {
  const root = document.querySelector(".mobile-menu-root");

  if (!root) return;

  try {
    const response = await fetch("db.json");
    const data = await response.json();

    root.innerHTML = `
      ${drawerMarkup(data.menu)}
      ${bottomNavMarkup()}
    `;

    injectBurgerButton();
    wireDrawer(data.menu);

    // این کامپوننت async است و بعد از cart() رندر می‌شود،
    // پس بج سبد باید یک بار دستی تازه شود
    document.dispatchEvent(new CustomEvent("cart:change", { detail: getCart() }));
  } catch (error) {
    console.log("mobile menu error:", error);
  }
};

/*#########################################################
#################### BURGER BUTTON ########################
#########################################################*/

function injectBurgerButton() {
  const searchlogin = document.querySelector(".searchlogin");

  if (!searchlogin || searchlogin.querySelector(".burger-btn")) return;

  const btn = document.createElement("button");

  btn.className = `
    burger-btn
    flex
    lg:hidden
    items-center
    justify-center
    w-9
    h-9
    shrink-0
    cursor-pointer
  `;

  btn.setAttribute("aria-label", "باز کردن منو");

  btn.innerHTML = `<img src="${burgerIcon}" alt="" class="w-6 h-6" />`;

  // همبرگر باید اولین آیتم سمت راست هدر باشد
  searchlogin.prepend(btn);

  btn.addEventListener("click", openDrawer);
}

/*#########################################################
#################### DRAWER MARKUP ########################
#########################################################*/

function drawerMarkup(menu) {
  /*
    پنل در حالت بسته بیرون از ویوپورت پارک می‌شود. اگر position:fixed باشد
    عرض اسکرول صفحه را زیاد می‌کند و overflow-x بدنه هم کلیپش نمی‌کند.
    پس داخل یک شلِ fixed با overflow:hidden قرار می‌گیرد و خودش absolute است.
  */
  return `
  <div class="drawer-shell fixed inset-0 z-[900] overflow-hidden pointer-events-none">

  <!-- overlay -->
  <div
    class="drawer-overlay absolute inset-0 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300"
  ></div>

  <!-- panel -->
  <aside
    class="drawer-panel absolute top-0 right-0 h-full w-[82%] max-w-90 bg-white translate-x-full transition-transform duration-300 flex flex-col shadow-2xl pointer-events-auto"
  >

    <!-- header -->
    <div class="flex items-center justify-between px-4 h-14 border-b border-[#e0e0e2] shrink-0">

      <img src="${logoImage}" alt="دیجی‌کالا" class="h-6 object-contain" />

      <button class="drawer-close w-8 h-8 flex items-center justify-center cursor-pointer" aria-label="بستن منو">
        <img src="${closeIcon}" alt="" class="w-5 h-5" />
      </button>

    </div>

    <!-- login -->
    <a
      href="https://www.digikala.com/users/login/?backUrl=/"
      class="flex items-center gap-2 px-4 py-3 border-b border-[#e0e0e2] text-[13px] text-[#424750] shrink-0"
    >
      <img src="${userIcon}" alt="" class="w-5 h-5" />
      ورود یا ثبت‌نام
    </a>

    <!-- scrollable body -->
    <div class="drawer-body flex-1 overflow-y-auto overscroll-contain">

      <!-- سطح ۱ -->
      <ul class="drawer-level drawer-level-root">
        ${menu.map(rootItem).join("")}
      </ul>

    </div>

    <!-- footer -->
    <a
      href="#"
      class="flex items-center gap-2 px-4 py-3 border-t border-[#e0e0e2] text-[13px] text-[#62666d] shrink-0"
    >
      <img src="${supportIcon}" alt="" class="w-5 h-5" />
      پشتیبانی
    </a>

  </aside>
  `;
}

function rootItem(item, index) {
  const hasChildren = Boolean(item.dropdown?.length);

  const icon = item.icon
    ? `<img src="${item.icon}" alt="" class="w-5 h-5 shrink-0" />`
    : `<span class="w-5 h-5 shrink-0"></span>`;

  if (!hasChildren) {
    return `
      <li>
        <a href="${item.link}" class="flex items-center gap-3 px-4 py-3.5 text-[13px] text-[#424750] border-b border-[#f0f0f1]">
          ${icon}
          <span>${item.title.trim()}</span>
        </a>
      </li>
    `;
  }

  return `
    <li>
      <button
        class="drawer-open-sub w-full flex items-center gap-3 px-4 py-3.5 text-[13px] text-[#424750] border-b border-[#f0f0f1] cursor-pointer text-right"
        data-menu="${index}"
      >
        ${icon}
        <span class="flex-1 text-right">${item.title.trim()}</span>
        <img src="${chevronLeft}" alt="" class="w-4 h-4 opacity-50" />
      </button>
    </li>
  `;
}

/*#########################################################
#################### SUB LEVELS ###########################
#########################################################*/

// سطح ۲: لیست دسته‌ها
function categoryLevel(menuItem, menuIndex) {
  return `
    <div class="drawer-level" data-level="2">

      ${levelHeader(menuItem.title.trim(), "root")}

      <ul>
        ${menuItem.dropdown
          .map(
            (category, i) => `
          <li>
            <button
              class="drawer-open-columns w-full flex items-center gap-3 px-4 py-3.5 text-[13px] text-[#424750] border-b border-[#f0f0f1] cursor-pointer text-right"
              data-menu="${menuIndex}"
              data-category="${i}"
            >
              <span class="flex-1 text-right">${category.title}</span>
              <img src="${chevronLeft}" alt="" class="w-4 h-4 opacity-50" />
            </button>
          </li>
        `
          )
          .join("")}
      </ul>

    </div>
  `;
}

// سطح ۳: ستون‌ها و لینک‌های نهایی
function columnsLevel(menuItem, menuIndex, categoryIndex) {
  const category = menuItem.dropdown[categoryIndex];

  const sections = (category.columns || []).flatMap((c) => c.sections || []);

  return `
    <div class="drawer-level" data-level="3">

      ${levelHeader(category.title, "category", menuIndex)}

      <div class="pb-4">
        ${sections
          .map(
            (section) => `
          <div class="mb-4">

            <h3 class="text-[13px] font-bold px-4 py-2 border-r-2 border-red-500 mr-4 mt-3">
              ${section.title}
            </h3>

            <ul>
              ${section.items
                .map(
                  (item) => `
                <li>
                  <a href="${item.url}" class="block px-4 py-2.5 text-[12px] text-[#62666d] active:text-red-500">
                    ${item.title}
                  </a>
                </li>
              `
                )
                .join("")}
            </ul>

          </div>
        `
          )
          .join("")}
      </div>

    </div>
  `;
}

function levelHeader(title, backTo, menuIndex = "") {
  return `
    <div class="flex items-center gap-2 px-4 h-12 border-b border-[#e0e0e2] bg-[#f9f9f9] sticky top-0 z-10">

      <button
        class="drawer-back flex items-center justify-center w-7 h-7 rotate-180 cursor-pointer"
        data-back="${backTo}"
        data-menu="${menuIndex}"
        aria-label="بازگشت"
      >
        <img src="${chevronLeft}" alt="" class="w-4 h-4" />
      </button>

      <span class="text-[13px] font-bold text-[#424750]">${title}</span>

    </div>
  `;
}

/*#########################################################
#################### BOTTOM NAV ###########################
#########################################################*/

function bottomNavMarkup() {
  const items = [
    { label: "خانه", icon: menuIcon, href: "index.html", active: true },
    { label: "دسته‌بندی", icon: burgerIcon, action: "drawer" },
    { label: "سبد خرید", icon: basketIcon, action: "cart" },
    { label: "پروفایل", icon: userIcon, href: "https://www.digikala.com/users/login/?backUrl=/" },
  ];

  const cell = `flex flex-col items-center justify-center gap-1 flex-1`;

  return `
  <nav
    class="bottom-nav fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-[#e0e0e2] z-[800] flex items-stretch justify-around"
  >
    ${items
      .map((item) => {
        const color = item.active ? "text-red-500" : "text-[#62666d]";

        const inner = `
          <img src="${item.icon}" alt="" class="w-5 h-5" />
          <span class="text-[10px]">${item.label}</span>
        `;

        if (item.action === "drawer") {
          return `
            <button class="bottom-nav-drawer ${cell} ${color} cursor-pointer">
              ${inner}
            </button>
          `;
        }

        // سبد خرید: cart-trigger توسط cart.js شنیده می‌شود
        if (item.action === "cart") {
          return `
            <button class="cart-trigger relative ${cell} ${color} cursor-pointer">
              ${inner}
              <span class="cart-badge hidden absolute top-1 left-[calc(50%-18px)] min-w-4 h-4 px-1 rounded-full bg-[#ef4056] text-white text-[10px] font-vaziriNumber flex items-center justify-center"></span>
            </button>
          `;
        }

        return `
          <a href="${item.href}" class="${cell} ${color}">
            ${inner}
          </a>
        `;
      })
      .join("")}
  </nav>
  `;
}

/*#########################################################
#################### DRAWER LOGIC #########################
#########################################################*/

function openDrawer() {
  const overlay = document.querySelector(".drawer-overlay");
  const panel = document.querySelector(".drawer-panel");

  overlay.classList.remove("opacity-0", "pointer-events-none");
  panel.classList.remove("translate-x-full");

  document.body.classList.add("overflow-hidden");
}

function closeDrawer() {
  const overlay = document.querySelector(".drawer-overlay");
  const panel = document.querySelector(".drawer-panel");

  overlay.classList.add("opacity-0", "pointer-events-none");
  panel.classList.add("translate-x-full");

  document.body.classList.remove("overflow-hidden");

  // بعد از بسته شدن به سطح اول برگرد
  setTimeout(() => showLevel("root"), 300);
}

function wireDrawer(menu) {
  const overlay = document.querySelector(".drawer-overlay");
  const body = document.querySelector(".drawer-body");

  document.querySelector(".drawer-close").addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  const drawerTrigger = document.querySelector(".bottom-nav-drawer");
  if (drawerTrigger) drawerTrigger.addEventListener("click", openDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // ناوبری تودرتو - رویدادها روی بدنه delegate می‌شوند
  body.addEventListener("click", (e) => {
    const openSub = e.target.closest(".drawer-open-sub");

    if (openSub) {
      const index = Number(openSub.dataset.menu);

      renderLevel(body, categoryLevel(menu[index], index));

      return;
    }

    const openColumns = e.target.closest(".drawer-open-columns");

    if (openColumns) {
      const menuIndex = Number(openColumns.dataset.menu);
      const categoryIndex = Number(openColumns.dataset.category);

      renderLevel(body, columnsLevel(menu[menuIndex], menuIndex, categoryIndex));

      return;
    }

    const back = e.target.closest(".drawer-back");

    if (back) {
      if (back.dataset.back === "root") {
        showLevel("root");
      } else {
        const menuIndex = Number(back.dataset.menu);
        renderLevel(body, categoryLevel(menu[menuIndex], menuIndex));
      }

      return;
    }

    // کلیک روی لینک نهایی، کشو را می‌بندد
    if (e.target.closest("a")) closeDrawer();
  });
}

function renderLevel(body, html) {
  const root = body.querySelector(".drawer-level-root");

  root.classList.add("hidden");

  const existing = body.querySelector(".drawer-level:not(.drawer-level-root)");
  if (existing) existing.remove();

  body.insertAdjacentHTML("beforeend", html);

  body.scrollTop = 0;
}

function showLevel(name) {
  const body = document.querySelector(".drawer-body");

  if (!body) return;

  if (name === "root") {
    const existing = body.querySelector(".drawer-level:not(.drawer-level-root)");
    if (existing) existing.remove();

    body.querySelector(".drawer-level-root").classList.remove("hidden");

    body.scrollTop = 0;
  }
}

export default mobileMenu;
