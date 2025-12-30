// required functionality pick color outside the browser and picked color history gradient generator
// settings functions
//Automatically copy picked color to clipboard.
//Color Format	 Show Hex codes in lowercase.
// Keyboard Shortcuts	 Enable color picking from page using keyboard shortcut.
const close = document.querySelector(".close");
const popup = document.querySelector(".popup");
const drop_shadow = document.querySelector(".drop_shadow");
const copy_rgba = document.querySelector("#copy_rgba");
const copy_hex = document.querySelector("#copy_hex");
const copy_hsl = document.querySelector("#copy_hsl");
const folder = document.querySelector(".folder");
const pickColor = document.querySelector("#pickColor");
const LOCAL_STORAGE_KEY = "pickedColor";
let myColor = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const setting_container = document.querySelector(".setting_container");
setting_container.addEventListener("click", () => {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="drop_shadow"></div>
    <div class="settings_panal">
        <h1>color picker options</h1>
        <hr>
        <div class="seting_options">
            <div class="setting_1">
                <label for="clipBord_colorFormate">
                <p>Automatically copy picked color to clipboard.</p>
                <input type="checkbox" name="clipbordColorFormate" id="clipBord_colorFormate">
                </label>
            </div>
            <div class="setting_1">
                <label for="showLowerCase">
                <p>Show Hex codes in lowercase.</p>
                <input type="checkbox" name="clipbordColorFormate" id="showLowerCase">
                </label>
            </div>
            <div class="setting_1">
                <label for="enableKyeShotCut">
                <p>Enable color picking from page using keyboard shortcut Press <br> <kbd>Ctrl</kbd> + <kbd>Z</kbd></p>
                <input type="checkbox" name="clipbordColorFormate" id="enableKyeShotCut">
                </label>
            </div>
            <div class="setting_1">
                <label for="darkMood">
                <p>Dark mood</p>
                <input type="checkbox" name="clipbordColorFormate" id="darkMood">
                </label>
            </div>
        </div>
        <div class="settings_btn">
            <button type="button" id="closeSettings">Close</button>
            <button type="button" id="saveSettings">Save</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    const settings_panal = document.querySelector(".settings_panal");
    setTimeout(() => {
        settings_panal.style.top = "45%";
        settings_panal.style.opacity = "1";
    }, 10);

    const backDrop = document.querySelector(".drop_shadow");
    const closeSettings = document.querySelector("#closeSettings");

    backDrop.addEventListener("click", () => {
        settings_panal.style.top = "40%";
        settings_panal.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(div);
        }, 300);
    })
    closeSettings.addEventListener("click", () => {
        settings_panal.style.top = "40%";
        settings_panal.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(div);
        }, 300);
    })
})
//pick color action
pickColor.addEventListener("click", () => {
    try {
        if (window.EyeDropper) {
            activateEyeDroper();
        } else {
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
function hexToRGB(hex) {
    hex = hex.replace("#", "");

    // seprate hex ff bb 00 like this use substring(start,end); or convert hex to decimal use parseInt(any calculation)
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r},${g},${b})`;
}

// convert hex to hsl
function hexToHsl(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // find max or min over all rgb 
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = 1 > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

//display as folder all colors
const container = document.querySelector(".card");
function renderUIcolor() {
    container.innerHTML = "";
    myColor.forEach(color => {
        let colorPalet = document.createElement("div");
        colorPalet.innerHTML = `
          <div class="folder" data-hex="${color.hexColor}" data-rgb="${color.rgbColor}" data-hsl="${color.hslColor}">
                <div class="close_folder" data-delete="${color.id}">
                     <svg style="pointer-events: none;" xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 24 24"
                        fill="none">
                        <path fill-rule="avoid" clip-rule="evenodd"
                            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
                    </svg>
                </div>
                <div class="folder-icon-container" style="pointer-events: none;">
                    <div class="main-icon" style="background-color: ${color.hexColor}; pointer-events: none;"></div>
                </div>
                <p style="font-size: .55rem; margin:0; pointer-events: none;" class="folder_name">${color.hexColor}</p>
            </div>
        `;
        container.appendChild(colorPalet)
    });
    //delete single color action
    const close_folder = document.querySelectorAll(".close_folder");
    const folder = document.querySelectorAll(".folder");
    close_folder.forEach(delete_btn => {
        delete_btn.addEventListener("click", (e) => {
            e.stopPropagation();
            removeSingleColor(e)
        })
    });
    folder.forEach(openFolder => {
        openFolder.addEventListener("click", (e) => {
            toggleColorModal(e)
        })
    })

}

// remove color from local storage
function removeSingleColor(e) {
    const targetColor = parseInt(e.target.dataset.delete);
    console.log(targetColor)
    const itemIndex = myColor.findIndex(
        item => item.id === targetColor
    );

    if (itemIndex > -1) {
        myColor.splice(itemIndex, 1);
        updateLocalStorage();
        renderUIcolor()
    }
}
//remove all color
let clearAllBtn = document.querySelector(".clearAllBtn");
clearAllBtn.addEventListener("click", () => {
    myColor = [];
    container.innerHTML = ""
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    // renderUIcolor();
    // renderUIcolor();
})

// toggle colors modal
function toggleColorModal(e) {
    console.log(e.target.firstElementChild)
    const rgb = e.target.dataset.rgb;
    const hsl = e.target.dataset.hsl;
    const hex = e.target.dataset.hex;
    console.log(rgb);
    const div = document.createElement("div")
    div.innerHTML = `<div class="drop_shadow"></div>
        <div class="popup">
            <div class="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                        fill="#0F1729" />
                </svg>
            </div>
            <div class="cp_btn_container"> <button type="button" class="pick_button" id="copy_rgb">Copy rgba</button></div>
            <div class="p_color_box">
                <span>${rgb}</span>
            </div>
            <div class="cp_btn_container"> <button type="button" class="pick_button" id="copy_hsl">Copy hsl</button></div>
            <div class="p_color_box">
                <span>${hsl}</span>
            </div>
            <div class="cp_btn_container"> <button type="button" class="pick_button" id="copy_hex">Copy hex</button></div>
            <div class="p_color_box">
                <span>${hex}</span>
            </div>
            <div class="dt_btn_container">
                <button type="button" class="btn_delete" id="delete">
                    delete
                </button>
            </div>
        </div>`;
    document.body.appendChild(div);
    const popup = document.querySelector(".popup");
    const copy_rgb = document.querySelector("#copy_rgb");
    const copy_hsl = document.querySelector("#copy_hsl");
    const copy_hex = document.querySelector("#copy_hex");

    copy_hex.addEventListener("click", (e) => {
        const color_code = e.target.parentElement.nextElementSibling.firstElementChild.textContent;
        e.target.textContent = "Copied"
        setTimeout(() => {
            e.target.textContent = "Copy hex"
        }, 1000);
        // e.target.textContent = "copped"
        navigator.clipboard.writeText(color_code);
    });
    copy_rgb.addEventListener("click", (e) => {
        const color_code = e.target.parentElement.nextElementSibling.firstElementChild.textContent;
        navigator.clipboard.writeText(color_code);
        e.target.textContent = "Copied"
        setTimeout(() => {
            e.target.textContent = "Copy hex"
        }, 1000);
    });
    copy_hsl.addEventListener("click", (e) => {
        const color_code = e.target.parentElement.nextElementSibling.firstElementChild.textContent;
        navigator.clipboard.writeText(color_code);
        e.target.textContent = "Copied"
        setTimeout(() => {
            e.target.textContent = "Copy hex"
        }, 1000);
    })


    // for animation
    setTimeout(() => {
        popup.style.opacity = "1";
        popup.style.top = "50%";
    }, 10);

    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
        popup.style.opacity = "0";
        popup.style.top = "45%";
        setTimeout(() => {
            document.body.removeChild(div);
        }, 200);
        // console.log("delete3")
    });




}



// save color on local storage
function updateLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myColor))
}


renderUIcolor();