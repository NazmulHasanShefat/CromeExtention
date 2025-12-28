const button = document.getElementById("pickColor");
const preview = document.getElementById("preview");
const colorValue = document.getElementById("colorValue");

button.addEventListener("click", async () => {
  try {
    if (!window.EyeDropper) {
      alert("EyeDropper API not supported in this browser");
      return;
    }

    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();

    preview.style.backgroundColor = result.sRGBHex;
    colorValue.textContent = result.sRGBHex;
  } catch (err) {
    console.log("User cancelled color picking");
  }
});
