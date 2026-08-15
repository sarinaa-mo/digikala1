

 const header = async () => {

    try {

      const data = await fetch("db.json");
      const res = await data.json();

      const bannerData = res.banner.map(item => `
        <div class="banner-item h-10 w-full object-cover">
          <img
            src="${item.image}"
            alt=""
          >
        </div>
      `);

      document.querySelector(".top-banner").innerHTML =
      bannerData.join("");

    } catch(error) {

      console.error(error);

    }

  }


header;

export default header;


