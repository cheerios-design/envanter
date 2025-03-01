document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("popup-modal");
  const closeModalButtons = document.querySelectorAll(
    "[data-modal-hide='popup-modal']"
  );

  // Show the modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Hide the modal when any close button is clicked
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  });
});

// document
//   .querySelectorAll('[data-modal-hide="popup-modal"]')
//   .forEach((button) => {
//     button.addEventListener("click", function () {
//       document.getElementById("popup-modal").classList.add("hidden");
//     });
//   });

// document
//   .querySelectorAll('[data-menu-hide="mobile-menu"]')
//   .forEach((button) => {
//     button.addEventListener("click", function () {
//       mobileMenu.classList.add("hidden");
//     });
//   });
