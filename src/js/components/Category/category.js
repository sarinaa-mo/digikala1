import moreIconImage from "../../../images/icons/more.svg";


const category = async () => {
  try {
    const response = await fetch("db.json");
    const data = await response.json();

    const items = data.Deeplink;

    const html = items.map((item) => {
     return `
<div
    class="
        category-center-item
        w-1/3
        sm:w-1/4
        md:w-1/5
        lg:w-[10%]
        h-full
        flex
        flex-col
        items-center
    "
>

    <img
        src="${item.url}"
        alt="${item.title}"
        class="
            w-13
            h-13
            mt-5
            object-contain
        "
    />

    <p
        class="
            w-[60%]
            mt-2.5
            text-center
            text-[12px]
            leading-5
            font-family: 'vaziri';
        "
    >
        ${item.title}
    </p>

</div>
`;
    });
    html.push(`
<div
    class="
        more-service
        w-1/3
        sm:w-1/4
        md:w-1/5
        lg:w-[10%]
        h-full
        flex
        flex-col
        items-center
        cursor-pointer
        bg-white
    "
>

    <div
        class="
        w-13
        h-13
        mt-5
        rounded-full
        bg-white
        flex
        justify-center
        items-center
        "
    >

        <img
            src="${moreIconImage}"
            class="w-9 h-9"
        >

    </div>

    <p
        class="
        w-[60%]
        mt-2.5
        text-center
        text-[12px]
        leading-5
        font-family: 'vaziri';
        "
    >
        بیشتر
    </p>

</div>
`);
    

    document.querySelector(".category-center").innerHTML = html.join("");
    createModal(data.listModal,data.groupServices);

  } catch (error) {
    console.log("Category Error :", error);
  }
  
};


function createModal(listModal,groupServices){

    const modal = document.createElement("div");

    modal.id = "service-modal";

   modal.className=`
fixed
inset-0
hidden
justify-center
items-center
bg-black/40
z-50
p-3
`;

    document.body.appendChild(modal);


    const services = listModal.map(item=>{

        return `

      <div
class="
flex
flex-col
items-center
gap-2
cursor-pointer
"
>

<img
src="${item.icon}"
class="w-13 h-13"
/>

<p class="text-[12px]">

${item.text}

</p>

</div>




        

  


        `}).join("");
        const groups=groupServices.map(item=>{

return`

<a
href="${item.link}"

class="
border
rounded-xl
flex
justify-between
items-center
p-4
hover:border-red-500
transition
">

<div class="flex items-center gap-3">

<img
src="${item.icon}"
class="w-12
h-12"
/>

<span>

${item.title}

</span>

</div>

<span>

  <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">

        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"/>

    </svg>

</span>

</a>

`;

}).join("");


    modal.innerHTML=`

<div
class="
bg-white
w-full
lg:w-[70%]
max-w-287.5
max-h-[90vh]
rounded-xl
overflow-hidden
transition-all
flex
flex-col
relative
">

<!-- Header -->

<div
class="
flex
justify-between
items-center
border-b
px-6
py-4
">

<button
class="close-modal text-3xl absolute left-6 top-6 -translate-y-1/2 cursor-pointer">

×

</button>

<h2
class="font-bold text-right">

خدمات دیجی کالا

</h2>


<div class="w-8"></div>

</div>

<!-- Body -->

<div
class="
p-4
md:p-8
overflow-y-auto
flex-1
">

<div
class="
grid
grid-cols-3
sm:grid-cols-4
md:grid-cols-6
gap-5
md:gap-8
">

${services}

</div>

<h3
class="
text-right
text-gray-500
font-bold
my-8
">

سرویس‌های گروه دیجی کالا

</h3>

<div
class="
grid
grid-cols-1
md:grid-cols-2
gap-3
md:gap-5
">

${groups}

</div>

</div>

</div>

`;
    


    const moreBtn=document.querySelector(".more-service");

const closeBtn=modal.querySelector(".close-modal");

    moreBtn.addEventListener("click",()=>{

        modal.classList.remove("hidden");
        modal.classList.add("flex");

    });
    closeBtn.addEventListener("click",()=>{

    modal.classList.add("hidden");
    modal.classList.remove("flex");

});


    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            modal.classList.add("hidden");
            modal.classList.remove("flex");

        }

    });
   
    

}


export default category;