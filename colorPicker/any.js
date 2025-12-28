let picker_btn = document.querySelector("#picker-btn");
let colorList = document.querySelector(".color_list_container");
let myColors = JSON.parse(localStorage.getItem("piced-colors") || "[]" );
let clear_All = document.querySelector("#clearAll");
let clipboard_icon = document.querySelectorAll(".fa-clipboard");
let alertBox = document.querySelector(".alert-box");



const showColors = () => {
    colorList.innerHTML = myColors.map( color => `
         <div class="color_item" data-color="red">
                        <div class="hex_color_code">
                            <div class="color-box"></div>
                            <div style="display: flex; justify-content: center; gap: 10px;">
                                <p>${color}</p>

                                <div class="copy_to_clipbord_icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                        viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                            stroke="#1C274C" stroke-width="1.5" />
                                        <path
                                            d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                            stroke="#1C274C" stroke-width="1.5" />
                                    </svg>
                                    <div class="option_to_copy">
                                        <div class="option_hex options">Hex</div>
                                        <div class="option_hsl options">Hsl</div>
                                        <div class="option_rgba options">Rgba</div>
                                    </div>
                                </div>
                                <div class="delete_icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                        viewBox="0 0 24 24" fill="none">
                                        <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
        
    `).join("");
    let myli = document.querySelectorAll(".list-all-list");
    let copy_to_clipbord_icon = document.querySelector(".copy_to_clipbord_icon");
    copy_to_clipbord_icon.addEventListener("click",()=>{console.log("hello")})

    // myli.forEach(targetli =>{
    //     targetli.addEventListener("click",(e)=>{
    //         navigator.clipboard.writeText(e.target.innerText);
    //         console.log("hello")
    //         alertBox.classList.add("open-alert");
    //         setTimeout(()=>{
    //             alertBox.classList.remove("open-alert");
    //         },1000)
            
    //     })
        
    // })
    saveList();
}








const activateEyeDroper = async () => {
    try{
        const myeyeDroper = new EyeDropper();
        const {sRGBHex} = await myeyeDroper.open();
        navigator.clipboard.writeText(sRGBHex);
        
        if(!myColors.includes(sRGBHex)){
            myColors.push(sRGBHex);
            localStorage.setItem("piced-colors",JSON.stringify(myColors));
            showColors();
        }
        
    }
    catch(error){
        console.log(error)
    }
    saveList();
   
}
const all_clear_list = () => {
    myColors.length = 0;
    localStorage.setItem("piced-colors",JSON.stringify(myColors))
    colorList.innerHTML = ""
    localStorage.setItem("myAllList",colorList.innerHTML)
}





picker_btn.addEventListener("click" , activateEyeDroper);

function saveList(){
    localStorage.setItem("myAllList",colorList.innerHTML);
}
function getallLIst(){
   colorList.innerHTML = localStorage.getItem("myAllList");
}

getallLIst();


clear_All.addEventListener("click",all_clear_list)
let myli = document.querySelectorAll(".copy_to_clipbord_icon");
let clip_sign = document.querySelector(".alert-box span i")
const option_to_copy = document.querySelectorAll(".option_to_copy")

myli.forEach(targetli =>{
    targetli.addEventListener("click",(e)=>{
        const options_container = e.target.parentElement.lastElementChild;
        // options_container.classList.toggle("open_options");
        if(!options_container.classList.contains("open_options")){
            options_container.classList.toggle("open_options");
            
            const allOptions = document.querySelectorAll(".option_to_copy");
            allOptions.forEach(myall_options => {
                if(!myall_options.classList.contains("open_options")){
                    options_container.classList.add("open_options");
                }
                myall_options.classList.remove("open_options");
            })
        }
        
        
        // options_container.classList.remove("open_options");




        // console.log(e.target.parentElement.lastElementChild)
        // navigator.clipboard.writeText(e.target.innerText);
        // alertBox.classList.add("open-alert");
        // clip_sign.style.scale = "2"
        // setTimeout(()=>{
        //     clip_sign.style.scale = "1"
        // },500)
        // setTimeout(()=>{
        //     alertBox.classList.remove("open-alert");
        // },2000)
        
    })
    
})
