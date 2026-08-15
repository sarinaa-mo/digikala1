/*
  انبار سبد خرید. در localStorage می‌ماند و هر تغییر یک رویداد
  cart:change می‌فرستد تا بج هدر و کشوی سبد خودشان را به‌روز کنند.
*/

const KEY = "digikala:cart";

const read = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

let items = read();

const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* حالت حریم خصوصی مرورگر - بی‌صدا رد شود */
  }

  document.dispatchEvent(new CustomEvent("cart:change", { detail: getCart() }));
};

/*---------------- خواندن ----------------*/

export const getItems = () => items.slice();

export const getCount = () => items.reduce((sum, i) => sum + i.qty, 0);

export const getCart = () => {
  const total = items.reduce((sum, i) => sum + i.newPrice * i.qty, 0);

  const totalBefore = items.reduce(
    (sum, i) => sum + (i.oldPrice || i.newPrice) * i.qty,
    0
  );

  return {
    items: getItems(),
    count: getCount(),
    total,
    discount: totalBefore - total,
  };
};

/*---------------- نوشتن ----------------*/

export const addItem = (product, qty = 1) => {
  const existing = items.find((i) => i.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      id: product.id,
      title: product.title,
      image: product.image,
      href: product.href,
      newPrice: product.newPrice,
      oldPrice: product.oldPrice,
      discount: product.discount,
      qty,
    });
  }

  persist();
};

export const setQty = (id, qty) => {
  const item = items.find((i) => i.id === id);

  if (!item) return;

  if (qty <= 0) {
    removeItem(id);
    return;
  }

  item.qty = qty;

  persist();
};

export const removeItem = (id) => {
  items = items.filter((i) => i.id !== id);

  persist();
};

export const clearCart = () => {
  items = [];

  persist();
};

/*---------------- آدرس انتخابی کاربر ----------------*/

const ADDRESS_KEY = "digikala:address";

export const getAddress = () => {
  try {
    const raw = localStorage.getItem(ADDRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAddress = (address) => {
  try {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
  } catch {
    /* نادیده */
  }

  document.dispatchEvent(new CustomEvent("address:change", { detail: address }));
};
