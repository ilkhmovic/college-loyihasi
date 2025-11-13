document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector("#sidebarToggle");
    const mainContent = document.querySelector(".main-content");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function(e) {
            e.preventDefault();
            sidebar.classList.toggle("active");
            
            // Desktopda sidebar yopilganda kontentni kengaytirish
            if (window.innerWidth > 768) {
                if (sidebar.classList.contains("active")) {
                    // Agar sidebar yopish rejimi (custom logic) bo'lsa
                    sidebar.style.transform = "translateX(-100%)";
                    mainContent.style.marginLeft = "0";
                    mainContent.style.width = "100%";
                } else {
                    sidebar.style.transform = "translateX(0)";
                    mainContent.style.marginLeft = "260px";
                    mainContent.style.width = "calc(100% - 260px)";
                }
            } else {
                // Mobil rejim
                if (sidebar.classList.contains("active")) {
                    sidebar.style.transform = "translateX(0)";
                } else {
                    sidebar.style.transform = "translateX(-100%)";
                }
            }
        });
    }
});