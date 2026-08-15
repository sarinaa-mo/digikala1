import logoImage from "../../../images/Logo/logo.svg";
import searchIconImage from "../../../images/icons/search.svg";
import bellIcon from "../../../images/icons/bell.svg";
import loginIcon from "../../../images/icons/login.svg";
import basketIcon from "../../../images/icons/basket.svg";
import mobileBasketsvg from "../../../images/icons/basket2.svg";

/*
  چیدمان هدر:
  موبایل  ->  [همبرگر] [لوگو] [جستجو] [سبد خرید]
  دسکتاپ  ->  [لوگو] [جستجو] ............ [زنگ] [ورود] [سبد خرید]
  دکمه‌ی همبرگر توسط mobilemenu.js به ابتدای همین ردیف اضافه می‌شود.
*/

const search = () => {
  const searchlogin = document.querySelector(".searchlogin");

  /*---------------- Wrapper ----------------*/

  const MainSection = document.createElement("div");

  MainSection.className = `
flex
items-center
justify-start
flex-1
min-w-0
lg:w-[80%]
h-full
gap-2
lg:gap-3
`;

  /* ---------------- Logo ---------------- */

  const logo = document.createElement("a");

  logo.href = "index.html";

  logo.className = `
flex
shrink-0
h-full
items-center
justify-center
lg:w-[15%]
lg:justify-end
lg:pl-[5px]
`;

  const img = document.createElement("img");

  img.src = logoImage;
  img.alt = "Digikala";

  img.className = `
      w-[70px]
      lg:w-[195px]
      lg:h-[30px]
      object-contain
      lg:pr-[20px]
      box-border
      logo-animation
  `;

  logo.appendChild(img);

  MainSection.appendChild(logo);

  /* ---------------- Search Box ---------------- */

  const searchBox = document.createElement("div");

  searchBox.className = `
relative
flex
items-center
h-full
flex-1
min-w-0
lg:w-[65%]
lg:px-3
`;

  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "جستجو";

  input.className = `
w-full
lg:w-[600px]
h-9
lg:h-[42px]
bg-[#f0f0f1]
rounded-[8px]
pr-9
lg:pr-[55px]
text-[13px]
outline-none
border-none
`;

  const searchIcon = document.createElement("img");

  searchIcon.src = searchIconImage;
  searchIcon.alt = "search";

  searchIcon.className = `
      absolute
      right-2.5
      lg:right-[35px]
      top-1/2
      -translate-y-1/2
      w-5
      h-5
      opacity-60
      pointer-events-none
  `;

  searchBox.appendChild(input);
  searchBox.appendChild(searchIcon);

  MainSection.appendChild(searchBox);

  /* ---------------- Mobile Basket ---------------- */

  const mobileBasket = document.createElement("button");

  mobileBasket.type = "button";

  mobileBasket.setAttribute("aria-label", "سبد خرید");

  mobileBasket.className = `
cart-trigger
relative
flex
lg:hidden
items-center
justify-center
w-9
h-9
shrink-0
cursor-pointer
`;

  mobileBasket.innerHTML = `
    <img src="${mobileBasketsvg}" alt="" class="w-6 h-6" />
    <span class="cart-badge hidden absolute -top-0.5 -left-0.5 min-w-4 h-4 px-1 rounded-full bg-[#ef4056] text-white text-[10px] font-vaziriNumber flex items-center justify-center"></span>
  `;

  MainSection.appendChild(mobileBasket);

  searchlogin.appendChild(MainSection);

  /*---------------- Desktop Login Area ----------------*/

  const register = document.createElement("div");

  register.className = `
hidden
lg:flex
w-[20%]
items-center
justify-center
gap-4
`;

  /*---------------- bell ----------------*/

  const bellLink = document.createElement("a");

  bellLink.href = "https://www.digikala.com/users/login/?backUrl=/";

  const bellImg = document.createElement("img");

  bellImg.src = bellIcon;
  bellImg.alt = "Notification";
  bellImg.className = "w-6 h-6";

  bellLink.appendChild(bellImg);

  register.appendChild(bellLink);

  /*---------------- login button ----------------*/

  const loginLink = document.createElement("a");

  loginLink.href = "https://www.digikala.com/users/login/?backUrl=/";

  loginLink.className = `
w-[130px]
h-[40px]
shrink-0
border
border-gray-300
rounded-[10px]
flex
items-center
justify-center
gap-2
text-[13px]
text-[#424750]
font-normal
no-underline
`;

  const loginImg = document.createElement("img");

  loginImg.src = loginIcon;
  loginImg.alt = "Login";
  loginImg.className = "w-6 h-6";

  const loginText = document.createTextNode("ورود");

  const middleLine = document.createElement("span");

  middleLine.className = `
inline-block
w-px
h-[18px]
bg-gray-300
`;

  const signupText = document.createTextNode("ثبت نام");

  loginLink.appendChild(loginImg);
  loginLink.appendChild(loginText);
  loginLink.appendChild(middleLine);
  loginLink.appendChild(signupText);

  register.appendChild(loginLink);

  const line = document.createElement("span");

  line.className = `
inline-block
w-px
h-[23px]
bg-[#e0e0e2]
`;

  register.appendChild(line);

  /*---------------- basket ----------------*/

  const basketLink = document.createElement("button");

  basketLink.type = "button";

  basketLink.setAttribute("aria-label", "سبد خرید");

  basketLink.className = "cart-trigger relative cursor-pointer";

  basketLink.innerHTML = `
    <img src="${basketIcon}" alt="" class="w-6 h-6" />
    <span class="cart-badge hidden absolute -top-1 -left-1 min-w-4 h-4 px-1 rounded-full bg-[#ef4056] text-white text-[10px] font-vaziriNumber flex items-center justify-center"></span>
  `;

  register.appendChild(basketLink);

  searchlogin.appendChild(register);
};

export default search;
