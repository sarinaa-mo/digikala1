import loadLocation from "../Location/location.js";
import support from "../Support/support.js";

const menu = async () => {

    const headerMenu = document.querySelector(".headermenu");

    /*================ Wrapper ================*/

    const wrapper = document.createElement("div");

    wrapper.className = `
        w-full
        max-w-[1700px]
        h-full
        mx-auto
        flex
        justify-between
        items-center
        px-5
        fontfamily-vaziri
    `;

    /*================ Right Menu ================*/

    const rightMenu = document.createElement("div");

    rightMenu.className = `
        menu-right-nav
        flex
        items-center
        h-full
    `;

    /*================ Left Menu ================*/

    const leftMenu = document.createElement("div");

    leftMenu.className = `
        menu-left-nav
        flex
        items-center
        h-full
    `;

    wrapper.append(rightMenu, leftMenu);

    headerMenu.appendChild(wrapper);

    await loadMegaMenu(rightMenu);

    support(leftMenu);

    await loadLocation(leftMenu);

    
    

};

/*#########################################################
#################### LOAD MENU ############################
#########################################################*/

async function loadMegaMenu(container){

    try{

        const response = await fetch("db.json");

        const data = await response.json();

        const menus = data.menu.map(item=>{

            /*---------------- دارای مگامنو ----------------*/

            if(item.dropdown?.length){

               return `
           <li class="relative list-none h-full menu-wrapper">

                      <div
                     class="
                 menu-title  
                  flex
                 items-center
                 gap-1
                h-full
                 px-3
                cursor-pointer
                text-[13px]
                hover:border-b-2
             hover:border-red-500">

        ${
            item.icon
                ? `<img src="${item.icon}" class="w-4 h-4">`
                : ""
        }

        ${item.title}

    </div>

    ${renderMega(item.dropdown)}

</li>
`;

            }

            /*---------------- منوی معمولی ----------------*/

            return `

            <li class="list-none h-full">

                <a
                href="${item.link}"
                class="
                flex
                items-center
                gap-1
                h-full
                px-3
                text-[13px]
                text-[#62666d]
                
                        hover:border-b-2
                        hover:border-red-500
                ">

                ${
                    item.icon
                    ?
                    `<img src="${item.icon}" class="w-4 h-4">`
                    :
                    ""
                }

                ${item.title}

                </a>

            </li>

            `;

        });

        container.innerHTML=`

        <ul class="flex items-center h-full">

            ${menus.join("")}

        </ul>

        `;
    const wrappers = document.querySelectorAll(".menu-wrapper");

wrappers.forEach(wrapper=>{

    const mega = wrapper.querySelector(".mega-menu");

    wrapper.addEventListener("mouseenter",()=>{

        mega.classList.remove("hidden");

    });

    wrapper.addEventListener("mouseleave",()=>{

        mega.classList.add("hidden");

    });

});


activeMegaMenu(data.menu[0].dropdown);

    }

    catch(error){

        console.log(error);

    }

}

/*#########################################################
#################### RENDER MEGA ##########################
#########################################################*/

function renderMega(dropdown){

    return `

    <div
    class="
    mega-menu
    absolute
    top-full
    right-0
    w-[min(1100px,calc(100vw-32px))]
    h-[min(550px,calc(100vh-140px))]
    bg-white
    shadow-xl
    rounded-lg
    hidden
    z-50
    overflow-hidden
    ">

        <div class="flex h-full">

            <!-- لیست سمت راست -->

            <ul
            class="
            w-55
            bg-[#f5f5f5]
            overflow-y-auto
            border-l
            ">

                ${dropdown.map((category,index)=>`

                <li
                class="
                category-item
                px-4
                py-3
                cursor-pointer
                hover:bg-white
                hover:text-red-500
                text-[13px]"
                data-index="${index}"
                >

                    ${category.title}

                </li>

                `).join("")}

            </ul>

            <!-- ستون ها -->

            <div
            class="
            mega-content
            flex-1
            overflow-y-auto
            p-5
            ">

                ${renderColumns(dropdown[0].columns)}

            </div>

        </div>

    </div>

    `;

}

/*#########################################################
#################### RENDER COLUMN ########################
#########################################################*/

function renderColumns(columns){

    return `

    <div
    class="
    grid
    grid-cols-2
    xl:grid-cols-4
    gap-6
    ">

        ${columns.map(column=>`

            <div>

                ${renderSections(column.sections || [])}

            </div>

        `).join("")}

    </div>

    `;

}

/*#########################################################
#################### RENDER SECTION #######################
#########################################################*/

function renderSections(sections){

    return sections.map(section=>`

        <div class="mb-8">

            <h3
            class="
            font-bold
            text-[14px]
            mb-3
            border-r-2
            border-red-500
            pr-2
            ">

                ${section.title}

            </h3>

            <ul>

                ${section.items.map(item=>`

                <li class="mb-2">

                    <a
                    href="${item.url}"
                    class="
                    text-[12px]
                    text-[#62666d]
                    hover:text-red-500
                    ">

                        ${item.title}

                    </a>

                </li>

                `).join("")}

            </ul>

        </div>

    `).join("");
    

}

function activeMegaMenu(dropdown){
    

const items=document.querySelectorAll(".category-item");

const mega = document.querySelector(".mega-menu");
const content = mega.querySelector(".mega-content");

items.forEach(item=>{

item.addEventListener("mouseenter",()=>{

const index=item.dataset.index;

const current = dropdown[index];

if(current){

    content.innerHTML = renderColumns(current.columns);

}


});

});







}



export default menu;