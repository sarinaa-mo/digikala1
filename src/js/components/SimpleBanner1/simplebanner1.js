
const simplebanner1 = async () => {
  try {
    let data = await fetch("db.json");
    let res = await data.json();
    let gallery = res.simple_banner1.map((item) => {
      return ` <div class="simplebanner1-center-img">
            <a href="#">
              <img
                class="rounded-2xl w-full h-full object-cover"
                src=${item.image}
                
                title=${item.title}
            /></a>
          </div>` 
          
    });
    document.querySelector(".simplebanner1-center").innerHTML = gallery.join(" ");
  } catch (error) {
    console.log(error);
  }
};


export default simplebanner1






















