function navigationMenuHandler() {
    const toggles = document.querySelectorAll(".nav-toggle");
    const menus = document.querySelectorAll(".nav-menu");

    // toggle click
    toggles.forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            e.stopPropagation();

            const targetId = this.dataset.target;
            const targetMenu = document.getElementById(targetId);

            // close other menus
            menus.forEach(menu => {
                if (menu !== targetMenu) {
                    menu.classList.remove("active");
                }
            });

            // toggle current menu
            targetMenu.classList.toggle("active");
        });
    });

    // click outside → close all menus
    document.addEventListener("click", () => {
        menus.forEach(menu => menu.classList.remove("active"));
    });
}

// call once
navigationMenuHandler();


// 🔍 কীভাবে কাজ করে (Bangla explanation)
// 🔹 1. data-target
// <button data-target="menu1">


// ➡ button জানে কোন menu open করবে

// 🔹 2. একটায় ক্লিক করলে অন্যগুলো বন্ধ
// if (menu !== targetMenu)


// ➡ একাধিক menu একসাথে open থাকবে না

// 🔹 3. বাইরে ক্লিক করলে সব বন্ধ
// document.addEventListener("click", ...)

// ✅ Result Behavior
// Action	Result
// Menu button click	নির্দিষ্ট menu toggle
// অন্য menu button click	আগের menu বন্ধ
// Menu ছাড়া অন্য কোথাও click	সব menu বন্ধ
// 🔥 Pro Tips (Real Project)

// ✔ Dropdown
// ✔ Navbar menu
// ✔ User profile menu
// ✔ Mobile hamburger menu