const close = document.querySelector(".close");
const popup = document.querySelector(".popup");
const drop_shadow = document.querySelector(".drop_shadow");
const copy_rgba = document.querySelector("#copy_rgba");
const copy_hex = document.querySelector("#copy_hex");
const copy_hsl = document.querySelector("#copy_hsl");
const folder = document.querySelector(".folder");
const close_folder = document.querySelector(".close_folder");
const pickColor = document.querySelector("#pickColor");


const activateEyeDroper = async ()=>{
    try {
        const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    const color = result.sRGBHex;

        console.log(color)
    } catch (error) {
        console.error(error)
    }
}

pickColor.addEventListener("click",()=>{
    console.log("hello")
    activateEyeDroper();
})