import "../css/main.css";

import header from "./components/Header/header.js";
import search from "./components/Search/search.js";
import menu from "./components/Menu/menu.js";
import mobileMenu from "./components/MobileMenu/mobilemenu.js";
import cart from "./components/Cart/cart.js";

import slider from "./components/slider/slider.js";
import story from "./components/story/story.js";
import category from "./components/Category/category.js";
import incridible from "./components/Incridible/incridible.js";
import simplebanner1 from "./components/SimpleBanner1/simplebanner1.js";
import offer from "./components/Offer/offer.js";
import simplebanner2 from "./components/SimpleBanner2/simplebanner2.js";
import classification from "./components/Classification/classification.js";
import banner3 from "./components/Banner3/banner3.js";
import favoritebrands from "./components/favoriteBrands/favoritebrands.js";
import productSections from "./components/ProductSections/productsections.js";
import footer from "./components/Footer/footer.js";

/*---------------- هدر و ناوبری ----------------*/

header();
search();
cart();

/*---------------- محتوای صفحه ----------------*/

const pending = [
  menu(),
  mobileMenu(),
  story(),
  slider(),
  category(),
  incridible(),
  simplebanner1(),
  offer(),
  simplebanner2(),
  classification(),
  banner3(),
  favoritebrands(),
  productSections(),
];

/*---------------- فوتر ----------------*/

footer();

/*#########################################################
#################### LOADER ###############################
#########################################################*/

const hideLoader = () => {
  const loader = document.getElementById("app-loader");

  if (!loader || loader.classList.contains("is-hidden")) return;

  loader.classList.add("is-hidden");

  // بعد از پایان ترنزیشن از DOM حذف شود
  setTimeout(() => loader.remove(), 500);
};

// وقتی همه‌ی کامپوننت‌ها داده‌شان را گرفتند
Promise.allSettled(pending).then(() => {
  // یک فریم صبر تا چیدمان نهایی شود
  requestAnimationFrame(() => setTimeout(hideLoader, 150));
});

// اگر شبکه کند بود یا چیزی گیر کرد، لودر نباید برای همیشه بماند
setTimeout(hideLoader, 8000);
