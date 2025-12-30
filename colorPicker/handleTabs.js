const createNewTab_button = document.getElementById("createNewTab_button");
const LOCAL_STORAGE_KEY_CREATE_TAB = "myTabs";
let myTabName = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CREATE_TAB)) || [];
createNewTab_button.addEventListener("click",()=>{
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
    const tabNameInput = document.querySelector("#tabNameInput");
    tabNameInput.value = "New tab 2";
    const setTabName = document.querySelector("#setTabName");
    setTabName.addEventListener("click",()=>{
        setLocalStorageNewTab(tabNameInput.value);
    })

    //close tab functions
    const btn_close = document.querySelector(".btn_close");
    const close_create_tab = document.querySelector(".close_create_tab");
    close_create_tab.addEventListener("click",()=>{
        document.body.removeChild(divCreateNewTab);
    })
    btn_close.addEventListener("click",()=>{
        document.body.removeChild(divCreateNewTab);
    })
});

function setLocalStorageNewTab(tabname){
    if(tabname.length > 1){
        myTabName.push({
            id: myTabName.length,
            tabName: tabname,
        })
        // check duplicate tabs
        // myTabName.forEach(tabs => {});
        console.log(tabname);
        updateLoalStorage();
    }
}

// function renderUI_tabName(){
// }
// function deleteTab(){}
// rename tab

function updateLoalStorage(){
    localStorage.setItem(LOCAL_STORAGE_KEY_CREATE_TAB, JSON.stringify(myTabName));
}