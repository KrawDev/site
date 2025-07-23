document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const navbarRight = document.getElementById("navbar-right");

  menuIcon.addEventListener("click", () => {
    navbarRight.classList.toggle("show");
  });
});