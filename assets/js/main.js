"use strict";

// variables for navbar menu toggle

const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navbarMenuBtn = document.querySelector(".akbar-navbar-menu");

// variables for navbar search toggle
const navbarForm = document.querySelector(".akbar-navbar-form");
const navbarCloseBtn = document.querySelector(".akbar-navbar-form-close");
const navbarSearchBtn = document.querySelector(".akbar-navbar-search-btn");

// navbar menu toggle function
function navIsActive() {
  header.classList.toggle("active");
  nav.classList.toggle("active");
  navbarMenuBtn.classList.toggle("active");
}

navbarMenuBtn.addEventListener("click", navIsActive);

// navbar search toggle function
const navbarSearchIsActive = () => {
  navbarForm.classList.toggle("active");
};

navbarSearchBtn.addEventListener("click", navbarSearchIsActive);
navbarCloseBtn.addEventListener("click", navbarSearchIsActive);
