const pickBtn = document.getElementById("pickColor");
const clearBtn = document.getElementById("clearColor");

const preview = document.getElementById("preview");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const hslValue = document.getElementById("hslValue");

const STORAGE_KEY = "pickedColor";

// Pick color
pickBtn.addEventListener("click", async () => {
  try {
    if (!window.EyeDropper) {
      alert("EyeDropper API not supported");
      return;
    }

    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();

    const rgb = hexToRGB(sRGBHex);
    const hsl = hexToHSL(sRGBHex);

    updateUI(sRGBHex, rgb, hsl);
    saveColor(sRGBHex, rgb, hsl);

  } catch (err) {
    console.log("Color picking cancelled");
  }
});

// Clear saved color
clearBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  resetUI();
});

// Load saved color on page load
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const { hex, rgb, hsl } = JSON.parse(saved);
    updateUI(hex, rgb, hsl);
  }
});

// ---------- Helper Functions ----------

// Save to localStorage
function saveColor(hex, rgb, hsl) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ hex, rgb, hsl })
  );
}

// Update UI
function updateUI(hex, rgb, hsl) {
  preview.style.backgroundColor = hex;
  hexValue.textContent = hex;
  rgbValue.textContent = rgb;
  hslValue.textContent = hsl;
}

// Reset UI
function resetUI() {
  preview.style.backgroundColor = "transparent";
  hexValue.textContent = "—";
  rgbValue.textContent = "—";
  hslValue.textContent = "—";
}

// HEX → RGB
function hexToRGB(hex) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

// HEX → HSL
function hexToHSL(hex) {
  hex = hex.replace("#", "");

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {  
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }

  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
