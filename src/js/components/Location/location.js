import { getAddress, setAddress } from "../../utils/store.js";
import locationIcon from "../../../images/icons/location.svg";
import closeIcon from "../../../images/icons/close.svg";

/*
  مودال انتخاب موقعیت مکانی به سبک دیجی‌کالا:
  جستجوی شهر، نقشه‌ی نشان با مارکر قابل جابه‌جایی و دکمه‌ی «ثبت این موقعیت».
  انتخاب کاربر در localStorage می‌ماند و برچسب هدر را به‌روز می‌کند.

  کلید نقشه از متغیر محیطی VITE_NESHAN_MAP_KEY خوانده می‌شود.
  برای فعال شدن نقشه یک فایل .env بساز و در آن بگذار:
      VITE_NESHAN_MAP_KEY=کلید_شما
*/

const MAP_KEY = import.meta.env.VITE_NESHAN_MAP_KEY || "";

const TEHRAN = { lng: 51.389, lat: 35.6892 };

const CITIES = [
  { name: "تهران", lng: 51.389, lat: 35.6892 },
  { name: "مشهد", lng: 59.6062, lat: 36.2605 },
  { name: "اصفهان", lng: 51.6676, lat: 32.6539 },
  { name: "شیراز", lng: 52.5837, lat: 29.5918 },
  { name: "تبریز", lng: 46.2919, lat: 38.0962 },
  { name: "کرج", lng: 50.9915, lat: 35.8355 },
  { name: "اهواز", lng: 48.6706, lat: 31.3183 },
  { name: "قم", lng: 50.8764, lat: 34.6416 },
  { name: "رشت", lng: 49.5832, lat: 37.2808 },
  { name: "کرمانشاه", lng: 47.065, lat: 34.3142 },
];

let map = null;
let marker = null;
let selected = { ...TEHRAN, name: "تهران" };

/*#########################################################
#################### ENTRY ################################
#########################################################*/

const loadLocation = async (container) => {
  try {
    const response = await fetch("/db.json");
    const data = await response.json();

    const saved = getAddress();

    if (saved) selected = saved;

    const item = data.location[0] || { icon: locationIcon };

    // append و نه innerHTML: منوی پشتیبانی از قبل داخل همین container است
    const btn = document.createElement("button");

    btn.type = "button";

    btn.className = `
      location-btn
      flex
      items-center
      gap-2
      cursor-pointer
      text-[#62666d]
      text-[12px]
      h-full
      px-3
      hover:text-red-500
      transition
    `;

    btn.innerHTML = `
      <img src="${item.icon || locationIcon}" alt="" class="w-5 h-5" />

      <span class="location-label whitespace-nowrap">
        ${saved ? `ارسال به ${saved.name}` : item.address}
      </span>
    `;

    container.appendChild(btn);

    createLocationModal();

    btn.addEventListener("click", openLocationModal);

    document.addEventListener("address:change", (e) => {
      const label = container.querySelector(".location-label");
      if (label && e.detail) label.textContent = `ارسال به ${e.detail.name}`;
    });
  } catch (error) {
    console.log(error);
  }
};

/*#########################################################
#################### MODAL ################################
#########################################################*/

function createLocationModal() {
  if (document.querySelector(".location-modal")) return;

  const modal = document.createElement("div");

  modal.className = `
    location-modal
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
    <div class="bg-white w-full max-w-125 max-h-[92vh] rounded-xl overflow-hidden flex flex-col">

      <!-- header -->
      <div class="flex justify-between items-center border-b border-[#e0e0e2] px-4 py-3 shrink-0">

        <h2 class="font-bold text-[15px] text-[#0c0c0c]">انتخاب موقعیت مکانی</h2>

        <button class="close-location w-8 h-8 flex items-center justify-center cursor-pointer" aria-label="بستن">
          <img src="${closeIcon}" alt="" class="w-5 h-5" />
        </button>

      </div>

      <!-- body -->
      <div class="p-4 overflow-y-auto flex-1">

        <p class="text-[12px] text-[#62666d] mb-3">
          شهر خود را انتخاب کنید یا روی نقشه موقعیت دقیق را مشخص کنید.
        </p>

        <!-- انتخاب شهر -->
        <div class="flex flex-wrap gap-2 mb-4">
          ${CITIES.map(
            (city) => `
            <button
              class="city-chip text-[12px] border border-[#e0e0e2] rounded-full px-3 py-1.5 cursor-pointer hover:border-[#ef4056] hover:text-[#ef4056] transition"
              data-lng="${city.lng}"
              data-lat="${city.lat}"
              data-name="${city.name}"
            >${city.name}</button>
          `
          ).join("")}
        </div>

        <!-- نقشه -->
        <div id="map" class="w-full rounded-xl overflow-hidden bg-[#f0f0f1] relative" style="height:300px;">
          ${
            MAP_KEY
              ? ""
              : `<div class="map-placeholder absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                   <img src="${locationIcon}" alt="" class="w-10 h-10 opacity-40" />
                   <p class="text-[12px] text-[#62666d] leading-6">
                     برای نمایش نقشه، کلید API نشان لازم است.<br />
                     یک فایل <span class="font-vaziriNumber">.env</span> بساز و در آن بگذار:
                   </p>
                   <code class="text-[11px] bg-white rounded px-2 py-1 text-[#ef4056]">VITE_NESHAN_MAP_KEY=...</code>
                 </div>`
          }
        </div>

        <!-- موقعیت انتخابی -->
        <div class="flex items-center gap-2 mt-3 text-[12px] text-[#62666d]">
          <img src="${locationIcon}" alt="" class="w-4 h-4" />
          <span>موقعیت انتخابی: <b class="selected-name text-[#0c0c0c]">${selected.name}</b></span>
        </div>

      </div>

      <!-- footer -->
      <div class="border-t border-[#e0e0e2] p-4 shrink-0">

        <button class="confirm-location w-full h-11 bg-[#ef4056] hover:bg-[#d6304a] transition text-white rounded-lg text-[14px] cursor-pointer">
          ثبت این موقعیت
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  wireModal(modal);
}

/*#########################################################
#################### EVENTS ###############################
#########################################################*/

function wireModal(modal) {
  const close = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  };

  modal.querySelector(".close-location").addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  // انتخاب شهر
  modal.querySelectorAll(".city-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      selected = {
        name: chip.dataset.name,
        lng: Number(chip.dataset.lng),
        lat: Number(chip.dataset.lat),
      };

      modal.querySelector(".selected-name").textContent = selected.name;

      modal.querySelectorAll(".city-chip").forEach((c) => {
        c.classList.remove("border-[#ef4056]", "text-[#ef4056]");
      });

      chip.classList.add("border-[#ef4056]", "text-[#ef4056]");

      if (map) {
        map.flyTo({ center: [selected.lng, selected.lat], zoom: 12 });
        if (marker) marker.setLngLat([selected.lng, selected.lat]);
      }
    });
  });

  // ثبت موقعیت
  modal.querySelector(".confirm-location").addEventListener("click", () => {
    setAddress(selected);
    close();
  });
}

function openLocationModal() {
  const modal = document.querySelector(".location-modal");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.body.classList.add("overflow-hidden");

  initMap();

  setTimeout(() => {
    if (map) {
      map.resize();
      map.jumpTo({ center: [selected.lng, selected.lat], zoom: 12 });
    }
  }, 300);
}

/*#########################################################
#################### MAP ##################################
#########################################################*/

function initMap() {
  if (map || !MAP_KEY) return;

  if (typeof nmp_mapboxgl === "undefined") {
    console.warn("SDK نشان لود نشده است");
    return;
  }

  map = new nmp_mapboxgl.Map({
    mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
    container: "map",
    zoom: 12,
    center: [selected.lng, selected.lat],
    pitch: 0,
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    poi: true,
    traffic: false,
    mapKey: MAP_KEY,
  });

  marker = new nmp_mapboxgl.Marker({ draggable: true })
    .setLngLat([selected.lng, selected.lat])
    .addTo(map);

  // جابه‌جایی مارکر با کشیدن
  marker.on("dragend", () => {
    const { lng, lat } = marker.getLngLat();
    selected = { ...selected, lng, lat, name: "موقعیت دلخواه" };

    const label = document.querySelector(".selected-name");
    if (label) label.textContent = selected.name;
  });

  // کلیک روی نقشه
  map.on("click", (e) => {
    marker.setLngLat(e.lngLat);

    selected = {
      ...selected,
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      name: "موقعیت دلخواه",
    };

    const label = document.querySelector(".selected-name");
    if (label) label.textContent = selected.name;
  });

  window.locationMap = map;

  setTimeout(() => map.resize(), 0);
}

export default loadLocation;
