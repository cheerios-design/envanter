document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuButton = document.getElementById("close-menu-button");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  closeMenuButton.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
  });

  document
    .querySelectorAll('[data-modal-hide="popup-modal"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        document.getElementById("popup-modal").classList.add("hidden");
      });
    });

  document
    .querySelectorAll('[data-menu-hide="mobile-menu"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
});
