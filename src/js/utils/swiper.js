/*
  اسلایدها بعد از fetch با innerHTML تزریق می‌شوند.
  اگر Swiper قبل از تزریق مقداردهی شود، اسلایدها را نمی‌بیند و
  عرض هرکدام روی ۱۰۰٪ کانتینر می‌ماند (باگی که کل صفحه را می‌شکست).
  پس همه‌ی اسلایدرها init="false" هستند و از اینجا مقداردهی می‌شوند.
*/

/*
  فلش غیرفعال داخل shadow DOM است و Swiper برایش part جدا بیرون نمی‌دهد،
  پس با adoptedStyleSheets مستقیم به shadow root اضافه می‌شود.
*/
let disabledArrowSheet;

const styleDisabledArrows = (el) => {
  if (!el.shadowRoot) return;

  if (!disabledArrowSheet) {
    disabledArrowSheet = new CSSStyleSheet();

    // Swiper خودش با سلکتور دوکلاسه استایل می‌دهد، پس باید هم‌تخصص باشیم
    disabledArrowSheet.replaceSync(`
      .swiper-button-prev.swiper-button-disabled,
      .swiper-button-next.swiper-button-disabled {
        opacity: 0;
        pointer-events: none;
      }
    `);
  }

  const sheets = el.shadowRoot.adoptedStyleSheets;

  if (!sheets.includes(disabledArrowSheet)) {
    el.shadowRoot.adoptedStyleSheets = [...sheets, disabledArrowSheet];
  }
};

const mountSwiper = (el, params) => {
  if (!el) return null;

  Object.assign(el, params);

  if (typeof el.initialize === "function" && !el.swiper) {
    el.initialize();
  }

  styleDisabledArrows(el);

  const update = () => el.swiper && el.swiper.update();

  update();
  requestAnimationFrame(update);

  // تصاویر بعد از لود شدن ابعاد اسلاید را عوض می‌کنند
  el.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", update, { once: true });
    }
  });

  return el.swiper;
};

export default mountSwiper;
