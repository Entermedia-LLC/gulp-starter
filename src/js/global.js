"use strict";

const init = () => {
  const menuToggle = document.getElementById("toggleMenu");

  menuToggle.addEventListener("click", () => {
    const header = document.getElementById("header");
    header.classList.toggle("header--menu-active");
  });
};
init();
