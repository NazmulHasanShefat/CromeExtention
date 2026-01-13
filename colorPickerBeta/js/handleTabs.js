import { AlertMassage } from "./main.js"
const createNewTab_button = document.getElementById("createNewTab_button");
const LOCAL_STORAGE_KEY_CREATE_TAB = "myTabs";
let myTabName = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CREATE_TAB)) || [];
export default myTabName
//============================  tab creatation and some oparetions ===================================
createNewTab_button.addEventListener("click", () => {
    const divCreateNewTab = document.createElement("div");
    divCreateNewTab.innerHTML = `
    <div class="drop_shadow"></div>
     <div class="createTab_container">
        <div class="close_create_tab">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="#0F1729" />
            </svg>
        </div>
        <div>
            <h3>Create new tab</h3>
            <input type="text" name="tabName" id="tabNameInput">
        </div>
        <div class="buttons_createTab">
            <button type="button" class="btn_close">Close</button>
            <button type="button" class="btn_success" id="setTabName">Create</button>
        </div>
    </div>
    `;
    document.body.appendChild(divCreateNewTab);

    const createTab_container = document.querySelector(".createTab_container");
    // for animation
    setTimeout(() => {
        createTab_container.style.top = "30%";
        createTab_container.style.opacity = "1";
    }, 10);

    // for input 
    const tabNameInput = document.querySelector("#tabNameInput");
    tabNameInput.value = "New tab 1";
    const setTabName = document.querySelector("#setTabName");
    tabNameInput.focus();
    setTabName.addEventListener("click", () => {
        const duplicateTab = myTabName.findIndex(item => item.tabName === tabNameInput.value)
        console.log(duplicateTab);
        if (duplicateTab < 0) {
            if (myTabName.length < 1) {
                setLocalStorageNewTab(tabNameInput.value, true);
            } else {
                setLocalStorageNewTab(tabNameInput.value, false);
            }
        }
        else {
            AlertMassage("false", "Same item is exist");
        }

    })

    //close tab functions
    const btn_close = document.querySelector(".btn_close");
    const close_create_tab = document.querySelector(".close_create_tab");
    close_create_tab.addEventListener("click", () => {
        createTab_container.style.top = "25%";
        createTab_container.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(divCreateNewTab);
        }, 200);
    })
    btn_close.addEventListener("click", () => {
        document.body.removeChild(divCreateNewTab);
    })
});


// ======================================= = set new tab on local storage ===================================
function setLocalStorageNewTab(tabname, tabIsActive) {
    if (tabname.length > 1) {
        myTabName.push({
            id: myTabName.length,
            tabName: tabname,
            tab_status: tabIsActive
        })
        // check duplicate tabs
        // myTabName.forEach(tabs => {});
        console.log(tabname);
        // renderTabListUI();
        updateLoalStorage();
        AlertMassage("success", "Updated successfull.")
    }
}
function updateLoalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY_CREATE_TAB, JSON.stringify(myTabName));
}

// ==================================== tab list oparetions =============================================
function SwitchTabModal() {
    const tabList = document.createElement("div");
    tabList.setAttribute("class", "switchTab_modal");
    const drop_shadow = document.createElement("div")
    drop_shadow.setAttribute("class", "drop_shadow");
    tabList.innerHTML = `
        <div class="close_btn_switchTab">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="none"></path>
            </svg>
        </div>
        <h3>Switch tab</h3>
        <div class="tabList_container">
           
        </div>
 
   `;
    document.body.appendChild(drop_shadow);
    document.body.prepend(tabList);

    const tabList_container = document.querySelector(".tabList_container");
    renderTabListUI(tabList_container)

    // close tablist modal div
    const close_btn_switchTab = document.querySelector(".close_btn_switchTab");
    close_btn_switchTab.addEventListener("click", () => {
        document.body.removeChild(tabList)
        document.body.removeChild(drop_shadow);
    })

    // ======================================== render tabs ===================================================
    function renderTabListUI() {
        tabList_container.innerHTML = "";
        myTabName.forEach(tabs => {
            tabList_container.innerHTML += `
         <div class="TabItem" data-tabname="${tabs.tabName}" data-tab_status="${tabs.tab_status}">
                <div class="tabItemText" style="pointer-events: none;">${tabs.tabName}</div>
                <div class="tabControlers">
                
                <div class="tabContolers_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="14px" height="18px"
                    viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                        d="M14.8024118,6.44526791 L8.69610276,12.549589 C8.29095108,12.9079238 8.04030835,13.4092335 8,13.8678295 L8,16.0029438 L10.0639829,16.004826 C10.5982069,15.9670062 11.0954869,15.7183782 11.4947932,15.2616227 L17.556693,9.19972295 L14.8024118,6.44526791 Z M16.2168556,5.0312846 L18.9709065,7.78550938 L19.8647941,6.89162181 C19.9513987,6.80501747 20.0000526,6.68755666 20.0000526,6.56507948 C20.0000526,6.4426023 19.9513987,6.32514149 19.8647932,6.23853626 L17.7611243,4.13485646 C17.6754884,4.04854589 17.5589355,4 17.43735,4 C17.3157645,4 17.1992116,4.04854589 17.1135757,4.13485646 L16.2168556,5.0312846 Z M22,13 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,4 C2,2.8954305 2.8954305,2 4,2 L11,2 L11,4 L4,4 L4,20 L20,20 L20,13 L22,13 Z M17.43735,2 C18.0920882,2 18.7197259,2.26141978 19.1781068,2.7234227 L21.2790059,4.82432181 C21.7406843,5.28599904 22.0000526,5.91216845 22.0000526,6.56507948 C22.0000526,7.21799052 21.7406843,7.84415992 21.2790068,8.30583626 L12.9575072,16.6237545 C12.2590245,17.4294925 11.2689,17.9245308 10.1346,18.0023295 L6,18.0023295 L6,17.0023295 L6.00324765,13.7873015 C6.08843822,12.7328366 6.57866679,11.7523321 7.32649633,11.0934196 L15.6953877,2.72462818 C16.1563921,2.2608295 16.7833514,2 17.43735,2 Z" />
                        </svg>
                </div>
                
                <div class="tabContolers_icon ST_tabDetete_button" data-dltid="${tabs.id}">
                    <svg style="pointer-events: none;" xmlns="http://www.w3.org/2000/svg" width="14px" height="18px" viewBox="0 0 24 24"
                        fill="none">
                        <path style="pointer-events: none;" fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                            ></path>
                    </svg>
                </div>
    
                </div>
            </div>
        `;
            const ST_tabDetete_button = document.querySelectorAll(".ST_tabDetete_button");
            ST_tabDetete_button.forEach(ST_delete_btn => {
                ST_delete_btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    deleteTab(e.target.dataset.dltid, renderTabListUI);
                });
            })

            const TabItem = document.querySelectorAll(".TabItem");
            TabItem.forEach(myTabItems => {
                if (myTabItems.dataset.tab_status === "true") {
                    myTabItems.classList.add("activeTab")
                }
                myTabItems.addEventListener("click", (e) => {
                    TabItem.forEach(item => item.classList.remove("activeTab"));
                    const targetedTabItem = myTabName.findIndex(item => item.tabName === e.target.dataset.tabname);
                    console.log(e.target.innerText)
                    // remove modal 
                    document.body.removeChild(tabList)
                    document.body.removeChild(drop_shadow);

                    myTabName.forEach(item=>{
                        if(item.tabName === e.target.innerText){
                            item.tab_status = true;
                        }else{
                            item.tab_status = false;
                        }
                    })
                    myTabName[targetedTabItem].tab_status = true;
                    updateLoalStorage();
                    renderTabListUI();
                    showTabNameOnTopNavigation()
                })
            })

        });
    }
}



const switchTab_trigger = document.querySelector("#switchTab_trigger");
switchTab_trigger.addEventListener("click", () => {
    SwitchTabModal();
})

// =========================================== delete tab =========================================================
function deleteTab(e, renderTabListUI) {
    const TabDeleteId = parseFloat(e)
    const RadyToDeleteTab = myTabName.findIndex(item => {
        return item.id === TabDeleteId
    }
    )
    if (RadyToDeleteTab > -1) {
        myTabName.splice(RadyToDeleteTab, 1);
        updateLoalStorage();
        renderTabListUI();
    }
}

function showTabNameOnTopNavigation(){
    const result = myTabName.find(item => item.tab_status === true)
    const selected_tab_name = document.querySelector("#selected_tab_name");
    selected_tab_name.innerText = result.tabName
}
showTabNameOnTopNavigation();