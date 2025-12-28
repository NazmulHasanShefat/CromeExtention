const close = document.querySelector(".close");
const popup = document.querySelector(".popup");
const drop_shadow = document.querySelector(".drop_shadow");
const copy_rgba = document.querySelector("#copy_rgba");
const copy_hex = document.querySelector("#copy_hex");
const copy_hsl = document.querySelector("#copy_hsl");
const folder = document.querySelector(".folder");
const close_folder = document.querySelector(".close_folder");
const pickColor = document.querySelector("#pickColor");
const LOCAL_STORAGE_KEY = "pickedColor";

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

    
}