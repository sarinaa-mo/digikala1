import { renderProductSection } from "../ProductSlider/productslider.js";

/*
  همه‌ی سکشن‌های محصولی صفحه‌ی اصلی:
  پرفروش‌ترین کالاها، داغ‌ترین‌های چند ساعت گذشته و ۸ ردیف دسته‌بندی.
*/

const productSections = async () => {
  const host = document.querySelector(".product-sections");

  if (!host) return;

  try {
    const response = await fetch("/db.json");
    const data = await response.json();

    // پرفروش‌ترین کالاها - با شماره‌ی رتبه
    if (data.bestSelling) {
      renderProductSection(host, data.bestSelling, {
        ranked: true,
        background: "bg-[#fdf7f8]",
      });
    }

    // داغ‌ترین‌های چند ساعت گذشته
    if (data.trending) {
      renderProductSection(host, data.trending, {
        background: "bg-[#fff9f0]",
      });
    }

    // ردیف‌های دسته‌بندی
    (data.categoryRows || []).forEach((row) => {
      renderProductSection(host, row);
    });
  } catch (error) {
    console.log("product sections error:", error);
  }
};

export default productSections;
