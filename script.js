document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const navbarRight = document.getElementById("navbar-right");

  menuIcon.addEventListener("click", () => {
    navbarRight.classList.toggle("show");
  });
});

function copyContractAddress(button) {
  const address = document.getElementById("contract-address").innerText;

  navigator.clipboard.writeText(address).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = 'Copied!';
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.disabled = false;
    }, 1500);
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}