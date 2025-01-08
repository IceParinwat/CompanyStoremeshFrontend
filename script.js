function toggleMenu() {
    const menu = document.querySelector(".menu");
    const menuIcon = document.getElementById("menuIcon");
    const closeIcon = document.getElementById("closeIcon");
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    } else {
      menu.classList.add("open");
      menuIcon.style.display = "none";
      closeIcon.style.display = "block";
    }
  }