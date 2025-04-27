let picker_btn = document.querySelector("#picker-btn");
let colorList = document.querySelector("ul");
let myColors = JSON.parse(localStorage.getItem("piced-colors") || "[]" );
let clear_All = document.querySelector("#clearAll");
let clipboard_icon = document.querySelectorAll(".fa-clipboard");
let alertBox = document.querySelector(".alert-box");



const showColors = () => {
    colorList.innerHTML = myColors.map( color => `
        <li class="list-all-list" data-color="${color}"> <div class="color-box"style="background-color: ${color}; border:1px solid #014ba0;"></div> ${color} <span><i class="fa-solid fa-clipboard"></i></span></li>
    `).join("");
    let myli = document.querySelectorAll(".list-all-list");

    myli.forEach(targetli =>{
        targetli.addEventListener("click",(e)=>{
            navigator.clipboard.writeText(e.target.innerText);
            console.log("hello")
            alertBox.classList.add("open-alert");
            setTimeout(()=>{
                alertBox.classList.remove("open-alert");
            },1000)
            
        })
        
    })
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
let myli = document.querySelectorAll(".list-all-list");

myli.forEach(targetli =>{
    targetli.addEventListener("click",(e)=>{
        navigator.clipboard.writeText(e.target.innerText);
        alertBox.classList.add("open-alert");
        setTimeout(()=>{
            alertBox.classList.remove("open-alert");
        },1000)
        
    })
    
})