"use strict";

const btn = document.querySelector("#btn");
const sidebar = document.querySelector(".sidebar");
const searchBtn = document.querySelector(".fa-magnifying-glass");

btn.onclick = function () {
  sidebar.classList.toggle("active");
};
searchBtn.onclick = function () {
  sidebar.classList.toggle("active");
};

// -------------------------------------------------- SIDEBAR END

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
// -------------------------------------------------- MODAL END

document.getElementById("priority1").innerHTML = "signal_cellular_1_bar";

document.getElementById("priority2").innerHTML = "signal_cellular_3_bar";

document.getElementById("priority3").innerHTML = "signal_cellular_4_bar";

// let string = document.getElementsByTagName("span").innerHTML;

// let priority1 = string.replace("1", "signal_cellular_1_bar");
// document.getElementsByTagName("span").innerHTML = priority1;

// let priority2 = string.replace("2", "signal_cellular_3_bar");
// document.getElementsByTagName("span").innerHTML = priority1;

// let priority3 = string.replace("3", "signal_cellular_4_bar");
// document.getElementsByTagName("span").innerHTML = priority1;
