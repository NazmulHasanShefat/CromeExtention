const triger_menu = document.querySelectorAll(".menu_trigger");
const menus = document.querySelectorAll(".menus_all");

function activateMenu() {
    triger_menu.forEach(triger => {
        triger.addEventListener("click", function (e) {
            e.stopPropagation();
            const trigerValue = this.dataset.trigerLink;
            const targetId = document.getElementById(trigerValue);

            //close other menus
            menus.forEach(allmenus => {
                if (allmenus !== targetId) {
                    allmenus.classList.remove("active_tabsMenu");
                }
            })

            //toggle current menu
            console.log(trigerValue)
            targetId.classList.toggle("active_tabsMenu");
        })
    })


    //when outside click navigation will closed
    document.addEventListener("click", (event) => {
        // if (!event.target.closest(".menu_trigger") && !event.target.closest(".menus_all")) {
        //     menus.forEach(allmenus => {
        //         if (allmenus.classList.contains("active_tabsMenu")) {
        //             allmenus.classList.remove("active_tabsMenu")
        //         }
        //     })
        // }
         menus.forEach(allmenus => {
                if (allmenus.classList.contains("active_tabsMenu")) {
                    allmenus.classList.remove("active_tabsMenu")
                }
            })
    })
}
activateMenu()