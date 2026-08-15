/* کمک‌تابع‌های نمایش عدد و قیمت به فارسی */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const toFa = (value) =>
  String(value ?? "").replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

// قیمت‌های API به ریال هستند و دیجی‌کالا تومان نشان می‌دهد
export const toToman = (rial) => Math.round((rial || 0) / 10);

export const formatPrice = (rial) => toFa(toToman(rial).toLocaleString("en-US"));

export const formatToman = (toman) => toFa((toman || 0).toLocaleString("en-US"));
