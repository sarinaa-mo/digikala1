const banner3 = async () => {
  try {
    let data = await fetch("db.json");
    let res = await data.json();
    let image = res.images1.map((item) => {
      return `<div class="w-full">
            <a class="w-full flex justify-center" href="#"
              ><img
                class="rounded-2xl w-full h-auto object-cover"
                src="${item.image}"
                title="${item.title}"
            /></a>
          </div>
           `

    });
   document.querySelector(".shopping-1-center").innerHTML = image.join(" ");
  } catch (error) {
    console.log(error);
  }
};
export default banner3;