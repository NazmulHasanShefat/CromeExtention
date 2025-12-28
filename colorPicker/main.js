const close = document.querySelector(".close");
const popup = document.querySelector(".popup");
const drop_shadow = document.querySelector(".drop_shadow");
const copy_rgba = document.querySelector("#copy_rgba");
const copy_hex = document.querySelector("#copy_hex");
const copy_hsl = document.querySelector("#copy_hsl");
const folder = document.querySelector(".folder");
const pickColor = document.querySelector("#pickColor");
const LOCAL_STORAGE_KEY = "pickedColor";
const myColor = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

//pick color action
pickColor.addEventListener("click", () => {
    try {
        if (window.EyeDropper) {
            activateEyeDroper();
        }else{
            alert("eyedropper not support your browser please try on Google Chrome or microsoft Edge or Brave browser ")
        }
    } catch (error) {
        console.log("faild to pick color");
    }
})

//activate idroper
const activateEyeDroper = async () => {
    try {
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex)
        console.log(sRGBHex)
        const rgb = hexToRGB(sRGBHex);
        console.log(rgb);
        const hsl = hexToHsl(sRGBHex);
        console.log(hsl);
        myColor.push(
            {
                id: myColor.length,
                rgbColor: rgb,
                hexColor: sRGBHex,
                hslColor: hsl 
            }
            // renderUIcolor()
        )
        updateLocalStorage();
        renderUIcolor()

    } catch (error) {
        console.error(error)
    }
}

// convert hex to rgb
function hexToRGB(hex){
    hex = hex.replace("#","");

    // seprate hex ff bb 00 like this use substring(start,end); or convert hex to decimal use parseInt(any calculation)
    const r = parseInt(hex.substring(0,2),16);
    const g = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);

    return `rgb(${r},${g},${b})`;
}

// convert hex to hsl
function hexToHsl(hex){
    hex = hex.replace("#","");
    const r = parseInt(hex.substring(0,2),16) / 255;
    const g = parseInt(hex.substring(2,4),16) / 255;
    const b = parseInt(hex.substring(4,6),16) / 255;

    // find max or min over all rgb 
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;
    if(max === min){
        h = s = 0;
    }else{
        const d = max - min;
        s = 1 > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch(max){
           case r: h = (g - b) / d + (g < b ? 6 : 0); break;
           case g: h = (b - r) / d + 2; break;
           case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }   
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

//display as folder all colors
function renderUIcolor(){
    const container = document.querySelector(".card");
    container.innerHTML = "";
    myColor.forEach(color => {
        let colorPalet = document.createElement("div");
        colorPalet.innerHTML = `
          <div class="folder">
                <div class="close_folder" data-delete="${color.id}">
                     <svg style="pointer-events: none;" xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 24 24"
                        fill="none">
                        <path fill-rule="avoid" clip-rule="evenodd"
                            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
                    </svg>
                </div>
                <div class="folder-icon-container">
                    <div class="main-icon" style="background-color: ${color.hexColor};"></div>
                </div>
                <p style="font-size: .5rem; margin:0;">${color.hexColor}</p>
            </div>
        `;
        container.appendChild(colorPalet)
    });
    //delete single color action
    const close_folder = document.querySelectorAll(".close_folder");

    close_folder.forEach(delete_btn => {
        delete_btn.addEventListener("click",(e)=>{
            removeSingleColor(e)
        })
    });
    
}

function removeSingleColor(e){
    const targetColor = e.target.getAttribute("data-delete");
    const itemIndex = myColor.findIndex((item)=>{item.id === targetColor});

    if(itemIndex > -1){
        myColor.splice(itemIndex,1);
        updateLocalStorage()
        console.log("hello")
    }
    updateLocalStorage()
    

}

// save color on local storage
function updateLocalStorage(){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myColor))
}
renderUIcolor();