const simplebanner2 = async () => {
  try {
    let data = await fetch("db.json");
    let res = await data.json();
    let gallery = res.simplebanner2.map((item) => {
      return ` <div class="gallery-2-center-img">
            <a href="#">
              <img
                class="rounded-2xl w-full h-full object-cover"
                src=${item.image}
                
                title=${item.title}
            /></a>
          </div>` 
          
    });
   document.querySelector(".gallery-2-center").innerHTML = gallery.join(" ");
  } catch (error) {
    console.log(error);
  }
};
export default simplebanner2;